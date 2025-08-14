# 🚨 Architectural Rule Violations Map

**Generated**: 2025-01-12  
**Status**: Post-Character Sheet Context Migration  
**Rules Source**: `.cursor-rules/rules.yaml`

This document maps current violations of the architectural guard rails defined in our rules configuration.

---

## **Rule 5 & 6: localStorage/JSON.parse/JSON.stringify Violations** 🔴 **CRITICAL**

### **Direct localStorage Access (Rule 5 Violation)**
*"All `localStorage` interactions must be handled exclusively by `storageUtils.ts`"*

```typescript
// ❌ VIOLATIONS:
src/App.tsx:177                     - localStorage.getItem('savedCharacters')
src/App.tsx:181                     - localStorage.setItem('savedCharacters')
src/routes/character-creation/LoadCharacter.tsx:49,87,89
src/routes/character-sheet/CharacterSheetClean.tsx:1782
src/routes/character-sheet/components/PlayerNotes.tsx:50
src/lib/utils/characterEdit.ts:170,185
src/lib/utils/defenseNotes.ts:5,11,20
```

### **JSON.parse/stringify Outside storageUtils (Rule 6 Violation)**
*"`JSON.parse()` and `JSON.stringify()` are forbidden outside of `storageUtils.ts`"*

```typescript
// ❌ MAJOR VIOLATIONS:
src/App.tsx:177,181                 - Character data parsing
src/routes/character-creation/SpellsAndManeuvers.tsx:128,326,327
src/routes/character-creation/CharacterCreation.tsx:157,167,310
src/routes/character-creation/ClassFeatures.tsx:54,612,649
src/routes/character-creation/LoadCharacter.tsx:49,87,89
src/routes/character-sheet/CharacterSheetClean.tsx:133,197,200,615,669,720,768,824,869,888,1215,1782
src/lib/services/spellAssignment.ts:114,131
src/lib/services/enhancedCharacterCalculator.ts:64
src/lib/hooks/useEnhancedCharacterCalculation.ts:56,72
src/lib/utils/characterEdit.ts:170,185
src/lib/utils/defenseNotes.ts:5,11,20
```

**Impact**: These violations undermine the central persistence architecture and schema versioning system.

---

## **Rule 2: Direct dispatch() Usage** ⚠️ **MODERATE**

*"All state modifications must use typed actions through the reducer pattern"*

### **Components calling dispatch directly (should use helpers)**

```typescript
// ❌ VIOLATIONS:
src/routes/character-sheet/components/DeathExhaustion.tsx:51
src/routes/character-sheet/components/Inventory.tsx:37,42,56,70,78
src/routes/character-sheet/components/Attacks.tsx:77
src/routes/character-sheet/components/Resources.tsx:70,78
```

**Impact**: Reduces type safety and makes actions harder to track and test.

**✅ GOOD**: Provider and reducer itself use dispatch appropriately.

---

## **Rule 4: UI Components Performing Calculations** ⚠️ **MODERATE**

*"The `enhancedCharacterCalculator.ts` is the single source of truth for all character stat computation"*

### **Manual calculations in UI (should use pre-calculated values)**

```typescript
// ❌ VIOLATIONS:
src/routes/character-sheet/CharacterSheetClean.tsx:492,521,543,573
- Manual HP calculations: finalHPMax + tempHP

src/routes/character-sheet/components/EnhancedStatTooltips.tsx:107,108,222,223
- Manual breakdown calculations: finalHPMax - mightBonus

src/routes/character-sheet/hooks/CharacterSheetProvider.tsx:251,252,253
- Manual percentage calculations (these are OK as derived values)
```

**Impact**: Creates inconsistencies and makes it harder to maintain calculation logic.

---

## **Rule 8: Missing Unit Tests** ⚠️ **MODERATE**

*"All reducers, utilities, and services must have unit tests"*

### **New reducer actions without tests**

```typescript
// ❌ MISSING TESTS:
UPDATE_ACTION_POINTS_USED - Added in recent refactor but no test coverage
UPDATE_TEMP_HP - Exists but may need more test coverage
```

### **Missing test files**

```bash
# ❌ SHOULD EXIST:
src/lib/utils/defenseNotes.spec.ts
src/lib/services/spellAssignment.spec.ts
src/lib/hooks/useEnhancedCharacterCalculation.spec.ts
```

**Impact**: Reduces confidence in refactoring and increases risk of regressions.

---

## **Rule 3: Effect Objects vs Description Parsing** ⚠️ **LOW**

*"Game mechanics must be represented as Effect objects with structured data, not description parsing"*

No direct violations found, but potential areas of concern in legacy code that may need review.

---

## **Rule 7: rulesdata.spec.ts Validation** ⚠️ **LOW**

*"All rule-data must be validated using the rulesdata.spec.ts test"*

Existing but may need expansion for new rule data files.

---

## **Priority Fix Order**

### 🔴 **CRITICAL Priority**
1. **Fix localStorage/JSON violations** - These break the fundamental persistence architecture and schema versioning
   - Move all localStorage calls to storageUtils.ts
   - Replace JSON.parse/stringify with typed utilities

### ⚠️ **HIGH Priority**  
2. **Replace direct dispatch calls with helper functions** - Improves type safety and maintainability
   - Add missing helper functions to CharacterSheetProvider
   - Update components to use helpers instead of raw dispatch

### ⚠️ **MEDIUM Priority**
3. **Add missing unit tests for new reducer actions** - Ensures reliability
   - Test UPDATE_ACTION_POINTS_USED action
   - Expand test coverage for UPDATE_TEMP_HP
   
4. **Eliminate manual calculations in UI components** - Ensures consistency
   - Move calculations to enhancedCharacterCalculator
   - Use pre-calculated values from breakdowns

### ⚠️ **LOW Priority**
5. **Expand test coverage for utilities/services** - Long-term maintainability
   - Add test files for defenseNotes, spellAssignment, etc.
   - Review and expand rulesdata validation

---

## **Notes**

- The most concerning violations are the widespread use of `localStorage` and `JSON.parse/stringify` outside of `storageUtils.ts`
- These violations likely exist from legacy code that predates the current architectural rules
- The recent Character Sheet Context Migration successfully followed the rules, indicating the architecture is sound
- A systematic cleanup effort would significantly improve code quality and maintainability

---

## **Related Documents**

- `.cursor-rules/rules.yaml` - Source architectural rules
- `docs/project_overview_mindmap.md` - Current system overview
- `docs/CHAR_SHEET_UI_REFACTOR.md` - Recent successful refactor following rules
