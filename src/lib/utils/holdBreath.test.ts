import { describe, expect, it } from 'vitest';
import { calculateHoldBreath } from './holdBreath';

describe('calculateHoldBreath', () => {
	it('clamps missing, zero, and negative values to 1', () => {
		expect(calculateHoldBreath(undefined)).toBe(1);
		expect(calculateHoldBreath(Number.NaN)).toBe(1);
		expect(calculateHoldBreath(0)).toBe(1);
		expect(calculateHoldBreath(-2)).toBe(1);
	});

	it('preserves positive Might values', () => {
		expect(calculateHoldBreath(1)).toBe(1);
		expect(calculateHoldBreath(3)).toBe(3);
	});
});
