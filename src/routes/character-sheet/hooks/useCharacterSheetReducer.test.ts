import { describe, it, expect } from 'vitest';
import { useCharacterSheetReducer } from './useCharacterSheetReducer';
import { renderHook, act } from '@testing-library/react';

describe('useCharacterSheetReducer', () => {
  it('should initialize with correct initial state', () => {
    const { result } = renderHook(() => useCharacterSheetReducer());
    
    expect(result.current.state.character).toBe(null);
    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.error).toBe(null);
  });

  it('should handle LOAD_START action', () => {
    const { result } = renderHook(() => useCharacterSheetReducer());
    
    act(() => {
      result.current.dispatch({ type: 'LOAD_START' });
    });
    
    expect(result.current.state.loading).toBe(true);
    expect(result.current.state.error).toBe(null);
  });

  it('should handle LOAD_SUCCESS action', () => {
    const { result } = renderHook(() => useCharacterSheetReducer());
    
    const mockCharacter = {
      id: 'test-id',
      finalName: 'Test Character',
      level: 1,
      classId: 'fighter',
      className: 'Fighter',
      finalMight: 16,
      finalAgility: 14,
      finalCharisma: 12,
      finalIntelligence: 10,
      finalHPMax: 10,
      finalSPMax: 5,
      finalMPMax: 0,
      characterState: {
        resources: {
          current: {
            currentHP: 10,
            currentSP: 5,
            currentMP: 0,
            tempHP: 0,
            exhaustionLevel: 0
          },
          original: {
            maxHP: 10,
            maxSP: 5,
            maxMP: 0
          }
        }
      }
    } as any;
    
    act(() => {
      result.current.dispatch({ type: 'LOAD_SUCCESS', character: mockCharacter });
    });
    
    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.character).toEqual(mockCharacter);
    expect(result.current.state.error).toBe(null);
  });

  it('should handle LOAD_ERROR action', () => {
    const { result } = renderHook(() => useCharacterSheetReducer());
    
    const errorMessage = 'Failed to load character';
    
    act(() => {
      result.current.dispatch({ type: 'LOAD_ERROR', error: errorMessage });
    });
    
    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.error).toBe(errorMessage);
  });

  it('should handle UPDATE_CURRENT_HP action', () => {
    const { result } = renderHook(() => useCharacterSheetReducer());
    
    const mockCharacter = {
      id: 'test-id',
      characterState: {
        resources: {
          current: { currentHP: 10, currentSP: 5, currentMP: 0 },
          original: { maxHP: 10, maxSP: 5, maxMP: 0 }
        }
      }
    } as any;
    
    // First load a character
    act(() => {
      result.current.dispatch({ type: 'LOAD_SUCCESS', character: mockCharacter });
    });
    
    // Then update HP
    act(() => {
      result.current.dispatch({ type: 'UPDATE_CURRENT_HP', hp: 8 });
    });
    
    expect(result.current.state.character?.characterState.resources.current.currentHP).toBe(8);
  });

  it('should handle ADD_ATTACK action', () => {
    const { result } = renderHook(() => useCharacterSheetReducer());
    
    const mockCharacter = {
      id: 'test-id',
      characterState: {
        attacks: []
      }
    } as any;
    
    const newAttack = {
      id: 'attack-1',
      name: 'Sword',
      attackBonus: 5,
      damage: '1d8+3'
    } as any;
    
    // First load a character
    act(() => {
      result.current.dispatch({ type: 'LOAD_SUCCESS', character: mockCharacter });
    });
    
    // Then add an attack
    act(() => {
      result.current.dispatch({ type: 'ADD_ATTACK', attack: newAttack });
    });
    
    expect(result.current.state.character?.characterState.attacks).toHaveLength(1);
    expect(result.current.state.character?.characterState.attacks[0]).toEqual(newAttack);
  });

  it('should handle SET_MANUAL_DEFENSE action', () => {
    const { result } = renderHook(() => useCharacterSheetReducer());
    
    const mockCharacter = {
      id: 'test-id',
      characterState: {
        ui: { manualDefenseOverrides: {} }
      }
    } as any;
    
    // First load a character
    act(() => {
      result.current.dispatch({ type: 'LOAD_SUCCESS', character: mockCharacter });
    });
    
    // Then set manual defense
    act(() => {
      result.current.dispatch({ type: 'SET_MANUAL_DEFENSE', pd: 15, ad: 12 });
    });
    
    expect(result.current.state.character?.characterState.ui.manualDefenseOverrides.PD).toBe(15);
    expect(result.current.state.character?.characterState.ui.manualDefenseOverrides.AD).toBe(12);
  });

  it('should provide helper functions', () => {
    const { result } = renderHook(() => useCharacterSheetReducer());
    
    expect(typeof result.current.updateHP).toBe('function');
    expect(typeof result.current.updateSP).toBe('function');
    expect(typeof result.current.updateMP).toBe('function');
    expect(typeof result.current.setManualDefense).toBe('function');
    expect(typeof result.current.addAttack).toBe('function');
    expect(typeof result.current.removeAttack).toBe('function');
    expect(typeof result.current.updateCurrency).toBe('function');
    expect(typeof result.current.updateNotes).toBe('function');
  });
});
