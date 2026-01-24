import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const sunburst: Spell = {
	id: 'sunburst',
	name: 'Sunburst',
	sources: [SpellSource.Divine],
	school: SpellSchool.Invocation,
	tags: ['Blinded', 'Exposed', 'Light', 'Radiant'],

	cost: { ap: 2 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a flash of brilliant radiance in a 6 Space tall, 2 Space diameter Cylinder within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Radiant damage.'
		}
	],
	spellPassive:
		'Illuminate: The Light level of the area increases by 1 until the end of the turn.',
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
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: 'The diameter of the Cylinder increases by 1 Space and the Height by 3 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Expose',
			description:
				'Each target makes a Physical Save. Save Failure: The target is Exposed for 1 Round.'
		},
		{
			type: 'MP',
			cost: 4,
			name: 'Blinding',
			description:
				'Each target makes a Physical Save. Save Failure: The target is Blinded for 1 Round. ## Nullification'
		}
	]
};
