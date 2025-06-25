// src/lib/stores/characterInProgressStore.ts

import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { CharacterInProgress } from '@prisma/client'; // Assuming Prisma client is generated
import { classesData } from '../rulesdata/classes';

// Define the shape of the data stored in the characterInProgressStore
// This should mirror the CharacterInProgress Prisma model, plus any UI state
interface CharacterInProgressStoreData extends CharacterInProgress {
  // Add any UI-specific state here if needed, e.g., current step in wizard
  currentStep: number;
  // Add temporary state for trait selection overflow
  overflowTraitId: string | null;
  overflowAttributeName: string | null;
  // Add Level and Combat Mastery
  level: number;
  combatMastery: number; // Derived, but included in interface for clarity
}

// Initial state for the store, matching Prisma defaults and adding UI state
const initialCharacterInProgressState: CharacterInProgressStoreData = {
  id: '', // Will be set when a new character is started/loaded
  attribute_might: -2,
  attribute_agility: -2,
  attribute_charisma: -2,
  attribute_intelligence: -2,
  pointsSpent: 0,

  // Core Stats
  level: 1, // Default to Level 1 for MVP
  combatMastery: 1, // Calculated: Math.ceil(level / 2)

  ancestry1Id: null,
  ancestry2Id: null,
  selectedTraitIds: '', // JSON string of selected trait IDs
  ancestryPointsSpent: 0,

  classId: null,
  selectedFeatureChoices: '', // JSON string of selected feature choice IDs/values

  // Skills, Equipment, Details fields will be added/updated later
  finalName: null,
  finalPlayerName: null,

  createdAt: new Date(), // Placeholder, will be set by DB
  updatedAt: new Date(), // Placeholder, will be set by DB

  // UI State
  currentStep: 1, // Start at Stage A (Attributes)
  overflowTraitId: null,
  overflowAttributeName: null,
};

// Create the writable store
export const characterInProgressStore: Writable<CharacterInProgressStoreData> = writable(initialCharacterInProgressState);

// Helper function to get an attribute's modifier
// In DC20, the attribute score itself is the modifier.
// Handles null or undefined scores by returning 0.
export function getModifier(attributeScore: number | null | undefined): number {
  return attributeScore ?? 0;
}

// Constant for Level 1 Combat Mastery (DC20 p.22)
export const L1_COMBAT_MASTERY = 1; // Keep for reference, but use derived store

// --- Derived Stores ---

// Derived store for Combat Mastery (half level rounded up)
export const combatMastery = derived(
  characterInProgressStore,
  ($store) => {
    return Math.ceil(($store.level ?? 1) / 2); // Default to level 1 if store.level is null/undefined
  }
);

// Derived store for the Prime Modifier Value and Attribute
export const primeModifier = derived(
  characterInProgressStore,
  ($store) => {
    const attributes = [
      { name: 'Might', value: $store.attribute_might },
      { name: 'Agility', value: $store.attribute_agility },
      { name: 'Charisma', value: $store.attribute_charisma },
      { name: 'Intelligence', value: $store.attribute_intelligence },
    ];

    // Find the highest attribute score
    let highestAttribute = attributes[0];
    for (let i = 1; i < attributes.length; i++) {
      if (attributes[i].value > highestAttribute.value) {
        highestAttribute = attributes[i];
      }
    }

    // Handle ties: If there's a tie, the player chooses.
    // For now, we'll just pick the first one in case of a tie.
    // A more complex implementation might require user input on tie-breaking.
    // Add a defensive check for highestAttribute
    if (!highestAttribute) {
        console.error("Error calculating primeModifier: highestAttribute is undefined.");
        return { value: 0, attribute: 'Unknown' }; // Return a default safe value
    }

    const primeModifierValue = highestAttribute.value;
    const primeModifierAttribute = highestAttribute.name;

    return { value: primeModifierValue, attribute: primeModifierAttribute };
  }
);

// Derived store for Save Masteries (DC20 p.22)
export const saveMasteries = derived(
  [characterInProgressStore, primeModifier, combatMastery],
  ([$store, $primeModifier, $combatMastery]) => {
    const primeModValue = $primeModifier.value;
    const primeModAttribute = $primeModifier.attribute;

    // Save Mastery = Combat Mastery + Attribute Modifier
    // If the attribute is the Prime Modifier, use the Prime Modifier value.
    // Otherwise, use the attribute's own modifier (which is the score itself).
    // Use the derived combatMastery store
    const currentCombatMastery = $combatMastery;

    return {
      might: currentCombatMastery + (primeModAttribute === 'Might' ? primeModValue : getModifier($store.attribute_might)),
      agility: currentCombatMastery + (primeModAttribute === 'Agility' ? primeModValue : getModifier($store.attribute_agility)),
      charisma: currentCombatMastery + (primeModAttribute === 'Charisma' ? primeModValue : getModifier($store.attribute_charisma)),
      intelligence: currentCombatMastery + (primeModAttribute === 'Intelligence' ? primeModValue : getModifier($store.attribute_intelligence)),
    };
  }
);

