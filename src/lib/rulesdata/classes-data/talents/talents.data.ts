import type { Talent } from './talent.types';

export const generalTalents: Talent[] = [
  {
    id: 'general_attribute_increase',
    name: 'Attribute Increase',
    category: 'General',
    description: 'You gain 1 Attribute Point to put into any Attribute of your choice.',
    effects: [{ type: 'MODIFY_STAT', target: 'attributePoints', value: 1 }],
  },
  {
    id: 'general_skill_increase',
    name: 'Skill Point Increase',
    category: 'General',
    description: 'You gain 3 Skill Points to put into any Skill of your choice.',
    effects: [{ type: 'MODIFY_STAT', target: 'skillPoints', value: 3 }],
  },
  {
    id: 'general_trade_increase',
    name: 'Trade Point Increase',
    category: 'General',
    description: 'You gain 3 Trade Points to put into any Trade of your choice.',
    effects: [{ type: 'MODIFY_STAT', target: 'tradePoints', value: 3 }],
  },
  {
    id: 'general_martial_expansion',
    name: 'Martial Expansion',
    category: 'General',
    description: 'You gain Combat Training with Weapons, Armor, and Shields. You learn 2 additional Maneuvers and 1 additional Technique.',
    effects: [
      { type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
      { type: 'GRANT_COMBAT_TRAINING', target: 'Armor', value: true },
      { type: 'GRANT_COMBAT_TRAINING', target: 'Shields', value: true },
      { type: 'MODIFY_STAT', target: 'maneuversKnown', value: 2 },
      { type: 'MODIFY_STAT', target: 'techniquesKnown', value: 1 },
    ],
  },
  {
    id: 'general_spellcasting_expansion',
    name: 'Spellcasting Expansion',
    category: 'General',
    description: 'Your Maximum Mana Points increases by 2. You gain access to your choice of any Spell List. You learn 1 additional Spell (from Spell Lists that you have access to).',
    effects: [
      { type: 'MODIFY_STAT', target: 'mpMax', value: 2 },
      { type: 'GRANT_ABILITY', target: 'spell_list_access', value: 'any' },
      { type: 'MODIFY_STAT', target: 'spellsKnown', value: 1 },
    ],
  },
];

export const multiclassTalents: Talent[] = [
    {
        id: 'multiclass_novice',
        name: 'Novice Multiclass',
        category: 'Multiclass',
        description: 'You can choose a 1st Level Class Feature from any Class.',
        effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_feature_level_1', value: 1 }]
    },
    {
        id: 'multiclass_adept',
        name: 'Adept Multiclass',
        category: 'Multiclass',
        description: 'You can choose a 2nd Level Class Feature from any Class.',
        prerequisites: { level: 4 },
        effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_feature_level_2', value: 1 }]
    },
    {
        id: 'multiclass_expert',
        name: 'Expert Multiclass',
        category: 'Multiclass',
        description: 'Choose a 5th Level Class Feature OR a 3rd Level Subclass Feature from a class you have at least 1 feature from.',
        prerequisites: { level: 7 },
        effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_feature_level_5_or_subclass_3', value: 1 }]
    },
    {
        id: 'multiclass_master',
        name: 'Master Multiclass',
        category: 'Multiclass',
        description: 'Choose a 6th Level Subclass Feature from a subclass you have at least 1 feature from.',
        prerequisites: { level: 10 },
        effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_subclass_feature_level_6', value: 1 }]
    },
    {
        id: 'multiclass_grandmaster',
        name: 'Grandmaster Multiclass',
        category: 'Multiclass',
        description: 'Choose an 8th Level Class Capstone Feature from any Class you have at least 2 Class Features from.',
        prerequisites: { level: 13 },
        effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_capstone_feature_level_8', value: 1 }]
    },
    {
        id: 'multiclass_legendary',
        name: 'Legendary Multiclass',
        category: 'Multiclass',
        description: 'Choose a 9th Level Subclass Capstone Feature from any Subclass you have at least 2 Subclass Features from.',
        prerequisites: { level: 17 },
        effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_subclass_capstone_level_9', value: 1 }]
    }
];