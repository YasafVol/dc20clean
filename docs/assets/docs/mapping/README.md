# RPG Systems Mapping — Index

Last updated: 2026-01-14

## Artifacts

### Core Documents
- Context: docs/mapping/context.md
- TODO tracker: docs/mapping/todo.md
- Systems Catalog: docs/mapping/systems-catalog.md
- Insights Log (by chunk): docs/mapping/insights.md

### Schema Documentation
- Schemas by System: docs/mapping/schemas-by-system.md
- Schema Inventory: docs/mapping/schema-inventory.md
- Schema Gap Proposals: docs/mapping/schema-gap-proposals.md

### Analysis & Mapping
- Feature → System Map: docs/mapping/feature-system-map.md
- Gap Analysis: docs/mapping/gap-analysis.md
- Classes Audit: docs/mapping/classes-audit.md
- Validation Scaffold: docs/mapping/validation-scaffold.md
- ID Stability Notes: docs/mapping/ids-stability.md

### Patches (Proposed Changes)
- All Classes Placeholders: docs/mapping/patches/all_classes_placeholders.md
- Spellblade Placeholders: docs/mapping/patches/spellblade_placeholders.md

## Status
- ✅ First-pass discovery complete
- ✅ Gap analysis complete (13 classes audited)
- ✅ Schema proposals documented
- ✅ **All class patches implemented** (L5/L8 features, startingEquipment)
- ✅ **Schema extensions implemented** (EffectResolution, TraitRequirements, reactions.ts)
- ✅ **Quick wins completed** (ONTOLOGY fix, SpellTag expansion, conditions rename, SUBCLASS_REFERENCE update)

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

## Notes
- Do not modify tests without explicit approval.
- See patches/ folder for reference (now implemented).
