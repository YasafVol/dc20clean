/**
 * Enhanced Character Calculator with Effect Attribution
 *
 * This is the unified calculation engine that provides detailed breakdowns
 * for tooltips and real-time validation for the UI.
 */

import type {
	EnhancedCalculationResult,
	EnhancedCharacterBuildData,
	AttributedEffect,
	EnhancedStatBreakdown,
	ValidationResult,
	ValidationError,
	AttributeLimit,
	UnresolvedChoice,
	ChoiceOption,
	TraitChoiceStorage
} from '../types/effectSystem';
import {
	type ModifyMasteryCapEffect,
	type IncreaseMasteryCapEffect
} from '../rulesdata/schemas/character.schema';
import { resolveClassProgression } from '../rulesdata/classes-data/classProgressionResolver';
import { classesData } from '../rulesdata/loaders/class.loader';
import { findTalentById } from '../rulesdata/classes-data/talents/talent.loader';
import { getLevelCaps, MASTERY_TIERS, getMasteryTierByNumber } from '../rulesdata/progression/levelCaps';

import { BuildStep } from '../types/effectSystem';
import { getLegacyChoiceId } from '../rulesdata/loaders/class-features.loader';
import { traitsData } from '../rulesdata/ancestries/traits';
import { ancestriesData } from '../rulesdata/ancestries/ancestries';
import { barbarianClass } from '../rulesdata/classes-data/features/barbarian_features';
import { clericClass } from '../rulesdata/classes-data/features/cleric_features';
import { hunterClass } from '../rulesdata/classes-data/features/hunter_features';
import { championClass } from '../rulesdata/classes-data/features/champion_features';
import { wizardClass } from '../rulesdata/classes-data/features/wizard_features';
import { monkClass } from '../rulesdata/classes-data/features/monk_features';
import { rogueClass } from '../rulesdata/classes-data/features/rogue_features';
import { sorcererClass } from '../rulesdata/classes-data/features/sorcerer_features';
import { spellbladeClass } from '../rulesdata/classes-data/features/spellblade_features';
import { warlockClass } from '../rulesdata/classes-data/features/warlock_features';
import { bardClass } from '../rulesdata/classes-data/features/bard_features';
import { druidClass } from '../rulesdata/classes-data/features/druid_features';
import { commanderClass } from '../rulesdata/classes-data/features/commander_features';
import { psionClass } from '../rulesdata/classes-data/features/psion_features';

import barbarianTable from '../rulesdata/classes-data/tables/barbarian_table.json';
import clericTable from '../rulesdata/classes-data/tables/cleric_table.json';
import hunterTable from '../rulesdata/classes-data/tables/hunter_table.json';
import championTable from '../rulesdata/classes-data/tables/champion_table.json';
import wizardTable from '../rulesdata/classes-data/tables/wizard_table.json';
import monkTable from '../rulesdata/classes-data/tables/monk_table.json';
import rogueTable from '../rulesdata/classes-data/tables/rogue_table.json';
import sorcererTable from '../rulesdata/classes-data/tables/sorcerer_table.json';
import spellbladeTable from '../rulesdata/classes-data/tables/spellblade_table.json';
import warlockTable from '../rulesdata/classes-data/tables/warlock_table.json';
import bardTable from '../rulesdata/classes-data/tables/bard_table.json';
import druidTable from '../rulesdata/classes-data/tables/druid_table.json';
import commanderTable from '../rulesdata/classes-data/tables/commander_table.json';
import psionTable from '../rulesdata/classes-data/tables/psion_table.json';
import { attributesData } from '../rulesdata/attributes';
import { skillsData } from '../rulesdata/skills';
import { tradesData } from '../rulesdata/trades';
import type { ClassDefinition } from '../rulesdata/schemas/character.schema';
import { CHARACTER_PATHS } from '../rulesdata/paths/paths.data';

/**
 * Convert character context data to enhanced build data
 */
export function convertToEnhancedBuildData(contextData: any): EnhancedCharacterBuildData {
	return {
		id: contextData.id || '',
		finalName: contextData.finalName || '',
		finalPlayerName: contextData.finalPlayerName,
		level: contextData.level || 1,

		// Use final* if present, else attribute_* (for character creation)
		attribute_might: contextData.finalMight ?? contextData.attribute_might ?? 0,
		attribute_agility: contextData.finalAgility ?? contextData.attribute_agility ?? 0,
		attribute_charisma: contextData.finalCharisma ?? contextData.attribute_charisma ?? 0,
		attribute_intelligence:
			contextData.finalIntelligence ?? contextData.attribute_intelligence ?? 0,

		// combatMastery is calculated in calculateCharacterWithBreakdowns, not stored
		combatMastery: 0, // Will be overridden by calculation

		classId: contextData.classId || '',
		ancestry1Id: contextData.ancestry1Id || undefined,
		ancestry2Id: contextData.ancestry2Id || undefined,

	selectedTraitIds: Array.isArray(contextData.selectedTraitIds)
		? contextData.selectedTraitIds
		: [],
	selectedTraitChoices: contextData.selectedTraitChoices ?? {},
	featureChoices: contextData.selectedFeatureChoices ?? {},
	selectedTalents: contextData.selectedTalents && typeof contextData.selectedTalents === 'object'
		? contextData.selectedTalents
		: {},

		// Pass data as native objects, removing the unnecessary stringify step
		skillsData: contextData.skillsData ?? {},
		tradesData: contextData.tradesData ?? {},
		// Default Common to fluent when empty to match current UI assumptions
		languagesData: contextData.languagesData ?? { common: { fluency: 'fluent' } },

		// Optional manual overrides supported by the engine
		manualPD: contextData.manualPD,
		manualAD: contextData.manualAD,
		manualPDR: contextData.manualPDR,

		// Conversions between point pools (for Background step)
		conversions: {
			skillToTrade: contextData.skillToTradeConversions ?? 0,
			tradeToSkill: contextData.tradeToSkillConversions ?? 0,
			tradeToLanguage: contextData.tradeToLanguageConversions ?? 0
		},

		lastModified: Date.now()
	};
}

