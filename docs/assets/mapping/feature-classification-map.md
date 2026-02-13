# Feature Classification & UI Coverage Map

Last updated: 2026-02-06

## Classification Dimensions

Each feature/trait is classified along two axes:

1. **Type**: Crunch (numbers/mechanics) vs Fluff (story/narrative)
2. **Scope**: Sheet (passive, on character page) vs In-Game (active, during play)

## UI Surface Coverage

Three layers determine whether a feature is "covered":

1. **Calculator** — Does the effect type get processed into a stat?
2. **Character Sheet** — Is the feature/result displayed on the sheet?
3. **Character Creation** — Is the feature shown during creation?

---

## Calculator Processing Status

### Fully Processed (change stats)

| Effect Type | What It Does | Status |
| ----------- | ------------ | ------ |
| `MODIFY_STAT` | +/- to any stat (HP, PD, AD, Speed, etc.) | Processed with conditional support |
| `MODIFY_ATTRIBUTE` | +/- to Might/Agility/Charisma/Intelligence | Processed with conditional support |
| `GRANT_MOVEMENT` | Adds swim/climb/fly/burrow/glide speeds | Processed into `movements[]` array |
| `GRANT_SPELL` / `GRANT_CANTRIP` | Adds spell slots with restrictions | Processed into `spellsKnownSlots[]` |
| `GRANT_MANEUVERS` | Adds to maneuver known budget | Processed into `totalManeuversKnown` |
| `INCREASE_SKILL_MASTERY_CAP` | Raises skill mastery cap | Processed for validation |
| `INCREASE_TRADE_MASTERY_CAP` | Raises trade mastery cap | Processed for validation |

### Collected But Not Applied

| Effect Type | What It Does | Status |
| ----------- | ------------ | ------ |
| `GRANT_ABILITY` | Names a special ability | Collected into `grantedAbilities[]`, display only |
| `GRANT_ADV_ON_SAVE` | ADV on a save type | Collected into `conditionalModifiers[]`, NOT applied to save rolls |
| `GRANT_ADV_ON_CHECK` | ADV on a check type | Collected into `conditionalModifiers[]`, NOT applied to check rolls |

### NOT Processed (hardcoded empty arrays)

| Effect Type | What It Does | Status |
| ----------- | ------------ | ------ |
| `GRANT_RESISTANCE` | Resistance to damage type | **Empty** — `resistances: []` hardcoded |
| `GRANT_VULNERABILITY` | Vulnerability to damage type | **Empty** — `vulnerabilities: []` hardcoded |
| `GRANT_SENSE` | Darkvision, tremorsense, etc. | **Empty** — `senses: []` hardcoded |
| `GRANT_COMBAT_TRAINING` | Weapon/armor proficiency | **Empty** — `combatTraining: []` hardcoded |
| `SET_VALUE` | Sets a stat to exact value | Not processed |

### Separate System

| Effect Type | Status |
| ----------- | ------ |
| `GRANT_CONDITION_IMMUNITY` | Processed in `conditionAggregator.ts`, not main calculator |
| `GRANT_CONDITION_RESISTANCE` | Processed in `conditionAggregator.ts`, not main calculator |
| `GRANT_CONDITION_VULNERABILITY` | Processed in `conditionAggregator.ts`, not main calculator |

---

## Character Sheet Coverage

### What IS Displayed

| UI Component | Data Shown | Coverage |
| ------------ | ---------- | -------- |
| `Features.tsx` | Feature names, descriptions, source attribution | Names/descriptions only |
| `FeaturePopup.tsx` | Full feature description on click | Text only, no effect breakdown |
| `Attributes.tsx` | Might/Agility/Charisma/Intelligence with tooltips | Tooltips show effect contributions |
| `Combat.tsx` | Attack Check, Save DC, Initiative, Martial Check with tooltips | Tooltips show effect contributions |
| `Defenses.tsx` | PD, AD, PDR | Values shown, tooltip breakdowns |
| `Resources.tsx` | HP, SP, MP, Rest Points, Grit Points with tooltips | Tooltips show effect contributions |
| `Movement.tsx` | Ground Speed, Jump Distance with tooltips | Tooltips show effect contributions |
| `Spells.tsx` | Spell names, schools, costs, descriptions, enhancements | Full spell display |
| `Maneuvers.tsx` | Maneuver names, types, costs, descriptions | Full maneuver display |
| `Combat.tsx` | Action Points tracker, Rage toggle | Single active ability toggle |

### What is NOT Displayed

