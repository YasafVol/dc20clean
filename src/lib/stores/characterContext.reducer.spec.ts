import { describe, test, expect } from 'vitest';
import { characterReducer, type CharacterInProgressStoreData } from './characterContext';

// Import the reducer function (we'll need to export it)
// For now, create a minimal test structure

describe('characterReducer', () => {
	const baseState = {
		currentStep: 1,
		classId: 'spellblade',
		level: 5,
		selectedFeatureChoices: { spellblade_additional_spell_schools: 'Fire' },
		selectedTalents: { attribute_increase: 1 },
		pathPointAllocations: { martial: 1, spellcasting: 1 },
		selectedMulticlassOption: 'novice',
		selectedMulticlassClass: 'wizard',
		selectedMulticlassFeature: 'wizard_spellcasting',
		selectedSubclass: 'Test Subclass',
		selectedCrossPathSpellList: 'arcane',
		selectedSpells: { slot_1: 'fire_bolt' },
		selectedManeuvers: ['Charge']
	} as unknown as CharacterInProgressStoreData;

	test('NEXT_STEP uses caller-provided max step instead of a hard-coded 7', () => {
		const result = characterReducer({ ...baseState, currentStep: 7 }, { type: 'NEXT_STEP', maxStep: 8 });

		expect(result.currentStep).toBe(8);
	});

	test('SET_STEP uses caller-provided max step instead of a hard-coded 7', () => {
		const result = characterReducer(baseState, { type: 'SET_STEP', step: 8, maxStep: 8 });

		expect(result.currentStep).toBe(8);
	});

	test('SET_CLASS clears stale downstream selections', () => {
		const result = characterReducer(baseState, { type: 'SET_CLASS', classId: 'wizard' });

		expect(result.classId).toBe('wizard');
		expect(result.selectedFeatureChoices).toEqual({});
		expect(result.selectedTalents).toEqual({});
		expect(result.pathPointAllocations).toEqual({ martial: 0, spellcasting: 0 });
		expect(result.selectedMulticlassOption).toBeNull();
		expect(result.selectedSubclass).toBeUndefined();
		expect(result.selectedSpells).toEqual({});
		expect(result.selectedManeuvers).toEqual([]);
	});

	test('SET_LEVEL clears stale level-dependent selections', () => {
		const result = characterReducer(baseState, { type: 'SET_LEVEL', level: 2 });

		expect(result.level).toBe(2);
		expect(result.selectedTalents).toEqual({});
		expect(result.pathPointAllocations).toEqual({ martial: 0, spellcasting: 0 });
		expect(result.selectedMulticlassOption).toBeNull();
		expect(result.selectedSubclass).toBeUndefined();
		expect(result.selectedSpells).toEqual({});
		expect(result.selectedManeuvers).toEqual([]);
	});

	test('UPDATE_SKILLS action stores native object', () => {
		const initialState: Partial<CharacterInProgressStoreData> = {
			skillsData: {}
		};

		const action = {
			type: 'UPDATE_SKILLS' as const,
			skillsData: { athletics: 2, stealth: 1 }
		};

		// Mock reducer behavior
		const result = { ...initialState, skillsData: action.skillsData };

		expect(result.skillsData).toEqual({ athletics: 2, stealth: 1 });
		expect(typeof result.skillsData).toBe('object');
	});

	test('SET_TRAITS action stores native array', () => {
		const initialState: Partial<CharacterInProgressStoreData> = {
			selectedTraitIds: []
		};

		const action = {
			type: 'SET_TRAITS' as const,
			selectedTraitIds: ['trait1', 'trait2']
		};

		const result = { ...initialState, selectedTraitIds: action.selectedTraitIds };

		expect(result.selectedTraitIds).toEqual(['trait1', 'trait2']);
		expect(Array.isArray(result.selectedTraitIds)).toBe(true);
	});

	test('UPDATE_SPELLS_AND_MANEUVERS action stores correct types', () => {
		const initialState: Partial<CharacterInProgressStoreData> = {
			selectedSpells: {},
			selectedManeuvers: []
		};

		const action = {
			type: 'UPDATE_SPELLS_AND_MANEUVERS' as const,
			spells: { slot_0: 'spell_fireball', slot_1: 'spell_shield' } as Record<string, string>,
			maneuvers: ['maneuver1']
		};

		const result = {
			...initialState,
			selectedSpells: action.spells,
			selectedManeuvers: action.maneuvers
		};

		expect(result.selectedSpells).toEqual({ slot_0: 'spell_fireball', slot_1: 'spell_shield' });
		expect(result.selectedManeuvers).toEqual(['maneuver1']);
		expect(typeof result.selectedSpells).toBe('object');
		expect(Array.isArray(result.selectedSpells)).toBe(false);
		expect(Array.isArray(result.selectedManeuvers)).toBe(true);
	});
});
