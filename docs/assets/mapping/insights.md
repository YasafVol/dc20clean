# RPG Systems Mapping — Insights Log

Last updated: 2026-01-14

## How To Use

- One section per discovery chunk ID; keep entries short and structured.
- Record: summary, inputs/outputs, invariants, dependencies, open questions, schema/feature touchpoints, risks.
- Maintain resume markers (last line/heading) to support parallel threads.
- For Spells (DISC-CH2c), sample only the first 5 spells; focus on chapter structure.

## Index (Chunks)

- [ ] DISC-CH1 — Core Rules → #DISC-CH1
- [ ] DISC-CH2a — Combat Rules: Pre‑Spellcaster → #DISC-CH2a
- [ ] DISC-CH2b — Combat Rules: Spellcaster Chapter → #DISC-CH2b
- [ ] DISC-CH2c — Combat Rules: Spells (structure + first 5 only) → #DISC-CH2c
- [ ] DISC-CH3 — General Rules → #DISC-CH3
- [ ] DISC-CH4 — Character Creation Rules → #DISC-CH4
- [ ] DISC-CH5 — Ancestries → #DISC-CH5
- [ ] DISC-CH6 — Classes → #DISC-CH6
- [ ] DISC-SYS-BACKGROUND — Background System → #DISC-SYS-BACKGROUND
- [ ] DISC-SYS-TRADES — Trades Multi‑Attribute → #DISC-SYS-TRADES
- [ ] DISC-SYS-TRAITS — Traits System → #DISC-SYS-TRAITS
- [ ] DISC-SYS-CLASSES — Classes System → #DISC-SYS-CLASSES
- [ ] DISC-SYS-ANCESTRY — Ancestries System → #DISC-SYS-ANCESTRY
- [ ] DISC-SYS-ONTOLOGY — Ontology & Flows → #DISC-SYS-ONTOLOGY
- [ ] DISC-SYS-CALC — Calculation & Derived Stats → #DISC-SYS-CALC
- [ ] DISC-SYS-SPELLS — Spells System → #DISC-SYS-SPELLS
- [ ] DISC-SYS-MARTIALS — Martials System → #DISC-SYS-MARTIALS
- [ ] DISC-SYS-EQUIPMENT — Equipment System → #DISC-SYS-EQUIPMENT
- [ ] DISC-SYS-CHAR-SHEET — Character Sheet Overview → #DISC-SYS-CHAR-SHEET
- [ ] DISC-SYS-PDF — PDF Export System → #DISC-SYS-PDF
- [ ] DISC-SYS-EFFECTS — Effect System → #DISC-SYS-EFFECTS
- [ ] DISC-SYS-LEVELING — Leveling System → #DISC-SYS-LEVELING
- [ ] DISC-SYS-MULTICLASS — Multiclass System → #DISC-SYS-MULTICLASS
- [ ] DISC-SYS-CREATION-FLOW — Creation Flow → #DISC-SYS-CREATION-FLOW
- [ ] DISC-SYS-FEATURE-IDS — Feature IDs → #DISC-SYS-FEATURE-IDS

---

## DISC-CH1 — Core Rules

- Summary: Defines foundational mechanics: Attributes and Prime Modifier; Skills and Trades; Mastery systems (Skill, Trade, Language, Combat); Checks vs Saves and their formulas; Advantage/Disadvantage; Criticals and Degrees of Success/Failure; Attacks and Defenses (PD/AD); Save DC; Health/Temp HP/Thresholds/Death’s Door; Damage types/modifiers; Attack ranges; Dynamic Attack Saves.
- Inputs: Character Level; Attributes (Might, Agility, Charisma, Intelligence); Prime Attribute; Masteries (Skill/Trade/Language/Combat); Equipment (Armor/Shield bonuses); Class HP; Ancestry HP mods; Training flags (weapons/armor/shields); Tools; Conditions.
- Outputs/Derived: Prime Modifier; Combat Mastery (ceil(level/2)); Save DC (10 + Prime + CM); PD (8 + CM + Agility + Intelligence + bonuses); AD (8 + CM + Might + Charisma + bonuses); Skill/Trade/Language check results; Attack/Martial/Spell check results; HP at L1 (Class HP + Might + Ancestry HP); Temp HP behavior; Health Threshold states; Degrees of Success/Failure; Critical outcomes; Dynamic Attack Save outcomes.
- Invariants/Constraints: Attribute values typically −2..+7; Attribute Limit at start 3; Temp HP doesn’t stack; Training missing imposes DisADV or disables enhancements; Tools required for Trades; Language DCs: Mortal 10, Exotic/Divine 15, Outer 20; Repeated Saves use Save DC; Advantage/Disadvantage stacking has specific rules; Conversion rates: Skill→Trade (implied via spec), Trade→Language (1:2), Skill→Language effective 1:4.
- Dependencies/Cross-links: Classes (Class HP baseline); Ancestries (HP traits); Equipment (Armor/Shield bonuses; weapon enhancements); Spells/Maneuvers (checks, Dynamic Attack Saves); Conditions (Bleeding X); Damage Types and categories; Spellcaster Chapter + Spells list; Calculation System for derived stats.
- Schema touchpoints: attributes; primeModifier; mastery: {skill, trade, language} levels (e.g., Novice/Adept… numeric bonuses); combatMastery; training: {weapons[], armor[], shields[]}; defenses: {pd, ad, bonuses}; hp: {current, max, temp, thresholds}; saveDc; checks: standard formulas; advantageState: {permanentAdv, permanentDisadv, variable}; languages: mastery per language + category; trades: tools requirement; damage: {types[], resistance/vulnerability/immunity, reduction}; dynamicAttackSave model linking attack hit and save effect.
- Feature touchpoints: Character Creation (attributes, L1 HP, initial masteries); Character Sheet (defenses, hp, thresholds, save DC); Level Up (combat mastery, mastery increases); Checks UI (formulas and outcomes); Equipment loadout (armor/shield bonuses; training penalties); Spellcasting/Maneuvers (checks, Dynamic Attack Saves); PDF Export (surface derived stats).
- Risks/Edge cases: Variable ADV/DISADV stacking and cancellation; Multiple Check Penalty interactions; Multiple damage types and modifications ordering (add/subtract vs double/half); Shared damage distribution; Repeated Saves timing with Save DC vs opposing checks; Language checks choosing INT/CHA; Conversions between points leading to unintended loops; Physical/Mental Save category choosing higher attribute save; Lacking training effects consistency across item types.
- Open questions: Numeric mapping for Mastery levels (Novice/Adept/etc. exact values and caps); Comprehensive list of Trade Tools and enforcement; Exact rules for Advantage stacking and Variable ADV/DISADV; Ordering of damage modifications and multiple types; Representation of Damage Resistance X vs Half/Double variants; Confirm all HP threshold states beyond Bloodied; Any caps on Save DC from Prime/CM scaling.
- Resume: last_line=1396, last_heading=Shared Damage

Deep‑Dive Notes (in progress):

