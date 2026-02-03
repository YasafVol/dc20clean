/**
 * Monster Importer
 *
 * Transforms raw seed data JSON into SavedMonster format.
 * Handles field mapping, ID normalization, and stat calculation.
 *
 * Supports two formats:
 * 1. Legacy format: actionType, damageType, range as separate fields
 * 2. Bestiary format: ap cost, explicit stats object, traits contain damage type info
 */

import { generateContentId } from '../utils/idGenerator';
import { calculateMonsterStats } from './monsterCalculator';
import { getOfficialFeatureByName } from '../rulesdata/dm/monsterFeatures';
import {
	MONSTER_SCHEMA_VERSION,
	MONSTER_ROLE_IDS,
	ACTION_TYPES,
	TARGET_DEFENSES,
	MONSTER_SIZES,
	MONSTER_TYPES,
	MONSTER_ALIGNMENTS,
	type SavedMonster,
	type MonsterAction,
	type MonsterRoleId,
	type MonsterTier,
	type ActionType,
	type TargetDefense,
	type MonsterSize,
	type MonsterType,
	type MonsterAlignment,
} from '../rulesdata/schemas/monster.schema';

// ============================================================================
// RAW SEED DATA TYPES
// ============================================================================

/** Explicit stats from Bestiary (optional - overrides calculated) */
export interface RawSeedStats {
	hp: number;
	pd: number;
	ad: number;
	attack: number;
	saveDC: number;
}

/** Raw action format from seed JSON (supports both legacy and Bestiary formats) */
export interface RawSeedAction {
	id?: string; // Optional - auto-generated if missing
	name: string;
	actionType?: string; // "Attack" | "Spell" | "Special" (optional - inferred from targetDefense)
	ap?: number; // Bestiary format: AP cost (1-4)
	apCost?: number; // Legacy format alias
	targetDefense?: string; // "PD" | "AD" | "None"
	damage?: number; // Optional for utility actions
	damageType?: string; // Optional - can be inferred from traits
	range?: number; // Optional - can be in traits like "10 Space Line"
	traits?: string[];
	description?: string; // Optional
}

/** Raw feature format from seed JSON */
export interface RawSeedFeature {
	name: string;
	description: string;
}

/** Raw monster format from seed JSON (supports both legacy and Bestiary formats) */
export interface RawSeedMonster {
	id?: string; // Optional - auto-generated if missing
	name: string;
	level: number;
	tier: string;
	role: string;
	size?: string;
	type?: string; // Monster type (Beast, Undead, etc.)
	alignment?: string;
	description?: string;
	stats?: RawSeedStats; // Bestiary format: explicit stats override
	actions: RawSeedAction[];
	features?: RawSeedFeature[];
	lore?: string;
	tactics?: string;
}

/** Import result with validation info */
export interface MonsterImportResult {
	success: boolean;
	monster?: SavedMonster;
	warnings: string[];
	errors: string[];
}

// ============================================================================
// MAPPING FUNCTIONS
// ============================================================================

/**
 * Map raw action type to schema action type
 * If no actionType provided, infers from targetDefense:
 * - PD typically = martial attacks
 * - AD typically = special/area abilities
 */
function mapActionType(rawType?: string, targetDefense?: string): ActionType {
	if (rawType) {
		const normalized = rawType.toLowerCase();
		if (normalized === 'attack' || normalized === 'martial') return 'martial';
		if (normalized === 'spell') return 'spell';
		if (normalized === 'special') return 'special';
	}
	// Infer from targetDefense if actionType not provided
	if (targetDefense) {
		const defense = targetDefense.toUpperCase();
		if (defense === 'PD' || defense === 'PHYSICAL') return 'martial';
		if (defense === 'AD' || defense === 'ARCANE') return 'special';
	}
	return 'special'; // Default for utility actions
}

/**
 * Map raw target defense to schema format
 */
function mapTargetDefense(rawDefense: string): TargetDefense {
	const normalized = rawDefense.toUpperCase();
	if (normalized === 'PD' || normalized === 'PHYSICAL') return 'pd';
	if (normalized === 'AD' || normalized === 'ARCANE' || normalized === 'AREA') return 'ad';
	return 'pd'; // Default to PD
}

/**
 * Map raw role to schema role ID
 */
function mapRoleId(rawRole: string): MonsterRoleId | null {
	const normalized = rawRole.toLowerCase();
	if (MONSTER_ROLE_IDS.includes(normalized as MonsterRoleId)) {
		return normalized as MonsterRoleId;
	}
	// Handle common variations
	const roleMap: Record<string, MonsterRoleId> = {
		striker: 'skirmisher',
		caster: 'artillerist',
		tank: 'defender',
		healer: 'support',
		solo: 'brute', // Solo bosses often act as brutes
	};
	return roleMap[normalized] ?? null;
}

/**
 * Map raw tier to schema tier
 */
