import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const inflictPoison: Spell = {
	id: 'inflict-poison',
	name: 'Inflict Poison',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Frightened', 'Stunned'],
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: '1 Minute',
	effects: [
		{
			title: 'Effect',
			description:
				'Make a Spell Check against the Repeated Might Save of a creature within range. Check Success: The target is Poisoned for the duration. Creatures Poisoned by this Spell have DisADV on Awareness Checks, are Slowed, and Impaired or Dazed (your choice). This Poison can be removed by any effect that ends a Basic Poison.'
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
			name: 'Sapped',
			description: "While Poisoned by this Spell, the target falls Prone and can't stand up."
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Mental Fog',
			description:
				'While Poisoned by this Spell, the target is Stunned and forgets every detail about the previous minute.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Fear Toxin',
			description:
				'The target has vivid hallucinations. While Poisoned by this Spell, the target is Frightened of all creatures it can see.'
		}
	]
};
