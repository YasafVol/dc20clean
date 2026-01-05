import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const shatterReality: Spell = {
	id: 'shatter-reality',
	name: 'Shatter Reality',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Enchantment,
	tags: ['Chaos', 'Psychic'],
	isCantrip: true,
	cost: { ap: 2 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	effects: [
		{
			title: 'Effect',
			description:
				'You violently distort the perception of reality in a 2 Space Sphere within range. Make an Area Spell Attack against the AD of every creature in the area. Hit: The target takes 1 Psychic damage.'
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
			name: 'Dazed',
			description:
				'Each target makes a Intelligence Save. Failure: The target is Dazed for 1 Round.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Distorted Perception',
			description:
				"Each target makes a Repeated Charisma Save against your Save DC. Save Failure: The target rolls a d4 to determine the Distortion Effect that alters its body or perception for 1 minute. 1.  It sees body twist. It's Immobilized. 2.  Its senses collapse inward. It's Blinded. 3.  Its mind fractures. It's Stunned and can't take Reactions. 4.  It becomes confused. At the start of each of its turns, it must spend 1 AP to move up to its Speed in a random direction."
		}
	]
};
