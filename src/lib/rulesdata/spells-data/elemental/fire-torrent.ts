import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const fireTorrent: Spell = {
	id: 'fire-torrent',
	name: 'Fire Torrent',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Burning', 'Fire', 'Motion'],

	cost: { ap: 2 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a torrent of fire that envelops a 2 Space Cone. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Fire damage.'
		}
	],
	spellPassive:
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
			description: 'The length of the Cone increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Burning',
			description:
				'Each target makes a Repeated Physical Save. Save Failure: The target begins Burning X for 1 minute.',
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Back Draft',
			description:
				'Each target makes a Might Save against your Save DC. Save Failure: The target is pushed 1 Space away from you. Failure (each 5): The target is pushed 1 additional Space.'
		}
	]
};
