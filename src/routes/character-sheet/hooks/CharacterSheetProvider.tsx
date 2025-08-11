import React, { createContext, useContext, useEffect, useCallback, useMemo, useRef } from 'react';
import { useCharacterSheetReducer, type SheetState, type SheetAction } from './useCharacterSheetReducer';
import { getCharacterById, saveCharacterState } from '../../../lib/utils/storageUtils';
import { calculateCharacterWithBreakdowns } from '../../../lib/services/enhancedCharacterCalculator';

// Simple debounce utility
function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T & { cancel: () => void } {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]) as T & { cancel: () => void };
  
  debouncedCallback.cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  
  return debouncedCallback;
}

// Context type that components will consume
interface CharacterSheetContextType {
  state: SheetState;
  dispatch: React.Dispatch<SheetAction>;
  // Helper functions from the reducer
  updateHP: (hp: number) => void;
  updateSP: (sp: number) => void;
  updateMP: (mp: number) => void;
  setManualDefense: (pd?: number, ad?: number, pdr?: number) => void;
  addAttack: (attack: any) => void;
  removeAttack: (attackId: string) => void;
  updateCurrency: (gold?: number, silver?: number, copper?: number) => void;
  updateNotes: (notes: string) => void;
  // Manual save function
  saveNow: () => Promise<void>;
}

const CharacterSheetContext = createContext<CharacterSheetContextType | undefined>(undefined);

interface CharacterSheetProviderProps {
  children: React.ReactNode;
  characterId: string;
}

export function CharacterSheetProvider({ children, characterId }: CharacterSheetProviderProps) {
  const {
    state,
    dispatch,
    updateHP,
    updateSP,
    updateMP,
    setManualDefense,
    addAttack,
    removeAttack,
    updateCurrency,
    updateNotes,
  } = useCharacterSheetReducer();

  // Save function that runs enhanced calculator and persists to storage
  const saveCharacterData = useCallback(async (character: any) => {
    if (!character) return;

    try {
      // Run enhanced calculator to update original stats
      const calculationResult = calculateCharacterWithBreakdowns(character);
      
      // Update the character's original resource values with calculated results
      const updatedCharacter = {
        ...character,
        characterState: {
          ...character.characterState,
          resources: {
            ...character.characterState.resources,
            original: {
              maxHP: calculationResult.finalHPMax || 0,
              maxSP: calculationResult.finalSPMax || 0,
              maxMP: calculationResult.finalMPMax || 0,
              maxGritPoints: calculationResult.finalGritPoints || 0,
              maxRestPoints: calculationResult.finalRestPoints || 0,
            }
          }
        }
      };

      // Save to localStorage via storage utils
      await saveCharacterState(character.id, updatedCharacter.characterState);
      
      console.log('Character sheet data saved successfully');
    } catch (error) {
      console.error('Error saving character sheet data:', error);
    }
  }, []);

  // Debounced save - runs 750ms after last change
  const debouncedSave = useDebounce(saveCharacterData, 750);

  // Manual save function for explicit save actions
  const saveNow = useCallback(async () => {
    if (state.character) {
      debouncedSave.cancel(); // Cancel any pending debounced save
      await saveCharacterData(state.character);
    }
  }, [state.character, saveCharacterData, debouncedSave]);

  // Load character data on mount or when characterId changes
  useEffect(() => {
    if (!characterId) return;

    dispatch({ type: 'LOAD_START' });

    try {
      const character = getCharacterById(characterId);
      console.log('Raw character data:', character);
      
      if (character) {
        // Ensure the character has a proper characterState structure
        const normalizedCharacter = {
          ...character,
          characterState: character.characterState || {
            resources: {
              current: {
                currentHP: character.finalHPMax || 0,
                currentSP: character.finalSPMax || 0, 
                currentMP: character.finalMPMax || 0,
                currentGritPoints: character.finalGritPoints || 0,
                currentRestPoints: character.finalRestPoints || 0,
                tempHP: 0,
                actionPointsUsed: 0,
                exhaustionLevel: 0,
              },
              original: {
                maxHP: character.finalHPMax || 0,
                maxSP: character.finalSPMax || 0,
                maxMP: character.finalMPMax || 0,
                maxGritPoints: character.finalGritPoints || 0,
                maxRestPoints: character.finalRestPoints || 0,
              }
            },
            ui: { manualDefenseOverrides: {} },
            inventory: { 
              items: [], 
              currency: { gold: 0, silver: 0, copper: 0 } 
            },
            notes: { playerNotes: '' },
            attacks: [],
            spells: character.spells || [],
            maneuvers: character.maneuvers || [],
          }
        };
        
        console.log('Normalized character:', normalizedCharacter);
        dispatch({ type: 'LOAD_SUCCESS', character: normalizedCharacter });
      } else {
        dispatch({ type: 'LOAD_ERROR', error: 'Character not found' });
      }
    } catch (error) {
      console.error('Error loading character:', error);
      dispatch({ type: 'LOAD_ERROR', error: `Failed to load character: ${error instanceof Error ? error.message : 'Unknown error'}` });
    }
  }, [characterId, dispatch]);

  // Auto-save when character data changes
  useEffect(() => {
    if (state.character && !state.loading) {
      debouncedSave(state.character);
    }

    // Cleanup debounced function on unmount
    return () => {
      debouncedSave.cancel();
    };
  }, [state.character, state.loading, debouncedSave]);

  const contextValue: CharacterSheetContextType = {
    state,
    dispatch,
    updateHP,
    updateSP,
    updateMP,
    setManualDefense,
    addAttack,
    removeAttack,
    updateCurrency,
    updateNotes,
    saveNow,
  };

  return (
    <CharacterSheetContext.Provider value={contextValue}>
      {children}
    </CharacterSheetContext.Provider>
  );
}

