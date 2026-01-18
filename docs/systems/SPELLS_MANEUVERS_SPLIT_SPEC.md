# Spells & Maneuvers Step Split Specification

> **Status:** ✅ **COMPLETE**  
> **Created:** 2026-01-18  
> **Last Updated:** 2026-01-18

---

## Progress Tracker

| Category | Done | Total | Progress |
|----------|------|-------|----------|
| Calculator Fixes (C1-C3) | 3 | 3 | 100% |
| Component Creation (P1-P2) | 2 | 2 | 100% |
| Wizard Updates (W1-W4) | 4 | 4 | 100% |
| Testing (T1-T5) | 5 | 5 | 100% |
| **Overall** | **14** | **14** | **100%** |

### Completion Log

| Date | Tasks Completed | Commit |
|------|-----------------|--------|
| 2026-01-18 | C1, C2, C3, P1, P2, W1, W2, W3, W4, T1, T2, T3, T4, T5 | pending |

---

## Update Rules

> **IMPORTANT:** When completing any task from this spec, you MUST:
>
> 1. Update the task's status in Section 2 from `Pending` to `**Done**`
> 2. Update the Progress Tracker counts above
> 3. Add an entry to the Completion Log with date, tasks completed, and commit hash
> 4. Commit the spec update with message: `docs: update SPELLS_MANEUVERS_SPLIT_SPEC - mark [TASK_IDS] done`

---

## 1. Overview

This specification documents the implementation plan to split the combined "Spells & Maneuvers" step in character creation into two separate, conditionally-gated steps:

- **Spells Step**: Shown when character has spell slots to fill
- **Maneuvers Step**: Shown when character has maneuvers to learn

### 1.1 Current State

The current implementation in `SpellsAndManeuvers.tsx` combines both spell and maneuver selection into a single tabbed interface (Stage 5 or 6 depending on level).

### 1.2 Target State

```
Character Creation Flow:

Level 1 Wizard:      Class → Ancestry → Attributes → Background → [Spells] → Name
Level 1 Barbarian:   Class → Ancestry → Attributes → Background → [Maneuvers] → Name  
Level 1 Spellblade:  Class → Ancestry → Attributes → Background → [Spells] → [Maneuvers] → Name
Level 5 Barbarian:   Class → Leveling → Ancestry → Attributes → Background → [Maneuvers] → Name
```

---

## 2. Task Summary

### 2.1 Calculator Fixes (C1-C3)

| ID | Task | Priority | Type | Status |
|----|------|----------|------|--------|
| C1 | Add `bonus('maneuversKnown')` to `totalManeuversKnown` | P1 | Calculator | **Done** |
| C2 | Add `bonus('spellsKnown')` to `totalSpellsKnown` | P1 | Calculator | **Done** |
| C3 | Process `GRANT_MANEUVERS` effects into maneuver count | P1 | Calculator | **Done** |

### 2.2 Component Creation (P1-P2)

| ID | Task | Priority | Type | Status |
|----|------|----------|------|--------|
| P1 | Create `Spells.tsx` component from `SpellsAndManeuvers.tsx` | P1 | Component | **Done** |
| P2 | Create `Maneuvers.tsx` component from `SpellsAndManeuvers.tsx` | P1 | Component | **Done** |

### 2.3 Wizard Updates (W1-W4)

| ID | Task | Priority | Type | Status |
|----|------|----------|------|--------|
| W1 | Update `getSteps()` with conditional Spells/Maneuvers steps | P1 | UI | **Done** |
| W2 | Update `renderCurrentStep()` with dynamic step routing | P1 | UI | **Done** |
| W3 | Update `isStepCompleted()` with validation for both steps | P1 | UI | **Done** |
| W4 | Remove/deprecate `SpellsAndManeuvers.tsx` | P2 | Cleanup | **Done** |

### 2.4 Testing (T1-T5)

