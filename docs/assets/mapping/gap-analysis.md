# Gap Analysis (First Pass)

Last updated: 2026-01-14

Status: Prioritized gaps with evidence, impact, and minimal proposals. No code changes yet.

## Priority Legend
- P1 — correctness/user-facing errors
- P2 — consistency/UX clarity
- P3 — maintainability/docs drift

---

## Cross‑Cutting
- Gap: Save DC baseline mismatch (ONTOLOGY.md 8+ vs rules/calculator 10+)
  - **FIXED**: Updated ONTOLOGY.md to 10 + CM + Prime.
  - Evidence: ONTOLOGY Save DC; CALC docs + CH1 use 10 + CM + Prime.
  - Impact: P3 → Resolved

- Gap: No normalized effect resolution metadata for spells/maneuvers
  - **SCHEMA ADDED**: Added `EffectResolution` interface to `spell.schema.ts`.
  - Evidence: Rules use Check vs Defense, Save vs Save DC, fixed DC checks, dynamic both.
  - Impact: P2 → Schema ready for data population
  - Implementation:
    - `rollBy`: 'caster' | 'target' | 'both'
    - `casterCheck`: { kind, vs } for attack/spell/martial checks
    - `targetSave`: { ability, vs, repeated } for save-based effects
    - `timing`: 'simultaneous' | 'sequential' for DAS
    - `singleRollSharedAcrossTargets` on SpellEffect
  - Files: `spell.schema.ts` updated; maneuver schema can mirror when needed.

---

## CH1 — Core Rules
- Gap: MCP representation beyond boolean ADV/DisADV
  - Evidence: ADV X/DisADV X and MCP stacking; UI likely treats as boolean.
  - Impact: P2 (roll helper fidelity)
  - Proposal: UI roller to accept arbitrary ADV/DisADV counts; no schema change required.

- Gap: DAS unified rendering
  - Evidence: Dynamic Attack Saves described; mixed handling likely across features.
  - Impact: P2
  - Proposal: Use normalized resolution metadata to present four outcomes consistently.
  - Files: n/a schema changes (leverage §1); UI renderer.

---

## CH2a — Combat (Pre‑Spellcaster)
- Gap: Reaction triggers not data‑driven
  - **CONFIG ADDED**: Created `src/lib/rulesdata/config/reactions.ts`.
  - Evidence: OA, Spell Duel, Combo triggers in prose only.
  - Impact: P2 → Config ready for UI integration
  - Implementation:
    - `ReactionConfig` interface with id, name, description, prerequisite, costs, range, triggers
    - Configured: Opportunity Attack, Spell Duel, Combo Casting, Combo Maneuver
    - Helper functions: `getReactionConfig()`, `getAvailableReactions()`

- Gap: Enforce per‑action spend caps (MSL/SSL)
  - Evidence: Rules specify MSL = SSL = Combat Mastery; UI must enforce.
  - Impact: P1 (prevents illegal casts/uses)
  - **Status:** Requires UI implementation
  - **Specification:**
    - MSL (Mana Spend Limit) = Combat Mastery — max MP per MP Effect (spell + enhancements)
    - SSL (Stamina Spend Limit) = Combat Mastery — max SP per SP Effect (maneuver + enhancements)
    - These limits are separate (can spend MSL + SSL on same action, e.g., Spellstrike)
  - Implementation needed:
    1. Calculator: Output `msl` and `ssl` values (both = combatMastery)
    2. Spell UI: Sum base spell MP + enhancement MP, validate ≤ MSL
    3. Maneuver UI: Sum base maneuver SP + enhancement SP, validate ≤ SSL
    4. Block or warn when limits exceeded
  - Files: `src/lib/services/enhancedCharacterCalculator.ts` (add msl/ssl to output), UI spell/maneuver components.

