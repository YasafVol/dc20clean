# DC20Clean - Martials System (Maneuvers)

> Purpose: Canonical reference for maneuver data, budget calculation, and creation/sheet integration.
> Status: Active
> Last Updated: 2026-06-19

---

## 1) Key Files

| File                                                  | Role                                                                                                                                               |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/rulesdata/martials/maneuvers.ts`             | Maneuver catalog (30 maneuvers), `MANEUVER_RULES_SOURCE`, exports `allManeuvers`, alias/name-aware `getManeuverById()`, and `getManeuversByType()` |
| `src/lib/rulesdata/martials/maneuverFormatting.ts`    | Shared AP/SP and enhancement-cost display helpers                                                                                                  |
| `scripts/martials/dc20-0105-maneuvers.mjs`            | Source parser/audit generator for the v0.10.5 clean Markdown maneuver chapter                                                                      |
| `docs/migration/maneuvers-v0105-report.json`          | Generated source audit report used by tests to detect runtime catalog drift                                                                        |
| `src/lib/rulesdata/schemas/maneuver.schema.ts`        | TypeScript interfaces: `Maneuver`, `ManeuverCost`, `ManeuverEnhancement`, `ManeuverType` enum                                                      |
| `src/lib/rulesdata/martials/monk-stances.ts`          | Monk-specific stances (currently empty placeholder)                                                                                                |
| `src/lib/services/enhancedCharacterCalculator.ts`     | Budget calculation and `GRANT_MANEUVERS` processing                                                                                                |
| `src/routes/character-creation/Maneuvers.tsx`         | Creation UI: filter by type, select up to budget                                                                                                   |
| `src/routes/character-sheet/components/Maneuvers.tsx` | Sheet display with type filtering                                                                                                                  |
| `src/routes/martial-manual/MartialManual.tsx`         | Standalone maneuver reference, parallel to Spellbook                                                                                               |

---

## 2) Data Model

### Maneuver Schema (`maneuver.schema.ts`)

```typescript
enum ManeuverType {
	Attack,
	Defense,
	Grapple,
	Utility
}

interface ManeuverCost {
	ap: number;
	sp?: number;
}

interface ManeuverEnhancement {
	name: string;
	costString: string;
	sp?: number;
	ap?: number;
	repeatable?: boolean;
	description: string;
}

