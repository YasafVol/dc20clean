/**
 * @file class-features.loader.ts
 * @description Loader for the new class features JSON structure
 */

import { SpellSchool, SpellList } from '../spells-data/types/spell.types';

// Define interfaces for the new class features structure
export interface ClassFeatureChoice {
	prompt: string;
	count: number;
	options?: {
		name: string;
		description: string;
	}[];
}

export interface ClassFeatureBenefit {
	name: string;
	description: string;
	effects?: {
		type: string;
		target?: string;
		value?: any;
		condition?: string;
	}[];
}

export interface ClassFeature {
	featureName: string;
	levelGained: number;
	description: string;
	isFlavor?: boolean;
	choices?: ClassFeatureChoice[];
	benefits?: ClassFeatureBenefit[];
}

export interface ClassSubclass {
	subclassName: string;
	description?: string;
	features: ClassFeature[];
}

export interface ClassDefinition {
	className: string;
	startingEquipment?: {
		weaponsOrShields?: string[];
		rangedWeapon?: string;
		alternativeWeapons?: string;
		armor?: string;
		packs?: string;
	};
	martialPath?: {
		combatTraining?: {
			weapons?: string[];
			armor?: string[];
			shields?: string[];
		};
		maneuvers?: {
			learnsAllAttack?: boolean;
			additionalKnown?: string;
		};
		techniques?: {
			additionalKnown?: string;
		};
		staminaPoints?: {
			maximumIncreasesBy?: string;
		};
		staminaRegen?: {
			description?: string;
			conditions?: string[];
		};
	};
	spellcastingPath?: {
		combatTraining?: {
			armor?: string[];
			shields?: string[];
		};
		spellList?: {
			type?: 'specific' | 'schools' | 'any' | 'all_schools';
			listName?: string;
			specificSchools?: SpellSchool[];
			spellTags?: string[];
			schoolCount?: number; // For classes that choose X schools
			description?: string;
			betaNote?: string;
		};
		cantrips?: {
			knownIncreasesBy?: string;
			description?: string;
		};
		spells?: {
			knownIncreasesBy?: string;
			description?: string;
		};
		manaPoints?: {
			maximumIncreasesBy?: string;
		};
	};
	coreFeatures: ClassFeature[];
	subclasses: ClassSubclass[];
}

// Import all the new schema class definitions
import { barbarianClass } from '../_new_schema/barbarian_features';
import { clericClass } from '../_new_schema/cleric_features';
import { hunterClass } from '../_new_schema/hunter_features';
import { championClass } from '../_new_schema/champion_features';
import { wizardClass } from '../_new_schema/wizard_features';
import { monkClass } from '../_new_schema/monk_features';
import { rogueClass } from '../_new_schema/rogue_features';
import { sorcererClass } from '../_new_schema/sorcerer_features';
import { spellbladeClass } from '../_new_schema/spellblade_features';
import { warlockClass } from '../_new_schema/warlock_features';
import { bardClass } from '../_new_schema/bard_features';
import { druidClass } from '../_new_schema/druid_features';
import { commanderClass } from '../_new_schema/commander_features';
import { psionClass } from '../_new_schema/psion_features';

// Use the new schema class definitions
const rawClassFeatures = [
	barbarianClass,
	clericClass,
	hunterClass,
	championClass,
	wizardClass,
	monkClass,
	rogueClass,
	sorcererClass,
	spellbladeClass,
	warlockClass,
	bardClass,
	druidClass,
	commanderClass,
	psionClass
];

// Debug logging
console.log('🔍 Class Features Debug:', {
	totalClasses: rawClassFeatures.length,
	classNames: rawClassFeatures.map(c => c?.className || 'undefined')
});

// Export the class features data
export const classFeaturesData: ClassDefinition[] = rawClassFeatures;

// Helper function to get available spell schools for a class
export function getAvailableSpellSchools(classData: ClassDefinition): SpellSchool[] {
	const spellList = classData.spellcastingPath?.spellList;
	if (!spellList) return [];

	switch (spellList.type) {
		case 'all_schools':
			// Return all schools from the enum
			return Object.values(SpellSchool);
		case 'schools':
			// Return specific schools
			return spellList.specificSchools || [];
		default:
			return [];
	}
}

