import type { Talent } from './talent.types';

export const druidTalents: Talent[] = [
  {
    id: 'druid_wild_form_expansion',
    name: 'Wild Form Expansion',
    category: 'Class',
    description: 'At the start of each of your turns, you can transform into your True Form or a Wild Form without spending AP. When you use Wild Form, you get 2 additional Trait Points to spend.',
    prerequisites: { classId: 'druid', feature: 'Wild Form', level: 3 },
    effects: [
      { type: 'GRANT_ABILITY', target: 'free_transformation', value: 'Transform for free at the start of your turn.' },
      { type: 'MODIFY_STAT', target: 'wild_form_trait_points', value: 2 },
    ],
  },
  {
    id: 'druid_natures_vortex',
    name: 'Nature’s Vortex',
    category: 'Class',
    description: 'Creatures of your choice are immune to your Nature’s Torrent. You can increase its radius by 1 and impose DisADV on Ranged Attacks within it. You can also spend 2 AP to use it as an Aura.',
    prerequisites: { classId: 'druid', feature: 'Nature’s Torrent', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'natures_vortex',
        value: 'Enhances Nature’s Torrent with immunity for allies, larger radius, and an aura option.',
      },
    ],
  },
];

