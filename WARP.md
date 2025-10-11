# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

DC20 Clean is a comprehensive character creation and management system for the DC20 tabletop RPG system, built with **React 19**, **TypeScript**, and **Vite**. The application features a multi-step character creation wizard and a character sheet interface with real-time calculations and validation.

## Development Setup

### Prerequisites
- Node.js 20 (use `nvm use 20` to switch if needed)
- pnpm or npm for package management

### Quick Start Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands

**Build & Development:**
- `npm run dev` - Start Vite development server
- `npm run build` - Production build to `dist/`
- `npm run preview` - Preview built app on port 4173

**Code Quality:**
- `npm run lint` - Run Prettier check + ESLint
- `npm run format` - Auto-format with Prettier (includes Tailwind class sorting)

**Testing:**
- `npm run test:unit` - Run Vitest (browser + node environments)
- `npm run test` - Run unit tests then E2E tests
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI
- `npm run test:e2e:headed` - Run E2E tests in headed mode
- `npm run test:e2e:debug` - Run E2E tests in debug mode

**Single Test Execution:**
- `npx vitest -t "should ..."` - Run specific unit test by name
- `npx vitest path/to/file.test.ts` - Run specific unit test file

**E2E Test Optimization:**
- `PLAYWRIGHT_SKIP_BUILD=1 npm run test:e2e` - Skip build, reuse existing dist/
- `E2E_WORKERS=4 npm run test:e2e` - Run with parallel workers

**Database:**
None – app uses browser localStorage only

**Special Scripts:**
- `npm run export:list-fields` - List PDF form fields
- `npm run export:local` - Local export functionality

## Architecture Overview

### Core Design Principles

1. **Styled Components Supremacy**: All React components must use styled-components, no raw HTML elements or inline styling
2. **Separation of Concerns**: UI components are "stupid" presentation layers; all calculation logic lives in `enhancedCharacterCalculator`
3. **Effect-Based System**: Character stats are calculated through an effect aggregation system
4. **Real-time Validation**: All character choices are validated in real-time with detailed breakdowns

### Major Architectural Components

**Character Creation Flow (`src/routes/character-creation/`)**
- Multi-step wizard: Class → Ancestry → Attributes → Background → Spells/Maneuvers → Name
- Each step has dedicated components with validation
- Real-time character preview and calculation
- State managed through React Context (`characterContext`)

**Character Calculation Engine (`src/lib/services/enhancedCharacterCalculator.ts`)**
- Central calculation engine for all derived stats
- Effect aggregation system with source attribution
- Handles HP/SP/MP, defenses, skill/trade masteries, and all derived values
- Provides detailed breakdowns for UI tooltips
- Mastery cap validation system with exception grants

**Character Sheet (`src/routes/character-sheet/`)**
- Responsive design (desktop/mobile variants)
- Live stat updates from calculation engine
- Manual override support for certain values
- Attack system, inventory management, spell tracking

**Rules Data System (`src/lib/rulesdata/`)**
- Structured data for classes, ancestries, traits, spells, etc.
- JSON schemas for type safety
- Loader system for dynamic data access
- Effect system for modular stat modifications

**Persistence**
- Browser localStorage for character save/load

### Key Data Flow

1. **Character Creation**: User input → Context state → Enhanced calculator → Real-time validation/preview
2. **Character Sheet**: Saved data → Calculator engine → UI display with breakdowns
3. **Effect Resolution**: Raw effects → User choices → Resolved effects → Stat calculations

### Effect System Architecture

The effect system is the core of character calculations:
- **Effect Types**: Modify attributes, resources, masteries, defenses, etc.
- **Source Attribution**: Every effect tracks its origin (trait, class feature, choice)
- **User Choice Resolution**: Effects can depend on user selections
- **Mastery Cap System**: Complex validation for skill/trade proficiency limits
- **Breakdown Generation**: Detailed source tracking for UI tooltips

### Testing Architecture

**Unit Tests (Vitest)**
- Browser environment for React components
- Node environment for services/utilities
- Tests co-located with source files (`*.test.ts[x]`)
- Enhanced calculator has comprehensive test coverage

**E2E Tests (Playwright)**
- Full character creation workflows
- Character sheet functionality
- Mobile and desktop variants
- Test fixtures for consistent character data

## Important File Patterns

### Naming Conventions
- **Components**: `PascalCase.tsx` (e.g., `CharacterCreation.tsx`)
- **Utilities/Services**: `camelCase.ts` (e.g., `enhancedCharacterCalculator.ts`)
- **Tests**: `*.test.ts[x]` co-located with source
- **Styles**: Separate `.styles.ts` files for styled components

### Directory Structure
```
src/
├── routes/              # Main application routes
│   ├── character-creation/  # Multi-step character creation
│   └── character-sheet/     # Character sheet interface
├── lib/
│   ├── services/        # Business logic (calculators, completion)
│   ├── rulesdata/       # Game rules and data structures
│   ├── hooks/           # React hooks (useCharacterBuilder)
│   ├── stores/          # Context providers
│   └── types/           # TypeScript interfaces
├── components/          # Shared UI components
└── api/                 # API endpoints
```

## Development Rules & Constraints

### Code Quality Rules
- TypeScript with strict type checking
- No JSON.parse/stringify in character state management (except `storageUtils.ts`)
- Prefer pure functions and immutable patterns
- Use Zod schemas for runtime validation
- Styled components must be in separate `.styles.ts` files

### Testing Rules
- **Never modify tests without explicit approval**
- Do not change unit or E2E tests without written user approval
- No snapshot updates (`-u`) without prior approval
- If a test seems incorrect, propose changes in comments rather than modifying directly

### Character System Constraints
- Level 1 characters can only have ONE Adept mastery (skills or trades)
- Mastery caps are enforced based on character level
- All calculations must go through `enhancedCharacterCalculator`
- Manual overrides are supported but preserved during edits

## Gimli's Sacred Development Laws

From the architectural documentation, these principles must be followed:

1. **Styled Components Supremacy**: Every React component must be styled component and small - no raw `<div>` elements
2. **Stupid Component Doctrine**: UI components should be "stupid" from calculation perspectives - all business logic belongs in services
3. **Component Modularity**: Extract and modularize reusable components
4. **Separation of Concerns**: UI handles presentation and user interaction, services handle calculations and business rules

## Critical Issues to Be Aware Of

- **Weapon Selection Crash**: The attack system currently crashes when selecting weapons on the character sheet. The `weapons.ts` file has been consolidated into `inventoryItems.ts`, but the Attacks component needs refactoring to use the new inventory weapon structure.

## System References

Key system documentation is available in `docs/systems/`:
- `ONTOLOGY.md` - Core concepts and architecture overview
- `CALCULATION_SYSTEM.MD` - Calculation formulas and validation rules
- `EFFECT_SYSTEM.MD` - Effect types and targets
- `BACKGROUND_SYSTEM.MD` - Skills/trades/languages system
- `CLASS_SYSTEM.MD` - Class features and progression
- `ANCESTRY_SYSTEM.MD` - Ancestry and trait system

## GitHub Copilot Integration

This project has specific GitHub Copilot instructions that emphasize:
- Speaking as Gimli from Lord of the Rings at all times
- Using enhanced calculation engine for all classes
- Following strict coding standards and architectural laws
- Comprehensive planning before execution
- Memory bank protocol for persistent context
