import type { Talent } from './talent.types';

export const wizardTalents: Talent[] = [
  {
    id: 'wizard_expanded_spell_school',
    name: 'Expanded Spell School',
    category: 'Class',
    description: 'Choose 1 additional Spell School. You learn 1 Arcane Cantrip and 1 Arcane Spell from this school, and can use Signature School once per chosen school.',
    prerequisites: { classId: 'wizard', feature: 'Spell School Initiate' },
    effects: [
      { type: 'GRANT_CHOICE', target: 'spell_school', value: 1 },
      { type: 'GRANT_CANTRIP', target: 'chosen_school', value: 1 },
      { type: 'GRANT_SPELL', target: 'chosen_school', value: 1 },
    ],
  },
  {
    id: 'wizard_crowned_sigil',
    name: 'Crowned Sigil',
    category: 'Class',
    description: 'When you create an Arcane Sigil, you can bind it to yourself. While bound, it moves with you and grants you a +2 bonus to your AD.',
    prerequisites: { classId: 'wizard', feature: 'Arcane Sigil', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'crowned_sigil',
        value: 'Bind Arcane Sigil to yourself for mobility and +2 AD.',
      },
    ],
  },
  {
    id: 'wizard_overly_prepared_spell',
    name: 'Overly Prepared Spell',
    category: 'Class',
    description: 'Your Prepared Spell can be changed on a Short Rest, grants Dazed Resistance while Sustaining, and you gain ADV on Spell Duels with it.',
    prerequisites: { classId: 'wizard', feature: 'Prepared Spell', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'overly_prepared_spell',
        value: 'Enhances your Prepared Spell with flexibility and power.',
      },
    ],
  },
];

