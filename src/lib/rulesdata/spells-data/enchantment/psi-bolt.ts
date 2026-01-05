import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const psiBolt: Spell = {
	id: 'psi-bolt',
	name: 'Psi Bolt',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Enchantment,
	tags: ['Psychic'],
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a bolt of vibrant psychic energy that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Psychic damage.'
		}
	],
	cantripPassive:
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
			name: 'Dazed',
			description:
				'The target makes an Intelligence Save. Save Failure: The target is Dazed for 1 Round.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Intimidate',
			description:
				'The target makes a Mental Save. Save Failure: The target is Intimidated by you for 1 Round.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Crushing Silence',
			description:
				"The target makes an Intelligence Save. Save Failure: The target can't speak verbally or communicate telepathically for 1 Round."
		}
	]
};
