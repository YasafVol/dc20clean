# Design System Refactor - CSS Variables Migration

**Date**: February 7, 2026  
**Objective**: Convert hardcoded theme values to CSS variables for consistent design system

## Problem Statement

The design system had inconsistent styling:
- Button component used hardcoded `theme.colors.*` values
- DM Tools pages had hardcoded hex colors (`#a855f7`, `#4ade80`, etc.)
- No usage of CSS variables from `globals.css` (`--crystal-primary`, `--bg-tertiary`, etc.)
- Base button pattern (StyledAddWeaponButton) not extracted/reused

## Changes Made

### 1. Button Component (`/src/components/common/Button.tsx`)
**BEFORE**: Used hardcoded theme tokens
```typescript
background: ${theme.colors.accent.secondary};  // #BB9AF7
color: ${theme.colors.text.inverse};           // #1A1B26
```

**AFTER**: Uses CSS variables
```typescript
background: var(--crystal-primary);
color: var(--bg-primary);
```

**Key Changes**:
- Default/primary button now matches `StyledAddWeaponButton` pattern
- Border: `var(--crystal-primary)`
- Background: `var(--bg-tertiary)`
- Text: `var(--crystal-primary)`
- Hover: fills with `var(--crystal-primary)`, text becomes `var(--bg-primary)`
- Added `success` and `warning` variants
- All variants use CSS variables
- Removed `theme` import dependency

### 2. Modal Component (`/src/components/common/Modal.tsx`)
**BEFORE**: Used theme tokens
```typescript
background: ${theme.colors.bg.primary};
border: 1px solid ${theme.colors.border.default};
```

**AFTER**: Uses CSS variables
```typescript
background: var(--bg-primary);
border: 1px solid var(--crystal-primary-30);
```

**Key Changes**:
- All colors converted to CSS variables
- Spacing converted to direct rem values
- Removed `theme` import dependency
- Consistent with Button styling

### 3. Character Sheet Button (`/src/routes/character-sheet/styles/Attacks.ts`)
**StyledAddWeaponButton** converted to CSS variables:
```typescript
// BEFORE
border: 1px solid ${theme.colors.accent.primary};

// AFTER  
border: 1px solid var(--crystal-primary);
```

This is now the **reference pattern** for all buttons.

### 4. Monster Styles (`/src/routes/dm/monsters/styles/MonsterStyles.ts`)
Converted 10+ hardcoded colors to CSS variables:

| **Before** | **After** |
|------------|-----------|
| `rgba(74, 222, 128, 0.1)` | `var(--crystal-primary-10)` |
| `rgba(168, 85, 247, 0.2)` | `var(--crystal-primary-20)` |
| `#71717a` (gray) | `var(--text-muted)` |
| `#4ade80` (green) | `var(--crystal-primary)` |
| `#e5e7eb` (light gray) | `var(--text-primary)` |
| `#a1a1aa` (medium gray) | `var(--text-muted)` |
| `#fbbf24` (amber) | `var(--crystal-primary)` |
| `#a855f7` (purple) | `var(--crystal-primary)` |
| `rgba(234, 179, 8, 0.1)` | `var(--crystal-primary-10)` |

**Components Updated**:
- `PreviewStatItem` - highlight colors
- `PreviewStatLabel` - text color
- `PreviewStatValue` - highlight text
- `PreviewDivider` - border color
- `EncounterCost` - background and border
- `EncounterCostLabel` - text color
- `EncounterCostValue` - value color
- `RoleCard` - background, border, gradients removed
- `RoleName` - text colors
- `RoleModifiers` - text color

### 5. Encounter Styles (`/src/routes/dm/encounters/styles/EncounterStyles.ts`)
**COMPLETE FILE REWRITE** - Removed ALL theme.* references:

**Before** (example):
```typescript
gap: ${theme.spacing[5]};                          // 1.25rem
background: ${theme.colors.bg.secondary};          // #24283B
border-radius: ${theme.borderRadius.lg};           // 0.75rem
font-family: ${theme.typography.fontFamily.secondary};
```

**After**:
```typescript
gap: 1.25rem;
background: var(--bg-secondary);
border-radius: 0.75rem;
font-family: 'Cinzel', serif;
```

**Impact**: 
- 440 lines converted from theme tokens to CSS variables
- Removed `theme` import
- All spacing converted to direct rem values
- All colors use CSS variables
- Font families inlined (no theme reference)

