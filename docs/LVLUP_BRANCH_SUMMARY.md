# Feature Branch Summary: `lvlup`

## Overview
This branch implements a comprehensive **Character Leveling System** for the DC20 character builder, enabling characters to progress from level 1 to level 20 with full support for class features, talents, multiclassing, and dynamic calculations.

**Total Changes**: 121 files modified, ~53,000 lines added, ~54,000 lines removed (major refactor + new features)

---

## Major Features Implemented

### 1. **Leveling System Core (Milestones M1-M3)**
- **Level Selector UI**: Added level selection (1-20) to `ClassSelector` with dynamic preview
- **Level Progression Data**: Created progression files for all 14 classes (`*.progression.ts`) containing per-level gains:
  - Attribute points, mastery points, HP, Stamina, Mana
  - Features unlocked at each level
  - Talent availability by tier
- **LevelingChoices Component**: New 1000-line component (`src/routes/character-creation/LevelingChoices.tsx`) that orchestrates:
  - Attribute point allocation with level-based caps
  - Mastery tier progression (Untrained → Novice → Adept → Expert → Master)
  - Talent selection across 6 tiers
  - Feature choices and nested decisions
  - Real-time validation and budget tracking

### 2. **Talent System (M2.1-M2.7)**
- **Talent Data Structure**: 
  - General talents: 99 talents loaded from `talents.data.ts`
  - Class-specific talents: 14 class talent files (e.g., `barbarian.talents.ts`)
  - Support for tiered talents (Tier 1-6) with level requirements
- **Talent Effects Integration**: 
  - Effects now apply to calculations (skill bonuses, attribute mods, mastery caps)
  - Count-based talent storage with UI counters for talents taken multiple times
- **Validation**: Feature ID consistency checks added (`scripts/validate-feature-ids.ts`)

