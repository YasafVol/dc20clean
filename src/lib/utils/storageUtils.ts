/**
 * Centralized Storage Utilities
 *
 * This is the ONLY place where JSON.stringify and JSON.parse should be used
 * for character data. All other parts of the application should use typed objects.
 */

import { SavedCharacter, CharacterState } from '../types/dataContracts';
import { logger } from './logger';

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

		logger.debug('storage', 'Deserializing character', {
			id: data.id || 'unknown',
			schemaVersion: data.schemaVersion || 'undefined'
		});

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
			characterState: {
				...(data.characterState || getDefaultCharacterState()),
				// Normalize attacks from object to array format for backward compatibility
				attacks: Array.isArray(data.characterState?.attacks)
					? data.characterState.attacks
					: Object.values(data.characterState?.attacks || {}),
				// Normalize spells to array if not already
				spells: Array.isArray(data.characterState?.spells)
					? data.characterState.spells
					: data.spells || [],
				// Normalize maneuvers to array if not already
				maneuvers: Array.isArray(data.characterState?.maneuvers)
					? data.characterState.maneuvers
					: data.maneuvers || []
			},
			schemaVersion: CURRENT_SCHEMA_VERSION // Always update to current version
		} as SavedCharacter;

		logger.debug('storage', 'Successfully deserialized character', {
			id: data.id || 'unknown'
		});
		return migratedCharacter;
	} catch (error) {
		logger.error('storage', 'Failed to parse character from storage', {
			error: error instanceof Error ? error.message : String(error)
		});
		return null;
	}
};

/**
 * Deep clones an object using JSON serialization.
 * This is a controlled use of JSON.parse and JSON.stringify,
 * intended for creating copies of complex, non-class objects.
 */
export const deepClone = <T>(obj: T): T => {
	return JSON.parse(JSON.stringify(obj));
};

/**
 * Safely parses a JSON string without throwing an error.
 * Returns undefined if parsing fails.
 */
export function parseJsonSafe<T = any>(jsonString: string): T | undefined {
	try {
		return JSON.parse(jsonString);
	} catch {
		return undefined;
	}
}

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
			isDead: false
		}
	},
	ui: { manualDefenseOverrides: {} },
	inventory: {
		items: [],
		currency: { gold: 0, silver: 0, copper: 0 }
	},
	notes: { playerNotes: '' },
	attacks: [],
	spells: [],
	maneuvers: []
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
			isDead: false
		}
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
	}
});

/**
 * Get all saved characters with type safety
 */
export const getAllSavedCharacters = (): SavedCharacter[] => {
	const charactersJson = localStorage.getItem('savedCharacters') || '[]';
	try {
		const rawCharacters = JSON.parse(charactersJson);
		logger.info('storage', 'Loading characters from localStorage', {
			count: rawCharacters.length
		});

		const characters = rawCharacters
			.map((char: any) => deserializeCharacterFromStorage(JSON.stringify(char)))
			.filter(Boolean) as SavedCharacter[];

		logger.info('storage', 'Successfully loaded characters', {
			count: characters.length
		});
		return characters;
	} catch (error) {
		logger.error('storage', 'Failed to load saved characters', {
			error: error instanceof Error ? error.message : String(error)
		});
		return [];
	}
};

/**
 * Save all characters to localStorage
 */
export const saveAllCharacters = (characters: SavedCharacter[]): void => {
	try {
		const serializedCharacters = characters.map((char) =>
			JSON.parse(serializeCharacterForStorage(char))
		);
		logger.debug('storage', 'Saving characters to localStorage', {
			count: serializedCharacters.length
		});
		localStorage.setItem('savedCharacters', JSON.stringify(serializedCharacters));
		logger.info('storage', 'Characters saved to localStorage', {
			count: characters.length
		});
	} catch (error) {
		logger.error('storage', 'Failed to save characters', {
			error: error instanceof Error ? error.message : String(error)
		});
	}
};

/**
 * Get a single character by ID
 */