| Missing UI | Data Available? | Impact |
| ---------- | --------------- | ------ |
| **Senses panel** (Darkvision, Tremorsense, Blindsight) | `senses: []` hardcoded empty | Senses from traits NEVER shown |
| **Alternative movement speeds** (Swim, Climb, Fly, Burrow, Glide) | `movements[]` populated by calculator | Data exists but no UI renders it |
| **Resistances/Vulnerabilities panel** | `resistances: []` hardcoded empty | Damage resistances from traits NEVER shown |
| **Combat Training** (proficiencies) | `combatTraining: []` hardcoded empty | Training from class/traits NEVER shown |
| **Active abilities panel** | Feature descriptions contain ability details | No activation UI beyond Rage toggle |
| **Condition interactions** | `Conditions.tsx` exists but returns empty | Condition immunities/resistances not shown |
| **Feature effects breakdown** | Effects exist in data | Only shown via stat tooltips, no dedicated panel |

---

## Character Creation Coverage

### What IS Shown During Creation

| Creation Stage | What's Displayed |
| -------------- | ---------------- |
| Class Selection | Class name, description, quote |
| Class Features | Feature names, descriptions, benefits, choices |
| Subclass Selection | Subclass name, description, feature names/descriptions/benefits/choices |
| Ancestry Selection | Ancestry name, description |
| Trait Selection | Trait names, costs, descriptions, prerequisites |
| Trait Choices | Choice prompts, options (attributes/skills/trades), attribute effect preview |
| Leveling Choices | Talent names/descriptions, path progression benefits |

### What is NOT Shown During Creation

| Missing | Impact |
| ------- | ------ |
| Feature effects (`feature.effects[]`) | User can't see mechanical impact of features before selecting |
| Trait effects (`trait.effects[]`) | User can't see mechanical impact of traits (except cost and user choices) |
| Effect preview/delta | No "if you pick this, your PD goes from 12 to 13" preview |
| Progression table | No class table showing HP/SP/MP/features by level |

---

## Feature-by-Feature Coverage Matrix

### Legend

- **Calc**: Calculator processes the effects (C = Crunch applied, -- = not processed)
- **Sheet**: Character sheet displays the feature/result (Name = name only, Stat = stat reflects it, Full = dedicated display, -- = not shown)
- **Create**: Character creation shows the feature (Desc = description shown, Choice = choice UI, -- = not shown)

### Class Features — Crunch/Sheet (Passive Stat Modifiers)

These should appear as calculated stats on the character sheet.

| Feature | Class | Effect Type | Calc | Sheet | Create |
| ------- | ----- | ----------- | ---- | ----- | ------ |
| Combat Training (Weapons/Armor/Shields) | All | `GRANT_COMBAT_TRAINING` | -- | -- | Desc |
| +1 Speed (Fast Movement) | Barbarian | `MODIFY_STAT` target:moveSpeed | C | Stat | Desc |
| +2 AD (Berserker Defense) | Barbarian | `MODIFY_STAT` target:ad, cond | C | Stat | Desc |
| -5 PD (Rage) | Barbarian | `MODIFY_STAT` target:pd, cond | C | Stat | Desc |
| Resistance (Half) Elemental/Physical (Rage) | Barbarian | `GRANT_RESISTANCE` | -- | -- | Desc |
| +1 MP Max (Innate Power) | Sorcerer | `MODIFY_STAT` target:mpMax | C | Stat | Desc |
| Patient Defense +2 PD | Monk | `MODIFY_STAT` target:pd, cond | C | Stat | Desc |
| +1 Speed (Step of Wind) | Monk | `MODIFY_STAT` target:moveSpeed | C | Stat | Desc |
| +1 Skill Mastery Cap | Rogue | `INCREASE_SKILL_MASTERY_CAP` | C | -- | Desc |
| +1 Skill Point (Multi-Skilled) | Rogue | `MODIFY_STAT` target:skillPoints | C | Stat | Desc |
| Cheap Shot +1 damage | Rogue | `MODIFY_STAT` cond | C | Stat | Desc |

**Gap pattern**: `GRANT_COMBAT_TRAINING` and `GRANT_RESISTANCE` effects are defined in feature data but never reach the UI.

### Class Features — Crunch/In-Game (Active Abilities)

These need activation UI on the character sheet or in a combat interface.

