import { describe, expect, it } from 'vitest';
import { getStylesForWeaponType, getWeaponProperty } from '../options/weaponOptions';
import { validateEquipment, validateSpellFocus, validateWeapon } from './equipmentValidator';

const baseWeapon = {
	weaponType: 'melee' as const,
	style: 'spear' as const,
	damageType: 'piercing' as const
};

describe('validateWeapon', () => {
	it('uses v0.10.5 custom weapon costs for Toss and Thrown', () => {
		expect(getWeaponProperty('toss')?.cost).toBe(1);
		expect(getWeaponProperty('thrown')?.cost).toBe(2);
		expect(getWeaponProperty('two-handed')?.cost).toBe(-1);
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

	it('requires Ammo on ranged weapons because it is inherent', () => {
		const result = validateWeapon({
			weaponType: 'ranged',
			style: 'bow',
			damageType: 'piercing',
			properties: ['two-handed', 'impact']
		});

		expect(result.isValid).toBe(false);
		expect(result.errors).toContainEqual(
			expect.objectContaining({
				propertyId: 'ammo',
				message: 'Ranged weapons automatically include "Ammo"'
			})
		);
	});

	it('uses a 1-point ranged base budget plus Two-Handed as a -1 point property', () => {
		const result = validateWeapon({
			weaponType: 'ranged',
			style: 'bow',
			damageType: 'piercing',
			properties: ['ammo', 'two-handed', 'impact', 'silent']
		});

		expect(result.isValid).toBe(true);
	});

	it('limits ranged weapons that remove Two-Handed to 1 positive property point', () => {
		const result = validateWeapon({
			weaponType: 'ranged',
			style: 'bow',
			damageType: 'piercing',
			properties: ['ammo', 'impact', 'silent']
		});

		expect(result.isValid).toBe(false);
		expect(result.errors).toContainEqual(
			expect.objectContaining({
				message: 'Points spent (2) exceeds maximum (1)'
			})
		);
	});

	it('allows every weapon style for either type under the v0.10.5 reskinning rule', () => {
		expect(getStylesForWeaponType('melee').map((style) => style.id)).toContain('bow');
		expect(getStylesForWeaponType('ranged').map((style) => style.id)).toContain('axe');
	});

	it('requires Multi-Faceted weapons to choose a different secondary style', () => {
		const missingSecondary = validateWeapon({
			...baseWeapon,
			properties: ['multi-faceted']
		});
		const duplicateStyle = validateWeapon({
			...baseWeapon,
			secondaryStyle: 'spear',
			properties: ['multi-faceted']
		});

		expect(missingSecondary.isValid).toBe(false);
		expect(missingSecondary.errors).toContainEqual(
			expect.objectContaining({ propertyId: 'multi-faceted' })
		);
		expect(duplicateStyle.isValid).toBe(false);
		expect(duplicateStyle.errors).toContainEqual(
			expect.objectContaining({ message: 'Multi-Faceted requires two different weapon styles' })
		);
	});
});

describe('validateSpellFocus', () => {
	it('uses Two-Handed as a -1 property against the 1-point base budget', () => {
		const result = validateSpellFocus({
			hands: 'two-handed',
			properties: ['two-handed-focus', 'channeling', 'vicious']
		});

		expect(result.isValid).toBe(true);
	});

	it('rejects three positive properties on a two-handed focus', () => {
		const result = validateSpellFocus({
			hands: 'two-handed',
			properties: ['two-handed-focus', 'channeling', 'vicious', 'protective']
		});

		expect(result.isValid).toBe(false);
		expect(result.errors).toContainEqual(
			expect.objectContaining({
				message: 'Points spent (2) exceeds maximum (1)'
			})
		);
	});
});

describe('validateEquipment general equipment', () => {
	it('requires only a name', () => {
		expect(validateEquipment({ category: 'general', name: 'Field Journal' }).isValid).toBe(true);
		expect(validateEquipment({ category: 'general', name: '   ' })).toEqual(
			expect.objectContaining({
				isValid: false,
				errors: [{ message: 'General equipment requires a name' }]
			})
		);
	});
});