| ID | Task | Priority | Type | Status |
|----|------|----------|------|--------|
| T1 | Unit tests for calculator maneuver/spell counting | P1 | Test | **Done** |
| T2 | Unit tests for step gating logic | P2 | Test | **Done** |
| T3 | Update `e2e/human-cleric.e2e.spec.ts` for Spells step | P2 | E2E | **Done** |
| T4 | Update `e2e/hunter-beastborn.e2e.spec.ts` for Maneuvers step | P2 | E2E | **Done** |
| T5 | Add E2E test for hybrid class (Spellblade) with both steps | P3 | E2E | **Done** |

---

## 3. Sources of Spells and Maneuvers

The gating logic must consider ALL sources:

### 3.1 Spell Sources

| Source | Effect Type | Example | Currently Handled |
|--------|-------------|---------|-------------------|
| Class Progression | Table gains | Wizard spells per level | ✅ Yes |
| Spellcasting Path | Path benefits | +1 spell at levels 1, 3, 4 | ✅ Yes |
| General Talents | `MODIFY_STAT` | "Spellcasting Expansion" +3 spells | ❌ No (C2) |
| Class Talents | `MODIFY_STAT` | Bard "Expanded Repertoire" +2 spells | ❌ No (C2) |
| Class Features | `GRANT_SPELL` | Wizard "Arcane Initiate" school spells | ✅ Yes |
| Ancestry Traits | `GRANT_SPELL` | "Celestial Heritage" Divine spell | ✅ Yes |

### 3.2 Maneuver Sources

| Source | Effect Type | Example | Currently Handled |
|--------|-------------|---------|-------------------|
| Class Progression | Table gains | Barbarian maneuvers per level | ✅ Yes |
| Martial Path | Path benefits | +1 maneuver per path level | ✅ Yes |
| General Talents | `MODIFY_STAT` | "Martial Expansion" +2 maneuvers | ❌ No (C1) |
| Class Features | `GRANT_MANEUVERS` | Commander +4 attack maneuvers | ❌ No (C3) |
| Subclass Features | `GRANT_MANEUVERS` | Spellblade Warrior +2 maneuvers | ❌ No (C3) |

---

## 4. Implementation Details

### 4.1 Calculator Fixes

**File:** `src/lib/services/enhancedCharacterCalculator.ts`

#### C1 & C2: Add MODIFY_STAT Bonuses

In `calculateCharacterWithBreakdowns()`, after the `bonus()` helper definition (~line 1262), add:

```typescript
// Add MODIFY_STAT bonuses for maneuvers and spells
const maneuverBonus = bonus('maneuversKnown');
const spellBonus = bonus('spellsKnown');
```

Then update `levelBudgets` to include these:

```typescript
levelBudgets: {
  // ... existing fields ...
  totalManeuversKnown: progressionGains.totalManeuversKnown + maneuverBonus + grantedManeuversCount,
  totalSpellsKnown: progressionGains.totalSpellsKnown + spellBonus,
  // ... rest ...
}
```

#### C3: Process GRANT_MANEUVERS Effects

Add a new aggregation for `GRANT_MANEUVERS`:

```typescript
// Count maneuvers from GRANT_MANEUVERS effects
const grantedManeuversCount = resolvedEffects
  .filter((e) => (e as any).type === 'GRANT_MANEUVERS')
  .reduce((sum, e) => sum + Number((e as any).value || 0), 0);
```

### 4.2 Component Creation

#### P1: Spells.tsx

Extract from `SpellsAndManeuvers.tsx`:
- Lines 1-31: Imports and helpers
- Lines 70-76: Spell filter state
- Lines 78-129: Spell availability calculation
- Lines 131-212: Spell filtering logic
- Lines 227-291: `handleSpellToggle` function
- Lines 362-378: Selection counting
- Lines 395-761: Spells tab UI

