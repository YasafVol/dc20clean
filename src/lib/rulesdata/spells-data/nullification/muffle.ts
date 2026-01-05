import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const muffle: Spell = {
	id: 'muffle',
	name: 'Muffle',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Nullification,
	tags: ['Deafened'],
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	effects: [
		{
			title: 'Effect',
			description:
				'You create a 3 Space diameter Sphere within range. No sound can pass from the outside to the inside of the area or vice-versa (becoming Unheard). Relocate: When you Sustain this Spell or by spending 1 AP, you can move the area up to 5 Spaces within range.'
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
			description: 'The diameter of the Sphere increases by 1 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Silence',
			description:
				"The area becomes silent, no sound can be heard or produced in it. All creatures in the area are Deafened and Verbal Components can't be performed in it."
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Disorient',
			description:
				'Requires Silence. When a creature enters the area for the first time on its turn or starts its turn there, they make a Repeated Intelligence Save against your Save DC. Save Failure: The target is Disoriented until it leaves the area.'
		}
	]
};
