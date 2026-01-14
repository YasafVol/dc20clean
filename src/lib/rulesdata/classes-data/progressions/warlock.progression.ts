/**
 * DC20 v0.10 Warlock Class Progression
 *
 * Warlock is a hybrid Caster class with variable HP per level.
 *
 * HP: 8, 1, 2, 1, 2, 1, 2, 1, 2, 1 = 21 total
 * MP: 6, 0, 2, 0, 3, 0, 2, 0, 3, 2 = 18 total
 * Spells: 4, 0, 1, 0, 1, 0, 1, 0, 1, 1 = 9 total
 */

import type { ClassProgressionLevel } from '../progressionTypes';

export const warlockProgression: ClassProgressionLevel[] = [
	{
		level: 1,
		gainedHealth: 8,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 6,
		gainedSpellsKnown: 4,
		gains: {
			classFeatures: ['warlock_spellcasting_path', 'warlock_pact_boon', 'warlock_occult_knowledge']
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
			classFeatures: ['warlock_contract']
		}
	},
	{
		level: 3,
		gainedHealth: 2,
		gainedAttributePoints: 1,
		gainedSkillPoints: 1,
		gainedTradePoints: 1,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 2,
		gainedSpellsKnown: 1,
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
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 3,
		gainedSpellsKnown: 1,
		gains: {
			classFeatures: ['warlock_level_5_placeholder']
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
		gainedManeuversKnown: 0,
		gainedManaPoints: 2,
		gainedSpellsKnown: 1,
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
			classFeatures: ['warlock_level_8_capstone_placeholder']
		}
	},
	{
		level: 9,
		gainedHealth: 2,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 3,
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
		gainedManeuversKnown: 0,
		gainedManaPoints: 2,
		gainedSpellsKnown: 1,
		gains: {
			talents: 1,
			epicBoon: true
		}
	}
];
