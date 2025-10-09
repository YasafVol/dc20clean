// path.types.ts

/**
 * A unique identifier for each character path.
 * Using a union of string literals provides type safety and autocompletion.
 */
export type PathId = 'martial_path' | 'spellcaster_path';

/**
 * Defines the specific benefits gained at a single level of a path's progression.
 * All properties are optional because a level might only grant one or two things.
 */
export interface PathBenefits {
  staminaPoints?: number;
  maneuversLearned?: number;
  techniquesLearned?: number;
  manaPoints?: number;
  cantripsLearned?: number;
  spellsLearned?: number;
}

/**
 * Represents a single tier in a path's progression table.
 */
export interface PathLevel {
  pathLevel: number; // The number of Path Points spent to unlock this tier
  benefits: PathBenefits;
}

/**
 * The complete data structure for a single Character Path.
 */
export interface CharacterPath {
  id: PathId;
  name: string;
  description: string;
  progression: PathLevel[];
  specialRules?: string[];
}