import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const blightBomb: Spell = {
	id: 'blight-bomb',
	name: 'Blight Bomb',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Impaired', 'Poison', 'Weakened'],

	cost: { ap: 2 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce an explosion of Poisonous gas in a 2 Space diameter Sphere within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Poison damage.'
		}
	],
	spellPassive:
		'Noxious: Plant life in the area that are not being worn or held wilts or dies, grass blackens, and flowers or vines shrivel where the Spell touches.',
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
			name: 'Impair',
			description:
				'Each target makes a Might Save. Save Failure: The target become Impaired for 1 Round.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Miasma',
			description:
				'Each target in the area makes a Physical Save. Save Failure: The target become Weakened for 1 Round. The area also becomes Partially Concealed for 1 Round.'
		}
	]
};
