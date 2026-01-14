import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const fear: Spell = {
	id: 'fear',
	name: 'Fear',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Enchantment,
	tags: ['Frightened', 'Psychic'],

	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You instill fear in a creature within range that can see or hear you. Make a Spell Check against the target's Repeated Charisma Save. Check Success: The target is Frightened by you for the duration."
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
			name: 'Inner Demons',
			description:
				'While Frightened by this Spell, the target takes X Psychic Damage whenever it fails a Check or Save (not including the initial Save against this Spell).',
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Flee',
			description:
				'The target spends 1 AP running away from you each time it fails a Save against this Spell.'
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Terrify',
			description: 'On a Success, the target is Terrified of you instead.'
		}
	]
};
