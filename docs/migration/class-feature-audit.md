# DC20 v0.10.5 Class Feature Audit

Generated from runtime class feature data and v0.10.5 source audit JSON.

## Summary

- Rules version: dc20-0.10.5
- Classes: 13
- Features: 137
- Core features: 83
- Subclass features: 54
- Selections: 18
- Duplicate always-on effects: 0
- Source detailed class chapters: 12
- Source findings: 1
- Coverage: covered: 131, partial: 4, progression-derived: 2

## Source Findings

- info: Cleric: Class is part of the core class list but has no detailed class chapter in the parsed source range.

## Class Index

| Class | Category | Core Features | Subclasses | Subclass Features | Selections | Duplicate Effects | Effects | Coverage |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Barbarian | martial | 6 | 2 | 4 | 3 | 0 | 37 | covered: 9, partial: 1 |
| Bard | spellcaster | 6 | 2 | 4 | 1 | 0 | 26 | covered: 10 |
| Champion | martial | 6 | 2 | 4 | 0 | 0 | 22 | covered: 10 |
| Cleric | spellcaster | 7 | 2 | 4 | 2 | 0 | 53 | covered: 11 |
| Commander | martial | 6 | 2 | 4 | 0 | 0 | 24 | covered: 10 |
| Druid | spellcaster | 6 | 2 | 4 | 0 | 0 | 24 | covered: 10 |
| Hunter | martial | 6 | 2 | 4 | 3 | 0 | 61 | covered: 9, partial: 1 |
| Monk | martial | 7 | 2 | 4 | 1 | 0 | 35 | covered: 11 |
| Rogue | martial | 7 | 2 | 4 | 0 | 0 | 19 | covered: 11 |
| Sorcerer | spellcaster | 6 | 2 | 4 | 2 | 0 | 29 | covered: 9, partial: 1 |
| Spellblade | hybrid | 8 | 2 | 5 | 2 | 0 | 38 | covered: 11, progression-derived: 2 |
| Warlock | spellcaster | 6 | 2 | 4 | 2 | 0 | 30 | covered: 9, partial: 1 |
| Wizard | spellcaster | 6 | 2 | 5 | 2 | 0 | 34 | covered: 11 |

## Coverage Vocabulary

- calculated: directly changes numeric/stat/resource/spell/maneuver output.
- collected: gathered by the calculator for sheet display/use.
- choice-tracked: represented as a selection or choice effect.
- progression-derived: feature text is represented by the class progression table.
- text-only-no-effects: feature has no modeled effects; this is a failing audit state.
- flavor-no-effects: flavor feature has no modeled effects; this is a failing audit state.
- partial: at least one modeled effect is covered, but at least one effect is unsupported.
- uncovered: effects exist, but none map to a current calculator/display path.
- duplicate always-on effects: identical direct/benefit effects on the same feature; choice-option effects are excluded because choices are selected, not always active together.

## Barbarian

Category: martial. Core features: 6. Subclasses: 2. Subclass features: 4.

### Barbarian / Berserker

Level 1; core; status covered; score 1; selections 0; effects 4.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Charge | GRANT_ABILITY | charge | Move up to 2 Spaces before making a Melee Martial Attack on your turn. | collected | sheet-collector | 0.8 |
| benefit | Berserker Defense | MODIFY_STAT | ad | 2 | calculated | stat-breakdown | 1 |
| benefit | Fast Movement | MODIFY_STAT | moveSpeed | 1 | calculated | stat-breakdown | 1 |
| benefit | Mighty Leap | SET_VALUE | jumpCalculationAttribute | might | calculated | jump-distance-base-selection | 0.9 |

### Barbarian / Martial Path

Level 1; core; status covered; score 1; selections 0; effects 4.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Combat Training | GRANT_COMBAT_TRAINING | Weapons | true | collected | sheet-collector | 0.8 |
| benefit | Combat Training | GRANT_COMBAT_TRAINING | All_Armor | true | collected | sheet-collector | 0.8 |
| benefit | Combat Training | GRANT_COMBAT_TRAINING | All_Shields | true | collected | sheet-collector | 0.8 |
| benefit | Stamina Regeneration | GRANT_ABILITY | stamina_regen | Once per round, regain up to half maximum SP when you score or take a Heavy/Critical Hit. | collected | sheet-collector | 0.8 |

### Barbarian / Rage

Level 1; core; status partial; score 0.75; selections 0; effects 4.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Increased Damage | MODIFY_STAT | martial_melee_damage | 1 | sheet-todo | attack-row-presentation-todo | 0.55 |
| benefit | Might Advantage | GRANT_ABILITY | rage_might_advantage | ADV on Might Saves while Raging. | collected | sheet-collector | 0.8 |
| benefit | Reduced Defense | MODIFY_STAT | pd | -5 | calculated | stat-breakdown | 1 |
| benefit | Damage Resistance | GRANT_ABILITY | rage_resistance | Resistance (Half) to Elemental and Physical damage while Raging. | collected | sheet-collector | 0.8 |

### Barbarian / Shattering Force

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Shattering Force | GRANT_ABILITY | shattering_force | Melee Attacks against structures and mundane objects are Critical Hits. | collected | sheet-collector | 0.8 |

### Barbarian / Battlecry

Level 2; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Fortitude Shout | GRANT_ABILITY | fortitude_shout | Grant allies Resistance (1) against next Physical or Elemental damage. | collected | sheet-collector | 0.8 |
| benefit | Fury Shout | GRANT_ABILITY | fury_shout | Grant allies +1 damage on their next Attack. | collected | sheet-collector | 0.8 |
| benefit | Urgent Shout | GRANT_ABILITY | urgent_shout | Grant allies +1 Speed until start of your next turn. | collected | sheet-collector | 0.8 |

### Barbarian / Expert Barbarian

Level 5; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Rage | GRANT_ABILITY | expert_barbarian_rage | Reaction on Initiative: enter Rage for free. | collected | sheet-collector | 0.8 |
| benefit | Berserker | GRANT_ABILITY | expert_barbarian_berserker | Charge grants 3 Spaces of movement and ignores Difficult Terrain. | collected | sheet-collector | 0.8 |
| benefit | Battlecry | GRANT_ABILITY | expert_barbarian_battlecry | Battlecry range 10 Spaces; Fortitude Shout can grant Resistance Half for 1 SP, Fury Shout can add +1 damage for 3 SP, and Urgent Shout can add +2 Speed per SP up to 2 SP. | collected | sheet-collector | 0.8 |

### Barbarian / Elemental Fury / Elemental Affinity

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Elemental Affinity | GRANT_ABILITY | elemental_affinity | Voice can boom 3x louder, create elemental visual displays, Resistance to environmental Exhaustion. | collected | sheet-collector | 0.8 |

### Barbarian / Elemental Fury / Raging Elements

Level 3; subclass; status covered; score 1; selections 2; effects 10.

Selections:

- Choose your Elemental Rage damage type. [count: 1] -> Cold (GRANT_ABILITY); Fire (GRANT_ABILITY); Lightning (GRANT_ABILITY); Physical (GRANT_ABILITY)
- Choose 1 additional benefit for your Aura Type. [count: 1] -> Slowing Aura (GRANT_ABILITY); Splashing Aura (GRANT_ABILITY); Stunning Aura (GRANT_ABILITY); Pushing Aura (GRANT_ABILITY)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Erupting Elements | GRANT_ABILITY | elemental_fury_erupting_elements | While Raging, creatures in your Aura that damage you immediately take 1 Elemental Rage damage. | collected | sheet-collector | 0.8 |
| benefit | Elemental Blast | GRANT_ABILITY | elemental_fury_elemental_blast | Spend 1 AP and 1 SP to make an Area Spell Attack against chosen creatures in your Aura. Hit: 1 Elemental Rage damage. Single target attacks the target's PD and deals 2 damage. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Elemental Rage damage type.: Cold | GRANT_ABILITY | elemental_rage_cold | Elemental Rage damage is Cold. Gain 2 Space Aura while Raging with elemental effects. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Elemental Rage damage type.: Fire | GRANT_ABILITY | elemental_rage_fire | Elemental Rage damage is Fire. Gain 2 Space Aura while Raging with elemental effects. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Elemental Rage damage type.: Lightning | GRANT_ABILITY | elemental_rage_lightning | Elemental Rage damage is Lightning. Gain 2 Space Aura while Raging with elemental effects. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Elemental Rage damage type.: Physical | GRANT_ABILITY | elemental_rage_physical | Elemental Rage damage is Physical (choose Bludgeoning/Piercing/Slashing each Rage). Gain 2 Space Aura while Raging with elemental effects. | collected | sheet-collector | 0.8 |
| choice-option | Choose 1 additional benefit for your Aura Type.: Slowing Aura | GRANT_ABILITY | slowing_aura | Aura creates Difficult Terrain for chosen creatures. Failed saves also cause Slowed until end of their next turn. | collected | sheet-collector | 0.8 |
| choice-option | Choose 1 additional benefit for your Aura Type.: Splashing Aura | GRANT_ABILITY | splashing_aura | Once per turn, Elemental Rage damage splashes to a creature within 1 Space for 1 damage. | collected | sheet-collector | 0.8 |
| choice-option | Choose 1 additional benefit for your Aura Type.: Stunning Aura | GRANT_ABILITY | stunning_aura | Once per turn, creatures that fail saves in your Aura cannot spend AP on Reactions until start of their next turn. | collected | sheet-collector | 0.8 |
| choice-option | Choose 1 additional benefit for your Aura Type.: Pushing Aura | GRANT_ABILITY | pushing_aura | Elemental Blast forces Physical Save; failure moves targets 2 Spaces toward or away from you. | collected | sheet-collector | 0.8 |

### Barbarian / Spirit Guardian / Ancestral Guardian

Level 3; subclass; status covered; score 1; selections 1; effects 6.

Selections:

- Learn 1 of the following Maneuvers (or any Maneuver if you know all 3). [count: 1] -> Brace (GRANT_MANEUVERS); Parry (GRANT_MANEUVERS); Protect (GRANT_MANEUVERS)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Bestowed Protection | GRANT_CHOICE | guardian_maneuver | 1 | choice-tracked | unresolved-choice-or-ui-selection | 0.7 |
| benefit | Spiritual Aura | GRANT_RESISTANCE | Mystical | 1 | collected | sheet-collector | 0.8 |
| benefit | Spiritual Aura | GRANT_ABILITY | spiritual_aura | While Raging: 5 Space Aura allows Shove on any creature (pushed in your chosen direction), use Brace/Parry/Protect on any creature in Aura. | collected | sheet-collector | 0.8 |
| choice-option | Learn 1 of the following Maneuvers (or any Maneuver if you know all 3).: Brace | GRANT_MANEUVERS | Brace | 1 | calculated | maneuver-budget | 0.9 |
| choice-option | Learn 1 of the following Maneuvers (or any Maneuver if you know all 3).: Parry | GRANT_MANEUVERS | Parry | 1 | calculated | maneuver-budget | 0.9 |
| choice-option | Learn 1 of the following Maneuvers (or any Maneuver if you know all 3).: Protect | GRANT_MANEUVERS | Protect | 1 | calculated | maneuver-budget | 0.9 |

### Barbarian / Spirit Guardian / Ancestral Knowledge

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Ancestral Knowledge | GRANT_ABILITY | ancestral_knowledge | ADV on Checks about your Ancestries' history. Once per Long Rest: ADV on a Trade or Language Check as a spirit lends you its experience. | collected | sheet-collector | 0.8 |

## Bard

Category: spellcaster. Core features: 6. Subclasses: 2. Subclass features: 4.

### Bard / Crowd Pleaser

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Crowd Pleaser | GRANT_ABILITY | crowd_pleaser | ADV on Charisma Checks against targets who watched your performance for 1 hour. | collected | sheet-collector | 0.8 |

### Bard / Font of Inspiration

Level 1; core; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Ranged Help Attack | GRANT_ABILITY | ranged_help_attack | Help Action range for attacks extends to 10 Spaces. | collected | sheet-collector | 0.8 |
| benefit | Help Reaction | GRANT_ABILITY | help_reaction | Take Help Action as Reaction when creatures make Checks. | collected | sheet-collector | 0.8 |

### Bard / Remarkable Repertoire

Level 1; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Jack of All Trades | MODIFY_STAT | skillPoints | 2 | calculated | budget-or-slot-count | 0.9 |
| benefit | Magical Secrets | GRANT_SPELL | any_spell_list | 2 | calculated | spell-slot-generation | 0.9 |
| benefit | Magical Expression | GRANT_CHOICE | magical_expression | 1 | choice-tracked | unresolved-choice-or-ui-selection | 0.7 |

### Bard / Spellcasting Path

Level 1; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Spell_Focuses | true | collected | sheet-collector | 0.8 |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Light_Armor | true | collected | sheet-collector | 0.8 |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Light_Shields | true | collected | sheet-collector | 0.8 |

### Bard / Bardic Performance

Level 2; core; status covered; score 1; selections 1; effects 4.