- Gap: Declare‑before‑roll enforcement
  - Evidence: Rules require declaring enhancements before rolling; UI should enforce timing.
  - Impact: P2
  - **Status:** Requires UI implementation (dice roller not yet built)
  - **Specification:**
    - DC20 rules: "You can choose to spend extra resources on your Spells and Maneuvers
      to get the benefits of Spell Enhancements and Maneuver Enhancements, but this must
      be declared before you make your Spell Check, Martial Check, or Spell Attack."
    - Implementation requirements:
      1. Roll workflow component with phases: Selection → Confirmation → Roll → Result
      2. Lock enhancement selection after "Confirm" but before dice are rolled
      3. Show total resource spend (MP/SP) and validate against MSL/SSL before confirmation
      4. Display all declared enhancements in roll result
    - Depends on: Dice roller UI component (not yet implemented)
  - Proposal: Build roll workflow into spellcasting/combat UI when those features are developed.

---

## CH2b — Spellcaster Chapter
- Gap: Fixed DC handling not modeled
  - **SCHEMA ADDED**: `casterCheck.vs` and `targetSave.vs` now support `{ fixedDC: number }`.
  - Evidence: Fly uses DC 15 Spell Check.
  - Impact: P2 → Schema ready

- Gap: Components metadata lacks structure
  - **SCHEMA ADDED**: `material` now supports structured object with `itemId`, `consumed`, `goldCost`.
  - Evidence: `material` was just a string; cannot express consumed/material id.
  - Impact: P2 → Schema ready
  - Implementation: `material?: string | { description, itemId?, consumed?, goldCost? }`

- Gap: Enhancement dependencies not encoded
  - **SCHEMA ADDED**: `requires?: string[]` added to `SpellEnhancement`.
  - Evidence: Black Hole requires Lingering.
  - Impact: P2 → Schema ready
  - Implementation: Add `id` and `requires` fields to enhancement definitions as needed.

- Gap: Shared roll across added targets not encoded
  - **SCHEMA ADDED**: `singleRollSharedAcrossTargets?: boolean` added to `SpellEffect`.
  - Evidence: Arcane Missiles uses same attack roll across targets.
  - Impact: P2 → Schema ready

---

## CH2c — Spells (Entries)
- Gap: Tag taxonomy alignment
  - **FIXED**: SpellTag type expanded to include all v0.10 tags (50+ tags across 7 categories).
  - Evidence: Rules list many tags; schema SpellTag union was partial/mismatched.
  - Impact: P2 (resolved)
  - Resolution: Updated `src/lib/rulesdata/schemas/spell.schema.ts` SpellTag union with categorized tags:
    - Physical Damage: Bludgeoning, Piercing, Slashing
    - Elemental: Air, Cold, Corrosion, Earth, Fire, Lightning, Water
    - Energy: Psychic, Radiant, Umbral, True
    - Conditions: Blinded, Burning, Charmed, Deafened, Exhaustion, Frightened, Paralyzed, Restrained, Stunned
    - Effect Types: Ailment, Cleansing, Curse, Death, Embolden, Enfeeble, Healing, Metamorphosis, Motion, Resurrection, Strike, Ward
    - Thematic: Blood, Chaos, Forge, Gravity, Illusion, Knowledge, Light, Madness, Plants, Scent, Sense, Shadow, Sound, Spirit, Thoughts, Time, Trap
    - Targeting: Communication, Emotions, Planes, Teleportation
    - Summoning: Summoning, Weapon
    - Mechanical: Antimagic, Concentration, Ritual
    - Legacy (backward compat): Thunder, Sonic, Acid, Poison, Necrotic, Force, Detection

- Gap: Repeated save modeling
  - Evidence: Many spells with repeated saves require structured metadata.
  - Impact: P2
  - Proposal: `targetSave.repeated?: boolean` (see §1).

---

## CH3 — General Rules
- Gap: Jump standing‑halved rounding explicit policy
  - Evidence: Standing jump halves max — rounding not explicit for spaces/feet.
  - Impact: P3
  - Proposal: Document rounding (round down for spaces; feet precise) and reflect in UI help.

