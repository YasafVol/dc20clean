/**
 * @file src/lib/rulesdata/equipment/schemas/spellFocusSchema.ts
 * @description Schema definitions for custom spell focuses.
 * DC20 Rules Version: 0.10
 */

import { BaseEquipment, BaseProperty } from './baseEquipment';

// ================================================================= //
// SPELL FOCUS HAND REQUIREMENT
// ================================================================= //

export type SpellFocusHands = 'one-handed' | 'two-handed';

// ================================================================= //
// SPELL FOCUS PROPERTIES
// ================================================================= //

export interface SpellFocusProperty extends BaseProperty {
	/** The mechanical effect of this property */
	effect?: string;
}

// ================================================================= //
// CUSTOM SPELL FOCUS
// ================================================================= //

export interface CustomSpellFocus extends BaseEquipment {
	category: 'spellFocus';
	hands: SpellFocusHands;
	/** Bonus to Spell Checks (from Channeling) */
	spellCheckBonus: number;
	/** Bonus to hit with Spell Attacks (from Vicious) */
	spellAttackBonus: number;
	/** Bonus damage on Spell Attacks (from Powerful) */
	spellDamageBonus: number;
	/** AD bonus (from Protective) */
	adBonus: number;
	/** Has MDR (from Warded) */
	hasMdr: boolean;
	/** Range increase for range>1 spells (from Long-Ranged) */
	longRangeBonus: number;
	/** Range increase for range=1 spells (from Reach) */
	reachBonus: number;
	/** No DisADV in melee (from Close Quarters) */
	hasCloseQuarters: boolean;
	/** Verbal components heard only within 5 spaces (from Muffled) */
	hasMuffled: boolean;
	/** ADV on Spell Duel checks (from Reactive) */
	hasReactive: boolean;
	/** Whether it's a preset from the rulebook */
	isPreset?: boolean;
	/** Original preset name if modified from a preset */
	presetOrigin?: string;
}

// ================================================================= //
// PRESET SPELL FOCUS (from rulebook)
// ================================================================= //

export interface PresetSpellFocus {
	id: string;
	name: string;
	hands: SpellFocusHands;
	properties: string[];
}
