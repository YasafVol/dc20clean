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
		// DC20 v0.10 p.158: "they take True damage at the start of each of their turns equal to the SP spent"
		description:
			'When you make an Unarmed Strike, you can spend SP to cause the target to make a Repeated Physical Save. Failure: They become Impaired for 1 minute and take True damage at the start of each of their turns equal to the SP spent.',
		prerequisites: { classId: 'monk', other: '1 or more Monk Features', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'internal_damage',
				value: 'Spend SP on Unarmed Strike to cause Impaired and ongoing True damage.'
			}
		]
	},
	{
		id: 'monk_steel_fist',
		name: 'Steel Fist',
		category: 'Class',
		// DC20 v0.10 p.158: "Your Unarmed Strikes gain the Impact Property."
		description:
			'Your Unarmed Strikes gain the Impact Property. Once on each of your turns, when you make a Melee Martial Attack, you can spend 1 SP to immediately make an Unarmed Strike against a creature within range. This Unarmed Strike is not subjected to the Multiple Check Penalty and does not advance that penalty.',
		prerequisites: { classId: 'monk', feature: 'Monk Training', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'steel_fist_impact',
				value: 'Unarmed Strikes gain Impact Property.'
			},
			{
				type: 'GRANT_ABILITY',
				target: 'steel_fist_flurry',
				value: 'Spend 1 SP for an extra Unarmed Strike without MCP penalty.'
			}
		]
	}
];
