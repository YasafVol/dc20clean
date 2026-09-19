import { describe, expect, it } from 'vitest';
import type { SpellEnhancement } from '../../lib/rulesdata/schemas/spell.schema';
import {
	areSpellEnhancementRequirementsMet,
	calculateSpellCastSpend,
	calculateSpellEnhancementSpend,
	getSpellEnhancementKey
} from './spellCastSpend';

const enhancements: SpellEnhancement[] = [
	{
		id: 'range',
		name: 'Range',
		description: '',
		cost: { ap: 1 },
		repeatable: true
	},
	{
		id: 'healing',
		name: 'Increased Healing',
		description: '',
		cost: { mp: 1 },
		repeatable: true
	},
	{
		id: 'variable',
		name: 'Variable Mana',
		description: '',
		cost: { ap: 1, mp: 'X' },
		variable: true
	}
];

describe('spell cast spend', () => {
	it('adds base MP and repeatable enhancement MP while keeping AP separate', () => {
		expect(
			calculateSpellCastSpend(
				{ ap: 1, mp: 1 },
				enhancements,
				{
					range: { quantity: 2, costOptionIndex: 0 },
					healing: { quantity: 2, costOptionIndex: 0 }
				},
				0
			)
		).toEqual({ ap: 3, mp: 3 });
	});

	it('uses the selected amount for X costs without multiplying fixed companion costs', () => {
		expect(
			calculateSpellEnhancementSpend(enhancements[2], { quantity: 3, costOptionIndex: 0 })
		).toEqual({ ap: 1, mp: 3 });
	});

	it('uses the chosen alternative resource cost', () => {
		const alternative: SpellEnhancement = {
			id: 'alternative',
			name: 'Alternative',
			description: '',
			cost: { ap: 2 },
			alternativeCosts: [{ mp: 1 }]
		};

		expect(
			calculateSpellEnhancementSpend(alternative, { quantity: 1, costOptionIndex: 1 })
		).toEqual({ ap: 0, mp: 1 });
	});

	it('checks prerequisite selections by enhancement id', () => {
		const dependent: SpellEnhancement = {
			id: 'dependent',
			name: 'Dependent',
			description: '',
			cost: { mp: 1 },
			requires: ['range']
		};
		const availableEnhancements = [...enhancements, dependent];

		expect(areSpellEnhancementRequirementsMet(dependent, availableEnhancements, {})).toBe(false);
		expect(
			areSpellEnhancementRequirementsMet(dependent, availableEnhancements, {
				[getSpellEnhancementKey(enhancements[0], 0)]: { quantity: 1, costOptionIndex: 0 }
			})
		).toBe(true);
	});
});
