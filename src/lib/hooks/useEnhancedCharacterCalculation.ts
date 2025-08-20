/**
 * Enhanced Character Calculation Hook
 *
 * This hook provides real-time character calculations with detailed breakdowns
 * for tooltips, validation, and effect previews.
 */

import { useMemo, useCallback } from 'react';
import { useCharacter } from '../stores/characterContext';
import {
	calculateCharacterWithBreakdowns,
	convertToEnhancedBuildData
} from '../services/enhancedCharacterCalculator';
import type {
	CharacterCalculationHook,
	EnhancedCalculationResult,
	EnhancedStatBreakdown,
	AttributeLimit,
	EffectPreview
} from '../types/effectSystem';

/**
 * Main hook for enhanced character calculations
 */
export function useEnhancedCharacterCalculation(): CharacterCalculationHook {
	const { state, dispatch } = useCharacter();

	// Convert context state to enhanced build data
	const buildData = useMemo(() => {
		return convertToEnhancedBuildData(state);
	}, [
		state.attribute_might,
		state.attribute_agility,
		state.attribute_charisma,
		state.attribute_intelligence,
		state.classId,
		state.ancestry1Id,
		state.ancestry2Id,
		state.selectedTraitIds,
		state.selectedTraitChoices,
		state.selectedFeatureChoices,
		state.skillsJson,
		state.tradesJson,
		state.languagesJson,
		state.level,
		state.combatMastery
	]);

	// Perform calculation with caching
	const calculationResult: EnhancedCalculationResult = useMemo(() => {
		// Check if we have valid cached results
		if (state.cachedEffectResults && state.cacheTimestamp) {
			const cacheAge = Date.now() - state.cacheTimestamp;
			if (cacheAge < 5000) {
				// Cache for 5 seconds
				try {
					const cached = JSON.parse(state.cachedEffectResults);
					return { ...cached, isFromCache: true };
				} catch (e) {
					// Cache is invalid, recalculate
				}
			}
		}

		// Calculate fresh results
		const result = calculateCharacterWithBreakdowns(buildData);

		// Cache the results (async to avoid blocking)
		setTimeout(() => {
			dispatch({
				type: 'UPDATE_STORE',
				updates: {
					cachedEffectResults: JSON.stringify(result),
					cacheTimestamp: result.cacheTimestamp
				}
			});
		}, 0);

		return result;
	}, [buildData, state.cachedEffectResults, state.cacheTimestamp, dispatch]);

	// Helper function to get stat breakdown
	const getStatBreakdown = useCallback(
		(statName: string): EnhancedStatBreakdown | undefined => {
			return calculationResult.breakdowns[statName];
		},
		[calculationResult.breakdowns]
	);

	// Helper function to get attribute limit
	const getAttributeLimit = useCallback(
		(attributeId: string): AttributeLimit => {
			return (
				calculationResult.validation.attributeLimits[attributeId] || {
					current: 0,
					base: 0,
					traitBonuses: 0,
					max: 3,
					exceeded: false,
					canIncrease: true,
					canDecrease: true
				}
			);
		},
		[calculationResult.validation.attributeLimits]
	);

	// Check if attribute can be increased
	const canIncreaseAttribute = useCallback(
		(attributeId: string): boolean => {
			const limit = getAttributeLimit(attributeId);
			return limit.canIncrease;
		},
		[getAttributeLimit]
	);

	// Check if attribute can be decreased
	const canDecreaseAttribute = useCallback(
		(attributeId: string): boolean => {
			const limit = getAttributeLimit(attributeId);
			return limit.canDecrease;
		},
		[getAttributeLimit]
	);

	// Get effect preview for trait choices
	const getEffectPreview = useCallback(
		(traitId: string, effectIndex: number, choice: string): EffectPreview | undefined => {
			// Find the unresolved choice
			const unresolvedChoice = calculationResult.unresolvedChoices.find(
				(uc) => uc.traitId === traitId && uc.effectIndex === effectIndex
			);

			if (!unresolvedChoice) return undefined;

			const effect = unresolvedChoice.effect;

			if (effect.type === 'MODIFY_ATTRIBUTE') {
				const currentValue = (buildData as any)[`attribute_${choice}`] || 0;
				const newValue = currentValue + (effect.value as number);

				return {
					type: 'attribute',
					target: choice,
					currentValue,
					newValue,
					description: `${choice} will become ${newValue} (${currentValue} base + ${effect.value} trait)`
				};
			}

			if (effect.type === 'GRANT_SKILL_EXPERTISE') {
				return {
					type: 'skill',
					target: choice,
					currentValue: 'Normal mastery limit',
					newValue: 'Increased mastery limit',
					description: `${choice} mastery cap will increase by 1 and you gain 1 level`
				};
			}

			return undefined;
		},
		[calculationResult.unresolvedChoices, buildData]
	);

	// Validate trait choice
	const validateTraitChoice = useCallback(
		(
			traitId: string,
			effectIndex: number,
			choice: string
		): { isValid: boolean; message?: string } => {
			// Find the effect being validated
			const unresolvedChoice = calculationResult.unresolvedChoices.find(
				(uc) => uc.traitId === traitId && uc.effectIndex === effectIndex
			);

			if (!unresolvedChoice) {
				return { isValid: false, message: 'Choice not found' };
			}

			const effect = unresolvedChoice.effect;

			if (effect.type === 'MODIFY_ATTRIBUTE') {
				const currentValue = (buildData as any)[`attribute_${choice}`] || 0;
				const newValue = currentValue + (effect.value as number);

				if (newValue > 3) {
					return {
						isValid: false,
						message: `Would exceed maximum attribute value of +3 (current: ${currentValue}, final: ${newValue})`
					};
				}

				if (newValue < -2) {
					return {
						isValid: false,
						message: `Would go below minimum attribute value of -2 (current: ${currentValue}, final: ${newValue})`
					};
				}
			}

			return { isValid: true };
		},
		[calculationResult.unresolvedChoices, buildData]
	);

	// Validate attribute change
	const validateAttributeChange = useCallback(
		(attributeId: string, newValue: number): { isValid: boolean; message?: string } => {
			const limit = getAttributeLimit(attributeId);
			const finalValue = newValue + limit.traitBonuses;

			if (finalValue > 3) {
				return {
					isValid: false,
					message: `Would exceed maximum total of +3 including trait bonuses (+${limit.traitBonuses})`
				};
			}

			if (newValue < -2) {
				return {
					isValid: false,
					message: `Cannot go below minimum base value of -2`
				};
			}

			return { isValid: true };
		},
		[getAttributeLimit]
	);

	// Cache control functions
	const invalidateCache = useCallback(() => {
		dispatch({ type: 'INVALIDATE_CACHE' });
	}, [dispatch]);

	const refreshCalculation = useCallback(async () => {
		invalidateCache();
		// The calculation will automatically refresh on the next render
	}, [invalidateCache]);

	return {
		calculationResult,
		isLoading: false, // Could add loading states if calculations become expensive
		error: undefined,

		// Helper functions
		getStatBreakdown,
		getAttributeLimit,
		canIncreaseAttribute,
		canDecreaseAttribute,
		getEffectPreview,

		// Validation helpers
		validateTraitChoice,
		validateAttributeChange,

		// Cache control
		invalidateCache,
		refreshCalculation
	};
}

/**
 * Simplified hook for components that only need basic calculation results
 */
export function useCharacterStats() {
	const { calculationResult } = useEnhancedCharacterCalculation();
	return calculationResult.stats;
}

/**
 * Hook for components that need validation information
 */
export function useCharacterValidation() {
	const { calculationResult } = useEnhancedCharacterCalculation();
	return calculationResult.validation;
}

/**
 * Hook for components that need breakdown information for tooltips
 */
export function useStatBreakdowns() {
	const { calculationResult } = useEnhancedCharacterCalculation();
	return calculationResult.breakdowns;
}
