# Character Calculation Flow Audit

**Status:** All calculations now occur in a single place (✅ GOOD)
**Date:** 2025-10-02

---

## Executive Summary

All character values are calculated **once** in `calculateCharacterWithBreakdowns()` (line 669-1213 in `enhancedCharacterCalculator.ts`). This is the **single source of truth** for all stats.

---

## Calculation Flow

### 1. User Completes Character Creation

```
CharacterCreation.tsx:116 → handleNext()
  ↓
characterCompletion.ts:27 → convertToEnhancedBuildData()
  ↓
characterCompletion.ts:56 → calculateCharacterWithBreakdowns()
  ↓
RESULT: EnhancedCalculationResult with all stats
  ↓
characterCompletion.ts:74 → Save to localStorage
```

---

## All Character Values & Where They're Calculated

### ✅ Base Attributes (Lines 696-706)

- **Might, Agility, Charisma, Intelligence**
- **Source:** User input (from Attributes step)
- **Calculation:** `createStatBreakdown()` applies effects from ancestry/traits/class
- **Calculated Once:** Line 696-700

---

### ✅ Combat Mastery (Line 709)

```typescript
const combatMastery = Math.ceil(buildData.level / 2);
```

- **Formula:** `Math.ceil(level / 2)`
- **Examples:**
  - Level 1-2: Combat Mastery = 1
  - Level 3-4: Combat Mastery = 2
  - Level 5-6: Combat Mastery = 3
- **Calculated Once:** Line 709 ✅
- **Used In:** PD, AD, Saves, Initiative, Save DC

---

### ✅ Prime Attribute (Lines 731-742)

```typescript
const maxValue = Math.max(finalMight, finalAgility, finalCharisma, finalIntelligence);
const primeAttribute = attributesAtMax[0] || 'might'; // tie-breaker: might > agility > charisma > intelligence
```

- **Calculated Once:** Line 731-742
- **Used In:** Save DC, Death Threshold, Attack/Spell Check

---

### ✅ Health & Resources (Lines 712-714, 773-775)

#### HP (Line 712)

```typescript
finalHPMax = finalMight + progressionGains.totalHP;
```

- **Base:** Might attribute
- **Progression:** Sum of HP from class table levels 1-N
- **Effects:** Applied via `createStatBreakdown()` at line 759
- **Final Value:** Line 773 (from breakdown.total)

#### SP (Line 713)

```typescript
finalSPMax = progressionGains.totalSP;
```

- **Source:** Sum of SP from class progression levels 1-N
- **Missing:** Path bonuses (⚠️ TO BE ADDED in M3.9)
- **Effects:** Applied via breakdown at line 760
- **Final Value:** Line 774

#### MP (Line 714)

```typescript
finalMPMax = progressionGains.totalMP;
```

- **Source:** Sum of MP from class progression levels 1-N
- **Missing:** Path bonuses (⚠️ TO BE ADDED in M3.9)
- **Effects:** Applied via breakdown at line 761
- **Final Value:** Line 775

---

### ✅ Defenses (Lines 719-729)

#### Physical Defense (PD)

```typescript
basePD = 8 + combatMastery + finalAgility + finalIntelligence;
finalPD = buildData.manualPD ?? basePD + pdModifiers;
```

- **Formula:** 8 + Combat Mastery + Agility + Intelligence + modifiers
- **Manual Override:** Allowed (for character sheet editing)
- **Calculated Once:** Line 719, 727

#### Arcane Defense (AD)

```typescript
baseAD = 8 + combatMastery + finalMight + finalCharisma;
finalAD = buildData.manualAD ?? baseAD + adModifiers;
```

- **Formula:** 8 + Combat Mastery + Might + Charisma + modifiers
- **Calculated Once:** Line 720, 728

#### Physical Damage Reduction (PDR)

```typescript
finalPDR = buildData.manualPDR ?? 0;
```

- **Default:** 0 (unless manually set)
- **Calculated Once:** Line 729

---

### ✅ Saves (Lines 744-749)

```typescript
finalSaveDC = 10 + combatMastery + maxValue;
finalSaveMight = finalMight + combatMastery;
finalSaveAgility = finalAgility + combatMastery;
finalSaveCharisma = finalCharisma + combatMastery;
finalSaveIntelligence = finalIntelligence + combatMastery;
finalDeathThreshold = maxValue + combatMastery;
```

- **Save DC:** 10 + Combat Mastery + Prime Attribute
- **Individual Saves:** Attribute + Combat Mastery
- **Death Threshold:** Prime Attribute + Combat Mastery
- **Calculated Once:** Lines 744-750

---

### ✅ Initiative (Lines 755, 790-808)

