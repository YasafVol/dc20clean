# Calculation System v0.10.5 Review

Generated: 2026-06-24

## Scope

Review the active calculation pipeline for v0.10.5 compatibility across derived
stats, budgets, effect targets, equipment effects, character sheet display, and
PDF-facing stored values.

## Pipeline

1. `convertToEnhancedBuildData()` normalizes sheet/creation state.
2. `aggregateAttributedEffects()` collects trait, class, subclass, talent,
   feature-choice, multiclass, and equipped equipment effects.
3. `resolveEffectChoices()` resolves selected user-choice effect targets.
4. `aggregateProgressionGains()` aggregates class progression and path bonuses.
5. `calculateDerivedStats()` computes attributes, resources, defenses, saves,
   movement, Death Threshold magnitude, Attack/Spell Check, and Martial Check.
6. `generateSpellsKnownSlots()` and `calculateBudgets()` compute spell slots,
   maneuver totals, ancestry/background budgets, and level budgets.
7. `runValidation()` validates budgets, mastery caps, and spell slot legality.
8. `abilityCollection.ts` collects non-numeric sheet-facing effects.

## Calculated Fields

| Field | Primary inputs | Effect targets consumed | Sheet consumer | PDF consumer | Status |
| --- | --- | --- | --- | --- | --- |
| Attributes | creation/saved attributes | `MODIFY_ATTRIBUTE` | Attributes/Hero | stored final values | OK |
| HP Max | Might + class HP | `hpMax` | Resources/Hero | stored final value | OK |
| SP Max | class/path SP | `spMax` | Resources/Hero | stored final value | OK |
| MP Max | class/path MP | `mpMax` | Resources/Hero | stored final value | OK |
| Rest Points | HP Max | none direct | Resources/Hero | stored final value | OK |
| Grit Points | Charisma | none direct | Resources/Hero | stored final value | OK |
| PD | `8 + CM + AGI + INT` | `pd` | Defenses/Hero | stored final value | OK |
| AD | `8 + CM + MIG + CHA` | `ad` | Defenses/Hero | stored final value | OK |
| PDR/EDR/MDR | equipment/feature resistances | `GRANT_RESISTANCE` | utility chips/reduction display | stored resistance flags | OK |
| Save DC | `10 + CM + Prime` | `saveDC` | Combat/Hero | stored final value | OK after audit |
| Attack/Spell Check | `CM + Prime` | `attackSpellCheck` | Combat | stored final value | OK after audit |
| Death Threshold | `CM + Prime` magnitude | `deathThresholdModifier` | DeathExhaustion | stored final value | Fixed in audit |
| Initiative | `CM + AGI` | none direct | Combat | stored final value | OK |
| Martial Check | max(Acrobatics, Athletics) | none direct | Combat | stored final value | OK |
| Move Speed | base 5 | `moveSpeed` | Movement/Hero | stored final value + movement flags | OK |
| Jump Distance | AGI or max(MIG, AGI) | `jumpDistance`, `SET_VALUE:jumpCalculationAttribute` | Movement/Hero | stored final value | OK |
| Skill budget | `5 + INT + progression` | `skillPoints` | Background/creation | stored selections | OK |
| Trade budget | `3 + progression` | `tradePoints` | Background/creation | stored selections | OK |
| Language budget | base 2 | `languagePoints` | Background/creation | stored selections | OK |
| Ancestry points | base 5 | `ancestryPoints` | Ancestry/creation | n/a | OK |
| Attribute points | base 12 + progression | `attributePoints` | Attributes/creation | n/a | OK |
| Spells known | progression/path/talents/grants | `spellsKnown`, `GRANT_SPELL`, `GRANT_CANTRIP` | Spells step/sheet | stored spell rows | OK |
| Maneuvers known | progression/path/talents/grants | `maneuversKnown`, `GRANT_MANEUVERS` | Maneuvers step/sheet | stored maneuver rows | OK |
| Mastery caps | level caps + elevations | mastery cap effects | Background/creation | stored selections | OK |

## Fixes Made

1. `deathThresholdModifier` now applies to `stats.finalDeathThreshold`.
2. `breakdowns.death_threshold` now exposes the threshold magnitude breakdown.
3. `stats.finalAttackSpellCheck` now uses `breakdowns.attack_spell_check.total`,
   so future `attackSpellCheck` modifiers affect both tooltip and stored value.
4. `stats.finalSaveDC` now uses `breakdowns.save_dc.total`, so future `saveDC`
   modifiers affect both tooltip and stored value.
5. `DeathExhaustion` now consumes `finalDeathThreshold` magnitude instead of
   recomputing from Prime + Combat Mastery.

## Non-Blockers / TODOs

1. Spell focus presentation remains a sheet concern. Equipped focus effects are
   collected, but spell rows still need a helper to display range, damage, and
   check/to-hit adjustments.
2. Rage melee/unarmed damage remains an attack-row presentation TODO because
   persisted attack rows do not encode enough weapon category data safely.
3. Condition mechanics are partly active-state driven and partly collected notes;
   full in-play automation remains under the Conditions/Sheet systems.
4. PDR/EDR/MDR are modeled as binary reductions from resistance entries, not as
   additive numeric PDR. This matches the current sheet/PDF contract.
5. Debug `console.log`/`console.debug` noise in calculator modules makes focused
   test output hard to read. This is testing ergonomics, not a calculation bug.

## Validation

Focused command:

```bash
npm run test:unit -- --project server --run src/lib/services/enhancedCharacterCalculator.aggregation.test.ts src/lib/services/equipmentEffects.calculator.test.ts src/lib/services/dc20v0105ProgressionResources.test.ts src/lib/services/spellSystem.spec.ts
```

Result: 4 files passed, 58 tests passed.
