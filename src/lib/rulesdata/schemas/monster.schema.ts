import { z } from 'zod';

// ============================================================================
// CONTENT ID PREFIXES
// ============================================================================

export const CONTENT_ID_PREFIXES = {
	monster: 'mon_',
	feature: 'feat_',
	action: 'act_',
	encounter: 'enc_',
	slot: 'slot_',
} as const;

export type ContentIdPrefix = (typeof CONTENT_ID_PREFIXES)[keyof typeof CONTENT_ID_PREFIXES];
export type ContentIdType = keyof typeof CONTENT_ID_PREFIXES;

// ============================================================================
// MONSTER TIER
// ============================================================================

export const MONSTER_TIERS = ['standard', 'apex', 'legendary'] as const;
export type MonsterTier = (typeof MONSTER_TIERS)[number];

export const monsterTierSchema = z.enum(MONSTER_TIERS);

export const TIER_HP_MULTIPLIERS: Record<MonsterTier, number> = {
	standard: 1,
	apex: 2,
	legendary: 4,
};

export const TIER_COST_MULTIPLIERS: Record<MonsterTier, number> = {
	standard: 1,
	apex: 2,
	legendary: 4,
};

export const TIER_INITIATIVE_ENTRIES: Record<MonsterTier, number> = {
	standard: 1,
	apex: 2,
	legendary: 1, // + Legendary AP
};

// ============================================================================
// MONSTER ROLE
// ============================================================================

export const MONSTER_ROLE_IDS = [
	'artillerist',
	'brute',
	'controller',
	'defender',
	'leader',
	'lurker',
	'skirmisher',
	'support',
] as const;

export type MonsterRoleId = (typeof MONSTER_ROLE_IDS)[number];

export const monsterRoleIdSchema = z.enum(MONSTER_ROLE_IDS);

export interface MonsterRole {
	id: MonsterRoleId;
	name: string;
	hpModifier: number; // Percentage modifier (e.g., 0.25 = +25%, -0.10 = -10%)
	pdOffset: number; // Additive offset to Physical Defense
	adOffset: number; // Additive offset to Arcane Defense
	primaryAttributes: string[]; // Recommended attributes (flavor/roleplay)
	description: string;
}

export const monsterRoleSchema = z.object({
	id: monsterRoleIdSchema,
	name: z.string(),
	hpModifier: z.number(),
	pdOffset: z.number(),
	adOffset: z.number(),
	primaryAttributes: z.array(z.string()),
	description: z.string(),
});

// ============================================================================
// MONSTER ACTION
// ============================================================================

export const ACTION_TYPES = ['martial', 'spell', 'special'] as const;
export type ActionType = (typeof ACTION_TYPES)[number];

export const TARGET_DEFENSES = ['pd', 'ad'] as const;
export type TargetDefense = (typeof TARGET_DEFENSES)[number];

// Common action traits
export const ACTION_TRAITS = [
	'Brutal',
	'Deadly',
	'Finesse',
	'Heavy',
	'Light',
	'Reach',
	'Thrown',
	'Versatile',
	'Ammo',
	'Loading',
	'Two-Handed',
	'Grappling',
	'Knockback',
	'Piercing',
	'Cleave',
	'Stun',
	'Bleed',
	'Poison',
	'Fire',
	'Cold',
	'Lightning',
	'Necrotic',
	'Radiant',
	'Psychic',
] as const;
export type ActionTrait = (typeof ACTION_TRAITS)[number];

export interface MonsterAction {
	id: string; // act_<uuid>
	name: string;
	apCost: number; // 1-4
	type: ActionType;
	targetDefense: TargetDefense;
	damage: number;
	damageType?: string; // slashing, fire, etc.
	range?: number; // spaces
	area?: string; // cone, sphere, etc.
	traits?: ActionTrait[]; // action traits/properties
	description: string;
}

export const monsterActionSchema = z.object({
	id: z.string().regex(/^act_[a-f0-9-]+$/, 'Action ID must be in format act_<uuid>'),
	name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
	apCost: z.number().int().min(1, 'AP cost must be at least 1').max(4, 'AP cost must be at most 4'),
	type: z.enum(ACTION_TYPES),
	targetDefense: z.enum(TARGET_DEFENSES),
	damage: z.number().min(0, 'Damage cannot be negative'),
	damageType: z.string().optional(),
	range: z.number().int().min(0).optional(),
	area: z.string().optional(),
	traits: z.array(z.enum(ACTION_TRAITS)).optional(),
	description: z.string(),
});

