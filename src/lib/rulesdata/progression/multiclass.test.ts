/**
 * Unit Tests for Multiclass System
 * 
 * Tests the multiclass tier definitions, prerequisites, and helper functions.
 */

import { describe, it, expect } from 'vitest';
import {
	MULTICLASS_TIERS,
	getMulticlassTier,
	getAvailableMulticlassTiers,
	type MulticlassTier
} from './multiclass';

describe('Multiclass System', () => {
	describe('MULTICLASS_TIERS data integrity', () => {
		it('should have exactly 6 tiers', () => {
			expect(MULTICLASS_TIERS).toHaveLength(6);
		});

		it('should have unique tier IDs', () => {
			const ids = MULTICLASS_TIERS.map(t => t.id);
			const uniqueIds = new Set(ids);
			expect(uniqueIds.size).toBe(ids.length);
		});

		it('should have tiers in ascending level order', () => {
			for (let i = 1; i < MULTICLASS_TIERS.length; i++) {
				expect(MULTICLASS_TIERS[i].levelRequired).toBeGreaterThan(
					MULTICLASS_TIERS[i - 1].levelRequired
				);
			}
		});

		it('should have all required fields for each tier', () => {
			for (const tier of MULTICLASS_TIERS) {
				expect(tier.id).toBeDefined();
				expect(tier.name).toBeDefined();
				expect(tier.levelRequired).toBeGreaterThanOrEqual(2);
				expect(tier.description).toBeDefined();
				expect(tier.targetLevel).toBeGreaterThanOrEqual(1);
				expect(typeof tier.includeSubclass).toBe('boolean');
				expect(typeof tier.minClassFeatures).toBe('number');
				expect(typeof tier.minSubclassFeatures).toBe('number');
			}
		});
	});

	describe('Tier Definitions', () => {
		it('Novice tier should have correct properties', () => {
			const novice = MULTICLASS_TIERS.find(t => t.id === 'novice');
			expect(novice).toBeDefined();
			expect(novice?.levelRequired).toBe(2);
			expect(novice?.targetLevel).toBe(1);
			expect(novice?.includeSubclass).toBe(false);
			expect(novice?.minClassFeatures).toBe(0);
			expect(novice?.minSubclassFeatures).toBe(0);
		});

		it('Adept tier should have correct properties', () => {
			const adept = MULTICLASS_TIERS.find(t => t.id === 'adept');
			expect(adept).toBeDefined();
			expect(adept?.levelRequired).toBe(4);
			expect(adept?.targetLevel).toBe(2);
			expect(adept?.includeSubclass).toBe(false);
			expect(adept?.minClassFeatures).toBe(0);
			expect(adept?.minSubclassFeatures).toBe(0);
		});

		it('Expert tier should have correct properties', () => {
			const expert = MULTICLASS_TIERS.find(t => t.id === 'expert');
			expect(expert).toBeDefined();
			expect(expert?.levelRequired).toBe(7);
			expect(expert?.targetLevel).toBe(5);
			expect(expert?.includeSubclass).toBe(true);
			expect(expert?.subclassLevel).toBe(3);
			expect(expert?.minClassFeatures).toBe(1);
			expect(expert?.minSubclassFeatures).toBe(0);
			expect(expert?.subclassOnly).toBeUndefined(); // Can pick core OR subclass
		});

		it('Master tier should have correct properties', () => {
			const master = MULTICLASS_TIERS.find(t => t.id === 'master');
			expect(master).toBeDefined();
			expect(master?.levelRequired).toBe(10);
			expect(master?.targetLevel).toBe(6);
			expect(master?.includeSubclass).toBe(true);
			expect(master?.subclassLevel).toBe(6);
			expect(master?.subclassOnly).toBe(true); // Only subclass features
			expect(master?.minClassFeatures).toBe(0);
			expect(master?.minSubclassFeatures).toBe(1);
		});

		it('Grandmaster tier should have correct properties', () => {
			const grandmaster = MULTICLASS_TIERS.find(t => t.id === 'grandmaster');
			expect(grandmaster).toBeDefined();
			expect(grandmaster?.levelRequired).toBe(13);
			expect(grandmaster?.targetLevel).toBe(8);
			expect(grandmaster?.includeSubclass).toBe(false);
			expect(grandmaster?.minClassFeatures).toBe(2);
			expect(grandmaster?.minSubclassFeatures).toBe(0);
		});

		it('Legendary tier should have correct properties', () => {
			const legendary = MULTICLASS_TIERS.find(t => t.id === 'legendary');
			expect(legendary).toBeDefined();
			expect(legendary?.levelRequired).toBe(17);
			expect(legendary?.targetLevel).toBe(9);
			expect(legendary?.includeSubclass).toBe(true);
			expect(legendary?.subclassLevel).toBe(9);
			expect(legendary?.subclassOnly).toBe(true);
			expect(legendary?.minClassFeatures).toBe(0);
			expect(legendary?.minSubclassFeatures).toBe(2);
		});
	});

	describe('Prerequisite Requirements', () => {
		it('Novice and Adept should have no feature prerequisites', () => {
			const novice = MULTICLASS_TIERS.find(t => t.id === 'novice');
			const adept = MULTICLASS_TIERS.find(t => t.id === 'adept');
			
			expect(novice?.minClassFeatures).toBe(0);
			expect(novice?.minSubclassFeatures).toBe(0);
			expect(adept?.minClassFeatures).toBe(0);
			expect(adept?.minSubclassFeatures).toBe(0);
		});

		it('Expert should require 1 class feature', () => {
			const expert = MULTICLASS_TIERS.find(t => t.id === 'expert');
			expect(expert?.minClassFeatures).toBe(1);
			expect(expert?.minSubclassFeatures).toBe(0);
		});

		it('Master should require 1 subclass feature', () => {
			const master = MULTICLASS_TIERS.find(t => t.id === 'master');
			expect(master?.minClassFeatures).toBe(0);
			expect(master?.minSubclassFeatures).toBe(1);
		});

		it('Grandmaster should require 2 class features', () => {
			const grandmaster = MULTICLASS_TIERS.find(t => t.id === 'grandmaster');
			expect(grandmaster?.minClassFeatures).toBe(2);
			expect(grandmaster?.minSubclassFeatures).toBe(0);
		});

		it('Legendary should require 2 subclass features', () => {
			const legendary = MULTICLASS_TIERS.find(t => t.id === 'legendary');
			expect(legendary?.minClassFeatures).toBe(0);
			expect(legendary?.minSubclassFeatures).toBe(2);
		});
	});

	describe('getMulticlassTier()', () => {
		it('should return correct tier for valid ID', () => {
			const novice = getMulticlassTier('novice');
			expect(novice).toBeDefined();
			expect(novice?.id).toBe('novice');
			expect(novice?.name).toBe('Novice Multiclass');
		});

		it('should return undefined for invalid ID', () => {
			const invalid = getMulticlassTier('invalid' as MulticlassTier);
			expect(invalid).toBeUndefined();
		});

		it('should return correct tier for all valid IDs', () => {
			const tierIds: MulticlassTier[] = ['novice', 'adept', 'expert', 'master', 'grandmaster', 'legendary'];
			
			for (const id of tierIds) {
				const tier = getMulticlassTier(id);
				expect(tier).toBeDefined();
				expect(tier?.id).toBe(id);
			}
		});
	});

	describe('getAvailableMulticlassTiers()', () => {
		it('should return empty array for level 1', () => {
			const available = getAvailableMulticlassTiers(1);
			expect(available).toHaveLength(0);
		});

		it('should return only Novice for level 2-3', () => {
			const level2 = getAvailableMulticlassTiers(2);
			const level3 = getAvailableMulticlassTiers(3);
			
			expect(level2).toHaveLength(1);
			expect(level2[0].id).toBe('novice');
			expect(level3).toHaveLength(1);
			expect(level3[0].id).toBe('novice');
		});

		it('should return Novice and Adept for level 4-6', () => {
			const level4 = getAvailableMulticlassTiers(4);
			const level5 = getAvailableMulticlassTiers(5);
			const level6 = getAvailableMulticlassTiers(6);
			
			expect(level4).toHaveLength(2);
			expect(level4.map(t => t.id)).toEqual(['novice', 'adept']);
			expect(level5).toHaveLength(2);
			expect(level6).toHaveLength(2);
		});

		it('should return first 3 tiers for level 7-9', () => {
			const level7 = getAvailableMulticlassTiers(7);
			const level9 = getAvailableMulticlassTiers(9);
			
			expect(level7).toHaveLength(3);
			expect(level7.map(t => t.id)).toEqual(['novice', 'adept', 'expert']);
			expect(level9).toHaveLength(3);
		});

		it('should return first 4 tiers for level 10-12', () => {
			const level10 = getAvailableMulticlassTiers(10);
			
			expect(level10).toHaveLength(4);
			expect(level10.map(t => t.id)).toEqual(['novice', 'adept', 'expert', 'master']);
		});

		it('should return first 5 tiers for level 13-16', () => {
			const level13 = getAvailableMulticlassTiers(13);
			
			expect(level13).toHaveLength(5);
			expect(level13.map(t => t.id)).toEqual(['novice', 'adept', 'expert', 'master', 'grandmaster']);
		});

		it('should return all 6 tiers for level 17+', () => {
			const level17 = getAvailableMulticlassTiers(17);
			const level20 = getAvailableMulticlassTiers(20);
			
			expect(level17).toHaveLength(6);
			expect(level17.map(t => t.id)).toEqual(['novice', 'adept', 'expert', 'master', 'grandmaster', 'legendary']);
			expect(level20).toHaveLength(6);
		});

		it('should return tiers in ascending level order', () => {
			const available = getAvailableMulticlassTiers(20);
			
			for (let i = 1; i < available.length; i++) {
				expect(available[i].levelRequired).toBeGreaterThan(available[i - 1].levelRequired);
			}
		});
	});

	describe('Subclass Feature Support', () => {
		it('Novice and Adept should not support subclass features', () => {
			const novice = getMulticlassTier('novice');
			const adept = getMulticlassTier('adept');
			
			expect(novice?.includeSubclass).toBe(false);
			expect(novice?.subclassLevel).toBeUndefined();
			expect(adept?.includeSubclass).toBe(false);
			expect(adept?.subclassLevel).toBeUndefined();
		});

		it('Expert should support subclass features at level 3', () => {
			const expert = getMulticlassTier('expert');
			
			expect(expert?.includeSubclass).toBe(true);
			expect(expert?.subclassLevel).toBe(3);
			expect(expert?.subclassOnly).toBeUndefined(); // Can pick core OR subclass
		});

		it('Master should only support subclass features at level 6', () => {
			const master = getMulticlassTier('master');
			
			expect(master?.includeSubclass).toBe(true);
			expect(master?.subclassLevel).toBe(6);
			expect(master?.subclassOnly).toBe(true);
		});

		it('Grandmaster should not support subclass features', () => {
			const grandmaster = getMulticlassTier('grandmaster');
			
			expect(grandmaster?.includeSubclass).toBe(false);
			expect(grandmaster?.subclassLevel).toBeUndefined();
		});

		it('Legendary should only support subclass features at level 9', () => {
			const legendary = getMulticlassTier('legendary');
			
			expect(legendary?.includeSubclass).toBe(true);
			expect(legendary?.subclassLevel).toBe(9);
			expect(legendary?.subclassOnly).toBe(true);
		});
	});
});