Selections:

- Choose a performance type [count: 1] -> Battle Ballad (GRANT_ABILITY); Fast Tempo (GRANT_ABILITY); Inspiring (GRANT_ABILITY); Emotional (GRANT_ABILITY)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| choice-option | Choose a performance type: Battle Ballad | GRANT_ABILITY | battle_ballad | Allies in aura gain d4 bonus to first Attack Check each turn. | collected | sheet-collector | 0.8 |
| choice-option | Choose a performance type: Fast Tempo | GRANT_ABILITY | fast_tempo | Allies in aura gain +1 Speed. | collected | sheet-collector | 0.8 |
| choice-option | Choose a performance type: Inspiring | GRANT_ABILITY | inspiring_performance | Allies in aura gain 1 Temp HP at start of their turns. | collected | sheet-collector | 0.8 |
| choice-option | Choose a performance type: Emotional | GRANT_ABILITY | emotional_performance | Allies in aura gain Resistance to chosen condition and can repeat saves at start of turn. | collected | sheet-collector | 0.8 |

### Bard / Expert Bard

Level 5; core; status covered; score 1; selections 0; effects 4.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Font of Inspiration | GRANT_ABILITY | expert_bard_font_of_inspiration | Your Help Die starts at d10. | collected | sheet-collector | 0.8 |
| benefit | Remarkable Repertoire | MODIFY_STAT | skillPoints | 2 | calculated | budget-or-slot-count | 0.9 |
| benefit | Remarkable Repertoire | GRANT_SPELL | any_spell_list | 2 | calculated | spell-slot-generation | 0.9 |
| benefit | Bardic Performance | GRANT_ABILITY | expert_bard_bardic_performance | Free performance change at start of turn. Spend 2 MP when starting: Battle Ballad die becomes d8, Fast Tempo grants +2 Speed, Inspiring Performance grants +1 temp HP, or Emotional Performance grants resistance to its listed Conditions. | collected | sheet-collector | 0.8 |

### Bard / Eloquence / Beguiling Presence

Level 3; subclass; status covered; score 1; selections 0; effects 4.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Enthrall | GRANT_SPELL | Charm | 1 | calculated | spell-slot-generation | 0.9 |
| benefit | Enthrall | GRANT_ABILITY | enhanced_charm | Charm spell doesn't end from target taking damage. | collected | sheet-collector | 0.8 |
| benefit | Misleading Muse | GRANT_ABILITY | misleading_muse | Spend 1 AP as Reaction to charm attacker and redirect attack. | collected | sheet-collector | 0.8 |
| benefit | Mind Games | GRANT_ABILITY | mind_games | Deal 1 Psychic damage when charm ends. | collected | sheet-collector | 0.8 |

### Bard / Eloquence / Eloquent Orator

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Eloquent Orator | GRANT_ABILITY | eloquent_orator | All creatures with language can understand your speech. | collected | sheet-collector | 0.8 |

### Bard / Jester / Antagonizing Act

Level 3; subclass; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Heckle | GRANT_ABILITY | heckle | Taunt creatures who fail saves in your performance aura. | collected | sheet-collector | 0.8 |
| benefit | Distraction | GRANT_ABILITY | distraction | Spend 1 AP as Reaction to subtract Help Die from attacker's Check within 10 Spaces. | collected | sheet-collector | 0.8 |
| benefit | Pratfall | GRANT_ABILITY | pratfall | Grant ally ADV on Check when you fail a save. | collected | sheet-collector | 0.8 |

### Bard / Jester / Comedian

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope   | Label    | Type               | Target | Value | Coverage  | Path            | Confidence |
| ------- | -------- | ------------------ | ------ | ----- | --------- | --------------- | ---------- |
| feature | Comedian | GRANT_ADV_ON_CHECK | comedy | ADV   | collected | sheet-collector | 0.8        |

## Champion

Category: martial. Core features: 6. Subclasses: 2. Subclass features: 4.

### Champion / Fighting Spirit

Level 1; core; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Combat Readiness | GRANT_ABILITY | combat_readiness_fortify | First turn in Combat: choose Fortify (Dodge + ADV on next Save) or Advance (Move + ADV on next Martial Attack or Physical Check). | collected | sheet-collector | 0.8 |
| benefit | Second Wind | GRANT_ABILITY | second_wind | Once per Combat when Bloodied at turn start: regain 2 HP and 2 SP. | collected | sheet-collector | 0.8 |

### Champion / Know Your Enemy

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Know Your Enemy | GRANT_ABILITY | know_your_enemy | Spend 1 minute (or 1 AP in Combat) to assess creature's Might, Agility, PD, AD, or HP vs. yours (DC 10 Knowledge/Insight). | collected | sheet-collector | 0.8 |

### Champion / Martial Path

Level 1; core; status covered; score 1; selections 0; effects 4.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Martial Path | GRANT_COMBAT_TRAINING | Weapons | true | collected | sheet-collector | 0.8 |
| feature | Martial Path | GRANT_COMBAT_TRAINING | All_Armor | true | collected | sheet-collector | 0.8 |
| feature | Martial Path | GRANT_COMBAT_TRAINING | All_Shields | true | collected | sheet-collector | 0.8 |
| feature | Martial Path | GRANT_ABILITY | stamina_regen | Once per round, regain up to half maximum SP when you perform a Maneuver. | collected | sheet-collector | 0.8 |

### Champion / Master-at-Arms

Level 1; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Weapon Master | GRANT_ABILITY | weapon_master | Free weapon swapping at start of turn without provoking Opportunity Attacks. | collected | sheet-collector | 0.8 |
| benefit | Maneuver Master | GRANT_CHOICE | maneuver | 1 | choice-tracked | unresolved-choice-or-ui-selection | 0.7 |
| benefit | Maneuver Master | GRANT_ABILITY | maneuver_master | Once per Round when you perform a Maneuver, reduce its SP cost by 1. | collected | sheet-collector | 0.8 |

### Champion / Adaptive Tactics

Level 2; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Adaptive Tactics | GRANT_ABILITY | adaptive_tactics | Gain d8 Tactical Die at Initiative and end of turns. Spend for: Assault (+die to Attack) or Deflect (-die from Attack against you). | collected | sheet-collector | 0.8 |

### Champion / Expert Champion

Level 5; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Master-at-Arms | GRANT_MANEUVERS | any_maneuver | 2 | calculated | maneuver-budget | 0.9 |
| benefit | Fighting Spirit | GRANT_ABILITY | expert_champion_fighting_spirit | Second Wind restores an additional 2 HP and 2 SP. | collected | sheet-collector | 0.8 |
| benefit | Adaptive Tactics | GRANT_ABILITY | expert_champion_adaptive_tactics | Your Tactical Die is d10. | collected | sheet-collector | 0.8 |

### Champion / Hero / Adventuring Hero

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Adventuring Hero | GRANT_ABILITY | adventuring_hero | Ignore penalties from Forced March and being Encumbered. | collected | sheet-collector | 0.8 |

### Champion / Hero / Hero's Resolve

Level 3; subclass; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Hero's Resolve | GRANT_ABILITY | adrenaline_boost | When you use Second Wind, gain a +5 bonus to Martial Attacks and Martial Checks until the end of your turn. | collected | sheet-collector | 0.8 |
| feature | Hero's Resolve | GRANT_ABILITY | cut_through | Your Martial Attacks that score Heavy Hits ignore the target's Physical damage Resistances. | collected | sheet-collector | 0.8 |
| feature | Hero's Resolve | GRANT_ABILITY | unyielding_spirit | While Bloodied, you gain 1 Temp HP at the start of each of your turns. | collected | sheet-collector | 0.8 |

### Champion / Sentinel / Stalwart Protector

Level 3; subclass; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Stalwart Protector | GRANT_ABILITY | steadfast_defender | You can use your Deflect Tactic against any Attack that targets a creature within your Melee Range. | collected | sheet-collector | 0.8 |
| feature | Stalwart Protector | GRANT_ABILITY | defensive_bash | When you use a Defensive Maneuver as a Reaction to an Attack from a creature within 1 Space, the attacker must make a Physical Save against your Attack Check. Failure: The target is pushed 1 Space away or Taunted by you (your choice). | collected | sheet-collector | 0.8 |
| feature | Stalwart Protector | GRANT_ABILITY | not_on_my_watch | Creatures Taunted by you deal 1 less damage to targets within 1 Space of you. | collected | sheet-collector | 0.8 |

### Champion / Sentinel / Vigilant Watcher

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Vigilant Watcher | GRANT_ABILITY | vigilant_watcher | During a Long Rest with only Light Activity, gain ADV on the Might Save to avoid Exhaustion. | collected | sheet-collector | 0.8 |

## Cleric

Category: spellcaster. Core features: 7. Subclasses: 2. Subclass features: 4.

### Cleric / Cleric Order

Level 1; core; status covered; score 1; selections 2; effects 31.

Selections:

- Choose your Divine Damage type [count: 1] -> Fire (GRANT_ABILITY); Cold (GRANT_ABILITY); Lightning (GRANT_ABILITY); Acid (GRANT_ABILITY); Poison (GRANT_ABILITY); Radiant (GRANT_ABILITY); Umbral (GRANT_ABILITY); Psychic (GRANT_ABILITY)
- Choose 2 Divine Domains [count: 2] -> Knowledge (INCREASE_TRADE_MASTERY_CAP, MODIFY_STAT); Magic (MODIFY_STAT, GRANT_SPELL, GRANT_ABILITY); Life (GRANT_ABILITY); Death (GRANT_ABILITY); Grave (GRANT_ABILITY); Light (GRANT_ABILITY); Dark (GRANT_SENSE, GRANT_ABILITY); War (GRANT_COMBAT_TRAINING, GRANT_CHOICE); Peace (GRANT_COMBAT_TRAINING, GRANT_CHOICE); Order (GRANT_ABILITY); Chaos (GRANT_ABILITY); Divination (GRANT_CONDITION_IMMUNITY, GRANT_ABILITY); Trickery (GRANT_ABILITY); Ancestral (MODIFY_STAT)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| choice-option | Choose your Divine Damage type: Fire | GRANT_ABILITY | cleric_divine_damage_fire | Your Divine Damage type is Fire. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Divine Damage type: Cold | GRANT_ABILITY | cleric_divine_damage_cold | Your Divine Damage type is Cold. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Divine Damage type: Lightning | GRANT_ABILITY | cleric_divine_damage_lightning | Your Divine Damage type is Lightning. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Divine Damage type: Acid | GRANT_ABILITY | cleric_divine_damage_corrosion | Your Divine Damage type is Corrosion. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Divine Damage type: Poison | GRANT_ABILITY | cleric_divine_damage_poison | Your Divine Damage type is Poison. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Divine Damage type: Radiant | GRANT_ABILITY | cleric_divine_damage_radiant | Your Divine Damage type is Radiant. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Divine Damage type: Umbral | GRANT_ABILITY | cleric_divine_damage_umbral | Your Divine Damage type is Umbral. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Divine Damage type: Psychic | GRANT_ABILITY | cleric_divine_damage_psychic | Your Divine Damage type is Psychic. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Knowledge | INCREASE_TRADE_MASTERY_CAP |  | 1 | validated | mastery-cap-validation | 0.85 |
| choice-option | Choose 2 Divine Domains: Knowledge | MODIFY_STAT | skillPoints | 2 | calculated | budget-or-slot-count | 0.9 |
| choice-option | Choose 2 Divine Domains: Magic | MODIFY_STAT | mpMax | 1 | calculated | stat-breakdown | 1 |
| choice-option | Choose 2 Divine Domains: Magic | GRANT_SPELL | by_tag | 1 | calculated | spell-slot-generation | 0.9 |
| choice-option | Choose 2 Divine Domains: Magic | GRANT_ABILITY | cleric_magic_domain_spell_access | When you learn a new Spell, you can choose any Spell with the chosen Spell Tag. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Life | GRANT_ABILITY | cleric_life_domain_healing | When you produce an MP Effect that restores HP to at least 1 creature, restore 1 HP to 1 creature within 1 Space. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Death | GRANT_ABILITY | cleric_death_domain_well_bloodied_damage | Enemy creatures within 10 Spaces take +1 damage from Attacks while they're Well-Bloodied. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Grave | GRANT_ABILITY | cleric_grave_domain_well_bloodied_reduction | Allied creatures within 10 Spaces take 1 less damage from Attacks while they're Well-Bloodied. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Light | GRANT_ABILITY | cleric_light_domain_hindering_light | When you produce an MP Effect that targets at least 1 creature, force 1 target to make a Might or Charisma Save. Failure: target sheds a 1 Space Aura of Bright Light and is Hindered on its next Attack until end of next turn. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Dark | GRANT_SENSE | darkvision | 10 | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Dark | GRANT_SENSE | darkvision | 5 | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Dark | GRANT_ABILITY | shadow_hide | Can Hide in Dim Light; remains Hidden until moving or area becomes Bright Light. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: War | GRANT_COMBAT_TRAINING | Weapons | true | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: War | GRANT_CHOICE | attack_maneuver | 1 | choice-tracked | unresolved-choice-or-ui-selection | 0.7 |
| choice-option | Choose 2 Divine Domains: Peace | GRANT_COMBAT_TRAINING | Heavy_Armor | true | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Peace | GRANT_COMBAT_TRAINING | Heavy_Shields | true | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Peace | GRANT_CHOICE | defensive_maneuver | 1 | choice-tracked | unresolved-choice-or-ui-selection | 0.7 |
| choice-option | Choose 2 Divine Domains: Order | GRANT_ABILITY | cleric_order_domain_balance_check | Once per turn, when a creature you can see within 10 Spaces makes a Check, spend 1 AP as a Reaction to remove all instances of ADV and DisADV from that Check. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Chaos | GRANT_ABILITY | cleric_chaos_domain_wild_magic_advantage | Once per Long Rest, when you make a Spell Attack or Spell Check, give yourself ADV and roll on the Wild Magic Table. Regain when you roll Initiative. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Divination | GRANT_CONDITION_IMMUNITY | flanked |  | collected | condition-interaction-aggregation | 0.8 |
| choice-option | Choose 2 Divine Domains: Divination | GRANT_ABILITY | see_invisible_on_mp_spend | When you spend MP, you gain the ability to see Invisible creatures and objects until the start of your next turn. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Trickery | GRANT_ABILITY | cleric_trickery_domain_illusory_duplicate | When you produce an MP Effect that targets at least 1 creature, create an illusory duplicate of 1 target until the start of your next turn. The next Attack against that target has DisADV and removes the duplicate. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Divine Domains: Ancestral | MODIFY_STAT | ancestryPoints | 2 | calculated | budget-or-slot-count | 0.9 |

