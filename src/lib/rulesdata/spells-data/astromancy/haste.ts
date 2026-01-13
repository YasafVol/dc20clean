import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const haste: Spell = {
	id: 'haste',
	name: 'Haste',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: [],
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You bolster the Speed of a creature within range for the duration. Make a DC 15 Spell Check. Failure: Once per Round, the target can gain half their Speed in Spaces of Movement for free. Success: Once per Round, the target gains its full Speed in Spaces of Movement instead. Success (Each 5): +1 Space.'
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
			name: 'Enhanced Speed',
			description: 'The target gains +3 Spaces of Movement each round.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Phased Movement',
			description:
				"The target can move through other creature's Spaces. Other creatures Spaces are considered Difficult Terrain."
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Disengage',
			description: 'The target gains the benefits of the Disengage Action for the duration.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Reflexes',
			description: 'The target gains ADV on Agility Checks and Saves for the duration.'
		}
	]
};
