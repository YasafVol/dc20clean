import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const mageArmor: Spell = {
	id: 'mage-armor',
	name: 'Mage Armor',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Conjuration,
	tags: ['Embolden', 'Ward'],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Hour',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You create a magical protective coating around the target creature. The target gains +2 AD for the duration.'
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
			name: 'Duration',
			description: 'The duration increases by 1 step. (1 hour -> 8 hours -> until Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Greater Armor',
			description: 'The target gain an additional +1 AD.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Heavily Warded',
			description: 'The target gains PDR.'
		}
	]
};