### Cleric / Divine Blessing

Level 1; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Destruction | GRANT_ABILITY | cleric_divine_blessing_destruction | 1 MP: Target takes 3 Divine damage if the Spell Check equals or exceeds AD; make a Spell Attack Check if the Spell normally has no Check. | collected | sheet-collector | 0.8 |
| benefit | Guidance | GRANT_ABILITY | cleric_divine_blessing_guidance | 1 MP: Target gains a d8 Help Die for 1 Check within 1 minute; that Check gains ADV when the die is used. | collected | sheet-collector | 0.8 |
| benefit | Restoration | GRANT_ABILITY | cleric_divine_blessing_restoration | 1 MP: Target regains 3 HP. | collected | sheet-collector | 0.8 |

### Cleric / Divine Damage Expansion

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Divine Damage Expansion | GRANT_ABILITY | cleric_divine_damage_expansion | When you deal damage with a Spell, you can convert it to your Divine Damage type. You also gain Resistance (1) to your Divine Damage type. | collected | sheet-collector | 0.8 |

### Cleric / Divine Omen (Flavor Feature)

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Divine Omen (Flavor Feature) | GRANT_ABILITY | cleric_divine_omen | Once per Long Rest, spend 10 minutes communing with your Deity to ask one yes-or-no question. | collected | sheet-collector | 0.8 |

### Cleric / Spellcasting Path

Level 1; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Spell_Focuses | true | collected | sheet-collector | 0.8 |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Light_Armor | true | collected | sheet-collector | 0.8 |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Light_Shields | true | collected | sheet-collector | 0.8 |

### Cleric / Channel Divinity

Level 2; core; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Divine Rebuke | GRANT_ABILITY | cleric_channel_divinity_divine_rebuke | 2 AP: Censure chosen creatures within 5 Spaces that can see or hear you. Spell Attack vs AD for 1 Divine Damage; repeated Mental Save failure Intimidates for 1 minute or until damage. | collected | sheet-collector | 0.8 |
| benefit | Lesser Divine Intervention | GRANT_ABILITY | cleric_channel_divinity_lesser_divine_intervention | 2 AP: Make a DC 15 Spell Check for an HP pool to distribute within 5 Spaces. Failure: pool 3 HP. Success: pool 3 HP and regain 1 MP. Success (5): pool +2 HP. | collected | sheet-collector | 0.8 |

### Cleric / Expert Cleric

Level 5; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Cleric Order | GRANT_ABILITY | expert_cleric_additional_domain | Choose 1 additional Divine Domain. | collected | sheet-collector | 0.8 |
| benefit | Divine Blessing | GRANT_ABILITY | expert_cleric_divine_blessing | Divine Blessing can spend additional MP: Destruction +2 damage per MP, Restoration +2 healing per MP. | collected | sheet-collector | 0.8 |
| benefit | Channel Divinity | GRANT_ABILITY | expert_cleric_channel_divinity | Divine Rebuke +1 damage; Lesser Divine Intervention HP pool increases by 2. | collected | sheet-collector | 0.8 |

### Cleric / Inquisitor / Divine Interrogator (Flavor Feature)

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Divine Interrogator (Flavor Feature) | GRANT_ABILITY | cleric_divine_interrogator | Once per Long Rest, ask an interrogated creature a yes-or-no question. On failed Charisma Save, it can't lie to that question. | collected | sheet-collector | 0.8 |

### Cleric / Inquisitor / Vanquish Heresy

Level 3; subclass; status covered; score 1; selections 0; effects 5.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Vanquish Heresy | GRANT_CONDITION_RESISTANCE | charmed | advantage | collected | condition-interaction-aggregation | 0.8 |
| feature | Vanquish Heresy | GRANT_CONDITION_RESISTANCE | intimidated | advantage | collected | condition-interaction-aggregation | 0.8 |
| feature | Vanquish Heresy | GRANT_CONDITION_RESISTANCE | taunted | advantage | collected | condition-interaction-aggregation | 0.8 |
| feature | Vanquish Heresy | GRANT_ABILITY | cleric_vanquish_heresy_intimidated_persistence | Creatures Intimidated by your Divine Rebuke don't stop being Intimidated when they take damage. | collected | sheet-collector | 0.8 |
| benefit | Chastise | GRANT_ABILITY | cleric_chastise | 1 MP: Brand the target as a heretic for 1 minute; gain ADV on Insight and Intimidation Checks against it, and once per round on a hit you can deal +1 Divine Damage. | collected | sheet-collector | 0.8 |

### Cleric / Priest / All That Ails (Flavor Feature)

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | All That Ails (Flavor Feature) | GRANT_ADV_ON_CHECK | identify_disease_poison_curse | ADV | collected | sheet-collector | 0.8 |

### Cleric / Priest / Sanctification

Level 3; subclass; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Sanctification | GRANT_ABILITY | cleric_sanctification_overheal | MP healing beyond a creature's HP maximum becomes Temp HP; MP healing on Death's Door restores additional HP equal to your Prime Modifier. | collected | sheet-collector | 0.8 |
| benefit | Hand of Salvation | GRANT_ABILITY | cleric_hand_of_salvation | Reaction, 2 AP: Pull a willing creature within 5 Spaces to an unoccupied Space within 1 Space of you when it would be Hit; the Attack misses and it is immune to all damage during the movement. | collected | sheet-collector | 0.8 |

## Commander

Category: martial. Core features: 6. Subclasses: 2. Subclass features: 4.

### Commander / Commander's Call

Level 1; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Attack Command | GRANT_ABILITY | attack_command | Command ally to Attack with ADV (1 AP + 1 SP, once per turn). | collected | sheet-collector | 0.8 |
| benefit | Dodge Command | GRANT_ABILITY | dodge_command | Command ally to Full Dodge (1 AP + 1 SP, once per turn). | collected | sheet-collector | 0.8 |
| benefit | Move Command | GRANT_ABILITY | move_command | Command ally to move up to Speed without opportunity attacks (1 AP + 1 SP, once per turn). | collected | sheet-collector | 0.8 |

### Commander / Inspiring Presence

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Inspiring Presence | GRANT_ABILITY | inspiring_presence | Once per Round in combat when you spend SP: restore 1 HP to a creature within 10 Spaces that can see or hear you; Death's Door targets regain 1 additional HP. | collected | sheet-collector | 0.8 |

### Commander / Martial Path

Level 1; core; status covered; score 1; selections 0; effects 4.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Martial Path | GRANT_COMBAT_TRAINING | Weapons | true | collected | sheet-collector | 0.8 |
| feature | Martial Path | GRANT_COMBAT_TRAINING | All_Armor | true | collected | sheet-collector | 0.8 |
| feature | Martial Path | GRANT_COMBAT_TRAINING | All_Shields | true | collected | sheet-collector | 0.8 |
| benefit | Stamina Regeneration | GRANT_ABILITY | stamina_regen | Regain up to half max SP when granting Help Die (once per round). | collected | sheet-collector | 0.8 |

### Commander / Natural Leader

Level 1; core; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope   | Label          | Type               | Target           | Value | Coverage  | Path            | Confidence |
| ------- | -------------- | ------------------ | ---------------- | ----- | --------- | --------------- | ---------- |
| feature | Natural Leader | GRANT_ADV_ON_CHECK | authority_figure | ADV   | collected | sheet-collector | 0.8        |
| feature | Natural Leader | GRANT_ADV_ON_CHECK | military_groups  | ADV   | collected | sheet-collector | 0.8        |

### Commander / Commanding Aura

Level 2; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Bolster | GRANT_ABILITY | bolster | Help Action for attacks in aura (1 AP or Reaction). | collected | sheet-collector | 0.8 |
| benefit | Rally | GRANT_ABILITY | rally | Grant 1 Temp HP to creatures in aura (1 AP). | collected | sheet-collector | 0.8 |
| benefit | Reinforce | GRANT_ABILITY | reinforce | Impose DisADV on attacks in aura (Reaction). | collected | sheet-collector | 0.8 |

### Commander / Expert Commander

Level 5; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Commander's Call | GRANT_ABILITY | expert_commander_commanders_call | Commander's Call range 10 Spaces; spend 2 additional SP to issue 1 additional command. | collected | sheet-collector | 0.8 |
| benefit | Inspiring Presence | GRANT_ABILITY | expert_commander_inspiring_presence | Inspiring Presence restores 1 additional HP. | collected | sheet-collector | 0.8 |
| benefit | Commanding Aura | GRANT_ABILITY | expert_commander_commanding_aura | Help Die starts at d10; Rally grants +1 temp HP per 2 SP; Reinforce can spend 1 SP to grant ADV on Saves made as part of the Attack. | collected | sheet-collector | 0.8 |

### Commander / Crusader / Gallant Hero

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope   | Label        | Type               | Target              | Value | Coverage  | Path            | Confidence |
| ------- | ------------ | ------------------ | ------------------- | ----- | --------- | --------------- | ---------- |
| feature | Gallant Hero | GRANT_ADV_ON_CHECK | convince_not_afraid | ADV   | collected | sheet-collector | 0.8        |

### Commander / Crusader / Virtuous Vanguard

Level 3; subclass; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Aura of Courage | GRANT_ABILITY | aura_of_courage | Allies in aura: Resistance to Frightened and Intimidated. | collected | sheet-collector | 0.8 |
| benefit | Protective Orders | GRANT_ABILITY | protective_orders | Commander's Call targets gain Resistance (1) to next damage before your next turn. | collected | sheet-collector | 0.8 |
| benefit | Restoring Rally | GRANT_ABILITY | restoring_rally | Rally: Bloodied creatures regain HP instead of Temp HP. | collected | sheet-collector | 0.8 |

### Commander / Warlord / Battlefield Tactician

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Battlefield Tactician | GRANT_ADV_ON_CHECK | military_knowledge | ADV | collected | sheet-collector | 0.8 |

### Commander / Warlord / Offensive Tactics

Level 3; subclass; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Morale Breaker | GRANT_ABILITY | morale_breaker | Commander's Call: Free Intimidate Action against creature within 10 Spaces (once per combat). | collected | sheet-collector | 0.8 |
| benefit | Battlefield Tactics | GRANT_ABILITY | battlefield_tactics | Allies in aura: +1 damage on first Melee Attack vs flanked creatures each turn. | collected | sheet-collector | 0.8 |
| benefit | Priority Target | GRANT_ABILITY | priority_target | Priority Target (1 AP + 1 SP): Choose creature within 10 Spaces. Until your next turn, allies in aura have ADV on first attack on their turns vs that creature. | collected | sheet-collector | 0.8 |

## Druid

Category: spellcaster. Core features: 6. Subclasses: 2. Subclass features: 4.

### Druid / Druid Domain

Level 1; core; status covered; score 1; selections 0; effects 5.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Domain Creation | GRANT_ABILITY | druid_domain | Create 8 Domain Spaces (1 AP + 1 MP). Cast spells from any Domain Space. | collected | sheet-collector | 0.8 |
| benefit | Nature's Grasp | GRANT_ABILITY | natures_grasp | Spend 1 AP to bind creature in Domain (Spell Check vs Repeated Physical Save). | collected | sheet-collector | 0.8 |
| benefit | Move Creature | GRANT_ABILITY | move_creature | Spend 1 AP to move bound creature up to 2 Spaces within Domain. | collected | sheet-collector | 0.8 |
| benefit | Move Object | GRANT_ABILITY | move_object | Use Object Action from any Domain Space, move objects up to 5 Spaces. | collected | sheet-collector | 0.8 |
| benefit | Wild Growth | GRANT_ABILITY | wild_growth | 1 AP + 1 MP: DC 10 Spell Check to heal 2+ HP, then 1 HP per turn in Domain. | collected | sheet-collector | 0.8 |

