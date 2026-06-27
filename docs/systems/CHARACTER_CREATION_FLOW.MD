### Character Creation Flow System Spec

> Last Updated: 2026-06-27

#### Purpose

- Establish a canonical reference for the multi-stage character creation wizard so future specs (e.g., Level-Up) reuse the same structure and terminology
- Capture inputs, outputs, and validation rules per stage based on the React components in `src/routes/character-creation`
- Highlight data contracts with `characterContext` and `enhancedCharacterCalculator.ts`

#### Stage Contract

- Ordering is data-driven and uses stable step IDs: 1) Class & Features → 2) Leveling (conditional when level > 1) → 3) Ancestry → 4) Attributes → 5) Background → 6) Spells (conditional) → 7) Maneuvers (conditional) → 8) Character Name. A leveled hybrid can therefore have eight visible steps.
- State lives in `characterContext.tsx`; each stage must read/write through the reducer actions (`SET_CLASS`, `SET_TRAITS`, `UPDATE_SKILLS`, etc.)
- Step navigation is gated. Users can move backward, but cannot jump forward through the stepper until prior steps are complete.
- Class changes clear downstream class/level-dependent selections. Level changes clear level-dependent selections such as talents, path points, multiclass choice, cross-path spell list, spells, and maneuvers.
- Draft state carries both `schemaVersion` and `rulesVersion`; missing `rulesVersion` is inferred as `dc20-0.10`.
- Edit and level-up entry points check runtime compatibility before initializing the wizard. `upgrade-required` v0.10 characters can use the explicit upgrade action on the load-character page; unsupported rules versions remain view-only.
- Edit completion preserves the original character ID, recalculates the build, and writes only that edited character through `saveCharacter()`. It must not batch-save the full character list because Convex validates each record independently and unrelated stale records can block the edited character.
- The explicit v0.10 to current-version action shows its migration plan, creates a new current-rules draft, applies approved aliases/reworks (including the Force Dome and Wall of Force merge into Forcefield), removes disclosed deprecated selections, and unlocks edit/level-up only on the new copy. Migration never mutates the old instance. Consolidated language aliases keep the strongest fluency; removed languages no longer consume points and mark the new copy as `needs-review`.
- Validation gating: `CharacterCreation.tsx` calls `isStepCompleted(stepNumber)` before allowing navigation; each stage enforces completion via calculator outputs (ancestry/background budgets, attribute points remaining, spell slot validity, maneuver validity)
- Calculator contract: `calculateCharacterWithBreakdowns(convertToEnhancedBuildData(state))` runs on every state change and returns:
  - `stats.finalAttributePoints`, `background`, `ancestry`, `breakdowns`, `validation`
  - `validation.errors` drive blocking messages (POINTS_OVERBUDGET, MASTERY_CAP_EXCEEDED)

#### Stage Details

- **Stage 1 – Class & Features** (`ClassSelector.tsx`, `ClassFeatures.tsx`)
  - Inputs: `classesData` (from `class.loader.ts`), `selectedFeatureChoices`, resolver-derived feature options
  - Completion rule: class selected AND all required feature choices resolved (per `findClassByName` metadata)
  - Outputs: `state.classId`, `state.selectedFeatureChoices`
  - Dependencies: handles feature choice IDs; level selection is part of this stage without changing completion logic
  - Starting equipment rendering is driven directly from each class feature file's `startingEquipment` block and now supports the current structured fields `arsenal`, `rangedWeapons`, `spellFocuses`, `armor`, `tradeTools`, and `packs`, with fallback support for older singular field names still present in legacy data.
  - v0.10.5 level 5 Expert Features render from the same persisted feature IDs previously used for placeholders (`<class>_level_5_placeholder`), so older saved level-5+ characters keep resolving while showing the updated Expert Feature names and benefits.
  - Agent/browser hooks: class feature choice inputs expose `data-testid="feature-choice-{choiceId}-{optionId}"`, `data-choice-id`, and `data-option-id`; subclass cards expose `data-testid="subclass-card-{subclassId}"` and `data-subclass-id`.
  - **Progressive Feature Display** (October 2025): `ClassFeatures.tsx` now displays features grouped by level from 1 up to current character level. Feature choices appear within their respective level sections rather than in a separate section at the bottom. This ensures proper ordering (e.g., Level 1 stance choices appear with Level 1 features, not after Level 3 features).
  - **Testing**: 29 comprehensive tests validate progressive display logic and choice ordering (14 logic tests + 15 component tests)

