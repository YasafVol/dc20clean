/**
 * New Character Calculator using the unified Effect system
 * 
 * This is a complete rewrite of the character calculator that eliminates
 * text parsing and instead processes structured Effect objects.
 */

import { processEffects, aggregateEffectsFromSources } from './effectProcessor';
import { traitsData } from '../../rulesdata/_new_schema/traits';
import { ancestriesData } from '../../rulesdata/_new_schema/ancestries';
import { barbarianClass } from '../../rulesdata/_new_schema/barbarian_features';
import type { 
	Effect, 
	EffectProcessingResult,
	ClassDefinition 
} from '../../rulesdata/schemas/character.schema';

export interface CharacterBuildData {
	// Core Info
	id: string;
	finalName: string;
	finalPlayerName?: string;
	level: number;

	// Attributes (from point buy)
	attribute_might: number;
	attribute_agility: number;
	attribute_charisma: number;
	attribute_intelligence: number;

	// Progression
	combatMastery: number;

	// Class & Ancestry
	classId: string;
	ancestry1Id?: string;
	ancestry2Id?: string;

	// Selections
	selectedTraitIds: string[];
	featureChoices: Record<string, any>; // User choices for effects that require them
	
	// Manual Overrides
	manualPD?: number;
	manualAD?: number;
	manualPDR?: number;
}

export interface CalculatedCharacterStats {
	// Basic Info
	id: string;
	finalName: string;
	finalPlayerName?: string;
	finalLevel: number;

	// Final Attributes (base + modifiers)
	finalMight: number;
	finalAgility: number;
	finalCharisma: number;
	finalIntelligence: number;

	// Calculated Stats
	finalPrimeModifierValue: number;
	finalPrimeModifierAttribute: string;
	finalCombatMastery: number;

	// Saves (Attribute + Combat Mastery)
	finalSaveMight: number;
	finalSaveAgility: number;
	finalSaveCharisma: number;
	finalSaveIntelligence: number;

	// Health & Resources
	finalHPMax: number;
	finalSPMax: number;
	finalMPMax: number;

	// Defenses
	finalPD: number;
	finalAD: number;
	finalPDR: number;

	// Other Stats
	finalSaveDC: number;
	finalDeathThreshold: number;
	finalMoveSpeed: number;
	finalJumpDistance: number;
	finalRestPoints: number;
	finalGritPoints: number;
	finalInitiativeBonus: number;

	// Class & Ancestry Info
	classId: string;
	ancestry1Name?: string;
	ancestry2Name?: string;

	// Features and Abilities (for display)
	grantedAbilities: Array<{
		name: string;
		description: string;
		source: string;
		type: 'passive' | 'active' | 'resistance' | 'advantage';
	}>;

	// Conditional effects for UI to handle
	conditionalModifiers: Array<{
		effect: Effect;
		condition: string;
		description: string;
	}>;

	// Combat training
	combatTraining: string[];
}

/**
 * Step 1: Data Aggregation - Collect all Effect objects
 */
function aggregateAllEffects(buildData: CharacterBuildData): Effect[] {
	const allEffects: Effect[] = [];

	// Collect effects from selected traits
	for (const traitId of buildData.selectedTraitIds) {
		const trait = traitsData.find(t => t.id === traitId);
		if (trait?.effects) {
			allEffects.push(...trait.effects);
		}
	}

	// Collect effects from ancestry default traits
	if (buildData.ancestry1Id) {
		const ancestry = ancestriesData.find(a => a.id === buildData.ancestry1Id);
		if (ancestry?.defaultTraitIds) {
			for (const traitId of ancestry.defaultTraitIds) {
				const trait = traitsData.find(t => t.id === traitId);
				if (trait?.effects) {
					allEffects.push(...trait.effects);
				}
			}
		}
	}

	// Collect effects from class features
	const classData = getClassData(buildData.classId);
	if (classData) {
		for (const feature of classData.coreFeatures) {
			// Direct feature effects
			if (feature.effects) {
				allEffects.push(...feature.effects);
			}

			// Benefits within features
			if (feature.benefits) {
				for (const benefit of feature.benefits) {
					if (benefit.effects) {
						allEffects.push(...benefit.effects);
					}
				}
			}

			// Chosen options from feature choices
			if (feature.choices) {
				for (const choice of feature.choices) {
					const userChoice = buildData.featureChoices[choice.id];
					if (userChoice) {
						// Find the selected option(s) and add their effects
						for (const option of choice.options) {
							if (userChoice === option.name || 
								(Array.isArray(userChoice) && userChoice.includes(option.name))) {
								if (option.effects) {
									allEffects.push(...option.effects);
								}
							}
						}
					}
				}
			}
		}
	}

	return allEffects;
}

/**
 * Step 2: Get class data (simplified for demo - would be more robust in production)
 */
function getClassData(classId: string): ClassDefinition | null {
	if (classId === 'barbarian') {
		return barbarianClass;
	}
	// Add other classes as they are migrated
	return null;
}

