# Feature → System Mapping (First Pass)

Last updated: 2026-01-14

Status: First-pass map for orientation. Deep-dive alignment deferred to later pass.

## Character Creation (Wizard)
- Systems: Classes, Ancestry, Traits, Attributes, Background, Spells, Martials, Calculation, Creation Flow
- UI/Code: `src/routes/character-creation/**`, `characterContext.tsx`, `useCharacterBuilder.ts`, `enhancedCharacterCalculator.ts`
- Notes: Step gating via calculator budgets/validation; progressive class features by level.
 - Schemas: `src/lib/rulesdata/schemas/class.schema.ts`, `src/lib/rulesdata/schemas/character.schema.ts`, `src/lib/rulesdata/schemas/types.ts`
- Services/Types: `src/lib/services/enhancedCharacterCalculator.ts`, `src/lib/types/effectSystem.ts`
 - Acceptance (stubs):
   - Selecting a class and resolving required feature choices enables Next.
   - Attribute point changes immediately update PD/AD/Save DC in the preview.
   - Background conversions adjust available points and enforce caps before submit.

## Leveling Choices (Level > 1)
- Systems: Leveling, Paths (Martial/Spellcaster), Talents, Multiclass, Calculation
- UI/Code: `LevelingChoices.tsx`, class progression loaders, `paths/*`, `talents/*`
- Notes: Budgets for talents/path points; tiered multiclass options.
 - Schemas: `src/lib/rulesdata/schemas/class.schema.ts`
 - Data: `src/lib/rulesdata/classes-data/progressions/*.progression.ts`, `src/lib/rulesdata/progression/paths/paths.data.ts`, `src/lib/rulesdata/progression/multiclass.ts`
- Services/Types: `src/lib/rulesdata/classes-data/classProgressionResolver.ts`, `src/lib/types/effectSystem.ts`
 - Acceptance (stubs):
   - Level > 1 shows Leveling Choices with non-zero budgets from progressions.
   - Spending all talent/path points enables Next; leaving points blocks Next.
   - Path bonuses (SP/MP/knowns) reflect immediately in calculated stats.

## Ancestry Selection & Traits
- Systems: Ancestries, Traits, Effect System, Calculation
- UI/Code: `AncestrySelector.tsx`, `SelectedAncestries.tsx`, `rulesdata/ancestries/*`, `traits.ts`
- Notes: Points budget with negative trait offsets; effect choices (any_*).
 - Schemas: `src/lib/rulesdata/schemas/character.schema.ts`, `src/lib/rulesdata/schemas/types.ts`
 - Data: `src/lib/rulesdata/ancestries/ancestries.ts`, `src/lib/rulesdata/ancestries/traits.ts`
- Services/Types: `src/lib/types/effectSystem.ts` (effects attribution), calculator aggregation
 - Acceptance (stubs):
   - Negative traits increase ancestry points; total remaining must be 0 to proceed.
   - Choice-based effects prompt once and persist; breakdown shows trait sources.
   - Movement/senses from traits appear in calculated movements/senses arrays.

## Attributes & Prime
- Systems: Core Rules (CH1), Calculation, Optional Prime=Cap rule
- UI/Code: `Attributes.tsx`, `attributes.ts`, `levelCaps.ts`, `enhancedCharacterCalculator.ts`
- Notes: Attribute points pool; prime modifier determination; caps by level.
 - Schemas/Data: `src/lib/rulesdata/attributes.ts`, `src/lib/rulesdata/progression/levelCaps.ts`
- Services/Types: `src/lib/types/effectSystem.ts` (stats, caps), calculator
 - Acceptance (stubs):
   - Toggling Prime=Cap optional rule updates prime modifier and derived stats.
   - Cannot increase attributes beyond cap for level; UI blocks invalid increments.

## Background (Skills, Trades, Languages)
- Systems: Background, Trades Multi-Attribute, Calculation
- UI/Code: `Background.tsx` tabs, `skills.ts`, `trades.ts`, `languages.ts`
- Notes: Conversions between pools; mastery caps/validation.
 - Schemas/Data: `src/lib/rulesdata/skills.ts`, `src/lib/rulesdata/trades.ts`, `src/lib/rulesdata/languages.ts`, `src/lib/rulesdata/schemas/types.ts`
- Services/Types: `src/lib/types/effectSystem.ts` (background block), calculator budgets/validation
 - Acceptance (stubs):
   - Conversions follow documented formulas (1 Skill → 2 Trade; 1 Trade → 2 Language).
   - Mastery cap violations surface errors and disable submit.

