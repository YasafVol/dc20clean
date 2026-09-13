// inventoryItems.ts

import { PRESET_SPELL_FOCUSES } from './equipment/options/spellFocusOptions';
import { PRESET_WEAPONS, getWeaponStyle } from './equipment/options/weaponOptions';
import type {
	WeaponStyle as CanonicalWeaponStyle,
	PresetWeapon
} from './equipment/schemas/weaponSchema';
import type { PhysicalDamageType } from './equipment/schemas/baseEquipment';
import type { SpellFocusHands } from './equipment/schemas/spellFocusSchema';

//==============================================================================
// SCHEMAS / TYPES
//==============================================================================

export enum ItemType {
	Weapon = 'Weapon',
	Armor = 'Armor',
	Shield = 'Shield',
	AdventuringSupply = 'Adventuring Supply',
	SpellFocus = 'Spell Focus',
	Potion = 'Potion'
}

export enum WeaponType {
	Melee = 'Melee',
	Ranged = 'Ranged',
	Special = 'Special'
}

export enum WeaponHandedness {
	OneHanded = 'One-Handed',
	Versatile = 'Versatile',
	TwoHanded = 'Two-Handed'
}

export enum WeaponStyle {
	Axe = 'Axe',
	Fist = 'Fist',
	Hammer = 'Hammer',
	Pick = 'Pick',
	Spear = 'Spear',
	Sword = 'Sword',
	Whip = 'Whip',
	Chained = 'Chained',
	Bow = 'Bow',
	Crossbow = 'Crossbow',
	Sling = 'Sling',
	AxePick = 'Axe/Pick',
	HammerPick = 'Hammer/Pick',
	SwordSpear = 'Sword/Spear',
	ChainedHammer = 'Chained/Hammer',
	Staff = 'Staff'
}

export enum DamageType {
	Slashing = 'S',
	Piercing = 'P',
	Bludgeoning = 'B',
	SlashingOrPiercing = 'S/P',
	BludgeoningOrSlashing = 'B/S',
	BludgeoningOrPiercing = 'B/P'
}

// Based on properties from pages 76 & 77
export type WeaponProperty =
	| 'Ammo'
	| 'Concealable'
	| 'Guard'
	| 'Heavy'
	| 'Impact'
	| 'Cumbersome'
	| 'Deft'
	| 'Long-Ranged'
	| 'Multi-Faceted'
	| 'Reach'
	| 'Reload'
	| 'Silent'
	| 'Toss (5/10)'
	| 'Thrown (10/20)'
	| 'Two-Handed'
	| 'Unwieldy'
	| 'Versatile'
	| 'Returning'
	| 'Capture (5/10)'
	| 'Capture (10/20)'
	| 'Range (15/45)'
	| 'Range (30/90)';

export interface Weapon {
	itemType: ItemType.Weapon;
	name: string;
	type: WeaponType;
	style: WeaponStyle | WeaponStyle[];
	handedness: WeaponHandedness;
	damage: string; // Using string to accommodate '0 B' etc.
	properties: WeaponProperty[];
}

export enum ArmorType {
	Light = 'Light Armor',
	Heavy = 'Heavy Armor'
}

export interface Armor {
	itemType: ItemType.Armor;
	name: string;
	type: ArmorType;
	pdBonus: number;
	adBonus: number;
	pdr?: 'Half';
	speedPenalty: number;
	agilityCheckDisadvantage: boolean;
}

export enum ShieldType {
	Light = 'Light Shield',
	Heavy = 'Heavy Shield'
}

export type ShieldProperty = 'Grasp' | 'Toss (5/10)' | 'Mounted';

export interface Shield {
	itemType: ItemType.Shield;
	name: string;
	type: ShieldType;
	pdBonus: number;
	adBonus: number;
	speedPenalty: number;
	agilityCheckDisadvantage: boolean;
	properties?: ShieldProperty[];
}

export interface AdventuringSupply {
	itemType: ItemType.AdventuringSupply;
	name: string;
	description: string;
	price?: string; // e.g., "5g"
}

export interface HealingPotion {
	itemType: ItemType.Potion;
	name: string;
	level: number;
	healing: string; // e.g., "2 HP"
	price: number; // in gold pieces (g)
}

export interface SpellFocus {
	itemType: ItemType.SpellFocus;
	name: string;
	hands: SpellFocusHands;
	properties: string[];
}

// Union type for all inventory items
export type InventoryItem =
	| Weapon
	| Armor
	| Shield
	| AdventuringSupply
	| SpellFocus
	| HealingPotion;