export const getCharacterById = (characterId: string): SavedCharacter | null => {
	logger.debug('storage', 'Looking up character', { characterId });
	// Read raw savedCharacters so we can migrate a single character in-place if needed
	const charactersJson = localStorage.getItem('savedCharacters') || '[]';
	try {
		const rawCharacters = JSON.parse(charactersJson) as any[];
		const rawIndex = rawCharacters.findIndex((c) => c && c.id === characterId);
		if (rawIndex === -1) {
			logger.warn('storage', 'Character not found', {
				characterId,
				availableIds: rawCharacters
					.map((c) => c && c.id)
					.filter(Boolean)
					.join(', ')
			});
			return null;
		}

		const rawChar = rawCharacters[rawIndex];

		// Deserialize using the centralized deserializer (this will normalize in-memory)
		const deserialized = deserializeCharacterFromStorage(JSON.stringify(rawChar));
		if (!deserialized) {
			logger.warn('storage', 'Failed to deserialize character', { characterId });
			return null;
		}

		// If the stored raw character had attacks as an object map, convert it and persist
		try {
			const attacksRaw = rawChar?.characterState?.attacks;
			if (attacksRaw && !Array.isArray(attacksRaw) && typeof attacksRaw === 'object') {
				logger.info('migration', 'Migrating legacy attacks format', {
					characterId,
					change: 'object to array'
				});
				// Backup before mutating stored data
				backupCharacterData();
				// Convert to array and persist the raw characters array
				rawChar.characterState = rawChar.characterState || {};
				rawChar.characterState.attacks = Object.values(attacksRaw);
				rawCharacters[rawIndex] = rawChar;
				localStorage.setItem('savedCharacters', JSON.stringify(rawCharacters));
				logger.info('migration', 'Migration complete for character', { characterId });
			}
		} catch (mErr) {
			logger.warn('migration', 'Failed to migrate character', {
				characterId,
				error: mErr instanceof Error ? mErr.message : String(mErr)
			});
		}

		logger.debug('storage', 'Found character', {
			characterId,
			name: deserialized.finalName || deserialized.id
		});
		return deserialized;
	} catch (err) {
		logger.error('storage', 'Failed to load saved characters for lookup', {
			error: err instanceof Error ? err.message : String(err)
		});
		return null;
	}
};

/**
 * Save a single character's state
 */
export const saveCharacterState = (characterId: string, state: CharacterState): void => {
	const characters = getAllSavedCharacters();
	const characterIndex = characters.findIndex((char) => char.id === characterId);

	if (characterIndex === -1) {
		logger.warn('storage', 'Character not found for state update', { characterId });
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
	const characterIndex = characters.findIndex((char) => char.id === character.id);

	if (characterIndex === -1) {
		logger.warn('storage', 'Character not found for update', { characterId: character.id });
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
		logger.info('storage', 'Character data backed up', {
			timestamp: new Date().toISOString()
		});
	}
};

/**
 * Restore from backup if something goes wrong
 */
export const restoreFromBackup = (): boolean => {
	const backup = localStorage.getItem('savedCharacters_backup');
	if (backup) {
		localStorage.setItem('savedCharacters', backup);
		logger.info('storage', 'Character data restored from backup');
		return true;
	}
	logger.warn('storage', 'No backup found to restore from');
	return false;
};

/**
 * One-time migration: convert any characterState.attacks stored as an object map
 * into an array (Object.values) and persist the rewritten savedCharacters.
 * This function makes a backup before mutating localStorage.
 */
export const migrateSavedCharactersToArrayAttacks = (): boolean => {
	try {
		const raw = localStorage.getItem('savedCharacters');
		if (!raw) {
			logger.info('migration', 'No savedCharacters in localStorage, nothing to migrate');
			return false;
		}

		// Backup current data
		backupCharacterData();

		const parsed = JSON.parse(raw) as any[];
		let didChange = false;

		const rewritten = parsed.map((char) => {
			try {
				const cs = char.characterState || {};
				const attacksRaw = cs.attacks;
				if (attacksRaw && !Array.isArray(attacksRaw) && typeof attacksRaw === 'object') {
					// Convert object map to array
					cs.attacks = Object.values(attacksRaw);
					didChange = true;
				}
				return { ...char, characterState: cs };
			} catch (e) {
				logger.warn('migration', 'Failed to process character during migration', {
					error: e instanceof Error ? e.message : String(e)
				});
				return char;
			}
		});

		if (didChange) {
			localStorage.setItem('savedCharacters', JSON.stringify(rewritten));
			logger.info('migration', 'Migration complete: attacks converted to array format');
		} else {
			logger.info('migration', 'No characters needed attacks migration');
		}

		return didChange;
	} catch (err) {
		logger.error('migration', 'Migration failed', {
			error: err instanceof Error ? err.message : String(err)
		});
		return false;
	}
};

/**
 * Convenience function that will run the migration if the flag is present on window
 * or when explicitly invoked. This avoids running migration automatically in prod.
 */
export const runMigrationIfRequested = (force = false): boolean => {
	if (force) return migrateSavedCharactersToArrayAttacks();
	try {
		const win: any = typeof window !== 'undefined' ? window : undefined;
		if (win && win.__MIGRATE_ATTACKS_TO_ARRAY__ === true) {
			logger.info('migration', 'Migration flag detected on window, running migration');
			return migrateSavedCharactersToArrayAttacks();
		}
	} catch (e) {
		// ignore
	}
	return false;
};
