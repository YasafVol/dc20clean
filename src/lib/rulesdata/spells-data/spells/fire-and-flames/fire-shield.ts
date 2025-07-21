import { Spell, SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../types/spell.types';

export const fireShield: Spell = {
  name: "Fire Shield",
  premadeList: PremadeSpellList.FireAndFlames,
  school: SpellSchool.Abjuration,
  isCantrip: false,
  cost: { ap: 2, mp: 1 },
  range: "Self",
  duration: "1 hour",
  spellLists: [], // Not specified in PDF, assuming empty
  availableClasses: [], // Not specified in PDF, assuming empty
  effects: [
    { title: "Protective Force", description: "A protective magical force surrounds you, manifesting as spectral flames that cover you and your gear. You emit Bright Light in a 2 Space Radius. Make a DC 15 Spell Check. Success: You gain 3 Temp HP. Success (each 5): +1 Temp HP. Failure: 2 Temp HP. If a creature hits you with a Melee Attack while you have this Temp HP, the creature takes 1 Fire damage for each Temp HP it consumed with its Attack. The Spell ends once the Temp HP is consumed." }
  ],
  enhancements: [
    { type: "MP", cost: 3, name: "Fire Protection", description: "You gain Fire Resistance (Half) and 10 more Temp HP." }
  ]
};
