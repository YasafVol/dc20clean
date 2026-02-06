/**
 * Convex Adapter for Character Storage
 *
 * This adapter implements CharacterStorage using Convex mutations and queries.
 * It uses the shared Convex client configured in the app.
 */

import type {
	CharacterStorage,
	CharacterStorageWithEvents,
	StorageEventListener,
	StorageEvent
} from './characterStorage';
import type { SavedCharacter, CharacterState } from '../types/dataContracts';
import { api } from '../../../convex/_generated/api';
import { getConvexClient } from '../convexClient';

type StoredCharacterDoc = SavedCharacter & {
	_id: string;
	_creationTime: number;
	userId: string;
};

function normalizeCharacter(doc: StoredCharacterDoc): SavedCharacter {
	const { _id, _creationTime, userId, ...rest } = doc;
	return rest;
}

/**
 * Converts count-based talents Record to array format for database storage.
 * Example: {talent1: 2, talent2: 1} → ['talent1', 'talent1', 'talent2']
 */
function convertTalentsToArray(talents: Record<string, number> | string[] | undefined): string[] {
	if (!talents) return [];
	// If already an array, return as-is
	if (Array.isArray(talents)) return talents;
	// Convert Record<string, number> to array with duplicates
	const result: string[] = [];
	for (const [talentId, count] of Object.entries(talents)) {
		for (let i = 0; i < count; i++) {
			result.push(talentId);
		}
	}
	return result;
}

function sanitizeCharacterStateForConvex(state: CharacterState | undefined): CharacterState | undefined {
	if (!state) return state;

	return {
		...state,
		ui: {
			manualDefenseOverrides: state.ui?.manualDefenseOverrides ?? {},
			combatToggles: {
				isRaging: state.ui?.combatToggles?.isRaging ?? false
			}
		}
	};
}

function prepareCharacterForSave(character: SavedCharacter): SavedCharacter {
	return {
		...character,
		// Convert Record<string, number> to string[] for database compatibility
		selectedTalents: convertTalentsToArray(character.selectedTalents as any),
		characterState: sanitizeCharacterStateForConvex(character.characterState) as CharacterState
	};
}

class ConvexStorageAdapter implements CharacterStorageWithEvents {
	private listeners: Set<StorageEventListener> = new Set();

	private emit(event: StorageEvent): void {
		this.listeners.forEach((listener) => listener(event));
	}

	async getAllCharacters(): Promise<SavedCharacter[]> {
		console.log('[GIMLI DEBUG] 🔍 ConvexStorageAdapter.getAllCharacters() called');
		const client = getConvexClient();
		console.log('[GIMLI DEBUG] 📡 Calling Convex query: api.characters.list');

		try {
			const characters = await client.query(api.characters.list, {});
			console.log('[GIMLI DEBUG] ✅ Convex query response:', {
				characterCount: characters?.length || 0,
				characters: characters?.map((c: any) => ({ id: c.id, name: c.finalName }))
			});
			return (characters || []).map((doc: StoredCharacterDoc) => normalizeCharacter(doc));
		} catch (error) {
			console.error('[GIMLI DEBUG] ❌ Convex query ERROR:', error);
			throw error;
		}
	}

	async getCharacterById(id: string): Promise<SavedCharacter | null> {
		const client = getConvexClient();
		const character = await client.query(api.characters.getById, { id });
		return character ? normalizeCharacter(character as StoredCharacterDoc) : null;
	}

	async saveCharacter(character: SavedCharacter): Promise<void> {
		const client = getConvexClient();
		const existing = await client.query(api.characters.getById, { id: character.id });
		const payload = prepareCharacterForSave(character);

		if (existing) {
			await client.mutation(api.characters.update, { id: character.id, updates: payload });
			this.emit({ type: 'update', characterId: character.id, timestamp: new Date() });
			return;
		}

		await client.mutation(api.characters.create, { character: payload });
		this.emit({ type: 'save', characterId: character.id, timestamp: new Date() });
	}

	async saveAllCharacters(_characters: SavedCharacter[]): Promise<void> {
		for (const character of _characters) {
			await this.saveCharacter(character);
		}
	}

	async saveCharacterState(characterId: string, state: CharacterState): Promise<void> {
		const client = getConvexClient();
		await client.mutation(api.characters.updateState, {
			id: characterId,
			characterState: sanitizeCharacterStateForConvex(state)
		});
		this.emit({ type: 'update', characterId, timestamp: new Date() });
	}

	async deleteCharacter(id: string): Promise<void> {
		const client = getConvexClient();
		await client.mutation(api.characters.remove, { id });
		this.emit({ type: 'delete', characterId: id, timestamp: new Date() });
	}

	async backup(): Promise<void> {
		// Cloud storage doesn't need explicit backups
		return;
	}

	async restoreFromBackup(): Promise<boolean> {
		// Cloud storage doesn't need restore functionality
		return false;
	}

	subscribe(listener: StorageEventListener): () => void {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
}

/**
 * Singleton instance of the Convex adapter
 */
let instance: ConvexStorageAdapter | null = null;

/**
 * Get the Convex storage adapter
 *
 * Note: This will throw until Convex packages are installed
 */
export function getConvexStorageAdapter(): CharacterStorageWithEvents {
	if (!instance) {
		instance = new ConvexStorageAdapter();
	}
	return instance;
}

/**
 * Export for direct use
 */
export const convexStorageAdapter = {
	get: getConvexStorageAdapter
};

