# Schema Gap Proposals (First Pass)

Last updated: 2026-01-14

Purpose
- Document minimal schema/shape proposals to normalize rules → code mapping. These are proposals only; no code changes made.

## 1) Effect Resolution Normalization (Spells & Maneuvers)
- Problem: Rules use multiple resolution patterns (attack vs defense, save vs Save DC, fixed DC checks, dynamic both). Current data mixes these in free text.
- Proposal: Per effect, add structured resolution metadata:
  - `rollBy`: 'caster' | 'target' | 'both'
  - `casterCheck?`: { kind: 'attack'|'spell'|'martial', vs: 'PD'|'AD'|'contest'|{ fixedDC: number } }
  - `targetSave?`: { ability: 'Might'|'Agility'|'Charisma'|'Intelligence'|'Physical'|'Mental', vs: 'SaveDC'|{ fixedDC: number }, repeated?: boolean }
  - `timing`: 'simultaneous' | 'sequential'
- Rationale: Enables consistent UI rendering (Check vs Defense, Check vs fixed DC, Save vs Save DC, Dynamic both) and validation; supports repeated saves.
- Scope: `schemas/spell.schema.ts` (and maneuver schema if needed); non‑breaking addition.

## 2) Enhancement Dependencies & Shared Roll Flags
- Problem: Some enhancements require prior enhancements (e.g., Black Hole requires Lingering); some spells (e.g., Arcane Missiles) reuse the same attack roll across targets.
- Proposal:
  - On each enhancement: `requires?: string[]` referencing IDs of prerequisite enhancements.
  - On effect/spell: `singleRollSharedAcrossTargets?: boolean` to indicate shared roll behavior.
- Rationale: Drives UI enablement and clear display; avoids ad‑hoc text parsing.
- Scope: `schemas/spell.schema.ts` (and maneuver schema for similar patterns).

## 3) Components Metadata
- Problem: Components are text; Material details and consumption are implicit.
- Proposal: `components?: { verbal?: boolean; somatic?: boolean; material?: { id?: string; consumed?: boolean } }`
- Rationale: UI can gate casting when material is missing and indicate consumption; supports future inventory ties.
- Scope: `schemas/spell.schema.ts` addition; backwards compatible.

## 4) Reaction Trigger Structs (Selected Reactions)
- Problem: Triggers (OA, Spell Duel, Combo casting) are embedded in prose.
- Proposal: For known reactions, add lightweight config (for UI helpers):
  - OA: `{ id: 'oa', prereq: 'martial_path', triggers: ['leave_reach','draw_weapon','draw_focus','pickup_item','object_action'] }`
  - Spell Duel: `{ id: 'spell_duel', range: 5, requiresMP: true }`
  - Combo Casting: `{ id: 'combo_cast', range: 5, requiresKnown: true }`
- Rationale: Prompts can be data‑driven; improves consistency.
- Scope: New config under `rulesdata/config/` or inline with action definitions.

## 5) Class Starting Equipment Schema
- Problem: Starting equipment is implied by prose; validation for training is separate.
- Proposal: structured starting equipment blocks:
  - `startingEquipment?: Array<{ id: string; options?: string[]; quantity?: number; preset?: boolean }>`
- Rationale: UI can render picks and tie into training validation; future PDF export mapping.
- Scope: `schemas/class.schema.ts` optional field; data population incremental.

## 6) Ancestry Trait Requirements Structure
- Problem: Trait prerequisites are textual; exclusivity/requirements scattered.
- Proposal: `requirements?: { size?: string[]; hasTrait?: string[]; prohibitsTraits?: string[]; choices?: Array<{ from: string[]; count: number }> }`
- Rationale: Enables validator to prevent illegal combos and to guide UI.
- Scope: trait entries in `ancestries/traits.ts`; optional fields.

## 7) Fixed DC Flag for Spell Checks
- Problem: Some spells specify fixed DC (e.g., Fly DC 15); conflated with Save DC.
- Proposal: In effect resolution (see §1), allow `fixedDC: number` on `casterCheck`/`targetSave` where applicable.
- Rationale: UI can display fixed DC cleanly side‑by‑side with Save DC flows.

Notes
- All proposals aim to be additive/optional to minimize risk.
- Deep‑dive acceptance checks and UI prompts depend on these shapes but do not require code changes yet.
