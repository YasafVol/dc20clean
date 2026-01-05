import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const tendrilsFromBeyond: Spell = {
	id: 'tendrils-from-beyond',
	name: 'Tendrils from Beyond',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Conjuration,
	tags: ['Bludgeoning', 'Psychic'],
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	effects: [
		{
			title: 'Effect',
			description:
				'You bring forth tendrils from beyond which cover each surface in a 2 Space diameter Sphere within range for the duration. Spaces filled with tendrils become Difficult Terrain. When you cast this Spell, make an Area Spell Attack against the PD of each creatures in the area. Hit: The target takes 1 Bludgeoning or Psychic damage (your choice). Tendril Attack: Once on each of your turns, when you Sustain this Spell or by spending 1 AP, you can make an Area Spell Attack against the PD of each target within the area. Hit: The target takes 1 Bludgeoning or Psychic damage (your choice). Moving Tendrils: When you Sustain this Spell or by spending 1 AP, you can move the area up to 5 Spaces to another Space within range. DC Tip: You can choose the order of your effects that occur at the same time.'
		}
	],
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
			cost: 2,
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
			cost: 2,
			name: 'Maw of Madness',
			description:
				'When a creature enters the area for the first time on its turn or starts its turn there, it makes an Intelligence Save against your Save DC. Save Failure: The target spends 1 AP suffering from temporary madness.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Tripping',
			description:
				'When you make an Attack with this Spell, each target makes an Agility Save against your Save DC. Save Failure: The target falls Prone.'
		}
	]
};
