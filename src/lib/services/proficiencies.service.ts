import type { CharacterInProgressStoreData } from '../stores/characterContext';
import { proficiencyRules } from '../rulesdata/proficiencies';
import { getLevelCaps } from '../rulesdata/progression/levelCaps';
import { traitsData } from '../rulesdata/ancestries/traits';
import { classesData } from '../rulesdata/loaders/class.loader';

/**
 * Service for handling proficiency-related business logic (skills, trades, languages)
 * NO business logic should be in the frontend components!
 * All rules come from proficiencyRules data - NO hardcoded values!
 */

/**
 * Calculate base skill points from class level progression
 */
const calculateBaseSkillPointsFromProgression = (
	character: CharacterInProgressStoreData
): number => {
	if (!character.classId) {
		return proficiencyRules.baseSkillPoints;
	}

	const characterClass = classesData.find((c) => c.id === character.classId);
	if (!characterClass) {
		return proficiencyRules.baseSkillPoints;
	}

	// Accumulate skill points from level 1 up to current level
	let totalPoints = 0;
	characterClass.levelProgression.forEach((levelEntry) => {
		if (levelEntry.level <= character.level) {
			totalPoints += levelEntry.skillPoints ?? 0;
		}
	});

	return totalPoints;
};

/**
 * Calculate base trade points from class level progression
 */
const calculateBaseTradePointsFromProgression = (
	character: CharacterInProgressStoreData
): number => {
	if (!character.classId) {
		return proficiencyRules.baseTradePoints;
	}

	const characterClass = classesData.find((c) => c.id === character.classId);
	if (!characterClass) {
		return proficiencyRules.baseTradePoints;
	}

	// Accumulate trade points from level 1 up to current level
	let totalPoints = 0;
	characterClass.levelProgression.forEach((levelEntry) => {
		if (levelEntry.level <= character.level) {
			totalPoints += levelEntry.tradePoints ?? 0;
		}
	});

	return totalPoints;
};

/**
 * Calculate total available skill points for a character
 * Base + Intelligence + Class Progression + Bonuses from traits/features
 */
export const calculateAvailableSkillPoints = (character: CharacterInProgressStoreData): number => {
	// Start with base
	let totalPoints = proficiencyRules.baseSkillPoints;

	// Add intelligence modifier
	const intelligence = character.attribute_intelligence ?? 0;
	totalPoints += intelligence;

	// Add class progression points
	totalPoints += calculateBaseSkillPointsFromProgression(character);

	// Add bonus points from selected traits
	const selectedTraits = character.selectedTraitIds || [];
	selectedTraits.forEach((traitId) => {
		const trait = traitsData.find((t) => t.id === traitId);
		if (trait && trait.effects) {
			trait.effects.forEach((effect) => {
				if (effect.type === 'MODIFY_STAT' && effect.target === 'skillPoints') {
					totalPoints += effect.value;
				}
			});
		}
	});

	return totalPoints;
};

/**
 * Calculate total available trade points for a character
 * Base + Class Progression + Bonuses from traits/features
 */
export const calculateAvailableTradePoints = (character: CharacterInProgressStoreData): number => {
	// Start with base
	let totalPoints = proficiencyRules.baseTradePoints;

	// Add class progression points
	totalPoints += calculateBaseTradePointsFromProgression(character);

	// Add bonus points from selected traits
	const selectedTraits = character.selectedTraitIds || [];
	selectedTraits.forEach((traitId) => {
		const trait = traitsData.find((t) => t.id === traitId);
		if (trait && trait.effects) {
			trait.effects.forEach((effect) => {
				if (effect.type === 'MODIFY_STAT' && effect.target === 'tradePoints') {
					totalPoints += effect.value;
				}
			});
		}
	});

	return totalPoints;
};

/**
 * Calculate total available language points for a character
 * Base + Bonuses from traits/features
 */
export const calculateAvailableLanguagePoints = (
	character: CharacterInProgressStoreData
): number => {
	// Start with base
	let totalPoints = proficiencyRules.baseLanguagePoints;

	// Add bonus points from selected traits
	const selectedTraits = character.selectedTraitIds || [];
	selectedTraits.forEach((traitId) => {
		const trait = traitsData.find((t) => t.id === traitId);
		if (trait && trait.effects) {
			trait.effects.forEach((effect) => {
				if (effect.type === 'MODIFY_STAT' && effect.target === 'languagePoints') {
					totalPoints += effect.value;
				}
			});
		}
	});

	return totalPoints;
};

