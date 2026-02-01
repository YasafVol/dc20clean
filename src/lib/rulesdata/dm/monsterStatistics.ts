/**
 * Monster Statistics Table
 *
 * Source of truth for base monster stats by level.
 * From Bestiary Vol 2, p. 4
 *
 * All monster calculations start from these base values,
 * then apply role modifiers and tier multipliers.
 */

/**
 * Base statistics for a monster at a given level
 */
export interface MonsterBaseStats {
	level: number;
	levelName?: string; // Display name (e.g., "Novice" for level -1)
	hp: number; // Base Hit Points
	pd: number; // Base Physical Defense
	ad: number; // Base Arcane Defense
	baseDamage: number; // Base damage per hit
	attack: number; // Attack bonus
	saveDC: number; // Save DC for abilities
	featurePower: number; // Feature Power budget
}

/**
 * Monster Statistics Table from Bestiary Vol 2, p. 4
 *
 * Level -1 is "Novice" tier for very weak creatures.
 * Levels 0-10 are standard progression.
 */
export const MONSTER_STATISTICS_TABLE: readonly MonsterBaseStats[] = [
	{ level: -1, levelName: 'Novice', hp: 5, pd: 10, ad: 10, baseDamage: 1, attack: 2, saveDC: 12, featurePower: 0 },
	{ level: 0, hp: 8, pd: 11, ad: 11, baseDamage: 1, attack: 3, saveDC: 13, featurePower: 1 },
	{ level: 1, hp: 10, pd: 12, ad: 12, baseDamage: 1.5, attack: 4, saveDC: 14, featurePower: 1 },
	{ level: 2, hp: 13, pd: 12, ad: 12, baseDamage: 2, attack: 4, saveDC: 14, featurePower: 2 },
	{ level: 3, hp: 15, pd: 13, ad: 13, baseDamage: 3, attack: 5, saveDC: 15, featurePower: 2 },
	{ level: 4, hp: 18, pd: 13, ad: 13, baseDamage: 3.5, attack: 5, saveDC: 15, featurePower: 3 },
	{ level: 5, hp: 21, pd: 15, ad: 15, baseDamage: 4.5, attack: 7, saveDC: 17, featurePower: 3 },
	{ level: 6, hp: 23, pd: 15, ad: 15, baseDamage: 5, attack: 7, saveDC: 17, featurePower: 4 },
	{ level: 7, hp: 25, pd: 16, ad: 16, baseDamage: 5.5, attack: 8, saveDC: 18, featurePower: 4 },
	{ level: 8, hp: 27, pd: 16, ad: 16, baseDamage: 6.5, attack: 8, saveDC: 18, featurePower: 4 },
	{ level: 9, hp: 29, pd: 17, ad: 17, baseDamage: 7, attack: 9, saveDC: 19, featurePower: 5 },
	{ level: 10, hp: 31, pd: 18, ad: 18, baseDamage: 8, attack: 10, saveDC: 20, featurePower: 6 },
] as const;

/**
 * Valid monster level range
 */
export const MONSTER_LEVEL_MIN = -1;
export const MONSTER_LEVEL_MAX = 10;

/**
 * Gets base stats for a monster level
 *
 * @param level - Monster level (-1 to 10)
 * @returns Base statistics for that level
 * @throws Error if level is out of range
 *
 * @example
 * getBaseStatsForLevel(4)
 * // { level: 4, hp: 18, pd: 13, ad: 13, baseDamage: 3.5, attack: 5, saveDC: 15, featurePower: 3 }
 */
export function getBaseStatsForLevel(level: number): MonsterBaseStats {
	if (level < MONSTER_LEVEL_MIN || level > MONSTER_LEVEL_MAX) {
		throw new Error(
			`Invalid monster level: ${level}. Must be between ${MONSTER_LEVEL_MIN} (Novice) and ${MONSTER_LEVEL_MAX}.`
		);
	}

	// Level -1 is at index 0, level 0 is at index 1, etc.
	const index = level + 1;
	const stats = MONSTER_STATISTICS_TABLE[index];

	if (!stats) {
		throw new Error(`No stats found for level ${level}`);
	}

	return { ...stats };
}

/**
 * Gets the level name/display text
 *
 * @param level - Monster level
 * @returns Display name (e.g., "Novice" for -1, "Level 4" for 4)
 */
export function getLevelDisplayName(level: number): string {
	const stats = getBaseStatsForLevel(level);
	return stats.levelName ?? `Level ${level}`;
}

/**
 * Checks if a level is valid for monsters
 *
 * @param level - Level to check
 * @returns true if valid monster level
 */
export function isValidMonsterLevel(level: number): boolean {
	return Number.isInteger(level) && level >= MONSTER_LEVEL_MIN && level <= MONSTER_LEVEL_MAX;
}

/**
 * Gets all valid monster levels
 *
 * @returns Array of valid levels from -1 to 10
 */
export function getAllMonsterLevels(): number[] {
	return MONSTER_STATISTICS_TABLE.map((s) => s.level);
}
