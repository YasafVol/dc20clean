import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const waterBolt: Spell = {
	id: 'water-bolt',
	name: 'Water Bolt',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Bludgeoning', 'Motion', 'Water'],

	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a bolt of water that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Bludgeoning damage.'
		}
	],
	spellPassive:
		"Extinguish: Open flames in the target's Space are extinguished, including torches, candles, or small campfires, unless magical or protected.",
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
			name: 'Knockback',
			description:
				'The target makes a Might Save. Save Failure: The target is pushed 1 Space away from you. Failure (each 5): The target is pushed 1 additional Space.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Splash',
			description:
				'The projectile detonates on impact. Compare the Spell Attack to the AD of each targets in a 2 Space Cone behind the original target. Hit: They take X Bludgeoning damage.',
			variable: true
		}
	]
};
