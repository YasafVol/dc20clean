/**
 * Champion Class Definition - New Effect Schema
 * Based on DC20 Champion features
 */

import type { ClassDefinition } from '../schemas/character.schema';

export const championClass: ClassDefinition = {
	className: 'Champion',
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['All_Armors'],
			shields: ['All_Shields']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Champion Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Champion Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Champion Class Table'
		},
		staminaRegen: {
			description: 'Once per round, you can regain up to half your maximum SP when you perform a Maneuver.',
		}
	},
	coreFeatures: [
		{
			featureName: 'Martial Path',
			levelGained: 1,
			description: 'You gain extensive combat training.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Armors', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields', value: true },
				{
					type: 'GRANT_ABILITY',
					target: 'learns_all_attack_maneuvers',
					value: 'You learn all Attack Maneuvers.'
				},
				{
					type: 'GRANT_ABILITY',
					target: 'stamina_regen',
					value: 'Once per round, regain up to half maximum SP when you perform a Maneuver.'
				}
			]
		},
		{
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
					description: 'You learn 2 Maneuvers of your choice.',
					effects: [{ type: 'GRANT_CHOICE', target: 'maneuver', value: 2 }]
				},
				{
					name: 'Technique Master',
					description:
						'You learn 1 Technique of your choice. Once per Combat, when you perform a Technique you can reduce its SP cost by 1.',
					effects: [
						{ type: 'GRANT_CHOICE', target: 'technique', value: 1 },
						{
							type: 'GRANT_ABILITY',
							target: 'technique_master',
							value: "Once per Combat: reduce a Technique's SP cost by 1."
						}
					]
				}
			]
		},
		{
			featureName: 'Fighting Spirit',
			levelGained: 1,
			description: 'You stand ready for Combat at any moment.',
			benefits: [
				{
					name: 'Combat Readiness',
					description:
						'At the start of your first turn in Combat, you gain one of the following benefits: Brace (Dodge Action + ADV on next Save) or Advance (Move Action + ADV on next Physical Check).',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'combat_readiness',
							value:
								'First turn in Combat: choose Brace (Dodge + ADV on Save) or Advance (Move + ADV on Physical Check).'
						}
					]
				},
				{
					name: 'Second Wind',
					description:
						'Once per Combat when you start your turn Bloodied, you can regain 2 HP and 1 SP.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'second_wind',
							value: 'Once per Combat when Bloodied at turn start: regain 2 HP and 1 SP.'
						}
					]
				}
			]
		},
		{
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
			featureName: 'Adaptive Tactics',
			levelGained: 2,
			description:
				"When you roll for Initiative, and at the end of each of your turns, you gain a d8 Tactical Die if you don't already have one.",
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'adaptive_tactics',
					value:
						'Gain d8 Tactical Die at Initiative and end of turns. Spend for: Assault (+die to Attack), Defense (+die to PD/AD), or Mobility (+die to Move/Jump).'
				}
			]
		}
	],
	subclasses: []
};
