/**
 * localStorage Adapter for Character Storage
 *
 * This adapter wraps the existing localStorage utilities to conform to the
 * CharacterStorage interface. It allows the existing code to work unchanged
 * while providing the abstraction layer for future Convex integration.
 */

import type {
	CharacterStorage,
	CharacterStorageWithEvents,
	StorageEventListener,
	StorageEvent
} from './characterStorage';
import type { SavedCharacter, CharacterState } from '../types/dataContracts';
import {
	getAllSavedCharacters as legacyGetAll,
	saveAllCharacters as legacySaveAll,
	getCharacterById as legacyGetById,
	saveCharacter as legacySave,
	saveCharacterState as legacySaveState,
	backupCharacterData,
	restoreFromBackup as legacyRestore
} from '../utils/storageUtils';

/**
 * localStorage implementation of CharacterStorage
 */
class LocalStorageAdapter implements CharacterStorageWithEvents {
	private listeners: Set<StorageEventListener> = new Set();

	private emit(event: StorageEvent): void {
		this.listeners.forEach((listener) => listener(event));
	}

	async getAllCharacters(): Promise<SavedCharacter[]> {
		console.log('[GIMLI DEBUG] 🗂️ LocalStorageAdapter.getAllCharacters() called');
		const characters = legacyGetAll();
		console.log('[GIMLI DEBUG] 📋 LocalStorage characters:', {
			characterCount: characters.length,
			characters: characters.map((c) => ({ id: c.id, name: c.finalName }))
		});
		return characters;
	}

	async getCharacterById(id: string): Promise<SavedCharacter | null> {
		return legacyGetById(id);
	}

	async saveCharacter(character: SavedCharacter): Promise<void> {
		legacySave(character);
		this.emit({
			type: 'save',
			characterId: character.id,
			timestamp: new Date()
		});
	}

	async saveAllCharacters(characters: SavedCharacter[]): Promise<void> {
		legacySaveAll(characters);
		this.emit({
			type: 'save',
			timestamp: new Date()
		});
	}

	async saveCharacterState(characterId: string, state: CharacterState): Promise<void> {
		legacySaveState(characterId, state);
		this.emit({
			type: 'update',
			characterId,
			timestamp: new Date()
		});
	}

	async deleteCharacter(id: string): Promise<void> {
		const characters = await this.getAllCharacters();
		const filtered = characters.filter((c) => c.id !== id);
		await this.saveAllCharacters(filtered);
		this.emit({
			type: 'delete',
			characterId: id,
			timestamp: new Date()
		});
	}

	async backup(): Promise<void> {
		backupCharacterData();
		this.emit({
			type: 'backup',
			timestamp: new Date()
		});
	}

	async restoreFromBackup(): Promise<boolean> {
		const success = legacyRestore();
		if (success) {
			this.emit({
				type: 'restore',
				timestamp: new Date()
			});
		}
		return success;
	}

	subscribe(listener: StorageEventListener): () => void {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
}

/**
 * Singleton instance of the localStorage adapter
 */
let instance: LocalStorageAdapter | null = null;

/**
 * Get the localStorage storage adapter
 */
export function getLocalStorageAdapter(): CharacterStorageWithEvents {
	if (!instance) {
		instance = new LocalStorageAdapter();
	}
	return instance;
}

/**
 * Export for direct use
 */
export const localStorageAdapter = {
	get: getLocalStorageAdapter
};
