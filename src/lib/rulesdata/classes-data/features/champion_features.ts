/**
 * Champion Class Definition - New Effect Schema
 * Based on DC20 Champion features
 */

import type { ClassDefinition } from '../../schemas/character.schema';

export const championClass: ClassDefinition = {
	className: 'Champion',
	classCategory: 'martial',
	startingEquipment: {
		arsenal: 'Choose 3 of any of the following items: Weapon or Shield.',
		armor: '1 set of Armor.',
		tradeTools:
			"Choose 1 of any of the following items: Carpenter's Tools, Cartographer's Tools, Gaming Kit, or Mason's Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['All_Armors'],
			shields: ['All_Shields']
		},
		maneuvers: {
			additionalKnown: 'Maneuvers Known column of the Champion Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Champion Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, you can regain up to half your maximum SP when you perform a Maneuver.'
		}
	},
	coreFeatures: [
		{
			id: 'champion_martial_path',
			featureName: 'Martial Path',
			levelGained: 1,
			description: 'You gain extensive combat training.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Armors', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields', value: true },
				{
					type: 'GRANT_ABILITY',
					target: 'stamina_regen',
					value: 'Once per round, regain up to half maximum SP when you perform a Maneuver.'
				}
			]
		},
		{
			id: 'champion_master_at_arms',
			featureName: 'Master-at-Arms',
			levelGained: 1,
			description: 'Your training in warfare has granted you extensive weapon mastery.',
			benefits: [
				{
					name: 'Weapon Master',
					description:
						'At the start of each of your turns, you can freely swap any Weapon you are currently wielding in each hand for any other Weapon without provoking Opportunity Attacks.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'weapon_master',
							value: 'Free weapon swapping at start of turn without provoking Opportunity Attacks.'
						}
					]
				},
				{
					name: 'Maneuver Master',
					description:
						'You learn 1 Maneuver of your choice. Once per Round when you perform a Maneuver, you can reduce its SP cost by 1.',
					effects: [
						{ type: 'GRANT_CHOICE', target: 'maneuver', value: 1 },
						{
							type: 'GRANT_ABILITY',
							target: 'maneuver_master',
							value: 'Once per Round when you perform a Maneuver, reduce its SP cost by 1.'
						}
					]
				}
			]
		},
		{
			id: 'champion_fighting_spirit',
			featureName: 'Fighting Spirit',
			levelGained: 1,
			description: 'You stand ready for Combat at any moment.',
			benefits: [
				{
					name: 'Combat Readiness',
					description:
						'At the start of your first turn in Combat, you gain one of the following benefits: Fortify (Dodge Action + ADV on next Save) or Advance (Move Action + ADV on next Martial Attack or Physical Check).',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'combat_readiness_fortify',
							value:
								'First turn in Combat: choose Fortify (Dodge + ADV on next Save) or Advance (Move + ADV on next Martial Attack or Physical Check).'
						}
					]
				},
				{
					name: 'Second Wind',
					description:
						'Once per Combat when you start your turn Bloodied, you can regain 2 HP and 2 SP.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'second_wind',
							value: 'Once per Combat when Bloodied at turn start: regain 2 HP and 2 SP.'
						}
					]
				}
			]
		},
		{
			id: 'champion_know_your_enemy',
			featureName: 'Know Your Enemy',
			levelGained: 1,
			description:
				'You can spend 1 minute observing or interacting with a creature out of Combat (or spend 1 AP in Combat) to learn information about its physical capabilities compared to your own.',
			isFlavor: true,
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'know_your_enemy',
					value:
						"Spend 1 minute (or 1 AP in Combat) to assess creature's Might, Agility, PD, AD, or HP vs. yours (DC 10 Knowledge/Insight)."
				}
			]
		},
		{
			id: 'champion_adaptive_tactics',
			featureName: 'Adaptive Tactics',
			levelGained: 2,
			description:
				"When you roll for Initiative, and at the end of each of your turns, you gain a d8 Tactical Die if you don't already have one. You can spend a Tactical Die to gain one of the following Tactics: Assault or Deflect.",
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'adaptive_tactics',
					value:
						'Gain d8 Tactical Die at Initiative and end of turns. Spend for: Assault (+die to Attack) or Deflect (-die from Attack against you).'
				}
			]
		},
		{
			id: 'champion_level_5_placeholder',
			featureName: 'Expert Champion',
			levelGained: 5,
			description: 'You gain the following benefits for your Champion Class Features.',
			benefits: [
				{
					name: 'Master-at-Arms',
					description: 'You learn 2 additional Maneuvers.',
					effects: [{ type: 'GRANT_MANEUVERS', target: 'any_maneuver', value: 2 }]
				},
				{
					name: 'Fighting Spirit',
					description: 'Second Wind restores an additional 2 HP and 2 SP.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'expert_champion_fighting_spirit',
							value: 'Second Wind restores an additional 2 HP and 2 SP.'
						}
					]
				},
				{
					name: 'Adaptive Tactics',
					description: 'Your Tactical Die is a d10.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'expert_champion_adaptive_tactics',
							value: 'Your Tactical Die is d10.'
						}
					]
				}
			]
		},
		{
			id: 'champion_level_8_capstone_placeholder',
			featureName: 'Class Capstone (Source Unpublished)',
			levelGained: 9,
			isFlavor: true,
			description:
				'The v0.10.5 class progression grants a Class Capstone Feature at level 9, but this source packet does not publish class-specific capstone mechanics. This entry is intentionally non-mechanical and preserves the legacy ID for saved-character compatibility.'
		}
	],
	subclasses: [
		{
			subclassName: 'Hero',
			description: 'Your warrior spirit refuses to yield in battle.',
			features: [
				{
					id: 'hero_resolve',
					featureName: "Hero's Resolve",
					levelGained: 3,
					description: 'You gain several benefits that enhance your combat prowess.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'adrenaline_boost',
							value:
								'When you use Second Wind, gain a +5 bonus to Martial Attacks and Martial Checks until the end of your turn.'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'cut_through',
							value:
								"Your Martial Attacks that score Heavy Hits ignore the target's Physical damage Resistances."
						},
						{
							type: 'GRANT_ABILITY',
							target: 'unyielding_spirit',
							value: 'While Bloodied, you gain 1 Temp HP at the start of each of your turns.'
						}
					]
				},
				{
					id: 'adventuring_hero',
					featureName: 'Adventuring Hero',
					levelGained: 3,
					description:
						'You ignore the penalties of Forced March and being Encumbered (but not Heavily Encumbered).',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'adventuring_hero',
							value: 'Ignore penalties from Forced March and being Encumbered.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Sentinel',
			description: 'You are a stalwart protector of your allies.',
			features: [
				{
					id: 'stalwart_protector',
					featureName: 'Stalwart Protector',
					levelGained: 3,
					description: 'You gain benefits that allow you to defend your allies more effectively.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'steadfast_defender',
							value:
								'You can use your Deflect Tactic against any Attack that targets a creature within your Melee Range.'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'defensive_bash',
							value:
								'When you use a Defensive Maneuver as a Reaction to an Attack from a creature within 1 Space, the attacker must make a Physical Save against your Attack Check. Failure: The target is pushed 1 Space away or Taunted by you (your choice).'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'not_on_my_watch',
							value: 'Creatures Taunted by you deal 1 less damage to targets within 1 Space of you.'
						}
					]
				},
				{
					id: 'vigilant_watcher',
					featureName: 'Vigilant Watcher',
					levelGained: 3,
					description:
						"During a Long Rest, if you spend both 4 hour periods doing Light Activity, you have ADV on the Might Save you make to avoid gaining Exhaustion. Additionally, the Save DC doesn't increase on a Failure.",
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'vigilant_watcher',
							value:
								'During a Long Rest with only Light Activity, gain ADV on the Might Save to avoid Exhaustion.'
						}
					]
				}
			]
		}
	]
};
