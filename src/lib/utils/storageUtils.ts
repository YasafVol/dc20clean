/**
 * Centralized Storage Utilities
 * 
 * This is the ONLY place where JSON.stringify and JSON.parse should be used
 * for character data. All other parts of the application should use typed objects.
 */

import { SavedCharacter, CharacterState, LegacyCharacter } from '../types/dataContracts';

/**
 * Centralized JSON serialization for localStorage
 * This is the ONLY place JSON.stringify should be used for character data
 */
export const serializeCharacterForStorage = (character: SavedCharacter): string => {
  return JSON.stringify({
    ...character,
    schemaVersion: '2.0.0'
  });
};

/**
 * Centralized JSON deserialization from localStorage
 * This is the ONLY place JSON.parse should be used for character data
 */
export const deserializeCharacterFromStorage = (jsonString: string): SavedCharacter | null => {
  try {
    const data = JSON.parse(jsonString) as LegacyCharacter;
    
    // Apply migration if needed
    if (!data.schemaVersion || data.schemaVersion === '1.0.0') {
      return migrateCharacterToV2(data);
    }
    
    // Apply defaults for missing fields (backwards compatibility)
    return {
      ...data,
      selectedTraitIds: data.selectedTraitIds || [],
      selectedFeatureChoices: data.selectedFeatureChoices || {},
      skillsData: data.skillsData || {},
      tradesData: data.tradesData || {},
      languagesData: data.languagesData || [],
      spells: data.spells || [],
      maneuvers: data.maneuvers || [],
      characterState: data.characterState || getDefaultCharacterState(),
      schemaVersion: data.schemaVersion || '2.0.0'
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

/**
 * Migration utility to convert legacy characters to new schema
 */
const migrateCharacterToV2 = (oldCharacter: LegacyCharacter): SavedCharacter => {
  console.log(`Migrating character ${oldCharacter.id} to schema v2.0.0`);
  
  return {
    // Copy all existing fields
    ...oldCharacter,
    
    // Convert JSON strings to typed data
    selectedTraitIds: parseJsonField(
      oldCharacter.selectedTraitIds || oldCharacter.selectedTraitsJson, 
      []
    ),
    selectedFeatureChoices: parseJsonField(oldCharacter.selectedFeatureChoices, {}),
    skillsData: parseJsonField(oldCharacter.skillsJson, {}),
    tradesData: parseJsonField(oldCharacter.tradesJson, {}),
    languagesData: parseJsonField(oldCharacter.languagesJson, []),
    
    // Ensure arrays for spells and maneuvers
    spells: oldCharacter.spells || [],
    maneuvers: oldCharacter.maneuvers || [],
    
    // Migrate character state from legacy fields if needed
    characterState: oldCharacter.characterState || {
      resources: {
        current: {
          currentHP: oldCharacter.currentHP || 0,
          currentSP: oldCharacter.currentSP || 0,
          currentMP: oldCharacter.currentMP || 0,
          currentGritPoints: oldCharacter.currentGritPoints || 0,
          currentRestPoints: oldCharacter.currentRestPoints || 0,
          tempHP: oldCharacter.tempHP || 0,
          actionPointsUsed: oldCharacter.actionPointsUsed || 0,
          exhaustionLevel: oldCharacter.exhaustionLevel || 0,
        },
      },
      ui: { 
        manualDefenseOverrides: {
          PD: oldCharacter.manualPD,
          AD: oldCharacter.manualAD,
          PDR: oldCharacter.manualPDR,
        }
      },
      inventory: { 
        items: [], 
        currency: { gold: 0, silver: 0, copper: 0 } 
      },
      notes: { playerNotes: '' },
    },
    
    // Add schema version
    schemaVersion: '2.0.0',
    
    // Ensure required fields exist
    breakdowns: oldCharacter.breakdowns || {},
    createdAt: oldCharacter.createdAt || new Date().toISOString(),
    lastModified: new Date().toISOString(),
    completedAt: oldCharacter.completedAt || new Date().toISOString(),
  } as SavedCharacter;
};

/**
 * Helper to safely parse JSON fields during migration
 */
const parseJsonField = (value: any, fallback: any): any => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      console.warn('Failed to parse JSON field, using fallback:', value);
      return fallback;
    }
  }
  return value || fallback;
};

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