- Gap: Falling/Collision tooltips
  - Evidence: Complex rules; UI may not expose aides.
  - Impact: P3
  - Proposal: Add helper text and examples in UI.
  - Files: UI help; no schema change.

---

## CH4 — Character Creation
- Gap: Initial Save Masteries rules not explicit in UI
  - Evidence: CH4 references Save Masteries; initialization rules unspecified in current docs.
  - Impact: P2
  - Proposal: Document/implement initial allocation or defaults; wire to step gating.

- Gap: Starting equipment selection & training validation in flow
  - Evidence: Starting equipment in CH4/CH6; validation separate.
  - Impact: P2
  - Proposal: Add startingEquipment schema (see §5); integrate into CH4 step with training validation.
  - Files: `src/lib/rulesdata/schemas/class.schema.ts` (add optional), UI flow stage integration.

---

## CH5 — Ancestries
- Gap: Trait requirements structure
  - **SCHEMA ADDED**: Added `TraitRequirements` interface to `character.schema.ts`.
  - Evidence: `prerequisites?: string[]` was unstructured; textual in data.
  - Impact: P2 → Schema ready for data population
  - Implementation:
    - `TraitRequirements` interface with: size, hasTrait, prohibitsTraits, hasAllTraits, choices, minLevel, ancestry
    - Added optional `requirements?: TraitRequirements` field to `Trait` interface
    - Marked old `prerequisites` as deprecated for migration

- Gap: Dual ancestry constraints enforcement
  - Evidence: Prose rules only.
  - Impact: P2
  - Proposal: Enforce via UI validator; add config toggles for variant rules.
  - Note: Can leverage new `TraitRequirements.ancestry` field for validation.

---

## CH6 — Classes (Comprehensive Audit)

### Global Class Gaps

#### Gap: Missing Level 5 and Level 8 (Capstone) Features — ALL 13 CLASSES
- Evidence: All 13 progression files contain `classFeatures: [] // Level 5 class feature to be added` at L5 and `classFeatures: [] // Capstone feature to be added` at L8.
- Impact: P2 (incomplete progression display, missing features at key levels)
- Proposal: Add placeholder features to all classes; see `patches/all_classes_placeholders.md`
- Files affected:
  - All `*_features.ts` files (add placeholder feature entries)
  - All `*.progression.ts` files (reference placeholder IDs)

| Class | L5 Gap | L8 Gap |
|-------|--------|--------|
| Barbarian | ✅ Missing | ✅ Missing |
| Bard | ✅ Missing | ✅ Missing |
| Champion | ✅ Missing | ✅ Missing |
| Cleric | ✅ Missing | ✅ Missing |
| Commander | ✅ Missing | ✅ Missing |
| Druid | ✅ Missing | ✅ Missing |
| Hunter | ✅ Missing | ✅ Missing |
| Monk | ✅ Missing | ✅ Missing |
| Rogue | ✅ Missing | ✅ Missing |
| Sorcerer | ✅ Missing | ✅ Missing |
| Spellblade | ✅ Missing | ✅ Missing |
| Warlock | ✅ Missing | ✅ Missing |
| Wizard | ✅ Missing | ✅ Missing |

#### Gap: Missing startingEquipment — 9 CLASSES
- Evidence: Only Monk, Rogue, Sorcerer, Spellblade have `startingEquipment` blocks; remaining 9 classes have none.
- Impact: P2 (character creation incomplete, no starting gear display)
- Proposal: Add startingEquipment blocks to all missing classes per CH4/CH6 rules.
- Files affected:
  - `barbarian_features.ts` — add startingEquipment
  - `bard_features.ts` — add startingEquipment
  - `champion_features.ts` — add startingEquipment
  - `cleric_features.ts` — add startingEquipment
  - `commander_features.ts` — add startingEquipment
  - `druid_features.ts` — add startingEquipment
  - `hunter_features.ts` — add startingEquipment
  - `warlock_features.ts` — add startingEquipment
  - `wizard_features.ts` — add startingEquipment

