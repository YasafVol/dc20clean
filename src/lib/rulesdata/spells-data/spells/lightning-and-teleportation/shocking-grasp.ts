import { Spell, SpellSchool, SpellList, PremadeSpellList } from '../../types/spell.types';

export const shockingGrasp: Spell = {
	name: 'Shocking Grasp',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '1 Space',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Shock',
			description:
				'Lightning springs from your hand to shock a creature within range. Make a Spell Check against the target’s PD, and you have ADV if they’re wearing armor made of metal. The target must make a Physical Save. Hit: 1 Lightning damage. Failed Save: Target can’t spend AP until the start of its next turn.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Lightning Lure',
			description:
				'The damage increases by 1 and the range becomes 5 Spaces. Additionally, if the target fails their Save you can pull them up to 3 spaces toward you.'
		}
	]
};
