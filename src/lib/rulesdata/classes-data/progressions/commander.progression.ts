/**
 * DC20 v0.10 Commander Class Progression
 *
 * Commander is a Martial class using the martial template.
 *
 * HP: +8 at L1, +2 per level = 26 total
 * SP: 2, 0, 1, 0, 0, 0, 1, 0, 1, 1 = 6 total
 * Maneuvers: 2, 0, 1, 0, 1, 0, 1, 0, 1, 1 = 7 total
 */

import type { ClassProgressionLevel } from '../progressionTypes';

export const commanderProgression: ClassProgressionLevel[] = [
	{
		level: 1,
		gainedHealth: 8,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 2,
		gainedManeuversKnown: 2,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: {
			classFeatures: [
				'commander_martial_path',
				'commander_inspiring_presence',
				'commander_call',
				'commander_natural_leader'
			]
		}
	},
	{
		level: 2,
		gainedHealth: 2,
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
			classFeatures: ['commander_commanding_aura']
		}
	},
	{
		level: 3,
		gainedHealth: 2,
		gainedAttributePoints: 1,
		gainedSkillPoints: 1,
		gainedTradePoints: 1,
		gainedStaminaPoints: 1,
		gainedManeuversKnown: 1,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: {
			subclassFeatureChoice: true
		}
	},
	{
		level: 4,
		gainedHealth: 2,
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
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 1,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: {
			classFeatures: ['commander_level_5_placeholder']
		}
	},
	{
		level: 6,
		gainedHealth: 2,
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
		gainedStaminaPoints: 1,
		gainedManeuversKnown: 1,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: {
			talents: 1,
			ancestryPoints: 2
		}
	},
	{
		level: 8,
		gainedHealth: 2,
		gainedAttributePoints: 1,
		gainedSkillPoints: 1,
		gainedTradePoints: 1,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: {
			pathProgression: true,
			classFeatures: ['commander_level_8_capstone_placeholder']
		}
	},
	{
		level: 9,
		gainedHealth: 2,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 1,
		gainedManeuversKnown: 1,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: {
			subclassFeatureChoice: true // Subclass capstone
		}
	},
	{
		level: 10,
		gainedHealth: 2,
		gainedAttributePoints: 1,
		gainedSkillPoints: 2,
		gainedTradePoints: 1,
		gainedStaminaPoints: 1,
		gainedManeuversKnown: 1,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: {
			talents: 1,
			epicBoon: true
		}
	}
];
