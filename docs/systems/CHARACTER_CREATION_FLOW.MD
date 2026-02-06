# DC20Clean – Character Creation Flow

> Purpose: Canonical reference for the multi-stage character creation wizard: stage ordering, state contracts, validation rules, and data flow.
> Status: Active
> Last Updated: 2026-02-06

---

## Stage Contract

- Ordering is **dynamic**: stages are built at runtime in `CharacterCreation.tsx` via `getSteps()`. The base flow is:
  1. Class & Features (always)
  2. Leveling (conditional: only when `state.level > 1`)
  3. Ancestry (always)
  4. Attributes (always)
  5. Background (always)
  6. Spells (conditional: only when calculator reports `spellsKnownSlots.length > 0`)
  7. Maneuvers (conditional: only when calculator reports `levelBudgets.totalManeuversKnown > 0`)
  8. Name (always)
- Spells and Maneuvers are **separate stages** rendered by `Spells.tsx` and `Maneuvers.tsx` respectively. They appear only when the selected class grants them.
- State lives in `characterContext.tsx`; each stage reads/writes through reducer actions (`SET_CLASS`, `SET_TRAITS`, `UPDATE_SKILLS`, etc.)
- Validation gating: `CharacterCreation.tsx` calls `isStepCompleted(stepNumber)` before allowing navigation; each stage enforces completion via calculator outputs (ancestry/background budgets, attribute points remaining, spell/maneuver counts)
- Calculator contract: `calculateCharacterWithBreakdowns(convertToEnhancedBuildData(state))` runs on every state change and returns:
  - `stats.finalAttributePoints`, `background`, `ancestry`, `breakdowns`, `validation`, `spellsKnownSlots`, `levelBudgets`
  - `validation.errors` drive blocking messages (POINTS_OVERBUDGET, MASTERY_CAP_EXCEEDED)
- **Level-up mode**: When loading an existing character for level-up (`isLevelUpMode`), state is pre-populated from the saved character and the wizard starts at the appropriate stage.
- **Edit mode**: Characters can be loaded for editing via `LoadCharacter.tsx`, which populates state and allows re-navigation through all stages.

## Stage Details

- **Stage 1 – Class & Features** (`ClassSelector.tsx`, `ClassFeatures.tsx`)
  - Inputs: `classesData` (from `class.loader.ts`), `selectedFeatureChoices`, resolver-derived feature options
  - Completion rule: class selected AND all required feature choices resolved (per `findClassByName` metadata)
  - Outputs: `state.classId`, `state.selectedFeatureChoices`
  - Dependencies: handles feature choice IDs; level selection is part of this stage without changing completion logic
  - **Progressive Feature Display** (October 2025): `ClassFeatures.tsx` now displays features grouped by level from 1 up to current character level. Feature choices appear within their respective level sections rather than in a separate section at the bottom. This ensures proper ordering (e.g., Level 1 stance choices appear with Level 1 features, not after Level 3 features).
  - **Testing**: 29 comprehensive tests validate progressive display logic and choice ordering (14 logic tests + 15 component tests)

- **Stage 2 – Leveling** (`LevelingChoices.tsx`)
  - Inputs: calculator `resolvedFeatures` and `validation`, `state.selectedTalents`, `state.pathPointAllocations`, `state.selectedMulticlass*`, `state.selectedSubclass`
  - Completion rule: all leveling budgets spent and subclass choice (if required) selected
  - Outputs: `state.selectedTalents`, `state.pathPointAllocations`, `state.selectedMulticlassOption`, `state.selectedMulticlassClass`, `state.selectedMulticlassFeature`, `state.selectedSubclass`

- **Stage 3 – Ancestry** (`AncestrySelector.tsx`, `SelectedAncestries.tsx`)
  - Inputs: `traitsData`, calculator `ancestry.ancestryPointsRemaining`
  - Completion rule: at least one ancestry chosen, ancestry points ≥ 0, and remaining == 0
  - Outputs: `state.ancestry1Id`, `state.ancestry2Id`, `state.selectedTraitIds`, `state.selectedTraitChoices`

- **Stage 4 – Attributes** (`Attributes.tsx`)
  - Inputs: reducer state for each attribute, calculator `attributePointsRemaining`
  - Completion rule: remaining points == 0
  - Outputs: attribute values via `UPDATE_ATTRIBUTE`

- **Stage 5 – Background** (`Background.tsx`, `SkillsTab.tsx`, `TradesTab.tsx`, `LanguagesTab.tsx`)
  - Inputs: `state.skillsData`, `state.tradesData`, `state.languagesData`, calculator `background` budgets, mastery limits
  - Completion rule: skill points spent exactly, trade/language points <= remaining (UI allows overspend but completion requires <= 0 remaining)
  - Outputs: skills/trades/languages plus conversion values (`SET_CONVERSIONS`)

- **Stage 6 – Spells** (`Spells.tsx`) — conditional, only if class has spell slots
  - Inputs: `allSpells`, calculator `spellsKnownSlots` and `globalMagicProfile`, `state.selectedSpells`
  - Completion rule: all spell slots filled with valid spells matching slot restrictions and global magic profile
  - Outputs: `state.selectedSpells` (stored as `Record<SlotID, SpellID>`)

- **Stage 7 – Maneuvers** (`Maneuvers.tsx`) — conditional, only if class has maneuvers known
  - Inputs: `allManeuvers`, calculator `levelBudgets.totalManeuversKnown`, `state.selectedManeuvers`
  - Completion rule: selected maneuver count matches budget
  - Outputs: `state.selectedManeuvers`

- **Stage 8 – Character Name** (`CharacterName.tsx`)
  - Inputs: `state.finalName`, `state.finalPlayerName`
  - Completion rule: both fields non-empty
  - Outputs: final naming data for persistence

