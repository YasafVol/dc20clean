# DC20Clean - Character Sheet Spells/Maneuvers Sync Spec

> Purpose
> Align character sheet data flow so spells and maneuvers are consistent across storage,
> state, and UI, and ensure visibility/counts match calculator outputs.

---

## 1. Goal

Fix spells/maneuvers out-of-sync behavior on the character sheet and remove conflicting
state paths so add/remove/reset flows are reliable and persist correctly.

---

## 2. Background (current mismatches)

- Spells/maneuvers are stored in multiple places with conflicting shapes:
  - `SavedCharacter.spells` / `SavedCharacter.maneuvers` (top-level arrays)
  - `characterState.spells` / `characterState.maneuvers` (treated as both arrays and
    `{ original, current }` objects in different files)
- Reducer updates spells into both top-level and `characterState`, but maneuvers only
  update top-level.
- CharacterSheet "revert" logic mutates local `useState` arrays that are not used by
  the sheet components.
- Maneuver visibility uses class progression only, which ignores path bonuses and
  grant effects; spells visibility uses className or saved spells and ignores
  calculated known slots.
- Wrong import paths for Maneuver types in a couple of files.

Primary affected files:

- `src/routes/character-sheet/hooks/useCharacterSheetReducer.ts`
- `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`
- `src/lib/utils/characterState.ts`
- `src/routes/character-sheet/CharacterSheetClean.tsx`
- `src/routes/character-sheet/components/Spells.tsx`
- `src/routes/character-sheet/components/Maneuvers.tsx`
- `src/routes/character-sheet/utils/mobileCharacterSheetUtils.ts`

---

## 3. Target State Model (decision needed)

Pick one canonical store for spells/maneuvers and align all consumers:

Option A (recommended):

- Canonical: top-level `SavedCharacter.spells` / `SavedCharacter.maneuvers` arrays.
- `characterState.spells` / `characterState.maneuvers` are removed or ignored for sheet UI.

Option B:

- Canonical: `characterState.spells.current` / `characterState.maneuvers.current`.
- Top-level arrays are derived when saving or migrating.

Decision: Option A confirmed (2026-01-23).

---

## 4. Plan (detailed)

### 4.1 Data model alignment

- Update `CharacterState` typing to avoid spells/maneuvers dual shape.
- Remove or normalize any `{ original, current }` assumptions for spells/maneuvers.
- Ensure `revertToOriginal` uses the canonical store (and original snapshot if needed).

### 4.2 Reducer + Provider sync

- Update reducer actions so add/remove/update for spells and maneuvers update the
  canonical store only once.
- Add explicit reset actions for spells/maneuvers and use them from the sheet UI.
- Ensure save flow (`CharacterSheetProvider`) persists the canonical arrays.

### 4.3 Sheet visibility rules

- Spells section: show when `calculationResult.spellsKnownSlots.length > 0` or
  when saved spells exist.
- Maneuvers section: show when `calculationResult.levelBudgets.totalManeuversKnown > 0`
  or when saved maneuvers exist.
- Remove class-progression-only checks for maneuver presence.

### 4.4 UI flows

- Ensure add/remove works for both mobile and desktop without relying on local state.
- Ensure reset/revert triggers reducer reset and updates UI immediately.
- Fix maneuver type imports to the correct path.

### 4.5 Logging compliance

- Replace direct `console.log` usage in character sheet flows with the logger
  utilities once available, or align with `debug` context helpers if logger is not
  ready.
- Ensure log context and level match `docs/systems/LOGGING_SYSTEM.MD`.

### 4.6 Tests alignment (no edits without approval)

- Validate e2e test selectors still match updated UI.
- Document any test mismatches and request approval before changing tests.

---

## 5. Tracker (update this as work progresses)

Rule: Update this tracker after each subtask. Mark complete with [x], in-progress with [~].
When the full tracker is complete, update `docs/systems/CHARACTER_SHEET.MD` to reflect
the new source-of-truth and visibility rules.

- [x] Decide canonical store for spells/maneuvers (Option A)
- [x] Align types and `characterState` handling for spells/maneuvers
- [x] Update reducer actions to use canonical store + add reset actions
- [x] Update CharacterSheetClean to use reducer resets (remove dead local state)
- [x] Update visibility logic to use calculator outputs
- [x] Fix maneuver type import paths
- [x] Logging alignment plan documented and agreed
- [x] Verify e2e selectors against updated UI (report mismatches)
- [x] Update `docs/systems/CHARACTER_SHEET.MD` after completion

---

## 6. Test and Logging Verification (current)

### 6.1 E2E tests

- `e2e/09-spells.e2e.spec.ts` expects:
  - `data-testid="add-spell"` and per-row `select[data-testid^="spell-name-"]`
  - Filter input or `data-testid="spell-filter"` (current UI uses a select with
    `data-testid="spell-filter"`, which matches)
  - Delete via `[data-testid^="remove-spell-"]` (matches)
- `e2e/10-maneuvers.e2e.spec.ts` expects:
  - `data-testid="add-maneuver"` (matches)
  - `data-testid="maneuver-name"` and tries to `fill()` (current UI uses a `<select>`,
    so the test may be brittle)
  - "Save maneuver" button (not present in current UI)

No test changes should be made without explicit approval.

### 6.2 Logging system alignment

- `docs/systems/LOGGING_SYSTEM.MD` defines contexted logger usage.
- Character sheet logging now uses `logger` for UI/storage/calculation contexts.
- Logging system is marked WIP; continue using `logger` and avoid direct `console.*`
  in sheet code.

---

## 7. Acceptance Checks

- Spells/maneuvers add/remove persist and stay consistent across refresh.
- Revert resets spells/maneuvers using the canonical store and updates UI immediately.
- Visibility shows/hides spells/maneuvers based on calculator totals and saved data.
- No duplicate or conflicting spell/maneuver lists across the sheet.
- Tests remain valid or mismatches are documented for approval.

---

> Last updated: 2026-01-23
> Maintainer: @DC20Clean-Team
