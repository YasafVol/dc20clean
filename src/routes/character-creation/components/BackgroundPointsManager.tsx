import React from 'react';

// Mastery system interfaces and data
export interface MasteryInfo {
	level: number;
	name: string;
	bonus: number;
	available: boolean;
}

export interface MasteryValidation {
	valid: boolean;
	adeptCount: number;
	message?: string;
}

export interface MasteryLimits {
	maxSkillMastery: number;
	maxTradeMastery: number;
	level1Validation: MasteryValidation;
}

export const MASTERY_TABLE = [
	{ level: 0, name: 'Untrained', bonus: 0 },
	{ level: 1, name: 'Novice', bonus: 2 },
	{ level: 2, name: 'Adept', bonus: 4 },
	{ level: 3, name: 'Expert', bonus: 6 },
	{ level: 4, name: 'Master', bonus: 8 },
	{ level: 5, name: 'Grandmaster', bonus: 10 }
];

export interface BackgroundPointsData {
	skillPointsUsed: number;
	tradePointsUsed: number;
	languagePointsUsed: number;
	baseSkillPoints: number;
	baseTradePoints: number;
	baseLanguagePoints: number;
	availableSkillPoints: number;
	availableTradePoints: number;
	availableLanguagePoints: number;
}

export interface PointConversions {
	skillToTradeConversions: number;
	tradeToSkillConversions: number;
	tradeToLanguageConversions: number;
}

export interface ConversionActions {
	convertSkillToTrade: () => void;
	convertTradeToSkill: () => void;
	convertTradeToLanguage: () => void;
	resetConversions: () => void;
}

// Mastery utility functions
export const getBaseMasteryLimit = (characterLevel: number): number => {
	if (characterLevel >= 20) return 5; // Grandmaster
	if (characterLevel >= 15) return 4; // Master
	if (characterLevel >= 10) return 3; // Expert
	if (characterLevel >= 5) return 2; // Adept
	return 1; // Novice
};

export const getClassMasteryBonuses = (
	classFeatures: any,
	selectedFeatureChoices: string,
	type: 'skill' | 'trade'
): number => {
	if (!classFeatures || !selectedFeatureChoices) return 0;

	let bonus = 0;
	try {
		const selectedChoices: { [key: string]: string } = JSON.parse(selectedFeatureChoices);
		const level1Features = classFeatures.coreFeatures?.filter(
			(feature: any) => feature.levelGained === 1
		);

		level1Features?.forEach((feature: any) => {
			if (feature.choices) {
				feature.choices.forEach((choice: any, choiceIndex: number) => {
					const choiceId = `${classFeatures.className.toLowerCase()}_${feature.featureName
						.toLowerCase()
						.replace(/\s+/g, '_')}_${choiceIndex}`;
					const selectedOptions = selectedChoices[choiceId];

					if (selectedOptions) {
						let optionsToProcess: string[] = [];
						try {
							optionsToProcess = JSON.parse(selectedOptions);
							if (!Array.isArray(optionsToProcess)) {
								optionsToProcess = [selectedOptions];
							}
						} catch {
							optionsToProcess = [selectedOptions];
						}

						optionsToProcess.forEach((optionName) => {
							const selectedOption = choice.options?.find(
								(opt: any) => opt.name === optionName
							);
							if (selectedOption) {
								const description = selectedOption.description.toLowerCase();

								if (type === 'skill') {
									if (
										description.includes('skill mastery limit') ||
										description.includes('skill mastery cap')
									) {
										const masteryMatch = description.match(/increases? by (\d+)/i);
										if (masteryMatch) {
											bonus += parseInt(masteryMatch[1]);
										}
									}
								} else if (type === 'trade') {
									if (
										description.includes('mastery limit') &&
										(description.includes('trade') || description.includes('knowledge'))
									) {
										const masteryMatch = description.match(/increases? by (\d+)/i);
										if (masteryMatch) {
											bonus += parseInt(masteryMatch[1]);
										}
									}
								}
							}
						});
					}
				});
			}
		});
	} catch (error) {
		console.warn('Error calculating class mastery bonuses:', error);
	}
	return bonus;
};