/**
 * Apply conversions to calculate final available points for each type
 *
 * Conversion Rules:
 * - 1 Skill Point → 2 Trade Points (forward)
 * - 1 Trade Point → 2 Language Points (forward)
 *
 * Conversions are tracked and can be reversed
 */
export const calculateAvailablePointsWithConversions = (
	character: CharacterInProgressStoreData
) => {
	const baseSkillPoints = calculateAvailableSkillPoints(character);
	const baseTradePoints = calculateAvailableTradePoints(character);
	const baseLanguagePoints = calculateAvailableLanguagePoints(character);

	const skillToTrade = character.skillToTradeConversions || 0;
	const tradeToLanguage = character.tradeToLanguageConversions || 0;

	// Apply conversion formulas (ONLY forward conversions)
	// Skills: Lose 1 per conversion, gain nothing back
	const availableSkillPoints = baseSkillPoints - skillToTrade;

	// Trades: Gain 2 per skill conversion, lose 1 per language conversion
	const availableTradePoints = baseTradePoints + skillToTrade * 2 - tradeToLanguage;

	// Languages: Gain 2 per trade conversion
	const availableLanguagePoints = baseLanguagePoints + tradeToLanguage * 2;

	return {
		baseSkillPoints,
		baseTradePoints,
		baseLanguagePoints,
		availableSkillPoints,
		availableTradePoints,
		availableLanguagePoints,
		conversions: {
			skillToTrade,
			tradeToLanguage
		}
	};
};

/**
 * Calculate points spent on skills
 */
export const calculateSkillPointsSpent = (character: CharacterInProgressStoreData): number => {
	const skills = character.skillsData || {};
	return Object.values(skills).reduce((sum, level) => sum + level, 0);
};

/**
 * Calculate points spent on trades
 */
export const calculateTradePointsSpent = (character: CharacterInProgressStoreData): number => {
	const trades = character.tradesData || {};
	return Object.values(trades).reduce((sum, level) => sum + level, 0);
};

/**
 * Calculate points spent on languages
 */
export const calculateLanguagePointsSpent = (character: CharacterInProgressStoreData): number => {
	const languages = character.languagesData || {};
	return Object.entries(languages).reduce((sum, [langId, data]) => {
		// Common is free, skip it
		if (langId === proficiencyRules.languageFluency.freeLanguage) {
			return sum;
		}
		// Limited = 1, Fluent = 2
		const cost =
			data.fluency === 'limited'
				? proficiencyRules.languageFluency.limited
				: proficiencyRules.languageFluency.fluent;
		return sum + cost;
	}, 0);
};

/**
 * Calculate Adept slots based on level
 * Level 1: 1 base slot
 * Level 2-4: 0 slots (unless from features)
 * Level 5+: Unlimited (natural cap allows it)
 */
const calculateAdeptSlots = (level: number): number => {
	if (level >= 5) {
		return 999; // Effectively unlimited
	}
	if (level === 1) {
		return 1; // Base slot at level 1
	}
	return 0; // Levels 2-4 have no base slots
};

/**
 * Get mastery limits for current character level
 */
export const getMasteryLimits = (character: CharacterInProgressStoreData) => {
	const levelCaps = getLevelCaps(character.level);
	const baseAdeptSlots = calculateAdeptSlots(character.level);

	// Count current Adept+ selections
	const skills = character.skillsData || {};
	const trades = character.tradesData || {};

	const currentAdeptCount = [...Object.values(skills), ...Object.values(trades)].filter(
		(level) => level >= 2
	).length;

	// Add bonus slots from traits/features that grant INCREASE_SKILL_MASTERY_CAP
	const selectedTraits = character.selectedTraitIds || [];
	let bonusAdeptSlots = 0;
	selectedTraits.forEach((traitId) => {
		const trait = traitsData.find((t) => t.id === traitId);
		if (trait && trait.effects) {
			trait.effects.forEach((effect) => {
				if (effect.type === 'INCREASE_SKILL_MASTERY_CAP') {
					bonusAdeptSlots += effect.count || 0;
				}
			});
		}
	});

	const maxAdeptCount = baseAdeptSlots + bonusAdeptSlots;

	return {
		maxSkillMastery: levelCaps.maxSkillMasteryTier,
		maxTradeMastery: levelCaps.maxTradeMasteryTier,
		maxAdeptCount,
		currentAdeptCount,
		canSelectAdept: currentAdeptCount < maxAdeptCount
	};
};

