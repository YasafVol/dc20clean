import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const bless: Spell = {
	id: 'bless',
	name: 'Bless',
	sources: [SpellSource.Divine],
	school: SpellSchool.Divination,
	tags: ['Embolden'],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'A creature of your choice within range gains 1 of the blessings from the list below for the duration. Make a DC 15 Spell Check. Failure: The blessing is a d6. Success: The blessing is a d8. Success (5): The Blessing is a d10. Blessings'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Targets',
			description: 'You increase the number of targets by X.',
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Full Bless',
			description:
				'The target benefits from all 3 Blessings. The cost of this Enhancement increases to 2 MP if you use the Targets Enhancement.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Greater Bless',
			description: 'The size of the die granted increases by 1 step (d6 -> d8 -> d10 -> d12).'
		}
	]
};
