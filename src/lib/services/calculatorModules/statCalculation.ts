/**
 * Stat Calculation Module
 *
 * Computes derived stats: attributes, defenses, resources, saves,
 * prime modifier, combat mastery, and movement values.
 * Extracted from the main calculateCharacterWithBreakdowns function.
 */

import type { EnhancedCharacterBuildData, AttributedEffect, EnhancedStatBreakdown } from '../../types/effectSystem';
import { attributesData } from '../../rulesdata/attributes';
import { getLevelCaps } from '../../rulesdata/progression/levelCaps';
import { createStatBreakdown, createInitiativeBreakdown, createMartialCheckBreakdown } from './breakdownGeneration';

export interface DerivedStats {
	// Final attributes
	finalMight: number;
	finalAgility: number;
	finalCharisma: number;
	finalIntelligence: number;

	// Combat
	combatMastery: number;
	primeModifier: number;
	primeAttribute: string;
	usePrimeCapRule: boolean;

	// Resources (before breakdown application)
	baseHPMax: number;
	baseSPMax: number;
	baseMPMax: number;

	// Defenses
	basePD: number;
	baseAD: number;
	finalPD: number;
	finalAD: number;
	finalPDR: number;

	// Saves
	finalSaveDC: number;
	finalSaveMight: number;
	finalSaveAgility: number;
	finalSaveCharisma: number;
	finalSaveIntelligence: number;
	finalDeathThreshold: number;

	// Movement
	baseMoveSpeed: number;
	baseJumpDistance: number;

	// Other
	finalGritPoints: number;
	finalInitiativeBonus: number;
	attackSpellCheckBase: number;

	// Breakdowns
	breakdowns: Record<string, EnhancedStatBreakdown>;

	// Post-breakdown final values
	finalHPMax: number;
	finalSPMax: number;
	finalMPMax: number;
	finalMoveSpeed: number;
	finalJumpDistance: number;
	finalAttributePoints: number;
	finalRestPoints: number;

	// Martial check
	finalMartialCheck: number;
}

/**
 * Calculate all derived stats and breakdowns from build data and effects.
 */
