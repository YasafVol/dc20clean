/**
 * Encounter Schema
 *
 * Data types for the Encounter Planner (DM Tools).
 * Enables point-buy balanced encounter building.
 */

import { z } from 'zod';
import type {
	MonsterTier,
	VisibilityOption,
	ApprovalStatus,
	ForkedFrom,
	ForkStats
} from './monster.schema';

// ============================================================================
// CONSTANTS
// ============================================================================

export const ENCOUNTER_DIFFICULTIES = ['trivial', 'easy', 'medium', 'hard', 'deadly'] as const;
export type EncounterDifficulty = (typeof ENCOUNTER_DIFFICULTIES)[number];

/** Difficulty modifiers (multiplied by party level) */
export const DIFFICULTY_MODIFIERS: Record<EncounterDifficulty, number> = {
	trivial: -2,
	easy: -1,
	medium: 0,
	hard: 1,
	deadly: 2
};

/** Tier cost multipliers for monster cost calculation */
export const TIER_COST_MULTIPLIERS: Record<MonsterTier, number> = {
	standard: 1,
	apex: 2,
	legendary: 4
};

/** Budget status thresholds */
export const BUDGET_THRESHOLDS = {
	UNDER: 0.8, // < 80% = under budget
	ON_TARGET_MAX: 1.0, // 80-100% = on target
	SLIGHTLY_OVER_MAX: 1.2 // 100-120% = slightly over
	// > 120% = over budget
} as const;

export type BudgetStatus = 'under' | 'on_target' | 'slightly_over' | 'over';

// ============================================================================
// PARTY CONFIG
// ============================================================================

export interface PartyConfig {
	size: number; // 1-8 players
	averageLevel: number; // 0-10
}

export const partyConfigSchema = z.object({
	size: z
		.number()
		.int()
		.min(1, 'Party size must be at least 1')
		.max(8, 'Party size must be at most 8'),
	averageLevel: z
		.number()
		.int()
		.min(0, 'Level must be at least 0')
		.max(10, 'Level must be at most 10')
});

// ============================================================================
// MONSTER SLOT
// ============================================================================

export interface EncounterMonsterSlot {
	id: string; // slot_<uuid>
	monsterId: string | null; // null = empty slot
	quantity: number; // 1+
	cost: number; // Calculated: monster cost × quantity
	notes?: string;
}

export const encounterMonsterSlotSchema = z.object({
	id: z.string().regex(/^slot_[a-f0-9-]+$/, 'Slot ID must be in format slot_<uuid>'),
	monsterId: z.string().nullable(),
	quantity: z.number().int().min(1, 'Quantity must be at least 1'),
	cost: z.number().min(0),
	notes: z.string().optional()
});

// ============================================================================
// SAVED ENCOUNTER
// ============================================================================

export interface SavedEncounter {
	// Identity
	id: string; // enc_<uuid>
	name: string;
	description?: string;

	// Party Configuration
	party: PartyConfig;
	difficulty: EncounterDifficulty;

	// Budget (all calculated)
	baseBudget: number; // party.size × party.averageLevel
	difficultyModifier: number; // Based on difficulty
	adjustedBudget: number; // baseBudget + difficultyModifier
	spentBudget: number; // Sum of all slot costs
	remainingBudget: number; // adjustedBudget - spentBudget

	// Monster Slots
	monsters: EncounterMonsterSlot[];

	// Environment & Notes
	environment?: string;
	gmNotes?: string;

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
}

export const savedEncounterSchema = z.object({
	id: z.string().regex(/^enc_[a-f0-9-]+$/, 'Encounter ID must be in format enc_<uuid>'),
	name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
	description: z.string().max(500).optional(),

	party: partyConfigSchema,
	difficulty: z.enum(ENCOUNTER_DIFFICULTIES),

	baseBudget: z.number().int().min(0),
	difficultyModifier: z.number().int(),
	adjustedBudget: z.number().int(),
	spentBudget: z.number().min(0),
	remainingBudget: z.number(),

	monsters: z.array(encounterMonsterSlotSchema),

	environment: z.string().max(100).optional(),
	gmNotes: z.string().max(2000).optional(),

	visibility: z.enum(['private', 'public_anonymous', 'public_credited']),
	approvalStatus: z.enum(['draft', 'pending_review', 'approved', 'rejected']),
	isHomebrew: z.boolean(),
	rejectionReason: z.string().optional(),
	submittedAt: z.string().optional(),
	approvedAt: z.string().optional(),
	approvedBy: z.string().optional(),

	forkedFrom: z
		.object({
			id: z.string(),
			type: z.enum(['official', 'custom', 'homebrew']),
			name: z.string(),
			userId: z.string().optional(),
			forkedAt: z.string()
		})
		.optional(),
	forkStats: z
		.object({
			forkCount: z.number().int().min(0),
			lastForkedAt: z.string().optional()
		})
		.optional(),

	deletedAt: z.string().optional(),
	deletedBy: z.string().optional(),
	scheduledPurgeAt: z.string().optional(),

	createdAt: z.string(),
	lastModified: z.string(),
	schemaVersion: z.string()
});

// ============================================================================
// CALCULATION TYPES
// ============================================================================

export interface EncounterCalculationInput {
	party: PartyConfig;
	difficulty: EncounterDifficulty;
	monsters: Array<{
		monsterId: string;
		quantity: number;
		monsterLevel: number;
		monsterTier: MonsterTier;
	}>;
}

export interface SlotCostBreakdown {
	monsterId: string;
	unitCost: number;
	quantity: number;
	totalCost: number;
}

export interface DifficultyThresholds {
	trivial: number;
	easy: number;
	medium: number;
	hard: number;
	deadly: number;
}

export interface BudgetValidation {
	isOverBudget: boolean; // > 120%
	isUnderBudget: boolean; // < 80%
	isOnTarget: boolean; // 80-100%
	budgetStatus: BudgetStatus;
}

export interface EncounterCalculationResult {
	baseBudget: number;
	difficultyModifier: number;
	adjustedBudget: number;
	spentBudget: number;
	remainingBudget: number;
	budgetPercentage: number;

	slotCosts: SlotCostBreakdown[];
	difficultyThresholds: DifficultyThresholds;
	validation: BudgetValidation;
}

// ============================================================================
// EXPORT FORMAT
// ============================================================================

export interface EncounterExportFormat {
	version: number;
	type: 'encounter';
	exportedAt: string;
	encounter: SavedEncounter;
	bundledMonsters: Array<{
		id: string;
		name: string;
		level: number;
		tier: MonsterTier;
		[key: string]: unknown;
	}>;
}
