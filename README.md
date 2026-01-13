# DC20 Clean Character Sheet

A comprehensive character creation and management system for the DC20 tabletop RPG system. Built with React 19, TypeScript, and Vite, this application provides an intuitive step-by-step wizard for creating characters with full rules validation and real-time calculations.

---

## ✨ Features

### Character Creation Wizard

- **Multi-level support**: Create characters from level 1 through 5+
- **Step-by-step flow**: Class & Features → Leveling Choices → Ancestry → Attributes → Background → Spells & Maneuvers → Finalization
- **Real-time validation**: Instant feedback on choices with detailed error messages
- **Character preview**: Live stat calculations as you build

### Core Systems

- **Leveling System**: Talent selection and path point allocation for higher-level characters
- **Multiclass Support**: Choose multiclass options with proper progression
- **Mastery System**: Level-based skill and trade proficiency with automatic limits
- **Spell Known System (M3.20)**: Generalized "Global Profile + Specialized Slots" architecture supporting surgical spell grants and global thematic expansions
- **Effect System**: Modular stat modifications with source attribution
- **Point Conversion**: Skills ↔ Trades, Trades → Languages with validation
- **Multi-Attribute Trades**: flexible attribute associations for trades (e.g. Athletics uses Might or Agility)

### Character Management

- **Character Sheet**: Responsive design for desktop and mobile
- **Spellbook App**: Manage and view your character's spellbook in a dedicated interface
- **Custom Equipment Builder**: Build and save custom weapons, armor, shields, and spell focuses
- **Live Calculations**: Real-time stat updates with detailed breakdowns
- **PDF Export**: Export characters to official DC20 character sheet PDF

### Rules Implementation

- **11 Classes**: Barbarian, Bard, Cleric, Druid, Hunter, Martial Artist, Paladin, Rogue, Sorcerer, Warlock, Warrior
- **12 Ancestries**: Human, Elf, Dwarf, Halfling, Orc, Dragonborn, Beastborn, Construct, Cursed, Faeborn, Primordial, Shade
- **Backgrounds**: 20+ backgrounds with skills, trades, and languages
- **Spells & Maneuvers**: Complete spell and martial technique libraries
- **Talents**: General, class-specific, and multiclass talents

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20 or higher
- **npm** or **pnpm** for package management

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dc20clean

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 🛠️ Development

### Available Scripts

**Development & Build:**

- `npm run dev` – Start Vite dev server (hot reload enabled)
- `npm run build` – Production build to `dist/`
- `npm run preview` – Preview production build on port 4173

**Code Quality:**

- `npm run lint` – Run Prettier check + ESLint
- `npm run format` – Auto-format with Prettier (includes Tailwind class sorting)

**Testing:**

- `npm run test:unit` – Run Vitest unit tests
- `npm run test:e2e` – Run Playwright E2E tests
- `npm run test:e2e:ui` – Run E2E tests with interactive UI
- `npm run test:e2e:headed` – Run E2E tests in headed browser mode
- `npm run test:e2e:debug` – Run E2E tests in debug mode
- `npm run test` – Run unit tests (run mode) then E2E tests

**Single Test Execution:**

```bash
# Run specific unit test by name
npx vitest -t "should calculate health correctly"

# Run specific test file
npx vitest src/lib/services/enhancedCharacterCalculator.test.ts
```

**E2E Test Optimization:**

```bash
# Skip build, reuse existing dist/
PLAYWRIGHT_SKIP_BUILD=1 npm run test:e2e

# Run with custom parallel workers
E2E_WORKERS=4 npm run test:e2e
```

### Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Material-UI (MUI) + Emotion + Tailwind CSS 4
- **State Management**: React Context API
- **Persistence**: Browser localStorage (client-side only)
- **Testing**:
  - Unit: Vitest (browser + node environments)
  - E2E: Playwright
- **Code Quality**: ESLint + Prettier

### Project Structure

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

---

## 📖 Documentation

Comprehensive system documentation is available in the `docs/systems/` directory:

### Core Systems

- **[Leveling System](docs/systems/LEVELING_SYSTEM.MD)** – Character leveling (1-5+), talents, and path progression
- **[Class System](docs/systems/CLASS_SYSTEM.MD)** – Class features, subclasses, and progressions
- **[Ancestry System](docs/systems/ANCESTRY_SYSTEM.MD)** – Ancestries, traits, and mixed ancestry
- **[Background System](docs/systems/BACKGROUND_SYSTEM.MD)** – Skills, trades, languages, and point conversions
- **[Traits System](docs/systems/TRAITS_SYSTEM.MD)** – Trait selection and ancestry points

