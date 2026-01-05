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
		console.log(
			`Loading character ${data.id || 'unknown'} with schema version: ${data.schemaVersion || 'undefined'}`
		);

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

		console.log(`Successfully loaded character ${data.id || 'unknown'}`);
		return migratedCharacter;
	} catch (error) {
		console.error('Failed to parse character from storage', error);
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
		console.log(`Loading ${rawCharacters.length} characters from localStorage`);

		const characters = rawCharacters
			.map((char: any) => deserializeCharacterFromStorage(JSON.stringify(char)))
			.filter(Boolean) as SavedCharacter[];

		console.log(`Successfully loaded ${characters.length} characters`);
		return characters;
	} catch (error) {
		console.error('Failed to load saved characters', error);
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
		console.log('🪓 saveAllCharacters: serializedCharacters:', serializedCharacters);
		localStorage.setItem('savedCharacters', JSON.stringify(serializedCharacters));
		const afterSave = localStorage.getItem('savedCharacters');
		console.log('🪓 saveAllCharacters: localStorage after save:', afterSave);
	} catch (error) {
		console.error('Failed to save characters', error);
	}
};

/**
 * Get a single character by ID
 */
export const getCharacterById = (characterId: string): SavedCharacter | null => {
	console.log(`Looking for character with ID: ${characterId}`);
	// Read raw savedCharacters so we can migrate a single character in-place if needed
	const charactersJson = localStorage.getItem('savedCharacters') || '[]';
	try {
		const rawCharacters = JSON.parse(charactersJson) as any[];
		const rawIndex = rawCharacters.findIndex((c) => c && c.id === characterId);
		if (rawIndex === -1) {
			console.warn(`Character ${characterId} not found`);
			console.log(
				`Available character IDs: ${rawCharacters
					.map((c) => c && c.id)
					.filter(Boolean)
					.join(', ')}`
			);
			return null;
		}

		const rawChar = rawCharacters[rawIndex];

		// Deserialize using the centralized deserializer (this will normalize in-memory)
		const deserialized = deserializeCharacterFromStorage(JSON.stringify(rawChar));
		if (!deserialized) {
			console.warn(`Failed to deserialize character ${characterId}`);
			return null;
		}

		// If the stored raw character had attacks as an object map, convert it and persist
		try {
			const attacksRaw = rawChar?.characterState?.attacks;
			if (attacksRaw && !Array.isArray(attacksRaw) && typeof attacksRaw === 'object') {
				console.log(
					`Detected legacy attacks map for character ${characterId}, migrating single character`
				);
				// Backup before mutating stored data
				backupCharacterData();
				// Convert to array and persist the raw characters array
				rawChar.characterState = rawChar.characterState || {};
				rawChar.characterState.attacks = Object.values(attacksRaw);
				rawCharacters[rawIndex] = rawChar;
				localStorage.setItem('savedCharacters', JSON.stringify(rawCharacters));
				console.log(`Migrated and saved character ${characterId} with attacks as array`);
			}
		} catch (mErr) {
			console.warn(`Failed to migrate and persist character ${characterId}`, mErr);
		}

		console.log(`Found character: ${deserialized.finalName || deserialized.id}`);
		return deserialized;
	} catch (err) {
		console.error('Failed to load saved characters for lookup', err);
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
	const characterIndex = characters.findIndex((char) => char.id === character.id);

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

/**
 * One-time migration: convert any characterState.attacks stored as an object map
 * into an array (Object.values) and persist the rewritten savedCharacters.
 * This function makes a backup before mutating localStorage.
 */
export const migrateSavedCharactersToArrayAttacks = (): boolean => {
	try {
		const raw = localStorage.getItem('savedCharacters');
		if (!raw) {
			console.log('No savedCharacters in localStorage, nothing to migrate');
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
				console.warn('Failed to process character during migration', e);
				return char;
			}
		});

		if (didChange) {
			localStorage.setItem('savedCharacters', JSON.stringify(rewritten));
			console.log('Migration complete: savedCharacters updated to canonical attacks array shape');
		} else {
			console.log('Migration: no characters needed attacks migration');
		}

		return didChange;
	} catch (err) {
		console.error('Migration failed', err);
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
			console.log('Migration flag detected on window, running migration');
			return migrateSavedCharactersToArrayAttacks();
		}
	} catch (e) {
		// ignore
	}
	return false;
};
