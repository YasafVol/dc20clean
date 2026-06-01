# DC20Clean – Spells System (v0.10.5)

> Purpose: Single reference for spell data model, assignment rules, UI flows, and validation.
> Status: Active
> Last Updated: 2026-06-01

---

## 1. Key Files & Roles

- `src/lib/rulesdata/spells-data/<school>/*.ts`: base v0.10 spell definitions organized by school
- `src/lib/rulesdata/spells-data/v0105Catalog.ts`: non-destructive v0.10.5 spell catalog overlay, including approved renames, additions, removals, and source-list moves
- `src/lib/rulesdata/spells-data/index.ts`: main export with current selectable catalog and alias-aware lookup utilities
- `src/lib/rulesdata/versioning/aliases.ts`: stable ID routing policy for old saved spell IDs and display names
- `src/lib/rulesdata/schemas/spell.schema.ts`: Spell TypeScript types and enums
- `src/lib/services/spellAssignment.ts`: Assignment logic (availability, limits, helpers)
- `src/lib/services/enhancedCharacterCalculator.ts`: Aggregates class/trait effects that alter MP
- UI selection and display:
  - `src/routes/character-creation/*` (spell pickers where applicable)
  - `src/routes/character-sheet/*` (spell list, filters, actions)

---

## 2. Data Shapes (v0.10.5)

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

`Burning`, `Cold`, `Lightning`, `Corrosion`, `Fire`, `Radiant`, `Umbral`, `Poison`, `Psychic`, `True`, `Healing`, `Teleportation`, `Summoning`, `Illusion`, `Embolden`, `Enfeeble`, `Sound`

### File Structure

```
src/lib/rulesdata/spells-data/
├── astromancy/          # base v0.10 spells
├── conjuration/         # base v0.10 spells
├── divination/          # base v0.10 spells
├── elemental/           # base v0.10 spells
├── enchantment/         # base v0.10 spells
├── invocation/          # base v0.10 spells
├── nullification/       # base v0.10 spells
├── transmutation/       # base v0.10 spells
├── v0105Catalog.ts      # v0.10.5 overlay
└── index.ts             # Main export + utilities
```

### Utility Functions

```typescript
// Get all spells
import { ALL_SPELLS } from './spells-data';

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

## 3.1 v0.10.5 Taxonomy Notes

- `Poison` is a canonical spell tag and damage tag, not a legacy alias.
- `Blight Bomb` carries both `Ailment` and `Poison` tags for structured filtering.
- The current selectable catalog is `applyV0105SpellCatalog(BASE_SPELLS)`, not a destructive rewrite of the base v0.10 school files.
- True spell renames route through `getSpellById()` via `RULES_ALIASES`; saved IDs are not rewritten during lookup.
- Changelog-confirmed new v0.10.5 spells are added through the overlay.
- Removed spells and source-list moves are applied only to the current selectable catalog. Historical saved spell objects remain renderable/exportable from saved character data.
- Reworked or ambiguous spell identities, including `gravity-sink-hole`, `force-dome`, and `wall-of-force`, are compatibility-classified but are not silently remapped to v0.10.5 spells.
- Character completion and PDF export use alias-aware spell lookup for legacy spell IDs before falling back to saved display text.

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
- **Restriction Mismatch**: Selected spells must match slot restrictions and the Global Magic Profile. Source restrictions narrow only when present; school and tag restrictions are OR-based, so a spell can qualify by matching an allowed school or an allowed tag. Exact spell restrictions remain exact-only.
- **Exhaustion**: All available slots must be validly filled.

---

## 5. UI Flows

### Creation (`Spells.tsx`)

- The Spells stage appears conditionally only when the calculator reports `spellsKnownSlots.length > 0`.
- Each slot is an individual spell picker that respects:
  - Slot-level restrictions (specific school/source/tag requirements, with school/tag as OR)
  - Global Magic Profile (source if present, then school or tag)
  - Type matching (cantrip slots only accept cantrips, spell slots only accept spells)
- Source, school, and tag browsing filters are OR-based across selected facets; cost and sustained filters continue to narrow the result set.
- Spell selection is tracked as `Record<SlotID, SpellID>` in `characterContext.tsx`.

### Sheet (`character-sheet/components/Spells.tsx`)

- Displays known spells with filtering by school, source, and tags
- Shows spell details via `SpellPopup` modal
- Visibility: shown when `spellsKnownSlots.length > 0` or saved spells exist

### Spellbook (`routes/spellbook/Spellbook.tsx`)

- Dedicated route for browsing all spells
- Filterable by class, source, school, tags, cost, and sustained status. Class/source/school/tag filters are OR-based across selected facets; cost and sustained filters narrow the result set.

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

> Last updated: 2026-06-01
> Maintainer: @DC20Clean-Team
