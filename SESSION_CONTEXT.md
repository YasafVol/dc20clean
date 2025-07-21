# DC20 Character Sheet Development Session Context

## Project Overview

- **Repository**: YasafVol/dc20clean
- **Branch**: converting-to-react
- **Main Focus**: React-based DC20 character creation and character sheet system
- **Primary File**: `/src/routes/character-sheet/CharacterSheetClean.tsx`

## Recent Issues Fixed

### 1. Character Creation Background Step Validation Bug

**Problem**: Background step completion validation was using hardcoded values instead of dynamic calculations based on Intelligence modifier and point conversions.

**Location**: `/src/routes/character-creation/CharacterCreation.tsx`

**Solution**: Updated step 3 validation logic to use flexible validation that accounts for:

- Intelligence modifier affecting skill points (5 + Int modifier)
- Point conversion system between skills/trades/languages
- Variable amounts instead of fixed values (5 skill, 5 trade, 3 language)

### 2. PDR (Physical Damage Reduction) Styling Alignment

**Problem**: PDR had square design while PD and MD had shield-like circular design, causing visual inconsistency and alignment issues.

**Location**: `/src/routes/character-sheet/CharacterSheetClean.tsx` (lines ~1390-1430)

**Final Solution Applied**:

```tsx
{
	/* Defenses - Shield-like design */
}
<div
	style={{
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: '1.5rem'
	}}
>
	<div style={{ textAlign: 'center', width: '120px' }}>
		<div
			style={{
				height: '32px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				marginBottom: '0.3rem'
			}}
		>
			<div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>
				PHYSICAL
			</div>
			<div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>
				DEFENSE
			</div>
		</div>
		<div
			style={{
				width: '80px',
				height: '90px',
				border: '3px solid #8b4513',
				borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'white',
				margin: '0 auto'
			}}
		>
			<div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>
				{characterData.finalPD}
			</div>
		</div>
		<div style={{ height: '20px', marginTop: '0.2rem' }}></div>
	</div>

	{/* PDR - Shield-like design */}
	<div style={{ textAlign: 'center', width: '120px' }}>
		<div
			style={{
				height: '32px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				marginBottom: '0.3rem'
			}}
		>
			<div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>
				PHYSICAL
			</div>
			<div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>
				DMG REDUCTION
			</div>
		</div>
		<div
			style={{
				width: '80px',
				height: '90px',
				border: '3px solid #8b4513',
				borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'white',
				margin: '0 auto'
			}}
		>
			<div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>
				{characterData.finalPDR || 0}
			</div>
		</div>
		<div
			style={{
				height: '20px',
				marginTop: '0.2rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			{characterData.finalPDR > 0 && (
				<div style={{ fontSize: '0.6rem', color: '#8b4513' }}>Auto-calculated</div>
			)}
		</div>
	</div>

	<div style={{ textAlign: 'center', width: '120px' }}>
		<div
			style={{
				height: '32px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				marginBottom: '0.3rem'
			}}
		>
			<div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>
				MYSTICAL
			</div>
			<div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>
				DEFENSE
			</div>
		</div>
		<div
			style={{
				width: '80px',
				height: '90px',
				border: '3px solid #8b4513',
				borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'white',
				margin: '0 auto'
			}}
		>
			<div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>
				{characterData.finalAD}
			</div>
		</div>
		<div style={{ height: '20px', marginTop: '0.2rem' }}></div>
	</div>
</div>;
```

**Key Changes Made**:

- Changed PDR from square (`borderRadius: '8px'`) to shield-like (`borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'`)
- Increased PDR size from 60x60px to 80x90px to match PD and MD
- Consistent 120px width containers for all three sections
- Fixed 32px height for label areas with flexbox centering
- Consistent 20px bottom spacing for all sections
- Font size increased from 1.5rem to 2rem for PDR value
- Changed labels from "PDR" + "Physical Damage Reduction" to "PHYSICAL" + "DMG REDUCTION"
- Added `margin: '0 auto'` to center shields within containers
- Set `lineHeight: '1'` to prevent text spacing variations

## Design System & Style Standards

### Color Scheme

