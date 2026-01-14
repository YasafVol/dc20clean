import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const lightningBlast: Spell = {
	id: 'lightning-blast',
	name: 'Lightning Blast',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Lightning'],

	cost: { ap: 2, mp: 1 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a torrent of lightning that a 1 Space Aura. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Lightning damage.'
		}
	],
	spellPassive:
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
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: 'The radius of the Aura increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Shock',
			description:
				"Each target makes an Agility Save. Save Failure: The target can't take Reactions for 1 Round."
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Static',
			description:
				'The area becomes laden with electricity for 1 minute. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Fate Check. Result of a 10 or lower: They take X Lightning damage.',
			variable: true
		}
	]
};
