# ID Stability Notes (First Pass)

Last updated: 2026-01-14

Critical IDs (must remain stable)
- Ancestries: `src/lib/rulesdata/ancestries/ancestries.ts` → `ancestry.id`
- Traits: `src/lib/rulesdata/ancestries/traits.ts` → `trait.id` (format: `<ancestry>_<snake_case_trait>`)
- Classes: `src/lib/rulesdata/classes-data/features/*_features.ts` → `feature.id` (see Feature ID Naming)
- Class Progressions: `src/lib/rulesdata/classes-data/progressions/*.progression.ts`
- Spells: `src/lib/rulesdata/spells-data/<school>/*.ts` → `spell.id`
- Maneuvers: `src/lib/rulesdata/martials/maneuvers.ts` → `maneuver.id`
- Equipment Presets/Properties: `src/lib/rulesdata/equipment/options/*.ts` → property IDs

Conventions & References
- Feature IDs: `docs/systems/FEATURE_ID_NAMING_CONVENTION.md`
- Effect targets (canonical): `src/lib/rulesdata/schemas/character.schema.ts` (`Effect` union)

Notes
- Any ID change requires updating all references (loaders/tests/UI). Prefer additive changes.
