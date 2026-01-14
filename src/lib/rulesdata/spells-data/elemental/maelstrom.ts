import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const maelstrom: Spell = {
	id: 'maelstrom',
	name: 'Maelstrom',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: [],

	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You create a 3 Space diameter Sphere of swirling water within range for the duration. Creatures in the area are subjected to the 'Underwater Combat' on page 132 rules, begin to Suffocate if they can't hold their breath or breathe underwater, and are Slowed when they move away from the Point of Origin. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Might Save against your Save DC. Save Failure: They are pulled 1 Space toward the Point of Origin. DC Tip: A Sphere's Point of Origin is it's centermost Space (or centermost 4 Spaces if it's an even number of Spaces wide)."
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
			cost: 1,
			name: 'Increased Pull',
			description: 'The distance pulled increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Drowning',
			description:
				"When a creature fails a Save, they lose their breathe and begin Suffocating if they can't breath underwater."
		}
	]
};
