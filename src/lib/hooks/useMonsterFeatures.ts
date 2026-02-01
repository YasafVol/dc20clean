/**
 * Monster Features Hooks for DM Tools
 *
 * React hooks for working with monster features.
 * Combines official (static) features with custom (Convex) features.
 */

import { useQuery, useMutation } from 'convex/react';
import { useCallback, useMemo } from 'react';
import { api } from '../../../convex/_generated/api';
import {
	OFFICIAL_MONSTER_FEATURES,
	OFFICIAL_FEATURES_BY_ID,
	getFeaturesByCost,
	validateFeatureBudget as validateBudget,
} from '../rulesdata/dm/monsterFeatures';
import type { MonsterFeature } from '../rulesdata/schemas/monster.schema';
import { generateContentId } from '../utils/idGenerator';

// ============================================================================
// TYPES
// ============================================================================

export interface FeatureWithSource extends MonsterFeature {
	source: 'official' | 'custom' | 'homebrew';
}

export interface UseFeatureListResult {
	/** All available features (official + custom + homebrew) */
	allFeatures: FeatureWithSource[];
	/** Official features only */
	officialFeatures: MonsterFeature[];
	/** User's custom features */
	customFeatures: MonsterFeature[];
	/** Approved homebrew features */
	homebrewFeatures: MonsterFeature[];
	/** Loading state */
	isLoading: boolean;
}

export interface UseFeatureResult {
	feature: FeatureWithSource | null;
	isLoading: boolean;
}

export interface FeatureMutations {
	createFeature: (feature: Omit<MonsterFeature, 'id' | 'isOfficial'>) => Promise<string>;
	updateFeature: (id: string, updates: Partial<MonsterFeature>) => Promise<void>;
	deleteFeature: (id: string) => Promise<void>;
	restoreFeature: (id: string) => Promise<void>;
	permanentlyDeleteFeature: (id: string) => Promise<void>;
	forkFeature: (sourceId: string, sourceType: 'official' | 'custom' | 'homebrew', sourceData: MonsterFeature) => Promise<{ id: string }>;
	submitForReview: (id: string, visibility: 'public_anonymous' | 'public_credited') => Promise<void>;
}

export interface FeatureBudgetValidation {
	valid: boolean;
	spent: number;
	remaining: number;
	overBy: number;
}

// ============================================================================
// QUERY HOOKS
// ============================================================================

/**
 * Hook for getting all available features (official + custom + homebrew)
 */
export function useMonsterFeatures(): UseFeatureListResult {
	const customFeatures = useQuery(api.customFeatures.list);
	const homebrewFeatures = useQuery(api.customFeatures.listHomebrew, {});

	return useMemo(() => {
		const isLoading = customFeatures === undefined || homebrewFeatures === undefined;

		// Add source to official features
		const officialWithSource: FeatureWithSource[] = OFFICIAL_MONSTER_FEATURES.map((f) => ({
			...f,
			source: 'official' as const,
		}));

		// Add source to custom features
		const customWithSource: FeatureWithSource[] = ((customFeatures ?? []) as unknown as MonsterFeature[]).map((f) => ({
			...f,
			source: 'custom' as const,
		}));

		// Add source to homebrew features (filter out user's own to avoid duplicates)
		const homebrewWithSource: FeatureWithSource[] = ((homebrewFeatures ?? []) as unknown as MonsterFeature[])
			.filter((h) => !customFeatures?.some((c: { id: string }) => c.id === h.id))
			.map((f) => ({
				...f,
				source: 'homebrew' as const,
			}));

		// Combine all features
		const allFeatures = [...officialWithSource, ...customWithSource, ...homebrewWithSource];

		return {
			allFeatures,
			officialFeatures: [...OFFICIAL_MONSTER_FEATURES],
			customFeatures: (customFeatures ?? []) as unknown as MonsterFeature[],
			homebrewFeatures: (homebrewFeatures ?? []) as unknown as MonsterFeature[],
			isLoading,
		};
	}, [customFeatures, homebrewFeatures]);
}

/**
 * Hook for getting a single feature by ID (searches all sources)
 */
export function useMonsterFeature(id: string | null): UseFeatureResult {
	// Check official features first (synchronous)
	const officialFeature = id ? OFFICIAL_FEATURES_BY_ID.get(id) : undefined;

	// Query custom/homebrew if not official
	const customFeature = useQuery(
		api.customFeatures.getById,
		id && !officialFeature ? { id } : 'skip'
	);

	return useMemo(() => {
		if (!id) {
			return { feature: null, isLoading: false };
		}

		// Return official feature immediately
		if (officialFeature) {
			return {
				feature: { ...officialFeature, source: 'official' as const },
				isLoading: false,
			};
		}

		// Return custom/homebrew feature
		if (customFeature) {
			const source = (customFeature as { isHomebrew?: boolean }).isHomebrew ? 'homebrew' : 'custom';
			return {
				feature: { ...(customFeature as unknown as MonsterFeature), source } as FeatureWithSource,
				isLoading: false,
			};
		}

		return {
			feature: null,
			isLoading: customFeature === undefined,
		};
	}, [id, officialFeature, customFeature]);
}