## Spells (Selection & Casting Metadata)
- Systems: Spells, Spellcaster Chapter, Calculation (MP), Effects
- UI/Code: `spells-data/**`, `spell.schema.ts`, `spellAssignment.ts`, routes under creation/sheet
- Notes: Source/School/Tag filtering; sustained flags; enhancement display.
 - Schemas: `src/lib/rulesdata/schemas/spell.schema.ts`
 - Data: `src/lib/rulesdata/spells-data/<school>/*.ts`, `src/lib/rulesdata/spells-data/index.ts`
- Services/Types: `src/lib/services/spellAssignment.ts`, `src/lib/types/effectSystem.ts` (GlobalMagicProfile, slots)
 - Acceptance (stubs):
   - Filters reflect class `spellRestrictions` and global magic profile.
   - Sustained flag and components display; enhancement list renders with AP/MP.

## Martials (Maneuvers)
- Systems: Martials, Combat Resources (AP/SP), Calculation
- UI/Code: `martials/maneuvers.ts`, `maneuver.schema.ts`, creation/sheet routes
- Notes: Known count by level/path; enhancement options; reactions/triggers.
 - Schemas: `src/lib/rulesdata/schemas/maneuver.schema.ts`
 - Data: `src/lib/rulesdata/martials/maneuvers.ts`
- Services/Types: calculator aggregation for known counts; `src/lib/types/effectSystem.ts` (stats)
 - Acceptance (stubs):
   - Known maneuvers count matches progression + path bonuses.
   - Enhancement options display with repeatability and costs.

## Equipment (Custom Builder)
- Systems: Equipment (Weapons/Armor/Shields/Spell Focus), Core Rules (training/bonuses)
- UI/Code: `src/routes/custom-equipment/**`, `equipment/schemas/**`, `options/**`, `validation/**`
- Notes: Points budgets; property requirements/stacking; storage/export.
 - Schemas: `src/lib/rulesdata/equipment/schemas/*`
 - Data: `src/lib/rulesdata/equipment/options/*`
- Services: `src/lib/rulesdata/equipment/validation/equipmentValidator.ts`, `src/lib/rulesdata/equipment/storage/equipmentStorage.ts`
 - Acceptance (stubs):
   - Property requirements/exclusions enforced; points remain within maxPoints.
   - Preset equipment loads and can be saved/exported via storage API.

## Character Sheet (Display)
- Systems: Calculation, Background, Spells, Martials, Equipment, Effects
- UI/Code: `src/routes/character-sheet/**`, `CharacterSheetProvider.tsx`
- Notes: Live updates from calculator; info buttons link to feature/trait data.
- Types: `src/lib/types/effectSystem.ts` (EnhancedCalculationResult)
 - Acceptance (stubs):
   - Derived stats update without navigation; info buttons resolve to features/traits.
   - Movement and conditions panels reflect aggregated effects with sources.

## PDF Export
- Systems: PDF Export, Calculation (Enhanced result), Effects (movements)
- UI/Code: `src/lib/pdf/*.ts`, `types/pdfExport.ts`, export CTA in creation/sheet
- Notes: Versioned field maps (0.10 default); movement checkboxes; DTO validation.
- Types: `src/lib/types/pdfExport.ts`
- Services: `src/lib/pdf/transformers.ts`, `src/lib/pdf/fillPdf.ts`, field maps under `src/lib/pdf/`
 - Acceptance (stubs):
   - Export produces a non-empty PDF; movement checkboxes set per movement speeds.
   - Switching template version changes field mapping but preserves data.

## Load/Save (Persistence)
- Systems: None (client state), Equipment storage
- UI/Code: `LoadCharacter.tsx`, `equipmentStorage.ts`
- Notes: LocalStorage contracts for character/equipment.
- Services: `src/lib/rulesdata/equipment/storage/equipmentStorage.ts`
 - Acceptance (stubs):
   - Loading a saved character restores selections; equipment list persists across reloads.

## Conditions & Info Panels
- Systems: Conditions (CH3), Effect System (condition immunities/resistances)
- UI/Code: `Conditions.tsx`, condition aggregators
- Notes: Display aggregated condition interactions with sources.
- Data: `src/lib/rulesdata/conditions/*`
- Types/Services: condition aggregator (if present), calculator outputs `resistances/vulnerabilities`
 - Acceptance (stubs):
   - Condition immunities/resistances/vulnerabilities display grouped with sources.
   - Search filters the conditions list by name and category.

---

Planned additions (later passes):
- Add per-feature acceptance checks (Agent Brief style)
- Link to schema inventory per feature/system
- Note known edge cases and deep-dive items per mapping
