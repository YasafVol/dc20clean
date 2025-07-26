import { Spell, SpellSchool, SpellList, PremadeSpellList } from '../../types/spell.types';

export const lightningBolt: Spell = {
	name: 'Lightning Bolt',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Primal],
	availableClasses: [ClassName.Wizard, ClassName.Sorcerer],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Lightning damage.'
		},
		{
			title: 'Lightning Orb',
			description:
				'Crackling lightning appears between both of your hands. The electric energy can remain there for 10 minutes and harms neither you nor your equipment. The energy sheds Bright Light in a 10 Space radius. The Spell ends early if you dismiss it for free, if you cast it again, stop using both hands, or spend 1 AP to make a Spell Attack with it.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are wearing metal armor.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Lightning damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Chain',
			description:
				'Choose 1 additional target within 2 Spaces of the original target. Compare your Spell Check against the new target’s PD. Hit: The additional target takes 2 Lightning damage and is unaffected by features that allow you to deal more damage, including Heavy Hits and higher (except the Cantrip Passive). You can use this Enhancement multiple times, choosing an additional target within 2 Spaces of the previously chosen target.'
		}
	]
};