/**
 * Hook for getting features grouped by point cost
 */
export function useFeaturesByCost() {
	const { allFeatures, isLoading } = useMonsterFeatures();

	return useMemo(() => {
		const byPointCost: Record<number, FeatureWithSource[]> = {
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
		};

		for (const feature of allFeatures) {
			const cost = feature.pointCost;
			if (cost >= 1 && cost <= 5) {
				byPointCost[cost].push(feature);
			}
		}

		return {
			byPointCost,
			officialByCost: {
				1: getFeaturesByCost(1),
				2: getFeaturesByCost(2),
				3: getFeaturesByCost(3),
			},
			isLoading,
		};
	}, [allFeatures, isLoading]);
}

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Hook providing all feature mutations
 */
export function useFeatureMutations(): FeatureMutations {
	const createMutation = useMutation(api.customFeatures.create);
	const updateMutation = useMutation(api.customFeatures.update);
	const softDeleteMutation = useMutation(api.customFeatures.softDelete);
	const restoreMutation = useMutation(api.customFeatures.restore);
	const hardDeleteMutation = useMutation(api.customFeatures.hardDelete);
	const forkMutation = useMutation(api.customFeatures.fork);
	const submitMutation = useMutation(api.customFeatures.submitForReview);

	const createFeature = useCallback(
		async (feature: Omit<MonsterFeature, 'id' | 'isOfficial'>): Promise<string> => {
			const id = generateContentId('feature');
			await createMutation({
				feature: {
					id,
					name: feature.name,
					description: feature.description,
					pointCost: feature.pointCost,
					effects: feature.effects,
				},
			});
			return id;
		},
		[createMutation]
	);

	const updateFeature = useCallback(
		async (id: string, updates: Partial<MonsterFeature>): Promise<void> => {
			await updateMutation({
				id,
				updates: {
					name: updates.name,
					description: updates.description,
					pointCost: updates.pointCost,
					effects: updates.effects,
				},
			});
		},
		[updateMutation]
	);

	const deleteFeature = useCallback(
		async (id: string): Promise<void> => {
			await softDeleteMutation({ id });
		},
		[softDeleteMutation]
	);

	const restoreFeature = useCallback(
		async (id: string): Promise<void> => {
			await restoreMutation({ id });
		},
		[restoreMutation]
	);

	const permanentlyDeleteFeature = useCallback(
		async (id: string): Promise<void> => {
			await hardDeleteMutation({ id });
		},
		[hardDeleteMutation]
	);

	const forkFeature = useCallback(
		async (
			sourceId: string,
			sourceType: 'official' | 'custom' | 'homebrew',
			sourceData: MonsterFeature
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
			createFeature,
			updateFeature,
			deleteFeature,
			restoreFeature,
			permanentlyDeleteFeature,
			forkFeature,
			submitForReview,
		}),
		[
			createFeature,
			updateFeature,
			deleteFeature,
			restoreFeature,
			permanentlyDeleteFeature,
			forkFeature,
			submitForReview,
		]
	);
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Hook for validating feature budget
 */
export function useFeatureBudgetValidation(
	featureIds: string[],
	maxPoints: number
): FeatureBudgetValidation {
	const { customFeatures } = useMonsterFeatures();

	return useMemo(() => {
		// Build custom features map for validation
		const customMap = new Map<string, MonsterFeature>();
		for (const feature of customFeatures) {
			customMap.set(feature.id, feature);
		}

		return validateBudget(featureIds, maxPoints, customMap);
	}, [featureIds, maxPoints, customFeatures]);
}

/**
 * Hook for resolving feature IDs to full feature objects
 */
export function useResolveFeatures(featureIds: string[]): {
	features: FeatureWithSource[];
	missing: string[];
	isLoading: boolean;
} {
	const { allFeatures, isLoading } = useMonsterFeatures();

	return useMemo(() => {
		const featureMap = new Map(allFeatures.map((f) => [f.id, f]));
		const features: FeatureWithSource[] = [];
		const missing: string[] = [];

		for (const id of featureIds) {
			const feature = featureMap.get(id);
			if (feature) {
				features.push(feature);
			} else {
				missing.push(id);
			}
		}

		return { features, missing, isLoading };
	}, [featureIds, allFeatures, isLoading]);
}
