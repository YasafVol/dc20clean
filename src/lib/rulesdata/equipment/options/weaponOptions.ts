/**
 * @file src/lib/rulesdata/equipment/options/weaponOptions.ts
 * @description Weapon types, styles, properties, and presets from DC20 0.10.
 */

import {
	WeaponTypeDefinition,
	WeaponStyleDefinition,
	WeaponProperty,
	PresetWeapon
} from '../schemas/weaponSchema';

// ================================================================= //
// WEAPON TYPES
// ================================================================= //

export const WEAPON_TYPES: WeaponTypeDefinition[] = [
	{
		id: 'melee',
		name: 'Melee Weapon',
		description: 'Melee Weapons use your Melee Range and deal 1 damage.',
		baseDamage: 1
	},
	{
		id: 'ranged',
		name: 'Ranged Weapon',
		description:
			'Ranged Weapons have a Range of 15/45 and deal 1 damage. They automatically gain Ammo and Two-Handed properties.',
		baseDamage: 1,
		baseRange: '15/45',
		inherentProperties: ['ammo', 'two-handed']
	}
];

// ================================================================= //
// WEAPON STYLES
// ================================================================= //

export const WEAPON_STYLES: WeaponStyleDefinition[] = [
	// Melee Styles
	{
		id: 'axe',
		name: 'Axe',
		defaultDamageType: 'slashing',
		enhancement: {
			name: 'Bleed',
			description: 'The target makes a Repeated Physical Save.',
			costToUse: '1 AP or 1 SP',
			saveType: 'Physical Save',
			effect: 'Failure: The target begins Bleeding.'
		},
		availableForMelee: true,
		availableForRanged: false
	},
	{
		id: 'fist',
		name: 'Fist',
		defaultDamageType: 'bludgeoning',
		enhancement: {
			name: 'Grapple',
			description: 'The target makes a Physical Save.',
			costToUse: '1 AP or 1 SP',
			saveType: 'Physical Save',
			effect: 'Failure: The target becomes Grappled by you.'
		},
		specialNotes: 'Fist Weapons are considered to be a free hand for the purposes of Grappling.',
		availableForMelee: true,
		availableForRanged: false
	},
	{
		id: 'hammer',
		name: 'Hammer',
		defaultDamageType: 'bludgeoning',
		enhancement: {
			name: 'Knockback',
			description: 'The target makes a Might Save.',
			costToUse: '1 AP or 1 SP',
			saveType: 'Might Save',
			effect:
				'Failure: The target is pushed 1 Space away. Each time you use this Enhancement, the target is pushed 1 additional Space.'
		},
		availableForMelee: true,
		availableForRanged: false
	},
	{
		id: 'pick',
		name: 'Pick',
		defaultDamageType: 'piercing',
		enhancement: {
			name: 'Hinder',
			description: 'The target makes an Agility Save.',
			costToUse: '1 AP or 1 SP',
			saveType: 'Agility Save',
			effect: 'Failure: The target becomes Hindered until the end of their next turn.'
		},
		availableForMelee: true,
		availableForRanged: false
	},
	{
		id: 'spear',
		name: 'Spear',
		defaultDamageType: 'piercing',
		enhancement: {
			name: 'Slow',
			description: 'The target makes an Agility Save.',
			costToUse: '1 AP or 1 SP',
			saveType: 'Agility Save',
			effect: 'Failure: The target becomes Slowed until the end of their next turn.'
		},
		availableForMelee: true,
		availableForRanged: false
	},
	{
		id: 'staff',
		name: 'Staff',
		defaultDamageType: 'bludgeoning',
		enhancement: {
			name: 'Trip',
			description: 'The target makes a Physical Save.',
			costToUse: '1 AP or 1 SP',
			saveType: 'Physical Save',
			effect: 'Failure: The target falls Prone.'
		},
		availableForMelee: true,
		availableForRanged: false
	},
	{
		id: 'sword',
		name: 'Sword',
		defaultDamageType: 'slashing',
		enhancement: {
			name: 'Accuracy',
			description: 'You add a d4 to your Attack Check.',
			costToUse: '1 AP or 1 SP',
			effect: 'You grant your Attack a d4 Help Die.'
		},
		availableForMelee: true,
		availableForRanged: false
	},
	{
		id: 'whip',
		name: 'Whip',
		defaultDamageType: 'slashing',
		enhancement: {
			name: 'Pull',
			description: 'The target makes a Might Save.',
			costToUse: '1 AP or 1 SP',
			saveType: 'Might Save',
			effect:
				'Failure: The target is moved horizontally 1 Space toward you or to your left or right. Each time you use this Enhancement, the target is moved 1 additional Space.'
		},
		availableForMelee: true,
		availableForRanged: false
	},
	// Ranged Styles
	{
		id: 'bow',
		name: 'Bow',
		defaultDamageType: 'piercing',
		enhancement: {
			name: 'Slow',
			description: 'The target makes an Agility Save.',
			costToUse: '1 AP or 1 SP',
			saveType: 'Agility Save',
			effect: 'Failure: The target is Slowed until the end of its next turn.'
		},
		availableForMelee: false,
		availableForRanged: true
	},
	{
		id: 'crossbow',
		name: 'Crossbow',
		defaultDamageType: 'piercing',
		enhancement: {
			name: 'Accuracy',
			description: 'You add a d4 to your Attack Check.',
			costToUse: '1 AP or 1 SP',
			effect: 'You grant your Attack a d4 Help Die.'
		},
		availableForMelee: false,
		availableForRanged: true
	},
	{
		id: 'sling',
		name: 'Sling',
		defaultDamageType: 'bludgeoning',
		enhancement: {
			name: 'Hinder',
			description: 'The target makes an Agility Save.',
			costToUse: '1 AP or 1 SP',
			saveType: 'Agility Save',
			effect: 'Failure: The target becomes Hindered until the end of their next turn.'
		},
		availableForMelee: false,
		availableForRanged: true
	}
];

