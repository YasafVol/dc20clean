/**
 * DC20 v0.10 Spellblade Class Progression
 *
 * Spellblade is a Hybrid class with both Martial and Spellcasting paths.
 *
 * HP: 8, 1, 2, 1, 2, 1, 2, 1, 2, 1 = 21 total
 * SP: 1, 0, 0, 0, 1, 0, 0, 0, 1, 0 = 3 total
 * Maneuvers: 1, 0, 1, 0, 0, 0, 1, 0, 0, 1 = 4 total
 * MP: 2, 0, 2, 0, 1, 0, 2, 0, 1, 1 = 9 total
 * Spells: 2, 0, 0, 0, 1, 0, 0, 0, 1, 0 = 4 total
 */

import type { ClassProgressionLevel } from '../progressionTypes';

export const spellbladeProgression: ClassProgressionLevel[] = [
	{
		level: 1,
		gainedHealth: 8,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 1,
		gainedManeuversKnown: 1,
		gainedManaPoints: 2,
		gainedSpellsKnown: 2,
		gains: {
			classFeatures: [
				'spellblade_martial_path',
				'spellblade_spellcasting_path',
				'spellblade_bound_weapon',
				'spellblade_disciplines',
				'spellblade_sense_magic'
			]
		}
	},
	{
		level: 2,
		gainedHealth: 1,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: {
			talents: 1,
			pathProgression: true,
			classFeatures: ['spellblade_spellstrike']
		}
	},
	{
		level: 3,
		gainedHealth: 2,
		gainedAttributePoints: 1,
		gainedSkillPoints: 1,
		gainedTradePoints: 1,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 1,
		gainedManaPoints: 2,
		gainedSpellsKnown: 0,
		gains: {
			subclassFeatureChoice: true
		}
	},
	{
		level: 4,
		gainedHealth: 1,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: {
			talents: 1,
			pathProgression: true,
			ancestryPoints: 2
		}
	},
	{
		level: 5,
		gainedHealth: 2,
		gainedAttributePoints: 1,
		gainedSkillPoints: 2,
		gainedTradePoints: 1,
		gainedStaminaPoints: 1,
		gainedManeuversKnown: 0,
		gainedManaPoints: 1,
		gainedSpellsKnown: 1,
		gains: {
			classFeatures: ['spellblade_level_5_placeholder']
		}
	},
	{
		level: 6,
		gainedHealth: 1,
		gainedAttributePoints: 0,
		gainedSkillPoints: 1,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: {
			pathProgression: true,
			subclassFeatureChoice: true
		}
	},
	{
		level: 7,
		gainedHealth: 2,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 1,
		gainedManaPoints: 2,
		gainedSpellsKnown: 0,
		gains: {
			talents: 1,
			ancestryPoints: 2
		}
	},
	{
		level: 8,
		gainedHealth: 1,
		gainedAttributePoints: 1,
		gainedSkillPoints: 1,
		gainedTradePoints: 1,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: {
			pathProgression: true,
			classFeatures: ['spellblade_level_8_capstone_placeholder']
		}
	},
	{
		level: 9,
		gainedHealth: 2,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 1,
		gainedManeuversKnown: 0,
		gainedManaPoints: 1,
		gainedSpellsKnown: 1,
		gains: {
			subclassFeatureChoice: true // Subclass capstone
		}
	},
	{
		level: 10,
		gainedHealth: 1,
		gainedAttributePoints: 1,
		gainedSkillPoints: 2,
		gainedTradePoints: 1,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 1,
		gainedManaPoints: 1,
		gainedSpellsKnown: 0,
		gains: {
			talents: 1,
			epicBoon: true
		}
	}
];
