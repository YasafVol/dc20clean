# RPG Systems Mapping — TODO Tracker

Last updated: 2026-01-14

Status legend: [ ] not started · [~] in progress · [x] done · [>] blocked

## Milestones
- [x] Context established — see `docs/mapping/context.md`
- [x] TODO tracker created (this file)
- [x] Systems catalog drafted
- [x] Schema inventory collected
- [x] Schemas by system documented
- [x] Feature→System mapping drafted
- [x] Gap analysis completed — see `docs/mapping/gap-analysis.md`
- [x] Classes audit completed — see `docs/mapping/classes-audit.md`
- [~] Recommendations drafted and reviewed

## Process Rules
- Threaded discovery: use chunk IDs (e.g., `DISC-CH1`, `DISC-CH2b`, `DISC-SYS-SPELLS`) to scope threads and parallelize safely.
- Resume markers: track status, last processed line, last heading, and notes per chunk in this file.
- Conversation compression at 95% context: summarize older discussion into `docs/mapping/context.md` → Conversation Compression.

## Workstreams & Tasks

### 1) Discovery — Systems Catalog
- [ ] Generate chapter/top-level heading index for `docs/assets/DC20 0.10 full.md`.
- [ ] Produce chunk list with line ranges and IDs; add to “Discovery Chunks Index”.
- [ ] Cross-reference rules with system specs in `docs/systems/**`.
- [ ] For each system, capture: purpose, inputs, outputs, derived stats, invariants, dependencies.
- [ ] Note open questions and ambiguities for follow-up.
- [ ] Spells chapter (DISC-CH2c): focus on categories/structure; record only the first 5 spells as examples; do not attempt full enumeration.

### 1b) Deep Dive Pass — After First Pass Complete
- [x] For each chunk, perform a focused deep dive on tricky areas flagged in insights (e.g., damage modification ordering, ADV/DISADV stacking, Dynamic Attack Saves timing, training penalties).
- [x] Validate formulas/examples against cross-referenced sections to ensure consistency.
- [x] Expand schema/feature touchpoints with precise fields, enums, and calculation steps.
- [x] Capture testable acceptance checks per system (Agent Brief style).

Deep Dive Targets (in progress)
- CH1: Advantage/Disadvantage stacking and Variable ADV; Damage modification order; Multiple damage types handling; Confirm thresholds list. — Notes added in insights (attacker add order; defender add→multiply; per‑type; shared damage; crits and degrees).
- CH2a: Resource formulas (AP=4, MSL=CM, SSL=CM); reaction triggers/requirements and per-round gating; enhancement spend limits.
- CH2b: Spell DC normalization policy (fixed DC vs Save DC); enhancement declaration and MP↔AP substitution enforcement.
- CH3: Breath Duration formulas; Jumping numeric rules; cover/concealment application in UI. — Notes added (jump distance/run vs stand, vertical reach, falling damage/save/collision, climb/swim speeds and checks).
- CH5: Ancestry points with negative traits; two‑ancestry rules; requirements/duplicates; Beastborn modular traits modeling; variant rules. — Notes added in insights.
- CH6: Class tables/known counts; paths/subclasses; starting equipment/training; spellRestrictions mapping; hybrid handling; Wild Form modeling. — Notes added in insights.
Status: All deep-dive notes captured; proceed to Gap Analysis.

CH6 Fine‑Grained Deep Dive (planned)
- [ ] Enumerate each class’s level table (1–10): HP/SP/MP, Skills/Trades/Attributes, Known (maneuvers/cantrips/spells), Talents/Path Points.
- [ ] Verify subclass unlock levels and map subclass feature IDs (3/6/9).
- [ ] Audit starting equipment options and training alignment (weapons/armor/shields).
- [ ] Validate spellRestrictions (sources/schools/tags) against v0.10 taxonomy per class.
- [ ] Confirm path availability (martial/spellcaster/hybrid) and path bonuses merged with tables.
- [ ] Druid Wild Form: list trait/effect mapping (movement, senses, conditions) and calculator targets.
- Cross-doc: ONTOLOGY Save DC (8+ vs 10+) discrepancy — align to 10 + CM + Prime.

#### Discovery Chunks Index — Rules File
Source: `docs/assets/DC20 0.10 full.md`
- [ ] DISC-CH1 — Core Rules (lines 1–1407)
- [ ] DISC-CH2a — Combat Rules: Pre‑Spellcaster (lines 1408–2299)
- [ ] DISC-CH2b — Combat Rules: Spellcaster Chapter (lines 2300–2682)
- [ ] DISC-CH2c — Combat Rules: Spells (lines 2683–5501) — enumerate structure; sample first 5 spells only
- [ ] DISC-CH3 — General Rules (lines 5502–6875)
- [ ] DISC-CH4 — Character Creation Rules (lines 6876–7389)
- [ ] DISC-CH5 — Ancestries (lines 7390–7852)
- [ ] DISC-CH6 — Classes (lines 7853–10279)

