/**
 * DC20 v0.10.5 Martial Class Progression Template
 *
 * Applies by default to full martial classes. Rogue uses a full explicit source table.
 *
 * Changes from 0.9.5:
 * - HP: +8 at level 1, +2 per level after
 * - SP progression: 2, 0, 1, 0, 0, 0, 1, 0, 1, 1 (total 6)
 * - Maneuvers: 2, 0, 1, 0, 1, 0, 1, 0, 1, 1 (total 7)
 * - Techniques: REMOVED from game
 * - Path Progression now at levels 2, 4, 6, 8 (moved from 7, 10 to 6, 8)
 *
 * Common progression table for category-derived martial classes.
 * Class-specific features are overlaid by classProgressionDefinitions.ts.
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
			talents: 1,
			pathProgression: true
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
			subclassFeatureChoice: true
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
			talents: 1,
			pathProgression: true,
			ancestryPoints: 2
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
			classFeatures: []
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
			subclassFeatureChoice: true
		}
	}
];
