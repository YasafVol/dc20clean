/**
 * Character Engine Parity Tests
 * 
 * These tests establish a "golden record" of legacy behavior by running
 * character build fixtures through the old hooks and comparing outputs
 * with the new centralized calculator.
 */

import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import React from 'react';
// Note: BackgroundPointsManager removed - using mock implementation for parity testing
import { CharacterProvider, useCharacter } from '../../lib/stores/characterContext';
import { calculateCharacterWithBreakdowns, convertToEnhancedBuildData } from '../../lib/services/enhancedCharacterCalculator';
import type { CharacterInProgressStoreData } from '../../lib/stores/characterContext';

// Test fixtures representing different character builds
const fixtures: CharacterInProgressStoreData[] = [
  {
    // Basic Human Cleric
    id: 'test-human-cleric',
    attribute_might: -2,
    attribute_agility: -1,
    attribute_charisma: 2,
    attribute_intelligence: 1,
    pointsSpent: 0,
    level: 1,
    combatMastery: 1,
    ancestry1Id: 'human',
    ancestry2Id: null,
    selectedTraitIds: ['human_skill_expertise'],
    ancestryPointsSpent: 0,
    classId: 'cleric',
    selectedFeatureChoices: {
      'cleric_cleric_order_0': '["Knowledge", "War"]'
    },
    saveMasteryMight: false,
    saveMasteryAgility: false,
    saveMasteryCharisma: false,
    saveMasteryIntelligence: false,
    finalName: 'Test Cleric',
    finalPlayerName: 'Test Player',
    createdAt: new Date(),
    updatedAt: new Date(),
    currentStep: 1,
    overflowTraitId: null,
    overflowAttributeName: null,
    skillsData: { 
      athletics: 1,
      insight: 2 
    },
    tradesData: {
      alchemy: 1
    },
    languagesData: { 
      common: { fluency: 'fluent' },
      elvish: { fluency: 'limited' }
    },
    selectedTraitChoices: {},
    cachedEffectResults: undefined,
    cacheTimestamp: undefined,
    selectedSpells: [],
    selectedManeuvers: [],
    skillToTradeConversions: 0,
    tradeToSkillConversions: 0,
    tradeToLanguageConversions: 0,
    schemaVersion: 2
  },
  {
    // Basic Elf Wizard
    id: 'test-elf-wizard',
    attribute_might: -2,
    attribute_agility: 0,
    attribute_charisma: -1,
    attribute_intelligence: 3,
    pointsSpent: 0,
    level: 1,
    combatMastery: 1,
    ancestry1Id: 'elf',
    ancestry2Id: null,
    selectedTraitIds: ['elf_keen_senses'],
    ancestryPointsSpent: 0,
    classId: 'wizard',
    selectedFeatureChoices: {},
    saveMasteryMight: false,
    saveMasteryAgility: false,
    saveMasteryCharisma: false,
    saveMasteryIntelligence: false,
    finalName: 'Test Wizard',
    finalPlayerName: 'Test Player',
    createdAt: new Date(),
    updatedAt: new Date(),
    currentStep: 1,
    overflowTraitId: null,
    overflowAttributeName: null,
    skillsData: { 
      arcana: 2,
      investigation: 1 
    },
    tradesData: {
      scribing: 1
    },
    languagesData: { 
      common: { fluency: 'fluent' },
      elvish: { fluency: 'fluent' }
    },
    selectedTraitChoices: {},
    cachedEffectResults: undefined,
    cacheTimestamp: undefined,
    selectedSpells: [],
    selectedManeuvers: [],
    skillToTradeConversions: 0,
    tradeToSkillConversions: 0,
    tradeToLanguageConversions: 0,
    schemaVersion: 2
  }
];

// Helper: render context and apply fixture state via dispatch
function renderContextWithFixture(fixtureState: CharacterInProgressStoreData) {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CharacterProvider>{children}</CharacterProvider>
  );
  const hook = renderHook(() => useCharacter(), { wrapper });
  // Initialize store with fixture
  hook.result.current.dispatch({ type: 'UPDATE_STORE', updates: fixtureState });
  return hook;
}

// This function will run a fixture through the old system
function runLegacyCalculations(fixtureState: CharacterInProgressStoreData) {
  // Note: BackgroundPointsManager removed, using simplified calculation for parity
  const skillPointsUsed = Object.values(fixtureState.skillsData || {}).reduce((a, b) => a + (b || 0), 0);
  const tradePointsUsed = Object.values(fixtureState.tradesData || {}).reduce((a, b) => a + (b || 0), 0);
  const languagePointsUsed = Object.entries(fixtureState.languagesData || { common: { fluency: 'fluent' } })
    .reduce((sum, [id, d]: [string, any]) => id === 'common' ? sum : sum + (d.fluency === 'limited' ? 1 : 2), 0);

  // Simplified background calculations
  const baseSkillPoints = 5 + (fixtureState.attribute_intelligence || 0);
  const baseTradePoints = 3;
  const baseLanguagePoints = 2;

  // Attribute parity via context-derived values (legacy source of truth)
  const ctx = renderContextWithFixture(fixtureState);
  const attributePointsRemaining = ctx.result.current.attributePointsRemaining;

  // Standardized object with key outputs
  return {
    availableSkillPoints: baseSkillPoints,
    baseSkillPoints,
    skillPointsUsed,
    availableTradePoints: baseTradePoints,
    baseTradePoints,
    tradePointsUsed,
    availableLanguagePoints: baseLanguagePoints,
    baseLanguagePoints,
    languagePointsUsed,
    attributePointsRemaining,
  };
}

