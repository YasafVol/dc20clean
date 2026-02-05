# RPG Systems Mapping — Index

Last updated: 2026-01-14

> **Location**: `docs/assets/mapping/` — This folder contains analysis artifacts for mapping DC20 rules to code.

## Artifacts

### Core Documents

- [Context](context.md) — Goals, scope, constraints, and approach
- [TODO Tracker](todo.md) — Task tracking and progress markers
- [Systems Catalog](systems-catalog.md) — Enumerated systems with inputs/outputs
- [Insights Log](insights.md) — Findings by chunk/system

### Schema Documentation

- [Schemas by System](schemas-by-system.md) — TypeScript types mapped to systems
- [Schema Inventory](schema-inventory.md) — Full schema listing
- [Schema Gap Proposals](schema-gap-proposals.md) — Proposed schema changes

### Analysis & Mapping

- [Feature → System Map](feature-system-map.md) — Features mapped to systems/code
- [Gap Analysis](gap-analysis.md) — Rules vs code discrepancies
- [Classes Audit](classes-audit.md) — Per-class comparison (13 classes)
- [Validation Scaffold](validation-scaffold.md) — Acceptance checks and test targets
- [ID Stability Notes](ids-stability.md) — Feature ID conventions

### Patches (Reference — Now Implemented)

- [All Classes Placeholders](patches/all_classes_placeholders.md) — L5/L8 features + startingEquipment
- [Spellblade Placeholders](patches/spellblade_placeholders.md) — Spellblade-specific patches

## Status

- ✅ First-pass discovery complete
- ✅ Gap analysis complete (13 classes audited)
- ✅ Schema proposals documented
- ✅ **All class patches implemented** (L5/L8 features, startingEquipment)
- ✅ **Schema extensions implemented** (EffectResolution, TraitRequirements, reactions.ts)
- ✅ **Quick wins completed** (ONTOLOGY fix, SpellTag expansion, conditions rename)

## Completed Work (2026-01-14)

- All 13 classes now have L5/L8 placeholder features
- All 13 classes now have startingEquipment blocks
- Psion class marked as `experimental: true`
- SpellTag type expanded to 50+ tags
- MSL/SSL spend limits added to calculator output
- Reaction triggers config created

## Remaining Work

- UI implementation for MSL/SSL validation
- UI implementation for declare-before-roll workflow
- Data population for new schema fields (EffectResolution, TraitRequirements)

## Related Documentation

- Rules source: [`../DC20 0.10 full.md`](../DC20%200.10%20full.md)
- System specs: [`../../systems/`](../../systems/)

## Notes

- Do not modify tests without explicit approval.
- See `patches/` folder for reference (now implemented).