// ================================================================= //
// WEAPON PROPERTIES (MELEE)
// ================================================================= //

export const MELEE_WEAPON_PROPERTIES: WeaponProperty[] = [
	{
		id: 'concealable',
		name: 'Concealable',
		description:
			"Drawing the Weapon doesn't provoke Opportunity Attacks. If you draw the Weapon as part of an Attack, you have ADV on the Attack. You can only gain this benefit once against each creature per Combat.",
		cost: 1,
		meleeOnly: true
	},
	{
		id: 'guard',
		name: 'Guard',
		description: 'You gain +1 PD while wielding the Weapon.',
		cost: 1,
		meleeOnly: true,
		effect: '+1 PD'
	},
	{
		id: 'heavy',
		name: 'Heavy',
		description: "The Weapon's damage increases by 1.",
		cost: 2,
		requires: ['two-handed'],
		meleeOnly: true,
		effect: '+1 damage'
	},
	{
		id: 'impact',
		name: 'Impact',
		description: 'The Weapon deals +1 damage on Heavy Hits.',
		cost: 1,
		effect: '+1 damage on Heavy Hits'
	},
	{
		id: 'multi-faceted',
		name: 'Multi-Faceted',
		description:
			'The Weapon gains a second Weapon Style. When you make an Attack with the Weapon, you can use both Weapon Enhancements and choose which of the Weapon Style damage types it deals.',
		cost: 1
	},
	{
		id: 'reach',
		name: 'Reach',
		description: 'This Weapon adds 1 Space to your Melee Range when you Attack with it.',
		cost: 1,
		meleeOnly: true,
		effect: '+1 Space melee range'
	},
	{
		id: 'returning',
		name: 'Returning',
		description: 'When you Miss a Ranged Attack with the Weapon, it returns to your hand.',
		cost: 1,
		requires: ['toss'],
		meleeOnly: true
	},
	{
		id: 'silent',
		name: 'Silent',
		description:
			"When you make a Ranged Attack with the Weapon while Hidden, you remain Unheard by creatures you're Hidden from.",
		cost: 1
	},
	{
		id: 'toss',
		name: 'Toss',
		description:
			"You can throw the Weapon to make a Ranged Martial Attack (5/10). If you throw it further than this range it's considered an Improvised Weapon.",
		cost: 0, // Free property
		meleeOnly: true,
		effect: 'Range: 5/10 when thrown'
	},
	{
		id: 'thrown',
		name: 'Thrown',
		description:
			"You can throw the Weapon to make a Ranged Martial Attack (10/20). If you throw it further than this range it's considered an Improvised Weapon.",
		cost: 0, // Free property
		meleeOnly: true,
		effect: 'Range: 10/20 when thrown'
	},
	{
		id: 'two-handed',
		name: 'Two-Handed',
		description: 'The Weapon requires 2 hands when you Attack with it.',
		cost: -1,
		excludes: ['versatile'],
		effect: 'Requires 2 hands'
	},
	{
		id: 'unwieldy',
		name: 'Unwieldy',
		description:
			'You have DisADV on Attacks made with the Weapon against targets within 1 Space of you.',
		cost: -1,
		effect: 'DisADV on attacks within 1 Space'
	},
	{
		id: 'versatile',
		name: 'Versatile',
		description:
			'This Weapon can be wielded with 1 or 2 hands. When you wield the Weapon with 2 hands, you gain a +2 bonus to Hit using it.',
		cost: 1,
		excludes: ['two-handed'],
		meleeOnly: true,
		effect: '+2 to Hit when wielded with 2 hands'
	}
];

