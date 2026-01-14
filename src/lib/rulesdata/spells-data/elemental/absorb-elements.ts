import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const absorbElements: Spell = {
	id: 'absorb-elements',
	name: 'Absorb Elements',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: [],

	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a protective elemental ward in response to damage. Trigger: When you take Elemental Damage. Reaction: Make a DC 15 Spell Check. Failure: You gain Resistance (1) to the triggering damage type until the end of the turn, this also applies to the triggering damage. Success: Resistance (2). Success (10): Resistance (3).'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Amplified Shield',
			description: 'The Resistance increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Flow of Nature',
			description:
				'You deal +2 damage of the triggering damage type on your next Attack made until the end of your next turn.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Lingering Retaliation',
			description:
				'For the next minute, when a creature Hits you with a Melee Attack, it takes X damage of the triggering damage type.',
			variable: true
		}
	]
};
