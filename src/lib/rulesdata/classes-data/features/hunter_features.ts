/**
 * Hunter Class Definition - New Effect Schema
 * Based on the DC20 rule analysis from classAndAncestryAndCalcRefactor.md
 */

import type { ClassDefinition } from '../../schemas/character.schema';

export const hunterClass: ClassDefinition = {
	className: 'Hunter',
	classCategory: 'martial',
	startingEquipment: {
		weaponsOrShields: ['3 Weapons or Light Shields'],
		rangedWeapons: ['Ranged Weapon with 20 Ammo'],
		armor: ['1 set of Light Armor'],
		tradeTools: ['1 set of Trade Tools'],
		packs: 'Adventuring Pack (Coming Soon)'
	},
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['Light_Armor'],
			shields: ['Light_Shields']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Hunter Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Hunter Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, you can regain up to half your maximum SP when you Hit your Marked target, it dies, or you succeed on a check to recall info or locate an Unseen creature.'
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
			id: 'hunter_bestiary',
			featureName: 'Bestiary',
			levelGained: 1,
			description:
				"You have developed a trove of knowledge hunting creatures which you've recorded in your Bestiary. You have ADV on Checks made to learn or recall information about any creature recorded in your Bestiary.",
			isFlavor: true,
			choices: [
				{
					id: 'hunter_bestiary_0',
					prompt: 'Choose a Creature Type for your starting entries',
					count: 1,
					options: [
						{
							name: 'Aberration',
							description: 'Twisted creatures of unnatural origin.',
							effects: []
						},
						{ name: 'Beast', description: 'Natural animals and creatures.', effects: [] },
						{ name: 'Celestial', description: 'Divine and holy beings.', effects: [] },
						{ name: 'Construct', description: 'Artificial and animated creations.', effects: [] },
						{
							name: 'Dragon',
							description: 'Ancient reptilian beings of immense power.',
							effects: []
						},
						{
							name: 'Elemental',
							description: 'Living manifestations of natural forces.',
							effects: []
						},
						{ name: 'Fey', description: 'Magical beings from the Feywild.', effects: [] },
						{ name: 'Fiend', description: 'Evil entities from lower planes.', effects: [] },
						{ name: 'Giant', description: 'Massive humanoid creatures.', effects: [] },
						{ name: 'Humanoid', description: 'Bipedal civilized species.', effects: [] },
						{ name: 'Monstrosity', description: 'Frightening creatures of legend.', effects: [] },
						{ name: 'Ooze', description: 'Amorphous and corrosive beings.', effects: [] },
						{ name: 'Plant', description: 'Botanical and fungal creatures.', effects: [] },
						{ name: 'Undead', description: 'Reanimated dead and spirits.', effects: [] }
					]
				}
			]
		},
		{
			id: 'hunter_strike',
			featureName: "Hunter's Strike",
			levelGained: 2,
			description:
				'You can spend 1 SP as part of a Weapon Attack to add 1 of the unique Martial Enhancements listed below. You can only use 1 of these Enhancements per Attack. The damage increases by 1 for each SP spent beyond the first. Options: Acid (Corrosion + Hindered), Fire (Fire + Burning), Piercing (Piercing + Bleeding), Snare (Bludgeoning + Immobilized), Toxin (Poison + Impaired).',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'hunters_strike',
					value:
						'Spend 1 SP on a Weapon Attack to add: Acid (1 Corrosion, Agility Save for Hindered), Fire (1 Fire, Might Save for Burning), Piercing (1 Piercing, Might Save for Bleeding), Snare (1 Bludgeoning, Agility Save for Immobilized), or Toxin (1 Poison, Might Save for Impaired). +1 damage per additional SP.'
				}
			]
		},
		{
			id: 'hunter_level_5_placeholder',
			featureName: 'Apex Predator (Placeholder)',
			levelGained: 5,
			isFlavor: true,
			description: 'Placeholder feature for Level 5. See CH6 for final design.'
		},
		{
			id: 'hunter_level_8_capstone_placeholder',
			featureName: 'Perfect Hunt (Placeholder)',
			levelGained: 8,
			isFlavor: true,
			description: 'Placeholder capstone for Level 8. See CH6 for final design.'
		}
		// Note: Level 2 Talent is granted via progression table, not hardcoded here
	],
	subclasses: [
		{
			subclassName: 'Monster Slayer',
			description:
				'You hunt down your targets with the aid of Concoctions you have learned to create by hunting monsters.',
			features: [
				{
					id: 'monster_slayer_concoctions',
					featureName: 'Monstrous Concoctions',
					levelGained: 3,
					description: 'You learn to create potent concoctions from monster parts.',
					choices: [
						{
							id: 'monster_slayer_concoctions_0',
							prompt: 'Choose 3 Concoction Recipes',
							count: 3,
							options: [
								{
									name: 'Elemental Infusion',
									description:
										'Choose an Elemental damage type. Attacks against your Marked target deal +1 damage of that type. You gain Resistance (1) to that type.',
									effects: [
										{
											type: 'GRANT_CHOICE',
											target: 'elemental_infusion_type',
											value: 1,
											userChoice: {
												prompt: 'Choose an elemental damage type',
												options: ['Fire', 'Cold', 'Lightning', 'Poison', 'Corrosion']
											}
										}
									]
								},
								{
									name: "Hydra's Blood",
									description:
										'When you Heavy Hit your Marked target, you regain 1 HP. You have Poisoned Resistance and attackers take 1 Poison damage.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'hydras_blood',
											value:
												'Regain 1 HP on Heavy Hits vs Marked target. Gain Poisoned Resistance. Melee attackers take 1 Poison damage.'
										}
									]
								},
								{
									name: 'Basilisk Eye',
									description:
										'You gain Tremorsense 20 Spaces for your Marked target. You gain Physical Resistance (1).',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'basilisk_eye',
											value: 'Gain Tremorsense 20 for Marked target. Gain Physical Resistance (1).'
										}
									]
								},
								{
									name: 'Ooze Gel',
									description:
										"When you Heavy Hit your Marked Target, it's Hindered. You can climb difficult surfaces and squeeze through small gaps.",
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'ooze_gel',
											value:
												'Heavy Hits vs Marked target cause Hindered. Gain amorphous body properties.'
										}
									]
								},
								{
									name: 'Aberrant Tumor',
									description:
										'While within 20 Spaces of your Marked target, you have ADV on Analyze Creature checks and Mental Saves. You gain Psychic Resistance (1).',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'aberrant_tumor',
											value:
												'ADV on Analyze Creature and Mental Saves vs Marked target. Gain Psychic Resistance (1).'
										}
									]
								},
								{
									name: 'Deathweed',
									description:
										'Heavy Hits against a Marked target bypass Physical Resistances and prevent HP regain. You gain Umbral Resistance (Half), immunity to Doomed, and ADV on Death Saves.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'deathweed',
											value:
												'Heavy Hits vs Marked target bypass Physical Resistances and stop healing. Gain death-related resistances.'
										}
									]
								},
								{
									name: 'Plant Fibers',
									description:
										"If your Marked Target fails a Save you force, they can't move. You become Immune to Bleeding and gain 1 Temp HP at the end of each turn.",
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'plant_fibers',
											value:
												"Failed saves vs you stop Marked target's movement. Gain Bleeding immunity and 1 Temp HP per turn."
										}
									]
								},
								{
									name: 'Divine Water',
									description:
										'Heavy Hits against your Marked target also make it Exposed. You gain Radiant Resistance (Half) and radiate Bright Light in a 5 Space Radius.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'divine_water',
											value:
												'Heavy Hits vs Marked target cause Exposed. Gain Radiant Resistance (Half) and emit light.'
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'monster_hunter',
					featureName: 'Monster Hunter',
					levelGained: 3,
					description:
						'If you have 3 entries of creatures with the same Creature Type in your Bestiary, you can add the entire Creature Type as an entry.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'monster_hunter',
							value:
								'After recording 3 creatures of the same type, gain a Bestiary entry for the entire type.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Trapper',
			description: 'You are able to use a variety of supplies to craft traps.',
			features: [
				{
					id: 'dynamic_traps',
					featureName: 'Dynamic Traps',
					levelGained: 3,
					description:
						"You can create, set, and trigger a number of traps equal to your Prime Modifier. Setting a trap allows you to add the damage and effect of one of your Hunter's Strike options to it.",
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'dynamic_traps',
							value:
								"Create and Set traps (max = Prime Modifier). Can spend 1 SP to add a Hunter's Strike effect to a trap upon setting it."
						}
					]
				},
				{
					id: 'discerning_eye',
					featureName: 'Discerning Eye',
					levelGained: 3,
					description:
						'You have ADV on Awareness Checks to discover Hidden Traps and on Investigation Checks to discern how to disarm them.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'discerning_eye',
							value: 'Gain ADV on checks to find and disarm traps.'
						}
					]
				}
			]
		}
	]
};