// ============================================================================
// MONSTER FEATURE
// ============================================================================

export interface MonsterFeature {
	id: string; // feat_<uuid>
	name: string;
	description: string;
	pointCost: number; // 1-5
	isOfficial: boolean; // true = seed data, false = custom
	effects?: MonsterFeatureEffect[];
}

export interface MonsterFeatureEffect {
	type: string;
	target?: string;
	value?: unknown;
	description?: string;
}

export const monsterFeatureEffectSchema = z.object({
	type: z.string(),
	target: z.string().optional(),
	value: z.unknown().optional(),
	description: z.string().optional(),
});

export const monsterFeatureSchema = z.object({
	id: z.string().regex(/^feat_[a-f0-9-]+$/, 'Feature ID must be in format feat_<uuid>'),
	name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
	description: z.string().min(1, 'Description is required'),
	pointCost: z.number().int().min(1, 'Point cost must be at least 1').max(5, 'Point cost must be at most 5'),
	isOfficial: z.boolean(),
	effects: z.array(monsterFeatureEffectSchema).optional(),
});

// ============================================================================
// MONSTER ATTRIBUTES
// ============================================================================

export interface MonsterAttributes {
	might: number;
	agility: number;
	charisma: number;
	intelligence: number;
}

export const monsterAttributesSchema = z.object({
	might: z.number().int().min(-5).max(10),
	agility: z.number().int().min(-5).max(10),
	charisma: z.number().int().min(-5).max(10),
	intelligence: z.number().int().min(-5).max(10),
});

// ============================================================================
// MONSTER FLAVOR FIELDS
// ============================================================================

export const MONSTER_SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'] as const;
export type MonsterSize = (typeof MONSTER_SIZES)[number];

export const MONSTER_TYPES = [
	'Aberration',
	'Beast',
	'Celestial',
	'Construct',
	'Dragon',
	'Elemental',
	'Fey',
	'Fiend',
	'Giant',
	'Humanoid',
	'Monstrosity',
	'Ooze',
	'Plant',
	'Undead',
] as const;
export type MonsterType = (typeof MONSTER_TYPES)[number];

export const MONSTER_ALIGNMENTS = [
	'Lawful Good',
	'Neutral Good',
	'Chaotic Good',
	'Lawful Neutral',
	'True Neutral',
	'Chaotic Neutral',
	'Lawful Evil',
	'Neutral Evil',
	'Chaotic Evil',
	'Unaligned',
	'Varies',
] as const;
export type MonsterAlignment = (typeof MONSTER_ALIGNMENTS)[number];

export const monsterSizeSchema = z.enum(MONSTER_SIZES);
export const monsterTypeSchema = z.enum(MONSTER_TYPES);
export const monsterAlignmentSchema = z.enum(MONSTER_ALIGNMENTS);

// ============================================================================
// VISIBILITY & APPROVAL
// ============================================================================

export const VISIBILITY_OPTIONS = ['private', 'public_anonymous', 'public_credited'] as const;
export type VisibilityOption = (typeof VISIBILITY_OPTIONS)[number];

export const APPROVAL_STATUSES = ['draft', 'pending_review', 'approved', 'rejected'] as const;
export type ApprovalStatus = (typeof APPROVAL_STATUSES)[number];

export const visibilitySchema = z.enum(VISIBILITY_OPTIONS);
export const approvalStatusSchema = z.enum(APPROVAL_STATUSES);

// ============================================================================
// FORK TRACKING
// ============================================================================

export const FORK_SOURCE_TYPES = ['official', 'custom', 'homebrew'] as const;
export type ForkSourceType = (typeof FORK_SOURCE_TYPES)[number];

export interface ForkedFrom {
	id: string;
	type: ForkSourceType;
	name: string;
	userId?: string;
	forkedAt: string; // ISO date string
}

export interface ForkStats {
	forkCount: number;
	lastForkedAt?: string; // ISO date string
}

export const forkedFromSchema = z.object({
	id: z.string(),
	type: z.enum(FORK_SOURCE_TYPES),
	name: z.string(),
	userId: z.string().optional(),
	forkedAt: z.string(),
});

