/**
 * Shared Ancestry Traits
 *
 * This file contains centralized trait definitions for commonly duplicated traits
 * across multiple ancestries. Using shared traits ensures consistency in effects
 * and reduces maintenance burden.
 *
 * When an ancestry needs a trait that matches one of these shared definitions,
 * reference the shared trait ID instead of duplicating the definition.
 */

import type { Trait } from '../schemas/character.schema';

/**
 * Shared traits that are identical across multiple ancestries.
 * These replace duplicate definitions to ensure consistent behavior.
 */
export const sharedTraitsData: Trait[] = [
	// ============================================
	// SIZE TRAITS
	// ============================================
	{
		id: 'shared_small_sized',
		name: 'Small-Sized',
		description: 'Your Size is considered Small.',
		cost: -1,
		isNegative: true,
		effects: [
			{
				type: 'SET_VALUE',
				target: 'size',
				value: 'small'
			}
		]
	},

	// ============================================
	// MOVEMENT TRAITS
	// ============================================
	{
		id: 'shared_short_legged',
		name: 'Short-Legged',
		description: 'Your Speed decreases by 1 Space.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: -1 }]
	},
	{
		id: 'shared_speed_increase',
		name: 'Speed Increase',
		description: 'Your Speed increases by 1 Space.',
		cost: 2,
		effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1 }]
	},
	{
		id: 'shared_climb_speed',
		name: 'Climb Speed',
		description: 'You gain a Climb Speed equal to your Movement Speed.',
		cost: 1,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'climb', value: 'equal_to_speed' }]
	},
	{
		id: 'shared_swim_speed',
		name: 'Swim Speed',
		description: 'You gain a Swim Speed equal to your Ground Speed.',
		cost: 1,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'swim', value: 'equal_to_speed' }]
	},
	{
		id: 'shared_burrow_speed',
		name: 'Burrow Speed',
		description: 'You gain a Burrow Speed equal to half your Movement Speed.',
		cost: 2,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'burrow', value: 'half_speed' }]
	},
	{
		id: 'shared_glide_speed',
		name: 'Glide Speed',
		description:
			"You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren't Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.",
		cost: 2,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'glide', value: 'wings' }]
	},

	// ============================================
	// HEALTH & DEFENSE TRAITS
	// ============================================
	{
		id: 'shared_tough',
		name: 'Tough',
		description: 'Your HP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'hpMax', value: 1 }]
	},
	{
		id: 'shared_frail',
		name: 'Frail',
		description: 'Your HP maximum decreases by 2.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'hpMax', value: -2 }]
	},
	{
		id: 'shared_thick_skinned',
		name: 'Thick-Skinned',
		description: "While you aren't wearing Armor, you gain +1 AD.",
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'shared_quick_reactions',
		name: 'Quick Reactions',
		description: 'While you are not wearing Armor, you gain +1 PD.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'pd', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'shared_brittle',
		name: 'Brittle',
		description: 'Your AD decreases by 1.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'ad', value: -1 }]
	},
	{
		id: 'shared_reckless',
		name: 'Reckless',
		description: 'Your PD decreases by 1.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'pd', value: -1 }]
	},

	// ============================================
	// MANA TRAITS
	// ============================================
	{
		id: 'shared_mana_increase',
		name: 'Mana Increase',
		description: 'Your MP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 }]
	},

	// ============================================
	// SENSES
	// ============================================
	{
		id: 'shared_darkvision',
		name: 'Darkvision',
		description: 'You have Darkvision 10 Spaces.',
		cost: 1,
		effects: [{ type: 'GRANT_SENSE', target: 'darkvision', value: 10 }]
	},
	{
		id: 'shared_tremorsense',
		name: 'Tremorsense',
		description: 'You have Tremorsense 3 Spaces.',
		cost: 1,
		effects: [{ type: 'GRANT_SENSE', target: 'tremorsense', value: 3 }]
	},

	// ============================================
	// RESISTANCES & FORTITUDE
	// ============================================
	{
		id: 'shared_toxic_fortitude',
		name: 'Toxic Fortitude',
		description: 'You have Poison Resistance (Half) and ADV on Saves against being Poisoned.',
		cost: 2,
		effects: [
			{ type: 'GRANT_RESISTANCE', target: 'Poison', value: 'half' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Poisoned', value: 'ADV' }
		]
	},
	{
		id: 'shared_stone_blood',
		name: 'Stone Blood',
		description:
			'You have ADV on Saves against Bleeding. Additionally, you can spend 1 AP to end the Bleeding Condition on yourself.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Bleeding', value: 'ADV' },
			{
				type: 'GRANT_ABILITY',
				target: 'stone_blood',
				value: 'You can spend 1 AP to end the Bleeding Condition on yourself.'
			}
		]
	},

	// ============================================
	// AGILITY & EVASION TRAITS
	// ============================================
	{
		id: 'shared_escape_artist',
		name: 'Escape Artist',
		description:
			'You have ADV on Checks and Saves to avoid or escape being Grappled or Restrained.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_CHECK', target: 'Avoid_or_Escape_Grapple_Restrained', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Avoid_or_Escape_Grapple_Restrained', value: 'ADV' }
		]
	},
	{
		id: 'shared_deft_footwork',
		name: 'Deft Footwork',
		description:
			'You can move through the space of a hostile creature 1 size larger than you as if it were Difficult Terrain.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'deft_footwork',
				value:
					'You can move through the space of a hostile creature 1 size larger as if it were Difficult Terrain.'
			}
		]
	},
	{
		id: 'shared_sneaky',
		name: 'Sneaky',
		description: 'You can Hide while only Partially Concealed or behind 1/2 Cover.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'sneaky',
				value: 'You can Hide while only Partially Concealed or behind 1/2 Cover.'
			}
		]
	},

	// ============================================
	// BUILD TRAITS
	// ============================================
	{
		id: 'shared_powerful_build',
		name: 'Powerful Build',
		description: 'You increase by 1 Size, but you occupy the Space of a creature 1 Size smaller.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'powerful_build',
				value: '+1 Size but occupy 1 Size smaller space.'
			}
		]
	},
	{
		id: 'shared_natural_weapon',
		name: 'Natural Weapon',
		description:
			'You have up to 2 Natural Weapons (claws, horns, fangs, tail, etc.) which you can use to make Unarmed Strikes that deal 1 Bludgeoning, Piercing, or Slashing damage (your choice upon gaining this Trait). You can perform Attack Maneuvers with your Natural Weapons.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'natural_weapon',
				value: '2 Natural Weapons for Unarmed Strikes (1 damage, chosen type).'
			}
		]
	},

	// ============================================
	// SKILL-RELATED TRAITS
	// ============================================
	{
		id: 'shared_trapper',
		name: 'Trapper',
		description:
			'You have ADV on Investigation Checks to spot Traps and on Trickery Checks to Hide Traps.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_CHECK', target: 'Investigation_to_spot_Traps', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_CHECK', target: 'Trickery_to_Hide_Traps', value: 'ADV' }
		]
	},
	{
		id: 'shared_critter_knowledge',
		name: 'Critter Knowledge',
		description:
			'You have ADV on Nature, Survival, and Animal Checks involving Small size creatures and smaller.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ADV_ON_CHECK',
				target: 'Nature_Survival_Animal_involving_Small_Creatures',
				value: 'ADV'
			}
		]
	},

	// ============================================
	// VULNERABILITIES
	// ============================================
	{
		id: 'shared_radiant_weakness',
		name: 'Radiant Weakness',
		description: 'You have Radiant Vulnerability (1).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_VULNERABILITY', target: 'Radiant', value: 1 }]
	},
	{
		id: 'shared_umbral_weakness',
		name: 'Umbral Weakness',
		description: 'You have Umbral Vulnerability (1).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_VULNERABILITY', target: 'Umbral', value: 1 }]
	},
	{
		id: 'shared_psychic_weakness',
		name: 'Cursed Mind',
		description: 'You gain Psychic Vulnerability (1).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_VULNERABILITY', target: 'Psychic', value: 1 }]
	},
	{
		id: 'shared_sunlight_sensitivity',
		name: 'Sunlight Sensitivity',
		description:
			'While you or your target is in sunlight, you have DisADV on Attacks and Awareness Checks that rely on sight.',
		cost: -2,
		isNegative: true,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'sunlight_sensitivity',
				value: 'DisADV on Attacks and sight-based Awareness in sunlight.'
			}
		]
	},

	// ============================================
	// TRADE/SKILL EXPERTISE (Base definitions)
	// ============================================
	{
		id: 'shared_skill_expertise',
		name: 'Skill Expertise',
		description:
			'Choose a Skill. Your Mastery Cap and Mastery Level in the chosen Skill both increase by 1. You can only benefit from 1 Feature that increases your Skill Mastery Limit at a time.',
		cost: 2,
		effects: [
			{
				type: 'INCREASE_SKILL_MASTERY_CAP',
				count: 1,
				value: 1
			},
			{
				type: 'MODIFY_STAT',
				target: 'skillPoints',
				value: 1
			}
		]
	},
	{
		id: 'shared_trade_expertise',
		name: 'Trade Expertise',
		description:
			'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1. You can only benefit from 1 Feature that increases your Trade Mastery Limit at a time.',
		cost: 1,
		effects: [
			{
				type: 'INCREASE_TRADE_MASTERY_CAP',
				count: 1,
				value: 1
			},
			{
				type: 'MODIFY_STAT',
				target: 'tradePoints',
				value: 1
			}
		]
	}
];