/**
 * Get class level progression data by ID
 */
function getClassProgressionData(classId: string): any | null {
	// Use the new classesData which includes the gains field
	const classData = classesData.find(c => c.id === classId);
	if (classData) {
		return classData;
	}
	
	// Fallback to old table data (should not be needed)
	switch (classId) {
		case 'barbarian':
			return barbarianTable;
		case 'cleric':
			return clericTable;
		case 'hunter':
			return hunterTable;
		case 'champion':
			return championTable;
		case 'wizard':
			return wizardTable;
		case 'monk':
			return monkTable;
		case 'rogue':
			return rogueTable;
		case 'sorcerer':
			return sorcererTable;
		case 'spellblade':
			return spellbladeTable;
		case 'warlock':
			return warlockTable;
		case 'bard':
			return bardTable;
		case 'druid':
			return druidTable;
		case 'commander':
			return commanderTable;
		case 'psion':
			return psionTable;
		default:
			return null;
	}
}

/**
 * Get class features by ID (for abilities)
 */
function getClassFeatures(classId: string): ClassDefinition | null {
	switch (classId) {
		case 'barbarian':
			return barbarianClass;
		case 'cleric':
			return clericClass;
		case 'hunter':
			return hunterClass;
		case 'champion':
			return championClass;
		case 'wizard':
			return wizardClass;
		case 'monk':
			return monkClass;
		case 'rogue':
			return rogueClass;
		case 'sorcerer':
			return sorcererClass;
		case 'spellblade':
			return spellbladeClass;
		case 'warlock':
			return warlockClass;
		case 'bard':
			return bardClass;
		case 'druid':
			return druidClass;
		case 'commander':
			return commanderClass;
		case 'psion':
			return psionClass;
		default:
			return null;
	}
}

/**
 * Aggregate all effects with source attribution
 */
function aggregateAttributedEffects(buildData: EnhancedCharacterBuildData): AttributedEffect[] {
	const effects: AttributedEffect[] = [];

	// Add effects from selected traits
	for (const traitId of buildData.selectedTraitIds) {
		const trait = traitsData.find((t) => t.id === traitId);
		if (trait?.effects) {
			for (const [effectIndex, effect] of trait.effects.entries()) {
				effects.push({
					...effect,
					source: {
						type: 'trait',
						id: traitId,
						name: trait.name,
						description: trait.description,
						category: 'Selected Trait'
					},
					resolved: !effect.userChoice,
					dependsOnChoice: effect.userChoice ? `${traitId}-${effectIndex}` : undefined
				});
			}
		}
	}

	// Add effects from selected talents (count-based: apply effects multiple times)
	const selectedTalents = buildData.selectedTalents || {};
	for (const [talentId, count] of Object.entries(selectedTalents)) {
		const talent = findTalentById(talentId);
		if (talent?.effects && count > 0) {
			// Apply talent effects 'count' times (e.g., if selected twice, add effects twice)
			for (let i = 0; i < count; i++) {
				for (const effect of talent.effects) {
					effects.push({
						...effect,
						source: {
							type: 'talent' as const,
							id: talentId,
							name: talent.name,
							description: talent.description,
							category: 'Talent'
						},
						resolved: true
					});
				}
			}
		}
	}

	// Add effects from class features
	const classFeatures = getClassFeatures(buildData.classId);
	if (classFeatures) {
		for (const feature of classFeatures.coreFeatures) {
			// Direct feature effects
			if (feature.effects) {
				for (const effect of feature.effects) {
					effects.push({
						...effect,
						source: {
							type: 'class_feature',
							id: feature.featureName,
							name: feature.featureName,
							description: feature.description,
							category: `${classFeatures.className} Level ${feature.levelGained}`
						},
						resolved: true
					});
				}
			}

			// Benefits within features
			if (feature.benefits) {
				for (const benefit of feature.benefits) {
					if (benefit.effects) {
						for (const effect of benefit.effects) {
							effects.push({
								...effect,
								source: {
									type: 'class_feature',
									id: `${feature.featureName}_${benefit.name}`,
									name: benefit.name,
									description: benefit.description,
									category: `${classFeatures.className} Level ${feature.levelGained}`
								},
								resolved: true
							});
						}
					}
				}
			}

			// Chosen options from feature choices
			if (feature.choices) {
				for (let choiceIndex = 0; choiceIndex < feature.choices.length; choiceIndex++) {
					const choice = feature.choices[choiceIndex];
					// Prefer canonical choice.id, but accept legacy UI key as fallback
					const legacyKey = getLegacyChoiceId(
						classFeatures.className,
						feature.featureName,
						choiceIndex
					);
					const userChoice =
						(buildData as any).featureChoices?.[choice.id] ??
						(buildData as any).featureChoices?.[legacyKey];
					if (userChoice) {
						for (const option of choice.options) {
							const isSelected =
								userChoice === option.name ||
								(Array.isArray(userChoice) && userChoice.includes(option.name));
							if (isSelected) {
								if (option.effects) {
									for (const effect of option.effects) {
										effects.push({
											...effect,
											source: {
												type: 'choice',
												id: `${choice.id}_${option.name}`,
												name: option.name,
												description: option.description,
												category: `${classFeatures.className} Choice`
											},
											resolved: true
										});
									}
								}
							}
						}
					}
				}
			}
		}
	}

	return effects;
}

