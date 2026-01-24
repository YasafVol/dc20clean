import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const umbralWave: Spell = {
	id: 'umbral-wave',
	name: 'Umbral Wave',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Nullification,
	tags: ['Doomed', 'Umbral', 'Undead'],

	cost: { ap: 2 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a burst of shadow magic that envelops a 2 Space Cone. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Umbral damage.'
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
			description: 'The length of the Cone increases by 1.',
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
			type: 'MP',
			cost: 1,
			name: 'Heal Undead',
			description:
				'Undead creatures in the area are immune to the damage from this Spell and regain an amount of HP equal to the damage of this Spell.'
		}
	]
};