New component structure:
```typescript
// src/routes/character-creation/Spells.tsx
const Spells: React.FC = () => {
  // State and context
  const { state, dispatch, calculationResult } = useCharacter();
  
  // Spell slots from calculator
  const spellSlots = calculationResult?.spellsKnownSlots || [];
  const globalMagicProfile = calculationResult?.globalMagicProfile;
  
  // ... spell selection logic ...
  
  // Dispatch only spell updates
  dispatch({
    type: 'UPDATE_SPELLS_AND_MANEUVERS',
    spells: selectedSpells,
    maneuvers: state.selectedManeuvers // Preserve existing maneuvers
  });
  
  return (
    // Stage header + spell pockets + spell grid
  );
};
```

#### P2: Maneuvers.tsx

Extract from `SpellsAndManeuvers.tsx`:
- Lines 76: Maneuver filter state
- Lines 101-104, 113-120: Maneuver availability calculation
- Lines 214-225: Maneuver filtering logic
- Lines 293-304: `handleManeuverToggle` function
- Lines 379: Maneuver remaining calculation
- Lines 764-866: Maneuvers tab UI

New component structure:
```typescript
// src/routes/character-creation/Maneuvers.tsx
const Maneuvers: React.FC = () => {
  const { state, dispatch, calculationResult } = useCharacter();
  
  // Maneuver count from calculator
  const maneuverCount = calculationResult?.levelBudgets?.totalManeuversKnown || 0;
  
  // ... maneuver selection logic ...
  
  // Dispatch only maneuver updates
  dispatch({
    type: 'UPDATE_SPELLS_AND_MANEUVERS',
    spells: state.selectedSpells, // Preserve existing spells
    maneuvers: selectedManeuvers
  });
  
  return (
    // Stage header + maneuver filters + maneuver grid
  );
};
```

### 4.3 Wizard Updates

**File:** `src/routes/character-creation/CharacterCreation.tsx`

#### W1: Update getSteps()

```typescript
const getSteps = () => {
  // Get gating flags from calculator
  const hasSpells = (calculationResult?.spellsKnownSlots?.length ?? 0) > 0;
  const hasManeuvers = (calculationResult?.levelBudgets?.totalManeuversKnown ?? 0) > 0;
  
  const steps: Array<{ number: number; label: string }> = [];
  let stepNumber = 0;

  // Step 1: Class (always)
  stepNumber++;
  steps.push({ number: stepNumber, label: 'Class' });

  // Step 2: Leveling (if level > 1)
  if (state.level > 1) {
    stepNumber++;
    steps.push({ number: stepNumber, label: 'Leveling' });
  }

  // Fixed steps: Ancestry, Attributes, Background
  stepNumber++;
  steps.push({ number: stepNumber, label: 'Ancestry' });
  stepNumber++;
  steps.push({ number: stepNumber, label: 'Attributes' });
  stepNumber++;
  steps.push({ number: stepNumber, label: 'Background' });

  // Conditional: Spells (if character has spell slots)
  if (hasSpells) {
    stepNumber++;
    steps.push({ number: stepNumber, label: 'Spells' });
  }

  // Conditional: Maneuvers (if character has maneuvers known)
  if (hasManeuvers) {
    stepNumber++;
    steps.push({ number: stepNumber, label: 'Maneuvers' });
  }

  // Final step: Name (always)
  stepNumber++;
  steps.push({ number: stepNumber, label: 'Name' });

  return steps;
};
```

#### W2: Update renderCurrentStep()

```typescript
const renderCurrentStep = () => {
  const steps = getSteps();
  const stepByLabel = Object.fromEntries(steps.map(s => [s.label, s.number]));
  
  switch (state.currentStep) {
    case stepByLabel['Class']:
      return <><ClassSelector />{state.classId && <ClassFeatures />}</>;
    case stepByLabel['Leveling']:
      return <LevelingChoices />;
    case stepByLabel['Ancestry']:
      return <><AncestrySelector /><SelectedAncestries /></>;
    case stepByLabel['Attributes']:
      return <Attributes />;
    case stepByLabel['Background']:
      return <Background />;
    case stepByLabel['Spells']:
      return <Spells />;
    case stepByLabel['Maneuvers']:
      return <Maneuvers />;
    case stepByLabel['Name']:
      return <CharacterName />;
    default:
      return null;
  }
};
```

