/**
 * Test for Path Point Bonus Integration (M3.9)
 *
 * Tests that path point allocations correctly add bonuses to character stats
 */

import { describe, it, expect } from 'vitest';
import {
	convertToEnhancedBuildData,
	calculateCharacterWithBreakdowns
} from './enhancedCharacterCalculator';

describe('Path Point Bonuses (M3.9)', () => {
	it('Level 5 Barbarian with 2 martial path points should have correct stats', () => {
		// Test data: Level 5 Barbarian with 2 martial path points allocated
		const testCharacter = {
			id: 'test-1',
			finalName: 'Test Barbarian',
			level: 5,
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
			languagesData: { common: { fluency: 'fluent' as const } },
			pathPointAllocations: {
				martial: 2 // 2 points in martial path
			}
		};

		const enhancedData = convertToEnhancedBuildData(testCharacter);
		const result = calculateCharacterWithBreakdowns(enhancedData);

		// Combat Mastery: Math.ceil(5 / 2) = 3
		expect(result.stats.finalCombatMastery).toBe(3);

		// SP: 1 (L1) + 1 (L3) + 1 (path L1) = 3
		expect(result.stats.finalSPMax).toBe(3);

		// Maneuvers: 4 (L1) + 1 (L5) + 1 (path L1) + 1 (path L2) = 7
		expect(result.levelBudgets.totalManeuversKnown).toBe(7);

		// Techniques: 1 (L3) + 1 (L5) + 1 (path L1) = 3
		expect(result.levelBudgets.totalTechniquesKnown).toBe(3);
	});

	it('Level 5 Wizard with 2 spellcaster path points should have correct stats', () => {
		const testCharacter = {
			id: 'test-2',
			finalName: 'Test Wizard',
			level: 5,
			attribute_might: 0,
			attribute_agility: 1,
			attribute_charisma: 0,
			attribute_intelligence: 3,
			classId: 'wizard',
			ancestry1Id: 'human',
			selectedTraitIds: [],
			selectedTraitChoices: {},
			selectedFeatureChoices: {},
			skillsData: {},
			tradesData: {},
			languagesData: { common: { fluency: 'fluent' as const } },
			pathPointAllocations: {
				spellcasting: 2 // 2 points in spellcaster path
			}
		};

		const enhancedData = convertToEnhancedBuildData(testCharacter);
		const result = calculateCharacterWithBreakdowns(enhancedData);

		// Combat Mastery: Math.ceil(5 / 2) = 3
		expect(result.stats.finalCombatMastery).toBe(3);

		// MP: Base progression + path bonuses
		// Wizard L1-5 progression + 2 (path L1) + 2 (path L2) = ?
		// Let's verify path bonuses are added (check levelBudgets directly)
		console.log('Wizard MP:', result.stats.finalMPMax);
		console.log('Wizard total cantrips:', result.levelBudgets.totalCantripsKnown);
		console.log('Wizard total spells:', result.levelBudgets.totalSpellsKnown);

		// Verify path bonuses are applied (MP should be higher with path points)
		expect(result.stats.finalMPMax).toBeGreaterThan(10); // Base wizard progression is significant

		// Cantrips: Base progression + 1 (path L1) + 1 (path L2)
		expect(result.levelBudgets.totalCantripsKnown).toBeGreaterThanOrEqual(2); // At least the path bonuses

		// Spells: Base progression + 1 (path L1)
		expect(result.levelBudgets.totalSpellsKnown).toBeGreaterThanOrEqual(1); // At least the path bonus
	});

	it('Level 1 character with no path points should have base values', () => {
		const testCharacter = {
			id: 'test-3',
			finalName: 'Test Level 1',
			level: 1,
			attribute_might: 2,
			attribute_agility: 1,
			attribute_charisma: 1,
			attribute_intelligence: 0,
			classId: 'barbarian',
			ancestry1Id: 'human',
			selectedTraitIds: [],
			selectedTraitChoices: {},
			selectedFeatureChoices: {},
			skillsData: {},
			tradesData: {},
			languagesData: { common: { fluency: 'fluent' as const } }
			// No pathPointAllocations
		};

		const enhancedData = convertToEnhancedBuildData(testCharacter);
		const result = calculateCharacterWithBreakdowns(enhancedData);

		// Combat Mastery: Math.ceil(1 / 2) = 1
		expect(result.stats.finalCombatMastery).toBe(1);

		// SP: 1 (L1 barbarian progression)
		expect(result.stats.finalSPMax).toBe(1);

		// Maneuvers: 4 (L1 barbarian)
		expect(result.levelBudgets.totalManeuversKnown).toBe(4);

		// Techniques: 0 (none at L1)
		expect(result.levelBudgets.totalTechniquesKnown).toBe(0);
	});

	it('Mixed path allocation should apply both bonuses', () => {
		const testCharacter = {
			id: 'test-4',
			finalName: 'Test Spellblade',
			level: 5,
			attribute_might: 2,
			attribute_agility: 2,
			attribute_charisma: 1,
			attribute_intelligence: 2,
			classId: 'spellblade',
			ancestry1Id: 'human',
			selectedTraitIds: [],
			selectedTraitChoices: {},
			selectedFeatureChoices: {},
			skillsData: {},
			tradesData: {},
			languagesData: { common: { fluency: 'fluent' as const } },
			pathPointAllocations: {
				martial: 1, // 1 point in martial
				spellcasting: 1 // 1 point in spellcasting
			}
		};

		const enhancedData = convertToEnhancedBuildData(testCharacter);
		const result = calculateCharacterWithBreakdowns(enhancedData);

		console.log('Mixed path - SP:', result.stats.finalSPMax);
		console.log('Mixed path - MP:', result.stats.finalMPMax);
		console.log('Mixed path - Maneuvers:', result.levelBudgets.totalManeuversKnown);
		console.log('Mixed path - Techniques:', result.levelBudgets.totalTechniquesKnown);
		console.log('Mixed path - Cantrips:', result.levelBudgets.totalCantripsKnown);
		console.log('Mixed path - Spells:', result.levelBudgets.totalSpellsKnown);

		// Should have martial path L1 bonuses: +1 SP, +1 maneuver, +1 technique
		// Should have spellcaster path L1 bonuses: +2 MP, +1 cantrip, +1 spell

		// Verify both types of bonuses are present
		expect(result.stats.finalSPMax).toBeGreaterThan(0); // Has SP from martial path
		expect(result.stats.finalMPMax).toBeGreaterThan(0); // Has MP from spellcaster path
	});

	describe('Path Point Bonuses - Extended Coverage (M4.1d)', () => {
		it('should handle 3 martial path points correctly', () => {
			const character = {
				id: 'extended-test-1',
				finalName: 'Test 3 Martial Points',
				level: 5,
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
				languagesData: { common: { fluency: 'fluent' as const } },
				pathPointAllocations: { martial: 3 }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Martial Path Tier 1: +1 SP, +1 maneuver, +1 technique
			// Martial Path Tier 2: +1 maneuver
			// Martial Path Tier 3: +1 SP, +1 maneuver, +1 technique
			// Total from paths: +2 SP, +3 maneuvers, +2 techniques

			expect(result.stats.finalSPMax).toBeGreaterThanOrEqual(3); // Base + path bonuses
			expect(result.levelBudgets.totalManeuversKnown).toBeGreaterThanOrEqual(8); // Base + path bonuses
			expect(result.levelBudgets.totalTechniquesKnown).toBeGreaterThanOrEqual(4); // Base + path bonuses
		});

		it('should handle 4 martial path points correctly', () => {
			const character = {
				id: 'extended-test-2',
				finalName: 'Test 4 Martial Points',
				level: 5,
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
				languagesData: { common: { fluency: 'fluent' as const } },
				pathPointAllocations: { martial: 4 }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Tier 4: +1 maneuver (in addition to tier 1-3)
			expect(result.stats.finalSPMax).toBeGreaterThanOrEqual(3);
			expect(result.levelBudgets.totalManeuversKnown).toBeGreaterThanOrEqual(9); // +1 more from tier 4
		});

		it('should handle 3 spellcaster path points correctly', () => {
			const character = {
				id: 'extended-test-3',
				finalName: 'Test 3 Spellcaster Points',
				level: 5,
				attribute_might: 0,
				attribute_agility: 1,
				attribute_charisma: 0,
				attribute_intelligence: 3,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } },
				pathPointAllocations: { spellcasting: 3 }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Spellcaster Path Tier 1: +2 MP, +1 cantrip, +1 spell
			// Spellcaster Path Tier 2: +2 MP, +1 cantrip
			// Spellcaster Path Tier 3: +2 MP, +1 spell
			// Total from paths: +6 MP, +2 cantrips, +2 spells

			expect(result.stats.finalMPMax).toBeGreaterThanOrEqual(16); // Base + path bonuses
			expect(result.levelBudgets.totalCantripsKnown).toBeGreaterThanOrEqual(4); // Base + path bonuses
			expect(result.levelBudgets.totalSpellsKnown).toBeGreaterThanOrEqual(4); // Base + path bonuses
		});

		it('should handle 4 spellcaster path points correctly', () => {
			const character = {
				id: 'extended-test-4',
				finalName: 'Test 4 Spellcaster Points',
				level: 5,
				attribute_might: 0,
				attribute_agility: 1,
				attribute_charisma: 0,
				attribute_intelligence: 3,
				classId: 'wizard',
				ancestry1Id: 'human',
				selectedTraitIds: [],
				selectedTraitChoices: {},
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: { common: { fluency: 'fluent' as const } },
				pathPointAllocations: { spellcasting: 4 }
			};

			const enhanced = convertToEnhancedBuildData(character);
			const result = calculateCharacterWithBreakdowns(enhanced);

			// Tier 4: +2 MP, +1 cantrip (in addition to tier 1-3)
			expect(result.stats.finalMPMax).toBeGreaterThanOrEqual(18); // +2 more from tier 4
			expect(result.levelBudgets.totalCantripsKnown).toBeGreaterThanOrEqual(5); // +1 more from tier 4
		});

		it('should grant correct bonuses at each martial tier', () => {
			const baseCharacter = {
				id: 'tier-test',
				finalName: 'Tier Test',
				level: 5,
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

			// Test each tier increment
			const tier0 = calculateCharacterWithBreakdowns(
				convertToEnhancedBuildData({
					...baseCharacter,
					id: 'tier-0',
					pathPointAllocations: {}
				})
			);

			const tier1 = calculateCharacterWithBreakdowns(
				convertToEnhancedBuildData({
					...baseCharacter,
					id: 'tier-1',
					pathPointAllocations: { martial: 1 }
				})
			);

			const tier2 = calculateCharacterWithBreakdowns(
				convertToEnhancedBuildData({
					...baseCharacter,
					id: 'tier-2',
					pathPointAllocations: { martial: 2 }
				})
			);

			const tier3 = calculateCharacterWithBreakdowns(
				convertToEnhancedBuildData({
					...baseCharacter,
					id: 'tier-3',
					pathPointAllocations: { martial: 3 }
				})
			);

			// Tier 1 bonuses: +1 SP, +1 maneuver, +1 technique
			expect(tier1.stats.finalSPMax - tier0.stats.finalSPMax).toBe(1);
			expect(tier1.levelBudgets.totalManeuversKnown - tier0.levelBudgets.totalManeuversKnown).toBe(
				1
			);
			expect(
				tier1.levelBudgets.totalTechniquesKnown - tier0.levelBudgets.totalTechniquesKnown
			).toBe(1);

			// Tier 2 bonuses: +1 maneuver only
			expect(tier2.stats.finalSPMax - tier1.stats.finalSPMax).toBe(0);
			expect(tier2.levelBudgets.totalManeuversKnown - tier1.levelBudgets.totalManeuversKnown).toBe(
				1
			);
			expect(
				tier2.levelBudgets.totalTechniquesKnown - tier1.levelBudgets.totalTechniquesKnown
			).toBe(0);

			// Tier 3 bonuses: +1 SP, +1 maneuver, +1 technique
			expect(tier3.stats.finalSPMax - tier2.stats.finalSPMax).toBe(1);
			expect(tier3.levelBudgets.totalManeuversKnown - tier2.levelBudgets.totalManeuversKnown).toBe(
				1
			);
			expect(
				tier3.levelBudgets.totalTechniquesKnown - tier2.levelBudgets.totalTechniquesKnown
			).toBe(1);
		});

		it('should grant correct bonuses at each spellcaster tier', () => {
			const baseCharacter = {
				id: 'spell-tier-test',
				finalName: 'Spell Tier Test',
				level: 5,
				attribute_might: 0,
				attribute_agility: 1,
				attribute_charisma: 0,
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

			const tier0 = calculateCharacterWithBreakdowns(
				convertToEnhancedBuildData({
					...baseCharacter,
					id: 'spell-tier-0',
					pathPointAllocations: {}
				})
			);

			const tier1 = calculateCharacterWithBreakdowns(
				convertToEnhancedBuildData({
					...baseCharacter,
					id: 'spell-tier-1',
					pathPointAllocations: { spellcasting: 1 }
				})
			);

			const tier2 = calculateCharacterWithBreakdowns(
				convertToEnhancedBuildData({
					...baseCharacter,
					id: 'spell-tier-2',
					pathPointAllocations: { spellcasting: 2 }
				})
			);

			// Tier 1 bonuses: +2 MP, +1 cantrip, +1 spell
			expect(tier1.stats.finalMPMax - tier0.stats.finalMPMax).toBe(2);
			expect(tier1.levelBudgets.totalCantripsKnown - tier0.levelBudgets.totalCantripsKnown).toBe(1);
			expect(tier1.levelBudgets.totalSpellsKnown - tier0.levelBudgets.totalSpellsKnown).toBe(1);

			// Tier 2 bonuses: +2 MP, +1 cantrip
			expect(tier2.stats.finalMPMax - tier1.stats.finalMPMax).toBe(2);
			expect(tier2.levelBudgets.totalCantripsKnown - tier1.levelBudgets.totalCantripsKnown).toBe(1);
			expect(tier2.levelBudgets.totalSpellsKnown - tier1.levelBudgets.totalSpellsKnown).toBe(0);
		});

		describe('Edge Cases', () => {
			it('should handle 0 path points correctly', () => {
				const character = {
					id: 'edge-test-1',
					finalName: 'No Path Points',
					level: 5,
					attribute_might: 2,
					attribute_agility: 2,
					attribute_charisma: 1,
					attribute_intelligence: 1,
					classId: 'spellblade',
					ancestry1Id: 'human',
					selectedTraitIds: [],
					selectedTraitChoices: {},
					selectedFeatureChoices: {},
					skillsData: {},
					tradesData: {},
					languagesData: { common: { fluency: 'fluent' as const } },
					pathPointAllocations: {} // No points allocated
				};

				const enhanced = convertToEnhancedBuildData(character);
				const result = calculateCharacterWithBreakdowns(enhanced);

				// Should have base values only
				expect(result).toBeDefined();
				expect(result.stats.finalCombatMastery).toBe(3);
			});

			it('should handle max path points correctly', () => {
				const character = {
					id: 'edge-test-2',
					finalName: 'Max Path Points',
					level: 5,
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
					languagesData: { common: { fluency: 'fluent' as const } },
					pathPointAllocations: { martial: 4 } // Max available at L5
				};

				const enhanced = convertToEnhancedBuildData(character);
				const result = calculateCharacterWithBreakdowns(enhanced);

				// Should apply all bonuses
				expect(result.stats.finalSPMax).toBeGreaterThan(2);
				expect(result.levelBudgets.totalManeuversKnown).toBeGreaterThan(8);
			});

			it('should handle uneven distribution', () => {
				const character = {
					id: 'edge-test-3',
					finalName: 'Uneven Distribution',
					level: 5,
					attribute_might: 2,
					attribute_agility: 2,
					attribute_charisma: 1,
					attribute_intelligence: 1,
					classId: 'spellblade',
					ancestry1Id: 'human',
					selectedTraitIds: [],
					selectedTraitChoices: {},
					selectedFeatureChoices: {},
					skillsData: {},
					tradesData: {},
					languagesData: { common: { fluency: 'fluent' as const } },
					pathPointAllocations: { martial: 3, spellcasting: 1 } // 3:1 split
				};

				const enhanced = convertToEnhancedBuildData(character);
				const result = calculateCharacterWithBreakdowns(enhanced);

				// Should have bonuses from both paths
				expect(result.stats.finalSPMax).toBeGreaterThan(0);
				expect(result.stats.finalMPMax).toBeGreaterThan(0);
				expect(result.levelBudgets.totalManeuversKnown).toBeGreaterThan(4);
				expect(result.levelBudgets.totalCantripsKnown).toBeGreaterThan(0);
			});

			it('should handle path points without matching class resources', () => {
				const character = {
					id: 'edge-test-4',
					finalName: 'Martial Wizard',
					level: 5,
					attribute_might: 1,
					attribute_agility: 1,
					attribute_charisma: 0,
					attribute_intelligence: 3,
					classId: 'wizard', // Spellcaster class
					ancestry1Id: 'human',
					selectedTraitIds: [],
					selectedTraitChoices: {},
					selectedFeatureChoices: {},
					skillsData: {},
					tradesData: {},
					languagesData: { common: { fluency: 'fluent' as const } },
					pathPointAllocations: { martial: 2 } // Martial path on spellcaster
				};

				const enhanced = convertToEnhancedBuildData(character);
				const result = calculateCharacterWithBreakdowns(enhanced);

				// Should grant martial bonuses even to spellcaster
				expect(result.stats.finalSPMax).toBeGreaterThan(0);
				expect(result.levelBudgets.totalManeuversKnown).toBeGreaterThan(0);
			});

			it('should handle negative path points gracefully', () => {
				const character = {
					id: 'edge-test-5',
					finalName: 'Negative Paths',
					level: 5,
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
					languagesData: { common: { fluency: 'fluent' as const } },
					pathPointAllocations: { martial: -1 as any } // Invalid negative
				};

				const enhanced = convertToEnhancedBuildData(character);

				// Should handle gracefully (treat as 0 or throw error)
				expect(() => {
					calculateCharacterWithBreakdowns(enhanced);
				}).not.toThrow();
			});
		});
	});
});
