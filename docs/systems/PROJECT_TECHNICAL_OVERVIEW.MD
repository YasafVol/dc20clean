# Project Technical Overview

> Purpose: Technical overview of the DC20Clean codebase: stack, scripts, testing, project structure, and contribution expectations.
> Status: Active
> Last Updated: 2026-02-08

## Tech Stack

- Framework: React 19 + TypeScript
- Build Tool: Vite 6
- Styling: Material-UI (MUI) + Emotion + Tailwind CSS 4
- State Management: React Context API
- Persistence: Hybrid storage
  - localStorage is active by default (anonymous/offline-first)
  - Convex cloud storage is active when `VITE_USE_CONVEX=true` and `VITE_CONVEX_URL` is set
- Testing: Vitest (browser + node environments), Playwright
- Code Quality: ESLint + Prettier

## Local Setup

- Node.js 20 or higher
- npm or pnpm for package management

## Development Scripts

Development and build:

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build on port 4173
- `npm run convex:dev` — Start Convex development server (continuous)
- `npx convex dev --once` — Validate/deploy Convex functions and regenerate client types

Convex seeding:

- `npm run seed` — Seed all official data (monsters + features)
- `npm run seed:monsters` — Seed official monsters only
- `npm run seed:features` — Seed official features only

Code quality:

- `npm run lint` — Prettier check + ESLint
- `npm run format` — Auto-format with Prettier (Tailwind plugin enabled)

Testing:

- `npm run test:unit` — Run Vitest unit tests
- `npm run test:e2e` — Run Playwright E2E tests
- `npm run test:e2e:ui` — E2E with interactive UI
- `npm run test:e2e:headed` — E2E in headed browser mode
- `npm run test:e2e:debug` — E2E in debug mode
- `npm run test` — Run unit tests (run mode) then E2E tests

E2E per-project and parallel:

- `npm run e2e:desktop` / `e2e:mobile` / `e2e:all` — Single-worker E2E by project
- `npm run e2e:parallel:desktop` / `e2e:parallel:mobile` / `e2e:parallel:all` — Multi-worker E2E (default 4 workers)
- `npm run e2e:parallel:auto` — Auto-detect worker count from CPU cores

PDF export:

- `npm run export:list-fields` — Extract PDF form field names
- `npm run export:local` — Run local PDF export proof-of-concept

Single test execution:

```
npx vitest -t "should calculate health correctly"
npx vitest src/lib/services/enhancedCharacterCalculator.test.ts
```

## CI Status

CI checks are temporarily non-blocking while the 0.10 rules release is in flight.
Workflows still run for signal and will be restored to blocking once the release stabilizes.

## Project Structure

```
src/
├── routes/                        # Application routes
│   ├── character-creation/        # Multi-step character creation wizard
│   ├── character-sheet/           # Character sheet (desktop + mobile)
│   │   ├── components/            #   Section components (50+)
│   │   ├── components/mobile/     #   Mobile-specific sections
│   │   ├── components/shared/     #   Shared UI utilities
│   │   ├── hooks/                 #   Provider, reducer, breakpoint
│   │   ├── styles/                #   Styled components
│   │   └── utils/                 #   Sheet utilities
│   ├── conditions/                # Conditions reference page
│   ├── custom-equipment/          # Equipment builder wizard
│   ├── dm/                        # DM tools
│   │   ├── encounters/            #   Encounter planner
│   │   └── monsters/              #   Monster designer
│   ├── systems/                   # Hidden systems explorer
│   └── spellbook/                 # Spell reference browser
├── lib/
│   ├── config/                    # Feature flags
│   ├── hooks/                     # Custom React hooks (useCharacterBuilder, useMonsters, etc.)
│   ├── pdf/                       # PDF export pipeline (transformers, field maps, templates)
│   ├── rulesdata/                 # DC20 rules data
│   │   ├── ancestries/            #   Ancestry + trait definitions
│   │   ├── classes-data/          #   Features, progressions, talents, templates
│   │   ├── conditions/            #   Condition definitions
│   │   ├── equipment/             #   Equipment schemas, validation, storage
│   │   ├── martials/              #   Maneuver data
│   │   ├── progression/           #   Leveling, paths, multiclass
│   │   ├── schemas/               #   TypeScript + Zod schemas
│   │   └── spells-data/           #   125 spells organized by school
│   ├── services/                  # Business logic (calculator, spell assignment, monster calc)
│   ├── storage/                   # Storage adapters (localStorage, Convex)
│   ├── stores/                    # React Context providers
│   ├── types/                     # TypeScript interfaces (effectSystem, pdfExport, etc.)
│   └── utils/                     # Utility functions (debug, migrations, storage)
├── components/                    # Shared UI components
│   ├── auth/                      #   Auth components (SignIn, UserMenu, AuthGuard)
│   └── ui/                        #   shadcn/ui primitives (button, card, dialog, etc.)
├── assets/                        # Images and SVGs
├── debug/                         # Debug/test components
└── styles/                        # Global styles

convex/                            # Convex backend
├── schema.ts                      #   Database schema
├── characters.ts                  #   Character CRUD
├── monsters.ts                    #   Monster CRUD
├── encounters.ts                  #   Encounter management
├── features.ts                    #   Feature data
├── auth.ts                        #   Authentication handlers
└── seed.ts                        #   Data seeding functions

e2e/                               # Playwright E2E tests
scripts/                           # Build/utility scripts
docs/systems/                      # System documentation
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
