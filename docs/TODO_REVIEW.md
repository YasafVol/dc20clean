# Documentation TODO Review

> Status: Active execution tracker
> Last Updated: 2026-07-12

## 1. Scope and scoring

1. This tracker covers executable TODOs in active `docs/systems/` specs, `docs/assets/mapping/todo.md`, and `docs/ASSET_AND_CODE_STRUCTURE_TODO.md`.
2. Generated rulebook artifacts, historical audits, redesign plans, and superseded planned specs are evidence, not active backlog.
3. Confidence measures requirement clarity and repo readiness, not business priority.
   1. **High (80-100):** acceptance behavior and owning system are clear enough to implement.
   2. **Medium (60-79):** direction is clear, but data or UX decisions remain.
   3. **Low (<60):** a product, policy, or architecture decision is still required.

## 2. High-confidence work

1. **[Complete] Load-character ordering coverage — 98/100**
   1. Source: `TESTING_SYSTEM.MD` section 5.2.
   2. Requirements: prove `lastModified`, then `completedAt`, then `createdAt` fallback ordering; prove an import becomes first without reload.
   3. First implementation: `e2e/18-load-character-ordering.e2e.spec.ts`.
2. **[Complete] Full maneuver-card flow from known sheet rows — 90/100**
   1. Source: `CHARACTER_SHEET.MD` Maneuver Sheet Notes.
   2. Requirements completed: reuse the Martial Manual presentation model; keep Use directly available; disable mutation for locked legacy characters; resolve old saved rows by catalog name.
3. **[Complete] Attack presentation helper for Rage — 88/100**
   1. Sources: `CHARACTER_SHEET.MD`, `EFFECT_SYSTEM.MD`, and `CLASS_SYSTEM.MD`.
   2. Requirements completed: classify Unarmed Strike explicitly and catalog weapons through equipment metadata; treat unknown/custom rows as ineligible unless they carry explicit melee metadata; apply active conditional effects for display only; do not rewrite persisted damage strings.
4. **[Complete] Spell presentation helper — 86/100**
   1. Sources: `CHARACTER_SHEET.MD` and `EQUIPMENT_SYSTEM.MD`.
   2. Requirements completed: pure helper input is saved spell + calculation + active effects + equipped focus effects; output owns check, damage, range, and play-note presentation; locked legacy sheets may render stored values but cannot replace spells.
5. **[Complete] Active-condition effects summary — 85/100**
   1. Sources: `CONDITIONS_SYSTEM.MD` and `CHARACTER_SHEET.MD`.
   2. Requirements completed: summarize non-roll mechanics with source condition, timing, and unresolved player action; do not simulate targets, turns, forced movement, or damage application.
6. **[Complete] Cleric Dark/Knowledge domain E2E — 84/100**
   1. Source: `TESTING_SYSTEM.MD` section 6.
   2. Requirements are already explicit. Keep rule permutations in unit tests and use E2E only for creation, persistence, and sheet visibility.
7. **[Complete] Equipment preset search/filter — 82/100**
   1. Source: `EQUIPMENT_SYSTEM.MD` section 10.
   2. Requirements completed: client-side name/type/property filter, no schema change, empty-state copy, and mobile-compatible controls.
8. **[Complete] Equipment duplicate/clone — 80/100**
   1. Source: `EQUIPMENT_SYSTEM.MD` section 10.
   2. Requirements completed: generate a new ID and timestamps, append `Copy` to the name, preserve mechanical fields, and open the duplicate for editing without mutating the source.

## 3. Medium-confidence work

1. **[Complete] Complex Feature Host / Wild Form — 78/100**: the Features tab hosts a session-only template/trait builder sourced from eligible Beastborn traits.
2. **[Complete] Central Effects / Rules Notes surface — 76/100**: the Features tab categorizes applied, collected, rules-only, and unsupported effects and exposes resolved Size.
3. **[Complete] Spellbook replacement flow — 74/100**: users can open the Spellbook for review and replace a row from calculator-valid options; locked sheets remain read-only.
4. **MSL/SSL in-play enhancement workflow — 72/100**: calculator limits exist; performed-action state and declare-before-roll interaction are not modeled.
5. **Populate `EffectResolution` spell data — 70/100**: schema exists; source mapping and completeness acceptance need an audit report.
6. **Populate ancestry `TraitRequirements` — 70/100**: schema exists; source mapping and choice-restriction semantics need an audit report.
7. **[Complete] Edit saved custom equipment — 68/100**: edits preserve the stable item ID; duplication remains the explicit save-copy path.
8. **Ancestry/traits subsystem split — 65/100**: desired boundary is documented; migration sequence and measurable payoff are not.
9. **Agentic QA next slice — 62/100**: tasks are listed; required gate policy, runtime budget, and CI ownership remain undecided.

## 4. Low-confidence or deferred work

1. **Party-gated login wall — 45/100**: requires an explicit product decision on anonymous access, allowlist ownership, and local-data migration.
2. **Full active-condition automation — 45/100**: several mechanics require encounter targets, turns, distances, and action declarations that the sheet does not model.
3. **True level-split multiclassing — 40/100**: explicitly future scope with unresolved progression and migration rules.
4. **Equipment sharing by URL/code — 40/100**: requires a sharing, authorization, and durability model.
5. **Monster/encounter export and conflict resolution — 40/100**: formats and merge semantics are unspecified.
6. **Asset/code structure review — 35/100**: perform only with a concrete pain point and success metric; a broad reorganization would create churn.
7. **Logging analytics/Sentry rollout — 35/100**: `LOGGING_SPEC.md` is stale relative to the implemented logger; provider, privacy, environment, and alerting decisions are missing.

## 5. Reconciled stale items

1. Character-sheet JSON/PDF export E2E is implemented in `e2e/16-character-sheet-export.e2e.spec.ts`.
2. Creation final-action E2E is implemented in `e2e/17-character-creation-final-actions.e2e.spec.ts`.
3. Selected class/subclass/path/talent feature display is implemented; it is no longer a Character Sheet TODO.
4. Old unchecked `CHARACTER_SHEET_REDESIGN_PLAN.md`, `plannedSpecs/CONDITIONS_SPEC.md`, and logger bootstrap checklists must not be treated as current execution state without a fresh code audit.
