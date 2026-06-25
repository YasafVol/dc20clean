/**
 * DC20 v0.10.5 Class Progression Type Definitions
 *
 * This file defines the type structure for class progression tables.
 * In v0.10.5, techniques are removed and path progression is standardized.
 */

export interface ClassProgressionGains {
	/** Number of talents gained at this level */
	talents?: number;
	/** Whether this level grants a path progression point */
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
 * Standard martial progression template (v0.10.5)
 * Used by category-derived martial classes. Rogue has an explicit source table.
 *
 * HP: +8/+2/+2/+2/+2/+2/+2/+2/+2/+2 (26 total)
 * SP: +2/0/+1/0/0/0/+1/0/+1/+1 (6 total)
 * Maneuvers: +2/0/+1/0/+1/0/+1/0/+1/+1 (7 total)
 * Path Progression: levels 2, 4, 6, 8
 * Ancestry Points: 2 at levels 4, 8
 * Talents: levels 2, 4, 6, 8
 * Subclass Features: levels 3, 7, 10
 * Class Features: levels 1, 2, 5, 9
 */

/**
 * Standard caster progression template (v0.10.5)
 * Used by category-derived caster classes. Warlock has an explicit source table.
 *
 * HP: +7/+1/+1/+1/+1/+1/+1/+1/+1/+1 (16 total)
 * MP: +6/0/+3/0/+3/0/+3/0/+3/+3 (21 total)
 * Spells: +4/0/+1/0/+1/0/+1/0/+1/+1 (9 total)
 * Path Progression: levels 2, 4, 6, 8
 * Ancestry Points: 2 at levels 4, 8
 * Talents: levels 2, 4, 6, 8
 * Subclass Features: levels 3, 7, 10
 * Class Features: levels 1, 2, 5, 9
 */
