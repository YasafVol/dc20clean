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

---

# Iteration 2 – Rules-Data Deep Dive

## 2.1  Landscape Snapshot

```mermaid
graph TD
    A[Rules-Data] --> B(Top-level TS)
    A --> C(Legacy JSON classes)
    A --> D(_new_schema TS)
    A --> E(Backup original)
    A --> F(Loaders)
    A --> G(Schemas)
    A --> H(Spells data)

    C:::legacy
    D:::partial
    E:::archived

    classDef legacy    fill:#ffcccc,color:#000
    classDef partial   fill:#fff3cd,color:#000
    classDef archived  fill:#e0e0e0,color:#666
```

## 2.2  Status Matrix

| Dataset | Source Path | Loader | Zod-validated | Runtime Status |
|---------|-------------|--------|---------------|----------------|
| Ancestries / Traits | `src/lib/rulesdata/{ancestries,traits}.ts` | direct import | ✗ | ✅ production |
| Class data (legacy) | `rulesdata/classes/*.json` | `class.loader.ts` | ✔ | ✅ production |
| Class data (new) | `rulesdata/_new_schema/*.ts` | _none_ | ✔ | 🟡 prototype |
| Spells data | `_new_schema/spells-data` | direct import | ✔ | ✅ production |
| Backup dirs | `_backup_original` | — | — | 📦 archived |

Legend: ✅ = used in runtime · 🟡 = exists but not wired

## 2.3  Immediate Gaps

1. Missing loader for new TypeScript class data.
2. No build-time validation for top-level TS rule files.
3. Dual-source confusion (legacy vs new) – needs feature-flag.
4. No automated test that asserts **every** rule file passes its schema.

## 2.4  Proposed Tasks (tracked for Iteration 3)

- [ ] `class-new.loader.ts` with `import.meta.glob` + Zod parse.
- [ ] ENV toggle `VITE_CLASSES_SCHEMA_VERSION = legacy|new`.
- [ ] Vitest `rulesdata.spec.ts` – loads every file & snapshots counts.
- [ ] Update mind-map when legacy loader is retired.

---

# Roadmap for Remaining Subsystems (to be expanded)

| Subsystem | Key Questions for Deep-Dive |
|-----------|-----------------------------|
| **State Management** | Reducer invariants? Persisted fields? Context vs store overlap? |
| **Services** | Calculator purity? Effect-processor design? Async boundaries? |
| **Persistence / API** | Schema-to-DB fidelity? Endpoint contract tests? Auth flow? |
| **Testing** | Coverage thresholds? CI gating? Playwright journeys? |
| **Build / DevOps** | Roll-up chunking, docker story, prod env variables? |

Each area will receive the same treatment as Rules-Data: inventory → status matrix → gap list → tasks.  
(☑ Marks will move as iterations complete.)

---

# Iteration 2 – Other Sub-Systems Deep Dives

## 2.5  State Management

### 2.5.1 Landscape
* **React Context** – `src/lib/stores/characterContext.tsx` (current source of truth)
* **Legacy Svelte Store** – `src/lib/stores/characterInProgressStore.ts` (`:::legacy`)
* **Calculation Hooks** – `src/lib/hooks/*` (derive memoised stats)

### 2.5.2 Status Matrix
| Component | File(s) | Tested | Runtime | Notes |
|-----------|---------|--------|---------|-------|
| Character Context (React) | `characterContext.tsx` | ⬜ | ✅ | central reducer
| Svelte Store | `characterInProgressStore.ts` | ⬜ | ✅ | keeps legacy consumers alive
| Derived Hooks | `useAttributeCalculation.ts`… | ⬜ | ✅ | rely on context values

### 2.5.3 Gaps & Tasks
1. **Consolidate** – migrate final legacy consumers to React Context, then delete Svelte store.
2. **Reducer Tests** – property-based Vitest for action sequences.
3. **Devtool tracing** – add `why-did-you-render` / React DevTools notes.

---

## 2.6  Services

### 2.6.1 Landscape
* **Legacy Calculator** – `src/lib/services/characterCalculator.ts`
* **Enhanced Calculator** – `enhancedCharacterCalculator.ts` (new formulae)
* **Effect Processor (planned)** – `_backup/_new_schema/effectProcessor.ts`
* **CharacterCompletion / spellAssignment / dataMapping** – support services

### 2.6.2 Status Matrix
| Service | File | Tested | Status |
|---------|------|--------|--------|
| characterCalculator (legacy) | `characterCalculator.ts` | ✅ (snapshot) | production |
| enhancedCharacterCalculator | `enhancedCharacterCalculator.ts` | ⬜ | prototype |
| effectProcessor | `_backup/_new_schema/effectProcessor.ts` | ⬜ | planned |

### 2.6.3 Gaps & Tasks
1. Finish **effectProcessor** and integrate with enhanced calculator.
2. Decide **single source of truth** (legacy vs enhanced) via feature flag.
3. Snapshot regression tests for each archetype build.

---

## 2.7  Persistence / API

### 2.7.1 Landscape
* **Prisma** – `schema.prisma`, migrations folder
* **API Routes** – `src/api/character/[characterId].ts`
* **Route Backups** – `src/routes/api/_backup/*`
* **Auth Service** – `src/lib/server/auth.ts`

### 2.7.2 Status Matrix
| Layer | File / Path | Tested | Observations |
|-------|-------------|--------|--------------|
| Prisma schema | `prisma/schema.prisma` | ⬜ | generates client successfully |
| REST endpoint | `src/api/character/[characterId].ts` | ⬜ | minimal validation |
| SvelteKit route backups | `routes/api/_backup` | ⬜ | legacy, not mounted |

### 2.7.3 Gaps & Tasks
1. Add **contract tests** (Vitest + supertest) for `/api/character/:id` CRUD.
2. Write **migration sanity test** that spins up `docker-compose`, runs prisma migrate, and ensures tables exist.
3. Remove obsolete SvelteKit backup routes or document migration.

---

## 2.8  Testing

### 2.8.1 Current Assets
* **Unit** – `src/demo.spec.ts` (basic calc demo)
* **E2E** – `e2e/demo.test.ts` (happy-path character creation)

### 2.8.2 Coverage Summary
* Lines with tests ≈ **5 %** of codebase.
* No tests for context, new loaders, API endpoints, or UI edge-cases.

### 2.8.3 Gaps & Tasks
1. Target **25 %** line coverage by end of Q3.
2. Add **Playwright journey** that creates character → saves → reloads sheet.
3. Use **Vitest snapshots** for rule-data schemas.
4. Configure **CI** to fail under coverage threshold.

---

## 2.9  Build / DevOps

### 2.9.1 Landscape
* **Vite** build with React plugin
* **Docker-compose** for Postgres (`docker-compose.yml`)
* **No CI config yet** (GitHub Actions / Railway, etc.)

### 2.9.2 Gaps & Tasks
1. Add **GitHub Actions** workflow: install → lint → test → build.
2. Split Vite chunks via `manualChunks` (bundle warn >500 kB).
3. Document **env var matrix** (local vs prod vs preview).

---

> _End of Iteration 2 additions_
