# Repository Guidelines

> Last updated: 2026-02-06

## Rule

Before planning or implementing any feature, identify the relevant system(s) and read the matching spec(s) in `docs/systems/`.

After completing any feature fix/implementation that changes behavior, data flow, or architecture:

- Update the relevant `docs/systems/*.MD` spec(s) in the same change.
- Add/refresh a `Last Updated: YYYY-MM-DD` timestamp in each updated system doc.
- Do not leave system docs stale relative to shipped code.

## Quick Start

```bash
npm install
npm run dev
```

Optional Convex setup for cloud storage/auth:

```bash
npx convex dev --once
```

- Storage is hybrid: `localStorage` by default, Convex cloud when `VITE_USE_CONVEX=true` and `VITE_CONVEX_URL` are set.
- `.env.local` is untracked and must be created per machine.

---

## System Docs

### Architecture and Cross-Cutting

Read these first for any feature work -- they define how data flows and how effects are applied across the entire app.

| Doc | What it covers | Key code |
| --- | --- | --- |
| `docs/systems/PROJECT_TECHNICAL_OVERVIEW.MD` | Tech stack (React 19, Vite 6, Tailwind 4), project structure, dev scripts, CI, PR guidelines, code style | repo-wide |
| `docs/systems/EFFECT_SYSTEM.MD` | Canonical effect type catalog, stacking rules, choice resolution, condition interaction effects (v0.10). Read whenever adding or modifying any effect. | `src/lib/types/effectSystem.ts`, calculator effect analyzers |
| `docs/systems/CALCULATION_SYSTEM.MD` | 13-stage derived stat pipeline: formulas, dependency graph, mastery cap validation, breakdown output. Read whenever changing how stats are computed. | `src/lib/services/enhancedCharacterCalculator.ts`, `src/lib/utils/characterState.ts` |

### Character Creation

The wizard flow and every subsystem that feeds into it.

| Doc | What it covers | Key code |
| --- | --- | --- |
| `docs/systems/CHARACTER_CREATION_FLOW.MD` | Multi-stage wizard orchestration, stage ordering, state contracts, completion/validation rules, data flow between UI and calculator | `src/routes/character-creation/*`, `src/lib/stores/characterContext.tsx` |
| `docs/systems/CLASS_SYSTEM.MD` | Class/subclass data, feature definitions, progression tables, checklists for adding classes/features, v0.10 notes | `src/lib/rulesdata/classes-data/*` (features, progressions, loaders) |
| `docs/systems/ANCESTRY_SYSTEM.MD` | Ancestry selection, ancestry points, trait grants, trait effect pipeline, troubleshooting | `src/lib/rulesdata/ancestries/*`, `src/routes/character-creation/AncestrySelector.tsx` |
| `docs/systems/BACKGROUND_SYSTEM.MD` | Skills/trades/languages point budgets, point conversions, mastery cap validation, calculation formulas | `src/routes/character-creation/Background.tsx`, calculator background stages |
| `docs/systems/LEVELING_SYSTEM.MD` | Level-up budgets (1-10), progression aggregation, path allocation bonuses, multiclass pointers, talent effects, UI gating | `src/lib/rulesdata/classes-data/classProgressionResolver.ts`, `src/routes/character-creation/LevelingChoices.tsx` |
| `docs/systems/SPELLS_SYSTEM.MD` | Spell data model (125 spells, 8 schools, 3 sources), assignment rules, tag system, enhancement system, tiered architecture | `src/lib/rulesdata/spells-data/*`, `src/lib/services/spellAssignment.ts` |
| `docs/systems/MARTIALS_SYSTEM.MD` | Maneuver data (Attack/Defense/Grapple/Utility), budget derivation from class progression and path bonuses, validation | `src/lib/rulesdata/martials/*`, `src/routes/character-creation/Maneuvers.tsx` |
| `docs/systems/TRAITS_SYSTEM.MD` | Trait catalog (239 traits), prerequisite chains, effect typing, runtime processing pipeline, test suite (34 tests) | `src/lib/rulesdata/ancestries/traits.ts`, trait selection components |
| `docs/systems/EQUIPMENT_SYSTEM.MD` | Custom equipment builder (weapons, armor, shields, spell focuses), point-buy validation, property requirements, presets | `src/lib/rulesdata/equipment/*`, `src/routes/custom-equipment/*` |