| Class | Has startingEquipment | Notes |
|-------|----------------------|-------|
| Barbarian | ❌ Missing | Add per martial template |
| Bard | ❌ Missing | Add with spell focus |
| Champion | ❌ Missing | Add per martial template |
| Cleric | ❌ Missing | Add with holy symbol |
| Commander | ❌ Missing | Add per martial template |
| Druid | ❌ Missing | Add with druidic focus, non-metal armor |
| Hunter | ❌ Missing | Add per martial template |
| Monk | ✅ Present | Has placeholder packs |
| Rogue | ✅ Present | Has placeholder packs |
| Sorcerer | ✅ Present | Has placeholder packs |
| Spellblade | ✅ Present | Has placeholder packs |
| Warlock | ❌ Missing | Add with spell focus |
| Wizard | ❌ Missing | Add with arcane focus |

#### Gap: Placeholder "Adventuring Packs Coming Soon" text
- Evidence: 4 classes with startingEquipment have `packs: 'X or Y Packs (Adventuring Packs Coming Soon)'`
- Impact: P3 (UX/documentation clarity)
- Proposal: Leave as-is until adventuring packs system is implemented; document as known placeholder.

### Per-Class Specific Gaps

- Gap: Psion class present (not in rules)
  - Evidence: `features/psion_features.ts`, `progressions/psion.progression.ts` exist; loader ignores due to metadata whitelist.
  - Impact: P3 (dead code/confusion)
  - Proposal: Remove or move to `archive/` (or hide behind explicit experimental flag) and add CI validation to flag classes without metadata.

- Gap: spellRestrictions audit vs v0.10 taxonomy
  - Evidence: New schools/tags; classes must match.
  - Impact: P2
  - Proposal: Audit and adjust restrictions; add tests.
  - Files: `src/lib/rulesdata/classes-data/features/*_features.ts` (restrictions), `src/lib/rulesdata/spells-data/*` (taxonomy), tests.

- Gap: Resolver/Calculator normalization
  - Evidence: Ensure resolver outputs align with calculator budgets/unlocked IDs and pending choices.
  - Impact: P2
  - Proposal: Harmonize DTOs; doc contract in CALC/CLASSES docs.
  - Files: `src/lib/rulesdata/classes-data/classProgressionResolver.ts`, `src/lib/types/effectSystem.ts` (levelBudgets/resolvedFeatures), CALC/CLASS docs.

---

## Background System
- Gap: Conversions exposure and overspend prevention
  - **ALREADY IMPLEMENTED**: Full implementation exists.
  - Evidence: Background.tsx shows per-pool remaining, highlights negative in red, displays validation errors.
  - Impact: P1 → Resolved
  - Implementation:
    1. Calculator outputs `POINTS_OVERBUDGET` validation errors
    2. Background UI shows remaining per tab: `Skills ({remaining} left)`
    3. Tabs turn red (`text-destructive`) when remaining < 0
    4. `<InlineError>` component displays validation errors
    5. Step progression blocked until exact spend (`hasExactlySpentAllSkillPoints` etc.)
    6. Conversion buttons check remaining before allowing conversion
  - Files: `Background.tsx`, `enhancedCharacterCalculator.ts`, `CharacterCreation.tsx`

## Trades System
- Gap: Tool requirement enforcement
  - Evidence: Prose rules; not always surfaced.
  - Impact: P2
  - Proposal: Add tool flags to trade entries; UI applies DisADV when absent.
  - Files: `src/lib/rulesdata/trades.ts` (tools field), UI check gates.

## Traits System
- Gap: any_* coverage and new patterns
  - Evidence: Limited patterns supported.
  - Impact: P2
  - Proposal: Extend resolveEffectChoices for future any_* as needed; document.
  - Files: `src/lib/services/enhancedCharacterCalculator.ts` (resolveEffectChoices), docs update.

## Spells System
- See CH2b/CH2c gaps.

## Martials System
- Gap: Effect resolution metadata for maneuvers that impose effects
  - Impact: P2
  - Proposal: Mirror spell resolution metadata (see §1).
  - Files: `src/lib/rulesdata/schemas/maneuver.schema.ts` (optional additions), maneuvers data as needed.

