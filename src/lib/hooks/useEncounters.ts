/**
 * Encounter Hooks
 *
 * React hooks for encounter data access and mutations.
 */

import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { SavedEncounter, EncounterMonsterSlot } from '../rulesdata/schemas/encounter.schema';

/**
 * Hook to list user's encounters
 */
export function useEncounterList() {
	const encounters = useQuery(api.encounters.list);
	return {
		encounters: (encounters ?? []) as SavedEncounter[],
		isLoading: encounters === undefined,
	};
}

/**
 * Hook to get a single encounter
 */
export function useEncounter(id: string | null) {
	const encounter = useQuery(api.encounters.getById, id ? { id } : 'skip');
	return {
		encounter: encounter as SavedEncounter | null | undefined,
		isLoading: encounter === undefined,
	};
}

/**
 * Hook to list homebrew encounters
 */
export function useHomebrewEncounters() {
	const encounters = useQuery(api.encounters.listHomebrew);
	return {
		encounters: (encounters ?? []) as SavedEncounter[],
		isLoading: encounters === undefined,
	};
}

/**
 * Hook to list trashed encounters
 */
export function useTrashEncounters() {
	const encounters = useQuery(api.encounters.listTrash);
	return {
		encounters: (encounters ?? []) as SavedEncounter[],
		isLoading: encounters === undefined,
	};
}

/**
 * Hook for encounter mutations
 */
export function useEncounterMutations() {
	const createMutation = useMutation(api.encounters.create);
	const updateMutation = useMutation(api.encounters.update);
	const addSlotMutation = useMutation(api.encounters.addMonsterSlot);
	const updateSlotMutation = useMutation(api.encounters.updateMonsterSlot);
	const removeSlotMutation = useMutation(api.encounters.removeMonsterSlot);
	const softDeleteMutation = useMutation(api.encounters.softDelete);
	const restoreMutation = useMutation(api.encounters.restore);
	const hardDeleteMutation = useMutation(api.encounters.hardDelete);
	const forkMutation = useMutation(api.encounters.fork);
	const submitMutation = useMutation(api.encounters.submitForReview);
	const duplicateMutation = useMutation(api.encounters.duplicate);

	return {
		createEncounter: async (encounter: SavedEncounter) => {
			return createMutation({ encounter });
		},

		updateEncounter: async (id: string, updates: Partial<SavedEncounter>) => {
			return updateMutation({ id, updates });
		},

		addMonsterSlot: async (encounterId: string, slot: EncounterMonsterSlot) => {
			return addSlotMutation({ encounterId, slot });
		},

		updateMonsterSlot: async (
			encounterId: string,
			slotId: string,
			updates: Partial<EncounterMonsterSlot>
		) => {
			return updateSlotMutation({ encounterId, slotId, updates });
		},

		removeMonsterSlot: async (encounterId: string, slotId: string) => {
			return removeSlotMutation({ encounterId, slotId });
		},

		deleteEncounter: async (id: string) => {
			return softDeleteMutation({ id });
		},

		restoreEncounter: async (id: string) => {
			return restoreMutation({ id });
		},

		permanentlyDeleteEncounter: async (id: string) => {
			return hardDeleteMutation({ id });
		},

		forkEncounter: async (
			sourceId: string,
			sourceType: 'official' | 'custom' | 'homebrew',
			sourceData: SavedEncounter
		) => {
			return forkMutation({ sourceId, sourceType, sourceData });
		},

		submitForReview: async (
			id: string,
			visibility: 'public_anonymous' | 'public_credited'
		) => {
			return submitMutation({ id, visibility });
		},

		duplicateEncounter: async (id: string) => {
			return duplicateMutation({ id });
		},
	};
}

/**
 * Combined hook for encounters
 */
export function useEncounters() {
	const { encounters, isLoading } = useEncounterList();
	const mutations = useEncounterMutations();

	return {
		encounters,
		isLoading,
		...mutations,
	};
}
