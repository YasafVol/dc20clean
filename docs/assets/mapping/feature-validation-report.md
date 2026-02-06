# Feature Validation Report — Rules vs Code

Last updated: 2026-02-06

Source of truth: `docs/assets/DC20 0.10 full.md` (v0.10)
Code under validation: `src/lib/rulesdata/classes-data/features/`, `src/lib/rulesdata/classes-data/progressions/`, `src/lib/rulesdata/ancestries/`

---

## Executive Summary

| Category | Items Checked | Discrepancies Found |
| -------- | ------------- | ------------------- |
| Classes (13) | ~130 features + 26 subclass features + 13 progression tables + 13 starting equipment | 64+ |
| Ancestries (11) | ~239 traits across 11 ancestries | 20 |
| **Total** | | **84+** |

### Top Priority Issues

1. **Progression files reference non-existent feature IDs** (Monk, Sorcerer, Warlock, Spellblade, Druid, Commander) -- will cause runtime failures
2. **Subclass features have wrong `levelGained`** (Sorcerer subclasses set to 1 instead of 3)
3. **Warlock Eldritch Forbidden Knowledge**: MP reduction is 1 in code, rules say 2
4. **Starting Equipment**: ALL 13 classes have arsenal count wrong ("2" instead of "3") and ALL are missing Trade Tools
5. **Beastborn**: 5 missing traits, several effect mismatches
6. **Halfling**: Condition name mismatch ("Rattled" vs "Terrified") in 2 traits

---

## Cross-Cutting Issues (All Classes)

### Starting Equipment — Arsenal Count
Every class specifies "2 Weapons or Shields" (or similar) but the rules consistently say **"Choose 3"** items.

### Starting Equipment — Missing Trade Tools
No class definition includes Trade Tools selections. Every class in CH6 specifies 1-2 Trade Tool choices.

### Level 5 and Level 8 Features
All 13 classes have placeholder features at L5 and L8. These are known placeholders (documented in `classes-audit.md`). Not counted as new discrepancies.

---

# PART 1: CLASS VALIDATION

---

## Barbarian

**Source:** Rules lines 8725-8837 vs `barbarian_features.ts`, `barbarian.progression.ts`

### Progression Table
All numeric values (HP, SP, Maneuvers, Attribute/Skill/Trade points) match the rules.

### Core Features

| Feature | Level | In Code | Name | Level | Description | Effects | Notes |
| ------- | ----- | ------- | ---- | ----- | ----------- | ------- | ----- |
| Rage | 1 | Yes (`barbarian_rage`) | Match | Match | Match | Correct | -- |
| Berserker | 1 | Yes (`barbarian_berserker`) | Match | Match | Match | Correct | -- |
| Shattering Force | 1 | Yes (`barbarian_shattering_force`) | Match | Match | Match | Correct (flavor) | -- |
| Battlecry | 2 | Yes (`barbarian_battlecry`) | Match | Match | Match | Correct | -- |

### Subclass: Elemental Fury

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Raging Elements | Yes (`barbarian_elemental_fury_raging_elements`) | Partial | Missing Erupting Elements and Elemental Blast mechanics in effects |
| Elemental Affinity | Yes (`barbarian_elemental_fury_elemental_affinity`) | Match | Flavor, correct |

### Subclass: Spirit Guardian

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Ancestral Guardian | Yes (`barbarian_spirit_guardian_ancestral_guardian`) | Match | Correct |
| Ancestral Knowledge | Yes (`barbarian_spirit_guardian_ancestral_knowledge`) | Match | Flavor, correct |

### Starting Equipment
- **Arsenal:** Rules say "Choose 3 of Weapon or Shield", code has "2 Weapons or Shields"
- **Armor:** Rules say "1 set of Armor", code says "1 set of Light Armor or Heavy Armor"
- **Trade Tools:** Rules list Brewer's Supplies, Cooking Utensils, Leatherworker's Tools, or Sculptor's Tools — **MISSING** from code

### Discrepancies
1. Starting Equipment: Arsenal should be "Choose 3" not "2"
2. Starting Equipment: Trade Tools missing
3. Elemental Fury - Raging Elements: Missing Erupting Elements mechanic (creatures dealing damage take 1 Elemental Rage damage)
4. Elemental Fury - Raging Elements: Missing Elemental Blast mechanic (1 AP + 1 SP, Spell Check vs AD)

---

## Champion

**Source:** Rules lines 8947-9045 vs `champion_features.ts`, `champion.progression.ts`