- Advantage/Disadvantage stacking: ADV X and DisADV X add extra d20s; combining ADV and DisADV cancels pairwise; Variable ADV/DisADV for multi‑target checks requires per‑target roll comparisons. Engine/UI should model ADV X beyond boolean (gap: no explicit ADV X type in current schemas; likely UI concern during roll helpers).
- Damage modification order: Apply Adding & Subtracting before Doubling & Halving; ensure calculator or UI sequences extra damage, vulnerabilities/resistances consistently; confirm Multiple Damage Types and Managing Damage Multiples ordering with shared damage.
- Degrees of Damage: Hit Success (each 5) adds +1 damage per 5 over Defense; Heavy Hit at +5, Brutal Hit at +10. This stacks with Critical Hits when a natural 20 also exceeds Defense thresholds.
- Critical Hits: Nat 20 auto‑hit, bypasses Damage Reduction, +2 damage. If the nat 20 does not exceed Defense by +5/+10, you still apply base +2; otherwise add Hit Success increments as well.
- Adding Damage Order (attacker side): Base damage → Heavy/Brutal/Critical bonuses → AP‑driven bonuses (maneuvers/enhancements) → situational/passive bonuses. This is distinct from defender‑side modifications.
- Defender Modifications (target side): First apply additive modifiers (Resistance X, Vulnerability X), then multiplicative (Resistance Half, Vulnerability Double). Same‑type resistance and vulnerability of the same magnitude cancel. True damage cannot be reduced.
- Multiple Damage Types: Apply resistances/vulnerabilities per damage type, then sum. Shared damage: split total per rules, rounding up; for multiple types, split per type then distribute.
- Multiple Check Penalty (MCP): During your turn, repeated attempts of the SAME check type accrue DisADV: 1st attempt normal, 2nd DisADV 1, 3rd DisADV 2, 4th DisADV 3. Applies to Attack Checks, Spell Checks, specific Skill/Trade/Flat checks. Does NOT apply outside combat. Some actions define their own repeat penalties; treat them as MCP for rules that reference MCP. Reactions on another creature’s turn are not affected (unless specified); Held Action resolution uses MCP from the turn AP was spent.
- Dynamic Attack Saves (DAS): For actions that both deal damage and impose an effect, attacker and target roll simultaneously: ATTACK (or SPELL) CHECK vs Defense determines DAMAGE; TARGET SAVE vs caster’s Save DC determines EFFECT. Outcomes: (Hit & Save Fail) damage + effect; (Miss & Save Fail) no damage + effect; (Hit & Save Success) damage only; (Miss & Save Success) neither.
- Resolution mapping (normalize in UI/schema): Check vs Defense (damage only); Check vs DC (fixed DC numeric); Check vs Save DC (effect only via save); Dynamic (both). Capturing this structure enables consistent display and validation.

## DISC-CH2a — Combat Rules: Pre‑Spellcaster

- Summary: Establishes combat resources (Action Points, Mana Points, Stamina Points, Grit Points), action economy (Actions, Minor Action, Action types), Reactions (requirements, spending, Opportunity Attack, Spell Duel), Wild Magic table, and the Martial chapter: Maneuvers (known, resources, characteristics, performance, enhancements, categories/types, advanced/combo, and extensive maneuver lists by type).
- Inputs: Character level; Attributes (for Grit = Charisma+2 per CH1); resource pools (AP/MP/SP/GP); Training flags; known maneuvers; equipment and weapons; skills for skill-based actions; conditions; positioning/ranges.
- Outputs/Derived: Max AP/MP/SP/GP; MP and SP spend limits; resource regain rules; legal actions per turn; reaction availability and triggers; held action states; maneuver execution results with durations/ranges; enhancement effects; wild magic outcomes.
- Invariants/Constraints: Resource pools cannot exceed maximums; per-turn/per-action spend limits enforced (MP/SP); reactions require explicit triggers and availability; some actions require Training or Tools; maneuvers must be known and meet resource costs; enhancements gated by resource and type; “Spell Duel” subject to specific duel flow and possibly wild magic; opportunity attacks triggered by qualifying movement/conditions.
- Dependencies/Cross-links: Spellcaster Chapter (spell action specifics); CH1 checks/saves/defenses formulas; Equipment (weapons, shields); Skills (for skill-based actions like Feint, Investigate, Medicine); Conditions; Movement/Range rules; Class features determining maneuvers known; Martials and Spells system docs.
- Schema touchpoints: resources: {ap, mp, sp, grit} with max/current, spendLimit; actions: {type, cost, tags, minorAction?}; reactions: {available, triggers[], type}; heldAction: {preparedAction, trigger}; maneuvers: {id, name, type: 'attack'|'defense'|'grapple'|'utility', cost: {ap, sp}, duration, range, effects[], requirements[], enhancements[]}; enhancements: {id, scope: 'maneuver'|'martial', cost, effect}; wildMagic: table/entries with triggers and outcomes; proficiency/training checks for action eligibility.
- Feature touchpoints: Combat UI (resource meters, action selection, minor actions); Reaction prompts (OA, Spell Duel flow); Maneuvers browser and execution; Enhancements picker; Wild Magic roll/resolve UI; Turn engine enforcing spend limits; Character Sheet reflecting known maneuvers and current resources.
- Risks/Edge cases: Conflicts between MP/SP spend limits and multi-action turns; Held Actions across rounds and interaction with initiative; Reaction spam prevention and stacking; OA triggers vs movement abilities like Pass Through; Combo maneuvers prerequisites; Enhancements stacking and cost accounting; Spell Duel + Wild Magic interactions; Resource regain timing (rests vs effects).
- Open questions: Exact formulas for max AP/MP/SP/GP and per-turn spend limits; precise triggers/requirements for Reactions and Held Actions; whether maneuvers can mix AP and SP costs; how many maneuvers known at which levels and by which classes; whether Grit can be spent in this chapter and on what; complete Wild Magic table semantics.
- Resume: last_line=2286, last_heading=Heroic Extend Jump

Deep‑Dive Notes (in progress):

- Max AP = 4 (explicit). Mana Spend Limit = Combat Mastery; Stamina Spend Limit = Combat Mastery. Verify UI enforces per‑action spend limit for MP/SP enhancements and abilities.
- Reactions: capture Opportunity Attack and Spell Duel triggers/requirements list; ensure reaction gating and availability tracked per round.
- Held Actions: Declared action + trigger; AP is spent immediately; if trigger doesn’t occur by start of next turn, AP is wasted. Reaction uses declared action, can still spend SP/MP then; Multiple Check Penalty from current turn applies to the reaction’s checks.
- Reactions Model: One Reaction per trigger; can take multiple reactions across a round if triggers occur and resources are available; spending AP on reactions reduces AP available on next turn (regained at end of your own turn). Disallow reactions on your own turn unless reacting to another creature’s reaction.
- Opportunity Attack (OA): Prereq Martial Path; Trigger: target you can see within melee range leaves your reach, draws a weapon/focus, picks up item, or takes Object action; Reaction: spend 1 AP to make a melee martial attack; can add Martial Enhancements.
- Spell Duel: Contest MP effects; challenger spends AP + MP (≤ MSL); both sides roll checks with +2×MP_spent bonus; on tie, Wild Magic triggers; resources are spent regardless. Ensure MP bonus does not apply to degree outcomes (Heavy Hit) of the MP effect itself.
- Maneuvers: Costs AP; some have SP costs; SP spend per maneuver ≤ SSL; enhancements declared before roll, repeatable unless specified. Ranges, durations, sustained behaviors mirror spells.
- Additional Reaction Nuances:
  - One reaction per trigger prevents chaining on the same event; different events in sequence can still allow multiple reactions if resources allow.
  - Reactions are not affected by Multiple Check Penalty (explicit); Held Action resolution uses MCP from the turn when AP was spent.
  - Spending all 4 AP before your turn causes your turn to immediately end; AP refreshes then.
- Reaction Triggers Checklist (from rules):
  - Opportunity Attack (OA): when a creature you can see within your melee range (i) leaves your melee range, (ii) draws a weapon or spell focus, (iii) picks up an item off the ground, or (iv) takes the Object action. Reaction: spend 1 AP to make a melee martial attack (enhancements allowed). Prereq: Martial Path.
  - Spell Duel: when you can see an MP Effect being cast, provided the caster or a target is within 5 spaces. Reaction: spend AP equal to base AP of the MP Effect and 1+ MP (≤ your MSL); both sides contest with +2×MP_spent; on tie, Wild Magic.
  - Combo Spellcasting (assist): when you can see an MP Effect you know being cast OR a Spell Duel being initiated, provided the caster or at least one target is within 5 spaces. Reaction: spend AP equal to base AP; grant +2 to the MP Effect’s Check and Save DC this turn; optionally spend MP to add enhancements up to caster’s MSL.
  - Maneuver‑specific reactions: defense maneuvers like Parry/Protect define their own triggers (e.g., when an attack is made within 1 space; if the attack still hits, share damage). See each maneuver’s trigger text.

## DISC-CH2b — Combat Rules: Spellcaster Chapter

