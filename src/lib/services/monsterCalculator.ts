/**
 * Monster Calculator
 *
 * Calculates monster statistics based on level, role, and tier.
 * Follows the calculation order from MONSTER_SYSTEM_SPEC.MD:
 *
 * 1. Lookup base stats for level
 * 2. Apply role HP modifier (multiply)
 * 3. Apply tier HP multiplier (multiply)
 * 4. Round HP to nearest integer
 * 5. Apply role PD/AD offsets (add)
 * 6. Copy Attack, Save DC, Base Damage from table
 * 7. Calculate Feature Power budget from table
 * 8. Calculate Encounter Cost = Level × Tier Multiplier
 */

import { getBaseStatsForLevel } from '../rulesdata/dm/monsterStatistics';
import { getMonsterRole, getRoleHPMultiplier } from '../rulesdata/dm/monsterRoles';
import { validateFeatureBudget as validateFeatureBudgetFromFeatures } from '../rulesdata/dm/monsterFeatures';
import { generateContentId } from '../utils/idGenerator';
import {
	TIER_HP_MULTIPLIERS,
	TIER_COST_MULTIPLIERS,
	MONSTER_SCHEMA_VERSION,
	type MonsterTier,
	type MonsterRoleId,
	type MonsterAction,
	type SavedMonster,
	type StatBreakdown,
	type MonsterFeature,
} from '../rulesdata/schemas/monster.schema';

// ============================================================================
// INPUT/OUTPUT TYPES
// ============================================================================

/**
 * Input for monster stat calculation
 */
export interface MonsterCalculationInput {
	level: number;
	tier: MonsterTier;
	roleId: MonsterRoleId;
}

/**
 * Result of monster stat calculation
 */
export interface MonsterCalculationResult {
	// Calculated Stats
	finalHP: number;
	finalPD: number;
	finalAD: number;
	finalAttack: number;
	finalSaveDC: number;
	finalBaseDamage: number;

	// Budget
	featurePointsMax: number;
	encounterCost: number;

	// Breakdowns for UI
	breakdowns: {
		hp: StatBreakdown;
		pd: StatBreakdown;
		ad: StatBreakdown;
	};
}

/**
 * Action validation message
 */
export interface ActionValidationMessage {
	actionId?: string;
	message: string;
}

/**
 * Result of action validation
 */
export interface ActionValidationResult {
	valid: boolean;
	errors: ActionValidationMessage[];
	warnings: ActionValidationMessage[];
	infos: ActionValidationMessage[];
}

/**
 * Result of feature budget validation
 */
export interface FeatureBudgetValidationResult {
	valid: boolean;
	spent: number;
	remaining: number;
	overBy: number;
}

// ============================================================================
// MAIN CALCULATOR
// ============================================================================

/**
 * Calculates monster statistics based on level, role, and tier
 *
 * @param input - The monster's level, tier, and role
 * @returns Calculated stats with breakdowns
 *
 * @example
 * const result = calculateMonsterStats({
 *   level: 4,
 *   tier: 'apex',
 *   roleId: 'brute'
 * });
 * // result.finalHP = 45 (18 base × 1.25 role × 2 tier)
 */
export function calculateMonsterStats(input: MonsterCalculationInput): MonsterCalculationResult {
	const { level, tier, roleId } = input;

	// Step 1: Lookup base stats for level
	const baseStats = getBaseStatsForLevel(level);
	const role = getMonsterRole(roleId);

	// Step 2: Apply role HP modifier (multiply)
	const roleHPMultiplier = getRoleHPMultiplier(role);
	const hpAfterRole = baseStats.hp * roleHPMultiplier;

	// Step 3: Apply tier HP multiplier (multiply)
	const tierHPMultiplier = TIER_HP_MULTIPLIERS[tier];
	const hpAfterTier = hpAfterRole * tierHPMultiplier;

	// Step 4: Round HP to nearest integer
	const finalHP = Math.round(hpAfterTier);

	// Step 5: Apply role PD/AD offsets (add)
	const finalPD = baseStats.pd + role.pdOffset;
	const finalAD = baseStats.ad + role.adOffset;

	// Step 6: Copy Attack, Save DC, Base Damage from table (no modifiers)
	const finalAttack = baseStats.attack;
	const finalSaveDC = baseStats.saveDC;
	const finalBaseDamage = baseStats.baseDamage;

	// Step 7: Calculate Feature Power budget from table
	const featurePointsMax = baseStats.featurePower;

	// Step 8: Calculate Encounter Cost = Level × Tier Multiplier
	const tierCostMultiplier = TIER_COST_MULTIPLIERS[tier];
	const encounterCost = level * tierCostMultiplier;

	// Build breakdowns for UI
	const breakdowns = buildBreakdowns(baseStats, role, tier, finalHP, finalPD, finalAD);

	return {
		finalHP,
		finalPD,
		finalAD,
		finalAttack,
		finalSaveDC,
		finalBaseDamage,
		featurePointsMax,
		encounterCost,
		breakdowns,
	};
}

