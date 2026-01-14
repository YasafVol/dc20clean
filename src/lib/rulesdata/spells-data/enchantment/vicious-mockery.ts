import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const viciousMockery: Spell = {
	id: 'vicious-mockery',
	name: 'Vicious Mockery',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Enchantment,
	tags: ['Psychic'],

	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You attempt to verbally mock a creature that can hear you. Make a Ranged Spell Attack against the AD of a target within range. Hit: The target takes 1 Psychic damage.'
		}
	],
	spellPassive:
		'Untraceable: Damage from this Spell leaves no visible trace on any affected creatures or the surrounding environment.',
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
			name: 'Taunt',
			description:
				'The target makes a Charisma Save. Save Failure: The target is Taunted by you for 1 Round.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Discombobulate',
			description:
				'The target makes an Intelligence Save. Save Failure: The target subtracts a d4 on every Check it makes for 1 round. ## Invocation'
		}
	]
};
