# DC20Clean – System Overview & Mind Map (Iteration 1)

_Last updated: 2025-08-10_

---

## 1  High-Level Mind Map

```mermaid
mindmap
  root((DC20Clean))
    "Frontend / UI"
      "Character Creation Flow"
        "Step Wizard"
        "Selectors (Ancestry, Class, Traits)"
        "Live Validation & Point Counters"
      "Character Sheet"
        "Stat Blocks"
        "Features & Pop-ups"
        "Inventory & Attacks"
      "Global UI"
        "Menu / Snackbar"
        "Routing"
    "State Management"
      "React Context (characterContext)"
      "Legacy Svelte Store (characterInProgressStore)":::legacy
    "Rules Data"
      "Ancestries / Traits (TS)"
      "Classes (JSON)":::partial
      "Spells & Maneuvers"
      "Schemas (Zod)"
    "Services"
      "Character Calculator"
      "Effect Processor":::planned
      "Spell Assignment"
    "Persistence"
      "Prisma – Postgres"
      "API Routes (/src/api, /routes/api)"
    "Testing"
      "Unit – Vitest"
      "E2E – Playwright"
    "Build / DevOps"
      "Vite + React"
      "Docker + Prisma Migrations"
      "CI (TBD)"
```

Legend: `:::legacy` = slated for deprecation · `:::partial` = partially migrated · `:::planned` = not yet implemented.

---

## 2  Current Test-Coverage Heat-Map (approx.)

| Area | Key Files | Unit Tests | E2E Tests | Status |
|------|-----------|-----------|-----------|--------|
| Character Calculator | `src/lib/services/characterCalculator.ts` | ✅ (good) | ⬜ | Solid
| React Context | `src/lib/stores/characterContext.tsx` | ⬜ | ⬜ | **Missing**
| Character Creation UI | `src/routes/character-creation/*` | ⬜ | ✅ | Partial
| Character Sheet UI | `src/routes/character-sheet/*` | ⬜ | ✅ (basic nav) | Light
| Rule-Data Loaders | `src/lib/rulesdata/loaders/*` | ✅ | ⬜ | Fair
| API Routes | `src/api/*` | ⬜ | ⬜ | None

⬜ = none · ✅ = exists

**Biggest gaps:** React Context edge-cases, API contract tests, UI regression for Character Sheet.

---

## 3  Opportunities to Augment Coverage

1. **Snapshot calculator contracts** with a golden-master per character archetype.
2. **Context reducer property-based tests** to fuzz random actions.
3. **Playwright journey:** full character creation -> export -> reload -> sheet rendering.
4. **Schema validation tests** that load every JSON / TS data file and parse against Zod schemas.

---

## 4  Proposed Cursor Project Rules (draft)

1. **Folder Boundaries** – No component in `src/routes/character-sheet` may import from `src/routes/character-creation`.
2. **Data Imports** – Only loader modules under `src/lib/rulesdata/loaders` may import raw JSON/TS data files.
3. **Typed State** – All additions to React Context must extend `CharacterAction` & `CharacterInProgressStoreData` with exhaustive `switch` handling.
4. **Test Requirement** – Any file >150 LOC must have at least one Vitest.
5. **Mermaid Docs** – Every new subsystem must be added to this mind-map file.

---

### ⏭️ Next Iteration

* Drill into **Rules Data**: enumerate every data file, ownership, and migration status.
* Produce effect-processor sequence diagram.
* Formalise coverage targets & thresholds (Vitest + Playwright).