// Helper function to find a class by name
export function findClassByName(className: string): ClassDefinition | undefined {
	console.log('🔍 findClassByName called with:', className);
	console.log('🔍 Available classes:', classFeaturesData.map(c => c.className));
	const result = classFeaturesData.find((cls) => 
		cls.className.toLowerCase() === className.toLowerCase()
	);
	console.log('🔍 findClassByName result:', result ? 'found' : 'not found');
	return result;
}

// Helper function to find a specific feature in a class
export function findFeatureInClass(
	className: string,
	featureName: string
): ClassFeature | undefined {
	const classData = findClassByName(className);
	if (!classData) return undefined;

	return classData.coreFeatures.find((feature) => feature.featureName === featureName);
}

// Helper function to find a choice option in a feature
export function findChoiceOption(
	className: string,
	featureName: string,
	choiceIndex: number,
	optionName: string
): { name: string; description: string } | undefined {
	const feature = findFeatureInClass(className, featureName);
	if (!feature?.choices?.[choiceIndex]?.options) return undefined;

	return feature.choices[choiceIndex].options.find((option) => option.name === optionName);
}

// Generic function to extract class-specific display information
export function getClassSpecificInfo(
	className: string,
	selectedFeatureChoices?: Record<string, string>
): { displayInfo: { label: string; value: string }[] } {
	const displayInfo: { label: string; value: string }[] = [];

	if (!selectedFeatureChoices) {
		return { displayInfo };
	}

	try {
		const selectedChoices: { [key: string]: string } = selectedFeatureChoices;
		const classData = findClassByName(className);

		if (!classData) {
			return { displayInfo };
		}

		// Process each core feature that has choices
		classData.coreFeatures.forEach((feature) => {
			if (feature.choices) {
				feature.choices.forEach((choice, choiceIndex) => {
					// Create a mapping for legacy choice IDs based on class and feature
					const legacyChoiceId = getLegacyChoiceId(className, feature.featureName, choiceIndex);
					const selectedValue = selectedChoices[legacyChoiceId];

					if (selectedValue && choice.options) {
						if (choice.count > 1) {
							// Handle multiple selections
							let selectedValues: string[] = [];
							try {
								// Try parsing as JSON array first
								selectedValues = JSON.parse(selectedValue);
							} catch (error) {
								// If not JSON, try comma-separated string
								if (selectedValue.includes(',')) {
									selectedValues = selectedValue.split(',').map((s: string) => s.trim());
								} else {
									// Single value that failed JSON parse
									selectedValues = [selectedValue];
								}
							}
							
							if (selectedValues.length > 0) {
								const label = getDisplayLabel(className, feature.featureName, choiceIndex);
								displayInfo.push({
									label,
									value: selectedValues.join(', ')
								});
							}
						} else {
							// Handle single selections
							const label = getDisplayLabel(className, feature.featureName, choiceIndex);
							displayInfo.push({
								label,
								value: selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)
							});
						}
					}
				});
			}

			// Also check for benefits that might have user choices (like Divine Damage)
			if (feature.benefits) {
				feature.benefits.forEach((benefit) => {
					const legacyBenefitId = getLegacyBenefitId(className, feature.featureName, benefit.name);
					const selectedValue = selectedChoices[legacyBenefitId];

					if (selectedValue) {
						displayInfo.push({
							label: benefit.name,
							value: selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)
						});
					}
				});
			}
		});
	} catch (error) {
		console.error('Error parsing selected feature choices:', error);
	}

	return { displayInfo };
}

// Helper function to map class/feature combinations to legacy choice IDs
export function getLegacyChoiceId(
	className: string,
	featureName: string,
	choiceIndex: number
): string {
	// Generic mapping: className_featureName_choiceIndex
	return `${className.toLowerCase()}_${featureName.toLowerCase().replace(/\s+/g, '_')}_${choiceIndex}`;
}

// Helper function to map class/feature combinations to legacy benefit IDs
export function getLegacyBenefitId(
	className: string,
	featureName: string,
	benefitName: string
): string {
	// Generic mapping: className_featureName_benefitName
	return `${className.toLowerCase()}_${featureName.toLowerCase().replace(/\s+/g, '_')}_${benefitName.toLowerCase().replace(/\s+/g, '_')}`;
}

// Helper function to get display labels for different choice types
export function getDisplayLabel(
	_className: string,
	featureName: string,
	_choiceIndex: number
): string {
	// Generic: just use the feature name as the label
	return featureName;
}
