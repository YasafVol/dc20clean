# Systems Catalog (First Pass)

Last updated: 2026-01-14

Status: Skeleton with inputs, outputs, invariants, dependencies, key files, and open questions. Deep dives later.

## Index
- Core Rules (CH1)
- Combat (CH2a)
- Spellcasting (CH2b)
- Spells (CH2c)
- General Rules (CH3)
- Character Creation (CH4)
- Ancestries (CH5)
- Classes (CH6)
- Calculation & Derived Stats (App)
- Background (App)
- Trades Multi-Attribute (App)
- Traits (App)
- Classes System (App)
- Ancestries System (App)
- Spells System (App)
- Martials System (App)
- Equipment System (App)
- Character Sheet (App)
- PDF Export (App)
- Effects System (App)
- Leveling System (App)
- Multiclass System (App)
- Creation Flow (App)
- Feature ID Naming (App)

---

## Core Rules (CH1)
- Inputs: Level, Attributes, Masteries, Equipment, Training, Conditions
- Outputs: CM, PD/AD, Save DC, HP/Temp HP/Thresholds, Checks/Saves results, Crit/Degrees, Damage interactions
- Invariants: Temp HP doesn’t stack; Language DCs; ADV/DISADV rules; conversions
- Dependencies: Classes (HP), Ancestries (HP), Equipment bonuses, Calculation engine
- Key Files: docs/assets/DC20 0.10 full.md:1; src/lib/rulesdata/attributes.ts
- Open Questions: Damage order, ADV/DISADV stacking specifics
- See Also: insights.md#DISC-CH1, schemas-by-system.md#attributes--core
- Details (first pass):
   - Core formulas: PD = 8 + CM + Agi + Int; AD = 8 + CM + Mig + Cha; Save DC = 10 + CM + Prime.
   - Checks: Attack/Spell/Martial = d20 + Prime + CM; Skills/Trades = d20 + Attribute + Mastery.
   - Health: L1 HP = Class HP + Might (+ Ancestry HP mods). Temp HP doesn’t stack.
   - Degrees of Damage: +1 per 5 over Defense; Heavy (+5), Brutal (+10). Critical: nat 20 auto‑hit, bypasses DR, +2 damage (stacks with +5/+10 when applicable).
   - Damage sequencing: Attacker damage add order → Base, Heavy/Brutal/Crit, AP‑based, situational; Defender modifications → additive first (Resist/Vuln X), then multiplicative (half/double). Per‑type application for multiple damage types; Shared damage rounds up per share.
   - Multiple Check Penalty: same check type repeated on your turn incurs DisADV stacking (2nd DisADV 1, 3rd DisADV 2, 4th DisADV 3); not outside combat; reactions unaffected (unless stated); Held Action uses MCP from the turn AP was spent.
   - Dynamic Attack Saves: simultaneous roll; attack/spell check vs Defense decides damage; target save vs Save DC decides effect; four standard outcomes.

