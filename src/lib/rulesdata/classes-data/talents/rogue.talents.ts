import type { Talent } from './talent.types';

export const rogueTalents: Talent[] = [
	{
		id: 'rogue_unseen_ambusher',
		name: 'Unseen Ambusher',
		category: 'Class',
		description:
			'You have ADV on Stealth Checks made in Combat. Enemies you are Hidden from have DisADV on their Saves against your Debilitating Strikes.',
		prerequisites: { classId: 'rogue', feature: 'Debilitating Strike', level: 3 },
		effects: [
			{ type: 'GRANT_ABILITY', target: 'skulker', value: 'ADV on Stealth Checks in Combat.' },
			{
				type: 'GRANT_ABILITY',
				target: 'backstab',
				value: 'Enemies Hidden from have DisADV on Saves vs Debilitating Strikes.'
			}
		]
	},
	{
		id: 'rogue_sinister_shot',
		name: 'Sinister Shot',
		category: 'Class',
		description:
			'Your Cheap Shot deals +1 damage for each additional Condition on the target. Multiple stacks of the same Condition count only once.',
		prerequisites: { classId: 'rogue', feature: 'Cheap Shot', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'sinister_shot',
				value: 'Cheap Shot deals +1 damage per unique Condition on the target.'
			}
		]
	}
];
