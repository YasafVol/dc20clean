import { Spell, SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../types/spell.types';

export const light: Spell = {
  name: "Light",
  premadeList: PremadeSpellList.HolyAndRestoration,
  school: SpellSchool.Conjuration,
  isCantrip: true,
  cost: { ap: 1 },
  range: "Touch",
  duration: "1 hour",
  spellLists: [], // Not specified in PDF, assuming empty
  availableClasses: [], // Not specified in PDF, assuming empty
  effects: [
    { title: "Shed Light", description: "You touch an object that’s no larger than Medium. Until the spell ends, the object sheds Bright Light in a 5 Space radius. You choose the color of the light. Completely covering the object with something opaque blocks the light. The Spell ends if you cast it again or dismiss it as a Free Action. If you target an object held or worn by a hostile creature, make an Attack Check contested by the target’s Agility Save. Success: You cast Light on the object." }
  ],
  enhancements: [
    { type: "MP", cost: 1, name: "Blinding Light", description: "You make a Spell Check contested by a Physical Save from all targets within 2 Spaces of the Light source. Failure: The target is Blinded for 1 Round." }
  ]
};
