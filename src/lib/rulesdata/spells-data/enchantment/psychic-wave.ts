import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const psychicWave: Spell = {
	id: 'psychic-wave',
	name: 'Psychic Wave',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Enchantment,
	tags: ['Psychic'],
	isCantrip: true,
	cost: { ap: 2 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a blast of psychic energy that envelops a 1 Space Arc. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Psychic damage.'
		}
	],
	cantripPassive:
		'Untraceable: Damage from this Spell leaves no visible trace on any affected creatures or the surrounding environment.',
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
			description: 'The radius of the area increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Aura',
			description: 'The area becomes an Aura instead.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Discombobulate',
			description:
				'Each Target makes a Mental save. Save Failure: The target subtracts a d4 on every Check it makes for 1 round.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Knockback',
			description:
				'Each target makes a Might Save against your Save DC. Save Failure: The target is pushed 1 Space away from you. Failure (each 5): The target is pushed 1 additional Space.',
			repeatable: true
		}
	]
};
