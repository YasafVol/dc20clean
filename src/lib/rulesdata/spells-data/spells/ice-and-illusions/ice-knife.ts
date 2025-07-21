import { Spell, SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../types/spell.types';

export const iceKnife: Spell = {
  name: "Ice Knife",
  premadeList: PremadeSpellList.IceAndIllusions,
  school: SpellSchool.Destruction,
  isCantrip: false,
  cost: { ap: 2, mp: 1 },
  range: "10 Spaces",
  duration: "Instant",
  spellLists: [], // Not specified in PDF, assuming empty
  availableClasses: [], // Not specified in PDF, assuming empty
  effects: [
    { title: "Ice Shard", description: "You create a shard of ice and fling it at one creature within range. Make a Spell Check against the target’s PD. Hit: The target takes 2 Cold damage and then the ice explodes. Compare the Spell Check to the AD of each creature within 1 space of the original target (including the target). Hit: Deal 1 Cold damage. Miss: The spell doesn’t explode and only deals half damage to the original target." }
  ],
  enhancements: [
    { type: "MP", cost: 1, name: "Damage", description: "You increase the damage of the initial hit and the explosion by 1 each." }
  ]
};
