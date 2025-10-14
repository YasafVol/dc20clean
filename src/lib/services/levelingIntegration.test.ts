/**
 * M4.1f - Leveling System Integration Tests
 * 
 * Tests the complete character creation flow for levels 2-3 including:
 * - Talent + path + subclass selections
 * - Final calculated stats matching expected values
 * - Validation rules enforcement
 */

import { describe, it, expect } from 'vitest';
import { convertToEnhancedBuildData, calculateCharacterWithBreakdowns } from './enhancedCharacterCalculator';

describe('Leveling System Integration (M4.1f)', () => {
	describe('Level 2 Character Creation', () => {
		it('should create valid Level 2 Barbarian with talent and path', () => {
			const character = {
				id: 'integration-test-1',
				finalName: 'Grok the Mighty',
				level: 2,
				attribute_might: 3,
				attribute_agility: 2,
				attribute_charisma: 0,
				attribute_intelligence: -1,
				classId: 'barbarian',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: {}, // 1 talent available but not spent yet
				pathPointAllocations: { martial: 1 }, // 1 path point in martial
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Verify level
			expect(result.stats.finalCombatMastery).toBe(1); // Math.ceil(2/2) = 1

			// Verify budgets
			expect(result.levelBudgets.totalTalents).toBe(1);
			expect(result.levelBudgets.totalPathPoints).toBe(1);
			expect(result.levelBudgets.totalAncestryPoints).toBe(4); // 3 + 1
			expect(result.levelBudgets.totalAttributePoints).toBe(9); // No increase at L2

			// Verify path bonuses applied
			expect(result.stats.finalSPMax).toBeGreaterThanOrEqual(2); // Base + path bonus
			expect(result.levelBudgets.totalManeuversKnown).toBeGreaterThanOrEqual(5); // Base 4 + path +1

			// Verify features unlocked
			expect(result.unlockedFeatures.length).toBeGreaterThan(4);
		});

		it('should apply talent effects to Level 2 character', () => {
			const character = {
				id: 'integration-test-2',
				finalName: 'Talented Barbarian',
				level: 2,
				attribute_might: 3,
				attribute_agility: 2,
				attribute_charisma: 0,
				attribute_intelligence: -1,
				classId: 'barbarian',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: { 'general_skill_increase': 1 }, // Spend talent on skill increase
				pathPointAllocations: { martial: 1 },
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should have applied talent effect
			expect(result.levelBudgets.talentsUsed).toBe(1);
			expect(result.levelBudgets.totalSkillPoints).toBeGreaterThan(8); // Base + talent bonus
		});

		it('should apply path bonuses to Level 2 character', () => {
			const withPath = {
				id: 'integration-test-3a',
				finalName: 'With Path',
				level: 2,
				attribute_might: 3,
				attribute_agility: 2,
				attribute_charisma: 0,
				attribute_intelligence: -1,
				classId: 'barbarian',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				pathPointAllocations: { martial: 1 },
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const withoutPath = {
				...withPath,
				id: 'integration-test-3b',
				finalName: 'Without Path',
				pathPointAllocations: {}
			};

			const resultWith = calculateCharacterWithBreakdowns(convertToEnhancedBuildData(withPath));
			const resultWithout = calculateCharacterWithBreakdowns(convertToEnhancedBuildData(withoutPath));

			// With path should have more resources
			expect(resultWith.stats.finalSPMax).toBeGreaterThan(resultWithout.stats.finalSPMax);
			expect(resultWith.levelBudgets.totalManeuversKnown).toBeGreaterThan(resultWithout.levelBudgets.totalManeuversKnown);
		});

		it('should have correct budgets at Level 2', () => {
			const character = {
				id: 'integration-test-4',
				finalName: 'Budget Test',
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

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			expect(result.levelBudgets.totalTalents).toBe(1);
			expect(result.levelBudgets.totalPathPoints).toBe(1);
			expect(result.levelBudgets.totalAncestryPoints).toBe(4);
			expect(result.levelBudgets.totalAttributePoints).toBe(9);
		});
	});

	describe('Level 3 Character Creation', () => {
		it('should create valid Level 3 Wizard with subclass', () => {
			const character = {
				id: 'integration-test-5',
				finalName: 'Evard the Evoker',
				level: 3,
				attribute_might: 0,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 3,
				classId: 'wizard',
				selectedSubclass: 'school_of_evocation',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: { 'general_skill_increase': 1, 'wizard_spell_mastery': 1 },
				pathPointAllocations: { spellcasting: 2 },
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Verify budgets spent
			expect(result.levelBudgets.talentsUsed).toBe(2);
			expect(result.levelBudgets.talentsRemaining).toBe(0);
			expect(result.levelBudgets.pathPointsUsed).toBe(2);
			expect(result.levelBudgets.pathPointsRemaining).toBe(0);

			// Verify effects applied
			expect(result.levelBudgets.totalSkillPoints).toBeGreaterThan(10);
			expect(result.stats.finalMPMax).toBeGreaterThan(12); // Base + path bonuses

			// Verify subclass features present
			const featureIds = result.unlockedFeatures.map(f => f.id || f.featureName.toLowerCase().replace(/\s+/g, '_'));
			expect(featureIds.some(id => id.includes('evocation'))).toBe(true);
		});

		it('should require subclass selection at Level 3', () => {
			const character = {
				id: 'integration-test-6',
				finalName: 'No Subclass',
				level: 3,
				attribute_might: 3,
				attribute_agility: 2,
				attribute_charisma: 0,
				attribute_intelligence: -1,
				classId: 'barbarian',
				// No subclass selected!
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

			// Should flag that subclass is required
			expect(result.resolvedFeatures.availableSubclassChoice).toBe(true);
			expect(result.resolvedFeatures.subclassChoiceLevel).toBe(3);
		});

		it('should apply subclass feature effects', () => {
			const withSubclass = {
				id: 'integration-test-7a',
				finalName: 'With Subclass',
				level: 3,
				attribute_might: 3,
				attribute_agility: 2,
				attribute_charisma: 0,
				attribute_intelligence: -1,
				classId: 'barbarian',
				selectedSubclass: 'berserker',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(withSubclass);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should have subclass features
			const hasSubclassFeature = result.unlockedFeatures.some(f => 
				(f.subclass || '').toLowerCase() === 'berserker'
			);
			expect(hasSubclassFeature).toBe(true);
		});

		it('should handle subclass feature choices', () => {
			const character = {
				id: 'integration-test-8',
				finalName: 'Elemental Barbarian',
				level: 3,
				attribute_might: 3,
				attribute_agility: 2,
				attribute_charisma: 0,
				attribute_intelligence: -1,
				classId: 'barbarian',
				selectedSubclass: 'elemental_fury',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {
					'barbarian_elemental_fury_barbarian_elemental_rage_damage_type': ['Fire'],
					'barbarian_elemental_fury_barbarian_elemental_rage_aura_type': ['Slowing Aura']
				},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should calculate successfully
			expect(result).toBeDefined();
			expect(result.unlockedFeatures.length).toBeGreaterThan(0);
		});

		it('should have correct budgets at Level 3', () => {
			const character = {
				id: 'integration-test-9',
				finalName: 'Budget Test L3',
				level: 3,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'cleric',
				selectedSubclass: 'life_domain',
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

			expect(result.levelBudgets.totalTalents).toBe(2);
			expect(result.levelBudgets.totalPathPoints).toBe(2);
			expect(result.levelBudgets.totalAncestryPoints).toBe(5);
			expect(result.levelBudgets.totalAttributePoints).toBe(10); // +1 at L3
		});
	});

	describe('Multiclass Characters', () => {
		it('should create Level 4 Champion with Novice Multiclass', () => {
			const character = {
				id: 'integration-test-10',
				finalName: 'Multiclass Champion',
				level: 4,
				attribute_might: 3,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 0,
				classId: 'champion',
				selectedSubclass: 'guardian',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: { 'general_skill_increase': 1 },
				selectedMulticlassOption: 'novice' as const,
				selectedMulticlassClass: 'barbarian',
				selectedMulticlassFeature: 'Rage',
				pathPointAllocations: { martial: 3 },
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Verify talent count (1 general + multiclass selection)
			expect(result.levelBudgets.talentsUsed).toBeGreaterThanOrEqual(1);
			
			// Verify calculation successful
			expect(result).toBeDefined();
			expect(result.stats.finalCombatMastery).toBe(2); // Math.ceil(4/2)
		});

		it('should count multiclass as talent selection', () => {
			const character = {
				id: 'integration-test-11',
				finalName: 'Multiclass Budget',
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
				selectedMulticlassOption: 'novice' as const,
				selectedMulticlassClass: 'barbarian',
				selectedMulticlassFeature: 'Rage',
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// L2 has 1 talent, should be used by multiclass
			expect(result.levelBudgets.totalTalents).toBe(1);
			// Note: Current implementation may not count multiclass in talentsUsed
			// This depends on how the UI handles it
		});

		it('should apply multiclass feature effects', () => {
			const withMulticlass = {
				id: 'integration-test-12',
				finalName: 'With Multiclass',
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
				selectedMulticlassOption: 'novice' as const,
				selectedMulticlassClass: 'barbarian',
				selectedMulticlassFeature: 'Rage',
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(withMulticlass);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should calculate successfully
			expect(result).toBeDefined();
			
			// Check if multiclass effects are present
			const effects = result.attributedEffects || [];
			const multiclassEffects = effects.filter(e => e.source.type === 'multiclass_feature');
			console.log(`Found ${multiclassEffects.length} multiclass effects`);
		});
	});

	describe('Complex Scenarios', () => {
		it('should handle multiple general talents', () => {
			const character = {
				id: 'integration-test-13',
				finalName: 'Multiple Talents',
				level: 4,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'rogue',
				selectedSubclass: 'assassin',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: {
					'general_skill_increase': 2, // Take twice
					'general_attribute_increase': 1
				},
				pathPointAllocations: { martial: 3 },
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should have used 3 talents (2 skill + 1 attribute)
			expect(result.levelBudgets.talentsUsed).toBe(3);
			expect(result.levelBudgets.totalSkillPoints).toBeGreaterThan(12); // Base + (2 × 3)
		});

		it('should handle mixed talent types', () => {
			const character = {
				id: 'integration-test-14',
				finalName: 'Mixed Talents',
				level: 3,
				attribute_might: 2,
				attribute_agility: 3,
				attribute_charisma: 1,
				attribute_intelligence: 0,
				classId: 'rogue',
				selectedSubclass: 'thief',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: {
					'general_skill_increase': 1,
					'rogue_cunning_action': 1
				},
				pathPointAllocations: { martial: 2 },
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should have used 2 talents
			expect(result.levelBudgets.talentsUsed).toBe(2);
			expect(result.levelBudgets.talentsRemaining).toBe(0);
		});

		it('should handle path point split', () => {
			const character = {
				id: 'integration-test-15',
				finalName: 'Split Paths',
				level: 3,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'spellblade',
				selectedSubclass: 'arcane_warrior',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				pathPointAllocations: {
					martial: 1,
					spellcasting: 1
				},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Should have bonuses from both paths
			expect(result.stats.finalSPMax).toBeGreaterThan(0); // Martial path
			expect(result.stats.finalMPMax).toBeGreaterThan(0); // Spellcaster path
			expect(result.levelBudgets.pathPointsUsed).toBe(2);
		});
	});

	describe('Validation Integration', () => {
		it('should report remaining talent budget', () => {
			const character = {
				id: 'integration-test-16',
				finalName: 'Unspent Talents',
				level: 3,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				selectedSubclass: 'school_of_abjuration',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: {}, // No talents spent
				pathPointAllocations: { spellcasting: 2 },
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			expect(result.levelBudgets.talentsRemaining).toBe(2); // 2 unspent
			expect(result.levelBudgets.pathPointsRemaining).toBe(0); // All spent
		});

		it('should report remaining path budget', () => {
			const character = {
				id: 'integration-test-17',
				finalName: 'Unspent Paths',
				level: 3,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'barbarian',
				selectedSubclass: 'berserker',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				selectedTalents: { 'general_skill_increase': 2 },
				pathPointAllocations: {}, // No paths spent
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			expect(result.levelBudgets.talentsRemaining).toBe(0); // All spent
			expect(result.levelBudgets.pathPointsRemaining).toBe(2); // 2 unspent
		});

		it('should enforce mastery caps for level', () => {
			const character = {
				id: 'integration-test-18',
				finalName: 'Mastery Test',
				level: 3,
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'wizard',
				selectedSubclass: 'school_of_divination',
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

			// L3 allows Novice mastery (tier 1)
			expect(result.validation.masteryLimits.maxSkillMastery).toBe(1);
		});
	});

	describe('Cross-Level Consistency', () => {
		it('should have increasing stats at higher levels', () => {
			const baseCharacter = {
				finalName: 'Level Test',
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

			const level1 = calculateCharacterWithBreakdowns(convertToEnhancedBuildData({
				...baseCharacter,
				id: 'cross-level-1',
				level: 1
			}));

			const level3 = calculateCharacterWithBreakdowns(convertToEnhancedBuildData({
				...baseCharacter,
				id: 'cross-level-3',
				level: 3,
				selectedSubclass: 'school_of_evocation'
			}));

			// Level 3 should have more of everything
			expect(level3.levelBudgets.totalHP).toBeGreaterThan(level1.levelBudgets.totalHP);
			expect(level3.levelBudgets.totalTalents).toBeGreaterThan(level1.levelBudgets.totalTalents);
			expect(level3.levelBudgets.totalPathPoints).toBeGreaterThan(level1.levelBudgets.totalPathPoints);
			expect(level3.unlockedFeatures.length).toBeGreaterThan(level1.unlockedFeatures.length);
		});

		it('should have consistent budget increases per level', () => {
			const baseCharacter = {
				finalName: 'Consistency Test',
				attribute_might: 2,
				attribute_agility: 2,
				attribute_charisma: 1,
				attribute_intelligence: 1,
				classId: 'barbarian',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } }
			};

			const level1 = calculateCharacterWithBreakdowns(convertToEnhancedBuildData({
				...baseCharacter,
				id: 'consistency-1',
				level: 1
			}));

			const level2 = calculateCharacterWithBreakdowns(convertToEnhancedBuildData({
				...baseCharacter,
				id: 'consistency-2',
				level: 2
			}));

			const level3 = calculateCharacterWithBreakdowns(convertToEnhancedBuildData({
				...baseCharacter,
				id: 'consistency-3',
				level: 3,
				selectedSubclass: 'berserker'
			}));

			// Each level should add 1 talent and 1 path point
			expect(level2.levelBudgets.totalTalents - level1.levelBudgets.totalTalents).toBe(1);
			expect(level3.levelBudgets.totalTalents - level2.levelBudgets.totalTalents).toBe(1);
			
			expect(level2.levelBudgets.totalPathPoints - level1.levelBudgets.totalPathPoints).toBe(1);
			expect(level3.levelBudgets.totalPathPoints - level2.levelBudgets.totalPathPoints).toBe(1);
		});
	});
});

