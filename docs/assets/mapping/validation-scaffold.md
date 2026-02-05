# Validation Scaffold (First Pass)

Last updated: 2026-01-14

Purpose

- Prepare measurable checks for the deep-dive without modifying code/tests.

Counts & Spot-Checks (to verify manually or via quick scripts)

- Spells
  - Total spells by school match systems doc (Astromancy, Conjuration, etc.).
  - Each spell has sources[], school, cost.ap, sustained flag presence.
- Maneuvers
  - Count = 28; types distribution matches doc (Attack/Defense/Grapple/Utility).
- Ancestries & Traits
  - Ancestries defined (17); no orphan traits; unique IDs; negative costs flagged.
- Equipment
  - Preset counts (weapons/armor/shields/spell focuses) match options files.
- Conditions
  - IDs list aligns with CH3 and Effect System condition interactions.

Rules vs Code Consistency (targets for deep-dive)

- CH1 formulas (PD/AD/Save DC/Checks) vs calculator outputs and types.
- CH1 damage: ensure UI/help presents attacker add order and defender modification order (add/subtract → multiply/divide) and handles multiple damage types and shared damage rounding.
- CH1 MCP: repeated same‑type checks on own turn accrue DisADV (2nd DisADV 1, 3rd DisADV 2, 4th DisADV 3); reactions are exempt; Held Actions use originating turn MCP.
- CH1 DAS: simultaneous resolution path (attack/spell check vs Defense, target Save vs Save DC) with four consistent outcomes.
- CH2a reaction triggers and AP/MP/SP spend limits reflected in UI/service.
  - OA trigger set includes: leaving melee reach, drawing weapon/focus, picking up item, Object action.
  - One reaction per trigger; reactions not allowed on own turn except reacting to another reaction; AP spent on reactions reduces next turn’s AP.
  - Held Actions: AP paid upfront; if trigger not met by next turn, AP wasted; Reaction uses declared action with SP/MP spend at reaction time.
  - Acceptance stubs:
    - Spending 1 AP on a reaction decrements next turn’s AP to 3; AP refresh at end of the actor’s own turn.
    - Attempting two reactions on the same trigger is disallowed; subsequent distinct triggers later in the round are allowed if AP is available.
    - Held Action declared with two actions (Move + Attack) consumes 2 AP immediately; if only Move is possible at trigger time, Attack AP remains wasted.
    - OA: verify each trigger case (leave reach, draw weapon/focus, pick item, Object action) prompts OA when in melee range and visible.
    - Spell Duel: verify reaction is offered when seeing an MP Effect within 5 spaces; enforce AP+MP costs and MSL; on tie, prompt Wild Magic.
    - Combo Spellcasting: verify reaction is offered when seeing an MP Effect you know or a Duel initiation; applying +2 bonus and MP enhancements bounded by caster’s MSL.
- CH2b enhancement MP↔AP substitution logic represented in spell schema/UI.
  - Declaration required before roll; tally MP substitution (1 MP = 2 AP of AP Enhancements) within MSL; no carryover to damage degree from Spell Duel MP bonuses.
  - Fixed DC: represent and display fixed DC Spell Checks (e.g., Fly DC 15) alongside Save DC‑based effects consistently.
  - Acceptance stubs:
    - Combo Spellcasting: Reaction spending AP equal to base AP grants +2 to the MP effect’s Check and Save DC this turn; participants’ MP additions must stay within caster’s MSL; enhancements applied accordingly.
    - Enhancement Damage: When an enhancement deals damage, it uses the spell’s damage type unless specified otherwise.
    - Components: Casting fails without required Material component (when listed); consumed materials must be replenished; Verbal/Somatic defaults enforced.
- CH2c spell DC normalizations (fixed vs Save DC) policy.
- CH3 AoE shape semantics and visibility rules surfaced in UI (tooltips/help).
  - Jumping: Running vs Standing jump distances applied (spaces vs feet); require sufficient remaining movement; standing halves jump; high jump reach = vertical reach + high jump.
  - Falling: Damage threshold > Agility; damage = spaces fallen (cap 100); Save DC = 10 + spaces; Uncontrolled Fall DC +5 and always damage; collision sharing half spaces among targets, each rolls Physical Save vs 10 + damage taken to avoid Prone.
  - Climb/Swim: Slowed 1 without speed; long‑distance periodic checks; DC tables applied per conditions; on fail: climb=fall, swim=no move and sink.

Acceptance Checks (Agent Brief style; to attach per system later)

- CH1 (Damage):
  - Given an attack 1 base damage and Heavy Hit (+1), with Vulnerability X=1 then Resistance (Half), total equals ((1+1)+1) halved and rounded up (verify rounding behavior per examples).
  - Given two damage types (2 Bludgeoning, 2 Lightning) and a +1 situational bonus, apply per‑type resistances then add; situational bonus applies to exactly one type per rules.
