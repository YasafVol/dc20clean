# DC20Clean ? Character Sheet

> Purpose: End-to-end map of Character Sheet UI: architecture, components, data sources, and interactions.
> Status: Active
> Last Updated: 2026-07-25

## Recent UX additions

- **Alternative sheet route**: `/character2/:id` renders the incremental alternative sheet under the same `CharacterSheetProvider`; `/character2/` resolves the most recently modified saved character. Its first slice contains only the identity/action header and horizontal HP/Mana/Stamina/Rest/Grit strip. It reuses `StatCard`, the existing reducer mutations, Long Rest behavior, stored-value PDF export, JSON export, and Rulebook article links. Mana and Stamina are each omitted when their maximum is zero. This route adds no schema or persistence path.
- **Hero strip restructured to 3 columns**: `HeroSection` uses a responsive three-column layout:
  - **Col 1**: Health (HP + Temp HP + Health Status + Exhaustion) — unchanged.
  - **Col 2**: Resources (Mana and Stamina) above Recovery (Rest and Grit).
  - **Col 3**: Combat Stats with compact movement, currency, senses, resistances, vulnerabilities, and combat training.
  - Responsive: 2 columns at <=1200px, 1 column at <=768px.
- **Resource controls**: Editable HP, Mana, Stamina, Rest, Grit, and Temp HP values place decrement/increment controls directly around the value (`− current / max +`); current and maximum values use equal-sized, equal-width tabular numeral slots around a centered separator, so different digit counts and negative HP do not unbalance the control. The alternative sheet stretches every resource card to the tallest card in its row. The redundant “Main” label is removed. In the Health card, Temp HP is an unframed standalone control below the HP progress bar; changing it never changes current or maximum HP. The bar reserves 25% of its width for negative HP and 75% for normal HP, with a subtle zero marker between them; negative HP fills and animates leftward from zero in alert red. Current HP and Temp HP render as separate resource-coloured and yellow segments. Damage consumes Temp HP first, then HP. HP can decrease to the calculated negative Death Threshold.
- **HP formula tooltip**: HP hover keeps the shared tabular calculation tooltip, but dynamically splits calculator base HP into class progression (`Level · Class`) and Might rows, followed by every source-attributed HP modifier such as ancestry traits, class features, talents, and equipped items. A second table shows the displayed negative Death Threshold as Prime Attribute + Combat Mastery + source-attributed modifiers.
- **Hero card hierarchy**: The hero strip omits redundant Health, Resources, Recovery, and Combat Stats headings. Conditional reset actions remain available without reserving header space when no override exists.
- **Compact resource labels**: Hero resource cards use Hit Points, Mana, Stamina, Rest, and Grit without the redundant “Points” suffix.
- **Defense cards**: Combat Stats uses the canonical labels PD, Damage Reduction, and AD. Both PD and AD show Heavy and Brutal thresholds on separate lines using defense +5/+10.
- **Attribute headers**: Might, Agility, Charisma, and INT use a compact `Attribute ±score (±save save)` reading order; duplicate abbreviation boxes are removed while score tooltips and clickable save rolls remain intact.
- **Prime hierarchy**: Combat Mastery appears first. Prime follows the compact attribute-header pattern and owns the Awareness skill row inside its bordered section.
- **CompactUtility component** (`components/new/CompactUtility.tsx`): compact replacement for the old Utility tab:
  1. Move | Jump as two mini stat cards in one row.
  2. GP | SP | CP inline editable pills.
  3. Optional chips for alternate movements, senses, resistances, vulnerabilities, and combat training with source tooltips.
- **Utility tab removed from navigation**: movement and currency are integrated into the hero strip.

