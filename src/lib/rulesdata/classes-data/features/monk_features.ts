import type { ClassDefinition } from '../../schemas/character.schema';

export const monkClass: ClassDefinition = {
	className: 'Monk',
	classCategory: 'martial',
	startingEquipment: {
		arsenal: '2 Weapons.',
		armor: '1 set of Light Armor.',
		tradeTools:
			"Choose 2 of any of the following items: Brewer's Supplies, Calligrapher's Supplies, Cooking Utensils, or Weaver's Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['Light_Armor']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Monk Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Monk Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, you can regain up to half your maximum SP when you succeed on an Athletics Check, Acrobatics Check, or Hit on a Martial Attack.'
		}
	},
	coreFeatures: [
		{
			id: 'monk_martial_path',
			featureName: 'Martial Path',
			levelGained: 1,
			description: 'You gain Combat Training with Weapons and Light Armor.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true }
			]
		},
		{
			id: 'monk_source_of_power',
			featureName: 'Source of Power',
			levelGained: 1,
			isFlavor: true,
			description:
				'Monks harness their inner Ki through training, mentorship, or deep meditation, perfecting both mind and body.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'monk_source_of_power',
					value:
						'Monks harness inner Ki through training, mentorship, or deep meditation, perfecting both mind and body.'
				}
			]
		},
		{
			id: 'monk_training',
			featureName: 'Monk Training',
			levelGained: 1,
			description: 'Your martial arts training grants you greater offense, defense, and movement.',
			benefits: [
				{
					name: 'Iron Palm',
					description:
						'Choose a Melee Weapon Style. Your limbs are Natural Weapons that deal 2 Bludgeoning damage and can perform the Weapon Enhancement of the chosen Weapon Style.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'monk_iron_palm',
							value:
								'Limbs are Natural Weapons (2 Bludgeoning damage, chosen Weapon Style Enhancement).'
						}
					]
				},
				{
					name: 'Patient Defense',
					description: 'While not wearing Armor, you gain +2 PD.',
					effects: [
						{
							type: 'MODIFY_STAT',
							target: 'pd',
							value: 2,
							condition: 'not_wearing_armor'
						}
					]
				},
				{
					name: 'Step of the Wind',
					description:
						'You gain +1 Speed and Jump Distance. You can move along vertical surfaces and across liquids without falling during your move. Use Prime Modifier instead of Agility for Jump Distance and Falling damage.',
					effects: [
						{
							type: 'MODIFY_STAT',
							target: 'moveSpeed',
							value: 1
						},
						{
							type: 'MODIFY_STAT',
							target: 'jumpDistance',
							value: 1
						},
						{
							type: 'GRANT_ABILITY',
							target: 'monk_step_of_the_wind_mobility',
							value:
								'Move along vertical surfaces or across liquids up to your Speed without falling during the movement.'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'monk_step_of_the_wind_prime_modifier',
							value:
								'Use your Prime Modifier instead of Agility for Jump Distance and Falling damage.'
						}
					]
				}
			]
		},
		{
			id: 'monk_stance',
			featureName: 'Monk Stance',
			levelGained: 1,
			description:
				'You learn 2 Monk Stances. Start of turn: freely enter or swap stances. Spend 1 AP or 1 SP on your turn to change stance; only one stance active at a time.',
			choices: [
				{
					id: 'initial_stances',
					prompt: 'Choose 2 Monk Stances',
					count: 2,
					options: [
						{
							name: 'Bear Stance',
							description:
								'You deal +1 damage on Heavy Hits or higher and Critical Hits on Martial Attacks made using Unarmed Strikes or Melee Weapons. When you Miss using a Melee Martial Attack, you gain ADV on the next Melee Martial Attack you make before the end of your turn, once on each of your turns.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_stance_bear',
									value:
										'Active stance: +1 damage on Heavy Hits or higher and Critical Hits with Unarmed Strikes or Melee Weapons; once per turn, after missing a Melee Martial Attack, gain ADV on the next Melee Martial Attack before end of turn.'
								}
							]
						},
						{
							name: 'Bull Stance',
							description:
								'When you Succeed on a Physical Check to push a target, it also takes 1 Bludgeoning damage. When you push a target, it is pushed 1 additional Space, and you can move in a straight line with the target without provoking Opportunity Attacks or spending movement.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_stance_bull',
									value:
										'Active stance: Successful Physical Checks to push also deal 1 Bludgeoning damage; pushed targets move 1 additional Space, and you can move in a straight line with the target without Opportunity Attacks or spending movement.'
								}
							]
						},
						{
							name: 'Cobra Stance',
							description:
								'You deal +1 damage on Martial Attacks made using Unarmed Strikes or Melee Weapons against creatures that have damaged you since the start of your last turn. When a creature within your Melee Range misses you with a Melee Attack, you can spend 1 AP as a Reaction to make a Melee Martial Attack against it.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_stance_cobra',
									value:
										'Active stance: +1 damage with Unarmed Strike or Melee Weapon Martial Attacks against creatures that damaged you since the start of your last turn; when a creature in Melee Range misses you with a Melee Attack, spend 1 AP as a Reaction to make a Melee Martial Attack against it.'
								}
							]
						},
						{
							name: 'Gazelle Stance',
							description:
								'Your Speed and Jump Distance increase by 1. You ignore Difficult Terrain. You gain ADV on Acrobatics Checks and Agility Saves.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_stance_gazelle',
									value:
										'Active stance: Speed and Jump Distance +1, ignore Difficult Terrain, and gain ADV on Acrobatics Checks and Agility Saves.'
								}
							]
						},
						{
							name: 'Mantis Stance',
							description:
								'You have ADV on Checks and Saves made to initiate, maintain, or escape Grapples. When you start your turn with at least 1 creature Grappled, you gain +1 AP to use on a Grapple Maneuver against a creature you have Grappled.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_stance_mantis',
									value:
										'Active stance: ADV on Checks and Saves to initiate, maintain, or escape Grapples; when you start your turn with at least 1 creature Grappled, gain +1 AP for a Grapple Maneuver against a creature you have Grappled.'
								}
							]
						},
						{
							name: 'Mongoose Stance',
							description:
								'Your Melee Martial Attacks deal +1 damage while you are Flanked. When you make a Melee Martial Attack, choose a second target within your Melee Range and make a single Attack Check against both targets.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_stance_mongoose',
									value:
										'Active stance: Melee Martial Attacks deal +1 damage while Flanked; when making a Melee Martial Attack, choose a second target within Melee Range and make one Attack Check against both targets.'
								}
							]
						},
						{
							name: 'Scorpion Stance',
							description:
								'Creatures provoke Opportunity Attacks from you when they enter your Melee Range. When you make a Melee Martial Attack, you can spend 1 AP to deal +1 damage and force a Physical Save against your Save DC. Failure: the target is Impaired on the next Physical Check before the end of your next turn.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_stance_scorpion',
									value:
										'Active stance: Creatures provoke Opportunity Attacks when entering your Melee Range. On Melee Martial Attack, spend 1 AP for +1 damage and a Physical Save; failure Impairs the target on its next Physical Check before end of your next turn.'
								}
							]
						},
						{
							name: 'Turtle Stance',
							description:
								'Your Speed becomes 1 unless it is already lower. You gain PDR, EDR, and MDR. You have ADV on Might Saves and Saves against being moved or knocked Prone.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_stance_turtle',
									value:
										'Active stance: Speed becomes 1 unless already lower; gain PDR, EDR, and MDR; gain ADV on Might Saves and Saves against being moved or knocked Prone.'
								}
							]
						},
						{
							name: 'Wolf Stance',
							description:
								'After you make an Attack with an Unarmed Strike or a Melee Weapon, you can immediately move up to 1 Space without spending movement. You have ADV on Opportunity Attacks, and creatures have DisADV on Opportunity Attacks made against you.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_stance_wolf',
									value:
										'Active stance: After attacking with an Unarmed Strike or Melee Weapon, immediately move up to 1 Space without spending movement; gain ADV on Opportunity Attacks, and creatures have DisADV on Opportunity Attacks against you.'
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'monk_meditation',
			featureName: 'Meditation',
			levelGained: 1,
			isFlavor: true,
			description:
				'During a Short Rest or longer, meditate to temporarily increase the Mastery level of a chosen Charisma or Intelligence skill by 1 (up to its cap). You stay alert while meditating.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'monk_meditation',
					value:
						'During a Short Rest or longer, temporarily increase the Mastery level of a chosen Charisma or Intelligence skill by 1 up to its cap. You stay alert while meditating.'
				}
			]
		},
		{
			id: 'monk_spiritual_balance',
			featureName: 'Spiritual Balance',
			levelGained: 2,
			description:
				'Harness your inner spirit to balance your physical energy, unlocking Ki Points and Ki Actions.',
			benefits: [
				{
					name: 'Ki Points',
					description:
						'You have Ki Points equal to your Stamina Points. When you spend a Stamina Point on your turn, you regain a Ki Point. You regain all spent Ki Points when Combat ends.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'monk_ki_points',
							value:
								'Ki maximum equals Stamina Points. When you spend a Stamina Point on your turn, regain 1 Ki Point. Regain all spent Ki Points when Combat ends.'
						}
					]
				},
				{
					name: 'Ki Actions',
					description: 'Spend Ki Points to perform Deflect Attack, Slow Fall, or Uncanny Dodge.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'monk_deflect_attack',
							value:
								'When a creature misses you with a Ranged Martial Attack targeting PD, spend 1+ Ki. Redirect at a creature within 5 Spaces (Attack Check vs PD). Hit: deal Ki spent as damage (same type as triggering Attack).'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'monk_slow_fall',
							value: 'Spend 1+ Ki when taking fall damage. Reduce damage by Ki spent.'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'monk_uncanny_dodge',
							value:
								'When a creature makes an Attack against you, spend 1 Ki Point to impose DisADV on the attack.'
						}
					]
				}
			]
		},
		{
			id: 'monk_level_5_placeholder',
			featureName: 'Expert Monk',
			levelGained: 5,
			description: 'You gain the following benefits for your Monk Class Features.',
			benefits: [
				{
					name: 'Monk Training',
					description:
						'Iron Palm lets you choose an additional Melee Weapon Style, and your Unarmed Strike can use both Weapon Enhancements. Step of the Wind grants an additional +1 Speed and +1 Jump Distance.',
					effects: [
						{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1 },
						{ type: 'MODIFY_STAT', target: 'jumpDistance', value: 1 },
						{
							type: 'GRANT_ABILITY',
							target: 'expert_monk_training',
							value:
								'Iron Palm gains an additional Melee Weapon Style and Unarmed Strike can use both Weapon Enhancements.'
						}
					]
				},
				{
					name: 'Monk Stances',
					description: 'You learn 1 additional Monk Stance.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'expert_monk_stances',
							value: 'Choose 1 additional Monk Stance.'
						}
					]
				},
				{
					name: 'Spiritual Balance',
					description:
						'Your Ki Point maximum increases by 1. Whenever you regain Ki, you regain half your maximum Ki.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'expert_monk_spiritual_balance',
							value: 'Ki Point maximum +1; whenever you regain Ki, regain half your maximum Ki.'
						}
					]
				}
			]
		}
	],
	subclasses: [
		{
			subclassName: 'Astral Self',
			description:
				'Manifest astral limbs and awareness, channeling mystical power through your spirit.',
			features: [
				{
					id: 'monk_astral_awakening',
					featureName: 'Astral Awakening',
					levelGained: 3,
					description:
						'Spend 1 AP and 1 SP to manifest a portion of your astral self for 1 minute, gaining astral arms and enhanced deflection.',
					benefits: [
						{
							name: 'Astral Arms',
							description:
								'Your astral arms make Unarmed Strikes with Reach, deal Astral Damage, and may target PD or AD (choose each attack).',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_astral_arms',
									value:
										'Astral arms usable only for Unarmed Strikes with Reach; deal Astral damage and can target PD or AD (choose per attack).'
								}
							]
						},
						{
							name: 'Astral Deflection',
							description:
								'Deflect Attack now applies to Ranged Attacks that miss any target within 2 spaces of you.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_astral_deflection',
									value:
										'When Deflecting, you can redirect projectiles that missed any target within 2 spaces of you.'
								}
							]
						}
					]
				},
				{
					id: 'monk_astral_watch',
					featureName: 'Astral Watch',
					levelGained: 3,
					isFlavor: true,
					description:
						'While Unconscious, your astral self remains aware and can converse. During sleep, you may awaken instantly.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'monk_astral_watch',
							value:
								'While Unconscious, your astral self remains aware and can converse. During sleep, you may awaken instantly.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Shifting Tide',
			description: 'Flow through combat with fluid stances and counterattacks inspired by water.',
			features: [
				{
					id: 'monk_ebb_and_flow',
					featureName: 'Ebb and Flow',
					levelGained: 3,
					description:
						'Gain movement, counterattack opportunities, and enhanced deflection based on your Ki reactions.',
					benefits: [
						{
							name: 'Ebb',
							description: 'When you enter a new Monk Stance, gain 2 spaces of movement.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_ebb_movement',
									value: 'Gain 2 spaces of movement when you enter a new Monk Stance.'
								}
							]
						},
						{
							name: 'Flow',
							description:
								"When you use Uncanny Dodge against a Melee Attack, you can spend 1 AP to make an Opportunity Attack against the attacker, provided they're within range.",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_flow_counter',
									value:
										"If Uncanny Dodge is used against a melee attack, spend 1 AP to make an Opportunity Attack against the attacker, provided they're within range."
								}
							]
						},
						{
							name: 'Changing Tides',
							description:
								'Use Deflect Attack on Melee Martial Attacks from Large or smaller creatures; redirected attack can target a different creature within 1 space of you.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_changing_tides',
									value:
										'Deflect Attack works on Melee Martial Attacks from Large or smaller creatures; redirect to a different target within 1 space.'
								}
							]
						}
					]
				},
				{
					id: 'monk_fluid_movement',
					featureName: 'Fluid Movement',
					levelGained: 3,
					isFlavor: true,
					description: 'You move through spaces as though you were one size smaller.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'monk_fluid_movement',
							value: 'Move through spaces as though you were one size smaller.'
						}
					]
				}
			]
		}
	]
};