| Feature | Class | Has Activation UI? | Sheet Coverage |
| ------- | ----- | ------------------- | -------------- |
| Rage (1 AP + 1 SP) | Barbarian | YES (toggle) | Rage toggle in Combat |
| Battlecry (1 AP + 1 SP) | Barbarian | NO | Name/description only |
| Adaptive Tactics (Tactical Die) | Champion | NO | Name/description only |
| Second Wind (once per combat) | Champion | NO | Name/description only |
| Commander's Call (1 AP + 1 SP) | Commander | NO | Name/description only |
| Commanding Aura abilities | Commander | NO | Name/description only |
| Hunter's Mark (1 AP + 1 SP) | Hunter | NO | Name/description only |
| Hunter's Strike (1 SP) | Hunter | NO | Name/description only |
| Monk Stance (swap for 1 SP) | Monk | NO | Name/description only |
| Ki Actions (Deflect, Slow Fall, Uncanny Dodge) | Monk | NO | Name/description only |
| Debilitating Strike (1 SP) | Rogue | NO | Name/description only |
| Bardic Performance (1 AP + 1 MP) | Bard | NO | Name/description only |
| Divine Blessing (1 AP + MP) | Cleric | NO | Name/description only |
| Channel Divinity (once per Short Rest) | Cleric | NO | Name/description only |
| Druid Domain (1 AP + 1 MP) | Druid | NO | Name/description only |
| Wild Form (1 AP + 1 MP) | Druid | NO | Name/description only |
| Overload Magic (1 AP) | Sorcerer | NO | Name/description only |
| Meta Magic (1 MP per use) | Sorcerer | NO | Name/description only |
| Warlock Contract (HP spend) | Warlock | NO | Name/description only |
| Life Tap (once per Long Rest) | Warlock | NO | Name/description only |
| Arcane Sigil (1 AP + 1 MP) | Wizard | NO | Name/description only |
| Smite (SP on attack) | Spellblade | NO | Name/description only |
| Spellstrike (once per turn) | Spellblade | NO | Name/description only |

**Coverage: 1 out of 23+ active abilities has activation UI** (Rage toggle only).

### Class Features — Fluff (Story/Narrative)

| Feature | Class | Sheet Coverage | Create Coverage |
| ------- | ----- | -------------- | --------------- |
| Shattering Force | Barbarian | Name + description | Description |
| Know Your Enemy | Champion | Name + description | Description |
| Natural Leader | Commander | Name + description | Description |
| Bestiary | Hunter | Name + description | Description |
| Meditation | Monk | Name + description | Description |
| Cypher Speech | Rogue | Name + description | Description |
| Crowd Pleaser | Bard | Name + description | Description |
| Divine Omen | Cleric | Name + description | Description |
| Wild Speech | Druid | Name + description | Description |
| Sorcery | Sorcerer | Name + description | Description |
| Sense Magic | Spellblade | Name + description | Description |
| Ritual Caster | Wizard | Name + description | Description |

**Coverage: Adequate** — Fluff features only need name + description display.

### Ancestry Traits — Crunch/Sheet (Passive Modifiers)

| Trait Type | Effect Type | Calc | Sheet | Create |
| ---------- | ----------- | ---- | ----- | ------ |
| +HP traits (Tough) | `MODIFY_STAT` target:hpMax | C | Stat | Desc+Cost |
| +PD/+AD traits | `MODIFY_STAT` target:pd/ad | C | Stat | Desc+Cost |
| +Speed traits | `MODIFY_STAT` target:moveSpeed | C | Stat | Desc+Cost |
| +MP traits (Mana Increase) | `MODIFY_STAT` target:mpMax | C | Stat | Desc+Cost |
| Attribute +/- | `MODIFY_ATTRIBUTE` | C | Stat | Desc+Cost+Choice |
| Skill/Trade Expertise | `INCREASE_SKILL_MASTERY_CAP` | C | -- | Desc+Cost+Choice |
| Darkvision | `GRANT_SENSE` | -- | -- | Desc+Cost |
| Tremorsense | `GRANT_SENSE` | -- | -- | Desc+Cost |
| Climb/Swim/Fly/Burrow Speed | `GRANT_MOVEMENT` | C* | -- | Desc+Cost |
| Damage Resistance (Half) | `GRANT_RESISTANCE` | -- | -- | Desc+Cost |
| Damage Vulnerability | `GRANT_VULNERABILITY` | -- | -- | Desc+Cost |
| Combat Training | `GRANT_COMBAT_TRAINING` | -- | -- | Desc+Cost |
| ADV on Saves | `GRANT_ADV_ON_SAVE` | -- | -- | Desc+Cost |
| ADV on Checks | `GRANT_ADV_ON_CHECK` | -- | -- | Desc+Cost |
| Condition Immunity | `GRANT_CONDITION_IMMUNITY` | Agg | -- | Desc+Cost |

