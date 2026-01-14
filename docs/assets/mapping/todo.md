# RPG Systems Mapping — TODO Tracker

Last updated: 2026-01-14

Status legend: [ ] not started · [~] in progress · [x] done · [>] blocked

## Milestones
- [x] Context established — see `context.md`
- [x] TODO tracker created (this file)
- [x] Systems catalog drafted
- [x] Schema inventory collected
- [x] Schemas by system documented
- [x] Feature→System mapping drafted
- [x] Gap analysis completed — see `gap-analysis.md`
- [x] Classes audit completed — see `classes-audit.md`
- [x] Recommendations drafted and reviewed
- [x] Schema proposals implemented (Phase 3A-3E)
- [x] Quick wins implemented (Phase 4A-4E)
- [x] All 13 classes patched with L5/L8 placeholders and startingEquipment

## Process Rules
- Threaded discovery: use chunk IDs (e.g., `DISC-CH1`, `DISC-CH2b`, `DISC-SYS-SPELLS`) to scope threads and parallelize safely.
- Resume markers: track status, last processed line, last heading, and notes per chunk in this file.
- Conversation compression at 95% context: summarize older discussion into `context.md` → Conversation Compression.

## Workstreams & Tasks

### 1) Discovery — Systems Catalog
- [x] Generate chapter/top-level heading index for `../DC20 0.10 full.md`.
- [x] Produce chunk list with line ranges and IDs; add to "Discovery Chunks Index".
- [x] Cross-reference rules with system specs in `../../systems/**`.
- [x] For each system, capture: purpose, inputs, outputs, derived stats, invariants, dependencies.
- [x] Note open questions and ambiguities for follow-up.
- [x] Spells chapter (DISC-CH2c): focus on categories/structure; record only the first 5 spells as examples.

### 1b) Deep Dive Pass — After First Pass Complete
- [x] For each chunk, perform a focused deep dive on tricky areas flagged in insights.
- [x] Validate formulas/examples against cross-referenced sections to ensure consistency.
- [x] Expand schema/feature touchpoints with precise fields, enums, and calculation steps.
- [x] Capture testable acceptance checks per system (Agent Brief style).

Deep Dive Notes (completed):
- CH1: Advantage/Disadvantage stacking; Damage modification order; Multiple damage types.
- CH2a: Resource formulas (AP=4, MSL=CM, SSL=CM); reaction triggers; enhancement spend limits.
- CH2b: Spell DC normalization; enhancement declaration; MP↔AP substitution enforcement.
- CH3: Breath Duration; Jumping; cover/concealment; falling/collision; climb/swim.
- CH5: Ancestry points; two-ancestry rules; Beastborn modular traits; variant rules.
- CH6: Class tables; paths/subclasses; starting equipment; spellRestrictions; Wild Form.

### CH6 Fine-Grained Deep Dive (future work)
- [ ] Enumerate each class's level table (1–10): HP/SP/MP, Skills/Trades/Attributes, Known counts.
- [ ] Verify subclass unlock levels and map subclass feature IDs (3/6/9).
- [ ] Audit starting equipment options and training alignment.
- [ ] Validate spellRestrictions against v0.10 taxonomy per class.
- [ ] Druid Wild Form: list trait/effect mapping.
- [x] ONTOLOGY Save DC discrepancy — fixed to 10 + CM + Prime.

#### Discovery Chunks Index — Rules File
Source: `../DC20 0.10 full.md`
- [x] DISC-CH1 — Core Rules (lines 1–1407)
- [x] DISC-CH2a — Combat Rules: Pre-Spellcaster (lines 1408–2299)
- [x] DISC-CH2b — Combat Rules: Spellcaster Chapter (lines 2300–2682)
- [x] DISC-CH2c — Combat Rules: Spells (lines 2683–5501)
- [x] DISC-CH3 — General Rules (lines 5502–6875)
- [x] DISC-CH4 — Character Creation Rules (lines 6876–7389)
- [x] DISC-CH5 — Ancestries (lines 7390–7852)
- [x] DISC-CH6 — Classes (lines 7853–10279)