#### Discovery Chunks Index — Systems Docs
Source: `docs/systems/**`
- [ ] DISC-SYS-BACKGROUND — Background System (`docs/systems/BACKGROUND_SYSTEM.MD`)
- [ ] DISC-SYS-TRADES — Trades Multi‑Attribute (`docs/systems/TRADES_MULTI_ATTRIBUTE_SPEC.md`)
- [ ] DISC-SYS-TRAITS — Traits System (`docs/systems/TRAITS_SYSTEM.MD`)
- [ ] DISC-SYS-CLASSES — Classes System (`docs/systems/CLASS_SYSTEM.MD`)
- [ ] DISC-SYS-ANCESTRY — Ancestries System (`docs/systems/ANCESTRY_SYSTEM.MD`)
- [ ] DISC-SYS-ONTOLOGY — Ontology & Flows (`docs/systems/ONTOLOGY.md`)
- [ ] DISC-SYS-CALC — Calculation & Derived Stats (`docs/systems/CALCULATION_SYSTEM.MD`)
- [ ] DISC-SYS-SPELLS — Spells System (`docs/systems/SPELLS_SYSTEM.MD`)
- [ ] DISC-SYS-MARTIALS — Martials System (`docs/systems/MARTIALS_SYSTEM.MD`)
- [ ] DISC-SYS-EQUIPMENT — Equipment System (`docs/systems/EQUIPMENT_SYSTEM.MD`)
- [ ] DISC-SYS-CHAR-SHEET — Character Sheet Overview (`docs/systems/CHARACTER_SHEET.MD`)
- [ ] DISC-SYS-PDF — PDF Export System (`docs/systems/PDF_EXPORT_SYSTEM.MD`)

#### Progress & Resume Markers
- DISC-CH1 — status: [~] · last_line: 1396 · last_heading: Shared Damage · notes: First-pass summary drafted; key formulas captured; needs deep-dive on Damage sections and ADV/DISADV specifics.
- DISC-CH2a — status: [~] · last_line: 2286 · last_heading: Heroic Extend Jump · notes: First-pass summary drafted; verify resource formulas and reaction triggers next.
- DISC-CH2b — status: [~] · last_line: 2670 · last_heading: Combo Spellcasting · notes: First-pass summary captured; includes Duel/Wild Magic/Combo.
- DISC-CH2c — status: [~] · last_line: 3028 · last_heading: Gravity Sink Hole · notes: Structure enumerated; sampled first 5 spells per exclusion.
- DISC-CH3 — status: [ ] · last_line: — · last_heading: — · notes: —
- DISC-CH3 — status: [~] · last_line: 6857 · last_heading: Variable Check Examples · notes: First-pass summary added; needs numeric formulas for jumps/breath and equipment property details in deep dive.
- DISC-CH4 — status: [ ] · last_line: — · last_heading: — · notes: —
- DISC-CH4 — status: [~] · last_line: 7385 · last_heading: Level 9 Subclass Feature · notes: First-pass summary drafted; needs specifics on progression table and talent requirements in deep dive.
- DISC-CH5 — status: [ ] · last_line: — · last_heading: — · notes: —
- DISC-CH5 — status: [~] · last_line: 7847 · last_heading: Miscellaneous · notes: First-pass summary added; needs trait costs/effects inventory in deep dive.
- DISC-CH6 — status: [ ] · last_line: — · last_heading: — · notes: —
- DISC-CH6 — status: [~] · last_line: 10262 · last_heading: Misc Changes · notes: First-pass summary added; deep dive will inventory class tables/features.
- DISC-SYS-* — initialize on first pass through each system doc.
 - DISC-SYS-BACKGROUND — status: [~] · last_section: §4 · last_heading: Calculation Model · notes: First-pass summary captured; verify conversions and caps alignment with CH1/Calc.
 - DISC-SYS-TRADES — status: [~] · last_section: — · last_heading: Spec cross-ref needed · notes: Multi-attribute and tools summarized; confirm canonical spec path.
 - DISC-SYS-TRAITS — status: [~] · last_section: §6 · last_heading: Testing · notes: First-pass summary captured; ensure resolveEffectChoices coverage.
 - DISC-SYS-CLASSES — status: [~] · last_section: §7 · last_heading: v0.10 Notes · notes: First-pass summary captured; inventory restrictions mapping later.
 - DISC-SYS-ANCESTRY — status: [~] · last_section: §6 · last_heading: Testing · notes: First-pass summary captured; trait linkage validated by tests.
 - DISC-SYS-ONTOLOGY — status: [~] · last_section: §3 · last_heading: Rules Ontology · notes: First-pass summary captured; update legacy spell taxonomy note in deep dive.
 - DISC-SYS-EQUIPMENT — status: [~] · last_section: §5 · last_heading: Shield System · notes: First-pass summary captured; map builder → sheet equip validation later.
 - DISC-SYS-MARTIALS — status: [~] · last_section: §6 · last_heading: v0.10 Changes · notes: First-pass summary captured; confirm maneuver counts/costs.
 - DISC-SYS-CHAR-SHEET — status: [~] · last_section: §4 · last_heading: E2E Links · notes: First-pass summary captured.
