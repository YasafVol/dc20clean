# DC20Clean – Spells System (v0.10)

> Purpose
> Single reference for spell data model, assignment rules, UI flows, and validation.

---

## 1. Key Files & Roles

- `src/lib/rulesdata/spells-data/<school>/*.ts`: 125 spell definitions organized by school
- `src/lib/rulesdata/spells-data/index.ts`: Main export with utility functions
- `src/lib/rulesdata/schemas/spell.schema.ts`: Spell TypeScript types and enums
- `src/lib/services/spellAssignment.ts`: Assignment logic (availability, limits, helpers)
- `src/lib/services/enhancedCharacterCalculator.ts`: Aggregates class/trait effects that alter MP
- UI selection and display:
  - `src/routes/character-creation/*` (spell pickers where applicable)
  - `src/routes/character-sheet/*` (spell list, filters, actions)

---

## 2. Data Shapes (v0.10)

### Spell Schema

```typescript
interface Spell {
  id: string;
  name: string;
  sources: SpellSource[]; // Arcane, Divine, Primal
  school: SpellSchool;    // 8 schools
  tags: SpellTag[];       // Burning, Cold, Healing, etc.
  isCantrip: boolean;
  isRitual?: boolean;
  cost: SpellCost;        // { ap: number; mp?: number }
  range: string;
  duration: string;
  effects: SpellEffect[];
  cantripPassive?: string;
  enhancements: SpellEnhancement[];
}
```

### Spell Sources (3)

| Source  | Description                          |
|---------|--------------------------------------|
| Arcane  | Academic/learned magic               |
| Divine  | Granted by deities/higher powers     |
| Primal  | Nature-based magic                   |

### Spell Schools (8)

| School        | Focus                                |
|---------------|--------------------------------------|
| Astromancy    | Space, gravity, celestial magic      |
| Conjuration   | Summoning, teleportation             |
| Divination    | Knowledge, detection, foresight      |
| Elemental     | Fire, cold, lightning, acid          |
| Enchantment   | Mind control, charm, fear            |
| Invocation    | Healing, radiant, restoration        |
| Nullification | Dispelling, anti-magic, death        |
| Transmutation | Transformation, enhancement          |

### Spell Tags (Examples)

`Burning`, `Cold`, `Lightning`, `Acid`, `Fire`, `Radiant`, `Necrotic`, `Poison`, `Psychic`, `Force`, `Healing`, `Teleportation`, `Summoning`, `Illusion`, `Embolden`, `Enfeeble`, `Sound`

### File Structure

```
src/lib/rulesdata/spells-data/
├── astromancy/          # 9 spells
├── conjuration/         # 15 spells
├── divination/          # 12 spells
├── elemental/           # 28 spells
├── enchantment/         # 19 spells
├── invocation/          # 17 spells
├── nullification/       # 11 spells
├── transmutation/       # 14 spells
└── index.ts             # Main export + utilities
```

### Utility Functions

```typescript
// Get all spells
import { allSpells } from './spells-data';

// Lookup functions
getSpellById(id: string): Spell | undefined
getSpellsBySchool(school: SpellSchool): Spell[]
getSpellsBySource(source: SpellSource): Spell[]
getCantrips(): Spell[]
getNonCantrips(): Spell[]
```

---

## 3. v0.10 Changes from v0.9.5

**Major Changes:**
- **Spell Lists Removed**: No more predefined lists (Fire & Flames, Holy, etc.)
- **Schools Reorganized**: 8 new schools replace previous categorization
- **Sources Added**: Arcane/Divine/Primal determine class access
- **Tags System**: Flexible tagging for filtering and class access
- **Enhancement System**: Spells have enhancement options with AP/MP costs
- **125 Spells**: Complete extraction from v0.10 rules

**Class Access Changes:**
- Classes now access spells by Source + School/Tag combinations
- Example: Bard gets Enchantment school + Embolden/Enfeeble/Healing/Illusion/Sound tags
- Example: Wizard gets Arcane source with full school access

---

## 4. Assignment Rules

- Availability is driven by: class spell access (sources, schools, tags), ancestry/trait grants.
- MP costs are paid from `finalMpMax`/current MP.
- Cantrips cost 1 AP and 0 MP by default.
- Class features can grant additional known spells or school/tag access.

Acceptance examples:

- A Wizard can select any Arcane spell from any of the 8 schools.
- A Bard can select Enchantment school spells OR spells with Healing/Illusion/Sound tags.

---

## 5. UI Flows

- Creation: If class supports spells at level, render picker(s) filtered by class access.
- Sheet: Display known spells; provide filters by school, source, and tags.
- Mobile fallbacks: Ensure list and removal actions are accessible.

---

## 6. E2E Links

- `e2e/09-spells.e2e.spec.ts` — Adds a spell, filters, and deletes; validates mobile/desktop fallbacks.
- `e2e/12-exhaustion-info.e2e.spec.ts` — Feature info buttons include class feature info affecting spells.

---

## 7. Troubleshooting

- Spell not visible: confirm it's exported via the school's `index.ts` and main `index.ts`.
- MP not matching: ensure effects target `mpMax`; calculator aggregates into `finalMpMax`.
- Class access issues: verify class spell access rules match source/school/tag combinations.

---

> Last updated: 2026-01-05
> Maintainer: @DC20Clean-Team
