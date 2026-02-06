# Repository Guidelines

> Last updated: 2026-02-04

## Rule

Before planning or implementing any feature, identify the relevant system(s) and read the matching spec(s) in `docs/systems/`.

After completing any feature fix/implementation that changes behavior, data flow, or architecture:

- Update the relevant `docs/systems/*.MD` spec(s) in the same change.
- Add/refresh a `Last Updated: YYYY-MM-DD` timestamp in each updated system doc.
- Do not leave system docs stale relative to shipped code.

## Storage and Environment Truth

- Storage is hybrid:
  - `localStorage` is active and default.
  - Convex cloud storage is active when `VITE_USE_CONVEX=true` and `VITE_CONVEX_URL` is configured.
- `.env.local` is intentionally untracked and must be created per machine.

## Quick Start

```bash
npm install
npm run dev
```

Optional Convex setup for cloud storage/auth:

```bash
npx convex dev --once
```

## System Docs Index

Use this table as the starting point for feature planning and impact checks.

| Doc                                            | Purpose                                             |
| ---------------------------------------------- | --------------------------------------------------- |
| `docs/systems/ANCESTRY_SYSTEM.MD`              | Ancestry selection and trait grants                 |
| `docs/systems/BACKGROUND_SYSTEM.MD`            | Background points, conversions, validation          |
| `docs/systems/CALCULATION_SYSTEM.MD`           | Derived stats and effect-driven calculations        |
| `docs/systems/CHARACTER_CREATION_FLOW.MD`      | End-to-end character creation workflow              |
| `docs/systems/CHARACTER_SHEET.MD`              | Character sheet architecture and behavior           |
| `docs/systems/CHARACTER_SHEET_SYNC_SPEC.md`    | Spells/maneuvers sync behavior on sheet             |
| `docs/systems/CLASS_SYSTEM.MD`                 | Class selection, features, subclass rules           |
| `docs/systems/DATABASE_SYSTEM.MD`              | Persistence architecture and storage adapters       |
| `docs/systems/EFFECT_SYSTEM.MD`                | Effect taxonomy and application model               |
| `docs/systems/ENCOUNTER_SYSTEM_SPEC.MD`        | DM encounter planner and budget system              |
| `docs/systems/EQUIPMENT_SYSTEM.MD`             | Equipment models, validation, custom builder        |
| `docs/systems/FEATURE_ID_NAMING_CONVENTION.md` | Stable ID naming constraints                        |
| `docs/systems/HUMAN_CLERIC_E2E_SPEC.md`        | Human Cleric end-to-end scenario spec               |
| `docs/systems/LEVELING_GAPS_SPEC.md`           | Archived leveling closure checklist                 |
| `docs/systems/LEVELING_SYSTEM.MD`              | Level-up flow, talents, multiclass integration      |
| `docs/systems/LOGGING_SYSTEM.MD`               | Logging and telemetry plan/status                   |
| `docs/systems/MARTIALS_SYSTEM.MD`              | Maneuvers and martial progression                   |
| `docs/systems/MONSTER_SYSTEM_SPEC.MD`          | DM monster lab and homebrew lifecycle               |
| `docs/systems/MULTICLASS_SYSTEM.MD`            | Legacy multiclass summary (see LEVELING_SYSTEM §10) |
| `docs/systems/ONTOLOGY.md`                     | Domain concepts and cross-system relationships      |
| `docs/systems/PDF_EXPORT_SYSTEM.MD`            | PDF generation pipeline and templates               |
| `docs/systems/PROJECT_TECHNICAL_OVERVIEW.MD`   | Stack, scripts, CI, architecture baseline           |
| `docs/systems/SPELLS_MANEUVERS_SPLIT_SPEC.md`  | Historical split implementation record              |
| `docs/systems/SPELLS_SYSTEM.MD`                | Spell rules, data model, and UI integration         |
| `docs/systems/TRAITS_SYSTEM.MD`                | Trait catalog and prerequisite validation           |
| `docs/systems/project_summary.md`              | Cross-system summary and representation matrix      |

## Feature Mapping Assets

- `docs/assets/mapping/feature-system-map.md` - feature to system/code mapping
- `docs/assets/mapping/README.md` - mapping index and workflow

## Coding and Review Expectations

- Use Conventional Commits.
- Keep changes focused and avoid unrelated refactors.
- Update relevant docs when behavior or architecture changes.
- Never commit secrets from `.env`, `.env.local`, or similar files.