- DISC-SYS-PDF — status: [~] · last_section: §9 · last_heading: Movement Integration · notes: First-pass summary captured; verify DTO field parity.
- DISC-SYS-EFFECTS — status: [~] · last_section: §2.2 · last_heading: Condition Interaction Effects · notes: First-pass summary captured.
 - DISC-SYS-LEVELING — status: [~] · last_section: §3 · last_heading: Core Mechanics & Logic · notes: First-pass summary captured; reconcile path bonuses with calc docs.
 - DISC-SYS-MULTICLASS — status: [~] · last_section: §3 · last_heading: Implementation · notes: First-pass summary captured; prerequisite counting follow-up.
 - DISC-SYS-CREATION-FLOW — status: [~] · last_section: Stage Details · last_heading: Progressive Feature Display · notes: First-pass summary captured; align with Classes display.
 - DISC-SYS-FEATURE-IDS — status: [~] · last_section: Validation · last_heading: Validation · notes: First-pass summary captured; ensure loader validation script reference.
 - DISC-SYS-CALC — status: [~] · last_section: §9.5 · last_heading: Correct Calculation Order · notes: First-pass summary from systems doc captured.
 - DISC-SYS-SPELLS — status: [~] · last_section: §2 · last_heading: Data Shapes · notes: First-pass summary added; align schools/sources with CH2b.

### 2) Schema Inventory
- [ ] Locate schemas/types in `src/lib/rulesdata/**` and `src/lib/rulesdata/schemas/**`.
- [ ] Summarize per-system types, IDs, enums, discriminants, and computed fields.
- [ ] Identify calculators/services (e.g., `src/lib/services/enhancedCharacterCalculator.ts`) and their data contracts.

### 3) Feature → System Mapping
- [ ] List features/flows (e.g., Character Creation, Character Sheet, Level Up, Traits, Ancestries, Classes, Spells, Martials, Equipment, Trades, Backgrounds, Derived Stats/Calculation, PDF Export).
- [ ] Map each feature to systems, UI routes/components, and services.
- [ ] Record storage touchpoints and edge cases per feature.

### 4) Gap Analysis
- [x] Compare rules vs. schemas/code per system.
- [x] Log missing fields, mismatched types, normalization needs.
- [x] Flag calculation gaps and cross-system inconsistencies.
- [x] Comprehensive classes audit (13 classes) — all missing L5/L8 features and startingEquipment documented.
- [ ] Code hygiene: remove or archive experimental Psion class (not in CH6); add validation to flag classes without CLASS_METADATA.

### 5) Recommendations
- [ ] Propose minimal schema/service changes with justifications.
- [ ] Outline validation/tests to add (no test edits without approval).
- [ ] Prioritize changes (impact × effort) and note risks.

## Next Actions (short list)
- [ ] Create `docs/mapping/insights.md` scaffold to log findings by system.
- [ ] Pass 1: enumerate systems from `docs/assets/DC20 0.10 full.md` headings and `docs/systems/**` index.
- [ ] Draft Systems Catalog skeleton (one section per system) to fill progressively. — Completed (see systems-catalog.md)
- [ ] After first pass across chunks, run “Deep Dive Pass” (section 1b) per chunk.
- [x] Populate feature→system map iteratively in `docs/mapping/feature-system-map.md`.
- [x] Add landing index `docs/mapping/README.md`.
- [x] Add validation scaffold `docs/mapping/validation-scaffold.md`.
- [x] Add ID stability notes `docs/mapping/ids-stability.md`.

## Decisions Log
- 2026-01-14: Use "Agent Brief Template" style for acceptance checks on deliverables.
- 2026-01-14: Completed comprehensive gap analysis; documented all 13 classes missing L5/L8 features and 9 classes missing startingEquipment.
- 2026-01-14: Created patches/all_classes_placeholders.md with detailed implementation guide for all class patches.

## References
- Rules source: `docs/assets/DC20 0.10 full.md`
- Systems specs: `docs/systems/**`
- Code touchpoints: `src/lib/rulesdata/**`, `src/lib/rulesdata/schemas/**`, `src/lib/services/enhancedCharacterCalculator.ts`, `src/routes/**`
