import { describe, expect, it } from 'vitest';
import { calculateCharacterWithBreakdowns } from './enhancedCharacterCalculator';
import type { EnhancedCharacterBuildData } from '../types/effectSystem';

function createBuild(classId: string, level: number): EnhancedCharacterBuildData {
	return {
		id: `${classId}-${level}`,
		finalName: 'Test Character',
		level,
		attribute_might: 0,
		attribute_agility: 0,
		attribute_charisma: 0,
		attribute_intelligence: 0,
		combatMastery: 0,
		classId,
		selectedTraitIds: [],
		selectedTraitChoices: {},
		featureChoices: {},
		selectedTalents: {},
		skillsData: {},
		tradesData: {},
		languagesData: { common: { fluency: 'fluent' } },
		conversions: { skillToTrade: 0, tradeToSkill: 0, tradeToLanguage: 0 },
		selectedSpells: {},
		selectedManeuvers: []
	};
}

describe('DC20 v0.10.5 progression resource calculation', () => {
	it('calculates martial resources from the v0.10.5 level table', () => {
		const result = calculateCharacterWithBreakdowns(createBuild('barbarian', 10));

		expect(result.stats.finalSPMax).toBe(6);
		expect(result.stats.finalMPMax).toBe(0);
		expect(result.levelBudgets.totalPathPoints).toBe(4);
		expect(result.levelBudgets.totalTalents).toBe(4);
		expect(result.levelBudgets.pendingSubclassChoices).toBe(3);
	});

	it('calculates spellcaster MP from the v0.10.5 level table', () => {
		const result = calculateCharacterWithBreakdowns(createBuild('wizard', 10));

		expect(result.stats.finalMPMax).toBe(21);
		expect(result.stats.finalSPMax).toBe(0);
		expect(result.levelBudgets.totalPathPoints).toBe(4);
		expect(result.levelBudgets.totalTalents).toBe(4);
		expect(result.levelBudgets.pendingSubclassChoices).toBe(3);
	});

	it('calculates hybrid starting and capstone MP from the v0.10.5 level table', () => {
		expect(calculateCharacterWithBreakdowns(createBuild('spellblade', 1)).stats.finalMPMax).toBe(3);
		expect(calculateCharacterWithBreakdowns(createBuild('spellblade', 10)).stats.finalMPMax).toBe(
			11
		);
	});
});
