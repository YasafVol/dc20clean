import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const deathWard: Spell = {
	id: 'death-ward',
	name: 'Death Ward',
	sources: [SpellSource.Divine],
	school: SpellSchool.Invocation,
	tags: [],

	cost: { ap: 1, mp: 1 },
	range: '1 Space',
	duration: '10 Minutes',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You ward a creature within range against death. Make a DC 15 Spell Check. Failure: The next time the target takes damage that would reduce it to 0 HP, it gains 3 Temp HP before taking the damage and the Spell ends. Success: The target gains 4 Temp HP instead. Success (Each 5): +1 Temp HP. If a creature is already on 0 HP or lower when this Spell is cast on it, the Spell activates when it next take damage instead.'
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
				'The duration is increased by 1 step (10 min -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Temp HP',
			description: 'The target gains an additional 3 Temp HP.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Doomed Protection',
			description: 'Up to 2 stacks of Doomed ends on the creature. ### Divine Protection',
			repeatable: true
		}
	]
};
