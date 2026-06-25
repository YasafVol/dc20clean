# v0.10 Mapping Process Review

Last Updated: 2026-05-08

## Purpose

This review reconstructs the intent and process behind the prior v0.10 mapping work in `docs/assets/mapping/`, then translates it into a reusable v0.10.5 and future rules-update-to-schema workflow.

The highest-signal conclusion: the v0.10 mapping folder is a traceability layer between rules text, system docs, app data schemas, feature flows, calculator/export behavior, stable IDs, and implementation tasks. It is not only a rules diff. For v0.10.5, the existing extraction and audit artifacts provide the source and first-pass classification, but they still need the same human-reviewed mapping layer before rules data or runtime behavior should change.

## Local Artifacts Inspected

Prior v0.10 mapping artifacts:

- `docs/assets/mapping/context.md`
- `docs/assets/mapping/todo.md`
- `docs/assets/mapping/README.md`
- `docs/assets/mapping/systems-catalog.md`
- `docs/assets/mapping/insights.md`
- `docs/assets/mapping/schemas-by-system.md`
- `docs/assets/mapping/schema-inventory.md`
- `docs/assets/mapping/feature-system-map.md`
- `docs/assets/mapping/gap-analysis.md`
- `docs/assets/mapping/classes-audit.md`
- `docs/assets/mapping/feature-validation-report.md`
- `docs/assets/mapping/feature-classification-map.md`
- `docs/assets/mapping/schema-gap-proposals.md`
- `docs/assets/mapping/ids-stability.md`
- `docs/assets/mapping/validation-scaffold.md`
- `docs/assets/mapping/patches/all_classes_placeholders.md`
- `docs/assets/mapping/patches/spellblade_placeholders.md`

v0.10.5 artifacts:

- `docs/assets/dc20-0.10.5/README.md`
- `docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md`
- `docs/assets/dc20-0.10.5/chunks.json`
- `docs/assets/dc20-0.10.5/page-index.json`
- `docs/assets/dc20-0.10.5/CLEANUP_REPORT.md`
- `docs/assets/dc20-0.10.5/CHANGE_AUDIT.md`
- `docs/assets/dc20-0.10.5/DATA_SHAPE_REVIEW.md`
- `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`

Supporting scripts inspected:

- `scripts/dc20-105-clean-md.mjs`
- `scripts/dc20-105-audit-scaffold.mjs`

## Reconstructed v0.10 Workflow

### Inputs

The v0.10 mapping used these input classes:

- Primary rules source: `docs/assets/DC20 0.10 full.md`.
- Repository system specs: `docs/systems/**`, especially calculation, effects, class, ancestry, background, leveling, spells, martials, equipment, character sheet, PDF export, database, and feature ID docs.
- App implementation touchpoints:
  - `src/lib/rulesdata/**`
  - `src/lib/rulesdata/schemas/**`
  - `src/lib/services/enhancedCharacterCalculator.ts`
  - `src/lib/types/effectSystem.ts`
  - `src/routes/character-creation/**`
  - `src/routes/character-sheet/**`
  - `src/lib/pdf/**`
- Stable ID and migration assumptions from feature IDs, class feature IDs, spell IDs, maneuver IDs, trait IDs, equipment property IDs, and loader references.

### Produced Artifacts

The mapping produced a layered set of artifacts:

- `context.md`: goal, scope, constraints, exclusions, working definitions, phases, and success criteria.
- `todo.md`: chunked work tracker with resumable discovery IDs and completion state.
- `systems-catalog.md`: rules and app systems with inputs, outputs, invariants, dependencies, key files, and open questions.
- `insights.md`: discovery notes by chunk, using IDs like `DISC-CH1`, `DISC-CH2b`, `DISC-SYS-SPELLS`.
- `schemas-by-system.md` and `schema-inventory.md`: schema/type inventory tied back to systems.
- `feature-system-map.md`: user-visible features mapped to systems, UI code, services, schemas, and acceptance stubs.
- `gap-analysis.md`: prioritized rule-vs-code discrepancies.
- `classes-audit.md` and `feature-validation-report.md`: deep class and feature validation against rules.
- `feature-classification-map.md`: classification of passive crunch, active crunch, fluff, UI coverage, calculator coverage, and sheet coverage.
- `schema-gap-proposals.md`: concrete additive schema proposals that later became implemented work.
- `ids-stability.md`: stable IDs and reference surfaces that must not be casually renamed.
- `validation-scaffold.md`: acceptance/test targets for future implementation.
- `patches/*.md`: implementation-oriented patch plans for missing class features and Spellblade-specific work.

