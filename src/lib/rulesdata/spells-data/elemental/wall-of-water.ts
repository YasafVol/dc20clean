import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const wallOfWater: Spell = {
	id: 'wall-of-water',
	name: 'Wall of Water',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Motion', 'Slowed', 'Water'],

	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You create a 2 Space high, 3 Space long Wall of water within range for the duration. Creatures in the area are subjected to the Underwater Combat rules ('Underwater Combat' on page 132 for more information) and begin to Suffocate if they can't hold their breath or breath underwater, and are Slowed when moving through the area. Attacks that deal Physical or Elemental damage have DisADV if made against targets within the area or on the other side of the Wall."
		}
	],
	spellPassive:
		'Extinguish: Open flames in the area are extinguished, including torches, candles, or small campfires, unless magical or protected.',
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
			name: 'Length',
			description: "The Wall's length increases by 2 Spaces.",
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Height',
			description: "The Wall's height increases by 1 Space.",
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Prone',
			description: 'Each target that fails its Save against the Tidal Wave also falls Prone.'
		}
	]
};
