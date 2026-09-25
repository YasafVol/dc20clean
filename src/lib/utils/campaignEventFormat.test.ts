import { describe, expect, it } from 'vitest';
import { formatDiceRollExpression } from './campaignEventFormat';

describe('formatDiceRollExpression', () => {
	it('shows the dice, positive modifier, and final total', () => {
		expect(
			formatDiceRollExpression({
				label: 'Attack',
				mode: 'normal',
				allResults: [14],
				modifier: 5,
				total: 19
			})
		).toBe('Attack [14] +5 = 19');
	});

	it('shows all advantage dice and a negative modifier', () => {
		expect(
			formatDiceRollExpression({
				label: 'Stealth',
				mode: 'advantage',
				allResults: [8, 17],
				modifier: -2,
				total: 15
			})
		).toBe('Stealth (adv) [8, 17] -2 = 15');
	});
});
