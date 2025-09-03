Of course. Forgoing backward compatibility significantly simplifies the implementation, making it faster and cleaner. The plan will now focus on a "clean slate" refactor.

Here is the revised technical plan, updated to remove all backward compatibility logic.

---

# Technical Plan: Refactor State Management for UI Selections (Simplified)

| Status     | **Ready for Development** |
| :--------- | :------------------------ |
| **Ticket** | `TICKET-UI-124`           |
| **Owner**  | Development Team          |
| **Date**   | August 12, 2025           |

## 1. Executive Summary

A systemic inconsistency exists where our character creation state (`characterContext`) stores complex data as serialized JSON strings, while UI components expect native JavaScript objects and arrays. This causes critical UI bugs, such as selection controls appearing disabled or failing to persist user choices.

This plan outlines a **clean refactor** to standardize on native data structures within the React Context. This change will be treated as a **breaking change for existing saved characters in `localStorage`**, which will be cleared as a prerequisite. The fix will simplify component logic, eliminate a class of bugs, and improve overall code quality.

## 2. The Core Issue (Problem Definition)

The `characterContext` reducer currently serializes arrays and objects into JSON strings before storing them in the state (e.g., `selectedFeatureChoices` is stored as the string `"{}"`).

However, UI components like `ClassFeatures.tsx` attempt to read this data directly as if it were an object. This leads to incorrect behavior where selection controls are disabled and user choices do not persist correctly.

## 3. Goal & Success Criteria

The goal is to refactor the state management to be consistent, robust, and bug-free for all UI selection elements.

**Success Criteria:**

1.  All interactive selection elements in the character creator (checkboxes, radio buttons) are fully functional.
2.  User choices for class features, traits, spells, and maneuvers are correctly persisted between steps.
3.  Selection quotas (e.g., "Choose 2 Favored Terrains") are accurately enforced.
4.  The codebase is simplified by removing all instances of `JSON.parse` and `JSON.stringify` from UI component logic related to character state.

## 4. Recommended Strategy

We will standardize on native objects and arrays within the `characterContext`. This establishes a single, consistent rule: the React Context stores real data structures, never JSON strings.

> **IMPORTANT PREREQUISITE**
>
> This plan does **not** support backward compatibility. Before testing, all developers must clear their existing character data from `localStorage`.
>
> **Action:** Open browser DevTools -> Application -> Local Storage -> Right-click `savedCharacters` -> Delete.

## 5. Affected Components & Files

| Component/File                   | Path                                                               | Required Change                                                                                                |
| :------------------------------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| **`characterContext.tsx`**       | `src/lib/stores/characterContext.tsx`                              | **Core Change:** Update types, initial state, **`CharacterAction`**, and reducer to use native objects/arrays. |
| **`storageUtils.ts`**            | `src/lib/utils/storageUtils.ts`                                    | Read/write native objects; embed a `schemaVersion` guard; drop all `JSON.stringify` calls.                     |
| **`ClassFeatures.tsx`**          | `src/routes/character-creation/ClassFeatures.tsx`                  | Read `selectedFeatureChoices` as an object.                                                                    |
| **`SelectedAncestries.tsx`**     | `src/routes/character-creation/SelectedAncestries.tsx`             | Read `selectedTraitIds` as an array.                                                                           |
| **`SpellsAndManeuvers.tsx`**     | `src/routes/character-creation/SpellsAndManeuvers.tsx`             | Treat `selectedSpells` and `selectedManeuvers` as arrays.                                                      |
| **`Background.tsx`**             | `src/routes/character-creation/Background.tsx`                     | Read from new `skillsData`, `tradesData`, `languagesData` properties.                                          |
| **`TraitChoiceSelector.tsx`**    | `src/routes/character-creation/components/TraitChoiceSelector.tsx` | Read `selectedTraitChoices` as an object.                                                                      |
| **`[characterId].ts` API route** | `src/api/character/[characterId].ts`                               | Update DTO types & validation to match the new context shape.                                                  |
| **`characterEdit.ts`**           | `src/lib/utils/characterEdit.ts`                                   | Simplify `convertCharacterToInProgress` to directly map fields.                                                |
| **`characterCompletion.ts`**     | `src/lib/services/characterCompletion.ts`                          | Ensure the service correctly reads native object/array from the final state.                                   |

## 6. Implementation Steps

### Step 1: Refactor `characterContext.tsx` (The Clean Method)

