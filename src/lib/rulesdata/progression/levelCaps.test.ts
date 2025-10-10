/**
 * M4.1e - Level Cap Enforcement Tests
 * 
 * Tests the level cap system for:
 * - Cap table data integrity
 * - Mastery tier definitions
 * - Lookup function accuracy
 * - Level threshold enforcement
 */

import { describe, it, expect } from 'vitest';
import {
	LEVEL_CAPS_TABLE,
	MASTERY_TIERS,
	getLevelCaps,
	getMasteryTierByNumber,
	getMasteryTierByName
} from './levelCaps';

describe('Level Cap System (M4.1e)', () => {
	describe('Level Caps Table Integrity', () => {
		it('should have entries for all levels 1-20', () => {
			expect(LEVEL_CAPS_TABLE).toHaveLength(20);
			
			// Check each level is present
			for (let level = 1; level <= 20; level++) {
				const entry = LEVEL_CAPS_TABLE.find(e => e.level === level);
				expect(entry, `Level ${level} should exist in caps table`).toBeDefined();
			}
		});

		it('should have increasing attribute caps', () => {
			for (let i = 1; i < LEVEL_CAPS_TABLE.length; i++) {
				const currentCap = LEVEL_CAPS_TABLE[i].maxAttributeValue;
				const previousCap = LEVEL_CAPS_TABLE[i - 1].maxAttributeValue;
				expect(currentCap, `Level ${i + 1} attribute cap should be >= level ${i}`).toBeGreaterThanOrEqual(previousCap);
			}
		});

		it('should have increasing mastery tiers', () => {
			for (let i = 1; i < LEVEL_CAPS_TABLE.length; i++) {
				const currentTier = LEVEL_CAPS_TABLE[i].maxSkillMasteryTier;
				const previousTier = LEVEL_CAPS_TABLE[i - 1].maxSkillMasteryTier;
				expect(currentTier, `Level ${i + 1} mastery tier should be >= level ${i}`).toBeGreaterThanOrEqual(previousTier);
			}
		});

		it('should have consistent skill and trade mastery caps', () => {
			for (const entry of LEVEL_CAPS_TABLE) {
				expect(entry.maxSkillMasteryTier).toBe(entry.maxTradeMasteryTier);
			}
		});

		it('should have all required fields for each entry', () => {
			for (const entry of LEVEL_CAPS_TABLE) {
				expect(entry.level).toBeGreaterThanOrEqual(1);
				expect(entry.level).toBeLessThanOrEqual(20);
				expect(entry.maxAttributeValue).toBeGreaterThanOrEqual(3);
				expect(entry.maxSkillMasteryTier).toBeGreaterThanOrEqual(1);
				expect(entry.maxTradeMasteryTier).toBeGreaterThanOrEqual(1);
			}
		});

		it('should start at level 1 and increment by 1', () => {
			for (let i = 0; i < LEVEL_CAPS_TABLE.length; i++) {
				expect(LEVEL_CAPS_TABLE[i].level).toBe(i + 1);
			}
		});
	});

	describe('Mastery Tier Definitions', () => {
		it('should have all 6 tiers defined', () => {
			expect(MASTERY_TIERS).toHaveLength(6);
		});

		it('should have correct tier bonuses', () => {
			// Untrained: 0, Novice: 2, Adept: 4, Expert: 6, Master: 8, Grandmaster: 10
			expect(MASTERY_TIERS[0].bonus).toBe(0); // Untrained
			expect(MASTERY_TIERS[1].bonus).toBe(2); // Novice
			expect(MASTERY_TIERS[2].bonus).toBe(4); // Adept
			expect(MASTERY_TIERS[3].bonus).toBe(6); // Expert
			expect(MASTERY_TIERS[4].bonus).toBe(8); // Master
			expect(MASTERY_TIERS[5].bonus).toBe(10); // Grandmaster
		});

		it('should have unique tier numbers', () => {
			const tierNumbers = MASTERY_TIERS.map(t => t.tier);
			const uniqueTiers = new Set(tierNumbers);
			expect(uniqueTiers.size).toBe(tierNumbers.length);
		});

		it('should have tiers in ascending order', () => {
			for (let i = 1; i < MASTERY_TIERS.length; i++) {
				expect(MASTERY_TIERS[i].tier).toBe(MASTERY_TIERS[i - 1].tier + 1);
			}
		});

		it('should have correct tier names', () => {
			expect(MASTERY_TIERS[0].name).toBe('Untrained');
			expect(MASTERY_TIERS[1].name).toBe('Novice');
			expect(MASTERY_TIERS[2].name).toBe('Adept');
			expect(MASTERY_TIERS[3].name).toBe('Expert');
			expect(MASTERY_TIERS[4].name).toBe('Master');
			expect(MASTERY_TIERS[5].name).toBe('Grandmaster');
		});

		it('should have bonuses increasing by 2', () => {
			for (let i = 1; i < MASTERY_TIERS.length; i++) {
				const currentBonus = MASTERY_TIERS[i].bonus;
				const previousBonus = MASTERY_TIERS[i - 1].bonus;
				expect(currentBonus - previousBonus).toBe(2);
			}
		});

		it('should have all required fields', () => {
			for (const tier of MASTERY_TIERS) {
				expect(tier.tier).toBeGreaterThanOrEqual(0);
				expect(tier.name).toBeDefined();
				expect(tier.name.length).toBeGreaterThan(0);
				expect(typeof tier.bonus).toBe('number');
			}
		});
	});

	describe('getLevelCaps Function', () => {
		it('should return correct caps for level 1', () => {
			const caps = getLevelCaps(1);
			expect(caps.level).toBe(1);
			expect(caps.maxAttributeValue).toBe(3);
			expect(caps.maxSkillMasteryTier).toBe(1); // Novice
		});

		it('should return correct caps for level 5', () => {
			const caps = getLevelCaps(5);
			expect(caps.level).toBe(5);
			expect(caps.maxAttributeValue).toBe(4);
			expect(caps.maxSkillMasteryTier).toBe(2); // Adept
		});

		it('should return correct caps for level 10', () => {
			const caps = getLevelCaps(10);
			expect(caps.level).toBe(10);
			expect(caps.maxAttributeValue).toBe(5);
			expect(caps.maxSkillMasteryTier).toBe(3); // Expert
		});

		it('should return correct caps for level 15', () => {
			const caps = getLevelCaps(15);
			expect(caps.level).toBe(15);
			expect(caps.maxAttributeValue).toBe(6);
			expect(caps.maxSkillMasteryTier).toBe(4); // Master
		});

		it('should return correct caps for level 20', () => {
			const caps = getLevelCaps(20);
			expect(caps.level).toBe(20);
			expect(caps.maxAttributeValue).toBe(7);
			expect(caps.maxSkillMasteryTier).toBe(5); // Grandmaster
		});

		it('should handle all valid levels 1-20', () => {
			for (let level = 1; level <= 20; level++) {
				expect(() => getLevelCaps(level)).not.toThrow();
				const caps = getLevelCaps(level);
				expect(caps.level).toBe(level);
			}
		});

		it('should throw error for level 0', () => {
			expect(() => getLevelCaps(0)).toThrow();
		});

		it('should throw error for level 21', () => {
			expect(() => getLevelCaps(21)).toThrow();
		});

		it('should throw error for negative level', () => {
			expect(() => getLevelCaps(-1)).toThrow();
		});

		it('should return consistent results for same level', () => {
			const caps1 = getLevelCaps(5);
			const caps2 = getLevelCaps(5);
			expect(caps1).toEqual(caps2);
		});
	});

	describe('getMasteryTierByNumber Function', () => {
		it('should return correct tier for tier 0 (Untrained)', () => {
			const tier = getMasteryTierByNumber(0);
			expect(tier.name).toBe('Untrained');
			expect(tier.bonus).toBe(0);
		});

		it('should return correct tier for tier 1 (Novice)', () => {
			const tier = getMasteryTierByNumber(1);
			expect(tier.name).toBe('Novice');
			expect(tier.bonus).toBe(2);
		});

		it('should return correct tier for tier 2 (Adept)', () => {
			const tier = getMasteryTierByNumber(2);
			expect(tier.name).toBe('Adept');
			expect(tier.bonus).toBe(4);
		});

		it('should return correct tier for tier 3 (Expert)', () => {
			const tier = getMasteryTierByNumber(3);
			expect(tier.name).toBe('Expert');
			expect(tier.bonus).toBe(6);
		});

		it('should return correct tier for tier 4 (Master)', () => {
			const tier = getMasteryTierByNumber(4);
			expect(tier.name).toBe('Master');
			expect(tier.bonus).toBe(8);
		});

		it('should return correct tier for tier 5 (Grandmaster)', () => {
			const tier = getMasteryTierByNumber(5);
			expect(tier.name).toBe('Grandmaster');
			expect(tier.bonus).toBe(10);
		});

		it('should throw error for invalid tier number', () => {
			expect(() => getMasteryTierByNumber(6)).toThrow();
			expect(() => getMasteryTierByNumber(-1)).toThrow();
		});
	});

	describe('getMasteryTierByName Function', () => {
		it('should return Untrained tier by name', () => {
			const tier = getMasteryTierByName('Untrained');
			expect(tier).toBeDefined();
			expect(tier?.tier).toBe(0);
			expect(tier?.bonus).toBe(0);
		});

		it('should return Novice tier by name', () => {
			const tier = getMasteryTierByName('Novice');
			expect(tier).toBeDefined();
			expect(tier?.tier).toBe(1);
			expect(tier?.bonus).toBe(2);
		});

		it('should return Adept tier by name', () => {
			const tier = getMasteryTierByName('Adept');
			expect(tier).toBeDefined();
			expect(tier?.tier).toBe(2);
		});

		it('should return Expert tier by name', () => {
			const tier = getMasteryTierByName('Expert');
			expect(tier).toBeDefined();
			expect(tier?.tier).toBe(3);
		});

		it('should return Master tier by name', () => {
			const tier = getMasteryTierByName('Master');
			expect(tier).toBeDefined();
			expect(tier?.tier).toBe(4);
		});

		it('should return Grandmaster tier by name', () => {
			const tier = getMasteryTierByName('Grandmaster');
			expect(tier).toBeDefined();
			expect(tier?.tier).toBe(5);
		});

		it('should return undefined for invalid name', () => {
			const tier = getMasteryTierByName('Invalid');
			expect(tier).toBeUndefined();
		});

		it('should be case-sensitive', () => {
			const tier1 = getMasteryTierByName('novice'); // lowercase
			const tier2 = getMasteryTierByName('Novice'); // correct case
			expect(tier1).toBeUndefined();
			expect(tier2).toBeDefined();
		});
	});

	describe('Level Threshold Enforcement', () => {
		it('should enforce Novice (tier 1) at levels 1-4', () => {
			for (let level = 1; level <= 4; level++) {
				const caps = getLevelCaps(level);
				expect(caps.maxSkillMasteryTier, `Level ${level} should allow Novice`).toBe(1);
			}
		});

		it('should allow Adept (tier 2) at levels 5-9', () => {
			for (let level = 5; level <= 9; level++) {
				const caps = getLevelCaps(level);
				expect(caps.maxSkillMasteryTier, `Level ${level} should allow Adept`).toBe(2);
			}
		});

		it('should allow Expert (tier 3) at levels 10-14', () => {
			for (let level = 10; level <= 14; level++) {
				const caps = getLevelCaps(level);
				expect(caps.maxSkillMasteryTier, `Level ${level} should allow Expert`).toBe(3);
			}
		});

		it('should allow Master (tier 4) at levels 15-19', () => {
			for (let level = 15; level <= 19; level++) {
				const caps = getLevelCaps(level);
				expect(caps.maxSkillMasteryTier, `Level ${level} should allow Master`).toBe(4);
			}
		});

		it('should allow Grandmaster (tier 5) at level 20', () => {
			const caps = getLevelCaps(20);
			expect(caps.maxSkillMasteryTier).toBe(5);
		});
	});

	describe('Attribute Cap Thresholds', () => {
		it('should have +3 attribute cap at levels 1-4', () => {
			for (let level = 1; level <= 4; level++) {
				const caps = getLevelCaps(level);
				expect(caps.maxAttributeValue, `Level ${level} should have +3 max`).toBe(3);
			}
		});

		it('should have +4 attribute cap at levels 5-9', () => {
			for (let level = 5; level <= 9; level++) {
				const caps = getLevelCaps(level);
				expect(caps.maxAttributeValue, `Level ${level} should have +4 max`).toBe(4);
			}
		});

		it('should have +5 attribute cap at levels 10-14', () => {
			for (let level = 10; level <= 14; level++) {
				const caps = getLevelCaps(level);
				expect(caps.maxAttributeValue, `Level ${level} should have +5 max`).toBe(5);
			}
		});

		it('should have +6 attribute cap at levels 15-19', () => {
			for (let level = 15; level <= 19; level++) {
				const caps = getLevelCaps(level);
				expect(caps.maxAttributeValue, `Level ${level} should have +6 max`).toBe(6);
			}
		});

		it('should have +7 attribute cap at level 20', () => {
			const caps = getLevelCaps(20);
			expect(caps.maxAttributeValue).toBe(7);
		});
	});

	describe('Cap Progression Consistency', () => {
		it('should have attribute caps never decreasing', () => {
			for (let level = 2; level <= 20; level++) {
				const current = getLevelCaps(level);
				const previous = getLevelCaps(level - 1);
				expect(current.maxAttributeValue).toBeGreaterThanOrEqual(previous.maxAttributeValue);
			}
		});

		it('should have mastery tiers never decreasing', () => {
			for (let level = 2; level <= 20; level++) {
				const current = getLevelCaps(level);
				const previous = getLevelCaps(level - 1);
				expect(current.maxSkillMasteryTier).toBeGreaterThanOrEqual(previous.maxSkillMasteryTier);
			}
		});

		it('should have cap increases at correct intervals', () => {
			// Attribute caps should increase every 5 levels
			const level1Cap = getLevelCaps(1).maxAttributeValue;
			const level5Cap = getLevelCaps(5).maxAttributeValue;
			const level10Cap = getLevelCaps(10).maxAttributeValue;
			const level15Cap = getLevelCaps(15).maxAttributeValue;
			const level20Cap = getLevelCaps(20).maxAttributeValue;
			
			expect(level5Cap).toBe(level1Cap + 1);
			expect(level10Cap).toBe(level5Cap + 1);
			expect(level15Cap).toBe(level10Cap + 1);
			expect(level20Cap).toBe(level15Cap + 1);
		});

		it('should have mastery tier increases at correct intervals', () => {
			// Mastery tiers should increase every 5 levels
			const level1Tier = getLevelCaps(1).maxSkillMasteryTier;
			const level5Tier = getLevelCaps(5).maxSkillMasteryTier;
			const level10Tier = getLevelCaps(10).maxSkillMasteryTier;
			const level15Tier = getLevelCaps(15).maxSkillMasteryTier;
			const level20Tier = getLevelCaps(20).maxSkillMasteryTier;
			
			expect(level5Tier).toBe(level1Tier + 1);
			expect(level10Tier).toBe(level5Tier + 1);
			expect(level15Tier).toBe(level10Tier + 1);
			expect(level20Tier).toBe(level15Tier + 1);
		});
	});

	describe('Data Coverage Statistics', () => {
		it('should report cap distribution', () => {
			const attributeCapCounts = new Map<number, number>();
			const masteryTierCounts = new Map<number, number>();
			
			for (const entry of LEVEL_CAPS_TABLE) {
				attributeCapCounts.set(
					entry.maxAttributeValue,
					(attributeCapCounts.get(entry.maxAttributeValue) || 0) + 1
				);
				masteryTierCounts.set(
					entry.maxSkillMasteryTier,
					(masteryTierCounts.get(entry.maxSkillMasteryTier) || 0) + 1
				);
			}
			
			console.log('📊 Level Caps Distribution:');
			console.log('   Attribute Caps:', Array.from(attributeCapCounts.entries()).map(([cap, count]) => `+${cap}(${count})`).join(', '));
			console.log('   Mastery Tiers:', Array.from(masteryTierCounts.entries()).map(([tier, count]) => `T${tier}(${count})`).join(', '));
			
			expect(attributeCapCounts.size).toBeGreaterThanOrEqual(3);
			expect(masteryTierCounts.size).toBeGreaterThanOrEqual(3);
		});
	});
});