- **Header actions**: Added `Long Rest` (full reset of HP/MP/SP/Rest Points + clears temp HP and Exhaustion via reducer methods) and `Rulebook` (opens `RulebookPanel`, a slide-in side panel embedding the DC20 core rulebook PDF in the browser's native viewer for built-in search).
- **Attacks**: Weapon dropdown now defaults to weapons present in the character's inventory, with a "Show all weapons" toggle to reveal the full catalog. Selecting the default "Select Weapon..." option now clears the row instead of silently doing nothing. Saved weapons no longer in inventory remain visible in the dropdown with a "(not in inventory)" label.
- **Attack rows are damage-focused**: the sheet-wide Attack/Spell check is calculated in the hero combat stats and exported from `finalAttackSpellCheck`; weapon rows do not calculate or display a separate weapon attack bonus.
- **Inventory**: Each row shows a compact inline summary (e.g. `1B • Versatile • Reach`, `PD +11 • AD +10`) below the item name. Custom items with a description get a gold accent variant of the info icon so annotated items are visible at a glance.
- **Notes**: Replaced the single textarea with a multi-note list (per-note title + body, delete with confirm, "+ New Note" button). Backwards-compatible: legacy single-string notes are auto-wrapped on first load; storage uses a `__NOTES_V2__` JSON marker prefix inside the existing `notes.playerNotes` string so no reducer/schema changes were required.
- **Spells**: Added a "✏️ Custom Spell..." dropdown option that flips a spell row into freeform editable mode (name + school + duration + AP/MP + range + description). Detection is automatic on reload — any spell name not in the catalog renders as custom.
- **Spell row interaction**: Clicking a spell row expands or collapses its description. Cast remains directly available; changing or removing a slot requires opening its trailing pencil action.
- **Spell expansion session state**: A fresh sheet page load starts with spell descriptions collapsed. Expansion choices persist while switching between sheet tabs, then reset on the next full page load.
- **Maneuver row interaction**: Maneuver rows mirror spells: clicking the row toggles details, Use remains directly available, changing/removing a slot requires its trailing pencil action, and expansion state persists across sheet-tab changes until reload.
- **Spell row readability**: Spell names use the sheet's primary foreground color and semibold weight so they remain legible against the dark row background.
- **Desktop header hierarchy**: Character identity and sheet actions are stacked vertically so long names and the toolbar do not compete for one horizontal row.
- **Ancestry identity**: The header shows the second ancestry only when it exists; legacy `Unknown` placeholders are suppressed with the separator.
- **Class identity link**: When the saved class ID matches a generated Rulebook article, the `Level + Class` header metadata links directly to `/rulebook/classes/{classId}`; unmatched legacy IDs remain plain text instead of linking to a missing article.
- **Feature progression display**: The Features tab renders all eligible core class features through the character's level, plus separate Subclass Features, Path Progression, and Talents sections. Talents include both ordinary `selectedTalents` and multiclass Talent selections; path entries resolve from `pathPointAllocations`. Missing selections are not inferred.
- **Feature row interaction**: Every Features-tab row is a full-width keyboard-accessible button that opens its detail popup; separate info icons are not rendered.
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
2. `CharacterSheetProvider` (in `hooks/`) ? loads character from storage, checks compatibility, runs `calculateCharacterWithBreakdowns()` only when full recalculation is allowed, provides computed state via context
3. `useCharacterSheetReducer` ? reducer for local sheet state (resource changes, condition toggles, inventory edits)
4. Layout components render sections based on breakpoint

**Data flow**: Storage ? `CharacterSheetProvider` ? compatibility classifier ? calculator/context ? section components

Compatibility states from the rules-version fence affect sheet persistence:

| State              | Sheet behavior                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| `editable`         | Normal render and full auto-save with recalculated values                                                       |
| `upgrade-required` | Render/export allowed from stored values; auto-save is disabled until an explicit current-rules copy is created |
| `view-only`        | Render allowed where possible; auto-save is disabled                                                            |

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
| `hooks/useBreakpoint.ts`            | Responsive breakpoint detection                                   |

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
- A selected Beastborn Natural Weapon trait derives a read-only, non-inventory
  `Natural Weapon (Unarmed Strike)` row. Until damage-type choice state is modeled,
  the row presents base/heavy/brutal damage as `1/2/3 B/P/S`. The derived row is not
  written into `characterState.attacks`.

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

| Component                           | Description             |
| ----------------------------------- | ----------------------- |
| `components/FeaturePopup.tsx`       | Feature details         |
| `components/SpellPopup.tsx`         | Spell details           |
| `components/AttackPopup.tsx`        | Attack/weapon details   |
| `components/WeaponPopup.tsx`        | Weapon details          |
| `components/InventoryPopup.tsx`     | Inventory item details  |
| `components/DefenseChangeModal.tsx` | Defense manual override |

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
- **Rage toggle** visible when character has a Rage class feature; active Rage maps to calculator condition `while_raging`

---

## 6. Acceptance Checks

- Changing an attribute updates PD/AD/derived stats instantly
- Adding/removing a trade updates its displayed bonuses without refresh
- Feature info buttons open details from class/trait definitions
- Spells/maneuvers add/remove persist and remain in sync after refresh
- Auto-save triggers on state changes
- Old characters with a different `rulesVersion` do not auto-save or receive a recalculation save unless the user creates and opens a current-version copy

---

## 7. E2E Links

- `e2e/02-resources.e2e.spec.ts` ? resources and precision notes
- `e2e/09-spells.e2e.spec.ts` ? spells list operations
- `e2e/10-maneuvers.e2e.spec.ts` ? martial operations
- `e2e/11-currency.e2e.spec.ts` ? currency inputs
- `e2e/12-exhaustion-info.e2e.spec.ts` ? exhaustion and info buttons

---

## 8. Read-Only Mode (Campaign Viewing)

Campaign members can view a shared character sheet in read-only mode. The same `CharacterSheetProvider` is used; a single `campaignId` prop switches the provider into this mode.

### 8.1 Trigger

`CharacterSheetProvider` accepts `campaignId?: string`. When the prop is set, `readOnly = true` for the entire provider instance:

```typescript
export function CharacterSheetProvider({ children, characterId, campaignId }) {
	const readOnly = !!campaignId;
}
```

### 8.2 Load path

When `campaignId` is present, the character is fetched via `characters.getByIdForMember` (a Convex query with a three-layer auth + membership + sharing guard) rather than local storage:

```typescript
const campaignCharacter = useQuery(
	api.characters.getByIdForMember,
	campaignId ? { campaignId, characterId } : 'skip'
);
```

### 8.3 No save effects

- The auto-save `useEffect` short-circuits: `if (readOnly || !state.character) return`.
- `saveNow` is a no-op: `if (readOnly) return`.
- `retryFailedSave` is guarded: `if (readOnly || !state.character) return`.

### 8.4 Reducer no-op guards

`useCharacterSheetReducer` receives `readOnly`. All state-mutating callbacks (HP changes, condition toggles, inventory edits, etc.) guard with `if (readOnly) return`, so the sheet renders the live data without allowing writes.

### 8.5 Read-only banner

`CharacterSheetRedesign.tsx` renders a banner at the top of the sheet when `readOnly` is truthy:

```
Read-only — viewing <characterName>'s sheet
```

### 8.6 Related files

| File                                                          | Role                                           |
| ------------------------------------------------------------- | ---------------------------------------------- |
| `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx` | `readOnly` flag, load path, save guards        |
| `src/routes/character-sheet/CharacterSheetRedesign.tsx`       | Read-only banner                               |
| `src/routes/campaigns/CampaignCharacterView.tsx`              | Route that passes `campaignId` to the provider |
| `convex/characters.ts` (`getByIdForMember`)                   | Three-layer guarded query                      |

See `docs/systems/CAMPAIGN_SYSTEM.MD` for the full campaign architecture.

---

## 9. Related Docs

- `docs/systems/CALCULATION_SYSTEM.MD` — how stats are computed
- `docs/systems/SPELLS_SYSTEM.MD` — spell data and assignment
- `docs/systems/MARTIALS_SYSTEM.MD` — maneuver data
- `docs/systems/BACKGROUND_SYSTEM.MD` — skills/trades/languages
- `docs/systems/CAMPAIGN_SYSTEM.MD` — campaign system and read-only mode