/**
 * Builds stat breakdowns for the UI
 */
function buildBreakdowns(
	baseStats: ReturnType<typeof getBaseStatsForLevel>,
	role: ReturnType<typeof getMonsterRole>,
	tier: MonsterTier,
	finalHP: number,
	finalPD: number,
	finalAD: number
): MonsterCalculationResult['breakdowns'] {
	const roleHPMultiplier = getRoleHPMultiplier(role);
	const tierHPMultiplier = TIER_HP_MULTIPLIERS[tier];
	const roleName = `${role.name} role`;
	const tierName = `${tier.charAt(0).toUpperCase() + tier.slice(1)} tier`;

	// HP breakdown
	const hpModifiers: StatBreakdown['modifiers'] = [];

	if (role.hpModifier !== 0) {
		const roleHPChange = baseStats.hp * (roleHPMultiplier - 1);
		hpModifiers.push({
			source: roleName,
			value: roleHPChange,
		});
	}

	if (tierHPMultiplier !== 1) {
		const hpAfterRole = baseStats.hp * roleHPMultiplier;
		const tierHPChange = hpAfterRole * (tierHPMultiplier - 1);
		hpModifiers.push({
			source: tierName,
			value: tierHPChange,
		});
	}

	// PD breakdown
	const pdModifiers: StatBreakdown['modifiers'] = [];
	if (role.pdOffset !== 0) {
		pdModifiers.push({
			source: roleName,
			value: role.pdOffset,
		});
	}

	// AD breakdown
	const adModifiers: StatBreakdown['modifiers'] = [];
	if (role.adOffset !== 0) {
		adModifiers.push({
			source: roleName,
			value: role.adOffset,
		});
	}

	return {
		hp: {
			base: baseStats.hp,
			modifiers: hpModifiers,
			total: finalHP,
		},
		pd: {
			base: baseStats.pd,
			modifiers: pdModifiers,
			total: finalPD,
		},
		ad: {
			base: baseStats.ad,
			modifiers: adModifiers,
			total: finalAD,
		},
	};
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates monster actions
 *
 * @param actions - Array of monster actions
 * @param baseDamage - Base damage from monster stats (for damage warnings)
 * @returns Validation result with errors, warnings, and infos
 *
 * @example
 * const result = validateMonsterActions(monster.actions, monster.finalBaseDamage);
 * if (!result.valid) {
 *   console.error(result.errors);
 * }
 */
export function validateMonsterActions(
	actions: MonsterAction[],
	baseDamage: number
): ActionValidationResult {
	const errors: ActionValidationMessage[] = [];
	const warnings: ActionValidationMessage[] = [];
	const infos: ActionValidationMessage[] = [];

	// Validate at least one action
	if (actions.length === 0) {
		errors.push({
			message: 'At least one action is required',
		});
		return { valid: false, errors, warnings, infos };
	}

	// Validate each action
	for (const action of actions) {
		// Name validation
		if (!action.name || action.name.length === 0) {
			errors.push({
				actionId: action.id,
				message: 'Action name is required',
			});
		} else if (action.name.length > 50) {
			errors.push({
				actionId: action.id,
				message: 'Action name must be 50 characters or less',
			});
		}

		// AP cost validation
		if (action.apCost < 1 || action.apCost > 4) {
			errors.push({
				actionId: action.id,
				message: `AP cost must be between 1 and 4 (got ${action.apCost})`,
			});
		}

		// Damage warnings (not errors)
		const maxRecommendedDamage = baseDamage * 1.5;
		const minRecommendedDamage = baseDamage * 0.5;

		if (action.damage > maxRecommendedDamage) {
			warnings.push({
				actionId: action.id,
				message: `Damage (${action.damage}) exceeds recommended maximum (${maxRecommendedDamage.toFixed(1)})`,
			});
		} else if (action.damage < minRecommendedDamage) {
			infos.push({
				actionId: action.id,
				message: `Damage (${action.damage}) is below recommended minimum (${minRecommendedDamage.toFixed(1)})`,
			});
		}
	}

	return {
		valid: errors.length === 0,
		errors,
		warnings,
		infos,
	};
}

/**
 * Validates feature budget
 *
 * @param featureIds - Array of feature IDs
 * @param maxPoints - Maximum points allowed
 * @param customFeatures - Optional map of custom features
 * @returns Validation result
 */
export function validateFeatureBudget(
	featureIds: string[],
	maxPoints: number,
	customFeatures?: Map<string, MonsterFeature>
): FeatureBudgetValidationResult {
	return validateFeatureBudgetFromFeatures(featureIds, maxPoints, customFeatures);
}

// ============================================================================
// DEFAULT MONSTER FACTORY
// ============================================================================

/**
 * Default monster values for partial overrides
 */
interface DefaultMonsterOverrides {
	name?: string;
	description?: string;
	level?: number;
	tier?: MonsterTier;
	roleId?: MonsterRoleId;
}

/**
 * Creates a new monster with default values and calculated stats
 *
 * @param overrides - Optional values to override defaults
 * @returns A complete SavedMonster object
 *
 * @example
 * const goblin = createDefaultMonster({
 *   name: 'Goblin',
 *   level: 1,
 *   roleId: 'lurker'
 * });
 */
export function createDefaultMonster(overrides?: DefaultMonsterOverrides): SavedMonster {
	const level = overrides?.level ?? 1;
	const tier = overrides?.tier ?? 'standard';
	const roleId = overrides?.roleId ?? 'controller';

	// Calculate stats
	const stats = calculateMonsterStats({ level, tier, roleId });

	// Create default action
	const defaultAction: MonsterAction = {
		id: generateContentId('action'),
		name: 'Basic Attack',
		apCost: 1,
		type: 'martial',
		targetDefense: 'pd',
		damage: stats.finalBaseDamage,
		description: 'A basic melee attack.',
	};

	const now = new Date().toISOString();

	return {
		// Identity
		id: generateContentId('monster'),
		name: overrides?.name ?? 'New Monster',
		description: overrides?.description,
		level,
		tier,
		roleId,

		// Calculated Stats
		finalHP: stats.finalHP,
		finalPD: stats.finalPD,
		finalAD: stats.finalAD,
		finalAttack: stats.finalAttack,
		finalSaveDC: stats.finalSaveDC,
		finalBaseDamage: stats.finalBaseDamage,

		// Attributes (default balanced)
		attributes: {
			might: 0,
			agility: 0,
			charisma: 0,
			intelligence: 0,
		},

		// Features
		featureIds: [],
		featurePointsSpent: 0,
		featurePointsMax: stats.featurePointsMax,

		// Actions
		actions: [defaultAction],

		// Sharing
		visibility: 'private',
		approvalStatus: 'draft',
		isHomebrew: false,

		// Metadata
		createdAt: now,
		lastModified: now,
		schemaVersion: MONSTER_SCHEMA_VERSION,

		// Breakdowns
		breakdowns: stats.breakdowns,
	};
}

/**
 * Recalculates monster stats after level/tier/role changes
 *
 * @param monster - The monster to recalculate
 * @returns Updated monster with new stats
 */
export function recalculateMonsterStats(monster: SavedMonster): SavedMonster {
	const stats = calculateMonsterStats({
		level: monster.level,
		tier: monster.tier,
		roleId: monster.roleId,
	});

	return {
		...monster,
		finalHP: stats.finalHP,
		finalPD: stats.finalPD,
		finalAD: stats.finalAD,
		finalAttack: stats.finalAttack,
		finalSaveDC: stats.finalSaveDC,
		finalBaseDamage: stats.finalBaseDamage,
		featurePointsMax: stats.featurePointsMax,
		breakdowns: stats.breakdowns,
		lastModified: new Date().toISOString(),
	};
}
