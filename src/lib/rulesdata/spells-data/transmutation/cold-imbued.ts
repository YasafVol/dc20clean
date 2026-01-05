import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const coldImbued: Spell = {
	id: 'cold-imbued',
	name: 'Cold Imbued',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Transmutation,
	tags: ['Cold'],
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: '1 Minute (Sustained)',
	effects: [
		{
			title: 'Effect',
			description: 'For the duration, you deal +1 Cold damage on Martial Attacks.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 2,
			name: 'Damage',
			description: 'Your Attacks affected by this Spell deal +1 Cold damage.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Effortless',
			description: 'You no longer need to Sustain the Spell.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Slowing Strikes',
			description:
				'Once per round, 1 target of an Attack affected by this Spell makes a Might Save against your Save DC. Save Failure: The target is Slowed for 1 round.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Chilling Strikes',
			description:
				"Once per round, 1 target of an Attack affected by this Spell makes a Might Save against your Save DC. Save Failure: The target can't take Reactions for 1 round."
		}
	]
};
