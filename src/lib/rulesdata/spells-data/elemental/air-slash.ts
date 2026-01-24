import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const airSlash: Spell = {
	id: 'air-slash',
	name: 'Air Slash',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Air', 'Bleeding', 'Motion', 'Slashing'],

	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a slash of high velocity wind that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Slashing damage.'
		}
	],
	spellPassive:
		"Wind: Unsecured mundane objects in the target's space are knocked over or blown away, especially light ones (papers, tools, empty crates). Can slam doors, scatter sand/dust and disperse smoke.",
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
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Bleeding',
			description:
				'1 target makes a Repeated Physical Save. Save Failure: The target begins Bleeding for 1 minute.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Hidden Slash',
			description: 'You add a d10 to your Attack Check.'
		}
	]
};