function mapTier(rawTier: string): MonsterTier {
	const normalized = rawTier.toLowerCase();
	if (normalized === 'standard' || normalized === 'minion') return 'standard';
	if (normalized === 'apex' || normalized === 'elite') return 'apex';
	if (normalized === 'legendary' || normalized === 'boss' || normalized === 'solo') return 'legendary';
	return 'standard';
}

/**
 * Map raw size to schema size
 */
function mapSize(rawSize?: string): MonsterSize | undefined {
	if (!rawSize) return undefined;
	const normalized = rawSize.charAt(0).toUpperCase() + rawSize.slice(1).toLowerCase();
	if (MONSTER_SIZES.includes(normalized as MonsterSize)) {
		return normalized as MonsterSize;
	}
	return undefined;
}

/**
 * Map raw type to schema monster type
 */
function mapMonsterType(rawType?: string): MonsterType | undefined {
	if (!rawType) return undefined;
	const normalized = rawType.charAt(0).toUpperCase() + rawType.slice(1).toLowerCase();
	if (MONSTER_TYPES.includes(normalized as MonsterType)) {
		return normalized as MonsterType;
	}
	return undefined;
}

/**
 * Map raw alignment to schema alignment
 */
function mapAlignment(rawAlignment?: string): MonsterAlignment | undefined {
	if (!rawAlignment) return undefined;
	// Try exact match first
	if (MONSTER_ALIGNMENTS.includes(rawAlignment as MonsterAlignment)) {
		return rawAlignment as MonsterAlignment;
	}
	// Try normalized match
	const normalized = rawAlignment
		.split(' ')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
		.join(' ');
	if (MONSTER_ALIGNMENTS.includes(normalized as MonsterAlignment)) {
		return normalized as MonsterAlignment;
	}
	return undefined;
}

/**
 * Normalize action ID to schema format
 */
function normalizeActionId(rawId?: string): string {
	if (rawId && rawId.startsWith('act_')) {
		// Ensure it's a valid format (at least 8 chars after prefix)
		const uuidPart = rawId.slice(4);
		if (uuidPart.length >= 8) return rawId;
	}
	// Generate new ID if missing or invalid
	return generateContentId('action');
}

/**
 * Normalize monster ID to schema format
 */
function normalizeMonsterId(rawId?: string): string {
	if (rawId && rawId.startsWith('mon_')) {
		const uuidPart = rawId.slice(4);
		// Accept any reasonable ID format (Bestiary uses mon_v2_name_001 style)
		if (uuidPart.length >= 4) return rawId;
	}
	// Generate new ID if missing or invalid
	return generateContentId('monster');
}

// ============================================================================
// IMPORT FUNCTION
// ============================================================================

/**
 * Import a raw seed monster into SavedMonster format
 * Supports both legacy format and Bestiary format with explicit stats
 */