## Combat (CH2a)
- Inputs: AP/MP/SP/Grit pools, Actions/Reactions, Maneuvers known, Training
- Outputs: Resource spend/regain, action legality, reaction triggers, maneuver effects
- Invariants: Spend limits per turn; trigger requirements; enhancements gating
- Dependencies: Spellcasting chapter; CH1 checks/defenses; Equipment
- Key Files: docs/assets/DC20 0.10 full.md:1408; src/lib/rulesdata/martials/maneuvers.ts
- Open Questions: Exact max AP/MP/SP formulas; reaction trigger list
- Schemas: src/lib/rulesdata/schemas/maneuver.schema.ts
- Services: src/lib/services/enhancedCharacterCalculator.ts (resource display), UI routes for actions/reactions
 - See Also: insights.md#DISC-CH2a
 - Details (first pass):
   - Held Actions: declare action + trigger; pay AP now; Reaction occurs if trigger before your next turn; MCP from current turn applies; wasted AP if trigger never happens.
   - Reactions: one per trigger; not on your own turn unless reacting to another reaction; AP spent on reactions reduce next turn’s AP; AP refresh end of your turn.
   - Opportunity Attack: prereq Martial Path; triggers on leaving reach/draw/pickup/object action; Reaction 1 AP; can add Martial Enhancements.
   - Spell Duel: challenger spends AP + MP (≤ MSL); both add +2×MP_spent to their check; tie → Wild Magic; MP bonus doesn’t apply to Heavy/Brutal outcomes.
   - Maneuvers/Enhancements: AP costs; some SP; SP ≤ SSL; declare enhancements before roll; ranges/durations/sustained similar to spells.
   - Reaction Triggers Checklist:
     - OA: leave melee reach, draw weapon/focus, pick up item, Object action (creature in reach; visible).
     - Spell Duel: see an MP Effect being cast within 5 spaces of caster/target.
     - Combo Spellcasting: see an MP Effect you know being cast, or a Spell Duel initiated, within 5 spaces of caster/target.
     - Maneuver reactions: see each maneuver (e.g., Parry when attack is made within 1 space; Protect if attack still hits) for specific triggers.

## Spellcasting (CH2b)
- Inputs: Known spells, spell lists, AP/MP, components
- Outputs: Casting eligibility, check/DC targets, enhancements, duel/combo outcomes
- Invariants: MP per cast ≤ CM; V+S default; 1 MP → 2 AP for AP enhancements
- Dependencies: CH2a resources; CH1 Save DC; Spells data
- Key Files: docs/assets/DC20 0.10 full.md:2300; src/lib/rulesdata/schemas/spell.schema.ts
- Open Questions: Per-class “spells known” progression; material component modeling
- See Also: insights.md#DISC-CH2b, schemas-by-system.md#spells
- Details (first pass):
   - Enhancement spend: declare before roll; 1 MP can substitute for 2 AP of AP Enhancements.
   - Duel: each side adds +2×MP_spent to contest; Wild Magic on tie.
   - Components: Verbal + Somatic by default; Material sometimes required/consumed; enforce availability.
   - DC normalization (proposal): standardize effect resolution data to cover Attack vs PD/AD, Spell Check vs fixed DC, Save vs Save DC, and Dynamic simultaneous cases.
 - Schemas: src/lib/rulesdata/schemas/spell.schema.ts
 - Services: src/lib/services/spellAssignment.ts; src/lib/services/enhancedCharacterCalculator.ts