### Progression Table
All numeric values match the rules.

### Core Features

| Feature | Level | In Code | Status |
| ------- | ----- | ------- | ------ |
| Master-at-Arms | 1 | Yes (`champion_master_at_arms`) | Match |
| Fighting Spirit | 1 | Yes (`champion_fighting_spirit`) | Match |
| Know Your Enemy | 1 | Yes (`champion_know_your_enemy`) | Match (flavor) |
| Adaptive Tactics | 2 | Yes (`champion_adaptive_tactics`) | Match |

### Subclass: Hero

| Feature | In Code | Status |
| ------- | ------- | ------ |
| Hero's Resolve | Yes (`hero_resolve`) | Match |
| Adventuring Hero | Yes (`adventuring_hero`) | Match (flavor) |

### Subclass: Sentinel

| Feature | In Code | Status |
| ------- | ------- | ------ |
| Stalwart Protector | Yes (`stalwart_protector`) | Match |
| Vigilant Watcher | Yes (`vigilant_watcher`) | Match (flavor) |

### Starting Equipment
- **Arsenal:** Rules say "Choose 3", code has "2"
- **Trade Tools:** Missing (Carpenter's Tools, Cartographer's Tools, Gaming Kit, Mason's Tools)

### Discrepancies
1. Starting Equipment: Arsenal should be "Choose 3" not "2"
2. Starting Equipment: Trade Tools missing

---

## Commander

**Source:** Rules lines 9183-9276 vs `commander_features.ts`, `commander.progression.ts`

### Progression Table
- **Level 1 CRITICAL:** Progression references `commander_call` but feature ID is `commander_commanders_call` — ID mismatch will prevent feature from being resolved

### Core Features

| Feature | Level | In Code | Status |
| ------- | ----- | ------- | ------ |
| Inspiring Presence | 1 | Yes (`commander_inspiring_presence`) | Match |
| Commander's Call | 1 | Yes (`commander_commanders_call`) | Match (but progression ID wrong) |
| Natural Leader | 1 | Yes (`commander_natural_leader`) | Match (flavor) |
| Commanding Aura | 2 | Yes (`commander_commanding_aura`) | Match |

### Subclass: Crusader

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Virtuous Vanguard | Yes | Match | Missing `id` field |
| Gallant Hero | Yes | Match (flavor) | Missing `id` field |

### Subclass: Warlord

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Offensive Tactics | Yes | Match | Missing `id` field |
| Battlefield Tactician | Yes | Match (flavor) | Missing `id` field |

### Starting Equipment
- **Arsenal:** Rules say "Choose 3", code has "2"
- **Trade Tools:** Missing (Cartographer's Tools, Calligrapher's, Cryptographer's Tools, Gaming Set)

### Discrepancies
1. **CRITICAL:** Progression references `commander_call` but feature ID is `commander_commanders_call`
2. Crusader subclass features missing `id` fields (Virtuous Vanguard, Gallant Hero)
3. Warlord subclass features missing `id` fields (Offensive Tactics, Battlefield Tactician)
4. Starting Equipment: Arsenal "Choose 3" not "2"
5. Starting Equipment: Trade Tools missing

---

## Hunter

**Source:** Rules lines 9469-9621 vs `hunter_features.ts`, `hunter.progression.ts`

### Progression Table
- **Level 1:** Missing `hunter_bestiary` in classFeatures array — feature won't be granted

### Core Features

| Feature | Level | In Code | Status | Issues |
| ------- | ----- | ------- | ------ | ------ |
| Hunter's Mark | 1 | Yes (`hunter_mark`) | Partial | Missing reaction mechanic (re-mark on creature death) |
| Favored Terrain | 1 | Yes (`hunter_favored_terrain`) | Match | -- |
| Bestiary | 1 | Yes (`hunter_bestiary`) | Match (flavor) | Not in progression L1 classFeatures |
| Hunter's Strike | 2 | Yes (`hunter_strike`) | Match | -- |

### Subclass: Monster Slayer

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Monstrous Concoctions | Yes (`monster_slayer_concoctions`) | Partial | Missing: creation limits (Prime Modifier per Long Rest), administration mechanics (Object Action), duration (10 min), inert on Long Rest |
| Monster Hunter | Yes (`monster_hunter`) | Match (flavor) | -- |

### Subclass: Trapper

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Dynamic Traps | Yes (`dynamic_traps`) | Partial | Missing: trap creation limits (max = Prime Mod), setting mechanics (1 AP within 5 Spaces), duration (1 hour), recovery (1 AP within 1 Space) |
| Discerning Eye | Yes (`discerning_eye`) | Match (flavor) | -- |

### Starting Equipment
- **Arsenal:** Rules say "Choose 3 of Weapon or Light Shield", code has "2"
- **Trade Tools:** Missing (Disguise Kit, Herbalist's Supplies, Leatherworker's Tools, Sculptor's Tools)

### Discrepancies
1. Progression L1 missing `hunter_bestiary` in classFeatures
2. Hunter's Mark: Missing reaction mechanic for re-marking on creature death
3. Monster Slayer - Monstrous Concoctions: Missing creation limits, administration, duration, inertness rules
4. Trapper - Dynamic Traps: Missing creation limits, setting/recovery mechanics, duration
5. Starting Equipment: Arsenal "Choose 3" not "2"
6. Starting Equipment: Trade Tools missing

---

## Monk

**Source:** Rules lines 9622-9762 vs `monk_features.ts`, `monk.progression.ts`

### Progression Table
- **CRITICAL:** Level 1 references `monk_inner_peace` — feature does not exist
- **CRITICAL:** Level 2 references `monk_martial_arts` — feature does not exist

### Core Features

| Feature | Level | In Code | Status | Issues |
| ------- | ----- | ------- | ------ | ------ |
| Monk Training | 1 | Yes (`monk_training`) | Match | -- |
| Monk Stance | 1 | Yes (`monk_stance`) | Partial | Code says "Spend 1 SP", rules say "1 AP or 1 SP" |
| Meditation | 1 | Yes (`monk_meditation`) | Match | -- |
| Spiritual Balance | 2 | Yes (`monk_spiritual_balance`) | Partial | Code mentions instant Ki replenishment outside combat (not in rules) |

### Subclass: Astral Self

| Feature | In Code | Status |
| ------- | ------- | ------ |
| Astral Awakening | Yes (`monk_astral_awakening`) | Match |
| Astral Watch | Yes (`monk_astral_watch`) | Match |

### Subclass: Shifting Tide

| Feature | In Code | Status |
| ------- | ------- | ------ |
| Ebb and Flow | Yes (`monk_ebb_and_flow`) | Match |
| Fluid Movement | Yes (`monk_fluid_movement`) | Match |

### Starting Equipment
- **Arsenal:** Code has extra weapon option ("3 Weapons with Toss or Thrown Property") not in rules
- **Trade Tools:** Missing (Brewer's Supplies, Calligrapher's Supplies, Cooking Utensils, Weaver's Tools)

### Discrepancies
1. **CRITICAL:** Progression L1 references non-existent `monk_inner_peace`
2. **CRITICAL:** Progression L2 references non-existent `monk_martial_arts`
3. Monk Stance: Code says "Spend 1 SP" but rules say "1 AP or 1 SP"
4. Spiritual Balance: Code mentions instant Ki replenishment outside combat (not in rules)
5. Starting Equipment: Extra weapon option not in rules
6. Starting Equipment: Trade Tools missing

---

## Rogue

**Source:** Rules lines 9763-9859 vs `rogue_features.ts`, `rogue.progression.ts`

### Progression Table
All numeric values match the rules.

### Core Features

| Feature | Level | In Code | Status | Issues |
| ------- | ----- | ------- | ------ | ------ |
| Debilitating Strike | 1 | Yes (`rogue_debilitating_strike`) | Partial | Code says "until start of next turn", rules say "for 1 Round" |
| Roguish Finesse | 1 | Yes (`rogue_roguish_finesse`) | Match | -- |
| Cypher Speech | 1 | Yes (`rogue_cypher_speech`) | Match | -- |
| Cheap Shot | 2 | Yes (`rogue_cheap_shot`) | Match | -- |

### Subclass: Long Death

| Feature | In Code | Status |
| ------- | ------- | ------ |
| Thousand Cuts | Yes (`rogue_thousand_cuts`) | Match |
| Hundred Ways to Die | Yes (`rogue_hundred_ways_to_die`) | Match |

### Subclass: Swashbuckler

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Renegade Duelist | Yes (`rogue_renegade_duelist`) | Partial | Taunting Shot: Code says "Once per turn", rules say "Once per round" |
| Tall Tales | Yes (`rogue_tall_tales`) | Match | -- |

### Starting Equipment
- **Arsenal:** Rules say "Choose 3 of Weapon or Light Shield", code has "2" with extra ranged weapon options not in rules
- **Trade Tools:** Missing (Cryptographer's Tools, Disguise Kit, Herbalist's Supplies, Lockpicking Tools)

### Discrepancies
1. Debilitating Strike: "until start of next turn" vs rules "for 1 Round"
2. Swashbuckler - Taunting Shot: "Once per turn" vs rules "Once per round"
3. Starting Equipment: Arsenal count and structure mismatch
4. Starting Equipment: Trade Tools missing

---

## Bard

**Source:** Rules lines 8839-8946 vs `bard_features.ts`, `bard.progression.ts`

### Progression Table
All numeric values match the rules.

### Core Features

| Feature | Level | In Code | Status |
| ------- | ----- | ------- | ------ |
| Font of Inspiration | 1 | Yes (`bard_font_of_inspiration`) | Match |
| Remarkable Repertoire | 1 | Yes (`bard_remarkable_repertoire`) | Match |
| Crowd Pleaser | 1 | Yes (`bard_crowd_pleaser`) | Match |
| Bardic Performance | 2 | Yes (`bard_bardic_performance`) | Match |

### Subclass: Eloquence

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Beguiling Presence | Yes | Match | Missing `id` field |
| Eloquent Orator | Yes | Match | Missing `id` field |

### Subclass: Jester

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Antagonizing Act | Yes | Match | Missing `id` field |
| Comedian | Yes | Match | Missing `id` field |

### Starting Equipment
- **Arsenal:** Rules say "Choose 3 of Spell Focus, Weapon, or Light Shield", code has "1 Weapon or Light Shield" + separate spell focus
- **Trade Tools:** Missing (Calligrapher's Supplies, Disguise Kit, Gaming Kit, Musical Instrument, Sculptor's Tools)

### Discrepancies
1. Subclass features missing `id` fields (all 4 Eloquence/Jester features)
2. Starting Equipment: Arsenal structure and count mismatch
3. Starting Equipment: Trade Tools missing

---

## Cleric

**Source:** Rules lines 9046-9182 vs `cleric_features.ts`, `cleric.progression.ts`

### Progression Table
All numeric values match the rules.

### Core Features

| Feature | Level | In Code | Status | Issues |
| ------- | ----- | ------- | ------ | ------ |
| Cleric Order | 1 | Yes (`cleric_order`) | Match | All 12 domains modeled |
| Divine Blessing | 1 | Yes (`cleric_divine_blessing`) | Match | -- |
| Divine Omen | 1 | Yes (`cleric_divine_omen`) | Match | -- |
| Channel Divinity | 2 | Yes (`cleric_channel_divinity`) | Match | -- |
| Divine Damage Expansion | 1 | Yes (`cleric_divine_damage_expansion`) | Extra | Should be part of Magic Domain, not standalone |

### Subclass: Inquisitor

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Vanquish Heresy | Yes | Partial | Missing detailed "Divine Blessing - Chastise" mechanics; missing `id` |
| Divine Interrogator | Yes | Match | Missing `id` |

### Subclass: Priest

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Sanctification | Yes | Partial | Missing detailed "Channel Divinity - Hand of Salvation" mechanics; missing `id` |
| All That Ails | Yes | Match | Missing `id` |

### Starting Equipment
- **Arsenal:** Rules say "Choose 3 of Spell Focus, Weapon, or Light Shield" (Heavy Shield if Peace Domain), code has "1 Weapon or Light Shield" + separate spell focus
- **Trade Tools:** Missing (Brewer's Supplies, Calligrapher's Supplies, Herbalist's Supplies, Musical Instrument, Sculptor's Tools)

### Discrepancies
1. Divine Damage Expansion listed as standalone feature but should be part of Magic Domain
2. Inquisitor - Vanquish Heresy: Missing "Chastise" Divine Blessing mechanics
3. Priest - Sanctification: Missing "Hand of Salvation" Channel Divinity mechanics
4. Subclass features missing `id` fields (all 4)
5. Starting Equipment: Arsenal structure mismatch, Peace Domain options missing
6. Starting Equipment: Trade Tools missing

---

## Druid

**Source:** Rules lines 9277-9468 vs `druid_features.ts`, `druid.progression.ts`

### Progression Table
All numeric values match the rules.
- **CRITICAL:** Progression references `druid_animal_whisperer` at L1 — should be `druid_wild_speech`

### Core Features

| Feature | Level | In Code | Status |
| ------- | ----- | ------- | ------ |
| Druid Domain | 1 | Yes (`druid_domain`) | Match |
| Wild Form | 1 | Yes (`druid_wild_form`) | Match |
| Wild Speech | 1 | Yes (`druid_wild_speech`) | Match |
| Nature's Torrent | 2 | Yes (`druid_natures_torrent`) | Match |

### Subclass: Phoenix

| Feature | In Code | Status |
| ------- | ------- | ------ |
| Flames of Rebirth | Yes | Match |
| Fire Within | Yes | Match (flavor) |

### Subclass: Rampant Growth

| Feature | In Code | Status |
| ------- | ------- | ------ |
| Overgrowth | Yes | Match |
| Seed Vault | Yes | Match (flavor) |

### Starting Equipment
- **Arsenal:** Rules say 2 Spell Focuses, code has 1 Weapon + 1 Spell Focus
- **Armor:** Code adds "non-metal" restriction not in rules
- **Trade Tools:** Missing (Herbalist's Supplies, Leatherworker's Tools, Sculptor's Tools, Weaver's Tools — choose 2)

### Discrepancies
1. **CRITICAL:** Progression references non-existent `druid_animal_whisperer` at L1
2. Starting Equipment: Rules say 2 Spell Focuses, code has 1 Weapon + 1 Spell Focus
3. Starting Equipment: Code adds "non-metal" armor restriction not in rules text
4. Starting Equipment: Trade Tools missing

---

## Sorcerer

**Source:** Rules lines 9860-9966 vs `sorcerer_features.ts`, `sorcerer.progression.ts`

### Progression Table
- **CRITICAL:** References `sorcerer_spellcasting_path` — does not exist
- **CRITICAL:** References `sorcerer_magical_nature` — does not exist
- **CRITICAL:** References `sorcerer_magical_overflow` at L2 — does not exist

### Core Features

| Feature | Level | In Code | Status |
| ------- | ----- | ------- | ------ |
| Innate Power | 1 | Yes (`sorcerer_innate_power`) | Match |
| Overload Magic | 1 | Yes (`sorcerer_overload_magic`) | Match |
| Sorcery | 1 | Yes (`sorcerer_sorcery_spell`) | Match (flavor) |
| Meta Magic | 2 | Yes (`sorcerer_meta_magic`) | Match |

### Subclass: Angelic

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Celestial Spark | Yes | Match | **levelGained: 1, should be 3** |
| Celestial Appearance | Yes | Partial | **levelGained: 1, should be 3**; missing Celestial language mastery |

### Subclass: Draconic

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Draconic Spark | Yes | Match | **levelGained: 1, should be 3** |
| Draconic Appearance | Yes | Match | **levelGained: 1, should be 3** |

### Starting Equipment
- **Arsenal:** Rules say 2 Spell Focuses, code has 1 Weapon
- **Trade Tools:** Missing (Alchemist's Supplies, Calligrapher's Supplies, Jeweler's Tools, Weaver's Tools — choose 2)

### Discrepancies
1. **CRITICAL:** Progression references 3 non-existent feature IDs (`sorcerer_spellcasting_path`, `sorcerer_magical_nature`, `sorcerer_magical_overflow`)
2. **All 4 subclass features have levelGained: 1 instead of 3**
3. Celestial Appearance: Missing Celestial language mastery grant
4. Starting Equipment: Rules say 2 Spell Focuses, code has 1 Weapon
5. Starting Equipment: Trade Tools missing

---

## Warlock

**Source:** Rules lines 10136-10253 vs `warlock_features.ts`, `warlock.progression.ts`

### Progression Table
- **CRITICAL:** References `warlock_spellcasting_path` — does not exist
- **CRITICAL:** References `warlock_occult_knowledge` — does not exist; rules have "Beseech Patron" flavor feature

### Core Features

| Feature | Level | In Code | Status | Issues |
| ------- | ----- | ------- | ------ | ------ |
| Warlock Contract | 1 | Yes (`warlock_contract`) | Partial | Feature has levelGained: 1 but progression assigns at L2 |
| Pact Boon | 1 | Yes (`warlock_pact_boon`) | Partial | Code says "Cantrip" option, rules say "Spell" option |
| Beseech Patron | 1 | Missing | Missing | Rules have this flavor feature; code references `warlock_occult_knowledge` instead |
| Life Tap | 2 | Yes (`warlock_life_tap`) | Match | -- |

### Subclass: Eldritch

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Otherworldly Gift | Yes | Partial | **Forbidden Knowledge: MP reduction is 1 in code, rules say 2** |
| Alien Comprehension | Yes | Match (flavor) | -- |

### Subclass: Fey

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Fey Aspect | Yes | Match | -- |
| Dream Walker | **Missing** | Missing | Rules specify this flavor feature |

### Starting Equipment
- **Arsenal:** Rules say 2 Spell Focuses (or Weapons if Pact Weapon), code has 1 Weapon or Light Shield + 1 Spell Focus
- **Trade Tools:** Missing (Alchemist's Supplies, Disguise Kit, Jeweler's Tools, Sculptor's Tools — choose 2)

### Discrepancies
1. **CRITICAL:** Progression references 2 non-existent feature IDs
2. **Beseech Patron** flavor feature missing (code has `warlock_occult_knowledge` which doesn't exist)
3. Warlock Contract: levelGained mismatch (feature says 1, progression assigns at 2)
4. Pact Boon: "Cantrip" option should be "Spell" option
5. **Eldritch - Forbidden Knowledge: MP reduction 1 instead of 2**
6. **Fey subclass missing Dream Walker flavor feature**
7. Starting Equipment: Arsenal mismatch
8. Starting Equipment: Trade Tools missing

---

## Wizard

**Source:** Rules lines 10254-10358 vs `wizard_features.ts`, `wizard.progression.ts`

### Progression Table
All numeric values match the rules.

### Core Features

| Feature | Level | In Code | Status | Issues |
| ------- | ----- | ------- | ------ | ------ |
| Spell School Initiate | 1 | Yes (`wizard_spell_school_initiate`) | Match | -- |
| Arcane Sigil | 1 | Yes (`wizard_arcane_sigil`) | Match | -- |
| Ritual Caster | 1 | Yes (`wizard_ritual_caster`) | Partial | Code says "Learn 1 Ritual Spell per Wizard level", rules say "You learn 1 Ritual" + external sources |
| Prepared Spell | 2 | Yes (`wizard_prepared_spell`) | Match | -- |
| Talent (L2) | 2 | Missing | Missing | Progression doesn't reference a talent feature at L2 |

### Subclass: Portal Mage

| Feature | In Code | Status |
| ------- | ------- | ------ |
| Portal Magic | Yes | Match |
| Portal Sage | Yes | Match (flavor) |

### Subclass: Witch

| Feature | In Code | Status |
| ------- | ------- | ------ |
| Coven's Gift | Yes | Match |
| Hex Enhancements | Yes | Match |
| Curse Expert | Yes | Match (flavor) |

### Starting Equipment
- **Arsenal:** Rules say 2 Spell Focuses, code has 1 Weapon + 1 Spell Focus
- **Trade Tools:** Missing (Alchemist's Supplies, Calligrapher's Supplies, Glassblower's Tools, Herbalist's Supplies — choose 2)

### Discrepancies
1. Ritual Caster: Description doesn't fully match rules
2. Missing Talent feature reference at L2
3. Starting Equipment: Rules say 2 Spell Focuses, code has 1 Weapon + 1 Spell Focus
4. Starting Equipment: Trade Tools missing

---

## Spellblade

**Source:** Rules lines 9967-10135 vs `spellblade_features.ts`, `spellblade.progression.ts`

### Progression Table
- **CRITICAL:** References `spellblade_spellcasting_path` — does not exist
- **CRITICAL:** References `spellblade_martial_path` — does not exist

### Core Features

| Feature | Level | In Code | Status |
| ------- | ----- | ------- | ------ |
| Bound Weapon | 1 | Yes (`spellblade_bound_weapon`) | Match |
| Spellblade Disciplines | 1 | Yes (`spellblade_disciplines`) | Match |
| Sense Magic | 1 | Yes (`spellblade_sense_magic`) | Match (flavor) |
| Spellstrike | 2 | Yes (`spellblade_spellstrike`) | Match |

### Subclass: Paladin

| Feature | In Code | Status |
| ------- | ------- | ------ |
| Holy Warrior | Yes | Match |
| Oathsworn | Yes | Match (flavor) |

### Subclass: Rune Knight

| Feature | In Code | Status | Issues |
| ------- | ------- | ------ | ------ |
| Rune Weapon | Yes | Partial | Frost Rune: code says "Grappled by ice", rules say "Immobilized by ice for 1 Round"; Water Rune: code says "spend 1 AP", rules say automatic Physical Save on Smite |
| Rune Expert | Yes | Match (flavor) | -- |
| Rune Names | Yes | Match (flavor) | -- |

### Starting Equipment
- **Arsenal:** Rules say "Choose 3 of Spell Focus, Weapon, or Light Shield" (Heavy Shield if Warrior), code has different structure with separate ranged weapons
- **Trade Tools:** Missing (Blacksmith's Tools, Jeweler's Tools, Leatherworker's Tools, Tinkerer's Tools — choose 1)

### Discrepancies
1. **CRITICAL:** Progression references 2 non-existent feature IDs (`spellblade_spellcasting_path`, `spellblade_martial_path`)
2. Rune Knight Frost Rune: "Grappled" should be "Immobilized for 1 Round"
3. Rune Knight Water Rune: Should be automatic Physical Save on Smite, not optional "spend 1 AP"
4. Starting Equipment: Arsenal structure mismatch
5. Starting Equipment: Trade Tools missing

---

# PART 2: ANCESTRY VALIDATION

---

## Human
All 4 default traits and 4 expanded traits match perfectly. **No discrepancies.**

---

## Elf
All 4 default traits and 9 expanded traits present and correct except:

### Discrepancies
1. **Plant Knowledge**: Cost is 0 in code, rules say (1)

---

## Dwarf
All 4 default traits and 9 expanded traits present and correct except:

### Discrepancies
1. **Earthen Knowledge**: Cost is 0 in code, rules say (1)
2. **Earthen Knowledge**: Description says "underground", rules say "mountainous and subterranean environments"

---

## Halfling
All 6 default traits and 7 expanded traits present except:

### Discrepancies
1. **Halfling Bravery**: Code grants ADV vs "Rattled", rules say "Terrified"
2. **Burst of Bravery**: Code ends "Rattled" condition, rules say "Terrified"

---

## Gnome
All 6 default traits and 7 expanded traits match perfectly. **No discrepancies.**

---

## Orc
All 6 default traits and 6 expanded traits match perfectly. **No discrepancies.**

---

## Dragonborn
All 4 default traits and 10 expanded traits present and correct except:

### Discrepancies
1. **Second Breath**: Cost is 1 in code, rules say (2)

---

## Giantborn
All 5 default traits and 9 expanded traits match perfectly. **No discrepancies.**

---

## Angelborn
All 4 default traits and 8 expanded traits present and correct except:

### Discrepancies
1. **Healing Touch**: Code says "Failure: You only restore 2 HP", rules say "Failure: You only restore 1 HP"

---

## Fiendborn
All 4 default traits and 10 expanded traits match perfectly. Origins and Redeemed variant correct. **No discrepancies.**

---

## Beastborn

Beastborn has the most issues of any ancestry, with 5 missing traits and several mismatches.

### Missing Traits (5)
1. **Beastkind** (Cost: 0) — Should be a default/automatic trait
2. **Strong Jumper** (Cost: 1) — Jumping category
3. **Stealth Feathers** (Cost: 2) — Flying category, requires Limited Flight
4. **Shell Retreat** (Cost: 1) — Body category, requires Hard Shell
5. **Shoot Webs** (Cost: 2) — Miscellaneous category

### Effect Mismatches
6. **Tough**: Code grants +2 HP, rules say +1 HP
7. **Venomous Natural Weapon**: Code applies "Poisoned" condition, rules say "Impaired"
8. **Web Walk**: Cost is 0 in code, rules say (1); description missing creature-detection details

### Description/Prerequisite Issues
9. **Additional Limb**: Missing mention of Spell Focuses and Somatic Components
10. **Capable Limb**: Missing mention of Spell Focuses and Somatic Components
11. **Winged Arms**: Prerequisite says "requires Limited Flight", rules say "requires any Flying Beast Trait"

---

# PART 3: PRIORITIZED FIX PLAN

## P0 — Critical (Runtime Failures)

These issues will cause features to fail to resolve at runtime.

| # | Class | Issue | Fix |
| - | ----- | ----- | --- |
| 1 | Commander | Progression references `commander_call`, feature ID is `commander_commanders_call` | Fix progression ID |
| 2 | Monk | Progression references `monk_inner_peace` (L1) — does not exist | Fix progression ID or create feature |
| 3 | Monk | Progression references `monk_martial_arts` (L2) — does not exist | Fix progression ID or create feature |
| 4 | Sorcerer | Progression references 3 non-existent IDs (`sorcerer_spellcasting_path`, `sorcerer_magical_nature`, `sorcerer_magical_overflow`) | Fix progression IDs or create features |
| 5 | Warlock | Progression references 2 non-existent IDs (`warlock_spellcasting_path`, `warlock_occult_knowledge`) | Fix progression IDs or create features |
| 6 | Spellblade | Progression references 2 non-existent IDs (`spellblade_spellcasting_path`, `spellblade_martial_path`) | Fix progression IDs or create features |
| 7 | Druid | Progression references `druid_animal_whisperer` — should be `druid_wild_speech` | Fix progression ID |
| 8 | Hunter | Progression L1 missing `hunter_bestiary` | Add to classFeatures array |

## P1 — Incorrect Values (Wrong Behavior)

| # | System | Issue | Fix |
| - | ------ | ----- | --- |
| 9 | Sorcerer | All 4 subclass features have `levelGained: 1` instead of 3 | Change to `levelGained: 3` |
| 10 | Warlock | Eldritch Forbidden Knowledge MP reduction is 1, should be 2 | Change value to 2 |
| 11 | Warlock | Missing "Beseech Patron" flavor feature | Add feature |
| 12 | Warlock | Missing Fey "Dream Walker" flavor feature | Add feature |
| 13 | Warlock | Pact Boon says "Cantrip" option, should be "Spell" | Fix description |
| 14 | Halfling | Bravery + Burst of Bravery reference "Rattled" instead of "Terrified" | Fix condition names |
| 15 | Beastborn | Tough grants +2 HP, rules say +1 HP | Fix value |
| 16 | Beastborn | Venomous Natural Weapon applies "Poisoned", rules say "Impaired" | Fix condition |
| 17 | Dragonborn | Second Breath cost is 1, rules say 2 | Fix cost |
| 18 | Angelborn | Healing Touch failure restores 2 HP, rules say 1 HP | Fix value |
| 19 | Elf | Plant Knowledge cost is 0, rules say 1 | Fix cost |
| 20 | Dwarf | Earthen Knowledge cost is 0, rules say 1 | Fix cost |
| 21 | Beastborn | Web Walk cost is 0, rules say 1 | Fix cost |

## P2 — Missing Content

| # | System | Issue | Fix |
| - | ------ | ----- | --- |
| 22 | Beastborn | 5 missing traits (Beastkind, Strong Jumper, Stealth Feathers, Shell Retreat, Shoot Webs) | Add traits |
| 23 | All Classes | Starting Equipment: Arsenal count "2" should be "3" across all 13 classes | Fix counts |
| 24 | All Classes | Starting Equipment: Trade Tools missing from all 13 classes | Add trade tools |
| 25 | Commander | 4 subclass features missing `id` fields | Add IDs |
| 26 | Bard | 4 subclass features missing `id` fields | Add IDs |
| 27 | Cleric | 4 subclass features missing `id` fields | Add IDs |
| 28 | Barbarian | Elemental Fury missing Erupting Elements + Elemental Blast mechanics | Add effects |
| 29 | Hunter | Monster Slayer missing concoction limits/administration mechanics | Add effects |
| 30 | Hunter | Trapper missing trap creation/setting/recovery mechanics | Add effects |
| 31 | Cleric | Inquisitor missing "Chastise" mechanics; Priest missing "Hand of Salvation" | Add effects |

## P3 — Description Drift (Non-Breaking)

| # | System | Issue |
| - | ------ | ----- |
| 32 | Monk | Stance: "1 SP" vs rules "1 AP or 1 SP" |
| 33 | Monk | Spiritual Balance: Extra Ki replenishment text |
| 34 | Rogue | Debilitating Strike: "until start of next turn" vs "for 1 Round" |
| 35 | Rogue | Taunting Shot: "Once per turn" vs "Once per round" |
| 36 | Spellblade | Frost Rune: "Grappled" vs "Immobilized for 1 Round" |
| 37 | Spellblade | Water Rune: Optional AP spend vs automatic Save on Smite |
| 38 | Wizard | Ritual Caster: Description wording drift |
| 39 | Dwarf | Earthen Knowledge: "underground" vs "mountainous and subterranean" |
| 40 | Beastborn | Winged Arms prerequisite: "requires Limited Flight" vs "any Flying Beast Trait" |
| 41 | Beastborn | Additional Limb/Capable Limb: Missing spell focus/somatic details |
| 42 | Druid | Starting equipment: "non-metal" armor restriction not in rules |

---

## Statistics

- **P0 (Critical):** 8 issues across 6 classes
- **P1 (Incorrect Values):** 13 issues across 7 ancestries + 2 classes
- **P2 (Missing Content):** 10 issue categories across all classes + 1 ancestry
- **P3 (Description Drift):** 11 issues
- **Total:** 42 distinct fix items (some covering multiple files)
