/**
 * Simple trait cost calculation utility
 * Used by character context to calculate ancestry points spent
 */

import { traitsData } from '../rulesdata/_new_schema/traits';

/**
 * Calculate the total cost of selected traits
 * @param traitIds Array of trait IDs
 * @returns Total cost of all traits
 */
export function calculateTraitCosts(traitIds: string[]): number {
	return traitIds.reduce((total, traitId) => {
		const trait = traitsData.find(t => t.id === traitId);
		return total + (trait?.cost || 0);
	}, 0);
}