### Druid / Spellcasting Path

Level 1; core; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Spell_Focuses | true | collected | sheet-collector | 0.8 |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Light_Armor | true | collected | sheet-collector | 0.8 |

### Druid / Wild Form

Level 1; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Transformation | GRANT_ABILITY | wild_form | Transform: 1 AP + 1 MP (free once per Long Rest). Gain 3 Wild Form HP, natural weapons. | collected | sheet-collector | 0.8 |
| benefit | Beast Traits | GRANT_ABILITY | beast_traits | 3 Trait Points for Beast/Wild Form traits. Spend extra MP for +2 Trait Points each. | collected | sheet-collector | 0.8 |
| benefit | Form Switching | GRANT_ABILITY | form_switching | Spend 1 AP to switch between True Form and Wild Forms. | collected | sheet-collector | 0.8 |

### Druid / Wild Speech

Level 1; core; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Wild Speech | GRANT_CANTRIP | druidcraft | 1 | calculated | spell-slot-generation | 0.9 |
| feature | Wild Speech | GRANT_CHOICE | wild_speech | 1 | choice-tracked | unresolved-choice-or-ui-selection | 0.7 |

### Druid / Nature's Torrent

Level 2; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Nature's Torrent | GRANT_ABILITY | natures_torrent | Reaction (1 AP): Create 3 Space Diameter Sphere for 1 minute. Creatures have Vulnerability (1) to triggering Elemental damage and DisADV on movement/Prone resistance saves. | collected | sheet-collector | 0.8 |

### Druid / Expert Druid

Level 5; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Druid Domain | GRANT_ABILITY | expert_druid_druid_domain | Druid Domain spaces increase to 10; vanish if you end your turn farther than 20 Spaces away; spend MP for +8 Spaces per MP; Wild Growth heals +1 HP per 2 MP. | collected | sheet-collector | 0.8 |
| benefit | Wild Form | GRANT_ABILITY | expert_druid_wild_form | Wild Form gains +1 HP and +1 Trait Point. | collected | sheet-collector | 0.8 |
| benefit | Nature's Torrent | GRANT_ABILITY | expert_druid_natures_torrent | Nature's Torrent range 15 Spaces; spend 2 MP for +1 Vulnerability or X MP for +X Area diameter. | collected | sheet-collector | 0.8 |

### Druid / Phoenix / Fire Within

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Fire Within | GRANT_ABILITY | fire_within | Immune to cold weather. Boil 1 gallon liquid with 1 minute contact. | collected | sheet-collector | 0.8 |

### Druid / Phoenix / Flames of Rebirth

Level 3; subclass; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Fiery Form | GRANT_ABILITY | fiery_form | Wild Forms: Elemental (Fire) type, Fire Resistance (1), Fire damage natural weapons. | collected | sheet-collector | 0.8 |
| benefit | Cleansing Flames | GRANT_ABILITY | cleansing_flames | When healing in Domain: remove Impaired, Dazed, Burning, or Poisoned. | collected | sheet-collector | 0.8 |
| benefit | Rolling Wild Fire | GRANT_ABILITY | rolling_wild_fire | Creatures take 1 Fire damage per Space moved in Domain or starting turn in Domain. | collected | sheet-collector | 0.8 |

### Druid / Rampant Growth / Overgrowth

Level 3; subclass; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Plant Form | GRANT_ABILITY | plant_form | Wild Forms: Plant type, immune to Bleeding, Poison damage natural weapons. | collected | sheet-collector | 0.8 |
| benefit | Vineguard | GRANT_ABILITY | vineguard | Creatures of choice in Domain gain benefits of 1/2 Cover. | collected | sheet-collector | 0.8 |
| benefit | Thorny Grasp | GRANT_ABILITY | thorny_grasp | Creatures who fail Nature's Grasp save begin Bleeding. | collected | sheet-collector | 0.8 |

### Druid / Rampant Growth / Seed Vault

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Seed Vault | GRANT_ABILITY | seed_vault | Produce seeds of any mundane plant you've touched. | collected | sheet-collector | 0.8 |

## Hunter

Category: martial. Core features: 6. Subclasses: 2. Subclass features: 4.

### Hunter / Bestiary

Level 1; core; status covered; score 1; selections 1; effects 14.

Selections:

- Choose a Creature Type for your starting entries [count: 1] -> Aberration (GRANT_ABILITY); Beast (GRANT_ABILITY); Celestial (GRANT_ABILITY); Construct (GRANT_ABILITY); Dragon (GRANT_ABILITY); Elemental (GRANT_ABILITY); Fey (GRANT_ABILITY); Fiend (GRANT_ABILITY); Giant (GRANT_ABILITY); Humanoid (GRANT_ABILITY); Monstrosity (GRANT_ABILITY); Ooze (GRANT_ABILITY); Plant (GRANT_ABILITY); Undead (GRANT_ABILITY)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| choice-option | Choose a Creature Type for your starting entries: Aberration | GRANT_ABILITY | hunter_bestiary_aberration | Bestiary starting entry: Aberration. You have ADV on Checks to learn or recall information about Aberrations recorded in your Bestiary. | collected | sheet-collector | 0.8 |
| choice-option | Choose a Creature Type for your starting entries: Beast | GRANT_ABILITY | hunter_bestiary_beast | Bestiary starting entry: Beast. You have ADV on Checks to learn or recall information about Beasts recorded in your Bestiary. | collected | sheet-collector | 0.8 |
| choice-option | Choose a Creature Type for your starting entries: Celestial | GRANT_ABILITY | hunter_bestiary_celestial | Bestiary starting entry: Celestial. You have ADV on Checks to learn or recall information about Celestials recorded in your Bestiary. | collected | sheet-collector | 0.8 |
| choice-option | Choose a Creature Type for your starting entries: Construct | GRANT_ABILITY | hunter_bestiary_construct | Bestiary starting entry: Construct. You have ADV on Checks to learn or recall information about Constructs recorded in your Bestiary. | collected | sheet-collector | 0.8 |
| choice-option | Choose a Creature Type for your starting entries: Dragon | GRANT_ABILITY | hunter_bestiary_dragon | Bestiary starting entry: Dragon. You have ADV on Checks to learn or recall information about Dragons recorded in your Bestiary. | collected | sheet-collector | 0.8 |
| choice-option | Choose a Creature Type for your starting entries: Elemental | GRANT_ABILITY | hunter_bestiary_elemental | Bestiary starting entry: Elemental. You have ADV on Checks to learn or recall information about Elementals recorded in your Bestiary. | collected | sheet-collector | 0.8 |
| choice-option | Choose a Creature Type for your starting entries: Fey | GRANT_ABILITY | hunter_bestiary_fey | Bestiary starting entry: Fey. You have ADV on Checks to learn or recall information about Fey recorded in your Bestiary. | collected | sheet-collector | 0.8 |
| choice-option | Choose a Creature Type for your starting entries: Fiend | GRANT_ABILITY | hunter_bestiary_fiend | Bestiary starting entry: Fiend. You have ADV on Checks to learn or recall information about Fiends recorded in your Bestiary. | collected | sheet-collector | 0.8 |
| choice-option | Choose a Creature Type for your starting entries: Giant | GRANT_ABILITY | hunter_bestiary_giant | Bestiary starting entry: Giant. You have ADV on Checks to learn or recall information about Giants recorded in your Bestiary. | collected | sheet-collector | 0.8 |
| choice-option | Choose a Creature Type for your starting entries: Humanoid | GRANT_ABILITY | hunter_bestiary_humanoid | Bestiary starting entry: Humanoid. You have ADV on Checks to learn or recall information about Humanoids recorded in your Bestiary. | collected | sheet-collector | 0.8 |
| choice-option | Choose a Creature Type for your starting entries: Monstrosity | GRANT_ABILITY | hunter_bestiary_monstrosity | Bestiary starting entry: Monstrosity. You have ADV on Checks to learn or recall information about Monstrosities recorded in your Bestiary. | collected | sheet-collector | 0.8 |
| choice-option | Choose a Creature Type for your starting entries: Ooze | GRANT_ABILITY | hunter_bestiary_ooze | Bestiary starting entry: Ooze. You have ADV on Checks to learn or recall information about Oozes recorded in your Bestiary. | collected | sheet-collector | 0.8 |
| choice-option | Choose a Creature Type for your starting entries: Plant | GRANT_ABILITY | hunter_bestiary_plant | Bestiary starting entry: Plant. You have ADV on Checks to learn or recall information about Plants recorded in your Bestiary. | collected | sheet-collector | 0.8 |
| choice-option | Choose a Creature Type for your starting entries: Undead | GRANT_ABILITY | hunter_bestiary_undead | Bestiary starting entry: Undead. You have ADV on Checks to learn or recall information about Undead recorded in your Bestiary. | collected | sheet-collector | 0.8 |

### Hunter / Favored Terrain

Level 1; core; status partial; score 0.93; selections 1; effects 28.

Selections:

- Choose 2 types of Favored Terrain [count: 2] -> Grassland (MODIFY_STAT, GRANT_ABILITY); Forest (MODIFY_STAT, GRANT_ABILITY); Desert (GRANT_RESISTANCE, GRANT_ABILITY); Mountain (GRANT_MOVEMENT, GRANT_RESISTANCE, GRANT_ABILITY); Jungle (GRANT_RESISTANCE, GRANT_ADV_ON_SAVE, GRANT_ABILITY); Swamp (GRANT_RESISTANCE, GRANT_ADV_ON_SAVE, GRANT_ABILITY); Coast (GRANT_MOVEMENT, GRANT_ABILITY); Tundra (GRANT_RESISTANCE, GRANT_ABILITY); Subterranean (GRANT_SENSE, GRANT_ABILITY); Urban (MODIFY_STAT, GRANT_ABILITY)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| choice-option | Choose 2 types of Favored Terrain: Grassland | MODIFY_STAT | moveSpeed | 1 | calculated | stat-breakdown | 1 |
| choice-option | Choose 2 types of Favored Terrain: Grassland | MODIFY_STAT | jumpDistance | 1 | calculated | stat-breakdown | 1 |
| choice-option | Choose 2 types of Favored Terrain: Grassland | GRANT_ABILITY | favored_terrain_grassland | In grassland: ADV on Stealth and Survival, cannot be Surprised. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Forest | MODIFY_STAT | skillPoints | 2 | calculated | budget-or-slot-count | 0.9 |
| choice-option | Choose 2 types of Favored Terrain: Forest | GRANT_ABILITY | favored_terrain_forest | In forest: ADV on Stealth and Survival, cannot be Surprised. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Desert | GRANT_RESISTANCE | Fire | half | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Desert | GRANT_ABILITY | favored_terrain_desert | In desert: ADV on Stealth and Survival, cannot be Surprised, resistance to hot temperature Exhaustion. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Mountain | GRANT_MOVEMENT | climb | equal_to_speed | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Mountain | GRANT_RESISTANCE | Falling | half | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Mountain | GRANT_ABILITY | favored_terrain_mountain | In mountains: ADV on Stealth and Survival, cannot be Surprised, resistance to altitude Exhaustion. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Jungle | GRANT_RESISTANCE | Poisoned | true | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Jungle | GRANT_ADV_ON_SAVE | disease | true | unsupported | none | 0.25 |
| choice-option | Choose 2 types of Favored Terrain: Jungle | GRANT_ABILITY | favored_terrain_jungle | In jungle: ADV on Stealth and Survival, cannot be Surprised, ignore Difficult Terrain, Poisoned resistance, ADV vs diseases. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Swamp | GRANT_RESISTANCE | Poison | half | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Swamp | GRANT_RESISTANCE | Poisoned | true | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Swamp | GRANT_ADV_ON_SAVE | disease | true | unsupported | none | 0.25 |
| choice-option | Choose 2 types of Favored Terrain: Swamp | GRANT_ABILITY | favored_terrain_swamp | In swamp: ADV on Stealth and Survival, cannot be Surprised, Poison resistance, Poisoned resistance, ADV vs diseases. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Coast | GRANT_MOVEMENT | swim | equal_to_speed | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Coast | GRANT_ABILITY | favored_terrain_coast | In coastal areas: ADV on Stealth and Survival, cannot be Surprised, no underwater weapon penalties, double breath holding, ADV on Awareness underwater. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Tundra | GRANT_RESISTANCE | Cold | half | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Tundra | GRANT_ABILITY | favored_terrain_tundra | In tundra: ADV on Stealth and Survival, cannot be Surprised, resistance to cold temperature Exhaustion. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Subterranean | GRANT_SENSE | darkvision | 10 | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Subterranean | GRANT_SENSE | darkvision | 5 | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Subterranean | GRANT_SENSE | tremorsense | 3 | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Subterranean | GRANT_SENSE | tremorsense | 2 | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Subterranean | GRANT_ABILITY | favored_terrain_subterranean | Underground: ADV on Stealth and Survival, cannot be Surprised. Conditional bonuses for existing senses handled separately. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 types of Favored Terrain: Urban | MODIFY_STAT | skillPoints | 2 | calculated | budget-or-slot-count | 0.9 |
| choice-option | Choose 2 types of Favored Terrain: Urban | GRANT_ABILITY | favored_terrain_urban | In urban areas: ADV on Stealth and Survival, cannot be Surprised. | collected | sheet-collector | 0.8 |