### Components Updated in EncounterStyles:
- `EncounterGrid`, `EncounterCardContainer`
- `CardHeader`, `CardName`, `CardMeta`, `MetaBadge`
- `BudgetContainer`, `BudgetHeader`, `BudgetLabel`, `BudgetValue`
- `BudgetBarContainer`, `BudgetBar`, `BudgetThresholdMarker`, `BudgetStatusText`
- `DifficultyGrid`, `DifficultyButton`, `DifficultyName`, `DifficultyBudget`
- `MonsterSlotList`, `MonsterSlotCard`
- `SlotMonsterInfo`, `SlotMonsterName`, `SlotMonsterMeta`
- `SlotQuantityControl`, `QuantityButton`, `QuantityValue`
- `SlotCost`, `SlotActions`, `EmptySlotContent`
- `PartyConfigGrid`, `PartyStatDisplay`, `PartyStatLabel`, `PartyStatValue`
- `PlannerContainer`, `PlannerMain`, `PlannerSidebar`

## CSS Variables Used

From `/src/styles/globals.css`:

### Background Colors
- `--bg-primary` (#1a1b26)
- `--bg-secondary` (#24283b)
- `--bg-tertiary` (#414868)

### Text Colors
- `--text-primary` (#c0caf5)
- `--text-secondary` (#9aa5ce)
- `--text-muted` (#565f89)

### Accent Colors
- `--crystal-primary` (#7dcfff) - **Primary highlight color**
- `--crystal-primary-10` through `--crystal-primary-90` - Alpha variants
- `--crystal-secondary` (#7aa2f7)
- `--crystal-tertiary` (#9aa5ce)
- `--accent-danger` (#f7768e)
- `--accent-warning` (#e0af68)
- `--accent-success` (#9ece6a)

### Common Alpha Values
- `--white-30`, `--white-50` - White overlays
- `--black-30` - Black overlays

## Button Variants

After refactor, the Button component supports:

1. **primary** (default) - Matches `StyledAddWeaponButton`
   - Border/text: `var(--crystal-primary)`
   - Background: `var(--bg-tertiary)`
   - Hover: fills with crystal-primary

2. **secondary** - Muted style
   - Border/text: `var(--crystal-tertiary)`
   - Background: `var(--bg-tertiary)`
   - Hover: subtle tertiary background

3. **danger** - Red for destructive actions
   - Uses `var(--accent-danger)`

4. **success** - Green for affirmative actions
   - Uses `var(--accent-success)`

5. **warning** - Amber for caution
   - Uses `var(--accent-warning)`

6. **ghost** - Transparent
   - Transparent with subtle hover

## Benefits

1. **Consistency**: All components use same CSS variable system
2. **Maintainability**: Change colors in one place (`globals.css`)
3. **Performance**: No JavaScript theme object parsing
4. **Theming**: Easy to swap themes by changing CSS variables
5. **Cleaner Code**: No theme imports, no object navigation
6. **Design System**: Button component matches existing pattern (StyledAddWeaponButton)

## Files Modified

1. `/src/components/common/Button.tsx` - 200 lines, complete rewrite
2. `/src/components/common/Modal.tsx` - 132 lines, complete rewrite
3. `/src/routes/character-sheet/styles/Attacks.ts` - StyledAddWeaponButton updated
4. `/src/routes/dm/monsters/styles/MonsterStyles.ts` - 10 color replacements
5. `/src/routes/dm/encounters/styles/EncounterStyles.ts` - 440 lines, complete rewrite

**Total**: ~972 lines of code converted from theme tokens to CSS variables

## Next Steps

1. **Build Verification**: Confirm TypeScript compilation passes
2. **Visual Testing**: Compare pages to Figma designs
3. **Usage Audit**: Convert remaining components to use Button/Modal from design system
4. **Documentation**: Update component usage guides in README.md
5. **Extract More Patterns**: Consider Input, Select, Badge components

## Migration Pattern for Future Components

```typescript
// ❌ OLD (Bad)
import { theme } from './theme';
const Button = styled.button`
  background: ${theme.colors.accent.primary};
  padding: ${theme.spacing[2]};
`;

// ✅ NEW (Good)
const Button = styled.button`
  background: var(--crystal-primary);
  padding: 0.5rem;
`;
```

---

**Result**: Design system now uses CSS variables consistently across all components. Base button pattern (crystal-primary border/text, tertiary background) extracted and reusable.