//==============================================================================
// INVENTORY DATA
//==============================================================================

const CANONICAL_STYLE_TO_DISPLAY: Record<CanonicalWeaponStyle, WeaponStyle> = {
	axe: WeaponStyle.Axe,
	fist: WeaponStyle.Fist,
	hammer: WeaponStyle.Hammer,
	pick: WeaponStyle.Pick,
	spear: WeaponStyle.Spear,
	staff: WeaponStyle.Staff,
	sword: WeaponStyle.Sword,
	whip: WeaponStyle.Whip,
	bow: WeaponStyle.Bow,
	crossbow: WeaponStyle.Crossbow,
	sling: WeaponStyle.Sling
};

const CANONICAL_PROPERTY_TO_DISPLAY: Record<string, WeaponProperty> = {
	ammo: 'Ammo',
	concealable: 'Concealable',
	cumbersome: 'Cumbersome',
	deft: 'Deft',
	guard: 'Guard',
	heavy: 'Heavy',
	'heavy-ranged': 'Heavy',
	impact: 'Impact',
	'long-ranged': 'Long-Ranged',
	'multi-faceted': 'Multi-Faceted',
	reach: 'Reach',
	reload: 'Reload',
	returning: 'Returning',
	silent: 'Silent',
	toss: 'Toss (5/10)',
	thrown: 'Thrown (10/20)',
	'two-handed': 'Two-Handed',
	unwieldy: 'Unwieldy',
	versatile: 'Versatile'
};

const DAMAGE_TYPE_ABBREVIATION: Record<PhysicalDamageType, 'B' | 'P' | 'S'> = {
	bludgeoning: 'B',
	piercing: 'P',
	slashing: 'S'
};

const HANDEDNESS_BY_CATEGORY: Record<PresetWeapon['category'], WeaponHandedness> = {
	'one-handed': WeaponHandedness.OneHanded,
	versatile: WeaponHandedness.Versatile,
	'two-handed': WeaponHandedness.TwoHanded
};

const splitPresetWeaponNames = (name: string): string[] =>
	name.split(/\s+\/\s+/).map((part) => part.trim());

const getPresetDamage = (preset: PresetWeapon): string => {
	const styleDamageTypes = preset.styles
		.map((style) => getWeaponStyle(style)?.defaultDamageType)
		.filter((damageType): damageType is PhysicalDamageType => Boolean(damageType));
	const damageTypes = [...new Set([preset.damageType, ...styleDamageTypes])];

	return `${preset.damage} ${damageTypes
		.map((damageType) => DAMAGE_TYPE_ABBREVIATION[damageType])
		.join('/')}`;
};

const getPresetProperties = (preset: PresetWeapon): WeaponProperty[] => {
	const properties = preset.properties.map((propertyId) => {
		const property = CANONICAL_PROPERTY_TO_DISPLAY[propertyId];
		if (!property) throw new Error(`Unknown preset weapon property: ${propertyId}`);
		return property;
	});

	if (preset.weaponType === 'ranged') {
		properties.push(`Range (${preset.range})` as WeaponProperty);
	}

	return properties;
};

export const weapons: Weapon[] = PRESET_WEAPONS.flatMap((preset) => {
	const styles = preset.styles.map((style) => CANONICAL_STYLE_TO_DISPLAY[style]);
	const displayStyle = styles.length === 1 ? styles[0] : styles;

	return splitPresetWeaponNames(preset.name).map((name) => ({
		itemType: ItemType.Weapon,
		name,
		type: preset.weaponType === 'melee' ? WeaponType.Melee : WeaponType.Ranged,
		style: displayStyle,
		handedness: HANDEDNESS_BY_CATEGORY[preset.category],
		damage: getPresetDamage(preset),
		properties: getPresetProperties(preset)
	}));
});

