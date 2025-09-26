// path.service.ts

import { CharacterPath, PathBenefits, PathId } from './path.types';
import { CHARACTER_PATHS } from './paths.data';

// A type defining the character's state for path progression.
// Example: { spellcaster_path: 2, martial_path: 0 }
export type PathProgressionState = Record<PathId, number>;


/**
 * Calculates the total accumulated benefits from all character paths
 * based on the number of points a character has invested.
 *
 * @param progressionState - An object representing the points spent in each path.
 * @returns An object containing the sum of all benefits.
 */
export function calculateTotalPathBenefits(progressionState: PathProgressionState): PathBenefits {
  // Start with a blank slate of benefits.
  const totalBenefits: PathBenefits = {
    staminaPoints: 0,
    maneuversLearned: 0,
    techniquesLearned: 0,
    manaPoints: 0,
    cantripsLearned: 0,
    spellsLearned: 0,
  };

  // Loop through each path in our static data (e.g., 'martial_path', 'spellcaster_path')
  for (const pathDefinition of CHARACTER_PATHS) {
    const pathId = pathDefinition.id;
    const pointsSpent = progressionState[pathId] || 0;

    // If the character has spent no points in this path, skip it.
    if (pointsSpent === 0) {
      continue;
    }

    // Filter the progression table to get only the levels the character has unlocked.
    const unlockedTiers = pathDefinition.progression.filter(
      (level) => level.pathLevel <= pointsSpent
    );

    // Sum the benefits from each unlocked tier.
    for (const tier of unlockedTiers) {
      totalBenefits.staminaPoints += tier.benefits.staminaPoints ?? 0;
      totalBenefits.maneuversLearned += tier.benefits.maneuversLearned ?? 0;
      totalBenefits.techniquesLearned += tier.benefits.techniquesLearned ?? 0;
      totalBenefits.manaPoints += tier.benefits.manaPoints ?? 0;
      totalBenefits.cantripsLearned += tier.benefits.cantripsLearned ?? 0;
      totalBenefits.spellsLearned += tier.benefits.spellsLearned ?? 0;
    }
  }

  return totalBenefits;
}

// --- EXAMPLE USAGE ---

// Let's create a character's path progression state.
// This character has spent 2 points in the Spellcaster Path and 1 in the Martial Path.
const hybridCharacterProgression: PathProgressionState = {
  spellcaster_path: 2,
  martial_path: 1,
};

// Now, we use our service function to calculate the total benefits.
const derivedBenefits = calculateTotalPathBenefits(hybridCharacterProgression);

/*
Expected Calculation:
- From Spellcaster Path (Level 1 & 2):
  - manaPoints: 2 + 2 = 4
  - cantripsLearned: 1 + 1 = 2
  - spellsLearned: 1 + 0 = 1
- From Martial Path (Level 1):
  - staminaPoints: 1
  - maneuversLearned: 1
  - techniquesLearned: 1

The console output will be:
{
  staminaPoints: 1,
  maneuversLearned: 1,
  techniquesLearned: 1,
  manaPoints: 4,
  cantripsLearned: 2,
  spellsLearned: 1
}
*/
console.log(derivedBenefits);