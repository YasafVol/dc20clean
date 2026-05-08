# DC20 0.10.5 Changelog Reconstruction

Generated from deterministic local inspection on 2026-05-08.

## Purpose

Use the `0.10.5 Changelog` as the primary cut list for reconstructing v0.10.5 app-impacting rules work. The existing `CHANGE_AUDIT.md` is intentionally broad: it was scaffolded from section-level comparisons and currently contains 1,247 audit entries, including 1,038 marked `HITL required` and 207 `pending`. This file narrows that work to the changelog-confirmed deltas first, then identifies the few areas where targeted section diffing is still justified.

Primary source:

- `docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md`, changelog starts at page 268, line 17539.
- Relevant changelog chunks in `chunks.json`: `dc20-105-2001` through `dc20-105-2020`.

Do not use this file as an implementation patch by itself. Use it to decide which rules-data files, calculators, export mappings, or docs need focused review.

## How To Use The Changelog As The Cut List

1. Start with the changelog lines, not a whole-book diff.
2. For each changelog item, jump to the current v0.10.5 section named by the item.
3. Compare only that section against the current app data/rules implementation and, where needed, the matching v0.10 section.
4. Mark unrelated `CHANGE_AUDIT.md` entries as `no-op` or `deferred` unless they overlap a changelog-confirmed item or a known app invariant.
5. Escalate to HITL when the changelog says a spell/class/feature was renamed, removed, reworked, or broadly rebalanced without enough detail to infer exact data changes.

Recommended priority order:

1. Version routing metadata from `DATA_SHAPE_REVIEW.md`.
2. Class progression tables and MP/resource budgets.
3. Class feature deltas named in the changelog.
4. Maneuver costs, rewrites, and new maneuver data.
5. Spell renames/removals/additions/tags.
6. Equipment property requirements.
7. Character creation SP/MP copy and any export text/mapping affected by it.
8. Typo/layout/no-app-impact cleanup.

## High-Impact Changelog Map

