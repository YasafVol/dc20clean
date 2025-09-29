/**
 * Hunter Class Definition - New Effect Schema
 * Based on the DC20 rule analysis from classAndAncestryAndCalcRefactor.md
 */

import type { ClassDefinition } from '../../schemas/character.schema';

export const hunterClass: ClassDefinition = {
	className: 'Hunter',
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['Light_Armor'],
			shields: ['Light_Shields']
		},
		maneuvers: {
			learnsAllAttack: false,
			additionalKnown: 'Maneuvers Known column of the Hunter Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Hunter Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Hunter Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, you can regain up to half your maximum SP when you score a Heavy or Critical Hit.'
		}
	},
	coreFeatures: [
		{
			id: 'hunter_martial_path',
			featureName: 'Martial Path',
			levelGained: 1,
			description: 'You gain training in martial combat.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Shields', value: true },
				{
					type: 'GRANT_ABILITY',
					target: 'learns_all_attack_maneuvers',
					value: 'You learn all Attack Maneuvers.'
				}
			]
		},
		{
			id: 'hunter_mark',
			featureName: "Hunter's Mark",
			levelGained: 1,
			description:
				'You can spend 1 AP and 1 SP to focus on and mark a creature you can see within 15 Spaces as your quarry. While marked, you gain ADV on Awareness and Survival Checks to find the target, the first Martial Attack against your target on your turn has ADV and ignores PDR, and Heavy/Critical Hits grant a d8 Help Die to the next Attack against the target. The mark lasts until the target is on a different Plane, you Long Rest, fall Unconscious, or mark another creature.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'hunters_mark',
					value:
						'Mark a creature (1 AP + 1 SP): ADV on Awareness/Survival to find, first Martial Attack has ADV and ignores PDR, Heavy/Critical Hits grant d8 Help Die.'
				}
			]
		},
		{
			id: 'hunter_favored_terrain',
			featureName: 'Favored Terrain',
			levelGained: 1,
			description:
				'You are particularly familiar with specific environments. While in your Favored Terrains, you have ADV on Stealth and Survival Checks and cannot be Surprised.',
			choices: [
				{
					id: 'hunter_favored_terrain_0',
					prompt: 'Choose 2 types of Favored Terrain',
					count: 2,
					options: [
						{
							name: 'Grassland',
							description: 'Your Speed and Jump Distance increases by 1.',
							effects: [
								{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1 },
								{ type: 'MODIFY_STAT', target: 'jumpDistance', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_grassland',
									value: 'In grassland: ADV on Stealth and Survival, cannot be Surprised.'
								}
							]
						},
						{
							name: 'Forest',
							description:
								'You gain 2 Skill Points to use on up to 2 of the following Skills: Animal, Awareness, Medicine, Survival, and Stealth',
							effects: [
								{
									type: 'MODIFY_STAT',
									target: 'skillPoints',
									value: 2
								},
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_forest',
									value: 'In forest: ADV on Stealth and Survival, cannot be Surprised.'
								}
							]
						},
						{
							name: 'Desert',
							description:
								'You gain Fire Resistance (Half) and Resistance to Exhaustion from hot temperatures',
							effects: [
								{ type: 'GRANT_RESISTANCE', target: 'Fire', value: 'half' },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_desert',
									value:
										'In desert: ADV on Stealth and Survival, cannot be Surprised, resistance to hot temperature Exhaustion.'
								}
							]
						},
						{
							name: 'Mountain',
							description:
								'You gain a Climb Speed equal to your Ground Speed, Resistance to Exhaustion from high altitudes, and Resistance (Half) to damage from Falling',
							effects: [
								{ type: 'GRANT_MOVEMENT', target: 'climb', value: 'equal_to_speed' },
								{ type: 'GRANT_RESISTANCE', target: 'Falling', value: 'half' },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_mountain',
									value:
										'In mountains: ADV on Stealth and Survival, cannot be Surprised, resistance to altitude Exhaustion.'
								}
							]
						},
						{
							name: 'Jungle',
							description:
								'You ignore Difficult Terrain, gain Poisoned Resistance, and have ADV on Saves against contracting Diseases',
							effects: [
								{ type: 'GRANT_RESISTANCE', target: 'Poisoned', value: true },
								{ type: 'GRANT_ADV_ON_SAVE', target: 'disease', value: true },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_jungle',
									value:
										'In jungle: ADV on Stealth and Survival, cannot be Surprised, ignore Difficult Terrain, Poisoned resistance, ADV vs diseases.'
								}
							]
						},
						{
							name: 'Swamp',
							description:
								'You gain Poison Resistance (Half) and Poisoned Resistance, and have ADV on Saves against contracting Diseases',
							effects: [
								{ type: 'GRANT_RESISTANCE', target: 'Poison', value: 'half' },
								{ type: 'GRANT_RESISTANCE', target: 'Poisoned', value: true },
								{ type: 'GRANT_ADV_ON_SAVE', target: 'disease', value: true },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_swamp',
									value:
										'In swamp: ADV on Stealth and Survival, cannot be Surprised, Poison resistance, Poisoned resistance, ADV vs diseases.'
								}
							]
						},
						{
							name: 'Coast',
							description:
								'You gain a Swim Speed equal to your Ground Speed (your Weapon Attacks no longer have DisADV as a result of being underwater), you can hold your breath twice as long as normal, and you have ADV on Awareness Checks while underwater.',
							effects: [
								{ type: 'GRANT_MOVEMENT', target: 'swim', value: 'equal_to_speed' },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_coast',
									value:
										'In coastal areas: ADV on Stealth and Survival, cannot be Surprised, no underwater weapon penalties, double breath holding, ADV on Awareness underwater.'
								}
							]
						},
						{
							name: 'Tundra',
							description:
								'You gain Cold Resistance (Half) and Resistance to Exhaustion from cold temperatures',
							effects: [
								{ type: 'GRANT_RESISTANCE', target: 'Cold', value: 'half' },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_tundra',
									value:
										'In tundra: ADV on Stealth and Survival, cannot be Surprised, resistance to cold temperature Exhaustion.'
								}
							]
						},
						{
							name: 'Subterranean',
							description:
								'You gain Darkvision 10 Spaces. If you already have Darkvision, its range is increased by 5 Spaces. Additionally, you also gain a Tremorsense of 3 Spaces. If you already have a Tremorsense, it increases by 2 Spaces.',
							effects: [
								{ type: 'GRANT_SENSE', target: 'darkvision', value: 10 },
								{ type: 'GRANT_SENSE', target: 'tremorsense', value: 3 },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_subterranean',
									value:
										'Underground: ADV on Stealth and Survival, cannot be Surprised. Conditional bonuses for existing senses handled separately.'
								}
							]
						},
						{
							name: 'Urban',
							description:
								'You gain 2 Skill Points to use on up to 2 of the following Skills: Influence, Insight, Investigation, Intimidation, and Trickery.',
							effects: [
								{
									type: 'MODIFY_STAT',
									target: 'skillPoints',
									value: 2
								},
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_urban',
									value: 'In urban areas: ADV on Stealth and Survival, cannot be Surprised.'
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'hunter_strike',
			featureName: "Hunter's Strike",
			levelGained: 2,
			description:
				"When you make a Martial Attack against the target of your Hunter's Mark, you can spend 1 SP to deal +1d8 damage of the Weapon's damage type. If the Attack was a Heavy Hit, the damage becomes +2d8. If the Attack was a Critical Hit, the damage becomes +3d8.",
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'hunters_strike',
					value:
						"Against Hunter's Mark target: spend 1 SP for +1d8 damage (+2d8 Heavy Hit, +3d8 Critical Hit)."
				}
			]
		},
		{
			id: 'hunter_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		},
		{
			featureName: 'Bestiary',
			levelGained: 3,
			description: 'Your knowledge of creatures grants you tactical advantages when facing them.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'bestiary',
					value:
						'You have extensive knowledge of creature weaknesses and behaviors for tactical advantage.'
				}
			]
		}
	],
	subclasses: []
};
