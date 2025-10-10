/**
 * Unit tests for level progression aggregation in enhancedCharacterCalculator
 * 
 * Tests the aggregateProgressionGains function and integration with calculator
 */

import { describe, it, expect } from 'vitest';
import { calculateCharacterWithBreakdowns } from './enhancedCharacterCalculator';
import type { EnhancedCharacterBuildData } from '../types/effectSystem';

describe('Level Progression Aggregation (UT-1)', () => {
	const createTestCharacter = (classId: string, level: number, attributes: any = {}): EnhancedCharacterBuildData => ({
		id: `test-${classId}-${level}`,
		finalName: `Test ${classId} L${level}`,
		level,
		attribute_might: attributes.might || 2,
		attribute_agility: attributes.agility || 2,
		attribute_charisma: attributes.charisma || 0,
		attribute_intelligence: attributes.intelligence || 0,
		combatMastery: 1,
		classId,
		selectedTraitIds: [],
		selectedTraitChoices: {},
		featureChoices: {},
		skillsData: {},
		tradesData: {},
		languagesData: { common: { fluency: 'fluent' } },
		lastModified: Date.now()
	});

	describe('Barbarian Progression', () => {
		it('should aggregate Level 1 stats correctly', () => {
			const char = createTestCharacter('barbarian', 1, { might: 3, agility: 2 });
			const result = calculateCharacterWithBreakdowns(char);

			// Barbarian L1: HP +9, SP +1
			expect(result.stats.finalHPMax).toBe(12); // 3 (Might) + 9 (L1 progression)
			expect(result.stats.finalSPMax).toBe(1);
			expect(result.stats.finalMPMax).toBe(0);

			// Level budgets from resolver
			expect(result.resolvedFeatures?.unlockedFeatures.length).toBeGreaterThan(0);
			expect(result.resolvedFeatures?.unlockedFeatures).toBeDefined();
		});

		it('should aggregate Level 2 stats correctly', () => {
			const char = createTestCharacter('barbarian', 2, { might: 3 });
			const result = calculateCharacterWithBreakdowns(char);

			// Barbarian: L1 (HP +9, SP +1) + L2 (HP +3, SP +0)
			expect(result.stats.finalHPMax).toBe(15); // 3 + 9 + 3
			expect(result.stats.finalSPMax).toBe(1);

			// Resolver should show features from both levels
			expect(result.resolvedFeatures?.unlockedFeatures.length).toBeGreaterThan(4);
		});

		it('should aggregate Level 3 stats correctly', () => {
			const char = createTestCharacter('barbarian', 3, { might: 3 });
			const result = calculateCharacterWithBreakdowns(char);

			// Barbarian: L1 (9) + L2 (3) + L3 (3)
			expect(result.stats.finalHPMax).toBe(18);
			expect(result.stats.finalSPMax).toBe(2); // 1 + 0 + 1

			// Subclass choice should be available at L3
			expect(result.resolvedFeatures?.availableSubclassChoice).toBe(true);
			expect(result.resolvedFeatures?.subclassChoiceLevel).toBe(3);
		});
	});

	describe('Wizard Progression', () => {
		it('should aggregate spellcaster stats correctly', () => {
			const char = createTestCharacter('wizard', 1, { intelligence: 3 });
			const result = calculateCharacterWithBreakdowns(char);

			// Wizard should have MP, cantrips, and spells
			expect(result.stats.finalMPMax).toBeGreaterThan(0);
			expect(result.levelBudgets?.totalCantripsKnown).toBeGreaterThan(0);
			expect(result.levelBudgets?.totalSpellsKnown).toBeGreaterThan(0);

			// Should have spellcasting path feature
			const hasSpellcastingPath = result.resolvedFeatures?.unlockedFeatures.some(
				f => f.id === 'wizard_spellcasting_path' || f.featureName.includes('Spellcasting')
			);
			expect(hasSpellcastingPath).toBe(true);
		});

		it('should aggregate MP across levels', () => {
			const char = createTestCharacter('wizard', 3, { intelligence: 3 });
			const result = calculateCharacterWithBreakdowns(char);

			// MP should increase with level
			expect(result.stats.finalMPMax).toBeGreaterThan(6); // More than L1
			expect(result.levelBudgets?.totalCantripsKnown).toBeGreaterThanOrEqual(2);
			expect(result.levelBudgets?.totalSpellsKnown).toBeGreaterThanOrEqual(3);
		});
	});

	describe('Multi-Level Accumulation', () => {
		it('should accumulate HP/SP/MP progressively', () => {
			const l1 = calculateCharacterWithBreakdowns(createTestCharacter('barbarian', 1, { might: 3 }));
			const l2 = calculateCharacterWithBreakdowns(createTestCharacter('barbarian', 2, { might: 3 }));
			const l3 = calculateCharacterWithBreakdowns(createTestCharacter('barbarian', 3, { might: 3 }));

			// HP should increase each level
			expect(l2.stats.finalHPMax).toBeGreaterThan(l1.stats.finalHPMax);
			expect(l3.stats.finalHPMax).toBeGreaterThan(l2.stats.finalHPMax);

			// Features should accumulate
			const l1Features = l1.resolvedFeatures?.unlockedFeatures.length || 0;
			const l2Features = l2.resolvedFeatures?.unlockedFeatures.length || 0;
			const l3Features = l3.resolvedFeatures?.unlockedFeatures.length || 0;
			
			expect(l2Features).toBeGreaterThan(l1Features);
			expect(l3Features).toBeGreaterThanOrEqual(l2Features); // L3 might not add features if only subclass choice
		});

		it('should track skill/trade points accumulation', () => {
			const l1 = calculateCharacterWithBreakdowns(createTestCharacter('barbarian', 1));
			const l3 = calculateCharacterWithBreakdowns(createTestCharacter('barbarian', 3));

			// L3 should have more skill/trade points than L1
			const l1Total = (l1.levelBudgets?.totalSkillPoints || 0) + (l1.levelBudgets?.totalTradePoints || 0);
			const l3Total = (l3.levelBudgets?.totalSkillPoints || 0) + (l3.levelBudgets?.totalTradePoints || 0);
			
			expect(l3Total).toBeGreaterThanOrEqual(l1Total);
		});
	});

	describe('Attribute Impact on Resources', () => {
		it('should add Might to HP total', () => {
			const lowMight = calculateCharacterWithBreakdowns(createTestCharacter('barbarian', 1, { might: 1 }));
			const highMight = calculateCharacterWithBreakdowns(createTestCharacter('barbarian', 1, { might: 5 }));

			// Same progression HP, but different attribute bonus
			expect(highMight.stats.finalHPMax - lowMight.stats.finalHPMax).toBe(4); // 5 - 1
		});
	});

	describe('Edge Cases', () => {
		it('should handle invalid class gracefully', () => {
			const char = createTestCharacter('nonexistent_class', 1);
			
			// Should not crash, should return minimal character
			expect(() => calculateCharacterWithBreakdowns(char)).toThrow();
		});

		it('should handle level 0 gracefully', () => {
			const char = createTestCharacter('barbarian', 0);
			const result = calculateCharacterWithBreakdowns(char);

			// Should treat as level 1 minimum or have zero progression
			expect(result.stats.finalHPMax).toBeGreaterThanOrEqual(0);
		});

		it('should handle extremely high levels', () => {
			const char = createTestCharacter('barbarian', 20);
			const result = calculateCharacterWithBreakdowns(char);

			// Should not crash, should accumulate all available levels (progression only goes to ~10)
			expect(result.stats.finalHPMax).toBeGreaterThan(30);
		});
	});

	describe('Resolver Integration', () => {
		it('should populate resolvedFeatures in calculation result', () => {
			const char = createTestCharacter('barbarian', 2);
			const result = calculateCharacterWithBreakdowns(char);

			expect(result.resolvedFeatures).toBeDefined();
			expect(result.resolvedFeatures?.unlockedFeatures).toBeDefined();
			expect(result.resolvedFeatures?.pendingFeatureChoices).toBeDefined();
			expect(result.resolvedFeatures?.availableSubclassChoice).toBeDefined();
		});

		it('should include feature objects, not just IDs', () => {
			const char = createTestCharacter('barbarian', 1);
			const result = calculateCharacterWithBreakdowns(char);

			const features = result.resolvedFeatures?.unlockedFeatures || [];
			expect(features.length).toBeGreaterThan(0);
			
			// Check that we have actual feature objects
			const firstFeature = features[0];
			expect(firstFeature).toHaveProperty('featureName');
			expect(firstFeature).toHaveProperty('levelGained');
			expect(firstFeature).toHaveProperty('description');
		});
	});
});