/**
 * Resolve user choices in effects
 */
function resolveEffectChoices(
	effects: AttributedEffect[],
	choices: TraitChoiceStorage
): AttributedEffect[] {
	return effects.map((effect) => {
		if (!effect.userChoice || !effect.dependsOnChoice) {
			return effect;
		}

		const chosenValue = choices[effect.dependsOnChoice];
		if (!chosenValue) {
			return effect; // Unresolved
		}

		// Resolve the choice
		const resolvedEffect = { ...effect };
		if (effect.target === 'any_attribute' && effect.type === 'MODIFY_ATTRIBUTE') {
			resolvedEffect.target = chosenValue;
			resolvedEffect.resolved = true;
			resolvedEffect.resolvedValue = chosenValue;
		} else if (effect.target === 'any_skill' && effect.type === 'GRANT_SKILL_EXPERTISE') {
			resolvedEffect.target = chosenValue;
			resolvedEffect.resolved = true;
			resolvedEffect.resolvedValue = chosenValue;
		} else if (effect.target === 'any_trade' && effect.type === 'GRANT_TRADE_EXPERTISE') {
			resolvedEffect.target = chosenValue;
			resolvedEffect.resolved = true;
			resolvedEffect.resolvedValue = chosenValue;
		}

		return resolvedEffect;
	});
}

/**
 * Create detailed stat breakdown
 */
function createStatBreakdown(
	statName: string,
	baseValue: number,
	effects: AttributedEffect[]
): EnhancedStatBreakdown {
	const relevantEffects = effects.filter((effect) => {
		if (!effect.resolved) return false;

		// Map effect types to stat names
		if (effect.type === 'MODIFY_ATTRIBUTE') {
			return statName === `attribute_${effect.target}` || statName === effect.target;
		}
		if (effect.type === 'MODIFY_STAT') {
			return statName === effect.target;
		}

		return false;
	});

	const breakdown: EnhancedStatBreakdown = {
		statName,
		base: baseValue,
		effects: relevantEffects.map((effect) => ({
			source: effect.source,
			value: effect.value as number,
			condition: effect.condition,
			description: `${effect.source.name}: ${effect.value > 0 ? '+' : ''}${effect.value}${effect.condition ? ` (${effect.condition})` : ''}`,
			isActive: !effect.condition // For now, assume conditional effects are not active
		})),
		total:
			baseValue +
			relevantEffects.reduce((sum, effect) => {
				if (!effect.condition) {
					// Only count non-conditional effects in total
					return sum + (effect.value as number);
				}
				return sum;
			}, 0)
	};

	// Calculate conditional total
	breakdown.conditionalTotal =
		baseValue +
		relevantEffects.reduce((sum, effect) => {
			return sum + (effect.value as number);
		}, 0);

	return breakdown;
}

/**
 * Validate attribute limits
 */
function validateAttributeLimits(
	buildData: EnhancedCharacterBuildData,
	effects: AttributedEffect[]
): Record<string, AttributeLimit> {
	const limits: Record<string, AttributeLimit> = {};
	const levelCaps = getLevelCaps(buildData.level);

	for (const attr of attributesData) {
		const baseValue = (buildData as any)[`attribute_${attr.id}`] || 0;
		const traitBonuses = effects
			.filter(
				(effect) =>
					effect.resolved && effect.type === 'MODIFY_ATTRIBUTE' && effect.target === attr.id
			)
			.reduce((sum, effect) => sum + (effect.value as number), 0);

		const current = baseValue + traitBonuses;
		const max = levelCaps.maxAttributeValue;

		limits[attr.id] = {
			current,
			base: baseValue,
			traitBonuses,
			max,
			exceeded: current > max,
			canIncrease: baseValue + traitBonuses + 1 <= max, // Fixed: Check if base can be increased without total exceeding max
			canDecrease: baseValue > -2
		};
	}

	return limits;
}

/**
 * Get unresolved choices for character creation UI
 */
function getUnresolvedChoices(effects: AttributedEffect[]): UnresolvedChoice[] {
	return effects
		.filter((effect) => effect.userChoice && !effect.resolved)
		.map((effect) => {
			const options = getOptionsForEffect(effect);

			return {
				traitId: effect.source.id,
				traitName: effect.source.name,
				effectIndex: 0, // Would need to track this properly
				effect,
				prompt: effect.userChoice!.prompt,
				options,
				isRequired: true
			};
		});
}

/**
 * Get choice options for an effect
 */
function getOptionsForEffect(effect: AttributedEffect): ChoiceOption[] {
	const baseOptions = effect.userChoice?.options || [];

	if (effect.type === 'MODIFY_ATTRIBUTE' && baseOptions.length === 0) {
		return attributesData.map((attr) => ({
			value: attr.id,
			displayName: attr.name,
			description: attr.description,
			isValid: true // Would need proper validation
		}));
	}

	if (effect.type === 'GRANT_SKILL_EXPERTISE' && baseOptions.length === 0) {
		return skillsData.map((skill) => ({
			value: skill.id,
			displayName: skill.name,
			description: skill.description,
			isValid: true
		}));
	}

	if (effect.type === 'GRANT_TRADE_EXPERTISE' && baseOptions.length === 0) {
		return tradesData.map((trade) => ({
			value: trade.id,
			displayName: trade.name,
			description: trade.description,
			isValid: true
		}));
	}

	return baseOptions.map((option) => ({
		value: option,
		displayName: option,
		isValid: true
	}));
}

