# DC20Clean – Equipage (Custom Equipment System)

> Purpose: Central reference for custom equipment creation, data models, validation rules, storage, and UI flows.
> Owns: Custom weapon, armor, shield, spell-focus, and reusable general-equipment schemas, point-buy validation, presets, builder workflows, and custom-equipment storage.
> Does not own: Character inventory rows, generic effect semantics, character-sheet equip state, or PDF export mapping.
> Authoritative source: `docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md`, equipment source metadata, and `src/lib/rulesdata/equipment/`.
> Related systems: [Effects](./EFFECT_SYSTEM.MD), [Calculation](./CALCULATION_SYSTEM.MD), [Character Sheet](./CHARACTER_SHEET.MD), [PDF Export](./PDF_EXPORT_SYSTEM.MD).
> Status: Active
> Last Updated: 2026-09-19

---

## 0. Rules Source & Version

- Rules version: `0.10.5`
- Runtime constant: `EQUIPMENT_RULES_VERSION`
- Source artifact: `docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md`
- Source sections:
  - Weapons: Weapon Properties / Creating Weapons, around lines 10565-10777
  - Spell Focuses: Spell Focus Properties / Creating Spell Focuses, around lines 10798-10868
  - Armor: Armor Properties / Creating Armor, around lines 10923-10935
  - Shields: Shield Properties / Creating Shields, around lines 10980-11015

Stored custom equipment exports include `rulesVersion`; legacy exports without it are
treated as `0.10`, while current saves are stamped `0.10.5`.
General equipment is an app-defined reusable inventory template, not a DC20 point-buy
rules category. It has no rules-source section and contributes no calculator effects.

---

## 1. Key Files & Roles

### Schemas (`src/lib/rulesdata/equipment/schemas/`)

- `baseEquipment.ts` — Shared types, validation interfaces, equipment categories, damage types, rules version/source metadata
- `weaponSchema.ts` — Weapon types, styles, properties, CustomWeapon interface
- `armorSchema.ts` — Armor types, properties, CustomArmor interface
- `shieldSchema.ts` — Shield types, properties, CustomShield interface
- `spellFocusSchema.ts` — Spell focus properties, CustomSpellFocus interface
- `generalEquipmentSchema.ts` — Name, description, and cost for non-mechanical reusable items

### Options/Data (`src/lib/rulesdata/equipment/options/`)

- `weaponOptions.ts` — Weapon styles, enhancements, properties, and 45 preset stat blocks covering 48 named standard weapons
- `armorOptions.ts` — Armor properties, 7 preset armors
- `shieldOptions.ts` — Shield properties, rules, 5 preset shields
- `spellFocusOptions.ts` — Spell focus properties, 13 preset spell focuses

### Validation (`src/lib/rulesdata/equipment/validation/`)

- `equipmentValidator.ts` — Point budget validation, requirements, exclusions, stacking limits

### Storage (`src/lib/rulesdata/equipment/storage/`)

- `equipmentStorage.ts` — localStorage CRUD, export/import JSON

Stored custom equipment keeps stable property IDs across the v0.10.5 update. Existing
`toss`, `thrown`, and `returning` selections are preserved on import/export; current
validation applies the v0.10.5 point costs and Returning prerequisite when edited.
Ranged custom weapons use a 1-point base budget, automatically include locked `ammo`,
and start with `two-handed` selected as a `-1` property. Keeping Two-Handed opens the
second positive property point; removing it leaves the ranged weapon with only its
1-point base budget.

### UI (`src/routes/custom-equipment/`)

- `CustomEquipment.tsx` — Main page, category selection, tabs
- `components/WeaponBuilder.tsx` — 4-step weapon creation wizard
- `components/ArmorBuilder.tsx` — 3-step armor creation wizard
- `components/ShieldBuilder.tsx` — 3-step shield creation wizard
- `components/SpellFocusBuilder.tsx` — 3-step spell focus creation wizard
- `components/GeneralEquipmentBuilder.tsx` — Single-page general equipment form
- `components/SavedEquipmentList.tsx` — View/filter/delete/export saved equipment

