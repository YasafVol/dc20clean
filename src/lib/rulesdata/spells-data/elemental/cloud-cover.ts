import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const cloudCover: Spell = {
	id: 'cloud-cover',
	name: 'Cloud Cover',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Cold', 'Slashing'],

	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You obscure a 4 Space diameter Sphere within range with natural phenomenon (such as fog, sand, or sleet) for the duration. The Sphere spreads around corners. Targets within the area are Fully Concealed against creatures that aren't within 1 Space of them. The Spell ends early if a 20 mph (30 kph) wind disperses it. Relocate: When you Sustain this Spell, or by spending 1 AP, you can move the Sphere up to 5 Spaces to another Space within range."
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
			cost: 1,
			name: 'Area',
			description: 'The diameter of the Sphere increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Blanketing Cloud',
			description:
				'Surfaces within the area becomes covered in natural phenomenon (such as debris, ice, or sand) for the duration, making them Difficult Terrain. When a creature enters the area for the first time on its turn, or starts its turn within there, it must make an Agility Save. Save Failure: The target falls Prone.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Abrasive Storm',
			description:
				'When a creature enters the area for the first time on its turn, or starts its turn within there, it must make an Might Save. Save Failure: The target takes X Slashing or Cold Damage (chosen when you use this Enhancement).',
			variable: true
		}
	]
};
