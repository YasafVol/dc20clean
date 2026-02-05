/**
 * Encounter Budget Calculator Tests
 */

import { describe, it, expect } from 'vitest';
import {
	calculateBaseBudget,
	calculateDifficultyModifier,
	calculateAdjustedBudget,
	calculateMonsterCost,
	calculateEncounterBudget,
	calculateDifficultyThresholds,
	getBudgetStatus,
	createDefaultEncounter
} from './encounterBudgetCalculator';

describe('Encounter Budget Calculator', () => {
	describe('Base Budget', () => {
		it('should calculate base budget as party size × average level', () => {
			expect(calculateBaseBudget({ size: 4, averageLevel: 4 })).toBe(16);
			expect(calculateBaseBudget({ size: 5, averageLevel: 3 })).toBe(15);
			expect(calculateBaseBudget({ size: 3, averageLevel: 6 })).toBe(18);
			expect(calculateBaseBudget({ size: 6, averageLevel: 2 })).toBe(12);
		});

		it('should handle level 0 party (returns 0)', () => {
			expect(calculateBaseBudget({ size: 4, averageLevel: 0 })).toBe(0);
		});

		it('should handle single player party', () => {
			expect(calculateBaseBudget({ size: 1, averageLevel: 5 })).toBe(5);
		});

		it('should handle maximum party size', () => {
			expect(calculateBaseBudget({ size: 8, averageLevel: 10 })).toBe(80);
		});
	});

	describe('Difficulty Modifier', () => {
		it('should calculate correct modifiers for level 4 party', () => {
			expect(calculateDifficultyModifier('trivial', 4)).toBe(-8);
			expect(calculateDifficultyModifier('easy', 4)).toBe(-4);
			expect(calculateDifficultyModifier('medium', 4)).toBe(0);
			expect(calculateDifficultyModifier('hard', 4)).toBe(4);
			expect(calculateDifficultyModifier('deadly', 4)).toBe(8);
		});

		it('should calculate correct modifiers for level 1 party', () => {
			expect(calculateDifficultyModifier('trivial', 1)).toBe(-2);
			expect(calculateDifficultyModifier('easy', 1)).toBe(-1);
			expect(calculateDifficultyModifier('medium', 1)).toBe(0);
			expect(calculateDifficultyModifier('hard', 1)).toBe(1);
			expect(calculateDifficultyModifier('deadly', 1)).toBe(2);
		});

		it('should handle level 0 (modifiers are 0)', () => {
			// Note: -2 × 0 = -0 in JavaScript, use loose equality
			expect(calculateDifficultyModifier('trivial', 0) === 0).toBe(true);
			expect(calculateDifficultyModifier('deadly', 0) === 0).toBe(true);
		});
	});

	describe('Adjusted Budget', () => {
		it('should calculate adjusted budget for 4 players at level 4', () => {
			const party = { size: 4, averageLevel: 4 };
			expect(calculateAdjustedBudget(party, 'trivial')).toBe(8);
			expect(calculateAdjustedBudget(party, 'easy')).toBe(12);
			expect(calculateAdjustedBudget(party, 'medium')).toBe(16);
			expect(calculateAdjustedBudget(party, 'hard')).toBe(20);
			expect(calculateAdjustedBudget(party, 'deadly')).toBe(24);
		});

		it('should not go below 0', () => {
			// 1 player × level 1 = 1, trivial modifier = -2, result should be 0 not -1
			const party = { size: 1, averageLevel: 1 };
			expect(calculateAdjustedBudget(party, 'trivial')).toBe(0);
		});
	});

	describe('Monster Cost', () => {
		it('should calculate standard tier cost', () => {
			expect(calculateMonsterCost(1, 'standard')).toBe(1);
			expect(calculateMonsterCost(4, 'standard')).toBe(4);
			expect(calculateMonsterCost(8, 'standard')).toBe(8);
		});

		it('should calculate apex tier cost (2× multiplier)', () => {
			expect(calculateMonsterCost(1, 'apex')).toBe(2);
			expect(calculateMonsterCost(4, 'apex')).toBe(8);
			expect(calculateMonsterCost(8, 'apex')).toBe(16);
		});

		it('should calculate legendary tier cost (4× multiplier)', () => {
			expect(calculateMonsterCost(1, 'legendary')).toBe(4);
			expect(calculateMonsterCost(4, 'legendary')).toBe(16);
			expect(calculateMonsterCost(8, 'legendary')).toBe(32);
		});

		it('should handle level 0 monsters', () => {
			expect(calculateMonsterCost(0, 'standard')).toBe(0);
			expect(calculateMonsterCost(0, 'apex')).toBe(0);
			expect(calculateMonsterCost(0, 'legendary')).toBe(0);
		});

		it('should handle negative level (novice)', () => {
			// Level -1 monsters should have cost 0 or handled specially
			expect(calculateMonsterCost(-1, 'standard')).toBe(0);
		});
	});

	describe('Difficulty Thresholds', () => {
		it('should calculate all thresholds for 4 players at level 4', () => {
			const thresholds = calculateDifficultyThresholds({ size: 4, averageLevel: 4 });
			expect(thresholds.trivial).toBe(8);
			expect(thresholds.easy).toBe(12);
			expect(thresholds.medium).toBe(16);
			expect(thresholds.hard).toBe(20);
			expect(thresholds.deadly).toBe(24);
		});

		it('should calculate thresholds for 5 players at level 3', () => {
			const thresholds = calculateDifficultyThresholds({ size: 5, averageLevel: 3 });
			expect(thresholds.trivial).toBe(9); // 15 - 6
			expect(thresholds.easy).toBe(12); // 15 - 3
			expect(thresholds.medium).toBe(15); // 15
			expect(thresholds.hard).toBe(18); // 15 + 3
			expect(thresholds.deadly).toBe(21); // 15 + 6
		});
	});

	describe('Budget Status', () => {
		it('should return "under" for < 80%', () => {
			expect(getBudgetStatus(7, 16)).toBe('under');
			expect(getBudgetStatus(12, 16)).toBe('under'); // 75%
		});

		it('should return "on_target" for 80-100%', () => {
			expect(getBudgetStatus(13, 16)).toBe('on_target'); // 81.25%
			expect(getBudgetStatus(16, 16)).toBe('on_target'); // 100%
		});

		it('should return "slightly_over" for 100-120%', () => {
			expect(getBudgetStatus(17, 16)).toBe('slightly_over'); // 106%
			expect(getBudgetStatus(19, 16)).toBe('slightly_over'); // 118.75%
		});

		it('should return "over" for > 120%', () => {
			expect(getBudgetStatus(20, 16)).toBe('over'); // 125%
			expect(getBudgetStatus(30, 16)).toBe('over'); // 187.5%
		});

		it('should handle 0 budget', () => {
			expect(getBudgetStatus(0, 0)).toBe('on_target');
			expect(getBudgetStatus(5, 0)).toBe('over');
		});
	});

	describe('Full Encounter Calculation', () => {
		it('should calculate complete encounter with multiple monsters', () => {
			const result = calculateEncounterBudget({
				party: { size: 4, averageLevel: 4 },
				difficulty: 'medium',
				monsters: [
					{ monsterId: 'mon_1', quantity: 4, monsterLevel: 1, monsterTier: 'standard' },
					{ monsterId: 'mon_2', quantity: 1, monsterLevel: 2, monsterTier: 'standard' }
				]
			});

			expect(result.baseBudget).toBe(16);
			expect(result.difficultyModifier).toBe(0);
			expect(result.adjustedBudget).toBe(16);
			expect(result.spentBudget).toBe(6); // 4×1 + 1×2
			expect(result.remainingBudget).toBe(10);
			expect(result.budgetPercentage).toBeCloseTo(37.5, 1);
			expect(result.validation.budgetStatus).toBe('under');
		});

		it('should calculate encounter with apex monster', () => {
			const result = calculateEncounterBudget({
				party: { size: 4, averageLevel: 4 },
				difficulty: 'hard',
				monsters: [
					{ monsterId: 'mon_1', quantity: 1, monsterLevel: 4, monsterTier: 'apex' },
					{ monsterId: 'mon_2', quantity: 4, monsterLevel: 2, monsterTier: 'standard' }
				]
			});

			expect(result.adjustedBudget).toBe(20); // 16 + 4
			expect(result.spentBudget).toBe(16); // 1×8 + 4×2
			expect(result.validation.budgetStatus).toBe('on_target');
		});

		it('should calculate empty encounter (no monsters)', () => {
			const result = calculateEncounterBudget({
				party: { size: 4, averageLevel: 4 },
				difficulty: 'medium',
				monsters: []
			});

			expect(result.spentBudget).toBe(0);
			expect(result.remainingBudget).toBe(16);
			expect(result.validation.budgetStatus).toBe('under');
		});

		it('should include slot cost breakdown', () => {
			const result = calculateEncounterBudget({
				party: { size: 4, averageLevel: 4 },
				difficulty: 'medium',
				monsters: [{ monsterId: 'mon_1', quantity: 3, monsterLevel: 2, monsterTier: 'standard' }]
			});

			expect(result.slotCosts).toHaveLength(1);
			expect(result.slotCosts[0]).toEqual({
				monsterId: 'mon_1',
				unitCost: 2,
				quantity: 3,
				totalCost: 6
			});
		});

		it('should include all difficulty thresholds', () => {
			const result = calculateEncounterBudget({
				party: { size: 4, averageLevel: 4 },
				difficulty: 'medium',
				monsters: []
			});

			expect(result.difficultyThresholds).toEqual({
				trivial: 8,
				easy: 12,
				medium: 16,
				hard: 20,
				deadly: 24
			});
		});
	});

	describe('Validation Flags', () => {
		it('should set isUnderBudget for < 80%', () => {
			const result = calculateEncounterBudget({
				party: { size: 4, averageLevel: 4 },
				difficulty: 'medium',
				monsters: [{ monsterId: 'mon_1', quantity: 1, monsterLevel: 2, monsterTier: 'standard' }]
			});

			expect(result.validation.isUnderBudget).toBe(true);
			expect(result.validation.isOnTarget).toBe(false);
			expect(result.validation.isOverBudget).toBe(false);
		});

		it('should set isOnTarget for 80-100%', () => {
			const result = calculateEncounterBudget({
				party: { size: 4, averageLevel: 4 },
				difficulty: 'medium',
				monsters: [{ monsterId: 'mon_1', quantity: 14, monsterLevel: 1, monsterTier: 'standard' }]
			});

			expect(result.validation.isUnderBudget).toBe(false);
			expect(result.validation.isOnTarget).toBe(true);
			expect(result.validation.isOverBudget).toBe(false);
		});

		it('should set isOverBudget for > 120%', () => {
			const result = calculateEncounterBudget({
				party: { size: 4, averageLevel: 4 },
				difficulty: 'medium',
				monsters: [{ monsterId: 'mon_1', quantity: 1, monsterLevel: 8, monsterTier: 'legendary' }]
			});

			expect(result.validation.isUnderBudget).toBe(false);
			expect(result.validation.isOnTarget).toBe(false);
			expect(result.validation.isOverBudget).toBe(true);
		});
	});

	describe('Default Encounter Factory', () => {
		it('should create a valid default encounter', () => {
			const encounter = createDefaultEncounter();

			expect(encounter.id).toMatch(/^enc_[a-f0-9-]+$/);
			expect(encounter.name).toBe('New Encounter');
			expect(encounter.party).toEqual({ size: 4, averageLevel: 1 });
			expect(encounter.difficulty).toBe('medium');
			expect(encounter.monsters).toEqual([]);
			expect(encounter.visibility).toBe('private');
			expect(encounter.approvalStatus).toBe('draft');
			expect(encounter.isHomebrew).toBe(false);
			expect(encounter.schemaVersion).toBe('1.0');
		});

		it('should accept overrides', () => {
			const encounter = createDefaultEncounter({
				name: 'Goblin Ambush',
				party: { size: 5, averageLevel: 3 },
				difficulty: 'hard'
			});

			expect(encounter.name).toBe('Goblin Ambush');
			expect(encounter.party).toEqual({ size: 5, averageLevel: 3 });
			expect(encounter.difficulty).toBe('hard');
		});

		it('should calculate budget values', () => {
			const encounter = createDefaultEncounter({
				party: { size: 4, averageLevel: 4 },
				difficulty: 'hard'
			});

			expect(encounter.baseBudget).toBe(16);
			expect(encounter.difficultyModifier).toBe(4);
			expect(encounter.adjustedBudget).toBe(20);
			expect(encounter.spentBudget).toBe(0);
			expect(encounter.remainingBudget).toBe(20);
		});
	});
});