### Shared Builder UI (`src/components/equipment/`)

- `EquipmentBuildSheet.tsx` — Reusable accessible accordion shell for category builders;
  the category owns its steps, summaries, validation, choices, and record construction.
- The alternative custom-weapon flow is the first consumer. Armor, shield, spell-focus,
  and general-equipment builders have not yet migrated to this shell.

---

## 2. Data Shapes

### Base Equipment Interface

```typescript
interface BaseEquipment {
	id: string;
	name: string;
	description?: string;
	properties: string[]; // Array of property IDs
	pointsSpent: number;
	maxPoints: number;
	effects?: Effect[]; // Calculator effects applied when equipped/wielded
	createdAt: string;
	updatedAt: string;
}
```

Equipment properties now expose structured mechanical effects in addition to display text.
Newly saved custom equipment persists a canonical `effects` array. Older saved equipment
without `effects` is still supported: the calculator derives effects from stored item
fields and property IDs when the item is equipped from the character sheet inventory.

Character inventory rows include an explicit `isEquipped` flag. Only equipped/wielded
items contribute equipment effects; carried inventory does not affect calculations.
The standard character-sheet inventory includes all 13 preset spell focuses as the
`Spell Focus` item type. Their item selectors are alphabetical, and equipped presets
resolve their canonical property effects through the same bridge as custom focuses.
Rows linked to saved Equipage items keep `itemType: 'Custom'` for selector compatibility
and also store `customEquipmentCategory` (`weapon`, `armor`, `shield`, `spellFocus`, or
`general`) so the inventory can label them with their Equipage category.

On the alternative character sheet, Add Item opens a picker instead of inserting a
blank row. Its Custom items source exposes saved Equipage records with their stable
`customEquipmentId`, category, name, chosen quantity, and equipped state, plus a
freeform custom-item path for inventory records that are not Equipage-backed.

Alternative-sheet custom attack creation is character-local rather than Equipage-backed.
The attack stores a complete canonical `CustomWeapon` snapshot so its styles, damage,
properties, and rules detail survive character export/import and cloud sync without a
localStorage Equipage dependency. Creating that attack does not add an inventory row or
activate equipped-item effects.

### Equipment Categories (5)

| Category    | Points    | Description                                   |
| ----------- | --------- | --------------------------------------------- |
| Weapon      | 2         | Melee/ranged with styles and enhancements     |
| Armor       | 2         | Light/heavy with PD, AD, and damage reduction |
| Shield      | 2         | Light/heavy with defensive bonuses            |
| Spell Focus | 1 (2H: 2) | One/two-handed with spellcasting bonuses      |
| General     | None      | Name, description, and cost; no effects       |

---

## 3. Weapon System

### Weapon Types (2)

| Type   | Base Damage | Range | Inherent Properties |
| ------ | ----------- | ----- | ------------------- |
| Melee  | 1           | 1     | —                   |
| Ranged | 1           | 15/45 | Ammo, Two-Handed    |

### Weapon Styles (11)

Each style has a **Weapon Enhancement** costing 1 AP or 1 SP:

| Style    | Damage Type | Enhancement | Effect                                 |
| -------- | ----------- | ----------- | -------------------------------------- |
| Axe      | Slashing    | Bleed       | Target makes Physical Save or Bleeds   |
| Bow      | Piercing    | Slow        | Target makes Agility Save or Slowed    |
| Crossbow | Piercing    | Accuracy    | Add d4 to Attack Check                 |
| Fist     | B/P/S       | Grapple     | Target makes Physical Save or Grappled |
| Hammer   | Bludgeoning | Knockback   | Push target 1+ Spaces                  |
| Pick     | Piercing    | Hinder      | Target becomes Hindered                |
| Sling    | Bludgeoning | Hinder      | Target becomes Hindered                |
| Spear    | Piercing    | Slow        | Target becomes Slowed                  |
| Staff    | Bludgeoning | Trip        | Target falls Prone                     |
| Sword    | Slashing    | Accuracy    | Add d4 to Attack Check                 |
| Whip     | Slashing    | Pull        | Pull target 1+ Spaces                  |

