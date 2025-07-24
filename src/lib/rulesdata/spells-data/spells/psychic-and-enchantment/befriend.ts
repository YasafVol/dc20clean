import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const befriend: Spell = {
	name: 'Befriend',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: '1 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Charm Creature',
			description:
				'You attempt to Charm a creature within range. Choose a non-hostile creature that can see and hear you and make a Spell Check contested by the target’s Charisma Save. Success: The creature is Charmed by you for the duration or until it takes damage. When the Spell effect ends or you fail the Check, the creature realizes that you used magic to influence its mood and may become hostile toward you.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Hostile Charm',
			description: 'You can target even hostile creatures with the Spell.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Clear Suspicion',
			description: 'The target doesn’t realize that magic was used on them when the Spell ends.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'More Friends',
			description: 'You can target an additional creature and increase the range by 10 Spaces.'
		}
	]
};