### Hunter / Hunter's Mark

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Hunter's Mark | GRANT_ABILITY | hunters_mark | Mark a creature (1 AP + 1 SP): ADV on Awareness/Survival to find, first Martial Attack has ADV and ignores PDR, Heavy/Critical Hits grant d8 Help Die. | collected | sheet-collector | 0.8 |

### Hunter / Martial Path

Level 1; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope   | Label        | Type                  | Target        | Value | Coverage  | Path            | Confidence |
| ------- | ------------ | --------------------- | ------------- | ----- | --------- | --------------- | ---------- |
| feature | Martial Path | GRANT_COMBAT_TRAINING | Weapons       | true  | collected | sheet-collector | 0.8        |
| feature | Martial Path | GRANT_COMBAT_TRAINING | Light_Armor   | true  | collected | sheet-collector | 0.8        |
| feature | Martial Path | GRANT_COMBAT_TRAINING | Light_Shields | true  | collected | sheet-collector | 0.8        |

### Hunter / Hunter's Strike

Level 2; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Hunter's Strike | GRANT_ABILITY | hunters_strike | Spend 1 SP on a Weapon Attack to add: Acid (1 Corrosion, Agility Save for Hindered), Fire (1 Fire, Might Save for Burning), Piercing (1 Piercing, Might Save for Bleeding), Snare (1 Bludgeoning, Agility Save for Immobilized), or Toxin (1 Poison, Might Save for Impaired). +1 damage per additional SP. | collected | sheet-collector | 0.8 |

### Hunter / Expert Hunter

Level 5; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Hunter's Mark | GRANT_ABILITY | expert_hunter_hunters_mark | Hunter's Mark Help Die is d10; first Martial Attack ignores Physical Resistance. | collected | sheet-collector | 0.8 |
| benefit | Favored Terrain | GRANT_ABILITY | expert_hunter_favored_terrain | Choose 1 additional Favored Terrain. | collected | sheet-collector | 0.8 |
| benefit | Hunter's Strike | GRANT_ABILITY | expert_hunter_hunters_strike | Use up to 2 Hunter's Strike Enhancements on an Attack. | collected | sheet-collector | 0.8 |

### Hunter / Monster Slayer / Monster Hunter

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Monster Hunter | GRANT_ABILITY | monster_hunter | After recording 3 creatures of the same type, gain a Bestiary entry for the entire type. | collected | sheet-collector | 0.8 |

### Hunter / Monster Slayer / Monstrous Concoctions

Level 3; subclass; status covered; score 1; selections 1; effects 8.

Selections:

- Choose 3 Concoction Recipes [count: 3] -> Elemental Infusion (GRANT_CHOICE); Hydra's Blood (GRANT_ABILITY); Basilisk Eye (GRANT_ABILITY); Ooze Gel (GRANT_ABILITY); Aberrant Tumor (GRANT_ABILITY); Deathweed (GRANT_ABILITY); Plant Fibers (GRANT_ABILITY); Divine Water (GRANT_ABILITY)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| choice-option | Choose 3 Concoction Recipes: Elemental Infusion | GRANT_CHOICE | elemental_infusion_type | 1 | choice-tracked | unresolved-choice-or-ui-selection | 0.7 |
| choice-option | Choose 3 Concoction Recipes: Hydra's Blood | GRANT_ABILITY | hydras_blood | Regain 1 HP on Heavy Hits vs Marked target. Gain Poisoned Resistance. Melee attackers take 1 Poison damage. | collected | sheet-collector | 0.8 |
| choice-option | Choose 3 Concoction Recipes: Basilisk Eye | GRANT_ABILITY | basilisk_eye | Gain Tremorsense 20 for Marked target. Gain Physical Resistance (1). | collected | sheet-collector | 0.8 |
| choice-option | Choose 3 Concoction Recipes: Ooze Gel | GRANT_ABILITY | ooze_gel | Heavy Hits vs Marked target cause Hindered. Gain amorphous body properties. | collected | sheet-collector | 0.8 |
| choice-option | Choose 3 Concoction Recipes: Aberrant Tumor | GRANT_ABILITY | aberrant_tumor | ADV on Analyze Creature and Mental Saves vs Marked target. Gain Psychic Resistance (1). | collected | sheet-collector | 0.8 |
| choice-option | Choose 3 Concoction Recipes: Deathweed | GRANT_ABILITY | deathweed | Heavy Hits vs Marked target bypass Physical Resistances and stop healing. Gain death-related resistances. | collected | sheet-collector | 0.8 |
| choice-option | Choose 3 Concoction Recipes: Plant Fibers | GRANT_ABILITY | plant_fibers | Failed saves vs you stop Marked target's movement. Gain Bleeding immunity and 1 Temp HP per turn. | collected | sheet-collector | 0.8 |
| choice-option | Choose 3 Concoction Recipes: Divine Water | GRANT_ABILITY | divine_water | Heavy Hits vs Marked target cause Exposed. Gain Radiant Resistance (Half) and emit light. | collected | sheet-collector | 0.8 |

### Hunter / Trapper / Discerning Eye

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Discerning Eye | GRANT_ABILITY | discerning_eye | Gain ADV on checks to find and disarm traps. | collected | sheet-collector | 0.8 |

### Hunter / Trapper / Dynamic Traps

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Dynamic Traps | GRANT_ABILITY | dynamic_traps | Create and Set traps (max = Prime Modifier). Can spend 1 SP to add a Hunter's Strike effect to a trap upon setting it. | collected | sheet-collector | 0.8 |

## Monk

Category: martial. Core features: 7. Subclasses: 2. Subclass features: 4.

### Monk / Martial Path

Level 1; core; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope   | Label        | Type                  | Target      | Value | Coverage  | Path            | Confidence |
| ------- | ------------ | --------------------- | ----------- | ----- | --------- | --------------- | ---------- |
| feature | Martial Path | GRANT_COMBAT_TRAINING | Weapons     | true  | collected | sheet-collector | 0.8        |
| feature | Martial Path | GRANT_COMBAT_TRAINING | Light_Armor | true  | collected | sheet-collector | 0.8        |

### Monk / Meditation

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Meditation | GRANT_ABILITY | monk_meditation | During a Short Rest or longer, temporarily increase the Mastery level of a chosen Charisma or Intelligence skill by 1 up to its cap. You stay alert while meditating. | collected | sheet-collector | 0.8 |

### Monk / Monk Stance

Level 1; core; status covered; score 1; selections 1; effects 9.

Selections:

- Choose 2 Monk Stances [count: 2] -> Bear Stance (GRANT_ABILITY); Bull Stance (GRANT_ABILITY); Cobra Stance (GRANT_ABILITY); Gazelle Stance (GRANT_ABILITY); Mantis Stance (GRANT_ABILITY); Mongoose Stance (GRANT_ABILITY); Scorpion Stance (GRANT_ABILITY); Turtle Stance (GRANT_ABILITY); Wolf Stance (GRANT_ABILITY)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| choice-option | Choose 2 Monk Stances: Bear Stance | GRANT_ABILITY | monk_stance_bear | Active stance: +1 damage on Heavy Hits or higher and Critical Hits with Unarmed Strikes or Melee Weapons; once per turn, after missing a Melee Martial Attack, gain ADV on the next Melee Martial Attack before end of turn. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Monk Stances: Bull Stance | GRANT_ABILITY | monk_stance_bull | Active stance: Successful Physical Checks to push also deal 1 Bludgeoning damage; pushed targets move 1 additional Space, and you can move in a straight line with the target without Opportunity Attacks or spending movement. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Monk Stances: Cobra Stance | GRANT_ABILITY | monk_stance_cobra | Active stance: +1 damage with Unarmed Strike or Melee Weapon Martial Attacks against creatures that damaged you since the start of your last turn; when a creature in Melee Range misses you with a Melee Attack, spend 1 AP as a Reaction to make a Melee Martial Attack against it. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Monk Stances: Gazelle Stance | GRANT_ABILITY | monk_stance_gazelle | Active stance: Speed and Jump Distance +1, ignore Difficult Terrain, and gain ADV on Acrobatics Checks and Agility Saves. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Monk Stances: Mantis Stance | GRANT_ABILITY | monk_stance_mantis | Active stance: ADV on Checks and Saves to initiate, maintain, or escape Grapples; when you start your turn with at least 1 creature Grappled, gain +1 AP for a Grapple Maneuver against a creature you have Grappled. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Monk Stances: Mongoose Stance | GRANT_ABILITY | monk_stance_mongoose | Active stance: Melee Martial Attacks deal +1 damage while Flanked; when making a Melee Martial Attack, choose a second target within Melee Range and make one Attack Check against both targets. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Monk Stances: Scorpion Stance | GRANT_ABILITY | monk_stance_scorpion | Active stance: Creatures provoke Opportunity Attacks when entering your Melee Range. On Melee Martial Attack, spend 1 AP for +1 damage and a Physical Save; failure Impairs the target on its next Physical Check before end of your next turn. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Monk Stances: Turtle Stance | GRANT_ABILITY | monk_stance_turtle | Active stance: Speed becomes 1 unless already lower; gain PDR, EDR, and MDR; gain ADV on Might Saves and Saves against being moved or knocked Prone. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Monk Stances: Wolf Stance | GRANT_ABILITY | monk_stance_wolf | Active stance: After attacking with an Unarmed Strike or Melee Weapon, immediately move up to 1 Space without spending movement; gain ADV on Opportunity Attacks, and creatures have DisADV on Opportunity Attacks against you. | collected | sheet-collector | 0.8 |

### Monk / Monk Training

Level 1; core; status covered; score 1; selections 0; effects 6.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Iron Palm | GRANT_ABILITY | monk_iron_palm | Limbs are Natural Weapons (2 Bludgeoning damage, chosen Weapon Style Enhancement). | collected | sheet-collector | 0.8 |
| benefit | Patient Defense | MODIFY_STAT | pd | 2 | calculated | stat-breakdown | 1 |
| benefit | Step of the Wind | MODIFY_STAT | moveSpeed | 1 | calculated | stat-breakdown | 1 |
| benefit | Step of the Wind | MODIFY_STAT | jumpDistance | 1 | calculated | stat-breakdown | 1 |
| benefit | Step of the Wind | GRANT_ABILITY | monk_step_of_the_wind_mobility | Move along vertical surfaces or across liquids up to your Speed without falling during the movement. | collected | sheet-collector | 0.8 |
| benefit | Step of the Wind | GRANT_ABILITY | monk_step_of_the_wind_prime_modifier | Use your Prime Modifier instead of Agility for Jump Distance and Falling damage. | collected | sheet-collector | 0.8 |

### Monk / Source of Power

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Source of Power | GRANT_ABILITY | monk_source_of_power | Monks harness inner Ki through training, mentorship, or deep meditation, perfecting both mind and body. | collected | sheet-collector | 0.8 |

### Monk / Spiritual Balance

Level 2; core; status covered; score 1; selections 0; effects 4.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Ki Points | GRANT_ABILITY | monk_ki_points | Ki maximum equals Stamina Points. When you spend a Stamina Point on your turn, regain 1 Ki Point. Regain all spent Ki Points when Combat ends. | collected | sheet-collector | 0.8 |
| benefit | Ki Actions | GRANT_ABILITY | monk_deflect_attack | When a creature misses you with a Ranged Martial Attack targeting PD, spend 1+ Ki. Redirect at a creature within 5 Spaces (Attack Check vs PD). Hit: deal Ki spent as damage (same type as triggering Attack). | collected | sheet-collector | 0.8 |
| benefit | Ki Actions | GRANT_ABILITY | monk_slow_fall | Spend 1+ Ki when taking fall damage. Reduce damage by Ki spent. | collected | sheet-collector | 0.8 |
| benefit | Ki Actions | GRANT_ABILITY | monk_uncanny_dodge | When a creature makes an Attack against you, spend 1 Ki Point to impose DisADV on the attack. | collected | sheet-collector | 0.8 |

### Monk / Expert Monk