- CH1 (MCP/DAS):
  - Given three Spell Checks on the same turn: 1st normal, 2nd DisADV 1, 3rd DisADV 2; a reaction Spell Check on enemy turn is normal.
  - Given a Dynamic Attack Save, verify all four outcomes map to the combination of Attack Hit/Miss and Save Success/Failure correctly.
- Background conversions and mastery caps prevent submit on errors.
- Leveling: budgets aggregate across levels and must be fully spent.
- PDF: movement checkboxes map to movement speeds; correct template version.
- CH3 (Acceptance stubs):
  - Given Agility 3 and running long jump with 6 movement left, can jump up to 3 spaces; with standing, up to 1 (half, floor by rules implicit) or 2? (confirm halving rounding); movement consumed must cover distance.
  - Given fall of 6 spaces, Agility 2: Save DC = 16; on success take 4 damage and avoid Prone; on failure take 6 damage and fall Prone.
  - Collision from 10‑space fall shared by 2 targets → 5 total to share → each takes 3 (ceil(5/2)) and rolls Physical Save vs DC 13 to avoid Prone.
  - Climbing beyond 4 spaces imposes periodic DC 10 checks without climb speed; Swimming beyond 20 spaces imposes periodic DC 10 checks without swim speed.
- CH5 (Ancestries):
  - Negative traits increase remaining points; cannot pick duplicate traits or violate requirements; refund restores points and revalidates requirements.
  - Beastborn modular choices enforce exclusivity and grant proper movement/sense effects (GRANT_MOVEMENT/GRANT_SENSE).
- CH6 (Classes):
  - Spells/maneuvers known counts match class table + path bonuses at target level.
  - Subclass features unlock at levels 3/6/9; feature choice prompts must be resolved to proceed.
  - Starting equipment appears; training penalties apply if wielded without training (per CH1/CH2 rules).

Notes

- Execute counts in a local script or via quick rg/wc checks when ready.
- Background (CH4/Background System)
  - Conversions arithmetic exactness and cap exceptions handling; languages common/fluent pricing.
- Trades
  - Tool gating (DisADV on improper tools); attribute association rendering and selection.
- Traits
  - Choice resolution coverage for any\_\*; negative trait cost effects; movement and condition grants correct targeting.
- Classes System
  - spellRestrictions enforcement (sources/schools/tags); resolver budgets and known counts; subclass unlock levels.
- Ancestry System
  - Two‑ancestry constraints; requirements/duplicates prevention; refunds; variant toggles.
- Spells System
  - Sustained flags; enhancement repeatability and costs; tag/school/source taxonomy alignment.
- Martials System
  - Maneuver count and type distribution; enhancement parsing; triggers for defense maneuvers.
- Equipment System
  - Builder validation vs doc (points, requires/excludes, stacking); training penalties linkage.
- Character Sheet
  - Immediate derived stat updates; info popups resolving by ID; unresolved choices gating.
- PDF Export
  - Versioned mapping selection; movement checkboxes; DTO validation.
- Effects System
  - Effect union completeness; condition interaction handling; choice previews.
- Leveling & Multiclass
  - Aggregated budgets; Leveling Choices gating; multiclass tier prereqs; effect attribution.
- Creation Flow & Feature IDs
  - Step gating per calculator; feature ID uniqueness and mapping.
- Background: conversions and mastery caps prevent submit; common free; fluent costs 2; exceptions allow exceeding baseline caps properly.
- Trades: DisADV applied with improper tools; attribute association displayed; DC tables used for extended tasks where relevant.
- Traits: any\_\* choices prompt exactly once; negative trait points adjust remaining correctly; movement/sense grants appear with sources.
- Classes: known counts equal class tables + path bonuses at level; subclass features unlock at 3/6/9; restrictions filter spell pickers.
- Ancestry: dual ancestry obeys constraints; requirements enforced; refund restores points; variant toggles apply.
- Spells System: sustained spells require Sustained action; enhancements repeatability and costs respected; tags filter correctly.
- Martials: maneuver count correct; enhancements parsed and repeatable where allowed; defense maneuver triggers honored.
- Equipment: builder enforces points and property constraints; training penalties applied when equipped without training.
- Character Sheet: attribute change updates PD/AD/Save DC; info buttons show correct source data; unresolved choices block submit.
- Effects: condition interactions aggregated; effect targets recognized; choice previews show delta.
- Leveling/Multiclass: budgets sum across levels; Leveling Choices must reach zero; multiclass prereqs enforced; effects attributed and persisted.
- Creation Flow/IDs: step gating consistent; feature ID uniqueness enforced by validation script.
