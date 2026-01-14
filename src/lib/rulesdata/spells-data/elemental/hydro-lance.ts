import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const hydroLance: Spell = {
	id: 'hydro-lance',
	name: 'Hydro Lance',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Piercing'],

	cost: { ap: 2 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a high pressure jet of water in a 4 Space Line. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Piercing damage.'
		}
	],
	spellPassive:
		'Extinguish: Open flames in the area are extinguished, including torches, candles, or small campfires, unless magical or protected.',
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Area',
			description: 'The Length of the Line increases by 3 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Knockback',
			description:
				'Each target makes a Might Save. Save Failure: The target is pushed 1 Space away from you. Failure (each 5): The target is pushed 1 additional Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Bleeding',
			description:
				'Each target makes a Repeated Physical Save. Save Failure: The target begins Bleeding for 1 minute.',
			repeatable: true
		}
	]
};
