/**
 * @file src/lib/rulesdata/equipment/schemas/shieldSchema.ts
 * @description Schema definitions for custom shields.
 * DC20 Rules Version: 0.10
 */

import { BaseEquipment, BaseProperty } from './baseEquipment';

// ================================================================= //
// SHIELD TYPES
// ================================================================= //

export type ShieldType = 'light' | 'heavy';

export interface ShieldTypeDefinition {
	id: ShieldType;
	name: string;
	description: string;
}

// ================================================================= //
// SHIELD PROPERTIES
// ================================================================= //

export interface ShieldProperty extends BaseProperty {
	/** Whether this property is only available for light shields */
	lightOnly?: boolean;
	/** Whether this property is only available for heavy shields */
	heavyOnly?: boolean;
	/** The stat this property modifies */
	modifies?: {
		stat: 'pd' | 'ad' | 'pdr' | 'edr' | 'speed';
		value: number | 'half' | 'disadvantage';
	};
}

// ================================================================= //
// CUSTOM SHIELD
// ================================================================= //

export interface CustomShield extends BaseEquipment {
	category: 'shield';
	shieldType: ShieldType;
	/** Physical Defense bonus */
	pdBonus: number;
	/** Arcane Defense bonus */
	adBonus: number;
	/** Physical Damage Reduction */
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
// PRESET SHIELD (from rulebook)
// ================================================================= //

export interface PresetShield {
	id: string;
	name: string;
	shieldType: ShieldType;
	pdBonus: number;
	adBonus: number;
	speedPenalty: number;
	hasAgilityDisadvantage: boolean;
	properties: string[];
}
