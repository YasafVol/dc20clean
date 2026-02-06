# DC20Clean – Spells System (v0.10)

> Purpose: Single reference for spell data model, assignment rules, UI flows, and validation.
> Status: Active
> Last Updated: 2026-02-06

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
	school: SpellSchool; // 8 schools
	tags: SpellTag[]; // Burning, Cold, Healing, etc.
	isCantrip: boolean;
	isRitual?: boolean;
	cost: SpellCost; // { ap: number; mp?: number }
	range: string;
	duration: string;
	sustained: boolean; // Maintain action each turn
	effects: SpellEffect[];
	cantripPassive?: string;
	enhancements: SpellEnhancement[];
}
```

### Spell Sources (3)

| Source | Description                      |
| ------ | -------------------------------- |
| Arcane | Academic/learned magic           |
| Divine | Granted by deities/higher powers |
| Primal | Nature-based magic               |

### Spell Schools (8)

| School        | Focus                           |
| ------------- | ------------------------------- |
| Astromancy    | Space, gravity, celestial magic |
| Conjuration   | Summoning, teleportation        |
| Divination    | Knowledge, detection, foresight |
| Elemental     | Fire, cold, lightning, acid     |
| Enchantment   | Mind control, charm, fear       |
| Invocation    | Healing, radiant, restoration   |
| Nullification | Dispelling, anti-magic, death   |
| Transmutation | Transformation, enhancement     |

### Spell Tags (Examples)

`Burning`, `Cold`, `Lightning`, `Acid`, `Fire`, `Radiant`, `Necrotic`, `Poison`, `Psychic`, `Force`, `Healing`, `Teleportation`, `Summoning`, `Illusion`, `Embolden`, `Enfeeble`, `Sound`

### File Structure

```
src/lib/rulesdata/spells-data/
├── astromancy/          # 10 spells
├── conjuration/         # 14 spells
├── divination/          # 2 spells
├── elemental/           # 41 spells
├── enchantment/         # 12 spells
├── invocation/          # 14 spells
├── nullification/       # 16 spells
├── transmutation/       # 16 spells
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
- **125 Spells**: Complete extraction from v0.10 rules (counts per school updated 2026-02-06)

**Class Access Changes:**

- Classes now access spells by Source + School/Tag combinations via a central `spellRestrictions` config.
- **Tiered Architecture (M3.20)**: Implemented "Global Magic Profile + Specialized Slots" model.
- **Sustained Property**: Added `sustained` flag to all spells (maintain action each turn).
- **Spellbook App**: New dedicated route for managing character spellbooks.
- **Smart Pockets**: UI redesigned with individual spell slots that support specialized filtering.

---

### 4.1 Global Magic Profile

- Defines the character's general spellcasting thematic bounds.
- Aggregates "Global Expansion" effects (e.g., a Feature that adds "Arcane" to all your spellcasting).
- Used as a fallback for all spell selection.

### 4.2 Spells Known Slots (Pockets)

- Individual "pockets" that grant a single spell or cantrip.
- Can have **Specific Restrictions** (e.g., "Must be from the Elemental school").
- Sources: Class Progression, Subclass Features, Talents (Grant Spell effect).
- Selection is tracked per-slot: `Record<SlotID, SpellID>`.

### 4.3 Validation Rules

- **Type Mismatch**: Cantrips cannot fit into Spell slots and vice-versa.
- **Restriction Mismatch**: Selected spells must match both the specific slot restrictions AND the Global Magic Profile.
- **Exhaustion**: All available slots must be validly filled.

---

## 5. UI Flows

### Creation (`Spells.tsx`)

- The Spells stage appears conditionally only when the calculator reports `spellsKnownSlots.length > 0`.
- Each slot is an individual spell picker that respects:
  - Slot-level restrictions (specific school, source, or tag requirements)
  - Global Magic Profile (character's general spellcasting bounds)
  - Type matching (cantrip slots only accept cantrips, spell slots only accept spells)
- Spell selection is tracked as `Record<SlotID, SpellID>` in `characterContext.tsx`.

### Sheet (`character-sheet/components/Spells.tsx`)

- Displays known spells with filtering by school, source, and tags
- Shows spell details via `SpellPopup` modal
- Visibility: shown when `spellsKnownSlots.length > 0` or saved spells exist

### Spellbook (`routes/spellbook/Spellbook.tsx`)

- Dedicated route for browsing all spells
- Filterable by school, source, tags, and cantrip/spell type

### Cross-Path Spell List

- Martial classes taking the Spellcaster Path must choose a spell list (`selectedCrossPathSpellList` in `characterContext.tsx`)
- UI for this choice is in `LevelingChoices.tsx`
- See `LEVELING_SYSTEM.MD` for cross-path grant details

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

> Last updated: 2026-02-06
> Maintainer: @DC20Clean-Team
