import type { Talent } from './talent.types';

export const clericTalents: Talent[] = [
	{
		id: 'cleric_expanded_order',
		name: 'Expanded Order',
		category: 'Class',
		description:
			'You gain 2 additional Divine Domains. You can’t choose the same option more than once.',
		prerequisites: { classId: 'cleric', feature: 'Cleric Order' },
		effects: [{ type: 'GRANT_CHOICE', target: 'divine_domain', value: 2 }]
	},
	{
		id: 'cleric_bountiful_blessings',
		name: 'Bountiful Blessings',
		category: 'Class',
		description:
			'When Combat starts, you immediately gain a Blessing of your choice for free. Additionally, you can have 2 Blessings at the same time, but you can’t apply both to the same creature at once.',
		prerequisites: { classId: 'cleric', feature: 'Divine Blessing', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'bountiful_blessings',
				value: 'Gain a free Blessing at combat start. Can maintain 2 Blessings at once.'
			}
		]
	},
	{
		id: 'cleric_divine_cleanse',
		name: 'Divine Cleanse',
		category: 'Class',
		description:
			'When a creature fails a Save, you can spend 1 AP as a Reaction to make a Spell Check to let them succeed instead. When a creature benefits from your Lesser Divine Intervention, they are also cured of an affliction.',
		prerequisites: { classId: 'cleric', feature: 'Channel Divinity', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'saving_grace',
				value: '1 AP Reaction to turn a failed Save into a success with a Spell Check.'
			},
			{
				type: 'GRANT_ABILITY',
				target: 'cleansing_intervention',
				value: 'Lesser Divine Intervention also cures an affliction.'
			}
		]
	}
];
