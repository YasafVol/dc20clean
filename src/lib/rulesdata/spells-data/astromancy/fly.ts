import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const fly: Spell = {
	id: 'fly',
	name: 'Fly',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: ['Air', 'Embolden', 'Gravity', 'Motion'],

	cost: { ap: 1, mp: 3 },
	range: '5 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You grant flight to a creature within Range for the duration. Make a DC 15 Spell Check. Failure: The target gains a Fly Speed equal to half its Speed. Success: The target gains a Fly Speed equal to its Speed. Success (5): The target gains +1 Speed.'
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
			description: 'The duration increases by 1 step (10 min -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Mass Fly',
			description: 'You can target X additional creatures within range.',
			variable: true
		}
	]
};
