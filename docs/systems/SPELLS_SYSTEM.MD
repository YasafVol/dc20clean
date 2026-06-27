# DC20Clean – Spells System (v0.10.5)

> Purpose: Single reference for spell data model, assignment rules, UI flows, and validation.
> Status: Active
> Last Updated: 2026-06-27

---

## 1. Key Files & Roles

- `docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md`: authoritative v0.10.5 spell source
- `scripts/spells/dc20-0105-spells.mjs`: deterministic parser, validator, report writer, and TypeScript generator
- `src/lib/rulesdata/spells-data/generated/v0105.generated.ts`: generated 160-spell selectable catalog; never edit manually
- `src/lib/rulesdata/spells-data/index.ts`: main export with generated current catalog and alias-aware lookup utilities
- `src/lib/rulesdata/versioning/aliases.ts`: stable ID routing policy for old saved spell IDs and display names
- `src/lib/rulesdata/versioning/characterUpgrade.ts`: explicit saved-character conversion planner and deterministic ID rewriter
- `src/lib/rulesdata/schemas/spell.schema.ts`: Spell TypeScript types and enums
- `src/lib/services/spellAssignment.ts`: Legacy fallback auto-assignment helper; not canonical for real player choices
- `src/lib/services/enhancedCharacterCalculator.ts`: Aggregates class/trait effects that alter MP
- UI selection and display:
  - `src/routes/character-creation/*` (spell pickers where applicable)
  - `src/routes/character-sheet/*` (spell list, filters, actions)

### Equipage Integration TODO

Equipped Spell Focus properties should be reflected in spell viewing wherever possible:

- `Powerful`: show Spell Attack damage as increased by `+1`.
- `Reach`: flag or adjust spells with Range `1` to show `+1 Space`.
- `Long-Ranged`: flag or adjust spells with Range greater than `1` to show `+5 Spaces`.
- `Vicious`: include the equipped focus bonus in spell attack/to-hit display once the
  sheet exposes a distinct spell attack bonus.
- `Channeling`: include the equipped focus bonus in spell check display once spell
  checks are modeled separately from the generic attack/spell check.

This belongs with the Equipage effect pipeline: the focus effects should come from
equipped inventory rows, not from every saved focus in Equipage storage.

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
	isCantrip?: boolean; // legacy/source metadata only; not a separate learnable entity
	isRitual?: boolean;
	cost: SpellCost; // numeric AP; numeric or variable MP with an optional minimum
	range: string;
	duration: string;
	sustained: boolean; // Maintain action each turn
	effects: SpellEffect[];
	cantripPassive?: string; // legacy/source text field
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
// Get all spells. The selectable model is a flat spell list; legacy cantrip helpers
// are source-taxonomy helpers, not separate learnable-entity APIs.
import { ALL_SPELLS } from './spells-data';

// Lookup functions
getSpellById(id: string): Spell | undefined
getSpellsBySchool(school: SpellSchool): Spell[]
getSpellsBySource(source: SpellSource): Spell[]
getCantrips(): Spell[] // legacy/source taxonomy helper
getNonCantrips(): Spell[] // legacy/source taxonomy helper
```

---

## 3. v0.10 Changes from v0.9.5

**Major Changes:**

- **Spell Lists Removed**: No more predefined lists (Fire & Flames, Holy, etc.)
- **Schools Reorganized**: 8 new schools replace previous categorization
- **Sources Added**: Arcane/Divine/Primal determine class access
- **Tags System**: Flexible tagging for filtering and class access
- **Enhancement System**: Spells have enhancement options with AP/MP costs
- **160 Spells / 709 Enhancements**: Deterministically generated from the v0.10.5 source

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
- Verified pure spell renames route through `getSpellById()` via `RULES_ALIASES`; saved IDs are not rewritten during lookup.
- Spell changes that may alter function, cost, range, tags, or rules meaning must be classified as `reworked`, not `alias`. Reworked spells render from stored legacy data until the explicit character migration flow creates a current-rules copy.
- Changelog-confirmed new v0.10.5 spells are present in the generated source catalog.
- Removed spells and source-list moves are applied only to the current selectable catalog. Historical saved spell objects remain renderable/exportable from saved character data.
- Reworked spell identities are never silently remapped during normal load. The explicit character upgrade reports and maps approved reworks such as `gravity-sink-hole` to `gravity-well`, and both `force-dome` and `wall-of-force` to `forcefield`.
- Character completion and PDF export use alias-aware spell lookup for legacy spell IDs before falling back to saved display text.
- The upgrade creates a current-rules copy and rewrites approved spell IDs/display-name forms across slot selections, top-level spell arrays, and `characterState.spells`; the legacy source character remains locked and unchanged.

### 3.2 Generation Workflow

```bash
# Parse and print the validation report without writing files
npm run spells:extract:0105

