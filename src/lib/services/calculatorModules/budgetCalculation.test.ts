import { describe, expect, it } from 'vitest';
import type { EnhancedCharacterBuildData } from '../../types/effectSystem';
import { calculateBudgets } from './budgetCalculation';

const baseBuildData = (conversions: EnhancedCharacterBuildData['conversions']) =>
	({
		id: 'test-character',
		finalName: 'Test Character',
		level: 1,
		attribute_might: 0,
		attribute_agility: 0,
		attribute_charisma: 0,
		attribute_intelligence: 0,
		combatMastery: 1,
		classId: 'champion',
		selectedTraitIds: [],
		selectedTraitChoices: {},
		featureChoices: {},
		skillsData: {},
		tradesData: {},
		languagesData: { common: { fluency: 'fluent' } },
		conversions,
		selectedSpells: {},
		selectedManeuvers: [],
		lastModified: 0
	}) as EnhancedCharacterBuildData;

describe('calculateBudgets background conversions', () => {
	const progressionGains = { totalSkillPoints: 0, totalTradePoints: 0 };

	it('does not allow standalone trade-to-skill conversion', () => {
		const result = calculateBudgets(
			baseBuildData({ skillToTrade: 0, tradeToSkill: 4, tradeToLanguage: 0 }),
			[],
			progressionGains,
			0
		);

		expect(result.background.availableSkillPoints).toBe(5);
		expect(result.background.availableTradePoints).toBe(3);
		expect(result.background.conversions).toEqual({
			skillToTrade: 0,
			tradeToSkill: 0,
			tradeToLanguage: 0
		});
	});

	it('uses trade-to-skill only as an undo of prior skill-to-trade conversion', () => {
		const result = calculateBudgets(
			baseBuildData({ skillToTrade: 2, tradeToSkill: 2, tradeToLanguage: 0 }),
			[],
			progressionGains,
			0
		);

		expect(result.background.availableSkillPoints).toBe(4);
		expect(result.background.availableTradePoints).toBe(5);
		expect(result.background.conversions).toEqual({
			skillToTrade: 1,
			tradeToSkill: 0,
			tradeToLanguage: 0
		});
	});
});
