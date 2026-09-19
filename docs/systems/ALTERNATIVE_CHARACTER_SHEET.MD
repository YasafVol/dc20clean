# DC20Clean — Alternative Character Sheet Presentation

> Purpose: Presentation contract for the alternative character sheet at `/character2/:id`.
> Owns: Alternative-only composition, section disclosures, tab presentation, responsive layout, and alternative-only interaction choices.
> Does not own: Character state, calculations, persistence, campaign authorization, shared panel behavior, equipment rules, or PDF export.
> Authoritative source: `src/routes/character-sheet/alternative/` plus alternative-specific props passed to shared character-sheet components.
> Related systems: [Character Sheet](./CHARACTER_SHEET.MD), [Equipment](./EQUIPMENT_SYSTEM.MD), [Calculation](./CALCULATION_SYSTEM.MD), [Campaigns](./CAMPAIGN_SYSTEM.MD), [Testing](./TESTING_SYSTEM.MD).
> Status: Active
> Last Updated: 2026-09-19

## 1. Boundary

The alternative sheet is a presentation within the Character Sheet System, not a second
state-owning system. It renders under the same `CharacterSheetProvider`, reducer,
calculator output, persistence adapters, campaign read-only guards, and shared content
panels as the primary sheet.

This companion specification keeps alternative-only UI detail out of
`CHARACTER_SHEET.MD`. Shared behavior remains authoritative there.

## 2. Route and Composition

1. `/character2/:id` opens the requested saved character.
2. `/character2/` resolves the most recently modified saved character.
3. `AlternativeCharacterSheet` composes:
   1. identity and sheet actions;
   2. Resources;
   3. Attributes, Skills & Trades;
   4. Combat;
   5. Actions & Details.
4. The four main sections start expanded and collapse independently without unmounting
   their content.
5. Actions & Details reuses the shared Attacks, Spells, Inventory, Maneuvers, Features,
   Conditions, and Notes panels. The alternative tab supplies the section heading, so
   shared panels suppress duplicate top-level titles.

## 3. Responsive Contract

1. Use the repository breakpoints at 768px and 1200px.
2. Prefer intrinsic grids and wrapping inside the page sections.
3. The Actions & Details tab row may scroll horizontally on narrow screens; the page
   itself must not overflow horizontally.
4. Resource cards fill the row equally and align their progress bars.
5. Exhaustion is managed as a compact resource row below the card grid.
6. Attack and inventory tables reflow inside narrow tab containers instead of relying
   on viewport width alone.

## 4. Alternative Attack Add Flow

1. `Add Weapon` opens `WeaponPickerModal`; it does not create a blank attack row.
2. The picker starts on Inventory and lists standard catalog weapons present in the
   character inventory.
3. The Inventory / Full list switch replaces the table-level catalog checkbox.
4. Full list contains the complete standard weapon catalog in alphabetical order.
5. Selecting a weapon renders the same `WeaponAttackDetails` card used by the attack
   information popup, including damage tiers, properties, features, styles,
   enhancements, conditions, and recovery rules.
6. Confirming creates one fully populated `AttackData` record and closes the picker.
7. Cancelling or closing creates no record.
8. The desktop picker uses a list/detail split. Compact layouts stack list, detail, and
   controls without horizontal page overflow.
9. Read-only campaign views do not render `Add Weapon` and therefore cannot open the
   picker.
10. Search matches weapon names, and the type filter narrows the active source to Melee
    or Ranged weapons.
11. Switching Inventory / Full list preserves the current search and type filter.
12. `Create custom weapon` is a separate action beside the source switch. It opens a
    five-panel accordion build sheet numbered Type (1), Style (2), Damage type (2.5),
    Properties (3), and Review (4). The separate damage panel keeps that choice visible
    after the complete style catalog. Its three physical damage options share one row on
    desktop and stack vertically on compact layouts.
    The Reskinning Weapons rule permits any style on either weapon type, and completed
    sections remain reopenable without losing selections. Each section shows its guidance
    beside the heading only while active, keeping the option area focused.
13. The custom builder identifies ranged Ammo and Two-Handed as automatic properties,
    exposes the Two-Handed removal cost, enforces requirements and exclusions, and uses
    the shared live weapon preview. Its sheet and preview stack on compact layouts.