| Changelog item | Changelog source | Current v0.10.5 source targets | Likely app systems | Impact | Reconstruction action |
| --- | --- | --- | --- | --- | --- |
| Added 5th-level Expert Features to all classes | page 268, lines 17541-17545 | Class feature index page 184, lines 13043-13057; per-class `Level 5 Expert Feature` headings start at Barbarian page 211, line 14475 and continue through Wizard page 264, line 17454 | Class, Leveling, Character Creation, Character Sheet, PDF Export | Rules data and display | Ensure every class data model has a level 5 expert feature block and that level-gated UI/export can surface it. |
| Casters gain +1 MP at levels 3, 7, 10 | page 268, line 17544 | Player progression page 186, lines 13083-13094; caster class tables, e.g. Cleric page 220, lines 14967-14973; Wizard page 260, lines 17345-17351 | Class, Leveling, Calculation, Character Sheet, PDF Export | Calculator/data | Verify class progression resolver and derived MP totals match the v0.10.5 class tables. |
| Hybrids gain +1 MP at levels 1 and 10 | page 268, line 17545 | Spellblade class table page 253, lines 16758-16805; hybrid starting resources page 184, lines 12982-12984 | Class, Leveling, Calculation, Character Creation | Calculator/data | Verify Spellblade/hybrid resource progression and initial MP. |
| Level 6/7/8/9/10 table changes | page 268, lines 17547-17553 | Player Character Progression Table page 186, lines 13083-13094; repeated class tables, e.g. Barbarian page 210, lines 14357-14363 | Leveling, Class, Ancestry, Character Creation | Rules data/calculator | Rebuild progression fixtures from current v0.10.5 tables before touching individual feature data. |
| Barbarian Elemental Fury added; Elemental Blast changed to Area Spell Attack; Swift Berserker removed | page 268, lines 17555-17560 | Barbarian subclass list page 210, lines 14448-14453; Elemental Fury page 212, lines 14516-14531 | Class, Effect, Calculation, Character Sheet | HITL/rules data | Add/verify Elemental Fury subclass. Confirm Elemental Blast attack type and targeting semantics. Remove or deprecate Swift Berserker only after checking existing app references. |
| Champion Fighting Spirit, Brace renamed Fortify, Advance gains Martial Attack Check | page 268, lines 17561-17566 | Fighting Spirit page 218, lines 14823-14830; class talent prerequisite page 187, line 13253 | Class, Effect, Character Sheet | Rules data/HITL for rename | Rename/migrate displayed option from Brace to Fortify while preserving saved-character compatibility if old IDs exist. Confirm Advance mechanics in current class data. |
| Cleric Channel Divinity once per combat; Divine Blessing Destruction checks corrected | page 268, lines 17567-17573 | Channel Divinity page 223, line 15119; Divine Blessing page 224, line 15180; related talents page 187, lines 13267-13273 | Class, Effect, Character Sheet | Rules data/effect behavior | Verify usage frequency and blessing check formulas. Needs focused section diff because changelog gives only summary. |
| Commander Inspiring Presence once per round, range 10, Death's Door interaction | page 268, lines 17574-17580 | Inspiring Presence page 228, line 15385; Death's Door core rules page 36, lines 2519-2567 | Class, Calculation/Effect, Character Sheet | Rules data/effect behavior | Verify range, frequency, and conditional behavior. Add display/automation only if current app models feature frequency or Death's Door interactions. |
| Monk Spiritual Balance Ki economy; Uncanny Dodge cost reduced to 1 Ki | page 268, lines 17581-17586 | Spiritual Balance page 243, line 16197; Uncanny Dodge/Ebb and Flow page 244, line 16315 | Class, Effect, Character Sheet | Rules data/resource behavior | Verify Ki max/regain text and costs; app impact depends on whether Ki is modeled as a resource or only displayed. |
| Rogue Cheap Shot condition wording; Swashbuckler DC tip | page 268, lines 17587-17593 | Cheap Shot page 247, line 16462; Swashbuckler appears in class/table references page 246-247 | Class, Conditions, Character Sheet | Mostly text/rules data | `Invisible` vs `Invisibility` matters if condition IDs are structured. Swashbuckler DC tip is likely display-only. |
| Spellblade stamina regen easier; Fire Bolt typo in Spellstrike examples | page 268, lines 17594-17598 | Spellstrike page 256, lines 16883-16895; level 5 Spellblade Discipline/Spellstrike page 257, lines 16930-16954 | Class, Calculation/Effect, Character Sheet | Rules data/text | Stamina regeneration may affect modeled resource recovery. Fire Bolt example typo is no-app-impact unless examples are rendered. |

## Maneuvers

Changelog source: page 268-269, lines 17607-17644. Current maneuver chapter starts at page 50, line 3279; maneuver list starts around page 51, line 3408.

| Group | Items | Current source targets | Likely systems | Action |
| --- | --- | --- | --- | --- |
| Repeatable wording cleanup | Heroic Bash, Savage Strike, Sunder Strike, Swift Strike, Meteor Strike, Cleave, Protect, Endure, Slam, Body Block, Throw Creature | Named maneuvers in page 50+ maneuver chapter | Martials, Character Sheet | Usually rules text/data shape for repeatable enhancements. Compare only enhancement blocks for these maneuvers. |
| SP cost changed/removed | Whirlwind, Pathcarver | Whirlwind page 52, lines 3338 and 3531; Pathcarver page 53, line 3550 | Martials, Calculation, Character Sheet | Confirm cost fields in maneuver data; likely direct app-impact. |
| Quality of life/balance | Piercing Shot, Volley, Resolve, Restrain, Heroic Pass Through, Line Run, Reposition, Heroic Extend Jump | Piercing Shot page 53, line 3574; Volley page 53, line 3613; Heroic Pass Through page 56, line 3884; Line Run page 56, line 3896; Reposition page 56, line 3913; Heroic Extend Jump page 58, line 3992 | Martials, Effect, Character Sheet | HITL for exact semantics. `Reposition (complete rewrite)` should become its own implementation task. |
| New maneuver | Scattershot | Scattershot page 53, line 3595 | Martials, Character Creation/Leveling | Add to maneuver catalog and any assignment/filter UI. |