interface Maneuver {
	id: string;
	name: string;
	type: ManeuverType;
	cost: ManeuverCost;
	range: string;
	description: string;
	isReaction: boolean;
	enhancements: ManeuverEnhancement[];
}
```

### Maneuver Counts (30 total)

| Type    | Count | Examples                                 |
| ------- | ----- | ---------------------------------------- |
| Attack  | 11    | Heroic Bash, Whirlwind, Scattershot      |
| Defense | 7     | Parry, Brace, Protect                    |
| Grapple | 4     | Slam, Restrain, Throw Creature           |
| Utility | 8     | Recover, Heroic Pass Through, Reposition |

### Utility Functions

```typescript
import { allManeuvers, getManeuverById, getManeuversByType } from './martials/maneuvers';
```

---

## 3) Maneuvers Known Budget

`levelBudgets.totalManeuversKnown` is derived from:

1. Class progression maneuver gains (`gainedManeuversKnown` with fallback to `maneuversKnown`)
2. Martial path maneuver bonuses (from `paths.data.ts`, field `maneuversLearned`)
3. Talent effects (`MODIFY_STAT target: maneuversKnown`)
4. Explicit granted known maneuvers (`GRANT_MANEUVERS`, excluding access-only grants)

### Access grants vs count grants

- `GRANT_MANEUVERS target: "all_attack"` is treated as an access grant and is **not** added to numeric known-count budgets.
- Specific grants (for example, granting a named maneuver choice) are counted when resolved.

---

## 4) Validation/UX Behavior

- Creation stage enforces exact selected count = `totalManeuversKnown`.
- Remaining count and filter by `ManeuverType` are displayed in `Maneuvers.tsx`.
- If no maneuver budget exists, the Maneuvers stage is hidden by step gating in `CharacterCreation.tsx`.

---

## 5) Rule Alignment Notes (v0.10.5)

- Techniques have been removed entirely in DC20 v0.10.
- Class-table maneuver gains remain level-driven in progression files.
- Path points increase maneuver budgets through path progression tiers.
- No maneuver budget should be inflated by duplicating equivalent grants in both a parent feature and its nested benefit entries.
- Each v0.10.5 maneuver has maneuver-specific enhancements. This follows the same reference pattern as spell enhancements: the catalog must carry them, character creation must expose them for review, persisted maneuver rows must not discard them, and the character sheet/reference UI must display them.
- v0.10.5 removes the base SP cost from `Whirlwind` and `Pathcarver`.
- v0.10.5 adds `Scattershot` as an Attack maneuver.
- v0.10.5 includes `Heroic Pass Through` as a Utility maneuver. Its source entry is action-style and omits explicit `Cost:`/`Range:` lines, so the parser records it as `Pass Through Action (1 AP)` with range `Pass Through Action`.
- v0.10.5 rewrites `Reposition` as a reaction triggered when a creature ends its turn, with `Agile`, `Disengage`, and `Coordinated Movement` enhancements.
- The `Brace` maneuver remains a current Defense maneuver in v0.10.5. `Fortify` is the renamed Champion Fighting Spirit option, not a maneuver catalog rename.
- `getManeuverById()` resolves both IDs and display names so saved name-based maneuver selections such as `Brace` remain renderable.

---

## 6) Rules Source & Version

`MANEUVER_RULES_SOURCE` records the current maneuver source metadata:

- Rules version: `dc20-0.10.5`
- Baseline artifact: `docs/assets/DC20 0.10 full.md`
- Current rules artifact: `docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md`
- Changelog artifact/section: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, section `Maneuvers`
- Catalog status: source-audited v0.10.5

`npm run martials:generate:0105` parses the clean v0.10.5 Markdown and writes `docs/migration/maneuvers-v0105-report.json`.

`npm run martials:validate:0105` re-parses the source and fails if the report is stale.

The runtime catalog is still hand-authored TypeScript, but `maneuvers.test.ts` compares every runtime maneuver's id, name, type, base cost, range, reaction state, trigger, enhancement count, enhancement names, and enhancement cost strings against the generated source report.

---

## 7) 0.10.5 Audit Path

Run the martials audit from most deterministic to most UI-dependent:

1. Catalog shape
   - Run `npm run martials:validate:0105`.
   - Confirm exactly 30 maneuvers: 11 Attack, 7 Defense, 4 Grapple, 8 Utility.
   - Confirm every maneuver has stable `id`, `name`, `type`, `cost`, `range`, `description`, `isReaction`, and an `enhancements` array.
   - Confirm enhancement entries have `name`, `costString`, parsed AP/SP fields when applicable, repeatability when applicable, and description text.
2. 0.10.5 deltas
   - Confirm removed Techniques stay absent.
   - Confirm `Scattershot` exists.
   - Confirm `Heroic Pass Through` exists.
   - Confirm `Whirlwind` and `Pathcarver` have no base SP cost.
   - Confirm `Reposition` is the current reaction version and includes `Agile`, `Disengage`, and `Coordinated Movement`.
   - Confirm `Brace` remains a maneuver and `Fortify` is not added as a maneuver alias.
3. Persistence and schema
   - Confirm `ManeuverData` can persist base cost, range, trigger, reaction state, and enhancements without losing SP data.
   - Confirm creation completion and sheet add/replace paths copy the full maneuver payload needed for display.
4. UI/reference surface
   - Creation maneuver cards must expose enhancements for review before selection.
   - Character sheet maneuver rows/details must show full AP/SP cost, reaction trigger, range, and enhancements.
   - A `Martial Manual` route/view is needed, parallel to `Spellbook`, for browsing all maneuvers and enhancements outside character creation.
5. Source/version tracking
   - Record the exact rules source artifact and rules version used for the maneuver catalog, matching the internal versioning policy.

Current audit gaps:

- Runtime descriptions are still human-reviewed against the source text to avoid storing full source prose in the generated audit report.
- Sheet does not yet validate in-play enhancement spend against Stamina Spend Limit.

---

## 8) Related Docs

- `docs/systems/LEVELING_SYSTEM.MD` — path bonuses, budget aggregation
- `docs/systems/CLASS_SYSTEM.MD` — class progression tables
- `docs/systems/EFFECT_SYSTEM.MD` — `GRANT_MANEUVERS` effect type
