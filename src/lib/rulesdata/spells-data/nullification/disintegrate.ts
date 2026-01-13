import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const disintegrate: Spell = {
	id: 'disintegrate',
	name: 'Disintegrate',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Nullification,
	tags: ['True'],
	isCantrip: false,
	cost: { ap: 1, mp: 2 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a bolt of pure destructive energy. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 3 True Damage. The additional damage from Critical Hits and Heavy Hits or higher is doubled.'
		}
	],
	cantripPassive:
		'Annihilating: Creatures and objects killed or destroyed by this Spell are reduced to a pile of ash.',
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
			type: 'MP',
			cost: 1,
			name: 'Destructive',
			description: 'The Spell deals double damage to objects and magical structures.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Weaken',
			description: "The target makes a Physical save. Save Failure: They're Weakened for 1 Round."
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Disintegrating',
			description:
				'The target makes a Physical save. Save Failure: They gain Vulnerable (1) to all damage for 1 Round.',
			repeatable: true
		}
	]
};