export const forkStatsSchema = z.object({
	forkCount: z.number().int().min(0),
	lastForkedAt: z.string().optional(),
});

// ============================================================================
// STAT BREAKDOWN
// ============================================================================

export interface StatModifier {
	source: string;
	value: number;
}

export interface StatBreakdown {
	base: number;
	modifiers: StatModifier[];
	total: number;
}

export const statModifierSchema = z.object({
	source: z.string(),
	value: z.number(),
});

export const statBreakdownSchema = z.object({
	base: z.number(),
	modifiers: z.array(statModifierSchema),
	total: z.number(),
});

// ============================================================================
// SAVED MONSTER
// ============================================================================

export interface SavedMonster {
	// Identity
	id: string; // mon_<uuid>
	name: string;
	description?: string;
	level: number; // -1 to 10
	tier: MonsterTier;
	roleId: MonsterRoleId;

	// Flavor/Lore
	size?: MonsterSize;
	monsterType?: MonsterType;
	alignment?: MonsterAlignment;
	lore?: string;
	tactics?: string;

	// Calculated Stats
	finalHP: number;
	finalPD: number;
	finalAD: number;
	finalAttack: number;
	finalSaveDC: number;
	finalBaseDamage: number;

	// Attributes (for flavor/roleplay)
	attributes: MonsterAttributes;

	// Features
	featureIds: string[];
	featurePointsSpent: number;
	featurePointsMax: number;

	// Actions
	actions: MonsterAction[];

	// Sharing
	visibility: VisibilityOption;
	approvalStatus: ApprovalStatus;
	isHomebrew: boolean;
	rejectionReason?: string;
	submittedAt?: string;
	approvedAt?: string;
	approvedBy?: string;

	// Fork Tracking
	forkedFrom?: ForkedFrom;
	forkStats?: ForkStats;

	// Soft Delete
	deletedAt?: string;
	deletedBy?: string;
	scheduledPurgeAt?: string;

	// Metadata
	createdAt: string;
	lastModified: string;
	schemaVersion: string;

	// Calculation Breakdowns
	breakdowns: Record<string, StatBreakdown>;
}

export const savedMonsterSchema = z.object({
	// Identity
	id: z.string().regex(/^mon_[a-f0-9-]+$/, 'Monster ID must be in format mon_<uuid>'),
	name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
	description: z.string().optional(),
	level: z.number().int().min(-1, 'Level must be at least -1 (Novice)').max(10, 'Level must be at most 10'),
	tier: monsterTierSchema,
	roleId: monsterRoleIdSchema,

	// Flavor/Lore
	size: monsterSizeSchema.optional(),
	monsterType: monsterTypeSchema.optional(),
	alignment: monsterAlignmentSchema.optional(),
	lore: z.string().max(2000).optional(),
	tactics: z.string().max(1000).optional(),

	// Calculated Stats
	finalHP: z.number().int().min(1),
	finalPD: z.number().int(),
	finalAD: z.number().int(),
	finalAttack: z.number().int(),
	finalSaveDC: z.number().int(),
	finalBaseDamage: z.number().min(0),

	// Attributes
	attributes: monsterAttributesSchema,

	// Features
	featureIds: z.array(z.string()),
	featurePointsSpent: z.number().int().min(0),
	featurePointsMax: z.number().int().min(0),

	// Actions
	actions: z.array(monsterActionSchema).min(1, 'At least one action is required'),

	// Sharing
	visibility: visibilitySchema,
	approvalStatus: approvalStatusSchema,
	isHomebrew: z.boolean(),
	rejectionReason: z.string().optional(),
	submittedAt: z.string().optional(),
	approvedAt: z.string().optional(),
	approvedBy: z.string().optional(),

	// Fork Tracking
	forkedFrom: forkedFromSchema.optional(),
	forkStats: forkStatsSchema.optional(),

	// Soft Delete
	deletedAt: z.string().optional(),
	deletedBy: z.string().optional(),
	scheduledPurgeAt: z.string().optional(),

	// Metadata
	createdAt: z.string(),
	lastModified: z.string(),
	schemaVersion: z.string(),

	// Calculation Breakdowns
	breakdowns: z.record(z.string(), statBreakdownSchema),
});

// ============================================================================
// SCHEMA VERSION
// ============================================================================

export const MONSTER_SCHEMA_VERSION = '1.0.0';
