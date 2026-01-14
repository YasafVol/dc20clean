import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const tornado: Spell = {
	id: 'tornado',
	name: 'Tornado',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Chaos', 'Blinded'],

	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You create a 6 Space high, 2 Space diameter Cylinder of swirling winds within range for the duration. Creatures in the area are Slowed 2, Blinded, and Fully Concealed. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Might Save against your Save DC. Save Failure: They're pushed 1 Space horizontally in a random direction. Failure (each 5): They're pushed 1 additional Space."
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
			description:
				'The diameter of the Cylinder increases by 1 Space and the height increases by 3 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Increased Push',
			description: 'The distance pushed increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Vortex',
			description:
				"When you cast the Spell, creatures within the area, or within 1 Space of the area, make a Might Save against your Spell Check. Save Failure: They're pulled toward the Point of Origin."
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Storm Core',
			description: 'A creature that fails its Save also takes 1 Lightning damage.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Updraft',
			description: 'A creature that fails its Save is also pulled upward 3 Spaces.',
			repeatable: true
		}
	]
};
