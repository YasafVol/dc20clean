import type { ClassDefinition } from '../../schemas/character.schema';

export const monkClass: ClassDefinition = {
	className: 'Monk',
	startingEquipment: {
		weaponsOrShields: ['2 Weapons', '3 Weapons with the Toss or Thrown Property'],
		armor: ['1 set of Light Armor'],
		packs: ['X or Y Packs (Adventuring Packs Coming Soon)']
	},
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['Light Armor']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Monk Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Monk Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Monk Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, you can regain up to half your maximum SP when you succeed on an Attack Check, Athletics Check, or Acrobatics Check.'
		}
	},
	coreFeatures: [
		{
			id: 'monk_source_of_power',
			featureName: 'Source of Power',
			levelGained: 1,
			isFlavor: true,
			description:
				'Monks harness their inner Ki through training, mentorship, or deep meditation, perfecting both mind and body.'
		},
		{
			id: 'monk_training',
			featureName: 'Monk Training',
			levelGained: 1,
			description: 'Your martial arts training grants you greater offense, defense, and movement.',
			benefits: [
				{
					name: 'Iron Palm',
					description: 'Your limbs are Natural Weapons with the Impact Property that deal 1 Bludgeoning damage.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'monk_iron_palm',
							value: 'Limbs are Natural Weapons (Impact, 1 Bludgeoning damage).'
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
					description: 'Harness your Ki to enhance speed, mobility, and resilience while unarmored.',
					effects: [
						{
							type: 'MODIFY_STAT',
							target: 'moveSpeed',
							value: 1,
							condition: 'not_wearing_armor'
						},
						{
							type: 'MODIFY_STAT',
							target: 'jumpDistance',
							value: 1,
							condition: 'not_wearing_armor'
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
							value: 'Use your Prime Modifier instead of Agility for jump distance and falling damage calculations.'
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
				'You learn 2 Monk Stances. Start of turn: freely enter or swap stances. Spend 1 SP on your turn to change stance; only one stance active at a time.',
			choices: [
				{
					id: 'initial_stances',
					prompt: 'Choose 2 Monk Stances',
					count: 2,
					options: [
						{
							name: 'Bear Stance',
							description: 'Big Hits - Your attacks deal massive damage with overwhelming force.',
							effects: []
						},
						{
							name: 'Bull Stance',
							description: 'Knockback - Drive enemies backward with powerful strikes.',
							effects: []
						},
						{
							name: 'Cobra Stance',
							description: 'Counter - Strike back at opponents who dare attack you.',
							effects: []
						},
						{
							name: 'Gazelle Stance',
							description: 'Nimble - Move with exceptional grace and speed.',
							effects: []
						},
						{
							name: 'Mantis Stance',
							description: 'Grapple - Seize and control your opponents with superior technique.',
							effects: []
						},
						{
							name: 'Mongoose Stance',
							description: 'Multi - Execute rapid combinations of attacks.',
							effects: []
						},
						{
							name: 'Scorpion Stance',
							description: 'Quick Strike - Attack with blinding speed before opponents can react.',
							effects: []
						},
						{
							name: 'Turtle Stance',
							description: 'Sturdy - Become an immovable fortress of defense.',
							effects: []
						},
						{
							name: 'Wolf Stance',
							description: 'Hit & Run - Strike swiftly and escape before retaliation.',
							effects: []
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
				'During a Short Rest or longer, meditate to temporarily increase the Mastery level of a chosen Charisma or Intelligence skill by 1 (up to its cap). You stay alert while meditating.'
		},
		{
			id: 'monk_spiritual_balance',
			featureName: 'Spiritual Balance',
			levelGained: 2,
			description: 'Harness your inner spirit to balance your physical energy, unlocking Ki Points and Ki Actions.',
			benefits: [
				{
					name: 'Ki Points',
					description: 'You have Ki Points equal to your Stamina Points; spent Ki replenishes when combat ends or instantly outside combat.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'monk_ki_points',
							value:
								'Whenever you spend a Stamina Point on your turn, regain a Ki Point. All Ki Points return when combat ends; outside of combat, Ki spent replenishes immediately.'
						}
					]
				},
				{
					name: 'Ki Actions',
					description: 'Spend 1 Ki to perform Deflect Attack, Slow Fall, or Uncanny Dodge.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'monk_deflect_attack',
							value:
								"When a creature misses you with a Ranged PD attack using a physical projectile, catch it if you have a free hand and redirect it at a creature within 5 spaces (Attack Check vs PD; Hit: deal the projectile's damage)."
						},
						{
							type: 'GRANT_ABILITY',
							target: 'monk_slow_fall',
							value: 'Reduce fall damage you take by an amount equal to your level.'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'monk_uncanny_dodge',
							value: 'When a creature attacks you, spend 1 Ki to impose DisADV on the attack.'
						}
					]
				}
			]
		},
		{
			id: 'monk_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description: 'You gain 1 Talent of your choice. You must meet any prerequisites to select it.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
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
							description: 'Deflect Attack now applies to Ranged Attacks that miss any target within 2 spaces of you.',
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
						'While Unconscious, your astral self remains aware and can converse. During sleep, you may awaken instantly.'
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
					description: 'Gain movement, counterattack opportunities, and enhanced deflection based on your Ki reactions.',
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
							description: 'When you use Uncanny Dodge against a Melee Attack, spend 1 AP to make an Opportunity Attack against the attacker.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_flow_counter',
									value:
										'If Uncanny Dodge is used against a melee attack, spend 1 AP to make an Opportunity Attack against the attacker.'
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
					description: 'You move through spaces as though you were one size smaller.'
				}
			]
		}
	]
};
