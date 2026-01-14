/**
 * Convex Adapter for Character Storage
 *
 * DRAFT - This adapter will work once Convex packages are installed.
 *
 * This adapter implements CharacterStorage using Convex mutations and queries.
 * It requires the Convex React hooks to be available in the component tree.
 */

import type {
	CharacterStorage,
	CharacterStorageWithEvents,
	StorageEventListener,
	StorageEvent,
} from './characterStorage';
import type { SavedCharacter, CharacterState } from '../types/dataContracts';

// TODO: Uncomment these imports after npm install
// import { useQuery, useMutation } from 'convex/react';
// import { api } from '../../../convex/_generated/api';
// import type { Id } from '../../../convex/_generated/dataModel';

/**
 * Convex storage adapter placeholder
 *
 * This will be the actual implementation once Convex is set up.
 * For now, it throws errors to indicate it's not ready.
 */
class ConvexStorageAdapter implements CharacterStorageWithEvents {
	private listeners: Set<StorageEventListener> = new Set();

	private emit(event: StorageEvent): void {
		this.listeners.forEach((listener) => listener(event));
	}

	async getAllCharacters(): Promise<SavedCharacter[]> {
		throw new Error('Convex storage not configured. Run npm install convex first.');
		// TODO: Implementation after Convex setup:
		// return useQuery(api.characters.list) ?? [];
	}

	async getCharacterById(id: string): Promise<SavedCharacter | null> {
		throw new Error('Convex storage not configured. Run npm install convex first.');
		// TODO: Implementation after Convex setup:
		// return useQuery(api.characters.getById, { characterId: id as Id<'characters'> });
	}

	async saveCharacter(character: SavedCharacter): Promise<void> {
		throw new Error('Convex storage not configured. Run npm install convex first.');
		// TODO: Implementation after Convex setup:
		// const create = useMutation(api.characters.create);
		// const update = useMutation(api.characters.update);
		// if (character._id) {
		//   await update({ characterId: character._id, updates: character });
		// } else {
		//   await create({ character });
		// }
	}

	async saveAllCharacters(_characters: SavedCharacter[]): Promise<void> {
		throw new Error('Convex storage not configured. Run npm install convex first.');
		// Note: Convex doesn't have batch operations by default
		// Would need to iterate and save each
	}

	async saveCharacterState(characterId: string, state: CharacterState): Promise<void> {
		throw new Error('Convex storage not configured. Run npm install convex first.');
		// TODO: Implementation after Convex setup:
		// const updateState = useMutation(api.characters.updateState);
		// await updateState({ characterId: characterId as Id<'characters'>, characterState: state });
	}

	async deleteCharacter(id: string): Promise<void> {
		throw new Error('Convex storage not configured. Run npm install convex first.');
		// TODO: Implementation after Convex setup:
		// const remove = useMutation(api.characters.remove);
		// await remove({ characterId: id as Id<'characters'> });
	}

	async backup(): Promise<void> {
		// Cloud storage doesn't need explicit backups
		console.log('Backup is automatic with Convex cloud storage');
	}

	async restoreFromBackup(): Promise<boolean> {
		// Cloud storage doesn't need restore functionality
		console.log('Restore not needed with Convex cloud storage');
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
	get: getConvexStorageAdapter,
};

// ============================================================================
// REACT HOOKS (to be used after Convex setup)
// ============================================================================

/**
 * React hook for Convex character storage
 *
 * DRAFT - Uncomment and use after Convex setup
 */
/*
export function useConvexCharacterStorage(): CharacterStorage {
	const characters = useQuery(api.characters.list);
	const createMutation = useMutation(api.characters.create);
	const updateMutation = useMutation(api.characters.update);
	const updateStateMutation = useMutation(api.characters.updateState);
	const removeMutation = useMutation(api.characters.remove);

	return {
		getAllCharacters: async () => characters ?? [],
		
		getCharacterById: async (id: string) => {
			const char = characters?.find(c => c._id === id);
			return char ?? null;
		},
		
		saveCharacter: async (character: SavedCharacter) => {
			if (character._id) {
				await updateMutation({ 
					characterId: character._id as Id<'characters'>, 
					updates: character 
				});
			} else {
				await createMutation({ character });
			}
		},
		
		saveAllCharacters: async (chars: SavedCharacter[]) => {
			// Convex doesn't have batch - iterate
			for (const char of chars) {
				if (char._id) {
					await updateMutation({ 
						characterId: char._id as Id<'characters'>, 
						updates: char 
					});
				} else {
					await createMutation({ character: char });
				}
			}
		},
		
		saveCharacterState: async (id: string, state: CharacterState) => {
			await updateStateMutation({ 
				characterId: id as Id<'characters'>, 
				characterState: state 
			});
		},
		
		deleteCharacter: async (id: string) => {
			await removeMutation({ characterId: id as Id<'characters'> });
		},
		
		backup: async () => {
			// No-op for cloud storage
		},
		
		restoreFromBackup: async () => false,
	};
}
*/
