import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const gust: Spell = {
	id: 'gust',
	name: 'Gust',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Air', 'Blinded', 'Deafened', 'Motion'],

	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You seize the air and compel it to create one of the following effects at a point you can see within range:'
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
			type: 'MP',
			cost: 1,
			name: 'Distance',
			description: 'The target is pushed an additional 2 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Grand Gust',
			description:
				'Your size category for using Push increases by 1 (up to a maximum of Colossal) and the maximum weight you can affect with Move Object increases by 200 pounds (100 kg).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Harsh Wind',
			description: 'On a Success, the target is also Blinded and Deafened for 1 round.'
		}
	]
};
