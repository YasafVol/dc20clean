# DC20Clean ? Character Sheet

> Purpose: End-to-end map of Character Sheet UI: architecture, components, data sources, and interactions.
> Status: Active
> Last Updated: 2026-06-19

## Recent UX additions

- **Hero strip restructured to 3 columns**: `HeroSection` uses a responsive three-column layout:
  - **Col 1**: Health (HP + Temp HP + Health Status + Exhaustion) — unchanged.
  - **Col 2**: Resources (Mana and Stamina) above Recovery (Rest and Grit).
  - **Col 3**: Combat Stats with compact movement, currency, senses, resistances, vulnerabilities, and combat training.
  - Responsive: 2 columns at <=1200px, 1 column at <=768px.
- **CompactUtility component** (`components/new/CompactUtility.tsx`): compact replacement for the old Utility tab:
  1. Move | Jump as two mini stat cards in one row.
  2. GP | SP | CP inline editable pills.
  3. Optional chips for alternate movements, senses, resistances, vulnerabilities, and combat training with source tooltips.
- **Utility tab removed from navigation**: movement and currency are integrated into the hero strip.

- **Header actions**: Added `Long Rest` (full reset of HP/MP/SP/Rest Points + clears temp HP and Exhaustion via reducer methods) and `Rulebook` (opens `RulebookPanel`, a slide-in side panel embedding the DC20 core rulebook PDF in the browser's native viewer for built-in search).
- **Attacks**: Weapon dropdown now defaults to weapons present in the character's inventory, with a "Show all weapons" toggle to reveal the full catalog. Selecting the default "Select Weapon..." option now clears the row instead of silently doing nothing. Saved weapons no longer in inventory remain visible in the dropdown with a "(not in inventory)" label.
- **Inventory**: Each row shows a compact inline summary (e.g. `1B • Versatile • Reach`, `PD +11 • AD +10`) below the item name. Custom items with a description get a gold accent variant of the info icon so annotated items are visible at a glance.
- **Notes**: Replaced the single textarea with a multi-note list (per-note title + body, delete with confirm, "+ New Note" button). Backwards-compatible: legacy single-string notes are auto-wrapped on first load; storage uses a `__NOTES_V2__` JSON marker prefix inside the existing `notes.playerNotes` string so no reducer/schema changes were required.
- **Spells**: Added a "✏️ Custom Spell..." dropdown option that flips a spell row into freeform editable mode (name + school + duration + AP/MP + range + description). Detection is automatic on reload — any spell name not in the catalog renders as custom.
- **Compatibility-preserving sheet fallbacks**: `CompactUtility` now falls back to stored `SavedCharacter.finalMoveSpeed`, `SavedCharacter.finalJumpDistance`, and persisted inventory currency when compatibility fences suppress fresh calculator output. The spells table resolves legacy spell display-name aliases through the canonical spell catalog before deciding a row is custom, so renamed legacy spells still render with catalog details.
- **Condition keyword tooltips**: New shared `RichDescription` component scans description text for condition names (handles stacking suffix e.g. `Slowed 2`, `Burning 3`) and renders matched tokens as accent-coloured, hover/tap-activated tooltip targets. Wired into `FeaturePopup`, `SpellPopup`, inline spell descriptions in `Spells.tsx`, `Maneuvers.tsx`, `InventoryPopup` info rows, and `EnhancedFeatures` ability descriptions. Mobile uses tap-to-toggle; desktop uses hover with click-outside dismiss. Catalog source: `src/lib/rulesdata/conditions/conditions.data.ts`.
- **Active condition mechanics**: `ActiveConditionsTracker` stores absolute/overlap conditions by base ID and stacking conditions as concrete IDs like `slowed-2`. `conditionEffectsAnalyzer` normalizes those IDs for badges and rolls, applies Disoriented only to mental saves, Weakened only to physical saves, Restrained as immobilized, and Exhaustion as a flat numeric penalty on checks/saves.

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

| State              | Sheet behavior                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `editable`         | Normal render and full auto-save with recalculated values                                                                 |
| `upgrade-required` | Render/export allowed from stored values; auto-save is disabled until an explicit current-rules copy is created             |
| `view-only`        | Render allowed where possible; auto-save is disabled                                                                      |

For `upgrade-required` and `view-only` characters, the sheet suppresses fresh calculator output for display/export helpers that would reinterpret the character under the current rules data. PDF export falls back to stored `SavedCharacter` values for those compatibility states.

---

## 2. Key Files

| File                                | Role                                                              |
| ----------------------------------- | ----------------------------------------------------------------- |
| `CharacterSheetRouter.tsx`          | Entry point; provides context, routes to layout                   |
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

| Component                         | Data Source                                  | Description                               |
| --------------------------------- | -------------------------------------------- | ----------------------------------------- |
| `components/Spells.tsx`           | `SavedCharacter.spells` + Spells System data | Spellbook with filtering/management       |
| `components/Maneuvers.tsx`        | `SavedCharacter.maneuvers` + Martials data   | Maneuver management with type filtering   |
| `components/Features.tsx`         | Class/trait feature definitions              | Character features/traits display         |
| `components/EnhancedFeatures.tsx` | Feature definitions + effect attribution     | Enhanced features with source attribution |

#### Spell Sheet TODOs

- Add a pure sheet-facing helper that builds calculated spell presentation stats from the saved spell, character calculation output, active effects, and equipped spell focus effects. The UI should consume this helper for spell attack/check bonuses, focus-driven damage/range adjustments, and any "applies in play" notes instead of duplicating rules logic inside `components/Spells.tsx` or `SpellPopup.tsx`.
- Add a Character Sheet flow for opening the Spellbook to review, select, and replace known spells. Replacement should respect spell-slot restrictions from the calculator and must remain disabled for locked legacy characters.

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

| Component                                | Data Source                  | Description                                                                                          |
| ---------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| `components/Conditions.tsx`              | `conditionAggregator` output | Condition immunities/resistances/vulnerabilities (wired up, displays grouped condition interactions) |
| `components/ActiveConditionsTracker.tsx` | Local state                  | Active condition toggle tracker with stack controls for stacking conditions                          |
| `components/ConditionsReference.tsx`     | `conditions.data.ts`         | Complete conditions reference guide                                                                  |
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
- Format: "Fire Resistance (Half)" or "Radiant Vulnerability (1)"
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
- **Rage toggle** visible when character has a Rage class feature

---

## 6. Acceptance Checks

- Changing an attribute updates PD/AD/derived stats instantly
- Adding/removing a trade updates its displayed bonuses without refresh
- Feature info buttons open details from class/trait definitions
- Spells/maneuvers add/remove persist and remain in sync after refresh
- Auto-save triggers on state changes
- Old characters with a different `rulesVersion` do not receive a full recalculation save unless classified as `editable`

---

## 7. E2E Links

- `e2e/02-resources.e2e.spec.ts` ? resources and precision notes
- `e2e/09-spells.e2e.spec.ts` ? spells list operations
- `e2e/10-maneuvers.e2e.spec.ts` ? martial operations
- `e2e/11-currency.e2e.spec.ts` ? currency inputs
- `e2e/12-exhaustion-info.e2e.spec.ts` ? exhaustion and info buttons

---

## 8. Related Docs

- `docs/systems/CALCULATION_SYSTEM.MD` ? how stats are computed
- `docs/systems/SPELLS_SYSTEM.MD` ? spell data and assignment
- `docs/systems/MARTIALS_SYSTEM.MD` ? maneuver data
- `docs/systems/BACKGROUND_SYSTEM.MD` ? skills/trades/languages