#### W3: Update isStepCompleted()

```typescript
// In isStepCompleted(), add validation for new steps:

// Spells step validation
if (step === stepByLabel['Spells']) {
  const slots = calculationResult?.spellsKnownSlots ?? [];
  const selectedSpells = state.selectedSpells ?? {};
  // All slots must be filled
  return slots.length > 0 && slots.every(slot => selectedSpells[slot.id]);
}

// Maneuvers step validation  
if (step === stepByLabel['Maneuvers']) {
  const required = calculationResult?.levelBudgets?.totalManeuversKnown ?? 0;
  const selected = state.selectedManeuvers?.length ?? 0;
  // Selected count must equal required count
  return required > 0 && selected === required;
}
```

---

## 5. Logging

Following `src/lib/utils/debug.ts` conventions:

| Event | Level | Category | Emoji | Data |
|-------|-------|----------|-------|------|
| Spell step rendered | debug | Spells | ✨ | `{ slotCount, selectedCount }` |
| Maneuver step rendered | debug | Calculation | 🔢 | `{ maneuverCount, selectedCount }` |
| Step gating calculated | debug | State | 🔄 | `{ hasSpells, hasManeuvers, classCategory }` |
| Spell selected | debug | Spells | ✨ | `{ slotId, spellId, slotType }` |
| Maneuver selected | debug | Calculation | 🔢 | `{ maneuverName, remaining }` |
| MODIFY_STAT bonus applied | debug | Calculation | 🔢 | `{ target, bonus, source }` |
| GRANT_MANEUVERS processed | debug | Calculation | 🔢 | `{ count, sourceFeature }` |
| Step validation | debug | State | 🔄 | `{ step, isComplete, reason }` |

### Logging Implementation

```typescript
// In Spells.tsx
debug.spells('Spell step rendered', { 
  slotCount: spellSlots.length, 
  selectedCount: Object.keys(selectedSpells).length 
});

// In Maneuvers.tsx
debug.calculation('Maneuver step rendered', {
  maneuverCount,
  selectedCount: selectedManeuvers.length
});

// In CharacterCreation.tsx getSteps()
debug.state('Step gating calculated', {
  hasSpells,
  hasManeuvers,
  classCategory: classDefinition?.classCategory
});

// In enhancedCharacterCalculator.ts
debug.calculation('MODIFY_STAT bonus applied', {
  target: 'maneuversKnown',
  bonus: maneuverBonus,
  source: 'talents'
});
```

---

## 6. Testing

### 6.1 Unit Tests

#### T1: Calculator Maneuver/Spell Counting

**File:** `src/lib/services/enhancedCharacterCalculator.aggregation.test.ts`

```typescript
describe('MODIFY_STAT effect aggregation', () => {
  it('should include Martial Expansion talent maneuvers in totalManeuversKnown', () => {
    const testCharacter = {
      classId: 'wizard', // Caster class
      level: 5,
      selectedTalents: { 'general_martial_expansion': 1 },
      // ... other fields
    };
    
    const result = calculateCharacterWithBreakdowns(convertToEnhancedBuildData(testCharacter));
    
    // Should have 2 maneuvers from Martial Expansion talent
    expect(result.levelBudgets?.totalManeuversKnown).toBeGreaterThanOrEqual(2);
  });
  
  it('should include Spellcasting Expansion talent spells in totalSpellsKnown', () => {
    const testCharacter = {
      classId: 'barbarian', // Martial class
      level: 5,
      selectedTalents: { 'general_spellcasting_expansion': 1 },
      // ... other fields
    };
    
    const result = calculateCharacterWithBreakdowns(convertToEnhancedBuildData(testCharacter));
    
    // Should have 3 spells from Spellcasting Expansion + spell slots generated
    expect(result.spellsKnownSlots.length).toBeGreaterThanOrEqual(3);
  });
});

describe('GRANT_MANEUVERS effect aggregation', () => {
  it('should include Commander martial path maneuvers', () => {
    const testCharacter = {
      classId: 'commander',
      level: 1,
      // ... other fields
    };
    
    const result = calculateCharacterWithBreakdowns(convertToEnhancedBuildData(testCharacter));
    
    // Commander L1 feature grants 4 attack maneuvers
    expect(result.levelBudgets?.totalManeuversKnown).toBeGreaterThanOrEqual(4);
  });
});
```