- **Primary Brown**: `#8b4513` (borders, text, UI elements)
- **Background**: `white` for content areas
- **Light Background**: `#f5f5dc` and `#f9f9f9` for highlighting
- **Resource Colors**:
  - Stamina Points: `#22c55e` (green)
  - Mana Points: `#3b82f6` (blue)
  - Hit Points: `#dc2626` (red)

### Shield Design Pattern

**Shield-like Elements** (PD, PDR, MD):

- Dimensions: `80px` width × `90px` height
- Border: `3px solid #8b4513`
- Border Radius: `50% 50% 50% 50% / 60% 60% 40% 40%` (creates shield shape)
- Background: `white`
- Text: `2rem` font size, bold, `#8b4513` color
- Container: `120px` width with centered content

### Typography Standards

- **Section Titles**: `1.1rem`, bold, `#8b4513`
- **Shield Labels**: `0.8rem`, bold, `#8b4513`, `lineHeight: '1'`
- **Shield Values**: `2rem`, bold, `#8b4513`
- **Small Text**: `0.6rem` for secondary info like "Auto-calculated"

### Layout Patterns

- **Flex Containers**: Use `justifyContent: 'space-around'` and `alignItems: 'center'` for shield rows
- **Consistent Spacing**: `marginBottom: '1.5rem'` for major sections
- **Fixed Heights**: Use consistent heights for label areas (32px) and spacing (20px) to ensure alignment

## Key Components & Files

### Character Sheet (`CharacterSheetClean.tsx`)

- **Left Column**: Attributes with skills (Prime, Might, Agility, Charisma, Intelligence)
- **Middle Column**: Resources (SP/MP/HP), Defenses (PD/PDR/MD), Combat, Death/Exhaustion, Attacks, Inventory
- **Right Column**: Movement, Resources, Features

### Character Creation (`CharacterCreation.tsx`)

- Multi-step wizard with validation
- Step 3 (Background) had validation issues that were fixed
- Uses dynamic point allocation based on Intelligence modifier

### Inventory System (`inventoryItems.ts`)

- Weapons, Armor, Shields, Adventuring Supplies, Healing Potions
- Comprehensive weapon properties and damage calculations
- Enums for categorization and type safety

## Technical Patterns

### Styled Components Usage

- Uses styled-components for complex styling
- Inline styles for simple, one-off styling
- Consistent naming pattern: `Styled[ComponentName]`

### State Management

- React useState for local component state
- Context for character data sharing
- Real-time updates for resource tracking (HP, SP, MP)

### Validation Patterns

- Step-based validation in character creation
- Dynamic calculations based on character attributes
- Flexible point allocation systems

## Development Best Practices Applied

### Code Organization

- Separate files for different data types (weapons, armor, etc.)
- Clear component hierarchy
- Consistent naming conventions

### User Experience

- Visual feedback for interactions
- Tooltips for complex game mechanics
- Responsive design elements
- Auto-calculated values where appropriate

### Data Integrity

- Type safety with TypeScript enums and interfaces
- Validation at multiple levels
- Consistent data structures

## Next Steps & Known Areas for Improvement

1. **Performance Optimization**: Large component could benefit from memoization
2. **Component Splitting**: CharacterSheetClean.tsx is quite large and could be broken down
3. **Accessibility**: Add proper ARIA labels and keyboard navigation
4. **Mobile Responsiveness**: Current design is desktop-focused
5. **Testing**: Add unit tests for validation logic and calculations

## File Locations Summary

- **Main Character Sheet**: `/src/routes/character-sheet/CharacterSheetClean.tsx`
- **Character Creation**: `/src/routes/character-creation/CharacterCreation.tsx`
- **Inventory Data**: `/src/lib/rulesdata/inventoryItems.ts`
- **Character Context**: `/src/lib/stores/characterContext.tsx`
- **Schema**: `/src/lib/server/db/schema.ts`

## Git Workflow

- Use local repository configuration for commits
- Ensure commits are attributed to nzinger1983 account
- Branch: converting-to-react (current working branch)

---

**Session Summary**: Fixed character creation validation bug and completely redesigned PDR to match shield aesthetic with perfect alignment. All three defense shields (PD, PDR, MD) now have consistent appearance and spacing. Git configuration properly set for correct commit attribution.
