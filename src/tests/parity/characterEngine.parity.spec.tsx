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
import {
	calculateCharacterWithBreakdowns,
	convertToEnhancedBuildData
} from '../../lib/services/enhancedCharacterCalculator';
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
			cleric_cleric_order_0: '["Knowledge", "War"]'
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

// Run fixture through simplified legacy logic
function runLegacyCalculations(fixtureState: CharacterInProgressStoreData) {
	const skillPointsUsed = Object.values(fixtureState.skillsData || {}).reduce(
		(a, b) => a + (b || 0),
		0
	);
	const tradePointsUsed = Object.values(fixtureState.tradesData || {}).reduce(
		(a, b) => a + (b || 0),
		0
	);
	const languagePointsUsed = Object.entries(
		fixtureState.languagesData || { common: { fluency: 'fluent' } }
	).reduce(
		(sum, [id, d]: [string, any]) =>
			id === 'common' ? sum : sum + (d.fluency === 'limited' ? 1 : 2),
		0
	);

	const baseSkillPoints = 5 + (fixtureState.attribute_intelligence || 0);
	const baseTradePoints = 3;
	const baseLanguagePoints = 2;

	const ctx = renderContextWithFixture(fixtureState);
	const attributePointsRemaining = ctx.result.current.attributePointsRemaining;

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
		attributePointsRemaining
	};
}

// Run fixture through new engine
function runNewCalculations(fixtureState: CharacterInProgressStoreData) {
	const buildData = convertToEnhancedBuildData(fixtureState);
	const result = calculateCharacterWithBreakdowns(buildData);

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
		attributePointsRemaining: 0 // TODO: derive from new system when implemented
	};
}

describe('Character Engine Parity Tests', () => {
	describe.each(fixtures)('Character Build: $finalName', (fixture) => {
		it('produces consistent background point calculations', () => {
			const legacy = runLegacyCalculations(fixture);
			const modern = runNewCalculations(fixture);

			// Skill points can be increased by effects in the new engine; ensure they are not lower than legacy base
			expect(modern.baseSkillPoints).toBeGreaterThanOrEqual(legacy.baseSkillPoints);
			expect(modern.availableSkillPoints).toBeGreaterThanOrEqual(legacy.availableSkillPoints);

			// Trade & language baselines should match (no bonuses applied in the legacy stub)
			expect(modern.baseTradePoints).toBe(legacy.baseTradePoints);
			expect(modern.availableTradePoints).toBe(legacy.availableTradePoints);
			expect(modern.baseLanguagePoints).toBe(legacy.baseLanguagePoints);
			expect(modern.availableLanguagePoints).toBe(legacy.availableLanguagePoints);

			// Usage should always match
			expect(modern.skillPointsUsed).toBe(legacy.skillPointsUsed);
			expect(modern.tradePointsUsed).toBe(legacy.tradePointsUsed);
			expect(modern.languagePointsUsed).toBe(legacy.languagePointsUsed);
		});

		it('converts context → buildData without loss', () => {
			const buildData = convertToEnhancedBuildData(fixture);
			expect(buildData.id).toBe(fixture.id);
			expect(buildData.classId).toBe(fixture.classId);
			expect(buildData.attribute_intelligence).toBe(fixture.attribute_intelligence);
			expect(buildData.selectedTraitIds).toEqual(fixture.selectedTraitIds);
			expect(typeof buildData.skillsJson).toBe('string');
		});
	});

	it('handles empty/default states', () => {
		const empty: CharacterInProgressStoreData = {
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

		expect(() => calculateCharacterWithBreakdowns(convertToEnhancedBuildData(empty))).not.toThrow();
	});
});