/**
 * Helper to get a shared trait by ID
 */
export const getSharedTrait = (id: string): Trait | undefined => {
	return sharedTraitsData.find((trait) => trait.id === id);
};

/**
 * Creates an ancestry-specific alias for a shared trait.
 * This allows maintaining the ancestry prefix in IDs while using shared effects.
 */
export const createTraitAlias = (
	sharedTraitId: string,
	ancestryPrefix: string,
	overrides?: Partial<Trait>
): Trait | null => {
	const sharedTrait = getSharedTrait(sharedTraitId);
	if (!sharedTrait) return null;

	const newId = `${ancestryPrefix}_${sharedTraitId.replace('shared_', '')}`;

	return {
		...sharedTrait,
		id: newId,
		...overrides
	};
};

/**
 * Mapping of old trait IDs to shared trait IDs for migration purposes.
 * This helps track which traits have been centralized.
 */
export const TRAIT_ID_MAPPING: Record<string, string> = {
	// Small-Sized
	halfling_small_sized: 'shared_small_sized',
	gnome_small_sized: 'shared_small_sized',
	beastborn_small_sized: 'shared_small_sized',
	gremlin_small_sized: 'shared_small_sized',
	goblin_small_sized: 'shared_small_sized',

	// Short-Legged
	dwarf_short_legged: 'shared_short_legged',
	halfling_short_legged: 'shared_short_legged',
	gnome_short_legged: 'shared_short_legged',
	beastborn_short_legged: 'shared_short_legged',
	terraborn_slow_moving: 'shared_short_legged',

	// Tough
	dwarf_tough: 'shared_tough',
	orc_tough: 'shared_tough',
	giantborn_tough: 'shared_tough',
	terraborn_tough: 'shared_tough',
	// Note: beastborn_tough is different (+2 HP)

	// Darkvision
	dragonborn_darkvision: 'shared_darkvision',
	fiendborn_darkvision: 'shared_darkvision',
	beastborn_darkvision: 'shared_darkvision',
	shadowborn_darkvision: 'shared_darkvision',

	// Mana Increase
	gnome_mana_increase: 'shared_mana_increase',
	angelborn_mana_increase: 'shared_mana_increase',
	dragonborn_mana_increase: 'shared_mana_increase',
	fiendborn_mana_increase: 'shared_mana_increase',
	shadowborn_mana_increase: 'shared_mana_increase',

	// Glide Speed
	angelborn_glide_speed: 'shared_glide_speed',
	dragonborn_glide_speed: 'shared_glide_speed',
	fiendborn_glide_speed: 'shared_glide_speed',
	beastborn_glide_speed: 'shared_glide_speed',

	// Thick-Skinned
	dwarf_thick_skinned: 'shared_thick_skinned',
	dragonborn_thick_skinned: 'shared_thick_skinned',
	beastborn_thick_skinned: 'shared_thick_skinned',
	// Note: terraborn_thick_skinned is different (no armor condition)

	// Quick Reactions
	elf_quick_reactions: 'shared_quick_reactions',
	beastborn_quick_reactions: 'shared_quick_reactions',
	gremlin_quick_reactions: 'shared_quick_reactions',

	// Reckless
	orc_reckless: 'shared_reckless',
	beastborn_reckless: 'shared_reckless',
	goblin_reckless: 'shared_reckless',

	// Toxic Fortitude
	dwarf_toxic_fortitude: 'shared_toxic_fortitude',
	beastborn_toxic_fortitude: 'shared_toxic_fortitude',
	terraborn_toxic_fortitude: 'shared_toxic_fortitude',

	// Escape Artist
	gnome_escape_artist: 'shared_escape_artist',
	goblin_escape_artist: 'shared_escape_artist',
	shadowborn_escape_artist: 'shared_escape_artist',

	// Climb Speed
	elf_climb_speed: 'shared_climb_speed',
	beastborn_climb_speed: 'shared_climb_speed',
	gremlin_climb_speed: 'shared_climb_speed',

	// Brittle
	elf_brittle: 'shared_brittle',
	halfling_brittle: 'shared_brittle',

	// Frail
	elf_frail: 'shared_frail',
	psyborn_frail: 'shared_frail',

	// Stone Blood
	dwarf_stone_blood: 'shared_stone_blood',
	terraborn_stone_blood: 'shared_stone_blood',

	// Deft Footwork
	halfling_deft_footwork: 'shared_deft_footwork',
	gremlin_deft_footwork: 'shared_deft_footwork',

	// Sneaky
	gremlin_sneaky: 'shared_sneaky',
	goblin_sneaky: 'shared_sneaky',

	// Powerful Build
	giantborn_powerful_build: 'shared_powerful_build',
	beastborn_powerful_build: 'shared_powerful_build',

	// Trapper
	gnome_trapper: 'shared_trapper',
	goblin_trapper: 'shared_trapper',

	// Critter Knowledge
	halfling_critter_knowledge: 'shared_critter_knowledge',
	gremlin_critter_knowledge: 'shared_critter_knowledge',

	// Skill/Trade Expertise
	human_skill_expertise: 'shared_skill_expertise',
	human_trade_expertise: 'shared_trade_expertise',
	elf_trade_expertise_elf: 'shared_trade_expertise'
	// Note: gnome/dwarf/goblin trade expertise have restrictions, handled separately
};
