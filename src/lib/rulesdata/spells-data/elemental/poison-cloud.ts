import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const poisonCloud: Spell = {
	id: 'poison-cloud',
	name: 'Poison Cloud',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Poison'],
	isCantrip: true,
	cost: { ap: 2 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	effects: [
		{
			title: 'Effect',
			description:
				'You create a 2 Space diameter Sphere of poison gas within range for the duration. The Sphere spreads around corners. When a creature enters the area for the first time on its turn, or starts its turn there, it makes a Might Save. Save Failure: The creature takes 1 Poison damage.'
		}
	],
	cantripPassive:
		"Noxious: Plant life in the area that's not being worn or held wilts or dies, grass blackens, and flowers or vines shrivel where the Spell touches.",
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
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Debilitating Poison',
			description:
				'A creature that fails its Save becomes Poisoned by for 1 minute. While Poisoned in this way, the creature becomes Impaired or Hindered (your choice when you use this Enhancement). A creature can make a Repeated Might Save at the end of each of its turns, ending the Poison on a success. This Poison can be removed by any effect that ends a Basic Poison.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Deadly Poison',
			description:
				'A creature that fails its Save becomes Poisoned for 1 minute. While Poisoned in this way, the creature takes 1 Poison damage at the start of each of its turns. A creature can make a Repeated Might Save at the end of each of its turns, ending the Poison on a success. The damage increases by 1 each time you use this Enhancement. This Poison can be removed by any effect that ends a Basic Poison.',
			repeatable: true
		}
	]
};
