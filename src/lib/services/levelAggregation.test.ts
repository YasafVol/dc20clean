/**
 * M4.1b - Level Aggregation Logic Tests
 *
 * Tests budget accumulation across levels for:
 * - Talent points
 * - Path points
 * - Ancestry points
 * - Attribute points
 * - Feature unlocking
 * - Subclass choice detection
 */

import { describe, it, expect } from 'vitest';
import { resolveClassProgression } from '../rulesdata/classes-data/classProgressionResolver';

describe('Level Aggregation Logic (M4.1b)', () => {
	describe('Budget Accumulation - Talents', () => {
		it('should sum talent points from L1 to target level for Wizard', () => {
			// L1 Wizard: 0 talents
			const result1 = resolveClassProgression('wizard', 1);
			expect(result1.budgets.totalTalents).toBe(0);

			// L2: +1 talent
			const result2 = resolveClassProgression('wizard', 2);
			expect(result2.budgets.totalTalents).toBe(1);

			// L4: +1 talent = 2 total (L2: +1, L4: +1)
			const result4 = resolveClassProgression('wizard', 4);
			expect(result4.budgets.totalTalents).toBe(2);
		});

		it('should sum talent points correctly for Barbarian', () => {
			const result3 = resolveClassProgression('barbarian', 3);
			expect(result3.budgets.totalTalents).toBe(1); // L2: +1 only
		});

		it('should have 0 talents at level 1 for all classes', () => {
			const classes = ['barbarian', 'wizard', 'cleric', 'rogue', 'monk'];
			for (const classId of classes) {
				const result = resolveClassProgression(classId, 1);
				expect(result.budgets.totalTalents, `${classId} L1 should have 0 talents`).toBe(0);
			}
		});
	});

	describe('Budget Accumulation - Path Points', () => {
		it('should sum path points from L1 to target level', () => {
			// L1: 0 path points
			const result1 = resolveClassProgression('barbarian', 1);
			expect(result1.budgets.totalPathPoints).toBe(0);

			// L2: +1 path point
			const result2 = resolveClassProgression('barbarian', 2);
			expect(result2.budgets.totalPathPoints).toBe(1);

			// L3: still 1 path point (no gain at L3)
			const result3 = resolveClassProgression('barbarian', 3);
			expect(result3.budgets.totalPathPoints).toBe(1);

			// L4: +1 path point = 2 total
			const result4 = resolveClassProgression('barbarian', 4);
			expect(result4.budgets.totalPathPoints).toBe(2);
		});

		it('should accumulate path points for spellcaster classes', () => {
			const result4 = resolveClassProgression('wizard', 4);
			expect(result4.budgets.totalPathPoints).toBe(2); // L2: +1, L4: +1
		});

		it('should have 0 path points at level 1', () => {
			const classes = ['barbarian', 'wizard', 'cleric'];
			for (const classId of classes) {
				const result = resolveClassProgression(classId, 1);
				expect(result.budgets.totalPathPoints).toBe(0);
			}
		});
	});

	describe('Budget Accumulation - Ancestry Points', () => {
		it('should sum ancestry points from L1 to target level', () => {
			// L1-L3: 0 ancestry points (no gains until L4)
			const result1 = resolveClassProgression('barbarian', 1);
			expect(result1.budgets.totalAncestryPoints).toBe(0);

			const result3 = resolveClassProgression('barbarian', 3);
			expect(result3.budgets.totalAncestryPoints).toBe(0);

			// L4: +2 ancestry points = 2 total
			const result4 = resolveClassProgression('barbarian', 4);
			expect(result4.budgets.totalAncestryPoints).toBe(2);

			// L7: +2 ancestry points = 4 total
			const result7 = resolveClassProgression('barbarian', 7);
			expect(result7.budgets.totalAncestryPoints).toBe(4);
		});

		it('should have 0 ancestry points at level 1 for all classes', () => {
			const classes = ['barbarian', 'wizard', 'cleric', 'rogue'];
			for (const classId of classes) {
				const result = resolveClassProgression(classId, 1);
				expect(
					result.budgets.totalAncestryPoints,
					`${classId} L1 should have 0 ancestry points`
				).toBe(0);
			}
		});

		it('should have 0 ancestry points at level 3 for all classes', () => {
			const classes = ['barbarian', 'wizard', 'cleric'];
			for (const classId of classes) {
				const result = resolveClassProgression(classId, 3);
				expect(
					result.budgets.totalAncestryPoints,
					`${classId} L3 should have 0 ancestry points`
				).toBe(0);
			}
		});
	});

	describe('Budget Accumulation - Attribute Points', () => {
		it('should sum attribute points from L1 to target level', () => {
			// L1-L2: 0 attribute points
			const result1 = resolveClassProgression('barbarian', 1);
			expect(result1.budgets.totalAttributePoints).toBe(0);

			// L3: +1 attribute point = 1 total
			const result3 = resolveClassProgression('barbarian', 3);
			expect(result3.budgets.totalAttributePoints).toBe(1);

			// L5: +1 attribute point = 2 total
			const result5 = resolveClassProgression('barbarian', 5);
			expect(result5.budgets.totalAttributePoints).toBe(2);
		});

		it('should have 0 attribute points at level 1', () => {
			const classes = ['barbarian', 'wizard', 'cleric'];
			for (const classId of classes) {
				const result = resolveClassProgression(classId, 1);
				expect(
					result.budgets.totalAttributePoints,
					`${classId} L1 should have 0 attribute points`
				).toBe(0);
			}
		});

		it('should have 1 attribute point at level 3', () => {
			const classes = ['barbarian', 'wizard', 'cleric'];
			for (const classId of classes) {
				const result = resolveClassProgression(classId, 3);
				expect(
					result.budgets.totalAttributePoints,
					`${classId} L3 should have 1 attribute point`
				).toBe(1);
			}
		});
	});

	describe('Feature Unlocking', () => {
		it('should unlock all features up to target level', () => {
			const result5 = resolveClassProgression('barbarian', 5);

			// Should have features from L1, L2 (L3 only has subclass choice, L4 only has budgets)
			// L5 has placeholder_class_feature which doesn't exist, so we don't expect it
			const levels = result5.unlockedFeatures.map((f) => f.levelGained);
			expect(levels).toContain(1);
			expect(levels).toContain(2);

			// All level values should be <= 5
			expect(levels.every((level) => level <= 5)).toBe(true);
		});

		it('should not unlock features above target level', () => {
			const result2 = resolveClassProgression('barbarian', 2);

			// Should not have L3 features
			const hasLevel3 = result2.unlockedFeatures.some((f) => f.levelGained === 3);
			expect(hasLevel3).toBe(false);
		});

		it('should include Level 1 features at all levels', () => {
			const result5 = resolveClassProgression('wizard', 5);

			// Should still have L1 features
			const hasLevel1 = result5.unlockedFeatures.some((f) => f.levelGained === 1);
			expect(hasLevel1).toBe(true);
		});

		it('should handle multiple features per level', () => {
			const result1 = resolveClassProgression('wizard', 1);

			// Wizard L1 has multiple features (Spellcasting, Spell School choice, etc.)
			const level1Features = result1.unlockedFeatures.filter((f) => f.levelGained === 1);
			expect(level1Features.length).toBeGreaterThanOrEqual(2);
		});

		it('should unlock features in correct order', () => {
			const result3 = resolveClassProgression('barbarian', 3);

			// Features should be in ascending level order
			for (let i = 1; i < result3.unlockedFeatures.length; i++) {
				const currentLevel = result3.unlockedFeatures[i].levelGained;
				const previousLevel = result3.unlockedFeatures[i - 1].levelGained;
				expect(currentLevel).toBeGreaterThanOrEqual(previousLevel);
			}
		});
	});

	describe('Subclass Resolution', () => {
		it('should not flag subclass choice at level 1', () => {
			const result1 = resolveClassProgression('barbarian', 1);
			expect(result1.availableSubclassChoice).toBe(false);
		});

		it('should not flag subclass choice at level 2', () => {
			const result2 = resolveClassProgression('barbarian', 2);
			expect(result2.availableSubclassChoice).toBe(false);
		});

		it('should flag subclass choice at level 3', () => {
			const result3 = resolveClassProgression('barbarian', 3);
			expect(result3.availableSubclassChoice).toBe(true);
			expect(result3.subclassChoiceLevel).toBe(3);
		});

		it('should flag subclass for all classes at level 3', () => {
			const classes = ['barbarian', 'wizard', 'cleric', 'rogue', 'monk'];
			for (const classId of classes) {
				const result = resolveClassProgression(classId, 3);
				expect(result.availableSubclassChoice, `${classId} L3 should have subclass choice`).toBe(
					true
				);
			}
		});

		it('should have correct subclass choice level', () => {
			const result = resolveClassProgression('wizard', 3);
			expect(result.subclassChoiceLevel).toBe(3);
		});
	});

	describe('Edge Cases', () => {
		it('should handle level 1 correctly (baseline)', () => {
			const result = resolveClassProgression('barbarian', 1);

			expect(result.level).toBe(1);
			expect(result.budgets.totalTalents).toBe(0);
			expect(result.budgets.totalPathPoints).toBe(0);
			expect(result.budgets.totalAncestryPoints).toBe(0);
			expect(result.budgets.totalAttributePoints).toBe(0);
			expect(result.availableSubclassChoice).toBe(false);
		});

		it('should handle level 5 correctly', () => {
			const result = resolveClassProgression('wizard', 5);

			expect(result.level).toBe(5);
			expect(result.budgets.totalTalents).toBe(2); // L2: +1, L4: +1
			expect(result.budgets.totalPathPoints).toBe(2); // L2: +1, L4: +1
			expect(result.budgets.totalAncestryPoints).toBe(2); // L4: +2
		});

		it('should handle invalid level gracefully', () => {
			expect(() => {
				resolveClassProgression('barbarian', 0);
			}).toThrow();
		});

		it('should handle unknown class gracefully', () => {
			expect(() => {
				resolveClassProgression('invalid_class', 1);
			}).toThrow();
		});

		it('should return consistent results for same inputs', () => {
			const result1 = resolveClassProgression('wizard', 3);
			const result2 = resolveClassProgression('wizard', 3);

			expect(result1.budgets.totalTalents).toBe(result2.budgets.totalTalents);
			expect(result1.budgets.totalPathPoints).toBe(result2.budgets.totalPathPoints);
			expect(result1.unlockedFeatures.length).toBe(result2.unlockedFeatures.length);
		});
	});

	describe('HP/SP/MP Accumulation', () => {
		it('should accumulate HP correctly for martial class', () => {
			const result1 = resolveClassProgression('barbarian', 1);
			const result3 = resolveClassProgression('barbarian', 3);

			expect(result3.budgets.totalHP).toBeGreaterThan(result1.budgets.totalHP);
		});

		it('should accumulate SP for martial classes', () => {
			const result = resolveClassProgression('barbarian', 3);
			expect(result.budgets.totalSP).toBeGreaterThan(0);
		});

		it('should accumulate MP for spellcaster classes', () => {
			const result = resolveClassProgression('wizard', 3);
			expect(result.budgets.totalMP).toBeGreaterThan(0);
		});

		it('should have minimal MP for martial classes', () => {
			const result = resolveClassProgression('barbarian', 3);
			expect(result.budgets.totalMP).toBe(0); // Barbarian has no base MP
		});

		it('should have minimal SP for pure spellcaster classes', () => {
			const result = resolveClassProgression('wizard', 3);
			expect(result.budgets.totalSP).toBe(0); // Wizard has no base SP
		});
	});

	describe('Maneuvers and Spells Accumulation', () => {
		it('should accumulate maneuvers for martial classes', () => {
			const result3 = resolveClassProgression('barbarian', 3);
			expect(result3.budgets.totalManeuversKnown).toBe(4); // L1: 4, L2-L3: 0

			const result5 = resolveClassProgression('barbarian', 5);
			expect(result5.budgets.totalManeuversKnown).toBe(5); // L1: 4, L5: +1
		});

		it('should accumulate spells for spellcaster classes', () => {
			const result3 = resolveClassProgression('wizard', 3);
			expect(result3.budgets.totalSpellsKnown).toBeGreaterThan(0);
			expect(result3.budgets.totalCantripsKnown).toBeGreaterThan(0);
		});

		it('should accumulate techniques for martial classes', () => {
			const result3 = resolveClassProgression('barbarian', 3);
			expect(result3.budgets.totalTechniquesKnown).toBeGreaterThan(0);
		});
	});

	describe('Cross-Class Consistency', () => {
		it('all classes should have same ancestry and attribute totals at same level', () => {
			const level = 3;
			const classes = ['barbarian', 'wizard', 'cleric', 'rogue'];

			const ancestryPoints = classes.map(
				(c) => resolveClassProgression(c, level).budgets.totalAncestryPoints
			);
			const attributePoints = classes.map(
				(c) => resolveClassProgression(c, level).budgets.totalAttributePoints
			);

			// All should be same
			expect(new Set(ancestryPoints).size).toBe(1);
			expect(new Set(attributePoints).size).toBe(1);
		});

		it('all classes should have same talent and path totals at same level', () => {
			const level = 3;
			const classes = ['barbarian', 'wizard', 'cleric', 'rogue'];

			const talentPoints = classes.map(
				(c) => resolveClassProgression(c, level).budgets.totalTalents
			);
			const pathPoints = classes.map(
				(c) => resolveClassProgression(c, level).budgets.totalPathPoints
			);

			// All should be same
			expect(new Set(talentPoints).size).toBe(1);
			expect(new Set(pathPoints).size).toBe(1);
		});
	});
});
