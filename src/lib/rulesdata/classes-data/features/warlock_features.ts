import type { ClassDefinition } from '../../schemas/character.schema';

export const warlockClass: ClassDefinition = {
	className: 'Warlock',
	classCategory: 'spellcaster',
	startingEquipment: {
		spellFocuses:
			'2 Spell Focuses. You can choose Weapons if you choose the Pact Weapon option of the Pact Boon Feature.',
		armor:
			'1 set of Light Armor. You can choose 1 set of Heavy Armor instead if you choose the Pact Armor option of the Pact Boon Feature.',
		tradeTools:
			"Choose 2 of any of the following items: Alchemist's Supplies, Disguise Kit, Jeweler's Tools, or Sculptor's Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	spellcasterPath: {
		spellList: {
			type: 'all_schools',
			schoolCount: 3,
			description:
				'Choose 3 Spell Schools. When you learn a new Spell, you can choose any Spell from the chosen Spell Schools.'
		},
		cantrips: {
			description: 'Cantrips Known column of the Warlock Class Table'
		},
		spells: {
			description: 'Spells Known column of the Warlock Class Table'
		},
		manaPoints: {
			maximumIncreasesBy: 'Mana Points column of the Warlock Class Table'
		}
	},
	coreFeatures: [
		{
			id: 'warlock_spellcasting_path',
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description:
				'You gain the ability to cast spells. Choose 3 Spell Schools; when you learn a new Spell, you can choose any Spell from those Schools. You gain Combat Training with Spell Focuses and Light Armor.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Spell_Focuses', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true }
			]
		},
		{
			id: 'warlock_beseech_patron',
			featureName: 'Beseech Patron',
			levelGained: 1,
			isFlavor: true,
			description:
				'You can beseech your Patron for aid when you are in need. Your Patron may or may not answer, and may demand something in return. The nature of this interaction is determined by your relationship with your Patron and is at the discretion of the GM.'
		},
		{
			id: 'warlock_contract',
			featureName: 'Warlock Contract',
			levelGained: 1,
			description:
				'You have a binding agreement with your patron that allows you to make sacrifices in exchange for boons.',
			benefits: [
				{
					name: 'Hasty Bargain',
					description:
						'Once per turn when you make a Check, you can spend 1 HP to gain ADV on the Check.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'hasty_bargain',
							value: 'Once per turn: spend 1 HP to gain ADV on a Check.'
						}
					]
				},
				{
					name: 'Desperate Bargain',
					description:
						'Once per Combat, you can spend 1 AP to regain an amount of HP equal to your Prime Modifier. When you do, you become Exposed until the end of your next turn.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'desperate_bargain',
							value:
								'Once per Combat: spend 1 AP to regain HP equal to your Prime Modifier, but become Exposed.'
						}
					]
				}
			]
		},
		{
			id: 'warlock_pact_boon',
			featureName: 'Pact Boon',
			levelGained: 1,
			description:
				'You gain a Pact Boon from your Patron. Choose 1 of the following options: Weapon, Armor, Cantrip, or Familiar.',
			choices: [
				{
					id: 'warlock_pact_boon_0',
					prompt: 'Choose your Pact Boon',
					count: 1,
					options: [
						{
							name: 'Pact Weapon',
							description:
								'You can bond with a weapon, granting it magical properties and allowing you to summon it at will.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'pact_weapon_mastery',
									value: 'Considered to have Training with your Pact Weapon.'
								},
								{ type: 'GRANT_CHOICE', target: 'maneuver_save', value: 2 },
								{
									type: 'GRANT_ABILITY',
									target: 'pact_weapon_style',
									value: "Benefit from your Pact Weapon's Style Passive."
								},
								{
									type: 'GRANT_ABILITY',
									target: 'pact_weapon_summon',
									value: 'Dismiss to and summon from a pocket dimension as a Minor Action.'
								}
							]
						},
						{
							name: 'Pact Armor',
							description:
								'You can bond with a suit of armor, granting it magical properties and allowing you to summon it onto your body.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'pact_armor_mastery',
									value: 'Considered to have Training with your Pact Armor.'
								},
								{ type: 'GRANT_CHOICE', target: 'maneuver_defensive', value: 3 },
								{ type: 'MODIFY_STAT', target: 'mdr', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'pact_armor_summon',
									value: 'Dismiss to and summon from a pocket dimension as a Minor Action.'
								}
							]
						},
						{
							name: 'Pact Spell',
							description:
								'Choose a Spell you know. The chosen Spell becomes your Pact Spell with special benefits.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'pact_spell',
									value:
										"Death's Toll: +1 damage to Bloodied targets. Range Increase: +1 (if 1 Space) or +5 (if greater). Patron's Favor: Once per Round, ADV on your Pact Spell's Check."
								}
							]
						},
						{
							name: 'Pact Familiar',
							description:
								'You learn the Call Familiar Spell. When you cast it, your Familiar gains 3 additional Familiar Traits of your choice for free.',
							effects: [
								{ type: 'GRANT_SPELL', target: 'Call Familiar', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'pact_familiar_bonus',
									value: 'Your familiar gains 3 additional Familiar Traits for free.'
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'warlock_life_tap',
			featureName: 'Life Tap',
			levelGained: 2,
			description:
				"When you produce an MP Effect, you can spend HP in place of MP. The total amount of HP and MP spent can't exceed your Mana Spend Limit. You can use this Feature once per Long Rest, and regain the ability to use it again when you roll for Initiative.",
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'life_tap',
					value:
						'Once per Long Rest, you can spend HP instead of MP for spell effects (regain on initiative).'
				}
			]
		},
		{
			id: 'warlock_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [
				{
					type: 'GRANT_CHOICE',
					target: 'talent',
					value: 1
				}
			]
		},
		{
			id: 'warlock_level_5_placeholder',
			featureName: 'Expert Warlock',
			levelGained: 5,
			description: 'You gain the following benefits for your Warlock Class Features.',
			benefits: [
				{
					name: 'Warlock Contract',
					description: 'Your maximum HP increases by 2.',
					effects: [{ type: 'MODIFY_STAT', target: 'hpMax', value: 2 }]
				},
				{
					name: 'Pact Boon',
					description:
						'Your Pact Boon improves. Pact Weapon gains an additional 1-point Weapon Property, learns 1 Attack Maneuver, and can spend MP on Martial Enhancements or Maneuvers. Pact Armor gains an additional 1-point Armor Property, learns 1 Defense Maneuver, and can spend MP on Defense Maneuvers. Pact Spell learns 2 Spells from any source, chooses another Pact Spell, and can change either or both after a Long Rest. Pact Familiar gains 3 additional Trait Points and cannot take Negative Traits.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'expert_warlock_pact_boon',
							value:
								'Chosen Pact Boon improves: Weapon/Armor gain a 1-point property and MP conversion, Pact Spell gains 2 any-source Spells and another Pact Spell, or Pact Familiar gains 3 Trait Points and no Negative Traits.'
						}
					]
				},
				{
					name: 'Life Tap',
					description: 'You gain ADV on the Check to produce the effect.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'expert_warlock_life_tap',
							value: 'Life Tap grants ADV on the Check to produce the effect.'
						}
					]
				}
			]
		},
		{
			id: 'warlock_level_8_capstone_placeholder',
			featureName: 'Class Capstone (Source Unpublished)',
			levelGained: 9,
			isFlavor: true,
			description:
				'The v0.10.5 class progression grants a Class Capstone Feature at level 9, but this source packet does not publish class-specific capstone mechanics. This entry is intentionally non-mechanical and preserves the legacy ID for saved-character compatibility.'
		}
	],
	subclasses: [
		{
			subclassName: 'Eldritch',
			description: 'Your patron gifts you with forbidden knowledge and psychic power.',
			features: [
				{
					featureName: 'Otherworldly Gift',
					levelGained: 3, // Assuming subclass features start at level 3
					description:
						'Your patron grants you the following benefits: Psychic Spellcasting, Forbidden Knowledge, and an Eldritch Bargain.',
					benefits: [
						{
							name: 'Psychic Spellcasting',
							description:
								'You learn 1 Spell of your choice with the Psychic Spell Tag. When you learn a new Spell, you can choose any Spell that has the Psychic Spell Tag.',
							effects: [
								{
									type: 'GRANT_SPELL',
									target: 'any_psychic_tag',
									value: 1
								}
							]
						},
						{
							name: 'Forbidden Knowledge',
							description:
								'When you complete a Short or Long Rest, you temporarily learn any Spell of your choice. When you cast that Spell, its MP cost is reduced by 2 (minimum of 0). You forget the Spell immediately after you cast it.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'forbidden_knowledge',
									value: 'Temporarily learn any spell after a rest with a 2 MP cost reduction.'
								}
							]
						},
						{
							name: 'Eldritch Bargain',
							description:
								'When you make an Attack against the PD or AD of a creature, you can spend 1 HP to target its other Defense instead.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'eldritch_bargain',
									value:
										"Spend 1 HP to target a creature's other defense (PD or AD) with an attack."
								}
							]
						}
					]
				},
				{
					featureName: 'Alien Comprehension (Flavor Feature)',
					levelGained: 3,
					isFlavor: true,
					description:
						'You become Fluent in Deep Speech, and you understand the writings and ramblings of lunatics.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'alien_comprehension',
							value: 'Become fluent in Deep Speech and understand mad writings.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Fey',
			description:
				'Your patron is a lord or lady of the fey, granting you beguiling and tricky powers.',
			features: [
				{
					featureName: 'Fey Aspect',
					levelGained: 3,
					description:
						'You gain benefits related to a Fey Aspect of your choice (Charmed or Intimidated).',
					choices: [
						{
							id: 'warlock_fey_aspect_0',
							prompt: 'Choose your Fey Aspect Condition',
							count: 1,
							options: [
								{
									name: 'Charmed',
									description: 'Your Fey Aspect is the Charmed condition.',
									effects: []
								},
								{
									name: 'Intimidated',
									description: 'Your Fey Aspect is the Intimidated condition.',
									effects: []
								}
							]
						}
					],
					benefits: [
						{
							name: "Can't Trick a Trickster",
							description: 'You have ADV on Saves against your Fey Aspect Condition.',
							effects: [
								{
									type: 'GRANT_ADV_ON_SAVE',
									target: 'Fey_Aspect_Condition',
									value: true
								}
							]
						},
						{
							name: 'Fey Step',
							description:
								"When you're Hit by an Attack, you can spend 1 AP as a Reaction to teleport up to 3 Spaces and become Invisible until the start of your next turn. (Once per Long Rest, regain on initiative).",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'fey_step',
									value: 'Reaction teleport when hit, becoming invisible.'
								}
							]
						},
						{
							name: 'Beguiling Bargain',
							description:
								'Once on each of your turns when you cast a Spell or make an Attack, you can spend 1 HP to force a target to make a Charisma Save. Failure: You subject the target to your Fey Aspect Condition until the end of your next turn.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'beguiling_bargain',
									value:
										'Spend 1 HP on spell/attack to force a save against your Fey Aspect Condition.'
								}
							]
						}
					]
				},
				{
					featureName: 'Dream Walker',
					levelGained: 3,
					isFlavor: true,
					description:
						'You can enter and interact with the dreams of sleeping creatures you can see within 5 Spaces. You have ADV on Checks to influence or navigate dreams.'
				}
			]
		}
	]
};
