import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const windBurst: Spell = {
	id: 'wind-burst',
	name: 'Wind Burst',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Slashing'],

	cost: { ap: 2 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a vortex of high velocity wind that envelops a 2 Space diameter Sphere area within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Slashing damage.'
		}
	],
	spellPassive:
		'Wind: Unsecured mundane objects in the area are knocked over or blown away, especially light ones (papers, tools, empty crates). Can slam doors, scatter sand/dust and disperse smoke.',
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
			type: 'MP',
			cost: 1,
			name: 'Bleeding',
			description:
				'Each target makes a Repeated Physical Save. Failure: The target begins Bleeding for 1 minute.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Turbulent',
			description:
				'Each target makes a Might Save. Save Failure: The target is moved to an unoccupied Space of your choice within the area.'
		}
	]
};
