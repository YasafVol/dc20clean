import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const charm: Spell = {
	id: 'charm',
	name: 'Charm',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Enchantment,
	tags: ['Charmed', 'Curse', 'Emotions', 'Thoughts'],

	cost: { ap: 1 },
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"Choose a non-hostile creature that can see or hear you within range. Make a Spell Check against the target's Charisma Save. Check Success: The target is Charmed by you for the duration or until it takes damage or makes a Save. When the Spell effect ends, the creature realizes that you used magic to influence its mood and may become hostile toward you. DC Tip: A creature may also become hostile if the spell fails and they see you casting a spell on them!"
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
			name: 'Hostile Charm',
			description: 'You can target hostile creatures.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Clear Suspicion',
			description: "The target doesn't realize that magic was used on them when the Spell ends."
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Mass Charm',
			description:
				": You instead target each creature of your choice within range that can see or hear you. When you choose this Enhancement, the cost of all other Enhancements is doubled. The Action Point cost of this Enhancement can't be paid for with MP (See Mana Points on AP Enhancements)."
		}
	]
};