#### Discovery Chunks Index — Systems Docs
Source: `../../systems/**`
- [x] DISC-SYS-BACKGROUND — Background System
- [x] DISC-SYS-TRADES — Trades (see `../../archive/TRADES_MULTI_ATTRIBUTE_SPEC.md`)
- [x] DISC-SYS-TRAITS — Traits System
- [x] DISC-SYS-CLASSES — Classes System
- [x] DISC-SYS-ANCESTRY — Ancestries System
- [x] DISC-SYS-ONTOLOGY — Ontology & Flows
- [x] DISC-SYS-CALC — Calculation & Derived Stats
- [x] DISC-SYS-SPELLS — Spells System
- [x] DISC-SYS-MARTIALS — Martials System
- [x] DISC-SYS-EQUIPMENT — Equipment System
- [x] DISC-SYS-CHAR-SHEET — Character Sheet Overview
- [x] DISC-SYS-PDF — PDF Export System
- [x] DISC-SYS-EFFECTS — Effects System
- [x] DISC-SYS-LEVELING — Leveling System
- [x] DISC-SYS-MULTICLASS — Multiclass System
- [x] DISC-SYS-CREATION-FLOW — Creation Flow
- [x] DISC-SYS-FEATURE-IDS — Feature IDs

#### Progress & Resume Markers (Final Status)
| Chunk | Status | Last Line/Section | Notes |
|-------|--------|-------------------|-------|
| DISC-CH1 | ✅ | 1396 / Shared Damage | Key formulas captured |
| DISC-CH2a | ✅ | 2286 / Heroic Extend Jump | Resource formulas verified |
| DISC-CH2b | ✅ | 2670 / Combo Spellcasting | Duel/Wild Magic/Combo covered |
| DISC-CH2c | ✅ | 3028 / Gravity Sink Hole | Structure enumerated |
| DISC-CH3 | ✅ | 6857 / Variable Check Examples | Jump/breath formulas added |
| DISC-CH4 | ✅ | 7385 / Level 9 Subclass Feature | Progression table drafted |
| DISC-CH5 | ✅ | 7847 / Miscellaneous | Trait costs captured |
| DISC-CH6 | ✅ | 10262 / Misc Changes | Deep dive complete |

### 2) Schema Inventory
- [x] Locate schemas/types in `src/lib/rulesdata/**` and `src/lib/rulesdata/schemas/**`.
- [x] Summarize per-system types, IDs, enums, discriminants, and computed fields.
- [x] Identify calculators/services and their data contracts.

### 3) Feature → System Mapping
- [x] List features/flows (Character Creation, Sheet, Level Up, etc.).
- [x] Map each feature to systems, UI routes/components, and services.
- [x] Record storage touchpoints and edge cases per feature.

### 4) Gap Analysis
- [x] Compare rules vs. schemas/code per system.
- [x] Log missing fields, mismatched types, normalization needs.
- [x] Flag calculation gaps and cross-system inconsistencies.
- [x] Comprehensive classes audit (13 classes).
- [x] Code hygiene: Psion class marked with `experimental: true` flag.

### 5) Recommendations
- [x] Propose minimal schema/service changes — see `schema-gap-proposals.md`
- [x] Implement schema extensions:
  - EffectResolution interface (spell.schema.ts)
  - Enhancement dependencies (SpellEnhancement.requires)
  - Material component structure (components.material)
  - TraitRequirements interface (character.schema.ts)
  - ReactionConfig (config/reactions.ts)
- [x] Calculator updates: MSL/SSL spend limits added to output
- [ ] Outline validation/tests to add (no test edits without approval).
- [ ] Prioritize remaining UI implementation work (MSL enforcement, declare-before-roll).

## Remaining Work
- [ ] UI: MSL/SSL enforcement in spell/maneuver selection
- [ ] UI: Declare-before-roll workflow for enhancements
- [ ] Data: Populate EffectResolution fields on spells
- [ ] Data: Populate TraitRequirements on ancestry traits

## Decisions Log
- 2026-01-14: Use "Agent Brief Template" style for acceptance checks.
- 2026-01-14: Completed gap analysis; documented all 13 classes missing L5/L8 features.
- 2026-01-14: Created patches/all_classes_placeholders.md.
- 2026-01-14: Implemented all class patches — L5/L8 + startingEquipment.
- 2026-01-14: Fixed ONTOLOGY.md Save DC formula (8→10).
- 2026-01-14: Renamed conditions.dats.ts → conditions.data.ts.
- 2026-01-14: Expanded SpellTag taxonomy to 50+ tags.
- 2026-01-14: Added EffectResolution, SpellEnhancement.requires, TraitRequirements interfaces.
- 2026-01-14: Created config/reactions.ts with reaction triggers.
- 2026-01-14: Added MSL/SSL to calculator output.
- 2026-01-14: Marked Psion class as experimental.

## References
- Rules source: `../DC20 0.10 full.md`
- Systems specs: `../../systems/**`
- Code touchpoints: `src/lib/rulesdata/**`, `src/lib/services/enhancedCharacterCalculator.ts`
