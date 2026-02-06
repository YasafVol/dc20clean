/**
 * Cleric Class Definition
 * Based on the DC20 rulebook provided.
 * 10 SEPT 2025
 */

import type { ClassDefinition } from '../../schemas/character.schema';

export const clericClass: ClassDefinition = {
	className: 'Cleric',
	classCategory: 'spellcaster',
	startingEquipment: {
		weaponsOrShields: ['1 Weapon or Light Shield'],
		armor: ['1 set of Light Armor'],
		spellFocus: ['1 Spell Focus (Holy Symbol)'],
		tradeTools: ['1 set of Trade Tools'],
		packs: 'Adventuring Pack (Coming Soon)'
	},
	spellcasterPath: {
		combatTraining: {
			armor: ['Light_Armor'],
			shields: ['Light_Shields']
		},
		spellList: {
			description:
				'When you learn a new Spell, you can choose any Spell on the Divine Spell Source.',
			type: 'divine'
		},
		spells: {
			description:
				'The number of Spells you know increases as shown in the Spells Known column of the Cleric Class Table.'
		},
		manaPoints: {
			maximumIncreasesBy:
				'Your maximum number of Mana Points increases as shown in the Mana Points column of the Cleric Class Table.'
		}
	},
	coreFeatures: [
		{
			id: 'cleric_spellcasting_path',
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description:
				'You gain the ability to cast spells from the Divine Spell Source. You gain Combat Training with Spell Focuses, Light Armor, and Light Shields.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Spell_Focuses', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Shields', value: true }
			]
		},
		{
			id: 'cleric_order',
			featureName: 'Cleric Order',
			levelGained: 1,
			description:
				'Your connection to your deity grants you the following benefits: Choose an Elemental or Mystical damage type to become your Divine Damage, and gain the benefits of 2 Divine Domains of your choice.',
			choices: [
				{
					id: 'cleric_divine_damage',
					prompt: 'Choose your Divine Damage type',
					count: 1,
					options: [
						{ name: 'Fire', description: 'Your Divine Damage type is Fire.', effects: [] },
						{ name: 'Cold', description: 'Your Divine Damage type is Cold.', effects: [] },
						{
							name: 'Lightning',
							description: 'Your Divine Damage type is Lightning.',
							effects: []
						},
						{ name: 'Acid', description: 'Your Divine Damage type is Corrosion.', effects: [] },
						{ name: 'Poison', description: 'Your Divine Damage type is Poison.', effects: [] },
						{ name: 'Radiant', description: 'Your Divine Damage type is Radiant.', effects: [] },
						{ name: 'Umbral', description: 'Your Divine Damage type is Umbral.', effects: [] },
						{ name: 'Psychic', description: 'Your Divine Damage type is Psychic.', effects: [] }
					]
				},
				{
					id: 'cleric_divine_domain',
					prompt: 'Choose 2 Divine Domains',
					count: 2,
					options: [
						{
							name: 'Knowledge',
							description:
								'Your Mastery Limit increases by 1 for all Knowledge Trades. Additionally, you gain 2 Skill Points.',
							effects: [
								{ type: 'MODIFY_STAT', target: 'knowledgeMasteryLimit', value: 1 },
								{ type: 'MODIFY_STAT', target: 'skillPoints', value: 2 }
							]
						},
						{
							name: 'Magic',
							description:
								'Your maximum MP increases by 1. Choose a Spell Tag (such as Fire, Holy, or Undeath). You learn 1 Spell with the chosen Spell Tag, and when you learn a new Spell you can choose any Spell that also has the chosen Spell Tag.',
							effects: [
								{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 },
								{
									type: 'GRANT_SPELL',
									target: 'by_tag',
									value: 1,
									userChoice: { prompt: 'Choose a Spell Tag', options: ['Fire', 'Holy', 'Undeath'] }
								}
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
								"Enemy creatures within 10 Spaces of you take an additional 1 damage from Attacks while they're Well-Bloodied.",
							effects: []
						},
						{
							name: 'Grave',
							description:
								"Allied creatures within 10 Spaces of you take 1 less damage from Attacks while they're Well-Bloodied.",
							effects: []
						},
						{
							name: 'Light',
							description:
								'When you produce an MP Effect that targets at least 1 creature, you can force 1 target to make a Might or Charisma Save. Failure: Until the end of their next turn, they shed a 1 Space Aura of Bright Light and are Hindered on their next Attack.',
							effects: []
						},
						{
							name: 'Dark',
							description:
								'You gain 10 Space Darkvision (or increase it by 5). While in Dim Light, you can take the Hide Action to Hide from creatures that can see you. On a Success, you remain Hidden until you move or the area becomes Bright Light.',
							effects: [
								{ type: 'GRANT_SENSE', target: 'darkvision', value: 10 },
								{
									type: 'GRANT_ABILITY',
									target: 'shadow_hide',
									value:
										'Can Hide in Dim Light; remains Hidden until moving or area becomes Bright Light.'
								}
							]
						},
						{
							name: 'War',
							description:
								'You gain Combat Training with Weapons and learn 1 Attack Maneuver of your choice.',
							effects: [
								{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
								{ type: 'GRANT_CHOICE', target: 'attack_maneuver', value: 1 }
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
							name: 'Order',
							description:
								'Once per turn, when a creature you can see within 10 Spaces of you makes a Check, you can spend 1 AP as a Reaction to remove all instances of ADV and DisADV from that Check.',
							effects: []
						},
						{
							name: 'Chaos',
							description:
								'When you make a Spell Check you can choose to give yourself ADV on it, but you must also roll on the Wild Magic Table. You can use this Feature once per Long Rest, and regain the ability to use it again when you roll for Initiative.',
							effects: []
						},
						{
							name: 'Divination',
							description:
								"You can't be Flanked. When you spend MP, you gain the ability to see Invisible creatures and objects until the start of your next turn.",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'condition_immunity_flanked',
									value: "You can't be Flanked."
								},
								{
									type: 'GRANT_ABILITY',
									target: 'see_invisible_on_mp_spend',
									value:
										'When you spend MP, you gain the ability to see Invisible creatures and objects until the start of your next turn.'
								}
							]
						},
						{
							name: 'Trickery',
							description:
								'When you produce an MP Effect that targets at least 1 creature, you can choose 1 of the targets and create an illusory duplicate of it that lasts until the start of your next turn. The next Attack made against the target has DisADV, and causes the illusory duplicate to disappear.',
							effects: []
						},
						{
							name: 'Ancestral',
							description:
								'You get 2 Ancestry Points that you can spend on Traits from any Ancestry.',
							effects: [{ type: 'MODIFY_STAT', target: 'ancestryPoints', value: 2 }]
						}
					]
				}
			]
		},
		{
			id: 'cleric_divine_damage_expansion',
			featureName: 'Divine Damage Expansion',
			levelGained: 1,
			description:
				'When you deal damage with a Spell you can convert the damage to your Divine Damage type. Additionally, you gain Resistance (1) to your Divine Damage type.',
			effects: []
		},
		{
			id: 'cleric_divine_blessing',
			featureName: 'Divine Blessing',
			levelGained: 1,
			description:
				'You can spend 1 AP to say a prayer and petition your deity for their divine blessing. Choose 1 of the blessings listed below. Each blessing has a listed MP cost that you must spend to gain the blessing. Once during the next minute, you can apply the blessing to a Spell you cast. If your Spell targets more than 1 creature, the blessing only applies to 1 target of your choice. You can only have 1 blessing at a time. If the blessing ends without granting any benefit, you regain the MP spent.',
			benefits: [
				{
					name: 'Destruction',
					description:
						"(1 MP) The target takes 3 Divine damage, provided that the result of your Spell Check is equal to or higher than the target's AD. If the Spell doesn't normally require a Spell Check, then you must make one when you apply this blessing.",
					effects: []
				},
				{
					name: 'Guidance',
					description:
						'(1 MP) The target gains a d8 Help Die that they can add to 1 Check of their choice they make within the next minute. When they use this Help Die, the Check gains ADV.',
					effects: []
				},
				{
					name: 'Restoration',
					description: '(1 MP) The target regains 3 HP.',
					effects: []
				}
			]
		},
		{
			id: 'cleric_divine_omen',
			featureName: 'Divine Omen (Flavor Feature)',
			levelGained: 1,
			description:
				'Once per Long Rest, you can spend 10 minutes to commune with your Deity and ask one yes-or-no question.',
			effects: []
		},
		{
			id: 'cleric_channel_divinity',
			featureName: 'Channel Divinity',
			levelGained: 2,
			description:
				'You gain the ability to channel the direct power of your deity. When you use this Feature, choose 1 of the options below. You can use this Feature once per Short Rest.',
			benefits: [
				{
					name: 'Divine Rebuke',
					description:
						"You can spend 2 AP to censure all creatures of your choice who can see or hear you within 5 Spaces. Make a Spell Check against each target's AD, and each target makes a Repeated Mental Save against your Save DC. Attack Hit: The target takes Divine Damage equal to your Prime Modifier. Save Failure: The target becomes Intimidated by you for 1 minute or until it takes damage again.",
					effects: []
				},
				{
					name: 'Lesser Divine Intervention',
					description:
						'You can spend 2 AP to call on your deity to intervene on your behalf when your need is great to replenish you and your allies. Make a DC 15 Spell Check. Success: You gain a pool of healing equal to your Prime Modifier that you can use to restore HP to any number of creatures within 5 Spaces, distributing the HP among them. Additionally, you regain 1 MP. Success (each 5): Increase the amount healed by an amount equal to your Prime Modifier. Failure: You can only gain a pool of healing equal to your Prime Modifier.',
					effects: []
				}
			]
		},
		{
			id: 'cleric_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		},
		{
			id: 'cleric_level_5_placeholder',
			featureName: 'Divine Conduit (Placeholder)',
			levelGained: 5,
			isFlavor: true,
			description: 'Placeholder feature for Level 5. See CH6 for final design.'
		},
		{
			id: 'cleric_level_8_capstone_placeholder',
			featureName: 'Avatar of Faith (Placeholder)',
			levelGained: 8,
			isFlavor: true,
			description: 'Placeholder capstone for Level 8. See CH6 for final design.'
		}
	],
	subclasses: [
		{
			subclassName: 'Inquisitor',
			description: 'You are an agent of divine justice, rooting out heresy and deception.',
			features: [
			{
				id: 'cleric_inquisitor_vanquish_heresy',
				featureName: 'Vanquish Heresy',
				levelGained: 3,
					description:
						'You gain Resistance to Charmed, Intimidated, and Taunted. Creatures Intimidated by your Divine Rebuke don\'t stop being Intimidated if they take damage. You also gain the "Chastise" Divine Blessing option.',
					effects: []
				},
			{
				id: 'cleric_inquisitor_divine_interrogator',
				featureName: 'Divine Interrogator (Flavor Feature)',
				levelGained: 3,
					description:
						"Once per Long Rest, you can interrogate a creature by asking it a Yes or No question. It makes a Charisma Save against your Save DC. Failure: It can't tell a lie to the question that you asked it.",
					effects: []
				}
			]
		},
		{
			subclassName: 'Priest',
			description: 'You are a beacon of faith, healing the wounded and protecting the innocent.',
			features: [
			{
				id: 'cleric_priest_sanctification',
				featureName: 'Sanctification',
				levelGained: 3,
					description:
						"When you spend MP to heal a creature beyond their HP maximum, they gain an amount of Temp HP equal to the remaining healing. When you spend MP to heal a creature on Death's Door, the HP restored is increased by an amount equal to your Prime Modifier. You also gain the 'Hand of Salvation' Channel Divinity option.",
					effects: []
				},
			{
				id: 'cleric_priest_all_that_ails',
				featureName: 'All That Ails (Flavor Feature)',
				levelGained: 3,
					description:
						'You have ADV on Checks made to identify or determine the effects of a Disease, Poison, or Curse affecting a creature.',
					effects: []
				}
			]
		}
	]
};
