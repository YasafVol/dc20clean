import type { Talent } from './talent.types';

export const barbarianTalents: Talent[] = [
  {
    id: 'barbarian_unfathomable_strength',
    name: 'Unfathomable Strength',
    category: 'Class',
    description: 'While Raging, you can wield Two-Handed Weapons using only one hand. Your Jump Distance also increases by 1.',
    prerequisites: { classId: 'barbarian', feature: 'Rage', level: 3 },
    effects: [
      { type: 'GRANT_ABILITY', target: 'titan_grip', value: 'Wield Two-Handed weapons in one hand while Raging.' },
      { type: 'MODIFY_STAT', target: 'jumpDistance', value: 1 },
    ],
  },
  {
    id: 'barbarian_swift_berserker',
    name: 'Swift Berserker',
    category: 'Class',
    description: 'You can immediately enter a Rage as a Reaction upon rolling for Initiative. The movement granted by your Charge ignores Difficult Terrain and doesn’t provoke Opportunity Attacks.',
    prerequisites: { classId: 'barbarian', feature: 'Rage', subclass: 'Berserker', level: 3 },
    effects: [
      { type: 'GRANT_ABILITY', target: 'quick_to_anger', value: 'Enter Rage as a reaction to Initiative.' },
      { type: 'GRANT_ABILITY', target: 'unstoppable_charge', value: 'Charge ignores Difficult Terrain and Opportunity Attacks.' },
    ],
  },
];

