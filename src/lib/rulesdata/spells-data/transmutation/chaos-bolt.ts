import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const chaosBolt: Spell = {
	id: 'chaos-bolt',
	name: 'Chaos Bolt',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Transmutation,
	tags: ['Chaos'],

	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You hurl a bolt of volatile energy at a creature within range. Roll a d12 to determine the bolt's damage type. Make a Ranged Spell Attack against the PD of a target within range while they make an Intelligence Save. Hit: The target takes 2 damage of the rolled damage type. Save Failure: The target is subjected to the effects of the Save Failure column based on the result rolled. | D12 | Damage | Save Failure | | :--- | :--- | :--- | | 1 | Bludgeoning | The target is pushed 1 Space away. Failure (each 5): The target is pushed 1 additional Space. | | 2 | Piercing | The target can't take Reactions for 1 round. | | 3 | Slashing | The target begins Bleeding for 1 minute. | | 4 | Cold | The target is Slowed for 1 round. | | 5 | Corrosive | The target is Hindered for 1 round. | | 6 | Fire | The target begins Burning for 1 minute. | | 7 | Lightning | The target is Stunned until the start of their turn. | | 8 | Poison | The target is Impaired for 1 round. | | 9 | Psychic | The target is Dazed for 1 round. | | 10 | Radiant | Attacks made against the target add a d4 to the check for 1 round. | | 11 | Umbral | The target is Doomed for 1 round. | | 12 | True | The target is Exposed for 1 round. |"
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
			name: 'Damage',
			description: 'The damage increases by 1 for 1 target of your choice.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Unstable Surge',
			description:
				'Choose 1 additional target within 5 Spaces of the original target using the same Spell Attack for all targets. You roll the damage type (and condition) again for each new target. If you use this Enhancement multiple times, you choose an additional target within 5 Spaces of the previously chosen target.',
			repeatable: true
		}
	]
};
