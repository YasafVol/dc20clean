# DC20Clean - Conditions System

> Purpose: Source-audited condition catalog, condition interaction effects, active condition tracking, and sheet-facing automation.
> Status: Active
> Last Updated: 2026-06-20

## Source Audit

Conditions are audited against `docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md`.

| File                                                    | Role                                                                                                        |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `scripts/conditions/dc20-0105-conditions.mjs`           | Parses the v0.10.5 source condition chapter                                                                 |
| `docs/migration/conditions-v0105-report.json`           | Generated flat source audit report with names, source metadata tags, descriptions, provenance, and findings |
| `src/lib/rulesdata/conditions/conditions.data.ts`       | Runtime condition catalog                                                                                   |
| `src/lib/rulesdata/conditions/conditionsSource.test.ts` | Verifies runtime catalog against the generated source report                                                |

Commands:

```bash
npm run conditions:generate:0105
npm run conditions:validate:0105
```

## Catalog Contract

The v0.10.5 universal catalog contains 28 flat condition entries. Source rule
sections such as `stacking`, `overlapping`, `excluded`, and `catalog-only` are
stored only as `sourceTags` metadata on each condition.

`Poisoned` is not a universal v0.10.5 condition. It remains modeled as an effect-specific affliction because individual poisons define their own duration, damage, and riders.

## Source Finding

`Intimidated` appears in the source condition list and is not named in the source "Overlapping Conditions" or "Excluded Conditions" sections. The audit records this with the `catalog-only` source metadata tag.

## Runtime Resolution

`resolveConditionDefinition()` normalizes concrete stacked IDs such as `slowed-2` and `burning-3` to catalog IDs such as `slowed-x` and `burning-x`, preserving the numeric stack value.

`getConditionDefinition()` only returns universal catalog entries by default. Pass `includeEffectSpecific: true` when resolving effect-specific afflictions such as `poisoned`.

Runtime stack controls are driven by `ConditionDefinition.usesStacks`, not by
source metadata tags.

## Effect Interactions

Condition immunities, resistances, and vulnerabilities are modeled through the effect system:

- `GRANT_CONDITION_IMMUNITY`
- `GRANT_CONDITION_RESISTANCE`
- `GRANT_CONDITION_VULNERABILITY`

`src/lib/services/conditionAggregator.ts` groups these effects by canonical condition ID. It accepts condition IDs, display names, and concrete stacking IDs.

## Character Sheet Integration

| Surface                  | File                                   | Current behavior                                                              |
| ------------------------ | -------------------------------------- | ----------------------------------------------------------------------------- |
| Condition reference      | `ConditionsReference.tsx`              | Displays universal condition definitions                                      |
| Standalone reference     | `src/routes/conditions/Conditions.tsx` | Displays the same flat condition catalog outside the character sheet          |
| Condition interactions   | `Conditions.tsx`                       | Displays immunities, resistances, and vulnerabilities from aggregated effects |
| Active condition tracker | `ActiveConditionsTracker.tsx`          | Lets users toggle active conditions and set stack values                      |
| Roll badges/modifiers    | `conditionEffectsAnalyzer.ts`          | Applies selected active condition mechanics to sheet rolls and badges         |

Current automated active-condition effects:

- Attacks: Hindered, Restrained.
- Saves: Immobilized/Restrained on Agility Saves, Weakened on Physical Saves, Disoriented on Mental Saves, Exhaustion on all Saves.
- Checks: Impaired on Physical Checks, Dazed on Mental Checks, Exhaustion on all Checks.
- Movement: Immobilized, Restrained, Slowed, Stunned 4+.

## TODO

- Apply or surface all remaining in-play condition mechanics from the source catalog. Not yet fully automated: Bleeding/Burning start-of-turn damage, Charmed target restriction, Doomed HP/healing reduction, Exposed incoming attack advantage, Frightened source movement/check restriction, Paralyzed/Unconscious critical hit and auto-save failure details, Petrified resistance/vulnerability/suspension details, Stunned/Surprised AP max reduction, Taunted target restriction, Terrified forced action logic, and Tethered distance logic.
- Add a sheet-facing "condition effects summary" surface for active effects that cannot be cleanly applied to roll math.
- Keep source metadata out of character-sheet grouping unless it becomes useful as an optional debug/audit view.
