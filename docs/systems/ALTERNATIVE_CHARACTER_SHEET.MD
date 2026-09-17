# DC20Clean — Alternative Character Sheet Presentation

> Purpose: Presentation contract for the alternative character sheet at `/character2/:id`.
> Owns: Alternative-only composition, section disclosures, tab presentation, responsive layout, and alternative-only interaction choices.
> Does not own: Character state, calculations, persistence, campaign authorization, shared panel behavior, equipment rules, or PDF export.
> Authoritative source: `src/routes/character-sheet/alternative/` plus alternative-specific props passed to shared character-sheet components.
> Related systems: [Character Sheet](./CHARACTER_SHEET.MD), [Equipment](./EQUIPMENT_SYSTEM.MD), [Calculation](./CALCULATION_SYSTEM.MD), [Campaigns](./CAMPAIGN_SYSTEM.MD), [Testing](./TESTING_SYSTEM.MD).
> Status: Active
> Last Updated: 2026-09-17

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

Phase boundary: custom Equipage weapons are not selectable in this picker yet. The
current `AttackData` model stores only `weaponName`; custom weapons need a stable
`customEquipmentId` link and compatibility handling before they can be added without
ambiguous or reload-broken records.

## 5. Other Alternative-Only Interaction Rules

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
   pencil / confirm / delete lifecycle. The weapon picker changes only creation of new
   standard weapon attacks.
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

## 6. Verification

1. `src/routes/character-sheet/components/Attacks.test.tsx` proves the picker creates a
   populated attack, folds in the source switch, and sorts the catalog.
2. `src/routes/character-sheet/components/AttackPopup.test.tsx` proves the shared weapon
   detail card resolves current weapon rules.
3. `e2e/20-alternative-weapon-picker.e2e.spec.ts` proves the alternative-sheet flow and
   desktop/mobile reflow.
4. Campaign read-only behavior is covered by the lifecycle contract and Convex tests
   documented in `CAMPAIGN_SYSTEM.MD`.
5. `AlternativeCombatResourceSection.test.tsx` proves the two-state Rage control and
   complete disclosed rule text.
6. `AlternativeMasterySection.test.tsx` and
   `alternativeRollPresentation.test.ts` prove the visible Rage source and ADV/DisADV
   stack cancellation.
7. The deferred character-level magic, feature-mode, and derived-calculation suite is
   specified in `TESTING_SYSTEM.MD` section 3.3.
