import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const invisibility: Spell = {
	id: 'invisibility',
	name: 'Invisibility',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Transmutation,
	tags: ['Illusion'],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You magically cloak a target within range for the duration. Make a DC 15 Spell Check. Failure: The target is Invisible. Success: The target is Invisible and can immediately take the Hide Action for free. The Spell ends early if the target takes any Action or Reaction beside the Move, Dodge or Hide Actions. DC Tip: Being invisible makes you Unseen, but if you want to be fully Hidden from a creature you need to take the Hide action to also become Unheard.'
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
			description:
				'The duration increases by 1 step (1 min -> 10 min -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Mass Invisibility',
			description: 'You can target X additional creatures within range.',
			variable: true
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Greater Invisibility',
			description:
				'Choose 1 target. The Spell no longer ends early when the target takes any Action or Reaction.'
		}
	]
};
