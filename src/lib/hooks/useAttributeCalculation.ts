/**
 * Intelligent Attribute Point Calculation Hook
 * 
 * This hook calculates attribute points accounting for trait effects,
 * providing real-time feedback for character creation.
 */

import { useMemo } from 'react';

interface AttributeCalculationResult {
  totalPointsAvailable: number;
  pointsSpent: number;
  pointsRemaining: number;
  forcedAdjustments: Array<{
    attribute: string;
    originalValue: number;
    effectiveValue: number;
    pointsCost: number;
  }>;
  isValid: boolean;
  effectiveAttributes: {
    might: number;
    agility: number;
    charisma: number;
    intelligence: number;
  };
}

/**
 * Calculate attribute points accounting for trait effects
 * This is the NEW, correct calculation that replaces the old one
 */
export const useAttributeCalculation = (characterState: any): AttributeCalculationResult => {
  const BASE_ATTRIBUTE_POINTS = 11;
  
  return useMemo(() => {
    const { 
      attribute_might = -2, 
      attribute_agility = -2, 
      attribute_charisma = -2, 
      attribute_intelligence = -2, 
      selectedTraitIds = [] 
    } = characterState || {};
    
    // Base points spent (base attribute is -2, so +2 to get actual cost)
    const basePointsSpent = 
      (attribute_might + 2) + 
      (attribute_agility + 2) + 
      (attribute_charisma + 2) + 
      (attribute_intelligence + 2);
    
    // Get trait effects
    const traitEffects = getCombinedTraitEffects(selectedTraitIds);
    
    let totalAdjustmentCost = 0;
    const forcedAdjustments: Array<{
      attribute: string;
      originalValue: number;
      effectiveValue: number;
      pointsCost: number;
    }> = [];
    
    // Calculate effective attributes after trait modifiers
    const effectiveAttributes = {
      might: attribute_might + (traitEffects.might || 0),
      agility: attribute_agility + (traitEffects.agility || 0),
      charisma: attribute_charisma + (traitEffects.charisma || 0),
      intelligence: attribute_intelligence + (traitEffects.intelligence || 0)
    };
    
    // Check each attribute for forced adjustments
    const baseAttributes = {
      might: attribute_might,
      agility: attribute_agility,
      charisma: attribute_charisma,
      intelligence: attribute_intelligence
    };
    
    Object.entries(baseAttributes).forEach(([attr, baseValue]) => {
      const effect = traitEffects[attr] || 0;
      const effectiveValue = baseValue + effect;
      
      if (effectiveValue < -2) {
        // Trait forces attribute below minimum, costs points to fix
        const pointsCost = -2 - effectiveValue;
        totalAdjustmentCost += pointsCost;
        
        forcedAdjustments.push({
          attribute: attr,
          originalValue: baseValue,
          effectiveValue: effectiveValue,
          pointsCost: pointsCost
        });
      }
    });
    
    // Calculate bonus points from traits
    const bonusPoints = getBonusAttributePointsFromTraits(selectedTraitIds);
    
    const totalPointsAvailable = BASE_ATTRIBUTE_POINTS + bonusPoints;
    const pointsSpent = basePointsSpent + totalAdjustmentCost;
    const pointsRemaining = totalPointsAvailable - pointsSpent;
    
    return {
      totalPointsAvailable,
      pointsSpent,
      pointsRemaining,
      forcedAdjustments,
      isValid: pointsRemaining >= 0,
      effectiveAttributes
    };
  }, [characterState]);
};

/**
 * Helper function to calculate combined trait effects on attributes
 * This needs to be implemented based on your trait system
 */
const getCombinedTraitEffects = (traitIds: string[]): Record<string, number> => {
  // TODO: Implement this based on your actual trait system
  // For now, return empty effects as a placeholder
  
  if (!Array.isArray(traitIds) || traitIds.length === 0) {
    return {};
  }
  
  // Placeholder implementation - replace with actual trait loading logic
  const effects: Record<string, number> = {};
  
  // Example implementation pattern:
  // traitIds.forEach(traitId => {
  //   const trait = getTraitById(traitId);
  //   if (trait?.effects) {
  //     trait.effects.forEach(effect => {
  //       if (effect.type === 'MODIFY_ATTRIBUTE') {
  //         effects[effect.target] = (effects[effect.target] || 0) + effect.value;
  //       }
  //     });
  //   }
  // });
  
  console.log('getCombinedTraitEffects placeholder called with:', traitIds);
  return effects;
};

/**
 * Helper function to calculate bonus attribute points from traits
 * This needs to be implemented based on your trait system
 */
const getBonusAttributePointsFromTraits = (traitIds: string[]): number => {
  // TODO: Implement this based on your actual trait system
  // For now, return 0 as a placeholder
  
  if (!Array.isArray(traitIds) || traitIds.length === 0) {
    return 0;
  }
  
  // Placeholder implementation - replace with actual trait loading logic
  let bonusPoints = 0;
  
  // Example implementation pattern:
  // traitIds.forEach(traitId => {
  //   const trait = getTraitById(traitId);
  //   if (trait?.effects) {
  //     trait.effects.forEach(effect => {
  //       if (effect.type === 'MODIFY_ATTRIBUTE_POINTS') {
  //         bonusPoints += effect.value;
  //       }
  //     });
  //   }
  // });
  
  console.log('getBonusAttributePointsFromTraits placeholder called with:', traitIds);
  return bonusPoints;
};

/**
 * Hook to check if a trait can be selected without exceeding attribute points
 */
export const useCanSelectTrait = (characterState: any) => {
  const currentCalculation = useAttributeCalculation(characterState);
  
  return useMemo(() => {
    return (traitId: string): boolean => {
      if (!traitId || !characterState) return false;
      
      // If trait is already selected, it can always be deselected
      const selectedTraitIds = characterState.selectedTraitIds || [];
      if (selectedTraitIds.includes(traitId)) {
        return true;
      }
      
      // Simulate adding this trait
      const simulatedState = {
        ...characterState,
        selectedTraitIds: [...selectedTraitIds, traitId]
      };
      
      const simulatedCalculation = useAttributeCalculation(simulatedState);
      return simulatedCalculation.isValid;
    };
  }, [characterState, currentCalculation]);
};

/**
 * Hook to get the attribute point impact of selecting a trait
 */
export const useTraitPointImpact = (characterState: any, traitId: string) => {
  const currentCalculation = useAttributeCalculation(characterState);
  
  return useMemo(() => {
    if (!traitId || !characterState) {
      return { pointsRemaining: currentCalculation.pointsRemaining, impact: 0 };
    }
    
    const selectedTraitIds = characterState.selectedTraitIds || [];
    const isCurrentlySelected = selectedTraitIds.includes(traitId);
    
    // Simulate the opposite state (add if not selected, remove if selected)
    const simulatedState = {
      ...characterState,
      selectedTraitIds: isCurrentlySelected 
        ? selectedTraitIds.filter(id => id !== traitId)
        : [...selectedTraitIds, traitId]
    };
    
    const simulatedCalculation = useAttributeCalculation(simulatedState);
    const impact = simulatedCalculation.pointsRemaining - currentCalculation.pointsRemaining;
    
    return {
      pointsRemaining: simulatedCalculation.pointsRemaining,
      impact: impact,
      isValid: simulatedCalculation.isValid,
      forcedAdjustments: simulatedCalculation.forcedAdjustments
    };
  }, [characterState, traitId, currentCalculation]);
};
