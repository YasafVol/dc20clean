import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const poisonImbued: Spell = {
	id: 'poison-imbued',
	name: 'Poison Imbued',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Transmutation,
	tags: ['Poison'],

	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description: 'For the duration, you deal +1 Poison damage on Martial Attacks.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 2,
			name: 'Damage',
			description: 'Your Attacks affected by this Spell deal +1 Poison damage.',
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
			cost: 2,
			name: 'Impairing Strikes',
			description:
				'Once per round, 1 target of an Attack affected by this Spell makes a Might Save against your Save DC. Save Failure: The target is Impaired for 1 round.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Poisoned Strikes',
			description:
				'Once per round, 1 target of an Attack affected by this Spell makes a Repeated Might Save against your Save DC. Save Failure: The target is Poisoned for 1 minute. Creatures Poisoned by this Spell take X Poison damage at the start of each of their turns. This Poison can be removed by any effect that ends a Basic Poison.',
			variable: true
		}
	]
};
