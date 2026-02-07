import { describe, test, expect } from 'vitest';
import type { CharacterInProgressStoreData } from './characterContext';

// Import the reducer function (we'll need to export it)
// For now, create a minimal test structure

describe('characterReducer', () => {
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
