# Shadcn UI Redesign Specification

## 1. Overview

This specification details the migration of the DC20 Character Creator UI from a mixed Styled Components/CSS implementation to a cohesive **Tailwind CSS + shadcn/ui** architecture. The goal is to modernize the interface, improve maintainability, and align with the visual direction provided in the Figma design (dark fantasy aesthetic).

**Scope:**

- `src/routes/character-creation/**` (The main wizard)
- `src/components/ui/**` (New shared components)
- `src/routes/character-creation/styles/**` (Removal of these files)
- `src/routes/character-sheet/styles/**` (Removal of these files)
- **Included**: Leveling Up Screen (`LevelingChoices.tsx`)
- **Included**: Character Sheet (`src/routes/character-sheet/**`)

## 1.1 Dependencies

The following packages are required:

| Package | Purpose |
|---------|---------|
| `tailwindcss` | Utility-first CSS framework |
| `class-variance-authority` (cva) | Variant management for component styling |
| `clsx` | Conditional class name construction |
| `tailwind-merge` | Intelligent Tailwind class merging |
| `@radix-ui/react-slot` | Polymorphic component support (asChild pattern) |
| `@radix-ui/react-select` | Accessible select primitive |
| `@radix-ui/react-scroll-area` | Custom scrollbar primitive |
| `@radix-ui/react-separator` | Accessible separator primitive |
| `@radix-ui/react-dialog` | Accessible dialog/modal primitive |
| `@radix-ui/react-label` | Accessible label primitive |

## 1.2 Utility Function

The `cn()` utility in `src/lib/utils.ts` combines `clsx` and `tailwind-merge`:

```ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This enables conditional class composition: `cn('px-4', isActive && 'bg-primary', className)`

## 2. Component Architecture

Since we are manually implementing shadcn components (due to environment restrictions), we will create a lightweight version of the core primitives using standard Tailwind patterns and Radix UI (if available) or standard React state for interactive elements.

### Core Components (`src/components/ui/`)

#### `Card`

A flexible container for content.

```tsx
// src/components/ui/card.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				'border-border bg-card text-card-foreground rounded-lg border shadow-sm',
				className
			)}
			{...props}
		/>
	)
);
Card.displayName = 'Card';

// ... (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
```

#### `Button`

Standard interactive element with variants.

```tsx
// src/components/ui/button.tsx
// Variants: default (primary), secondary, destructive, outline, ghost, link
// Sizes: default, sm, lg, icon
```

#### `Badge`

Small status indicators or tags.

```tsx
// src/components/ui/badge.tsx
// Variants: default (primary), secondary, outline, destructive
```

#### `Tabs`

For switching between sub-views (Background: Skills/Trades/Languages).

- Uses `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`.

#### `ScrollArea`

Custom scrollbar implementation for lists.

## 3. Layout Strategy

### Global Layout

The `CharacterCreationBG` styled component will be replaced by a Tailwind-based layout wrapper in `CharacterCreation.tsx`.

**Before:**

```tsx
<CharacterCreationBG />
<StyledContainer>
  <StyledStepIndicator>...</StyledStepIndicator>
  <StyledStepsHeaderBG>...</StyledStepsHeaderBG>
</StyledContainer>
```

**After (Tailwind):**

```tsx
<div className="bg-background text-foreground flex min-h-screen flex-col font-sans">
	<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
		<div className="container flex h-14 items-center">{/* Navigation / Stepper */}</div>
	</header>
	<main className="container flex-1 py-6">{/* Step Content */}</main>
</div>
```

## 4. Migration Plan by Component

### A. Class Selection (`ClassSelector.tsx`)

**Current State:**

- `StyledNewClassCard` (complex flexbox with hover states).
- `StyledGrid` (flex-wrap container).

**New Implementation:**

- **Grid Layout**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- **Class Card**:
  - `Card` component with `hover:border-primary/50 transition-colors cursor-pointer`.
  - **Selected State**: `border-primary ring-1 ring-primary`.
  - **Icon**: Wrapped in a rounded div `bg-primary/20 p-2`.

**Code Snippet:**

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	{classesData.map((cls) => (
		<Card
			key={cls.id}
			className={cn(
				'hover:border-primary cursor-pointer transition-all',
				selectedClass === cls.id ? 'border-primary ring-primary ring-1' : 'border-border'
			)}
			onClick={() => handleSelect(cls.id)}
		>
			<CardHeader className="flex flex-row items-center gap-4 space-y-0">
				<div className="bg-primary/20 border-primary flex h-10 w-10 items-center justify-center rounded-full border">
					<img src={cls.icon} className="h-6 w-6" />
				</div>
				<CardTitle className="text-primary text-xl">{cls.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground mb-2 text-sm italic">{cls.quote}</p>
				<p className="text-sm">{cls.description}</p>
			</CardContent>
		</Card>
	))}
</div>
```

