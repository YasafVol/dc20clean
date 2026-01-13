import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const disintegratingBeam: Spell = {
	id: 'disintegrating-beam',
	name: 'Disintegrating Beam',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Nullification,
	tags: ['True'],
	isCantrip: false,
	cost: { ap: 2, mp: 2 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You create a 4 Space Line of pure destructive energy. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 True Damage. The additional damage from Critical Hits and Heavy Hits or higher is doubled.'
		}
	],
	cantripPassive:
		'Annihilating: Creatures and objects killed or destroyed by this Spell are reduced to a pile of ash.',
	enhancements: [
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
			description: 'The length of the Line increases by 6 Spaces.',
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
			cost: 2,
			name: 'Weaken',
			description: "Each target makes a Physical save. Save Failure: They're Weakened for 1 Round."
		},
		{
			type: 'MP',
			cost: 4,
			name: 'Disintegrating',
			description:
				'Each Target makes a Repeated Physical save. Save Failure: They gain Vulnerable (1) to all damage for 1 Round.',
			repeatable: true
		}
	]
};