Level 5; core; status covered; score 1; selections 0; effects 5.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Monk Training | MODIFY_STAT | moveSpeed | 1 | calculated | stat-breakdown | 1 |
| benefit | Monk Training | MODIFY_STAT | jumpDistance | 1 | calculated | stat-breakdown | 1 |
| benefit | Monk Training | GRANT_ABILITY | expert_monk_training | Iron Palm gains an additional Melee Weapon Style and Unarmed Strike can use both Weapon Enhancements. | collected | sheet-collector | 0.8 |
| benefit | Monk Stances | GRANT_ABILITY | expert_monk_stances | Choose 1 additional Monk Stance. | collected | sheet-collector | 0.8 |
| benefit | Spiritual Balance | GRANT_ABILITY | expert_monk_spiritual_balance | Ki Point maximum +1; whenever you regain Ki, regain half your maximum Ki. | collected | sheet-collector | 0.8 |

### Monk / Astral Self / Astral Awakening

Level 3; subclass; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Astral Arms | GRANT_ABILITY | monk_astral_arms | Astral arms usable only for Unarmed Strikes with Reach; deal Astral damage and can target PD or AD (choose per attack). | collected | sheet-collector | 0.8 |
| benefit | Astral Deflection | GRANT_ABILITY | monk_astral_deflection | When Deflecting, you can redirect projectiles that missed any target within 2 spaces of you. | collected | sheet-collector | 0.8 |

### Monk / Astral Self / Astral Watch

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Astral Watch | GRANT_ABILITY | monk_astral_watch | While Unconscious, your astral self remains aware and can converse. During sleep, you may awaken instantly. | collected | sheet-collector | 0.8 |

### Monk / Shifting Tide / Ebb and Flow

Level 3; subclass; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Ebb | GRANT_ABILITY | monk_ebb_movement | Gain 2 spaces of movement when you enter a new Monk Stance. | collected | sheet-collector | 0.8 |
| benefit | Flow | GRANT_ABILITY | monk_flow_counter | If Uncanny Dodge is used against a melee attack, spend 1 AP to make an Opportunity Attack against the attacker, provided they're within range. | collected | sheet-collector | 0.8 |
| benefit | Changing Tides | GRANT_ABILITY | monk_changing_tides | Deflect Attack works on Melee Martial Attacks from Large or smaller creatures; redirect to a different target within 1 space. | collected | sheet-collector | 0.8 |

### Monk / Shifting Tide / Fluid Movement

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Fluid Movement | GRANT_ABILITY | monk_fluid_movement | Move through spaces as though you were one size smaller. | collected | sheet-collector | 0.8 |

## Rogue

Category: martial. Core features: 7. Subclasses: 2. Subclass features: 4.

### Rogue / Cypher Speech

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Cypher Speech | GRANT_ABILITY | rogue_cypher_speech | Become fluent in a Mortal language and craft hidden messages for a demographic of your choice, embedding simple directives in speech or writing. | collected | sheet-collector | 0.8 |

### Rogue / Debilitating Strike

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Debilitating Strike | GRANT_ABILITY | rogue_debilitating_strike | When making a Weapon Attack, spend 1 SP to force a Physical Save. Failure: target suffers Deafened, Exposed, Hindered, or Slowed 2 for 1 Round; same option cannot affect a target more than once at a time. | collected | sheet-collector | 0.8 |

### Rogue / Martial Path

Level 1; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope   | Label        | Type                  | Target        | Value | Coverage  | Path            | Confidence |
| ------- | ------------ | --------------------- | ------------- | ----- | --------- | --------------- | ---------- |
| feature | Martial Path | GRANT_COMBAT_TRAINING | Weapons       | true  | collected | sheet-collector | 0.8        |
| feature | Martial Path | GRANT_COMBAT_TRAINING | Light_Armor   | true  | collected | sheet-collector | 0.8        |
| feature | Martial Path | GRANT_COMBAT_TRAINING | Light_Shields | true  | collected | sheet-collector | 0.8        |

### Rogue / Roguish Finesse

Level 1; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Cunning Action | GRANT_ABILITY | rogue_cunning_action | Gain movement equal to half Speed when taking Disengage, Feint, or Hide; movement occurs immediately before or after the action. | collected | sheet-collector | 0.8 |
| benefit | Skill Expertise | INCREASE_SKILL_MASTERY_CAP |  | 1 | validated | mastery-cap-validation | 0.85 |
| benefit | Multi-Skilled | MODIFY_STAT | skillPoints | 1 | calculated | budget-or-slot-count | 0.9 |

### Rogue / Source of Power

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Source of Power | GRANT_ABILITY | rogue_source_of_power | Rogues exploit weakness through nimbleness and cunning, whether learned as thieves, nobles, or assassins. | collected | sheet-collector | 0.8 |

### Rogue / Cheap Shot

Level 2; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Cheap Shot | GRANT_ABILITY | rogue_cheap_shot | +1 damage on Martial Attacks against creatures that are Flanked or Prone, have any Condition other than Invisible, or are targets you are Hidden from. | collected | sheet-collector | 0.8 |

### Rogue / Expert Rogue

Level 5; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Debilitating Strike | GRANT_ABILITY | expert_rogue_debilitating_strike | Spend SP to choose 1 additional Debilitating Strike condition per SP. | collected | sheet-collector | 0.8 |
| benefit | Roguish Finesse | MODIFY_STAT | skillPoints | 1 | calculated | budget-or-slot-count | 0.9 |
| benefit | Cheap Shot | GRANT_ABILITY | expert_rogue_cheap_shot | Cheap Shot deals +2 damage instead. | collected | sheet-collector | 0.8 |

### Rogue / Long Death / Hundred Ways to Die

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Hundred Ways to Die | GRANT_ADV_ON_CHECK | cause_of_death_or_ways_to_kill | ADV | collected | sheet-collector | 0.8 |

### Rogue / Long Death / Thousand Cuts

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Thousand Cuts | GRANT_ABILITY | rogue_thousand_cuts | On failed Debilitating Strike saves, inflict Bleeding; DC to end equals your Save DC and regaining HP cannot end it. | collected | sheet-collector | 0.8 |

### Rogue / Swashbuckler / Renegade Duelist

Level 3; subclass; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Flourishes | GRANT_ABILITY | rogue_flourishes | Cunning Action now includes Disarm and Dodge, providing the same free movement before or after the action. | collected | sheet-collector | 0.8 |
| benefit | Taunting Shot | GRANT_ABILITY | rogue_taunting_shot | Once per round when an Attack targets a creature that fulfills the criteria for Cheap Shot, forego Cheap Shot damage to force a Charisma Save. Failure: the creature is Taunted until the end of your next turn. | collected | sheet-collector | 0.8 |
| benefit | Riposte | GRANT_ABILITY | rogue_riposte | When a creature within your melee range misses you with an attack, it provokes an Opportunity Attack from you. | collected | sheet-collector | 0.8 |

### Rogue / Swashbuckler / Tall Tales

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Tall Tales | GRANT_ABILITY | rogue_tall_tales | Spin captivating stories for up to five minutes to distract non-hostile crowds, giving them DisADV on Awareness Checks while enthralled. | collected | sheet-collector | 0.8 |

## Sorcerer

Category: spellcaster. Core features: 6. Subclasses: 2. Subclass features: 4.

### Sorcerer / Innate Power

Level 1; core; status covered; score 1; selections 1; effects 5.

Selections:

- Choose a Sorcerous Origin [count: 1] -> Intuitive Magic (GRANT_SPELL); Resilient Magic (GRANT_RESISTANCE); Unstable Magic (GRANT_ABILITY)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Increased Maximum MP | MODIFY_STAT | mpMax | 1 | calculated | stat-breakdown | 1 |
| benefit | Focus Property | GRANT_ABILITY | focus_property_sorcerer | Gain a 1 point Focus Property (changeable on Long Rest). | collected | sheet-collector | 0.8 |
| choice-option | Choose a Sorcerous Origin: Intuitive Magic | GRANT_SPELL | sorcerer_spell_list | 2 | calculated | spell-slot-generation | 0.9 |
| choice-option | Choose a Sorcerous Origin: Resilient Magic | GRANT_RESISTANCE | Dazed | true | collected | sheet-collector | 0.8 |
| choice-option | Choose a Sorcerous Origin: Unstable Magic | GRANT_ABILITY | unstable_magic | When you Critically Succeed or Fail on a Spell Check, roll on the Wild Magic Table. | collected | sheet-collector | 0.8 |

### Sorcerer / Overload Magic

Level 1; core; status partial; score 0.5; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Spell Check Bonus | MODIFY_STAT | spellCheck | 5 | unknown-target | none | 0.35 |
| benefit | Overload Strain | GRANT_ABILITY | overload_strain | Must save vs Exhaustion when using Overload Magic and at the start of each turn. | collected | sheet-collector | 0.8 |

### Sorcerer / Sorcery

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope   | Label   | Type        | Target  | Value | Coverage   | Path                  | Confidence |
| ------- | ------- | ----------- | ------- | ----- | ---------- | --------------------- | ---------- |
| feature | Sorcery | GRANT_SPELL | Sorcery | 1     | calculated | spell-slot-generation | 0.9        |

### Sorcerer / Spellcasting Path

Level 1; core; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Spell_Focuses | true | collected | sheet-collector | 0.8 |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Light_Armor | true | collected | sheet-collector | 0.8 |

### Sorcerer / Meta Magic

Level 2; core; status covered; score 1; selections 1; effects 6.

Selections:

- Choose 2 Spell Enhancements [count: 2] -> Careful Spell (GRANT_ABILITY); Distant Spell (GRANT_ABILITY); Quickened Spell (GRANT_ABILITY); Subtle Spell (GRANT_ABILITY); Transmuted Spell (GRANT_ABILITY); Vicious Spell (GRANT_ABILITY)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| choice-option | Choose 2 Spell Enhancements: Careful Spell | GRANT_ABILITY | sorcerer_meta_magic_careful_spell | 1 MP: When casting an area Spell, exclude creatures of your choice from the Spell's damage and effects. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Spell Enhancements: Distant Spell | GRANT_ABILITY | sorcerer_meta_magic_distant_spell | 1 MP: Increase a Spell's range by 2 Spaces if 1 Space, or 10 Spaces if greater. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Spell Enhancements: Quickened Spell | GRANT_ABILITY | sorcerer_meta_magic_quickened_spell | 1 MP: Reduce the AP cost of a Spell by 1, minimum 1 AP. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Spell Enhancements: Subtle Spell | GRANT_ABILITY | sorcerer_meta_magic_subtle_spell | 1 MP: Cast the Spell without requiring Somatic or Verbal Components. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Spell Enhancements: Transmuted Spell | GRANT_ABILITY | sorcerer_meta_magic_transmuted_spell | 1 MP: Change a Spell's damage type to any other damage type except True damage. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Spell Enhancements: Vicious Spell | GRANT_ABILITY | sorcerer_meta_magic_vicious_spell | 1 MP: When casting a Spell that forces a Save, 1 target has DisADV on its first Save against the Spell. | collected | sheet-collector | 0.8 |

### Sorcerer / Expert Sorcerer

Level 5; core; status covered; score 1; selections 0; effects 4.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Innate Power | MODIFY_STAT | mpMax | 1 | calculated | stat-breakdown | 1 |
| benefit | Innate Power | GRANT_ABILITY | expert_sorcerer_innate_power | Gain an additional 1-point Focus Property choice; change either or both chosen properties on a Long Rest. | collected | sheet-collector | 0.8 |
| benefit | Overload Magic | GRANT_ABILITY | expert_sorcerer_overload_magic | No Attribute Save when you use Overload; still save at the start of each turn while Overloaded. | collected | sheet-collector | 0.8 |
| benefit | Meta Magic | GRANT_ABILITY | expert_sorcerer_meta_magic | Learn 1 additional Meta Magic option and use 2 different Meta Magic Spell Enhancements at a time. | collected | sheet-collector | 0.8 |

### Sorcerer / Angelic / Celestial Appearance (Flavor Feature)

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Celestial Appearance (Flavor Feature) | GRANT_ABILITY | celestial_appearance | Gain angelic features. If already fluent in Celestial, gain 1 Language Mastery. | collected | sheet-collector | 0.8 |

### Sorcerer / Angelic / Celestial Spark

Level 3; subclass; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Celestial Origin | GRANT_ABILITY | celestial_origin | Gain 2 Ancestry Points for Angelborn Traits. | collected | sheet-collector | 0.8 |
| benefit | Celestial Protection | GRANT_ABILITY | careful_spell | Learn Careful Spell. It costs 0 MP. | collected | sheet-collector | 0.8 |
| benefit | Celestial Overload | GRANT_ABILITY | celestial_overload | Spend 1 AP while overloaded for AoE heal/damage. | collected | sheet-collector | 0.8 |

### Sorcerer / Draconic / Draconic Appearance (Flavor Feature)

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Draconic Appearance (Flavor Feature) | GRANT_ABILITY | draconic_appearance | Gain draconic features and 1 level of Language Mastery in Draconic (or another language if already fluent). | collected | sheet-collector | 0.8 |

### Sorcerer / Draconic / Draconic Spark