- **Stage 2 – Leveling** (`LevelingChoices.tsx`)
  - Inputs: calculator `resolvedFeatures` and `validation`, `state.selectedTalents`, `state.pathPointAllocations`, `state.selectedMulticlass*`, `state.selectedSubclass`
  - Completion rule: all leveling budgets spent and subclass choice (if required) selected
  - Outputs: `state.selectedTalents`, `state.pathPointAllocations`, `state.selectedMulticlassOption`, `state.selectedMulticlassClass`, `state.selectedMulticlassFeature`, `state.selectedSubclass`
  - v0.10.5 schedule: Talent + Path Progression at levels 6 and 8; subclass choices at levels 3, 7, and 10; class features at levels 1, 2, 5, and 9.
  - Talent budgets come from progression `gains.talents`, not generic class feature records. The stage spends those budgets through `selectedTalents`.
  - Talent list source: `LevelingChoices.tsx` uses `selectableTalents` so deprecated/loadable legacy talents such as Swift Berserker do not appear as new v0.10.5 choices.
  - Agent/browser hooks: leveling tabs expose `leveling-talents-tab` and `leveling-path-points-tab`; talent cards and controls expose `talent-card-{talentId}`, `talent-{talentId}-increase|decrease`; path cards and controls expose `path-card-{pathId}`, `path-{pathId}-increase|decrease`.

- **Stage 3 – Ancestry** (`AncestrySelector.tsx`, `SelectedAncestries.tsx`)
  - Inputs: `traitsData`, calculator `ancestry.ancestryPointsRemaining`
  - Completion rule: at least one ancestry chosen, ancestry points ≥ 0, and remaining == 0
  - Outputs: `state.ancestry1Id`, `state.ancestry2Id`, `state.selectedTraitIds`, `state.selectedTraitChoices`
  - Agent/browser hooks: trait cards expose `data-testid="trait-card-{traitId}"`, `data-trait-id`, `data-option-id`, and `aria-disabled`.

- **Stage 4 – Attributes** (`Attributes.tsx`)
  - Inputs: reducer state for each attribute, calculator `attributePointsRemaining`
  - Completion rule: remaining points == 0
  - Outputs: attribute values via `UPDATE_ATTRIBUTE`
  - Agent/browser hooks: attribute cards expose `data-field-id="attribute-{attributeId}"`; increment/decrement controls expose `data-testid="{attributeId}-increase|decrease"` and matching `data-action-id`.

- **Stage 5 – Background** (`Background.tsx`, `SkillsTab.tsx`, `TradesTab.tsx`, `LanguagesTab.tsx`)
  - Inputs: `state.skillsData`, `state.tradesData`, `state.languagesData`, `state.skillMasteryLimitElevations`, `state.tradeMasteryLimitElevations`, calculator `background` budgets, mastery limits
  - Completion rule: skill/trade/language points spent exactly and no Background validation errors
  - Outputs: skills/trades/languages, point-bought mastery limit elevations, plus conversion values (`SET_CONVERSIONS`)
  - Point-bought cap elevations are separate from mastery ranks. Example: a level 1 Skill raised from no Mastery to Adept stores `skillsData[skillId] = 2` and `skillMasteryLimitElevations[skillId] = { source: 'spent_points', value: 1 }`, costing 3 Skill Points total.
  - Agent/browser hooks: background tab controls expose `skills-tab`, `trades-tab`, and `languages-tab`; skill/trade mastery buttons expose `skill-{id}-mastery-{level}` and `trade-{id}-mastery-{level}` test IDs.
  - Conversion controls expose `convert-skill-to-trade`, `convert-trade-to-language`, `undo-skill-to-trade`, and `reset-background-conversions`.

- **Stage 6 – Spells** (`Spells.tsx`, conditional)
  - Inputs: `ALL_SPELLS`, calculator spell slots/global magic profile, `state.selectedSpells`
  - Completion rule: every current spell slot has a valid selected spell ID, no duplicate selected spells exist, and each selected spell matches its slot's effective target.
  - Spell filtering: the stage keeps an automatic active-slot cursor, starting with the first empty slot and advancing after each learned spell. Users can click a slot to override the cursor for targeted filling or replacement. Eligibility is evaluated per spell against the current target slot. Global class-progression slots use the Global Magic Profile; feature/talent slots use their own restrictions, and unrestricted feature slots do not inherit the global profile. Source, school, and tag browsing filters are OR-based across selected facets; cost and sustained filters narrow results.
  - Spell cards display cost, range, duration, sustained status, school, sources, and first mechanical effect description before selection.
  - Outputs: `state.selectedSpells`
  - Agent/browser hooks: spell cards expose `data-testid="spell-card-{spellId}"`, `data-spell-id`, and `data-option-id`; learn/forget controls expose `data-testid="spell-{spellId}-learn|forget"` and matching `data-action-id`.
  - Character completion resolves spell IDs through `getSpellById()` before falling back to exact display-name matches, so approved legacy v0.10 spell aliases can still produce valid saved spell data when encountered.

