/**
 * DM Tools Data Module
 *
 * Exports all monster-related data and utilities for the DM Tools system.
 */

// Monster Statistics Table
export {
	MONSTER_STATISTICS_TABLE,
	MONSTER_LEVEL_MIN,
	MONSTER_LEVEL_MAX,
	getBaseStatsForLevel,
	getLevelDisplayName,
	isValidMonsterLevel,
	getAllMonsterLevels,
	type MonsterBaseStats
} from './monsterStatistics';

// Monster Roles
export {
	MONSTER_ROLES,
	MONSTER_ROLES_LIST,
	getMonsterRole,
	isValidMonsterRoleId,
	getAllMonsterRoleIds,
	getRoleHPMultiplier
} from './monsterRoles';

// Monster Features
export {
	OFFICIAL_MONSTER_FEATURES,
	OFFICIAL_FEATURES_BY_ID,
	FEATURES_BY_COST,
	getOfficialFeature,
	getFeaturesByCost,
	calculateFeaturePointCost,
	validateFeatureBudget,
	isOfficialFeature
} from './monsterFeatures';
