/**
 * Centralized Storage Utilities
 * 
 * This is the ONLY place where JSON.stringify and JSON.parse should be used
 * for character data. All other parts of the application should use typed objects.
 */

import { SavedCharacter, CharacterState, LegacyCharacter } from '../types/dataContracts';

const CURRENT_SCHEMA_VERSION = 2;

/**
 * Centralized JSON serialization for localStorage
 * This is the ONLY place JSON.stringify should be used for character data
 */
export const serializeCharacterForStorage = (character: SavedCharacter): string => {
  return JSON.stringify({
    ...character,
    schemaVersion: CURRENT_SCHEMA_VERSION
  });
};

/**
 * Centralized JSON deserialization from localStorage
 * This is the ONLY place JSON.parse should be used for character data
 */
export const deserializeCharacterFromStorage = (jsonString: string): SavedCharacter | null => {
  try {
    const data = JSON.parse(jsonString) as any;
    
    // Schema version guard - drop incompatible saves
    if (!data.schemaVersion || data.schemaVersion !== CURRENT_SCHEMA_VERSION) {
      console.warn(`Dropping character ${data.id} with incompatible schema version ${data.schemaVersion}`);
      return null;
    }
    
    // Character is already in v2 format, no migration needed
    return {
      ...data,
      selectedTraitIds: data.selectedTraitIds || [],
      selectedFeatureChoices: data.selectedFeatureChoices || {},
      skillsData: data.skillsData || {},
      tradesData: data.tradesData || {},
      languagesData: data.languagesData || { common: { fluency: 'fluent' } },
      spells: data.spells || [],
      maneuvers: data.maneuvers || [],
      characterState: data.characterState || getDefaultCharacterState(),
      schemaVersion: CURRENT_SCHEMA_VERSION
    } as SavedCharacter;
  } catch (error) {
    console.error("Failed to parse character from storage", error);
    return null;
  }
};

/**
 * Create default character state for new characters
 */
export const getDefaultCharacterState = (): CharacterState => ({
  resources: {
    current: {
      currentHP: 0,
      currentSP: 0,
      currentMP: 0,
      currentGritPoints: 0,
      currentRestPoints: 0,
      tempHP: 0,
      actionPointsUsed: 0,
      exhaustionLevel: 0,
    },
  },
  ui: { manualDefenseOverrides: {} },
  inventory: { 
    items: [], 
    currency: { gold: 0, silver: 0, copper: 0 } 
  },
  notes: { playerNotes: '' },
});

/**
 * Get all saved characters with type safety
 */
export const getAllSavedCharacters = (): SavedCharacter[] => {
  const charactersJson = localStorage.getItem('savedCharacters') || '[]';
  try {
    const rawCharacters = JSON.parse(charactersJson);
    return rawCharacters.map((char: any) => 
      deserializeCharacterFromStorage(JSON.stringify(char))
    ).filter(Boolean) as SavedCharacter[];
  } catch (error) {
    console.error("Failed to load saved characters", error);
    return [];
  }
};

/**
 * Save all characters to localStorage
 */
export const saveAllCharacters = (characters: SavedCharacter[]): void => {
  try {
    const serializedCharacters = characters.map(char => JSON.parse(serializeCharacterForStorage(char)));
    localStorage.setItem('savedCharacters', JSON.stringify(serializedCharacters));
  } catch (error) {
    console.error("Failed to save characters", error);
  }
};

/**
 * Get a single character by ID
 */
export const getCharacterById = (characterId: string): SavedCharacter | null => {
  const characters = getAllSavedCharacters();
  return characters.find(char => char.id === characterId) || null;
};

/**
 * Save a single character's state
 */
export const saveCharacterState = (characterId: string, state: CharacterState): void => {
  const characters = getAllSavedCharacters();
  const characterIndex = characters.findIndex(char => char.id === characterId);
  
  if (characterIndex === -1) {
    console.warn(`Character ${characterId} not found for state update`);
    return;
  }
  
  // Update ONLY the characterState - no duplicates
  characters[characterIndex] = {
    ...characters[characterIndex],
    characterState: state,
    lastModified: new Date().toISOString()
  };
  
  saveAllCharacters(characters);
};

// Migration utilities removed - no backward compatibility support

/**
 * Backup current localStorage before migration
 */
export const backupCharacterData = (): void => {
  const currentData = localStorage.getItem('savedCharacters');
  if (currentData) {
    localStorage.setItem('savedCharacters_backup', currentData);
    localStorage.setItem('savedCharacters_backup_timestamp', new Date().toISOString());
    console.log('Character data backed up successfully');
  }
};

/**
 * Restore from backup if something goes wrong
 */
export const restoreFromBackup = (): boolean => {
  const backup = localStorage.getItem('savedCharacters_backup');
  if (backup) {
    localStorage.setItem('savedCharacters', backup);
    console.log('Character data restored from backup');
    return true;
  }
  console.warn('No backup found to restore from');
  return false;
};
