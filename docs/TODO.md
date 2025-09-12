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