The v0.10.5 Reskinning Weapons rule allows any style on either Melee or Ranged custom
weapons. The style table's Melee/Ranged grouping describes the default examples, not a
creation restriction. Both Equipage and the alternative-sheet composer expose all 11
styles after the weapon type is selected.

`WEAPON_ENHANCEMENT_RULE` stores the shared Weapon Training usage rule once beside
the style catalog. Character-sheet attack details resolve standard weapon names through
`PRESET_WEAPONS`, then render each resolved style's enhancement instead of maintaining
separate popup prose.

### Weapon Properties

| Property      | Cost | Type   | Effect                                    |
| ------------- | ---- | ------ | ----------------------------------------- |
| Concealable   | 1    | Melee  | ADV on first attack when drawn            |
| Guard         | 1    | Melee  | +1 PD while wielding                      |
| Heavy         | 2    | Both   | +1 damage (requires Two-Handed)           |
| Impact        | 1    | Both   | +1 damage on Heavy Hits                   |
| Multi-Faceted | 1    | Both   | Gain second weapon style                  |
| Reach         | 1    | Melee  | +1 Space melee range                      |
| Returning     | 1    | Melee  | Returns on miss (requires Toss or Thrown) |
| Silent        | 1    | Both   | Stay hidden when attacking                |
| Toss          | 1    | Melee  | Throw range 5/10                          |
| Thrown        | 2    | Melee  | Throw range 10/20                         |
| Two-Handed    | -1   | Both   | Requires 2 hands                          |
| Unwieldy      | -1   | Both   | DisADV within 1 Space                     |
| Versatile     | 1    | Melee  | +2 to Hit with 2 hands                    |
| Deft          | 1    | Ranged | No DisADV when Prone                      |
| Long-Ranged   | 1    | Ranged | Range increases to 30/90                  |
| Reload        | -1   | Ranged | +1 damage, requires reload action         |
| Cumbersome    | -1   | Ranged | 1 AP to draw/stow                         |

Ranged custom weapons start from a 1-point base budget and automatically include Ammo
and Two-Handed. Ammo is locked. Two-Handed can be removed, but because it is the `-1`
property that grants the second positive property point, removing it leaves only the
1-point base budget.

Weapon property availability is represented with explicit applicability arrays
(`weaponTypes`) instead of relying only on negative flags. Guard is now a structured
equipment effect: equipped/wielded weapons with Guard add `MODIFY_STAT pd +1` to the
calculator.

The standard inventory weapon list is derived from `PRESET_WEAPONS`; it is not maintained
as a second rules table. Grouped stat blocks such as Sickle / Hand Axe / Throwing Star
are expanded into individual selectable names. The adapter converts canonical style and
property IDs into the character sheet's display shape and synthesizes ranged `Range`
facts. Compatibility-only `Special`, `Chained`, and `Capture` type values remain readable
for old saved data, but Bolas and Net are not selectable current weapons.

The alternative character sheet's add-weapon picker consumes this same expanded catalog.
Its Inventory source filters the catalog by standard weapon names in character inventory;
Full list exposes the entire alphabetical catalog. `Create custom weapon` is a separate
action beside that source switch. It opens the five-panel build sheet and embeds the
resulting character-local snapshot in `AttackData`. Saved Equipage weapons are not
silently linked or copied into attacks.

### Preset Weapons (45 stat blocks / 48 names)

Organized by category:

- **One-Handed Melee**: 12 stat blocks / 14 names
- **Versatile**: 10 stat blocks / 11 names
- **Two-Handed Melee**: 11 stat blocks / 11 names
- **One-Handed Ranged**: 3 stat blocks / 3 names
- **Two-Handed Ranged**: 9 stat blocks / 9 names

---

## 4. Armor System

### Armor Types (2)

