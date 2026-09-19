# DC20Clean – Character Sheet

> Purpose: End-to-end map of Character Sheet UI: architecture, components, data sources, and interactions.
> Owns: Character-sheet state and presentation, in-play resource controls, sheet actions, auto-save coordination, responsive layouts, and read-only rendering.
> Does not own: Character-creation rules, derived-stat formulas, persistence implementations, campaign authorization, or PDF field mapping.
> Authoritative source: `src/routes/character-sheet/`, especially `hooks/CharacterSheetProvider.tsx`, the sheet reducer, and section components.
> Related systems: [Alternative Presentation](./ALTERNATIVE_CHARACTER_SHEET.MD), [Calculation](./CALCULATION_SYSTEM.MD), [Database](./DATABASE_SYSTEM.MD), [Campaigns](./CAMPAIGN_SYSTEM.MD), [PDF Export](./PDF_EXPORT_SYSTEM.MD), [Conditions](./CONDITIONS_SYSTEM.MD).
> Status: Active
> Last Updated: 2026-09-19

## Recent UX additions

Alternative-only composition and interaction detail is maintained in
`ALTERNATIVE_CHARACTER_SHEET.MD`; this document remains authoritative for shared sheet
state, behavior, and ownership.

- **Responsive contract**: The live menu and primary sheet use two shared viewport thresholds from `src/styles/responsive.ts`: tablet begins at 768px and desktop begins at 1200px. Compact layouts are the base below 768px; tablet layouts occupy 768–1199px; desktop layouts begin at 1200px. Component internals use fluid grids, wrapping, intrinsic minimums, and container queries instead of additional viewport breakpoints. The primary sheet keeps a stable 280px attribute column above the compact threshold. Spell and Maneuver rows switch between labelled cards and full table rows according to the tab container's available width, so crossing 1200px does not force a cramped table.
- **Alternative sheet route**: `/character2/:id` renders the incremental alternative sheet under the same `CharacterSheetProvider`; `/character2/` resolves the most recently modified saved character. Every saved-character card on `/load-character` offers separate `View Sheet` and `Alternative Sheet` actions, with the current sheet remaining the default. The alternative sheet currently contains the identity/action header, horizontal HP/Mana/Stamina/Rest/Grit strip, an attribute-mastery section, a full-width combat strip, and a tabbed action/detail panel below them. The panel reuses the existing Attacks, Spells, Inventory, Maneuvers, Features, Conditions, and Notes content; its tab bar remains horizontally scrollable on narrow screens and switches content without entry animation. The active tab supplies the section label, so the alternative sheet suppresses each reused panel's duplicate top-level title while retaining controls, category headings, and active counts. The mastery section groups every Skill under its governing Attribute, assigns each selected Trade to its highest valid Attribute total, keeps Awareness under Prime, and sends Attribute Saves, Skills, and Trades to the shared automatic Dice Roller with active-condition modifiers. The combat strip gives Attack primary-action hierarchy; aligns Save DC, Initiative, and Jump as equal tactical metrics; and shows Walk plus calculator-returned movement modes in a stable Walk, Climb, Swim, Fly, Burrow, Glide order. PD and AD use compact rows whose Hit baseline is dominant, with Heavy +5 and Brutal +10 separated by scale, tone, and accent color above a shared PDR/EDR/MDR footer. Read-only PDR/EDR/MDR indicators are sourced from categorical resistance grants. Attack and Initiative send to the same Dice Roller. It reuses `StatCard`, the existing reducer mutations, Long Rest behavior, stored-value PDF export, JSON export, and Rulebook article links. Mana and Stamina are each omitted when their maximum is zero. Alternative-sheet `StatCard` instances skip mount fade and initial bar-fill transitions while retaining value-change and control feedback. This route adds no schema or persistence path.
- **Alternative section disclosure**: Resources; Attributes, Skills & Trades; Combat; and Actions & Details each have a visible section heading and an independent disclosure control. All four sections start expanded at every viewport size. Collapsing hides the mounted content immediately without a slide animation, so local tab and row-edit state survives reopening.
- **Alternative sheet color roles**: Structural surfaces and passive values stay neutral; crystal blue identifies roll actions and interaction states; each Attribute color is limited to its title, top border, and filled mastery dots; both defenses use the purple defense family; resource colors retain their established meanings; green is reserved for active positive states such as damage reduction.
- **Alternative tab interaction**: Subtle dividers separate the uppercase tabs; the active tab uses a crystal-tinted surface, inset outline, and thicker top accent. Existing editable rows in Attacks, Spells, Inventory, Maneuvers, and Notes use a trailing pencil to enter edit mode, check to finish, and delete only while editing. Add Weapon, Add Spell, Add Maneuver, and Add Item open alternative pickers and create populated rows only after confirmation. Features and Conditions retain their existing view/control behavior.
- **Contextual rules tabs**: Spells and Maneuvers appear only when their calculated known-slot/budget entitlement is positive or the saved character already contains an entry. The saved-entry fallback keeps legacy data reachable when current calculation is unavailable.
- **Hero strip restructured to fluid columns**: `HeroSection` uses a container-driven layout:
  - **Col 1**: Health (HP + Temp HP + Health Status + Exhaustion) — unchanged.
  - **Col 2**: Resources (Mana and Stamina) above Recovery (Rest and Grit).
  - **Col 3**: Combat Stats with compact movement, currency, senses, resistances, vulnerabilities, and combat training.
  - Cards keep an 18rem intrinsic minimum and move between three, two, and one columns according to the width available inside the sheet, without adding viewport breakpoints.
  - Mana/Stamina and Rest/Grit remain two equal inner columns, and the three defense values remain one equal row, at every hero width that renders the desktop/tablet sheet.