14. Cancelling custom creation returns to the picker with its source, search, and filter
    unchanged. Confirmation embeds a canonical `CustomWeapon` snapshot in the new attack;
    it does not create an Equipage record, inventory row, or equipped-item effect.

Phase boundary: existing saved Equipage weapons are not selectable in this picker. The
separate builder creates a new character-local snapshot instead of depending on separate
browser-local Equipage storage.

## 5. Alternative Spell Add Flow

1. `Add Spell` opens `SpellPickerModal`; it does not create a blank spell row.
2. The picker starts on Allowed spells. This list applies the restriction of the next
   available `spellsKnownSlots` entry through `matchesSpellSlot`, including the
   Global Magic Profile when that slot is global.
3. All spells lists the complete current catalog in alphabetical order.
4. Both lists exclude spells already recorded on the character.
5. The list identifies school, cost, and sustained spells. The detail card presents
   sources, school, tags, sustained state, cost, range, duration, effects, passive text,
   and enhancements before confirmation.
6. Confirming creates one fully populated `SpellData` record and closes the picker.
7. Cancelling or closing creates no record.
8. The picker uses the weapon picker's responsive list/detail structure.
9. Read-only campaign views do not render `Add Spell`.
10. The tab uses one compact catalog toolbar: Spellbook reference, School filter,
    neutral grouped Expand/Collapse controls, and a primary Add Spell action. Controls
    wrap without changing their order when space is constrained.
11. Search matches spell names, and the picker filter narrows the active source by
    school.
12. Switching Allowed spells / All spells preserves the current search and school filter.

Phase boundary: custom-spell creation is not part of this picker. The primary sheet
retains its existing blank-row and custom-spell workflow.

## 6. Alternative Maneuver Add Flow

1. `Add Maneuver` opens `ManeuverPickerModal`; it does not create a blank row.
2. The picker lists the current maneuver catalog alphabetically and excludes maneuvers
   already recorded on the character.
3. Each list choice identifies maneuver type and base AP/SP cost.
4. The selected card presents type, cost, range, action/reaction timing, description,
   reaction trigger when present, and every enhancement before confirmation.
5. Confirming creates one fully populated `ManeuverData` record and closes the picker.
6. Cancelling or closing creates no record.
7. The picker uses the same responsive list/detail structure as the weapon and spell pickers.
8. Read-only campaign views do not render `Add Maneuver`.
9. Search matches maneuver names, and the type filter narrows the catalog by maneuver
   type.

Phase boundary: custom-maneuver creation is not part of this picker. Maneuver
eligibility is a count budget rather than a catalog restriction, so the picker does not
present an Allowed / All source switch.

## 7. Alternative Inventory Add Flow

1. `Add Item` opens `InventoryPickerModal`; it does not create a blank inventory row.
2. Catalog lists standard inventory items alphabetically. Custom items lists saved
   Equipage records, including non-mechanical General Equipment, plus a freeform
   custom-item choice.
3. Search matches names in the active source. Catalog filters by item type; Custom items
   filters saved Equipage by equipment category.
4. Standard items preview their current rules. Saved Equipage items preview their
   stored description and properties. The freeform choice exposes name, description,
   and cost fields.
5. Quantity defaults to one and Equipped defaults to off. Both are set before
   confirmation.
6. Confirming creates one complete `InventoryItemData` record and closes the picker.
7. Cancelling or closing creates no record.
8. The picker follows the shared responsive list/detail contract and does not overflow
   the page on compact layouts.
9. Read-only campaign views do not render `Add Item`.
10. Existing inventory rows retain their explicit edit lifecycle.
11. Switching Catalog / Custom items preserves the current search and category filter.
    Filter controls remain stable across both sources, even when the active source has
    no matches for the retained category.

`CatalogPickerModal` owns the shared modal frame, accessibility behavior, search and
filter controls, list/detail layout, footer actions, Escape handling, and responsive
stacking for weapon, spell, maneuver, and inventory pickers. Each picker continues to
own its catalog eligibility, filter categories, preview content, source switches, and
record construction. Any picker with multiple sources preserves search and filter state
when the source changes.

`EquipmentBuildSheet` owns the reusable accordion structure, accessible section state,
and compact summary behavior for equipment builders. The custom-weapon builder currently
uses it; other equipment categories retain their existing Equipage builders.

## 8. Other Alternative-Only Interaction Rules

