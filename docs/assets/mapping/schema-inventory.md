# Schema Inventory (First Pass)

Last updated: 2026-01-14

Status: High-level catalog of key types, schemas, and data catalogs. Deep dives deferred.

## Core Effect Model
- File: `src/lib/rulesdata/schemas/character.schema.ts`
- Key: `Effect` discriminated union and effect interfaces (MODIFY_*; GRANT_*; mastery cap effects; condition interactions; movement/sense/training/choices).
- Used by: Traits, Class Features, Calculator aggregation, UI breakdowns.

## Classes
- Files:
  - `src/lib/rulesdata/schemas/class.schema.ts` (Zod): `effectSchema`, `classFeatureSchema`, `classFeatureChoiceSchema`, `classSchema`, `LevelGains`, `ClassLevel`; path sections (martial/spellcaster/hybrid); `spellRestrictions`.
  - `src/lib/rulesdata/classes-data/features/*_features.ts` (data).
  - `src/lib/rulesdata/classes-data/progressions/*.progression.ts` (data tables).
  - Loaders: `class.loader.ts`, `class-features.loader.ts`.
- Notes: v0.10 class lists; progression 1–10; restrictions align with spells sources/schools/tags.

## Spells
- Files:
  - `src/lib/rulesdata/schemas/spell.schema.ts`: `Spell`, `SpellSchool`, `SpellSource`, `SpellTag`, `SpellEnhancement`.
  - Data: `src/lib/rulesdata/spells-data/<school>/*.ts`, `spells-data/index.ts`.
- Notes: Sustained flag, components optional, enhancements AP/MP; legacy enums present (compat only).

## Martials (Maneuvers)
- Files:
  - `src/lib/rulesdata/schemas/maneuver.schema.ts`: `Maneuver`, `ManeuverType`, `ManeuverEnhancement`.
  - Data: `src/lib/rulesdata/martials/maneuvers.ts`.
- Notes: Techniques removed in v0.10; costs AP/SP.

## Background
- Files:
  - `src/lib/rulesdata/skills.ts` (ISkillData shape), `trades.ts` (ITradeData, multi-attribute), `languages.ts` (ILanguageData).
  - Types: `src/lib/rulesdata/schemas/types.ts` for `ISkillData`, `ITradeData`, `ILanguageData` (and legacy `IClassDefinition`, etc.).
- Notes: Calculator computes budgets and conversions; mastery caps via `levelCaps.ts`.

## Ancestries & Traits
- Files: `src/lib/rulesdata/ancestries/ancestries.ts`, `src/lib/rulesdata/ancestries/traits.ts`.
- Types: `IAncestry`, `ITrait`, `ITraitEffect` (legacy) in `schemas/types.ts`; canonical effects in `character.schema.ts`.
- Notes: Tests enforce structure: `ancestries.test.ts`, `rulesdata.spec.ts`.

## Equipment (Custom Builder)
- Files:
  - Schemas: `src/lib/rulesdata/equipment/schemas/baseEquipment.ts`, `weaponSchema.ts`, `armorSchema.ts`, `shieldSchema.ts`, `spellFocusSchema.ts`.
  - Options/Data: `equipment/options/*.ts` (presets, properties, styles).
  - Validation: `equipment/validation/equipmentValidator.ts`.
  - Storage: `equipment/storage/equipmentStorage.ts`.
- Notes: Points, properties, requirements/exclusions, stack caps per property.

## Conditions
- Files: `src/lib/rulesdata/conditions/*`.
- Notes: IDs align with Effect condition interactions; consumed by UI.

## Progression & Caps
- Files: `src/lib/rulesdata/progression/levelCaps.ts`, `paths/paths.data.ts`, `paths/*.ts`, `multiclass.ts`.
- Notes: `getLevelCaps(level)` canonical caps; path bonuses; multiclass tiers and helpers.

## Calculator & Services (touchpoints)
- Calculator: `src/lib/services/enhancedCharacterCalculator.ts` (aggregation, breakdowns, movement processing, background budgets, caps validation).
- Assignment: `src/lib/services/spellAssignment.ts` (spells availability/filters).
- UI Data: `src/lib/stores/characterContext.tsx`, `src/lib/hooks/useCharacterBuilder.ts`.

## Known Gaps / Alignment Checks (for deep dive)
- Align `class.schema.ts` effects vs canonical `Effect` union (some generic zod fields vs typed union).
- Confirm legacy types in `schemas/types.ts` aren’t used where `class.schema.ts` supersedes.
- Normalize SpellTag set vs rules doc tags list (CH2b/c) and system doc.
- Verify equipment builder properties map cleanly to CH3 equipment property semantics.
- Ensure condition IDs match CH3 conditions list and Effect System expectations.

---
This inventory will anchor the upcoming deep‑dive and gap analysis.
