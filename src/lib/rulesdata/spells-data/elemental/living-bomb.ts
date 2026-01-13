import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const livingBomb: Spell = {
	id: 'living-bomb',
	name: 'Living Bomb',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Burning', 'Fire'],
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You set a target within range ablaze. Make a Spell Check against the target's Repeated Physical Save. Check Success: The target begins Burning. Bomb: When the Burning from this Spell ends, the fire magic detonates in a 1 Space Aura centered on the target. Each target in the area (including the original one) makes a Might Save against your Save DC. Save Failure: The target takes 1 Fire damage."
		}
	],
	cantripPassive:
		"Ignite: Flammable objects that are not being worn or held in the target's Space catch fire. A creature can spend 1 AP to put out a mundane fire within 1 Space of them.",
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
			name: 'Stronger Bomb',
			description: 'The damage of Bomb increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Larger Area',
			description: 'The radius of the Bomb increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Increased Burning',
			description: 'The target gains 1 additional stack of Burning.',
			repeatable: true
		}
	]
};