### 3. **Multiclass System (M3.17)**
- **Complete Multiclass Support** (`src/lib/rulesdata/progression/multiclass.ts`):
  - 6-tier multiclass talent selection
  - Prerequisite validation (higher tiers require lower tier features)
  - Path filtering (ensures features match character's chosen paths)
  - Subclass feature access for multiclass
- **Effects Persistence**: Multiclass talent effects properly apply and persist
- **Comprehensive Documentation**: `docs/systems/MULTICLASS_SYSTEM.MD` (345 lines)
- **Unit Tests**: 288 lines of tests covering tier unlocking, prerequisites, and edge cases

### 4. **Subclass System (M3.10-M3.11, M3.16)**
- **Dynamic Subclass Selection**: Subclass selector appears at appropriate level (varies by class)
- **Subclass Data**: Added full subclass implementations for:
  - Champion: Guardian, Vanguard
  - Hunter: Monster Slayer, Trapper  
  - Wizard: Arcane Scholar, Battle Mage
  - Monk: Complete stance system integration
- **Feature Display**: Subclass features shown in expandable cards with benefits breakdown
- **Interactive Nested Choices**: UI for complex multi-level feature decisions

### 5. **Calculation System Overhaul (M2.4, M3.9)**
- **Progressive Aggregation** (`enhancedCharacterCalculator.ts`):
  - Aggregates gains from level 1 up to current level
  - Applies effects from class features, talents, and multiclass
  - Handles path bonuses (Martial, Knowledge, Spellcasting)
- **Level Caps Enforcement** (`levelCaps.ts`):
  - Attribute caps by level (e.g., max 15 at level 1, 19 at level 13+)
  - Mastery tier caps (Master unlocks at level 17)
- **Path Bonuses**: 
  - Martial: +1 Physical/Might/Agility per point
  - Knowledge: +1 Mental/Charisma/Intelligence per point
  - Spellcasting: +1 Spellcasting/Prime per point
- **Bug Fixes**:
  - Added missing base 5 skill points and base 3 trade points
  - Fixed mastery cap logic (Adept unlimited at 5+, Novice at 1+)
  - Corrected duplicate combat mastery calculations

### 6. **Class Features UI Improvements**
- **Progressive Display**: Features organized by level sections
- **Feature Choices in Context**: Choice dialogs appear within their level section
- **Shared Components**: Extracted reusable styled components (`FeatureDisplay.styles.ts`)
- **Eliminated Duplication**: Consolidated feature display logic across creation stages
- **Barbarian-Specific Formatting**:
  - Rage benefits shown as structured lists
  - Battlecry auto-grants all shouts (no choice needed)

### 7. **Data Quality & Testing**

#### **Ancestry & Traits Cleanup**
- Fixed all schema violations in trait data
- Removed Penguinborn placeholder ancestry
- Enforced non-empty trait lists for all ancestries
- Added 514 lines of comprehensive ancestry tests
- Generated orphaned traits analysis report

#### **Class Data Validation**
- Fixed schema violations across all class feature files:
  - Champion, Monk, Hunter, Wizard, Rogue, Spellblade
  - Corrected invalid `id` fields on `FeatureChoiceOption`
  - Fixed `FeatureBenefit` schema issues
- Added 243 lines of subclass tests revealing missing data
- Added 58 lines of monk stance tests

#### **Test Coverage**
- Unit tests for progressive feature display (441 lines)
- Multiclass system tests (288 lines)
- Path bonuses integration tests (172 lines)
- Aggregation logic tests (191 lines)
- Feature choice logic tests (302 lines)
- **Total**: ~1,900 lines of new unit tests

### 8. **Documentation Additions**
- **LEVELING_EPIC.md**: 1,516-line epic tracking all milestones M1-M3.17
- **MULTICLASS_SYSTEM.MD**: 345 lines documenting multiclass architecture
- **LEVELING_SYSTEM.MD**: 227 lines system specification
- **SUBCLASS_REFERENCE.md**: 264 lines documenting all subclass options
- **FEATURE_ID_NAMING_CONVENTION.md**: 110 lines on ID standards
- **CONDITIONS_SPEC.md**: 652 lines (spec for future work)
- **Testing Coverage Report**: 508 lines documenting test status
- **M2 Completion Summary**: 176 lines milestone review
- **Updated System Docs**: Calculation, Ancestry, Traits, Character Creation Flow

### 9. **Bug Fixes & Refinements**
- Removed forced validation from Spells & Maneuvers stage
- Corrected step validation logic for dynamic leveling steps
- Fixed mastery table references → mastery tier constants
- Added missing `classesData` imports
- Enhanced background skill/trade/language breakdown display
- Improved character completion checks for leveling state
- Fixed modal edge cases and validation timing

### 10. **Schema & Type Improvements**
- **Character Schema**: Added `levelingChoices` field for persistence
- **Class Schema**: Added `LevelGains`, `ClassLevel` types
- **Effect System**: Expanded effect types for talents and multiclass
- **Schema Migration**: Added migration utilities for versioning (`schemaVersion.ts`)
- **Data Contracts**: Added talent-related contracts

---

## Key Files to Review

### Core Logic
- `src/routes/character-creation/LevelingChoices.tsx` (1,000 lines) - Main leveling UI
- `src/lib/services/enhancedCharacterCalculator.ts` (641 lines modified) - Calculation engine
- `src/lib/rulesdata/progression/multiclass.ts` (112 lines) - Multiclass logic
- `src/lib/rulesdata/classes-data/classProgressionResolver.ts` (243 lines) - Aggregation

### Data
- `src/lib/rulesdata/classes-data/progressions/*.progression.ts` (14 files, ~2,200 lines)
- `src/lib/rulesdata/classes-data/talents/*.talents.ts` (14 files, ~600 lines)
- `src/lib/rulesdata/classes-data/features/*_features.ts` (extensive updates)

### Tests
- All `.test.ts` files in the diff (~2,500 total test lines added)

### Documentation
- `docs/plannedSpecs/LEVELING_EPIC.md` - Start here for milestone tracker
- `docs/systems/MULTICLASS_SYSTEM.MD` - Architecture reference

---

## Breaking Changes & Migration Notes
- **Character Schema Update**: Existing characters need `levelingChoices` field added (migration utility provided)
- **Class Data Structure**: Classes now use progression modules instead of legacy tables
- **Effect Schema**: Several effect types expanded with new fields

---

## Testing

All existing E2E tests pass. New unit test coverage includes:

```bash
# Run all unit tests
npm run test:unit

# Run specific test suites
npx vitest src/lib/rulesdata/progression/multiclass.test.ts
npx vitest src/routes/character-creation/ClassFeatures.test.tsx
```

---

## Current Branch Status
✅ All milestones M1-M3.17 complete  
✅ Comprehensive test coverage added  
✅ Documentation updated  
✅ Working tree clean, ready for review  

---

## Recommended Review Order

1. **Understand the scope**: Read `docs/plannedSpecs/LEVELING_EPIC.md` for milestone context
2. **See expected behavior**: Review test files (`*.test.ts`) 
3. **Main UI flow**: Examine `LevelingChoices.tsx` 
4. **Core calculations**: Check `enhancedCharacterCalculator.ts` changes
5. **Data validation**: Spot-check class progression and talent data files
6. **Try it out**: Create a level 10 character with multiclass to see it in action

---

## Questions?

For questions about specific systems or implementation details, refer to:
- Milestone tracking: `docs/plannedSpecs/LEVELING_EPIC.md`
- System architecture: `docs/systems/*.MD`
- Test expectations: `*.test.ts` files adjacent to source code

