import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const eruption: Spell = {
	id: 'eruption',
	name: 'Eruption',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Bludgeoning', 'Earth', 'Motion'],

	cost: { ap: 2 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You create a 2 Space diameter Sphere of erupting earth within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Bludgeoning damage.'
		}
	],
	spellPassive:
		'Quake: The ground rumbles and quakes, causing all unsecured small objects to fall and leaving visible cracks and marks across surfaces.',
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
			description: 'The diameter of the Sphere increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Erupted',
			description:
				'Each target makes a Physical Save. Save Failure: The target is pushed upward X Spaces.',
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Fractured',
			description:
				'Surfaces in the Area becomes Difficult Terrain. A creature can spend 1 AP to clear 1 Space of this Difficult Terrain, returning the Space to normal.'
		}
	]
};