### What The Mapping Connected

The mapping joined six different layers that should stay linked in future rules updates:

- Rules text: chapter sections, formulas, spell/maneuver/class prose, changelog items, and source line/page references.
- System model: named systems with boundaries, dependencies, invariants, and outputs.
- App data: rulesdata catalogs for classes, progressions, spells, maneuvers, ancestries, traits, equipment, skills, trades, and languages.
- Schemas and IDs: Zod/type contracts, discriminants, enums, stable IDs, and references across loaders/UI/tests.
- Runtime behavior: calculator stages, effect resolution, progression budgets, spell/maneuver assignment, storage, PDF export, and character sheet display.
- Implementation gates: HITL requirements, additive schema proposals, migration risks, validation/test stubs, and patch plans.

The important process insight is that v0.10 did not jump directly from rules prose to data edits. It first created a system map, then a schema map, then a feature map, then gap analysis, then implementation proposals.

## Deterministic vs Manual/HITL Work

### Deterministic Or Mostly Deterministic

- Build heading/chapter indexes from the rules markdown.
- Split rules into stable chunks with IDs and line ranges.
- Count terms such as `HP`, `SP`, `MP`, `AP`, `PD`, `AD`, `Save DC`, `Maneuver`, and `Spell`.
- Inventory source files and schema/type files by path.
- Classify obvious systems from paths and headings.
- Identify stable ID-bearing datasets.
- Detect new/missing headings or large numeric/table differences.
- Generate scaffold entries with source references, likely systems, likely code touchpoints, and system docs to update.
- Create repeatable acceptance-check shells per system or feature.

### HITL Or Manual

- Decide whether a rules text change actually affects app behavior.
- Interpret renamed, removed, rewritten, or rebalanced spells/features.
- Preserve backward compatibility for saved-character IDs and aliases.
- Decide whether prose-only changes should update app-rendered descriptions.
- Confirm formulas and edge cases where headings changed but semantics did not.
- Prioritize changes across data-only, calculator, UI, export, and storage work.
- Approve destructive removals or migration behavior.
- Convert free-text rules into structured effect metadata.

The v0.10 process treated HITL as a gate, not a failure. That convention should be preserved for v0.10.5.

## Reusable Conventions

These file shapes and conventions are worth reusing:

- Use stable chunk IDs:
  - v0.10 used discovery IDs like `DISC-CH2b` and `DISC-SYS-CALC`.
  - v0.10.5 already uses generated chunk IDs like `dc20-105-2001`.
- Keep a `context`/review file that defines goals, scope, exclusions, assumptions, and success criteria.
- Keep a task tracker with resumable status, source ranges, and notes.
- Keep system rows in a consistent shape: inputs, outputs, invariants, dependencies, key files, open questions, schemas, services, and acceptance checks.
- Keep feature rows in a consistent shape: systems, UI/code, schemas, data, services, notes, and acceptance checks.
- Track ID stability explicitly before renames/removals.
- Prefer additive schema extensions before data population or UI use.
- Separate broad audit scaffolds from implementation queues.
- Treat patch artifacts as reference plans until implemented.
- Update relevant `docs/systems/*.MD` when shipped code changes behavior, data flow, or architecture.

## v0.10.5 Comparison

The v0.10.5 folder already has stronger extraction scaffolding than the v0.10 mapping started with:

