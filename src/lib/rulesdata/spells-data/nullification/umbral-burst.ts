import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const umbralBurst: Spell = {
	id: 'umbral-burst',
	name: 'Umbral Burst',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Nullification,
	tags: [],

	cost: { ap: 2, mp: 1 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a burst of shadow magic that envelops a 1 Space Aura. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Umbral damage.'
		}
	],
	spellPassive:
		"Obscure: The Light level in the target's Space decreases by 1 until the end of the turn.",
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: 'The radius of the Aura increases by 1.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Doom',
			description: 'Each target makes a Repeated Charisma Save. Failure: The target is Doomed X.',
			variable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Death Cascade',
			description:
				'If you kill a target with this Spell, it explodes. Each target within 1 Space of the exploding creature makes a Agility Save. Save Failure: The target takes X Umbral damage. Damage from this Enhancement also triggers Death Cascade.',
			repeatable: true,
			variable: true
		}
	]
};
