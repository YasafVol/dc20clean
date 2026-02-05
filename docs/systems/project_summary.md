# DC20 Systems Summary

> Last updated: 2026-02-04
> Purpose: single-page map of all system docs and current implementation representation.

## Representation Matrix

| System | Primary Doc | Implementation Status | Primary Code Areas |
| --- | --- | --- | --- |
| Ancestry | `ANCESTRY_SYSTEM.MD` | Active | `src/lib/rulesdata/ancestries/*`, `src/routes/character-creation/AncestrySelector.tsx` |
| Background | `BACKGROUND_SYSTEM.MD` | Active | `src/routes/character-creation/Background.tsx`, `src/lib/services/enhancedCharacterCalculator.ts` |
| Calculation | `CALCULATION_SYSTEM.MD` | Active | `src/lib/services/enhancedCharacterCalculator.ts`, `src/lib/utils/characterState.ts` |
| Character Creation Flow | `CHARACTER_CREATION_FLOW.MD` | Active | `src/routes/character-creation/*`, `src/lib/stores/characterContext.tsx` |
| Character Sheet | `CHARACTER_SHEET.MD` | Active | `src/routes/character-sheet/*` |
| Character Sheet Sync | `CHARACTER_SHEET_SYNC_SPEC.md` | Active | `src/routes/character-sheet/hooks/*`, sheet spell/maneuver components |
| Class | `CLASS_SYSTEM.MD` | Active | `src/lib/rulesdata/classes-data/*`, class feature route components |
| Database / Storage | `DATABASE_SYSTEM.MD` | Active (hybrid local + Convex) | `src/lib/storage/*`, `src/lib/utils/storageUtils.ts`, `convex/*` |
| Effects | `EFFECT_SYSTEM.MD` | Active | `src/lib/types/effectSystem.ts`, calculator/effect analyzers |
| Encounter (DM) | `ENCOUNTER_SYSTEM_SPEC.MD` | Active | `src/routes/dm/encounters/*`, `src/lib/hooks/useEncounters.ts`, `convex/encounters.ts` |
| Equipment | `EQUIPMENT_SYSTEM.MD` | Active | `src/lib/rulesdata/equipment/*`, `src/routes/custom-equipment/*` |
| Leveling | `LEVELING_SYSTEM.MD` | Active | `src/routes/character-creation/LevelingChoices.tsx`, leveling services/tests |
| Logging | `LOGGING_SYSTEM.MD` | WIP | `src/lib/utils/logger.ts`, debug/error logging touchpoints |
| Martials | `MARTIALS_SYSTEM.MD` | Active | `src/lib/rulesdata/maneuvers-data/*`, `src/routes/character-creation/Maneuvers.tsx` |
| Monster (DM) | `MONSTER_SYSTEM_SPEC.MD` | Active | `src/routes/dm/monsters/*`, `src/lib/hooks/useMonsters.ts`, `convex/monsters.ts` |
| Multiclass | `MULTICLASS_SYSTEM.MD` + `LEVELING_SYSTEM.MD` | Active (consolidated) | leveling routes/services and class data |
| Ontology | `ONTOLOGY.md` | Active reference | cross-cutting conceptual model |
| PDF Export | `PDF_EXPORT_SYSTEM.MD` | Active | `src/lib/pdf/*` |
| Technical Overview | `PROJECT_TECHNICAL_OVERVIEW.MD` | Active | repo-wide |
| Spells | `SPELLS_SYSTEM.MD` | Active | `src/lib/rulesdata/spells-data/*`, `src/routes/character-creation/Spells.tsx`, `src/routes/spellbook/Spellbook.tsx` |
| Traits | `TRAITS_SYSTEM.MD` | Active | `src/lib/rulesdata/traits-data/*`, trait selection components |

## Additional / Historical Specs

- `SPELLS_MANEUVERS_SPLIT_SPEC.md` - completed migration record.
- `LEVELING_GAPS_SPEC.md` - archived completion checklist.
- `FEATURE_ID_NAMING_CONVENTION.md` - active ID stability rules.
- `HUMAN_CLERIC_E2E_SPEC.md` - test scenario specification.

## Notes

- Convex schema changes require running `npx convex dev --once` to update generated API/types.
- Per-machine environment files are expected (`.env.local` is not tracked in git).
