import { describe, expect, it } from 'vitest';
import { ItemType, WeaponType, type Weapon } from '../../lib/rulesdata/inventoryItems';
import type { AttackData } from '../../types';
import { getAttackPresentation } from './attackPresentation';

const attack = (name: string, damage = '1 S'): AttackData => ({
	id: name,
	weaponName: name,
	name,
	attackBonus: 0,
	damage,
	damageType: 'slashing',
	brutalDamage: '',
	heavyHitEffect: ''
});

const rageModifier = {
	condition: 'while_raging',
	description: 'Rage damage',
	affectedStats: ['martial_melee_damage'],
	effect: { target: 'martial_melee_damage', value: 1, resolved: true }
} as any;

const meleeWeapon = {
	itemType: ItemType.Weapon,
	name: 'Longsword',
	type: WeaponType.Melee,
	style: 'Sword',
	handedness: 'Versatile',
	damage: '1 S',
	properties: []
} as Weapon;

describe('getAttackPresentation', () => {
	it('adds active Rage damage to melee weapon hit tiers', () => {
		expect(
			getAttackPresentation({
				attack: attack('Longsword'),
				weapon: meleeWeapon,
				conditionalModifiers: [rageModifier],
				activeConditions: ['while_raging']
			})
		).toMatchObject({ baseDamage: '2 S', heavyDamage: '3 S', brutalDamage: '4 S' });
	});

	it('supports persisted Unarmed Strike rows without catalog metadata', () => {
		expect(
			getAttackPresentation({
				attack: attack('Unarmed Strike', '0 B'),
				weapon: null,
				conditionalModifiers: [rageModifier],
				activeConditions: ['while_raging']
			})
		).toMatchObject({ isSupportedAttack: true, baseDamage: '1 B', heavyDamage: '2 B' });
	});

	it('presents an unresolved Natural Weapon damage type across every hit tier', () => {
		expect(
			getAttackPresentation({
				attack: attack('Unarmed Strike', '1 B/P/S'),
				weapon: null
			})
		).toMatchObject({
			isSupportedAttack: true,
			baseDamage: '1 B/P/S',
			heavyDamage: '2 B/P/S',
			brutalDamage: '3 B/P/S',
			damageType: 'bludgeoning/piercing/slashing'
		});
	});

	it('does not apply melee effects when the condition is inactive', () => {
		expect(
			getAttackPresentation({
				attack: attack('Longsword'),
				weapon: meleeWeapon,
				conditionalModifiers: [rageModifier]
			})
		).toMatchObject({ conditionalDamageBonus: 0, baseDamage: '1 S' });
	});

	it('applies a brutal-only bonus without changing base or heavy damage', () => {
		expect(
			getAttackPresentation({
				attack: attack('Longsword'),
				weapon: meleeWeapon,
				brutalDamageBonus: 1
			})
		).toMatchObject({ baseDamage: '1 S', heavyDamage: '2 S', brutalDamage: '4 S' });
	});
});
