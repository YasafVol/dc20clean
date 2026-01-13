import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const windBlade: Spell = {
	id: 'wind-blade',
	name: 'Wind Blade',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Slashing'],
	isCantrip: true,
	cost: { ap: 2 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a rush of high velocity wind in a 1 Space Arc. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Slashing damage.'
		}
	],
	cantripPassive:
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
			description: "The Area's radius increases by 1 Space.",
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Aura',
			description: 'The Area becomes an Aura instead.'
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
			cost: 1,
			name: 'Tailwind',
			description:
				'Immediately before or after casting this spell you can move 2 Spaces without provoking Opportunity Attacks.',
			repeatable: true
		}
	]
};