- `README.md` documents the Docling extraction, deterministic cleanup, optional Ollama review, audit scaffold generation, and rules for not updating app data from extraction alone.
- `DC20 0.10.5 clean.md` is the cleaned rules source with page markers.
- `chunks.json` contains 2,021 semantic chunks with line/page ranges, metrics, term counts, and review flags. The inspected summary showed 52 chunks flagged for human review, mostly tables.
- `CHANGE_AUDIT.md` contains 1,247 scaffolded audit entries across 13 systems, with source references, likely code touchpoints, docs to update, category, and HITL status.
- `DATA_SHAPE_REVIEW.md` answers the first schema/storage question: v0.10.5 does not currently require a confirmed breaking `SavedCharacter` or `CharacterState` change, but should add optional `rulesVersion` metadata as the forward-compatible routing spine.
- `CHANGELOG_RECONSTRUCTION.md` narrows the overly broad audit into a changelog-confirmed cut list: class progression/resource tables, named class feature deltas, maneuvers, spell rename/remove/add/tag work, equipment property changes, character creation starting resources, and ancestry trait changes.

The gap is that v0.10.5 has extraction and scaffold artifacts, but does not yet have the full v0.10-style mapping layer:

- No v0.10.5 systems catalog delta.
- No v0.10.5 schemas-by-system delta.
- No feature-to-system implementation queue in the v0.10 shape.
- No ID stability/alias plan for renamed and removed spells/features.
- No validation scaffold grouped by implementation task.
- `CHANGE_AUDIT.md` is still too broad to function as the direct implementation queue.

## Lessons For v0.10.5

- Start from `CHANGELOG_RECONSTRUCTION.md`, not from all 1,247 `CHANGE_AUDIT.md` entries.
- Keep `CHANGE_AUDIT.md` as a ledger, then create a smaller implementation queue grouped by system and feature.
- Use `DATA_SHAPE_REVIEW.md` as the first gate: add rules-version routing metadata before mutating rules assets.
- Treat class progression/resource tables as foundational because they feed leveling, calculator output, character creation, character sheet, and PDF export.
- Treat spell renames/removals/additions as migration-sensitive, not simple data edits.
- Treat maneuver rewrites and cost changes as structured data and display changes, with HITL for exact mechanics.
- Treat copy/typo/layout changes as no-op unless the app renders the affected prose.
- Keep v0.10 behavior stable until versioned runtime/storage/export routing exists.

## Proposed Reusable Utility Stages

This could become a reusable `rules-update <> schema mapping` utility with these stages:

1. Source ingestion

- Inputs: new rules PDF/Markdown, prior rules Markdown, optional changelog, system docs, app touchpoint manifest.
- Outputs: cleaned Markdown, page index, chunks, cleanup report.

2. Deterministic chunk and heading index

- Inputs: cleaned Markdown.
- Outputs: chunk IDs, headings, line/page ranges, table flags, term counts, numeric signatures, source anchors.

3. System classification

- Inputs: chunks, system keyword maps, known code touchpoints, system docs.
- Outputs: system-scoped audit entries with likely app impact and docs to update.

4. Changelog-first cut list

- Inputs: changelog section, chunks, audit ledger.
- Outputs: prioritized list of confirmed implementation areas and entries to defer/no-op.

5. Schema and ID impact scan

- Inputs: app schemas, rulesdata files, saved-character contracts, stable ID conventions.
- Outputs: schema deltas, ID rename/removal risks, alias/migration needs, additive-vs-breaking recommendation.

6. Feature and runtime mapping

- Inputs: cut list plus app feature map.
- Outputs: per-feature implementation rows covering UI, calculator, storage, PDF export, docs, and tests.

7. HITL classification

- Inputs: ambiguous entries, renamed/removed/reworked content, numeric formula changes.
- Outputs: approved implementation tasks, no-op entries, deferred entries, migration decisions.

8. Implementation package generation

- Inputs: approved tasks.
- Outputs: small patches or task briefs grouped by dependency order, with affected files and validation commands.

9. Validation scaffold

- Inputs: implementation package and system docs.
- Outputs: focused unit/data tests, calculator checks, UI acceptance checks, PDF/export checks, docs update checklist.

## Parallelizable Slices And Dependencies