/**
 * Aggregate all progression gains from level 1 to target level
 */
function aggregateProgressionGains(
	classProgressionData: any,
	targetLevel: number
): {
	totalHP: number;
	totalSP: number;
	totalMP: number;
	totalSkillPoints: number;
	totalTradePoints: number;
	totalAttributePoints: number;
	totalManeuversKnown: number;
	totalTechniquesKnown: number;
	totalCantripsKnown: number;
	totalSpellsKnown: number;
	totalTalents: number;
	totalPathPoints: number;
	totalAncestryPoints: number;
	unlockedFeatureIds: string[];
	pendingSubclassChoices: number;
} {
	let totalHP = 0;
	let totalSP = 0;
	let totalMP = 0;
	let totalSkillPoints = 0;
	let totalTradePoints = 0;
	let totalAttributePoints = 0;
	let totalManeuversKnown = 0;
	let totalTechniquesKnown = 0;
	let totalCantripsKnown = 0;
	let totalSpellsKnown = 0;
	let totalTalents = 0;
	let totalPathPoints = 0;
	let totalAncestryPoints = 0;
	const unlockedFeatureIds: string[] = [];
	let pendingSubclassChoices = 0;

	if (!classProgressionData?.levelProgression) {
		return {
			totalHP,
			totalSP,
			totalMP,
			totalSkillPoints,
			totalTradePoints,
			totalAttributePoints,
			totalManeuversKnown,
			totalTechniquesKnown,
			totalCantripsKnown,
			totalSpellsKnown,
			totalTalents,
			totalPathPoints,
			totalAncestryPoints,
			unlockedFeatureIds,
			pendingSubclassChoices
		};
	}

	console.log('🔍 AGGREGATION START:', {
		classId: classProgressionData?.id,
		targetLevel,
		hasProgression: !!classProgressionData?.levelProgression,
		progressionLength: classProgressionData?.levelProgression?.length
	});

	for (let level = 1; level <= targetLevel; level++) {
		const levelData = classProgressionData.levelProgression.find((lp: any) => lp.level === level);
		if (!levelData) {
			console.warn(`⚠️ Level ${level} not found in progression!`);
			continue;
		}

		console.log(`📊 Level ${level} data:`, {
			hasGains: !!levelData.gains,
			gains: JSON.stringify(levelData.gains),
			talents: levelData.gains?.talents,
			pathPoints: levelData.gains?.pathPoints
		});

		// Aggregate numeric stats from progression files (gained* fields)
		totalHP += levelData.gainedHealth || levelData.healthPoints || 0;
		totalSP += levelData.gainedStaminaPoints || levelData.staminaPoints || 0;
		totalMP += levelData.gainedManaPoints || levelData.manaPoints || 0;
		totalSkillPoints += levelData.gainedSkillPoints || levelData.skillPoints || 0;
		totalTradePoints += levelData.gainedTradePoints || levelData.tradePoints || 0;
		totalAttributePoints += levelData.gainedAttributePoints || levelData.attributePoints || 0;
		totalManeuversKnown += levelData.gainedManeuversKnown || levelData.maneuversKnown || 0;
		totalTechniquesKnown += levelData.gainedTechniquesKnown || levelData.techniquesKnown || 0;
		totalCantripsKnown += levelData.gainedCantripsKnown || levelData.cantripsKnown || 0;
		totalSpellsKnown += levelData.gainedSpellsKnown || levelData.spellsKnown || 0;

		// Aggregate new structured gains (if present)
		if (levelData.gains) {
			totalTalents += levelData.gains.talents || 0;
			totalPathPoints += levelData.gains.pathPoints || 0;
			totalAncestryPoints += levelData.gains.ancestryPoints || 0;

			if (levelData.gains.classFeatures) {
				unlockedFeatureIds.push(...levelData.gains.classFeatures);
			}

			if (levelData.gains.subclassFeatureChoice) {
				pendingSubclassChoices++;
			}
		}
	}

	console.log('✅ AGGREGATION COMPLETE:', {
		totalTalents,
		totalPathPoints,
		totalSkillPoints,
		totalTradePoints,
		unlockedFeatureIds: unlockedFeatureIds.length
	});

	return {
		totalHP,
		totalSP,
		totalMP,
		totalSkillPoints,
		totalTradePoints,
		totalAttributePoints,
		totalManeuversKnown,
		totalTechniquesKnown,
		totalCantripsKnown,
		totalSpellsKnown,
		totalTalents,
		totalPathPoints,
		totalAncestryPoints,
		unlockedFeatureIds,
		pendingSubclassChoices
	};
}

/**
 * Main calculation function with detailed breakdowns
 */
