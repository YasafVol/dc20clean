# DC20 v0.10 Rules Changes Summary

> This document summarizes all major changes from v0.9.5 to v0.10 for the DC20Clean character builder.

## Source Document

- **Authoritative Source**: `docs/assets/DC20 0.10 full.md`
- **Changelog Location**: Lines 9429-10280

---

## Major System Removals

### Techniques - REMOVED

- Techniques have been completely removed from the game
- Martials now only have Maneuvers
- Remove all `gainedTechniquesKnown` fields from progressions
- Remove Technique-related UI and data structures

### Cantrips - REMOVED

- Cantrips are no longer a classification
- All spells are just "Spells" now
- Remove all `gainedCantripsKnown` fields from progressions
- Spellcasters start with 4 Spells Known at level 1

### Sonic Damage - REMOVED

- Removed from the game entirely
- High-frequency attacks now either:
  - Force saves against Deafened, Dazed conditions
  - Deal Bludgeoning damage (force waves)
  - Deal True damage (internal damage)

---

## Class Table Changes

### HP Progressions

| Class Type                                                  | Level 1 | Per Level | Total at L10 |
| ----------------------------------------------------------- | ------- | --------- | ------------ |
| **Casters** (Wizard, Sorcerer, Cleric, Bard, Druid)         | +7      | +1        | 16           |
| **Martials** (Barbarian, Champion, Commander, Hunter, Monk) | +8      | +2        | 26           |
| **Hybrids** (Warlock, Spellblade, Rogue)                    | +8      | +2/+1 alt | 21           |

### Mana Points Progression (Spellcasters)

```
Old: 6, 0, 2, 0, 2, 2, 0, 2, 2, 0 (Total: 16)
New: 6, 0, 2, 0, 3, 0, 2, 0, 3, 2 (Total: 18)
```

### Stamina Points Progression (Martials)

```
Old: 1, 0, 1, 0, 0, 1, 0, 0, 1, 0 (Total: 4)
New: 2, 0, 1, 0, 0, 0, 1, 0, 1, 1 (Total: 6)
```

### Spellblade Mana Points

```
Old: 3, 0, 1, 0, 1, 1, 0, 1, 1, 0 (Total: 8)
New: 2, 0, 2, 0, 1, 0, 2, 0, 1, 1 (Total: 9)
```

### Spellblade Stamina Points

```
Old: 1, 0, 0, 0, 0, 1, 0, 0, 0, 0 (Total: 2)
New: 1, 0, 0, 0, 1, 0, 0, 0, 1, 0 (Total: 3)
```

### Path Progression

- Renamed from "+1 Path Point" to "Path Progression"
- **MOVED**: From levels 7 and 10 to levels **6 and 8**
- Path Progression now at: Levels 2, 4, 6, 8

---

## Maneuvers Changes

### Attack Maneuvers

- No longer a basic type that Martials get access to all of
- Replaced by **Martial Enhancements**
- Attack Maneuvers are now their own category with unique enhancements

### Maneuver Categories (v0.10)

1. **Attack** - Maneuvers that deal damage
2. **Defense** - Maneuvers that prevent or mitigate damage
3. **Grapple** - Maneuvers that control creatures using physical force
4. **Utility** - Maneuvers for mobility, combat potential, effects, or force of will (Taunting, Intimidation)

### Combo Maneuvers (NEW)

- Martials can now combo their Maneuvers similar to how Spellcasters combo Spells

---

## Spellcasting Changes

### Spell Schools (Restructured)

**New Schools:**

- Astromancy (time, space, gravity)
- Conjuration (creating physical material from nothing)
- Divination (creating information from nothing)
- Elemental (manipulating the elements)
- Enchantment (alteration of Mental - buff & debuff)
- Invocation (positive energy - life and spirit)
- Nullification (negative energy - destroy matter or spirit)
- Transmutation (alteration of Physical - change form, shape, or matter)

**Removed Schools:**

- Chronomancy → now part of Astromancy
- Destruction → spread across Elemental, Invocation, Nullification, Enchantment
- Restoration → now part of Invocation
- Illusion, Necromancy, Protection → now Spell Tags

### Spell Components

- All Spells have Verbal and Somatic Components unless stated otherwise
- Creatures that can hear you know you're casting a Spell (if Verbal)

### 51 New Spell Tags

- Added to help categorize spells by effect

---

## Class-Specific Changes

### Barbarian

- Rage: Can now Rage outside of Combat
- Rage damage: +1 on Martial Attacks with Unarmed Strikes or Melee Weapons
- Battlecry range: Dropped from 10 Spaces to 5 Spaces
- Berserker: Fast Movement now gives +1 Speed even in armor