#### T2: Step Gating Logic

**File:** `src/routes/character-creation/CharacterCreation.test.tsx` (new)

```typescript
describe('Step gating logic', () => {
  it('should show only Spells step for pure caster (Wizard)', () => {
    // Mock calculationResult with spells but no maneuvers
    const mockResult = {
      spellsKnownSlots: [{ id: 'slot1', type: 'spell' }],
      levelBudgets: { totalManeuversKnown: 0 }
    };
    
    const steps = getSteps(mockResult, { level: 1 });
    
    expect(steps.some(s => s.label === 'Spells')).toBe(true);
    expect(steps.some(s => s.label === 'Maneuvers')).toBe(false);
  });
  
  it('should show only Maneuvers step for pure martial (Barbarian)', () => {
    const mockResult = {
      spellsKnownSlots: [],
      levelBudgets: { totalManeuversKnown: 4 }
    };
    
    const steps = getSteps(mockResult, { level: 1 });
    
    expect(steps.some(s => s.label === 'Spells')).toBe(false);
    expect(steps.some(s => s.label === 'Maneuvers')).toBe(true);
  });
  
  it('should show both steps for hybrid (Spellblade)', () => {
    const mockResult = {
      spellsKnownSlots: [{ id: 'slot1', type: 'spell' }],
      levelBudgets: { totalManeuversKnown: 2 }
    };
    
    const steps = getSteps(mockResult, { level: 1 });
    
    expect(steps.some(s => s.label === 'Spells')).toBe(true);
    expect(steps.some(s => s.label === 'Maneuvers')).toBe(true);
  });
});
```

### 6.2 E2E Tests

#### T3: Update human-cleric.e2e.spec.ts

```typescript
// Step 5 is now just "Spells" (no Maneuvers tab)
// Update line ~120:
// Step 5: Spells
await expect(page.getByRole('heading', { name: /Spells/i })).toBeVisible();
// Remove tab clicking - no longer tabbed interface
// ... rest of spell selection logic ...
```

#### T4: Update hunter-beastborn.e2e.spec.ts

```typescript
// Hunter is martial - should have Maneuvers step but NOT Spells step
// Add verification that Spells step doesn't appear
await expect(page.getByRole('button', { name: /Spells/i })).not.toBeVisible();
// Proceed to Maneuvers step
await page.getByRole('button', { name: 'Next →' }).click();
await expect(page.getByRole('heading', { name: /Maneuvers/i })).toBeVisible();
```

#### T5: Add Spellblade E2E Test

**File:** `e2e/spellblade-hybrid.e2e.spec.ts` (new)

```typescript
test('Spellblade character creation with both Spells and Maneuvers steps', async ({ page }) => {
  // ... setup ...
  
  // Select Spellblade class
  await page.getByRole('button', { name: /Spellblade/i }).click();
  
  // ... complete other steps ...
  
  // Verify both steps appear in stepper
  await expect(page.getByRole('button', { name: /Spells/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Maneuvers/i })).toBeVisible();
  
  // Complete Spells step
  await page.getByRole('button', { name: 'Next →' }).click();
  await expect(page.getByRole('heading', { name: /Spells/i })).toBeVisible();
  // ... select spells ...
  
  // Complete Maneuvers step
  await page.getByRole('button', { name: 'Next →' }).click();
  await expect(page.getByRole('heading', { name: /Maneuvers/i })).toBeVisible();
  // ... select maneuvers ...
  
  // Proceed to Name step
  await page.getByRole('button', { name: 'Next →' }).click();
  await expect(page.getByRole('heading', { name: /Name/i })).toBeVisible();
});
```

