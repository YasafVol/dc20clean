/**
 * Unit tests for Class Progression Resolver (UT-2)
 * 
 * Tests the resolveClassProgression function and helper functions
 */

import { describe, it, expect } from 'vitest';
import { 
	resolveClassProgression,
	getAvailableSubclasses,
	resolveSubclassFeatures
} from './classProgressionResolver';

describe('Class Progression Resolver (UT-2)', () => {
	describe('resolveClassProgression - Basic Functionality', () => {
		it('should resolve Level 1 Barbarian progression', () => {
			const result = resolveClassProgression('barbarian', 1);

			expect(result.level).toBe(1);
			expect(result.classId).toBe('barbarian');
			expect(result.className).toBe('Barbarian');
			
			// Should have budgets
			expect(result.budgets).toBeDefined();
			expect(result.budgets.totalHP).toBe(9); // Level 1 HP
			expect(result.budgets.totalSP).toBe(1); // Level 1 SP
			expect(result.budgets.totalMP).toBe(0); // Martial class

			// Should have unlocked features
			expect(result.unlockedFeatures.length).toBeGreaterThan(0);
			
			// Check for expected features
			const featureIds = result.unlockedFeatures.map(f => f.id || f.featureName);
			expect(featureIds).toContain('barbarian_martial_path');
			expect(featureIds).toContain('barbarian_rage');
		});

		it('should resolve Level 2 progression with accumulated budgets', () => {
			const result = resolveClassProgression('barbarian', 2);

			expect(result.level).toBe(2);
			
			// Budgets should accumulate
			expect(result.budgets.totalHP).toBe(12); // 9 + 3
			expect(result.budgets.totalSP).toBe(1); // 1 + 0

			// Should have features from both levels
			expect(result.unlockedFeatures.length).toBeGreaterThan(4);
			
			// Check for L2 features
			const featureNames = result.unlockedFeatures.map(f => f.featureName);
			expect(featureNames).toContain('Battlecry');
			expect(featureNames).toContain('Talent');
		});

		it('should resolve Level 3 progression with subclass choice', () => {
			const result = resolveClassProgression('barbarian', 3);

			expect(result.level).toBe(3);
			expect(result.budgets.totalHP).toBe(15); // 9 + 3 + 3
			
			// Subclass choice should be available
			expect(result.availableSubclassChoice).toBe(true);
			expect(result.subclassChoiceLevel).toBe(3);
		});
	});

	describe('resolveClassProgression - Feature Objects', () => {
		it('should return actual ClassFeature objects', () => {
			const result = resolveClassProgression('barbarian', 1);

			expect(result.unlockedFeatures.length).toBeGreaterThan(0);
			
			const firstFeature = result.unlockedFeatures[0];
			
			// Check feature structure
			expect(firstFeature).toHaveProperty('featureName');
			expect(firstFeature).toHaveProperty('levelGained');
			expect(firstFeature).toHaveProperty('description');
			expect(typeof firstFeature.featureName).toBe('string');
			expect(typeof firstFeature.levelGained).toBe('number');
		});

		it('should include feature effects', () => {
			const result = resolveClassProgression('barbarian', 1);

			// Find a feature with effects (Martial Path has combat training effects)
			const martialPath = result.unlockedFeatures.find(
				f => f.id === 'barbarian_martial_path' || f.featureName === 'Martial Path'
			);

			expect(martialPath).toBeDefined();
			expect(martialPath?.effects).toBeDefined();
		});

		it('should track pending feature choices', () => {
			const result = resolveClassProgression('barbarian', 1);

			// Some classes have choices at L1 (e.g., Cleric, Wizard)
			expect(result.pendingFeatureChoices).toBeDefined();
			expect(Array.isArray(result.pendingFeatureChoices)).toBe(true);
		});
	});

	describe('resolveClassProgression - Spellcaster Classes', () => {
		it('should resolve Wizard with spell budgets', () => {
			const result = resolveClassProgression('wizard', 1);

			expect(result.budgets.totalMP).toBeGreaterThan(0);
			expect(result.budgets.totalCantripsKnown).toBeGreaterThan(0);
			expect(result.budgets.totalSpellsKnown).toBeGreaterThan(0);
			
			// Should have spellcasting path
			const hasSpellcasting = result.unlockedFeatures.some(
				f => f.id === 'wizard_spellcasting_path' || f.featureName.includes('Spellcasting')
			);
			expect(hasSpellcasting).toBe(true);
		});

		it('should accumulate spell budgets across levels', () => {
			const l1 = resolveClassProgression('wizard', 1);
			const l3 = resolveClassProgression('wizard', 3);

			expect(l3.budgets.totalMP).toBeGreaterThan(l1.budgets.totalMP);
			expect(l3.budgets.totalSpellsKnown).toBeGreaterThanOrEqual(l1.budgets.totalSpellsKnown);
		});
	});

	describe('resolveClassProgression - Talent & Path Points', () => {
		it('should not grant talents at level 1', () => {
			const result = resolveClassProgression('barbarian', 1);
			expect(result.budgets.totalTalents).toBe(0);
			expect(result.budgets.totalPathPoints).toBe(0);
		});

		it('should grant talents and path points at level 2', () => {
			const result = resolveClassProgression('barbarian', 2);
			expect(result.budgets.totalTalents).toBe(1);
			expect(result.budgets.totalPathPoints).toBe(1);
		});

		it('should accumulate talents across multiple levels', () => {
			const l2 = resolveClassProgression('barbarian', 2);
			const l4 = resolveClassProgression('barbarian', 4);

			expect(l4.budgets.totalTalents).toBeGreaterThan(l2.budgets.totalTalents);
		});
	});

	describe('getAvailableSubclasses', () => {
		it('should return subclasses for Barbarian', () => {
			const subclasses = getAvailableSubclasses('barbarian');

			expect(subclasses.length).toBeGreaterThan(0);
			expect(subclasses[0]).toHaveProperty('name');
			expect(subclasses[0]).toHaveProperty('description');
		});

		it('should return empty array for invalid class', () => {
			const subclasses = getAvailableSubclasses('invalid_class');
			expect(subclasses).toEqual([]);
		});
	});

	describe('resolveSubclassFeatures', () => {
		it('should return subclass features up to level', () => {
			const subclasses = getAvailableSubclasses('barbarian');
			expect(subclasses.length).toBeGreaterThan(0);
			
			const subclassName = subclasses[0].name;
			const features = resolveSubclassFeatures('barbarian', subclassName, 3);

			expect(features.length).toBeGreaterThan(0);
			// All features should be level 3 or below
			features.forEach(f => {
				expect(f.levelGained).toBeLessThanOrEqual(3);
			});
		});

		it('should return empty array for invalid subclass', () => {
			const features = resolveSubclassFeatures('barbarian', 'Nonexistent Subclass', 10);
			expect(features).toEqual([]);
		});
	});

	describe('resolveClassProgression - Multiple Classes', () => {
		const classesToTest = [
			'barbarian', 
			'cleric', 
			'wizard', 
			'rogue', 
			'monk'
		];

		classesToTest.forEach(classId => {
			it(`should resolve ${classId} without errors`, () => {
				expect(() => resolveClassProgression(classId, 1)).not.toThrow();
				expect(() => resolveClassProgression(classId, 2)).not.toThrow();
				expect(() => resolveClassProgression(classId, 3)).not.toThrow();
			});
		});
	});

	describe('Error Handling', () => {
		it('should throw for invalid class ID', () => {
			expect(() => resolveClassProgression('invalid_class', 1)).toThrow();
		});

		it('should handle level 0 gracefully', () => {
			const result = resolveClassProgression('barbarian', 0);
			
			// Should return empty budgets
			expect(result.budgets.totalHP).toBe(0);
			expect(result.unlockedFeatures.length).toBe(0);
		});

		it('should handle extremely high levels', () => {
			const result = resolveClassProgression('barbarian', 100);
			
			// Should accumulate all available levels without crashing
			expect(result.budgets.totalHP).toBeGreaterThan(0);
			expect(result.level).toBe(100);
		});
	});

	describe('Budgets Consistency', () => {
		it('should have consistent budgets between L1 features and progression', () => {
			const result = resolveClassProgression('barbarian', 1);

			// All L1 features should have levelGained === 1
			result.unlockedFeatures.forEach(feature => {
				expect(feature.levelGained).toBe(1);
			});
		});

		it('should accumulate features without duplicates', () => {
			const result = resolveClassProgression('barbarian', 3);

			const featureIds = result.unlockedFeatures.map(f => f.id || f.featureName);
			const uniqueIds = new Set(featureIds);
			
			// No duplicates
			expect(featureIds.length).toBe(uniqueIds.size);
		});
	});
});
