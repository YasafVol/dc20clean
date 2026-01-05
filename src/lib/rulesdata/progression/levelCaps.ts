/**
 * Level-Based Caps System
 *
 * Single source of truth for:
 * - Mastery tier definitions (names, bonuses)
 * - Attribute caps by level
 * - Skill/Trade mastery caps by level
 *
 * This replaces all hardcoded cap tables in UI components and calculator.
 */

/**
 * Mastery Tier Definition
 * Defines the progression ladder for skills and trades
 */
export interface MasteryTierDefinition {
	tier: number; // Numeric tier (0=Untrained, 1=Novice, 2=Adept, 3=Expert, 4=Master, 5=Grandmaster)
	name: string; // Human-readable name
	bonus: number; // Numeric bonus applied (+0, +2, +4, +6, +8, +10)
}

/**
 * Canonical Mastery Tiers
 * All code should reference this array instead of defining their own
 */
export const MASTERY_TIERS: MasteryTierDefinition[] = [
	{ tier: 0, name: 'Untrained', bonus: 0 },
	{ tier: 1, name: 'Novice', bonus: 2 },
	{ tier: 2, name: 'Adept', bonus: 4 },
	{ tier: 3, name: 'Expert', bonus: 6 },
	{ tier: 4, name: 'Master', bonus: 8 },
	{ tier: 5, name: 'Grandmaster', bonus: 10 }
];

/**
 * Level Caps
 * Defines maximum values for attributes and mastery at each character level
 */
export interface LevelCaps {
	level: number;
	maxAttributeValue: number; // Max attribute modifier (e.g., +3, +4, etc.)
	maxSkillMasteryTier: number; // Max mastery tier for skills (references MASTERY_TIERS)
	maxTradeMasteryTier: number; // Max mastery tier for trades (references MASTERY_TIERS)
}

/**
 * Level Caps Table (Levels 1-20)
 * Each row explicitly states all caps for that level
 * This makes future changes easier and eliminates formula debugging
 */
export const LEVEL_CAPS_TABLE: LevelCaps[] = [
	// Levels 1-4: Novice tier, Attribute +3
	{ level: 1, maxAttributeValue: 3, maxSkillMasteryTier: 1, maxTradeMasteryTier: 1 },
	{ level: 2, maxAttributeValue: 3, maxSkillMasteryTier: 1, maxTradeMasteryTier: 1 },
	{ level: 3, maxAttributeValue: 3, maxSkillMasteryTier: 1, maxTradeMasteryTier: 1 },
	{ level: 4, maxAttributeValue: 3, maxSkillMasteryTier: 1, maxTradeMasteryTier: 1 },

	// Level 5: Adept tier unlocks, Attribute +4
	{ level: 5, maxAttributeValue: 4, maxSkillMasteryTier: 2, maxTradeMasteryTier: 2 },
	{ level: 6, maxAttributeValue: 4, maxSkillMasteryTier: 2, maxTradeMasteryTier: 2 },
	{ level: 7, maxAttributeValue: 4, maxSkillMasteryTier: 2, maxTradeMasteryTier: 2 },
	{ level: 8, maxAttributeValue: 4, maxSkillMasteryTier: 2, maxTradeMasteryTier: 2 },
	{ level: 9, maxAttributeValue: 4, maxSkillMasteryTier: 2, maxTradeMasteryTier: 2 },

	// Levels 10-14: Expert tier, Attribute +5
	{ level: 10, maxAttributeValue: 5, maxSkillMasteryTier: 3, maxTradeMasteryTier: 3 },
	{ level: 11, maxAttributeValue: 5, maxSkillMasteryTier: 3, maxTradeMasteryTier: 3 },
	{ level: 12, maxAttributeValue: 5, maxSkillMasteryTier: 3, maxTradeMasteryTier: 3 },
	{ level: 13, maxAttributeValue: 5, maxSkillMasteryTier: 3, maxTradeMasteryTier: 3 },
	{ level: 14, maxAttributeValue: 5, maxSkillMasteryTier: 3, maxTradeMasteryTier: 3 },

	// Levels 15-19: Master tier, Attribute +6
	{ level: 15, maxAttributeValue: 6, maxSkillMasteryTier: 4, maxTradeMasteryTier: 4 },
	{ level: 16, maxAttributeValue: 6, maxSkillMasteryTier: 4, maxTradeMasteryTier: 4 },
	{ level: 17, maxAttributeValue: 6, maxSkillMasteryTier: 4, maxTradeMasteryTier: 4 },
	{ level: 18, maxAttributeValue: 6, maxSkillMasteryTier: 4, maxTradeMasteryTier: 4 },
	{ level: 19, maxAttributeValue: 6, maxSkillMasteryTier: 4, maxTradeMasteryTier: 4 },

	// Level 20: Grandmaster tier, Attribute +7
	{ level: 20, maxAttributeValue: 7, maxSkillMasteryTier: 5, maxTradeMasteryTier: 5 }
];

/**
 * Get level caps for a specific character level
 * Returns level 20 caps for any level > 20
 * Returns level 1 caps for any level < 1
 */
export function getLevelCaps(level: number): LevelCaps {
	const clampedLevel = Math.min(Math.max(level, 1), 20);
	return LEVEL_CAPS_TABLE[clampedLevel - 1]; // Array is 0-indexed, levels are 1-indexed
}

/**
 * Get mastery tier definition by tier number
 * Returns Untrained (tier 0) if tier is out of bounds
 */
export function getMasteryTierByNumber(tier: number): MasteryTierDefinition {
	return MASTERY_TIERS[tier] || MASTERY_TIERS[0];
}

/**
 * Get mastery tier definition by name
 * Returns undefined if name doesn't match any tier
 */
export function getMasteryTierByName(name: string): MasteryTierDefinition | undefined {
	return MASTERY_TIERS.find((t) => t.name === name);
}
