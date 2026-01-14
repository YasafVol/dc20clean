import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const arcaneBarrier: Spell = {
	id: 'arcane-barrier',
	name: 'Arcane Barrier',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Conjuration,
	tags: [],

	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You place an Arcane Glyph within range that creates a 2 Space diameter Sphere which protects creatures for the duration. Creatures of your choice in the area gain PDR.'
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
			type: 'AP',
			cost: 1,
			name: 'Protection',
			description:
				'Each time creatures of you choice end their turn in the area, they gain X Temp HP until they leave the area or the Spell ends.',
			variable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Resistance',
			description:
				'Creatures of you choice in the area gain Physical Resistance (Half) instead of PDR.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Magical Ward',
			description:
				'Creatures in the area have ADV on Saves against MP effects. Spell Attacks have DisADV against creatures in the area.'
		}
	]
};
