import { describe, expect, it } from 'vitest';
import { getRollModeWithFeatureAdvantage } from './alternativeRollPresentation';

describe('getRollModeWithFeatureAdvantage', () => {
	it('applies Rage advantage to an otherwise normal Might Save', () => {
		expect(getRollModeWithFeatureAdvantage({ mode: 'normal', stacks: 0, penalty: 0 }, 1)).toBe(
			'advantage'
		);
	});

	it('cancels one stack of disadvantage', () => {
		expect(
			getRollModeWithFeatureAdvantage({ mode: 'disadvantage', stacks: 1, penalty: 0 }, 1)
		).toBe('normal');
	});

	it('preserves remaining disadvantage stacks', () => {
		expect(
			getRollModeWithFeatureAdvantage({ mode: 'disadvantage', stacks: 2, penalty: 0 }, 1)
		).toBe('disadvantage');
	});
});
