# DC20 0.10.5 ID Stability And Aliases

Last Updated: 2026-06-01

## Purpose

This document records the stable ID surfaces that must be protected before any v0.10.5 rulesdata mutation. It is the source-of-record for whether a legacy ID can route silently, requires upgrade review, or must remain view-only.

## Current Rule

Stable IDs are compatibility contracts across:

- saved characters
- draft character state
- calculator lookups
- validation
- character sheet rendering
- PDF export
- storage import/export

Do not rename or remove IDs in rulesdata until the corresponding alias or migration decision exists here.

## Stable ID Surfaces

### Characters and draft state

- `classId`
- `ancestry1Id`
- `ancestry2Id`
- `selectedTraitIds`
- `selectedTraitChoices`
- `selectedFeatureChoices`
- `selectedTalents`
- `selectedSpells`
- `selectedManeuvers`
- `skillsData`
- `tradesData`
- `languagesData`

Primary persistence and runtime surfaces:

- `src/lib/types/dataContracts.ts`
- `src/lib/stores/characterContext.tsx`
- `src/lib/services/characterCompletion.ts`
- `src/lib/services/calculatorModules/effectCollection.ts`
- `src/lib/services/calculatorModules/validation.ts`
- `src/lib/pdf/transformers.ts`

### Rulesdata contracts

- class feature IDs
- subclass feature IDs
- feature choice keys
- talent IDs
- spell IDs
- maneuver IDs
- trait IDs
- equipment property IDs

## Alias Decision Table

| Domain         | Current / old identity                                        | v0.10.5 identity                          | Status                                      | Notes                                                               |
| -------------- | ------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| Rules version  | no persisted `rulesVersion`                                   | additive `rulesVersion` metadata          | required                                    | runtime gate before rulesdata mutation                              |
| Class features | placeholder level-5 / capstone IDs                            | concrete feature IDs                      | alias needed if placeholders were persisted | verify actual saved-character exposure first                        |
| Talent         | `multiclass_grandmaster`                                      | removed from selectable catalog           | deprecate + compatibility policy            | do not hard-delete without load policy                              |
| Talent         | `multiclass_legendary`                                        | removed from selectable catalog           | deprecate + compatibility policy            | same as above                                                       |
| Class feature  | `swift_berserker`                                             | removed                                   | deprecate + compatibility policy            | saved characters may already reference it                           |
| Class feature  | `combat_readiness_brace` / `Brace`                            | `combat_readiness_fortify` / `Fortify`    | implemented alias                           | Champion Fighting Spirit option rename; not a maneuver alias        |
| Maneuver       | `brace` / `Brace`                                             | `brace` / `Brace`                         | no-op                                       | Brace remains a current v0.10.5 Defense maneuver                    |
| Spell          | `summon-familiar` / `Summon Familiar`                         | `call-familiar` / `Call Familiar`         | implemented alias                           | exact rename; old IDs route for lookup, saved IDs are not rewritten |
| Spell          | `fly` / `Fly`                                                 | `blessing-of-air` / `Blessing of Air`     | implemented alias                           | exact rename; old IDs route for lookup, saved IDs are not rewritten |
| Spell          | `vicious-mockery` / `Vicious Mockery`                         | `mockery` / `Mockery`                     | implemented alias                           | exact rename; old IDs route for lookup, saved IDs are not rewritten |
| Spell          | `toxic-aura` / `Toxic Aura`                                   | `toxic-burst` / `Toxic Burst`             | implemented alias                           | exact rename; old IDs route for lookup, saved IDs are not rewritten |
| Spell          | `close-wound` / `Close Wound`                                 | `close-wounds` / `Close Wounds`           | implemented alias                           | singular-to-plural compatibility route                              |
| Spell          | `earth-blessing` / `Earth Blessing`                           | `blessing-of-earth` / `Blessing of Earth` | implemented alias                           | exact rename; old IDs route for lookup, saved IDs are not rewritten |
| Spell          | `gravity-sinkhole`, `gravity-sink-hole` / `Gravity Sink Hole` | `gravity-well` / `Gravity Well`           | implemented rework fence                    | upgrade-required; no silent remap                                   |
| Spell          | `absorb-element` / `Absorb Element`                           | `absorb-elements` / `Absorb Elements`     | implemented alias                           | singular-to-plural compatibility route                              |
| Spell          | `force-dome` / `Force Dome`                                   | ambiguous `Forcefield` target             | implemented view-only fence                 | no silent remap                                                     |
| Spell          | `wall-of-force` / `Wall of Force`                             | ambiguous `Forcefield` target             | implemented view-only fence                 | no silent remap                                                     |
| Trait          | `hazardous_hide`                                              | still `Hazardous Hide` if unchanged       | likely no-op                                | current repo already contains the trait; confirm semantics only     |
| Equipment      | Toss / Thrown / Returning property IDs                        | unchanged IDs, new costs / prerequisite   | no alias expected                           | preserve IDs, update validation only                                |

## Domain Notes

### Class and talent IDs

- Follow `docs/systems/FEATURE_ID_NAMING_CONVENTION.md`.
- The highest-risk class issue is replacing placeholder IDs with final IDs after they may already be referenced by progression files or saved characters.
- Removing `Grandmaster` and `Legendary Multiclass` from v0.10.5 selection must not erase their historical presence in already-saved characters.

### Spell IDs

- Spells are persisted through selected spell slots and saved spell arrays.
- Rename work must keep old saved characters renderable and exportable.
- Treat renamed-and-reworked spells as stronger than normal aliases. Some may need:
  - alias for lookup
  - compatibility warning
  - view-only behavior

### Maneuver IDs

- Current repo usage indicates name-sensitive maneuver behavior in parts of the stack.
- `Brace` remains a current Defense maneuver. The `Fortify` rename applies to Champion Fighting Spirit's Combat Readiness option, not the maneuver catalog.
- `Reposition` is a semantic rewrite and is implemented as current v0.10.5 rules data, not an alias-only task.

### Trait IDs

- Trait IDs are persisted directly in `selectedTraitIds`.
- Any rename or split/merge of trait identities needs alias review first.
- `Hazardous Hide returned` is a semantic verification item, not automatically an alias item.

### Equipment IDs

- Property IDs should stay stable.
- Current v0.10.5 equipment changes appear to be cost and prerequisite changes, not identity changes.
- Saved custom equipment still needs compatibility review because it stores selected property IDs under a fixed v0.10 rules version.

## Required Decisions Before Implementation

1. Which renamed items are true aliases versus reworked entities?
2. Which removed items remain loadable but no longer selectable?
3. Which old characters remain editable under v0.10.5?
4. Which old characters become view-only but exportable?
5. Whether alias resolution happens:
   - on load
   - at lookup time
   - during explicit upgrade
   - or some combination

## Recommended Minimum Alias Policy

- Additive alias registries only.
- No destructive rewrite of saved data on first load.
- Preserve raw original IDs in storage until an explicit upgrade path exists.
- If semantics changed materially, surface compatibility state instead of silently remapping.
