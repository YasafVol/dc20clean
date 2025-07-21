import { Spell, SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../types/spell.types';

export const fogCloud: Spell = {
  name: "Fog Cloud",
  premadeList: PremadeSpellList.FireAndFlames,
  school: SpellSchool.Conjuration,
  isCantrip: false,
  cost: { ap: 2, mp: 1 },
  range: "20 Spaces",
  duration: "1 hour (Sustained)",
  spellLists: [], // Not specified in PDF, assuming empty
  availableClasses: [], // Not specified in PDF, assuming empty
  effects: [
    { title: "Create Fog", description: "Make a DC 10 Spell Check. Success: You create a sphere of fog with up to a 4 Space radius, centered on a point within range. Succeed (each 5): Radius increases by 1 Space. Failure: 3 Space radius. The Sphere spreads around corners and its area is Fully Concealed. Creatures within 1 Space of each other can see each other normally. The fog lasts for the duration or until a wind of moderate or greater speed disperses it." }
  ],
  enhancements: [
    { type: "MP", cost: 1, name: "Area of Effect", description: "The radius of the Spell’s effect increases by 3 Spaces." }
  ]
};