## Leveling Stage

- Activation: inserted after Stage 1 when `state.level > 1`
- Inputs: calculator `resolvedFeatures` (budgets, subclass choice level) and `validation`, plus leveling selections stored in `characterContext`
- Completion rule: all progress pools reduced to zero and subclass choice resolved when required
- Outputs: `selectedTalents`, `pathPointAllocations`, `selectedMulticlass*`, `selectedSubclass`, `selectedCrossPathSpellList`
- Reference: `docs/systems/LEVELING_SYSTEM.MD`

## Leveling Stage UX Flow (Design Notes)

- **Stage header**
  - Step rail marks the conditional “Level Up” slot; hover copy clarifies the stage appears when level > 1.
  - Two pill counters track budgets: `Talent selections X/Y`, `Path points X/Y`, toggling to warning colors when unspent.
- **Talent panel**
  - Accordion groups: General Talents (repeatable buttons), Class Talents (card list), Multiclass Talents (card list with prerequisite badges).
  - Selecting a repeatable option increments the counter; cards show a checkmark when picked, disabled tooltip when prerequisites fail.
  - Inline annotation reminds users they can take multiples of a general talent; we reflect that with a stackable chip UI.
- **Path panel**
  - Radio-style rows per path; each dot represents a point investment tier with descriptive text (e.g., “lvl 3: +1 stamina point +1 maneuvers +1 techniques”).
  - Special rule callout (Spellcaster Stamina) pinned beneath the Martial Path when two points allocated.
  - Summary shows current vs max investments; selecting a dot highlights unlocked benefits.
- **Feature picker**
  - Modal/inline panel lists classes → features; selecting a class reveals its feature cards with name, key benefits, and descriptive text.
  - Chosen feature surfaces as a chip and decrements relevant budgets.
- **Empty/parity states**
  - When no budgets remain, the accordion sections collapse and the stage shows a success banner.
  - Error state: counters turn amber, unresolved sections stay expanded with helper text (“Spend your remaining Path Point”).

## Leveling Stage Data Contract

- Calculator fields consumed:
  - `resolvedFeatures` and `validation.errors` from `calculateCharacterWithBreakdowns`
  - `resolvedFeatures.subclassChoiceLevel` indicates when subclass selection is required
- Store actions/payloads:
  - `SET_LEVEL` updates `state.level`
  - `SET_SELECTED_TALENTS` records `selectedTalents`
  - `SET_PATH_POINTS` records `pathPointAllocations`
  - `SET_MULTICLASS` records `selectedMulticlassOption`, `selectedMulticlassClass`, `selectedMulticlassFeature`
  - `SET_SUBCLASS` records `selectedSubclass`
  - `SET_CROSS_PATH_SPELL_LIST` records `selectedCrossPathSpellList`
- Navigation gating relies on calculator validation; failure to resolve choices keeps the step marked incomplete.

## State Extension Schema

| Store Field                  | Type                                                                 | Source Stage     | Description                                                  | Downstream Consumers                           |
| ---------------------------- | -------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| `level`                      | number                                                               | Class & Features | User-selected target level (default 1)                       | Calculator, Leveling Choices, Spells/Maneuvers |
| `selectedTalents`            | `Record<string, number>`                                             | Leveling         | Counts per talent ID                                         | Calculator effects, character sheet            |
| `pathPointAllocations`       | `{ martial?: number; spellcasting?: number }`                        | Leveling         | Points allocated per path                                    | Calculator path benefits, sheet display        |
| `selectedMulticlassOption`   | `'novice' \| 'adept' \| 'expert' \| 'master' \| 'grandmaster' \| 'legendary' \| null` | Leveling | Current multiclass tier                                      | Calculator effects, UI                         |
| `selectedMulticlassClass`    | `string`                                                             | Leveling         | Target class for multiclass feature                          | Calculator effects, UI                         |
| `selectedMulticlassFeature`  | `string`                                                             | Leveling         | Selected feature ID                                          | Calculator effects, UI                         |
| `selectedSubclass`           | `string`                                                             | Leveling         | Subclass name when required (e.g., level 3)                  | Calculator effects, ClassFeatures recap        |
| `selectedCrossPathSpellList` | `string`                                                             | Leveling         | Spell list for martial class taking spellcaster path         | Calculator effects, sheet display              |

> Leveling selections are stored directly in `characterContext.tsx` and reused by the calculator and character sheet.

## Validation Feedback Patterns

- Snackbar messaging: surface human-readable summaries (`"Spend remaining 1 Talent point"`, `"Choose a subclass feature"`)
- Step indicator: flag Leveling Choices as error when validation errors exist, matching current stage error styling
- Inline cues: counters turn warning state when > 0; unresolved choice cards stay expanded with instructional text
- Calculator error codes extend `validation.errors`; Stage 2+ read the same object so the experience is consistent across steps

## Scaling Considerations

- Anticipate additional talent/path categories at higher levels; provide search/filter UI within accordions
- Support grouping by source (general vs class talents, subclass tiers) and allow collapsing completed sections to reduce cognitive load
- Employ progressive disclosure for large option sets (e.g., load more, lazy search) to keep DOM/render manageable
- Ensure state shape (`selectedTalents`, `selectedMulticlassOption`) can accommodate future rule changes (e.g., multiple selections per level)

## Validation and Testing Notes

- Unit tests exist for `characterContext` reducer; new tests should verify stage completion helpers under multi-level inputs
- Ensure calculated budgets (ancestry/background) align with UI assumptions to avoid false negatives in completion gating
- Future specs should reference this document when altering stage order, adding steps, or modifying completion rules