## Equipment System
- Gap: Property semantics vs CH3 lists
  - Impact: P2
  - Proposal: Audit options vs CH3; adjust or annotate properties.
  - Files: `src/lib/rulesdata/equipment/options/*`, `docs/systems/EQUIPMENT_SYSTEM.MD` vs CH3.

## Calculation System
- Gap: Prime tie‑break order explicitness
  - Evidence: Rules list order; verify implementation.
  - Impact: P2
  - Proposal: Document and verify; add unit test for ties.
  - Files: `src/lib/services/enhancedCharacterCalculator.ts`, tests.

## Character Sheet
- Gap: Info/Tooltips coverage for complex rules (falling/collision, MCP/DAS)
  - Impact: P3
  - Proposal: Add help text sections and links to rule references.

## PDF Export
- Gap: Template field drift risk
  - Impact: P2
  - Proposal: Validate field IDs on template updates; maintain manifest.

## Effects System
- Gap: Condition interaction value mismatch
  - **FIXED**: Updated EFFECT_SYSTEM.MD to match schema (string union: 'advantage'|'reduction'|'half').
  - Evidence: EFFECT_SYSTEM.MD previously showed numeric values; character.schema.ts uses string union.
  - Impact: P1 → P3 (documentation aligned)
  - Resolution: Updated docs to reflect actual schema types; noted that conditionAggregator doesn't yet process value field.

- Gap: Legacy vs canonical effect definitions
  - **DOCUMENTED**: Added Schema Alignment Notes section to EFFECT_SYSTEM.MD.
  - Evidence: `src/lib/rulesdata/schemas/class.schema.ts` effectSchema (generic) vs canonical Effect union in `character.schema.ts`.
  - Impact: P2 → P3 (documented as intentional decoupling)
  - Resolution: Documented the relationship; stricter Zod schema is a future consideration.

## Data & Naming
- Gap: Possible filename typo in conditions data
  - **FIXED**: `src/lib/rulesdata/conditions/conditions.data.ts` — filename typo corrected.
  - Impact: P3
  - Proposal: Rename file to consistent pattern and update imports.

## Leveling/Multiclass
- Gap: Prereq counts for multiclass tiers
  - Impact: P2
  - Proposal: Implement owned feature counts and gating with clear messaging.

## Creation Flow/Feature IDs
- Gap: Validation script to enforce feature ID uniqueness across features/progressions
  - Impact: P2
  - Proposal: Add or document existing script; integrate in CI.

---

## Prioritization Summary
- P1: Components metadata enforcement (spell materials), MSL/SSL + declare‑before‑roll enforcement, Effects System condition value schema mismatch, Background overspend prevention.
- P2: Effect resolution normalization, enhancement dependencies/shared roll flags, trait requirements structure, starting equipment schema (9 classes), Level 5/8 features (all 13 classes), spellRestrictions audit, tool gating, resolver alignment, multiclass prereqs gating.
- P3: Docs drift updates (Save DC baseline), rounding clarifications, tooltip coverage, Psion archival, adventuring packs placeholder.

## Action Items Summary

### Immediate (P1/P2 High Priority)
1. Add Level 5 and Level 8 placeholder features to all 13 classes
2. Add startingEquipment to 9 missing classes
3. Enforce MSL/SSL in UI
4. Fix Effects System condition value schema mismatch

### Deferred (P2/P3)
1. Update ONTOLOGY.md Save DC baseline
2. Archive or flag Psion class
3. Implement adventuring packs system to replace placeholders

## Next Steps
1) Approve schema proposals (schema-gap-proposals.md).
2) Apply class patches (see patches/all_classes_placeholders.md).
3) Implement P1 guardrails in UI and adjust schemas (where needed) with non‑breaking additions.
4) Add targeted unit/UX tests for P1/P2 areas.
5) Update docs (Ontology, tags taxonomy) to remove drift.
