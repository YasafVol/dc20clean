import type { Talent } from './talent.types';

export const commanderTalents: Talent[] = [
  {
    id: 'commander_seize_momentum',
    name: 'Seize Momentum',
    category: 'Class',
    description: 'When an ally within your Commanding Aura scores a Heavy Hit, you can use your Commander’s Call as a Reaction.',
    prerequisites: { classId: 'commander', feature: 'Commander’s Call', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'seize_momentum',
        value: 'Use Commander’s Call as a Reaction when an ally scores a Heavy Hit.',
      },
    ],
  },
  {
    id: 'commander_coordinated_command',
    name: 'Coordinated Command',
    category: 'Class',
    description: 'Once per Round, when you use your Commander’s Call, you can spend 1 additional SP to target a second creature within range (including yourself).',
    prerequisites: { classId: 'commander', feature: 'Commander’s Call', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'coordinated_command',
        value: 'Spend 1 SP with Commander’s Call to target a second creature.',
      },
    ],
  },
];

