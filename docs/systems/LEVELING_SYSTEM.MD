# DC20Clean - Leveling System

> Purpose
> Canonical reference for level-based budgets and progression aggregation in character creation (DC20 v0.10, levels 1-10).

> Status: Active
> Last Updated: 2026-02-04

---

## 1) Source of Truth

- Class progression tables: `src/lib/rulesdata/classes-data/progressions/*.progression.ts`
- Class progression resolver (UI budgeting): `src/lib/rulesdata/classes-data/classProgressionResolver.ts`
- Runtime aggregation for final budgets/stats: `src/lib/services/enhancedCharacterCalculator.ts`
- Path progression data: `src/lib/rulesdata/progression/paths/paths.data.ts`

---

## 2) Runtime Pipeline

1. User selects class + target level.
2. Calculator aggregates class progression from level 1..target.
3. Calculator adds path-point-derived bonuses from `pathPointAllocations`.
4. Calculator applies selected talent effects and selected feature-choice effects.
5. UI reads `levelBudgets` for stage gating (Talents, Path Points, Maneuvers, Spells, etc.).

---

## 3) Progression Aggregation Rules

### 3.1 Numeric progression gains

- Aggregates `gained...` fields (HP/SP/MP/skills/trades/attributes/spells/maneuvers).
- Supports legacy fallback fields where present.

### 3.2 Path points in class progression

- `totalPathPoints` must support both:
  - `gains.pathPoints` (numeric)
  - `gains.pathProgression` (boolean flag meaning +1 point)
- This keeps old/new progression table formats compatible.

### 3.3 Path allocation bonuses

Martial path (`paths.data.ts`):

- Path 1: +1 SP, +1 maneuver
- Path 2: +1 maneuver
- Path 3: +1 SP, +1 maneuver
- Path 4: +1 maneuver

Spellcaster path (`paths.data.ts`):

- Path 1: +3 MP, +1 cantrip, +1 spell
- Path 2: +2 MP, +1 cantrip
- Path 3: +2 MP, +1 cantrip, +1 spell
- Path 4: +2 MP, +1 spell

---

## 4) Maneuver Budget Rules (Current Implementation)

- `levelBudgets.totalManeuversKnown` is composed from:
  - class progression maneuvers
  - martial path maneuver bonuses
  - `MODIFY_STAT(target: maneuversKnown)` effects
  - `GRANT_MANEUVERS` effects that represent explicit extra known maneuvers
- `GRANT_MANEUVERS(target: "all_attack")` is treated as an access grant, not a numeric known-count budget increment.

### Barbarian sanity reference

- Per class table/progression: L1..L10 maneuver gains are:
  `+2, +0, +1, +0, +1, +0, +1, +0, +1, +1`
- So Barbarian level 1 with no path/talent/choice bonuses has `totalManeuversKnown = 2`.

---

## 5) Level-Gating Requirements

- Class feature effects are applied only when `feature.levelGained <= current level`.
- Subclass feature effects are resolved only up to current level and selected subclass.
- Feature-choice effects apply only when user actually selected the option.

---

## 6) UI Contract

- `LevelingChoices.tsx` uses resolver budgets (`totalTalents`, `totalPathPoints`) for spend validation.
- `CharacterCreation.tsx` blocks progression until required leveling budgets are spent.
- `Maneuvers.tsx` uses `levelBudgets.totalManeuversKnown` for selection count.

---

## 7) Known Non-Goals in This System Doc

- Does not define full combat execution rules for maneuvers.
- Does not define spell list filtering logic (see spell system docs).

---

## 8) Multiclass

Multiclass details are part of the leveling flow. Quick pointers:

- **Data/logic:** `src/lib/rulesdata/progression/multiclass.ts`
- **UI:** `src/routes/character-creation/LevelingChoices.tsx`
- **Persistence fields:** `selectedMulticlassOption`, `selectedMulticlassClass`, `selectedMulticlassFeature`
- **Epic reference:** `docs/archive/LEVELING_EPIC.md` section 5.18

---

## 9) Related Specs

- `docs/systems/CLASS_SYSTEM.MD`
- `docs/systems/MARTIALS_SYSTEM.MD`
- `docs/systems/CHARACTER_CREATION_FLOW.MD`