Level 3; subclass; status covered; score 1; selections 0; effects 4.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Draconic Origin | GRANT_ABILITY | draconic_origin | Gain 2 Ancestry Points for Dragonborn Traits & choose a Draconic Origin. | collected | sheet-collector | 0.8 |
| benefit | Draconic Overload | GRANT_RESISTANCE | Physical | 1 | collected | sheet-collector | 0.8 |
| benefit | Draconic Overload | GRANT_RESISTANCE | Draconic Origin Damage Type | 1 | collected | sheet-collector | 0.8 |
| benefit | Draconic Transmutation | GRANT_ABILITY | draconic_transmutation | Gain Transmuted Spell. Cost is 0 MP if changing to Draconic Origin damage type. | collected | sheet-collector | 0.8 |

## Spellblade

Category: hybrid. Core features: 8. Subclasses: 2. Subclass features: 5.

### Spellblade / Bound Weapon

Level 1; core; status covered; score 1; selections 0; effects 4.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Smite | GRANT_ABILITY | spellblade_bound_weapon_smite | Spend 1+ SP on a Martial Attack with bound weapon: +1 Bound Damage per SP, and gain 1 Martial Enhancement free. | collected | sheet-collector | 0.8 |
| benefit | Somatic Weapon | GRANT_ABILITY | spellblade_bound_weapon_somatic_weapon | Use your Bound Weapon to perform Somatic Components of Spells. | collected | sheet-collector | 0.8 |
| benefit | Illuminate | GRANT_ABILITY | spellblade_bound_weapon_illuminate | Produce, extinguish, or adjust bright/dim light in a 5-space radius from the bonded weapon for free. | collected | sheet-collector | 0.8 |
| benefit | Recall | GRANT_ABILITY | spellblade_bound_weapon_recall | When the bonded weapon is within 20 spaces and unsecured, call it to your hand for free; if you lack a free hand, it lands at your feet. | collected | sheet-collector | 0.8 |

### Spellblade / Martial Path

Level 1; core; status progression-derived; score 1; selections 0; effects 0.

Selections: none.

Effects: none.

### Spellblade / Sense Magic

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Sense Magic | GRANT_ABILITY | spellblade_sense_magic | Focus for 1 minute to detect certain creature types within 20 spaces; Spell Checks reveal their nature and location until the end of your next turn. | collected | sheet-collector | 0.8 |

### Spellblade / Source of Power

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Source of Power | GRANT_ABILITY | spellblade_source_of_power | Spellblades wield magic drawn from patrons, oaths, bloodlines, personal study, artistic expression, or mysterious relics. | collected | sheet-collector | 0.8 |

### Spellblade / Spellblade Disciplines

Level 1; core; status covered; score 1; selections 1; effects 10.

Selections:

- Choose 2 Spellblade Disciplines [count: 2] -> Magus (MODIFY_STAT, GRANT_SPELL); Warrior (GRANT_COMBAT_TRAINING, GRANT_MANEUVERS); Acolyte (GRANT_ABILITY); Hex Warrior (GRANT_ABILITY); Spell Breaker (GRANT_ABILITY); Spell Warder (GRANT_ABILITY); Blink Blade (GRANT_ABILITY)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| choice-option | Choose 2 Spellblade Disciplines: Magus | MODIFY_STAT | mpMax | 1 | calculated | stat-breakdown | 1 |
| choice-option | Choose 2 Spellblade Disciplines: Magus | GRANT_SPELL | spellblade_magus_spell | 1 | calculated | spell-slot-generation | 0.9 |
| choice-option | Choose 2 Spellblade Disciplines: Warrior | GRANT_COMBAT_TRAINING | Heavy_Armor | true | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Spellblade Disciplines: Warrior | GRANT_COMBAT_TRAINING | Heavy_Shields | true | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Spellblade Disciplines: Warrior | GRANT_MANEUVERS | spellblade_warrior_maneuvers | 1 | calculated | maneuver-budget | 0.9 |
| choice-option | Choose 2 Spellblade Disciplines: Acolyte | GRANT_ABILITY | spellblade_acolyte | Spend 1 AP and 1 MP to heal or cure: Heal – DC 10 Spell Check restores up to 3 HP (2 HP on failure, +1 HP per 5 over). Cure – Spell Check vs disease/poison DC to end it on a creature within 1 space. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Spellblade Disciplines: Hex Warrior | GRANT_ABILITY | spellblade_hex_warrior | Spend 1 AP and 1 MP to curse a creature within 10 spaces for 1 minute; Spell Check vs Repeated Physical Save. Failure: target is Dazed or Impaired (your choice), takes 1 Umbral damage each turn, and cannot regain HP. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Spellblade Disciplines: Spell Breaker | GRANT_ABILITY | spellblade_spell_breaker | Initiate a Spell Duel as the Challenger without spending MP using a weapon you wield if the caster or a target is within weapon range or you are between them. Make a Martial Check instead of a Spell Check. Spend SP for +1 bonus per SP and MP as normal for +2 bonus per MP. You have ADV if within 1 Space of the caster. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Spellblade Disciplines: Spell Warder | GRANT_ABILITY | spellblade_spell_warder | When you deal Elemental or Mystical damage with an Attack, gain Resistance (1) to that damage type for 1 Round; replace or maintain the resistance on subsequent triggers. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Spellblade Disciplines: Blink Blade | GRANT_ABILITY | spellblade_blink_blade | Once per turn, immediately before or after making an attack, teleport to a space you can see within 1 space of your original position. | collected | sheet-collector | 0.8 |

### Spellblade / Spellcasting Path

Level 1; core; status progression-derived; score 1; selections 0; effects 0.

Selections: none.

Effects: none.

### Spellblade / Spellstrike

Level 2; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Spellstrike | GRANT_ABILITY | spellblade_spellstrike | Once per turn when making a Martial Attack, cast a Spell as part of the same Action for 1 AP less. The Spell must target 1 creature targeted by the Attack, cannot exceed the Spell range, uses the Attack Check if it requires a Check, and uses your Save DC for Saves. The combined attack can benefit from Martial and Spell Enhancements and does not require Somatic Components. | collected | sheet-collector | 0.8 |

### Spellblade / Expert Spellblade

Level 5; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Bound Weapon | GRANT_ABILITY | expert_spellblade_bound_weapon | Bound Damage ignores Resistance to its damage type. | collected | sheet-collector | 0.8 |
| benefit | Spellblade Discipline | GRANT_ABILITY | expert_spellblade_discipline | Choose 1 additional Discipline; Acolyte +2 healing per MP, Hex Warrior +1 damage per MP, Spell Warder can spend 1 MP for Resistance Half. | collected | sheet-collector | 0.8 |
| benefit | Spellstrike | GRANT_ABILITY | expert_spellblade_spellstrike | Spellstrike Spell can target multiple creatures or an Area when at least 1 Spell target is also a Martial Attack target. | collected | sheet-collector | 0.8 |

### Spellblade / Paladin / Holy Warrior

Level 3; subclass; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Aura of Protection | GRANT_ABILITY | spellblade_paladin_aura_of_protection | Allies you choose within 2 spaces gain ADV on Mental Saves. | collected | sheet-collector | 0.8 |
| benefit | Divine Strike | GRANT_ABILITY | spellblade_paladin_divine_strike | When you deal damage with Spellstrike, you may convert the spell’s damage to Radiant or Umbral (chosen when you gain this feature). | collected | sheet-collector | 0.8 |
| benefit | Lay on Hands | GRANT_ABILITY | spellblade_paladin_lay_on_hands | Add the Acolyte Spellblade Discipline to your known disciplines (or another if already known). Once per Long Rest, use the Acolyte Discipline without MP and gain +5 to the Spell Check. | collected | sheet-collector | 0.8 |

### Spellblade / Paladin / Oathsworn

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Oathsworn | GRANT_ADV_ON_CHECK | rally_non_hostile_allies | ADV | collected | sheet-collector | 0.8 |

### Spellblade / Rune Knight / Rune Expert

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Rune Expert | GRANT_ADV_ON_CHECK | interpret_magical_runes | ADV | collected | sheet-collector | 0.8 |

### Spellblade / Rune Knight / Rune Names

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Rune Names | GRANT_ABILITY | spellblade_rune_names | Common rune names include: Earth (Uruz/Terra), Flame (Ild/Ignis), Frost (Isaz/Frigus), Lightning (Thurisaz/Fulmen), Water (Laquz/Aqua), Wind (Ansuz/Ventus). | collected | sheet-collector | 0.8 |

### Spellblade / Rune Knight / Rune Weapon

Level 3; subclass; status covered; score 1; selections 1; effects 12.

Selections:

- Choose 2 Runes to learn [count: 2] -> Earth Rune (GRANT_ABILITY); Flame Rune (GRANT_ABILITY); Frost Rune (GRANT_ABILITY); Lightning Rune (GRANT_ABILITY, MODIFY_STAT); Water Rune (GRANT_ABILITY); Wind Rune (GRANT_ABILITY, MODIFY_STAT)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| choice-option | Choose 2 Runes to learn: Earth Rune | GRANT_ABILITY | spellblade_rune_weapon_earthquake | When you Smite with the rune-inscribed weapon, create Difficult Terrain in a 1-space radius sphere centered on the target. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Runes to learn: Earth Rune | GRANT_ABILITY | spellblade_rune_weapon_unmovable | Gain ADV on checks and saves against being knocked prone or moved against your will. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Runes to learn: Flame Rune | GRANT_ABILITY | spellblade_rune_weapon_scorching | When you Smite a creature, it must make a Physical Save or begin Burning. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Runes to learn: Flame Rune | GRANT_ABILITY | spellblade_rune_weapon_hearth | If you fought since inscribing this rune, regain 2 Rest Points when you finish a Short Rest. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Runes to learn: Frost Rune | GRANT_ABILITY | spellblade_rune_weapon_frostbite | When you Smite a creature, it must make a Physical Save or be Immobilized for 1 Round. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Runes to learn: Frost Rune | GRANT_ABILITY | spellblade_rune_weapon_glacier | When you roll Initiative, gain 2 Temp HP. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Runes to learn: Lightning Rune | GRANT_ABILITY | spellblade_rune_weapon_charged | When you Smite a creature, it must make a Physical Save or become Stunned 1 until the end of your next turn. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Runes to learn: Lightning Rune | MODIFY_STAT | moveSpeed | 1 | calculated | stat-breakdown | 1 |
| choice-option | Choose 2 Runes to learn: Water Rune | GRANT_ABILITY | spellblade_rune_weapon_wave | When you Smite a creature, it must make a Physical Save or be knocked Prone. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Runes to learn: Water Rune | GRANT_ABILITY | spellblade_rune_weapon_healing_waters | When an MP effect restores your HP, regain 1 additional HP. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Runes to learn: Wind Rune | GRANT_ABILITY | spellblade_rune_weapon_hurricane | When you Smite a creature, it must make a Physical Save or be pushed 1 space in a direction you choose. | collected | sheet-collector | 0.8 |
| choice-option | Choose 2 Runes to learn: Wind Rune | MODIFY_STAT | jumpDistance | 3 | calculated | stat-breakdown | 1 |

## Warlock

Category: spellcaster. Core features: 6. Subclasses: 2. Subclass features: 4.

### Warlock / Beseech Patron

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Beseech Patron | GRANT_ABILITY | warlock_beseech_patron | Beseech your Patron for aid when in need. The Patron may answer, demand something in return, or decline at GM discretion. | collected | sheet-collector | 0.8 |

### Warlock / Pact Boon

Level 1; core; status covered; score 1; selections 1; effects 11.

Selections:

- Choose your Pact Boon [count: 1] -> Pact Weapon (GRANT_ABILITY, GRANT_CHOICE); Pact Armor (GRANT_ABILITY, GRANT_CHOICE, GRANT_RESISTANCE); Pact Spell (GRANT_ABILITY); Pact Familiar (GRANT_SPELL, GRANT_ABILITY)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| choice-option | Choose your Pact Boon: Pact Weapon | GRANT_ABILITY | pact_weapon_mastery | Considered to have Training with your Pact Weapon. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Pact Boon: Pact Weapon | GRANT_CHOICE | maneuver_save | 2 | choice-tracked | unresolved-choice-or-ui-selection | 0.7 |
| choice-option | Choose your Pact Boon: Pact Weapon | GRANT_ABILITY | pact_weapon_style | Benefit from your Pact Weapon's Style Passive. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Pact Boon: Pact Weapon | GRANT_ABILITY | pact_weapon_summon | Dismiss to and summon from a pocket dimension as a Minor Action. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Pact Boon: Pact Armor | GRANT_ABILITY | pact_armor_mastery | Considered to have Training with your Pact Armor. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Pact Boon: Pact Armor | GRANT_CHOICE | maneuver_defensive | 3 | choice-tracked | unresolved-choice-or-ui-selection | 0.7 |
| choice-option | Choose your Pact Boon: Pact Armor | GRANT_RESISTANCE | mystical | true | collected | sheet-collector | 0.8 |
| choice-option | Choose your Pact Boon: Pact Armor | GRANT_ABILITY | pact_armor_summon | Dismiss to and summon from a pocket dimension as a Minor Action. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Pact Boon: Pact Spell | GRANT_ABILITY | pact_spell | Death's Toll: +1 damage to Bloodied targets. Range Increase: +1 (if 1 Space) or +5 (if greater). Patron's Favor: Once per Round, ADV on your Pact Spell's Check. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Pact Boon: Pact Familiar | GRANT_SPELL | Call Familiar | 1 | calculated | spell-slot-generation | 0.9 |
| choice-option | Choose your Pact Boon: Pact Familiar | GRANT_ABILITY | pact_familiar_bonus | Your familiar gains 3 additional Familiar Traits for free. | collected | sheet-collector | 0.8 |