export function calculateCharacterWithBreakdowns(
	buildData: EnhancedCharacterBuildData
): EnhancedCalculationResult {
	// 1. Aggregate all effects with source attribution
	const rawEffects = aggregateAttributedEffects(buildData);

	// 2. Resolve user choices
	const resolvedEffects = resolveEffectChoices(rawEffects, buildData.selectedTraitChoices);

	// 3. Resolve class progression (budgets + features) - only if class is selected
	let resolvedProgression = null;
	if (buildData.classId) {
		try {
			resolvedProgression = resolveClassProgression(buildData.classId, buildData.level);
		} catch (error) {
			// If class progression fails, continue without it (will use defaults)
			console.warn(`Failed to resolve progression for class ${buildData.classId}:`, error);
		}
	}
	
	// 4. Get legacy class progression data for mana/cantrips/spells (still from tables)
	const classProgressionData = getClassProgressionData(buildData.classId);
	const progressionGains = aggregateProgressionGains(classProgressionData, buildData.level);

	// 4. Create detailed breakdowns
	const breakdowns: Record<string, EnhancedStatBreakdown> = {};

	// Attributes
	for (const attr of attributesData) {
		const baseValue = (buildData as any)[`attribute_${attr.id}`] || 0;
		breakdowns[`attribute_${attr.id}`] = createStatBreakdown(attr.id, baseValue, resolvedEffects);
	}

	// Calculate final attribute values
	const finalMight = breakdowns.attribute_might.total;
	const finalAgility = breakdowns.attribute_agility.total;
	const finalCharisma = breakdowns.attribute_charisma.total;
	const finalIntelligence = breakdowns.attribute_intelligence.total;

	// Derived stats - Combat Mastery calculated from level
	const combatMastery = Math.ceil(buildData.level / 2);

	// Health & Resources - use aggregated progression gains
	let finalHPMax = finalMight + progressionGains.totalHP;
	let finalSPMax = progressionGains.totalSP;
	let finalMPMax = progressionGains.totalMP;

	// Do not apply effect modifiers here; breakdowns will add modifiers to base values

	// Defenses with modifiers
	const basePD = 8 + combatMastery + finalAgility + finalIntelligence;
	const baseAD = 8 + combatMastery + finalMight + finalCharisma;
	const pdModifiers = resolvedEffects
		.filter((e) => e.type === 'MODIFY_STAT' && e.target === 'pd')
		.reduce((sum, e) => sum + (e.value as number), 0);
	const adModifiers = resolvedEffects
		.filter((e) => e.type === 'MODIFY_STAT' && e.target === 'ad')
		.reduce((sum, e) => sum + (e.value as number), 0);
	const finalPD = buildData.manualPD ?? basePD + pdModifiers;
	const finalAD = buildData.manualAD ?? baseAD + adModifiers;
	const finalPDR = buildData.manualPDR ?? 0;

	// Calculate prime attribute first
	const maxValue = Math.max(finalMight, finalAgility, finalCharisma, finalIntelligence);

	// Get all attributes that have the max value for tie-breaking
	const attributesAtMax: string[] = [];
	if (finalMight === maxValue) attributesAtMax.push('might');
	if (finalAgility === maxValue) attributesAtMax.push('agility');
	if (finalCharisma === maxValue) attributesAtMax.push('charisma');
	if (finalIntelligence === maxValue) attributesAtMax.push('intelligence');

	// For tie-breaking, use the priority order: might > agility > charisma > intelligence
	const primeAttribute = attributesAtMax[0] || 'might';

    // Calculate other derived stats first (DC20 sheet: 10 + Combat Mastery + Prime)
    const finalSaveDC = 10 + combatMastery + maxValue;
	const finalSaveMight = finalMight + combatMastery;
	const finalSaveAgility = finalAgility + combatMastery;
	const finalSaveCharisma = finalCharisma + combatMastery;
	const finalSaveIntelligence = finalIntelligence + combatMastery;
	const finalDeathThreshold = maxValue + combatMastery; // Prime + Combat Mastery (usually -4)
	const baseMoveSpeed = 5;
	const baseJumpDistance = finalAgility;
	const finalRestPoints = finalHPMax; // Rest Points = HP
	const finalGritPoints = Math.max(0, 2 + finalCharisma); // 2 + Charisma (minimum 0)
	const finalInitiativeBonus = combatMastery + finalAgility; // Combat Mastery + Agility
	// Attribute points handled via breakdowns to avoid double counting

	// Create breakdowns for derived stats
	breakdowns.hpMax = createStatBreakdown('hpMax', finalHPMax, resolvedEffects);
	breakdowns.spMax = createStatBreakdown('spMax', finalSPMax, resolvedEffects);
	breakdowns.mpMax = createStatBreakdown('mpMax', finalMPMax, resolvedEffects);
	breakdowns.pd = createStatBreakdown('pd', basePD, resolvedEffects);
	breakdowns.ad = createStatBreakdown('ad', baseAD, resolvedEffects);

	// Base 12 + any attribute points gained from leveling
	breakdowns.attributePoints = createStatBreakdown('attributePoints', 12 + progressionGains.totalAttributePoints, resolvedEffects);

	// Movement breakdowns
	breakdowns.move_speed = createStatBreakdown('moveSpeed', baseMoveSpeed, resolvedEffects);
	breakdowns.jump_distance = createStatBreakdown('jumpDistance', baseJumpDistance, resolvedEffects);

	// Use breakdown totals for final values to avoid double counting
	finalHPMax = breakdowns.hpMax.total;
	finalSPMax = breakdowns.spMax.total;
	finalMPMax = breakdowns.mpMax.total;
	const finalMoveSpeed = breakdowns.move_speed.total;
	const finalJumpDistance = breakdowns.jump_distance.total;
	const finalAttributePoints = breakdowns.attributePoints.total;

	// Combat breakdowns
	const attackSpellCheckBase = combatMastery + maxValue;
	breakdowns.attack_spell_check = createStatBreakdown(
		'attackSpellCheck',
		attackSpellCheckBase,
		resolvedEffects
	);
	breakdowns.save_dc = createStatBreakdown('saveDC', finalSaveDC, resolvedEffects);

	// Initiative breakdown - custom breakdown to show Combat Mastery + Agility components
	breakdowns.initiative = {
		statName: 'Initiative',
		base: 0, // No base, it's a pure calculation
		effects: [
			{
				source: { name: 'Combat Mastery', id: 'combatMastery', type: 'base' },
				value: combatMastery,
				description: `Combat Mastery: ${combatMastery}`,
				isActive: true
			},
			{
				source: { name: 'Agility Modifier', id: 'agility', type: 'base' },
				value: finalAgility,
				description: `Agility Modifier: ${finalAgility}`,
				isActive: true
			}
		],
		total: finalInitiativeBonus
	};

	// 4.5. Compute background points (ported from useBackgroundPoints)
	const skills = buildData.skillsData ?? {};
	const trades = buildData.tradesData ?? {};
	const languages = buildData.languagesData ?? { common: { fluency: 'fluent' } };

	const skillPointsUsed = Object.values(skills).reduce((a, b) => a + (b || 0), 0);
	const tradePointsUsed = Object.values(trades).reduce((a, b) => a + (b || 0), 0);
	const languagePointsUsed = Object.entries(languages).reduce(
		(sum, [id, d]) => (id === 'common' ? sum : sum + (d.fluency === 'limited' ? 1 : 2)),
		0
	);

	const bonus = (target: string) =>
		resolvedEffects
			.filter((e) => e.type === 'MODIFY_STAT' && e.target === target)
			.reduce((s, e) => s + Number(e.value || 0), 0);

	// Use aggregated skill/trade points from progression gains + bonuses from effects
	// Base values: 5 skill points, 3 trade points, 2 language points at level 1
	const baseSkillPoints = 5 + progressionGains.totalSkillPoints + finalIntelligence + bonus('skillPoints');
	const baseTradePoints = 3 + progressionGains.totalTradePoints + bonus('tradePoints');
	const baseLanguagePoints = 2 + bonus('languagePoints'); // Languages stay at 2 (not level-dependent)

	const {
		skillToTrade = 0,
		tradeToSkill = 0,
		tradeToLanguage = 0
	} = (buildData as any).conversions || {};

	const availableSkillPoints = baseSkillPoints - skillToTrade + Math.floor(tradeToSkill / 2);
	const availableTradePoints = baseTradePoints - tradeToSkill + skillToTrade * 2 - tradeToLanguage;
	const availableLanguagePoints = baseLanguagePoints + tradeToLanguage * 2;

	// Calculate ancestry points
	const selectedTraitCosts = buildData.selectedTraitIds.reduce((total, traitId) => {
		const trait = traitsData.find((t) => t.id === traitId);
		return total + (trait?.cost || 0);
	}, 0);

	const baseAncestryPoints = 5 + bonus('ancestryPoints'); // Base 5 + any bonuses from effects
	const ancestryPointsUsed = selectedTraitCosts;
	const ancestryPointsRemaining = baseAncestryPoints - ancestryPointsUsed;

	// Background section for UI consumption with detailed breakdown
	const background = {
		baseSkillPoints,
		baseTradePoints,
		baseLanguagePoints,
		availableSkillPoints,
		availableTradePoints,
		availableLanguagePoints,
		skillPointsUsed,
		tradePointsUsed,
		languagePointsUsed,
		conversions: { skillToTrade, tradeToSkill, tradeToLanguage },
		// Breakdown for UI display
		breakdown: {
			skillPoints: {
				base: 5,
				intelligence: finalIntelligence,
				progression: progressionGains.totalSkillPoints,
				talents: bonus('skillPoints'),
				total: baseSkillPoints
			},
			tradePoints: {
				base: 3,
				progression: progressionGains.totalTradePoints,
				talents: bonus('tradePoints'),
				total: baseTradePoints
			},
			languagePoints: {
				base: 2,
				talents: bonus('languagePoints'),
				total: baseLanguagePoints
			}
		}
	};

	// Ancestry section for UI consumption
	const ancestry = {
		baseAncestryPoints,
		ancestryPointsUsed,
		ancestryPointsRemaining
	};

	// Calculate martial check as max(Acrobatics, Athletics) using EXISTING skill calculations
	// Instead of recalculating, we should access the pre-computed skill totals
	// For now, calculate here but TODO: get from character sheet's getSkillsData()
	const acrobaticsProficiency = skills['acrobatics'] || 0;
	const athleticsProficiency = skills['athletics'] || 0;
	const acrobaticsTotal = finalAgility + acrobaticsProficiency * 2; // Agility + (Proficiency × 2)
	const athleticsTotal = finalMight + athleticsProficiency * 2; // Might + (Proficiency × 2)
	const finalMartialCheck = Math.max(acrobaticsTotal, athleticsTotal);

	// Create martial check breakdown for tooltip
	breakdowns.martial_check = {
		statName: 'Martial Check',
		base: Math.max(finalAgility, finalMight), // Base attribute (higher one)
		effects: [
			{
				source: { name: 'Acrobatics Option', id: 'acrobatics', type: 'base' },
				value: acrobaticsTotal,
				description: `Agility (${finalAgility}) + Proficiency ×2 (${acrobaticsProficiency * 2}) = ${acrobaticsTotal}`,
				isActive: true
			},
			{
				source: { name: 'Athletics Option', id: 'athletics', type: 'base' },
				value: athleticsTotal,
				description: `Might (${finalMight}) + Proficiency ×2 (${athleticsProficiency * 2}) = ${athleticsTotal}`,
				isActive: true
			}
		],
		total: finalMartialCheck
	};

	// 5. Validation with step-aware errors
	const errors: ValidationError[] = [];

	// Ancestry point validation
	if (ancestryPointsUsed > baseAncestryPoints) {
		errors.push({
			step: BuildStep.Ancestry,
			field: 'ancestryPoints',
			code: 'POINTS_OVERBUDGET',
			message: `You are ${ancestryPointsUsed - baseAncestryPoints} ancestry point(s) over budget.`
		});
	}

	// Background point validation
	if (skillPointsUsed > availableSkillPoints) {
		errors.push({
			step: BuildStep.Background,
			field: 'skillPoints',
			code: 'POINTS_OVERBUDGET',
			message: `You are ${skillPointsUsed - availableSkillPoints} skill point(s) over budget.`
		});
	}
	if (tradePointsUsed > availableTradePoints) {
		errors.push({
			step: BuildStep.Background,
			field: 'tradePoints',
			code: 'POINTS_OVERBUDGET',
			message: `You are ${tradePointsUsed - availableTradePoints} trade point(s) over budget.`
		});
	}
	if (languagePointsUsed > availableLanguagePoints) {
		errors.push({
			step: BuildStep.Background,
			field: 'languagePoints',
			code: 'POINTS_OVERBUDGET',
			message: `You are ${languagePointsUsed - availableLanguagePoints} language point(s) over budget.`
		});
	}

	const attributeLimits = validateAttributeLimits(buildData, resolvedEffects);

	// --- START MASTERY CAP CALCULATION ---
	// Get caps from canonical source
	const levelCaps = getLevelCaps(buildData.level);

	// Helper to convert skill points to a numeric mastery tier (2+=Adept)
	const getMasteryTierFromPoints = (points: number): number => {
		if (points >= 5) return 5; // Grandmaster
		if (points >= 4) return 4; // Master
		if (points >= 3) return 3; // Expert
		if (points >= 2) return 2; // Adept
		return 1; // Novice
	};

	const baseSkillMasteryTier = levelCaps.maxSkillMasteryTier;
	const baseTradeMasteryTier = levelCaps.maxTradeMasteryTier;

	const skillMasteryCapEffects = resolvedEffects.filter(
		(e): e is ModifyMasteryCapEffect | IncreaseMasteryCapEffect =>
			e.type === 'MODIFY_SKILL_MASTERY_CAP' || e.type === 'INCREASE_SKILL_MASTERY_CAP'
	);

	// 1. Identify all skills that are "over budget" based on level alone.
	const skillsOverLevelCap: string[] = [];
	if (buildData.skillsData) {
		for (const [skillId, points] of Object.entries(buildData.skillsData)) {
			if (points > 0 && getMasteryTierFromPoints(points) > baseSkillMasteryTier) {
				skillsOverLevelCap.push(skillId);
			}
		}
	}

	// 2. Tally the total budget of exceptions from features.
	let totalCapExceptionsBudget = 0;
	for (const effect of skillMasteryCapEffects) {
		totalCapExceptionsBudget += effect.count;
	}

	// 3. Validate skills that exceed the level's natural mastery cap
	// If level naturally allows tier 2+, those tiers are unlimited (like Novice at level 1)
	// Only enforce slot limits when trying to exceed the natural cap
	const levelAllowsUnlimitedMastery = baseSkillMasteryTier >= 2;
	
	if (levelAllowsUnlimitedMastery) {
		// Level 5+: All tiers up to natural cap are unlimited
		// Only validate skills that exceed the natural cap
		// E.g., L5: Adept unlimited, Expert needs exception
		//       L10: Expert unlimited, Master needs exception
		const skillsAboveNaturalCap = skillsOverLevelCap.filter(skillId => {
			const points = buildData.skillsData?.[skillId] || 0;
			return getMasteryTierFromPoints(points) > baseSkillMasteryTier;
		});
		
		// Only feature exceptions can grant mastery above natural cap
		if (skillsAboveNaturalCap.length > totalCapExceptionsBudget) {
			errors.push({
				step: BuildStep.Background,
				field: 'skills',
				code: 'MASTERY_CAP_EXCEEDED',
				message: `You have raised ${skillsAboveNaturalCap.length} skills above your level's natural mastery cap (tier ${baseSkillMasteryTier}), but you only have ${totalCapExceptionsBudget} exception slots from features.`
			});
		}
	} else {
		// Level 1-4: Natural cap is Novice (tier 1), so Adept requires exception slots
		// Level 1 gets 1 base Adept slot, higher levels need feature exceptions
		const baseAdeptSlotsForValidation = buildData.level === 1 ? 1 : 0;
		const totalAllowedAdeptSkills = baseAdeptSlotsForValidation + totalCapExceptionsBudget;

		// Validate that over-level skills don't exceed total budget
		if (skillsOverLevelCap.length > totalAllowedAdeptSkills) {
			errors.push({
				step: BuildStep.Background,
				field: 'skills',
				code: 'MASTERY_CAP_EXCEEDED',
				message: `You have raised ${skillsOverLevelCap.length} skills to Adept level, but you can only have ${totalAllowedAdeptSkills} Adept skills (${baseAdeptSlotsForValidation} base + ${totalCapExceptionsBudget} from features).`
			});
		}

		// Validate specific skill coverage
		let freeBaseSlots = baseAdeptSlotsForValidation;
		for (const skillId of skillsOverLevelCap) {
			const isCoveredByFeature = skillMasteryCapEffects.some(
				(effect) => !effect.options || effect.options.includes(skillId)
			);
			if (isCoveredByFeature) continue;
			if (freeBaseSlots > 0) {
				freeBaseSlots -= 1;
				continue;
			}
			errors.push({
				step: BuildStep.Background,
				field: skillId,
				code: 'INVALID_MASTERY_GRANT',
				message: `The ${skillId} skill has been raised to Adept level, but is not permitted by your features or base allowances.`
			});
		}
	}
	// --- END MASTERY CAP CALCULATION ---

	// Calculate mastery limits in correct interface format
	const currentSkillAdeptCount = buildData.skillsData
		? Object.values(buildData.skillsData).filter((points) => points >= 2).length
		: 0;
	const currentTradeAdeptCount = buildData.tradesData
		? Object.values(buildData.tradesData).filter((points) => points >= 2).length
		: 0;
	const totalCurrentAdeptCount = currentSkillAdeptCount + currentTradeAdeptCount;

	// Calculate mastery limits for UI display
	// If level naturally allows tier 2+, all tiers up to cap are unlimited (like Novice at level 1)
	// Only use slot system for levels below the natural cap (levels 1-4 trying to reach Adept)
	let maxAdeptCount: number;
	let canSelectAdept: boolean;
	
	if (levelAllowsUnlimitedMastery) {
		// Level 5+: All tiers up to natural cap are unlimited
		maxAdeptCount = 999; // Effectively unlimited for UI
		canSelectAdept = true; // Always can select up to natural cap
	} else {
		// Level 1-4: Use slot system (1 base slot at level 1, 0 at levels 2-4)
		const baseAdeptSlots = buildData.level === 1 ? 1 : 0;
		const bonusAdeptSlots = skillMasteryCapEffects.reduce((total, effect) => total + effect.count, 0);
		maxAdeptCount = baseAdeptSlots + bonusAdeptSlots;
		canSelectAdept = totalCurrentAdeptCount < maxAdeptCount;
	}

	// Max mastery tier for UI dropdowns
	const maxSkillMastery = baseSkillMasteryTier;
	const maxTradeMastery = baseTradeMasteryTier;

	const validation: ValidationResult = {
		isValid: errors.length === 0 && !Object.values(attributeLimits).some((limit) => limit.exceeded),
		errors,
		warnings: [],
		attributeLimits,
		masteryLimits: {
			maxSkillMastery,
			maxTradeMastery,
			currentAdeptCount: totalCurrentAdeptCount,
			maxAdeptCount,
			canSelectAdept
		}
	};

	// 6. Collect abilities and features
	const grantedAbilities = resolvedEffects
		.filter((effect) => effect.resolved && effect.type === 'GRANT_ABILITY')
		.map((effect) => ({
			name: effect.target,
			description: effect.value as string,
			source: effect.source,
			type: 'active' as const,
			isConditional: !!effect.condition,
			condition: effect.condition
		}));

	// 7. Conditional modifiers
	const conditionalModifiers = resolvedEffects
		.filter((effect) => effect.resolved && effect.condition)
		.map((effect) => ({
			effect,
			condition: effect.condition!,
			description: `${effect.source.name}: ${effect.value > 0 ? '+' : ''}${effect.value} ${effect.target} while ${effect.condition}`,
			affectedStats: [effect.target]
		}));

	// 8. Get unresolved choices
	const unresolvedChoices = getUnresolvedChoices(resolvedEffects);

	return {
		stats: {
			finalMight,
			finalAgility,
			finalCharisma,
			finalIntelligence,
			finalHPMax,
			finalSPMax,
			finalMPMax,
			finalPD,
			finalAD,
			finalPDR,
			finalMoveSpeed,
			finalJumpDistance,
			finalDeathThreshold,
			finalSaveDC,
			finalSaveMight,
			finalSaveAgility,
			finalSaveCharisma,
			finalSaveIntelligence,
			finalInitiativeBonus,
			finalRestPoints,
			finalGritPoints,

			// Prime modifier and combat mastery (needed for UI compatibility)
			finalPrimeModifierValue: maxValue,
			finalPrimeModifierAttribute: primeAttribute,
			finalCombatMastery: combatMastery,
			finalAttributePoints,

			// Combat stats with breakdowns
			finalAttackSpellCheck: attackSpellCheckBase,
			finalMartialCheck: finalMartialCheck,

			// Class and ancestry info for UI
			className: getClassFeatures(buildData.classId)?.className || 'Unknown',
			ancestry1Name: ancestriesData.find((a) => a.id === buildData.ancestry1Id)?.name,
			ancestry2Name: ancestriesData.find((a) => a.id === buildData.ancestry2Id)?.name
		},
		breakdowns,
		grantedAbilities,
		conditionalModifiers,
		combatTraining: [],
		resistances: [],
		vulnerabilities: [],
		senses: [],
		movements: [],
		background,
		ancestry,
		levelBudgets: {
			totalTalents: progressionGains.totalTalents,
			totalPathPoints: progressionGains.totalPathPoints,
			totalAncestryPoints: progressionGains.totalAncestryPoints,
			totalSkillPoints: progressionGains.totalSkillPoints,
			totalTradePoints: progressionGains.totalTradePoints,
			totalAttributePoints: progressionGains.totalAttributePoints,
			totalManeuversKnown: progressionGains.totalManeuversKnown,
			totalTechniquesKnown: progressionGains.totalTechniquesKnown,
			totalCantripsKnown: progressionGains.totalCantripsKnown,
			totalSpellsKnown: progressionGains.totalSpellsKnown,
			unlockedFeatureIds: progressionGains.unlockedFeatureIds,
			pendingSubclassChoices: progressionGains.pendingSubclassChoices
		},
		resolvedFeatures: resolvedProgression ? {
			unlockedFeatures: resolvedProgression.unlockedFeatures,
			pendingFeatureChoices: resolvedProgression.pendingFeatureChoices,
			availableSubclassChoice: resolvedProgression.availableSubclassChoice,
			subclassChoiceLevel: resolvedProgression.subclassChoiceLevel
		} : {
			unlockedFeatures: [],
			pendingFeatureChoices: [],
			availableSubclassChoice: false,
			subclassChoiceLevel: undefined
		},
		validation,
		unresolvedChoices,
		cacheTimestamp: Date.now(),
		isFromCache: false
	};
}