// ================================================================= //
// WEAPON PROPERTIES (RANGED)
// ================================================================= //

export const RANGED_WEAPON_PROPERTIES: WeaponProperty[] = [
	{
		id: 'ammo',
		name: 'Ammo',
		description:
			'This Weapon requires ammunition to make Attacks. You can load a Weapon as part of an Attack made with it.',
		cost: 0, // Inherent to ranged weapons
		rangedOnly: true
	},
	{
		id: 'cumbersome',
		name: 'Cumbersome',
		description: 'It takes 1 AP to draw, stow, or pick up this Weapon.',
		cost: -1,
		rangedOnly: true,
		effect: '1 AP to draw/stow/pick up'
	},
	{
		id: 'deft',
		name: 'Deft',
		description:
			"Ranged Attacks with this Weapon don't have DisADV as a result of you being Prone.",
		cost: 1,
		rangedOnly: true
	},
	{
		id: 'heavy-ranged',
		name: 'Heavy',
		description: "The Weapon's damage increases by 1.",
		cost: 2,
		requires: ['two-handed'],
		rangedOnly: true,
		effect: '+1 damage'
	},
	{
		id: 'impact',
		name: 'Impact',
		description: 'The Weapon deals +1 damage on Heavy Hits.',
		cost: 1,
		effect: '+1 damage on Heavy Hits'
	},
	{
		id: 'long-ranged',
		name: 'Long-Ranged',
		description: "The Weapon's Range increases to 30/90.",
		cost: 1,
		rangedOnly: true,
		effect: 'Range: 30/90'
	},
	{
		id: 'multi-faceted',
		name: 'Multi-Faceted',
		description:
			'The Weapon gains a second Weapon Style. When you make an Attack with the Weapon, you can use both Weapon Enhancements and choose which of the Weapon Style damage types it deals.',
		cost: 1
	},
	{
		id: 'reload',
		name: 'Reload',
		description:
			"The Weapon's damage increases by 1, but you must spend 1 AP or 1 SP and use a free hand to reload the Weapon. If the Weapon stops being held, it must be loaded again.",
		cost: -1,
		rangedOnly: true,
		effect: '+1 damage, requires reload'
	},
	{
		id: 'silent',
		name: 'Silent',
		description:
			"When you make a Ranged Attack with the Weapon while Hidden, you remain Unheard by creatures you're Hidden from.",
		cost: 1
	},
	{
		id: 'two-handed',
		name: 'Two-Handed',
		description: 'The Weapon requires 2 hands when you Attack with it.',
		cost: 0, // Inherent to ranged weapons, costs 1 to remove
		rangedOnly: true,
		effect: 'Requires 2 hands'
	}
];

// ================================================================= //
// ALL WEAPON PROPERTIES (combined and deduplicated)
// ================================================================= //

