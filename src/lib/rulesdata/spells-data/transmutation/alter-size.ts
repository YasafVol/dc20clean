import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const alterSize: Spell = {
	id: 'alter-size',
	name: 'Alter Size',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Transmutation,
	tags: [],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You alter the size of an object that is not being held or carried or a creature within range, making it larger or smaller for the duration. Object: Make a DC 10 Spell Check. Success: You make the object Larger or Smaller.'
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
				'The duration is increased by 1 step (10 min -> 1 hour -> 8 hour -> until Long Rest). You no longer need to Sustain the Spell and you can end it at any time for free.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Greater Alteration',
			description:
				"The target's Size increases or decreases by 1 more step (e.g. Medium -> Large -> Huge).",
			repeatable: true
		}
	]
};
