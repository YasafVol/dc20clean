import type { Talent } from './talent.types';

export const spellbladeTalents: Talent[] = [
	{
		id: 'spellblade_expanded_disciplines',
		name: 'Expanded Disciplines',
		category: 'Class',
		description: 'You gain 2 additional Spellblade Disciplines.',
		prerequisites: { classId: 'spellblade', feature: 'Spellblade Disciplines' },
		effects: [{ type: 'GRANT_CHOICE', target: 'spellblade_discipline', value: 2 }]
	},
	{
		id: 'spellblade_sling_blade',
		name: 'Sling-Blade',
		category: 'Class',
		// DC20 v0.10 p.160: "Requirements: Bound Weapon, Spellstrike, Level 3"
		description:
			"The range of your Attacks with Melee Weapons is increased by 2. When you use Spellstrike, the range of the Spell changes to match your Weapon's range.",
		prerequisites: {
			classId: 'spellblade',
			feature: 'Bound Weapon',
			otherFeature: 'Spellstrike',
			level: 3
		},
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'distant_strike',
				value: 'Melee weapon attack range increased by 2.'
			},
			{
				type: 'GRANT_ABILITY',
				target: 'extended_spellstrike',
				value: 'Spellstrike range matches weapon range.'
			}
		]
	},
	{
		id: 'spellblade_adaptive_bond',
		name: 'Adaptive Bond',
		category: 'Class',
		description:
			'You can switch your Bound Damage type more easily. After you take Elemental or Mystical damage, you can change your Bound Damage type to match it for free. You also gain Resistance (1) to your Bound Damage type.',
		prerequisites: { classId: 'spellblade', feature: 'Bound Weapon', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'adaptive_bond',
				value: 'Adapt Bound Damage type and gain Resistance (1) to it.'
			}
		]
	}
];
