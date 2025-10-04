/**
 * @file classFeatures.service.ts
 * @description Service for extracting and formatting class features for character creation
 * NO BUSINESS LOGIC IN FRONTEND - All rules and logic extracted here
 */

import {
	type ClassDefinition,
	type ClassFeature,
	findClassByName,
	getLegacyChoiceId
} from '../rulesdata/loaders/class-features.loader';
import { techniques } from '../rulesdata/martials/techniques';
import { SpellSchool } from '../rulesdata/schemas/spell.schema';

// In-game tactical choices that should NOT appear during character creation
const IN_GAME_CHOICES = ['Divine Blessing', "Commander's Call", 'Debilitating Strike'];

/**
 * Choice option for UI rendering
 */
export interface FeatureChoiceOption {
	value: string;
	label: string;
	description: string;
}

/**
 * Feature choice for UI rendering
 */
export interface FormattedFeatureChoice {
	id: string;
	prompt: string;
	type: 'select_one' | 'select_multiple';
	maxSelections?: number;
	options: FeatureChoiceOption[];
}

/**
 * Formatted class data for UI display
 */
export interface FormattedClassData {
	className: string;
	level1Features: ClassFeature[];
	featureChoices: FormattedFeatureChoice[];
	startingEquipment?: ClassDefinition['startingEquipment'];
	martialPath?: ClassDefinition['martialPath'];
	spellcastingPath?: ClassDefinition['spellcastingPath'];
}

/**
 * Get all level 1 features for a class
 */
export function getLevel1Features(classFeatures: ClassDefinition): ClassFeature[] {
	return classFeatures.coreFeatures.filter((feature) => feature.levelGained === 1);
}

/**
 * Extract feature choices from a feature, excluding in-game tactical choices
 */
export function extractFeatureChoices(
	classFeatures: ClassDefinition,
	feature: ClassFeature
): FormattedFeatureChoice[] {
	const choices: FormattedFeatureChoice[] = [];

	// Skip in-game tactical choices
	if (IN_GAME_CHOICES.includes(feature.featureName)) {
		return choices;
	}

	// Process standard feature choices
	if (feature.choices) {
		feature.choices.forEach((choice, choiceIndex) => {
			const choiceId = getLegacyChoiceId(classFeatures.className, feature.featureName, choiceIndex);

			choices.push({
				id: choiceId,
				prompt: choice.prompt,
				type: choice.count > 1 ? 'select_multiple' : 'select_one',
				maxSelections: choice.count > 1 ? choice.count : undefined,
				options:
					choice.options?.map((option) => ({
						value: option.name,
						label: option.name,
						description: option.description
					})) || []
			});
		});
	}

	// Extract userChoice options from feature effects
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	if ((feature as any).effects) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(feature as any).effects.forEach((effect: any, effectIndex: number) => {
			if ('userChoice' in effect && effect.userChoice) {
				const choiceId = `${classFeatures.className.toLowerCase()}_${feature.featureName.toLowerCase().replace(/\s+/g, '_')}_effect_${effectIndex}_user_choice`;

				const options =
					effect.userChoice.options?.map((optionValue: string) => {
						const label = optionValue
							.replace(/_/g, ' ')
							.replace(/\b\w/g, (l: string) => l.toUpperCase());
						return {
							value: optionValue,
							label: label,
							description: `Choose ${label.toLowerCase()} for this effect.`
						};
					}) || [];

				choices.push({
					id: choiceId,
					prompt: effect.userChoice.prompt,
					type: 'select_one',
					options
				});
			}
		});
	}

	// Extract userChoice from choice option effects
	if (feature.choices) {
		feature.choices.forEach((choice, choiceIndex) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			choice.options?.forEach((option: any, optionIndex) => {
				if (option.effects) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					option.effects.forEach((effect: any, effectIndex: number) => {
						if (effect.userChoice) {
							const choiceId = `${classFeatures.className.toLowerCase()}_${feature.featureName.toLowerCase().replace(/\s+/g, '_')}_choice_${choiceIndex}_option_${optionIndex}_effect_${effectIndex}_user_choice`;

							const options =
								effect.userChoice.options?.map((optionValue: string) => {
									const label = optionValue
										.replace(/_/g, ' ')
										.replace(/\b\w/g, (l: string) => l.toUpperCase());
									return {
										value: optionValue,
										label: label,
										description: `Choose ${label.toLowerCase()} for ${option.name}.`
									};
								}) || [];

							choices.push({
								id: choiceId,
								prompt: `${option.name}: ${effect.userChoice.prompt}`,
								type: 'select_one',
								options
							});
						}
					});
				}
			});
		});
	}

	return choices;
}

