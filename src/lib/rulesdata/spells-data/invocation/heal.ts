import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const heal: Spell = {
	id: 'heal',
	name: 'Heal',
	sources: [SpellSource.Divine],
	school: SpellSchool.Invocation,
	tags: ['Healing'],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You heal a creature within range. Make a DC 15 Spell Check. Failure: The target regains 2 HP. Success: The target regains 3 HP. Success (Each 5): The target regains +1 HP. Critical Success: The target regains +2 HP.'
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
			description: '1 target of your choice regains 2 additional HP.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Chain Heal',
			description:
				'Choose 1 additional target within 3 Spaces of the original target. The additional targets regain 2 HP. If you use this Enhancement multiple times, you choose an additional target within 3 Spaces of a previously chosen target.',
			repeatable: true
		}
	]
};
