import { Spell, SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../types/spell.types';

export const shield: Spell = {
  name: "Shield",
  premadeList: PremadeSpellList.Additional,
  school: SpellSchool.Protection,
  isCantrip: true,
  cost: { ap: 1 },
  range: "1 Space",
  duration: "Instant",
  spellLists: [], // Not specified in PDF, assuming empty
  availableClasses: [], // Not specified in PDF, assuming empty
  effects: [
    { title: "Create Barrier", description: "You create a barrier of magic to protect yourself or another creature nearby. Trigger: When a creature you can see within range (including yourself) is targeted by an Attack. Reaction: You grant the target a +5 bonus to its PD and AD against the Attack." }
  ],
  enhancements: [
    { type: "MP", cost: 1, name: "Increase Range", description: "The range increases to 5 Spaces." },
    { type: "MP", cost: 1, name: "Multiple Targets", description: "You can target 1 additional creature in range from the same triggering Attack (such as an Area of Effect)." },
    { type: "MP", cost: 2, name: "Increase Duration", description: "The PD and AD bonus lasts until the start of your next turn." }
  ]
};