## Spells (CH2c)
- Inputs: School, Source, Tags; costs; ranges; durations; enhancements
- Outputs: Attack/check outcomes; conditions; terrain/auras; sustained states
- Invariants: Respect component/MP rules; per-entry enhancement caps
- Dependencies: Spellcasting chapter; AoE; Conditions; Damage types
- Key Files: docs/assets/DC20 0.10 full.md:2683; src/lib/rulesdata/spells-data/**
- Open Questions: Fixed DC vs Save DC normalization; enhancement prerequisites
- See Also: insights.md#DISC-CH2c, schemas-by-system.md#spells
- Details (first pass):
   - Sampling rule: only first 5 spells enumerated (structure-focused).
   - Entry fields: Source(s), School, Tags, Cost {ap, mp?}, Range, Duration, Sustained?, Enhancements[].
 - Schemas: src/lib/rulesdata/schemas/spell.schema.ts
 - Data: src/lib/rulesdata/spells-data/**

## General Rules (CH3)
- Inputs: Terrain/light/senses; sizes; equipment; conditions; rests
- Outputs: Movement/jumps/breath; cover/concealment; AoE templates; condition behavior
- Invariants: Property requirements; condition stacking/overlap; rest recoveries
- Dependencies: CH1 defenses/damage; CH2 actions; Equipment; PDF icons
- Key Files: docs/assets/DC20 0.10 full.md:5502; src/lib/rulesdata/equipment/**; src/lib/rulesdata/conditions/**
- Open Questions: Numeric formulas for jump/breath; full property lists
- See Also: insights.md#DISC-CH3, schemas-by-system.md#conditions
- Details (first pass):
   - AoE shapes: Arc, Aura, Cone, Line, Ring, Sphere, Zone; placement rules by spaces.
   - Visibility: Line of sight, cover (1/2, 3/4), concealment, and illumination tiers (bright/dim/darkness).
   - Senses: Darkvision, Tremorsense, Blindsight, Truesight; underwater combat penalties called out.
   - Conditions: stacking vs overlapping, and resistance/immune/vulnerable interactions.
   - Jumping: Jump Distance = Agility; Long Jump (spaces), High Jump (feet), Standing halved; must have enough movement to cover the jump; Vertical Reach = 1.5×height and added to High Jump for reach checks.
   - Falling: Damage if > Agility spaces; damage = spaces fallen (max 100); Agility Save DC = 10 + spaces; Success reduces damage by Agility and avoids Prone; Uncontrolled Fall DC +5 and always damage; collision share = half spaces; Physical Save DC = 10 + damage taken to avoid Prone.
   - Climb/Swim: Without speed Slowed 1; DC tables by condition; periodic checks for long distances; failure effects (fall or sink).
 - Schemas: equipment schemas; condition data types
 - Services: none specific; enforcement is per-rule in UI/GM guidance

## Character Creation (CH4)
- Inputs: Background packages; class/ancestry data; talent catalog; path selection
- Outputs: Initial stats, training, knowns, inventory; progression rules
- Invariants: Attribute limits; talent requirements; path/subclass levels
- Dependencies: Background, Classes, Ancestries, Calculation
- Key Files: docs/assets/DC20 0.10 full.md:6876; docs/systems/CHARACTER_CREATION_FLOW.MD
- Open Questions: Save Masteries at creation; progression table specifics
- See Also: insights.md#DISC-CH4, feature-system-map.md#character-creation-wizard
- Details (first pass):
   - 10-step outline including attributes, backgrounds, defenses/resources, ancestry, equipment.
   - Leveling Choices stage appears when level > 1 (talents/path/multiclass budgets).
 - Schemas: class schema, character schema (effects), background types
 - Services: enhancedCharacterCalculator; characterContext

## Ancestries (CH5)
- Inputs: Ancestry points; trait catalogs; variant rules
- Outputs: Final trait set; attribute/mastery mods; senses/movement/etc.
- Invariants: Requirements/duplicates; two-ancestry constraints
- Dependencies: Traits System; Calculation; Equipment/Conditions
- Key Files: docs/assets/DC20 0.10 full.md:7390; src/lib/rulesdata/ancestries/**
- Open Questions: Trait costs/effects inventory; Beast traits schema
 - See Also: insights.md#DISC-CH5, schemas-by-system.md#ancestries--traits
 - Details (first pass):
   - Trait categories: Minor, Negative, Default, Expanded; points budget with negative offsets.
   - Dual-ancestry rules and constraints; Beastborn modular traits (Senses/Mobility/Body/Natural Weapons/Misc).
   - Requirements & Refunds: encode prerequisites and mutually exclusive constraints; support point refund with validation.
   - Variant rules: Custom ancestries, Variable Negativity, stronger/weaker ancestries, adoption, ancestry “magic items”.
 - Schemas: schemas/types.ts (IAncestry/ITrait), character.schema.ts (Effect)
 - Services: enhancedCharacterCalculator (effects aggregation)

## Classes (CH6)
- Inputs: Class selection/level; subclass; path
- Outputs: Features; known spells/maneuvers; training; starting gear
- Invariants: Class tables gate progression; subclass levels fixed
- Dependencies: Spells/Martials; Equipment; Talents; Background
- Key Files: docs/assets/DC20 0.10 full.md:7853; src/lib/rulesdata/classes-data/**
- Open Questions: Full tables and feature mapping
 - See Also: insights.md#DISC-CH6, schemas-by-system.md#classes--features
 - Details (first pass):
   - Per-class: table (1–10), features, path availability, starting equipment; subclasses at levels 3/6/9.
   - Hybrid (Spellblade) offers both paths; known spells/maneuvers from tables and path bonuses.
   - Restrictions: access to spells governed by sources/schools/tags via spellRestrictions; slot‑based knowns (global + specialized) govern pickers.
   - Wild Form (Druid): represent via effect grants (movement, senses, condition interactions).
 - Schemas: schemas/class.schema.ts
 - Services: class loaders; class progression resolver

## Calculation & Derived Stats (App)
- Inputs: Build data; effects; progression/caps
- Outputs: Final stats, breakdowns, validations, movement, budgets, magic profile
- Invariants: Apply effects before dependents; levelCaps source of truth
- Dependencies: Effects System; Background; Equipment; UI/hooks; PDF
- Key Files: docs/systems/CALCULATION_SYSTEM.MD; src/lib/services/enhancedCharacterCalculator.ts; src/lib/types/effectSystem.ts
- Open Questions: Prime tie-break order confirmation
 - See Also: insights.md#DISC-SYS-CALC, schema-inventory.md#core-effect-model
 - Details (first pass):
   - Order dependency: compute base → apply breakdowns → compute dependents (e.g., Rest Points after HP Max).
   - Caps: `getLevelCaps(level)` drives attribute and mastery caps; CM = ceil(level/2).
   - Movement: GRANT_MOVEMENT processed after final ground speed; exported to PDF as half/full flags.

## Background (App)
- Inputs: skills/trades/languages selections; conversions; INT; effects
- Outputs: Base/available points; usage; mastery limits; denormalized mastery
- Invariants: Conversion math; common language free; caps/exception logic
- Dependencies: Calculation; Traits/Classes; PDF
- Key Files: docs/systems/BACKGROUND_SYSTEM.MD; src/lib/rulesdata/{skills,trades,languages}.ts
- Open Questions: Multi-attribute display rules; language DCs UI
 - See Also: insights.md#DISC-SYS-BACKGROUND, schemas-by-system.md#background
 - Details (first pass):
   - Base budgets at L1: Skills = 5 + INT + bonuses; Trades = 3 + bonuses; Languages = 2 + bonuses.
   - Conversions: Skill↔Trade, Trade→Language per spec; mastery caps validated with exceptions.

## Trades Multi-Attribute (App)
- Inputs: trade mastery; associated attributes; tools
- Outputs: Attribute selection guidance; tool validation
- Invariants: Associations from allowed set; tools gate checks
- Dependencies: Background; Equipment/tools; CH1 trades checks
- Key Files: docs/systems/TRADES_MULTI_ATTRIBUTE_SPEC.md; src/lib/rulesdata/trades.ts
- Open Questions: Canonical spec path and UI display text rules

## Traits (App)
- Inputs: selected traits; effect choices
- Outputs: Resolved effects; breakdowns; grants (abilities/senses/movements)
- Invariants: Valid effect types/targets; userChoice wiring; negative costs
- Dependencies: Effects System; Ancestries; Calculation
- Key Files: docs/systems/TRAITS_SYSTEM.MD; src/lib/rulesdata/ancestries/traits.ts; src/lib/rulesdata/rulesdata.spec.ts
- Open Questions: Additional any_* patterns

## Classes System (App)
- Inputs: class features/progression; spellRestrictions; subclass choices
- Outputs: Unlocked features; budgets; path bonuses
- Invariants: Schema validation; ID conventions; effects reuse preferred
- Dependencies: Calculation; Spells/Martials; Effects; UI loaders
- Key Files: docs/systems/CLASS_SYSTEM.MD; src/lib/rulesdata/classes-data/**
- Open Questions: Restrictions sync with spells
 - See Also: insights.md#DISC-SYS-CLASSES, schemas-by-system.md#classes--features
 - Details (first pass):
   - Loaders validate features/progression against Zod schemas; IDs follow naming convention.
   - `spellRestrictions` config filters by sources/schools/tags; slot-based spell knowns (global profile + specialized slots).

## Ancestries System (App)
- Inputs: ancestry/traits data; user selections
- Outputs: Aggregated effects; points accounting
- Invariants: Non-empty trait lists; rulesSource; zero orphan traits
- Dependencies: Traits; Calculation; UI
- Key Files: docs/systems/ANCESTRY_SYSTEM.MD; src/lib/rulesdata/ancestries/**
- Open Questions: Custom ancestries flow
 - See Also: insights.md#DISC-SYS-ANCESTRY, schemas-by-system.md#ancestries--traits
 - Details (first pass):
   - Tests ensure non-empty trait lists and zero orphan traits; rulesSource tracked; effects applied via calculator aggregation.

## Spells System (App)
- Inputs: spell data; class restrictions; selections
- Outputs: Available/known spells; sustained flags; enhancements view
- Invariants: Sources/schools/tags filters; sustained action
- Dependencies: Spellcasting rules; Calculation (MP); UI
- Key Files: docs/systems/SPELLS_SYSTEM.MD; src/lib/rulesdata/spells-data/**; spell schema
- Open Questions: Restrictions config shape; fixed DC representation
 - See Also: insights.md#DISC-SYS-SPELLS, schemas-by-system.md#spells
 - Details (first pass):
   - 125 spells grouped by School; sustained flags; utility functions (lookup, grouping) in spells-data index.

## Martials System (App)
- Inputs: maneuvers data; class/path grants
- Outputs: Known maneuvers; enhancements; reactions
- Invariants: Eligibility and counts; AP/SP costs
- Dependencies: Combat resources; Classes; UI
- Key Files: docs/systems/MARTIALS_SYSTEM.MD; src/lib/rulesdata/martials/maneuvers.ts
- Open Questions: Monk stances integration
 - See Also: insights.md#DISC-SYS-MARTIALS, schemas-by-system.md#maneuvers-martials
 - Details (first pass):
   - Four categories (Attack/Defense/Grapple/Utility); AP/SP costs; enhancements with repeatable flags; known counts by level/path.

## Equipment System (App)
- Inputs: builder selections; properties; budgets
- Outputs: Custom items; validation results; saved entries
- Invariants: Points caps; requirements/exclusions; stacking limits
- Dependencies: CH1/CH3 equipment; Character Sheet; PDF
- Key Files: docs/systems/EQUIPMENT_SYSTEM.MD; src/lib/rulesdata/equipment/**
- Open Questions: Equip slot sync and training validation
- See Also: insights.md#DISC-SYS-EQUIPMENT, schemas-by-system.md#equipment-custom-builder
- Details (first pass):
  - Schemas: BaseEquipment/BaseProperty, category-specific (weapon/armor/shield/spell focus).
  - Validation: Points caps, requires/excludes, stacking limits; storage via equipmentStorage.ts.

## Character Sheet (App)
- Inputs: calculationResult; rulesdata-derived lists
- Outputs: Rendered sections; info panels
- Invariants: Context-driven; instant updates; validation feedback
- Dependencies: All systems; E2E tests
- Key Files: docs/systems/CHARACTER_SHEET.MD; src/routes/character-sheet/**
- Open Questions: Legacy 0.9.5 field ID dependencies
 - See Also: insights.md#DISC-SYS-CHAR-SHEET, feature-system-map.md#character-sheet-display
 - Details (first pass):
   - Acceptance: changing attributes updates PD/AD and derived stats instantly; info buttons pull class/trait data; E2E specs cover resources, spells, maneuvers, currency, exhaustion.

## PDF Export (App)
- Inputs: EnhancedCalculationResult; PDF version; movement data
- Outputs: Exported PDF (editable/flattened)
- Invariants: Versioned field maps; lazy pdf-lib; acceptance checks
- Dependencies: Calculator; transformers; UI CTA
- Key Files: docs/systems/PDF_EXPORT_SYSTEM.MD; src/lib/pdf/{transformers,fillPdf.ts,fieldMap.*}
- Open Questions: Pending 0.10 template field changes
 - See Also: insights.md#DISC-SYS-PDF, schemas-by-system.md#pdf-export-dto
 - Details (first pass):
   - Versioned field maps (0.10 default, 0.9.5 legacy); transformer builds DTO; filler lazy-loads pdf-lib; movement checkboxes based on processed speeds; filename sanitization.

## Effects System (App)
- Inputs: traits/class feature effects; user choices
- Outputs: Resolved numeric modifiers and grants
- Invariants: Numeric stack sum; grants de-duplicate; valid targets
- Dependencies: character.schema Effect union; Calculator order; PDF movement
- Key Files: docs/systems/EFFECT_SYSTEM.MD; src/lib/rulesdata/schemas/character.schema.ts
- Open Questions: Additional condition interaction coverage
 - See Also: insights.md#DISC-SYS-EFFECTS, schema-inventory.md#core-effect-model
 - Details (first pass):
   - Movement grant pipeline (equal_to_speed/half/double) and condition interactions (immunity/resistance/vulnerability) aggregated for UI and PDF.

## Leveling System (App)
- Inputs: class selection & level; progression & paths; talents
- Outputs: Aggregated budgets; unlocked features; Leveling Choices
- Invariants: v0.10 max level 10; Stage required when level > 1
- Dependencies: Class System; Calculator; Creation Flow
- Key Files: docs/systems/LEVELING_SYSTEM.MD; class progressions; paths data
- Open Questions: Subclass integration timeline
 - See Also: insights.md#DISC-SYS-LEVELING, feature-system-map.md#leveling-choices-level--1
 - Details (first pass):
   - Aggregates gains from L1→target level; Leveling Choices stage budgets talents/path; path bonuses applied via service.

## Multiclass System (App)
- Inputs: character level; owned feature counts; tier selection
- Outputs: Applied multiclass feature effects; persisted selection
- Invariants: Tier level/prereq gating; one feature per talent spent
- Dependencies: Class features; Calculator aggregation; Leveling UI
- Key Files: docs/systems/MULTICLASS_SYSTEM.MD; src/lib/rulesdata/progression/multiclass.ts
- Open Questions: Counting multiclass-owned features for later tiers
 - See Also: insights.md#DISC-SYS-MULTICLASS, feature-system-map.md#leveling-choices-level--1
 - Details (first pass):
   - Six tiers gated by level/prereqs; effects attributed in calculator; selection persisted in SavedCharacter.

## Creation Flow (App)
- Inputs: context state; rulesdata lists; calculator outputs
- Outputs: Step completion; blocking errors; persisted selections
- Invariants: Fixed ordering; reducer actions; gating by calculator
- Dependencies: All systems; CharacterCreation routes; Calculator
- Key Files: docs/systems/CHARACTER_CREATION_FLOW.MD; src/routes/character-creation/**
- Open Questions: Final level-up stage wiring/resolvers
 - See Also: insights.md#DISC-SYS-CREATION-FLOW, feature-system-map.md#character-creation-wizard
 - Details (first pass):
   - Fixed stage order; reducer actions; `isStepCompleted` gating uses calculator budgets/validation; progressive class features display by level.

## Feature ID Naming (App)
- Inputs: class features/progressions
- Outputs: Stable feature & choice IDs
- Invariants: lowercase, underscore, unique, class-prefixed; stability over time
- Dependencies: Loaders; schema validation; UI mapping
- Key Files: docs/systems/FEATURE_ID_NAMING_CONVENTION.md
- Open Questions: CI validation script status
