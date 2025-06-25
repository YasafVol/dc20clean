import type { ITrait } from './types';

export const traitsData: ITrait[] = [
  // Human Traits (p. 108)
  {
    id: 'human_attribute_increase',
    name: 'Attribute Increase',
    description: 'Choose an Attribute. The chosen Attribute increases by 1 (up to the Attribute Limit).',
    cost: 2,
    effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'any_attribute_choice', value: 1, userChoiceRequired: { prompt: "Choose an Attribute to increase by 1" } }]
  },
  {
    id: 'human_skill_expertise',
    name: 'Skill Expertise',
    description: 'Choose a Skill. Your Mastery Cap and Mastery Level in the chosen Skill both increase by 1. You can only benefit from 1 Feature that increases your Skill Mastery Limit at a time.',
    cost: 2,
    effects: [{ type: 'GRANT_SKILL_EXPERTISE', value: { skillId: 'any_skill_choice', capIncrease: 1, levelIncrease: 1 }, userChoiceRequired: { prompt: "Choose a skill for Expertise" } }]
  },
  {
    id: 'human_resolve',
    name: 'Human Resolve',
    description: 'Your Death’s Door Threshold value is expanded by 1.',
    cost: 1,
    effects: [{ type: 'MODIFY_DEATH_THRESHOLD_MODIFIER', value: 1 }]
  },
  {
    id: 'human_undying',
    name: 'Undying',
    description: 'You have ADV on Saves against the Doomed Condition.',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Doomed' }]
  },
  {
    id: 'human_trade_expertise',
    name: 'Trade Expertise',
    description: 'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1. You can only benefit from 1 Feature that increases your Trade Mastery Limit at a time.',
    cost: 1,
    effects: [{ type: 'GRANT_TRADE_EXPERTISE', value: { tradeId: 'any_trade_choice', capIncrease: 1, levelIncrease: 1 }, userChoiceRequired: { prompt: "Choose a Trade for Expertise" } }]
  },
  {
    id: 'human_determination',
    name: 'Human Determination',
    description: 'Once per Combat, you can give yourself ADV on an Attack Check or Spell Check while Bloodied.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_CHECK_WHILE_BLOODIED', target: 'Attack_or_Spell_Check', condition: 'bloodied' }]
  },
  {
    id: 'human_unbreakable',
    name: 'Unbreakable',
    description: 'You have ADV on Death Saves.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_SAVE', target: 'Death_Save' }]
  },
  {
    id: 'human_attribute_decrease',
    name: 'Attribute Decrease',
    description: 'Choose an Attribute. You decrease the chosen Attribute by 1 (to a minimum of -2).',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'any_attribute_choice', value: -1, userChoiceRequired: { prompt: "Choose an Attribute to decrease by 1" } }]
  },

  // Elf Traits (p. 108)
  {
    id: 'elf_elven_will',
    name: 'Elven Will',
    description: 'You have ADV on Checks and Saves against being Charmed and put to Sleep.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Charmed' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Sleep_Magic' }]
  },
  {
    id: 'elf_nimble',
    name: 'Nimble',
    description: 'When you take the Dodge Action, you instead gain the benefits of the Full Dodge Action.',
    cost: 2,
    effects: [{ type: 'MODIFY_ACTION_BENEFIT', target: 'Dodge_Action', value: 'Full_Dodge_Benefit' }]
  },
  {
    id: 'elf_agile_explorer',
    name: 'Agile Explorer',
    description: 'You’re not affected by Difficult Terrain.',
    cost: 2,
    effects: [{ type: 'IGNORE_DIFFICULT_TERRAIN' }]
  },
  {
    id: 'elf_discerning_sight',
    name: 'Discerning Sight',
    description: 'You have ADV on Checks and Saves made to discern through visual illusions.',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'GRANT_ADV_ON_CHECKS_SAVES_VS_ILLUSION_VISUAL' }]
  },
  {
    id: 'elf_quick_reactions',
    name: 'Quick Reactions',
    description: 'While you aren’t wearing Armor, you gain +1 PD.',
    cost: 1,
    effects: [{ type: 'MODIFY_PD', value: 1, condition: 'not_wearing_armor' }]
  },
  {
    id: 'elf_peerless_sight',
    name: 'Peerless Sight',
    description: 'You don’t have DisADV as a result of making an Attack with a Weapon at Long Range',
    cost: 1,
    effects: [{ type: 'IGNORE_DISADV_ON_RANGED_ATTACK_AT_LONG_RANGE' }]
  },
  {
    id: 'elf_climb_speed',
    name: 'Climb Speed',
    description: 'You gain a Climb Speed equal to your Movement Speed.',
    cost: 1,
    effects: [{ type: 'GRANT_CLIMB_SPEED_EQUAL_TO_SPEED' }]
  },
  {
    id: 'elf_speed_increase',
    name: 'Speed Increase',
    description: 'Your Speed increases by 1 Space.',
    cost: 2,
    effects: [{ type: 'MODIFY_SPEED', value: 5 }] // 1 Space = 5 feet
  },
  {
    id: 'elf_trade_expertise_elf',
    name: 'Trade Expertise (Elf)',
    description: 'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1. You can only benefit from 1 Feature that increases your Trade Mastery Limit at a time.',
    cost: 1,
    effects: [{ type: 'GRANT_TRADE_EXPERTISE', value: { tradeId: 'any_trade_choice', capIncrease: 1, levelIncrease: 1 }, userChoiceRequired: { prompt: "Choose a Trade for Expertise" } }]
  },
  {
    id: 'elf_plant_knowledge',
    name: 'Plant Knowledge',
    description: 'While within forests, jungles, and swamps, you have ADV on Survival Checks. Additionally, you have ADV on Nature Checks made to recall information about plants.',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'GRANT_ADV_ON_SURVIVAL_CHECKS_IN_ENVIRONMENTS', target: 'forests_jungles_swamps' }, { type: 'GRANT_ADV_ON_NATURE_CHECKS_ABOUT_PLANTS' }]
  },
  {
    id: 'elf_brittle',
    name: 'Brittle',
    description: 'Your AD decreases by 1.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_AD', value: -1 }]
  },
  {
    id: 'elf_frail',
    name: 'Frail',
    description: 'Your HP maximum decreases by 2.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_HP_MAX_STATIC', value: -2 }]
  },
  {
    id: 'elf_might_decrease',
    name: 'Might Decrease',
    description: 'Your Might decreases by 1 (to a minimum of -2).',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'might', value: -1 }]
  },

  // Dwarf Traits (p. 109)
  {
    id: 'dwarf_tough',
    name: 'Tough',
    description: 'Your HP maximum increases by 1.',
    cost: 1,
    effects: [{ type: 'MODIFY_HP_MAX_STATIC', value: 1 }]
  },
  {
    id: 'dwarf_toxic_fortitude',
    name: 'Toxic Fortitude',
    description: 'You have Poison Resistance (Half) and ADV on Saves against being Poisoned.',
    cost: 2,
    effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Poison' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Poisoned' }]
  },
  {
    id: 'dwarf_physically_sturdy',
    name: 'Physically Sturdy',
    description: 'You have ADV on Saves against being Impaired, Deafened, or Petrified.',
    cost: 2,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Impaired' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Deafened' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Petrified' }]
  },
  {
    id: 'dwarf_iron_stomach',
    name: 'Iron Stomach',
    description: 'You have ADV on Saves against effects that come from consuming food or liquids.',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_EFFECT_FROM_CONSUMING' }]
  },
  {
    id: 'dwarf_thick_skinned',
    name: 'Thick-Skinned',
    description: 'While you aren’t wearing Armor, you gain +1 AD.',
    cost: 1,
    effects: [{ type: 'MODIFY_AD', value: 1, condition: 'not_wearing_armor' }]
  },
  {
    id: 'dwarf_natural_combatant',
    name: 'Natural Combatant',
    description: 'You gain Combat Training with Heavy Armor and All Shields.',
    cost: 1,
    effects: [{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Armor' }, { type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields' }]
  },
  {
    id: 'dwarf_stone_blood',
    name: 'Stone Blood',
    description: 'You have ADV on Saves against Bleeding. Additionally, you can spend 1 AP to end the Bleeding Condition on yourself.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Bleeding' }, { type: 'GRANT_ABILITY', value: 'End_Bleeding_Self_1AP' }]
  },
  {
    id: 'dwarf_minor_tremorsense',
    name: 'Minor Tremorsense',
    description: 'You have Tremorsense 3 Spaces.',
    cost: 1,
    effects: [{ type: 'GRANT_TREMORSENSE', value: 3 }]
  },
  {
    id: 'dwarf_stubborn',
    name: 'Stubborn',
    description: 'You have ADV on Saves against being Taunted and against being forcibly moved.',
    cost: 2,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Taunted' }, { type: 'GRANT_ADV_ON_SAVE_VS_FORCED_MOVEMENT' }]
  },
  {
    id: 'dwarf_trade_expertise',
    name: 'Trade Expertise',
    description: 'Choose a Crafting or Services Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
    cost: 1,
    effects: [{ type: 'GRANT_TRADE_EXPERTISE', value: { tradeId: 'any_crafting_or_services_trade_choice', capIncrease: 1, levelIncrease: 1 }, userChoiceRequired: { prompt: "Choose a Crafting or Services Trade for Expertise" } }]
  },
  {
    id: 'dwarf_earthen_knowledge',
    name: 'Earthen Knowledge',
    description: 'While within mountainous and subterranean environments, you have ADV on Survival Checks. Additionally, you have ADV on Nature Checks made to recall information about rocks, soil, crystals, and gems.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_SURVIVAL_CHECKS_IN_ENVIRONMENTS', target: 'mountainous_and_subterranean' }, { type: 'GRANT_ADV_ON_NATURE_CHECKS_ABOUT_ROCKS_SOIL_CRYSTALS_GEMS' }]
  },
  {
    id: 'dwarf_charisma_attribute_decrease',
    name: 'Charisma Attribute Decrease',
    description: 'You decrease your Charisma by 1 (to a minimum of -2).',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'charisma', value: -1 }]
  },
  {
    id: 'dwarf_short_legged',
    name: 'Short-Legged',
    description: 'Your Speed decreases by 1 Space.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_SPEED', value: -5 }]
  },

  // Halfling Traits (p. 109)
  {
    id: 'halfling_small_sized',
    name: 'Small-Sized',
    description: 'Your Size is considered Small.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_SIZE', target: 'Small' }]
  },
  {
    id: 'halfling_elusive',
    name: 'Elusive',
    description: 'When you take the Disengage Action, you instead gain the benefits of the Full Disengage Action.',
    cost: 2,
    effects: [{ type: 'MODIFY_ACTION_BENEFIT', target: 'Disengage_Action', value: 'Full_Disengage_Action' }]
  },
  {
    id: 'halfling_bravery',
    name: 'Halfling Bravery',
    description: 'You have ADV on Saves against being Intimidated, Rattled, or Frightened',
    cost: 2,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Intimidated' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Rattled' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Frightened' }]
  },
  {
    id: 'halfling_endurance',
    name: 'Halfling Endurance',
    description: 'You have Exhaustion Resistance.',
    cost: 1,
    effects: [{ type: 'GRANT_CONDITION_RESISTANCE', target: 'Exhaustion' }]
  },
  {
    id: 'halfling_deft_footwork',
    name: 'Deft Footwork',
    description: 'You can move through the space of a hostile creature 1 size larger than you as if it were Difficult Terrain.',
    cost: 1,
    effects: [{ type: 'IGNORE_DIFFICULT_TERRAIN_WHEN_MOVING_THROUGH_SPACE_OF_LARGER_HOSTILE' }]
  },
  {
    id: 'halfling_beast_whisperer',
    name: 'Beast Whisperer',
    description: 'You can speak to Beasts in a limited manner. They can understand the meanings of simple words, concepts, or states of emotion. You don’t have a special ability to understand them in return.',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'GRANT_LIMITED_COMMUNICATION_WITH_BEASTS' }]
  },
  {
    id: 'halfling_beast_insight',
    name: 'Beast Insight',
    description: 'You can understand Beasts in a limited manner. You can understand the meaning of their noises and behaviors, though they have no special ability to understand you in return.',
    cost: 1,
    effects: [{ type: 'GRANT_LIMITED_UNDERSTANDING_OF_BEASTS' }]
  },
  {
    id: 'halfling_burst_of_bravery',
    name: 'Burst of Bravery',
    description: 'Once per Combat, you can end the Intimidated, Rattled, or Frightened Condition on yourself for free at any time.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'End_Intimidated_Rattled_Frightened_Self_OncePerCombat' }]
  },
  {
    id: 'halfling_trade_expertise',
    name: 'Trade Expertise',
    description: 'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
    cost: 1,
    effects: [{ type: 'GRANT_TRADE_EXPERTISE', value: { tradeId: 'any_trade_choice', capIncrease: 1, levelIncrease: 1 }, userChoiceRequired: { prompt: "Choose a Trade for Expertise" } }]
  },
  {
    id: 'halfling_critter_knowledge',
    name: 'Critter Knowledge',
    description: 'You have ADV on Nature, Survival, and Animal Checks involving Small size creatures and smaller.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_CHECKS_INVOLVING_SMALL_CREATURES', target: 'Nature_Survival_Animal_Checks' }]
  },
  {
    id: 'halfling_brittle',
    name: 'Brittle',
    description: 'Your AD decreases by 1.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_AD', value: -1 }]
  },
  {
    id: 'halfling_intelligence_attribute_decrease',
    name: 'Intelligence Attribute Decrease',
    description: 'You decrease your Intelligence by 1 (to a minimum of -2).',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'intelligence', value: -1 }]
  },
  {
    id: 'halfling_short_legged',
    name: 'Short-Legged',
    description: 'Your Speed decreases by 1 Space.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_SPEED', value: -5 }]
  },

  // Gnome Traits (p. 110)
  {
    id: 'gnome_small_sized',
    name: 'Small-Sized',
    description: 'Your Size is considered Small.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_SIZE', target: 'Small' }]
  },
  {
    id: 'gnome_escape_artist',
    name: 'Escape Artist',
    description: 'You have ADV on Checks and Saves to avoid or escape being Grappled or Restrained.',
    cost: 2,
    effects: [{ type: 'GRANT_ADV_ON_CHECKS_SAVES_TO_AVOID_ESCAPE', target: 'Grappled_or_Restrained' }]
  },
  {
    id: 'gnome_magnified_vision',
    name: 'Magnified Vision',
    description: 'You have ADV on Investigation Checks made on something you’re holding or touching.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_INVESTIGATION_CHECKS_ON_HELD_TOUCHED' }]
  },
  {
    id: 'gnome_mental_clarity',
    name: 'Mental Clarity',
    description: 'You have ADV on Saves against being Dazed or Stunned.',
    cost: 2,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Dazed' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Stunned' }]
  },
  {
    id: 'gnome_strong_minded',
    name: 'Strong-Minded',
    description: 'You gain Psychic Resistance (1).',
    cost: 1,
    effects: [{ type: 'GRANT_RESISTANCE_STATIC', target: 'Psychic', value: 1 }]
  },
  {
    id: 'gnome_predict_weather',
    name: 'Predict Weather',
    description: 'You can naturally tell what the weather is going to be in the next hour in the area within 1 mile of you. You don’t have DisADV on Checks or Saves as a result of naturally occurring weather.',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'GRANT_ABILITY', value: 'Predict_Weather_1Mile_1Hour' }, { type: 'IGNORE_DISADV_FROM_NATURAL_WEATHER' }]
  },
  {
    id: 'gnome_mana_increase',
    name: 'Mana Increase',
    description: 'Your MP maximum increases by 1.',
    cost: 1,
    effects: [{ type: 'MODIFY_MP_MAX', value: 1 }]
  },
  {
    id: 'gnome_trapper',
    name: 'Trapper',
    description: 'You have ADV on Investigation Checks to spot Traps and on Trickery Checks to Hide Traps.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_INVESTIGATION_CHECKS_TO_SPOT_TRAPS' }, { type: 'GRANT_ADV_ON_TRICKERY_CHECKS_TO_HIDE_TRAPS' }]
  },
  {
    id: 'gnome_lightning_insulation',
    name: 'Lightning Insulation',
    description: 'You have Lightning Resistance (Half) and can’t be struck by natural lightning.',
    cost: 2,
    effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Lightning' }, { type: 'IMMUNE_TO_NATURAL_LIGHTNING' }]
  },
  {
    id: 'gnome_trade_expertise',
    name: 'Trade Expertise',
    description: 'Choose a Crafting or Subterfuge Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
    cost: 1,
    effects: [{ type: 'GRANT_TRADE_EXPERTISE', value: { tradeId: 'any_crafting_or_subterfuge_trade_choice', capIncrease: 1, levelIncrease: 1 }, userChoiceRequired: { prompt: "Choose a Crafting or Subterfuge Trade for Expertise" } }]
  },
  {
    id: 'gnome_storm_knowledge',
    name: 'Storm Knowledge',
    description: 'While within rainy, snowy, or stormy environments, you have ADV on Survival Checks. Additionally, you have ADV on Knowledge Checks made to recall information about rain, snow, and storms.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_SURVIVAL_CHECKS_IN_ENVIRONMENTS', target: 'rainy_snowy_stormy' }, { type: 'GRANT_ADV_ON_KNOWLEDGE_CHECKS_ABOUT_RAIN_SNOW_STORMS' }]
  },
  {
    id: 'gnome_agility_attribute_decrease',
    name: 'Agility Decrease',
    description: 'You decrease your Agility by 1 (to a minimum of -2).',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'agility', value: -1 }]
  },
  {
    id: 'gnome_short_legged',
    name: 'Short-Legged',
    description: 'Your Speed decreases by 1 Space.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_SPEED', value: -5 }]
  },

  // Orc Traits (p. 110)
  {
    id: 'orc_cursed_mind',
    name: 'Cursed Mind',
    description: 'You gain Psychic Vulnerability (1).',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'GRANT_VULNERABILITY_STATIC', target: 'Psychic', value: 1 }]
  },
  {
    id: 'orc_rush',
    name: 'Orc Rush',
    description: 'Once per Combat when you willingly move toward an enemy, you can spend 1 AP to gain Temp HP equal to your Prime Modifier.',
    cost: 2,
    effects: [{ type: 'GRANT_TEMP_HP_ONCE_PER_COMBAT_WHEN_MOVE_TOWARD_ENEMY', value: 'Prime_Modifier' }]
  },
  {
    id: 'orc_brutal_strikes',
    name: 'Brutal Strikes',
    description: 'You deal +1 damage when you score a Brutal or Critical Hit with a Melee Weapon or Unarmed Strike.',
    cost: 2,
    effects: [{ type: 'MODIFY_DAMAGE_ON_HIT', target: 'Melee_Martial_Attack', value: 1, condition: 'Brutal_or_Critical_Hit' }]
  },
  {
    id: 'orc_tough',
    name: 'Tough',
    description: 'Your HP maximum increases by 1.',
    cost: 1,
    effects: [{ type: 'MODIFY_HP_MAX_STATIC', value: 1 }]
  },
  {
    id: 'orc_orcish_resolve',
    name: 'Orcish Resolve',
    description: 'You gain 1 additional AP while on Death’s Door.',
    cost: 1,
    effects: [{ type: 'MODIFY_AP_WHILE_DEATHS_DOOR', value: 1 }]
  },
  {
    id: 'orc_already_cursed',
    name: 'Already Cursed',
    description: 'You have ADV on Saves against Curses.',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Curses' }]
  },
  {
    id: 'orc_intimidating_shout',
    name: 'Intimidating Shout',
    description: 'Once per Combat, you can spend 1 AP to let out an Intimidating Shout. All creatures within 5 Spaces that can hear you must make a Charisma Save contested by your Attack Check. Failure: A target is Hindered on the next Attack Check or Spell Attack it makes before the start of your next turn.',
    cost: 2,
    effects: [{ type: 'GRANT_ABILITY', value: 'Intimidating_Shout_OncePerCombat_1AP' }]
  },
  {
    id: 'orc_dash',
    name: 'Orc Dash',
    description: 'Once per Combat you can use your Minor Action to move, as long as that movement is towards an enemy.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Move_As_Minor_Action_OncePerCombat_Toward_Enemy' }]
  },
  {
    id: 'orc_finishing_blow',
    name: 'Finishing Blow',
    description: 'You deal +1 damage to creatures who are Well-Bloodied.',
    cost: 1,
    effects: [{ type: 'MODIFY_DAMAGE_ON_HIT', target: 'Martial_Attacks', value: 1, condition: 'Well_Bloodied' }]
  },
  {
    id: 'orc_imposing_presence',
    name: 'Imposing Presence',
    description: 'Once per Combat when a creature makes an Attack against you, you can force them to make a Charisma Save. Save Failure: They must choose a new target for the Attack. If there are no other targets, then the Attack is wasted.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Force_New_Target_OncePerCombat_Reaction' }]
  },
  {
    id: 'orc_provocation',
    name: 'Provocation',
    description: 'You have DisADV on Checks and Saves against being Taunted.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'GRANT_DISADV_ON_CHECKS_SAVES_VS_CONDITION', target: 'Taunted' }]
  },
  {
    id: 'orc_reckless',
    name: 'Reckless',
    description: 'Your PD decreases by 1.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_PD', value: -1 }]
  },

  // Dragonborn Traits (p. 111)
  {
    id: 'dragonborn_darkvision',
    name: 'Darkvision',
    description: 'You have Darkvision 10 Spaces.',
    cost: 1,
    effects: [{ type: 'GRANT_DARKVISION', value: 10 }]
  },
  {
    id: 'dragonborn_draconic_resistance',
    name: 'Draconic Resistance',
    description: 'You gain Resistance (Half) to your Draconic damage type.',
    cost: 2,
    effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Draconic_damage_type' }]
  },
  {
    id: 'dragonborn_draconic_breath_weapon',
    name: 'Draconic Breath Weapon',
    description: 'You gain a Breath Weapon that you can use by spending 2 AP to exhale destructive power in an Area or Focused against a specific target. You can use this ability once per Long Rest, and regain the ability to use it again when you roll for Initiative.',
    cost: 2,
    effects: [{ type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_OncePerLongRest_RegainOnInitiative' }]
  },
  {
    id: 'dragonborn_reptilian_superiority',
    name: 'Reptilian Superiority',
    description: 'You have ADV on Intimidation Checks against reptilian creatures of Medium Size and smaller (not including other Dragonborn).',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'GRANT_ADV_ON_INTIMIDATION_CHECKS_VS_REPTILIAN_MEDIUM_SMALL' }]
  },
  {
    id: 'dragonborn_mana_increase',
    name: 'Mana Increase',
    description: 'Your MP maximum increases by 1.',
    cost: 1,
    effects: [{ type: 'MODIFY_MP_MAX', value: 1 }]
  },
  {
    id: 'dragonborn_thick_skinned',
    name: 'Thick-Skinned',
    description: 'While you aren’t wearing Armor, you gain +1 AD.',
    cost: 1,
    effects: [{ type: 'MODIFY_AD', value: 1, condition: 'not_wearing_armor' }]
  },
  {
    id: 'dragonborn_second_breath',
    name: 'Second Breath',
    description: 'You can now use your Draconic Breath Weapon twice per Combat. Additionally, whenever you use your Draconic Breath Weapon, you can spend 2 uses to increase the damage by 2 if its an Area, or by 4 if its Focused.',
    cost: 1,
    prerequisites: ['dragonborn_draconic_breath_weapon'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_TwicePerCombat' }, { type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_Enhanced_Damage_Spend_Uses' }]
  },
  {
    id: 'dragonborn_concussive_breath',
    name: 'Concussive Breath',
    description: 'When you use your Draconic Breath Weapon, you can force all targets to make a Physical Save. Save Failure: The target is pushed 1 Space away +1 additional Space for every 5 it fails its Save by.',
    cost: 1,
    prerequisites: ['dragonborn_draconic_breath_weapon'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_Concussive_Push' }]
  },
  {
    id: 'dragonborn_draconic_affinity',
    name: 'Draconic Affinity',
    description: 'When you take damage of the same type as your Draconic damage, your next Draconic Breath Weapon deals +1 bonus damage.',
    cost: 1,
    effects: [{ type: 'MODIFY_DAMAGE_ON_NEXT_DRACONIC_BREATH_WEAPON', value: 1, condition: 'take_same_type_damage' }]
  },
  {
    id: 'dragonborn_dying_breath',
    name: 'Dying Breath',
    description: 'Once per Combat when you enter Death’s Door, you regain a use of your Draconic Breath Weapon and can immediately use it as a Reaction for free (0 AP).',
    cost: 1,
    prerequisites: ['dragonborn_draconic_breath_weapon'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_Reaction_On_Deaths_Door' }]
  },
  {
    id: 'dragonborn_draconic_ward',
    name: 'Draconic Ward',
    description: 'Once per Combat when you enter Death’s Door, you gain 2 Temp HP. Whenever you’re Hit by a Melee Attack while you have this Temp HP, your Attacker takes 1 Draconic damage.',
    cost: 1,
    effects: [{ type: 'GRANT_TEMP_HP_ONCE_PER_COMBAT_ON_DEATHS_DOOR', value: 2 }, { type: 'GRANT_DAMAGE_ON_MELEE_HIT_WHILE_TEMP_HP', target: 'Draconic_damage_type', value: 1 }]
  },
  {
    id: 'dragonborn_draconic_protection',
    name: 'Draconic Protection',
    description: 'Once per Combat, when an ally within 20 Spaces is on Death’s Door, you begin to surge with an ancient power. While they remain on Death’s Door their PD and AD increases by 5 until Combat ends.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Increase_PD_AD_Ally_On_Deaths_Door' }]
  },
  {
    id: 'dragonborn_glide_speed',
    name: 'Glide Speed',
    description: 'You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren’t Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.',
    cost: 2,
    effects: [{ type: 'GRANT_GLIDE_SPEED' }]
  },
  {
    id: 'dragonborn_guardians_bond',
    name: 'Guardian’s Bond',
    description: 'Once per Combat when an ally enters Death’s Door within 20 Spaces of you, you take an amount of True damage equal to your Prime Modifier.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'TAKE_TRUE_DAMAGE_ONCE_PER_COMBAT_WHEN_ALLY_DEATHS_DOOR', value: 'Prime_Modifier' }]
  },

  // Giantborn Traits (p. 112)
  {
    id: 'giantborn_tough',
    name: 'Tough',
    description: 'Your HP maximum increases by 1.',
    cost: 1,
    effects: [{ type: 'MODIFY_HP_MAX_STATIC', value: 1 }]
  },
  {
    id: 'giantborn_powerful_build',
    name: 'Powerful Build',
    description: 'You increase by 1 Size, but you occupy the Space of a creature 1 Size smaller.',
    cost: 2,
    effects: [{ type: 'MODIFY_SIZE', target: 'Large' }, { type: 'MODIFY_SPACE_OCCUPIED', target: '1_Size_Smaller' }]
  },
  {
    id: 'giantborn_unstoppable',
    name: 'Unstoppable',
    description: 'You have ADV on Saves against being Slowed or Stunned.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Slowed' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Stunned' }]
  },
  {
    id: 'giantborn_giants_resolve',
    name: 'Giant’s Resolve',
    description: 'While on Death’s Door, you reduce all damage taken by 1.',
    cost: 1,
    effects: [{ type: 'REDUCE_DAMAGE_TAKEN', value: 1, condition: 'deaths_door' }]
  },
  {
    id: 'giantborn_unyielding_movement',
    name: 'Unyielding Movement',
    description: 'You’re immune to being Slowed 2 (or higher).',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'IMMUNE_TO_SLOWED_2_OR_HIGHER' }]
  },
  {
    id: 'giantborn_giants_fortitude',
    name: 'Giant’s Fortitude',
    description: 'You also gain the benefits of your Giant’s Resolve Trait while Well-Bloodied.',
    cost: 2,
    prerequisites: ['giantborn_giants_resolve'],
    effects: [{ type: 'GRANT_BENEFIT_WHILE_WELL_BLOODIED', target: 'giantborn_giants_resolve' }]
  },
  {
    id: 'giantborn_strong_body',
    name: 'Strong Body',
    description: 'Once per Combat when you take damage from an Attack, you can reduce the damage taken by an amount equal to your Might or Agility (your choice).',
    cost: 2,
    effects: [{ type: 'REDUCE_DAMAGE_TAKEN_ONCE_PER_COMBAT', value: 'Might_or_Agility' }]
  },
  {
    id: 'giantborn_mighty_hurl',
    name: 'Mighty Hurl',
    description: 'You throw creatures 1 Space farther than normal, and objects (including Weapons) 5 Spaces farther than normal.',
    cost: 1,
    effects: [{ type: 'MODIFY_THROW_DISTANCE_CREATURES', value: 1 }, { type: 'MODIFY_THROW_DISTANCE_OBJECTS', value: 5 }]
  },
  {
    id: 'giantborn_titanic_toss',
    name: 'Titanic Toss',
    description: 'You have ADV on Checks made to throw creatures. Additionally, you don’t have DisADV as a result of making an Attack with a Weapon with the Toss or Thrown Property at Long Range.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_CHECKS', target: 'Throw_Creatures' }, { type: 'IGNORE_DISADV_ON_RANGED_ATTACK_WITH_TOSS_THROWN_AT_LONG_RANGE' }]
  },
  {
    id: 'giantborn_mighty_leap',
    name: 'Mighty Leap',
    description: 'You can use your Might instead of Agility to determine your Jump Distance and the damage you take from Falling.',
    cost: 1,
    effects: [{ type: 'USE_ATTRIBUTE_FOR_JUMP_DISTANCE_FALLING_DAMAGE', target: 'Might' }]
  },
  {
    id: 'giantborn_brute',
    name: 'Brute',
    description: 'Once per Combat, you can take the Shove or Grapple Action as a Minor Action.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Shove_or_Grapple_As_Minor_Action_OncePerCombat' }]
  },
  {
    id: 'giantborn_heavy_riser',
    name: 'Heavy Riser',
    description: 'You have to spend 4 Spaces of movement to stand up from Prone.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_MOVEMENT_TO_STAND_UP', value: 4 }]
  },
  {
    id: 'giantborn_clumsiness',
    name: 'Clumsiness',
    description: 'You have DisADV on Agility Checks.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'GRANT_DISADV_ON_CHECKS', target: 'Agility_Checks' }]
  },
  {
    id: 'giantborn_intelligence_attribute_decrease',
    name: 'Intelligence Decrease',
    description: 'You decrease your Intelligence by 1 (to a minimum of -2).',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'intelligence', value: -1 }]
  },

  // Angelborn Traits (p. 113)
  {
    id: 'angelborn_radiant_resistance',
    name: 'Radiant Resistance',
    description: 'You have Resistance (Half) to Radiant damage.',
    cost: 1,
    effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Radiant' }]
  },
  {
    id: 'angelborn_celestial_magic',
    name: 'Celestial Magic',
    description: 'You learn 1 Spell of your choice from the Divine Spell List (Holy & Restoration during the Beta). Once per Long Rest, you can cast the chosen Spell spending 1 less MP than normal (minimum of 0 MP). The Spells total MP cost (before all reductions) still can’t exceed your Mana Spend Limit.',
    cost: 2,
    effects: [{ type: 'GRANT_SPELL_FROM_LIST', target: 'Divine_Spell_List' }, { type: 'REDUCE_MP_COST_ONCE_PER_LONG_REST', value: 1 }]
  },
  {
    id: 'angelborn_healing_touch',
    name: 'Healing Touch',
    description: 'Once per Combat, you can spend 1 AP to touch a creature and Heal it. Make a DC 10 Spell Check. Success: You can restore up to 2 HP to the target. Success (each 5): +1 HP. Failure: You only restore 2 HP.',
    cost: 2,
    effects: [{ type: 'GRANT_ABILITY', value: 'Healing_Touch_OncePerCombat_1AP' }]
  },
  {
    id: 'angelborn_divine_glow',
    name: 'Divine Glow',
    description: 'Your body can emit a Bright Light in a 5 Space radius around you at will.',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'GRANT_ABILITY', value: 'Emit_Bright_Light_5Space_Radius_AtWill' }]
  },
  {
    id: 'angelborn_mana_increase',
    name: 'Mana Increase',
    description: 'Your MP maximum increases by 1.',
    cost: 1,
    effects: [{ type: 'MODIFY_MP_MAX', value: 1 }]
  },
  {
    id: 'angelborn_celestial_clarity',
    name: 'Celestial Clarity',
    description: 'You have ADV on Saves against being Blinded or Deafened.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Blinded' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Deafened' }]
  },
  {
    id: 'angelborn_angelic_insight',
    name: 'Angelic Insight',
    description: 'Once per Long Rest you can grant yourself ADV on an Insight Check to see if someone is lying.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_INSIGHT_CHECK_ONCE_PER_LONG_REST', condition: 'see_if_lying' }]
  },
  {
    id: 'angelborn_gift_of_the_angels',
    name: 'Gift of the Angels',
    description: 'Once per Combat you can spend 1 AP and 1 MP and touch a creature to heal them over time. The creature recovers 1 HP at the start of each of their turns for 1 minute (5 Rounds).',
    cost: 2,
    effects: [{ type: 'GRANT_ABILITY', value: 'Heal_Over_Time_OncePerCombat_1AP_1MP' }]
  },
  {
    id: 'angelborn_blinding_light',
    name: 'Blinding Light',
    description: 'Once per Combat, you can spend 1 AP to choose a creature within 5 Spaces and make a Spell Check contested by its Physical Save. Success: The target is Blinded until the end of your next turn.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Blind_Target_OncePerCombat_1AP' }]
  },
  {
    id: 'angelborn_glide_speed',
    name: 'Glide Speed',
    description: 'You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren’t Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.',
    cost: 2,
    effects: [{ type: 'GRANT_GLIDE_SPEED' }]
  },
  {
    id: 'angelborn_pacifist',
    name: 'Pacifist',
    description: 'Your divine call is to put others before yourself and resist doing harm. You suffer a -1 penalty to all Checks and Saves made during the first round of Combat.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'PENALTY_ON_CHECKS_SAVES_FIRST_ROUND_OF_COMBAT', value: -1 }]
  },
  {
    id: 'angelborn_umbral_weakness',
    name: 'Umbral Weakness',
    description: 'You have Umbral Vulnerability (1).',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'GRANT_VULNERABILITY_STATIC', target: 'Umbral', value: 1 }]
  },

  // Fiendborn Traits (p. 114)
  {
    id: 'fiendborn_fiendish_resistance',
    name: 'Fiendish Resistance',
    description: 'You gain Resistance (Half) to your Fiendish damage type.',
    cost: 2,
    effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Fiendish_damage_type' }]
  },
  {
    id: 'fiendborn_fiendish_magic',
    name: 'Fiendish Magic',
    description: 'You learn 1 Spell of your choice from the Arcane Spell List from the Destruction or Enchantment Spell Schools. If the Spell deals damage, it must be the same damage type as your Fiendish damage. Once per Long Rest, you can cast the chosen Spell spending 1 less MP than normal (minimum of 0 MP). The Spells total MP cost (before all reductions) still can’t exceed your Mana Spend Limit.',
    cost: 2,
    effects: [{ type: 'GRANT_SPELL_FROM_LIST_SCHOOLS', target: 'Arcane_Spell_List', schools: ['Destruction', 'Enchantment'] }, { type: 'REDUCE_MP_COST_ONCE_PER_LONG_REST', value: 1, condition: 'spell_damage_type_matches_fiendish' }]
  },
  {
    id: 'fiendborn_darkvision',
    name: 'Darkvision',
    description: 'You have a Darkvision of 10 Spaces.',
    cost: 1,
    effects: [{ type: 'GRANT_DARKVISION', value: 10 }]
  },
  {
    id: 'fiendborn_lights_bane',
    name: 'Light’s Bane',
    description: 'You can spend 1 AP to snuff out a mundane light source within 5 Spaces of you.',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'GRANT_ABILITY', value: 'Snuff_Out_Mundane_Light_Source_1AP' }]
  },
  {
    id: 'fiendborn_mana_increase',
    name: 'Mana Increase',
    description: 'Your MP maximum increases by 1.',
    cost: 1,
    effects: [{ type: 'MODIFY_MP_MAX', value: 1 }]
  },
  {
    id: 'fiendborn_silver_tongued',
    name: 'Silver-Tongued',
    description: 'Once per Long Rest you can grant yourself ADV on an Influence Check when trying to deceive someone.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_INFLUENCE_CHECK_ONCE_PER_LONG_REST', condition: 'trying_to_deceive' }]
  },
  {
    id: 'fiendborn_fiendish_aura',
    name: 'Fiendish Aura',
    description: 'You learn the Sorcery Cantrip, but you must choose the type of energy that’s the same as your Fiendish Origin.',
    cost: 1,
    effects: [{ type: 'GRANT_SPELL_KNOWN', value: 'Sorcery_Cantrip' }, { type: 'SET_SORCERY_ENERGY_TYPE', target: 'Fiendish_Origin' }]
  },
  {
    id: 'fiendborn_superior_darkvision',
    name: 'Superior Darkvision',
    description: 'Your Darkvision increases to 20 Spaces.',
    cost: 1,
    prerequisites: ['fiendborn_darkvision'],
    effects: [{ type: 'MODIFY_DARKVISION', value: 20 }]
  },
  {
    id: 'fiendborn_infernal_bravery',
    name: 'Infernal Bravery',
    description: 'You have ADV on Saves against being Intimidated.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Intimidated' }]
  },
  {
    id: 'fiendborn_intimidator',
    name: 'Intimidator',
    description: 'Once per Combat you can take the Intimidate Action as a Minor Action.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Intimidate_As_Minor_Action_OncePerCombat' }]
  },
  {
    id: 'fiendborn_charming_gaze',
    name: 'Charming Gaze',
    description: 'You can spend 1 AP to gaze upon a creature you can see within 10 Spaces that can also see you. Make a Spell Check contested by the target’s Repeated Charisma Save. Success: The creature becomes Charmed by you for 1 minute. You can use this ability once per Long Rest, and when you roll for Initiative, or meet some other unique criteria at the GM’s discretion, this ability recharges.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Charm_Target_OncePerLongRest_1AP' }]
  },
  {
    id: 'fiendborn_glide_speed',
    name: 'Glide Speed',
    description: 'You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren’t Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.',
    cost: 2,
    effects: [{ type: 'GRANT_GLIDE_SPEED' }]
  },
  {
    id: 'fiendborn_radiant_weakness',
    name: 'Radiant Weakness',
    description: 'You have Radiant Vulnerability (1).',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'GRANT_VULNERABILITY_STATIC', target: 'Radiant', value: 1 }]
  },
  {
    id: 'fiendborn_divine_dampening',
    name: 'Divine Dampening',
    description: 'You recover 1 less HP when healed from divine sources.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'REDUCE_HP_REGAINED_FROM_DIVINE_SOURCES', value: 1 }]
  },

  // Beastborn Traits (p. 115-116)
  {
    id: 'beastborn_darkvision',
    name: 'Darkvision',
    description: 'You have Darkvision 10 Spaces.',
    cost: 1,
    effects: [{ type: 'GRANT_DARKVISION', value: 10 }]
  },
  {
    id: 'beastborn_echolocation',
    name: 'Echolocation',
    description: 'You can spend 1 AP to roar, scream, or screech to gain Blindsight in a 10 Spaces radius that lasts until the start of your next turn. The sound can be heard from up to 100 Spaces away. You gain no benefit from this Trait in an area of Silence.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Echolocation_1AP_10Space_1Round' }]
  },
  {
    id: 'beastborn_keen_sense',
    name: 'Keen Sense',
    description: 'Choose 1 of the following senses: hearing, sight, or smell. You make Awareness Checks with ADV using the chosen sense.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_AWARENESS_CHECKS_USING_SENSE', target: 'chosen_sense', userChoiceRequired: { prompt: "Choose a sense: hearing, sight, or smell" } }],
    // This trait can be chosen multiple times, but the interface doesn't directly support that.
    // The logic for handling multiple selections will need to be in the application.
  },
  {
    id: 'beastborn_sunlight_sensitivity',
    name: 'Sunlight Sensitivity',
    description: 'While you or your target is in sunlight, you have DisADV on Attacks and Awareness Checks that rely on sight.',
    cost: -2,
    isNegative: true,
    effects: [{ type: 'GRANT_DISADV_ON_ATTACKS_AWARENESS_CHECKS_IN_SUNLIGHT' }]
  },
  {
    id: 'beastborn_quick_reactions',
    name: 'Quick Reactions',
    description: 'While you aren’t wearing Armor, you gain +1 PD.',
    cost: 1,
    effects: [{ type: 'MODIFY_PD', value: 1, condition: 'not_wearing_armor' }]
  },
  {
    id: 'beastborn_climb_speed',
    name: 'Climb Speed',
    description: 'You gain a Climb Speed equal to your Ground Speed.',
    cost: 1,
    effects: [{ type: 'GRANT_CLIMB_SPEED_EQUAL_TO_SPEED' }]
  },
  {
    id: 'beastborn_spider_climb',
    name: 'Spider Climb',
    description: 'You can walk without falling on the ceiling and vertical surfaces normally without needing to Climb.',
    cost: 1,
    prerequisites: ['beastborn_climb_speed'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Walk_On_Vertical_Surfaces_Ceilings' }]
  },
  {
    id: 'beastborn_web_walk',
    name: 'Web Walk',
    description: 'You can walk along and through webs unimpeded. Additionally, you know the location of any creature that’s in contact with the same web.',
    cost: 1,
    effects: [{ type: 'IGNORE_DIFFICULT_TERRAIN_FROM_WEBS' }, { type: 'KNOW_LOCATION_OF_CREATURES_IN_CONTACT_WITH_WEB' }]
  },
  {
    id: 'beastborn_water_breathing',
    name: 'Water Breathing',
    description: 'You can breathe underwater.',
    cost: 1,
    effects: [{ type: 'GRANT_WATER_BREATHING' }]
  },
  {
    id: 'beastborn_swim_speed',
    name: 'Swim Speed',
    description: 'You gain a Swim Speed equal to your Ground Speed. Additionally, your Breath Duration increases by 3.',
    cost: 1,
    effects: [{ type: 'GRANT_SWIM_SPEED_EQUAL_TO_SPEED' }, { type: 'MODIFY_BREATH_DURATION', value: 3 }]
  },
  {
    id: 'beastborn_speed_increase',
    name: 'Speed Increase',
    description: 'Your Speed increases by 1 Space.',
    cost: 2,
    effects: [{ type: 'MODIFY_SPEED', value: 5 }],
    // This trait can be chosen up to 5 times, but the interface doesn't directly support that.
    // The logic for handling multiple selections will need to be in the application.
  },
  {
    id: 'beastborn_sprint',
    name: 'Sprint',
    description: 'You can use your Minor Action to take the Move Action. Once you use this Trait, you can’t use it again until you take a turn without taking the Move Action.',
    cost: 2,
    effects: [{ type: 'GRANT_ABILITY', value: 'Move_As_Minor_Action_OncePerTurn_NoMoveAction' }]
  },
  {
    id: 'beastborn_charge',
    name: 'Charge',
    description: 'If you move at least 2 Spaces in a straight line before making a Melee Attack, the damage of the Attack increases by 1.',
    cost: 2,
    effects: [{ type: 'MODIFY_DAMAGE_ON_MELEE_ATTACK', value: 1, condition: 'move_2_spaces_straight_before' }]
  },
  {
    id: 'beastborn_burrow_speed',
    name: 'Burrow Speed',
    description: 'You gain a Burrow Speed equal to half your Movement Speed.',
    cost: 2,
    effects: [{ type: 'GRANT_BURROW_SPEED_HALF_SPEED' }]
  },
  {
    id: 'beastborn_jumper',
    name: 'Jumper',
    description: 'Your Jump Distance increases by 2, and you can take the Jump Action as a Minor Action.',
    cost: 1,
    effects: [{ type: 'MODIFY_JUMP_DISTANCE', value: 2 }, { type: 'GRANT_ABILITY', value: 'Jump_As_Minor_Action' }]
  },
  {
    id: 'beastborn_strong_jumper',
    name: 'Strong Jumper',
    description: 'You no longer need to move 2 Spaces before performing a Running Jump, and you take 0 damage from Controlled Falling 5 Spaces or less.',
    cost: 1,
    effects: [{ type: 'IGNORE_2_SPACES_MOVEMENT_FOR_RUNNING_JUMP' }, { type: 'IGNORE_FALLING_DAMAGE_5_SPACES_OR_LESS' }]
  },
  {
    id: 'beastborn_glide_speed',
    name: 'Glide Speed',
    description: 'You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren’t Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.',
    cost: 2,
    effects: [{ type: 'GRANT_GLIDE_SPEED' }]
  },
  {
    id: 'beastborn_limited_flight',
    name: 'Limited Flight',
    description: 'You have a set of wings that grant you limited flight. Provided you aren’t Incapacitated, you gain the following benefits: Vertical Ascent: You can spend 2 Spaces of movement to ascend 1 Space vertically. Hover: When you end your turn in the air, you maintain your altitude.',
    cost: 2,
    prerequisites: ['beastborn_glide_speed'],
    effects: [{ type: 'GRANT_LIMITED_FLIGHT' }]
  },
  {
    id: 'beastborn_full_flight',
    name: 'Full Flight',
    description: 'You have a Fly Speed equal to your Ground Speed.',
    cost: 2,
    prerequisites: ['beastborn_limited_flight'],
    effects: [{ type: 'GRANT_FLY_SPEED_EQUAL_TO_SPEED' }]
  },
  {
    id: 'beastborn_flyby',
    name: 'Flyby',
    description: 'You don’t provoke Opportunity Attacks when you Fly out of an enemy’s reach.',
    cost: 1,
    prerequisites: ['beastborn_limited_flight'],
    effects: [{ type: 'IGNORE_OPPORTUNITY_ATTACKS_WHEN_FLY_OUT_OF_REACH' }]
  },
  {
    id: 'beastborn_stealth_feathers',
    name: 'Stealth Feathers',
    description: 'You have ADV on Stealth Checks while Flying.',
    cost: 2,
    prerequisites: ['beastborn_limited_flight'],
    effects: [{ type: 'GRANT_ADV_ON_STEALTH_CHECKS_WHILE_FLYING' }]
  },
  {
    id: 'beastborn_winged_arms',
    name: 'Winged Arms',
    description: 'Your arms are also your wings. Anytime you use a Glide Speed or Flying Speed, you can’t hold anything in your hands.',
    cost: -1,
    isNegative: true,
    prerequisites: ['beastborn_limited_flight'], // Assuming Limited Flight or Full Flight
    effects: [{ type: 'PENALTY_CANT_HOLD_WHILE_FLYING' }]
  },
  {
    id: 'beastborn_tough',
    name: 'Tough',
    description: 'Your HP maximum increases by 1.',
    cost: 1,
    effects: [{ type: 'MODIFY_HP_MAX_STATIC', value: 1 }]
  },
  {
    id: 'beastborn_thick_skinned',
    name: 'Thick-Skinned',
    description: 'While you aren’t wearing Armor, you gain +1 AD.',
    cost: 1,
    effects: [{ type: 'MODIFY_AD', value: 1, condition: 'not_wearing_armor' }]
  },
  {
    id: 'beastborn_powerful_build',
    name: 'Powerful Build',
    description: 'You increase by 1 Size, but you occupy the Space of a creature 1 Size smaller.',
    cost: 2,
    effects: [{ type: 'MODIFY_SIZE', target: 'Large' }, { type: 'MODIFY_SPACE_OCCUPIED', target: '1_Size_Smaller' }]
  },
  {
    id: 'beastborn_long_limbed',
    name: 'Long-Limbed',
    description: 'When you make a Melee Martial Attack, your reach is 1 Space greater than normal.',
    cost: 3,
    effects: [{ type: 'MODIFY_MELEE_REACH', value: 1 }]
  },
  {
    id: 'beastborn_secondary_arms',
    name: 'Secondary Arms',
    description: 'You have 2 slightly smaller secondary arms below your primary pair of arms. They function just like your primary arms, but they can’t wield Weapons with the Heavy Property or Shields.',
    cost: 1,
    effects: [{ type: 'GRANT_SECONDARY_ARMS' }]
  },
  {
    id: 'beastborn_prehensile_appendage',
    name: 'Prehensile Appendage',
    description: 'You have a prehensile tail or trunk that has a reach of 1 Space and can lift up an amount of pounds equal to your Might times 5 (or half as many kilograms). You can use it to lift, hold, or drop objects, and to push, pull, or grapple creatures. It can’t wield Weapons or Shields, you can’t use tools with it that require manual precision, and you can’t use it in place of Somatic Components for Spells.',
    cost: 1,
    effects: [{ type: 'GRANT_PREHENSILE_APPENDAGE' }]
  },
  {
    id: 'beastborn_hazardous_hide',
    name: 'Hazardous Hide',
    description: 'You have spikes, retractable barbs, poisonous skin, or some other form of defense mechanism to keep creatures from touching you. Choose 1 of the following damage types: Corrosion, Piercing, or Poison. While you are physically Grappled, your Grappler takes 1 damage of the chosen type at the start of each of its turns. Creatures that start their turn Grappled by you also take this damage.',
    cost: 1,
    effects: [{ type: 'GRANT_DAMAGE_TO_GRAPPLER', target: 'chosen_damage_type', value: 1, userChoiceRequired: { prompt: "Choose a damage type: Corrosion, Piercing, or Poison" } }]
  },
  {
    id: 'beastborn_natural_armor',
    name: 'Natural Armor',
    description: 'While not wearing Armor, you gain PDR.',
    cost: 2,
    prerequisites: ['beastborn_thick_skinned'],
    effects: [{ type: 'GRANT_PDR', condition: 'not_wearing_armor' }]
  },
  {
    id: 'beastborn_hard_shell',
    name: 'Hard Shell',
    description: 'You have a large shell around your body for protection. Your AD increases by 1 (while you’re not wearing Armor), your Movement Speed decreases by 1, and you’re immune to being Flanked.',
    cost: 1,
    prerequisites: ['beastborn_thick_skinned'],
    effects: [{ type: 'MODIFY_AD', value: 1, condition: 'not_wearing_armor' }, { type: 'MODIFY_SPEED', value: -5 }, { type: 'IMMUNE_TO_FLANKING' }]
  },
  {
    id: 'beastborn_shell_retreat',
    name: 'Shell Retreat',
    description: 'Your body has a shell that you can retreat into. You can spend 1 AP to retreat into or come back out of your shell. You gain +5 PD and AD, PDR, EDR and ADV on Might Saves. While in your shell, you’re Prone, you can’t move, you have DisADV on Agility Saves, and you can’t take Reactions.',
    cost: 1,
    prerequisites: ['beastborn_hard_shell'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Retreat_Into_Shell_1AP' }]
  },
  {
    id: 'beastborn_camouflage',
    name: 'Camouflage',
    description: 'You can change the color and pattern of your body. You have ADV on Stealth Checks while motionless.',
    cost: 2,
    effects: [{ type: 'GRANT_ADV_ON_STEALTH_CHECKS_WHILE_MOTIONLESS' }]
  },
  {
    id: 'beastborn_prowler',
    name: 'Prowler',
    description: 'You have ADV on Stealth Checks while in Darkness.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_STEALTH_CHECKS_WHILE_IN_DARKNESS' }]
  },
  {
    id: 'beastborn_cold_resistance',
    name: 'Cold Resistance',
    description: 'You have Cold Resistance (Half) and Resistance to Exhaustion from cold temperatures.',
    cost: 2,
    effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Cold' }, { type: 'GRANT_RESISTANCE_TO_EXHAUSTION', condition: 'cold_temperatures' }]
  },
  {
    id: 'beastborn_fire_resistance',
    name: 'Fire Resistance',
    description: 'You have Fire Resistance (Half) and Resistance to Exhaustion from hot temperatures.',
    cost: 2,
    effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Fire' }, { type: 'GRANT_RESISTANCE_TO_EXHAUSTION', condition: 'hot_temperatures' }]
  },
  {
    id: 'beastborn_short_legged',
    name: 'Short-Legged',
    description: 'Your Speed decreases by 1 Space.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_SPEED', value: -5 }]
  },
  {
    id: 'beastborn_small_sized',
    name: 'Small-Sized',
    description: 'Your Size is considered Small.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_SIZE', target: 'Small' }]
  },
  {
    id: 'beastborn_reckless',
    name: 'Reckless',
    description: 'Your PD decreases by 1.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_PD', value: -1 }]
  },
  {
    id: 'beastborn_natural_weapon',
    name: 'Natural Weapon',
    description: 'You have up to 2 Natural Weapons (claws, horns, fangs, tail, etc.) which you can use to make Unarmed Strikes that deal 1 Bludgeoning, Piercing, or Slashing damage (your choice upon gaining this Trait). You can perform Attack Maneuvers with your Natural Weapons.',
    cost: 1,
    effects: [{ type: 'GRANT_NATURAL_WEAPON', value: 1, userChoiceRequired: { prompt: "Choose a damage type: Bludgeoning, Piercing, or Slashing" } }],
    // This trait can be chosen multiple times, but the interface doesn't directly support that.
    // The logic for handling multiple selections will need to be in the application.
  },
  {
    id: 'beastborn_extended_natural_weapon',
    name: 'Extended Natural Weapon',
    description: 'Your Natural Weapon now has the Reach Property.',
    cost: 2,
    prerequisites: ['beastborn_natural_weapon'],
    effects: [{ type: 'GRANT_PROPERTY_TO_NATURAL_WEAPON', target: 'Reach' }]
  },
  {
    id: 'beastborn_natural_projectile',
    name: 'Natural Projectile',
    description: 'You can use your Natural Weapon to make a Ranged Martial Attack with a Range of 10 Spaces. The Natural Weapon might produce a spine, barb, fluid, or other harmful projectile (your choice).',
    cost: 1,
    prerequisites: ['beastborn_natural_weapon'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Natural_Projectile_Ranged_Attack' }]
  },
  {
    id: 'beastborn_natural_weapon_passive',
    name: 'Natural Weapon Passive',
    description: 'You can choose 1 Weapon Style that fits your desired Natural Weapon. You can benefit from the chosen Weapon Style’s passive with your Natural Weapon.',
    cost: 1,
    prerequisites: ['beastborn_natural_weapon'],
    effects: [{ type: 'GRANT_WEAPON_STYLE_PASSIVE_TO_NATURAL_WEAPON', target: 'chosen_weapon_style', userChoiceRequired: { prompt: "Choose a Weapon Style" } }]
  },
  {
    id: 'beastborn_rend',
    name: 'Rend',
    description: 'You can spend 1 AP when making an Attack Check with your Natural Weapon to force the target to make a Physical Save. Failure: Target begins Bleeding.',
    cost: 1,
    prerequisites: ['beastborn_natural_weapon'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Rend_Bleeding_1AP' }]
  },
  {
    id: 'beastborn_retractable_natural_weapon',
    name: 'Retractable Natural Weapon',
    description: 'Your Natural Weapon is able to be concealed or retracted and gains the Concealable Property (gain ADV on the first Attack Check you make in Combat).',
    cost: 1,
    prerequisites: ['beastborn_natural_weapon'],
    effects: [{ type: 'GRANT_PROPERTY_TO_NATURAL_WEAPON', target: 'Concealable' }]
  },
  {
    id: 'beastborn_venomous_natural_weapon',
    name: 'Venomous Natural Weapon',
    description: 'When you Hit a creature with your Natural Weapon, they make a Physical Save against your Save DC. Failure: The target becomes Impaired until the start of your next turn.',
    cost: 1,
    prerequisites: ['beastborn_natural_weapon'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Venomous_Natural_Weapon_Impaired' }]
  },
  {
    id: 'beastborn_fast_reflexes',
    name: 'Fast Reflexes',
    description: 'You gain ADV on Initiative Checks and on the first Attack Check you make in Combat.',
    cost: 2,
    effects: [{ type: 'GRANT_ADV_ON_INITIATIVE_CHECKS' }, { type: 'GRANT_ADV_ON_FIRST_ATTACK_CHECK_IN_COMBAT' }]
  },
  {
    id: 'beastborn_mimicry',
    name: 'Mimicry',
    description: 'You can mimic simple sounds that you’ve heard (such as a baby’s crying, the creak of a door, or single words) and repeat short 3 word phrases that sound identical to what you heard. A creature can make an Insight Check contested by your Trickery Check to determine if this sound is real.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Mimic_Simple_Sounds_Short_Phrases' }]
  },
  {
    id: 'beastborn_intimidating_shout',
    name: 'Intimidating Shout',
    description: 'Once per Combat, you can spend 1 AP to let out an Intimidating Shout. All creatures within 5 Spaces that can hear you must make a Charisma Save contested by your Attack Check. Failure: A target is Hindered on the next Attack Check or Spell Attack it makes before the start of your next turn.',
    cost: 2,
    effects: [{ type: 'GRANT_ABILITY', value: 'Intimidating_Shout_OncePerCombat_1AP' }]
  },
  {
    id: 'beastborn_toxic_fortitude',
    name: 'Toxic Fortitude',
    description: 'You have Poison Resistance (Half) and ADV on Saves against being Poisoned.',
    cost: 2,
    effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Poison' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Poisoned' }]
  },
  {
    id: 'beastborn_shoot_webs',
    name: 'Shoot Webs',
    description: 'You can spend 1 AP to shoot web at a target within 5 Spaces. Make an Attack Check contested by the target’s Physical Save. Success: The target is Restrained by webbing and can spend 1 AP on their turn to attempt to escape (Martial Check vs your Save DC). The webbing can also be attacked and destroyed (PD 5, AD 10, 2 HP; Immunity to Bludgeoning, Poison, and Psychic damage).',
    cost: 2,
    effects: [{ type: 'GRANT_ABILITY', value: 'Shoot_Webs_1AP' }]
  },
];
