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
	UnresolvedChoice,
	ChoiceOption
} from '../types/effectSystem';
// SpellSource, SpellSchool, SpellTag moved to calculatorModules/spellSystem.ts
// ModifyMasteryCapEffect, IncreaseMasteryCapEffect moved to calculatorModules/validation.ts
import {
	resolveClassProgression
} from '../rulesdata/classes-data/classProgressionResolver';
import { classesData } from '../rulesdata/loaders/class.loader';
// findTalentById moved to calculatorModules/effectCollection.ts
// getLevelCaps moved to calculatorModules/validation.ts and statCalculation.ts

// BuildStep, getSpellById moved to calculatorModules/validation.ts
import { findClassByName } from '../rulesdata/loaders/class-features.loader';
// traitsData moved to calculatorModules/budgetCalculation.ts and effectCollection.ts
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
import { attributesData } from '../rulesdata/attributes';
import { skillsData } from '../rulesdata/skills';
import { tradesData } from '../rulesdata/trades';
import type { ClassDefinition } from '../rulesdata/schemas/character.schema';
// CHARACTER_PATHS moved to calculatorModules/progressionAggregation.ts
import {
	collectGrantedAbilities,
	collectMovements,
	collectConditionalModifiers,
	collectResistances,
	collectVulnerabilities,
	collectSenses,
	collectCombatTraining,
	injectDefaultMovements
} from './calculatorModules/abilityCollection';
// createStatBreakdown, createInitiativeBreakdown, createMartialCheckBreakdown
// now imported by calculatorModules/statCalculation.ts
import {
	calculateGlobalMagicProfile,
	generateSpellsKnownSlots
} from './calculatorModules/spellSystem';
import {
	aggregateAttributedEffects,
	resolveEffectChoices
} from './calculatorModules/effectCollection';
import {
	aggregateProgressionGains,
	checkFlavorFeatureAutoGrant
} from './calculatorModules/progressionAggregation';
import { calculateBudgets } from './calculatorModules/budgetCalculation';
import { calculateDerivedStats } from './calculatorModules/statCalculation';
import { runValidation } from './calculatorModules/validation';

// CrossPathGrants, aggregatePathBenefits, checkFlavorFeatureAutoGrant moved to calculatorModules/progressionAggregation.ts

/**
 * Convert character context data to enhanced build data
 */
export function convertToEnhancedBuildData(contextData: any): EnhancedCharacterBuildData {
	return {
		id: contextData.id || '',
		finalName: contextData.finalName || '',
		finalPlayerName: contextData.finalPlayerName,
		level: contextData.level || 1,
		usePrimeCapRule: !!contextData.usePrimeCapRule,

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
		selectedTalents:
			contextData.selectedTalents && typeof contextData.selectedTalents === 'object'
				? contextData.selectedTalents
				: {},
		selectedSubclass: contextData.selectedSubclass,

		// Multiclass selections (M3.17)
		selectedMulticlassOption: contextData.selectedMulticlassOption,
		selectedMulticlassClass: contextData.selectedMulticlassClass,
		selectedMulticlassFeature: contextData.selectedMulticlassFeature,

		// Pass data as native objects, removing the unnecessary stringify step
		skillsData: contextData.skillsData ?? {},
		tradesData: contextData.tradesData ?? {},
		// Default Common to fluent when empty to match current UI assumptions
		languagesData: contextData.languagesData ?? { common: { fluency: 'fluent' } },

		// Optional manual overrides supported by the engine
		manualPD: contextData.manualPD,
		manualAD: contextData.manualAD,
		manualPDR: contextData.manualPDR,
		activeConditions: Object.entries(
			contextData.characterState?.ui?.activeConditions ?? {}
		)
			.filter(([, isActive]) => Boolean(isActive))
			.map(([conditionId]) => conditionId),

		// Conversions between point pools (for Background step)
		conversions: {
			skillToTrade: contextData.skillToTradeConversions ?? 0,
			tradeToSkill: contextData.tradeToSkillConversions ?? 0,
			tradeToLanguage: contextData.tradeToLanguageConversions ?? 0
		},

		// Path Point Allocations (M3.9)
		pathPointAllocations: contextData.pathPointAllocations,

		// Selections (M3.20 Slot Based)
		selectedSpells: contextData.selectedSpells ?? {},
		selectedManeuvers: contextData.selectedManeuvers ?? [],

		lastModified: Date.now()
	};
}

