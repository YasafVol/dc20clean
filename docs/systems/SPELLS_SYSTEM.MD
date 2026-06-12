# DC20Clean – Spells System (v0.10.5)

> Purpose: Single reference for spell data model, assignment rules, UI flows, and validation.
> Status: Active
> Last Updated: 2026-06-12

---

## 1. Key Files & Roles

- `docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md`: authoritative v0.10.5 spell source
- `scripts/spells/dc20-0105-spells.mjs`: deterministic parser, validator, report writer, and TypeScript generator
- `src/lib/rulesdata/spells-data/generated/v0105.generated.ts`: generated 160-spell selectable catalog; never edit manually
- `src/lib/rulesdata/spells-data/index.ts`: main export with generated current catalog and alias-aware lookup utilities
- `src/lib/rulesdata/versioning/aliases.ts`: stable ID routing policy for old saved spell IDs and display names
- `src/lib/rulesdata/versioning/characterUpgrade.ts`: explicit saved-character conversion planner and deterministic ID rewriter
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
	isCantrip?: boolean;
	isRitual?: boolean;
	cost: SpellCost; // numeric AP; numeric or variable MP with an optional minimum
	range: string;
	duration: string;
	sustained: boolean; // Maintain action each turn
	effects: SpellEffect[];
	cantripPassive?: string;
	enhancements: SpellEnhancement[]; // structured mixed/variable/alternative costs
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
├── generated/
│   └── v0105.generated.ts # current v0.10.5 catalog
├── spellCost.ts           # canonical cost formatting helpers
└── index.ts               # main export + utilities
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
- The current selectable catalog is generated directly from the clean v0.10.5 Markdown source.
- Generation recognizes spell boundaries through metadata-qualified headings, so nested headings and summon statblocks remain attached to their parent spell.
- Validation fails unless the source produces exactly 160 unique spells and 709 enhancements with known schools, sources, tags, and cost grammar.
- Source exceptions are explicit and reported: `Dispel Magic` uses `See Effect` for its omitted duration, and the OCR-spaced `Nature ' s Tether` heading is normalized to `Nature's Tether`.
- Enhancement costs retain mixed AP/MP costs, variable `X` costs, alternatives, repeatability, sustained state, prerequisites, and the original cost text.
- True spell renames route through `getSpellById()` via `RULES_ALIASES`; saved IDs are not rewritten during lookup.
- Changelog-confirmed new v0.10.5 spells are present in the generated source catalog.
- Removed spells and source-list moves are applied only to the current selectable catalog. Historical saved spell objects remain renderable/exportable from saved character data.
- Reworked or ambiguous spell identities are never silently remapped during normal load. The explicit character upgrade reports and maps approved reworks such as `gravity-sink-hole` to `gravity-well`; ambiguous identities such as `force-dome` and `wall-of-force` block automated conversion.
- Character completion and PDF export use alias-aware spell lookup for legacy spell IDs before falling back to saved display text.
- The upgrade rewrites spell IDs and saved display-name forms across slot selections, top-level spell arrays, and `characterState.spells`, while preserving a separate v0.10 backup.

### 3.2 Generation Workflow

```bash
# Parse and print the validation report without writing files
npm run spells:extract:0105

# Regenerate the committed catalog and migration report
npm run spells:generate:0105

# Fail when the source is invalid or committed output is stale
npm run spells:validate:0105
```

Generated output and `docs/migration/spells-v0105-report.json` are committed. The old
v0.10 school catalogs and overlay are not exported at runtime; `ALL_SPELLS` is the sole
spell dataset.

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

> Last updated: 2026-06-12
> Maintainer: @DC20Clean-Team
