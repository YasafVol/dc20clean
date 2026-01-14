/**
 * Character Storage Abstraction Layer
 *
 * This module provides a unified interface for character persistence that can
 * work with both localStorage (current) and Convex (future).
 *
 * The interface allows for easy swapping of storage backends without changing
 * the consuming code.
 */

import type { SavedCharacter, CharacterState } from '../types/dataContracts';

/**
 * Storage interface for character operations
 *
 * All methods are async to support both sync (localStorage) and async (Convex) backends.
 */
export interface CharacterStorage {
	/**
	 * Get all characters for the current user/session
	 */
	getAllCharacters(): Promise<SavedCharacter[]>;

	/**
	 * Get a single character by ID
	 */
	getCharacterById(id: string): Promise<SavedCharacter | null>;

	/**
	 * Save a new character or update an existing one
	 */
	saveCharacter(character: SavedCharacter): Promise<void>;

	/**
	 * Save multiple characters at once (for batch operations)
	 */
	saveAllCharacters(characters: SavedCharacter[]): Promise<void>;

	/**
	 * Update only the character state (for frequent gameplay saves)
	 */
	saveCharacterState(characterId: string, state: CharacterState): Promise<void>;

	/**
	 * Delete a character by ID
	 */
	deleteCharacter(id: string): Promise<void>;

	/**
	 * Create a backup of current data (localStorage specific, may be no-op for cloud)
	 */
	backup(): Promise<void>;

	/**
	 * Restore from backup (localStorage specific, may be no-op for cloud)
	 */
	restoreFromBackup(): Promise<boolean>;
}

/**
 * Storage provider type for runtime selection
 */
export type StorageProvider = 'localStorage' | 'convex';

/**
 * Get the currently configured storage provider
 */
export function getStorageProvider(): StorageProvider {
	// Check environment variable or feature flag
	const useConvex = import.meta.env.VITE_USE_CONVEX === 'true';
	return useConvex ? 'convex' : 'localStorage';
}

/**
 * Storage event types for subscriptions
 */
export type StorageEventType = 'save' | 'delete' | 'update' | 'backup' | 'restore';

export interface StorageEvent {
	type: StorageEventType;
	characterId?: string;
	timestamp: Date;
}

/**
 * Storage event listener type
 */
export type StorageEventListener = (event: StorageEvent) => void;

/**
 * Extended storage interface with event support
 */
export interface CharacterStorageWithEvents extends CharacterStorage {
	/**
	 * Subscribe to storage events
	 */
	subscribe(listener: StorageEventListener): () => void;
}
