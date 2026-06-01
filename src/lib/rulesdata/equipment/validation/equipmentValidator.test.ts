import { describe, expect, it } from 'vitest';
import { getWeaponProperty } from '../options/weaponOptions';
import { validateWeapon } from './equipmentValidator';

const baseWeapon = {
	weaponType: 'melee' as const,
	style: 'spear' as const,
	damageType: 'piercing' as const
};

describe('validateWeapon', () => {
	it('uses v0.10.5 custom weapon costs for Toss and Thrown', () => {
		expect(getWeaponProperty('toss')?.cost).toBe(1);
		expect(getWeaponProperty('thrown')?.cost).toBe(2);
	});

	it('allows Returning when the weapon has Thrown instead of Toss', () => {
		const result = validateWeapon({
			...baseWeapon,
			properties: ['thrown', 'returning'],
			maxPoints: 3
		});

		expect(result.errors).not.toContainEqual(
			expect.objectContaining({
				propertyId: 'returning'
			})
		);
		expect(result.isValid).toBe(true);
	});

	it('rejects Returning when the weapon has neither Toss nor Thrown', () => {
		const result = validateWeapon({
			...baseWeapon,
			properties: ['returning'],
			maxPoints: 3
		});

		expect(result.isValid).toBe(false);
		expect(result.errors).toContainEqual(
			expect.objectContaining({
				propertyId: 'returning',
				message: 'Property "Returning" requires one of "Toss" or "Thrown"'
			})
		);
	});
});
