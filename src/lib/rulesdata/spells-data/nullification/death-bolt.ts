import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const deathBolt: Spell = {
	id: 'death-bolt',
	name: 'Death Bolt',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Nullification,
	tags: [],
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a bolt of negative energy that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target you can see within range. Hit: The target takes 1 Umbral damage.'
		}
	],
	cantripPassive:
		"Obscure: The Light level in the target's Space decreases by 1 until the end of the turn.",
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
			type: 'AP',
			cost: 1,
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Doom',
			description: 'The target makes a Repeated Charisma Save. Failure: The target is Doomed X.',
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Call of the Grave',
			description: 'You add a d12 to your Attack Check if the target is Bloodied.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Wither',
			description:
				'The target makes a Repeated Charisma Save. Save Failure: The target is Cursed for the duration. Creatures Cursed by this Spell take X Umbral damage at the start of each of their turns. This Curse can be removed by any effect that ends a Basic Curse.',
			variable: true
		}
	]
};
