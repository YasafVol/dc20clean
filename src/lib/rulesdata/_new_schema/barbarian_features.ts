import type { ClassDefinition } from '../schemas/character.schema';

export const barbarianClass: ClassDefinition = {
	className: 'Barbarian',
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['All_Armor'],
			shields: ['All_Shields']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Barbarian Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Barbarian Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Barbarian Class Table'
		},
		staminaRegen: {
			description: 'Once per round, you can regain up to half your maximum SP when you score a Heavy or Critical Hit against a creature, or when a Heavy or Critical Hit is scored against you.',
		}
	},
	coreFeatures: [
		{
			featureName: 'Martial Path',
			levelGained: 1,
			description: 'You gain combat training and martial prowess.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields', value: true },
				{ type: 'GRANT_MANEUVERS', target: 'all_attack', value: true }
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
					effects: [{ type: 'GRANT_MANEUVERS', target: 'all_attack', value: true }]
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
			featureName: 'Rage',
			levelGained: 1,
			description: 'During Combat, you can spend 1 AP and 1 SP to enter a Rage for 1 minute.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'rage',
					value:
						'Spend 1 AP and 1 SP to Rage for 1 minute: +1 melee damage, ADV on Might Saves, -5 PD, Resistance (Half) to Elemental and Physical damage.'
				}
			]
		},
		{
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
					description: 'You gain +1 Speed while not wearing Armor.',
					effects: [
						{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1, condition: 'not_wearing_armor' }
					]
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
			featureName: 'Battlecry',
			levelGained: 2,
			description: 'You can spend 1 AP and 1 SP to release a shout of your choice.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'battlecry',
					value:
						'Spend 1 AP and 1 SP to release a shout affecting allies within 10 Spaces until start of your next turn.'
				}
			],
			choices: [
				{
					id: 'barbarian_battlecry_choice',
					prompt: 'Choose a shout to learn.',
					count: 3, // Learn all three shout options
					options: [
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
			subclassName: 'Elemental Fury',
			description: 'Harness the power of the elements in your rage.',
			features: [
				{
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
					featureName: 'Ancestral Guardian',
					levelGained: 3,
					description: 'Bestowed Protection and Spiritual Aura while Raging.',
					effects: [
						{ type: 'GRANT_CHOICE', target: 'guardian_maneuver', value: 1 },
						{ type: 'GRANT_RESISTANCE', target: 'Mystical', value: 1, condition: 'raging' },
						{
							type: 'GRANT_ABILITY',
							target: 'spiritual_aura',
							value:
								'While Raging: 5 Space Aura allows Shove on any creature, use Parry/Protect/Raise Shield on any creature in Aura.'
						}
					],
					choices: [
						{
							id: 'barbarian_guardian_maneuver',
							prompt: 'Learn 1 of the following Maneuvers (or any Maneuver if you know all 3).',
							count: 1,
							options: [
								{
									name: 'Parry',
									description: 'Learn the Parry maneuver.',
									effects: [{ type: 'GRANT_CHOICE', target: 'maneuver', value: 'Parry' }]
								},
								{
									name: 'Protect',
									description: 'Learn the Protect maneuver.',
									effects: [{ type: 'GRANT_CHOICE', target: 'maneuver', value: 'Protect' }]
								},
								{
									name: 'Raise Shield',
									description: 'Learn the Raise Shield maneuver.',
									effects: [{ type: 'GRANT_CHOICE', target: 'maneuver', value: 'Raise Shield' }]
								}
							]
						}
					]
				},
				{
					featureName: 'Ancestral Knowledge',
					levelGained: 3,
					description:
						'You have ADV on Checks to recall information about the history of your Ancestries.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'ancestral_knowledge',
							value:
								"ADV on Checks about your Ancestries' history. Once per Long Rest: ADV on a Trade or Language Check."
						}
					]
				}
			]
		}
	]
};
