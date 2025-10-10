import type { Talent } from './talent.types';

export const bardTalents: Talent[] = [
  {
    id: 'bard_expanded_repertoire',
    name: 'Expanded Repertoire',
    category: 'Class',
    description: 'You gain 2 Skill Points, learn 2 Spells from any Spell List, and gain another manner of Magical Expression (Auditory or Visual).',
    prerequisites: { classId: 'bard', feature: 'Remarkable Repertoire', level: 3 },
    effects: [
      { type: 'MODIFY_STAT', target: 'skillPoints', value: 2 },
      { type: 'MODIFY_STAT', target: 'spellsKnown', value: 2 },
      { type: 'GRANT_CHOICE', target: 'magical_expression', value: 1 },
    ],
  },
  {
    id: 'bard_helping_hands',
    name: 'Helping Hands',
    category: 'Class',
    description: 'Once per Round, when you take the Help Action, you can grant a bonus d8 Help Die to a different creature within range (including yourself) that they can apply to the same type of Check.',
    prerequisites: { classId: 'bard', feature: 'Font of Inspiration', level: 3 },
    effects: [
      { type: 'GRANT_ABILITY', target: 'helping_hands', value: 'Once per round, grant a second d8 Help Die to a different creature.' },
    ],
  },
];

