import { describe, it, expect } from 'vitest';
import { denormalizeMastery } from './denormalizeMastery';

describe('denormalizeMastery', () => {
	it('computes Brewing (intelligence) finalValue and ladder from ranks', () => {
		const out = denormalizeMastery({
			finalAttributes: { might: 1, agility: 0, charisma: 0, intelligence: 2, prime: 2 },
			skillsRanks: {},
			tradesRanks: { brewing: 2 },
			languagesData: { common: { fluency: 'fluent' } }
		});

		// Brewing isn’t a knowledge trade, appears in practical pool and sorted selection
		const picks = out.masteryLadders.practicalTrades;
		const anySlot = picks.A || picks.B || picks.C || picks.D;
		expect(anySlot).toBeDefined();
		if (anySlot) {
			expect(anySlot.finalValue).toBeGreaterThanOrEqual(6); // 2 (Int) + 4 masteryLevel
		}
	});

	it('sets languageMastery A–D from languagesData map', () => {
		const out = denormalizeMastery({
			finalAttributes: { might: 0, agility: 0, charisma: 0, intelligence: 0, prime: 0 },
			skillsRanks: {},
			tradesRanks: {},
			languagesData: { common: { fluency: 'fluent' }, elvish: { fluency: 'limited' }, dwarvish: { fluency: 'fluent' } }
		});
		expect(out.languageMastery.A).toBeDefined();
	});
});