- **Resource controls**: Editable HP, Mana, Stamina, Rest, Grit, and Temp HP values place decrement/increment controls directly around the value (`− current / max +`); current and maximum values use equal-sized, equal-width tabular numeral slots around a centered separator, so different digit counts and negative HP do not unbalance the control. The primary sheet's paired Mana/Stamina and Rest/Grit cards use smaller controls, type, and spacing so the separator remains legible in their narrow columns; the alternative sheet retains the standard layout. The alternative sheet stretches every resource card to the tallest card in its row and reserves an equal-height status row in every card, keeping all progress bars aligned. The calculated Health Status chip sits close beneath the HP label with separation from the value. The redundant “Main” label is removed. In the Health card, Temp HP is an unframed standalone control below the HP progress bar; changing it never changes current or maximum HP. The bar reserves 25% of its width for negative HP and 75% for normal HP, with a subtle zero marker between them; negative HP fills and animates leftward from zero in alert red. Current HP and Temp HP render as separate resource-coloured and yellow segments. Damage consumes Temp HP first, then HP. HP can decrease to the calculated negative Death Threshold.
- **Resource row layout**: The disclosure header sits outside a nested `auto-fit` card grid, so only visible resource cards determine the column count and divide the full row equally.
- **HP formula tooltip**: HP hover keeps the shared tabular calculation tooltip, but dynamically splits calculator base HP into class progression (`Level · Class`) and Might rows, followed by every source-attributed HP modifier such as ancestry traits, class features, talents, and equipped items. A second table shows the displayed negative Death Threshold as Prime Attribute + Combat Mastery + source-attributed modifiers.
- **Hero card hierarchy**: The hero strip omits redundant Health, Resources, Recovery, and Combat Stats headings. Conditional reset actions remain available without reserving header space when no override exists.
- **Compact resource labels**: Hero resource cards use Hit Points, Mana, Stamina, Rest, and Grit without the redundant “Points” suffix.
- **Defense cards**: Combat Stats uses the canonical labels PD, Damage Reduction, and AD. Both PD and AD show Heavy and Brutal thresholds on separate lines using defense +5/+10. On the alternative sheet, hovering the PD or AD abbreviation shows the canonical formula, its live component values, active source-attributed bonuses, and any displayed override.
- **Attribute headers**: Might, Agility, Charisma, and INT use a compact `Attribute ±score (±save save)` reading order; duplicate abbreviation boxes are removed while score tooltips and clickable save rolls remain intact.
- **Prime hierarchy**: Prime occupies the first column beside the four Attributes, uses their exact header structure and spacing, and owns Awareness. Compact Combat Mastery sits directly beneath Prime. Mana Spend Limit and the Mana resource consume one provider-owned visibility fact derived from calculated maximum Mana. A Meta Magic exemption chip and exception text appear only when the provider resolves the canonical Meta Magic feature ID, including a multiclass grant. Both cards use purple top-border accents, with Combat Mastery using a 30%-lighter treatment. Awareness and every Attribute skill list share the same top baseline.
- **CompactUtility component** (`components/new/CompactUtility.tsx`): compact replacement for the old Utility tab:
  1. Move | Jump as two mini stat cards in one row.
  2. GP | SP | CP inline editable pills.
  3. Optional chips for alternate movements, senses, resistances, vulnerabilities, and combat training with source tooltips.
- **Utility tab removed from navigation**: movement and currency are integrated into the hero strip.