```typescript
finalInitiativeBonus = combatMastery + finalAgility;
```

- **Formula:** Combat Mastery + Agility
- **Breakdown:** Custom breakdown created at line 790-808
- **Calculated Once:** Line 755

---

### ✅ Movement (Lines 751-752, 769-770)

```typescript
baseMoveSpeed = 5;
baseJumpDistance = finalAgility;
```

- **Move Speed:** Base 5 + effects
- **Jump Distance:** Agility + effects
- **Calculated Once:** Lines 751-752
- **Final Values:** Lines 776-777 (from breakdowns)

---

### ✅ Rest & Grit Points (Lines 753-754)

```typescript
finalRestPoints = finalHPMax;
finalGritPoints = Math.max(0, 2 + finalCharisma);
```

- **Rest Points:** Equal to HP Max
- **Grit Points:** 2 + Charisma (minimum 0)
- **Calculated Once:** Lines 753-754

---

### ✅ Combat Stats (Lines 781-786, 895-923)

#### Attack/Spell Check (Line 781)

```typescript
attackSpellCheckBase = combatMastery + maxValue;
```

- **Formula:** Combat Mastery + Prime Attribute + effects
- **Calculated Once:** Line 781

#### Martial Check (Lines 895-923)

```typescript
acrobaticsTotal = finalAgility + acrobaticsProficiency * 2;
athleticsTotal = finalMight + athleticsProficiency * 2;
finalMartialCheck = Math.max(acrobaticsTotal, athleticsTotal);
```

- **Formula:** Max(Acrobatics, Athletics)
- **Calculated Once:** Lines 895-923
- **Note:** Uses skill proficiency from background

---

### ✅ Background Points (Lines 811-886)

#### Skill Points (Line 829)

```typescript
baseSkillPoints = 5 + progressionGains.totalSkillPoints + finalIntelligence + bonus('skillPoints');
```

- **Base:** 5
- **Progression:** Sum from class table
- **Intelligence:** Added once
- **Talents:** Effect bonuses
- **Calculated Once:** Line 829

#### Trade Points (Line 830)

```typescript
baseTradePoints = 3 + progressionGains.totalTradePoints + bonus('tradePoints');
```

- **Base:** 3
- **Progression:** Sum from class table
- **Talents:** Effect bonuses
- **Calculated Once:** Line 830

#### Language Points (Line 831)

```typescript
baseLanguagePoints = 2 + bonus('languagePoints');
```

- **Base:** 2 (does NOT scale with level)
- **Talents:** Effect bonuses
- **Calculated Once:** Line 831

#### Conversions (Lines 839-841)

```typescript
availableSkillPoints = baseSkillPoints - skillToTrade + Math.floor(tradeToSkill / 2);
availableTradePoints = baseTradePoints - tradeToSkill + skillToTrade * 2 - tradeToLanguage;
availableLanguagePoints = baseLanguagePoints + tradeToLanguage * 2;
```

- **Skill ↔ Trade:** 1 skill = 2 trade (or 2 trade = 1 skill)
- **Trade → Language:** 1 trade = 2 language
- **Calculated Once:** Lines 839-841

---

### ✅ Ancestry Points (Lines 844-851)

```typescript
baseAncestryPoints = 5 + bonus('ancestryPoints');
ancestryPointsUsed = selectedTraitCosts;
ancestryPointsRemaining = baseAncestryPoints - ancestryPointsUsed;
```

- **Base:** 5
- **Talents:** Effect bonuses
- **Usage:** Sum of selected trait costs
- **Calculated Once:** Lines 844-851

---

### ✅ Attribute Points (Line 766)

```typescript
breakdowns.attributePoints = createStatBreakdown(
	'attributePoints',
	12 + progressionGains.totalAttributePoints,
	resolvedEffects
);
```

- **Base:** 12
- **Progression:** Sum from class table
- **Effects:** Applied via breakdown
- **Calculated Once:** Line 766

---

### ✅ Progression Gains (Line 691)

```typescript
const progressionGains = aggregateProgressionGains(classProgressionData, buildData.level);
```

**Function:** `aggregateProgressionGains()` (lines 532-662)

Aggregates from class progression tables (levels 1 to targetLevel):