| Type  | Don/Doff   | Metal | Special                                                      |
| ----- | ---------- | ----- | ------------------------------------------------------------ |
| Light | 1 minute   | No    | No penalties                                                 |
| Heavy | 10 minutes | Yes   | Speed -1, DisADV on Agility, +1 damage on Unarmed Heavy Hits |

### Armor Properties

| Property    | Cost | Type  | Effect                     |
| ----------- | ---- | ----- | -------------------------- |
| PD Increase | 1    | Both  | +1 PD (can take 2x)        |
| AD Increase | 1    | Both  | +1 AD (can take 2x)        |
| PDR         | 2    | Heavy | Physical Damage Reduction  |
| EDR         | 2    | Both  | Elemental Damage Reduction |
| Bulky       | -1   | Heavy | Speed -1                   |
| Rigid       | -1   | Heavy | DisADV on Agility Checks   |

Armor property availability is represented with explicit `armorTypes` arrays. Equipped
armor contributes PD, AD, Speed penalties, PDR/EDR as resistances, Agility disadvantage
as a granted ability, and Heavy Armor's unarmed Heavy Hit special as a granted ability.

### Preset Armor (7)

| Name                   | Type  | PD  | AD  | PDR  |
| ---------------------- | ----- | --- | --- | ---- |
| Light Defensive        | Light | 1   | 1   | —    |
| Light Deflecting       | Light | 2   | 0   | —    |
| Light Fortified        | Light | 0   | 2   | —    |
| Heavy Defensive        | Heavy | 1   | 1   | Half |
| Heavy Deflecting       | Heavy | 2   | 0   | Half |
| Heavy Fortified        | Heavy | 0   | 2   | Half |
| Heavy Highly Defensive | Heavy | 2   | 2   | —    |

---

## 5. Shield System

### Shield Types (2)

| Type  | Description                         |
| ----- | ----------------------------------- |
| Light | Simple, no penalties (Buckler)      |
| Heavy | Designed for warfare (Tower Shield) |

### Shield Rules

- **Equip/Stow**: 1 AP
- **Attack**: 1 Bludgeoning damage (if trained)
- **Dual Wielding**: Only benefit from one shield at a time (Minor Action to switch), immune to Flanking

### Shield Properties

| Property    | Cost | Type  | Effect                            |
| ----------- | ---- | ----- | --------------------------------- |
| PD Increase | 1    | Both  | +1 PD (Heavy: can take 2x)        |
| AD Increase | 1    | Both  | +1 AD (Heavy: can take 2x)        |
| Grasp       | 1    | Light | Free hand for grappling/reloading |
| Toss        | 1    | Light | Throw range 5/10                  |
| Mounted     | 1    | Heavy | PD/AD also apply to mount         |
| PDR         | 2    | Heavy | Physical Damage Reduction         |
| EDR         | 2    | Heavy | Elemental Damage Reduction        |
| Bulky       | -1   | Heavy | Speed -1                          |
| Rigid       | -1   | Heavy | DisADV on Agility Checks          |

Shield property availability is represented with explicit `shieldTypes` arrays.
Equipped shields contribute structured effects for PD, AD, Speed penalties, PDR/EDR
as resistances, and descriptive granted abilities such as Grasp, Toss, Mounted, and
Rigid.

### Preset Shields (5)

| Name          | Type  | PD  | AD  | Properties |
| ------------- | ----- | --- | --- | ---------- |
| Buckler       | Light | 1   | 0   | Grasp      |
| Round Shield  | Light | 0   | 1   | Toss       |
| Heater Shield | Light | 1   | 1   | —          |
| Kite Shield   | Heavy | 1   | 2   | Mounted    |
| Tower Shield  | Heavy | 2   | 2   | —          |

---

## 6. Spell Focus System

### Hand Requirements

| Type       | Base Points | Effective Points        |
| ---------- | ----------- | ----------------------- |
| One-Handed | 1           | 1                       |
| Two-Handed | 1           | 2 (Two-Handed costs -1) |

### Spell Focus Properties

