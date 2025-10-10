# TODO Tracker

## ✅ COMPLETED ITEMS

### 0. Epic: Persist mastery/totals on character ✅ **COMPLETE**

**Status:** Fully implemented

**Deliverables:** All complete
- ✅ `denormalizeMastery.ts` service created
- ✅ Types defined in `dataContracts.ts`
- ✅ Integration in `characterCompletion.ts`
- ✅ PDF transformer uses denormalized fields
- ✅ For each skill and trade: governingAttributes, baseAttributeValues, masteryLevel, masteryLadder, finalValue
- ✅ Knowledge trades: ladder/finalValue with Intelligence attributes
- ✅ Practical trades A-D: { label, ladder, finalValue }
- ✅ Languages: `languageMastery` A-D = { name, limited, fluent }

**Evidence:**
- File: `src/lib/services/denormalizeMastery.ts` (205 lines)
- File: `src/lib/services/denormalizeMastery.spec.ts` (73 lines of tests)
- Integration: `characterCompletion.ts` lines 14, 67, 146-150
- PDF: `transformers.ts` consumes denormalized fields

**Acceptance:**
- ✅ Local export PDF matches UI for skills/trades/languages
- ✅ No regressions in Character Sheet rendering

---

### 3. PDF Export and Calculation Follow-ups ✅ **COMPLETE**

#### ✅ Rest Points Cap
- **Status:** Implemented
- Rest points equal final HP Max (verified in calculator)

#### ✅ Character Schema Extension
- **Status:** Schema extended in `dataContracts.ts` (lines 125-132)
- Fields added:
  - `finalPDHeavyThreshold`, `finalPDBrutalThreshold`
  - `finalADHeavyThreshold`, `finalADBrutalThreshold`
  - `bloodiedValue`, `wellBloodiedValue`
- **Note:** Thresholds are computed in `characterCompletion.ts` as needed

#### ✅ Attribute Save Values
- **Status:** Verified correct
- Formula: `attribute + combat mastery` (implemented in calculator)

---

## 🚧 REMAINING ITEMS

### 1. Flesh out Unit Tests for Core Logic ❌ **NOT STARTED**

**Current gap:**
- Placeholder test files exist but contain only `expect(true).toBe(true)`
- Core utilities and hooks lack meaningful test coverage

**Files needing real tests:**
- `src/lib/utils/defenseNotes.spec.ts` - Currently 7 lines, needs ~50-100 lines
- `src/lib/services/spellAssignment.spec.ts` - Currently 7 lines, needs ~100-150 lines
- `src/lib/hooks/useEnhancedCharacterCalculation.spec.ts` - Currently 7 lines, needs ~80-120 lines

**Acceptance criteria:**
- Tests cover primary functions, edge cases, and invalid inputs
- `npm run test:unit` passes with meaningful coverage increase

**Tasks:**
- [ ] Write tests for `defenseNotes.ts` utilities (get, add, update, delete notes)
- [ ] Write tests for `spellAssignment.ts` service (class spell assignment logic)
- [ ] Write tests for `useEnhancedCharacterCalculation.ts` hook (requires mocking context)

**Estimated effort:** 4-6 hours

---

### 2. Low-Priority System Docs ⏸️ **DEFERRED**

**Tracked for future work:**
- Weapons & Items System — items schema, weapon damage derivation, UI interactions
- Currency System — model, validation, persistence, UI mapping
- Status & Exhaustion System — levels, effects, modal behavior
- Persistence & API — save/load mapping, Prisma schema, API contract

**Note:** Current focus is on the newly added Spells, Martials, Calculation, Effect docs, and Character Sheet overview.

---

### 4. FE Ticket: Move UI calculations to character data ❌ **NOT STARTED**

**Goal:** Remove all derived-calculation logic from UI components; consume precomputed values on `SavedCharacter` instead.

**Context (backend COMPLETE):**
- ✅ `SavedCharacter` persists denormalized background data
- ✅ PDF transformer already uses these fields
- ❌ Frontend UI still recomputes values from raw data

**Scope for FE migration:**
- [ ] Skills: Read `skillTotals` (and `skillMastery` for tooltips) instead of recomputing from `skillsData`
- [ ] Mastery ladders: Render from `masteryLadders.skills`, `masteryLadders.knowledgeTrades`, `masteryLadders.practicalTrades`
- [ ] Trade labels: Use `masteryLadders.practicalTrades.{A..D}.label`
- [ ] Languages: Use `languageMastery` A-D for Limited/Fluent display
- [ ] Defenses/bloodied: Display `finalPD/AD` thresholds and `bloodiedValue`/`wellBloodiedValue` directly
- [ ] Remove character sheet recalculation on load (trust stored data)

**Files to update:**
- `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx` - Remove `calculateCharacterWithBreakdowns` on load
- All character sheet components that display skills/trades/languages
- Defense display components

**Acceptance:**
- [ ] No UI behavior changes; rendered values equal before/after migration
- [ ] `CharacterSheetProvider.tsx` does NOT recalculate on load
- [ ] PDF transformer contains zero math (only mapping from `SavedCharacter`)
- [ ] Unit tests cover consumption of new fields and graceful fallback

**Estimated effort:** 8-12 hours

---

## 📋 ADDITIONAL TASKS (from analysis)

### 5. Extract useAttributeCalculation Hook 🟡 **OPTIONAL IMPROVEMENT**

**Current state:**
- Attribute calculation logic is inline in `Attributes.tsx`
- Works correctly but not following original architectural plan

**Proposed:**
- Extract to `src/lib/hooks/useAttributeCalculation.ts`
- Improves testability and reusability
- Matches DATA_FLOW_REFACTOR architectural design

**Priority:** Low (current implementation works)
**Estimated effort:** 2-3 hours

---

## 📊 Progress Summary

| Section | Status | Completion |
|---------|--------|------------|
| 0. Mastery Epic | ✅ Complete | 100% |
| 1. Unit Tests | ❌ Not Started | 0% |
| 2. System Docs | ⏸️ Deferred | N/A |
| 3. PDF/Calculation | ✅ Complete | 100% |
| 4. FE Migration | ❌ Not Started | 0% |
| 5. Extract Hook | 🟡 Optional | N/A |

**Overall: 2 of 4 active tasks complete (50%)**

---

## 🎯 Recommended Priority Order

1. **HIGH:** FE Migration (Section 4) - Biggest architectural impact, removes duplicate logic
2. **MEDIUM:** Unit Tests (Section 1) - Protects against regressions
3. **LOW:** Extract Hook (Section 5) - Nice to have, current code works

---

## 📚 References

- **Vitest Documentation** - For unit testing
- **React Testing Library** - For hook testing
- **Status Analysis:** See `docs/TODO_AND_REFACTOR_STATUS.md` for detailed findings
- **Archived Plans:** See `docs/archive/` for historical refactor plans

---

**Last Updated:** October 10, 2025
