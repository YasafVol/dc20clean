import type { ClassDefinition } from '../../schemas/character.schema';

export const barbarianClass: ClassDefinition = {
	className: 'Barbarian',
	classCategory: 'martial',
	startingEquipment: {
		weaponsOrShields: ['2 Weapons or Shields'],
		rangedWeapons: ['Ranged Weapon with 20 Ammo', '3 Weapons with Toss or Thrown Property'],
		armor: ['1 set of Light Armor or Heavy Armor'],
		packs: 'Adventuring Pack (Coming Soon)'
	},
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['All_Armor'],
			shields: ['All_Shields']
		},
		maneuvers: {
			additionalKnown: 'Maneuvers Known column of the Barbarian Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Barbarian Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, you can regain up to half your maximum SP when you score a Heavy or Critical Hit against a creature, or when a Heavy or Critical Hit is scored against you.'
		}
	},
	coreFeatures: [
		{
			id: 'barbarian_martial_path',
			featureName: 'Martial Path',
			levelGained: 1,
			description: 'You gain combat training and martial prowess.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields', value: true },
				{ type: 'GRANT_MANEUVERS', target: 'all_attack', value: 4 }
			],
			benefits: [
				{
					name: 'Combat Training',
					description: 'You gain proficiency with Weapons, All Armor, and All Shields.',
					effects: [
						{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
						{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Armor', value: true },
						{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields', value: true }
					]
				},
				{
					name: 'Maneuver Knowledge',
					description:
						'You learn all Attack maneuvers plus additional maneuvers as shown on the Barbarian Class Table.',
					effects: [{ type: 'GRANT_MANEUVERS', target: 'all_attack', value: 4 }]
				},
				{
					name: 'Stamina Regeneration',
					description:
						'Once per round, you can regain up to half your maximum SP when you score a Heavy or Critical Hit against a creature, or when a Heavy or Critical Hit is scored against you.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'stamina_regen',
							value:
								'Once per round, regain up to half maximum SP when you score or take a Heavy/Critical Hit.'
						}
					]
				}
			]
		},
		{
			id: 'barbarian_rage',
			featureName: 'Rage',
			levelGained: 1,
			description:
				'You can spend 1 AP and 1 SP to enter a Rage for 1 minute. For the duration, you are subjected to the following effects:',
			benefits: [
				{
					name: 'Increased Damage',
					description:
						'You deal +1 damage on Martial Attacks made using Unarmed Strikes or Melee Weapons.',
					effects: [
						{
							type: 'MODIFY_STAT',
							target: 'martial_melee_damage',
							value: 1
						}
					]
				},
				{
					name: 'Might Advantage',
					description: 'You have ADV on Might Saves.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'rage_might_advantage',
							value: 'ADV on Might Saves while Raging.'
						}
					]
				},
				{
					name: 'Reduced Defense',
					description: 'Your PD decreases by 5.',
					effects: [
						{
							type: 'MODIFY_STAT',
							target: 'pd',
							value: -5,
							condition: 'raging'
						}
					]
				},
				{
					name: 'Damage Resistance',
					description: 'You gain Resistance (Half) to Elemental and Physical damage.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'rage_resistance',
							value: 'Resistance (Half) to Elemental and Physical damage while Raging.'
						}
					]
				}
			]
		},
		{
			id: 'barbarian_berserker',
			featureName: 'Berserker',
			levelGained: 1,
			description: 'Your primal savagery grants you the following benefits:',
			benefits: [
				{
					name: 'Charge',
					description:
						'When you make a Melee Martial Attack on your turn, you can move up to 2 Spaces immediately before making the Attack.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'charge',
							value: 'Move up to 2 Spaces before making a Melee Martial Attack on your turn.'
						}
					]
				},
				{
					name: 'Berserker Defense',
					description: "While you aren't wearing Armor you gain +2 AD.",
					effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 2, condition: 'not_wearing_armor' }]
				},
				{
					name: 'Fast Movement',
					description: 'You gain +1 Speed.',
					effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1 }]
				},
				{
					name: 'Mighty Leap',
					description:
						'You can use your Might instead of Agility to determine your Jump Distance and the damage you take from Falling.',
					effects: [{ type: 'SET_VALUE', target: 'jumpCalculationAttribute', value: 'might' }]
				}
			]
		},
		{
			id: 'barbarian_shattering_force',
			featureName: 'Shattering Force',
			levelGained: 1,
			description:
				"When you Hit a structure or mundane object with a Melee Attack, it's considered a Critical Hit.",
			isFlavor: true,
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'shattering_force',
					value: 'Melee Attacks against structures and mundane objects are Critical Hits.'
				}
			]
		},
		{
			id: 'barbarian_battlecry',
			featureName: 'Battlecry',
			levelGained: 2,
			description:
				'You can spend 1 AP and 1 SP to release a shout of your choice listed below. Until the start of your next turn, you and creatures of your choice within 5 Spaces that can see or hear you are subjected to the effects of your shout. A creature can only benefit from the same type of shout once at a time.',
			benefits: [
				{
					name: 'Fortitude Shout',
					description:
						'Each creature gains Resistance (1) against the next source of Physical or Elemental damage.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'fortitude_shout',
							value: 'Grant allies Resistance (1) against next Physical or Elemental damage.'
						}
					]
				},
				{
					name: 'Fury Shout',
					description: 'Each creature deals +1 damage on their next Attack against 1 target.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'fury_shout',
							value: 'Grant allies +1 damage on their next Attack.'
						}
					]
				},
				{
					name: 'Urgent Shout',
					description: 'Each creature gains +1 Speed until the start of your next turn.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'urgent_shout',
							value: 'Grant allies +1 Speed until start of your next turn.'
						}
					]
				}
			]
		},
		{
			id: 'barbarian_level_2_talent',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		},
		{
			id: 'barbarian_level_5_placeholder',
			featureName: 'Primal Fury (Placeholder)',
			levelGained: 5,
			isFlavor: true,
			description: 'Placeholder feature for Level 5. See CH6 for final design.'
		},
		{
			id: 'barbarian_level_8_capstone_placeholder',
			featureName: 'Savage Apex (Placeholder)',
			levelGained: 8,
			isFlavor: true,
			description: 'Placeholder capstone for Level 8. See CH6 for final design.'
		}
	],
	subclasses: [
		{
			subclassName: 'Elemental Fury',
			description: 'Harness the power of the elements in your rage.',
			features: [
				{
					id: 'barbarian_elemental_fury_raging_elements',
					featureName: 'Raging Elements',
					levelGained: 3,
					description: 'You can surround yourself with the elements while raging.',
					choices: [
						{
							id: 'barbarian_elemental_rage_damage_type',
							prompt: 'Choose your Elemental Rage damage type.',
							count: 1,
							options: [
								{
									name: 'Cold',
									description: 'Your Elemental Rage damage is Cold.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'elemental_rage_cold',
											value:
												'Elemental Rage damage is Cold. Gain 2 Space Aura while Raging with elemental effects.'
										}
									]
								},
								{
									name: 'Fire',
									description: 'Your Elemental Rage damage is Fire.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'elemental_rage_fire',
											value:
												'Elemental Rage damage is Fire. Gain 2 Space Aura while Raging with elemental effects.'
										}
									]
								},
								{
									name: 'Lightning',
									description: 'Your Elemental Rage damage is Lightning.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'elemental_rage_lightning',
											value:
												'Elemental Rage damage is Lightning. Gain 2 Space Aura while Raging with elemental effects.'
										}
									]
								},
								{
									name: 'Physical',
									description: 'Your Elemental Rage damage is Physical (choose type each Rage).',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'elemental_rage_physical',
											value:
												'Elemental Rage damage is Physical (choose Bludgeoning/Piercing/Slashing each Rage). Gain 2 Space Aura while Raging with elemental effects.'
										}
									]
								}
							]
						},
						{
							id: 'barbarian_aura_type',
							prompt: 'Choose 1 additional benefit for your Aura Type.',
							count: 1,
							options: [
								{
									name: 'Slowing Aura',
									description:
										'Spaces within your Aura count as Difficult Terrain for creatures of your choice.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'slowing_aura',
											value:
												'Aura creates Difficult Terrain for chosen creatures. Failed saves also cause Slowed until end of their next turn.'
										}
									]
								},
								{
									name: 'Splashing Aura',
									description:
										'Once per Turn when you deal Elemental Rage damage to a creature, you can automatically deal 1 Elemental Rage damage to a creature within 1 Space of it.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'splashing_aura',
											value:
												'Once per turn, Elemental Rage damage splashes to a creature within 1 Space for 1 damage.'
										}
									]
								},
								{
									name: 'Stunning Aura',
									description:
										"Once per Turn when a creature within your Aura fails a Save you force it to make, it also can't spend AP on Reactions until the start of its next turn.",
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'stunning_aura',
											value:
												'Once per turn, creatures that fail saves in your Aura cannot spend AP on Reactions until start of their next turn.'
										}
									]
								},
								{
									name: 'Pushing Aura',
									description:
										'When you use your Elemental Blast, creatures affected must make a Physical Save.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'pushing_aura',
											value:
												'Elemental Blast forces Physical Save; failure moves targets 2 Spaces toward or away from you.'
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'barbarian_elemental_fury_elemental_affinity',
					featureName: 'Elemental Affinity',
					levelGained: 3,
					description: 'You are infused with the power of your Element.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'elemental_affinity',
							value:
								'Voice can boom 3x louder, create elemental visual displays, Resistance to environmental Exhaustion.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Spirit Guardian',
			description: 'Call upon ancestral spirits to aid you in battle.',
			features: [
				{
					id: 'barbarian_spirit_guardian_ancestral_guardian',
					featureName: 'Ancestral Guardian',
					levelGained: 3,
					description: 'You gain mystical protection and the ability to channel ancestral spirits.',
					benefits: [
						{
							name: 'Bestowed Protection',
							description:
								'You learn 1 of the following Maneuvers: Brace, Parry, or Protect. If you already know all 3, then you can learn any Maneuver of your choice instead.',
							effects: [{ type: 'GRANT_CHOICE', target: 'guardian_maneuver', value: 1 }]
						},
						{
							name: 'Spiritual Aura',
							description:
								'While Raging, you gain Mystical Resistance (1) and a 5 Space Aura that grants the following benefits:\n\n• You can use the Shove Action on any creature within your Aura. When you do, the creature is pushed horizontally in a direction of your choice.\n\n• You can use the Brace, Parry, or Protect Maneuvers on any creature within your Aura, provided you know the Maneuver.',
							effects: [
								{
									type: 'GRANT_RESISTANCE',
									target: 'Mystical',
									value: 1,
									optional: 'while raging'
								},
								{
									type: 'GRANT_ABILITY',
									target: 'spiritual_aura',
									value:
										'While Raging: 5 Space Aura allows Shove on any creature (pushed in your chosen direction), use Brace/Parry/Protect on any creature in Aura.'
								}
							]
						}
					],
					choices: [
						{
							id: 'barbarian_guardian_maneuver',
							prompt: 'Learn 1 of the following Maneuvers (or any Maneuver if you know all 3).',
							count: 1,
							options: [
								{
									name: 'Brace',
									description: 'Learn the Brace maneuver.',
									effects: [{ type: 'GRANT_MANEUVERS', target: 'Brace', value: 1 }]
								},
								{
									name: 'Parry',
									description: 'Learn the Parry maneuver.',
									effects: [{ type: 'GRANT_MANEUVERS', target: 'Parry', value: 1 }]
								},
								{
									name: 'Protect',
									description: 'Learn the Protect maneuver.',
									effects: [{ type: 'GRANT_MANEUVERS', target: 'Protect', value: 1 }]
								}
							]
						}
					]
				},
				{
					id: 'barbarian_spirit_guardian_ancestral_knowledge',
					featureName: 'Ancestral Knowledge',
					levelGained: 3,
					description:
						'You have ADV on Checks to recall information about the history of your Ancestries (such as Human, Dwarf, or Elf). Additionally, once per Long Rest when you make a Trade or Language Check, you can choose to gain ADV on the Check as a spirit lends you its experience.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'ancestral_knowledge',
							value:
								"ADV on Checks about your Ancestries' history. Once per Long Rest: ADV on a Trade or Language Check as a spirit lends you its experience."
						}
					]
				}
			]
		}
	]
};
