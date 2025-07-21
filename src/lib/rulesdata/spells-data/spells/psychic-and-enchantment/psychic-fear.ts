import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const psychicFear: Spell = {
	name: 'Psychic Fear',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Discordant Melody',
			description:
				'You whisper a discordant melody, only audible to your target, to a creature of your choice within range that you can see and that can hear you, wracking it with terrible pain. Make a Spell Check against the target’s AD while it makes an Intelligence Save. Hit: The target takes 2 Psychic damage. Save Failure: If it has any AP, the target spends 1 AP to move as far as its Speed allows away from you. The creature doesn’t move into obviously dangerous ground, such as a fire or a pit.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Loud Whispers',
			description:
				'On a failed Save, the target to uses an additional 1 AP (if available) to move an additional number of Spaces away from you equal to its Speed.'
		}
	]
};