- **Header actions**: Added `Long Rest` (full reset of HP/MP/SP/Rest Points + clears temp HP and Exhaustion via reducer methods) and `Rulebook` (opens `RulebookPanel`, a slide-in side panel embedding the DC20 core rulebook PDF in the browser's native viewer for built-in search).
- **Attacks**: Primary-sheet weapon dropdowns default to weapons present in the character's inventory, with an "Include catalog weapons" toggle to reveal the full catalog. Inventory and catalog weapon choices are sorted alphabetically. Selecting the default "Select Weapon..." option clears the row. Saved weapons no longer in inventory remain visible with a "(not in inventory)" label.
- **Alternative weapon picker**: Add Weapon opens a responsive list/detail modal instead of creating a blank row. Inventory / Full list replaces the table-level checkbox. Catalog selection previews the shared rules-rich weapon card. A separate Create custom weapon action opens a five-panel accordion build sheet numbered Type (1), Style (2), Damage type (2.5), Properties (3), and Review (4), with every style and valid property, automatic ranged-property treatment, and the same live preview. Cancelling returns to the picker without resetting its source, search, or filter. Confirmation embeds a canonical weapon snapshot in the attack without creating an Equipage record, inventory row, or equipped-item effect. See `ALTERNATIVE_CHARACTER_SHEET.MD` for the phase boundary and responsive contract.
- **Alternative spell picker**: Add Spell opens a responsive list/detail modal instead of creating a blank row. Allowed spells applies the rules for the next available spell slot; All spells exposes the alphabetical current catalog. The preview shows source, school, tags, sustained state, base statistics, effects, passive text, and enhancements. Confirmation inserts one complete spell. The primary sheet keeps its existing row-based creation flow.
- **Alternative maneuver picker**: Add Maneuver opens a responsive list/detail modal instead of creating a blank row. The alphabetized list excludes already-known maneuvers; the preview shows type, AP/SP cost, range, timing, description, trigger, and enhancements. Confirmation inserts one complete maneuver. The primary sheet keeps its existing row-based creation flow.
- **Alternative inventory picker**: Add Item opens a responsive list/detail modal instead of creating a blank row. Catalog and Custom items sources support name search and type/category filtering; the setup area applies quantity and equipped state before confirmation. The custom source includes saved weapon, armor, shield, spell-focus, and non-mechanical general Equipage records plus a freeform custom-item path. Confirmation inserts one complete inventory row. The primary sheet keeps its existing row-based creation flow.
- **Shared catalog picker frame**: Weapon, spell, maneuver, and inventory pickers share `CatalogPickerModal` for dialog behavior, search/filter controls, list/detail composition, footer actions, Escape handling, and compact-layout stacking. Pickers with multiple sources preserve search and filter state when the source changes, and keep their filter controls stable across sources. Each picker retains domain-specific eligibility, filters, previews, and record construction.
- **Alternative catalog toolbars**: Spells and Maneuvers use the same compact command hierarchy: reference link, inline catalog filter, neutral grouped row-detail controls, and a primary add action. The toolbar wraps in constrained tab widths; primary-sheet toolbars retain their existing presentation.
- **Attack table hierarchy**: Header and rows share one grid and identical horizontal padding. Rows present numeric Hit, Heavy, and Brutal values, show physical damage type once as `B`, `P`, `S`, or a slash-separated combination, and consolidate details plus editing into a fixed Actions column. The detail control occupies the final action slot so it stays aligned across rows. Derived Beastborn Natural Weapon rows use `Natural Weapon` with `Unarmed Strike · Derived` secondary text and a subdued read-only surface. The catalog checkbox is grouped with Add Weapon and labelled `Include catalog weapons`. The alternative sheet removes the redundant inner Attacks border, while all layouts use row separators and keyboard-accessible detail buttons.
- **Attack rows are damage-focused**: the sheet-wide Attack/Spell check is calculated in the hero combat stats and exported from `finalAttackSpellCheck`; weapon rows do not calculate or display a separate weapon attack bonus.
- **Attack detail terminology**: Attack details use the same computed Hit, Heavy Hit, and Brutal Hit presentation as the table, including applicable ancestry and active-condition modifiers. Tier rows show numeric damage only and separate the damage type into its own spaced detail row. Derived Natural Weapon details omit the irrelevant stored attack bonus. Legacy `critRange` and `critDamage` values are ignored and are no longer created or represented by the runtime `AttackData` model.
- **Attack detail rules**: Standard weapon popups show a compact weapon summary and damage-tier table, followed by default-open Properties & Features and Weapon Style disclosures. Disclosure badges occupy one fixed column so property counts and enhancement costs align. Full condition and recovery rules remain nested and collapsed by default. The sheet's 48 named standard weapons are expanded from the equipment system's 45 authoritative preset stat blocks, so selection, damage, properties, styles, and popup explanations share one rules source. Property text resolves from the equipment property catalog, style/enhancement text resolves from the style catalog, condition text resolves from the condition catalog, and Bleeding recovery resolves from the structured Medicine action rule.
- **Popup close placement**: Shared character-sheet popup close controls are anchored to the popup frame's top-right corner rather than participating in title layout; headers reserve space so long titles cannot overlap the control.
- **Inventory**: Each row shows a compact inline summary (e.g. `1B • Versatile • Reach`, `PD +11 • AD +10`) below the item name. Item selectors are sorted alphabetically and include the canonical preset Spell Focus catalog. Equipped preset focuses contribute their modeled properties. Custom items with a description get a gold accent variant of the info icon so annotated items are visible at a glance. Inside narrow tab containers, the desktop table becomes labelled two-column item cards instead of overflowing horizontally.
- **Notes**: Replaced the single textarea with a multi-note list (per-note title + body, delete with confirm, "+ New Note" button). Backwards-compatible: legacy single-string notes are auto-wrapped on first load; storage uses a `__NOTES_V2__` JSON marker prefix inside the existing `notes.playerNotes` string so no reducer/schema changes were required.
- **Catalog picker ordering**: Weapon, spell, maneuver, and inventory-item name pickers are sorted alphabetically in desktop and mobile sheet layouts. Placeholder and custom-entry choices retain their fixed positions.
- **Spells**: Added a "✏️ Custom Spell..." dropdown option that flips a spell row into freeform editable mode (name + school + duration + AP/MP + range + description). Detection is automatic on reload — any spell name not in the catalog renders as custom.
- **Spell row interaction**: Clicking a spell row expands or collapses its description. Cast remains directly available; changing or removing a slot requires opening its trailing pencil action.
- **Spell expansion session state**: A fresh sheet page load starts with spell descriptions collapsed. Expansion choices persist while switching between sheet tabs, then reset on the next full page load.
- **Maneuver row interaction**: Maneuver rows mirror spells: clicking the row toggles details, Use remains directly available, changing/removing a slot requires its trailing pencil action, and expansion state persists across sheet-tab changes until reload.
- **Spell row readability**: Spell names use the sheet's primary foreground color and semibold weight so they remain legible against the dark row background.
- **Desktop header hierarchy**: Character identity and sheet actions are stacked vertically so long names and the toolbar do not compete for one horizontal row.
- **Tablet header and floating tools**: The tablet action toolbar stays on one horizontally scrollable row to limit sticky-header height. The collapsed Dice Roller is a square floating control with a minimum 48px touch target and consistent viewport spacing; expanding it restores the full panel inside the viewport.
- **Mobile sheet actions**: The character header menu exposes Rulebook, Long Rest, Copy, Download JSON, and Export PDF. The bottom-navigation More drawer remains dedicated to overflow content tabs such as Inventory, Conditions, Maneuvers, Knowledge, and Notes.
- **JSON backup envelope**: Primary, alternative, and load-list JSON exports add transient `exportedAt` and `exportVersion` metadata. Storage preparation strips those envelope fields before persistence.
- **Ancestry identity**: The header shows the second ancestry only when it exists; legacy `Unknown` placeholders are suppressed with the separator.
- **Class identity link**: When the saved class ID matches a generated Rulebook article, the `Level + Class` header metadata links directly to `/rulebook/classes/{classId}`; unmatched legacy IDs remain plain text instead of linking to a missing article.
- **Feature progression display**: The Features tab renders all eligible core class features through the character's level, plus separate Subclass Features, Path Progression, and Talents sections. Talents include both ordinary `selectedTalents` and multiclass Talent selections; path entries resolve from `pathPointAllocations`. Missing selections are not inferred.
- **Feature row interaction**: Every Features-tab row is a full-width keyboard-accessible button that opens its detail popup; separate info icons are not rendered.
- **Feature category disclosure**: Each non-empty Features category starts expanded and has an independent accessible disclosure control. Category content stays mounted while hidden, and the alternative sheet preserves disclosure choices across tab switches.
- **Compatibility-preserving sheet fallbacks**: `CompactUtility` now falls back to stored `SavedCharacter.finalMoveSpeed`, `SavedCharacter.finalJumpDistance`, and persisted inventory currency when compatibility fences suppress fresh calculator output. The spells table resolves legacy spell display-name aliases through the canonical spell catalog before deciding a row is custom, so renamed legacy spells still render with catalog details.
- **Condition keyword tooltips**: New shared `RichDescription` component scans description text for condition names (handles stacking suffix e.g. `Slowed 2`, `Burning 3`) and renders matched tokens as accent-coloured, hover/tap-activated tooltip targets. Wired into `FeaturePopup`, `SpellPopup`, inline spell descriptions in `Spells.tsx`, `Maneuvers.tsx`, `InventoryPopup` info rows, and `EnhancedFeatures` ability descriptions. Mobile uses tap-to-toggle; desktop uses hover with click-outside dismiss. Catalog source: `src/lib/rulesdata/conditions/conditions.data.ts`.
- **Active condition mechanics**: `ActiveConditionsTracker` stores non-stacking conditions by base ID and stack-using conditions as concrete IDs like `slowed-2`. `conditionEffectsAnalyzer` normalizes those IDs for badges and rolls, applies Disoriented only to mental saves, Weakened only to physical saves, Restrained as immobilized, and Exhaustion as a flat numeric penalty on checks/saves.
- **Rage toggle condition mapping**: the Rage button writes both `ui.combatToggles.isRaging` and `ui.activeConditions.while_raging`, so calculator-visible Rage effects use the same state as the sheet toggle.
- **Damage reduction display**: `calculation.resistances[]` entries with value `true` and type `physical`, `elemental`, or `mystical` are displayed as binary PDR, EDR, or MDR instead of resistance values.
- **Language alias display**: sheet language rows resolve saved legacy aliases through the current language catalog, so `primordial` displays as `Elemental`.
- **Advantage note display**: `GRANT_ADV_ON_CHECK` effects are collected into `calculation.grantedAbilities` with type `advantage`, giving class features such as Commander Natural Leader a sheet-visible note without changing roll math.
- **Collected rules notes**: Class features that are descriptive, flavor, or in-game-only should still enter calculator output through collected effects. `GRANT_ABILITY` and `GRANT_ADV_ON_CHECK` notes give the future Effects / Rules Notes surface deterministic source-attributed data instead of prose-only feature records.
- **Death threshold display**: `DeathExhaustion` consumes the saved/calculated
  `finalDeathThreshold` magnitude and applies it as a negative HP threshold. This
  preserves calculator-applied modifiers such as Human Resolve. The threshold
  formula lives in the HP tooltip rather than a standalone row. The current
  health-status badge remains inside the HP card; Death Steps are not rendered.

New files: `components/RulebookPanel.tsx`, `components/RichDescription.tsx`. Rulebook PDF imported via Vite `?url` from `docs/assets/DC20 RPG 0.10.5 Beta v1.pdf`.

---

## 1. Architecture

The character sheet uses a **context provider pattern** with a reducer for state management:

1. `CharacterSheetRouter.tsx` ? entry point; wraps everything in `CharacterSheetProvider`
2. `CharacterSheetProvider` (in `hooks/`) ? loads character from storage, checks compatibility, runs `calculateCharacterWithBreakdowns()` once per character state when full recalculation is allowed, and provides both calculated data and normalized sheet-presentation facts through context. Mana visibility, spell access, maneuver access, and canonical Meta Magic eligibility are resolved here rather than independently inside section components.
3. `useCharacterSheetReducer` ? reducer for local sheet state (resource changes, condition toggles, inventory edits)
4. Layout components render sections based on breakpoint

**Data flow**: Storage ? `CharacterSheetProvider` ? compatibility classifier ? calculator/context ? section components

Compatibility states from the rules-version fence affect sheet persistence:

| State              | Sheet behavior                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `editable`         | Normal render and full auto-save with recalculated values                                                                                   |
| `upgrade-required` | Stored-value render/export; only HP, Temp HP, MP, SP, Rest, Grit, and Exhaustion controls remain active and auto-save without recalculation |
| `view-only`        | Render allowed where possible; auto-save is disabled                                                                                        |

For `upgrade-required` and `view-only` characters, the sheet suppresses fresh calculator output for display/export helpers that would reinterpret the character under the current rules data. PDF export always uses stored `SavedCharacter` values for every rules version; it does not recalculate during export.

---

## 2. Key Files

| File                                | Role                                                              |
| ----------------------------------- | ----------------------------------------------------------------- |
| `CharacterSheetRouter.tsx`          | Entry point; provides context, routes to layout                   |
| `alternative/`                      | Incrementally built `/character2` layout using the same provider  |
| `CharacterSheetRedesign.tsx`        | Primary responsive layout (mobile/tablet/desktop via CSS)         |
| `CharacterSheetDesktop.tsx`         | Desktop-only layout variant                                       |
| `CharacterSheetMobile.tsx`          | Mobile layout with tab navigation                                 |
| `CharacterSheetClean.tsx`           | Legacy clean layout (desktop/mobile conditional)                  |
| `hooks/CharacterSheetProvider.tsx`  | Context provider with state management, auto-save, selector hooks |
| `hooks/useCharacterSheetReducer.ts` | Reducer for local character sheet state                           |
| `hooks/useBreakpoint.ts`            | Three layout modes derived from two shared viewport thresholds    |
| `src/styles/responsive.ts`          | Shared 768px and 1200px breakpoint values and media helpers       |

---

## 3. Sections and Data Sources

### Core Stats

| Component                          | Data Source                         | Description                                    |
| ---------------------------------- | ----------------------------------- | ---------------------------------------------- |
| `components/new/HeroSection.tsx`   | Calculator breakdowns               | HP/SP/MP/Rest/Grit points and defenses         |
| `components/new/AttributeCard.tsx` | Calculator `finalAttributes`        | Individual attribute display                   |
| `components/Attributes.tsx`        | Calculator attributes + skills      | Attributes with grouped skills                 |
| `components/Resources.tsx`         | Calculator breakdowns, class tables | HP/SP/MP resource management (potion-style UI) |
| `components/Defenses.tsx`          | Calculator `pd`/`ad` breakdowns     | PD, AD with manual override support            |

### Combat

| Component                   | Data Source                                                                                 | Description                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `components/Combat.tsx`     | Calculator combat stats                                                                     | Action points, combat stats, condition toggles                                                                                         |
| `components/Attacks.tsx`    | Persisted `characterState.attacks`                                                          | Weapon attack management                                                                                                               |
| `components/Movement.tsx`   | Calculator `movements`, `senses`, `resistances`, `vulnerabilities`, `combatTraining` arrays | Movement speeds (ground, fly, swim, climb, burrow), alternative movements, senses, resistances/vulnerabilities, combat training badges |
| `components/DiceRoller.tsx` | User input                                                                                  | Dice rolling with modifiers; sheet click handlers subtract active flat condition penalties before rolling                              |

### Abilities

| Component                         | Data Source                                  | Description                                                                                  |
| --------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `components/Spells.tsx`           | `SavedCharacter.spells` + Spells System data | Spellbook with filtering/management                                                          |
| `components/Maneuvers.tsx`        | `SavedCharacter.maneuvers` + Martials data   | Maneuver management with type filtering, AP/SP cost, range, trigger, and enhancement display |
| `components/Features.tsx`         | Class/trait feature definitions              | Character features/traits display                                                            |
| `components/EnhancedFeatures.tsx` | Feature definitions + effect attribution     | Enhanced features with source attribution                                                    |

Campaign-only queries, mutations, event producers, and feed notifications mount behind `isConvexEnabled`. The localStorage-default sheet must not render a component that calls a Convex hook because no `ConvexProvider` exists in that mode.

#### Complex Feature Host TODO

- `ComplexFeatureHost` mounts in the Features tab and discovers modules from owned
  feature IDs or collected effects.
- The first module is the local-only Druid Wild Form builder. It renders for
  `druid_wild_form` or a collected `GRANT_ABILITY:wild_form` grant.
- Wild Form builder scope: reactive page state only; no saved-character schema, no persistence, no migration. Derived values should calculate on render with memoized browser state, and formula details should live in tooltips while the pane shows final values.
- Wild Form source data: include source templates (Defensive, Grappler, Parkour, Infiltrator), Wild Form Traits, and non-negative Beastborn expanded Beast Traits from `src/lib/rulesdata/ancestries/ancestries.ts` / `traits.ts`. Treat Wild Form's built-in natural weapon as satisfying natural-weapon prerequisites, but do not include Beastborn origin/default traits such as `beastborn_beastkind`.

#### Spell Sheet TODOs

- `spellPresentation.ts` builds contextual spell check/attack, damage, range, and
  in-play focus notes from saved/catalog spell data plus calculator-collected equipped effects.
- The sheet exposes `Review Spellbook` and keeps replacement inside each row's edit
  action. Replacement options are filtered through the calculator slot and Global Magic
  Profile; locked/read-only sheets expose neither mutation control.

#### Maneuver Sheet Notes

- Maneuver rows preserve and render catalog AP/SP cost, range, reaction trigger, and enhancement text. Older saved rows can still resolve details from the current catalog by maneuver name.
- The standalone `/martial-manual` route provides a Spellbook-like reference surface for all maneuvers and enhancements.
- Expanded known maneuver rows link to the canonical Martial Manual card through
  `/martial-manual?maneuver={id}`. The Manual filters to, expands, and scrolls to that
  card, keeping one full-card presentation source.
- Expanded maneuver cards let players declare enhancements before Use. Session-only
  selection totals SP costs, supports repeatable enhancements, blocks Use above the
  calculator's Stamina Spend Limit, and clears the declaration after Use.

#### Effects Sheet TODOs

- `effectPresentation.ts` takes source-attributed effects and returns categorized rows for:
  - calculator-applied effects already represented in stat/budget breakdowns,
  - collected sheet effects (`movements`, `senses`, `resistances`, `vulnerabilities`, `combatTraining`),
  - manual in-game effects (`GRANT_ABILITY`, `conditionalModifiers`, non-condition `GRANT_ADV_ON_SAVE`),
  - unsupported or weakly mapped effects such as `SET_VALUE:size` and `MODIFY_STAT:deathThresholdModifier`.
- The Features tab renders those rows in an “Effects & Rules Notes” surface, including a
  dedicated resolved Size badge for `SET_VALUE:size`.
- Keep `calculatorModules/effectCollection.ts` as the source-attributed aggregation layer. The new service should be presentation-oriented and should not duplicate stat math from `calculateCharacterWithBreakdowns()`.

#### Attack Sheet Notes

- `attackPresentation.ts` applies active attack-scoped effects without rewriting saved
  attack rows. Barbarian Rage `MODIFY_STAT:martial_melee_damage +1 while_raging`
  applies to catalog melee weapons and persisted Unarmed Strike rows; ranged and unknown
  custom rows remain unchanged.
- `ancestryAttackTraits.ts` interprets selected ancestry trait IDs for attack-row
  presentation without rewriting saved attacks. Orc Brutal Strikes adds +1 only to the
  displayed Brutal damage of supported melee weapons and Unarmed Strikes. Finishing Blow
  and Beastborn Charge remain condition-dependent notes and never change the displayed
  damage automatically.
- A selected Beastborn Natural Weapon trait derives a read-only, non-inventory
  `Natural Weapon (Unarmed Strike)` row. Until damage-type choice state is modeled,
  the row presents base/heavy/brutal damage as `1/2/3 B/P/S`. The derived row is not
  written into `characterState.attacks`. Selected Natural Weapon extensions are rendered
  on that row as properties or rules notes: Reach, ranged range, Concealable, Style
  enhancement eligibility, Rend, and Venomous. Long-Limbed appears on every supported
  melee attack. Natural Weapon Style does not infer a style because the character model
  does not currently persist that choice.

v0.10.5 level 5 Expert Features intentionally keep the old `<class>_level_5_placeholder` IDs. Saved characters that already reference those IDs render the updated Expert Feature names, benefits, and modeled effects without needing a destructive ID rewrite.

### Background

| Component                        | Data Source              | Description                |
| -------------------------------- | ------------------------ | -------------------------- |
| `components/KnowledgeTrades.tsx` | Calculator mastery data  | Knowledge and trade skills |
| `components/Languages.tsx`       | Calculator language data | Language proficiencies     |

### Inventory and Tracking

| Component                        | Data Source                         | Description                         |
| -------------------------------- | ----------------------------------- | ----------------------------------- |
| `components/Inventory.tsx`       | `characterState.inventory`          | Inventory item management           |
| `components/Currency.tsx`        | `characterState.inventory.currency` | Gold/silver/copper tracker          |
| `components/DeathExhaustion.tsx` | Calculator + persisted state        | Death saves and exhaustion tracking |
| `components/PlayerNotes.tsx`     | Persisted notes field               | Player notes textarea               |

### Conditions

See `docs/systems/CONDITIONS_SYSTEM.MD` for the source audit, catalog contract, and current automation gaps.

| Component                                | Data Source                  | Description                                                                                          |
| ---------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| `components/Conditions.tsx`              | `conditionAggregator` output | Condition immunities/resistances/vulnerabilities (wired up, displays grouped condition interactions) |
| `components/ActiveConditionsTracker.tsx` | Local state                  | Active condition toggle tracker with stack controls for stack-using conditions                       |
| `components/ConditionsReference.tsx`     | `conditions.data.ts`         | Flat conditions reference guide filtered by descriptive condition tags                               |
| `components/ConditionBadge.tsx`          | Effect data                  | ADV/DisADV condition badges                                                                          |

### Popups/Modals

| Component                                 | Description                                |
| ----------------------------------------- | ------------------------------------------ |
| `components/FeaturePopup.tsx`             | Feature details                            |
| `components/SpellPopup.tsx`               | Spell details                              |
| `components/AttackPopup.tsx`              | Attack/weapon details                      |
| `components/CatalogPickerModal.tsx`       | Shared searchable/filterable picker frame  |
| `components/CustomWeaponBuilderModal.tsx` | Separate alternative custom-weapon builder |
| `components/WeaponPickerModal.tsx`        | Alternative add-weapon flow                |
| `components/SpellPickerModal.tsx`         | Alternative add-spell flow                 |
| `components/ManeuverPickerModal.tsx`      | Alternative add-maneuver flow              |
| `components/InventoryPickerModal.tsx`     | Alternative add-inventory flow             |
| `components/WeaponPopup.tsx`              | Weapon details                             |
| `components/InventoryPopup.tsx`           | Inventory item details                     |
| `components/DefenseChangeModal.tsx`       | Defense manual override                    |

### UI Utilities

| Component                             | Description                               |
| ------------------------------------- | ----------------------------------------- |
| `components/AutoSaveIndicator.tsx`    | Auto-save status display                  |
| `components/StatTooltips.tsx`         | Stat breakdown tooltips                   |
| `components/EnhancedStatTooltips.tsx` | Enhanced tooltips with effect attribution |
| `components/FloatingBackground.tsx`   | Background image                          |

### Mobile-Specific (`components/mobile/`)

Mobile components mirror desktop sections with touch-optimized layouts:
`MobileResourceSection`, `MobileAttributesSection`, `MobileAttacksSection`, `MobileSpellsSection`, `MobileManeuversSection`, `MobileInventorySection`, `MobileCurrencySection`, `MobileExhaustionSection`, `MobileActionPointsSection`, `MobileNavigationSection`

### Shared (`components/shared/`)

`CalculationTooltip`, `DeleteButton`, `HamburgerDrawer`, `MobileBottomNav`

---

## 4. Movement Component Panels

The `Movement.tsx` component displays multiple panels with combat-relevant information:

### Alternative Movements

- **Climb and Swim**: Always displayed (even if default/slowed), with "(Slowed)" label for default values
- **Fly, Burrow, Glide**: Only shown when granted (non-default)
- Each movement shows speed in Spaces with source attribution via tooltip
- Data source: `calculation.movements[]` array

### Senses

- Lists all granted senses (Darkvision, Tremorsense, etc.) with range in Spaces
- Each sense shows source attribution via tooltip
- Data source: `calculation.senses[]` array
- Only displayed when `senses.length > 0`

### Resistances/Vulnerabilities

- Lists damage resistances and vulnerabilities with source attribution
- Resistances shown in blue, vulnerabilities in red
- Format: "Fire Resistance (Half)" or "Radiant Vulnerability (1)"; binary reductions display as PDR, EDR, or MDR.
- Each entry shows source via tooltip
- Data sources: `calculation.resistances[]` and `calculation.vulnerabilities[]` arrays
- Only displayed when at least one resistance or vulnerability exists

### Combat Training

- Shows weapon/armor/shield training as badges
- Displays training types (e.g., "Weapons", "Heavy Armor", "All Shields")
- Each badge shows source attribution via tooltip
- Data source: `calculation.combatTraining[]` array
- Only displayed when `combatTraining.length > 0`

---

## 5. Visibility Rules

- **Spells** shown when `calculationResult.spellsKnownSlots.length > 0` or saved spells exist
- **Maneuvers** shown when `calculationResult.levelBudgets.totalManeuversKnown > 0` or saved maneuvers exist
- **Rage toggle** visible when canonical feature resolution finds Rage directly or
  through multiclassing. Active Rage maps to calculator condition `while_raging`.
  The alternative sheet exposes the complete base rule behind a disclosure, displays
  calculator-backed PD and attack-damage changes, and adds one source-labelled ADV stack
  to Might Save rolls. Read-only campaign views show the current state but cannot change it.

---

## 6. Acceptance Checks

- Changing an attribute updates PD/AD/derived stats instantly
- Adding/removing a trade updates its displayed bonuses without refresh
- Feature info buttons open details from class/trait definitions
- Spells/maneuvers add/remove persist and remain in sync after refresh
- Auto-save triggers on state changes
- Old characters with a different `rulesVersion` auto-save only HP, Temp HP, MP, SP, Rest, Grit, and Exhaustion. They never recalculate or persist attacks, spells, maneuvers, inventory, currency, notes, conditions, toggles, defenses, action points, or death state.

---

## 7. E2E Links

- `e2e/02-resources.e2e.spec.ts` — resource controls
- `e2e/09-spells.e2e.spec.ts` ? spells list operations
- `e2e/10-maneuvers.e2e.spec.ts` ? martial operations
- `e2e/11-currency.e2e.spec.ts` ? currency inputs
- `e2e/12-exhaustion-info.e2e.spec.ts` — exhaustion controls and feature details
- `e2e/20-alternative-weapon-picker.e2e.spec.ts` — alternative add-weapon modal and responsive reflow
- `e2e/21-alternative-inventory-picker.e2e.spec.ts` — alternative add-inventory modal and responsive reflow

---

## 8. Read-Only Mode (Campaign Viewing)

Campaign members can view a shared character in read-only mode through either the Primary or Alternative presentation. The presentation does not own the campaign connection: both render the same authorized record under one `CharacterSheetProvider`.

### 8.1 Trigger

`CharacterSheetProvider` accepts `campaignId?: string` and `campaignCharacterDocId?: string`. `campaignId` enables read-only mode; the optional record ID selects the exact campaign roster record.

`CampaignCharacterView` owns the presentation switch. The default is Primary; `?sheet=alternative` selects Alternative while preserving the campaign and exact character-record parameters.

```typescript
<CharacterSheetProvider campaignId={campaignId} characterId={characterId} campaignCharacterDocId={characterDocId} />
```

### 8.2 Load path

When `campaignId` is present, the character is fetched via the guarded `characters.getByIdForMember` query rather than local storage. Current roster links pass both the app ID and Convex record ID; the backend requires them to identify the same connected record.

```typescript
const campaignCharacter = useQuery(
	api.characters.getByIdForMember,
	campaignId ? { campaignId, characterId, characterDocId } : 'skip'
);
```

### 8.3 No save effects

- The auto-save `useEffect` short-circuits when a campaign view is active.
- `saveNow` is a no-op: `if (readOnly) return`.
- `retryFailedSave` is guarded: `if (readOnly || !state.character) return`.

### 8.4 Reducer no-op guards

`useCharacterSheetReducer` distinguishes full editing from resource management. Campaign views allow neither. Upgrade-required owners allow only the seven live resource callbacks. All structural callbacks remain no-ops.

The Attacks, Inventory, Spells, Maneuvers, Conditions, and Notes panels suppress mutation controls in read-only mode. Inventory detail popups render custom fields as values instead of inputs; filtering, detail expansion, and presentation navigation remain available.

### 8.5 Presentation controls and banners

`CampaignCharacterView.tsx` renders common navigation, a Primary/Alternative switch, and a read-only label. `CharacterSheetRedesign.tsx` also renders its existing banner when `readOnly` is truthy:

```
Read-only — viewing <characterName>'s sheet
```

### 8.6 Related files

| File                                                          | Role                                           |
| ------------------------------------------------------------- | ---------------------------------------------- |
| `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx` | `readOnly` flag, load path, save guards        |
| `src/routes/character-sheet/CharacterSheetRedesign.tsx`       | Read-only banner                               |
| `src/routes/campaigns/CampaignCharacterView.tsx`              | Shared read-only route and presentation switch |
| `convex/characters.ts` (`getByIdForMember`)                   | Three-layer guarded query                      |

See `docs/systems/CAMPAIGN_SYSTEM.MD` for the full campaign architecture.

---

## 9. Related Docs

- `docs/systems/ALTERNATIVE_CHARACTER_SHEET.MD` — alternative-only presentation contract
- `docs/systems/CALCULATION_SYSTEM.MD` — how stats are computed
- `docs/systems/SPELLS_SYSTEM.MD` — spell data and assignment
- `docs/systems/MARTIALS_SYSTEM.MD` — maneuver data
- `docs/systems/BACKGROUND_SYSTEM.MD` — skills/trades/languages
- `docs/systems/CAMPAIGN_SYSTEM.MD` — campaign system and read-only mode
