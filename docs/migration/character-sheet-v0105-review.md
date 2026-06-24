# Character Sheet v0.10.5 Review

> Last Updated: 2026-06-24

## Scope

Audit the active character sheet path for v0.10.5 compatibility, especially calculator/effect usage, equipment-driven effects, spells, maneuvers, conditions, PDF-facing saved values, and previously noted sheet TODOs.

## Active Path

1. `CharacterSheetRouter`
2. `CharacterSheetProvider`
3. `CharacterSheetRedesign`

`CharacterSheetClean`, `CharacterSheetDesktop`, and `CharacterSheetMobile` still exist, but are not the primary route.

## Findings

1. **Effects / Rules Notes surface missing from active sheet**
   1. `Conditions`, `ConditionsReference`, and `EnhancedFeatures` exist.
   2. `CharacterSheetRedesign` renders only `ActiveConditionsTracker` in the Conditions tab.
   3. Collected in-game/non-sheet-math effects currently lack a central visible home on the active sheet.
   4. Impact: ancestry traits, class features, talents, equipment, spell focus properties, and condition interactions that are intentionally collected instead of numerically applied can be invisible during play.

2. **Hero combat stats partially bypass calculator output**
   1. HP/MP/SP/Rest/Grit display uses `calculatedData` fallbacks.
   2. PD/AD/PDR use saved character fields plus manual overrides.
   3. Attack bonus and Save DC use local formulas.
   4. Initiative is simplified to Agility only.
   5. Impact: calculator-correct values may not display in the hero section.

3. **Weapon attack row calculation likely uses the wrong attribute model**
   1. `Attacks.tsx` computes `Math.floor((finalMight - 10) / 2)` and same for Agility.
   2. DC20 stored final attributes are already modifiers.
   3. Impact: weapon attack values can be wrong, especially for equipped weapons selected from the sheet.

4. **Attack effects are not fully sheet-presented**
   1. Rage is calculator-visible through `while_raging`.
   2. The attack section does not yet apply/surface scoped effects such as Barbarian Rage melee/unarmed damage.
   3. Impact: in-combat toggles can affect calculator output without a clear attack-row presentation.

5. **Spell rows are static catalog copies**
   1. Selecting a spell copies name, school, cost, range, duration, effects, and enhancements.
   2. The sheet does not yet compute a spell presentation model affected by equipped foci or other effects.
   3. Impact: focus properties such as Vicious, Reach, Long Range, and Powerful are not clearly reflected when viewing spells.

6. **Maneuver rows are static catalog copies**
   1. Maneuver rows preserve cost, range, reaction trigger, description, and enhancements.
   2. There is no full Martial Manual card flow from the sheet yet.
   3. Impact: review is possible, but not equivalent to the reference/manual experience.

7. **Saved derived values may lag calculator output**
   1. `CharacterSheetProvider` recalculates on save.
   2. The persisted update explicitly writes movement, hold breath, and resource originals.
   3. It does not obviously refresh all top-level derived stats used by pure consumers.
   4. PDF export reads stored character data.
   5. Impact: PDF export can lag if stored top-level finals are stale.

8. **Duplicate condition state shapes exist**
   1. Sheet actions write `characterState.activeConditions`.
   2. Rage writes `characterState.ui.activeConditions.while_raging`.
   3. Calculator merges both.
   4. Impact: currently workable, but should be normalized or documented to avoid future drift.

## Working Pieces

1. Compatibility gates exist for old rules versions.
2. Active conditions are calculator-visible.
3. Rage writes calculator-visible state.
4. Calculated resource maxima are used in the active redesign.
5. Condition interaction/reference components exist.
6. Existing docs already note future spell, maneuver, effects, and attack sheet work.

## Recommended Order

1. Add a pure sheet presentation service fed by calculator output.
2. Wire an active Effects / Rules Notes surface into `CharacterSheetRedesign`.
3. Replace hero combat stat formulas with calculator stats/breakdowns, preserving manual defense overrides.
4. Fix weapon attack row math to use DC20 modifiers directly.
5. Add attack presentation for scoped effects, including Rage melee/unarmed damage.
6. Add spell presentation for focus/effect adjustments.
7. Add full maneuver-card access from the sheet.
8. Verify and fix persisted derived values used by PDF/export consumers.
9. Reduce or document duplicate active-condition state shapes.

## Validation Status

Read-only audit. No tests run for this report.
