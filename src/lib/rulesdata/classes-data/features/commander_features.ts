/**
 * Commander Class Definition - New Effect Schema
 * Based on DC20 Commander features with martial abilities and leadership
 */

import type { ClassDefinition } from '../../schemas/character.schema';

export const commanderClass: ClassDefinition = {
	className: 'Commander',
	classCategory: 'martial',
	startingEquipment: {
		arsenal: 'Choose 3 of any of the following items: Weapon or Shield.',
		armor: '1 set of Armor.',
		tradeTools:
			"Choose 1 of any of the following items: Cartographer's Tools, Calligrapher's, Cryptographer's Tools, or Gaming Set.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['All_Armor'],
			shields: ['All_Shields']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Commander Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Commander Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, regain up to half maximum SP when you grant a creature a Help Die.'
		}
	},
	coreFeatures: [
		{
			id: 'commander_martial_path',
			featureName: 'Martial Path',
			levelGained: 1,
			description: 'You gain extensive combat training and martial prowess.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields', value: true }
			],
			benefits: [
				{
					name: 'Combat Training',
					description: 'Proficiency with all weapons, armor, and shields.'
				},
				{
					name: 'Maneuver Training',
					description: 'You learn all Attack Maneuvers plus additional maneuvers.'
				},
				{
					name: 'Stamina Regeneration',
					description:
						'Once per round, regain up to half maximum SP when you grant a creature a Help Die.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'stamina_regen',
							value: 'Regain up to half max SP when granting Help Die (once per round).'
						}
					]
				}
			]
		},
		{
			id: 'commander_inspiring_presence',
			featureName: 'Inspiring Presence',
			levelGained: 1,
			description:
				"Once per Round during Combat, when you spend SP you can restore 1 HP to a creature of your choice within 10 Spaces (including yourself) that can see or hear you. If the creature is on Death's Door, they regain 1 additional HP.",
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'inspiring_presence',
					value:
						"Once per Round in combat when you spend SP: restore 1 HP to a creature within 10 Spaces that can see or hear you; Death's Door targets regain 1 additional HP."
				}
			]
		},
		{
			id: 'commander_commanders_call',
			featureName: "Commander's Call",
			levelGained: 1,
			description: 'You can spend 1 AP and 1 SP to command a willing creature within 5 Spaces.',
			benefits: [
				{
					name: 'Attack Command',
					description: 'The creature makes an Attack with ADV without spending resources.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'attack_command',
							value: 'Command ally to Attack with ADV (1 AP + 1 SP, once per turn).'
						}
					]
				},
				{
					name: 'Dodge Command',
					description: 'The creature takes the Full Dodge Action.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'dodge_command',
							value: 'Command ally to Full Dodge (1 AP + 1 SP, once per turn).'
						}
					]
				},
				{
					name: 'Move Command',
					description:
						'The creature moves up to their Speed without provoking Opportunity Attacks.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'move_command',
							value:
								'Command ally to move up to Speed without opportunity attacks (1 AP + 1 SP, once per turn).'
						}
					]
				}
			]
		},
		{
			id: 'commander_natural_leader',
			featureName: 'Natural Leader',
			levelGained: 1,
			description:
				'You have ADV on Checks made to convince creatures that you are an authority figure. Additionally, you have ADV on the first Charisma Check made to interact with non-hostile members of military groups (such as soldiers, guards, etc.).',
			isFlavor: true,
			effects: [
				{ type: 'GRANT_ADV_ON_CHECK', target: 'authority_figure', value: 'ADV' },
				{ type: 'GRANT_ADV_ON_CHECK', target: 'military_groups', value: 'ADV' }
			]
		},
		{
			id: 'commander_commanding_aura',
			featureName: 'Commanding Aura',
			levelGained: 2,
			description: "You're surrounded by a 5 Space Aura that allows you to aid and support allies.",
			benefits: [
				{
					name: 'Bolster',
					description: 'Take the Help Action to aid attacks within your aura (1 AP or Reaction).',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'bolster',
							value: 'Help Action for attacks in aura (1 AP or Reaction).'
						}
					]
				},
				{
					name: 'Rally',
					description: 'Grant creatures of your choice 1 Temp HP (1 AP).',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'rally',
							value: 'Grant 1 Temp HP to creatures in aura (1 AP).'
						}
					]
				},
				{
					name: 'Reinforce',
					description: 'Impose DisADV on attacks against creatures in your aura (Reaction).',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'reinforce',
							value: 'Impose DisADV on attacks in aura (Reaction).'
						}
					]
				}
			]
		},
		{
			id: 'commander_level_5_placeholder',
			featureName: 'Expert Commander',
			levelGained: 5,
			description: 'You gain the following benefits for your Commander Class Features.',
			benefits: [
				{
					name: "Commander's Call",
					description:
						"Commander's Call range increases to 10 Spaces. You can spend 2 additional SP to issue 1 additional command.",
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'expert_commander_commanders_call',
							value:
								"Commander's Call range 10 Spaces; spend 2 additional SP to issue 1 additional command."
						}
					]
				},
				{
					name: 'Inspiring Presence',
					description: 'Inspiring Presence restores 1 additional HP.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'expert_commander_inspiring_presence',
							value: 'Inspiring Presence restores 1 additional HP.'
						}
					]
				},
				{
					name: 'Commanding Aura',
					description:
						'Your Help Die starts at d10. Rally grants +1 temp HP per 2 SP spent. Reinforce can spend 1 SP to grant ADV on Saves made as part of the Attack.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'expert_commander_commanding_aura',
							value:
								'Help Die starts at d10; Rally grants +1 temp HP per 2 SP; Reinforce can spend 1 SP to grant ADV on Saves made as part of the Attack.'
						}
					]
				}
			]
		}
	],
	subclasses: [
		{
			subclassName: 'Crusader',
			description: 'Holy warriors who protect and inspire their allies.',
			features: [
				{
					id: 'commander_crusader_virtuous_vanguard',
					featureName: 'Virtuous Vanguard',
					levelGained: 3,
					description: 'You become a beacon of courage and protection.',
					benefits: [
						{
							name: 'Aura of Courage',
							description:
								'Allies in your Commanding Aura have Resistance to Frightened and Intimidated.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'aura_of_courage',
									value: 'Allies in aura: Resistance to Frightened and Intimidated.'
								}
							]
						},
						{
							name: 'Protective Orders',
							description: "Creatures who benefit from Commander's Call gain damage Resistance.",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'protective_orders',
									value:
										"Commander's Call targets gain Resistance (1) to next damage before your next turn."
								}
							]
						},
						{
							name: 'Restoring Rally',
							description: 'Bloodied creatures regain HP instead of gaining Temp HP from Rally.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'restoring_rally',
									value: 'Rally: Bloodied creatures regain HP instead of Temp HP.'
								}
							]
						}
					]
				},
				{
					id: 'commander_crusader_gallant_hero',
					featureName: 'Gallant Hero',
					levelGained: 3,
					description: 'Your presence is a symbol of hope and safety.',
					isFlavor: true,
					effects: [{ type: 'GRANT_ADV_ON_CHECK', target: 'convince_not_afraid', value: 'ADV' }]
				}
			]
		},
		{
			subclassName: 'Warlord',
			description: 'Tactical masters who excel at aggressive battlefield control.',
			features: [
				{
					id: 'commander_warlord_offensive_tactics',
					featureName: 'Offensive Tactics',
					levelGained: 3,
					description: 'You gain aggressive battlefield abilities.',
					benefits: [
						{
							name: 'Morale Breaker',
							description:
								"Once per Combat when using Commander's Call, use Intimidate Action for free.",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'morale_breaker',
									value:
										"Commander's Call: Free Intimidate Action against creature within 10 Spaces (once per combat)."
								}
							]
						},
						{
							name: 'Battlefield Tactics',
							description:
								'Allies deal +1 damage on their first Melee Attack against flanked creatures.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'battlefield_tactics',
									value:
										'Allies in aura: +1 damage on first Melee Attack vs flanked creatures each turn.'
								}
							]
						},
						{
							name: 'Priority Target',
							description: 'Grant allies ADV on attacks against a chosen target.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'priority_target',
									value:
										'Priority Target (1 AP + 1 SP): Choose creature within 10 Spaces. Until your next turn, allies in aura have ADV on first attack on their turns vs that creature.'
								}
							]
						}
					]
				},
				{
					id: 'commander_warlord_battlefield_tactician',
					featureName: 'Battlefield Tactician',
					levelGained: 3,
					description: "You've mastered military history and strategy.",
					isFlavor: true,
					effects: [{ type: 'GRANT_ADV_ON_CHECK', target: 'military_knowledge', value: 'ADV' }]
				}
			]
		}
	]
};
