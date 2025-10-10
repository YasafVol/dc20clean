import type { Ancestry, Trait } from '../rulesdata/schemas/character.schema';
import { traitsData } from '../rulesdata/ancestries/traits';

/**
 * Service for handling ancestry-related business logic
 * NO business logic should be in the frontend components!
 */

/**
 * Maximum ancestry points available to spend
 */
export const MAX_ANCESTRY_POINTS = 5;

/**
 * Get full trait data by trait ID
 */
export const getTraitById = (traitId: string): Trait | undefined => {
	return traitsData.find((trait) => trait.id === traitId);
};

/**
 * Get all default traits for an ancestry with their full data
 */
export const getDefaultTraits = (ancestry: Ancestry): Trait[] => {
	return ancestry.defaultTraitIds
		.map((id) => getTraitById(id))
		.filter((trait): trait is Trait => trait !== undefined);
};

/**
 * Get all expanded traits for an ancestry with their full data
 */
export const getExpandedTraits = (ancestry: Ancestry): Trait[] => {
	return ancestry.expandedTraitIds
		.map((id) => getTraitById(id))
		.filter((trait): trait is Trait => trait !== undefined);
};

/**
 * Calculate total points spent on selected traits
 * Negative costs reduce the total (you gain points back)
 */
export const calculatePointsSpent = (selectedTraitIds: string[]): number => {
	return selectedTraitIds.reduce((total, traitId) => {
		const trait = getTraitById(traitId);
		return total + (trait?.cost ?? 0);
	}, 0);
};

/**
 * Calculate points remaining (can be negative if over budget)
 */
export const calculatePointsRemaining = (selectedTraitIds: string[]): number => {
	const spent = calculatePointsSpent(selectedTraitIds);
	return MAX_ANCESTRY_POINTS - spent;
};

/**
 * Check if a trait can be selected based on current budget and ancestry rules
 * - If trait is already selected, can always deselect
 * - If trait has negative cost (gives points), can always select
 * - If trait has zero cost, check if zero-cost limit is reached
 * - If trait has positive cost, check if we have enough points
 */
export const canSelectTrait = (
	traitId: string,
	currentlySelectedTraitIds: string[],
	ancestry: Ancestry
): boolean => {
	const trait = getTraitById(traitId);
	if (!trait) return false;

	const isSelected = currentlySelectedTraitIds.includes(traitId);

	// Can always deselect
	if (isSelected) return true;

	// Can always select negative cost traits (they give points)
	if (trait.cost < 0) return true;

	// Check zero-cost trait limit (default: max 1 zero-cost trait)
	if (trait.cost === 0) {
		return canSelectZeroCostTrait(ancestry, currentlySelectedTraitIds);
	}

	// Check if we have enough points for positive cost traits
	const pointsRemaining = calculatePointsRemaining(currentlySelectedTraitIds);
	return pointsRemaining >= trait.cost;
};

/**
 * Check if points are within valid budget (0 to MAX_ANCESTRY_POINTS spent)
 */
export const isWithinBudget = (selectedTraitIds: string[]): boolean => {
	const spent = calculatePointsSpent(selectedTraitIds);
	return spent >= 0 && spent <= MAX_ANCESTRY_POINTS;
};

/**
 * Count how many zero-cost traits are currently selected
 */
export const countZeroCostTraits = (selectedTraitIds: string[]): number => {
	return selectedTraitIds.filter((id) => {
		const trait = getTraitById(id);
		return trait && trait.cost === 0;
	}).length;
};

/**
 * Check if selecting a zero-cost trait would exceed the limit
 * Uses ancestry.selectionRules.maxZeroCostTraits (default: 1)
 */
export const canSelectZeroCostTrait = (
	ancestry: Ancestry,
	currentlySelectedTraitIds: string[]
): boolean => {
	const maxZeroCost = ancestry.selectionRules?.maxZeroCostTraits ?? 1;
	const currentZeroCostCount = countZeroCostTraits(currentlySelectedTraitIds);
	return currentZeroCostCount < maxZeroCost;
};

/**
 * Get formatted ancestry data for display
 * Includes default and expanded traits with costs
 */
export interface FormattedAncestryData {
	ancestry: Ancestry;
	defaultTraits: Trait[];
	expandedTraits: Trait[];
	totalDefaultCost: number;
}

export const getFormattedAncestryData = (ancestry: Ancestry): FormattedAncestryData => {
	const defaultTraits = getDefaultTraits(ancestry);
	const expandedTraits = getExpandedTraits(ancestry);

	const totalDefaultCost = defaultTraits.reduce((sum, trait) => sum + trait.cost, 0);

	return {
		ancestry,
		defaultTraits,
		expandedTraits,
		totalDefaultCost
	};
};