### Character Sheet

| Doc | What it covers | Key code |
| --- | --- | --- |
| `docs/systems/CHARACTER_SHEET.MD` | Section-to-data-source map (Attributes, Resources, Background, Spells, Maneuvers, etc.), interactions, acceptance checks | `src/routes/character-sheet/*` |

### DM Tools

| Doc | What it covers | Key code |
| --- | --- | --- |
| `docs/systems/MONSTER_SYSTEM_SPEC.MD` | Monster designer using DC20 point-buy: Statistics Table, role modifiers, tier system, feature point-buy, action builder, seed data, community sharing | `src/routes/dm/monsters/*`, `convex/monsters.ts` |
| `docs/systems/ENCOUNTER_SYSTEM_SPEC.MD` | Encounter planner: budget formulas (party size x level), difficulty scaling, monster slotting, validation thresholds | `src/routes/dm/encounters/*`, `convex/encounters.ts` |

### Infrastructure

| Doc | What it covers | Key code |
| --- | --- | --- |
| `docs/systems/DATABASE_SYSTEM.MD` | Hybrid localStorage/Convex persistence, schema definitions, authentication (Convex Auth), migration strategies, storage abstraction layer | `src/lib/storage/*`, `convex/*` |
| `docs/systems/PDF_EXPORT_SYSTEM.MD` | Client-side PDF generation pipeline, field mapping, v0.10 template (v0.9.5 fallback), authentication gating, movement system integration | `src/lib/pdf/*` |

### Conventions

| Doc | What it covers |
| --- | --- |
| `docs/systems/FEATURE_ID_NAMING_CONVENTION.md` | Stable feature ID format: `{class}_{feature_slug}[_{level}]`. Naming rules, conversion examples, validation criteria. |

---

## What to Read for Common Tasks

Use this routing table to find the 2-4 docs relevant to your task.

| Task | Read these docs |
| --- | --- |
| Adding or modifying a **class feature** | `CLASS_SYSTEM`, `EFFECT_SYSTEM`, `CALCULATION_SYSTEM`, `FEATURE_ID_NAMING_CONVENTION` |
| Adding or modifying an **ancestry or trait** | `ANCESTRY_SYSTEM`, `TRAITS_SYSTEM`, `EFFECT_SYSTEM` |
| Changing **character stat calculations** | `CALCULATION_SYSTEM`, `EFFECT_SYSTEM` |
| Working on **spells** (data, assignment, UI) | `SPELLS_SYSTEM`, `CLASS_SYSTEM`, `CALCULATION_SYSTEM` |
| Working on **maneuvers** | `MARTIALS_SYSTEM`, `LEVELING_SYSTEM`, `CLASS_SYSTEM` |
| Modifying **background** (skills, trades, languages) | `BACKGROUND_SYSTEM`, `CALCULATION_SYSTEM` |
| Working on **character sheet** UI | `CHARACTER_SHEET`, `CALCULATION_SYSTEM` |
| Modifying **character creation flow** or adding a stage | `CHARACTER_CREATION_FLOW`, `LEVELING_SYSTEM` |
| Working on **leveling or multiclass** | `LEVELING_SYSTEM`, `CLASS_SYSTEM`, `CHARACTER_CREATION_FLOW` |
| Working on **equipment builder** | `EQUIPMENT_SYSTEM` |
| Working on **DM monster tools** | `MONSTER_SYSTEM_SPEC`, `DATABASE_SYSTEM` |
| Working on **DM encounter planner** | `ENCOUNTER_SYSTEM_SPEC`, `MONSTER_SYSTEM_SPEC`, `DATABASE_SYSTEM` |
| Modifying **storage or persistence** | `DATABASE_SYSTEM` |
| Working on **PDF export** | `PDF_EXPORT_SYSTEM`, `CALCULATION_SYSTEM` |

---

## Coding and Review Expectations

- Use Conventional Commits.
- Keep changes focused and avoid unrelated refactors.
- Update relevant docs when behavior or architecture changes.
- Never commit secrets from `.env`, `.env.local`, or similar files.