**A. Update Types and Initial State**

Modify the `CharacterInProgressStoreData` interface and `initialCharacterInProgressState` to use native data structures. Rename `...Json` fields for clarity.

```typescript
// In: src/lib/stores/characterContext.tsx

// --- UPDATE THE INTERFACE ---
export interface CharacterInProgressStoreData
	extends Omit<
		CharacterInProgress,
		| 'selectedTraitIds'
		| 'selectedFeatureChoices'
		| 'selectedTraitChoices'
		| 'skillsJson'
		| 'tradesJson'
		| 'languagesJson'
		| 'selectedSpells'
		| 'selectedManeuvers'
	> {
	// ... other fields
	selectedTraitIds: string[];
	selectedFeatureChoices: Record<string, any>; // Can be string or string[]
	selectedTraitChoices: Record<string, string>;
	skillsData: Record<string, number>;
	tradesData: Record<string, number>;
	languagesData: Record<string, { fluency: 'limited' | 'fluent' }>;
	selectedSpells: string[];
	selectedManeuvers: string[];
	// ...
}

// --- UPDATE THE INITIAL STATE ---
const initialCharacterInProgressState: CharacterInProgressStoreData = {
	// ... other fields
	id: '',
	attribute_might: -2,
	// ...
	selectedTraitIds: [],
	selectedFeatureChoices: {},
	selectedTraitChoices: {},
	skillsData: {}, // Renamed from skillsJson
	tradesData: {}, // Renamed from tradesJson
	languagesData: { common: { fluency: 'fluent' } }, // Renamed from languagesJson
	selectedSpells: [],
	selectedManeuvers: []
	// ...
};
```

**B. Update the Reducer**

Remove **all** `JSON.stringify()` calls. The reducer will now receive and store native objects/arrays directly.

```typescript
// In: src/lib/stores/characterContext.tsx -> characterReducer()

function characterReducer(
	state: CharacterInProgressStoreData,
	action: CharacterAction
): CharacterInProgressStoreData {
	switch (action.type) {
		// ... other cases
		case 'UPDATE_SKILLS':
			// The payload `action.skillsData` is already an object
			return { ...state, skillsData: action.skillsData };
		case 'UPDATE_TRADES':
			return { ...state, tradesData: action.tradesData };
		case 'UPDATE_LANGUAGES':
			return { ...state, languagesData: action.languagesData };
		case 'SET_TRAITS':
			return { ...state, selectedTraitIds: action.selectedTraitIds }; // No stringify
		case 'SET_FEATURE_CHOICES':
			return { ...state, selectedFeatureChoices: action.selectedFeatureChoices }; // No stringify
		case 'UPDATE_SPELLS_AND_MANEUVERS':
			return { ...state, selectedSpells: action.spells, selectedManeuvers: action.maneuvers }; // No stringify
		case 'INITIALIZE_FROM_SAVED':
			// When editing, ensure the loaded data conforms to the new shape.
			// This assumes `action.character` is pre-processed if it comes from an old save.
			// Since we are not supporting backward compatibility, this can be a direct spread.
			return { ...initialCharacterInProgressState, ...action.character };
		// ... other cases
	}
}
```

**C. Update `CharacterAction` Discriminated Union**

Create precise payload typings so reducers stay type-safe.

```typescript
// In: src/lib/stores/characterContext.tsx

export type CharacterAction =
	| { type: 'UPDATE_ATTRIBUTE'; attribute: string; value: number }
	| { type: 'UPDATE_SKILLS'; skillsData: Record<string, number> }
	| { type: 'UPDATE_TRADES'; tradesData: Record<string, number> }
	| { type: 'UPDATE_LANGUAGES'; languagesData: LanguagesData }
	| { type: 'SET_CLASS'; classId: string | null }
	| { type: 'SET_ANCESTRY'; ancestry1Id: string | null; ancestry2Id: string | null }
	| { type: 'SET_TRAITS'; selectedTraitIds: string[] }
	| { type: 'SET_FEATURE_CHOICES'; selectedFeatureChoices: Record<string, string | string[]> }
	| { type: 'UPDATE_TRAIT_CHOICE'; traitId: string; effectIndex: number; choice: string }
	| { type: 'INVALIDATE_CACHE' }
	| { type: 'UPDATE_SPELLS_AND_MANEUVERS'; spells: string[]; maneuvers: string[] }
	| { type: 'UPDATE_STORE'; updates: Partial<CharacterInProgressStoreData> }
	| { type: 'INITIALIZE_FROM_SAVED'; character: CharacterInProgressStoreData }
	| { type: 'NEXT_STEP' }
	| { type: 'PREVIOUS_STEP' }
	| { type: 'SET_STEP'; step: number }
	| {
			type: 'SET_CONVERSIONS';
			conversions: { skillToTrade?: number; tradeToSkill?: number; tradeToLanguage?: number };
	  };
```