| Property       | Cost | Effect                                     |
| -------------- | ---- | ------------------------------------------ |
| Channeling     | 1    | +1 to Spell Checks                         |
| Close Quarters | 1    | No DisADV on Ranged Spell Attacks in melee |
| Long-Ranged    | 1    | +5 Spaces range (range > 1 spells)         |
| Muffled        | 1    | Verbal Components heard within 5 Spaces    |
| Powerful       | 2    | +1 Spell Attack damage                     |
| Protective     | 1    | +1 AD                                      |
| Reach          | 1    | +1 Space range (range 1 spells)            |
| Reactive       | 1    | ADV on Spell Duel checks as Challenger     |
| Two-Handed     | -1   | Requires 2 hands                           |
| Vicious        | 1    | +1 to hit with Spell Attacks               |
| Warded         | 1    | MDR (Mystical Damage Reduction)            |

Spell focus properties now expose structured effects. Protective contributes `AD +1`
when equipped, Warded contributes binary MDR (Mystical Damage Reduction), and
spell-specific bonuses such as Channeling, Vicious, Powerful, Reach, Long-Ranged,
Muffled, Reactive, and Close Quarters are surfaced as granted abilities until the
calculator has separate spell-attack/spell-check/range output fields.

### Spell Focus Effect TODO

Apply as many spell focus properties as possible as real equipped effects instead of
plain ability notes:

- `Vicious` should calculate on the character sheet when the focus is equipped,
  contributing to spell attack/to-hit output rather than only appearing as text.
- `Channeling` should calculate on the character sheet when the focus is equipped,
  contributing to spell check output once that output is separated from general
  attack/spell check.
- `Powerful` should be indicated when viewing spells and spell attacks, because it
  changes Spell Attack damage by `+1`.
- `Reach` should be indicated when viewing spells with Range `1`, because their range
  increases by `1 Space`.
- `Long-Ranged` should be indicated when viewing spells with Range greater than `1`,
  because their range increases by `5 Spaces`.
- Keep `Close Quarters`, `Muffled`, and `Reactive` visible as equipped focus effects;
  promote them from generic ability notes if the sheet gains richer spell-context UI.

### Preset Spell Focuses (13)

**One-Handed (9)**:

- Orb (Channeling)
- Ceremonial Dagger (Close Quarters)
- Crystal (Vicious)
- Totem (Protective)
- Holy Medallion (Warded)
- Wand (Long-Ranged)
- Rod (Reach)
- Poppet (Muffled)
- Ritual Bell (Reactive)

**Two-Handed (4)**:

- Mage Staff (Powerful)
- Grimoire (Channeling, Vicious)
- Censer (Protective, Warded)
- Magical Instrument (Long-Ranged, Reactive)

---

## 7. General Equipment

General equipment stores reusable non-mechanical inventory templates such as tools,
supplies, treasures, and campaign-specific objects. Name is required; description and
cost are optional. These records use empty property and effect arrays, do not enter the
point-buy validator, and never change calculated character values when marked equipped.

The character sheet stores the stable Equipage ID and `general` category on inventory
rows. Both the primary selector and alternative inventory picker preserve the saved cost
and expose the saved description.

---

## 8. Validation Rules

### Point Budget

- Each equipment type has a maximum point budget
- Properties have costs that add to (positive) or subtract from (negative) the total
- Cannot exceed max points

### Property Requirements

```typescript
// Example: Heavy property requires Two-Handed
{
	id: 'heavy',
	cost: 2,
	requires: ['two-handed']
}
```

Some properties require one of several enablers instead of a single fixed property:

```typescript
// Example: Returning requires Toss or Thrown
{
	id: 'returning',
	cost: 1,
	requiresOneOf: ['toss', 'thrown']
}
```

Multi-Faceted is invalid until a different secondary style is chosen.

### Property Exclusions

```typescript
// Example: Two-Handed and Versatile are mutually exclusive
{
	id: 'two-handed',
	cost: -1,
	excludes: ['versatile']
}
```

### Stacking Limits