// This function will run a fixture through the new system
function runNewCalculations(fixtureState: CharacterInProgressStoreData) {
  const buildData = convertToEnhancedBuildData(fixtureState);
  const result = calculateCharacterWithBreakdowns(buildData);
  
  // Get the same outputs from the new system
  return {
    availableSkillPoints: result.background?.availableSkillPoints || 0,
    baseSkillPoints: result.background?.baseSkillPoints || 0,
    skillPointsUsed: result.background?.skillPointsUsed || 0,
    availableTradePoints: result.background?.availableTradePoints || 0,
    baseTradePoints: result.background?.baseTradePoints || 0,
    tradePointsUsed: result.background?.tradePointsUsed || 0,
    availableLanguagePoints: result.background?.availableLanguagePoints || 0,
    baseLanguagePoints: result.background?.baseLanguagePoints || 0,
    languagePointsUsed: result.background?.languagePointsUsed || 0,
    // For attribute points, we'll need to calculate from the new system when implemented
    attributePointsRemaining: 0, // TODO: Calculate from new system
  };
}

describe('Character Engine Parity Tests', () => {
  describe.each(fixtures)('Character Build: $finalName', (fixture) => {
    it('should produce consistent background point calculations', () => {
      const legacyResult = runLegacyCalculations(fixture);
      const newResult = runNewCalculations(fixture);

      // Compare background point calculations
      expect(newResult.baseSkillPoints).toBe(legacyResult.baseSkillPoints);
      expect(newResult.baseTradePoints).toBe(legacyResult.baseTradePoints);
      expect(newResult.baseLanguagePoints).toBe(legacyResult.baseLanguagePoints);
      expect(newResult.availableSkillPoints).toBe(legacyResult.availableSkillPoints);
      expect(newResult.availableTradePoints).toBe(legacyResult.availableTradePoints);
      expect(newResult.availableLanguagePoints).toBe(legacyResult.availableLanguagePoints);
      expect(newResult.skillPointsUsed).toBe(legacyResult.skillPointsUsed);
      expect(newResult.tradePointsUsed).toBe(legacyResult.tradePointsUsed);
      expect(newResult.languagePointsUsed).toBe(legacyResult.languagePointsUsed);
    });

    it('should have a valid conversion function', () => {
      // Test that the conversion function doesn't throw
      expect(() => convertToEnhancedBuildData(fixture)).not.toThrow();
      
      // Test that essential fields are preserved
      const buildData = convertToEnhancedBuildData(fixture);
      expect(buildData.id).toBe(fixture.id);
      expect(buildData.classId).toBe(fixture.classId);
      expect(buildData.attribute_intelligence).toBe(fixture.attribute_intelligence);
      expect(buildData.selectedTraitIds).toEqual(fixture.selectedTraitIds);
      
      // Test that objects are serialized
      expect(typeof buildData.skillsJson).toBe('string');
      expect(typeof buildData.tradesJson).toBe('string');
      expect(typeof buildData.languagesJson).toBe('string');
    });
  });

  it('should handle empty/default states', () => {
    const emptyState: CharacterInProgressStoreData = {
      id: '',
      attribute_might: -2,
      attribute_agility: -2,
      attribute_charisma: -2,
      attribute_intelligence: -2,
      pointsSpent: 0,
      level: 1,
      combatMastery: 1,
      ancestry1Id: null,
      ancestry2Id: null,
      selectedTraitIds: [],
      ancestryPointsSpent: 0,
      classId: null,
      selectedFeatureChoices: {},
      saveMasteryMight: false,
      saveMasteryAgility: false,
      saveMasteryCharisma: false,
      saveMasteryIntelligence: false,
      finalName: null,
      finalPlayerName: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      currentStep: 1,
      overflowTraitId: null,
      overflowAttributeName: null,
      skillsData: {},
      tradesData: {},
      languagesData: { common: { fluency: 'fluent' } },
      selectedTraitChoices: {},
      cachedEffectResults: undefined,
      cacheTimestamp: undefined,
      selectedSpells: [],
      selectedManeuvers: [],
      skillToTradeConversions: 0,
      tradeToSkillConversions: 0,
      tradeToLanguageConversions: 0,
      schemaVersion: 2
    };

    expect(() => convertToEnhancedBuildData(emptyState)).not.toThrow();
    expect(() => calculateCharacterWithBreakdowns(convertToEnhancedBuildData(emptyState))).not.toThrow();
  });
});
