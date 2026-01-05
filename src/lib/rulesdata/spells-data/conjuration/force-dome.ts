import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const forceDome: Spell = {
	id: 'force-dome',
	name: 'Force Dome',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Conjuration,
	tags: [],
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	effects: [
		{
			title: 'Effect',
			description:
				'You create a 3 Space diameter Dome. Make a DC 15 Spell Check. Failure: The Dome has 2 HP. Success: The Dome has 3 HP. Success (Each 5): +1 HP. Creatures in the area are pushed to the nearest unoccupied Space of their choice. Unsecured objects within the are are moved to either side of the Wall (your choice for each object). Forcefield: The Dome is translucent and acts as a solid surface, blocking movement but not sound or light. The Dome has Resistance (2) to all damage and a PD and AD equal to your Save DC.'
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
			description: 'The size of the Dome increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Durable',
			description: 'The Resistance increases by 1 or the Forcefield has +2 HP.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Privacy',
			description: "Sound can't pass through the Dome."
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Full Lockdown',
			description:
				"Creatures and effects can't affect anything on the other side of the Forcefield. In addition, creatures and objects can't teleport through the Forcefield."
		}
	]
};