// Custom hook to consume the context
export function useCharacterSheet() {
  const context = useContext(CharacterSheetContext);
  if (context === undefined) {
    throw new Error('useCharacterSheet must be used within a CharacterSheetProvider');
  }
  return context;
}

// Selector hooks for commonly accessed data
export function useCharacterResources() {
  const { state } = useCharacterSheet();
  
  return useMemo(() => {
    if (!state.character?.characterState?.resources) return null;
    
    const resources = state.character.characterState.resources;
    const current = resources.current;
    
    // Handle cases where original might be missing (legacy data)
    const original = resources.original || {
      maxHP: state.character.finalHPMax || 0,
      maxSP: state.character.finalSPMax || 0,
      maxMP: state.character.finalMPMax || 0,
      maxGritPoints: state.character.finalGritPoints || 0,
      maxRestPoints: state.character.finalRestPoints || 0,
    };
    
    return {
      current,
      original,
      // Derived values
      hpPercentage: original.maxHP > 0 ? (current.currentHP / original.maxHP) * 100 : 0,
      spPercentage: original.maxSP > 0 ? (current.currentSP / original.maxSP) * 100 : 0,
      mpPercentage: original.maxMP > 0 ? (current.currentMP / original.maxMP) * 100 : 0,
    };
  }, [state.character?.characterState?.resources, state.character?.finalHPMax, state.character?.finalSPMax, state.character?.finalMPMax]);
}

export function useCharacterDefenses() {
  const { state } = useCharacterSheet();
  
  return useMemo(() => {
    if (!state.character) return null;
    
    // Get manual overrides from UI state
    const manualOverrides = state.character.characterState?.ui?.manualDefenseOverrides || {};
    
    // Get calculated base values (these would come from character calculation)
    const baseDefenses = {
      PD: state.character.finalPD || 0,
      AD: state.character.finalAD || 0,
      PDR: state.character.finalPDR || 0,
    };
    
    // Return effective values (manual override takes precedence)
    return {
      PD: manualOverrides.PD ?? baseDefenses.PD,
      AD: manualOverrides.AD ?? baseDefenses.AD,
      PDR: manualOverrides.PDR ?? baseDefenses.PDR,
      manualOverrides,
    };
  }, [state.character]);
}

export function useCharacterAttacks() {
  const { state } = useCharacterSheet();
  
  return useMemo(() => {
    return state.character?.characterState?.attacks || [];
  }, [state.character?.characterState?.attacks]);
}

export function useCharacterInventory() {
  const { state } = useCharacterSheet();
  
  return useMemo(() => {
    return state.character?.characterState?.inventory || { items: [], currency: { gold: 0, silver: 0, copper: 0 } };
  }, [state.character?.characterState?.inventory]);
}

export function useCharacterSpells() {
  const { state } = useCharacterSheet();
  return useMemo(() => {
    return state.character?.spells || [];
  }, [state.character?.spells]);
}

export function useCharacterManeuvers() {
  const { state } = useCharacterSheet();
  return useMemo(() => {
    return state.character?.maneuvers || [];
  }, [state.character?.maneuvers]);
}
