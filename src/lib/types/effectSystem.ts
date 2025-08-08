/**
 * Enhanced Effect System Types
 * 
 * These types support the comprehensive UI enhancements by providing
 * detailed attribution, validation, and breakdown information.
 */

import type { Effect } from '../rulesdata/schemas/character.schema';

// Source attribution for effects
export interface EffectSource {
  type: 'trait' | 'class_feature' | 'choice' | 'base' | 'ancestry_default';
  id: string;
  name: string;
  description?: string;
  category?: string; // e.g., "Human Trait", "Barbarian Level 1"
}

// Effect with source attribution and resolution status
export interface AttributedEffect extends Effect {
  source: EffectSource;
  resolved: boolean; // Whether user choices are resolved
  resolvedValue?: any; // Final resolved value after choices
  dependsOnChoice?: string; // Which choice this effect depends on
}

// Detailed stat breakdown for tooltips
export interface EnhancedStatBreakdown {
  statName: string;
  base: number;
  effects: Array<{
    source: EffectSource;
    value: number;
    condition?: string;
    description: string;
    isActive: boolean; // Whether this effect is currently active
  }>;
  total: number;
  conditionalTotal?: number; // Total if all conditional effects were active
}

// Validation result for real-time feedback
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  attributeLimits: Record<string, AttributeLimit>;
  masteryLimits: MasteryLimitStatus;
}

export interface ValidationError {
  type: 'attribute_limit' | 'points_exceeded' | 'required_choice' | 'mastery_limit';
  field: string;
  message: string;
  currentValue: number;
  maxValue: number;
}

export interface ValidationWarning {
  type: 'approaching_limit' | 'inefficient_choice' | 'missing_optional';
  field: string;
  message: string;
}

export interface AttributeLimit {
  current: number;
  base: number;
  traitBonuses: number;
  max: number;
  exceeded: boolean;
  canIncrease: boolean;
  canDecrease: boolean;
}

export interface MasteryLimitStatus {
  maxSkillMastery: number;
  maxTradeMastery: number;
  currentAdeptCount: number;
  maxAdeptCount: number;
  canSelectAdept: boolean;
}

// Unresolved choice for character creation UI
export interface UnresolvedChoice {
  traitId: string;
  traitName: string;
  effectIndex: number;
  effect: Effect;
  prompt: string;
  options: ChoiceOption[];
  isRequired: boolean;
}

export interface ChoiceOption {
  value: string;
  displayName: string;
  description?: string;
  isValid: boolean;
  validationMessage?: string;
  preview?: EffectPreview;
}

// Effect preview for showing impact of choices
export interface EffectPreview {
  type: 'attribute' | 'skill' | 'stat' | 'ability';
  target: string;
  currentValue: any;
  newValue: any;
  description: string;
}

// Comprehensive calculation result
export interface EnhancedCalculationResult {
  stats: {
    // Final calculated values
    finalMight: number;
    finalAgility: number;
    finalCharisma: number;
    finalIntelligence: number;
    finalHPMax: number;
    finalSPMax: number;
    finalMPMax: number;
    finalPD: number;
    finalAD: number;
    finalPDR: number;
    finalMoveSpeed: number;
    finalJumpDistance: number;
    finalDeathThreshold: number;
    finalSaveDC: number;
    finalInitiativeBonus: number;
    finalRestPoints: number;
    finalGritPoints: number;
  };
  
  // Detailed breakdowns for tooltips
  breakdowns: Record<string, EnhancedStatBreakdown>;
  
  // Abilities and features
  grantedAbilities: Array<{
    name: string;
    description: string;
    source: EffectSource;
    type: 'passive' | 'active' | 'resistance' | 'advantage';
    isConditional: boolean;
    condition?: string;
  }>;
  
  // Conditional modifiers
  conditionalModifiers: Array<{
    effect: AttributedEffect;
    condition: string;
    description: string;
    affectedStats: string[];
  }>;
  
  // Combat training
  combatTraining: Array<{
    type: string;
    source: EffectSource;
  }>;
  
  // Resistances and vulnerabilities
  resistances: Array<{
    type: string;
    value: string;
    source: EffectSource;
  }>;
  
  vulnerabilities: Array<{
    type: string;
    value: string;
    source: EffectSource;
  }>;
  
  // Senses and movement
  senses: Array<{
    type: string;
    range: number;
    source: EffectSource;
  }>;
  
  movements: Array<{
    type: string;
    speed: string;
    source: EffectSource;
  }>;
  
  // Validation results
  validation: ValidationResult;
  
  // Unresolved choices (for character creation)
  unresolvedChoices: UnresolvedChoice[];
  
  // Cache info
  cacheTimestamp: number;
  isFromCache: boolean;
}

// Trait choice storage format
export interface TraitChoiceStorage {
  [key: string]: string; // Format: "trait_id-effect_index" -> "chosen_value"
}

// Character build data for enhanced calculator
export interface EnhancedCharacterBuildData {
  // Core Info
  id: string;
  finalName: string;
  finalPlayerName?: string;
  level: number;

  // Attributes (from point buy)
  attribute_might: number;
  attribute_agility: number;
  attribute_charisma: number;
  attribute_intelligence: number;

  // Progression
  combatMastery: number;

  // Class & Ancestry
  classId: string;
  ancestry1Id?: string;
  ancestry2Id?: string;

  // Selections
  selectedTraitIds: string[]; // Array of trait IDs
  selectedTraitChoices: TraitChoiceStorage; // User choices for traits
  featureChoices: Record<string, any>; // User choices for class features
  
  // Skills/Trades/Languages
  skillsJson: string;
  tradesJson: string;
  languagesJson: string;
  
  // Manual Overrides
  manualPD?: number;
  manualAD?: number;
  manualPDR?: number;
  
  // Timestamps for caching
  lastModified: number;
}

// Hook result for character calculation
export interface CharacterCalculationHook {
  calculationResult: EnhancedCalculationResult;
  isLoading: boolean;
  error?: string;
  
  // Helper functions
  getStatBreakdown: (statName: string) => EnhancedStatBreakdown | undefined;
  getAttributeLimit: (attributeId: string) => AttributeLimit;
  canIncreaseAttribute: (attributeId: string) => boolean;
  canDecreaseAttribute: (attributeId: string) => boolean;
  getEffectPreview: (traitId: string, effectIndex: number, choice: string) => EffectPreview | undefined;
  
  // Validation helpers
  validateTraitChoice: (traitId: string, effectIndex: number, choice: string) => { isValid: boolean; message?: string };
  validateAttributeChange: (attributeId: string, newValue: number) => { isValid: boolean; message?: string };
  
  // Cache control
  invalidateCache: () => void;
  refreshCalculation: () => Promise<void>;
}
