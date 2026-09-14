import { describe, expect, it } from 'vitest';
import { parseDamage } from '../utils/weaponUtils';
import { PRESET_WEAPONS } from './equipment/options/weaponOptions';
import { WeaponHandedness, WeaponStyle, WeaponType, weapons } from './inventoryItems';

const weaponByName = (name: string) => {
	const weapon = weapons.find((candidate) => candidate.name === name);
	if (!weapon) throw new Error(`Missing weapon: ${name}`);
	return weapon;
};

describe('current weapon catalog', () => {
	it('expands the 45 rules-table rows into all 48 named weapons', () => {
		expect(PRESET_WEAPONS).toHaveLength(45);
		expect(weapons).toHaveLength(48);
		expect(weapons.map((weapon) => weapon.name)).toEqual([
			'Sickle',
			'Hand Axe',
			'Throwing Star',
			'Brass Knuckles',
			'Club',
			'Light Hammer',
			'Boomerang',
			'Mining Pick',
			'Dart',
			'Javelin',
			'Throwing Dagger',
			'Short Sword',
			'Rapier',
			'Chain Whip',
			'Battleaxe',
			'Flail',
			'Morningstar',
			'Warhammer',
			'Pickaxe',
			'Spear',
			'Long Spear',
			'Bo Staff',
			'Longsword',
			'Bastard Sword',
			'Bull Whip',
			'Scythe',
			'Greataxe',
			'Halberd',
			'War Flail',
			'Meteor Hammer',
			'Greatmaul',
			'Pike',
			'Quarterstaff',
			'Glaive',
			'Greatsword',
			'Great Whip',
			'Sling',
			'Hand Crossbow',
			'Hand Stonebow',
			'Shortbow',
			'Longbow',
			'Greatbow',
			'Blowgun (Needle)',
			'Light Crossbow',
			'Heavy Crossbow',
			'Stonebow',
			'Slingshot',
			'War Sling'
		]);
	});

	it('uses the corrected styles, damage types, handedness, and properties', () => {
		expect(weaponByName('Dart')).toMatchObject({
			style: WeaponStyle.Spear,
			properties: ['Concealable', 'Toss (5/10)']
		});
		expect(weaponByName('Mining Pick').properties).toEqual(['Impact', 'Toss (5/10)']);
		expect(weaponByName('Flail')).toMatchObject({
			style: [WeaponStyle.Hammer, WeaponStyle.Whip],
			damage: '1 B/S',
			properties: ['Versatile', 'Multi-Faceted']
		});
		expect(weaponByName('War Flail')).toMatchObject({
			style: [WeaponStyle.Hammer, WeaponStyle.Whip],
			damage: '2 B/S',
			properties: ['Two-Handed', 'Heavy', 'Multi-Faceted']
		});
		expect(weaponByName('Meteor Hammer')).toMatchObject({
			style: [WeaponStyle.Hammer, WeaponStyle.Whip],
			damage: '2 B/S'
		});
		expect(weaponByName('Boomerang')).toMatchObject({
			type: WeaponType.Melee,
			handedness: WeaponHandedness.OneHanded
		});
		expect(weaponByName('Sling')).toMatchObject({
			style: WeaponStyle.Sling,
			handedness: WeaponHandedness.OneHanded,
			properties: ['Ammo', 'Impact', 'Range (15/45)']
		});
		expect(weaponByName('Hand Crossbow')).toMatchObject({
			handedness: WeaponHandedness.OneHanded,
			damage: '2 P',
			properties: ['Ammo', 'Reload', 'Deft', 'Impact', 'Range (15/45)']
		});
		expect(weaponByName('Light Crossbow')).toMatchObject({
			damage: '3 P',
			properties: ['Two-Handed', 'Ammo', 'Reload', 'Deft', 'Heavy', 'Range (15/45)']
		});
		expect(weaponByName('Heavy Crossbow').properties).toEqual([
			'Two-Handed',
			'Ammo',
			'Reload',
			'Deft',
			'Impact',
			'Heavy',
			'Cumbersome',
			'Range (15/45)'
		]);
		expect(parseDamage(weaponByName('Flail').damage).typeDisplay).toBe('bludgeoning/slashing');
	});
});
