import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const death: Spell = {
	id: 'death',
	name: 'Death',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Nullification,
	tags: ['Exhaustion'],
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You doom a creature within range. Make a Spell Check against the target's Repeated Might Save. Check Success: The target is Doomed 2. When you Sustain the Spell, it gains an additional stack of Doomed. When the Spell ends, it loses all stacks of Doomed gained from this Spell. Death: If the number of Doomed stacks on a creature affected by this Spell is equal to or exceeds their current maximum HP, it immediately dies. Example: A creature has 10 max HP. When they reach Doomed 5, their max HP has been reduced to 5, at which point they die."
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
			name: 'Increased Doomed',
			description:
				'The target gains an additional stack of Doomed, both when it fails the original Save and when you Sustain the Spell.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Exhaustion',
			description:
				'Each time the target fails a Save against this Spell (including the original Save), it gains Exhaustion.'
		}
	]
};
