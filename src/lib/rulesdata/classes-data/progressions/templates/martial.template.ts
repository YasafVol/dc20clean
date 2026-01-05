/**
 * DC20 v0.10 Martial Class Progression Template
 *
 * Applies to: Barbarian, Champion, Commander, Hunter, Monk
 *
 * Changes from 0.9.5:
 * - HP: +8 at level 1, +2 per level after
 * - SP progression: 2, 0, 1, 0, 0, 0, 1, 0, 1, 1 (total 6)
 * - Maneuvers: 2, 0, 1, 0, 1, 0, 1, 0, 1, 1 (total 7)
 * - Techniques: REMOVED from game
 * - Path Progression now at levels 2, 4, 6, 8 (moved from 7, 10 to 6, 8)
 *
 * Common progression shared by all martial classes.
 * Class-specific features should be added in the 'gains.classFeatures' array.
 */

import type { ClassProgressionLevel } from '../../progressionTypes';

export const martialProgressionTemplate: ClassProgressionLevel[] = [
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
			classFeatures: [] // Add class-specific level 1 features
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
			pathProgression: true, // Renamed from pathPoints
			classFeatures: [] // Add class-specific level 2 features
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
			classFeatures: [] // Add class-specific level 5 features
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
			pathProgression: true, // NEW: Moved from level 7
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
			// NOTE: Path Progression moved to level 6
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
			pathProgression: true, // NEW: Moved from level 10
			classFeatures: [] // Add class capstone feature
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
			// NOTE: Path Progression moved to level 8
		}
	}
];
