# Character-Sheet State Refactor v1.0

| Ticket | `TICKET-UI-147`           |
| :----- | :------------------------ |
| Owner  | Front-End Team            |
| Status | Draft – Awaiting Sign-off |

---

## 1 Executive Summary

The sheet UI still relies on legacy, flat fields and direct `localStorage` writes. We will migrate every sheet component and helper to read/write the typed `characterState` object stored in React Context and persist through `storageUtils.ts` only.

## 2 Goals & Success Criteria

1. Sheet renders exclusively from `characterState` (no JSON.parse, no flat fields).
2. All edits dispatch reducer actions; **no component writes** directly to `localStorage`.
3. Saving/export runs `enhancedCharacterCalculator` for _every_ class (all classes now supported). Manual overrides remain in `current` sub-object.
4. Debounced `save()` prevents excessive calculator runs during rapid user interaction; full calc always runs on explicit “Save/Export”.
5. Unit coverage ≥ 80 % for new reducer/actions.

## 3 Affected Areas & Files

| Area                  | File/Dir                                                                                      | Change                                                             |
| --------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Sheet Hook & Provider | `src/routes/character-sheet/hooks/useCharacterSheetReducer.ts` + `CharacterSheetProvider.tsx` | **New**: central reducer + context provider.                       |
| Shared Types          | `src/lib/types/…`                                                                             | Ensure `CharacterState`, `ResourceState`, `Attack`, etc. exported. |
| Storage               | `storageUtils.ts`                                                                             | v2-ready—no change, only use it.                                   |
| Components            | `routes/character-sheet/**/*.tsx`                                                             | Purge local `useState`; consume context; dispatch updates.         |
| Legacy Helpers        | `saveManualDefense.ts`, `characterStateToCurrentValues.ts`, etc.                              | Delete after migration (explicit in Step 5 checklist).             |
| Tests                 | `e2e/` + new unit tests                                                                       | Add reducer tests & Playwright journeys.                           |
| Lint Config           | `eslint.config.js`                                                                            | Extend test override so JSON ban doesn’t flag fixture data.        |

## 4 Implementation Steps

### Step 1 – Reducer & Provider

1. **File:** `useCharacterSheetReducer.ts` – expose `[state, dispatch]`.
2. **File:** `CharacterSheetProvider.tsx` – wraps pages; internally calls the hook and debounced `save()`.
3. **State/Actions:**

   ```ts
   interface SheetState {
   	character: SavedCharacter;
   }

   type SheetAction =
   	| { type: 'LOAD'; character: SavedCharacter }
   	| { type: 'UPDATE_CURRENT_HP'; hp: number }
   	| { type: 'SET_MANUAL_DEFENSE'; pd?: number; ad?: number; pdr?: number }
   	| { type: 'ADD_ATTACK'; attack: Attack }
   	| { type: 'REMOVE_ATTACK'; id: string }
   	| { type: 'ADD_SPELL'; spell: Spell }
   	| { type: 'REMOVE_SPELL'; id: string }
   	| { type: 'UPDATE_INVENTORY'; items: Item[] }
   	| { type: 'UPDATE_NOTES'; notes: string };
   ```

### Step 2 – Router Wiring

Wrap `CharacterSheetRouter` with `CharacterSheetProvider` so all sub-components consume context.

### Step 3 – Component Refactor Cluster-by-Cluster

1. **Resources & Defenses** – replace `saveManualDefense` with dispatch.
2. **Attacks** – dispatch `ADD_ATTACK/REMOVE_ATTACK`.
3. **Spells & Maneuvers** – dispatch `ADD_SPELL/REMOVE_SPELL`.
4. **Inventory** – dispatch `UPDATE_INVENTORY`.
5. **Notes & Misc** – dispatch `UPDATE_NOTES`.

### Step 4 – Save Flow

Inside provider:

```ts
const save = debounce(async (char: SavedCharacter) => {
	const calc = enhancedCharacterCalculator(char);
	char.characterState.resources.original = { ...calc.resources }; // merge originals
	await saveCharacterState(char.id, char.characterState);
}, 750);
```

Trigger `save(state.character)` inside a `useEffect` watching `state.character`.

### Step 5 – Cleanup Legacy Artifacts

- Remove `saveManualDefense.ts`, `characterStateToCurrentValues.ts`, `CurrentValues` type, and `safeJsonParse`.
- Delete any component-level JSON helpers.

### Step 6 – Automated Tests & CI Gates

- **Unit** – `useCharacterSheetReducer.spec.ts` with fast-check random actions.
- **E2E** – Playwright journey: edit PD, HP, add attack, reload.
- **ESLint** – test override path added so JSON fixtures are allowed in `tests/**`.

## 5 Risks & Mitigations

| Risk                                    | Mitigation                                                                                            |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Large diff touching many files.**     | Refactor by feature cluster, merge in small PRs.                                                      |
| **Calculator performance on autosave.** | Debounce `save()`, run full calc only on explicit save/export.                                        |
| **Re-render performance degradation.**  | Use `React.memo` on stateless components; memoize selectors in provider; profile with React DevTools. |
| **Legacy helpers lingering.**           | Step 5 checklist ensures deletion; PR reviewers tag `@core` team.                                     |

---

_End of Plan_