| Slice                           | Can Run In Parallel?                    | Depends On                                     | Output                                 |
| ------------------------------- | --------------------------------------- | ---------------------------------------------- | -------------------------------------- |
| Extraction cleanup              | No, first stage                         | Source PDF/Markdown                            | Clean rules source, page index, chunks |
| Chunk metrics and heading index | Yes after cleanup                       | Clean rules source                             | Chunk inventory and flags              |
| Changelog reconstruction        | Yes after cleanup                       | Changelog chunks                               | High-impact cut list                   |
| System classification           | Yes after chunks                        | Chunk inventory, system maps                   | System-scoped audit entries            |
| Schema inventory refresh        | Yes anytime                             | Codebase                                       | Current schemas and ID surfaces        |
| Class progression audit         | Yes after cut list                      | Changelog, class tables, class data            | Progression/resource delta tasks       |
| Spell catalog audit             | Yes after cut list                      | Changelog, spell sections, spell data          | Rename/remove/add/tag tasks            |
| Maneuver audit                  | Yes after cut list                      | Changelog, maneuver sections, maneuver data    | Cost/rewrite/new maneuver tasks        |
| Equipment audit                 | Yes after cut list                      | Changelog, equipment sections/data             | Property cost/requirement tasks        |
| Ancestry/trait audit            | Yes after cut list                      | Changelog, trait sections/data                 | Trait availability/effect tasks        |
| Rules-version schema routing    | No, should precede data mutation        | `DATA_SHAPE_REVIEW.md`, database/storage specs | Additive routing task                  |
| HITL approval                   | Blocks ambiguous implementation         | Audit slices                                   | Approved/no-op/deferred task statuses  |
| Implementation                  | Parallel by system after gates          | Approved tasks, version routing                | Code/data/docs changes                 |
| Validation                      | Parallel by system after implementation | Code changes                                   | Focused tests and manual checks        |

Dependency rule: version routing and ID/migration decisions should happen before mutating rules data that could affect saved characters.

## Concrete Next Implementation Steps

1. Add a small v0.10.5 implementation queue file derived from `CHANGELOG_RECONSTRUCTION.md`, not from raw `CHANGE_AUDIT.md`.
2. Keep `AUDIT-001` and `AUDIT-002` as the first engineering gate: optional `rulesVersion` metadata and saved-character compatibility confirmation.
3. Create a v0.10.5 ID stability and alias plan for renamed/removed spells and renamed/removed class features.
4. Split the changelog-confirmed work into five parallel audit packages:
   - Class progression and named class features.
   - Spell catalog renames/removals/additions/tags/sources.
   - Maneuver costs, rewrites, and `Scattershot`.
   - Equipment property costs and requirements.
   - Character creation starting resources and `Hazardous Hide`.
5. For each package, produce v0.10-style rows with:
   - source page/line/chunk
   - v0.10 baseline reference if needed
   - current app file references
   - schema/ID impact
   - calculator/export/storage impact
   - HITL status
   - acceptance checks
6. Only after HITL classification, update rules data and runtime behavior.
7. In every implementation change, update the matching `docs/systems/*.MD` specs when behavior, data flow, or architecture changes.

## Recommended Utility Output Files

For v0.10.5, the reusable utility should produce these files, matching the old mapping pattern while keeping implementation work focused:

- `docs/assets/dc20-0.10.5/MAPPING_PROCESS_REVIEW.md` - this reconstruction and utility plan.
- `docs/assets/dc20-0.10.5/IMPLEMENTATION_QUEUE.md` - changelog-confirmed, grouped implementation tasks.
- `docs/assets/dc20-0.10.5/ID_STABILITY_AND_ALIASES.md` - renamed/removed IDs, aliases, and saved-character compatibility notes.
- `docs/assets/dc20-0.10.5/VALIDATION_SCAFFOLD.md` - tests and manual checks by package.
- Optional package-specific audit files if the queue becomes too large:
  - `CLASS_PROGRESSION_AUDIT.md`
  - `SPELL_CATALOG_AUDIT.md`
  - `MANEUVER_AUDIT.md`
  - `EQUIPMENT_AUDIT.md`
  - `ANCESTRY_TRAIT_AUDIT.md`

The key reuse pattern is stable traceability: every implementation task should connect a rules source, a system, code/data touchpoints, schema/ID impact, runtime/export/storage impact, HITL status, and validation.
