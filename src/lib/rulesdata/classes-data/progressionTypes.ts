/**
 * DC20 v0.10 Class Progression Type Definitions
 *
 * This file defines the type structure for class progression tables.
 * In v0.10, techniques are removed and path progression is standardized.
 */

export interface ClassProgressionGains {
	/** Number of talents gained at this level */
	talents?: number;
	/** Whether this level grants path progression (subclass advancement) */
	pathProgression?: boolean;
	/** Number of ancestry points gained at this level */
	ancestryPoints?: number;
	/** Whether this level grants a subclass feature choice */
	subclassFeatureChoice?: boolean;
	/** Whether this level grants an epic boon */
	epicBoon?: boolean;
	/** IDs of class features gained at this level */
	classFeatures?: string[];
}

export interface ClassProgressionLevel {
	/** Character level (1-10) */
	level: number;
	/** HP gained at this level */
	gainedHealth: number;
	/** Attribute points gained at this level */
	gainedAttributePoints: number;
	/** Skill points gained at this level */
	gainedSkillPoints: number;
	/** Trade points gained at this level */
	gainedTradePoints: number;
	/** Stamina points gained at this level (martial classes only) */
	gainedStaminaPoints: number;
	/** Maneuvers known gained at this level (martial classes only) */
	gainedManeuversKnown: number;
	/** Mana points gained at this level (caster classes only) */
	gainedManaPoints: number;
	/** Spells known gained at this level (caster classes only) */
	gainedSpellsKnown: number;
	/** Additional gains at this level */
	gains: ClassProgressionGains;
}

/**
 * Standard martial progression template (v0.10)
 * Used by: Barbarian, Champion, Commander, Hunter, Rogue
 *
 * HP: +8/+2/+2/+2/+2/+2/+2/+2/+2/+2 (26 total)
 * SP: +2/0/+1/0/0/0/+1/0/+1/+1 (6 total)
 * Maneuvers: +2/0/+1/0/+1/0/+1/0/+1/+1 (7 total)
 * Path Progression: levels 2, 4, 6, 8
 * Ancestry Points: 2 at levels 4, 7
 * Talents: levels 2, 4, 7, 10
 * Epic Boon: level 10
 */

/**
 * Standard caster progression template (v0.10)
 * Used by: Bard, Cleric, Wizard (and similar)
 *
 * HP: +7/+1/+1/+1/+1/+1/+1/+1/+1/+1 (16 total)
 * MP: +6/0/+2/0/+3/0/+2/0/+3/+2 (18 total)
 * Spells: +4/0/+1/0/+1/0/+1/0/+1/+1 (9 total)
 * Path Progression: levels 2, 4, 6, 8
 * Ancestry Points: 2 at levels 4, 7
 * Talents: levels 2, 4, 7, 10
 * Epic Boon: level 10
 */
