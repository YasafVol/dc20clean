/**
 * Monster Hooks for DM Tools
 *
 * React hooks for interacting with the monster system via Convex.
 * Provides reactive queries and mutation wrappers.
 */

import { useQuery, useMutation } from 'convex/react';
import { useCallback, useMemo } from 'react';
import { api } from '../../../convex/_generated/api';
import type { SavedMonster, MonsterTier, MonsterRoleId } from '../rulesdata/schemas/monster.schema';

// ============================================================================
// TYPES
// ============================================================================

export interface MonsterFilters {
	level?: number;
	tier?: MonsterTier;
	roleId?: MonsterRoleId;
}

export interface UseMonsterListResult {
	monsters: SavedMonster[];
	isLoading: boolean;
}

export interface UseMonsterResult {
	monster: SavedMonster | null;
	isLoading: boolean;
}

export interface MonsterMutations {
	createMonster: (monster: SavedMonster) => Promise<string>;
	updateMonster: (id: string, updates: Partial<SavedMonster>) => Promise<void>;
	deleteMonster: (id: string) => Promise<void>;
	restoreMonster: (id: string) => Promise<void>;
	permanentlyDeleteMonster: (id: string) => Promise<void>;
	duplicateMonster: (id: string) => Promise<{ id: string }>;
	forkMonster: (sourceId: string, sourceType: 'official' | 'custom' | 'homebrew', sourceData: SavedMonster) => Promise<{ id: string }>;
	submitForReview: (id: string, visibility: 'public_anonymous' | 'public_credited') => Promise<void>;
}

// ============================================================================
// QUERY HOOKS
// ============================================================================

/**
 * Hook for listing user's monsters (excluding trash)
 */
export function useMonsterList(): UseMonsterListResult {
	const monsters = useQuery(api.monsters.list);

	return useMemo(
		() => ({
			monsters: (monsters ?? []) as unknown as SavedMonster[],
			isLoading: monsters === undefined,
		}),
		[monsters]
	);
}

/**
 * Hook for getting a single monster by ID
 */
export function useMonster(id: string | null): UseMonsterResult {
	const monster = useQuery(api.monsters.getById, id ? { id } : 'skip');

	return useMemo(
		() => ({
			monster: (monster ?? null) as SavedMonster | null,
			isLoading: id !== null && monster === undefined,
		}),
		[monster, id]
	);
}

/**
 * Hook for listing approved homebrew monsters
 */
export function useHomebrewMonsters(filters?: MonsterFilters): UseMonsterListResult {
	const monsters = useQuery(api.monsters.listHomebrew, filters ?? {});

	return useMemo(
		() => ({
			monsters: (monsters ?? []) as unknown as SavedMonster[],
			isLoading: monsters === undefined,
		}),
		[monsters]
	);
}

/**
 * Hook for listing user's trashed monsters
 */
export function useTrashMonsters(): UseMonsterListResult {
	const monsters = useQuery(api.monsters.listTrash);

	return useMemo(
		() => ({
			monsters: (monsters ?? []) as unknown as SavedMonster[],
			isLoading: monsters === undefined,
		}),
		[monsters]
	);
}

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Hook providing all monster mutations
 */
export function useMonsterMutations(): MonsterMutations {
	const createMutation = useMutation(api.monsters.create);
	const updateMutation = useMutation(api.monsters.update);
	const softDeleteMutation = useMutation(api.monsters.softDelete);
	const restoreMutation = useMutation(api.monsters.restore);
	const hardDeleteMutation = useMutation(api.monsters.hardDelete);
	const duplicateMutation = useMutation(api.monsters.duplicate);
	const forkMutation = useMutation(api.monsters.fork);
	const submitMutation = useMutation(api.monsters.submitForReview);

	const createMonster = useCallback(
		async (monster: SavedMonster): Promise<string> => {
			const result = await createMutation({ monster });
			return result as unknown as string;
		},
		[createMutation]
	);

	const updateMonster = useCallback(
		async (id: string, updates: Partial<SavedMonster>): Promise<void> => {
			await updateMutation({ id, updates });
		},
		[updateMutation]
	);

	const deleteMonster = useCallback(
		async (id: string): Promise<void> => {
			await softDeleteMutation({ id });
		},
		[softDeleteMutation]
	);

	const restoreMonster = useCallback(
		async (id: string): Promise<void> => {
			await restoreMutation({ id });
		},
		[restoreMutation]
	);

	const permanentlyDeleteMonster = useCallback(
		async (id: string): Promise<void> => {
			await hardDeleteMutation({ id });
		},
		[hardDeleteMutation]
	);

	const duplicateMonster = useCallback(
		async (id: string): Promise<{ id: string }> => {
			const result = await duplicateMutation({ id });
			return result as { id: string };
		},
		[duplicateMutation]
	);

	const forkMonster = useCallback(
		async (
			sourceId: string,
			sourceType: 'official' | 'custom' | 'homebrew',
			sourceData: SavedMonster
		): Promise<{ id: string }> => {
			const result = await forkMutation({ sourceId, sourceType, sourceData });
			return result as { id: string };
		},
		[forkMutation]
	);

	const submitForReview = useCallback(
		async (id: string, visibility: 'public_anonymous' | 'public_credited'): Promise<void> => {
			await submitMutation({ id, visibility });
		},
		[submitMutation]
	);

	return useMemo(
		() => ({
			createMonster,
			updateMonster,
			deleteMonster,
			restoreMonster,
			permanentlyDeleteMonster,
			duplicateMonster,
			forkMonster,
			submitForReview,
		}),
		[
			createMonster,
			updateMonster,
			deleteMonster,
			restoreMonster,
			permanentlyDeleteMonster,
			duplicateMonster,
			forkMonster,
			submitForReview,
		]
	);
}

// ============================================================================
// COMBINED HOOK
// ============================================================================

/**
 * Combined hook for monster list with mutations
 */
export function useMonsters() {
	const { monsters, isLoading } = useMonsterList();
	const mutations = useMonsterMutations();

	return useMemo(
		() => ({
			monsters,
			isLoading,
			...mutations,
		}),
		[monsters, isLoading, mutations]
	);
}
