/**
 * DC20 v0.10 Psion Class Progression - Placeholder
 *
 * NOTE: Psion is not yet included in DC20 v0.10 rules.
 * Using standard caster progression template as placeholder.
 */

import type { ClassProgressionLevel } from '../progressionTypes';

export const psionProgression: ClassProgressionLevel[] = [
	{
		level: 1,
		gainedHealth: 7,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 6,
		gainedSpellsKnown: 4,
		gains: {
			classFeatures: []
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
			classFeatures: []
		}
	},
	{
		level: 3,
		gainedHealth: 1,
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
		gainedHealth: 1,
		gainedAttributePoints: 1,
		gainedSkillPoints: 2,
		gainedTradePoints: 1,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 3,
		gainedSpellsKnown: 1,
		gains: {
			classFeatures: []
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
		gainedHealth: 1,
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
			classFeatures: []
		}
	},
	{
		level: 9,
		gainedHealth: 1,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 3,
		gainedSpellsKnown: 1,
		gains: {
			subclassFeatureChoice: true
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
