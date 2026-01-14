# RPG Systems Mapping — Context

Last updated: 2026-01-14

## Goal
Create a comprehensive, navigable map of the RPG systems described in `docs/assets/DC20 0.10 full.md` and related docs, then:
- Enumerate all systems and their boundaries and interactions.
- Map product features to those systems and sub-systems.
- Surface current code schemas for each system and analyze gaps and misalignments.
- Produce actionable recommendations for schema, data flow, and UI/service touchpoints.

## Scope
- Source of truth for rules: `../DC20 0.10 full.md` plus system docs in `../../systems/**`.
- Code touchpoints: `src/lib/rulesdata/**`, `src/lib/rulesdata/schemas/**`, `src/lib/services/enhancedCharacterCalculator.ts`, and UI under `src/routes/**` (character creation/sheet).
- Outputs: systems map, feature→system mapping, schema inventory, gap analysis, and prioritized remediation tasks.

## Constraints & Conventions
- Follow repository lint and style rules (TypeScript, React 19, Vite; Prettier + ESLint).
- Do not alter tests without explicit approval. No snapshot updates without approval.
- Keep IDs stable; avoid migrations unless specs demand them.
- Changes must be minimal, focused, and well-documented.

## Exclusions
- Spells chapter enumeration: do not read or catalog every spell in `DISC-CH2c`. Capture the chapter structure, categories, and only the first 5 spells as a representative sample.

## Threading & Compression Policy
- Discovery is chunked into small, independent units with stable IDs (e.g., `DISC-CH2b`, `DISC-SYS-SPELLS`). Each thread should reference a specific chunk ID to keep context focused and parallelizable.
- Resume markers (status, last line number, last heading, notes) are tracked in `todo.md` per chunk so any thread can pause/resume reliably.
- Conversation compression: when approaching 95% context usage, condense prior discussion into a rolling summary and append it here under Conversation Compression. Keep only the most recent operational steps uncompressed.

## Working Definitions
- System: A cohesive rule domain (e.g., Attributes, Skills, Spells, Equipment) with clear inputs/outputs.
- Feature: A product behavior or UI flow that exercises one or more systems (e.g., Character Creation, Level Up, PDF Export).
- Schema: The data types and structures used to represent a system in code.
- Mapping: The explicit linkage between a feature and the systems and data it uses.

## Approach (Phases)
1) Discover systems
- Parse primary rules docs and systems specs to enumerate systems, sub-systems, state, and derived stats.
- Capture inputs, outputs, invariants, and cross-system dependencies.

2) Inventory schemas
- Locate and catalog TypeScript types/interfaces/schemas for each system.
- Record field names, ID stability, enums, discriminants, and derived field logic.

3) Map features → systems
- List user-visible features and flows; map to the systems and data they depend on.
- Note UI components, services, calculators, and storage touchpoints per feature.

4) Gap analysis
- Compare rule requirements vs. existing schemas and code.
- Identify missing fields, mismatched types, normalization needs, and calculation edge cases.

5) Recommendations
- Propose minimal, incremental schema and service changes.
- Outline validation and test additions without modifying current tests.

## Artifacts (to be produced)
- Systems Catalog: canonical list with inputs/outputs, invariants, and cross-links.
- Feature→System Matrix: feature rows, system columns, with touchpoints.
- Schema Inventory: per-system summary of current types/interfaces.
- Gap & Risk Log: prioritized items with impact and effort notes.
- Change Proposals: scoped diffs and migration considerations (if any).

## Conversation Compression
- 2026-01-14 — User: Asked to read Markdown in `docs/assets`; confirmed presence of `DC20 0.10 full.md` and previewed headings.
- 2026-01-14 — User: Requested three files (context, todo, insights). Start with context, then verify, then todo.
- 2026-01-14 — Assistant: Creating context file to frame goals, scope, constraints, and plan.
  Compression rule: maintain ≤5% of running context as raw messages; roll up older content into this section as bullet summaries.

## Initial Assumptions
- The DC20 rules doc is authoritative where conflicts exist with older code assumptions.
- System docs under `docs/systems/**` refine/override generalities in the full rules file.
- LocalStorage-only persistence; no backend constraints.
- Acceptance will be validated using the “Agent Brief Template” style (goal, relevant systems, touchpoints, acceptance checks, constraints).

## Success Criteria
- Clear, deduplicated systems list with boundaries and dependencies.
- Traceability from each feature to the systems and code that implement it.
- Concrete, minimal recommendations to close gaps, aligned with lint/tests.
- Stakeholder can review artifacts incrementally (context → todo → insights) without reading the entire rules file.

## Open Questions (to clarify next)
- Prioritize which features first (e.g., character creation vs. sheet vs. PDF export)?
- Any legacy schemas we must preserve for compatibility beyond “ID stability”?
- Are there in-flight branches or pending specs that supersede `docs/assets/DC20 0.10 full.md`?

---
This document anchors the mapping effort. Next steps: confirm this context, then create the TODO tracker and begin the systems catalog pass.