/**
 * Step 3: Calculate final character stats
 */
export function calculateCharacterStats(buildData: CharacterBuildData): CalculatedCharacterStats {
	
	// Step 1: Aggregate all effects
	const allEffects = aggregateAllEffects(buildData);
	
	// Step 2: Process effects through the engine
	const processed = processEffects(allEffects, buildData.featureChoices);
	
	// Step 3: Calculate final attributes (base + modifiers)
	const finalMight = buildData.attribute_might + processed.statModifiers.might;
	const finalAgility = buildData.attribute_agility + processed.statModifiers.agility;
	const finalCharisma = buildData.attribute_charisma + processed.statModifiers.charisma;
	const finalIntelligence = buildData.attribute_intelligence + processed.statModifiers.intelligence;
	
	// Step 4: Calculate prime modifier
	const attributeValues = { finalMight, finalAgility, finalCharisma, finalIntelligence };
	const maxValue = Math.max(...Object.values(attributeValues));
	const primeAttribute = Object.keys(attributeValues).find(
		key => attributeValues[key as keyof typeof attributeValues] === maxValue
	)!.replace('final', '').toLowerCase();
	
	// Step 5: Get class base stats
	const classData = getClassData(buildData.classId);
	const baseHP = classData?.startingStats.hp || 0;
	const baseSP = classData?.startingStats.sp || 0;
	const baseMP = classData?.startingStats.mp || 0;
	
	// Step 6: Calculate derived stats using DC20 formulas
	const combatMastery = buildData.combatMastery;
	
	// Health & Resources
	const finalHPMax = baseHP + finalMight + (buildData.level - 1) + processed.statModifiers.hpMax;
	const finalSPMax = baseSP + finalAgility + processed.statModifiers.spMax;
	const finalMPMax = baseMP + finalIntelligence + processed.statModifiers.mpMax;
	
	// Defenses
	const basePD = 8 + combatMastery + finalAgility + finalIntelligence;
	const baseAD = 8 + combatMastery + finalMight + finalCharisma;
	const finalPD = buildData.manualPD ?? (basePD + processed.statModifiers.pd);
	const finalAD = buildData.manualAD ?? (baseAD + processed.statModifiers.ad);
	const finalPDR = buildData.manualPDR ?? processed.statModifiers.pdr;
	
	// Saves
	const finalSaveMight = finalMight + combatMastery;
	const finalSaveAgility = finalAgility + combatMastery;
	const finalSaveCharisma = finalCharisma + combatMastery;
	const finalSaveIntelligence = finalIntelligence + combatMastery;
	
	// Other derived stats
	const finalSaveDC = 8 + combatMastery + maxValue + processed.statModifiers.saveDC;
	const finalDeathThreshold = 10 + processed.statModifiers.deathThresholdModifier;
	const finalMoveSpeed = 5 + processed.statModifiers.moveSpeed; // Base 5 spaces in DC20
	const finalJumpDistance = Math.floor(finalAgility / 2) + processed.statModifiers.jumpDistance;
	const finalRestPoints = 4 + processed.statModifiers.restPoints;
	const finalGritPoints = 2 + Math.floor(finalCharisma / 2) + processed.statModifiers.gritPoints;
	const finalInitiativeBonus = finalAgility + processed.statModifiers.initiativeBonus;

	// Get ancestry names for display
	const ancestry1Name = buildData.ancestry1Id ? 
		ancestriesData.find(a => a.id === buildData.ancestry1Id)?.name : undefined;
	const ancestry2Name = buildData.ancestry2Id ? 
		ancestriesData.find(a => a.id === buildData.ancestry2Id)?.name : undefined;

	return {
		// Basic Info
		id: buildData.id,
		finalName: buildData.finalName,
		finalPlayerName: buildData.finalPlayerName,
		finalLevel: buildData.level,

		// Final Attributes
		finalMight,
		finalAgility,
		finalCharisma,
		finalIntelligence,

		// Calculated Stats
		finalPrimeModifierValue: maxValue,
		finalPrimeModifierAttribute: primeAttribute,
		finalCombatMastery: combatMastery,

		// Saves
		finalSaveMight,
		finalSaveAgility,
		finalSaveCharisma,
		finalSaveIntelligence,

		// Health & Resources
		finalHPMax,
		finalSPMax,
		finalMPMax,

		// Defenses
		finalPD,
		finalAD,
		finalPDR,

		// Other Stats
		finalSaveDC,
		finalDeathThreshold,
		finalMoveSpeed,
		finalJumpDistance,
		finalRestPoints,
		finalGritPoints,
		finalInitiativeBonus,

		// Class & Ancestry Info
		classId: buildData.classId,
		ancestry1Name,
		ancestry2Name,

		// Features and Abilities
		grantedAbilities: processed.grantedAbilities,
		conditionalModifiers: processed.conditionalModifiers,
		combatTraining: processed.combatTraining
	};
}
