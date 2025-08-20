# TODO Tracker

## 1) Normalize Class “Path” Structures (martial, spellcasting, hybrid)

- **current gap**:
  - Classes use mixed schemas for path definitions:
    - Martial-only: `martialPath` present (e.g., `rogue_features.ts`, `monk_features.ts`)
    - Hybrid: `hybridPath` with `{ martialAspect, spellcastingAspect }` (e.g., `spellblade_features.ts`)
    - Full casters: `spellcasterPath` present (e.g., `sorcerer_features.ts`, `warlock_features.ts`)
  - Some feature files include a descriptive `staminaPoints.maximumIncreasesBy` inside path blocks. These are informational only. Actual SP/MP are sourced from the class tables (`<class>_table.json`).

- **how it’s referenced**:
  - Runtime stats are calculated from the level progression tables:
    - `src/lib/services/enhancedCharacterCalculator.ts` sums per-level values:
      - `healthPoints`, `staminaPoints`, `manaPoints`
      - Example:
        - `finalSPMax += levelData.staminaPoints || 0;`
    - `src/lib/rulesdata/loaders/class.loader.ts` reads level-1 starting values from the table:
      - `startingSP: classTable.levelProgression?.[0]?.staminaPoints || 0`
  - UI reads path blocks for display/UX only:
    - `src/routes/character-creation/ClassFeatures.tsx` shows
      - `martialPath.combatTraining` (weapons/armor/shields)
      - `martialPath.staminaRegen` (description & conditions)
      - `martialPath.maneuvers.learnsAllAttack` (affects maneuver selection UI)
    - No UI/logic reads `...staminaPoints.maximumIncreasesBy` for numbers.

- **acceptance criteria**:
  - Every class has exactly one path definition consistent with its design:
    - Martial classes: `martialPath`
    - Full casters: `spellcasterPath`
    - Hybrids: `hybridPath` with `{ martialAspect, spellcastingAspect }`
  - Martial path (or `hybridPath.martialAspect`) supports:
    - `combatTraining` (weapons/armor/shields)
    - `maneuvers` (`learnsAllAttack`, `additionalKnown`)
    - `techniques` (`additionalKnown`)
    - Optional descriptive fields: `staminaPoints.maximumIncreasesBy`, `staminaRegen`
  - Spellcasting path (or `hybridPath.spellcastingAspect`) supports:
    - `spellcastingProgression` (e.g., 'full' | 'half' | 'warlock')
    - `spellcastingAttribute`
    - `spellsKnown.description` for UI text, and optional `ritualCasting`, `spellPreparation`
    - Spell list/tag restrictions may remain in feature text until schema support is added
  - Feature objects must match `ClassFeature` in `schemas/character.schema.ts` (no `id` property unless the schema is extended)
  - `npm run test:unit` passes (`rulesdata.spec.ts` validates class data)

- **references**:
  - Calculator: `src/lib/services/enhancedCharacterCalculator.ts` (SP/MP per-level aggregation)
  - Loader: `src/lib/rulesdata/loaders/class.loader.ts` (reads level-1 SP/MP)
  - UI: `src/routes/character-creation/ClassFeatures.tsx` (renders training, regen, learnsAllAttack)
  - Spellblade (hybrid example): `src/lib/rulesdata/_new_schema/spellblade_features.ts`
  - Rogue/Monk (martial examples): `src/lib/rulesdata/_new_schema/rogue_features.ts`, `src/lib/rulesdata/_new_schema/monk_features.ts`
  - Sorcerer/Warlock (spellcaster examples): `src/lib/rulesdata/_new_schema/sorcerer_features.ts`, `src/lib/rulesdata/_new_schema/warlock_features.ts`

- **tasks (class-by-class)**:
  - [ ] Barbarian: add/verify `martialPath`
  - [ ] Bard: choose `spellcasterPath` vs `hybridPath` based on design; align keys
  - [ ] Cleric: verify `spellcasterPath` structure; remove `id` in features if present
  - [ ] Commander: add/verify `martialPath`
  - [ ] Druid: add/verify `spellcasterPath`
  - [ ] Hunter: add/verify `martialPath`
  - [ ] Monk: already uses `martialPath`; keep `staminaRegen`
  - [ ] Rogue: already uses `martialPath`
  - [ ] Sorcerer: verify `spellcasterPath`
  - [ ] Warlock: verify `spellcasterPath`
  - [ ] Wizard: add/verify `spellcasterPath`
  - [ ] Champion: add/verify `martialPath`
  - [ ] Spellblade: already uses `hybridPath`
  - [ ] Psion (new): use `hybridPath` (caster-leaning); ensure no `id` fields in features

- **nice-to-have follow-ups**:
  - [ ] Schema: add `spellList` structure (tags/schools/filters) for classes like Psion
  - [ ] Schema: consider optional `id` for `ClassFeature` if stable feature keys are needed in UI
  - [ ] UI: optionally render `staminaPoints.maximumIncreasesBy` if present to clarify SP source to players

---

Owner: maintainers  
Created: 2025-08-19  
Status: open
