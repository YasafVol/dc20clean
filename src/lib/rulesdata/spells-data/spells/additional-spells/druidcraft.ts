import { Spell, SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../types/spell.types';

export const druidcraft: Spell = {
  name: "Druidcraft",
  premadeList: PremadeSpellList.Additional,
  school: SpellSchool.Transmutation,
  isCantrip: true,
  cost: { ap: 1 },
  range: "5 Spaces",
  duration: "Instant",
  spellLists: [], // Not specified in PDF, assuming empty
  availableClasses: [], // Not specified in PDF, assuming empty
  effects: [
    { title: "Natural Sensory Effect", description: "You target an area within range and produce a harmless natural smell (such as flowers, faint odor of skunk, etc.) or sound (rustling leaves, a small animal, etc.)." },
    { title: "Accelerate Plant Growth", description: "You target a living mundane plant and instantly accelerate the growth of the plant (flowers bloom, seeds open, etc.)." },
    { title: "Revive Plant", description: "You target a wounded or dead mundane plant (smaller than a 1 Space cube) and bring it back to life." }
  ],
  enhancements: [] // No enhancements specified in PDF
};
