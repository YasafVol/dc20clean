import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const telekinesis: Spell = {
	id: 'telekinesis',
	name: 'Telekinesis',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: ['Restrained'],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You manipulate a target within range with telekinetic force for the duration. You can target an object weighing up to 200 pounds (100kg) or a Medium size or smaller creature. If you end your turn outside the Spell's range from the target, the target becomes freed from the Spell's effects. Object: If the target is an object being held or carried by a creature, make a Spell Check contested by the creature's Might Save. Check Success: You can use the Telekinetic Control Actions on the object for the duration. Creature: If you target a creature, make a Spell Check contested by their Repeated Might Save. Check Success: The creature is Immobilized and you can use the Telekinetic Control Actions on it for the duration. #### Telekinetic Control"
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
			name: 'Weight',
			description:
				'The maximum weight of the object you can target is increased by 100 pounds (50 kg).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Size',
			description:
				'The maximum size of a creature you can target increases by 1 step (Medium -> Large -> Huge -> Gargantuan -> Colossal -> Titanic).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Restrain',
			description: 'Targets Immobilized by this Spell are also Restrained.'
		}
	]
};
