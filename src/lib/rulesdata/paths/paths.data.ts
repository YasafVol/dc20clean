// paths.data.ts

import { CharacterPath } from './path.types';

/**
 * An array containing the definitions for all available Character Paths.
 * This is the static "game rule" data for your application.
 */
export const CHARACTER_PATHS: CharacterPath[] = [
  {
    id: 'martial_path',
    name: 'Martial Path',
    description: 'Focuses on combat training, maneuvers, and techniques.',
    progression: [
      { pathLevel: 1, benefits: { staminaPoints: 1, maneuversLearned: 1, techniquesLearned: 1 } },
      { pathLevel: 2, benefits: { staminaPoints: 1 } },
      { pathLevel: 3, benefits: { staminaPoints: 1, maneuversLearned: 1, techniquesLearned: 1 } },
      { pathLevel: 4, benefits: { staminaPoints: 1 } },
    ],
    specialRules: [
      // CORRECTED RULE:
      "Spellcaster Stamina: A Spellcaster gains this benefit after spending 2 Path Points on the Martial Path. Benefit: Once per round, you regain up to half your maximum SP when you use a Spell Enhancement."
    ]
  },
  {
    id: 'spellcaster_path',
    name: 'Spellcaster Path',
    description: 'Focuses on increasing magical resources and known spells.',
    progression: [
      { pathLevel: 1, benefits: { manaPoints: 2, cantripsLearned: 1, spellsLearned: 1 } },
      { pathLevel: 2, benefits: { manaPoints: 2, cantripsLearned: 1 } },
      { pathLevel: 3, benefits: { manaPoints: 2, cantripsLearned: 1, spellsLearned: 1 } },
      { pathLevel: 4, benefits: { manaPoints: 2, spellsLearned: 1 } },
    ],
  },
];