# Leveling System Gap Fixes Specification

> **Status:** In Progress  
> **Created:** 2026-01-18  
> **Last Updated:** 2026-01-18

---

## Progress Tracker

| Category | Done | Total | Progress |
|----------|------|-------|----------|
| Leveling System (L1-L13) | 13 | 13 | 100% |
| Talent Data (T1-T12) | 12 | 12 | 100% |
| UI/Multiclass (UI1-UI4) | 4 | 4 | 100% |
| **Overall** | **29** | **29** | **100%** |

### Completion Log

| Date | Gaps Completed | Commit |
|------|----------------|--------|
| 2026-01-18 | L1, L3, L4, L5, L7, L8, T1-T12, UI1, UI3 | `4f5ee8e` |
| 2026-01-18 | L2, L6, L9, L10, L11, L12, L13, UI2, UI4 | `50fb90f` |

---

## Update Rules

> **IMPORTANT:** When completing any gap from this spec, you MUST:
>
> 1. Update the gap's status in section 2 from `Pending` to `**Done**`
> 2. Update the Progress Tracker counts above
> 3. Add an entry to the Completion Log with date, gaps completed, and commit hash
> 4. Commit the spec update with message: `docs: update LEVELING_GAPS_SPEC - mark [GAP_IDS] done`

---

## 1. Overview

This specification documents all identified gaps in the DC20 v0.10 leveling system implementation and provides the implementation plan to fix them. The gaps fall into three categories: data mismatches, calculation logic issues, and UI bugs.

---

## 2. Gap Summary

### 2.1 Leveling System Gaps (L1-L13)

| ID | Gap | Priority | Type | Status |
|----|-----|----------|------|--------|
| L1 | Level cap hardcoded to 5 (should be 10) | P1 | UI | **Done** |
| L2 | Leveling validation disabled | P2 | UI | **Done** |
| L3 | General talents in LevelingChoices.tsx hardcoded and mismatched | P1 | UI/Data | **Done** |
| L4 | Talent values incorrect (Ancestry +2 vs +4) | P1 | Data | **Done** |
| L5 | Missing general talents in UI (Martial/Spellcasting Expansion) | P2 | UI | **Done** |
| L6 | LEVELING_SYSTEM.MD references removed "Techniques" | P3 | Docs | **Done** |
| L7 | Spellcaster Path gives +2 MP, rules say +3 MP at level 1 | P1 | Data | **Done** |
| L8 | Cross-path rule text incorrect ("2 points" vs "first time") | P2 | Data | **Done** |
| L9 | Cross-path rules not enforced (text-only display) | P2 | Calc/UI | **Done** |
| L10 | Missing class category metadata | P2 | Data | **Done** |
| L11 | Missing "Spellcaster Stamina Regen" grant | P2 | Calc | **Done** |
| L12 | Missing spell list choice for martials taking spellcaster | P2 | UI | **Done** |
| L13 | Missing Combat Training grants from path progression | P2 | Calc | **Done** |

### 2.2 Talent Data Gaps (T1-T12)

| ID | Class | Talent | Issue | Priority | Status |
|----|-------|--------|-------|----------|--------|
| T1 | General | Ancestry Increase | Value: +4 (rules) vs +2 (code) | P1 | **Done** |
| T2 | General | Spellcasting Expansion | Has +2 MP not in rules - remove | P1 | **Done** |
| T3 | Champion | Disciplined Combatant | SP cost: 2 (rules) vs 1 (code) | P1 | **Done** |
| T4 | Monk | Internal Damage | Damage type: True (rules) vs Sonic (code) | P1 | **Done** |
| T5 | Monk | Steel Fist | Opposite effect: "gain Impact" (rules) vs "lose Impact" (code) | P1 | **Done** |
| T6 | Sorcerer | Greater Innate Power | Missing "1 point Focus Property" benefit | P2 | **Done** |
| T7 | Sorcerer | Font of Magic | Rest Points: 2 (rules) vs 1 (code) | P1 | **Done** |
| T8 | Spellblade | Sling-Blade | Missing prerequisite: Spellstrike | P2 | **Done** |
| T9 | Commander | Seize Momentum | Missing prerequisite: Commanding Aura | P2 | **Done** |
| T10 | Wizard | Expanded Spell School | "2 Spells" (rules) vs "1 Cantrip + 1 Spell" (code) | P2 | **Done** |
| T11 | Wizard | Crowned Sigil | "any willing creature" (rules) vs "yourself" (code) | P2 | **Done** |
| T12 | Wizard | Overly Prepared Spellcaster | Missing benefits; Dazed Resistance is unconditional | P2 | **Done** |

### 2.3 UI/Multiclass Gaps (UI1-UI4)

| ID | Component | Issue | Priority | Status |
|----|-----------|-------|----------|--------|
| UI1 | LevelingChoices.tsx | Hardcoded general talents with wrong values (+1 AP, +3 SP, fake "Trade Increase") | P1 | **Done** |
| UI2 | LevelingChoices.tsx | `getOwnedClassFeatures()` only counts main class, not multiclass-gained features | P1 | **Done** |
| UI3 | LevelingChoices.tsx | Multiclass state not restored from context when navigating back | P2 | **Done** |
| UI4 | Calculator | Class Flavor Features not auto-granted when 2+ features from same class | P2 | **Done** |