- Summary: Covers spellcasting fundamentals: spells known and lists, AP/MP resource costs and Mana Spend Limit (equals Combat Mastery), spell characteristics (components, duration incl. Sustained, range), casting flow (Attack/Spell Check vs Defense/DC/Contest), Spell Enhancements (AP/MP spend to boost damage/area/range/targets; 1 MP can substitute for 2 AP worth of AP enhancements), categorization (Sources: Arcane/Divine/Primal; Schools; Tags), advanced interactions (Spell Duel with MP-based bonuses and Wild Magic ties; Combo Spellcasting assist with +2 and MP enhancements).
- Inputs: Known spells per class table/features/talents; spell list access per class/talent; AP/MP pools and spend limit; components availability (verbal/somatic/material); target(s) and range/LoS; checks and defenses; participant MP in duels/combos.
- Outputs/Derived: Cast eligibility (meets AP/MP/component requirements); check targets (PD/AD/Spell DC/Contests); enhancement effects and cumulative costs; per-cast MP limits; duel outcomes incl. tie → Wild Magic; combo bonuses (+2 to Check and Save DC) and applied enhancements within caster spend limit.
- Invariants/Constraints: All spells require Verbal + Somatic unless stated; Material components mandatory if listed (may consume); MP spend per spell ≤ Mana Spend Limit (CM); enhancement must be declared before check; may repeat enhancements unless stated; 1 MP → 2 AP of AP Enhancements; Spell Duel: each side gains +2×MP_spent to contest checks; resources are spent regardless of outcome.
- Dependencies/Cross-links: CH2a Combat Resources; CH1 checks/defenses/save DC; Areas of Effect; Conditions; specific Spells list; Talents and Class features for spell access; Wild Magic table.
- Schema touchpoints: spell: {id, name, sources[], school, tags[], cost: {ap, mp_min?}, range, duration, components: {verbal: true, somatic: true, material?: {consumed?: boolean, note?}}, casting: {type: 'attack'|'area-attack'|'check'|'save'|'contest', target: 'PD'|'AD'|'DC'|'Save'|'Check'}, effects: {hit?, success?, failure?, successEach5?}, enhancements[{id, name, cost: {ap?: number|repeatable, mp?: number|repeatable, xScaling?: boolean}, repeatable?: boolean, text, gating?: 'requires_Sustained'|'requires_X'}], advanced: {duel?: {...}, combo?: {...}}; manaSpendLimit = combatMastery.
- Feature touchpoints: Spellbook/known spells UI and gating by list; Casting UI (costs, components, check target); Enhancement picker with MP/AP substitution; Spell Duel prompt/resolution with Wild Magic on tie; Combo casting assist UI and MP contribution within limit.
- Risks/Edge cases: AP↔MP substitution accounting (1 MP → 2 AP) across multiple enhancements; Sustained effects and action economy; multi-target checks with single attack roll (Arcane Missiles); duel MP bonuses not applying to damage/degree outcomes; component restrictions under silence/restraint; range/origin rules for AoE.
- Open questions: Exact per-class “Spells Known” progression; material component costs/rarity modeling; any spells that override component defaults; stacking limits for specific enhancements; details of “Sources” gating with multi-source spells; how Spell DC is set for effects that use DC (likely Save DC from CH1).
- Resume: last_line=2670, last_heading=Combo Spellcasting

Deep‑Dive Notes (in progress):

- DC normalization: Spells may specify fixed DC checks (e.g., Fly: DC 15 Spell Check). Propose modeling as property on spell effect (fixedDC?: number) and normalize UI to display both fixed checks and Save DC uses consistently.
- Enhancement declaration timing and MP↔AP substitution: Ensure UI requires declaration before roll and enforces MSL; track MP substituted for AP (1:2) per cast.
- Components Enforcement: Verbal and Somatic required unless stated; Material components block casting if missing; consumed materials need replenishment.
- Normalized Resolution Proposal (schema-level):
  - For each spell effect, capture resolution in a structured way:
    - `rollBy`: 'caster' | 'target' | 'both'
    - `casterCheck?`: `{ kind: 'attack'|'spell'|'martial', vs: 'PD'|'AD'|'contest'|{ fixedDC: number } }`
    - `targetSave?`: `{ ability: 'Might'|'Agility'|'Charisma'|'Intelligence'|'Physical'|'Mental', vs: 'SaveDC'|{ fixedDC: number }, repeated?: boolean }`
    - `timing`: 'simultaneous' | 'sequential'
  - This covers: Attack vs Defense (damage), Spell Check vs fixed DC, Save vs Save DC, and Dynamic (both).

## DISC-CH2c — Combat Rules: Spells (structure + first 5 only)

- Summary: Spells section organized first by sources overview, then by Schools of Magic with individual spell entries. Each spell includes metadata (Source, School, Tags), costs (AP and sometimes MP), Range, Duration, effect text, check/attack target, and a list of specific Spell Enhancements with AP/MP costs.
- Structure/Categories: Top: “Spells Sorted by Sources” (Arcane/Divine/Primal). Then per School sections (Astromancy, Conjuration, Divination, Elemental, Enchantment, Invocation, Nullification, Transmutation) each listing spells. Entries are consistently structured and enhancement-driven.
- Sampled Spells (1–5):
  - Arcane Bolt — Source: Arcane; School: Astromancy; Tags: Bludgeoning/Piercing/Slashing; Cost: 1 AP; Range: 10; Duration: Instant. Ranged Spell Attack vs AD; Hit: 1 damage (type choice). Enhancements: Range (+5, repeatable up to 2x), Damage (+1), Arcane Missiles (1 AP+X MP add X targets, same roll), Autonomous (1 MP ignore cover/unseen penalties within seen path).
  - Arcane Wave — Source: Arcane; School: Astromancy; Tags: Bludgeoning/Deafened/Piercing/Slashing; Cost: 2 AP; Range: Self; Duration: Instant. Area Spell Attack (2‑space cone) vs AD; Hit: 1 damage (type choice). Enhancements: Damage (+1 per 1 MP), Area (+1 length per 1 MP), Fractured (1 MP create Difficult Terrain), Reverberate (X MP force Physical Save, on fail pull/push X and Deafened 1 round).
  - Banish — Source: Arcane, Divine; School: Astromancy; Tags: Incapacitated/Planes/Psychic/Teleportation; Cost: 1 AP + 2 MP; Range: 10; Duration: 1 min (Sustained). Spell Check vs Repeated Charisma Save; Success banishes target to demiplane; permanent at GM discretion if 1 minute on home plane. Enhancements: Range (+5, up to 2x), Severing Seal (1 MP 24h seal), Planar Tear (X MP aura dealing X Psychic on failed Cha Save; lasts until end).
  - Fly — Source: Arcane; School: Astromancy; Tags: Air/Embolden/Gravity/Motion; Cost: 1 AP + 3 MP; Range: 5; Duration: 10 min (Sustained). DC 15 Spell Check; Failure grants Fly Speed = 1/2 Speed; Success grants Fly = Speed; Success (5): +1 Speed. Enhancements: Range (+5 up to 2x), Duration (+1 step), Mass Fly (1 AP + X MP target X additional creatures).
  - Gravity Sink Hole — Source: Arcane; School: Astromancy; Tags: Gravity/Motion/Restrained; Cost: 2 AP + 1 MP; Range: 5; Duration: Instant. Spell Check vs Might Save in 3‑space sphere; Success: pull 1; Success each 5: +1 pull; collision damage on center. Enhancements: Range (+5 up to 2x), Area (+1 diameter), Stronger Pull (+1), Lingering (X MP Sustained 1 min with repeated Might Save), Black Hole (3 MP requires Lingering; restrains with repeated Might Save to end).
- Inputs: Class access and known spells; AP/MP availability and spend limit; target defenses/saves; Sustained action availability.
- Outputs/Derived: Attack/check results; inflicted conditions/damage; applied enhancements and resource costs; derived terrain/aura features (e.g., Fractured, Planar Tear); multi-target sharing of rolls.
- Invariants/Constraints: Follow CH2b component and enhancement rules; adhere to per-cast MP spend; respect Sustained mechanics; per-entry enhancement caps (e.g., Range max 2x) when specified.
- Dependencies/Cross-links: Schools/Tags taxonomy; Conditions; AoE rules; Damage types; CH2b Spell Duel/Combo interactions.
- Schema touchpoints: spell entry fields as per CH2b; enhancement entries often include repeatable flags and prerequisites; some spells define DCs directly (e.g., DC 15 for Fly’s baseline check) instead of contest.
- Feature touchpoints: Spell browsing by school/source/tag; casting interface with enhancement controls; Sustained tracking; condition application; terrain/aura rendering.
- Risks/Edge cases: Shared attack roll with multiple targets (Arcane Missiles); combining AP and MP enhancements within spend limits; spells that set fixed DC vs Save DC; Sustained plus Lingering/Black Hole interactions.
- Open questions: Global normalization for spell DCs that specify fixed values; consistent modeling for enhancement prerequisites and per-cast limits; how to represent “same roll across targets”.
- Resume: last_line=3028, last_heading=Gravity Sink Hole

Deep‑Dive Notes (structure-focused, sampled 1–5):

- Arcane Bolt and Arcane Wave: Attack vs AD (ranged/area); enhancements include Damage, Range/Area, and utility modifiers (e.g., Fractured terrain, Reverberate pull/push + Deafened); confirm area templates and enhancement scaling.
- Banish: Spell Check vs Repeated Charisma Save; on success, banish to demiplane/home plane; enhancements add Range, Severing Seal (24h block), Planar Tear aura (X Psychic on failed Cha Save each turn while in area). Model repeated save and persistent area effect.
- Fly: fixed DC 15 Spell Check; outcomes scale (Failure: fly = 1/2 speed; Success: fly = speed; Success (5): +1 Speed); enhancements Range, Duration step, Mass Fly (AP + X MP). Use fixedDC normalization for caster check.
- Gravity Sink Hole: Spell Check vs Might Save; pull distances and collisions; Lingering (X MP Sustained), Black Hole requires Lingering → Restrained + repeated Might Save. Capture prerequisites between enhancements.
- Cross‑cutting patterns:
  - Multi‑target single roll: Arcane Missiles uses same attack roll across added targets; model as “singleRollSharedAcrossTargets: true” (proposal) or annotate in effect text.
  - Enhancement dependencies: Mark enhancements with requires fields (e.g., Black Hole requires Lingering).
  - Damage type carryover: Enhancement damage uses base spell damage type unless overridden.

## DISC-CH3 — General Rules

- Summary: Core environment and general play rules: spaces/distance, terrain, movement (jumping, falling, climbing, swimming), breath and suffocation, vision (LoS, cover, concealment, illumination, darkvision, tremorsense, blindsight, truesight), areas of effect (arc, aura, cone, line, ring, sphere, zone), creature sizes and interactions (grapple, moving through, collision, throwing, improvised/natural weapons, non-lethal, dual wield, flanking, prone, hidden, underwater combat). Extensive equipment chapter: weapons (types, styles, properties, examples, customization), spell focuses and properties, armor and shields (types, properties, examples, customization), adventuring supplies (potions, medicine kits, nets). Comprehensive Conditions list and stacking/overlap/resistance-immunity-vulnerability rules. Rest types/terms and GM guidance on DCs and narrative techniques; Variable Attribute Rule for flexible skill checks.
- Inputs: Creature stats (size, speed); environment state (terrain, light); senses; equipment loadout; training/proficiency; conditions; rest state; DC guidelines.
- Outputs/Derived: Movement distances incl. jump/vertical reach; breath durations; cover/concealment modifiers; AoE targeting templates; weapon/focus/armor/shield effects and properties; condition applications and stacking behavior; rest recoveries; DCs set by “by 5s” guidance; application of variable attribute pairing for checks.
- Invariants/Constraints: Terrain and AoE geometry snap to spaces; cover and concealment rules determine visibility and attack modifiers; equipment training penalties (see CH1/CH2a) still apply; conditions with X stacks track intensity; condition stacking vs overlapping has explicit exclusions; rest types gate recovery; underwater combat imposes specific penalties; custom weapon/focus/armor must satisfy property requirements.
- Dependencies/Cross-links: CH1 defenses/damage; CH2 actions/resources; Equipment System doc; Conditions referenced by spells/maneuvers; PDF export needs AoE icons and property labels; Calculation System for derived defenses with equipment bonuses.
- Schema touchpoints: grid/space model; terrain flags; senses model; AoE shapes with parameters; weapon: {type: melee|ranged, style, damageType, properties[]}; focus: {type, properties[]}; armor/shield: {type, properties[], dr?}; conditions: catalog with effects, X‑scaling, resist/immune/vulnerable lists; rest: {type, recoveryEffects}; DC: tiered by 5s; variable attribute rule mapping skills↔attributes.
- Feature touchpoints: Movement and targeting UI; equipment builder/customizer; condition tracker; rest UI; DC suggestion helper; GM tools for AoE placement and cover.
- Risks/Edge cases: Collision and throwing interactions; dual wield + shield combinations; wielding two shields; underwater ranged attacks; condition exclusions/overlaps; custom equipment violating property constraints; medicine kit resupply and potions tiers mapping.
- Open questions: Exact numeric formulas for jump distances and breath; property lists for equipment and their stacking; full conditions matrix for resist/immune/vulnerable interactions.
- Resume: last_line=6857, last_heading=Variable Check Examples

Deep‑Dive Notes (in progress):

- Breath Duration: BreathDuration = Might (min 1); Calm Hold = minutes equal to BreathDuration; Stressed Hold = rounds equal to BreathDuration. Add to calculation outputs for sheet/tooltip if desired.
- Jumping specifics: confirm CH3 jump formulas vs CH1 base Jump Distance (Agility) and reconcile any differences.
- Jumping:
  - Jump Distance = Agility (min 1). Running Jump (after 2 spaces moved): Long Jump up to Jump Distance in spaces; High Jump up to Jump Distance in feet. Standing Jump halves the maximum for that jump. Must have enough remaining movement to cover the jump distance or it is shortened.
  - Vertical Reach = 1.5×height; added to High Jump to determine maximum reachable height during the jump.
- Falling:
  - Take Bludgeoning damage equal to spaces fallen if falling from height > Agility (min 1), up to 100 damage; fall Prone.
  - Agility Save DC = 10 + spaces fallen; Success: reduce damage by Agility (min 0) and don’t fall Prone. Uncontrolled Fall: DC +5 and always take damage regardless of Agility threshold.
  - Falling Collision: targets share damage equal to half the spaces fallen; each takes ceil(half / numTargets) and falls Prone unless succeeding a Physical Save (DC = 10 + damage taken).
  - Continuous Falling: if still falling at end of turn, immediately fall another 100 spaces.
  - Falling While Flying: knocked Prone while flying → fall up to 100 spaces unless magically held aloft; can spend 2 spaces of movement at start of turn to end Prone mid‑air.
- Climbing & Swimming:
  - Without climb/swim speed: Slowed 1; easy surfaces/waters don’t require checks; DC tables for difficult conditions; periodic checks for long distances (Climb: DC 10 per additional 4 spaces; Swim: DC 10 per additional 20 spaces). Fail climb: fall; fail swim: no movement and sink 2 spaces.
- Breath Loss Mechanics:
  - Speaking while holding breath reduces Breath Duration by 1. On taking damage, Must make Might Save vs max(10, 2×damage) or lose 1 round of air.

## DISC-CH4 — Character Creation Rules

- Summary: 10‑step character creation outline leading through Attributes & Prime, Save Masteries, Background (skills, trades, languages), HP, SP/MP, Defenses, Combat Modifiers, Ancestry, Weapons & Inventory; then PC progression (table), leveling up (CM, attribute points, skill/trade/language points, health, defense), Talents (requirements, general, class, multiclass), Character Paths (Martial/Spellcaster), and Paragon Subclass features at levels 3/6/9.
- Inputs: Ch1/Ch2 derived formulas; class/ancestry data; background packages; talent catalog and requirements; path selection; inventory/equipment choices.
- Outputs/Derived: Initial stats (attributes, prime, hp, defenses, resources); chosen masteries; starting proficiencies/training; known maneuvers/spells via paths/talents; inventory; ongoing progression rules and unlocks.
- Invariants/Constraints: Attribute limits at creation; talent requirements must be met; path gating for maneuvers/spells; subclass feature unlock levels fixed (3/6/9); mastery point allocations respect limits and conversions.
- Dependencies/Cross-links: Background System; Trades/Skills/Language systems; Classes and Ancestries; Talents system; Equipment rules; Calculation system for derived fields.
- Schema touchpoints: character: {attributes, primeModifier, saveMasteries, background: {skills[], trades[], languages[]}, hp, sp, mp, defenses: {pd, ad}, combatModifiers, ancestryId, classId, path: {martial|spellcaster}, subclass: {paragon: {lvl3,lvl6,lvl9}}, talents[], inventory[], training[], progression: {perLevel: {...}}}.
- Feature touchpoints: Character creation wizard; level up flow; talent picker with requirements validation; path and subclass selection; starting gear.
- Risks/Edge cases: Multiclass talent interactions; retroactive recalculations on level up; conversion between points; enforcing mastery limits; background overlaps with class features.
- Open questions: Exact Save Masteries at creation; details of Player Character Progression Table; talent requirements language to formalize; how backgrounds are represented (fixed vs pick‑lists).
- Resume: last_line=7385, last_heading=Level 9 Subclass Feature

Deep‑Dive Notes (in progress):

- 10‑Step Flow:
  - Step 1 Attributes & Prime: apply attribute points per caps; optional Prime=Cap rule; compute derived stats live.
  - Step 2 Save Masteries: initial choices or defaults (clarify exact starting save mastery rules from CH4 text if specified).
  - Step 3 Background: allocate skills/trades/languages; conversions; mastery caps validation.
  - Step 4 HP: class HP base + Might + ancestry HP mods; reflect on sheet.
  - Step 5 SP/MP: from class table/path bonuses; MSL/SSL from CM.
  - Step 6 Defenses: PD/AD from CH1 formulas + equipment bonuses.
  - Step 7 Combat Modifiers: initiative, save DC, death threshold, etc.
  - Step 8 Ancestry: pick 1 or 2; points budget and trait requirements; negative trait offsets.
  - Step 10 Weapons & Inventory: starting equipment per class; validate training penalties if lacking training.
- Leveling Up:
  - Budgets aggregate from level tables to target level; Leveling Choices stage appears for level > 1; resolve talents/path points and any subclass feature choices.
- Talents:
  - Requirements per talent; general/class/multiclass categories; ensure validation of prerequisites; attach effects via union.
- Character Paths & Paragon Subclass:
  - Paths chosen and bonuses applied; Paragon subclass features unlock at 3/6/9.
- Gaps/Proposals:
  - Ensure character creation reducer enforces step gating via calculator validation outputs (points remaining, unresolved choices).
  - Present caps and optional Prime rule clearly; save mastery initial rules confirm (explicit CH4 reference).
  - Integrate class starting equipment selection here and validate training alignment.

## DISC-CH5 — Ancestries

- Summary: Point‑based Ancestry system with Ancestry Traits. Players gain Ancestry Points, spend them on traits (Minor, Negative, Default, Expanded), and can start with 1 or 2 ancestries. Includes origins (flavor vs mechanics), appearance and lore guidance, creation flow with base traits, trait requirements/duplication rules, attribute/mastery increases, and refunds. Variant rules for custom ancestries, variable negativity, power scaling, adoption, and “ancestry magic items”. Defines canonical ancestry sets (Human, Elf, Dwarf, Halfling, Gnome, Orc, Dragonborn, Giantborn, Angelborn, Fiendborn, Beastborn) with default/expanded trait lists; Beastborn uses modular Beast Traits (Senses, Mobility, Jumping, Flying, Body, Natural Weapons, Misc).
- Inputs: Available ancestry points; ancestry selection (one or two); trait catalogs per ancestry; trait requirements; optional variant rules toggles.
- Outputs/Derived: Final trait set; attribute/mastery modifications from traits; derived features (senses, movement, resistances, etc.).
- Invariants/Constraints: Trait requirements must be met; handling for duplicates; negative traits can grant points per rules; two‑ancestry starting follows constraints; refunds allowed per guidelines.
- Dependencies/Cross-links: Background and Classes (synergies/conflicts); Equipment and Conditions impacted by traits; Calculation system for derived stats changes; Trait System doc.
- Schema touchpoints: ancestry: {id, name, baseTraits[], defaultTraits[], expandedTraits[]}; trait: {id, name, type: 'minor'|'negative'|'default'|'expanded', cost: +/-points, effects[], requirements[]}; character.ancestry: {primaryId, secondaryId?}; ancestryPoints/current; variantRules flags.
- Feature touchpoints: Ancestry picker; trait selection UI with requirements validation and point budget; variant rules toggles; Beastborn trait configurator.
- Risks/Edge cases: Trait stacking limits; negative trait exploitation; interactions yielding strong combos; dual ancestry conflicts; refunds sequencing.
- Open questions: Exact costs and effects for each trait; caps on trait categories; how to encode flexible Beast Traits in schema (slot‑based?).
- Resume: last_line=7847, last_heading=Miscellaneous

Deep‑Dive Notes (in progress):

- Point Budgeting & Negative Traits:
  - Ancestry Points purchase traits. Negative Traits grant points (isNegative: true) and should reduce cost (negative value) while adhering to Variable Negativity toggles (variant rule).
  - Duplicate prevention: cannot take the same trait twice; some traits may be mutually exclusive; requirements must be satisfied prior to purchase.
- Two‑Ancestry Start:
  - Starting with 2 ancestries follows special constraints (e.g., limited trait picks, cost rules); ensure UI enforces limits and resolves conflicts.
- Trait Requirements & Refunds:
  - Requirements define prerequisites (e.g., size/type/movement), and refund rules allow undo with proper point recalculation; capture requirements as structured data where possible.
- Attribute/Mastery Increases:
  - Some traits grant attribute increases or mastery cap exceptions; ensure effects use canonical targets (MODIFY*ATTRIBUTE, MODIFY*\*\_MASTERY_CAP).
- Beastborn Modular Traits:
  - Beast traits compiled by category (Senses/Mobility/Jumping/Flying/Body/Natural Weapons/Misc); model choices to avoid illegal combinations; some grant movement via GRANT_MOVEMENT (equal_to_speed or fixed speeds).
- Variant Rules:
  - Custom ancestries, Variable Negativity, stronger/weaker ancestries, adoption, and ancestry “magic items”; treat as configuration flags that unlock additional trait pools or cost adjustments.
- Gaps/Proposals:
  - Structured requirement language (e.g., requires: { size?: ..., hasTrait?: [...], prohibitsTraits?: [...] }).
  - Choice prompts for modular categories; validator for mutually exclusive groupings.
  - ID stability: maintain `<ancestry>_<snake_case_trait>` convention; tests enforce zero orphan traits.

## DISC-CH6 — Classes

- Summary: Defines all playable Classes (Martial and Spellcaster lists) with per-class: class table, starting equipment, path selection (Martial/Spellcasting as applicable), class features, and subclasses. Includes Druid Wild Form traits and a full 0.10 Changelog covering classes and system-wide updates.
- Inputs: Class selection; level; subclass choice; path selection; starting equipment; ancestry/background synergies.
- Outputs/Derived: Spells known or maneuvers known by level; granted features and scaling; training proficiencies; starting gear; subclass features at appropriate levels.
- Invariants/Constraints: Class tables gate progression; subclass availability and levels fixed; starting equipment options constrained per class; path must be compatible with class (e.g., Spellblade both paths).
- Dependencies/Cross-links: CH4 leveling; CH2A/B resources/actions and spellcasting; Maneuvers and Spells catalogs; Equipment; Talents; Traits and Backgrounds.
- Schema touchpoints: class: {id, name, category: 'martial'|'spellcaster'|'hybrid', table: [...levels...], startingEquipmentOptions[], pathAvailability: {martial?: boolean, spellcasting?: boolean}, features[{id, level, effect}], subclasses[{id, name, features[...] }], known: {spellsByLevel?, maneuversByLevel?}}; druidWildFormTraits catalog.
- Feature touchpoints: Class picker; level progression display; feature unlock UI; starting equipment chooser; subclass selection.
- Risks/Edge cases: Hybrid class (Spellblade) interactions; scaling of known spells/maneuvers; starting equipment conflicts with training; subclass feature stacking with talents.
- Open questions: Exact contents of each class table; precise starting equipment lists; full feature text per class; mapping from class to spell/maneuver lists and restrictions.
- Resume: last_line=10262, last_heading=Misc Changes

Deep‑Dive Notes (in progress):

- Class Tables & Known Counts:
  - Per‑level: HP/SP/MP, Skills/Trades/Attributes points, Maneuvers/Cantrips/Spells known, Talents/Path Points; ensure UI reads from tables/resolver and sums correctly to target level.
- Paths & Subclasses:
  - Paths (Martial/Spellcaster) availability by class; subclass features unlocked at levels 3/6/9; hybrid Spellblade exposes both paths.
- Starting Equipment & Training:
  - Starting equipment lists per class; training (weapons/armor/shields) effects must align with CH1/CH2 penalties if lacking training.
- Features & Effects:
  - Features use Effect union conventions; choice‑based features prompt and persist; effect types reuse canonical targets.
- Spell Restrictions & Schools/Tags:
  - Classes define access by Sources (Arcane/Divine/Primal) and further restrictions by Schools/Tags through spellRestrictions; slot‑based spells known (global + specialized slots) govern UI pickers.
- Druid Wild Form Traits:
  - Model as trait effects or class‑scoped abilities; may grant movement, senses, or condition interactions — use GRANT_MOVEMENT/GRANT_SENSE/condition effect types accordingly.
- Gaps/Proposals:
  - Ensure starting equipment schema is explicit (options, presets) and ties into equipment training validation.
  - Normalize progression resolver output to match calculator inputs (budgets and unlocked features lists) and annotate pending feature choices.
  - Validate spellRestrictions mapping against v0.10 taxonomy (sources/schools/tags) across all classes.

## DISC-SYS-BACKGROUND — Background System

- Summary: Background governs Skills, Trades, and Languages with point budgets, conversions, mastery caps, and UI wiring. Canonical data in `skills.ts`, `trades.ts`, `languages.ts`; calculator computes base budgets, applies conversions and mastery cap validation.
- Inputs: Intelligence; progression gains; effects modifying pools; conversion counts; per-skill/trade mastery ranks; language fluency selections.
- Outputs/Derived: Base and available points for skills/trades/languages; usage counts; mastery cap validation block (caps, current counts, canSelect flags); denormalized mastery ladders for PDF.
- Invariants/Constraints: Conversion formulas; common language free; mastery caps by level with exceptions via effects; stable IDs and allowed attribute associations.
- Dependencies/Cross-links: Calculation System; Trait and Class effects that modify pools or caps; Character Sheet and PDF transformers.
- Schema touchpoints: ISkillData/ITradeData/ILanguageData; calculator background block; Effect types (MODIFY_STAT skillPoints/tradePoints/languagePoints; mastery cap effects).
- Feature touchpoints: Background tabs with conversions; validation errors disable submit; PDF export uses denormalized totals when present.
- Risks/Edge cases: Conversion loops leading to overspend; languages costing double for fluent; ensuring masteries obey caps including base Adept slot.
- Open questions: Any non-standard languages (outer/divine) needing special DCs in UI? Multi-attribute trades detail alignment with Trades spec.
- Resume: last_section=§4 Calculation Model

Deep‑Dive Notes (in progress):

- Conversions: availableSkillPoints = baseSkillPoints - skillToTrade + floor(tradeToSkill/2); availableTradePoints = baseTradePoints - tradeToSkill + (skillToTrade*2) - tradeToLanguage; availableLanguagePoints = baseLanguagePoints + (tradeToLanguage*2). Confirm UI reflects calculator and disallows overspend.
- Caps & Exceptions: Baseline level caps from levelCaps.ts; unlimited tiers up to natural cap; base Adept slot at L1; effects grant exceptions (MODIFY*/INCREASE*\*\_MASTERY_CAP). Ensure error codes surface and block submit.
- Languages: Common free; fluent costs 2, limited 1; ensure not double-counted.
- Output denorm: mastery ladders and knowledge trades for PDF; keep source breakdowns.
- Gaps: Display helpers for multi‑attribute trades and language DC reminders; ensure conversions cannot loop exploitatively beyond intended math.

## DISC-SYS-TRADES — Trades Multi‑Attribute

- Summary: Multi-attribute trades allow primary and associated attributes to contribute; encoded with `primaryAttribute` and `attributeAssociations[]`. Tool requirements and conversions integrate with Background.
- Inputs: Trade mastery levels; associated attributes; tool availability; conversions.
- Outputs/Derived: Trade check attribute selection guidance; display strings; tool validation.
- Invariants/Constraints: Attribute associations from allowed set; tools gate checks; mastery caps apply.
- Dependencies/Cross-links: Background system; Calculation; Equipment/tools; CH1 Trade Checks.
- Schema touchpoints: ITradeData fields; UI rendering of associations.
- Feature touchpoints: Trades tab shows multi-attribute options and tool notes.
- Risks/Edge cases: Ambiguity when multiple attributes could apply; toolless attempts applying DisADV.
- Open questions: Confirm canonical spec path for multi-attribute rules.
- Resume: last_section=Spec cross‑ref needed

Deep‑Dive Notes (in progress):

- Primary and associated attributes: display selectable attribute for trade checks when rule permits; pair with CH1 Variable Attribute Rule for flexible checks.
- Tools: enforce tool requirement; DisADV when using improper tools; surface in UI.
- Long‑distance/extended tasks: link to CH3 long‑distance checks patterns where appropriate.
- Gaps: Standardize rendering of attribute associations and tool notes; propose `attributeAssociations: string[]` use in UI forms.

## DISC-SYS-TRAITS — Traits System

- Summary: Traits data and effect typing; calculator aggregation and choice resolution; tests enforce structure and relationships. Emphasizes reuse of existing `Effect.type` strings and correct targets.
- Inputs: Selected ancestry traits; effect arrays; user choices for `any_*` effects.
- Outputs/Derived: Resolved effects; numeric breakdowns; grants (abilities, senses, movements); validation test coverage.
- Invariants/Constraints: Stable ancestry-prefixed IDs; valid effect targets; negative trait costs validated; all effects include target field.
- Dependencies/Cross-links: Effect System; Ancestry System; Calculation System; Character Sheet.
- Schema touchpoints: ITrait/ITraitEffect; Effect union; resolveEffectChoices support for any_attribute/skill/trade.
- Feature touchpoints: Ancestry selection UI and trait pickers; breakdown displays; choice prompts.
- Risks/Edge cases: New effect types without schema/calculator updates; missing userChoice wiring; mp vs mpMax targets.
- Open questions: Additional any\_\* patterns planned?
- Resume: last_section=§6 Testing

Deep‑Dive Notes (in progress):

- Effect targets: prefer hpMax/spMax/mpMax for maxima; avoid mp/sp; use GRANT_MOVEMENT with value formulas (equal_to_speed/half_speed) and condition interaction effects as documented.
- Choice resolution: any*attribute/any_skill/any_trade prompts once; persist; ensure resolveEffectChoices is exhaustive for current any*\* patterns.
- Negative trait costs: `isNegative: true` and negative cost values; ensure points remain consistent and refund works.
- Tests: rulesdata.spec.ts and ancestries tests enforce structure; keep IDs stable.
- Gaps: Add additional any\_\* patterns as needed via resolveEffectChoices; document new effect types in Effect System before adding.

## DISC-SYS-CLASSES — Classes System

- Summary: Class progression and features data, validation via loaders/specs, and calculator integration. Slot-based spell restrictions and v0.10 notes covered.
- Inputs: Class progression tables; feature definitions; spellRestrictions; level/subclass choices.
- Outputs/Derived: Granted features; maneuvers/spells known; path points/talents; starting equipment.
- Invariants/Constraints: Schema validation on load; IDs and naming conventions; effects reuse preferred.
- Dependencies/Cross-links: Calculation; Spells/Martials; Effect System; Character Sheet.
- Schema touchpoints: IClassDefinition/IClassFeature; class.schema zod effects; loaders.
- Feature touchpoints: Class selector; feature UI; spell/maneuver availability.
- Risks/Edge cases: Hybrid dual path handling; feature choice resolution; restrictions sync with spells.
- Open questions: Additional classes beyond 1–10?
- Resume: last_section=§7 v0.10 Notes

Deep‑Dive Notes (in progress):

- Loaders & Zod: schema validation for features/progression; IDs follow naming conventions; add optional starting equipment schema for better UI.
- spellRestrictions: centralize source/school/tag constraints; align to v0.10 taxonomy; audit per class.
- Known counts: resolver returns unlockedFeatureIds and counts; calculator aggregates budgets; expose pending feature choices.
- Gaps: Normalize resolver outputs to calculator expectations; ensure hybrid class (Spellblade) presents both paths cleanly.

## DISC-SYS-ANCESTRY — Ancestries System

- Summary: Ancestry catalog plus trait lists; schema validation; calculator integration. Mirrors Traits but includes ancestry objects and lists.
- Inputs: Ancestry selections; referenced trait IDs; effects from traits.
- Outputs/Derived: Aggregated effects; ancestry points accounting when modified by features.
- Invariants/Constraints: Non-empty trait lists; unique IDs; rulesSource validity; zero orphan traits.
- Dependencies/Cross-links: Traits; Calculation; character creation UI.
- Schema touchpoints: IAncestry; traits linkage; character.schema effects.
- Feature touchpoints: Ancestry selector and trait chooser.
- Risks/Edge cases: Duplicate trait references; mixing default/expanded incorrectly.
- Open questions: Custom ancestry flow planned?
- Resume: last_section=§6 Testing

Deep‑Dive Notes (in progress):

- Trait linkage: zero orphan traits; unique IDs; non‑empty lists; valid rulesSource values.
- Variant toggles: expose config for Custom Ancestries, Variable Negativity, etc.
- Gaps: Add structured requirements to trait entries for robust validation.

## DISC-SYS-ONTOLOGY — Ontology & Flows

- Summary: High-level map of UI stages, services, and rules data; enumerates stages (Class, Ancestry, Attributes, Background, Spells/Martials, Naming, Finalize) and services.
- Inputs: Build data from UI stages; rulesdata catalogs; services outputs.
- Outputs/Derived: Calculated character; PDF artifacts.
- Invariants/Constraints: Stage order; provider context; some legacy spell taxonomy present.
- Dependencies/Cross-links: Character creation routes; calculator; spellAssignment; PDF export.
- Schema touchpoints: References types in services/rulesdata.
- Feature touchpoints: Creation flow UX; validation feedback; load/export.
- Risks/Edge cases: Drift vs v0.10 rules.
- Open questions: Update to sources/schools/tags taxonomy.
- Resume: last_section=§3 Rules Ontology

Deep‑Dive Notes (in progress):

- Drift: Update Save DC baseline (use 10 + CM + Prime, not 8) and spell taxonomy (sources/schools/tags) to v0.10.
- Flow: ensure Leveling Choices stage documented and matches current UI.

## DISC-SYS-CALC — Calculation & Derived Stats

- Summary: Canonical formulas and ordering: CM, prime attribute logic (optional cap rule), HP/SP/MP, PD/AD, Save DC, initiative, checks, background budgets/conversions, progression gains, mastery cap validation via `levelCaps.ts`, effect breakdowns, movement grant processing, and recent fixes (rest points timing).
- Inputs: buildData (level, class, ancestries, traits, path allocations, attributes, skills/trades/languages), resolved effects, progression tables.
- Outputs/Derived: final attributes; resources; defenses; save DC; movement; breakdowns; validation statuses; background budgets; martial check.
- Invariants/Constraints: Apply effects before deriving dependent values; use `levelCaps.ts` caps; movement processed after speed finalized; Save DC = 10 + CM + Prime; CM = ceil(level/2).
- Dependencies/Cross-links: Effect System; Background System; Equipment bonuses; UI hooks; PDF export.
- Schema touchpoints: calculationResult; breakdown entries; Effect union targets; level caps; path bonuses.
- Feature touchpoints: Character builder live stats; validation errors; PDF export; movement checkboxes.
- Risks/Edge cases: Prime cap toggle; conversion overspend; ordering errors; effect target naming (mp vs mpMax); tie-breaker for prime attribute.
- Open questions: Confirm tie-break order vs rules doc; Save DC baseline matches CH1 (10) — aligned.
- Resume: last_section=§9.5 Correct Calculation Order

Deep‑Dive Notes (in progress):

- Effect order: apply breakdowns before dependent stat calculations (rest points, initiative, martial check, etc.).
- Movement processing after finalMoveSpeed; equal_to_speed conversions use numeric ground speed.
- Gaps: Document tie‑break order for prime attribute selection and ensure code matches rules.

Deep‑Dive Notes (in progress):

- Ontology mismatch: ONTOLOGY.md mentions Save DC = 8 + CM + Prime; v0.10 + calculator use 10 + CM + Prime. Document as known discrepancy; align docs to 10.
- Effect target safety: ensure mpMax/spMax targets are used (not mp/sp) when granting maxima; this is already emphasized in docs.

## DISC-SYS-SPELLS — Spells System

- Summary: Centralized spell data model (125 spells) grouped by School with Sources and Tags; assignment rules via `spellRestrictions`; enhancements with AP/MP costs; sustained flag; utility query functions; calculator integration for MP.
- Inputs: class access (sources + restrictions), character selections, MP/Spend Limit, spell data.
- Outputs/Derived: available/known spell sets; sustained states.
- Invariants/Constraints: Sources determine access; no predefined lists; sustained spells require per-turn action; tags support filtering and references.
- Dependencies/Cross-links: Spellcaster rules (CH2b); Calculation (MP); UI routes; Effect system (if spells emit effects).
- Schema touchpoints: `Spell` interface (id, name, sources[], school, tags[], isCantrip, cost, range, duration, sustained, effects[], enhancements[]); utility lookups.
- Feature touchpoints: Spell pickers; character sheet spellbook; filters; enhancement UI.
- Risks/Edge cases: Keeping restrictions synced with v0.10; sustained accounting; cantrip passives.
- Open questions: Shape of `spellRestrictions`; multi-source mapping; fixed DC representation.
- Resume: last_section=§2 Data Shapes

Deep‑Dive Notes (in progress):

- Counts by School: verify total spells per school; sustained flag presence; enhancements repeatability and costs.
- Tags and taxonomy: ensure tags align with rules doc; sources & schools consistent.
- Utilities: verify lookup functions and filters used by pickers.
- Gaps: Add effect resolution metadata; enhancement dependency flags; components metadata (material consumed).

## DISC-SYS-MARTIALS — Martials System

- Summary: Maneuvers data and schema; selection/validation; UI flows; v0.10 updates (techniques removed, AP/SP costs, enhancements).
- Inputs: Class/path grants; level; selected maneuvers.
- Outputs/Derived: Known maneuvers and counts; reaction flags; enhancements list.
- Invariants/Constraints: Eligibility and known limits; schema-enforced.
- Dependencies/Cross-links: Combat resources; Classes; Character Sheet.
- Schema touchpoints: Maneuver interface; enhancements; type enum.
- Feature touchpoints: Selection UI; sheet display.
- Risks/Edge cases: Cost parsing vs costString; trigger/requirement conditional display.
- Open questions: Monk stances integration timeline.
- Resume: last_section=§6 v0.10 Changes

Deep‑Dive Notes (in progress):

- Maneuver count and type distribution; enhancement parsing (SP/AP, repeatable flags); reaction‑based maneuvers triggers.
- Costs and SSL: enforce SP≤SSL per maneuver; declare enhancements before roll.
- Gaps: Consider mirroring effect resolution metadata for maneuvers that impose effects (save vs Save DC).

## DISC-SYS-EQUIPMENT — Equipment System

- Summary: Custom equipment builder for weapons/armor/shields/spell focuses with options, validation, storage, and UI flows.
- Inputs: User selections; property choices; point budgets; training state.
- Outputs/Derived: Custom equipment items; validation results; storage entries.
- Invariants/Constraints: Points caps; requirements/exclusions; stacking limits; training penalties elsewhere apply.
- Dependencies/Cross-links: CH1/CH3 equipment effects; Character Sheet inventory; PDF mapping; Calculation for defense bonuses.
- Schema touchpoints: Base and category schemas; options catalogs; validator.
- Feature touchpoints: Equipment UI; saved list; equip/wield interactions.
- Risks/Edge cases: Property stacking conflicts; two shields; thrown/returning; reload mechanics.
- Open questions: Sync builder items with equip slots and training validation.
- Resume: last_section=§5 Shield System

Deep‑Dive Notes (in progress):

- Builder validation: points caps; requires/excludes; stacking limits; preset imports.
- Training penalties: integrate CH1/CH2 training rules when equipped without training.
- Gaps: Propose starting equipment schema; ensure property semantics align with CH3 property lists.

## DISC-SYS-CHAR-SHEET — Character Sheet Overview

- Summary: Character sheet section map and sources; acceptance checks; E2E links.
- Inputs: calculationResult slices; rulesdata lists.
- Outputs/Derived: Rendered stats and lists.
- Invariants/Constraints: Context-driven updates; validation feedback.
- Dependencies/Cross-links: All systems; E2E tests.
- Schema touchpoints: EnhancedCalculationResult reference.
- Feature touchpoints: Sheet UI.
- Risks/Edge cases: Instant updates across sections; info buttons sources.
- Open questions: Any lingering 0.9.5 field dependency in UI.
- Resume: last_section=§4 E2E Links

Deep‑Dive Notes (in progress):

- Reactivity: attributes and backgrounds update derived stats immediately; unresolved choices block navigation; info buttons pull IDs from class/traits.
- Gaps: Confirm any lingering legacy 0.9.5 PDF assumptions not reflected in UI.

## DISC-SYS-PDF — PDF Export System

- Summary: Client-only PDF export pipeline with versioned field maps; transformers map EnhancedCalculationResult to DTO and fill templates.
- Inputs: EnhancedCalculationResult; PDF version; movement data; inventory.
- Outputs/Derived: Blob (editable or flattened).
- Invariants/Constraints: Versioned maps; lazy pdf-lib; acceptance checks.
- Dependencies/Cross-links: Calculator; transformers; UI export.
- Schema touchpoints: PdfExportData DTO + Zod; field maps.
- Feature touchpoints: Export button.
- Risks/Edge cases: Template mismatch; movement checkbox logic; filename sanitization.
- Open questions: Pending 0.10 template field ID changes?
- Resume: last_section=§9 Movement Integration

Deep‑Dive Notes (in progress):

- Versioned mapping: default 0.10; legacy 0.9.5; transformer validates DTO via Zod.
- Movement checkboxes: half/full based on speed relations; hold breath present.
- Gaps: Audit field IDs against template updates; ensure filename sanitization follows pattern.

## DISC-SYS-EFFECTS — Effect System

- Summary: Canonical effect types, targets, choice resolution, and stacking rules used across traits and class features. Includes condition interaction effects and GRANT_MOVEMENT spec.
- Inputs: Trait and class feature effects arrays; user choices for any\_\* targets.
- Outputs/Derived: Resolved numeric modifiers and grants passed to calculator and UI aggregators (conditions, movements, abilities).
- Invariants/Constraints: Numeric stack sum; grants de-duplicate; targets must match calculator expectations; movement targets lowercase and recognized.
- Dependencies/Cross-links: Character schema Effect union; Calculation application order; PDF transformers for movement; Conditions UI for condition interactions.
- Schema touchpoints: Effect union in `schemas/character.schema.ts`; conditionAggregator; movement processing in calculator.
- Feature touchpoints: Traits/classes selection flows; movement and conditions displays; info buttons.
- Risks/Edge cases: Introducing new effect types without full pipeline updates; mis-typed targets; choice resolution gaps.
- Open questions: Additional condition interaction types (duration modifiers?) or global effect stacking rules.
- Resume: last_section=§2.2 Condition Interaction Effects

Deep‑Dive Notes (in progress):

- Union completeness: ensure all used effect types exist in union; numeric targets consistent; grant aggregators deduplicate.
- Choice handling: centralize any\_\* prompts; persistence keyed by trait/effect indices.
- Gaps: Document any new effect families before use; ensure UI can preview effect impacts.

## DISC-SYS-LEVELING — Leveling System

- Summary: Level 1–10 leveling pipeline integrated with creation; calculator aggregates progression gains up to target level; conditional Leveling Choices stage for talents and path points; path bonuses applied to SP/MP and knowns.
- Inputs: Selected class and target level; class progression files; talents catalog; paths data; subclass choices (planned).
- Outputs/Derived: Aggregated budgets (attribute/ancestry/background points, talents, path points), unlocked features list, known spells/maneuvers increments.
- Invariants/Constraints: DC20 v0.10 caps at level 10; Leveling Choices required when level > 1; budgets must be fully spent to proceed.
- Dependencies/Cross-links: Class System; Calculation System; Character Creation Flow; Multiclass System.
- Schema touchpoints: class progression `LevelGains`; talents types; `EnhancedCharacterBuildData.pathPointAllocations`.
- Feature touchpoints: Level selector; Leveling Choices UI; budget counters and validation.
- Risks/Edge cases: Ordering of applying path bonuses vs class gains; UI gating on unresolved choices; techniques removed yet referenced in legacy notes.
- Open questions: Subclass selection integration timeline; unit tests coverage status.
- Resume: last_section=§3 Core Mechanics & Logic

Deep‑Dive Notes (in progress):

- Aggregation: sum gains from L1→target level; expose per‑stage budgets; pending subclass choices surfaced.
- Stage gating: Leveling Choices requires spending all points; errors block Next.
- Gaps: Confirm subclass integration UX and persistence of multiclass alongside level budgets.

## DISC-SYS-MULTICLASS — Multiclass System

- Summary: Talent-point driven acquisition of features from other classes across 6 tiers with level/prereq gating; UI flow in Leveling Choices; effects applied via calculator aggregation with attribution.
- Inputs: Character level; owned features/subclass features counts; selected tier/class/feature.
- Outputs/Derived: Added effects from selected feature; persisted multiclass selection.
- Invariants/Constraints: Tier gating by level and prerequisites; one feature per talent spent; path features excluded.
- Dependencies/Cross-links: Class features data; Calculation effects aggregation; Leveling System UI.
- Schema touchpoints: MULTICLASS_TIERS, SavedCharacter multiclass fields.
- Feature touchpoints: Tier picker; feature cards; validation of prerequisites.
- Risks/Edge cases: Counting owned features accurately; subclass feature availability across tiers; persistence on respec.
- Open questions: Counting multiclass-owned features towards future prerequisites.
- Resume: last_section=§3 Implementation

Deep‑Dive Notes (in progress):

- Tier gating: enforce level and prerequisite counts; class vs subclass feature selection per tier.
- Effect attribution: attribute source metadata for breakdowns; persist selected class/feature/tier.
- Gaps: Counting multiclass‑owned features toward future tier prerequisites.

## DISC-SYS-CREATION-FLOW — Creation Flow

- Summary: Canonical multi-stage flow ordering, contracts, and validation gating; calculator drives completion via budgets and validation; planned Level-Up stage for level > 1 with budgets (talents/path/multiclass).
- Inputs: Character context state; rulesdata lists; calculator outputs.
- Outputs/Derived: Step completion booleans; blocking errors; selections persisted through context.
- Invariants/Constraints: Fixed ordering; reducer actions; isStepCompleted gating.
- Dependencies/Cross-links: All systems; calculator; UI routes.
- Schema touchpoints: Not a data schema; defines state contracts and actions.
- Feature touchpoints: Creation wizard UX; progressive feature display by level.
- Risks/Edge cases: Drift between stage contracts and actual components; ensuring budgets exactly hit requirements before proceed.
- Open questions: Final form of Level-Up stage wiring and resolvers.
- Resume: last_section=Stage Details

Deep‑Dive Notes (in progress):

- Step gating: use calculator validation (overbudget, mastery caps, unresolved choices) to block steps; maintain order.
- Progressive display: class features grouped by level; feature choices appear within level sections.
- Gaps: Save mastery initial rules integration; starting equipment integrated into flow where appropriate.

## DISC-SYS-FEATURE-IDS — Feature IDs

- Summary: Naming convention for class feature IDs and choice IDs to ensure consistency across features and progressions; includes subclass and recurring talents patterns and conversion rules.
- Inputs: New/updated class features and progressions.
- Outputs/Derived: Stable, descriptive IDs used across loader, schema, and UI.
- Invariants/Constraints: Lowercase, underscores, unique, prefixed by class name; keep stable once defined.
- Dependencies/Cross-links: Class System loaders and schema; validation scripts.
- Schema touchpoints: References to feature/progression files; no direct schema, but enforced by validation tooling.
- Feature touchpoints: Feature choice resolution mapping; UI anchors/ids.
- Risks/Edge cases: Renaming features causing desync; inconsistent slug conversion.
- Open questions: Automated validation script availability and CI integration status.
- Resume: last_section=Validation

Deep‑Dive Notes (in progress):

- Uniqueness: ensure validator script covers uniqueness across features and progressions; IDs stable over time.
- Conversion rules: confirm slug conversion rules applied consistently; document any exceptions.
