### Character Sheet UI Refactor Plan (Context-Based, Aggressive)

Updated: {{DATE}}

### Scope and constraints
- **Goal**: Restore the full-featured character sheet UI (Desktop/Mobile) using the new Context provider and reducer, replacing the temporary minimal sheet.
- **Constraint**: No data migration or backward compatibility. We assume a clean slate for character data in localStorage.
- **Out of scope now**: Repo-wide ESLint/type cleanup and enhanced-calculator correctness. Only adjust sheet wiring and UI data flow.

### Current state (baseline)
- New state system implemented via `CharacterSheetProvider` + `useCharacterSheetReducer`.
- Many child components (Resources, Defenses, Inventory, Spells/Maneuvers, PlayerNotes, Currency) are already refactored to pull from Context.
- `CharacterSheetSimple.tsx` is no longer required (already removed).
- Router currently still points to the minimal UI and should be switched to Desktop/Mobile after this plan is executed.

### Phase 1 – Reducer/Provider helpers and selectors

- **Reducer (`src/routes/character-sheet/hooks/useCharacterSheetReducer.ts`)**
  - **Already present**: `UPDATE_TEMP_HP` and its reducer branch. Keep as-is.
  - **Add**: `UPDATE_ACTION_POINTS_USED` action + reducer branch.
    - Update helper API:
      - `updateTempHP(tempHP: number)` (ensure it exists in the hook return)
      - `updateActionPoints(ap: number)` dispatching the new action

  Example additions:
  ```ts
  // SheetAction
  | { type: 'UPDATE_ACTION_POINTS_USED'; ap: number };

  // reducer case
  case 'UPDATE_ACTION_POINTS_USED':
    if (!state.character) return state;
    return {
      ...state,
      character: {
        ...state.character,
        characterState: {
          ...state.character.characterState,
          resources: {
            ...state.character.characterState.resources,
            current: {
              ...state.character.characterState.resources.current,
              actionPointsUsed: action.ap,
            },
          },
        },
      },
    };

  // in the hook
  const updateTempHP = useCallback((tempHP: number) => {
    dispatch({ type: 'UPDATE_TEMP_HP', tempHP });
  }, []);

  const updateActionPoints = useCallback((ap: number) => {
    dispatch({ type: 'UPDATE_ACTION_POINTS_USED', ap });
  }, []);
  ```

- **Provider (`src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`)**
  - Re-export the new helpers from the reducer via Context:
    - `updateTempHP(tempHP: number)`
    - `updateActionPoints(ap: number)`
  - Add selector hooks to simplify component code:
    - `useCharacterFeatures()` → `state.character?.features || []`
    - `useCharacterCurrency()` → `state.character?.characterState?.inventory?.currency || { gold: 0, silver: 0, copper: 0 }`
  - Quiet calculator failures during save (avoid red console spam): wrap `calculateCharacterWithBreakdowns` in try/catch and `console.warn` on error.

  Example selector additions:
  ```ts
  export function useCharacterFeatures() {
    const { state } = useCharacterSheet();
    return useMemo(() => state.character?.features || [], [state.character?.features]);
  }

  export function useCharacterCurrency() {
    const { state } = useCharacterSheet();
    return useMemo(() => state.character?.characterState?.inventory?.currency || { gold: 0, silver: 0, copper: 0 }, [state.character?.characterState?.inventory?.currency]);
  }
  ```

### Phase 2 – Refactor Desktop/Mobile to Context

- **CharacterSheetDesktop.tsx** and **CharacterSheetMobile.tsx**
  - Replace legacy call signatures like `useCharacterSheet(characterId)` with Context usage:
    - `const { state, updateHP, updateSP, updateMP, updateTempHP, updateActionPoints, updateCurrency, setManualDefense } = useCharacterSheet();`
    - `const resources = useCharacterResources();`
    - `const features = useCharacterFeatures();`
    - `const currency = useCharacterCurrency();`
  - Map old field names to new storage schema:
    - UI labels remain “Gold/Silver/Copper”; values come from `{ gold, silver, copper }` and update via `updateCurrency(gold, silver, copper)`.
  - Keep popup state (`selectedFeature`, `selectedSpell`, `selectedAttack`, `selectedInventoryItem`) local with `useState`; open/close handlers remain local.
  - Implement simple local helpers for fill percentages using `resources.original`.
  - Action points UI should invoke `updateActionPoints(newValue)`.

- **Important**: Child components must no longer expect legacy props. Verify these are already Context-driven:
  - `components/Resources.tsx`, `Defenses.tsx`, `Attacks.tsx`, `Inventory.tsx`, `Currency.tsx`, `PlayerNotes.tsx`, `Spells.tsx`, `Maneuvers.tsx`.
  - If any still expect props, switch them to selector hooks and reducer helpers (no prop drilling).

### Phase 3 – Router switch

- **CharacterSheetRouter.tsx**
  - Replace the temporary minimal rendering with Desktop/Mobile selection:
  ```tsx
  return (
    <CharacterSheetProvider characterId={characterId}>
      {isMobile
        ? <CharacterSheetMobile characterId={characterId} />
        : <CharacterSheetDesktop characterId={characterId} onBack={onBack} />}
    </CharacterSheetProvider>
  );
  ```

### Phase 4 – Cleanup
- `CharacterSheetSimple.tsx` is already removed.
- Remove `components/StatTooltips.tsx` only if unused (grep imports first).

### Acceptance criteria
- Desktop and Mobile sheets render using Context-based data only (no prop drilling).
- Editing resources (HP/SP/MP/TempHP/AP), defenses overrides, inventory, spells/maneuvers, currency, and notes persists after refresh.
- Router selects Desktop/Mobile based on width breakpoint and no longer renders the minimal sheet.
- Console logs show at most warnings from calculator; no red errors from sheet flow.

### Risks and mitigations
- **Calculator throws**: guarded with try/catch and `console.warn`; saving still proceeds with last known values.
- **Legacy prop expectations**: verify each child and convert to selector hooks to avoid runtime undefineds.
- **Currency mismatches**: ensure UI uses `{ gold, silver, copper }` consistently.

### Task checklist
- **Reducer**: add `UPDATE_ACTION_POINTS_USED`; ensure `updateTempHP` and `updateActionPoints` helpers are returned.
- **Provider**: include helpers in context; add `useCharacterFeatures`, `useCharacterCurrency`; wrap calculator with warn on error.
- **Desktop/Mobile**: switch to Context + selectors; keep popups local; wire AP/currency/resources/defenses.
- **Router**: switch to Desktop/Mobile.
- **Cleanup**: remove unused `StatTooltips.tsx` only if not imported.


