# TODO Tracker

## 1. Flesh out Unit Tests for Core Logic

- **current gap**:
  - Placeholder test files were created to satisfy architectural rule 8, but they lack actual test logic.
  - Core utilities and hooks do not have meaningful test coverage, increasing regression risk.

- **acceptance criteria**:
  - Implement comprehensive unit tests for the following files:
    - `src/lib/utils/defenseNotes.spec.ts`
    - `src/lib/services/spellAssignment.spec.ts`
    - `src/lib/hooks/useEnhancedCharacterCalculation.spec.ts`
  - Tests should cover primary functions, edge cases, and invalid inputs.
  - `npm run test:unit` passes with increased coverage for these files.

- **tasks**:
  - [ ] Write tests for `defenseNotes.ts` utilities.
  - [ ] Write tests for `spellAssignment.ts` service.
  - [ ] Write tests for `useEnhancedCharacterCalculation.ts` hook (requires mocking context).

- **references**:
  - Vitest Documentation
  - React Testing Library (for hooks)

---

## 2. Low-Priority System Docs (nice to have)

- Weapons & Items System — items schema, weapon damage derivation, UI interactions.
- Currency System — model, validation, persistence, UI mapping.
- Status & Exhaustion System — levels, effects, modal behavior.
- Persistence & API — save/load mapping, Prisma schema, API contract.

These are tracked for future work; current focus is on the newly added Spells, Martials, Calculation, Effect docs, and Character Sheet overview.

---

## 3. PDF Export and Calculation Follow-ups

- [ ] bug: Rest Points cap should equal final HP Max (after bonuses)
- [ ] feat: Extend character schema with `heavyAD`, `heavyPD`, `brutalAD`, `brutalPD`
  - heavy = AD/PD + 5, brutal = AD/PD + 10
  - pass these fields through to PDF export DTO/schema
- [ ] bug: Attribute save values should be `attribute + combat mastery`

---

## 4. FE Ticket: Move UI calculations to character data

- **Goal**: Remove all derived-calculation logic from UI components and `pdf` transformers; consume precomputed values on `SavedCharacter` instead.
- **Scope**:
  - Skills: use `skillTotals` rather than recomputing from `skillsData`.
  - Mastery ladders: read from `masteryLadders.skills` and `masteryLadders.knowledgeTrades` and `masteryLadders.practicalTrades` (A–D).
  - Trades labeling: use `masteryLadders.practicalTrades.{A..D}.label`.
  - Languages: use fixed `languageMastery` A–D for Limited/Fluent instead of recalculating from `languagesData` at render.
  - Defenses/bloodied: use `finalPD/AD` thresholds and `bloodiedValue`/`wellBloodiedValue` already on character.
- **Acceptance**:
  - No UI behavior changes; rendered values equal before/after migration for existing characters.
  - `pdf` transformer contains zero math (only mapping from `SavedCharacter`).
  - Unit tests cover consumption of the new fields and fall back gracefully when absent.

---

## 0. Epic: Persist mastery/totals on character (skills, trades, languages)

- **Problem**:
  - `SavedCharacter` stores ranks (`skillsData`, `tradesData`) and languages fluency only.
  - Character Sheet re-derives mastery levels and totals at render; PDF transformer mirrors that logic, risking drift.

- **Goal**:
  - Persist ready-to-use fields on `SavedCharacter` so UI and PDF export consume without recomputing.
  - Keep existing UI fields/flows untouched; fields are additive and optional during rollout.

- **Deliverables**:
  - For each skill and trade:
    - governingAttributes: string[]
    - baseAttributeValues: Record<'might'|'agility'|'charisma'|'intelligence', number>
    - masteryLevel: number (rank×2)
    - masteryLadder: { '2': boolean; '4': boolean; '6': boolean; '8': boolean; '10': boolean }
    - finalValue: number = max(baseAttributeValues[allowed]) + masteryLevel
  - Knowledge trades: same ladder/finalValue, allowed attributes from spec (typically Intelligence).
  - Practical trades A–D: { label, ladder, finalValue } chosen from non-knowledge trades with highest values.
  - Languages: fixed `languageMastery` A–D = { name, limited, fluent } derived from `languagesData`.
  - Keep `languagesData` as source of truth; `languageMastery` is denormalized for UI/PDF.

- **Plan**:
  1) Compute fields in `characterCompletion.ts` using final attributes + ranks; write to new optional fields on `SavedCharacter` (already typed).
  2) Update PDF transformer to read only from these new fields; remove inline math.
  3) Open FE ticket (Section 4) to migrate UI to consume new fields; keep current UI in place until merged.

- **Non-Goals**:
  - No change to existing UI components now; no schema migrations for stored saves (fields are optional).

- **Acceptance**:
  - Local export PDF matches UI for skills/trades/languages on multiple samples.
  - No regressions in Character Sheet rendering.
