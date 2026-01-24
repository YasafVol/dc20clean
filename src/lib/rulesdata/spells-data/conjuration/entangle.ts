import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const entangle: Spell = {
	id: 'entangle',
	name: 'Entangle',
	sources: [SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: ['Immobilized', 'Piercing', 'Plants', 'Restrained'],

	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure an area of entangling plants or other natural effect on the surfaces in a 2 Space diameter Sphere, the area becomes Entangled for the duration. Make a Spell Check against the Agility Save of each target in the area. Check Success: The target is Immobilized. A creature can spend 1 AP to attempt this Save again, alternatively the Condition ends if the Entangled Space it is in is cleared. Entangled: Entangled Spaces are Difficult Terrain. These Spaces are cleared if they take Elemental or Slashing damage equal to the MP spent on this Spell and have a PD and AD equal to your Save DC. Example: A 1st level Druid casts Entangle using 1 MP, each Space has a PD and AD or 14 (equal to Save DC) and needs to take 1 Fire or Slashing damage to be cleared (equal to 1 MP spent to cast the Spell).'
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
			name: 'Area',
			description: 'The diameter of the Sphere increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Grasping',
			description:
				'When a creature enters the area for the first time on its turn or starts its turn there, it makes an Agility Save against your Save DC. Save Failure: The target is Immobilized.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Restrained',
			description: 'Creatures Immobilized by Entangle are Restrained.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Spikey Terrain',
			description:
				'Creatures take X Piercing damage when they enter an Entangled Space after the Spell has been cast. They also take this damage if they fail a Save to end the Immobilized Condition inflicted by this Spell.',
			variable: true
		}
	]
};
