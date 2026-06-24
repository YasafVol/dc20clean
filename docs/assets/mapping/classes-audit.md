# Classes Audit — Rules vs Code (Comprehensive)

Last updated: 2026-01-14

Legend

- features: `src/lib/rulesdata/classes-data/features/{class}_features.ts`
- progression: `src/lib/rulesdata/classes-data/progressions/{class}.progression.ts`
- subclasses: `subclasses[]` defined in features
- startingEquipment: block present in features
- spellRestrictions: injected by loader (class.loader.ts) based on CLASS_SPELL_CONFIG

## Summary

- Rules CH6 classes (13): Barbarian, Bard, Champion, Cleric, Commander, Druid, Hunter, Monk, Rogue, Sorcerer, Spellblade, Warlock, Wizard.
- Code classes include all of the above plus Psion (extra, not in CH6). Loader also includes Paladin/Ranger/Fighter spell configs, without corresponding class data (no features/progression): ignorable or pending.

## Global Findings

### Level 5 & Level 8 Features — ALL CLASSES MISSING

Every class has placeholder TODOs in progression files:

- Level 5: `classFeatures: [] // Level 5 class feature to be added`
- Level 8: `classFeatures: [] // Capstone feature to be added`

### Starting Equipment Status

| Class      | Has startingEquipment | Pack Placeholder |
| ---------- | --------------------- | ---------------- |
| Barbarian  | ❌ No                 | N/A              |
| Bard       | ❌ No                 | N/A              |
| Champion   | ❌ No                 | N/A              |
| Cleric     | ❌ No                 | N/A              |
| Commander  | ❌ No                 | N/A              |
| Druid      | ❌ No                 | N/A              |
| Hunter     | ❌ No                 | N/A              |
| Monk       | ✅ Yes                | "Coming Soon"    |
| Rogue      | ✅ Yes                | "Coming Soon"    |
| Sorcerer   | ✅ Yes                | "Coming Soon"    |
| Spellblade | ✅ Yes                | "Coming Soon"    |
| Warlock    | ❌ No                 | N/A              |
| Wizard     | ❌ No                 | N/A              |

## Per‑Class Comparison

### Barbarian

- features: ✅ yes
- progression: ✅ yes
- subclasses: 2 (Elemental Fury, Spirit Guardian)
- startingEquipment: ❌ **MISSING**
- spellRestrictions: none (non‑caster) via loader
- L5 feature: ❌ **MISSING** (TODO in progression)
- L8 capstone: ❌ **MISSING** (TODO in progression)
- Notes: Subclass names present and match CH6.

### Bard

- features: ✅ yes
- progression: ✅ yes
- subclasses: 2 (Eloquence, Jester)
- startingEquipment: ❌ **MISSING**
- spellRestrictions: Arcane (schools Enchantment + tags per loader)
- L5 feature: ❌ **MISSING** (TODO in progression)
- L8 capstone: ❌ **MISSING** (TODO in progression)
- Notes: Ensure loader's allowedSchools/tags match v0.10 intent.

### Champion

- features: ✅ yes
- progression: ✅ yes
- subclasses: 2 (Hero, Sentinel)
- startingEquipment: ❌ **MISSING**
- spellRestrictions: none
- L5 feature: ❌ **MISSING** (TODO in progression)
- L8 capstone: ❌ **MISSING** (TODO in progression)
- Notes: SUBCLASS_REFERENCE.md says "0 subclasses" (outdated doc).

### Cleric

- features: ✅ yes
- progression: ✅ yes
- subclasses: 2 (Inquisitor, Priest)
- startingEquipment: ❌ **MISSING**
- spellRestrictions: Divine (all major schools per loader)
- L5 feature: ❌ **MISSING** (TODO in progression)
- L8 capstone: ❌ **MISSING** (TODO in progression)
- Notes: Confirm school set aligns with v0.10 cleric breadth.

### Commander

- features: ✅ yes
- progression: ✅ yes
- subclasses: 2 (Crusader, Warlord)
- startingEquipment: ❌ **MISSING**
- spellRestrictions: none
- L5 feature: ❌ **MISSING** (TODO in progression)
- L8 capstone: ❌ **MISSING** (TODO in progression)
- Notes: Verify subclass names vs CH6.

### Druid

- features: ✅ yes
- progression: ✅ yes
- subclasses: 2 (Phoenix, Rampant Growth)
- startingEquipment: ❌ **MISSING**
- spellRestrictions: Primal (broad school list per loader)
- L5 feature: ❌ **MISSING** (TODO in progression)
- L8 capstone: ❌ **MISSING** (TODO in progression)
- Notes: Wild Form appears in features; map to GRANT_MOVEMENT/GRANT_SENSE/condition effects.

### Hunter