1. Attributes and combat values use the shared automatic Dice Roller.
2. The combat action panel aligns Save DC, Initiative, and Jump as equal metrics, then
   renders Walk and each calculator-returned movement mode in canonical order: Climb,
   Swim, Fly, Burrow, and Glide. Duplicate movement grants produce one display entry.
3. PD and AD use compact horizontal rows. Hit is the dominant baseline; Heavy `+5` and
   Brutal `+10` use progressively smaller values with warning and danger accents.
4. PD and AD abbreviations expose formula tooltips with live values and source bonuses.
5. PDR, EDR, and MDR share a compact footer beneath both defense rows.
6. `CharacterSheetProvider` owns the alternative sheet's normalized presentation facts.
   The Mana card and Combat Mastery consume the same provider-owned Mana visibility fact,
   which is true only when calculated maximum Mana is greater than zero. Its info control
   opens the shared MSL explanation. The provider resolves Meta Magic by canonical feature
   ID, including multiclass grants; eligible characters receive the exemption chip and
   feature-specific exception text.
7. Feature categories preserve their independent disclosure state across tab changes.
8. Existing attack, spell, inventory, maneuver, and note rows retain the explicit
   pencil / confirm / delete lifecycle. The four catalog pickers change only creation of
   new rows.
9. Upgrade-required legacy characters expose only the existing resource counters and
   Exhaustion. All Actions & Details mutation controls remain hidden.
10. Spells and Maneuvers are contextual tabs driven by the same provider-owned
    presentation facts. Spells appears only when the calculator grants at least one spell
    slot or the saved character already contains a spell. Maneuvers follows the same rule
    using the calculated maneuver budget or an existing saved maneuver. This preserves
    valid AP-only spell access and saved selections without exposing irrelevant empty panels.
11. Characters with the canonical Rage feature, including multiclass grants, receive a
    compact Rage row at the top of Combat. The row keeps cost and duration inline where
    space permits, uses one `Inactive / Active` state button, and discloses the complete
    base Rage effects plus its early-ending rule.
12. Active Rage uses the shared sheet toggle and calculator condition
    `while_raging`. The calculator applies the PD penalty, attack presentation adds
    damage only to Unarmed Strikes and melee weapons, and alternative-sheet Might Save
    rolls add one ADV stack. The roll label and Might card identify the source as
    `ADV (Rage)`; existing condition disadvantage stacks still cancel normally.

## 9. Verification

1. `src/routes/character-sheet/components/Attacks.test.tsx` proves the picker creates a
   populated catalog attack and a character-local custom attack, folds in source
   switching, and sorts the catalog.
2. `src/routes/character-sheet/components/AttackPopup.test.tsx` proves the shared weapon
   detail card resolves current weapon rules.
3. `e2e/20-alternative-weapon-picker.e2e.spec.ts` proves the alternative-sheet flow and
   desktop/mobile reflow.
4. Campaign read-only behavior is covered by the lifecycle contract and Convex tests
   documented in `CAMPAIGN_SYSTEM.MD`.
5. `AlternativeCombatResourceSection.test.tsx` proves the two-state Rage control and
   complete disclosed rule text.
6. `Maneuvers.test.tsx` proves the alternative picker creates a complete catalog-backed row, excludes existing choices, and never creates a blank row.
7. `AlternativeMasterySection.test.tsx` and
   `alternativeRollPresentation.test.ts` prove the visible Rage source and ADV/DisADV
   stack cancellation.
8. The deferred character-level magic, feature-mode, and derived-calculation suite is
   specified in `TESTING_SYSTEM.MD` section 3.3.
9. `src/routes/character-sheet/components/Spells.test.tsx` proves the alternative
   picker opens without mutation, applies next-slot restrictions, switches to an
   alphabetical full catalog, and confirms one populated spell.
10. `Attacks.test.tsx`, `Spells.test.tsx`, and `Maneuvers.test.tsx` prove picker search
    and domain filters narrow their active catalogs. Weapon and spell coverage also
    proves that source changes preserve the current search and filter.
11. `Inventory.test.tsx` proves the alternative picker opens without mutation, searches
    and filters the catalog, preserves search and category state across source changes,
    applies quantity and equipped state, and confirms one complete inventory row.
12. `e2e/21-alternative-inventory-picker.e2e.spec.ts` proves the inventory picker flow,
    populated-row creation, responsive reflow, and horizontal-overflow guard.
