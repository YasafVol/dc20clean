/**
 * Centralized Storage Utilities
 * 
 * This is the ONLY place where JSON.stringify and JSON.parse should be used
 * for character data. All other parts of the application should use typed objects.
 */

import { SavedCharacter, CharacterState } from '../types/dataContracts';

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
    
    // TEMPORARY: Allow all characters regardless of schema version for debugging
    console.log(`Loading character ${data.id || 'unknown'} with schema version: ${data.schemaVersion || 'undefined'}`);
    
    // Migrate legacy characters automatically
    
    // Migrate character to v2 format
    const migratedCharacter = {
      ...data,
      selectedTraitIds: data.selectedTraitIds || [],
      selectedFeatureChoices: data.selectedFeatureChoices || {},
      skillsData: data.skillsData || {},
      tradesData: data.tradesData || {},
      languagesData: data.languagesData || { common: { fluency: 'fluent' } },
      spells: data.spells || [],
      maneuvers: data.maneuvers || [],
      characterState: data.characterState || getDefaultCharacterState(),
      schemaVersion: CURRENT_SCHEMA_VERSION // Always update to current version
    } as SavedCharacter;
    
    console.log(`Successfully loaded character ${data.id || 'unknown'}`);
    return migratedCharacter;
  } catch (error) {
    console.error("Failed to parse character from storage", error);
    return null;
  }
};

/**
 * Create default character state for new characters (template with 0 values)
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
      // Death tracking defaults
      deathSteps: 0,
      isDead: false,
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
 * Create properly initialized character state with resources set to max values
 */
export const getInitializedCharacterState = (character: any): CharacterState => ({
  resources: {
    current: {
      // Initialize current resources to their maximum values for new characters
      currentHP: character.finalHPMax || 0,
      currentSP: character.finalSPMax || 0,
      currentMP: character.finalMPMax || 0,
      currentGritPoints: character.finalGritPoints || 0,
      currentRestPoints: character.finalRestPoints || 0,
      tempHP: 0,
      actionPointsUsed: 0,
      exhaustionLevel: 0,
      // Death tracking defaults
      deathSteps: 0,
      isDead: false,
    },
  },
  ui: { 
    manualDefenseOverrides: {} 
  },
  inventory: { 
    items: [], 
    currency: { gold: 0, silver: 0, copper: 0 } 
  },
  notes: { 
    playerNotes: '' 
  },
});

/**
 * Get all saved characters with type safety
 */
export const getAllSavedCharacters = (): SavedCharacter[] => {
  const charactersJson = localStorage.getItem('savedCharacters') || '[]';
  try {
    const rawCharacters = JSON.parse(charactersJson);
    console.log(`Loading ${rawCharacters.length} characters from localStorage`);
    
    const characters = rawCharacters.map((char: any) => 
      deserializeCharacterFromStorage(JSON.stringify(char))
    ).filter(Boolean) as SavedCharacter[];
    
    console.log(`Successfully loaded ${characters.length} characters`);
    return characters;
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
    console.log('🪓 saveAllCharacters: serializedCharacters:', serializedCharacters);
    localStorage.setItem('savedCharacters', JSON.stringify(serializedCharacters));
    const afterSave = localStorage.getItem('savedCharacters');
    console.log('🪓 saveAllCharacters: localStorage after save:', afterSave);
  } catch (error) {
    console.error("Failed to save characters", error);
  }
};

/**
 * Get a single character by ID
 */
export const getCharacterById = (characterId: string): SavedCharacter | null => {
  console.log(`Looking for character with ID: ${characterId}`);
  const characters = getAllSavedCharacters();
  const character = characters.find(char => char.id === characterId) || null;
  
  if (character) {
    console.log(`Found character: ${character.finalName || character.id}`);
  } else {
    console.warn(`Character ${characterId} not found`);
    console.log(`Available character IDs: ${characters.map(c => c.id).join(', ')}`);
  }
  
  return character;
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
 * Save an entire character (includes spells, maneuvers, and other root-level data)
 */
export const saveCharacter = (character: SavedCharacter): void => {
  const characters = getAllSavedCharacters();
  const characterIndex = characters.findIndex(char => char.id === character.id);
  
  if (characterIndex === -1) {
    console.warn(`Character ${character.id} not found for update`);
    return;
  }
  
  // Update the entire character with new lastModified timestamp
  characters[characterIndex] = {
    ...character,
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
