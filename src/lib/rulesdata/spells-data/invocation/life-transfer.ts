import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const lifeTransfer: Spell = {
	id: 'life-transfer',
	name: 'Life Transfer',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Invocation,
	tags: ['Healing'],
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	effects: [
		{
			title: 'Effect',
			description:
				'You take damage to heal a creature you can see within range. Make a DC 15 Spell Check. Failure: You lose up to 1 HP and the target regains the same amount of HP. Success: You lose up to 2 HP. Success (Each 5): Up to 1 additional HP.'
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
			name: 'Increased Transfer',
			description: 'You lose up to 1 additional HP.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Transfer Rest',
			description: ': The target regains +1 HP.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Affliction',
			description:
				'Choose a Basic Disease, Basic Curse, or Basic Poison affecting the target, if it is willing the affliction ends on the target and you become affected by the affliction.',
			repeatable: true
		}
	]
};
