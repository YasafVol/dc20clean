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

	it('calculates the complete spells-only progression for the level 5 Wizard scenario', () => {
		const build = createBuild('wizard', 5);
		build.selectedSubclass = 'Portal Mage';
		build.featureChoices = {
			wizard_spell_school_initiate_0: ['Elemental']
		};
		build.selectedTalents = {
			wizard_expanded_spell_school: 1,
			wizard_crowned_sigil: 1
		};
		build.pathPointAllocations = { spellcasting: 2 };

		const result = calculateCharacterWithBreakdowns(build);

		expect(result.stats.finalHPMax).toBe(11);
		expect(result.stats.finalSPMax).toBe(0);
		expect(result.stats.finalMPMax).toBe(18);
		expect(result.stats.finalCombatMastery).toBe(3);
		expect(result.stats.manaSpendLimit).toBe(3);
		expect(result.levelBudgets).toMatchObject({
			totalTalents: 2,
			totalPathPoints: 2,
			totalAncestryPoints: 2,
			totalAttributePoints: 2,
			totalSkillPoints: 3,
			totalTradePoints: 2,
			totalSpellsKnown: 8,
			pendingSubclassChoices: 1
		});
		expect(result.spellsKnownSlots).toHaveLength(13);
		expect(result.spellsKnownSlots.every((slot) => slot.type === 'spell')).toBe(true);
		expect(
			result.spellsKnownSlots.filter((slot) => slot.sourceName === 'Wizard Progression')
		).toHaveLength(8);
		expect(
			result.spellsKnownSlots.filter((slot) => slot.sourceName === 'Expanded Spell School')
		).toHaveLength(2);
		expect(
			result.grantedAbilities.some(
				(ability) =>
					ability.name === 'crowned_sigil' && ability.source.id === 'wizard_crowned_sigil'
			)
		).toBe(true);
		expect(result.crossPathGrants.combatTrainingGrants).toContain('Spell_Focuses');
		expect(result.levelBudgets).not.toHaveProperty('totalCantripsKnown');
	});

	it('calculates hybrid starting and capstone MP from the v0.10.5 level table', () => {
		expect(calculateCharacterWithBreakdowns(createBuild('spellblade', 1)).stats.finalMPMax).toBe(3);
		expect(calculateCharacterWithBreakdowns(createBuild('spellblade', 10)).stats.finalMPMax).toBe(
			11
		);
	});
});
