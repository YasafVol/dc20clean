/**
 * DC20 v0.10.5 Spellcaster Class Progression Template
 *
 * Applies by default to full caster classes. Warlock uses a full explicit source table.
 *
 * Changes from 0.9.5:
 * - HP: +7 at level 1, +1 per level after
 * - MP progression: 6, 0, 3, 0, 3, 0, 3, 0, 3, 3 (total 21)
 * - Spells Known: 4, 0, 1, 0, 1, 0, 1, 0, 1, 1 (total 9)
 * - Cantrips: REMOVED from game (no longer a classification)
 * - Path Progression now at levels 2, 4, 6, 8 (moved from 7, 10 to 6, 8)
 *
 * Common progression table for category-derived caster classes.
 * Class-specific features are overlaid by classProgressionDefinitions.ts.
 */

import type { ClassProgressionLevel } from '../../progressionTypes';

export const casterProgressionTemplate: ClassProgressionLevel[] = [
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
			classFeatures: [] // Add class-specific level 1 features
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
			classFeatures: [] // Add class-specific level 2 features
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
		gainedManaPoints: 3,
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
			classFeatures: [] // Add class-specific level 5 features
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
			talents: 1,
			pathProgression: true
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
		gainedManaPoints: 3,
		gainedSpellsKnown: 1,
		gains: {
			subclassFeatureChoice: true
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
			talents: 1,
			pathProgression: true,
			ancestryPoints: 2
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
			classFeatures: []
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
		gainedManaPoints: 3,
		gainedSpellsKnown: 1,
		gains: {
			subclassFeatureChoice: true
		}
	}
];
