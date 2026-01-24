import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const primalHide: Spell = {
	id: 'primal-hide',
	name: 'Primal Hide',
	sources: [SpellSource.Primal],
	school: SpellSchool.Transmutation,
	tags: ['Embolden', 'Ward'],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Hour',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You harden the skin of a creature within range. The target gains +2 PD for the duration.'
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
			description: 'The duration increases by 1 step (1 hour -> 8 hours -> until Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Armored',
			description: 'The target gain an additional +1 PD.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Heavily Protected',
			description: 'The target gains EDR.'
		}
	]
};