### Bard

- Battle Ballad: Now grants d4 bonus to first Attack Check each turn (was +1 damage)

### Champion

- Maneuver Master: Learn 1 Maneuver (was 3), can reduce SP cost by 1 once per Round
- Technique Master: REMOVED
- Second Wind: Regain 2 SP (was 1 SP)

### Cleric

- Magic Domain: Gives access to Healing and Spirit Spell Tags (was Holy and Undeath)
- War Domain: Gain 1 Attack Maneuver (was all Martial Enhancements)

### Druid

- Wild Growth: Base Healing reduced from 2 HP to 1 HP
- Wild Form: Can't use Maneuvers in Wild Form
- Nature's Torrent: 3 Space Diameter Sphere (was 1 Space Radius)

### Hunter

- Hunter's Mark: Can spend 1 AP + 1 SP as Reaction to mark new target when marked target dies
- Hunter's Strike: Completely rewritten and reworked

### Monk

- Iron Palm: Unarmed Strikes gain Weapon Style and 2 Bludgeoning damage (no Impact Property)
- Step of the Wind: Benefits apply even in armor
- Ki Points: No longer immediately replenish outside of Combat

### Sorcerer

- Innate Power: Removed free 1 MP Spell Enhancement; now gain 1-point Focus Property
- Sorcerous Origins: Learn 2 Spells (was 1 Spell + 1 Cantrip)
- Overload Magic: Costs 1 AP + 1 MP (was 2 AP)

### Spellblade

- Smite: Damage reduced from 2 per SP to 1 per SP; grants Martial Enhancement (was Attack Maneuver)
- NEW: Somatic Weapon - Use Bound Weapon for Somatic Components

### Warlock

- Pact Weapon: Learn 2 Martial Enhancements (was all Martial Enhancements + 2 Save Maneuvers)
- Pact Armor: Gives 2 Defensive Maneuvers (was 3), now grants +1 AD
- Pact Cantrip: Reworked to new Pact Spell option

### Wizard

- Spell School Initiate: Grants 2 Spells from chosen School (was 1 Spell + 1 Cantrip)

---

## Combat & Resource Changes

### Stamina Points

- Now recovers at end of Combat and end of Short Rest
- No longer infinite outside of Combat

### Martial Checks (NEW)

- Used for mundane Utility Checks
- Same formula as Attack Checks and Spell Checks: d20 + Prime Modifier + Combat Mastery

### Area Attacks (NEW)

- New type alongside Melee Attack and Ranged Attack
- Used when making Attacks over an Area
- Most commonly made against target's Area Defense

---

## Conditions Changes

### Poisoned

- No longer a formal Condition
- Can still be referred to like other statuses (Cursed, Diseased, Flanked, Bloodied)

---

## Talents Changes

### General Talents

- NEW: Ancestry Increase Talent
- Attribute Talent: Now grants 2 Attribute Points (was 1)
- Skill Increase: Now grants 4 Skill Points (was 3 Skill or Trade Points)
- Martial Expansion: Grants Stamina Regen; no longer grants 1 Technique
- Spellcasting Expansion: Grants Focus Combat Training; gives 3 more Spells (was 1)

---

## Resting Changes

- No longer a limitation on Quick Rests per day
- Exhaustion rules rewritten for clarity

---

## Character Paths

- Completely redone
- **Martial Path**: Learn 1 Maneuver + gain 1 max SP
- **Spellcaster Path**: Learn 1 Spell + gain 3 max MP
- Spellcasters gain Spellcaster Stamina when choosing Martial Path for first time

---

## Files to Update

### Priority 1: Class Progressions

- [ ] `src/lib/rulesdata/classes-data/progressions/*.ts` - All class progressions

### Priority 2: Class Features

- [ ] `src/lib/rulesdata/classes-data/features/*.ts` - All class features

### Priority 3: Spells

- [ ] `src/lib/rulesdata/spells-data/spells/*.ts` - Update spell schools and tags

### Priority 4: Maneuvers

- [ ] `src/lib/rulesdata/martials/maneuvers.ts` - Update maneuver categories
- [ ] `src/lib/rulesdata/martials/techniques.ts` - DELETE or mark deprecated

### Priority 5: Core

- [ ] `src/lib/rulesdata/conditions/conditions.dats.ts` - Remove Poisoned as condition
- [ ] `src/lib/rulesdata/skills.ts` - Verify no changes needed
- [ ] `src/lib/rulesdata/trades.ts` - Verify no changes needed

---

> Last updated: Created during 010rules branch
> Based on: DC20 0.10 full.md changelog (lines 9429-10280)