*`GRANT_MOVEMENT` is processed into `movements[]` array but the sheet doesn't display alternative movement speeds.

**Gap pattern**: Many Crunch/Sheet traits have effects that are DEFINED in data but NEVER reach the user:
- Resistances/Vulnerabilities: Not collected or displayed
- Senses: Not collected or displayed
- Combat Training: Not collected or displayed
- Alternative Movements: Collected but not displayed
- ADV effects: Collected but not applied or meaningfully displayed

### Ancestry Traits — Crunch/In-Game (Active Abilities)

| Trait | Ancestry | Has Activation UI? |
| ----- | -------- | ------------------- |
| Orc Rush (1 AP, once per combat) | Orc | NO |
| Draconic Breath Weapon (2 AP, once per Long Rest) | Dragonborn | NO |
| Healing Touch (1 AP, once per combat) | Angelborn | NO |
| Intimidating Shout (1 AP, once per combat) | Orc, Beastborn | NO |
| Echolocation (1 AP) | Beastborn | NO |
| Charming Gaze (1 AP, once per Long Rest) | Fiendborn | NO |

**Coverage: 0 out of ~40 active ancestry traits have activation UI.**

---

## Coverage Gaps Summary

### GAP 1: Empty Calculator Arrays (Critical)

Four effect types produce empty arrays despite being used in ~60+ features/traits:

| Effect Type | Features Using It | Calculator Output |
| ----------- | ----------------- | ----------------- |
| `GRANT_RESISTANCE` | ~30 traits + class features | `resistances: []` |
| `GRANT_VULNERABILITY` | ~10 traits | `vulnerabilities: []` |
| `GRANT_SENSE` | ~15 traits | `senses: []` |
| `GRANT_COMBAT_TRAINING` | All 13 class martial paths + ~5 traits | `combatTraining: []` |

**Impact**: These effects exist in data, are referenced in rules, but are invisible to users.

### GAP 2: No Alternative Movement Display

- Calculator correctly populates `movements[]` with swim/climb/fly/burrow/glide speeds
- `Movement.tsx` only renders ground speed and jump distance
- Traits like Climb Speed, Swim Speed, Glide Speed are invisible on the sheet

### GAP 3: No Active Ability Panels

- 23+ class active abilities and ~40 ancestry active abilities have no activation UI
- Only Rage has a toggle
- All others are "read the description and track manually"

### GAP 4: No Effect Preview in Creation

- During character creation, users see feature/trait names and descriptions
- They do NOT see mechanical effects or stat deltas
- No "selecting this will change your PD from 12 to 13" preview

### GAP 5: No Conditions Display

- `Conditions.tsx` component exists but returns empty
- Condition immunities/resistances from traits (e.g., Halfling Bravery ADV vs Frightened) not shown

### GAP 6: No Senses Display

- No UI component renders senses (Darkvision, Tremorsense, Blindsight)
- These are common traits across Dragonborn, Fiendborn, Dwarf, Beastborn, Shadowborn, etc.

---

## Priority Fix Recommendations

### P0 — Calculator Must Collect (enables all downstream display)

1. Populate `resistances[]` by collecting `GRANT_RESISTANCE` effects
2. Populate `vulnerabilities[]` by collecting `GRANT_VULNERABILITY` effects
3. Populate `senses[]` by collecting `GRANT_SENSE` effects
4. Populate `combatTraining[]` by collecting `GRANT_COMBAT_TRAINING` effects

### P1 — Sheet Must Display (data exists or will exist after P0)

5. Add Alternative Movements panel (Swim, Climb, Fly, Burrow, Glide) — data already in `movements[]`
6. Add Senses panel (Darkvision range, Tremorsense range, etc.) — needs P0.3
7. Add Resistances/Vulnerabilities panel — needs P0.1-2
8. Add Combat Training display (what weapons/armor/shields you're trained in) — needs P0.4
9. Fix Conditions component to display condition interactions from `conditionAggregator`

### P2 — Active Ability Surface

10. Add ability activation cards/panel for In-Game features (Battlecry, Stances, Commands, etc.)
11. Extend Rage toggle pattern to other activatable features

### P3 — Creation UX

12. Add effect preview in character creation (show stat delta when hovering/selecting features)
13. Add progression table display during class selection
