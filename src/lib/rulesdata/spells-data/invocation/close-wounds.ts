import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const closeWounds: Spell = {
	id: 'close-wounds',
	name: 'Close Wounds',
	sources: [SpellSource.Arcane, SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Invocation,
	tags: ['Cleansing', 'Healing', 'Time'],

	cost: { ap: 1 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You accelerate the natural healing process of a target within range. Make a DC 15 Spell Check. Failure: The target can spend up to 1 Rest Point, regaining HP equal to the Rest Points Spent. Success: The target can spend up to 2 Rest Points. Success (each 5): The target can spend 1 additional Rest Point.'
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
			type: 'AP',
			cost: 1,
			name: 'Increased Healing',
			description: 'The target can spend 2 additional Rest Point.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Repeat Save',
			description: "The target can make a Repeated Save against an effect they're subjected to."
		}
	]
};