---

## 3. DC20 v0.10 Rules Reference

### 3.1 General Talents (DC20 v0.10 pp. 160-161)

| Talent | Effect |
|--------|--------|
| Ancestry Increase | +4 Ancestry Points |
| Attribute Increase | +2 Attribute Points |
| Skill Increase | +4 Skill Points |
| Martial Expansion | Combat Training (Weapons, Heavy Armors, Shields), Stamina Regen of choice, +2 Maneuvers |
| Spellcasting Expansion | Combat Training (Spell Focuses), Spell List expansion, +3 Spells |

### 3.2 Character Paths (DC20 v0.10 p. 161)

**Path Progression Levels:** 2, 4, 6, 8

**Martial Path:**
- Combat Training: Weapons
- +1 Maneuver per path point
- +1 SP per path point (levels 1, 3)
- **Cross-path rule:** Classes lacking Stamina Regen gain "Spellcaster Stamina Regen" on first martial path investment

**Spellcaster Path:**
- Combat Training: Spell Focuses
- +1 Spell per path point (levels 1, 3, 4)
- +1 Cantrip per path point (levels 1, 2, 3)
- +3 MP at level 1, +2 MP at levels 2, 3, 4
- **Cross-path rule:** Classes lacking a Spell List gain a Spell List of choice on first spellcaster path investment

### 3.3 Multiclass Talents (DC20 v0.10 pp. 161-162)

| Tier | Level Req | Feature Level | Prerequisites |
|------|-----------|---------------|---------------|
| Novice | - | 1st Level Class Feature | Any class |
| Adept | 4 | 2nd Level Class Feature | Any class |
| Expert | 7 | 5th Level Class OR 3rd Level Subclass | 1+ class features from target |
| Master | 10 | 6th Level Subclass | 1+ subclass features from target |
| Grandmaster | 13 | 8th Level Capstone | 2+ class features from target |
| Legendary | 17 | 9th Level Subclass Capstone | 2+ subclass features from target |

### 3.4 Class Flavor Features Rule

> "Once you gain 2 Class Features from the same Class, you automatically gain that Class's Flavor Feature."

---

## 4. Implementation Plan

### Phase 1: Data Fixes

#### 1.1 Fix Path Progression Data
**File:** `src/lib/rulesdata/progression/paths/paths.data.ts`

- Fix Spellcaster Path Level 1 MP: `2` → `3`
- Fix Martial Path `specialRules` text: "2 Path Points" → "first time"
- Add Spellcaster Path `specialRules` for spell list choice

#### 1.2 Add Class Category Metadata
**Files:**
- `src/lib/rulesdata/progression/paths/paths.types.ts` - Add `ClassCategory` type
- `src/lib/rulesdata/schemas/character.schema.ts` - Add `classCategory` field
- All 13 `*_features.ts` files - Add `classCategory` to each class

| Class | Category |
|-------|----------|
| Barbarian, Champion, Commander, Hunter, Monk, Rogue | martial |
| Bard, Cleric, Druid, Sorcerer, Warlock, Wizard | spellcaster |
| Spellblade | hybrid |

#### 1.3 Fix General Talents
**File:** `src/lib/rulesdata/classes-data/talents/talents.data.ts`

- `Ancestry Increase`: Change value from `2` to `4`
- `Spellcasting Expansion`: Remove `+2 MP` effect (not in rules)

#### 1.4 Fix Class Talents
**Files:** 6 class talent files

| File | Fixes |
|------|-------|
| `champion.talents.ts` | Disciplined Combatant SP: 1 → 2 |
| `monk.talents.ts` | Internal Damage: Sonic → True; Steel Fist: lose → gain Impact |
| `sorcerer.talents.ts` | Greater Innate Power: add Focus Property; Font of Magic: 1 → 2 Rest Points |
| `spellblade.talents.ts` | Sling-Blade: add Spellstrike prereq |
| `commander.talents.ts` | Seize Momentum: add Commanding Aura prereq |
| `wizard.talents.ts` | 3 talent fixes (see T10-T12) |

### Phase 2: Calculation Fixes

#### 2.1 Enhance Path Benefits Aggregation
**File:** `src/lib/services/enhancedCharacterCalculator.ts`

Update `aggregatePathBenefits()` to:
1. Accept `classCategory` parameter
2. Return cross-path grants (Stamina Regen, Spell List choice, Combat Training)
3. Add to `EnhancedCalculationResult.crossPathGrants`

#### 2.2 Add Flavor Feature Auto-Grant
**File:** `src/lib/services/enhancedCharacterCalculator.ts`

Implement logic to auto-grant class Flavor Feature when character has 2+ features from that class (including multiclass-gained features).

### Phase 3: UI Fixes

#### 3.1 Fix Level Cap
**File:** `src/routes/character-creation/CharacterCreation.tsx`

