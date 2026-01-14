# Schemas by System (First Pass)

Last updated: 2026-01-14

Status: Concise per-system schema snapshots for orientation. Deep-dive and validations later.

## Index
- [Core Effects](#core-effects)
- [Attributes & Core](#attributes--core)
- [Background](#background)
- [Ancestries & Traits](#ancestries--traits)
- [Classes & Features](#classes--features)
- [Spells](#spells)
- [Maneuvers (Martials)](#maneuvers-martials)
- [Equipment (Custom Builder)](#equipment-custom-builder)
- [Conditions](#conditions)
- [Progression, Caps, Paths, Multiclass](#progression-caps-paths-multiclass)
- [Calculation (Result & Build)](#calculation-result--build)
- [PDF Export DTO](#pdf-export-dto)

## Core Effects
- Source: `src/lib/rulesdata/schemas/character.schema.ts`
- Primary: `Effect` union (Modify/Set/Grant + mastery caps + condition interactions)
- Keys:
  - Discriminant: `type`
  - Common: `target`, `value`, optional `userChoice`
  - Condition effects: `GRANT_CONDITION_IMMUNITY|RESISTANCE|VULNERABILITY`
  - Movement: `GRANT_MOVEMENT` with value strings
 - Primary Types: `Effect` | `ModifyAttributeEffect` | `ModifyStatEffect` | `GrantMovementEffect` | `GrantCondition*`

## Attributes & Core
- Source: `src/lib/rulesdata/attributes.ts`, `schemas/types.ts`
- Types: `IAttributeData { id: 'might'|'agility'|'charisma'|'intelligence', name, description }`
- Derived: see Calculation system; prime modifier handled by rules, not schema
 - Primary Types: `IAttributeData`

## Background
- Sources: `skills.ts`, `trades.ts`, `languages.ts`, `schemas/types.ts`
- Types:
  - `ISkillData { id, name, attributeAssociation: 'might'|'agility'|'charisma'|'intelligence'|'prime', description }`
  - `ITradeData { id, name, primaryAttribute, attributeAssociations[], description, tools? }`
  - `ILanguageData { id, name, type: 'standard'|'exotic', description }`
- Relationships: Background point budgets and conversions computed in calculator
 - Primary Types: `ISkillData` | `ITradeData` | `ILanguageData`

## Ancestries & Traits
- Sources: `ancestries/ancestries.ts`, `ancestries/traits.ts`, `schemas/types.ts`, Effects union
- Types:
  - `IAncestry { id, name, description, defaultTraitIds?, expandedTraitIds, rulesSource?, origin?, variantTraits? }`
  - `ITrait { id, name, description, cost, isNegative?, effects?: Effect[], prerequisites? }`
- Relationships: Traits referenced from Ancestries; Effects consumed by calculator
 - Primary Types: `IAncestry` | `ITrait` | `Effect`

## Classes & Features
- Sources: `schemas/class.schema.ts` (Zod), `classes-data/features/*`, `classes-data/progressions/*`, loaders
- Types (Zod-inferred):
  - `IClassDefinition` with `level1Stats`, `levelProgression: ClassLevel[]`, optional `martialPath|spellcasterPath|hybridPath`, `spellRestrictions`, `level1Features`, `featureChoicesLvl1`
  - `ClassLevel { level, healthPoints, staminaPoints, manaPoints, skillPoints, tradePoints, maneuversKnown, cantripsKnown, spellsKnown, features, gains? }`
  - `classFeatureSchema`, `classFeatureChoiceSchema`
- Relationships: Class → features; progression tables drive budgets; restrictions feed spell filters
 - Primary Types: `IClassDefinition` | `ClassLevel` | `LevelGains`

## Spells
- Source: `schemas/spell.schema.ts`, `spells-data/*`
- Types:
  - `Spell { id, name, sources: SpellSource[], school: SpellSchool, tags?: SpellTag[], isRitual?, cost: { ap, mp? }, range, duration, sustained, effects[], spellPassive?, enhancements[], components? }`
  - Enums: `SpellSchool`, `SpellSource`; `SpellTag` union (first-pass examples)
- Relationships: Classes’ `spellRestrictions` and GlobalMagicProfile filter available spells
 - Primary Types: `Spell` | `SpellCost` | `SpellEnhancement` | `SpellSource` | `SpellSchool`

## Maneuvers (Martials)
- Source: `schemas/maneuver.schema.ts`, `martials/maneuvers.ts`
- Types:
  - `Maneuver { id, name, type: 'Attack'|'Defense'|'Grapple'|'Utility', cost: { ap, sp? }, range, description, isReaction, trigger?, enhancements[] }`
  - `ManeuverEnhancement { name, costString, sp?, ap?, repeatable?, description }`
- Relationships: Known counts by class progression/path; costs use AP/SP from combat
 - Primary Types: `Maneuver` | `ManeuverType` | `ManeuverEnhancement`

## Equipment (Custom Builder)
- Sources: `equipment/schemas/*.ts`, `equipment/options/*.ts`, `equipment/validation/equipmentValidator.ts`
- Base:
  - `BaseEquipment { id, name, description?, properties: string[], pointsSpent, maxPoints, createdAt, updatedAt }`
  - `BaseProperty { id, name, description, cost: -1|0|1|2, requires?, excludes?, maxStacks? }`
- Categories:
  - Weapon: types/styles/properties; presets in options
  - Armor: types/properties
  - Shield: types/properties; `CustomShield { pdBonus, adBonus, hasPdr, hasEdr, speedPenalty, hasAgilityDisadvantage }`
  - Spell Focus: hands, bonuses for checks/attacks/damage, range modifiers, duel adv
- Relationships: Builder → Saved equipment; Training rules elsewhere affect usage
 - Primary Types: `BaseEquipment` | `BaseProperty` | `CustomShield` | `SpellFocusProperty`

## Conditions
- Source: `conditions/*`
- Types: data with IDs used by effects and UI; interaction via Effect System condition grants
 - Primary Types: `GrantCondition*` effects in Effect union; condition IDs in rulesdata

## Progression, Caps, Paths, Multiclass
- Sources: `progression/levelCaps.ts`, `progression/paths/*`, `progression/multiclass.ts`
- Types:
  - Level caps API (`getLevelCaps`) with caps for attributes and mastery tiers
  - Paths: `paths.types.ts` for martial/spellcasting bonuses
  - Multiclass: `MulticlassTierDefinition`, helpers to get tiers by level
 - Primary Types: `MulticlassTierDefinition`

## Calculation (Result & Build)
- Source: `types/effectSystem.ts`
- Types:
  - `EnhancedCalculationResult { stats{...}, breakdowns, grantedAbilities, conditionalModifiers, combatTraining, resistances, vulnerabilities, senses, movements, background{...}, ancestry{...}, levelBudgets{...}, resolvedFeatures{...}, globalMagicProfile, spellsKnownSlots[], validation, unresolvedChoices[], cache flags }`
  - `EnhancedCharacterBuildData { id, level, attributes, classId, ancestryIds, selections (traits, features, talents, subclass, multiclass), skills/trades/languages, conversions, manual PD/AD/PDR?, selectedSpells/Maneuvers, pathPointAllocations, levelBudgets? }`
- Relationships: Core DTOs between UI ↔ calculator ↔ PDF transformers
 - Primary Types: `EnhancedCalculationResult` | `EnhancedCharacterBuildData`

## PDF Export DTO
- Source: `types/pdfExport.ts` (Zod schema)
- Type: `PdfExportData` — versioned mapping structure for v0.10/0.9.5 field maps
 - Primary Types: `PdfExportData`

---
Notes
- This is a first-pass snapshot; deep-dive will reconcile legacy vs canonical types and enumerate enums/options fully.
