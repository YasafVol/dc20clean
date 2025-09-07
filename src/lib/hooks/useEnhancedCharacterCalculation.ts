/**
 * Enhanced Character Calculation Hook
 *
 * This hook provides real-time character calculations with detailed breakdowns
 * for tooltips, validation, and effect previews.
 */

import { useMemo, useCallback, useEffect, useState } from 'react';
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
	EffectPreview,
	EnhancedCharacterBuildData
} from '../types/effectSystem';

// --- Constants ---
const CACHE_TTL = 500; // 500ms time-to-live for cache

// --- Types ---
interface CalculationCache {
	[key: string]: {
		timestamp: number;
		result: EnhancedCalculationResult;
	};
}

// --- Module-level cache ---
let calculationCache: CalculationCache = {};

// --- Helper Functions ---
const generateCacheKey = (data: EnhancedCharacterBuildData): string => {
	// Create a stable key from the character build data
	const {
		id,
		level,
		attribute_might,
		attribute_agility,
		attribute_charisma,
		attribute_intelligence
	} = data;
	const traits = [...(data.selectedTraitIds || [])].sort().join(',');
	const features = JSON.stringify(data.featureChoices || {});
	const traitChoices = JSON.stringify(data.selectedTraitChoices || {});

	return `${id}-${level}-${attribute_might}-${attribute_agility}-${attribute_charisma}-${attribute_intelligence}-${traits}-${features}-${traitChoices}`;
};

/**
 * Enhanced character calculation hook with caching and detailed validation.
 * Replaces the existing `useCharacterCalculation`.
 */
export function useEnhancedCharacterCalculation(): CharacterCalculationHook {
	const { state: characterContext } = useCharacter();

	const [calculationResult, setCalculationResult] = useState<EnhancedCalculationResult | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | undefined>();

	// Memoize the calculation to avoid re-running on every render
	const performCalculation = useCallback(async () => {
		setIsLoading(true);
		try {
			const buildData = convertToEnhancedBuildData(characterContext);
			const cacheKey = generateCacheKey(buildData);
			const cached = calculationCache[cacheKey];

			if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
				// Return cached result if fresh
				setCalculationResult({ ...cached.result, isFromCache: true });
			} else {
				// Otherwise, run new calculation and update cache
				const result = calculateCharacterWithBreakdowns(buildData);
				calculationCache[cacheKey] = { timestamp: Date.now(), result };
				setCalculationResult({ ...result, isFromCache: false });
			}
		} catch (e: any) {
			setError(`Calculation error: ${e.message}`);
			console.error('Calculation failed:', e);
		} finally {
			setIsLoading(false);
		}
	}, [characterContext]);

	// Re-run calculation whenever character context changes
	useEffect(() => {
		performCalculation();
	}, [performCalculation]);

	// --- Helper Functions ---
	const getStatBreakdown = (statName: string): EnhancedStatBreakdown | undefined => {
		return calculationResult?.breakdowns[statName];
	};

	const getAttributeLimit = (attributeId: string): AttributeLimit => {
		const defaultLimit = {
			current: 0,
			base: 0,
			traitBonuses: 0,
			max: 3,
			exceeded: false,
			canIncrease: true,
			canDecrease: true
		};
		return calculationResult?.validation?.attributeLimits[attributeId] || defaultLimit;
	};

	const canIncreaseAttribute = (attributeId: string): boolean => {
		const limit = getAttributeLimit(attributeId);
		return limit.canIncrease;
	};

	const canDecreaseAttribute = (attributeId: string): boolean => {
		const limit = getAttributeLimit(attributeId);
		return limit.canDecrease;
	};

	const getEffectPreview = (
		traitId: string,
		effectIndex: number,
		choice: string
	): EffectPreview | undefined => {
		// This requires a more complex implementation that can re-run a partial
		// calculation with the hypothetical choice. For now, this is a placeholder.
		console.warn('getEffectPreview is not fully implemented yet.');
		return undefined;
	};

	// --- Validation Helpers ---
	const validateTraitChoice = (
		traitId: string,
		effectIndex: number,
		choice: string
	): { isValid: boolean; message?: string } => {
		// Placeholder for more complex validation (e.g., preventing duplicate skill choices)
		return { isValid: true };
	};

	const validateAttributeChange = (
		attributeId: string,
		newValue: number
	): { isValid: boolean; message?: string } => {
		const limit = getAttributeLimit(attributeId);
		const currentTotal = limit.base + limit.traitBonuses;
		const newTotal = newValue + limit.traitBonuses;

		if (newValue < -2) {
			return { isValid: false, message: 'Attribute cannot be lower than -2.' };
		}
		if (newTotal > limit.max) {
			return { isValid: false, message: `Total attribute cannot exceed ${limit.max}.` };
		}
		return { isValid: true };
	};

	// --- Cache Control ---
	const invalidateCache = () => {
		calculationCache = {};
	};

	const refreshCalculation = async () => {
		invalidateCache();
		await performCalculation();
	};

	// Return a default or empty result while loading or on error
	const finalResult =
		calculationResult ||
		({
			stats: {},
			breakdowns: {},
			grantedAbilities: [],
			conditionalModifiers: [],
			validation: {
				isValid: false,
				errors: [],
				warnings: [],
				attributeLimits: {},
				masteryLimits: {}
			},
			unresolvedChoices: [],
			isFromCache: false,
			cacheTimestamp: 0
		} as unknown as EnhancedCalculationResult);

	return {
		calculationResult: finalResult,
		isLoading,
		error,
		getStatBreakdown,
		getAttributeLimit,
		canIncreaseAttribute,
		canDecreaseAttribute,
		getEffectPreview,
		validateTraitChoice,
		validateAttributeChange,
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