Change level cap from `5` to `10` in `availableLevels` calculation.

#### 3.2 Fix LevelingChoices Talents
**File:** `src/routes/character-creation/LevelingChoices.tsx`

Remove hardcoded `generalTalents` and import from canonical source:
```typescript
import { generalTalents } from '@/lib/rulesdata/classes-data/talents/talents.data';
```

#### 3.3 Fix Multiclass Feature Count Bug
**File:** `src/routes/character-creation/LevelingChoices.tsx`

Update `getOwnedClassFeatures()` to count features from all classes including multiclass-gained features.

#### 3.4 Fix Multiclass State Restoration
**File:** `src/routes/character-creation/LevelingChoices.tsx`

Initialize multiclass state from context instead of empty values.

#### 3.5 Add Cross-Path UI
**File:** `src/routes/character-creation/LevelingChoices.tsx`

- Show "Spellcaster Stamina Regen" notification for spellcasters taking martial path
- Add Spell List selector for martials taking spellcaster path

#### 3.6 Re-enable Validation
**File:** `src/routes/character-creation/CharacterCreation.tsx`

Add environment toggle for leveling validation instead of hard bypass.

### Phase 4: Documentation

- Update `docs/assets/mapping/gap-analysis.md` with all gaps
- Update `docs/systems/LEVELING_SYSTEM.MD` to remove techniques references and add cross-path rules

---

## 5. Logging

Following the logging conventions from `LOGGING_SYSTEM.MD`:

| Event | Level | Context | Emoji | Data |
|-------|-------|---------|-------|------|
| Path benefits calculated | debug | calculation | 📊 | `{ martial, spellcasting, classCategory, grants }` |
| Cross-path grant triggered | info | calculation | ✨ | `{ grantType, classCategory }` |
| Flavor feature auto-granted | info | calculation | 🎭 | `{ classId, featureId }` |
| Multiclass feature counted | debug | calculation | 🔢 | `{ classId, count, source }` |
| Talent value applied | debug | calculation | 🎯 | `{ talentId, effect }` |
| Validation warning | warn | calculation | ⚠️ | `{ code, details }` |

---

## 6. Testing

### 6.1 Unit Tests

**File:** `src/lib/rulesdata/classes-data/talents/talents.test.ts`
- Test general talent values match DC20 v0.10 rules
- Test class talent values and prerequisites

**File:** `src/lib/rulesdata/progression/paths/paths.test.ts` (new)
- Test path progression values (MP, SP, maneuvers, etc.)
- Test cross-path rule text accuracy

**File:** `src/lib/services/pathBonuses.test.ts`
- Test cross-path grant triggers based on class category
- Test Combat Training grants

**File:** `src/lib/services/enhancedCharacterCalculator.aggregation.test.ts`
- Test flavor feature auto-grant when 2+ features from same class
- Test multiclass feature counting

### 6.2 Integration Tests

**File:** `src/lib/services/levelingIntegration.test.ts`
- Test full leveling flow with path selections
- Test cross-path scenarios (spellcaster + martial path)

### 6.3 E2E Tests

- Spellcaster taking martial path gets Stamina Regen notification
- Martial taking spellcaster path sees Spell List selector
- Multiclass state persists when navigating away and back
- Expert/Grandmaster prerequisites work with multiclass-gained features
- Flavor feature appears after gaining 2 features from a class

---

## 7. Key Files

| Category | Files |
|----------|-------|
| Path Data | `src/lib/rulesdata/progression/paths/paths.data.ts`, `paths.types.ts` |
| Talents | `src/lib/rulesdata/classes-data/talents/talents.data.ts`, `*.talents.ts` |
| Class Features | `src/lib/rulesdata/classes-data/features/*_features.ts` |
| Calculator | `src/lib/services/enhancedCharacterCalculator.ts` |
| UI | `src/routes/character-creation/CharacterCreation.tsx`, `LevelingChoices.tsx` |
| Docs | `docs/assets/mapping/gap-analysis.md`, `docs/systems/LEVELING_SYSTEM.MD` |

---

## 8. Acceptance Criteria

- [ ] All general talents match DC20 v0.10 values
- [ ] All class talents match DC20 v0.10 values and prerequisites
- [ ] Path progression gives correct benefits (including +3 MP at level 1)
- [ ] Cross-path rules enforced (Stamina Regen for spellcasters, Spell List for martials)
- [ ] Flavor features auto-granted at 2+ features from same class
- [ ] Level cap is 10, not 5
- [ ] Multiclass feature counting includes multiclass-gained features
- [ ] All unit tests pass
- [ ] Leveling validation can be toggled via environment variable

---

> **Related Systems:**
> - [LEVELING_SYSTEM.MD](./LEVELING_SYSTEM.MD)
> - [CLASS_SYSTEM.MD](./CLASS_SYSTEM.MD)
> - [CALCULATION_SYSTEM.MD](./CALCULATION_SYSTEM.MD)
> - [MULTICLASS_SYSTEM.MD](./MULTICLASS_SYSTEM.MD)
