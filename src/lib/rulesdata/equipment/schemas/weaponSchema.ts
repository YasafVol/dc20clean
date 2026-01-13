/**
 * @file src/lib/rulesdata/equipment/schemas/weaponSchema.ts
 * @description Schema definitions for custom weapons.
 * DC20 Rules Version: 0.10
 */

import { BaseEquipment, BaseProperty, PhysicalDamageType } from './baseEquipment';

// ================================================================= //
// WEAPON TYPES
// ================================================================= //

export type WeaponType = 'melee' | 'ranged';

export interface WeaponTypeDefinition {
	id: WeaponType;
	name: string;
	description: string;
	baseDamage: number;
	baseRange?: string; // e.g., "15/45" for ranged
	inherentProperties?: string[]; // Properties automatically granted (e.g., Ammo, Two-Handed for ranged)
}

// ================================================================= //
// WEAPON STYLES
// ================================================================= //

export type MeleeWeaponStyle =
	| 'axe'
	| 'fist'
	| 'hammer'
	| 'pick'
	| 'spear'
	| 'staff'
	| 'sword'
	| 'whip';

export type RangedWeaponStyle = 'bow' | 'crossbow' | 'sling';

export type WeaponStyle = MeleeWeaponStyle | RangedWeaponStyle;

export interface WeaponStyleDefinition {
	id: WeaponStyle;
	name: string;
	defaultDamageType: PhysicalDamageType;
	enhancement: {
		name: string;
		description: string;
		costToUse: string; // e.g., "1 AP or 1 SP"
		saveType?: string; // e.g., "Physical Save", "Agility Save", "Might Save"
		effect: string;
	};
	/** Special notes about this style */
	specialNotes?: string;
	/** Whether this style is available for melee weapons */
	availableForMelee: boolean;
	/** Whether this style is available for ranged weapons */
	availableForRanged: boolean;
}

// ================================================================= //
// WEAPON PROPERTIES
// ================================================================= //

export interface WeaponProperty extends BaseProperty {
	/** Whether this property is only available for melee weapons */
	meleeOnly?: boolean;
	/** Whether this property is only available for ranged weapons */
	rangedOnly?: boolean;
	/** The mechanical effect of this property */
	effect?: string;
}

// ================================================================= //
// CUSTOM WEAPON
// ================================================================= //

export interface CustomWeapon extends BaseEquipment {
	category: 'weapon';
	weaponType: WeaponType;
	style: WeaponStyle;
	/** Secondary style if Multi-Faceted property is taken */
	secondaryStyle?: WeaponStyle;
	damageType: PhysicalDamageType;
	/** Secondary damage type if Multi-Faceted */
	secondaryDamageType?: PhysicalDamageType;
	/** Base damage (before Heavy property) */
	baseDamage: number;
	/** Final calculated damage */
	finalDamage: number;
	/** Range string, e.g., "1" for melee, "15/45" for ranged */
	range: string;
	/** Whether it's a preset from the rulebook */
	isPreset?: boolean;
	/** Original preset name if modified from a preset */
	presetOrigin?: string;
}

// ================================================================= //
// PRESET WEAPON (from rulebook)
// ================================================================= //

export interface PresetWeapon {
	id: string;
	name: string;
	styles: WeaponStyle[];
	weaponType: WeaponType;
	damage: number;
	damageType: PhysicalDamageType;
	properties: string[];
	range: string;
	category: 'one-handed' | 'versatile' | 'two-handed';
}