/**
 * Check if can increase skill mastery
 */
export const canIncreaseSkill = (
	character: CharacterInProgressStoreData,
	skillId: string
): boolean => {
	const currentLevel = (character.skillsData || {})[skillId] || 0;
	const masteryLimits = getMasteryLimits(character);

	// Check if at max for this level
	if (currentLevel >= masteryLimits.maxSkillMastery) {
		return false;
	}

	// Check Adept limit (level 2+)
	if (currentLevel === 1) {
		// Trying to go from 1 → 2 (Adept)
		if (!masteryLimits.canSelectAdept) {
			return false;
		}
	}

	// Check if we have points to spend
	const pointsData = calculateAvailablePointsWithConversions(character);
	const spent = calculateSkillPointsSpent(character);
	const remaining = pointsData.availableSkillPoints - spent;

	return remaining >= proficiencyRules.costPerMasteryLevel;
};

/**
 * Check if can decrease skill mastery
 */
export const canDecreaseSkill = (
	character: CharacterInProgressStoreData,
	skillId: string
): boolean => {
	const currentLevel = (character.skillsData || {})[skillId] || 0;
	return currentLevel > 0;
};

/**
 * Check if can increase trade mastery
 */
export const canIncreaseTrade = (
	character: CharacterInProgressStoreData,
	tradeId: string
): boolean => {
	const currentLevel = (character.tradesData || {})[tradeId] || 0;
	const masteryLimits = getMasteryLimits(character);

	// Check if at max for this level
	if (currentLevel >= masteryLimits.maxTradeMastery) {
		return false;
	}

	// Check Adept limit (level 2+)
	if (currentLevel === 1) {
		// Trying to go from 1 → 2 (Adept)
		if (!masteryLimits.canSelectAdept) {
			return false;
		}
	}

	// Check if we have points to spend
	const pointsData = calculateAvailablePointsWithConversions(character);
	const spent = calculateTradePointsSpent(character);
	const remaining = pointsData.availableTradePoints - spent;

	return remaining >= proficiencyRules.costPerMasteryLevel;
};

/**
 * Check if can decrease trade mastery
 */
export const canDecreaseTrade = (
	character: CharacterInProgressStoreData,
	tradeId: string
): boolean => {
	const currentLevel = (character.tradesData || {})[tradeId] || 0;
	return currentLevel > 0;
};

/**
 * Check if can select/modify a language
 */
export const canSelectLanguage = (
	character: CharacterInProgressStoreData,
	languageId: string,
	targetFluency: 'limited' | 'fluent'
): boolean => {
	// Common is always free
	if (languageId === proficiencyRules.languageFluency.freeLanguage) {
		return true;
	}

	const currentLanguages = character.languagesData || {};
	const currentFluency = currentLanguages[languageId]?.fluency;

	// Calculate cost difference
	let costDifference = 0;
	if (!currentFluency) {
		// Adding new language
		costDifference =
			targetFluency === 'limited'
				? proficiencyRules.languageFluency.limited
				: proficiencyRules.languageFluency.fluent;
	} else if (currentFluency === 'limited' && targetFluency === 'fluent') {
		// Upgrading limited → fluent
		costDifference =
			proficiencyRules.languageFluency.fluent - proficiencyRules.languageFluency.limited;
	} else {
		// Downgrading or no change - always allowed
		return true;
	}

	// Check if we have points
	const pointsData = calculateAvailablePointsWithConversions(character);
	const spent = calculateLanguagePointsSpent(character);
	const remaining = pointsData.availableLanguagePoints - spent;

	return remaining >= costDifference;
};

/**
 * Validate that all proficiency points have been properly allocated
 */
