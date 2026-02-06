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
	GlobalMagicProfile,
	SpellsKnownSlot
} from '../types/effectSystem';
// SpellSource, SpellSchool, SpellTag moved to calculatorModules/spellSystem.ts
import {
	type ModifyMasteryCapEffect,
	type IncreaseMasteryCapEffect
} from '../rulesdata/schemas/character.schema';
import {
	resolveClassProgression
} from '../rulesdata/classes-data/classProgressionResolver';
import { classesData } from '../rulesdata/loaders/class.loader';
// findTalentById moved to calculatorModules/effectCollection.ts
import { getLevelCaps } from '../rulesdata/progression/levelCaps';

import { BuildStep } from '../types/effectSystem';
import { getSpellById } from '../rulesdata/spells-data';
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
	collectConditionalModifiers
} from './calculatorModules/abilityCollection';
import {
	createStatBreakdown,
	createInitiativeBreakdown,
	createMartialCheckBreakdown
} from './calculatorModules/breakdownGeneration';
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

	// 4. Create detailed breakdowns
	const breakdowns: Record<string, EnhancedStatBreakdown> = {};

	// Attributes
	for (const attr of attributesData) {
		const baseValue = (buildData as any)[`attribute_${attr.id}`] || 0;
		breakdowns[`attribute_${attr.id}`] = createStatBreakdown(
			attr.id,
			baseValue,
			resolvedEffects,
			activeConditions
		);
	}

	// Calculate final attribute values
	const finalMight = breakdowns.attribute_might.total;
	const finalAgility = breakdowns.attribute_agility.total;
	const finalCharisma = breakdowns.attribute_charisma.total;
	const finalIntelligence = breakdowns.attribute_intelligence.total;

	// Derived stats - Combat Mastery calculated from level
	const combatMastery = Math.ceil(buildData.level / 2);
	const levelCapsForPrime = getLevelCaps(buildData.level);

	// Health & Resources - use aggregated progression gains
	let finalHPMax = finalMight + progressionGains.totalHP;
	let finalSPMax = progressionGains.totalSP;
	let finalMPMax = progressionGains.totalMP;

	// Do not apply effect modifiers here; breakdowns will add modifiers to base values

	// Defenses with modifiers
	const basePD = 8 + combatMastery + finalAgility + finalIntelligence;
	const baseAD = 8 + combatMastery + finalMight + finalCharisma;
	const pdModifiers = resolvedEffects
		.filter(
			(e) =>
				e.resolved &&
				e.type === 'MODIFY_STAT' &&
				e.target === 'pd' &&
				(!e.condition || activeConditions.has(e.condition))
		)
		.reduce((sum, e) => sum + (e.value as number), 0);
	const adModifiers = resolvedEffects
		.filter(
			(e) =>
				e.resolved &&
				e.type === 'MODIFY_STAT' &&
				e.target === 'ad' &&
				(!e.condition || activeConditions.has(e.condition))
		)
		.reduce((sum, e) => sum + (e.value as number), 0);
	const finalPD = buildData.manualPD ?? basePD + pdModifiers;
	const finalAD = buildData.manualAD ?? baseAD + adModifiers;
	const finalPDR = buildData.manualPDR ?? 0;

	// Determine attribute-driven prime values for legacy behavior
	const maxAttributeValue = Math.max(finalMight, finalAgility, finalCharisma, finalIntelligence);
	const attributesAtMax: Array<'might' | 'agility' | 'charisma' | 'intelligence'> = [];
	if (finalMight === maxAttributeValue) attributesAtMax.push('might');
	if (finalAgility === maxAttributeValue) attributesAtMax.push('agility');
	if (finalCharisma === maxAttributeValue) attributesAtMax.push('charisma');
	if (finalIntelligence === maxAttributeValue) attributesAtMax.push('intelligence');
	const attributePrime = attributesAtMax[0] || 'might';

	const usePrimeCapRule = !!buildData.usePrimeCapRule;
	const primeModifier = usePrimeCapRule ? levelCapsForPrime.maxAttributeValue : maxAttributeValue;
	const primeAttribute = usePrimeCapRule ? 'prime' : attributePrime;

	// Calculate other derived stats first (DC20 sheet: 10 + Combat Mastery + Prime)
	const finalSaveDC = 10 + combatMastery + primeModifier;
	const finalSaveMight = finalMight + combatMastery;
	const finalSaveAgility = finalAgility + combatMastery;
	const finalSaveCharisma = finalCharisma + combatMastery;
	const finalSaveIntelligence = finalIntelligence + combatMastery;
	const finalDeathThreshold = primeModifier + combatMastery; // Prime + Combat Mastery (usually -4)
	const baseMoveSpeed = 5;
	const baseJumpDistance = finalAgility;
	const finalGritPoints = Math.max(0, 2 + finalCharisma); // 2 + Charisma (minimum 0)
	const finalInitiativeBonus = combatMastery + finalAgility; // Combat Mastery + Agility
	// Attribute points handled via breakdowns to avoid double counting

	// Create breakdowns for derived stats
	breakdowns.hpMax = createStatBreakdown('hpMax', finalHPMax, resolvedEffects, activeConditions);
	breakdowns.spMax = createStatBreakdown('spMax', finalSPMax, resolvedEffects, activeConditions);
	breakdowns.mpMax = createStatBreakdown('mpMax', finalMPMax, resolvedEffects, activeConditions);
	breakdowns.pd = createStatBreakdown('pd', basePD, resolvedEffects, activeConditions);
	breakdowns.ad = createStatBreakdown('ad', baseAD, resolvedEffects, activeConditions);

	// Base 12 + any attribute points gained from leveling
	breakdowns.attributePoints = createStatBreakdown(
		'attributePoints',
		12 + progressionGains.totalAttributePoints,
		resolvedEffects,
		activeConditions
	);

	// --- Spell System (M3.20) ---
	const globalMagicProfile = calculateGlobalMagicProfile(buildData, resolvedEffects);
	// Calculate talent spell bonus early for slot generation (C2)
	const earlySpellBonus = resolvedEffects
		.filter((e) => e.type === 'MODIFY_STAT' && e.target === 'spellsKnown')
		.reduce((s, e) => s + Number(e.value || 0), 0);
	const spellsKnownSlots = generateSpellsKnownSlots(
		buildData,
		progressionGains,
		resolvedEffects,
		earlySpellBonus,
		getClassFeatures(buildData.classId)
	);

	// Movement breakdowns
	breakdowns.move_speed = createStatBreakdown(
		'moveSpeed',
		baseMoveSpeed,
		resolvedEffects,
		activeConditions
	);
	breakdowns.jump_distance = createStatBreakdown(
		'jumpDistance',
		baseJumpDistance,
		resolvedEffects,
		activeConditions
	);

	// Use breakdown totals for final values to avoid double counting
	finalHPMax = breakdowns.hpMax.total;
	finalSPMax = breakdowns.spMax.total;
	finalMPMax = breakdowns.mpMax.total;
	const finalMoveSpeed = breakdowns.move_speed.total;
	const finalJumpDistance = breakdowns.jump_distance.total;
	const finalAttributePoints = breakdowns.attributePoints.total;

	// Rest Points must be calculated AFTER HP breakdown is applied
	const finalRestPoints = finalHPMax; // Rest Points = HP Max (post-effects)

	// Combat breakdowns
	const attackSpellCheckBase = combatMastery + primeModifier;
	breakdowns.attack_spell_check = createStatBreakdown(
		'attackSpellCheck',
		attackSpellCheckBase,
		resolvedEffects,
		activeConditions
	);
	breakdowns.save_dc = createStatBreakdown(
		'saveDC',
		finalSaveDC,
		resolvedEffects,
		activeConditions
	);

	// Initiative breakdown (via breakdownGeneration module)
	breakdowns.initiative = createInitiativeBreakdown(combatMastery, finalAgility, finalInitiativeBonus);

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

	// Calculate martial check as max(Acrobatics, Athletics) using EXISTING skill calculations
	// Instead of recalculating, we should access the pre-computed skill totals
	// For now, calculate here but TODO: get from character sheet's getSkillsData()
	const acrobaticsProficiency = skills['acrobatics'] || 0;
	const athleticsProficiency = skills['athletics'] || 0;
	const acrobaticsTotal = finalAgility + acrobaticsProficiency * 2; // Agility + (Proficiency × 2)
	const athleticsTotal = finalMight + athleticsProficiency * 2; // Might + (Proficiency × 2)
	const finalMartialCheck = Math.max(acrobaticsTotal, athleticsTotal);

	// Martial check breakdown (via breakdownGeneration module)
	breakdowns.martial_check = createMartialCheckBreakdown(
		finalAgility,
		finalMight,
		acrobaticsProficiency,
		athleticsProficiency,
		finalMartialCheck
	);

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
	const levelCaps = levelCapsForPrime;

	// Helper to convert skill points to a numeric mastery tier
	const getMasteryTierFromPoints = (points: number): number => {
		if (points >= 5) return 5; // Grandmaster
		if (points >= 4) return 4; // Master
		if (points >= 3) return 3; // Expert
		if (points >= 2) return 2; // Adept
		if (points >= 1) return 1; // Novice
		return 0; // Untrained
	};

	const baseSkillMasteryTier = levelCaps.maxSkillMasteryTier;
	const baseTradeMasteryTier = levelCaps.maxTradeMasteryTier;

	const skillMasteryCapEffects = resolvedEffects.filter(
		(e): e is ModifyMasteryCapEffect | IncreaseMasteryCapEffect =>
			e.type === 'MODIFY_SKILL_MASTERY_CAP' || e.type === 'INCREASE_SKILL_MASTERY_CAP'
	);

	const tradeMasteryCapEffects = resolvedEffects.filter(
		(e): e is ModifyMasteryCapEffect | IncreaseMasteryCapEffect =>
			e.type === 'MODIFY_TRADE_MASTERY_CAP' || e.type === 'INCREASE_TRADE_MASTERY_CAP'
	);

	// Debug logging for mastery cap system (DC20 0.10)
	if (Object.keys(skillLimitElevations).length > 0 || skillMasteryCapEffects.length > 0) {
		console.log('📊 [Mastery Caps] Skill mastery calculation:', {
			level: buildData.level,
			baselineCap: baseSkillMasteryTier,
			elevationsFromPoints: Object.keys(skillLimitElevations).length,
			elevationsFromFeatures: skillMasteryCapEffects.length,
			elevatedSkills: Object.keys(skillLimitElevations)
		});
	}
	if (Object.keys(tradeLimitElevations).length > 0 || tradeMasteryCapEffects.length > 0) {
		console.log('📊 [Mastery Caps] Trade mastery calculation:', {
			level: buildData.level,
			baselineCap: baseTradeMasteryTier,
			elevationsFromPoints: Object.keys(tradeLimitElevations).length,
			elevationsFromFeatures: tradeMasteryCapEffects.length,
			elevatedTrades: Object.keys(tradeLimitElevations)
		});
	}

	// Helper to calculate effective mastery cap for a specific skill
	// DC20 Rule: "When your Skill Mastery Limit increases at the normal level,
	// it continues to benefit from the bonus to its Skill Mastery Limit."
	// This means elevations are PERSISTENT and COMPOUND with level increases.
	const getEffectiveSkillCap = (skillId: string): number => {
		let cap = baseSkillMasteryTier;

		// Add elevation from spent points (if any)
		const spentElevation = skillLimitElevations[skillId];
		if (spentElevation?.source === 'spent_points') {
			cap += spentElevation.value;
		}

		// Add elevation from features (if any) - only 1 bonus per skill
		const featureElevation = skillMasteryCapEffects.find(
			(effect) => !effect.options || effect.options.includes(skillId)
		);
		if (featureElevation) {
			cap += featureElevation.value;
		}

		// Cap at Grandmaster (5)
		return Math.min(cap, 5);
	};

	const getEffectiveTradeCap = (tradeId: string): number => {
		let cap = baseTradeMasteryTier;

		// Add elevation from spent points (if any)
		const spentElevation = tradeLimitElevations[tradeId];
		if (spentElevation?.source === 'spent_points') {
			cap += spentElevation.value;
		}

		// Add elevation from features (if any) - only 1 bonus per trade
		const featureElevation = tradeMasteryCapEffects.find(
			(effect) => !effect.options || effect.options.includes(tradeId)
		);
		if (featureElevation) {
			cap += featureElevation.value;
		}

		// Cap at Grandmaster (5)
		return Math.min(cap, 5);
	};

	// Tally the total budget of exceptions from features
	let totalSkillCapExceptionsBudget = 0;
	for (const effect of skillMasteryCapEffects) {
		totalSkillCapExceptionsBudget += effect.count;
	}

	let totalTradeCapExceptionsBudget = 0;
	for (const effect of tradeMasteryCapEffects) {
		totalTradeCapExceptionsBudget += effect.count;
	}

	// Validate each skill's mastery level against its effective cap
	if (buildData.skillsData) {
		for (const [skillId, masteryLevel] of Object.entries(buildData.skillsData)) {
			if (!masteryLevel) continue;

			const masteryTier = getMasteryTierFromPoints(masteryLevel);
			const effectiveCap = getEffectiveSkillCap(skillId);

			if (masteryTier > effectiveCap) {
				errors.push({
					step: BuildStep.Background,
					field: skillId,
					code: 'MASTERY_CAP_EXCEEDED',
					message: `${skillId} mastery (${masteryTier}) exceeds its cap (${effectiveCap}). Your baseline cap is ${baseSkillMasteryTier}. Spend points to elevate the limit or gain a feature that grants this.`
				});
			}

			// Check if skill exceeds baseline but has no elevation source
			if (masteryTier > baseSkillMasteryTier) {
				const hasSpentElevation = skillLimitElevations[skillId]?.source === 'spent_points';
				const hasFeatureElevation = skillMasteryCapEffects.some(
					(effect) => !effect.options || effect.options.includes(skillId)
				);

				if (!hasSpentElevation && !hasFeatureElevation) {
					errors.push({
						step: BuildStep.Background,
						field: skillId,
						code: 'INVALID_MASTERY_GRANT',
						message: `${skillId} exceeds baseline cap but has no elevation. You must either spend points to elevate the limit or have a feature that grants this.`
					});
				}
			}
		}
	}

	// Count how many skills use feature elevations (not spent points)
	const skillsUsingFeatureElevation = Object.entries(buildData.skillsData ?? {}).filter(
		([skillId, level]) => {
			if (!level || getMasteryTierFromPoints(level) <= baseSkillMasteryTier) return false;
			const hasSpentElevation = skillLimitElevations[skillId]?.source === 'spent_points';
			return !hasSpentElevation; // Uses feature elevation
		}
	).length;

	if (skillsUsingFeatureElevation > totalSkillCapExceptionsBudget) {
		errors.push({
			step: BuildStep.Background,
			field: 'skills',
			code: 'MASTERY_CAP_EXCEEDED',
			message: `${skillsUsingFeatureElevation} skills rely on feature mastery grants, but only ${totalSkillCapExceptionsBudget} grants available from features.`
		});
	}

	// Same validation for trades
	if (buildData.tradesData) {
		for (const [tradeId, masteryLevel] of Object.entries(buildData.tradesData)) {
			if (!masteryLevel) continue;

			const masteryTier = getMasteryTierFromPoints(masteryLevel);
			const effectiveCap = getEffectiveTradeCap(tradeId);

			if (masteryTier > effectiveCap) {
				errors.push({
					step: BuildStep.Background,
					field: tradeId,
					code: 'MASTERY_CAP_EXCEEDED',
					message: `${tradeId} mastery (${masteryTier}) exceeds its cap (${effectiveCap}). Your baseline cap is ${baseTradeMasteryTier}. Spend points to elevate the limit or gain a feature that grants this.`
				});
			}

			// Check if trade exceeds baseline but has no elevation source
			if (masteryTier > baseTradeMasteryTier) {
				const hasSpentElevation = tradeLimitElevations[tradeId]?.source === 'spent_points';
				const hasFeatureElevation = tradeMasteryCapEffects.some(
					(effect) => !effect.options || effect.options.includes(tradeId)
				);

				if (!hasSpentElevation && !hasFeatureElevation) {
					errors.push({
						step: BuildStep.Background,
						field: tradeId,
						code: 'INVALID_MASTERY_GRANT',
						message: `${tradeId} exceeds baseline cap but has no elevation. You must either spend points to elevate the limit or have a feature that grants this.`
					});
				}
			}
		}
	}

	const tradesUsingFeatureElevation = Object.entries(buildData.tradesData ?? {}).filter(
		([tradeId, level]) => {
			if (!level || getMasteryTierFromPoints(level) <= baseTradeMasteryTier) return false;
			const hasSpentElevation = tradeLimitElevations[tradeId]?.source === 'spent_points';
			return !hasSpentElevation; // Uses feature elevation
		}
	).length;

	if (tradesUsingFeatureElevation > totalTradeCapExceptionsBudget) {
		errors.push({
			step: BuildStep.Background,
			field: 'trades',
			code: 'MASTERY_CAP_EXCEEDED',
			message: `${tradesUsingFeatureElevation} trades rely on feature mastery grants, but only ${totalTradeCapExceptionsBudget} grants available from features.`
		});
	}

	// DC20 Rule: "A Skill can only benefit from 1 bonus to its Skill Mastery Limit at a time."
	// Validate that no skill has both spent points elevation AND feature elevation
	if (buildData.skillsData) {
		for (const skillId of Object.keys(buildData.skillsData)) {
			const hasSpentElevation = skillLimitElevations[skillId]?.source === 'spent_points';
			const hasFeatureElevation = skillMasteryCapEffects.some(
				(effect) => !effect.options || effect.options.includes(skillId)
			);

			if (hasSpentElevation && hasFeatureElevation) {
				errors.push({
					step: BuildStep.Background,
					field: skillId,
					code: 'DUPLICATE_MASTERY_ELEVATION',
					message: `${skillId} cannot have both a point-based and feature-based mastery limit increase. A skill can only benefit from 1 bonus to its Mastery Limit at a time.`
				});
			}
		}
	}

	// Same for trades
	if (buildData.tradesData) {
		for (const tradeId of Object.keys(buildData.tradesData)) {
			const hasSpentElevation = tradeLimitElevations[tradeId]?.source === 'spent_points';
			const hasFeatureElevation = tradeMasteryCapEffects.some(
				(effect) => !effect.options || effect.options.includes(tradeId)
			);

			if (hasSpentElevation && hasFeatureElevation) {
				errors.push({
					step: BuildStep.Background,
					field: tradeId,
					code: 'DUPLICATE_MASTERY_ELEVATION',
					message: `${tradeId} cannot have both a point-based and feature-based mastery limit increase. A trade can only benefit from 1 bonus to its Mastery Limit at a time.`
				});
			}
		}
	}

	// For UI: levelAllowsUnlimitedMastery means baseline >= Adept, so no special tracking needed
	const levelAllowsUnlimitedMastery = baseSkillMasteryTier >= 2;
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
		// Level 1-4: Players can exceed baseline by:
		// 1. Spending points (1 point to elevate limit + 1 point for level)
		// 2. Having a feature that grants mastery cap increase
		// DC20 Rule: No free slots - must pay or have feature
		const bonusAdeptSlots = skillMasteryCapEffects.reduce(
			(total, effect) => total + effect.count,
			0
		);
		// Feature slots + unlimited paid elevations (but paid costs skill points)
		// For UI purposes, show feature slots as the "free" cap, since spending points is always available
		maxAdeptCount = bonusAdeptSlots;
		// Can always select Adept if willing to pay the point cost
		canSelectAdept = true;
	}

	// Max mastery tier for UI dropdowns
	const maxSkillMastery = baseSkillMasteryTier;
	const maxTradeMastery = baseTradeMasteryTier;

	// --- START SPELL SLOT VALIDATION (M3.20) ---
	if (buildData.selectedSpells) {
		Object.entries(buildData.selectedSpells).forEach(([slotId, spellId]) => {
			const slot = spellsKnownSlots.find((s) => s.id === slotId);
			const spell = getSpellById(spellId);

			if (!slot) {
				errors.push({
					step: BuildStep.SpellsAndManeuvers,
					field: 'selectedSpells',
					code: 'INVALID_SLOT',
					message: `Selected spell is assigned to a non-existent slot: ${slotId}`
				});
				return;
			}

			if (!spell) {
				errors.push({
					step: BuildStep.SpellsAndManeuvers,
					field: slotId,
					code: 'INVALID_SPELL',
					message: `Slot ${slot.sourceName} has an invalid spell assigned.`
				});
				return;
			}

			// Validate slot-specific restrictions
			if (slot.specificRestrictions) {
				const { schools, tags } = slot.specificRestrictions;

				if (schools && schools.length > 0) {
					if (!schools.includes(spell.school)) {
						errors.push({
							step: BuildStep.SpellsAndManeuvers,
							field: slotId,
							code: 'SCHOOL_RESTRICTION',
							message: `${spell.name} (${spell.school}) does not match allowed schools for ${slot.sourceName}: ${schools.join(', ')}`
						});
					}
				}

				if (tags && tags.length > 0) {
					const hasValidTag = tags.some((tag: any) => spell.tags?.includes(tag));
					if (!hasValidTag) {
						errors.push({
							step: BuildStep.SpellsAndManeuvers,
							field: slotId,
							code: 'TAG_RESTRICTION',
							message: `${spell.name} does not have any required tags for ${slot.sourceName}: ${tags.join(', ')}`
						});
					}
				}
			}

			// Validate global magic profile (if not already covered by specific restrictions)
			if (slot.isGlobal && globalMagicProfile) {
				const { sources, schools, tags } = globalMagicProfile;

				const matchesSource = sources.some((src: any) => spell.sources.includes(src));
				const matchesSchool = schools.length === 0 || schools.includes(spell.school);
				const matchesTags = tags.length === 0 || tags.some((tag: any) => spell.tags?.includes(tag));

				if (!matchesSource || !matchesSchool || !matchesTags) {
					errors.push({
						step: BuildStep.SpellsAndManeuvers,
						field: slotId,
						code: 'PROFILE_MISMATCH',
						message: `${spell.name} does not match your character's Global Magic Profile.`
					});
				}
			}
		});
	}
	// --- END SPELL SLOT VALIDATION ---

	// Build per-skill/trade effective caps for UI
	const skillEffectiveCaps: Record<string, number> = {};
	const tradeEffectiveCaps: Record<string, number> = {};

	// Calculate effective cap for all skills in the character's data
	if (buildData.skillsData) {
		for (const skillId of Object.keys(buildData.skillsData)) {
			skillEffectiveCaps[skillId] = getEffectiveSkillCap(skillId);
		}
	}

	// Calculate effective cap for all trades in the character's data
	if (buildData.tradesData) {
		for (const tradeId of Object.keys(buildData.tradesData)) {
			tradeEffectiveCaps[tradeId] = getEffectiveTradeCap(tradeId);
		}
	}

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
			canSelectAdept,
			// New fields for DC20 0.10 mastery cap system
			baselineSkillCap: baseSkillMasteryTier,
			baselineTradeCap: baseTradeMasteryTier,
			skillEffectiveCaps,
			tradeEffectiveCaps,
			skillLimitElevations: skillLimitElevations,
			tradeLimitElevations: tradeLimitElevations,
			skillFeatureElevationsAvailable: totalSkillCapExceptionsBudget,
			tradeFeatureElevationsAvailable: totalTradeCapExceptionsBudget
		}
	};

	// 6. Collect abilities, movements, and conditional modifiers (via abilityCollection module)
	const grantedAbilities = collectGrantedAbilities(resolvedEffects);
	const movements = collectMovements(resolvedEffects, finalMoveSpeed);
	const conditionalModifiers = collectConditionalModifiers(resolvedEffects);

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
		combatTraining: [],
		resistances: [],
		vulnerabilities: [],
		senses: [],
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

