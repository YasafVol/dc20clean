import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const lightningStorm: Spell = {
	id: 'lightning-storm',
	name: 'Lightning Storm',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Deafened', 'Lightning'],
	isCantrip: true,
	cost: { ap: 2 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a torrent of crackling lightning that envelops a 6 Space tall, 2 Space diameter Cylinder within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Lightning damage.'
		}
	],
	cantripPassive:
		'Magnetic: Metal in the area becomes briefly magnetized, causing metal objects to attract or repel each other and disrupting compass-based navigation.',
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
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: 'The diameter of the Cylinder increases by 1 Space and the Height by 3 Spaces.',
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
			type: 'AP',
			cost: 1,
			name: 'Thunder',
			description:
				'Each target makes a Might Save. Save Failure: The target becomes Deafened for 1 Round.'
		}
	]
};