- `totalHP` - Sum of gainedHealth
- `totalSP` - Sum of gainedStaminaPoints ⚠️ **Missing path bonuses**
- `totalMP` - Sum of gainedManaPoints ⚠️ **Missing path bonuses**
- `totalSkillPoints` - Sum of gainedSkillPoints
- `totalTradePoints` - Sum of gainedTradePoints
- `totalAttributePoints` - Sum of gainedAttributePoints
- `totalManeuversKnown` - Sum of gainedManeuversKnown ⚠️ **Missing path bonuses**
- `totalTechniquesKnown` - Sum of gainedTechniquesKnown ⚠️ **Missing path bonuses**
- `totalCantripsKnown` - Sum of gainedCantripsKnown ⚠️ **Missing path bonuses**
- `totalSpellsKnown` - Sum of gainedSpellsKnown ⚠️ **Missing path bonuses**
- `totalTalents` - Sum of gains.talents
- `totalPathPoints` - Sum of gains.pathPoints
- `totalAncestryPoints` - Sum of gains.ancestryPoints
- `unlockedFeatureIds` - Array of feature IDs unlocked at each level
- `pendingSubclassChoices` - Count of subclass choice flags

**Calculated Once:** Line 691 (calls aggregateProgressionGains())

---

## 🚨 Issues Found

### ⚠️ Issue 1: Path Bonuses Not Applied

**Location:** `aggregateProgressionGains()` (lines 532-662)

**Problem:**

- Function only sums values from class progression tables
- Does NOT add bonuses from path point allocations
- Missing integration with `CHARACTER_PATHS` data

**Affected Stats:**

- SP (Martial Path gives +1 SP at levels 1 & 3)
- MP (Spellcaster Path gives +2 MP at levels 1 & 2)
- Maneuvers (Martial Path gives +1 at levels 1, 2, 3, 4)
- Techniques (Martial Path gives +1 at levels 1 & 3)
- Cantrips (Spellcaster Path gives +1 at levels 1 & 2)
- Spells (Spellcaster Path gives +1 at levels 1 & 2)

**Impact:**

```typescript
// CURRENT (WRONG):
Level 5 Barbarian with 2 martial path points
- SP: 1 (L1) + 1 (L3) = 2 ❌ (should be 3)
- Maneuvers: 4 (L1) + 1 (L5) = 5 ❌ (should be 7)
- Techniques: 1 (L3) = 1 ❌ (should be 2)

// EXPECTED (CORRECT):
Level 5 Barbarian with 2 martial path points
- SP: 1 (L1) + 1 (L3) + 1 (path L1) = 3 ✅
- Maneuvers: 4 (L1) + 1 (L5) + 1 (path L1) + 1 (path L2) = 7 ✅
- Techniques: 1 (L3) + 1 (path L1) = 2 ✅
```

**Fix:** Milestone M3.9 (in progress)

---

### ⚠️ Issue 2: Missing pathPointAllocations in Input Data

**Location:** `EnhancedCharacterBuildData` interface

**Problem:**

- No field to store which path points user has allocated
- Can't calculate path bonuses without knowing allocation

**Fix:** Add `pathPointAllocations?: { martial?: number; spellcasting?: number }` to type

---

## ✅ No Double Calculations Found

**All values calculated exactly once in `calculateCharacterWithBreakdowns()`.**

Previously had 3 calculations of `combatMastery`:

1. Line 85 in `convertToEnhancedBuildData()` ❌ REMOVED
2. Line 34 in `characterCompletion.ts` ❌ REMOVED
3. Line 709 in `calculateCharacterWithBreakdowns()` ✅ KEPT (single source of truth)

---

## Flow Validation

### Character Creation

```
1. User input (steps 1-6) → characterContext state
2. Click "Complete" → handleNext()
3. completeCharacter(state) → convertToEnhancedBuildData()
4. calculateCharacterWithBreakdowns() → EnhancedCalculationResult
5. Save to localStorage → done
```

### Character Sheet Display

```
1. Load from localStorage → SavedCharacter
2. Display final* values directly (no recalculation)
3. For tooltips: use breakdowns from cache or recalculate
```

### Character Editing

```
1. Load character → convertCharacterToInProgress()
2. Edit in creation flow
3. completeCharacterEdit() → recalculate all stats
4. Preserve manual overrides (manualPD, manualAD, etc.)
```

---

## Next Steps

**M3.9: Fix Combat Mastery & Path Bonuses**

- [x] M3.9a: Combat mastery calculation (DONE)
- [ ] M3.9b: Create helper to aggregate path bonuses
- [ ] M3.9c: Integrate into aggregateProgressionGains()
- [ ] M3.9d: Add pathPointAllocations to type

**M3.10: Subclass Selection**

- [ ] Detect pendingSubclassChoice flag
- [ ] Create SubclassSelector UI
- [ ] Add validation
- [ ] Update calculator to apply subclass features

---

## Conclusion

✅ **Single Source of Truth:** All calculations in one place  
✅ **No Double Calculations:** Combat mastery issue fixed  
⚠️ **Missing Feature:** Path point bonuses not yet integrated  
✅ **Clean Flow:** Input → Calculate → Save → Display
