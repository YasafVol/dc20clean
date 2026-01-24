import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const lightningCloud: Spell = {
	id: 'lightning-cloud',
	name: 'Lightning Cloud',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Deafened', 'Disoriented', 'Lightning', 'Sound', 'Stunned'],

	cost: { ap: 2 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You create a 6 Space high, 2 Space diameter Cylinder of crackling lightning within range for the duration. When a creature enters the area for the first time on its turn or starts its turn there, it makes an Agility Save against your Save DC. Save Failure: The target takes 1 Lightning damage.'
		}
	],
	spellPassive:
		'Magnetic: Metal in the area becomes magnetized for the duration, causing metal objects to attract or repel each other and disrupting compass-based navigation.',
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
			name: 'Area',
			description: 'The diameter of the Cylinder increases by 1 Space and the height by 3 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Thunder',
			description: 'A creature that fails its Save becomes Deafened and Disoriented for 1 Round.'
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Stunned',
			description: 'A creature that fails its Save becomes Stunned for 1 Round.'
		}
	]
};