/**
 * Extract technique choices based on class table and features
 */
export function extractTechniqueChoices(
	classFeatures: ClassDefinition,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	levelData: any
): FormattedFeatureChoice | null {
	const tableTechniques = levelData?.techniquesKnown || 0;
	let featureTechniques = 0;

	// Parse feature descriptions to find technique bonuses
	const level1Features = getLevel1Features(classFeatures);

	level1Features.forEach((feature) => {
		const description = feature.description.toLowerCase();
		const techniqueMatch = description.match(/you learn (\d+) techniques?/);

		if (techniqueMatch) {
			featureTechniques += parseInt(techniqueMatch[1], 10);
		}

		// Check benefits for technique bonuses
		if (feature.benefits) {
			feature.benefits.forEach((benefit) => {
				const benefitDesc = benefit.description.toLowerCase();
				const benefitMatch = benefitDesc.match(/you learn (\d+) techniques?/);
				if (benefitMatch) {
					featureTechniques += parseInt(benefitMatch[1], 10);
				}
			});
		}
	});

	const totalTechniques = tableTechniques + featureTechniques;

	if (totalTechniques === 0) {
		return null;
	}

	return {
		id: `${classFeatures.className.toLowerCase()}_techniques`,
		prompt: `Choose ${totalTechniques} Technique${totalTechniques > 1 ? 's' : ''}`,
		type: totalTechniques > 1 ? 'select_multiple' : 'select_one',
		maxSelections: totalTechniques > 1 ? totalTechniques : undefined,
		options: techniques.map((technique) => ({
			value: technique.name,
			label: technique.name,
			description: `${technique.description}${technique.isReaction ? ' (Reaction)' : ''}${technique.requirement ? ` Requirement: ${technique.requirement}` : ''} Cost: ${technique.cost.ap ? `${technique.cost.ap} AP` : ''}${technique.cost.sp ? ` ${technique.cost.sp} SP` : ''}`
		}))
	};
}

/**
 * Extract spell school choices based on spellcasting path
 */
export function extractSpellSchoolChoices(
	classFeatures: ClassDefinition
): FormattedFeatureChoice[] {
	const choices: FormattedFeatureChoice[] = [];
	const spellList = classFeatures.spellcastingPath?.spellList;

	if (!spellList) {
		return choices;
	}

	const availableSchools = Object.values(SpellSchool);

	// Warlock-style: choose X schools from all available
	if (spellList.type === 'all_schools' && spellList.schoolCount) {
		choices.push({
			id: `${classFeatures.className.toLowerCase()}_spell_schools`,
			prompt: `Choose ${spellList.schoolCount} Spell School${spellList.schoolCount > 1 ? 's' : ''}`,
			type: 'select_multiple',
			maxSelections: spellList.schoolCount,
			options: availableSchools.map((school) => ({
				value: school,
				label: school,
				description: `Access to all spells from the ${school} school`
			}))
		});
	}

	// Spellblade-style: choose X additional schools
	else if (spellList.type === 'schools' && spellList.schoolCount && spellList.schoolCount > 0) {
		const alreadyHaveSchools = spellList.specificSchools || [];
		const choosableSchools = availableSchools.filter(
			(school) => !alreadyHaveSchools.includes(school)
		);

		choices.push({
			id: `${classFeatures.className.toLowerCase()}_additional_spell_schools`,
			prompt: `Choose ${spellList.schoolCount} additional Spell School${spellList.schoolCount > 1 ? 's' : ''} (you already have: ${alreadyHaveSchools.join(', ')})`,
			type: spellList.schoolCount > 1 ? 'select_multiple' : 'select_one',
			maxSelections: spellList.schoolCount > 1 ? spellList.schoolCount : undefined,
			options: choosableSchools.map((school) => ({
				value: school,
				label: school,
				description: `Access to all spells from the ${school} school`
			}))
		});
	}

	// Check level 1 features for school choices (like Wizard's Spell School Initiate)
	const level1Features = getLevel1Features(classFeatures);

	level1Features.forEach((feature) => {
		const description = feature.description.toLowerCase();

		// Only character creation choices, not in-game tactical ones
		const isCharacterCreationChoice =
			(description.includes('choose a spell school') ||
				description.includes('choose 1 spell school')) &&
			!description.includes('when you create') &&
			!description.includes('when you cast') &&
			!description.includes('you can spend') &&
			(description.includes('training') ||
				description.includes('specialize') ||
				description.includes('initiate') ||
				description.includes('you gain the following benefits'));

		if (isCharacterCreationChoice) {
			const choiceId = `${classFeatures.className.toLowerCase()}_${feature.featureName.toLowerCase().replace(/\s+/g, '_')}_school`;

			// Only add if not already added
			if (!choices.some((choice) => choice.id === choiceId)) {
				choices.push({
					id: choiceId,
					prompt: `${feature.featureName}: Choose a Spell School`,
					type: 'select_one',
					options: availableSchools.map((school) => ({
						value: school,
						label: school,
						description: `Gain benefits from the ${school} school`
					}))
				});
			}
		}
	});

	return choices;
}

