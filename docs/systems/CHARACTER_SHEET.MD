# DC20Clean ? Character Sheet

> Purpose: End-to-end map of Character Sheet UI: architecture, components, data sources, and interactions.
> Status: Active
> Last Updated: 2026-02-06

---

## 1. Architecture

The character sheet uses a **context provider pattern** with a reducer for state management:

1. `CharacterSheetRouter.tsx` ? entry point; wraps everything in `CharacterSheetProvider`
2. `CharacterSheetProvider` (in `hooks/`) ? loads character from storage, runs `calculateCharacterWithBreakdowns()`, provides computed state via context
3. `useCharacterSheetReducer` ? reducer for local sheet state (resource changes, condition toggles, inventory edits)
4. Layout components render sections based on breakpoint

**Data flow**: Storage ? `CharacterSheetProvider` ? `calculateCharacterWithBreakdowns()` ? context ? section components

---

## 2. Key Files

| File | Role |
| --- | --- |
| `CharacterSheetRouter.tsx` | Entry point; provides context, routes to layout |
| `CharacterSheetRedesign.tsx` | Primary responsive layout (mobile/tablet/desktop via CSS) |
| `CharacterSheetDesktop.tsx` | Desktop-only layout variant |
| `CharacterSheetMobile.tsx` | Mobile layout with tab navigation |
| `CharacterSheetClean.tsx` | Legacy clean layout (desktop/mobile conditional) |
| `hooks/CharacterSheetProvider.tsx` | Context provider with state management, auto-save, selector hooks |
| `hooks/useCharacterSheetReducer.ts` | Reducer for local character sheet state |
| `hooks/useBreakpoint.ts` | Responsive breakpoint detection |

---

## 3. Sections and Data Sources

### Core Stats
| Component | Data Source | Description |
| --- | --- | --- |
| `components/new/HeroSection.tsx` | Calculator breakdowns | HP/SP/MP/Rest/Grit points and defenses |
| `components/new/AttributeCard.tsx` | Calculator `finalAttributes` | Individual attribute display |
| `components/Attributes.tsx` | Calculator attributes + skills | Attributes with grouped skills |
| `components/Resources.tsx` | Calculator breakdowns, class tables | HP/SP/MP resource management (potion-style UI) |
| `components/Defenses.tsx` | Calculator `pd`/`ad` breakdowns | PD, AD with manual override support |

### Combat
| Component | Data Source | Description |
| --- | --- | --- |
| `components/Combat.tsx` | Calculator combat stats | Action points, combat stats, condition toggles |
| `components/Attacks.tsx` | Persisted `characterState.attacks` | Weapon attack management |
| `components/Movement.tsx` | Calculator `movements` array | Movement speeds (ground, fly, swim, climb, burrow) |
| `components/DiceRoller.tsx` | User input | Dice rolling with modifiers |

### Abilities
| Component | Data Source | Description |
| --- | --- | --- |
| `components/Spells.tsx` | `SavedCharacter.spells` + Spells System data | Spellbook with filtering/management |
| `components/Maneuvers.tsx` | `SavedCharacter.maneuvers` + Martials data | Maneuver management with type filtering |
| `components/Features.tsx` | Class/trait feature definitions | Character features/traits display |
| `components/EnhancedFeatures.tsx` | Feature definitions + effect attribution | Enhanced features with source attribution |

### Background
| Component | Data Source | Description |
| --- | --- | --- |
| `components/KnowledgeTrades.tsx` | Calculator mastery data | Knowledge and trade skills |
| `components/Languages.tsx` | Calculator language data | Language proficiencies |

### Inventory and Tracking
| Component | Data Source | Description |
| --- | --- | --- |
| `components/Inventory.tsx` | `characterState.inventory` | Inventory item management |
| `components/Currency.tsx` | `characterState.inventory.currency` | Gold/silver/copper tracker |
| `components/DeathExhaustion.tsx` | Calculator + persisted state | Death saves and exhaustion tracking |
| `components/PlayerNotes.tsx` | Persisted notes field | Player notes textarea |

### Conditions
| Component | Data Source | Description |
| --- | --- | --- |
| `components/Conditions.tsx` | `conditionAggregator` output | Condition immunities/resistances/vulnerabilities |
| `components/ActiveConditionsTracker.tsx` | Local state | Active condition toggle tracker |
| `components/ConditionsReference.tsx` | `conditions.data.ts` | Complete conditions reference guide |
| `components/ConditionBadge.tsx` | Effect data | ADV/DisADV condition badges |

### Popups/Modals
| Component | Description |
| --- | --- |
| `components/FeaturePopup.tsx` | Feature details |
| `components/SpellPopup.tsx` | Spell details |
| `components/AttackPopup.tsx` | Attack/weapon details |
| `components/WeaponPopup.tsx` | Weapon details |
| `components/InventoryPopup.tsx` | Inventory item details |
| `components/DefenseChangeModal.tsx` | Defense manual override |

### UI Utilities
| Component | Description |
| --- | --- |
| `components/AutoSaveIndicator.tsx` | Auto-save status display |
| `components/StatTooltips.tsx` | Stat breakdown tooltips |
| `components/EnhancedStatTooltips.tsx` | Enhanced tooltips with effect attribution |
| `components/FloatingBackground.tsx` | Background image |

### Mobile-Specific (`components/mobile/`)

Mobile components mirror desktop sections with touch-optimized layouts:
`MobileResourceSection`, `MobileAttributesSection`, `MobileAttacksSection`, `MobileSpellsSection`, `MobileManeuversSection`, `MobileInventorySection`, `MobileCurrencySection`, `MobileExhaustionSection`, `MobileActionPointsSection`, `MobileNavigationSection`

### Shared (`components/shared/`)

`CalculationTooltip`, `DeleteButton`, `HamburgerDrawer`, `MobileBottomNav`

---

## 4. Visibility Rules

- **Spells** shown when `calculationResult.spellsKnownSlots.length > 0` or saved spells exist
- **Maneuvers** shown when `calculationResult.levelBudgets.totalManeuversKnown > 0` or saved maneuvers exist
- **Rage toggle** visible when character has a Rage class feature

---

## 5. Acceptance Checks

- Changing an attribute updates PD/AD/derived stats instantly
- Adding/removing a trade updates its displayed bonuses without refresh
- Feature info buttons open details from class/trait definitions
- Spells/maneuvers add/remove persist and remain in sync after refresh
- Auto-save triggers on state changes

---

## 6. E2E Links

- `e2e/02-resources.e2e.spec.ts` ? resources and precision notes
- `e2e/09-spells.e2e.spec.ts` ? spells list operations
- `e2e/10-maneuvers.e2e.spec.ts` ? martial operations
- `e2e/11-currency.e2e.spec.ts` ? currency inputs
- `e2e/12-exhaustion-info.e2e.spec.ts` ? exhaustion and info buttons

---

## 7. Related Docs

- `docs/systems/CALCULATION_SYSTEM.MD` ? how stats are computed
- `docs/systems/SPELLS_SYSTEM.MD` ? spell data and assignment
- `docs/systems/MARTIALS_SYSTEM.MD` ? maneuver data
- `docs/systems/BACKGROUND_SYSTEM.MD` ? skills/trades/languages
