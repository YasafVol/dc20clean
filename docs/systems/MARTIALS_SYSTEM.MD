# DC20Clean - Martials System (Maneuvers)

> Purpose: Canonical reference for maneuver data, budget calculation, and creation/sheet integration.
> Status: Active
> Last Updated: 2026-06-01

---

## 1) Key Files

| File                                                  | Role                                                                                                                      |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/rulesdata/martials/maneuvers.ts`             | Maneuver catalog (29 maneuvers), exports `allManeuvers`, alias/name-aware `getManeuverById()`, and `getManeuversByType()` |
| `src/lib/rulesdata/schemas/maneuver.schema.ts`        | TypeScript interfaces: `Maneuver`, `ManeuverCost`, `ManeuverEnhancement`, `ManeuverType` enum                             |
| `src/lib/rulesdata/martials/monk-stances.ts`          | Monk-specific stances (currently empty placeholder)                                                                       |
| `src/lib/services/enhancedCharacterCalculator.ts`     | Budget calculation and `GRANT_MANEUVERS` processing                                                                       |
| `src/routes/character-creation/Maneuvers.tsx`         | Creation UI: filter by type, select up to budget                                                                          |
| `src/routes/character-sheet/components/Maneuvers.tsx` | Sheet display with type filtering                                                                                         |

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

### Maneuver Counts (29 total)

| Type    | Count | Examples                                  |
| ------- | ----- | ----------------------------------------- |
| Attack  | 11    | Disarm, Power Strike, Cleave, Scattershot |
| Defense | 7     | Parry, Dodge, Shield Block                |
| Grapple | 4     | Grab, Pin, Throw                          |
| Utility | 7     | Dash, Hide, Disengage                     |

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
- v0.10.5 removes the base SP cost from `Whirlwind` and `Pathcarver`.
- v0.10.5 adds `Scattershot` as an Attack maneuver.
- v0.10.5 rewrites `Reposition` as a reaction triggered when a creature ends its turn, with `Agile`, `Disengage`, and `Coordinated Movement` enhancements.
- The `Brace` maneuver remains a current Defense maneuver in v0.10.5. `Fortify` is the renamed Champion Fighting Spirit option, not a maneuver catalog rename.
- `getManeuverById()` resolves both IDs and display names so saved name-based maneuver selections such as `Brace` remain renderable.

---

## 6) Related Docs

- `docs/systems/LEVELING_SYSTEM.MD` — path bonuses, budget aggregation
- `docs/systems/CLASS_SYSTEM.MD` — class progression tables
- `docs/systems/EFFECT_SYSTEM.MD` — `GRANT_MANEUVERS` effect type
