/**
 * @file src/lib/rulesdata/equipment/schemas/baseEquipment.ts
 * @description Base schemas and types for all equipment customization.
 * DC20 Rules Version: 0.10.5
 */

import type { Effect } from '../../schemas/character.schema';

export const EQUIPMENT_RULES_VERSION = '0.10.5';
export const EQUIPMENT_RULES_SOURCE = {
	version: EQUIPMENT_RULES_VERSION,
	name: 'DC20 RPG 0.10.5 Beta v1',
	path: 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md',
	sections: {
		weapons: 'Equipment > Weapon Properties / Creating Weapons',
		spellFocuses: 'Equipment > Spell Focus Properties / Creating Spell Focuses',
		armor: 'Equipment > Armor Properties / Creating Armor',
		shields: 'Equipment > Shield Properties / Creating Shields'
	}
} as const;

// ================================================================= //
// SHARED TYPES
// ================================================================= //

/** Point cost for a property (negative means it gives you points back) */
export type PropertyCost = -1 | 0 | 1 | 2;

/** Base interface for all equipment properties */
export interface BaseProperty {
	id: string;
	name: string;
	description: string;
	cost: PropertyCost;
	/** Properties that must be present before this can be added */
	requires?: string[];
	/** At least one of these properties must be present before this can be added */
	requiresOneOf?: string[];
	/** Properties that cannot coexist with this one */
	excludes?: string[];
	/** Maximum times this property can be taken (default: 1) */
	maxStacks?: number;
	/** Canonical mechanical effects contributed when the equipment is equipped/wielded */
	effects?: Effect[];
	/** Legacy display text for properties that are not yet numeric calculator effects */
	effect?: string;
}

/** Base interface for all custom equipment */
export interface BaseEquipment {
	id: string;
	name: string;
	description?: string;
	properties: string[]; // Array of property IDs
	pointsSpent: number;
	maxPoints: number;
	/** Canonical effects this item contributes when equipped/wielded */
	effects?: Effect[];
	createdAt: string;
	updatedAt: string;
}

// ================================================================= //
// DAMAGE TYPES
// ================================================================= //

export type PhysicalDamageType = 'bludgeoning' | 'piercing' | 'slashing';

export const PHYSICAL_DAMAGE_TYPES: PhysicalDamageType[] = ['bludgeoning', 'piercing', 'slashing'];

// ================================================================= //
// EQUIPMENT CATEGORIES
// ================================================================= //

export type EquipmentCategory = 'weapon' | 'armor' | 'shield' | 'spellFocus';

export const EQUIPMENT_CATEGORIES: { id: EquipmentCategory; name: string; description: string }[] =
	[
		{
			id: 'weapon',
			name: 'Weapon',
			description: 'Melee and ranged weapons with styles and enhancements'
		},
		{
			id: 'armor',
			name: 'Armor',
			description: 'Light and heavy armor for defense and damage reduction'
		},
		{
			id: 'shield',
			name: 'Shield',
			description: 'Light and heavy shields for additional protection'
		},
		{
			id: 'spellFocus',
			name: 'Spell Focus',
			description: 'Magical implements that enhance spellcasting'
		}
	];

// ================================================================= //
// VALIDATION RESULT
// ================================================================= //

export interface ValidationError {
	propertyId?: string;
	message: string;
}

export interface ValidationResult {
	isValid: boolean;
	errors: ValidationError[];
	warnings: string[];
}