export function calculateDerivedStats(
	buildData: EnhancedCharacterBuildData,
	resolvedEffects: AttributedEffect[],
	activeConditions: Set<string>,
	progressionGains: {
		totalHP: number;
		totalSP: number;
		totalMP: number;
		totalAttributePoints: number;
	}
): DerivedStats {
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

	const finalMight = breakdowns.attribute_might.total;
	const finalAgility = breakdowns.attribute_agility.total;
	const finalCharisma = breakdowns.attribute_charisma.total;
	const finalIntelligence = breakdowns.attribute_intelligence.total;

	// Derived stats
	const combatMastery = Math.ceil(buildData.level / 2);
	const levelCapsForPrime = getLevelCaps(buildData.level);

	// Health & Resources
	let baseHPMax = finalMight + progressionGains.totalHP;
	const baseSPMax = progressionGains.totalSP;
	const baseMPMax = progressionGains.totalMP;

	// Defenses
	const basePD = 8 + combatMastery + finalAgility + finalIntelligence;
	const baseAD = 8 + combatMastery + finalMight + finalCharisma;
	const pdModifiers = resolvedEffects
		.filter(
			(e) =>
				e.resolved &&
				(e as any).type === 'MODIFY_STAT' &&
				(e as any).target === 'pd' &&
				(!(e as any).condition || activeConditions.has((e as any).condition))
		)
		.reduce((sum, e) => sum + ((e as any).value as number), 0);
	const adModifiers = resolvedEffects
		.filter(
			(e) =>
				e.resolved &&
				(e as any).type === 'MODIFY_STAT' &&
				(e as any).target === 'ad' &&
				(!(e as any).condition || activeConditions.has((e as any).condition))
		)
		.reduce((sum, e) => sum + ((e as any).value as number), 0);
	const finalPD = buildData.manualPD ?? basePD + pdModifiers;
	const finalAD = buildData.manualAD ?? baseAD + adModifiers;
	const finalPDR = buildData.manualPDR ?? 0;

	// Prime
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

	// Saves and other derived
	const finalSaveDC = 10 + combatMastery + primeModifier;
	const finalSaveMight = finalMight + combatMastery;
	const finalSaveAgility = finalAgility + combatMastery;
	const finalSaveCharisma = finalCharisma + combatMastery;
	const finalSaveIntelligence = finalIntelligence + combatMastery;
	const finalDeathThreshold = primeModifier + combatMastery;
	const baseMoveSpeed = 5;
	const baseJumpDistance = finalAgility;
	const finalGritPoints = Math.max(0, 2 + finalCharisma);
	const finalInitiativeBonus = combatMastery + finalAgility;

	// Create breakdowns for derived stats
	breakdowns.hpMax = createStatBreakdown('hpMax', baseHPMax, resolvedEffects, activeConditions);
	breakdowns.spMax = createStatBreakdown('spMax', baseSPMax, resolvedEffects, activeConditions);
	breakdowns.mpMax = createStatBreakdown('mpMax', baseMPMax, resolvedEffects, activeConditions);
	breakdowns.pd = createStatBreakdown('pd', basePD, resolvedEffects, activeConditions);
	breakdowns.ad = createStatBreakdown('ad', baseAD, resolvedEffects, activeConditions);

	breakdowns.attributePoints = createStatBreakdown(
		'attributePoints',
		12 + progressionGains.totalAttributePoints,
		resolvedEffects,
		activeConditions
	);

	// Movement breakdowns
	breakdowns.move_speed = createStatBreakdown('moveSpeed', baseMoveSpeed, resolvedEffects, activeConditions);
	breakdowns.jump_distance = createStatBreakdown('jumpDistance', baseJumpDistance, resolvedEffects, activeConditions);

	// Final values from breakdowns
	const finalHPMax = breakdowns.hpMax.total;
	const finalSPMax = breakdowns.spMax.total;
	const finalMPMax = breakdowns.mpMax.total;
	const finalMoveSpeed = breakdowns.move_speed.total;
	const finalJumpDistance = breakdowns.jump_distance.total;
	const finalAttributePoints = breakdowns.attributePoints.total;
	const finalRestPoints = finalHPMax;

	// Combat breakdowns
	const attackSpellCheckBase = combatMastery + primeModifier;
	breakdowns.attack_spell_check = createStatBreakdown('attackSpellCheck', attackSpellCheckBase, resolvedEffects, activeConditions);
	breakdowns.save_dc = createStatBreakdown('saveDC', finalSaveDC, resolvedEffects, activeConditions);

	// Initiative breakdown
	breakdowns.initiative = createInitiativeBreakdown(combatMastery, finalAgility, finalInitiativeBonus);

	// Martial check
	const skills = buildData.skillsData ?? {};
	const acrobaticsProficiency = skills['acrobatics'] || 0;
	const athleticsProficiency = skills['athletics'] || 0;
	const acrobaticsTotal = finalAgility + acrobaticsProficiency * 2;
	const athleticsTotal = finalMight + athleticsProficiency * 2;
	const finalMartialCheck = Math.max(acrobaticsTotal, athleticsTotal);

	breakdowns.martial_check = createMartialCheckBreakdown(
		finalAgility,
		finalMight,
		acrobaticsProficiency,
		athleticsProficiency,
		finalMartialCheck
	);

	return {
		finalMight,
		finalAgility,
		finalCharisma,
		finalIntelligence,
		combatMastery,
		primeModifier,
		primeAttribute,
		usePrimeCapRule,
		baseHPMax,
		baseSPMax,
		baseMPMax,
		basePD,
		baseAD,
		finalPD,
		finalAD,
		finalPDR,
		finalSaveDC,
		finalSaveMight,
		finalSaveAgility,
		finalSaveCharisma,
		finalSaveIntelligence,
		finalDeathThreshold,
		baseMoveSpeed,
		baseJumpDistance,
		finalGritPoints,
		finalInitiativeBonus,
		attackSpellCheckBase,
		breakdowns,
		finalHPMax,
		finalSPMax,
		finalMPMax,
		finalMoveSpeed,
		finalJumpDistance,
		finalAttributePoints,
		finalRestPoints,
		finalMartialCheck
	};
}
