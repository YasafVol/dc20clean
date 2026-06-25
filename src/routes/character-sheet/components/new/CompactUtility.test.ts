import { describe, expect, it } from 'vitest';
import { getCompactUtilityCurrencyValues, getCompactUtilityDisplayData } from './CompactUtility';

describe('CompactUtility helpers', () => {
	it('falls back to stored character movement values when calculation data is unavailable', () => {
		expect(
			getCompactUtilityDisplayData(
				{
					finalMoveSpeed: 9,
					finalJumpDistance: 4
				} as any,
				null
			)
		).toMatchObject({
			speed: 9,
			jumpDistance: 4,
			movements: [],
			senses: [],
			resistances: [],
			vulnerabilities: [],
			combatTraining: []
		});
	});

	it('normalizes both canonical and legacy currency shapes', () => {
		expect(
			getCompactUtilityCurrencyValues({
				goldPieces: 13,
				silverPieces: 7,
				copperPieces: 2
			})
		).toEqual({
			gp: 13,
			sp: 7,
			cp: 2
		});

		expect(
			getCompactUtilityCurrencyValues({
				gold: 11,
				silver: 5,
				copper: 1
			})
		).toEqual({
			gp: 11,
			sp: 5,
			cp: 1
		});
	});
});
