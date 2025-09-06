/**
 * Cleric Class Definition - New Effect Schema
 * Based on the DC20 rule analysis from classAndAncestryAndCalcRefactor.md
 */

import type { ClassDefinition } from '../../schemas/character.schema';

export const clericClass: ClassDefinition = {
	className: 'Cleric',
	spellcasterPath: {
		spellList: {
			description: 'Divine spells from multiple domains and schools',
			type: 'divine'
		},
		cantrips: {
			description: 'Cantrips Known column of the Cleric Class Table'
		},
		spells: {
			description: 'Spells Known column of the Cleric Class Table'
		},
		manaPoints: {
			maximumIncreasesBy: 'Mana Points column of the Cleric Class Table'
		}
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
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'divine_damage_cold',
									value: 'Your Divine Damage type is Cold.'
								}
							]
						},
						{
							name: 'Fire',
							description: 'Your divine damage is Fire.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'divine_damage_fire',
									value: 'Your Divine Damage type is Fire.'
								}
							]
						},
						{
							name: 'Lightning',
							description: 'Your divine damage is Lightning.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'divine_damage_lightning',
									value: 'Your Divine Damage type is Lightning.'
								}
							]
						},
						{
							name: 'Acid',
							description: 'Your divine damage is Acid.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'divine_damage_acid',
									value: 'Your Divine Damage type is Acid.'
								}
							]
						},
						{
							name: 'Poison',
							description: 'Your divine damage is Poison.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'divine_damage_poison',
									value: 'Your Divine Damage type is Poison.'
								}
							]
						},
						{
							name: 'Psychic',
							description: 'Your divine damage is Psychic.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'divine_damage_psychic',
									value: 'Your Divine Damage type is Psychic.'
								}
							]
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
							description:
								'You gain the benefits listed below. You can choose this Divine Domain multiple times. Your maximum MP increases by 1 and choose a spell tag below',
							effects: [
								{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 },
								{
									type: 'GRANT_SPELL',
									target: 'spell_tag_choice',
									value: 1,
									userChoice: {
										prompt:
											'Choose a Spell Tag (such as Fire, Holy, or Undeath). You learn 1 Spell with the chosen Spell Tag.',
										options: [
											'fire_tag',
											'holy_tag',
											'undeath_tag',
											'restoration_tag',
											'elemental_tag',
											'illusion_tag',
											'enchantment_tag',
											'divination_tag'
										]
									}
								}
							]
						},
						{
							name: 'Peace',
							description:
								'You gain Combat Training with Heavy Armor and Heavy Shields and learn 1 Defensive Maneuver of your choice.',
							effects: [
								{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Armor', value: true },
								{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Shields', value: true },
								{ type: 'GRANT_CHOICE', target: 'defensive_maneuver', value: 1 }
							]
						},
						{
							name: 'War',
							description: 'You gain Combat Training with Weapons and access to Attack Maneuvers.',
							effects: [
								{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
								{ type: 'GRANT_CHOICE', target: 'attack_maneuver', value: 2 }
							]
						},
						{
							name: 'Life',
							description:
								'When you produce an MP Effect that restores HP to at least 1 creature, you can restore 1 HP to 1 creature of your choice within 1 Space of you (including yourself).',
							effects: []
						},
						{
							name: 'Death',
							description:
								'Enemy creatures within 10 Spaces of you take an additional 1 damage from Attacks while they’re Well-Bloodied.',
							effects: []
						},
						{
							name: 'Ancestral',
							description:
								'You gain 2 Ancestry Points, which you can spend on Traits for your chosen Ancestry.',
							effects: [{ type: 'MODIFY_STAT', target: 'ancestryPoints', value: 2 }]
						},
						{
							name: 'Knowledge',
							description:
								'Your Mastery Limit increases by 1 for all Knowledge Trades. A Trade can only benefit from 1 Feature that increases its Mastery Limit at a time. Additionally, yougain 2 Skill Points.',
							effects: [
								{
									type: 'INCREASE_TRADE_MASTERY_CAP',
									value: 1,
									count: 9,
									options: [
										'architecture',
										'deciphering',
										'linguistics',
										'survival',
										'arcana',
										'history',
										'nature',
										'religion',
										'occultism'
									]
								},
								{ type: 'MODIFY_STAT', target: 'skillPoints', value: 2 }
							]
						},
						{
							name: 'Trickery',
							description:
								'When you produce an MP Effect that targets at least 1 creature, you can choose 1 of the targets and create an illusory duplicate of it that lasts until the start of your next turn. The next Attack made against the target has DisADV,and causes the illusory duplicate to disappear.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'illusory_duplicate',
									value:
										'When casting MP Effect targeting creatures: create illusory duplicate of 1 target until start of next turn. Next Attack vs target has DisADV and destroys duplicate.'
								}
							]
						},
						{
							name: 'Light',
							description:
								'When you produce an MP Effect that targets at least 1 creature, you can force 1 target of your choice to make a Might or Charisma Save (their choice). Failure: Until the end of their next turn, they shed a 1 Space Aura of Bright Light and are Hindered on their next Attack.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'blinding_radiance',
									value:
										'When casting MP Effect targeting creatures: force 1 target to make Might or Charisma Save. Failure: shed 1 Space Bright Light Aura and Hindered on next Attack until end of their next turn.'
								}
							]
						},
						{
							name: 'Grave',
							description:
								"Allied creatures within 10 Spaces of you take 1 less damage from Attacks while they're Well-Bloodied.",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'protective_aura',
									value:
										'Allied creatures within 10 Spaces take 1 less damage from Attacks while Well-Bloodied.'
								}
							]
						},
						{
							name: 'Dark',
							description:
								'Your mastery over shadows grants you supernatural sight and the ability to hide yourself from other creatures.',
							effects: [
								{ type: 'GRANT_SENSE', target: 'darkvision', value: 10 },
								{
									type: 'GRANT_ABILITY',
									target: 'shadow_hide',
									value:
										'While in Dim Light, you can Hide from creatures that can see you. Success: remain Hidden until you move or area becomes Bright Light.'
								}
							]
						},
						{
							name: 'Order',
							description:
								'Once per turn, when a creature you can see within 10 Spaces of you makes a Check, you can spend 1 AP as a Reaction to remove all instances of ADV and DisADV from that Check.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'neutralize_advantage',
									value:
										'Once per turn: spend 1 AP as Reaction to remove all ADV and DisADV from any Check within 10 Spaces.'
								}
							]
						},
						{
							name: 'Chaos',
							description:
								'When you make a Spell Check you can choose to give yourself ADV on it, but you must also roll on the Wild Magic Table. You can use this Feature once per Long Rest, and regain the ability to use it again when you roll for Initiative.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'chaotic_magic',
									value:
										'Choose to gain ADV on Spell Check + roll Wild Magic Table. Once per Long Rest, regain on Initiative roll.'
								}
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
				{
					type: 'INCREASE_TRADE_MASTERY_CAP',
					value: 1,
					count: 9,
					options: [
						'architecture',
						'deciphering',
						'linguistics',
						'survival',
						'arcana',
						'history',
						'nature',
						'religion',
						'occultism'
					]
				},
				{ type: 'MODIFY_STAT', target: 'skillPoints', value: 2 }
			]
		},
		{
			featureName: 'Divine Blessing',
			levelGained: 2,
			description:
				'You can spend 2 AP to grant a creature within 5 Spaces a d8 Help Die for any d20 Check, Attack, or Save. You can do this a number of times equal to your Charisma (minimum 1), and you regain all uses when you finish a Long Rest.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'divine_blessing',
					value:
						'Spend 2 AP to grant d8 Help Die within 5 Spaces, uses = Charisma (min 1) per Long Rest.'
				}
			]
		}
	],
	subclasses: []
};