// Derived store for Grit Points (Base + Charisma Modifier)
export const gritPoints = derived(
  characterInProgressStore,
  ($store) => {
    // Assuming base Grit Points are defined in class data, but for now use a placeholder
    const baseGrit = 2; // Placeholder, should come from class data
    return baseGrit + getModifier($store.attribute_charisma);
  }
);

// Derived store for Jump Distance (Agility Modifier, min 1)
export const jumpDistance = derived(
  characterInProgressStore,
  ($store) => {
    const agilityModifier = getModifier($store.attribute_agility);
    return agilityModifier < 1 ? 1 : agilityModifier;
  }
);

/**
 * Derived store for Starting SP (from class)
 */
export const startingSP = derived(
  characterInProgressStore,
  ($store) => {
    if (!$store.classId) return 0;
    const classData = classesData.find(c => c.id === $store.classId);
    return classData?.startingSP ?? 0;
  }
);

/**
 * Derived store for Starting MP (from class)
 */
export const startingMP = derived(
  characterInProgressStore,
  ($store) => {
    if (!$store.classId) return 0;
    const classData = classesData.find(c => c.id === $store.classId);
    return classData?.startingMP ?? 0;
  }
);

// Derived store for Provisional Skill Points (5 + Intelligence Modifier + Class Bonus)
export const provisionalSkillPoints = derived(
  characterInProgressStore,
  ($store) => {
    const intelligenceModifier = getModifier($store.attribute_intelligence);
    // Assuming class data is available to get skillPointGrantLvl1
    // For now, use a placeholder of 0 if classId is not set
    const classSkillBonus = 0; // Placeholder, should come from class data based on $store.classId
    return 5 + intelligenceModifier + classSkillBonus;
  }
);

// Derived store for Ancestry Points Remaining (Base 4 + Negative Traits - Spent)
export const ancestryPointsRemaining = derived(
  characterInProgressStore,
  ($store) => {
    const basePoints = 4; // DC20 p.16
    // Need to access traitsData to calculate points from negative traits
    // For now, this calculation is incomplete without access to traitsData
    const pointsFromNegativeTraits = 0; // Placeholder
    return basePoints + pointsFromNegativeTraits - $store.ancestryPointsSpent;
  }
);

/**
 * Derived store for Max HP (Class HP + Might Modifier + Ancestry HP)
 * Uses selected class's baseHpContribution, defaults to 8 if not set.
 */
export const maxHP = derived(
  characterInProgressStore,
  ($store) => {
    const classData = classesData.find(c => c.id === $store.classId);
    const classHP = classData?.baseHpContribution ?? 8;
    const mightModifier = getModifier($store.attribute_might);
    const ancestryHP = 0; // Assuming 0 for MVP until Ancestry HP is implemented
    return classHP + mightModifier + ancestryHP;
  }
);

// Derived store for Area Defense (8 + CM + Might Modifier + Charisma Modifier + Bonuses)
export const areaDefense = derived(
  [characterInProgressStore, combatMastery],
  ([$store, $combatMastery]) => {
    const mightModifier = getModifier($store.attribute_might);
    const charismaModifier = getModifier($store.attribute_charisma);
    const bonuses = 0; // Assuming 0 for MVP until bonuses are implemented
    return 8 + $combatMastery + mightModifier + charismaModifier + bonuses;
  }
);

// Derived store for Precision Defense (8 + CM + Agility Modifier + Intelligence Modifier + Bonuses)
export const precisionDefense = derived(
  [characterInProgressStore, combatMastery],
  ([$store, $combatMastery]) => {
    const agilityModifier = getModifier($store.attribute_agility);
    const intelligenceModifier = getModifier($store.attribute_intelligence);
    const bonuses = 0; // Assuming 0 for MVP until bonuses are implemented
    return 8 + $combatMastery + agilityModifier + intelligenceModifier + bonuses;
  }
);

// Derived store for Initiative (CM + Agility Modifier)
export const initiative = derived(
  [characterInProgressStore, combatMastery],
  ([$store, $combatMastery]) => {
    const agilityModifier = getModifier($store.attribute_agility);
    return $combatMastery + agilityModifier;
  }
);