Audit pruning:

- Keep and prioritize `AUDIT-109: Whirlwind`, `AUDIT-111: Pathcarver`, `AUDIT-115: Scattershot`, and `AUDIT-146: Reposition`.
- Collapse broad maneuver text-only entries into one "repeatable enhancement wording pass" unless their structured data differs.

## Spells And Spellcaster Chapter

Changelog source: page 269, lines 17651-17727. Current spellcaster chapter starts page 60, line 4014; spell list starts page 67, line 4513.

| Changelog group | Source lines | Current v0.10.5 source targets | Likely systems | Impact/action |
| --- | --- | --- | --- | --- |
| Added Poison tag | page 269, line 17653 | Spell tag/list metadata in spell chapter; current clean changelog is the direct source for the tag addition | Spells, Effect, Character Sheet | Add/verify canonical `Poison` tag in spell schema/filtering. |
| Combo Casting example corrected | page 269, line 17654 | Combo Casting page 67, lines 4498-4506 | Spells, PDF Export | Likely no app-impact unless examples are included in rendered rules text/export. |
| `Spell Tags` renamed to `Tags`; many tags updated | page 269, lines 17658-17660 | Spell list page 67, line 4513 onward | Spells, Character Sheet, search/filter UI | App-impact if labels/tags are structured. Use current v0.10.5 spell entries as source of truth. |
| Spell source typos fixed | page 269, line 17659 | Spell source tables page 67+, e.g. `Spells sorted by Sources` line 4515 | Spells | Validate source arrays; likely data-only. |
| Almost every spell changed | page 269, line 17660 | Entire spell catalog | Spells | Do not open-ended diff all spell prose first. Prioritize renamed, removed, added, and tag/source changes; defer general wording unless app stores spell descriptions. |
| Renamed/reworked spells | page 269, lines 17662-17673 | Call Familiar line 4538; Blessing of Air line 4524; Forcefield line 4546; Mockery line 4632; Toxic Burst line 4625; Close Wounds line 4581; Blessing of Earth line 4965; Gravity Well line 4526; Absorb Elements line 4835 | Spells, Character Creation, Character Sheet, PDF Export | HITL required. Preserve migration aliases for old names where saved characters may reference spells. Force Dome/Wall of Force -> Forcefield and Gravity Sinkhole -> Gravity Well imply reworked mechanics, not simple rename. |
| Removed/list changes | page 269, lines 17674-17683 | Mass Heal line 4744; Radiant Beam line 9819; Darkness line 4645/4762/5125; Acid Rain line 7738; Poison Cloud line 7570 | Spells, Character Creation, Character Sheet | HITL required. Distinguish "removed from list" from "removed from book/catalog". The changelog says Mass Heal and Darkness were removed from Primal list, while Radiant Beam/Wind Blessing/Acid Rain/Lightning Cloud/Poison Cloud appear as removal bullets. |
| New spells | page 269, lines 17684-17727 | New spell list in changelog; individual spell sections should be located by name in current clean Markdown | Spells, Character Creation, Character Sheet, PDF Export | Add catalog entries, tags, sources, schools, costs, enhancements, and any assignment rules. |

Renamed/reworked spells requiring HITL:

- `Summon Familiar` -> `Call Familiar` (old name only appears in changelog; current source has `Call Familiar`, line 4538).
- `Fly` -> `Blessing of Air` (current source has `Blessing of Air`, line 4524; `Fly` still appears in generic prose and other contexts).
- `Force Dome` and `Wall of Force` -> `Forcefield` (current source has `Forcefield`, line 4546; both old names only appear in changelog).
- `Vicious Mockery` -> `Mockery` (current source has `Mockery`, line 4632).
- `Toxic Aura` -> `Toxic Burst` (current source has `Toxic Burst`, line 4625).
- `Close Wound` -> `Close Wounds` (current source has `Close Wounds`, line 4581).
- `Earth Blessing` -> `Blessing of Earth` (current source has `Blessing of Earth`, line 4965).
- `Gravity Sinkhole` -> `Gravity Well` (current source has `Gravity Well`, line 4526; rework implied).
- `Absorb Element` -> `Absorb Elements` (current source has `Absorb Elements`, line 4835).

New spell catalog cut list from page 269, lines 17684-17727:

`Gravity Shift`, `Increase Gravity`, `Reduce Inertia`, `Time Stop`, `Arcane Weapon`, `Illusory Duplicate`, `Illusory Writing`, `Summon Aberration`, `Summon Construct`, `Summon Dragon`, `Summon Ooze`, `Danger Sense`, `Detect Magic`, `Foresight`, `Locate Target`, `Lightning Rod`, `Mold Earth`, `Confusion`, `Dispel Magic`, `Shadowbind`, `Mystical Weapon`, `Summon Celestial`, `Summon Fiend`, `Summon Undead`, `Scrying`, `Illuminate`, `Revivify`, `Enfeeble`, `Enhance Ability`, `Blessing of Zephyr`, `Elemental Weapon`, `Nature's Tether`, `Summon Beast`, `Summon Elemental`, `Summon Fey`, `Summon Plant`, `Spike Cluster`, `Wall of Earth`, `Healing Wave`, `Sunburst`, `Blessing of Water`.

Audit pruning:

- Keep audit entries for named renamed/reworked/new/removed spells.
- Replace "almost every spell changed" with a staged spell-catalog refresh task.
- Mark pure typo/wording entries no-op unless spell descriptions are app-visible and versioned.

## Equipment, Talents, Character Creation, Ancestry

| Changelog item | Changelog source | Current source targets | Likely systems | Impact/action |
| --- | --- | --- | --- | --- |
| Toss and Thrown costs returned | page 269, lines 17728-17733 | Equipment chapter page 165+, weapon properties around lines 11820-11905 | Equipment, Character Creation, Character Sheet | Verify custom weapon property point costs in equipment builder. |
| Return Property now requires Toss or Thrown | page 269, line 17733 | Weapon properties around page 165-166, lines 11820-11905 | Equipment | Add/verify property prerequisite validation. Direct app-impact. |
| Removed Grandmaster and Legendary Multiclass until Prestige is added | page 269, lines 17735-17737 | Talent references include Grandmaster in progression tip page 186, line 13123; old `Legendary Multiclass` only found in changelog | Leveling, Class, Character Creation | Remove/deprecate unavailable talents from selectable catalog. HITL if saved characters can already hold them. |
| Corrected step 5 initial SP & MP | page 269, lines 17739-17741 | Character creation Step 5 page 184, lines 12982-12984 | Character Creation, Calculation, PDF Export | Verify starting resource defaults: Martial 2 SP, Spellcaster 6 MP, Hybrid 1 SP and 3 MP. |
| Hazardous Hide returned | page 269, lines 17743-17745 | Beast/Body trait page 206, line 14241 | Ancestry, Traits, Effect, Character Creation | Add/verify trait availability, effect text, damage type choice. |
| Removed beta note from Celestial Magic | page 269, line 17746 | Celestial Magic page 204, line 14073 | Ancestry, Traits | No app-impact unless beta notes are displayed from data. |

## Probably Typo, Copy, Or Layout Only

These should usually be marked `no-op` in `CHANGE_AUDIT.md` unless the app renders the exact prose from rules data:

