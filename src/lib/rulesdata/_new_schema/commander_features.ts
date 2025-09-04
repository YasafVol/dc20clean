/**
 * Commander Class Definition - New Effect Schema
 * Based on DC20 Commander features with martial abilities and leadership
 */

import type { ClassDefinition } from '../schemas/character.schema';

export const commanderClass: ClassDefinition = {
	className: 'Commander',
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
		techniques: {
			additionalKnown: 'Techniques Known column of the Commander Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Commander Class Table'
		},
		staminaRegen: {
			description: 'Once per round, regain up to half maximum SP when you grant a creature a Help Die.',
		}
	},
	coreFeatures: [
		{
			featureName: 'Martial Path',
			levelGained: 1,
			description: 'You gain extensive combat training and martial prowess.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields', value: true },
				{ type: 'GRANT_MANEUVERS', target: 'all_attack', value: true }
			],
			benefits: [
				{
					name: 'Combat Training',
					description: 'Proficiency with all weapons, armor, and shields.',
					effects: []
				},
				{
					name: 'Maneuver Training',
					description: 'You learn all Attack Maneuvers plus additional maneuvers.',
					effects: []
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
			featureName: 'Inspiring Presence',
			levelGained: 1,
			description: 'Whenever you spend SP while in Combat, you can restore HP to nearby allies.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'inspiring_presence',
					value:
						'When spending SP in combat: restore HP equal to SP spent, divide among allies within 5 Spaces.'
				}
			]
		},
		{
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
			featureName: 'Natural Leader',
			levelGained: 1,
			description:
				'You have ADV on Checks made to convince creatures that you are an authority figure.',
			isFlavor: true,
			effects: [
				{ type: 'GRANT_ADV_ON_CHECK', target: 'authority_figure', value: 'ADV' },
				{ type: 'GRANT_ADV_ON_CHECK', target: 'military_groups', value: 'ADV' }
			]
		},
		{
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
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		}
	],
	subclasses: [
		{
			subclassName: 'Crusader',
			description: 'Holy warriors who protect and inspire their allies.',
			features: [
				{
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
										"Commander's Call: Free Intimidate Action against creature within 15 Spaces (once per combat)."
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
										'Priority Target (1 AP + 1 SP): Allies in aura get ADV on first attack vs chosen target until your next turn.'
								}
							]
						}
					]
				},
				{
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