/**
 * Get all formatted class data for character creation
 */
export function getFormattedClassData(
	className: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	levelData?: any
): FormattedClassData | null {
	const classFeatures = findClassByName(className);

	if (!classFeatures) {
		return null;
	}

	const level1Features = getLevel1Features(classFeatures);
	const featureChoices: FormattedFeatureChoice[] = [];

	// Extract choices from level 1 features
	level1Features.forEach((feature) => {
		const choices = extractFeatureChoices(classFeatures, feature);
		featureChoices.push(...choices);
	});

	// Add technique choices if applicable
	if (levelData) {
		const techniqueChoice = extractTechniqueChoices(classFeatures, levelData);
		if (techniqueChoice) {
			featureChoices.push(techniqueChoice);
		}
	}

	// Add spell school choices if applicable
	const spellSchoolChoices = extractSpellSchoolChoices(classFeatures);
	featureChoices.push(...spellSchoolChoices);

	return {
		className: classFeatures.className,
		level1Features,
		featureChoices,
		startingEquipment: classFeatures.startingEquipment,
		martialPath: classFeatures.martialPath,
		spellcastingPath: classFeatures.spellcastingPath
	};
}

/**
 * Get choices for Step 2 (Features) - EXCLUDES spell and maneuver choices
 * Spell and maneuver choices are handled in later dedicated steps
 */
export function getStep2FeatureChoices(
	className: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	levelData?: any
): FormattedFeatureChoice[] {
	const classFeatures = findClassByName(className);

	if (!classFeatures) {
		return [];
	}

	const level1Features = getLevel1Features(classFeatures);
	const featureChoices: FormattedFeatureChoice[] = [];

	// Extract choices from level 1 features (excludes spell/maneuver related)
	level1Features.forEach((feature) => {
		const choices = extractFeatureChoices(classFeatures, feature);
		featureChoices.push(...choices);
	});

	// Add technique choices if applicable (techniques are chosen in Step 2)
	if (levelData) {
		const techniqueChoice = extractTechniqueChoices(classFeatures, levelData);
		if (techniqueChoice) {
			featureChoices.push(techniqueChoice);
		}
	}

	// EXCLUDE spell school choices - they go to Spells step (later)
	// EXCLUDE maneuver choices - they go to Maneuvers step (later)

	return featureChoices;
}

/**
 * Extract feature grants from level 1 features
 * Returns structured data about what the character gets from their class features
 */
export interface FeatureGrants {
	techniques: number; // Bonus techniques granted
	maneuvers: number; // Bonus maneuvers granted
	spells: number; // Bonus spells granted
	abilities: string[]; // Passive abilities (e.g., "technique_master", "berserker_defense")
}

export function extractFeatureGrants(className: string): FeatureGrants {
	const classFeatures = findClassByName(className);
	const grants: FeatureGrants = {
		techniques: 0,
		maneuvers: 0,
		spells: 0,
		abilities: []
	};

	if (!classFeatures) {
		return grants;
	}

	const level1Features = getLevel1Features(classFeatures);

	level1Features.forEach((feature) => {
		// Process benefit effects (where GRANT_CHOICE and GRANT_ABILITY live)
		if (feature.benefits) {
			feature.benefits.forEach((benefit) => {
				if (benefit.effects) {
					benefit.effects.forEach((effect) => {
						if (effect.type === 'GRANT_CHOICE') {
							if (effect.target === 'technique') {
								grants.techniques += (effect.value as number) || 0;
							} else if (effect.target === 'maneuver') {
								grants.maneuvers += (effect.value as number) || 0;
							} else if (effect.target === 'spell' || effect.target === 'any_spell_list') {
								grants.spells += (effect.value as number) || 0;
							}
						} else if (effect.type === 'GRANT_ABILITY') {
							if (effect.target && !grants.abilities.includes(effect.target)) {
								grants.abilities.push(effect.target);
							}
						}
					});
				}
			});
		}
	});

	return grants;
}