# Regenerate the committed catalog and migration report
npm run spells:generate:0105

# Fail when the source is invalid or committed output is stale
npm run spells:validate:0105
```

Generated output and `docs/migration/spells-v0105-report.json` are committed. The report is
the deterministic audit artifact: it includes counts, school totals, parser exceptions, and
one entry per spell with ID, source, school, tags, cost, range, duration, sustained/legacy cantrip
flags, enhancement count, and source line provenance. The old v0.10 school catalogs and
overlay are not exported at runtime; `ALL_SPELLS` is the sole spell dataset.

### 3.3 Deterministic Audit Boundary

Code can deterministically verify:

- Generated output is current with the checked-in v0.10.5 Markdown source.
- Spell and enhancement counts match the expected source inventory.
- IDs are unique.
- Sources, schools, tags, costs, duration presence, and enhancement grammar are valid.
- Alias and rework targets point to current spell IDs or names.
- `alias` entries are limited to verified pure identity renames.

Human review is still required for semantic equivalence: if function, cost, range, tags,
or rules meaning may have changed, the mapping belongs in `reworked` and must go through
explicit character migration.

---

### 4.1 Global Magic Profile

- Defines the character's general spellcasting thematic bounds.
- Aggregates "Global Expansion" effects (e.g., a Feature that adds "Arcane" to all your spellcasting).
- Used as a fallback for all spell selection.

### 4.2 Spells Known Slots (Pockets)

- Individual "pockets" that grant a single spell from the flat spell list.
- Can have **Specific Restrictions** (e.g., "Must be from the Elemental school").
- Sources: Class Progression, Subclass Features, Talents (Grant Spell effect).
- Selection is tracked per-slot: `Record<SlotID, SpellID>`.
- Exact class grants such as `Charm` and `Call Familiar` resolve to canonical generated spell IDs instead of broad unrestricted slots.
- `GRANT_SPELL` / legacy `GRANT_CANTRIP` effects with unresolved `userChoice` metadata are skipped until the choice is present; resolved nested choices can narrow a slot by selected tag or school. `GRANT_CANTRIP` is normalized into an ordinary spell slot.
- Tag-targeted grants such as Warlock Eldritch `any_psychic_tag` create tag-restricted slots rather than falling back to the global profile.

### 4.3 Validation Rules

- **Restriction Mismatch**: Selected spells must match the effective target of the slot they fill. Global class-progression slots use the Global Magic Profile. Feature/talent slots use their own slot restrictions; unrestricted feature slots such as Bard Magical Secrets do not inherit the class global profile. Source restrictions narrow only when present; school and tag restrictions are OR-based, so a spell can qualify by matching an allowed school or an allowed tag. Exact spell restrictions remain exact-only.
- **Exhaustion**: All available slots must be validly filled.

---

## 5. UI Flows

### Creation (`Spells.tsx`)

- The Spells stage appears conditionally only when the calculator reports `spellsKnownSlots.length > 0`.
- Each slot is an individual spell picker that respects:
  - Slot-level restrictions (specific school/source/tag requirements, with school/tag as OR)
  - Global Magic Profile only for global class-progression slots
- The UI maintains an automatic active-slot cursor. On entry, the first empty slot is targeted. After a spell is learned, the cursor advances to the next empty slot. Clicking any slot overrides the cursor for replacement or targeted filling.
- The catalog is filtered against the active slot's effective target. If every slot is full and no override is active, the catalog can fall back to the union of spells that fit at least one current slot for review.
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
- `e2e/13-character-upgrade.e2e.spec.ts` — Exercises the explicit v0.10 to v0.10.5 upgrade, approved spell rewrites, deprecated-selection review, current-rules copy creation, reload persistence, and unsupported-version blockers.

---

## 7. Troubleshooting

- Spell not visible: run `npm run spells:validate:0105`, then confirm the source entry is
  present in `generated/v0105.generated.ts` and exported through the main `index.ts`.
- MP not matching: ensure effects target `mpMax`; calculator aggregates into `finalMpMax`.
- Class access issues: verify class spell access rules match source/school/tag combinations.

---

> Last updated: 2026-06-27
> Maintainer: @DC20Clean-Team