export const armors: Armor[] = [
	// Light Armor
	{
		itemType: ItemType.Armor,
		name: 'Light Defensive Armor',
		type: ArmorType.Light,
		pdBonus: 1,
		adBonus: 1,
		speedPenalty: 0,
		agilityCheckDisadvantage: false
	},
	{
		itemType: ItemType.Armor,
		name: 'Light Deflecting Armor',
		type: ArmorType.Light,
		pdBonus: 2,
		adBonus: 0,
		speedPenalty: 0,
		agilityCheckDisadvantage: false
	},
	{
		itemType: ItemType.Armor,
		name: 'Light Fortified Armor',
		type: ArmorType.Light,
		pdBonus: 0,
		adBonus: 2,
		speedPenalty: 0,
		agilityCheckDisadvantage: false
	},

	// Heavy Armor
	{
		itemType: ItemType.Armor,
		name: 'Heavy Defensive Armor',
		type: ArmorType.Heavy,
		pdBonus: 1,
		adBonus: 1,
		pdr: 'Half',
		speedPenalty: -1,
		agilityCheckDisadvantage: true
	},
	{
		itemType: ItemType.Armor,
		name: 'Heavy Deflecting Armor',
		type: ArmorType.Heavy,
		pdBonus: 2,
		adBonus: 0,
		pdr: 'Half',
		speedPenalty: -1,
		agilityCheckDisadvantage: true
	},
	{
		itemType: ItemType.Armor,
		name: 'Heavy Fortified Armor',
		type: ArmorType.Heavy,
		pdBonus: 0,
		adBonus: 2,
		pdr: 'Half',
		speedPenalty: -1,
		agilityCheckDisadvantage: true
	},
	{
		itemType: ItemType.Armor,
		name: 'Highly Defensive Armor',
		type: ArmorType.Heavy,
		pdBonus: 2,
		adBonus: 2,
		pdr: 'Half',
		speedPenalty: -1,
		agilityCheckDisadvantage: true
	}
];

export const shields: Shield[] = [
	// Light Shields
	{
		itemType: ItemType.Shield,
		name: 'Buckler',
		type: ShieldType.Light,
		pdBonus: 1,
		adBonus: 0,
		speedPenalty: 0,
		agilityCheckDisadvantage: false,
		properties: ['Grasp']
	},
	{
		itemType: ItemType.Shield,
		name: 'Round Shield',
		type: ShieldType.Light,
		pdBonus: 0,
		adBonus: 1,
		speedPenalty: 0,
		agilityCheckDisadvantage: false,
		properties: ['Toss (5/10)']
	},
	{
		itemType: ItemType.Shield,
		name: 'Heater Shield',
		type: ShieldType.Light,
		pdBonus: 1,
		adBonus: 1,
		speedPenalty: 0,
		agilityCheckDisadvantage: false,
		properties: []
	},

	// Heavy Shields
	{
		itemType: ItemType.Shield,
		name: 'Kite Shield',
		type: ShieldType.Heavy,
		pdBonus: 1,
		adBonus: 2,
		speedPenalty: -1,
		agilityCheckDisadvantage: true,
		properties: ['Mounted']
	},
	{
		itemType: ItemType.Shield,
		name: 'Tower Shield',
		type: ShieldType.Heavy,
		pdBonus: 2,
		adBonus: 2,
		speedPenalty: -1,
		agilityCheckDisadvantage: true,
		properties: []
	}
];

export const adventuringSupplies: AdventuringSupply[] = [
	{
		itemType: ItemType.AdventuringSupply,
		name: 'Gauntlet',
		description:
			'Wearing a Gauntlet gives your Unarmed Strikes with that hand the Impact Weapon Property (+1 damage on Heavy Hits).',
		price: '5g'
	},
	{
		itemType: ItemType.AdventuringSupply,
		name: 'First Aid Kit',
		description:
			"A fully stocked kit contains 5 charges, which can be spent to treat a creature's wounds or cure an ailment by taking the Object Action."
	}
];

export const healingPotions: HealingPotion[] = [
	{
		itemType: ItemType.Potion,
		name: '1st Level Healing Potion',
		level: 1,
		healing: '2 HP',
		price: 10
	},
	{
		itemType: ItemType.Potion,
		name: '2nd Level Healing Potion',
		level: 2,
		healing: '4 HP',
		price: 25
	},
	{
		itemType: ItemType.Potion,
		name: '3rd Level Healing Potion',
		level: 3,
		healing: '6 HP',
		price: 40
	},
	{
		itemType: ItemType.Potion,
		name: '4th Level Healing Potion',
		level: 4,
		healing: '8 HP',
		price: 60
	},
	{
		itemType: ItemType.Potion,
		name: '5th Level Healing Potion',
		level: 5,
		healing: '10 HP',
		price: 100
	}
];

export const allItems = [
	...weapons,
	...armors,
	...shields,
	...adventuringSupplies,
	...PRESET_SPELL_FOCUSES.map(
		(focus): SpellFocus => ({
			itemType: ItemType.SpellFocus,
			name: focus.name,
			hands: focus.hands,
			properties: [...focus.properties]
		})
	),
	...healingPotions
];