export const validateLevel1MasteryRule = (
	skills: Record<string, number>,
	trades: Record<string, number>
): MasteryValidation => {
	const allMasteries = { ...skills, ...trades };
	const adeptCount = Object.values(allMasteries).filter((level) => level === 2).length;

	return {
		valid: adeptCount <= 1,
		adeptCount,
		message:
			adeptCount > 1
				? `Level 1 characters can only have ONE Adept skill/trade (currently: ${adeptCount})`
				: undefined
	};
};

export const getMasteryInfo = (level: number, maxMastery: number): MasteryInfo => {
	const masteryData = MASTERY_TABLE[level] || MASTERY_TABLE[0];
	return {
		level,
		name: masteryData.name,
		bonus: masteryData.bonus,
		available: level <= maxMastery
	};
};

export const useBackgroundPoints = (
	skillPointsUsed: number,
	tradePointsUsed: number,
	languagePointsUsed: number,
	intelligenceModifier: number,
	characterLevel: number = 1,
	classFeatures: any = null,
	selectedFeatureChoices: string = '{}',
	currentSkills: Record<string, number> = {},
	currentTrades: Record<string, number> = {}
) => {
	const [skillToTradeConversions, setSkillToTradeConversions] = React.useState(0);
	const [tradeToSkillConversions, setTradeToSkillConversions] = React.useState(0);
	const [tradeToLanguageConversions, setTradeToLanguageConversions] = React.useState(0);

	// Base points according to DC20 rules
	const baseSkillPoints = 5 + intelligenceModifier;
	const baseTradePoints = 3;
	const baseLanguagePoints = 2;

	// Calculate available points after conversions
	const availableSkillPoints =
		baseSkillPoints - skillToTradeConversions + Math.floor(tradeToSkillConversions / 2);
	const availableTradePoints =
		baseTradePoints -
		tradeToSkillConversions +
		skillToTradeConversions * 2 -
		tradeToLanguageConversions;
	const availableLanguagePoints = baseLanguagePoints + tradeToLanguageConversions * 2;

	// Conversion functions
	const convertSkillToTrade = () => {
		if (skillPointsUsed + 1 <= availableSkillPoints) {
			setSkillToTradeConversions((prev) => prev + 1);
		}
	};

	const convertTradeToSkill = () => {
		if (
			tradeToSkillConversions + 2 <= baseTradePoints + skillToTradeConversions * 2 &&
			tradePointsUsed + 2 <= availableTradePoints
		) {
			setTradeToSkillConversions((prev) => prev + 2);
		}
	};

	const convertTradeToLanguage = () => {
		if (availableTradePoints - tradePointsUsed >= 1) {
			setTradeToLanguageConversions((prev) => prev + 1);
		}
	};

	const resetConversions = () => {
		setSkillToTradeConversions(0);
		setTradeToSkillConversions(0);
		setTradeToLanguageConversions(0);
	};

	// Calculate mastery limits
	const baseMasteryLimit = getBaseMasteryLimit(characterLevel);
	const skillMasteryBonus = getClassMasteryBonuses(classFeatures, selectedFeatureChoices, 'skill');
	const tradeMasteryBonus = getClassMasteryBonuses(classFeatures, selectedFeatureChoices, 'trade');
	
	const maxSkillMastery = Math.min(5, baseMasteryLimit + skillMasteryBonus);
	const maxTradeMastery = Math.min(5, baseMasteryLimit + tradeMasteryBonus);
	
	const level1Validation = characterLevel === 1 
		? validateLevel1MasteryRule(currentSkills, currentTrades)
		: { valid: true, adeptCount: 0 };

	const masteryLimits: MasteryLimits = {
		maxSkillMastery,
		maxTradeMastery,
		level1Validation
	};

	const pointsData: BackgroundPointsData = {
		skillPointsUsed,
		tradePointsUsed,
		languagePointsUsed,
		baseSkillPoints,
		baseTradePoints,
		baseLanguagePoints,
		availableSkillPoints,
		availableTradePoints,
		availableLanguagePoints
	};

	const conversions: PointConversions = {
		skillToTradeConversions,
		tradeToSkillConversions,
		tradeToLanguageConversions
	};

	const actions: ConversionActions = {
		convertSkillToTrade,
		convertTradeToSkill,
		convertTradeToLanguage,
		resetConversions
	};

	return { pointsData, conversions, actions, masteryLimits };
};
