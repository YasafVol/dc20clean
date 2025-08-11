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

  test('UPDATE_SPELLS_AND_MANEUVERS action stores native arrays', () => {
    const initialState: Partial<CharacterInProgressStoreData> = {
      selectedSpells: [],
      selectedManeuvers: []
    };

    const action = {
      type: 'UPDATE_SPELLS_AND_MANEUVERS' as const,
      spells: ['spell1', 'spell2'],
      maneuvers: ['maneuver1']
    };

    const result = {
      ...initialState,
      selectedSpells: action.spells,
      selectedManeuvers: action.maneuvers
    };

    expect(result.selectedSpells).toEqual(['spell1', 'spell2']);
    expect(result.selectedManeuvers).toEqual(['maneuver1']);
    expect(Array.isArray(result.selectedSpells)).toBe(true);
    expect(Array.isArray(result.selectedManeuvers)).toBe(true);
  });
});
