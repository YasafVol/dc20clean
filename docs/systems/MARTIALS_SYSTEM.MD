# DC20Clean - Martials System (Maneuvers)

> Purpose
> Canonical reference for maneuver data, maneuver budget calculation, and creation/sheet integration.

> Last Updated: 2026-02-04

---

## 1) Key Files

- Maneuver catalog: `src/lib/rulesdata/martials/maneuvers.ts`
- Maneuver schema: `src/lib/rulesdata/schemas/maneuver.schema.ts`
- Progression + budgets: `src/lib/services/enhancedCharacterCalculator.ts`
- Creation UI: `src/routes/character-creation/Maneuvers.tsx`

---

## 2) Data Model

- Maneuvers are typed as `Attack | Defense | Grapple | Utility`.
- Maneuvers use AP/SP cost model and optional enhancements.
- Techniques are removed in v0.10.

---

## 3) Maneuvers Known Budget

`levelBudgets.totalManeuversKnown` is derived from:

1. Class progression maneuver gains (`gainedManeuversKnown`)
2. Martial path maneuver bonuses (`paths.data.ts`)
3. Talent effects (`MODIFY_STAT target: maneuversKnown`)
4. Explicit granted known maneuvers (`GRANT_MANEUVERS`, excluding access-only grants)

### Access grants vs count grants

- `GRANT_MANEUVERS target: "all_attack"` is treated as an access grant and is **not** added to numeric known-count budgets.
- Specific grants (for example, granting a named maneuver choice) are counted when resolved.

---

## 4) Validation/UX Behavior

- Creation stage enforces exact selected count = `totalManeuversKnown`.
- Remaining count and filter UI are displayed in `Maneuvers.tsx`.
- If no maneuver budget exists, maneuvers stage is hidden by step gating.

---

## 5) Rule Alignment Notes (v0.10)

- Class-table maneuver gains remain level-driven in progression files.
- Path points increase maneuver budgets through path progression tiers.
- No maneuver budget should be inflated by duplicating equivalent grants in both a parent feature and its nested benefit entries.

---

## 6) Related Specs

- `docs/systems/LEVELING_SYSTEM.MD`
- `docs/systems/CLASS_SYSTEM.MD`