- `Health Points & Death's Door`: First Aid Kit -> Medicine Kit, page 268, lines 17599-17601. Current actual section is `Medicine Kit (Equipment)` page 36, lines 2563-2565.
- `Damage`: corrected example for Damage Vulnerability (X), page 268, lines 17603-17605. Current damage chapter starts page 39, line 2576.
- Rogue Swashbuckler DC tip correction, page 268, lines 17591-17592, unless the tip is app-visible.
- Spellblade Fire Bolt typo in Spellstrike examples, page 268, line 17597, unless examples are app-visible.
- Combo Casting example correction, page 269, line 17654, unless examples are app-visible.
- Spell source typo fixes, page 269, line 17659, after structured spell source arrays are validated.
- Removed beta note from Celestial Magic, page 269, line 17746.

## HITL Required

Escalate these before implementation because they imply renames, removals, rewrites, or saved-character migration behavior:

- Spell rename/rework set on page 269, lines 17662-17673.
- Spell removed/list-change set on page 269, lines 17674-17683.
- New spell catalog additions on page 269, lines 17684-17727, especially source/school/tag/enhancement details.
- `Reposition (complete rewrite)`, page 269, line 17639.
- Barbarian `Elemental Fury` and `Elemental Blast` attack-type semantics, page 268, lines 17557-17558.
- Champion `Brace` -> `Fortify` rename, page 268, line 17564, if saved characters or feature choices use stable IDs.
- Removal of `Swift Berserker`, page 268, line 17559, and `Grandmaster`/`Legendary Multiclass`, page 269, line 17737, if existing saved characters can reference them.

## How This Should Prune `CHANGE_AUDIT.md`

`CHANGE_AUDIT.md` should become an implementation queue rather than a section-diff ledger.

Recommended restructure:

1. Keep `AUDIT-001` and `AUDIT-002` as versioning/schema gates, informed by `DATA_SHAPE_REVIEW.md`.
2. Add a new top-level "Changelog-confirmed v0.10.5 work" section with grouped tasks:
   - Class progression/resource tables.
   - Named class features.
   - Maneuvers.
   - Spell catalog/list/tag migration.
   - Equipment properties.
   - Character creation starting resources.
   - Ancestry traits.
3. Move broad automated section differences that are not changelog-confirmed into a "secondary verification backlog".
4. Mark typography, examples, beta-note removals, and pure wording entries `no-op` unless the affected prose is directly rendered by the app.
5. Use one audit entry per implementation task, not one per heading. For example, "Spell rename alias/migration pass" is more useful than separate unclassified entries for every spell heading.

High-signal audit entries already overlapping the changelog:

- `AUDIT-109: Whirlwind`
- `AUDIT-111: Pathcarver`
- `AUDIT-115: Scattershot`
- `AUDIT-146: Reposition`
- `AUDIT-178/AUDIT-181: Elemental`
- `AUDIT-189: Blessing of Air`
- `AUDIT-197: Gravity Well`
- `AUDIT-226: Call Familiar`
- `AUDIT-241: Forcefield`
- `AUDIT-359: Absorb Elements`
- `AUDIT-454: Toxic Burst`
- `AUDIT-491: Mockery`
- `AUDIT-508: Close Wounds`
- `AUDIT-799: Elemental Fury`
- `AUDIT-883/AUDIT-897: Channel Divinity`
- `AUDIT-926/AUDIT-911: Inspiring Presence`
- `AUDIT-1035/AUDIT-1049: Spiritual Balance`

## Notes And Limitations

- Line references are from `DC20 0.10.5 clean.md` as generated in `docs/assets/dc20-0.10.5/`.
- Page references are the embedded `<!-- page: N -->` markers in that clean Markdown.
- This reconstruction intentionally avoids whole-book reading. It uses changelog lines, heading search, chunk metadata, and targeted source excerpts.
- The v0.10 baseline should be consulted only for focused before/after confirmation after a changelog item has been selected for implementation.