export const areAllProficienciesValid = (character: CharacterInProgressStoreData): boolean => {
	const pointsData = calculateAvailablePointsWithConversions(character);
	const skillsSpent = calculateSkillPointsSpent(character);
	const tradesSpent = calculateTradePointsSpent(character);
	const languagesSpent = calculateLanguagePointsSpent(character);

	// Check skills
	if (skillsSpent > pointsData.availableSkillPoints) {
		return false;
	}

	// Check trades
	if (tradesSpent > pointsData.availableTradePoints) {
		return false;
	}

	// Check languages
	if (languagesSpent > pointsData.availableLanguagePoints) {
		return false;
	}

	// Check mastery limits
	const masteryLimits = getMasteryLimits(character);
	const skills = character.skillsData || {};
	const trades = character.tradesData || {};

	// Check no skill exceeds max
	if (Object.values(skills).some((level) => level > masteryLimits.maxSkillMastery)) {
		return false;
	}

	// Check no trade exceeds max
	if (Object.values(trades).some((level) => level > masteryLimits.maxTradeMastery)) {
		return false;
	}

	// Check Adept count
	if (masteryLimits.currentAdeptCount > masteryLimits.maxAdeptCount) {
		return false;
	}

	return true;
};

/**
 * Service function to handle skill → trade conversion
 * Returns updated conversion values or null if can't convert
 */
export const convertSkillToTrade = (
	character: CharacterInProgressStoreData
): { skillToTrade: number } | null => {
	const pointsData = calculateAvailablePointsWithConversions(character);
	const skillsSpent = calculateSkillPointsSpent(character);
	const remainingSkillPoints = pointsData.availableSkillPoints - skillsSpent;

	// Need at least 1 skill point remaining
	if (remainingSkillPoints < 1) {
		return null;
	}

	const currentConversions = character.skillToTradeConversions || 0;
	return { skillToTrade: currentConversions + 1 };
};

/**
 * Service function to handle trade → language conversion
 * Returns updated conversion values or null if can't convert
 */
export const convertTradeToLanguage = (
	character: CharacterInProgressStoreData
): { tradeToLanguage: number } | null => {
	const pointsData = calculateAvailablePointsWithConversions(character);
	const tradesSpent = calculateTradePointsSpent(character);
	const remainingTradePoints = pointsData.availableTradePoints - tradesSpent;

	// Need at least 1 trade point remaining
	if (remainingTradePoints < 1) {
		return null;
	}

	const currentConversions = character.tradeToLanguageConversions || 0;
	return { tradeToLanguage: currentConversions + 1 };
};

/**
 * Service function to handle UNDOING skill → trade conversion (2 trades back to 1 skill)
 * Returns updated conversion values or null if can't undo
 */
export const unconvertSkillToTrade = (
	character: CharacterInProgressStoreData
): { skillToTrade: number } | null => {
	const currentConversions = character.skillToTradeConversions || 0;

	// Must have at least 1 conversion to undo
	if (currentConversions < 1) {
		return null;
	}

	// Check if we have 2 trade points available to give back
	const pointsData = calculateAvailablePointsWithConversions(character);
	const tradesSpent = calculateTradePointsSpent(character);
	const remainingTradePoints = pointsData.availableTradePoints - tradesSpent;

	// Need at least 2 trade points to convert back
	if (remainingTradePoints < 2) {
		return null;
	}

	return { skillToTrade: currentConversions - 1 };
};

/**
 * Service function to handle UNDOING trade → language conversion (2 languages back to 1 trade)
 * Returns updated conversion values or null if can't undo
 */
export const unconvertTradeToLanguage = (
	character: CharacterInProgressStoreData
): { tradeToLanguage: number } | null => {
	const currentConversions = character.tradeToLanguageConversions || 0;

	// Must have at least 1 conversion to undo
	if (currentConversions < 1) {
		return null;
	}

	// Check if we have 2 language points available to give back
	const pointsData = calculateAvailablePointsWithConversions(character);
	const languagesSpent = calculateLanguagePointsSpent(character);
	const remainingLanguagePoints = pointsData.availableLanguagePoints - languagesSpent;

	// Need at least 2 language points to convert back
	if (remainingLanguagePoints < 2) {
		return null;
	}

	return { tradeToLanguage: currentConversions - 1 };
};
