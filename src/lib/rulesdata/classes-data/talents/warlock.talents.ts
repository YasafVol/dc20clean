import type { Talent } from './talent.types';

export const warlockTalents: Talent[] = [
  {
    id: 'warlock_expanded_boon',
    name: 'Expanded Boon',
    category: 'Class',
    description: 'You gain 1 additional Pact Boon.',
    prerequisites: { classId: 'warlock', feature: 'Pact Boon' },
    effects: [{ type: 'GRANT_CHOICE', target: 'pact_boon', value: 1 }],
  },
  {
    id: 'warlock_pact_bane',
    name: 'Pact Bane',
    category: 'Class',
    description: 'You learn the Bane Spell. Creatures subjected to Bane suffer additional effects based on your chosen Pact Boon.',
    prerequisites: { classId: 'warlock', feature: 'Pact Boon', level: 3 },
    effects: [
      { type: 'GRANT_SPELL', target: 'Bane', value: 1 },
      {
        type: 'GRANT_ABILITY',
        target: 'pact_bane',
        value: 'Bane imposes extra effects based on your Pact Boon.',
      },
    ],
  },
  {
    id: 'warlock_warlock_subcontract',
    name: 'Warlock Subcontract',
    category: 'Class',
    description: 'You can spend 1 minute to create a Warlock Subcontract with a willing creature, granting shared telepathy and allowing them to use Hasty Bargain. You can also spend their HP on your Warlock features.',
    prerequisites: { classId: 'warlock', feature: 'Warlock Contract', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'warlock_subcontract',
        value: 'Create a subcontract with an ally for shared benefits and costs.',
      },
    ],
  },
];

