import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const acidImbued: Spell = {
	id: 'acid-imbued',
	name: 'Acid Imbued',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Transmutation,
	tags: ['Corrosion', 'Enfeeble', 'Hindered', 'Strike', 'Weapon'],

	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description: 'For the duration, you deal +1 Corrosion damage on Martial Attacks.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 2,
			name: 'Damage',
			description: 'Your Attacks affected by this Spell deal +1 Corrosion damage.',
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
			name: 'Dissolving Strikes',
			description:
				'Once per round, 1 target of an Attack affected by this Spell makes an Agility Save against your Save DC. Save Failure: The target no longer benefits from PDR or EDR for 1 Round.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Acid Strikes',
			description:
				'Once per round, 1 target of an Attack affected by this Spell makes an Agility Save against your Save DC. Save Failure: The target is Hindered for 1 round.'
		}
	]
};