> **Why:** Strong typing prevents accidental re-introduction of stringified fields.

### Step 2: Update UI Components to Remove `JSON.parse`

This step is now a simple cleanup. Search for `JSON.parse` across the feature and remove it where it was used to read from the context state.

- **`ClassFeatures.tsx`**:

  ```diff
  - const selectedFeatureChoices: { [key: string]: string } = JSON.parse(state.selectedFeatureChoices || '{}');
  + const selectedFeatureChoices = state.selectedFeatureChoices || {};
  ```

- **`SelectedAncestries.tsx`**:

  ```diff
  - const selectedTraits: string[] = JSON.parse(state.selectedTraitIds || '[]');
  + const selectedTraits: string[] = state.selectedTraitIds || [];
  ```

- **`SpellsAndManeuvers.tsx`**:

  ```diff
  // In the initial useEffect hook
  - if (state.selectedSpells) { const spells = JSON.parse(state.selectedSpells); ... }
  + if (state.selectedSpells) { setSelectedSpells(state.selectedSpells); }

  - if (state.selectedManeuvers) { const maneuvers = JSON.parse(state.selectedManeuvers); ... }
  + if (state.selectedManeuvers) { setSelectedManeuvers(state.selectedManeuvers); }
  ```

- **`Background.tsx`**:
  ```diff
  - const currentSkills = state.skillsJson ? JSON.parse(state.skillsJson) : {};
  + const currentSkills = state.skillsData || {};
  // Repeat for tradesData and languagesData
  ```

### Step 3: Simplify Data Handling Utilities

The `characterEdit.ts` utility no longer needs complex hydration logic.

- **`characterEdit.ts`**:

  ```typescript
  // In: src/lib/utils/characterEdit.ts

  import type { CharacterInProgressStoreData } from '../stores/characterContext';
  import type { SavedCharacter } from '../types/dataContracts';

  // This function becomes a simple mapping.
  export const convertCharacterToInProgress = (
  	savedCharacter: SavedCharacter
  ): CharacterInProgressStoreData => {
  	return {
  		...initialCharacterInProgressState, // Start with defaults
  		...savedCharacter, // Spread saved character data
  		// Ensure fields that were previously JSON are now handled correctly as objects/arrays
  		skillsData: savedCharacter.skillsData || {},
  		tradesData: savedCharacter.tradesData || {},
  		languagesData: savedCharacter.languagesData || { common: { fluency: 'fluent' } }
  	};
  };
  ```

### Step 4: Update Persistence Layer (LocalStorage & API)

- **`storageUtils.ts`**
  - Replace `saveCharacter()` / `loadSavedCharacters()` to store native objects.
  - Add a constant `CURRENT_SCHEMA_VERSION = 2`.
  - When loading, drop any entry whose `schemaVersion !== CURRENT_SCHEMA_VERSION`.

- **API – `src/api/character/[characterId].ts`**
  - Replace any `JSON.parse` / `JSON.stringify` logic.
  - Update the Prisma client call and Zod schema so the DB rows mirror the new field names (`skillsData`, etc.).

### Step 5: Introduce a `schemaVersion` Field

Add `schemaVersion: 2` to `CharacterInProgressStoreData` and ensure it is saved with every character.  
On application bootstrap, wipe `localStorage` records whose version is missing or < 2.

### Step 6: Automated Tests & Code-Quality Gates

1. **Unit (Vitest)**
   - `characterContext.reducer.spec.ts` – exhaustive switch–case test set.
   - `storageUtils.spec.ts` – ensure version guard purges old data.

2. **E2E (Playwright)**
   - End-to-end journey: create → navigate away/back → reload → verify persistence.

3. **Lint / CI**
   - Add ESLint `no-restricted-syntax` rule banning `JSON.parse`/`JSON.stringify` inside `src/`.
   - Integrate `vitest --coverage`
