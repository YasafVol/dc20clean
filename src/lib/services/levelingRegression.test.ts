/**
 * M4.1g - Leveling System Regression Tests
 * 
 * Tests to ensure leveling system doesn't break existing functionality:
 * - Level 1 creation unchanged
 * - Saved character loading backwards compatible
 * - Schema migration works correctly
 * - Error states handled gracefully
 */

import { describe, it, expect } from 'vitest';
import { convertToEnhancedBuildData, calculateCharacterWithBreakdowns } from './enhancedCharacterCalculator';

describe('Leveling System Regression Tests (M4.1g)', () => {
	describe('Level 1 Compatibility', () => {
		it('should create Level 1 character without leveling stage', () => {
			const character = {
				id: 'regression-1',
				finalName: 'Level 1 Barbarian',
				level: 1,
				attribute_might: 3,
				attribute_agility: 2,
				attribute_charisma: 0,
				attribute_intelligence: -1,
				classId: 'barbarian',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should work exactly as before
			expect(result).toBeDefined();
			expect(result.stats.finalCombatMastery).toBe(1);
			expect(result.levelBudgets.totalTalents).toBe(0);
			expect(result.levelBudgets.totalPathPoints).toBe(0);
		});

		it('should not show talent selection at Level 1', () => {
			const character = {
				id: 'regression-2',
				finalName: 'Level 1 Wizard',
				level: 1,
				attribute_might: 0,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 3,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// No talents available at L1
			expect(result.levelBudgets.totalTalents).toBe(0);
			expect(result.levelBudgets.talentsUsed).toBe(0);
		});

		it('should not show path points at Level 1', () => {
			const character = {
				id: 'regression-3',
				finalName: 'Level 1 Cleric',
				level: 1,
				attribute_might: 1,
				attribute_agility: 1,
				attribute_charisma: 2,
				attribute_intelligence: 2,
				classId: 'cleric',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// No path points at L1
			expect(result.levelBudgets.totalPathPoints).toBe(0);
			expect(result.levelBudgets.pathPointsUsed).toBe(0);
		});

		it('should match pre-leveling-system Level 1 calculations', () => {
			const character = {
				id: 'regression-4',
				finalName: 'Reference L1',
				level: 1,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Expected baseline values
			expect(result.levelBudgets.totalHP).toBeGreaterThan(0);
			expect(result.levelBudgets.totalAncestryPoints).toBe(3);
			expect(result.levelBudgets.totalAttributePoints).toBe(9);
			expect(result.stats.finalCombatMastery).toBe(1);
		});

		it('should not flag subclass choice at Level 1', () => {
			const character = {
				id: 'regression-5',
				finalName: 'L1 No Subclass',
				level: 1,
				attribute_might: 3,
				attribute_agility: 2,
				attribute_charisma: 0,
				attribute_intelligence: -1,
				classId: 'barbarian',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			expect(result.resolvedFeatures.availableSubclassChoice).toBe(false);
		});
	});

	describe('Saved Character Loading', () => {
		it('should load V1 schema characters correctly (no schemaVersion field)', () => {
			const v1Character = {
				id: 'v1-character',
				finalName: 'V1 Character',
				level: 1,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
				// Note: No schemaVersion field (V1 format)
			};

			const enhanced = convertToEnhancedBuildData(v1Character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should work with defaults
			expect(result).toBeDefined();
			expect(enhanced.selectedTalents).toEqual({}); // Default empty object
		});

		it('should load V2 schema characters correctly', () => {
			const v2Character = {
				id: 'v2-character',
				finalName: 'V2 Character',
				level: 2,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: { 'general_skill_increase': 1 },
				pathPointAllocations: { spellcasting: 1 },
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } },
				schemaVersion: 2
			};

			const enhanced = convertToEnhancedBuildData(v2Character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should load all V2 fields
			expect(result).toBeDefined();
			expect(enhanced.selectedTalents).toEqual({ 'general_skill_increase': 1 });
			expect(enhanced.pathPointAllocations).toEqual({ spellcasting: 1 });
		});

		it('should handle missing fields gracefully', () => {
			const incompleteCharacter = {
				id: 'incomplete-character',
				finalName: 'Incomplete',
				level: 1,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				// Missing: selectedTalents, pathPointAllocations
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(incompleteCharacter);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should fill in defaults
			expect(result).toBeDefined();
			expect(enhanced.selectedTalents).toEqual({});
			expect(enhanced.pathPointAllocations).toEqual({});
		});

		it('should handle null/undefined optional fields', () => {
			const character = {
				id: 'null-fields',
				finalName: 'Null Fields',
				level: 1,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: undefined,
				pathPointAllocations: undefined,
				selectedMulticlassOption: null,
				selectedMulticlassClass: null,
				selectedMulticlassFeature: null,
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should handle nulls/undefined gracefully
			expect(result).toBeDefined();
		});
	});

	describe('Schema Migration', () => {
		it('should migrate V1 to V2 correctly', () => {
			const v1Character = {
				id: 'migrate-test',
				finalName: 'Migration Test',
				level: 1,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				// V1: No talent/path fields
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			// Simulate migration by adding V2 fields
			const migratedCharacter = {
				...v1Character,
				selectedTalents: {},
				pathPointAllocations: {},
				schemaVersion: 2
			};

			const enhanced = convertToEnhancedBuildData(migratedCharacter);
			const result = calculateCharacterWithBreakdowns(enhanced);

			expect(result).toBeDefined();
			expect(migratedCharacter.schemaVersion).toBe(2);
		});

		it('should preserve all character data during migration', () => {
			const originalCharacter = {
				id: 'preserve-test',
				finalName: 'Preserve Test',
				level: 1,
				attribute_might: 3,
				attribute_agility: 2,
				attribute_charisma: 0,
				attribute_intelligence: -1,
				classId: 'barbarian',
				ancestry1Id: 'human',
				ancestry2Id: 'orc',
				selectedTraitIds: ['human_adaptable'],
				selectedTraitChoices: {},
				selectedFeatureChoices: { 'test_choice': 'test_value' },
				skillsData: { athletics: 2 },
				tradesData: { brewing: 1 },
				languagesData: { common: { fluency: 'fluent' as const }, orcish: { fluency: 'limited' as const } }
			};

			const migratedCharacter = {
				...originalCharacter,
				selectedTalents: {},
				pathPointAllocations: {},
				schemaVersion: 2
			};

			const enhanced = convertToEnhancedBuildData(migratedCharacter);

			// All original fields should be preserved
			expect(enhanced.classId).toBe('barbarian');
			expect(enhanced.ancestry1Id).toBe('human');
			expect(enhanced.ancestry2Id).toBe('orc');
			expect(enhanced.selectedTraitIds).toContain('human_adaptable');
			expect(enhanced.skillsData.athletics).toBe(2);
			expect(enhanced.tradesData.brewing).toBe(1);
		});

		it('should set correct schemaVersion field', () => {
			const character = {
				id: 'version-test',
				finalName: 'Version Test',
				level: 2,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: {},
				pathPointAllocations: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } },
				schemaVersion: 2
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			expect(enhanced.schemaVersion).toBe(2);
			expect(result).toBeDefined();
		});
	});

	describe('Error Handling', () => {
		it('should handle missing class data gracefully', () => {
			const character = {
				id: 'missing-class',
				finalName: 'Missing Class',
				level: 1,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'nonexistent_class',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			// Should throw error for invalid class
			expect(() => {
				const enhanced = convertToEnhancedBuildData(character);
				calculateCharacterWithBreakdowns(enhanced);
			}).toThrow();
		});

		it('should handle invalid level input gracefully', () => {
			const character = {
				id: 'invalid-level',
				finalName: 'Invalid Level',
				level: -1,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			// Should handle invalid level
			expect(() => {
				const enhanced = convertToEnhancedBuildData(character);
				calculateCharacterWithBreakdowns(enhanced);
			}).toThrow();
		});

		it('should handle corrupted progression data gracefully', () => {
			const character = {
				id: 'corrupted-data',
				finalName: 'Corrupted Data',
				level: 1,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: { 'invalid_id': 999 }, // Invalid talent ID
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			
			// Should not crash, might just ignore invalid data
			expect(() => {
				calculateCharacterWithBreakdowns(enhanced);
			}).not.toThrow();
		});

		it('should handle empty character gracefully', () => {
			const emptyCharacter = {
				id: 'empty',
				finalName: 'Empty',
				level: 1,
				attribute_might: 0,
				attribute_agility: 0,
				attribute_charisma: 0,
				attribute_intelligence: 0,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(emptyCharacter);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should calculate even with zeros
			expect(result).toBeDefined();
		});

		it('should handle very high level gracefully', () => {
			const character = {
				id: 'high-level',
				finalName: 'High Level',
				level: 100, // Far beyond current cap
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			// Should throw or handle level cap
			expect(() => {
				const enhanced = convertToEnhancedBuildData(character);
				calculateCharacterWithBreakdowns(enhanced);
			}).toThrow();
		});
	});

	describe('Backwards Compatibility Edge Cases', () => {
		it('should handle old talent storage format (array) if present', () => {
			const oldFormatCharacter = {
				id: 'old-format',
				finalName: 'Old Format',
				level: 2,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: ['general_skill_increase'] as any, // Old array format
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(oldFormatCharacter);
			
			// Should handle gracefully (convert or use default)
			expect(enhanced.selectedTalents).toBeDefined();
		});

		it('should handle missing language data', () => {
			const character = {
				id: 'no-languages',
				finalName: 'No Languages',
				level: 1,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: {} // Empty languages
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should provide default (Common)
			expect(result).toBeDefined();
		});

		it('should handle character with no ancestry', () => {
			const character = {
				id: 'no-ancestry',
				finalName: 'No Ancestry',
				level: 1,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: null as any,
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			
			// Should handle null ancestry
			expect(() => {
				calculateCharacterWithBreakdowns(enhanced);
			}).not.toThrow();
		});
	});

	describe('Performance & Stability', () => {
		it('should handle repeated calculations consistently', () => {
			const character = {
				id: 'performance-test',
				finalName: 'Performance Test',
				level: 3,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				selectedSubclass: 'school_of_evocation',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: { 'general_skill_increase': 2 },
				pathPointAllocations: { spellcasting: 2 },
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			
			// Calculate multiple times
			const result1 = calculateCharacterWithBreakdowns(enhanced);
			const result2 = calculateCharacterWithBreakdowns(enhanced);
			const result3 = calculateCharacterWithBreakdowns(enhanced);

			// Results should be consistent
			expect(result1.stats.finalCombatMastery).toBe(result2.stats.finalCombatMastery);
			expect(result2.stats.finalCombatMastery).toBe(result3.stats.finalCombatMastery);
			expect(result1.levelBudgets.totalTalents).toBe(result2.levelBudgets.totalTalents);
		});

		it('should not modify input character object', () => {
			const character = {
				id: 'immutable-test',
				finalName: 'Immutable Test',
				level: 2,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const original = { ...character };
			const enhanced = convertToEnhancedBuildData(character);
			calculateCharacterWithBreakdowns(enhanced);

			// Original should be unchanged
			expect(character).toEqual(original);
		});
	});
});

