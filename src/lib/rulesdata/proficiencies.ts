/**
 * Proficiency rules and constraints (from DC20 Beta 0.9.5)
 *
 * This file centralizes all base values and rules for skills, trades, and languages.
 * NO business logic should be in the frontend components!
 * All rules come from this data - NO hardcoded values elsewhere!
 *
 * Base Points (Level 1):
 * - Skills: 5 + Intelligence
 * - Trades: 3
 * - Languages: 2
 *
 * Point Conversions:
 * - 1 Skill Point → 2 Trade Points
 * - 2 Trade Points → 1 Skill Point (reverse)
 * - 1 Trade Point → 2 Language Points
 *
 * Mastery Costs:
 * - Each mastery level costs 1 point
 * - Mastery limits are level-dependent (see levelCaps.ts)
 */

/**
 * Base proficiency point values at level 1
 * Additional points may come from:
 * - Intelligence modifier (skills only)
 * - Class progression
 * - Traits/Features (via effects)
 */
export const proficiencyRules = {
	// Base points at level 1 (before modifiers)
	baseSkillPoints: 5,
	baseTradePoints: 3,
	baseLanguagePoints: 2,

	// Cost per mastery level (1-5)
	costPerMasteryLevel: 1,

	// Conversion rates (FORWARD ONLY - reverse is handled by service)
	conversions: {
		// How many points you GET when converting FORWARD
		skillToTrade: 2, // 1 skill → 2 trade points
		tradeToLanguage: 2 // 1 trade → 2 language points
		// Note: Reverse conversions (2 trade → 1 skill, 2 language → 1 trade)
		// are calculated automatically when undoing conversions
	},

	// Language fluency costs
	languageFluency: {
		limited: 1, // Limited fluency costs 1 point
		fluent: 2, // Fluent costs 2 points
		freeLanguage: 'common' // Common is always free and fluent for all PCs
	}
} as const;

/**
 * Mastery level names (matching MASTERY_TIERS in levelCaps.ts)
 */
export const masteryLevelNames = [
	'Novice', // Level 1
	'Adept', // Level 2
	'Expert', // Level 3
	'Master', // Level 4
	'Grandmaster' // Level 5
] as const;

export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5;
export type MasteryLevelName = (typeof masteryLevelNames)[number];

/**
 * Get mastery level name from numeric level
 */
export const getMasteryLevelName = (level: MasteryLevel): MasteryLevelName | 'None' => {
	if (level === 0) return 'None';
	return masteryLevelNames[level - 1];
};

/**
 * Get bonus for a mastery level
 * Each level grants +2 bonus
 */
export const getMasteryBonus = (level: MasteryLevel): number => {
	return level * 2;
};
