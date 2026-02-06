/**
 * Budget Calculation Module
 *
 * Computes skill, trade, language, and ancestry point budgets.
 * Extracted from the main calculateCharacterWithBreakdowns function.
 */

import type { EnhancedCharacterBuildData, AttributedEffect } from '../../types/effectSystem';
import { traitsData } from '../../rulesdata/ancestries/traits';

export interface BudgetResult {
	background: {
		baseSkillPoints: number;
		baseTradePoints: number;
		baseLanguagePoints: number;
		availableSkillPoints: number;
		availableTradePoints: number;
		availableLanguagePoints: number;
		skillPointsUsed: number;
		tradePointsUsed: number;
		languagePointsUsed: number;
		conversions: { skillToTrade: number; tradeToSkill: number; tradeToLanguage: number };
		breakdown: {
			skillPoints: { base: number; intelligence: number; progression: number; talents: number; total: number };
			tradePoints: { base: number; progression: number; talents: number; total: number };
			languagePoints: { base: number; talents: number; total: number };
		};
	};
	ancestry: {
		baseAncestryPoints: number;
		ancestryPointsUsed: number;
		ancestryPointsRemaining: number;
	};
	/** Maneuver bonus from MODIFY_STAT effects */
	maneuverBonus: number;
	/** Spell bonus from MODIFY_STAT effects */
	spellBonus: number;
	/** Count of granted maneuvers from GRANT_MANEUVERS effects */
	grantedManeuversCount: number;
}

/**
 * Calculate all point budgets for background and ancestry.
 */
export function calculateBudgets(
	buildData: EnhancedCharacterBuildData,
	resolvedEffects: AttributedEffect[],
	progressionGains: { totalSkillPoints: number; totalTradePoints: number },
	finalIntelligence: number
): BudgetResult {
	const skills = buildData.skillsData ?? {};
	const trades = buildData.tradesData ?? {};
	const languages = buildData.languagesData ?? { common: { fluency: 'fluent' } };

	// Get mastery limit elevations from spent points (not from features)
	const skillLimitElevations = (buildData as any).skillMasteryLimitElevations ?? {};
	const tradeLimitElevations = (buildData as any).tradeMasteryLimitElevations ?? {};

	// Calculate skill points used
	let skillPointsUsed = 0;
	for (const [skillId, masteryLevel] of Object.entries(skills)) {
		if (!masteryLevel) continue;
		skillPointsUsed += masteryLevel;
		const elevation = skillLimitElevations[skillId];
		if (elevation?.source === 'spent_points') {
			skillPointsUsed += elevation.value;
		}
	}

	// Calculate trade points used
	let tradePointsUsed = 0;
	for (const [tradeId, masteryLevel] of Object.entries(trades)) {
		if (!masteryLevel) continue;
		tradePointsUsed += masteryLevel;
		const elevation = tradeLimitElevations[tradeId];
		if (elevation?.source === 'spent_points') {
			tradePointsUsed += elevation.value;
		}
	}

	const languagePointsUsed = Object.entries(languages).reduce(
		(sum, [id, d]) => (id === 'common' ? sum : sum + (d.fluency === 'limited' ? 1 : 2)),
		0
	);

	const bonus = (target: string) =>
		resolvedEffects
			.filter((e) => (e as any).type === 'MODIFY_STAT' && (e as any).target === target)
			.reduce((s, e) => s + Number((e as any).value || 0), 0);

	const baseSkillPoints =
		5 + progressionGains.totalSkillPoints + finalIntelligence + bonus('skillPoints');
	const baseTradePoints = 3 + progressionGains.totalTradePoints + bonus('tradePoints');
	const baseLanguagePoints = 2 + bonus('languagePoints');

	// Maneuver and spell bonuses
	const maneuverBonus = bonus('maneuversKnown');
	const spellBonus = bonus('spellsKnown');

	const grantedManeuversCount = resolvedEffects
		.filter((e) => {
			if ((e as any).type !== 'GRANT_MANEUVERS') return false;
			const target = String((e as any).target || '').toLowerCase();
			return target !== 'all_attack';
		})
		.reduce((sum, e) => sum + Number((e as any).value || 0), 0);

	if (maneuverBonus > 0 || grantedManeuversCount > 0) {
		console.log('🔢 [Calculation] Maneuver bonuses applied:', {
			fromTalents: maneuverBonus,
			fromFeatures: grantedManeuversCount,
			baseFromProgression: (progressionGains as any).totalManeuversKnown
		});
	}
	if (spellBonus > 0) {
		console.log('✨ [Spells] Spell bonus applied:', {
			fromTalents: spellBonus,
			baseFromProgression: (progressionGains as any).totalSpellsKnown
		});
	}

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

	const baseAncestryPoints = 5 + bonus('ancestryPoints');
	const ancestryPointsUsed = selectedTraitCosts;
	const ancestryPointsRemaining = baseAncestryPoints - ancestryPointsUsed;

	return {
		background: {
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
		},
		ancestry: {
			baseAncestryPoints,
			ancestryPointsUsed,
			ancestryPointsRemaining
		},
		maneuverBonus,
		spellBonus,
		grantedManeuversCount
	};
}