export function importRawMonster(raw: RawSeedMonster): MonsterImportResult {
	const warnings: string[] = [];
	const errors: string[] = [];

	// Validate required fields
	if (!raw.name) {
		errors.push('Monster name is required');
	}
	if (raw.level === undefined || raw.level === null) {
		errors.push('Monster level is required');
	}
	if (!raw.role) {
		errors.push('Monster role is required');
	}
	if (!raw.actions || raw.actions.length === 0) {
		errors.push('At least one action is required');
	}

	// Map role
	const roleId = mapRoleId(raw.role);
	if (!roleId) {
		errors.push(`Unknown role: "${raw.role}". Valid roles: ${MONSTER_ROLE_IDS.join(', ')}`);
	}

	// Return early if critical errors
	if (errors.length > 0) {
		return { success: false, warnings, errors };
	}

	// Map tier
	const tier = mapTier(raw.tier);
	if (raw.tier && tier !== raw.tier.toLowerCase()) {
		warnings.push(`Tier "${raw.tier}" mapped to "${tier}"`);
	}

	// Map actions (supports both legacy and Bestiary formats)
	const actions: MonsterAction[] = raw.actions.map((rawAction, index) => {
		// Infer action type from actionType field or targetDefense
		const actionType = mapActionType(rawAction.actionType, rawAction.targetDefense);

		// Map target defense (default to 'pd' if not specified)
		const targetDefense = rawAction.targetDefense
			? mapTargetDefense(rawAction.targetDefense)
			: 'pd';

		// Get AP cost: prefer 'ap' (Bestiary), fall back to 'apCost' (legacy), default to 2
		const apCost = rawAction.ap ?? rawAction.apCost ?? 2;

		// Infer damage type from traits if not explicitly provided
		let damageType = rawAction.damageType;
		if (!damageType && rawAction.traits) {
			// Common damage types that might appear in traits
			const damageTypes = ['Fire', 'Cold', 'Lightning', 'Poison', 'Necrotic', 'Radiant', 'Psychic', 'Physical', 'Umbral', 'Corrosion'];
			for (const trait of rawAction.traits) {
				const found = damageTypes.find((dt) => trait.toLowerCase().includes(dt.toLowerCase()));
				if (found) {
					damageType = found;
					break;
				}
			}
		}

		return {
			id: normalizeActionId(rawAction.id),
			name: rawAction.name,
			apCost,
			type: actionType,
			targetDefense,
			damage: rawAction.damage ?? 0,
			damageType,
			range: rawAction.range,
			description: rawAction.description ?? '',
		};
	});

	// Map features to feature IDs
	const featureIds: string[] = [];
	if (raw.features) {
		for (const rawFeature of raw.features) {
			const officialFeature = getOfficialFeatureByName(rawFeature.name);
			if (officialFeature) {
				featureIds.push(officialFeature.id);
			} else {
				warnings.push(`Feature "${rawFeature.name}" not found in official features. Custom feature needed.`);
			}
		}
	}

	// Calculate stats (used for breakdowns and as fallback)
	const calculatedStats = calculateMonsterStats({
		level: raw.level,
		tier,
		roleId: roleId!,
	});

	// Use explicit stats from Bestiary if provided, otherwise use calculated
	const hasExplicitStats = raw.stats && typeof raw.stats.hp === 'number';
	if (hasExplicitStats) {
		warnings.push('Using explicit Bestiary stats (overriding calculated values)');
	}

	const finalHP = hasExplicitStats ? raw.stats!.hp : calculatedStats.finalHP;
	const finalPD = hasExplicitStats ? raw.stats!.pd : calculatedStats.finalPD;
	const finalAD = hasExplicitStats ? raw.stats!.ad : calculatedStats.finalAD;
	const finalAttack = hasExplicitStats ? raw.stats!.attack : calculatedStats.finalAttack;
	const finalSaveDC = hasExplicitStats ? raw.stats!.saveDC : calculatedStats.finalSaveDC;

	// Build SavedMonster
	const now = new Date().toISOString();
	const monster: SavedMonster = {
		// Identity
		id: normalizeMonsterId(raw.id),
		name: raw.name,
		description: raw.description,
		level: raw.level,
		tier,
		roleId: roleId!,

		// Flavor
		size: mapSize(raw.size),
		monsterType: mapMonsterType(raw.type),
		alignment: mapAlignment(raw.alignment),
		lore: raw.lore,
		tactics: raw.tactics,

		// Stats (explicit from Bestiary or calculated)
		finalHP,
		finalPD,
		finalAD,
		finalAttack,
		finalSaveDC,
		finalBaseDamage: calculatedStats.finalBaseDamage,

		// Attributes (default values)
		attributes: {
			might: 0,
			agility: 0,
			charisma: 0,
			intelligence: 0,
		},

		// Features
		featureIds,
		featurePointsSpent: featureIds.length,
		featurePointsMax: calculatedStats.featurePointsMax,

		// Actions
		actions,

		// Sharing
		visibility: 'private',
		approvalStatus: 'draft',
		isHomebrew: false,

		// Metadata
		createdAt: now,
		lastModified: now,
		schemaVersion: MONSTER_SCHEMA_VERSION,

		// Breakdowns (always from calculator for reference)
		breakdowns: calculatedStats.breakdowns,
	};

	return {
		success: true,
		monster,
		warnings,
		errors,
	};
}

/**
 * Import multiple raw monsters from seed JSON
 */
export function importRawMonsters(rawMonsters: RawSeedMonster[]): {
	successful: SavedMonster[];
	failed: Array<{ name: string; errors: string[] }>;
	allWarnings: Array<{ name: string; warnings: string[] }>;
} {
	const successful: SavedMonster[] = [];
	const failed: Array<{ name: string; errors: string[] }> = [];
	const allWarnings: Array<{ name: string; warnings: string[] }> = [];

	for (const raw of rawMonsters) {
		const result = importRawMonster(raw);

		if (result.success && result.monster) {
			successful.push(result.monster);
		} else {
			failed.push({ name: raw.name || 'Unknown', errors: result.errors });
		}

		if (result.warnings.length > 0) {
			allWarnings.push({ name: raw.name || 'Unknown', warnings: result.warnings });
		}
	}

	return { successful, failed, allWarnings };
}

/**
 * Parse and import from JSON string
 */
export function importMonstersFromJson(jsonString: string): ReturnType<typeof importRawMonsters> & {
	parseError?: string;
} {
	try {
		const data = JSON.parse(jsonString);
		const monsters = Array.isArray(data) ? data : data.monsters;

		if (!Array.isArray(monsters)) {
			return {
				successful: [],
				failed: [],
				allWarnings: [],
				parseError: 'JSON must contain a "monsters" array or be an array of monsters',
			};
		}

		return importRawMonsters(monsters);
	} catch (e) {
		return {
			successful: [],
			failed: [],
			allWarnings: [],
			parseError: `Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`,
		};
	}
}
