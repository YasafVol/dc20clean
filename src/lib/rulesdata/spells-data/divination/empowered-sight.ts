import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const empoweredSight: Spell = {
	id: 'empowered-sight',
	name: 'Empowered Sight',
	sources: [SpellSource.Arcane, SpellSource.Primal, SpellSource.Divine],
	school: SpellSchool.Divination,
	tags: ['Embolden', 'Sense'],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Hour',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You empower the eyesight of a creature within range for the duration. The target gains Darkvision 10 Spaces.'
		}
	],
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
			name: 'Duration',
			description: 'The duration increases by 1 step. (1 hour -> 8 hours -> until Long Rest)',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'See Invisibility',
			description: 'The target can see Invisible creatures within 10 Spaces.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Piercing Sight',
			description:
				'The target can see through up to 6 inches (15 cm) of wood or earth (rock, dirt, mud, or sand), or 1 inch (25 mm) of metal within 10 Spaces.'
		},
		{
			type: 'MP',
			cost: 4,
			name: 'True Sight',
			description: 'The target also gain True Sight 10 Spaces. ## Elemental'
		}
	]
};
