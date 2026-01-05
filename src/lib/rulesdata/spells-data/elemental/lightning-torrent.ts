import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const lightningTorrent: Spell = {
	id: 'lightning-torrent',
	name: 'Lightning Torrent',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Lightning'],
	isCantrip: true,
	cost: { ap: 2 },
	range: 'Self',
	duration: 'Instantaneous',
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a torrent of crackling lightning that envelops a 4 Space Line. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Lightning damage.'
		}
	],
	cantripPassive:
		'Magnetic: Metal in the area becomes briefly magnetized, causing metal objects to attract or repel each other and disrupting compass-based navigation.',
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Area',
			description: 'The length of the Line increases by 3 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Shock',
			description:
				"Each target makes an Agility Save. Save Failure: The target can't take Reactions for 1 round."
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Dazed',
			description:
				'Each target makes a Intelligence Save. Save Failure: The target is Dazed for 1 round.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Remote',
			description:
				'The range becomes 5 Spaces, with the origin of the Line becoming the chosen Space.'
		}
	]
};