- features: ✅ yes
- progression: ✅ yes
- subclasses: 2 (Monster Slayer, Trapper)
- startingEquipment: ❌ **MISSING**
- spellRestrictions: Primal (Conjuration/Divination/Transmutation) per loader
- L5 feature: ❌ **MISSING** (TODO in progression)
- L8 capstone: ❌ **MISSING** (TODO in progression)
- Notes: SUBCLASS_REFERENCE.md says "0 subclasses" (outdated doc).

### Monk

- features: ✅ yes
- progression: ✅ yes
- subclasses: 2 (Astral Self, Shifting Tide)
- startingEquipment: ✅ **Present** (packs placeholder)
- spellRestrictions: none
- L5 feature: ❌ **MISSING** (TODO in progression)
- L8 capstone: ❌ **MISSING** (TODO in progression)
- Notes: Training validation applies.

### Rogue

- features: ✅ yes
- progression: ✅ yes
- subclasses: 2 (Long Death, Swashbuckler)
- startingEquipment: ✅ **Present** (packs placeholder)
- spellRestrictions: none
- L5 feature: ❌ **MISSING** (TODO in progression)
- L8 capstone: ❌ **MISSING** (TODO in progression)
- Notes: OK.

### Sorcerer

- features: ✅ yes
- progression: ✅ yes
- subclasses: 2 (Angelic, Draconic)
- startingEquipment: ✅ **Present** (packs placeholder)
- spellRestrictions: Arcane (broad school list per loader)
- L5 feature: ❌ **MISSING** (TODO in progression)
- L8 capstone: ❌ **MISSING** (TODO in progression)
- Notes: Verify subclass names vs CH6.

### Spellblade

- features: ✅ yes
- progression: ✅ yes
- subclasses: 2 (Paladin, Rune Knight)
- startingEquipment: ✅ **Present** (packs placeholder)
- spellRestrictions: Arcane + tags Weapon/Ward (loader) with schools chosen via choices
- L5 feature: ❌ **MISSING** (TODO in progression)
- L8 capstone: ❌ **MISSING** (TODO in progression)
- Notes: Hybrid path access expected.

### Warlock

- features: ✅ yes
- progression: ✅ yes
- subclasses: 2 (Eldritch, Fey)
- startingEquipment: ❌ **MISSING**
- spellRestrictions: Arcane (schools chosen via choices per loader comment)
- L5 feature: ❌ **MISSING** (TODO in progression)
- L8 capstone: ❌ **MISSING** (TODO in progression)
- Notes: Confirm specialized restrictions handled by Global Magic Profile/slots.

### Wizard

- features: ✅ yes
- progression: ✅ yes
- subclasses: 2 (Portal Mage, Witch)
- startingEquipment: ❌ **MISSING**
- spellRestrictions: Arcane (all 8 schools per loader)
- L5 feature: ❌ **MISSING** (TODO in progression)
- L8 capstone: ❌ **MISSING** (TODO in progression)
- Notes: Rules CH6 lists Portal Mage; code also has 'Witch'. Confirm spec vs implementation.

### Psion (EXTRA — NOT IN RULES)

- features: ✅ yes (placeholder file)
- progression: ✅ yes (placeholder file)
- subclasses: 0
- startingEquipment: ❌ No
- spellRestrictions: n/a
- L5/L8: N/A (placeholder)
- Notes: Not in CH6; likely experimental/pending removal or future class.

## Actions Required

### Immediate (26 file changes)

1. **Add/verify level 5 Expert Feature compatibility IDs** for all 13 classes
   - Keep the existing `<class>_level_5_placeholder` ID shape only as a saved-data compatibility alias.
   - Do not add level 8/9 capstone placeholders without source-published mechanics.

2. **Add startingEquipment to 9 classes**
   - Barbarian, Bard, Champion, Cleric, Commander, Druid, Hunter, Warlock, Wizard

### Documentation

1. Resolve subclass parity discrepancies (Wizard Witch, Champion/Hunter subclass counts in SUBCLASS_REFERENCE.md)
2. Audit CLASS_SPELL_CONFIG entries per class vs v0.10 spell access rules
3. Document Psion as experimental or remove from release build

## Level 5 Expert Feature Compatibility IDs

| Class      | L5 ID                            |
| ---------- | -------------------------------- |
| Barbarian  | `barbarian_level_5_placeholder`  |
| Bard       | `bard_level_5_placeholder`       |
| Champion   | `champion_level_5_placeholder`   |
| Cleric     | `cleric_level_5_placeholder`     |
| Commander  | `commander_level_5_placeholder`  |
| Druid      | `druid_level_5_placeholder`      |
| Hunter     | `hunter_level_5_placeholder`     |
| Monk       | `monk_level_5_placeholder`       |
| Rogue      | `rogue_level_5_placeholder`      |
| Sorcerer   | `sorcerer_level_5_placeholder`   |
| Spellblade | `spellblade_level_5_placeholder` |
| Warlock    | `warlock_level_5_placeholder`    |
| Wizard     | `wizard_level_5_placeholder`     |

## Proposed startingEquipment (9 classes)

See `patches/all_classes_placeholders.md` for full implementation details.
