import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const radiantImbued: Spell = {
	id: 'radiant-imbued',
	name: 'Radiant Imbued',
	sources: [SpellSource.Divine],
	school: SpellSchool.Transmutation,
	tags: ['Radiant'],
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: '1 Minute (Sustained)',
	effects: [
		{
			title: 'Effect',
			description: 'For the duration, you deal +1 Radiant damage on Martial Attacks.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 2,
			name: 'Damage',
			description: 'Your Attacks affected by this Spell deal +1 Radiant damage.',
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
			name: 'Illuminating Strikes',
			description:
				"Once per round, 1 target of an Attack affected by this Spell makes a Physical Save against your Save DC. Save Failure: The target sheds Dim Light in a 1 Space Aura and can't benefit from 1/2 Cover or being Invisible."
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Guiding Strikes',
			description:
				'Once per round, 1 target of an Attack affected by this Spell makes a Physical Save against your Save DC. Save Failure: Attacks made against the target add a d4 to the Check for 1 round.'
		}
	]
};
