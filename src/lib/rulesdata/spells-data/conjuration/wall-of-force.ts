import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const wallOfForce: Spell = {
	id: 'wall-of-force',
	name: 'Wall of Force',
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
				'You create a 2 Space tall, 4 Space long Wall within range. Make a DC 15 Spell Check. Failure: The Wall has 2 HP. Success: The Wall has 3 HP. Success (Each 5): +1 HP. Creatures in the area are pushed to the nearest unoccupied Space of their choice. Objects in the area that are not held or carried are moved to either side of the Wall (your choice for each object). Forcefield: The Wall is translucent and acts as a solid surface, blocking movement but not sound or light. The Wall has Resistance (2) to all damage and a PD and AD equal to your Save DC.'
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
			description:
				'The length of the Wall increases by 6 Spaces or the height of the Wall increases by 2 Spaces.',
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
			type: 'MP',
			cost: 1,
			name: 'One-way Mirror',
			description:
				'Choose one face of the Wall to stay translucent. Creatures on that side see through it normally, while creatures on the other side perceive it as a reflection. ## Divination'
		}
	]
};
