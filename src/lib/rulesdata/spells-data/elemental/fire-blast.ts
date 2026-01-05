import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const fireBlast: Spell = {
	id: 'fire-blast',
	name: 'Fire Blast',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Burning', 'Fire'],
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: 'Self',
	duration: 'Instantaneous',
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a brilliant flame that envelops a 1 Space Aura. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Fire damage.'
		}
	],
	cantripPassive:
		"Ignite: Flammable objects that are not being worn or held in the target's Space catch fire. A creature can spend 1 AP to put out a mundane fire within 1 Space of them.",
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
			description: "The Aura's radius increases by 1 Space.",
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Mantle of Fire',
			description:
				"The Spell's duration becomes 1 minute. The heat lingers on you in a 1 Space Aura for the duration. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Repeated Physical Save against your Save DC. Save Failure: The target begins Burning X for 1 minute.",
			variable: true
		}
	]
};