- **Stage 7 – Maneuvers** (`Maneuvers.tsx`, conditional)
  - Inputs: `allManeuvers`, calculator `levelBudgets.totalManeuversKnown`, `state.selectedManeuvers`
  - Completion rule: selected maneuver names are unique, exist in the current maneuver catalog, and match `totalManeuversKnown`.
  - Maneuver cards display base AP/SP cost, range, reaction flag, trigger text, and maneuver enhancements for review before selection.
  - Outputs: `state.selectedManeuvers`
  - Agent/browser hooks: maneuver cards expose `data-testid="maneuver-card-{maneuverId}"`, `data-maneuver-id`, and `data-option-id`; learn/forget controls expose `data-testid="maneuver-{maneuverId}-learn|forget"` and matching `data-action-id`.
  - Character completion persists selected maneuvers with base cost, range, reaction trigger, and enhancements so the sheet and Martial Manual-style displays do not lose rules text.
  - Starting resource expectations come from calculated class progression totals: Martial 2 SP, Spellcaster 6 MP, Hybrid 1 SP and 3 MP.

- **Final Stage – Character Name** (`CharacterName.tsx`)
  - Inputs: `state.finalName`, `state.finalPlayerName`
  - Completion rule: both fields non-empty
  - UI: name generation is a secondary inline action beside the character name input.
  - Final actions render below the Player Name field: `Finish & Go to Sheet` is the primary action; `Print PDF` autosaves the completed character, exports from the saved record, then opens the saved character sheet.
  - Outputs: final naming data for persistence
  - Agent/browser hooks: name fields expose `data-testid="character-name-input"` / `data-field-id="character-name"` and `data-testid="player-name-input"` / `data-field-id="player-name"`.

#### Leveling Stage (Implemented)

- Activation: inserted after Stage 1 when `state.level > 1`
- Inputs: calculator `resolvedFeatures` (budgets, subclass choice level) and `validation`, plus leveling selections stored in `characterContext`
- Completion rule: all progress pools reduced to zero and subclass choice resolved when required
- Outputs: `selectedTalents`, `pathPointAllocations`, `selectedMulticlass*`, `selectedSubclass`, `selectedCrossPathSpellList`
- Reference: `docs/systems/LEVELING_SYSTEM.MD`

#### Leveling Stage UX Flow (Design Notes / Future Enhancements)

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

#### Leveling Stage Data Contract (Current)

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

#### State Extension Schema

| Store Field                  | Type                                                                                  | Source Stage     | Description                                          | Downstream Consumers                           |
| ---------------------------- | ------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------- | ---------------------------------------------- |
| `level`                      | number                                                                                | Class & Features | User-selected target level (default 1)               | Calculator, Leveling Choices, Spells/Maneuvers |
| `selectedTalents`            | `Record<string, number>`                                                              | Leveling         | Counts per talent ID                                 | Calculator effects, character sheet            |
| `pathPointAllocations`       | `{ martial?: number; spellcasting?: number }`                                         | Leveling         | Points allocated per path                            | Calculator path benefits, sheet display        |
| `selectedMulticlassOption`   | `'novice' \| 'adept' \| 'expert' \| 'master' \| 'grandmaster' \| 'legendary' \| null` | Leveling         | Current multiclass tier                              | Calculator effects, UI                         |
| `selectedMulticlassClass`    | `string`                                                                              | Leveling         | Target class for multiclass feature                  | Calculator effects, UI                         |
| `selectedMulticlassFeature`  | `string`                                                                              | Leveling         | Selected feature ID                                  | Calculator effects, UI                         |
| `selectedSubclass`           | `string`                                                                              | Leveling         | Subclass name when required (e.g., level 3)          | Calculator effects, ClassFeatures recap        |
| `selectedCrossPathSpellList` | `string`                                                                              | Leveling         | Spell list for martial class taking spellcaster path | Calculator effects, sheet display              |
| `schemaVersion`              | `string`                                                                              | Persistence      | Storage-shape version, normalized to semver          | Storage migration                              |
| `rulesVersion`               | `string`                                                                              | Persistence      | DC20 rules interpretation version                    | Compatibility gates, PDF routing               |

> Leveling selections are stored directly in `characterContext.tsx` and reused by the calculator and character sheet.

#### Validation Feedback Patterns

- Snackbar messaging: surface human-readable summaries (`"Spend remaining 1 Talent point"`, `"Choose a subclass feature"`)
- Step indicator: flag Leveling Choices as error when validation errors exist, matching current stage error styling
- Inline cues: counters turn warning state when > 0; unresolved choice cards stay expanded with instructional text
- Calculator error codes extend `validation.errors`; Stage 2+ read the same object so the experience is consistent across steps

#### Scaling Considerations

- Anticipate additional talent/path categories at higher levels; provide search/filter UI within accordions
- Support grouping by source (general vs class talents, subclass tiers) and allow collapsing completed sections to reduce cognitive load
- Employ progressive disclosure for large option sets (e.g., load more, lazy search) to keep DOM/render manageable
- Ensure state shape (`selectedTalents`, `selectedMulticlassOption`) can accommodate future rule changes (e.g., multiple selections per level)

#### Validation & Testing Notes

- Unit tests exist for `characterContext` reducer; new tests should verify stage completion helpers under multi-level inputs
- Ensure calculated budgets (ancestry/background) align with UI assumptions to avoid false negatives in completion gating
- Future specs should reference this document when altering stage order, adding steps, or modifying completion rules
