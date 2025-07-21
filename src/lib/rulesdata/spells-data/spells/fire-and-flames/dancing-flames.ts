import { Spell, SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../types/spell.types';

export const dancingFlames: Spell = {
  name: "Dancing Flames",
  premadeList: PremadeSpellList.FireAndFlames,
  school: SpellSchool.Destruction,
  isCantrip: true,
  cost: { ap: 1 },
  range: "20 Spaces",
  duration: "1 min (Sustained)",
  spellLists: [], // Not specified in PDF, assuming empty
  availableClasses: [], // Not specified in PDF, assuming empty
  effects: [
    { title: "Create Flames", description: "Make a DC 10 Spell Check. Success: You create up to 3 torch-sized Flames within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. Success (each 5): +1 Flame. Failure: 2 Flames. You can also combine 4 Flames into 1 glowing vaguely humanoid form of Medium Size. Whichever form you choose, each Flame sheds Bright Light in a 2 Space radius. You can spend 1 AP to move the Flames up to 10 Spaces to a new Space within range. A Flame must be within 5 Spaces of another Flame created by this Spell and be within 20 Spaces from you, or it winks out of existence." }
  ],
  enhancements: [
    { type: "AP", cost: 2, name: "Detonate", description: "Spend 2 AP and 1 MP to detonate the Flames. Make a single Spell Check and compare it against the AD of each target sharing a Space with a Flame. Hit: Each Flame in that Space deals 1 Fire damage to the target, but doesn’t benefit from Heavy, Brutal, or Critical Hits." }
  ]
};
