/**
 * @file src/lib/rulesdata/equipment/schemas/armorSchema.ts
 * @description Schema definitions for custom armor.
 * DC20 Rules Version: 0.10
 */

import { BaseEquipment, BaseProperty } from './baseEquipment';

// ================================================================= //
// ARMOR TYPES
// ================================================================= //

export type ArmorType = 'light' | 'heavy';

export interface ArmorTypeDefinition {
	id: ArmorType;
	name: string;
	description: string;
	donTime: string; // e.g., "1 minute"
	doffTime: string;
	isMetal: boolean;
	specialNotes?: string[];
}

// ================================================================= //
// ARMOR PROPERTIES
// ================================================================= //

export interface ArmorProperty extends BaseProperty {
	/** Whether this property is only available for light armor */
	lightOnly?: boolean;
	/** Whether this property is only available for heavy armor */
	heavyOnly?: boolean;
	/** The stat this property modifies */
	modifies?: {
		stat: 'pd' | 'ad' | 'pdr' | 'edr' | 'speed';
		value: number | 'half' | 'disadvantage';
	};
}

// ================================================================= //
// CUSTOM ARMOR
// ================================================================= //

export interface CustomArmor extends BaseEquipment {
	category: 'armor';
	armorType: ArmorType;
	/** Physical Defense bonus */
	pdBonus: number;
	/** Arcane Defense bonus */
	adBonus: number;
	/** Physical Damage Reduction (true = Half, false = none) */
	hasPdr: boolean;
	/** Elemental Damage Reduction */
	hasEdr: boolean;
	/** Speed penalty (negative number) */
	speedPenalty: number;
	/** Has disadvantage on Agility checks */
	hasAgilityDisadvantage: boolean;
	/** Whether it's a preset from the rulebook */
	isPreset?: boolean;
	/** Original preset name if modified from a preset */
	presetOrigin?: string;
}

// ================================================================= //
// PRESET ARMOR (from rulebook)
// ================================================================= //

export interface PresetArmor {
	id: string;
	name: string;
	armorType: ArmorType;
	pdBonus: number;
	adBonus: number;
	hasPdr: boolean;
	speedPenalty: number;
	hasAgilityDisadvantage: boolean;
}
