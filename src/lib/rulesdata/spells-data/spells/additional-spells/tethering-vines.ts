import { Spell, SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../types/spell.types';

export const tetheringVines: Spell = {
  name: "Tethering Vines",
  premadeList: PremadeSpellList.Additional,
  school: SpellSchool.Conjuration,
  isCantrip: false,
  cost: { ap: 2, mp: 1 },
  range: "10 Spaces",
  duration: "1 min (Sustained)",
  spellLists: [], // Not specified in PDF, assuming empty
  availableClasses: [], // Not specified in PDF, assuming empty
  effects: [
    { title: "Sprout Vines", description: "Choose a Space within range. Vines and weeds sprout up from the ground in a 3 Space Radius from the chosen Space, making the area Difficult Terrain. Make a Spell Check Contested by a Physical Save from all creatures (other than you) within range. Success: The creature is Tethered. Tethered: While Tethered, the creature can’t leave the area. The creature can spend 1 AP to make a Physical Check of your choice against your Save DC. Success: The target is no longer Tethered. When the Spell ends, the conjured plants wilt away." }
  ],
  enhancements: [
    { type: "MP", cost: 1, name: "Widen Vines", description: "The radius increases by 1 Space." }
  ]
};
