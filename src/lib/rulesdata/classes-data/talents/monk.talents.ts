import type { Talent } from './talent.types';

export const monkTalents: Talent[] = [
	{
		id: 'monk_expanded_stances',
		name: 'Expanded Stances',
		category: 'Class',
		description:
			'You learn 2 additional Monk Stances. Once on each of your turns, you can enter a Monk Stance without spending SP.',
		prerequisites: { classId: 'monk', feature: 'Monk Stance' },
		effects: [
			{ type: 'GRANT_CHOICE', target: 'monk_stance', value: 2 },
			{
				type: 'GRANT_ABILITY',
				target: 'free_stance_entry',
				value: 'Enter a Monk Stance for free once per turn.'
			}
		]
	},
	{
		id: 'monk_internal_damage',
		name: 'Internal Damage',
		category: 'Class',
		description:
			'When you make an Unarmed Strike, you can spend any amount of SP to cause the target to make a Repeated Physical Save. Failure: They become Impaired for 1 minute and take Sonic damage equal to the SP spent at the start of their turns.',
		prerequisites: { classId: 'monk', other: '1 or more Monk Features', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'internal_damage',
				value: 'Spend SP on Unarmed Strike to cause Impaired and ongoing Sonic damage.'
			}
		]
	},
	{
		id: 'monk_steel_fist',
		name: 'Steel Fist',
		category: 'Class',
		description:
			'Your Unarmed Strikes deal 2 damage but no longer have the Impact Property. Once on each of your turns, when you make a Melee Martial Attack, you can spend 1 SP to immediately make an Unarmed Strike against a creature within range.',
		prerequisites: { classId: 'monk', feature: 'Monk Training', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'steel_fist',
				value:
					'Unarmed Strikes deal 2 damage (lose Impact). Spend 1 SP for an extra Unarmed Strike.'
			}
		]
	}
];
