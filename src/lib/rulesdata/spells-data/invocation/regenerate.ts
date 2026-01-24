import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const regenerate: Spell = {
	id: 'regenerate',
	name: 'Regenerate',
	sources: [SpellSource.Primal],
	school: SpellSchool.Invocation,
	tags: ['Cleansing', 'Healing'],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Round',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You heal a creature within range. Make a DC 15 Spell Check. Failure: The target regains 2 HP. Success: The target regains 2 HP immediately and 2 HP at the start of your next turn. Success (Each 5): It regains +1 HP immediately.'
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
			name: 'Increased Healing',
			description: 'The target regains +1 HP immediately and +1 HP at the start of your next turn.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Repeat Save',
			description:
				"The target can immediately make a Repeated Save against an effect it's subjected to. It gains this benefit again at the start of your next turn."
		}
	]
};