### Warlock / Spellcasting Path

Level 1; core; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Spell_Focuses | true | collected | sheet-collector | 0.8 |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Light_Armor | true | collected | sheet-collector | 0.8 |

### Warlock / Warlock Contract

Level 1; core; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Hasty Bargain | GRANT_ABILITY | hasty_bargain | Once per turn: spend 1 HP to gain ADV on a Check. | collected | sheet-collector | 0.8 |
| benefit | Desperate Bargain | GRANT_ABILITY | desperate_bargain | Once per Combat: spend 1 AP to regain HP equal to your Prime Modifier, but become Exposed. | collected | sheet-collector | 0.8 |

### Warlock / Life Tap

Level 2; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Life Tap | GRANT_ABILITY | life_tap | Once per Long Rest, you can spend HP instead of MP for spell effects (regain on initiative). | collected | sheet-collector | 0.8 |

### Warlock / Expert Warlock

Level 5; core; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Warlock Contract | MODIFY_STAT | hpMax | 2 | calculated | stat-breakdown | 1 |
| benefit | Pact Boon | GRANT_ABILITY | expert_warlock_pact_boon | Chosen Pact Boon improves: Weapon/Armor gain a 1-point property and MP conversion, Pact Spell gains 2 any-source Spells and another Pact Spell, or Pact Familiar gains 3 Trait Points and no Negative Traits. | collected | sheet-collector | 0.8 |
| benefit | Life Tap | GRANT_ABILITY | expert_warlock_life_tap | Life Tap grants ADV on the Check to produce the effect. | collected | sheet-collector | 0.8 |

### Warlock / Eldritch / Alien Comprehension (Flavor Feature)

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Alien Comprehension (Flavor Feature) | GRANT_ABILITY | alien_comprehension | Become fluent in Deep Speech and understand mad writings. | collected | sheet-collector | 0.8 |

### Warlock / Eldritch / Otherworldly Gift

Level 3; subclass; status covered; score 1; selections 0; effects 3.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Psychic Spellcasting | GRANT_SPELL | any_psychic_tag | 1 | calculated | spell-slot-generation | 0.9 |
| benefit | Forbidden Knowledge | GRANT_ABILITY | forbidden_knowledge | Temporarily learn any spell after a rest with a 2 MP cost reduction. | collected | sheet-collector | 0.8 |
| benefit | Eldritch Bargain | GRANT_ABILITY | eldritch_bargain | Spend 1 HP to target a creature's other defense (PD or AD) with an attack. | collected | sheet-collector | 0.8 |

### Warlock / Fey / Dream Walker

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Dream Walker | GRANT_ADV_ON_CHECK | influence_or_navigate_dreams | ADV | collected | sheet-collector | 0.8 |

### Warlock / Fey / Fey Aspect

Level 3; subclass; status partial; score 0.8; selections 1; effects 5.

Selections:

- Choose your Fey Aspect Condition [count: 1] -> Charmed (GRANT_ABILITY); Intimidated (GRANT_ABILITY)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Can't Trick a Trickster | GRANT_ADV_ON_SAVE | Fey_Aspect_Condition | true | unsupported | none | 0.25 |
| benefit | Fey Step | GRANT_ABILITY | fey_step | Reaction teleport when hit, becoming invisible. | collected | sheet-collector | 0.8 |
| benefit | Beguiling Bargain | GRANT_ABILITY | beguiling_bargain | Spend 1 HP on spell/attack to force a save against your Fey Aspect Condition. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Fey Aspect Condition: Charmed | GRANT_ABILITY | warlock_fey_aspect_charmed | Your Fey Aspect Condition is Charmed. | collected | sheet-collector | 0.8 |
| choice-option | Choose your Fey Aspect Condition: Intimidated | GRANT_ABILITY | warlock_fey_aspect_intimidated | Your Fey Aspect Condition is Intimidated. | collected | sheet-collector | 0.8 |

## Wizard

Category: spellcaster. Core features: 6. Subclasses: 2. Subclass features: 5.

### Wizard / Arcane Sigil

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Arcane Sigil | GRANT_ABILITY | arcane_sigil | Create Arcane Sigil (1 AP + 1 MP): 1 Space area, choose School/Tag, creatures within have ADV on Spell Checks for that type. Can teleport sigil 1 AP within 10 spaces. | collected | sheet-collector | 0.8 |

### Wizard / Ritual Caster

Level 1; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Ritual Caster | GRANT_ABILITY | ritual_caster | Learn 1 Ritual Spell per Wizard level. Can study and learn Ritual Spells from external sources (hours = MP cost). | collected | sheet-collector | 0.8 |

### Wizard / Spell School Initiate

Level 1; core; status covered; score 1; selections 1; effects 16.

Selections:

- Choose your specialized Spell School [count: 1] -> Astromancy (GRANT_SPELL, GRANT_ABILITY); Conjuration (GRANT_SPELL, GRANT_ABILITY); Divination (GRANT_SPELL, GRANT_ABILITY); Elemental (GRANT_SPELL, GRANT_ABILITY); Enchantment (GRANT_SPELL, GRANT_ABILITY); Invocation (GRANT_SPELL, GRANT_ABILITY); Nullification (GRANT_SPELL, GRANT_ABILITY); Transmutation (GRANT_SPELL, GRANT_ABILITY)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| choice-option | Choose your specialized Spell School: Astromancy | GRANT_SPELL | astromancy_school | 2 | calculated | spell-slot-generation | 0.9 |
| choice-option | Choose your specialized Spell School: Astromancy | GRANT_ABILITY | signature_school_astromancy | Reduce MP cost by 1 for Astromancy spells (once per Long Rest, regain on Initiative). | collected | sheet-collector | 0.8 |
| choice-option | Choose your specialized Spell School: Conjuration | GRANT_SPELL | conjuration_school | 2 | calculated | spell-slot-generation | 0.9 |
| choice-option | Choose your specialized Spell School: Conjuration | GRANT_ABILITY | signature_school_conjuration | Reduce MP cost by 1 for Conjuration spells (once per Long Rest, regain on Initiative). | collected | sheet-collector | 0.8 |
| choice-option | Choose your specialized Spell School: Divination | GRANT_SPELL | divination_school | 2 | calculated | spell-slot-generation | 0.9 |
| choice-option | Choose your specialized Spell School: Divination | GRANT_ABILITY | signature_school_divination | Reduce MP cost by 1 for Divination spells (once per Long Rest, regain on Initiative). | collected | sheet-collector | 0.8 |
| choice-option | Choose your specialized Spell School: Elemental | GRANT_SPELL | elemental_school | 2 | calculated | spell-slot-generation | 0.9 |
| choice-option | Choose your specialized Spell School: Elemental | GRANT_ABILITY | signature_school_elemental | Reduce MP cost by 1 for Elemental spells (once per Long Rest, regain on Initiative). | collected | sheet-collector | 0.8 |
| choice-option | Choose your specialized Spell School: Enchantment | GRANT_SPELL | enchantment_school | 2 | calculated | spell-slot-generation | 0.9 |
| choice-option | Choose your specialized Spell School: Enchantment | GRANT_ABILITY | signature_school_enchantment | Reduce MP cost by 1 for Enchantment spells (once per Long Rest, regain on Initiative). | collected | sheet-collector | 0.8 |
| choice-option | Choose your specialized Spell School: Invocation | GRANT_SPELL | invocation_school | 2 | calculated | spell-slot-generation | 0.9 |
| choice-option | Choose your specialized Spell School: Invocation | GRANT_ABILITY | signature_school_invocation | Reduce MP cost by 1 for Invocation spells (once per Long Rest, regain on Initiative). | collected | sheet-collector | 0.8 |
| choice-option | Choose your specialized Spell School: Nullification | GRANT_SPELL | nullification_school | 2 | calculated | spell-slot-generation | 0.9 |
| choice-option | Choose your specialized Spell School: Nullification | GRANT_ABILITY | signature_school_nullification | Reduce MP cost by 1 for Nullification spells (once per Long Rest, regain on Initiative). | collected | sheet-collector | 0.8 |
| choice-option | Choose your specialized Spell School: Transmutation | GRANT_SPELL | transmutation_school | 2 | calculated | spell-slot-generation | 0.9 |
| choice-option | Choose your specialized Spell School: Transmutation | GRANT_ABILITY | signature_school_transmutation | Reduce MP cost by 1 for Transmutation spells (once per Long Rest, regain on Initiative). | collected | sheet-collector | 0.8 |

### Wizard / Spellcasting Path

Level 1; core; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Spell_Focuses | true | collected | sheet-collector | 0.8 |
| feature | Spellcasting Path | GRANT_COMBAT_TRAINING | Light_Armor | true | collected | sheet-collector | 0.8 |

### Wizard / Prepared Spell

Level 2; core; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Prepared Spell | GRANT_ABILITY | prepared_spell | Choose 1 Prepared Spell per Long Rest: Mana Limit Break (+1 to Spend Limit once per Long Rest, regain on Initiative) and Rehearsed Casting (opponents have DisADV in Spell Duels). | collected | sheet-collector | 0.8 |

### Wizard / Expert Wizard

Level 5; core; status covered; score 1; selections 0; effects 4.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| benefit | Spell School Initiate | GRANT_SPELL | chosen_school | 1 | calculated | spell-slot-generation | 0.9 |
| benefit | Spell School Initiate | GRANT_ABILITY | expert_wizard_signature_school | Signature School reduces MP cost by an additional 1. | collected | sheet-collector | 0.8 |
| benefit | Arcane Sigil | GRANT_ABILITY | expert_wizard_arcane_sigil | Spell Tag adds 1 additional School or Tag per MP; Area increases diameter by 1 Space per MP. | collected | sheet-collector | 0.8 |
| benefit | Prepared Spell | GRANT_ABILITY | expert_wizard_prepared_spell | Choose 1 additional known Spell after a Long Rest; both are Prepared Spells, but only one Mana Limit Break. | collected | sheet-collector | 0.8 |

### Wizard / Portal Mage / Portal Magic

Level 3; subclass; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Portal Magic | GRANT_ABILITY | portal_magic | Enhances Arcane Sigil to create a linked teleportation portal. | collected | sheet-collector | 0.8 |
| feature | Portal Magic | GRANT_ABILITY | teleportation_expert | When you learn a new Spell, you can choose any Spell with the Teleportation Spell Tag. | collected | sheet-collector | 0.8 |

### Wizard / Portal Mage / Portal Sage

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Portal Sage | GRANT_ABILITY | portal_sage | ADV on checks related to Astromancy. Can analyze portals. | collected | sheet-collector | 0.8 |

### Wizard / Witch / Coven's Gift

Level 3; subclass; status covered; score 1; selections 0; effects 2.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Coven's Gift | GRANT_SPELL | curse_tag | 1 | calculated | spell-slot-generation | 0.9 |
| feature | Coven's Gift | GRANT_ABILITY | curse_school_specialization | Curse spells count as part of your chosen Spell School. | collected | sheet-collector | 0.8 |

### Wizard / Witch / Curse Expert

Level 3; subclass; status covered; score 1; selections 0; effects 1.

Selections: none.

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| feature | Curse Expert | GRANT_ABILITY | curse_expert | Can detect and analyze curses. | collected | sheet-collector | 0.8 |

### Wizard / Witch / Hex Enhancements

Level 3; subclass; status covered; score 1; selections 1; effects 3.

Selections:

- When casting a spell, you may add one of the following Hexes [count: 1] -> Bewitching Hex (GRANT_ABILITY); Reaping/Life Hex (GRANT_ABILITY); Vermin Hex (GRANT_ABILITY)

| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| choice-option | When casting a spell, you may add one of the following Hexes: Bewitching Hex | GRANT_ABILITY | hex_bewitching | 1 MP: Target becomes Charmed. | collected | sheet-collector | 0.8 |
| choice-option | When casting a spell, you may add one of the following Hexes: Reaping/Life Hex | GRANT_ABILITY | hex_reaping_life | 1 MP: Target takes 1 True damage and you regain 1 HP each turn. | collected | sheet-collector | 0.8 |
| choice-option | When casting a spell, you may add one of the following Hexes: Vermin Hex | GRANT_ABILITY | hex_vermin | 1 MP: Target is silenced and shrinks over time. | collected | sheet-collector | 0.8 |
