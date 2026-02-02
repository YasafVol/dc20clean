# Project Technical Overview

## Scope

This document centralizes the technical details for the DC20Clean codebase: stack,
scripts, testing, project structure, and contribution expectations.

## Tech Stack

- Framework: React 19 + TypeScript
- Build Tool: Vite 6
- Styling: Material-UI (MUI) + Emotion + Tailwind CSS 4
- State Management: React Context API
- Persistence: Browser localStorage (client-only)
  - Planned: Convex cloud database with authentication (see `docs/plannedSpecs/CONVEX_MIGRATION_SPEC.md`)
- Testing: Vitest (browser + node environments), Playwright
- Code Quality: ESLint + Prettier

## Local Setup

- Node.js 20 or higher
- npm or pnpm for package management

## Development Scripts

Development and build:

- `npm run dev` - Start Vite dev server
- `npm run build` - Production build to `dist/`
- `npm run preview` - Preview production build on port 4173

Code quality:

- `npm run lint` - Prettier check + ESLint
- `npm run format` - Auto-format with Prettier (Tailwind plugin enabled)

Testing:

- `npm run test:unit` - Run Vitest unit tests
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run E2E tests with interactive UI
- `npm run test:e2e:headed` - Run E2E tests in headed browser mode
- `npm run test:e2e:debug` - Run E2E tests in debug mode
- `npm run test` - Run unit tests (run mode) then E2E tests

Single test execution:

```
npx vitest -t "should calculate health correctly"
npx vitest src/lib/services/enhancedCharacterCalculator.test.ts
```

E2E test optimization:

```
PLAYWRIGHT_SKIP_BUILD=1 npm run test:e2e
E2E_WORKERS=4 npm run test:e2e
```

## CI Status

CI checks are temporarily non-blocking while the 0.10 rules release is in flight.
Workflows still run for signal and will be restored to blocking once the release stabilizes.

## Project Structure

```
src/
├── routes/                    # Application routes
│   ├── character-creation/    # Multi-step character creation wizard
│   └── character-sheet/       # Character sheet interface
├── lib/
│   ├── services/              # Business logic (calculators, completion)
│   ├── rulesdata/             # DC20 rules data (classes, ancestries, spells, etc.)
│   ├── hooks/                 # Custom React hooks
│   ├── stores/                # React Context providers
│   ├── types/                 # TypeScript interfaces
│   └── utils/                 # Utility functions
├── components/                # Shared UI components
└── api/                       # API endpoints (minimal)

e2e/                           # Playwright E2E tests
docs/systems/                  # System documentation
```

## Code Style and Standards

- Language: TypeScript with strict type checking
- Formatting: Prettier (tabs, single quotes, width 100)
- Linting: ESLint with React and TypeScript recommended rules
- File naming:
  - Components: `PascalCase.tsx` (e.g., `CharacterCreation.tsx`)
  - Modules/Hooks: `camelCase.ts` (e.g., `enhancedCharacterCalculator.ts`)
  - Tests: `*.test.ts[x]` co-located with source
- Naming convention: Use full, descriptive names (e.g., `generateDateString` not `genYmdStr`)

## Testing Requirements

- Unit tests: Place tests beside source files as `*.test.ts[x]`
- E2E tests: Add to `e2e/` directory with `.e2e.spec.ts` extension
- Test approval: Never modify existing tests without explicit written approval
- Coverage: Update or add tests when modifying behavior

## Pull Request Guidelines

- Commits: Use Conventional Commits format
  - `feat(scope): add new feature`
  - `fix(scope): fix bug`
  - `chore(scope): update tooling`
  - `docs: update documentation`
- PR contents: Include clear description, linked issues, test plan, and screenshots for UI changes
- Stacked PRs: Optional Graphite workflow supported (see `AGENTS.md` for details)
