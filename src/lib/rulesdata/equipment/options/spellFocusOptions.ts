/**
 * @file src/lib/rulesdata/equipment/options/spellFocusOptions.ts
 * @description Spell focus properties and presets from DC20 0.10.
 */

import { SpellFocusProperty, PresetSpellFocus } from '../schemas/spellFocusSchema';

// ================================================================= //
// SPELL FOCUS RULES
// ================================================================= //

export const SPELL_FOCUS_RULES = {
	maxPoints: 1,
	twoHandedBonus: 1, // Two-Handed gives -1 cost, effectively +1 point
	requiresHand: true,
	somaticComponent:
		'Holding a Spell Focus counts as performing Somatic Components but is still considered noticeably casting a Spell.',
	lackingTraining:
		'While wielding a Spell Focus you lack Training with, you do not benefit from its properties.'
};

// ================================================================= //
// SPELL FOCUS PROPERTIES
// ================================================================= //

export const SPELL_FOCUS_PROPERTIES: SpellFocusProperty[] = [
	{
		id: 'channeling',
		name: 'Channeling',
		description: 'You gain a +1 bonus to Spell Checks.',
		cost: 1,
		effect: '+1 to Spell Checks'
	},
	{
		id: 'close-quarters',
		name: 'Close Quarters',
		description:
			"Your Ranged Spell Attacks don't have DisADV if you're within the Melee Range of enemies.",
		cost: 1,
		effect: 'No DisADV on Ranged Spell Attacks in melee'
	},
	{
		id: 'long-ranged-focus',
		name: 'Long-Ranged',
		description:
			'Spells you cast with a Range greater than 1 have their range increase by 5 Spaces.',
		cost: 1,
		effect: '+5 Spaces range for spells with range > 1'
	},
	{
		id: 'muffled',
		name: 'Muffled',
		description: 'Verbal Components of Spells you cast can only be heard within 5 Spaces of you.',
		cost: 1,
		effect: 'Verbal Components heard only within 5 Spaces'
	},
	{
		id: 'powerful',
		name: 'Powerful',
		description: 'Your Spell Attacks deal +1 damage to all targets.',
		cost: 2,
		effect: '+1 Spell Attack damage'
	},
	{
		id: 'protective',
		name: 'Protective',
		description: 'Your AD increases by 1.',
		cost: 1,
		effect: '+1 AD'
	},
	{
		id: 'reach-focus',
		name: 'Reach',
		description: 'Spells you cast with a Range of 1 have their range increase by 1 Space.',
		cost: 1,
		effect: '+1 Space range for spells with range 1'
	},
	{
		id: 'reactive',
		name: 'Reactive',
		description:
			'When you are the Challenger or a Participant helping the Challenger in a Spell Duel, they gain ADV on their Check to stop the Spell.',
		cost: 1,
		effect: 'ADV on Spell Duel checks as Challenger'
	},
	{
		id: 'two-handed-focus',
		name: 'Two-Handed',
		description: 'The Spell Focus requires 2 hands to benefit from its properties.',
		cost: -1,
		effect: 'Requires 2 hands'
	},
	{
		id: 'vicious',
		name: 'Vicious',
		description: 'You gain a +1 bonus to hit with Spell Attacks.',
		cost: 1,
		effect: '+1 to hit with Spell Attacks'
	},
	{
		id: 'warded',
		name: 'Warded',
		description: 'You have MDR (Mystical Damage Reduction).',
		cost: 1,
		effect: 'MDR'
	}
];

// ================================================================= //
// PRESET SPELL FOCUSES (from rulebook examples)
// ================================================================= //

export const PRESET_SPELL_FOCUSES: PresetSpellFocus[] = [
	// ===== ONE-HANDED =====
	{
		id: 'orb',
		name: 'Orb',
		hands: 'one-handed',
		properties: ['channeling']
	},
	{
		id: 'ceremonial-dagger',
		name: 'Ceremonial Dagger',
		hands: 'one-handed',
		properties: ['close-quarters']
	},
	{
		id: 'crystal',
		name: 'Crystal',
		hands: 'one-handed',
		properties: ['vicious']
	},
	{
		id: 'totem',
		name: 'Totem',
		hands: 'one-handed',
		properties: ['protective']
	},
	{
		id: 'holy-medallion',
		name: 'Holy Medallion / Relic',
		hands: 'one-handed',
		properties: ['warded']
	},
	{
		id: 'wand',
		name: 'Wand',
		hands: 'one-handed',
		properties: ['long-ranged-focus']
	},
	{
		id: 'rod',
		name: 'Rod',
		hands: 'one-handed',
		properties: ['reach-focus']
	},
	{
		id: 'poppet',
		name: 'Poppet',
		hands: 'one-handed',
		properties: ['muffled']
	},
	{
		id: 'ritual-bell',
		name: 'Ritual Bell',
		hands: 'one-handed',
		properties: ['reactive']
	},
	// ===== TWO-HANDED =====
	{
		id: 'mage-staff',
		name: 'Mage Staff / Twin Crystals',
		hands: 'two-handed',
		properties: ['powerful', 'two-handed-focus']
	},
	{
		id: 'grimoire',
		name: 'Grimoire / Tarot Deck',
		hands: 'two-handed',
		properties: ['channeling', 'vicious', 'two-handed-focus']
	},
	{
		id: 'censer',
		name: 'Censer',
		hands: 'two-handed',
		properties: ['protective', 'warded', 'two-handed-focus']
	},
	{
		id: 'magical-instrument',
		name: 'Magical Instrument',
		hands: 'two-handed',
		properties: ['long-ranged-focus', 'reactive', 'two-handed-focus']
	}
];

// ================================================================= //
// HELPER FUNCTIONS
// ================================================================= //

export const getSpellFocusProperty = (id: string): SpellFocusProperty | undefined =>
	SPELL_FOCUS_PROPERTIES.find((p) => p.id === id);

export const getPresetSpellFocus = (id: string): PresetSpellFocus | undefined =>
	PRESET_SPELL_FOCUSES.find((f) => f.id === id);

/**
 * Calculate the effective max points for a spell focus
 * @param isTwoHanded Whether the focus is two-handed
 * @returns The maximum points available
 */
export const getMaxPointsForSpellFocus = (isTwoHanded: boolean): number => {
	// Base is 1 point, Two-Handed costs -1 so you effectively get 2 points total
	return isTwoHanded ? 2 : 1;
};

/**
 * Get all properties available (excludes Two-Handed from selection since it's a type choice)
 */
export const getSelectableSpellFocusProperties = (): SpellFocusProperty[] =>
	SPELL_FOCUS_PROPERTIES.filter((p) => p.id !== 'two-handed-focus');