```typescript
// Example: PD Increase can be taken twice on heavy armor
{
	id: 'pd-increase-heavy',
	cost: 1,
	maxStacks: 2
}
```

---

## 9. Storage

### localStorage Key

`customEquipment`

### Data Structure

```typescript
interface StoredEquipmentData {
	version: number;
	rulesVersion: string;
	weapons: CustomWeapon[];
	armor: CustomArmor[];
	shields: CustomShield[];
	spellFocuses: CustomSpellFocus[];
	generalEquipment: CustomGeneralEquipment[];
}
```

The envelope is version 2. Loading or importing a version-1 payload treats a missing
`generalEquipment` array as empty. New exports always include the array.

### API Functions

```typescript
// CRUD
getAllCustomWeapons(): CustomWeapon[]
saveCustomWeapon(weapon: CustomWeapon): void
deleteCustomWeapon(id: string): void

// Same pattern for armor, shields, spellFocuses, and generalEquipment

// Export/Import
exportEquipmentToJson(): string
importEquipmentFromJson(json: string): { success: boolean; error?: string }
```

---

## 10. UI Flow

### Main Page (`/custom-equipment`)

1. **Create New** tab — Select equipment category
2. **Saved Equipment** tab — View/manage saved items

### Builder Flow (Example: Weapon)

1. **Step 1**: Choose Type (Melee/Ranged) or load preset
2. **Step 2**: Choose Style (determines enhancement)
3. **Step 3**: Choose Properties (point budget tracked)
4. **Step 4**: Review & Save (name, final stats preview)

### Alternative-Sheet Custom Weapon Flow

The attack picker exposes custom creation as a separate action rather than a third
catalog source. It opens a responsive accordion build sheet instead of embedding the
Equipage page UI:

1. **Stage 1:** Choose Melee or Ranged type.
2. **Stage 2:** Choose any weapon style.
3. **Stage 2.5:** Confirm the style's default physical damage type or choose another.
4. **Stage 3:** Choose properties within the point budget; ranged weapons identify Ammo and
   Two-Handed as automatic, and removing Two-Handed consumes one point. Multi-Faceted
   requires a different second style and damage type.
5. **Stage 4:** Name and review the complete weapon.

Completed sections remain reopenable without losing selections. The live attack preview
uses the same `WeaponAttackDetails` presentation as catalog weapons. On compact layouts,
the build sheet and preview stack vertically. Cancelling returns to the picker with its
source, search, and filter unchanged. Confirmation adds one attack with an embedded
canonical weapon snapshot. It does not save an Equipage record or create/equip an
inventory row.

The active section displays its contextual guidance beside the section heading; inactive
sections show only their selection summary. Choice descriptions use normal body-text
contrast and line spacing rather than muted metadata styling.

### Saved Equipment List

- Filter by category (All, Weapons, Armor, Shields, Spell Focuses, General)
- Delete individual items
- Export all to JSON
- Import from JSON file
- Duplicate any saved item as an independent `Copy`; the source remains unchanged and
  the duplicate receives a new ID and timestamps.
- Edit any saved item in its category builder. Saving preserves the stable item ID and
  creation timestamp while refreshing its mechanical effects and update timestamp.

### Preset Search

The four rules-backed builders expose client-side preset search on the first step. Search matches
all entered tokens across preset names, equipment type, properties, and weapon styles.
Weapon search replaces the former 12-item truncation, so every preset is selectable
without a separate modal.

---

## 11. Future Enhancements

- [x] Integration with character-sheet inventory
- [x] Edit existing saved equipment
- [x] Duplicate/clone functionality
- [x] Search/filter presets
- [ ] Mobile-optimized layout
- [ ] Share equipment via URL/code

---

## 12. Related Systems

- **Character Sheet** — `docs/systems/CHARACTER_SHEET.MD`
- **Calculation System** — `docs/systems/CALCULATION_SYSTEM.MD`
- **Class System** — `docs/systems/CLASS_SYSTEM.MD` (combat training determines equipment eligibility)
