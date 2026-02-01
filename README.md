# DC20 Clean Character Sheet

A comprehensive character creation and management system for the DC20 tabletop RPG system, with a step-by-step wizard, rules validation, and real-time calculations.

---

## ✨ Features

### Character Creation Wizard

- **Multi-level support**: Create characters from level 1 through 10 (DC20 v0.10 max)
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

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📖 Documentation

- Release notes: `docs/archive/2026-01-25-release-notes-v0.10.md`
- System docs index: `docs/systems/`
- Technical overview (stack, scripts, structure, CI): `docs/systems/PROJECT_TECHNICAL_OVERVIEW.MD`
- Contributor guidelines: `AGENTS.md`

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
- ✅ Leveling system (1-10, DC20 v0.10 compliant)
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

- **[Convex Migration](docs/archive/CONVEX_MIGRATION.md)** – Cloud storage with user authentication (implemented behind a flag)
- **[Leveling Epic](docs/archive/LEVELING_EPIC.md)** – Extended leveling (archived, completed)
- **[Conditions System](docs/plannedSpecs/CONDITIONS_SPEC.md)** – Status effects and conditions
- **[Encounter Builder](docs/plannedSpecs/ENCOUNTR_BUILDER.md)** – Combat encounter management

---

## 🆘 Support

For questions, issues, or feature requests:

1. Check the documentation in `docs/systems/`
2. Review existing issues
3. Create a new issue with detailed description and reproduction steps
