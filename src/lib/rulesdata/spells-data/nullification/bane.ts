import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const bane: Spell = {
	id: 'bane',
	name: 'Bane',
	sources: [SpellSource.Divine],
	school: SpellSchool.Nullification,
	tags: ['Curse', 'Enfeeble'],

	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'Make a Spell Check against a the Repeated Charisma Save. Save Failure: The target is Cursed for the duration. While Cursed in this way, the target subtracts a d6 from its Checks for the duration. The Curse can be removed by any effect that ends a Basic Curse.'
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
			type: 'AP',
			cost: 1,
			name: 'Targets',
			description: 'You increase the number of targets by X.',
			variable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Full Bane',
			description:
				'The target also subtract the same die from its Saves. The cost of this Enhancement increases to 4 MP if you use the Targets Enhancement.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Greater Bane',
			description: 'The size of the die increases by 1 step (d6 -> d8 -> d10 -> d12).',
			repeatable: true
		}
	]
};
