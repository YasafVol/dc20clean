# Repository Guidelines

> Last Updated: 2026-07-21

## Documentation Authority

1. The active specifications in `docs/systems/` are authoritative for system behavior, ownership, boundaries, and maintenance guidance.
2. This file is only a governance and routing document. Do not copy volatile facts such as catalog counts, implementation status, formulas, or detailed file maps into it.
3. Use source inspection to verify concrete implementation details after the relevant system docs have scoped the work.
4. If an active system doc conflicts with source behavior, treat the document as stale and update it in the same change.

## Required Workflow

1. Before planning or implementing a non-trivial change:
   1. Identify the affected systems using the routing section below.
   2. Read each affected system doc.
   3. Inspect the referenced source and tests.
2. After changing behavior, data flow, ownership, or architecture:
   1. Update every affected `docs/systems/*` specification in the same change.
   2. Refresh its `Last Updated: YYYY-MM-DD` field.
   3. Keep its boundary metadata accurate: `Purpose`, `Owns`, `Does not own`, `Authoritative source`, and `Related systems`.
3. Do not leave active system docs stale relative to shipped code.

## Stable Read Routing

1. Tests and quality:
   1. Read `TESTING_SYSTEM.MD`.
   2. Then read the system doc for the behavior under test.
2. Class features:
   1. Read `CLASS_SYSTEM.MD`.
   2. Read `EFFECT_SYSTEM.MD` and `CALCULATION_SYSTEM.MD` when effects or derived values change.
   3. Read `FEATURE_ID_NAMING_CONVENTION.md` when IDs change.
3. Ancestries and traits:
   1. Read `ANCESTRY_SYSTEM.MD` and `TRAITS_SYSTEM.MD`.
   2. Read `EFFECT_SYSTEM.MD` when trait effects change.
4. Character calculations:
   1. Read `CALCULATION_SYSTEM.MD` and `EFFECT_SYSTEM.MD`.
5. Spells:
   1. Read `SPELLS_SYSTEM.MD`.
   2. Read `CLASS_SYSTEM.MD` and `CALCULATION_SYSTEM.MD` when access or budgets change.
6. Maneuvers:
   1. Read `MARTIALS_SYSTEM.MD`.
   2. Read `LEVELING_SYSTEM.MD` and `CLASS_SYSTEM.MD` when access or budgets change.
7. Background skills, trades, and languages:
   1. Read `BACKGROUND_SYSTEM.MD` and `CALCULATION_SYSTEM.MD`.
8. Character creation flow:
   1. Read `CHARACTER_CREATION_FLOW.MD`.
   2. Read the docs for every stage or subsystem affected by the change.
9. Leveling and multiclassing:
   1. Read `LEVELING_SYSTEM.MD`, `CLASS_SYSTEM.MD`, and `CHARACTER_CREATION_FLOW.MD`.
10. Character sheet:
    1. Read `CHARACTER_SHEET.MD`.
    2. Read `CALCULATION_SYSTEM.MD` when displaying or mutating calculated values.
11. Equipment builder:
    1. Read `EQUIPMENT_SYSTEM.MD`.
    2. Read `EFFECT_SYSTEM.MD` when equipment effects change.
12. Conditions:
    1. Read `CONDITIONS_SYSTEM.MD`.
    2. Read `EFFECT_SYSTEM.MD` and `CHARACTER_SHEET.MD` when condition interactions or sheet behavior change.
13. Monster tools:
    1. Read `MONSTER_SYSTEM_SPEC.MD` and `DATABASE_SYSTEM.MD`.
14. Encounter tools:
    1. Read `ENCOUNTER_SYSTEM_SPEC.MD`, `MONSTER_SYSTEM_SPEC.MD`, and `DATABASE_SYSTEM.MD`.
15. Campaigns:
    1. Read `CAMPAIGN_SYSTEM.MD`, `DATABASE_SYSTEM.MD`, and `CHARACTER_SHEET.MD`.
16. Storage and persistence:
    1. Read `DATABASE_SYSTEM.MD`.
    2. Read `VERSIONING_SYSTEM.MD` when compatibility or migration behavior changes.
17. PDF export:
    1. Read `PDF_EXPORT_SYSTEM.MD` and `CALCULATION_SYSTEM.MD`.
    2. Read `VERSIONING_SYSTEM.MD` when routing or compatibility changes.
18. Versioning, migrations, compatibility, and rules upgrades:
    1. Read `VERSIONING_SYSTEM.MD`, `DATABASE_SYSTEM.MD`, and `PDF_EXPORT_SYSTEM.MD`.
19. Rulebook:
    1. Read `RULEBOOK_SYSTEM.MD`.
20. Repository-wide architecture, tooling, or composition:
    1. Read `PROJECT_TECHNICAL_OVERVIEW.MD`.

All paths above are relative to `docs/systems/`.

## Documentation Definition of Done

1. The implementation and focused tests are complete.
2. Every affected active system doc reflects the shipped behavior and current ownership boundary.
3. Boundary metadata and `Last Updated` fields are current.
4. Related system docs agree on shared flows and contracts.
5. Historical plans remain evidence only and are not presented as active specifications.

## Coding and Review Expectations

1. Use Conventional Commits.
2. Keep changes focused and avoid unrelated refactors.
3. Never commit secrets from `.env`, `.env.local`, or similar files.
