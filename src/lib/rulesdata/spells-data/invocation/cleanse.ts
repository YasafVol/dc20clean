import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const cleanse: Spell = {
	id: 'cleanse',
	name: 'Cleanse',
	sources: [SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Invocation,
	tags: [],
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"Choose a creature within range that's subjected to 1 of the following Conditions: Dazed, Deafened, Exposed, Hindered, Impaired, Intimidated, Slowed, Stunned, or Taunted. Choose 1 of those Conditions and Make a Spell Check against its Save DC. If it doesn't have a Save DC, the GM assigns it one. Success: 1 stack of the Condition ends on the creature. DC Tip: If the effect is applied continuously to the target (such as Slowed as a result of moving through Difficulty Terrain) this Spell has no effect on the target."
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
			name: 'Additional Cleanse',
			description:
				'You can end 1 stack of an additional Condition from the list or an additional stack of a previously chosen Condition.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Moderate Cleanse',
			description:
				'The following Conditions are added to the list: Blinded, Charmed, Disoriented, Doomed, Frightened, Restrained, or Weakened.'
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Major Cleanse',
			description:
				'The following Conditions are added to the list: Exhaustion, Paralyzed, Petrified, Terrified, or Unconscious.'
		}
	]
};
