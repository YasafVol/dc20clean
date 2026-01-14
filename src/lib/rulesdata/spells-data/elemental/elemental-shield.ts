import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const elementalShield: Spell = {
	id: 'elemental-shield',
	name: 'Elemental Shield',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: [],

	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: '1 Hour',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'A protective elemental ward surrounds you. Choose an Elemental damage type. Make a DC 15 Spell Check. Failure: You gain 2 Temp HP. Success: You gain 3 Temp HP. Success (each 5): +1 Temp HP. Retaliation: If a creature within 1 Space Hits you with an Attack while you have this Temp HP, the creature takes 1 damage of the chosen type for each Temp HP that was consumed by the Attack. The Spell ends once all the Temp HP from this Spell is consumed.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Lashing Elements',
			description: 'The range of Retaliation is increased by 2 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Durability',
			description: 'The Temp HP is increased by 2.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Resistance',
			description: 'You gain Resistance (Half) to the chosen damage type for the duration.'
		},
		{
			type: 'MP',
			cost: 4,
			name: 'Immunity',
			description: 'You gain Immunity to the chosen damage type for the duration.'
		}
	]
};