### B. Ancestry Selection (`AncestrySelector.tsx`)

**Current State:**

- Horizontal list or flex wrap.

**New Implementation:**

- Similar `Card` grid as Class Selector.
- Use `Badge` to show "Cost: X Points" if applicable.
- Detailed view could be a `Dialog` or expandable card.

### C. Attributes (`Attributes.tsx`)

**Current State:**

- Custom `StyledCounter` components.

**New Implementation:**

- **Layout**: `flex flex-col gap-6 max-w-2xl mx-auto`.
- **Row**: `flex items-center justify-between p-4 border rounded-lg`.
- **Control**:
  - `-` Button (`variant="outline" size="icon"`).
  - Value Display (`text-2xl font-bold w-12 text-center`).
  - `+` Button (`variant="outline" size="icon"`).

### D. Background (`Background.tsx`)

**Current State:**

- Custom tab buttons.

**New Implementation:**

- `Tabs` component:
  ```tsx
  <Tabs defaultValue="skills" className="w-full">
  	<TabsList className="grid w-full grid-cols-3">
  		<TabsTrigger value="skills">Skills</TabsTrigger>
  		<TabsTrigger value="trades">Trades</TabsTrigger>
  		<TabsTrigger value="languages">Languages</TabsTrigger>
  	</TabsList>
  	<TabsContent value="skills">{/* Skills List */}</TabsContent>
  </Tabs>
  ```

### E. Spells & Maneuvers (`SpellsAndManeuvers.tsx`)

**Current State:**

- Custom tab container (`StyledTabContainer`).
- `StyledCard` for spells/maneuvers.
- Filter buttons (`StyledFilterButton`).

**New Implementation:**

- **Tabs**: Use Shadcn `Tabs` to switch between Spells and Maneuvers.
- **Filters**: Use a horizontal scrollable row of `Badge` or `Button` (variant="ghost"/"secondary") for school/type filters.
- **Card**:
  - `Card` with `CardHeader` (Name, Type, Cost Badge).
  - `CardDescription` for effects.
  - `CardFooter` with "Add/Remove" `Button`.

### F. Character Name (`CharacterName.tsx`)

**Current State:**

- `StyledInputGroup`, `StyledSuggestionGrid`.

**New Implementation:**

- **Layout**: `max-w-xl mx-auto space-y-8`.
- **Form**:
  - `Label` + `Input` for Character Name.
  - `Label` + `Input` for Player Name.
- **Name Generator**:
  - `Button` for "Generate Names".
  - Grid of `Button` (variant="outline") for suggestions.

### G. Leveling Choices (`LevelingChoices.tsx`)

**Current State:**

- `LevelingChoices` component already uses some basic `Card`, `Button`, `Tabs` primitives but needs full styling integration.

**New Implementation:**

- **Layout**: `max-w-7xl mx-auto space-y-8`.
- **Tabs**: "Talents" vs "Path Points".
- **Talents Grid**:
  - `Card` for each talent.
  - **Selected State**: `border-primary bg-primary/10`.
  - **Controls**: `Button` (icon only) for increment/decrement if multi-point talent.
- **Path Points**:
  - Two large columns (Martial vs Spellcasting).
  - `Card` with `CardHeader` containing the current point count.
  - `CardContent` showing the progression list (using `flex` rows with `Check` icon for unlocked tiers).

### H. Character Sheet (`src/routes/character-sheet/**`)

**Current State:**

- Complex styled components, floating windows (popups), specialized layout for mobile/desktop.

**New Implementation:**

- **Layout**: Grid-based dashboard layout.
- **Header**: Sticky header with Name, Level, and Core Stats (HP/MP/SP).
- **Core Stats**: `Card` components for HP, MP, SP with `Progress` bars.
- **Attributes**: Vertical list or compact grid using `Card` and `Badge` for values.
- **Attacks/Spells/Inventory**:
  - `Tabs` to switch views.
  - `DataTable` (or `Table`) for Inventory and Spell lists.
  - `Card` grid for frequent actions/attacks.
- **Modals**: Replace custom popups with Shadcn `Dialog` or `Sheet` components for details (e.g., clicking a spell opens a Sheet with full description).

## 5. Theme Configuration (`src/styles/globals.css`)

The theme uses OKLCH color space for perceptually uniform colors. The "dark fantasy" aesthetic features deep indigo/purple backgrounds with amber/gold accents:

```css
@import 'tailwindcss';

@theme {
  /* Background colors - deep indigo/purple tones */
  --color-background: oklch(0.15 0.03 280);
  --color-foreground: oklch(0.93 0.01 280);

  /* Card/surface colors */
  --color-card: oklch(0.18 0.035 280);
  --color-card-foreground: oklch(0.93 0.01 280);

  /* Popover colors */
  --color-popover: oklch(0.16 0.03 280);
  --color-popover-foreground: oklch(0.93 0.01 280);

  /* Primary - amber/gold accent */
  --color-primary: oklch(0.78 0.15 85);
  --color-primary-foreground: oklch(0.15 0.03 280);

  /* Secondary - muted purple */
  --color-secondary: oklch(0.25 0.05 280);
  --color-secondary-foreground: oklch(0.93 0.01 280);

  /* Muted - subtle backgrounds */
  --color-muted: oklch(0.22 0.04 280);
  --color-muted-foreground: oklch(0.65 0.02 280);

  /* Accent - bright gold for highlights */
  --color-accent: oklch(0.75 0.13 85);
  --color-accent-foreground: oklch(0.15 0.03 280);

  /* Destructive - red for dangerous actions */
  --color-destructive: oklch(0.55 0.2 25);
  --color-destructive-foreground: oklch(0.95 0.01 25);

  /* Border and inputs */
  --color-border: oklch(0.3 0.04 280);
  --color-input: oklch(0.25 0.04 280);
  --color-ring: oklch(0.78 0.15 85);

  /* Radius tokens */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}

@layer base {
  * {
    border-color: var(--color-border);
  }
  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
  }
}
```

## 6. Execution Steps (Manual Implementation)

### Phase 1: Foundation ✅
1. Create `src/lib/utils.ts` with `cn()` utility
2. Create `src/components/ui/*.tsx` primitives:
   - `card.tsx`, `button.tsx`, `badge.tsx`, `tabs.tsx`
   - `input.tsx`, `label.tsx`, `separator.tsx`
   - `select.tsx`, `scroll-area.tsx`, `dialog.tsx`
3. Create barrel export `src/components/ui/index.ts`
4. Configure theme in `src/styles/globals.css`

### Phase 2: Character Creation Migration
1. **Shell**: Rewrite `CharacterCreation.tsx` layout wrapper
2. **Step Components** (migrate in order):
   - `ClassSelector.tsx` → delete `ClassSelector.styles.ts`
   - `AncestrySelector.tsx` → delete `AncestrySelector.styles.ts`
   - `Attributes.tsx` → delete `Attributes.styles.ts`
   - `Background.tsx` → delete `Background.styles.ts`
   - `CharacterName.tsx` → delete `CharacterName.styles.ts`
   - `SpellsAndManeuvers.tsx` → delete `SpellsAndManeuvers.styles.ts`
   - `ClassFeatures.tsx` → delete `ClassFeatures.styles.ts`
   - `LevelingChoices.tsx`
3. **Cleanup**: Delete remaining `styles/` directory files

### Phase 3: Character Sheet Migration
1. **Layout**: Rewrite `CharacterSheetDesktop.tsx` and `CharacterSheetMobile.tsx`
2. **Components**: Migrate each component in `components/` subdirectory
3. **Cleanup**: Delete `styles/` directory

## 7. File Removal Checklist

After migration, the following style files should be deleted:

**Character Creation:**
- `src/routes/character-creation/styles/AncestryPointsCounter.styles.ts`
- `src/routes/character-creation/styles/AncestrySelector.styles.ts` ✅
- `src/routes/character-creation/styles/Attributes.styles.ts` ✅
- `src/routes/character-creation/styles/Background.styles.ts`
- `src/routes/character-creation/styles/CharacterCreation.styles.ts`
- `src/routes/character-creation/styles/CharacterCreationBG.styles.ts`
- `src/routes/character-creation/styles/CharacterName.styles.ts`
- `src/routes/character-creation/styles/ClassFeatures.styles.ts`
- `src/routes/character-creation/styles/ClassSelector.styles.ts` ✅
- `src/routes/character-creation/styles/LoadCharacter.styles.ts`
- `src/routes/character-creation/styles/SaveMasteries.styles.ts`
- `src/routes/character-creation/styles/SelectedAncestries.styles.ts`
- `src/routes/character-creation/styles/SpellsAndManeuvers.styles.ts`
- `src/routes/character-creation/styles/StepsHeaderBG.styles.ts`
- `src/routes/character-creation/styles/shared/FeatureDisplay.styles.ts`

**Character Sheet:**
- All files in `src/routes/character-sheet/styles/`

## 8. Testing Checklist

After each component migration:
- [ ] Visual regression: Compare against current UI
- [ ] Responsive: Test mobile/tablet/desktop breakpoints
- [ ] Accessibility: Keyboard navigation, focus states, screen reader
- [ ] Dark theme: Verify color contrast meets WCAG AA
- [ ] Interactions: Hover, active, disabled states work correctly
