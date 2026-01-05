# DC20Clean – Martials System (Maneuvers)

> Purpose
> Central reference for martial abilities data, selection limits, prerequisites, and UI wiring.

---

## 1. Key Files & Roles

- `src/lib/rulesdata/martials/maneuvers.ts` — 28 maneuvers from DC20 v0.10
- `src/lib/rulesdata/schemas/maneuver.schema.ts` — Maneuver type definitions
- `src/lib/rulesdata/martials/monk-stances.ts` — Monk-specific stances (placeholder)
- `src/lib/services/enhancedCharacterCalculator.ts` — aggregates grants/limits from classes/traits
- UI: `src/routes/character-creation/*`, `src/routes/character-sheet/*`

**Note**: Techniques have been entirely removed in DC20 v0.10.

---

## 2. Data Shapes (v0.10)

### Maneuver Schema

```typescript
interface Maneuver {
  id: string;
  name: string;
  type: ManeuverType; // 'Attack' | 'Defense' | 'Grapple' | 'Utility'
  cost: ManeuverCost; // { ap?: number; sp?: number }
  range: string;
  description: string;
  isReaction: boolean;
  trigger?: string; // For reactions
  requirement?: string;
  enhancements: ManeuverEnhancement[];
}

interface ManeuverEnhancement {
  name: string;
  costString: string; // e.g., "1 SP, Repeatable"
  ap?: number;
  sp?: number;
  repeatable?: boolean;
  variable?: boolean;
  description: string;
}

enum ManeuverType {
  Attack = 'Attack',
  Defense = 'Defense',
  Grapple = 'Grapple',
  Utility = 'Utility'
}
```

### Maneuvers by Type (28 total)

| Type    | Count | Examples                                    |
|---------|-------|---------------------------------------------|
| Attack  | 8     | Heroic Bash, Sweeping Strike, Targeted Blow |
| Defense | 8     | Deflect, Dodge, Parry, Shield Block         |
| Grapple | 6     | Break Grapple, Grab, Throw, Pin             |
| Utility | 6     | Disarm, Distraction, Feint, Push the Limits |

---

## 3. Selection & Validation

- Eligibility: class level and feature grants determine what is selectable.
- Limits: number known per level or feature; enforced in provider/calculator-backed state.
- **Maneuvers Known** is tracked via class progression and path point allocation.

Acceptance examples:

- If the current class lacks martial access, the section is hidden or marked N/A.
- Deleting a maneuver reduces the known count and re-enables selection elsewhere.

---

## 4. UI Flows

- Creation: render lists and selection controls gated by eligibility; show counts remaining.
- Sheet: display known maneuvers with their costs, ranges, and enhancements.

---

## 5. E2E Links

- `e2e/10-maneuvers.e2e.spec.ts` — Adds and deletes maneuvers; conditionally skips when not applicable.
- `e2e/12-exhaustion-info.e2e.spec.ts` — Info buttons validate cross-references with feature details.

---

## 6. v0.10 Changes from v0.9.5

- **Techniques Removed**: The entire technique system has been removed from DC20 v0.10.
- **Maneuver Categories**: Now 4 types (Attack, Defense, Grapple, Utility) instead of previous categorization.
- **Cost Structure**: Costs now use AP (Action Points) and SP (Stamina Points).
- **Enhancements**: Maneuvers have enhancement options with additional costs.
- **28 Maneuvers**: Complete set from v0.10 rules.

---

## 7. Troubleshooting

- Items not showing: ensure exported lists are imported by the UI/provider and that class grants are aggregated.
- Cost display issues: verify `costString` and parsed `ap`/`sp` values match.

---

> Last updated: 2026-01-05
> Maintainer: @DC20Clean-Team