### Calculation & Effects

- **[Calculation System](docs/systems/CALCULATION_SYSTEM.MD)** – Derived stats, formulas, and validation
- **[Effect System](docs/systems/EFFECT_SYSTEM.MD)** – Effect types, targets, and resolution
- **[Trades Multi-Attribute](docs/systems/TRADES_MULTI_ATTRIBUTE_SPEC.md)** – Trade attribute calculation rules

### Combat & Abilities

- **[Spells System](docs/systems/SPELLS_SYSTEM.MD)** – Spell selection and management
- **[Martials System](docs/systems/MARTIALS_SYSTEM.MD)** – Maneuvers and martial techniques

### Additional Systems

- **[Multiclass System](docs/systems/MULTICLASS_SYSTEM.MD)** – Multiclass rules and progression
- **[Character Sheet](docs/systems/CHARACTER_SHEET.MD)** – Character sheet layout and features
- **[PDF Export System](docs/systems/PDF_EXPORT_SYSTEM.MD)** – PDF generation and form filling
- **[Ontology](docs/systems/ONTOLOGY.md)** – Core concepts and architecture overview

### Development Guides

- **[AGENTS.md](AGENTS.md)** – Repository guidelines and contributor documentation
- **[Character Creation Flow](docs/systems/CHARACTER_CREATION_FLOW.MD)** – Step-by-step creation process
- **[Feature ID Naming Convention](docs/systems/FEATURE_ID_NAMING_CONVENTION.md)** – ID naming standards

---

## 🤝 Contributing

### Code Style & Standards

- **Language**: TypeScript with strict type checking
- **Formatting**: Prettier (tabs, single quotes, width 100)
- **Linting**: ESLint with React and TypeScript recommended rules
- **File Naming**:
  - Components: `PascalCase.tsx` (e.g., `CharacterCreation.tsx`)
  - Modules/Hooks: `camelCase.ts` (e.g., `enhancedCharacterCalculator.ts`)
  - Tests: `*.test.ts[x]` co-located with source
- **Naming Convention**: Use full, descriptive names (e.g., `generateDateString` not `genYmdStr`)

### Testing Requirements

- **Unit Tests**: Place tests beside source files as `*.test.ts[x]`
- **E2E Tests**: Add to `e2e/` directory with `.e2e.spec.ts` extension
- **Test Approval**: Never modify existing tests without explicit written approval
- **Coverage**: Update or add tests when modifying behavior

### Pull Request Guidelines

- **Commits**: Use Conventional Commits format
  - `feat(scope): add new feature`
  - `fix(scope): fix bug`
  - `chore(scope): update tooling`
  - `docs: update documentation`
- **PR Contents**: Include clear description, linked issues, test plan, and screenshots for UI changes
- **Stacked PRs**: Optional Graphite workflow supported (see [AGENTS.md](AGENTS.md) for details)

### Workflow

```bash
# Create feature branch
git checkout -b feat/feature-name

# Make changes and commit
git add .
git commit -m "feat(creation): add new ancestry"

# Run tests
npm run lint
npm run test:unit
npm run test:e2e

# Push and create PR
git push origin feat/feature-name
```

For detailed guidelines, see **[AGENTS.md](AGENTS.md)**

---

## 📝 License

[Add license information here]

---

## 🎯 Project Status

### Current Features

- ✅ Character creation wizard (Premium "Stages" UI)
- ✅ Leveling system (1-5+)
- ✅ Multiclass support
- ✅ All 13 classes with features
- ✅ All 12 ancestries with traits
- ✅ Mastery system with validation
- ✅ Spell and maneuver selection (Premium slot-based UI with smart filtering)
- ✅ Character sheet (desktop & mobile)
- ✅ Spellbook & Custom Equipment mini-apps
- ✅ PDF export

### Planned Features

See `docs/plannedSpecs/` for detailed specifications:

- **[Leveling Epic](docs/plannedSpecs/LEVELING_EPIC.md)** – Extended leveling beyond level 5
- **[Conditions System](docs/plannedSpecs/CONDITIONS_SPEC.md)** – Status effects and conditions
- **[Encounter Builder](docs/plannedSpecs/ENCOUNTR_BUILDER.md)** – Combat encounter management

---

## 🆘 Support

For questions, issues, or feature requests:

1. Check the documentation in `docs/systems/`
2. Review existing issues
3. Create a new issue with detailed description and reproduction steps

---

**Built with ⚔️ for the DC20 community**
