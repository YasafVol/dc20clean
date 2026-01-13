import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const fireBolt: Spell = {
	id: 'fire-bolt',
	name: 'Fire Bolt',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Burning', 'Fire'],
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a bolt of fire that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Fire damage.'
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
			type: 'AP',
			cost: 1,
			name: 'Damage',
			description: 'The damage increases by 1 for 1 target of your choice.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Burning',
			description:
				'1 target of your choice makes a Repeated Physical Save. Save Failure: The target begins Burning for 1 minute.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Flaming Missile',
			description:
				'Choose X additional targets within range using the same Spell Attack for all targets.',
			variable: true
		}
	]
};
