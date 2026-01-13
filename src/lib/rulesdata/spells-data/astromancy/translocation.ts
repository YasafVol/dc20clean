import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const translocation: Spell = {
	id: 'translocation',
	name: 'Translocation',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: ['Teleportation'],
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You teleport an object that is not being held or carried or a creature other than yourself to another Space within range. Object: Make a DC 15 Spell Check to teleport an object within range to another Space within range. Failure: You can teleport a small or smaller object up to 100 lbs (50 kg). Success: You can teleport a medium or smaller object of up to 200lbs (100 kg). Success (10): You can teleport a large or smaller object of up to 300lbs (150 kg). Creature: Make a Spell Check against the Charisma Save of an up to Medium size creature within range. Check Success: You teleport the creature up to 3 Spaces to an unoccupied Space you can see that is also within range. DC Tip: Friendly creatures can choose to fail the Save!'
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
			name: 'Distance',
			description: 'The distance of the teleport increases by 3 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Size',
			description:
				'The maximum size of the creature or object you can teleport increases by 1. The maximum weight of the object you can teleport also increases by 100 lbs (50 kg).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Swap',
			description:
				'Choose another object that is not being held or carried or creature within range (you can choose yourself). If the Spell Succeeds on both targets, they swap location provided they are within 3 Spaces of each other. The distance is increased by 3 Spaces for each time you use the Distance Enhancement. If the Spell only Succeed on only 1 target, you can teleport that target as normal. ## Conjuration'
		}
	]
};
