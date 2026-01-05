import type { Talent } from './talent.types';

export const sorcererTalents: Talent[] = [
	{
		id: 'sorcerer_expanded_meta_magic',
		name: 'Expanded Meta Magic',
		category: 'Class',
		description:
			'Your maximum MP increases by 2. You gain 2 additional Meta Magic Spell Enhancements.',
		prerequisites: { classId: 'sorcerer', feature: 'Meta Magic' },
		effects: [
			{ type: 'MODIFY_STAT', target: 'mpMax', value: 2 },
			{ type: 'GRANT_CHOICE', target: 'meta_magic', value: 2 }
		]
	},
	{
		id: 'sorcerer_greater_innate_power',
		name: 'Greater Innate Power',
		category: 'Class',
		description:
			'Your MP maximum increases by 1. When you use your Innate Power, you gain ADV on the Spell Check. You gain another Sorcerous Origin of your choice.',
		prerequisites: { classId: 'sorcerer', feature: 'Innate Power', level: 3 },
		effects: [
			{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 },
			{
				type: 'GRANT_ABILITY',
				target: 'adv_on_innate_power',
				value: 'Gain ADV on Spell Check when using Innate Power.'
			},
			{ type: 'GRANT_CHOICE', target: 'sorcerous_origin', value: 1 }
		]
	},
	{
		id: 'sorcerer_font_of_magic',
		name: 'Font of Magic',
		category: 'Class',
		description:
			'You can spend 2 Rest Points in place of 1 MP on Meta Magic. You regain 1 Rest Point when you roll for Initiative.',
		prerequisites: { classId: 'sorcerer', feature: 'Meta Magic', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'font_of_magic',
				value: 'Spend 2 Rest Points for 1 MP on Meta Magic. Regain 1 Rest Point on Initiative.'
			}
		]
	}
];