---

## 7. Edge Cases

| Scenario | hasSpells | hasManeuvers | Steps Shown |
|----------|-----------|--------------|-------------|
| Wizard L1 | true | false | Spells only |
| Barbarian L1 | false | true | Maneuvers only |
| Spellblade L1 | true | true | Both steps |
| Wizard + Martial Expansion talent | true | true | Both steps |
| Barbarian + Spellcasting Expansion talent | true | true | Both steps |
| Cleric L5 + 2 Martial Path points | true | true | Both steps |
| Wizard L1 (no class selected yet) | false | false | Neither step |

---

## 8. Key Files

| File | Action |
|------|--------|
| `src/lib/services/enhancedCharacterCalculator.ts` | Modify - Add maneuver/spell bonuses (C1, C2, C3) |
| `src/routes/character-creation/Spells.tsx` | Create - Extract from SpellsAndManeuvers (P1) |
| `src/routes/character-creation/Maneuvers.tsx` | Create - Extract from SpellsAndManeuvers (P2) |
| `src/routes/character-creation/CharacterCreation.tsx` | Modify - Dynamic steps (W1, W2, W3) |
| `src/routes/character-creation/SpellsAndManeuvers.tsx` | Delete or deprecate (W4) |
| `src/lib/services/enhancedCharacterCalculator.aggregation.test.ts` | Modify - Add tests (T1) |
| `src/routes/character-creation/CharacterCreation.test.tsx` | Create - Step gating tests (T2) |
| `e2e/human-cleric.e2e.spec.ts` | Modify - Update for Spells step (T3) |
| `e2e/hunter-beastborn.e2e.spec.ts` | Modify - Update for Maneuvers step (T4) |
| `e2e/spellblade-hybrid.e2e.spec.ts` | Create - Hybrid class test (T5) |

---

## 9. Acceptance Criteria

- [ ] `totalManeuversKnown` includes `MODIFY_STAT` bonuses from talents
- [ ] `totalManeuversKnown` includes `GRANT_MANEUVERS` effects from features
- [ ] `totalSpellsKnown` includes `MODIFY_STAT` bonuses from talents
- [ ] Wizard (pure caster) shows only Spells step
- [ ] Barbarian (pure martial) shows only Maneuvers step
- [ ] Spellblade (hybrid) shows both Spells and Maneuvers steps
- [ ] Martial Expansion talent enables Maneuvers step for caster
- [ ] Spellcasting Expansion talent enables Spells step for martial
- [ ] Spells step validation: all slots must be filled
- [ ] Maneuvers step validation: selected count equals required count
- [ ] All unit tests pass
- [ ] All E2E tests pass

---

## 10. Dependencies

This spec depends on the following completed work:

- [x] LEVELING_GAPS_SPEC.md - Class category metadata (L10)
- [x] LEVELING_GAPS_SPEC.md - Path progression fixes (L7, L8)
- [x] LEVELING_GAPS_SPEC.md - General talent fixes (T1, T2)

---

> **Related Systems:**
> - [CHARACTER_CREATION_FLOW.MD](./CHARACTER_CREATION_FLOW.MD)
> - [SPELLS_SYSTEM.MD](./SPELLS_SYSTEM.MD)
> - [MARTIALS_SYSTEM.MD](./MARTIALS_SYSTEM.MD)
> - [CALCULATION_SYSTEM.MD](./CALCULATION_SYSTEM.MD)
> - [LEVELING_GAPS_SPEC.md](./LEVELING_GAPS_SPEC.md)
