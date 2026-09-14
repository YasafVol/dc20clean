import { describe, expect, it } from 'vitest';
import {
	NATURAL_WEAPON_ATTACK_ID,
	getNaturalWeaponAttack,
	isNaturalWeaponAttack
} from './naturalWeaponAttack';

describe('getNaturalWeaponAttack', () => {
	it('derives an unarmed strike from the Beastborn Natural Weapon trait', () => {
		const attack = getNaturalWeaponAttack(['beastborn_natural_weapon']);

		expect(attack).toMatchObject({
			id: NATURAL_WEAPON_ATTACK_ID,
			weaponName: 'Unarmed Strike',
			name: 'Natural Weapon (Unarmed Strike)',
			damage: '1 B/P/S',
			damageType: 'bludgeoning/piercing/slashing'
		});
		expect(isNaturalWeaponAttack(attack!)).toBe(true);
	});

	it('supports legacy JSON trait storage', () => {
		expect(getNaturalWeaponAttack('["beastborn_natural_weapon"]')).not.toBeNull();
	});

	it('does not add an attack without the trait', () => {
		expect(getNaturalWeaponAttack(['beastborn_full_flight'])).toBeNull();
	});
});
