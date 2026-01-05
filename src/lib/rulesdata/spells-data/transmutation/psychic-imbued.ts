import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const psychicImbued: Spell = {
	id: 'psychic-imbued',
	name: 'Psychic Imbued',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Transmutation,
	tags: ['Deafened', 'Psychic'],
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: '1 Minute (Sustained)',
	effects: [
		{
			title: 'Effect',
			description: 'For the duration, you deal +1 Psychic damage on Martial Attacks.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 2,
			name: 'Damage',
			description: 'Your Attacks affected by this Spell deal +1 Psychic damage.',
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
			name: 'Dazing Strikes',
			description:
				'Once per round, 1 target of an Attack affected by this Spell makes an Intelligence Save against your Save DC. Save Failure: The target is Dazed for 1 round.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Silencing Strikes',
			description:
				"Once per round, 1 target of an Attack affected by this Spell makes a Charisma Save against your Save DC. Failure: The target is Deafened and can't speak for 1 round."
		}
	]
};
