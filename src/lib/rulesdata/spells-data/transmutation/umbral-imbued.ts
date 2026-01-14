import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const umbralImbued: Spell = {
	id: 'umbral-imbued',
	name: 'Umbral Imbued',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Transmutation,
	tags: ['Healing'],

	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description: 'For the duration, you deal +1 Umbral damage on Martial Attacks.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 2,
			name: 'Damage',
			description: 'Your Attacks affected by this Spell deal +1 Umbral damage.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Effortless',
			description: 'You no longer need to Sustain the Spell.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Dooming Strikes',
			description:
				'Once per round, 1 target of an Attack affected by this Spell makes a Charisma Save against your Save DC. Save Failure: The target is Doomed X for 1 round.',
			variable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Draining Strikes',
			description:
				'Once per attack, when you deal damage to a target with an Attack affected by this Spell, you can spend up to X Rest Points, regaining HP equal to the Rest Points Spent.',
			variable: true
		}
	]
};
