/**
 * Encounter Budget Calculator
 *
 * Calculates encounter budgets, monster costs, and validates balance.
 */

import { generateContentId } from '../utils/idGenerator';
import {
	DIFFICULTY_MODIFIERS,
	TIER_COST_MULTIPLIERS,
	BUDGET_THRESHOLDS,
	ENCOUNTER_DIFFICULTIES,
	type PartyConfig,
	type EncounterDifficulty,
	type EncounterCalculationInput,
	type EncounterCalculationResult,
	type DifficultyThresholds,
	type BudgetStatus,
	type SavedEncounter
} from '../rulesdata/schemas/encounter.schema';
import type { MonsterTier } from '../rulesdata/schemas/monster.schema';

/**
 * Calculate base budget from party configuration
 * Base Budget = Party Size × Average Party Level
 */
export function calculateBaseBudget(party: PartyConfig): number {
	return party.size * party.averageLevel;
}

/**
 * Calculate difficulty modifier
 * Modifier = DIFFICULTY_MODIFIERS[difficulty] × Party Level
 */
export function calculateDifficultyModifier(
	difficulty: EncounterDifficulty,
	partyLevel: number
): number {
	return DIFFICULTY_MODIFIERS[difficulty] * partyLevel;
}

/**
 * Calculate adjusted budget for a given difficulty
 * Adjusted Budget = Base Budget + Difficulty Modifier (min 0)
 */
export function calculateAdjustedBudget(
	party: PartyConfig,
	difficulty: EncounterDifficulty
): number {
	const base = calculateBaseBudget(party);
	const modifier = calculateDifficultyModifier(difficulty, party.averageLevel);
	return Math.max(0, base + modifier);
}

/**
 * Calculate monster cost
 * Cost = Level × Tier Multiplier (min 0)
 */
export function calculateMonsterCost(level: number, tier: MonsterTier): number {
	if (level <= 0) return 0;
	return level * TIER_COST_MULTIPLIERS[tier];
}

/**
 * Calculate all difficulty thresholds for display
 */
export function calculateDifficultyThresholds(party: PartyConfig): DifficultyThresholds {
	const thresholds: Partial<DifficultyThresholds> = {};

	for (const difficulty of ENCOUNTER_DIFFICULTIES) {
		thresholds[difficulty] = calculateAdjustedBudget(party, difficulty);
	}

	return thresholds as DifficultyThresholds;
}

/**
 * Get budget status based on spent percentage
 */
export function getBudgetStatus(spent: number, budget: number): BudgetStatus {
	if (budget === 0) {
		return spent === 0 ? 'on_target' : 'over';
	}

	const percentage = spent / budget;

	if (percentage < BUDGET_THRESHOLDS.UNDER) {
		return 'under';
	} else if (percentage <= BUDGET_THRESHOLDS.ON_TARGET_MAX) {
		return 'on_target';
	} else if (percentage <= BUDGET_THRESHOLDS.SLIGHTLY_OVER_MAX) {
		return 'slightly_over';
	} else {
		return 'over';
	}
}

/**
 * Calculate complete encounter budget with all details
 */
export function calculateEncounterBudget(
	input: EncounterCalculationInput
): EncounterCalculationResult {
	const { party, difficulty, monsters } = input;

	// Base calculations
	const baseBudget = calculateBaseBudget(party);
	const difficultyModifier = calculateDifficultyModifier(difficulty, party.averageLevel);
	const adjustedBudget = Math.max(0, baseBudget + difficultyModifier);

	// Calculate slot costs
	const slotCosts = monsters.map((m) => {
		const unitCost = calculateMonsterCost(m.monsterLevel, m.monsterTier);
		return {
			monsterId: m.monsterId,
			unitCost,
			quantity: m.quantity,
			totalCost: unitCost * m.quantity
		};
	});

	// Sum spent budget
	const spentBudget = slotCosts.reduce((sum, slot) => sum + slot.totalCost, 0);
	const remainingBudget = adjustedBudget - spentBudget;

	// Calculate percentage
	const budgetPercentage = adjustedBudget > 0 ? (spentBudget / adjustedBudget) * 100 : 0;

	// Get status
	const budgetStatus = getBudgetStatus(spentBudget, adjustedBudget);

	// Build validation object
	const validation = {
		isOverBudget: budgetStatus === 'over',
		isUnderBudget: budgetStatus === 'under',
		isOnTarget: budgetStatus === 'on_target',
		budgetStatus
	};

	// Calculate all thresholds
	const difficultyThresholds = calculateDifficultyThresholds(party);

	return {
		baseBudget,
		difficultyModifier,
		adjustedBudget,
		spentBudget,
		remainingBudget,
		budgetPercentage,
		slotCosts,
		difficultyThresholds,
		validation
	};
}

/**
 * Recalculate budget values for an existing encounter
 */
export function recalculateEncounterBudget(
	encounter: SavedEncounter,
	monsterData: Array<{ id: string; level: number; tier: MonsterTier }>
): Pick<
	SavedEncounter,
	'baseBudget' | 'difficultyModifier' | 'adjustedBudget' | 'spentBudget' | 'remainingBudget'
> {
	// Build calculation input from encounter
	const monsters = encounter.monsters
		.filter((slot) => slot.monsterId !== null)
		.map((slot) => {
			const monster = monsterData.find((m) => m.id === slot.monsterId);
			return {
				monsterId: slot.monsterId!,
				quantity: slot.quantity,
				monsterLevel: monster?.level ?? 0,
				monsterTier: monster?.tier ?? 'standard'
			};
		});

	const result = calculateEncounterBudget({
		party: encounter.party,
		difficulty: encounter.difficulty,
		monsters
	});

	return {
		baseBudget: result.baseBudget,
		difficultyModifier: result.difficultyModifier,
		adjustedBudget: result.adjustedBudget,
		spentBudget: result.spentBudget,
		remainingBudget: result.remainingBudget
	};
}

/**
 * Create a default encounter
 */
export function createDefaultEncounter(overrides?: Partial<SavedEncounter>): SavedEncounter {
	const now = new Date().toISOString();
	const party = overrides?.party ?? { size: 4, averageLevel: 1 };
	const difficulty = overrides?.difficulty ?? 'medium';

	const budgetResult = calculateEncounterBudget({
		party,
		difficulty,
		monsters: []
	});

	return {
		id: generateContentId('encounter'),
		name: 'New Encounter',
		description: undefined,

		party,
		difficulty,

		baseBudget: budgetResult.baseBudget,
		difficultyModifier: budgetResult.difficultyModifier,
		adjustedBudget: budgetResult.adjustedBudget,
		spentBudget: 0,
		remainingBudget: budgetResult.adjustedBudget,

		monsters: [],

		environment: undefined,
		gmNotes: undefined,

		visibility: 'private',
		approvalStatus: 'draft',
		isHomebrew: false,

		createdAt: now,
		lastModified: now,
		schemaVersion: '1.0',

		...overrides
	};
}
