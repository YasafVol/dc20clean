# Schema Gap Proposals (First Pass)

Last updated: 2026-01-14

**Status: ✅ ALL IMPLEMENTED** — See commit history for 2026-01-14

Purpose
- Document minimal schema/shape proposals to normalize rules → code mapping.
- **All proposals below have been implemented in the codebase.**

## 1) Effect Resolution Normalization (Spells & Maneuvers) ✅ IMPLEMENTED
- Problem: Rules use multiple resolution patterns (attack vs defense, save vs Save DC, fixed DC checks, dynamic both). Current data mixes these in free text.
- Proposal: Per effect, add structured resolution metadata:
  - `rollBy`: 'caster' | 'target' | 'both'
  - `casterCheck?`: { kind: 'attack'|'spell'|'martial', vs: 'PD'|'AD'|'contest'|{ fixedDC: number } }
  - `targetSave?`: { ability: 'Might'|'Agility'|'Charisma'|'Intelligence'|'Physical'|'Mental', vs: 'SaveDC'|{ fixedDC: number }, repeated?: boolean }
  - `timing`: 'simultaneous' | 'sequential'
- **Implementation**: Added `EffectResolution` interface and `resolution` field to `SpellEffect` in `spell.schema.ts`.

## 2) Enhancement Dependencies & Shared Roll Flags ✅ IMPLEMENTED
- Problem: Some enhancements require prior enhancements (e.g., Black Hole requires Lingering); some spells (e.g., Arcane Missiles) reuse the same attack roll across targets.
- Proposal:
  - On each enhancement: `requires?: string[]` referencing IDs of prerequisite enhancements.
  - On effect/spell: `singleRollSharedAcrossTargets?: boolean` to indicate shared roll behavior.
- **Implementation**: Added `id` and `requires` to `SpellEnhancement`; added `singleRollSharedAcrossTargets` to `SpellEffect`.

## 3) Components Metadata ✅ IMPLEMENTED
- Problem: Components are text; Material details and consumption are implicit.
- Proposal: `components?: { verbal?: boolean; somatic?: boolean; material?: { id?: string; consumed?: boolean } }`
- **Implementation**: Extended `material` in `Spell.components` to support structured object with `itemId`, `consumed`, `goldCost`, `description`.

## 4) Reaction Trigger Structs (Selected Reactions) ✅ IMPLEMENTED
- Problem: Triggers (OA, Spell Duel, Combo casting) are embedded in prose.
- Proposal: For known reactions, add lightweight config (for UI helpers):
  - OA: `{ id: 'oa', prereq: 'martial_path', triggers: ['leave_reach','draw_weapon','draw_focus','pickup_item','object_action'] }`
  - Spell Duel: `{ id: 'spell_duel', range: 5, requiresMP: true }`
  - Combo Casting: `{ id: 'combo_cast', range: 5, requiresKnown: true }`
- **Implementation**: Created `src/lib/rulesdata/config/reactions.ts` with `ReactionConfig` interface and configs for OA, Spell Duel, Combo Casting, Combo Maneuver.

## 5) Class Starting Equipment Schema ✅ IMPLEMENTED
- Problem: Starting equipment is implied by prose; validation for training is separate.
- Proposal: structured starting equipment blocks:
  - `startingEquipment?: Array<{ id: string; options?: string[]; quantity?: number; preset?: boolean }>`
- **Implementation**: Added `startingEquipment` blocks to all 13 classes in `*_features.ts` files with weaponsOrShields, rangedWeapons, armor, packs fields.

## 6) Ancestry Trait Requirements Structure ✅ IMPLEMENTED
- Problem: Trait prerequisites are textual; exclusivity/requirements scattered.
- Proposal: `requirements?: { size?: string[]; hasTrait?: string[]; prohibitsTraits?: string[]; choices?: Array<{ from: string[]; count: number }> }`
- **Implementation**: Added `TraitRequirements` interface to `character.schema.ts` with size, hasTrait, prohibitsTraits, hasAllTraits, choices, minLevel, ancestry fields.

## 7) Fixed DC Flag for Spell Checks ✅ IMPLEMENTED
- Problem: Some spells specify fixed DC (e.g., Fly DC 15); conflated with Save DC.
- Proposal: In effect resolution (see §1), allow `fixedDC: number` on `casterCheck`/`targetSave` where applicable.
- **Implementation**: `EffectResolution.casterCheck.vs` and `targetSave.vs` both support `{ fixedDC: number }` union.

---

**Notes**
- All proposals have been implemented as additive/optional fields.
- Data population for new fields is incremental — schemas are ready, spell/trait data can be enriched over time.
- UI integration for spell resolution display is a future task.