export const ALL_WEAPON_PROPERTIES: WeaponProperty[] = [
	...MELEE_WEAPON_PROPERTIES,
	...RANGED_WEAPON_PROPERTIES.filter((rp) => !MELEE_WEAPON_PROPERTIES.some((mp) => mp.id === rp.id))
];

// ================================================================= //
// PRESET WEAPONS (from rulebook examples)
// ================================================================= //

export const PRESET_WEAPONS: PresetWeapon[] = [
	// ===== MELEE - ONE-HANDED =====
	{
		id: 'sickle',
		name: 'Sickle / Hand Axe / Throwing Star',
		styles: ['axe'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['concealable', 'toss'],
		range: '1',
		category: 'one-handed'
	},
	{
		id: 'brass-knuckles',
		name: 'Brass Knuckles',
		styles: ['fist'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['concealable', 'impact'],
		range: '1',
		category: 'one-handed'
	},
	{
		id: 'club',
		name: 'Club',
		styles: ['hammer'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['concealable', 'toss'],
		range: '1',
		category: 'one-handed'
	},
	{
		id: 'light-hammer',
		name: 'Light Hammer',
		styles: ['hammer'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['impact', 'toss'],
		range: '1',
		category: 'one-handed'
	},
	{
		id: 'boomerang',
		name: 'Boomerang',
		styles: ['hammer'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['toss', 'returning'],
		range: '1',
		category: 'one-handed'
	},
	{
		id: 'mining-pick',
		name: 'Mining Pick',
		styles: ['pick'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'piercing',
		properties: ['impact', 'toss'],
		range: '1',
		category: 'one-handed'
	},
	{
		id: 'dart',
		name: 'Dart',
		styles: ['spear'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'piercing',
		properties: ['concealable', 'toss'],
		range: '1',
		category: 'one-handed'
	},
	{
		id: 'javelin',
		name: 'Javelin',
		styles: ['spear'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'piercing',
		properties: ['thrown'],
		range: '1',
		category: 'one-handed'
	},
	{
		id: 'throwing-dagger',
		name: 'Throwing Dagger',
		styles: ['sword'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['concealable', 'toss'],
		range: '1',
		category: 'one-handed'
	},
	{
		id: 'short-sword',
		name: 'Short Sword',
		styles: ['sword'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['guard', 'impact'],
		range: '1',
		category: 'one-handed'
	},
	{
		id: 'rapier',
		name: 'Rapier',
		styles: ['sword', 'spear'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['guard', 'multi-faceted'],
		range: '1',
		category: 'one-handed'
	},
	{
		id: 'chain-whip',
		name: 'Chain Whip',
		styles: ['whip'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['reach', 'impact'],
		range: '2',
		category: 'one-handed'
	},
	// ===== MELEE - VERSATILE =====
	{
		id: 'battleaxe',
		name: 'Battleaxe',
		styles: ['axe'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['versatile', 'impact'],
		range: '1',
		category: 'versatile'
	},
	{
		id: 'flail',
		name: 'Flail',
		styles: ['hammer', 'whip'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['versatile', 'multi-faceted'],
		range: '1',
		category: 'versatile'
	},
	{
		id: 'morningstar',
		name: 'Morningstar / Warhammer',
		styles: ['hammer', 'pick'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['versatile', 'multi-faceted'],
		range: '1',
		category: 'versatile'
	},
	{
		id: 'pickaxe',
		name: 'Pickaxe',
		styles: ['pick'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'piercing',
		properties: ['versatile', 'impact'],
		range: '1',
		category: 'versatile'
	},
	{
		id: 'spear',
		name: 'Spear',
		styles: ['spear'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'piercing',
		properties: ['versatile', 'toss'],
		range: '1',
		category: 'versatile'
	},
	{
		id: 'long-spear',
		name: 'Long Spear',
		styles: ['spear'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'piercing',
		properties: ['versatile', 'reach'],
		range: '2',
		category: 'versatile'
	},
	{
		id: 'bo-staff',
		name: 'Bo Staff',
		styles: ['staff'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['versatile', 'guard'],
		range: '1',
		category: 'versatile'
	},
	{
		id: 'longsword',
		name: 'Longsword',
		styles: ['sword'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['versatile', 'guard'],
		range: '1',
		category: 'versatile'
	},
	{
		id: 'bastard-sword',
		name: 'Bastard Sword',
		styles: ['sword'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['versatile', 'impact'],
		range: '1',
		category: 'versatile'
	},
	{
		id: 'bull-whip',
		name: 'Bull Whip',
		styles: ['whip'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['versatile', 'reach', 'unwieldy', 'impact'],
		range: '2',
		category: 'versatile'
	},
	// ===== MELEE - TWO-HANDED =====
	{
		id: 'scythe',
		name: 'Scythe',
		styles: ['axe'],
		weaponType: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['two-handed', 'heavy', 'reach'],
		range: '2',
		category: 'two-handed'
	},
	{
		id: 'greataxe',
		name: 'Greataxe',
		styles: ['axe'],
		weaponType: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['two-handed', 'heavy', 'impact'],
		range: '1',
		category: 'two-handed'
	},
	{
		id: 'halberd',
		name: 'Halberd',
		styles: ['axe', 'pick'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['two-handed', 'multi-faceted', 'reach', 'impact'],
		range: '2',
		category: 'two-handed'
	},
	{
		id: 'war-flail',
		name: 'War Flail',
		styles: ['hammer', 'whip'],
		weaponType: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['two-handed', 'heavy', 'multi-faceted'],
		range: '1',
		category: 'two-handed'
	},
	{
		id: 'meteor-hammer',
		name: 'Meteor Hammer',
		styles: ['hammer', 'whip'],
		weaponType: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['two-handed', 'heavy', 'multi-faceted', 'reach', 'unwieldy'],
		range: '2',
		category: 'two-handed'
	},
	{
		id: 'greatmaul',
		name: 'Greatmaul',
		styles: ['hammer'],
		weaponType: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['two-handed', 'heavy', 'impact'],
		range: '1',
		category: 'two-handed'
	},
	{
		id: 'pike',
		name: 'Pike',
		styles: ['spear'],
		weaponType: 'melee',
		damage: 2,
		damageType: 'piercing',
		properties: ['two-handed', 'heavy', 'reach', 'impact', 'unwieldy'],
		range: '2',
		category: 'two-handed'
	},
	{
		id: 'quarterstaff',
		name: 'Quarterstaff',
		styles: ['staff'],
		weaponType: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['two-handed', 'guard', 'reach', 'impact'],
		range: '2',
		category: 'two-handed'
	},
	{
		id: 'glaive',
		name: 'Glaive',
		styles: ['sword'],
		weaponType: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['two-handed', 'heavy', 'reach'],
		range: '2',
		category: 'two-handed'
	},
	{
		id: 'greatsword',
		name: 'Greatsword',
		styles: ['sword'],
		weaponType: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['two-handed', 'heavy', 'impact'],
		range: '1',
		category: 'two-handed'
	},
	{
		id: 'great-whip',
		name: 'Great Whip',
		styles: ['whip'],
		weaponType: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['two-handed', 'heavy', 'reach', 'impact', 'unwieldy'],
		range: '2',
		category: 'two-handed'
	},
	// ===== RANGED - ONE-HANDED =====
	{
		id: 'sling',
		name: 'Sling',
		styles: ['sling'],
		weaponType: 'ranged',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['ammo', 'impact'],
		range: '15/45',
		category: 'one-handed'
	},
	{
		id: 'hand-crossbow',
		name: 'Hand Crossbow',
		styles: ['crossbow'],
		weaponType: 'ranged',
		damage: 2,
		damageType: 'piercing',
		properties: ['ammo', 'reload', 'deft', 'impact'],
		range: '15/45',
		category: 'one-handed'
	},
	{
		id: 'hand-stonebow',
		name: 'Hand Stonebow',
		styles: ['crossbow', 'sling'],
		weaponType: 'ranged',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['ammo', 'reload', 'deft', 'multi-faceted'],
		range: '15/45',
		category: 'one-handed'
	},
	// ===== RANGED - TWO-HANDED =====
	{
		id: 'shortbow',
		name: 'Shortbow',
		styles: ['bow'],
		weaponType: 'ranged',
		damage: 1,
		damageType: 'piercing',
		properties: ['two-handed', 'ammo', 'impact', 'silent'],
		range: '15/45',
		category: 'two-handed'
	},
	{
		id: 'longbow',
		name: 'Longbow',
		styles: ['bow'],
		weaponType: 'ranged',
		damage: 1,
		damageType: 'piercing',
		properties: ['two-handed', 'ammo', 'impact', 'long-ranged'],
		range: '30/90',
		category: 'two-handed'
	},
	{
		id: 'greatbow',
		name: 'Greatbow',
		styles: ['bow'],
		weaponType: 'ranged',
		damage: 2,
		damageType: 'piercing',
		properties: ['two-handed', 'ammo', 'impact', 'heavy-ranged', 'cumbersome'],
		range: '15/45',
		category: 'two-handed'
	},
	{
		id: 'blowgun',
		name: 'Blowgun (Needle)',
		styles: ['crossbow'],
		weaponType: 'ranged',
		damage: 1,
		damageType: 'piercing',
		properties: ['two-handed', 'ammo', 'deft', 'silent'],
		range: '15/45',
		category: 'two-handed'
	},
	{
		id: 'light-crossbow',
		name: 'Light Crossbow',
		styles: ['crossbow'],
		weaponType: 'ranged',
		damage: 3,
		damageType: 'piercing',
		properties: ['two-handed', 'ammo', 'reload', 'deft', 'heavy-ranged'],
		range: '15/45',
		category: 'two-handed'
	},
	{
		id: 'heavy-crossbow',
		name: 'Heavy Crossbow',
		styles: ['crossbow'],
		weaponType: 'ranged',
		damage: 3,
		damageType: 'piercing',
		properties: ['two-handed', 'ammo', 'reload', 'deft', 'impact', 'heavy-ranged', 'cumbersome'],
		range: '15/45',
		category: 'two-handed'
	},
	{
		id: 'stonebow',
		name: 'Stonebow',
		styles: ['crossbow', 'sling'],
		weaponType: 'ranged',
		damage: 3,
		damageType: 'bludgeoning',
		properties: [
			'two-handed',
			'ammo',
			'reload',
			'deft',
			'multi-faceted',
			'heavy-ranged',
			'cumbersome'
		],
		range: '15/45',
		category: 'two-handed'
	},
	{
		id: 'slingshot',
		name: 'Slingshot',
		styles: ['sling'],
		weaponType: 'ranged',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['two-handed', 'ammo', 'impact', 'silent'],
		range: '15/45',
		category: 'two-handed'
	},
	{
		id: 'war-sling',
		name: 'War Sling',
		styles: ['sling'],
		weaponType: 'ranged',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['two-handed', 'ammo', 'heavy-ranged'],
		range: '15/45',
		category: 'two-handed'
	}
];

// ================================================================= //
// HELPER FUNCTIONS
// ================================================================= //

export const getWeaponType = (id: string): WeaponTypeDefinition | undefined =>
	WEAPON_TYPES.find((t) => t.id === id);

export const getWeaponStyle = (id: string): WeaponStyleDefinition | undefined =>
	WEAPON_STYLES.find((s) => s.id === id);

export const getWeaponProperty = (id: string): WeaponProperty | undefined =>
	ALL_WEAPON_PROPERTIES.find((p) => p.id === id);

export const getPresetWeapon = (id: string): PresetWeapon | undefined =>
	PRESET_WEAPONS.find((w) => w.id === id);

export const getStylesForWeaponType = (weaponType: 'melee' | 'ranged'): WeaponStyleDefinition[] =>
	WEAPON_STYLES.filter((s) =>
		weaponType === 'melee' ? s.availableForMelee : s.availableForRanged
	);

export const getPropertiesForWeaponType = (weaponType: 'melee' | 'ranged'): WeaponProperty[] => {
	if (weaponType === 'melee') {
		return ALL_WEAPON_PROPERTIES.filter((p) => !p.rangedOnly);
	}
	return ALL_WEAPON_PROPERTIES.filter((p) => !p.meleeOnly);
};
