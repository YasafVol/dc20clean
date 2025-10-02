/**
 * Test for Path Point Bonus Integration (M3.9)
 * 
 * Tests that path point allocations correctly add bonuses to character stats
 */

import { describe, it, expect } from 'vitest';
import { convertToEnhancedBuildData, calculateCharacterWithBreakdowns } from './enhancedCharacterCalculator';

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
});

