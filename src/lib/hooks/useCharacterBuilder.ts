/**
 * Character Builder Hook
 * 
 * This is the central hook that runs the unified character calculation engine.
 * It provides memoized calculation results to prevent unnecessary re-renders.
 */

import { useMemo } from 'react';
import { calculateCharacterWithBreakdowns, convertToEnhancedBuildData } from '../services/enhancedCharacterCalculator';
import type { CharacterInProgressStoreData } from '../stores/characterContext';
import type { EnhancedCalculationResult } from '../types/effectSystem';

export function useCharacterBuilder(state: CharacterInProgressStoreData): EnhancedCalculationResult {
  // Memoize the conversion of state to build data.
  const buildData = useMemo(() => convertToEnhancedBuildData(state), [state]);

  // Memoize the expensive calculation. This is the core of the new engine.
  // It will only re-run if the `buildData` object changes.
  const calculationResult = useMemo(() => {
    return calculateCharacterWithBreakdowns(buildData);
  }, [buildData]);

  return calculationResult;
}
