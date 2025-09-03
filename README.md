# DC20 Clean Character Sheet

A comprehensive character creation and management system for the DC20 tabletop RPG system.

## ✨ Recent Updates

### Added New Ancestries

### Mastery System Implementation (Latest)

- **Complete skill/trade mastery system** with level-based limits (Untrained → Grandmaster)
- **Level 1 special rule**: Only ONE Adept skill/trade allowed for Level 1 characters
- **Class feature mastery bonuses** automatically parsed and applied
- **Real-time validation** with visual warnings for mastery violations
- **Calculated bonuses display**: Shows Attribute + Mastery\*2 bonuses on character sheet
- **Enhanced UI** with mastery names, tooltips, and bonus calculations

### Character Creation Features

- **Ancestry point calculation** with class feature bonuses (e.g., Cleric Ancestral Domain +2)
- **Background selection** with skills, trades, and languages
- **Point conversion system**: Skills ↔ Trades, Trades → Languages
- **Class feature selection** with dynamic choices and validation
- **Real-time character preview** with calculated stats

### Character Sheet Features

- **Live bonus calculations** for all skills, trades, and knowledge
- **Mastery system display** with proficiency dots and calculated bonuses
- **Complete stat management** with attribute modifiers and derived values
- **Save/load to browser** for persistent character storage

## 🛠️ TODO

### Critical Issues

- **Fix weapon selection crash**: The attack system currently crashes when selecting weapons on the character sheet page. The weapons.ts file has been deleted in favor of consolidating to inventoryItems.ts, but the attack system needs to be properly refactored to work with the inventory weapon structure. This requires updating the Attacks component to use the correct weapon properties and interfaces from inventoryItems.ts.

### Enhancements

- **Server-side mastery validation**: Add endpoint validation for mastery limits in character completion
- **Advanced class features**: Implement remaining class-specific features and progressions
- **Combat system**: Enhance attack calculations and combat mechanics
