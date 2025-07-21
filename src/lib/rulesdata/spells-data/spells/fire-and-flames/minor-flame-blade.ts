import { Spell, SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../types/spell.types';

export const minorFlameBlade: Spell = {
  name: "Minor Flame Blade",
  premadeList: PremadeSpellList.FireAndFlames,
  school: SpellSchool.Destruction,
  isCantrip: true,
  cost: { ap: 1 },
  range: "Self",
  duration: "Instant",
  spellLists: [], // Not specified in PDF, assuming empty
  availableClasses: [], // Not specified in PDF, assuming empty
  effects: [
    { title: "Imbue Weapon", description: "You imbue a Melee Weapon you’re wielding with flames. Until the end of your next turn, the next Attack Check that hits with this weapon deals an additional 1 Fire damage to your target or a creature within 1 Space of the target." }
  ],
  enhancements: [
    { type: "MP", cost: 1, name: "Flame Strike", description: "You deal an extra 2 Fire damage to the target (must be done before the Attack is made). Miss: Deal 1 Fire damage to the target." },
    { type: "MP", cost: 1, name: "Flame Bound", description: "You deal an extra 1 Fire damage to the target and another target within 1 Space." }
  ]
};