/**
 * Get class level progression data by ID
 */
function getClassProgressionData(classId: string): any | null {
	const classData = classesData.find((c) => c.id === classId);
	return classData ?? null;
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
		default:
			return null;
	}
}

// aggregateAttributedEffects, resolveEffectChoices moved to calculatorModules/effectCollection.ts

// createStatBreakdown moved to calculatorModules/breakdownGeneration.ts

// validateAttributeLimits moved to calculatorModules/validation.ts

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

// aggregateProgressionGains moved to calculatorModules/progressionAggregation.ts

/**
 * Main calculation function with detailed breakdowns
 */
export function calculateCharacterWithBreakdowns(
	buildData: EnhancedCharacterBuildData
): EnhancedCalculationResult {
	// 1. Aggregate all effects with source attribution
	const rawEffects = aggregateAttributedEffects(buildData, getClassFeatures);

	// 2. Resolve user choices
	const resolvedEffects = resolveEffectChoices(rawEffects, buildData.selectedTraitChoices);
	const activeConditions = new Set(buildData.activeConditions ?? []);

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

	// Get class category for cross-path rules (DC20 v0.10 p.161)
	const classDefinition = buildData.classId ? findClassByName(buildData.classId) : null;
	const classCategory = classDefinition?.classCategory;

	const progressionGains = aggregateProgressionGains(
		classProgressionData,
		buildData.level,
		buildData.pathPointAllocations,
		buildData.selectedSubclass,
		classCategory
	);

	// 4. Calculate all derived stats and breakdowns (via statCalculation module)
	const derivedStats = calculateDerivedStats(buildData, resolvedEffects, activeConditions, progressionGains);
	const {
		finalMight, finalAgility, finalCharisma, finalIntelligence,
		combatMastery, primeModifier, primeAttribute, usePrimeCapRule,
		finalPD, finalAD, finalPDR,
		finalSaveDC, finalSaveMight, finalSaveAgility, finalSaveCharisma, finalSaveIntelligence,
		finalDeathThreshold, finalGritPoints, finalInitiativeBonus,
		attackSpellCheckBase, breakdowns,
		finalHPMax, finalSPMax, finalMPMax, finalMoveSpeed, finalJumpDistance,
		finalAttributePoints, finalRestPoints, finalMartialCheck
	} = derivedStats;

	// --- Spell System (M3.20) ---
	const globalMagicProfile = calculateGlobalMagicProfile(buildData, resolvedEffects);
	const earlySpellBonus = resolvedEffects
		.filter((e) => (e as any).type === 'MODIFY_STAT' && (e as any).target === 'spellsKnown')
		.reduce((s, e) => s + Number((e as any).value || 0), 0);
	const spellsKnownSlots = generateSpellsKnownSlots(
		buildData,
		progressionGains,
		resolvedEffects,
		earlySpellBonus,
		getClassFeatures(buildData.classId)
	);

	// 4.5. Compute background and ancestry budgets (via budgetCalculation module)
	const budgets = calculateBudgets(buildData, resolvedEffects, progressionGains, finalIntelligence);
	const { background, ancestry, maneuverBonus, spellBonus, grantedManeuversCount } = budgets;
	const { skillPointsUsed, tradePointsUsed, languagePointsUsed } = background;
	const { availableSkillPoints, availableTradePoints, availableLanguagePoints } = background;
	const { baseAncestryPoints, ancestryPointsUsed } = ancestry;
	const skills = buildData.skillsData ?? {};
	const trades = buildData.tradesData ?? {};
	const languages = buildData.languagesData ?? { common: { fluency: 'fluent' } };
	const skillLimitElevations = (buildData as any).skillMasteryLimitElevations ?? {};
	const tradeLimitElevations = (buildData as any).tradeMasteryLimitElevations ?? {};

	// 5. Validation (via validation module)
	const validation = runValidation({
		buildData,
		resolvedEffects,
		skillPointsUsed,
		tradePointsUsed,
		languagePointsUsed,
		availableSkillPoints,
		availableTradePoints,
		availableLanguagePoints,
		baseAncestryPoints,
		ancestryPointsUsed,
		skillLimitElevations,
		tradeLimitElevations,
		spellsKnownSlots,
		globalMagicProfile
	});

	// 6. Collect abilities, movements, resistances, senses, combat training, and conditional modifiers
	const grantedAbilities = collectGrantedAbilities(resolvedEffects);
	const rawMovements = collectMovements(resolvedEffects, finalMoveSpeed);
	const movements = injectDefaultMovements(rawMovements, finalMoveSpeed);
	const conditionalModifiers = collectConditionalModifiers(resolvedEffects);
	const resistances = collectResistances(resolvedEffects);
	const vulnerabilities = collectVulnerabilities(resolvedEffects);
	const senses = collectSenses(resolvedEffects);
	const combatTraining = collectCombatTraining(resolvedEffects);

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
			finalPrimeModifierValue: primeModifier,
			finalPrimeModifierAttribute: primeAttribute,
			usePrimeCapRule,
			finalCombatMastery: combatMastery,
			finalAttributePoints,

			// Resource spend limits (both equal Combat Mastery per v0.10 rules)
			manaSpendLimit: combatMastery,
			staminaSpendLimit: combatMastery,

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
		combatTraining,
		resistances,
		vulnerabilities,
		senses,
		movements,
		background,
		ancestry,
		levelBudgets: {
			totalTalents: progressionGains.totalTalents,
			totalPathPoints: progressionGains.totalPathPoints,
			totalAncestryPoints: progressionGains.totalAncestryPoints,
			totalSkillPoints: progressionGains.totalSkillPoints,
			totalTradePoints: progressionGains.totalTradePoints,
			totalAttributePoints: progressionGains.totalAttributePoints,
			// Include MODIFY_STAT bonuses and GRANT_MANEUVERS effects (C1, C3)
			totalManeuversKnown:
				progressionGains.totalManeuversKnown + maneuverBonus + grantedManeuversCount,
			totalCantripsKnown: progressionGains.totalCantripsKnown,
			// Include MODIFY_STAT bonuses for spells (C2)
			totalSpellsKnown: progressionGains.totalSpellsKnown + spellBonus,
			unlockedFeatureIds: progressionGains.unlockedFeatureIds,
			pendingSubclassChoices: progressionGains.pendingSubclassChoices
		},
		// Cross-path grants (DC20 v0.10 p.161)
		crossPathGrants: progressionGains.crossPathGrants,
		// Auto-granted Flavor Features (DC20 v0.10 p.161)
		autoGrantedFlavorFeatures: (() => {
			const flavorFeatures: Array<{ featureId: string; featureName: string; classId: string }> = [];

			// Build multiclass features array from current selection
			const multiclassFeatures: Array<{ classId: string; featureId: string }> = [];
			if (buildData.selectedMulticlassFeature && buildData.selectedMulticlassClass) {
				multiclassFeatures.push({
					classId: buildData.selectedMulticlassClass,
					featureId: buildData.selectedMulticlassFeature
				});
			}

			// Check main class for flavor feature auto-grant
			if (buildData.classId) {
				const mainClassFlavor = checkFlavorFeatureAutoGrant(
					buildData.classId,
					progressionGains.unlockedFeatureIds,
					multiclassFeatures
				);
				if (mainClassFlavor) {
					flavorFeatures.push(mainClassFlavor);
				}
			}

			// Check multiclass class for flavor feature auto-grant (if applicable)
			if (
				buildData.selectedMulticlassClass &&
				buildData.selectedMulticlassClass !== buildData.classId
			) {
				const multiclassFlavor = checkFlavorFeatureAutoGrant(
					buildData.selectedMulticlassClass,
					[], // No unlocked features from multiclass class progression
					multiclassFeatures
				);
				if (multiclassFlavor) {
					flavorFeatures.push(multiclassFlavor);
				}
			}

			return flavorFeatures.length > 0 ? flavorFeatures : undefined;
		})(),
		resolvedFeatures: resolvedProgression
			? {
					unlockedFeatures: resolvedProgression.unlockedFeatures,
					pendingFeatureChoices: resolvedProgression.pendingFeatureChoices,
					availableSubclassChoice: resolvedProgression.availableSubclassChoice,
					subclassChoiceLevel: resolvedProgression.subclassChoiceLevel
				}
			: {
					unlockedFeatures: [],
					pendingFeatureChoices: [],
					availableSubclassChoice: false,
					subclassChoiceLevel: undefined
				},

		// --- Spell System (M3.20) ---
		globalMagicProfile,
		spellsKnownSlots,

		validation,
		unresolvedChoices,
		cacheTimestamp: Date.now(),
		isFromCache: false
	};
}

