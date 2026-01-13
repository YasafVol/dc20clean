import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const lightningBolt: Spell = {
	id: 'lightning-bolt',
	name: 'Lightning Bolt',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Lightning', 'Stunned'],
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a bolt of lightning that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target you can see within range. Hit: The target takes 1 Lightning damage.'
		}
	],
	cantripPassive:
		"Magnetic: Metal in the target's Space becomes briefly magnetized, causing metal objects to attract or repel each other and disrupting compass-based navigation.",
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
			type: 'AP',
			cost: 1,
			name: 'Stun',
			description:
				'1 target of your choice makes a Physical Save. Creatures made of metal or wearing metal (such as Heavy Armor) have DisADV on this Save. Save Failure: The target becomes Stunned until the start of its next turn.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Chain',
			description:
				'Choose 1 additional targets within 3 Spaces of the original target using the same Spell Attack for all targets. If you use this Enhancement multiple times, you choose an additional target within 3 Spaces of a previously chosen target.',
			repeatable: true
		}
	]
};
