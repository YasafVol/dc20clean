/**
 * Cleric Class Definition - New Effect Schema
 * Based on the DC20 rule analysis from classAndAncestryAndCalcRefactor.md
 */

import type { ClassDefinition } from '../schemas/character.schema';

export const clericClass: ClassDefinition = {
  className: 'Cleric',
  startingStats: {
    hp: 8,
    sp: 0,
    mp: 6,
    skillPoints: 3,
    tradePoints: 3,
    languagePoints: 2,
    maneuversKnown: 0,
    techniquesKnown: 0,
    cantripsKnown: 2,
    spellsKnown: 3
  },
  coreFeatures: [
    {
      featureName: 'Spellcasting Path',
      levelGained: 1,
      description: 'You gain the ability to cast spells and use divine magic.',
      effects: [
        { type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true },
        { type: 'GRANT_COMBAT_TRAINING', target: 'Light_Shields', value: true }
      ]
    },
    {
      featureName: 'Cleric Order',
      levelGained: 1,
      description: 'Your connection to your deity grants you divine powers.',
      choices: [
        {
          id: 'cleric_cleric_order_0',
          prompt: 'Choose your Divine Damage type',
          count: 1,
          options: [
            {
              name: 'Cold',
              description: 'Your divine damage is Cold.',
              effects: [{ type: 'GRANT_ABILITY', target: 'divine_damage_cold', value: 'Your Divine Damage type is Cold.' }]
            },
            {
              name: 'Fire',
              description: 'Your divine damage is Fire.',
              effects: [{ type: 'GRANT_ABILITY', target: 'divine_damage_fire', value: 'Your Divine Damage type is Fire.' }]
            },
            {
              name: 'Lightning',
              description: 'Your divine damage is Lightning.',
              effects: [{ type: 'GRANT_ABILITY', target: 'divine_damage_lightning', value: 'Your Divine Damage type is Lightning.' }]
            },
            {
              name: 'Acid',
              description: 'Your divine damage is Acid.',
              effects: [{ type: 'GRANT_ABILITY', target: 'divine_damage_acid', value: 'Your Divine Damage type is Acid.' }]
            },
            {
              name: 'Poison',
              description: 'Your divine damage is Poison.',
              effects: [{ type: 'GRANT_ABILITY', target: 'divine_damage_poison', value: 'Your Divine Damage type is Poison.' }]
            },
            {
              name: 'Psychic',
              description: 'Your divine damage is Psychic.',
              effects: [{ type: 'GRANT_ABILITY', target: 'divine_damage_psychic', value: 'Your Divine Damage type is Psychic.' }]
            }
          ]
        },
        {
          id: 'cleric_cleric_order_1',
          prompt: 'Choose 2 Divine Domains',
          count: 2,
          options: [
            {
              name: 'Magic',
              description: 'Your Maximum MP increases by 1. You also learn 1 additional Spell with the Restoration Spell Tag.',
              effects: [
                { type: 'MODIFY_STAT', target: 'mpMax', value: 1 },
                { type: 'GRANT_SPELL', target: 'restoration_tag', value: 1 }
              ]
            },
            {
              name: 'Peace',
              description: 'You gain Combat Training with Heavy Armor, Heavy Shields, and Weapons. Additionally, you learn 2 Defensive Maneuvers of your choice.',
              effects: [
                { type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Armor', value: true },
                { type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Shields', value: true },
                { type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
                { type: 'GRANT_CHOICE', target: 'defensive_maneuver', value: 2 }
              ]
            },
            {
              name: 'War',
              description: 'You gain Combat Training with Heavy Armor, Heavy Shields, and Weapons. Additionally, you learn 2 Attack Maneuvers of your choice.',
              effects: [
                { type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Armor', value: true },
                { type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Shields', value: true },
                { type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
                { type: 'GRANT_CHOICE', target: 'attack_maneuver', value: 2 }
              ]
            },
            {
              name: 'Life',
              description: 'Your Maximum HP increases by 1. You also learn 1 additional Spell with the Restoration Spell Tag.',
              effects: [
                { type: 'MODIFY_STAT', target: 'hpMax', value: 1 },
                { type: 'GRANT_SPELL', target: 'restoration_tag', value: 1 }
              ]
            },
            {
              name: 'Death',
              description: 'You gain 1 Skill Point. You also learn 1 additional Cantrip with the Restoration Spell Tag.',
              effects: [
                { type: 'MODIFY_STAT', target: 'skillPoints', value: 1 },
                { type: 'GRANT_CANTRIP', target: 'restoration_tag', value: 1 }
              ]
            },
            {
              name: 'Nature',
              description: 'You learn 1 additional Spell with the Elemental Spell Tag. You also gain 1 Trade Point.',
              effects: [
                { type: 'GRANT_SPELL', target: 'elemental_tag', value: 1 },
                { type: 'MODIFY_STAT', target: 'tradePoints', value: 1 }
              ]
            },
            {
              name: 'Ancestral',
              description: 'You gain 2 Ancestry Points, which you can spend on Traits for your chosen Ancestry.',
              effects: [
                { type: 'MODIFY_STAT', target: 'ancestryPoints', value: 2 }
              ]
            },
            {
              name: 'Knowledge',
              description: 'Your Mastery Limit increases by 1 for all Knowledge Trades. You also gain 2 Skill Points.',
              effects: [
                { type: 'MODIFY_STAT', target: 'knowledgeMasteryLimit', value: 1 },
                { type: 'MODIFY_STAT', target: 'skillPoints', value: 2 }
              ]
            },
            {
              name: 'Trickery',
              description: 'You learn 1 additional Cantrip with the Illusion Spell Tag. Your Mastery Limit for one Skill of your choice increases by 1.',
              effects: [
                { type: 'GRANT_CANTRIP', target: 'illusion_tag', value: 1 },
                { type: 'GRANT_SKILL_EXPERTISE', target: 'any_skill', value: { capIncrease: 1, levelIncrease: 0 }, userChoice: { prompt: 'Choose a Skill for increased Mastery Limit' } }
              ]
            },
            {
              name: 'Light',
              description: 'You learn 1 additional Cantrip with the Holy Spell Tag. Additionally, you learn the Light Cantrip.',
              effects: [
                { type: 'GRANT_CANTRIP', target: 'holy_tag', value: 1 },
                { type: 'GRANT_CANTRIP', target: 'light_cantrip', value: 1 }
              ]
            }
          ]
        }
      ]
    },
    {
      featureName: 'Knowledge',
      levelGained: 1,
      description: 'Your divine connection enhances your understanding.',
      effects: [
        { type: 'MODIFY_STAT', target: 'knowledgeMasteryLimit', value: 1 },
        { type: 'MODIFY_STAT', target: 'skillPoints', value: 2 }
      ]
    },
    {
      featureName: 'Divine Blessing',
      levelGained: 2,
      description: 'You can spend 2 AP to grant a creature within 5 Spaces a d8 Help Die for any d20 Check, Attack, or Save. You can do this a number of times equal to your Charisma (minimum 1), and you regain all uses when you finish a Long Rest.',
      effects: [
        { type: 'GRANT_ABILITY', target: 'divine_blessing', value: 'Spend 2 AP to grant d8 Help Die within 5 Spaces, uses = Charisma (min 1) per Long Rest.' }
      ]
    }
  ],
  subclasses: []
};
