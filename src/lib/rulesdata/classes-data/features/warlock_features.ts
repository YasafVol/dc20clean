import type { ClassDefinition } from '../../schemas/character.schema';

export const warlockClass: ClassDefinition = {
	className: 'Warlock',
	spellcasterPath: {
		
		spellList: {
			type: 'all_schools',
			schoolCount: 4,
			description: 'You choose 4 Spell Schools. When you learn a new Spell, you can choose any Spell from the chosen Spell Schools.'
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
			featureName: 'Warlock Contract',
			levelGained: 1,
			description: 'You have a binding agreement with your patron that allows you to make sacrifices in exchange for boons.',
			benefits: [
				{
					name: 'Hasty Bargain',
					description: 'Once per turn when you make a Check, you can spend 1 HP to gain ADV on the Check.',
					effects: [{
						type: 'GRANT_ABILITY',
						target: 'hasty_bargain',
						value: 'Once per turn: spend 1 HP to gain ADV on a Check.'
					}]
				},
				{
					name: 'Desperate Bargain',
					description: 'Once per Combat, you can spend 1 AP to regain an amount of HP equal to your Prime Modifier. When you do, you become Exposed until the end of your next turn.',
					effects: [{
						type: 'GRANT_ABILITY',
						target: 'desperate_bargain',
						value: 'Once per Combat: spend 1 AP to regain HP equal to your Prime Modifier, but become Exposed.'
					}]
				}
			]
		},
		{
			featureName: 'Pact Boon',
			levelGained: 1,
			description: 'You gain a Pact Boon from your Patron. Choose 1 of the following options: Weapon, Armor, Cantrip, or Familiar.',
			choices: [{
				id: 'warlock_pact_boon_0',
				prompt: 'Choose your Pact Boon',
				count: 1,
				options: [{
					name: 'Pact Weapon',
					description: 'You can bond with a weapon, granting it magical properties and allowing you to summon it at will.',
					effects: [
						{ type: 'GRANT_ABILITY', target: 'pact_weapon_mastery', value: 'Considered to have Training with your Pact Weapon.' },
						{ type: 'GRANT_CHOICE', target: 'maneuver_save', value: 2 },
						{ type: 'GRANT_ABILITY', target: 'pact_weapon_style', value: 'Benefit from your Pact Weapon\'s Style Passive.' },
						{ type: 'GRANT_ABILITY', target: 'pact_weapon_summon', value: 'Dismiss to and summon from a pocket dimension as a Minor Action.' }
					]
				}, {
					name: 'Pact Armor',
					description: 'You can bond with a suit of armor, granting it magical properties and allowing you to summon it onto your body.',
					effects: [
						{ type: 'GRANT_ABILITY', target: 'pact_armor_mastery', value: 'Considered to have Training with your Pact Armor.' },
						{ type: 'GRANT_CHOICE', target: 'maneuver_defensive', value: 3 },
						{ type: 'MODIFY_STAT', target: 'mdr', value: 1 },
						{ type: 'GRANT_ABILITY', target: 'pact_armor_summon', value: 'Dismiss to and summon from a pocket dimension as a Minor Action.' }
					]
				}, {
					name: 'Pact Cantrip',
					description: 'Choose a Spell you know with the Cantrip Spell Tag. It becomes your Pact Cantrip, gaining special benefits.',
					effects: [{
						type: 'GRANT_ABILITY',
						target: 'pact_cantrip',
						value: 'Chosen cantrip deals +1 damage to Bloodied targets, its range increases, and you can grant yourself ADV on its Spell Check once per round.'
					}]
				}, {
					name: 'Pact Familiar',
					description: 'You learn the Find Familiar Spell. When you cast it, your Familiar gains 3 additional Familiar Traits of your choice for free.',
					effects: [
						{ type: 'GRANT_SPELL', target: 'Find Familiar', value: 1 },
						{ type: 'GRANT_ABILITY', target: 'pact_familiar_bonus', value: 'Your familiar gains 3 additional Familiar Traits for free.' }
					]
				}, ]
			}]
		},
		{
			featureName: 'Life Tap',
			levelGained: 2,
			description: 'When you produce an MP Effect, you can spend HP in place of MP. The total amount of HP and MP spent can\'t exceed your Mana Spend Limit. You can use this Feature once per Long Rest, and regain the ability to use it again when you roll for Initiative.',
			effects: [{
				type: 'GRANT_ABILITY',
				target: 'life_tap',
				value: 'Once per Long Rest, you can spend HP instead of MP for spell effects (regain on initiative).'
			}]
		},
		{
			featureName: 'Talent',
			levelGained: 2,
			description: 'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [{
				type: 'GRANT_CHOICE',
				target: 'talent',
				value: 1
			}]
		}
	],
	subclasses: [{
		subclassName: 'Eldritch',
		description: 'Your patron gifts you with forbidden knowledge and psychic power.',
		features: [{
			featureName: 'Otherworldly Gift',
			levelGained: 3, // Assuming subclass features start at level 3
			description: 'Your patron grants you the following benefits: Psychic Spellcasting, Forbidden Knowledge, and an Eldritch Bargain.',
			benefits: [{
				name: 'Psychic Spellcasting',
				description: 'You learn 1 Spell of your choice with the Psychic Spell Tag. When you learn a new Spell, you can choose any Spell that has the Psychic Spell Tag.',
				effects: [{
					type: 'GRANT_SPELL',
					target: 'any_psychic_tag',
					value: 1
				}]
			}, {
				name: 'Forbidden Knowledge',
				description: 'When you complete a Short or Long Rest, you temporarily learn any Spell of your choice. When you cast that Spell, its MP cost is reduced by 1 (minimum of 0). You forget the Spell immediately after you cast it.',
				effects: [{
					type: 'GRANT_ABILITY',
					target: 'forbidden_knowledge',
					value: 'Temporarily learn any spell after a rest with a 1 MP cost reduction.'
				}]
			}, {
				name: 'Eldritch Bargain',
				description: 'When you make an Attack against the PD or AD of a creature, you can spend 1 HP to target its other Defense instead.',
				effects: [{
					type: 'GRANT_ABILITY',
					target: 'eldritch_bargain',
					value: 'Spend 1 HP to target a creature\'s other defense (PD or AD) with an attack.'
				}]
			}]
		}, {
			featureName: 'Alien Comprehension (Flavor Feature)',
			levelGained: 3,
			isFlavor: true,
			description: 'You become Fluent in Deep Speech, and you understand the writings and ramblings of lunatics.',
			effects: [{
				type: 'GRANT_ABILITY',
				target: 'alien_comprehension',
				value: 'Become fluent in Deep Speech and understand mad writings.'
			}]
		}]
	}, {
		subclassName: 'Fey',
		description: 'Your patron is a lord or lady of the fey, granting you beguiling and tricky powers.',
		features: [{
			featureName: 'Fey Aspect',
			levelGained: 3,
			description: 'You gain benefits related to a Fey Aspect of your choice (Charmed or Intimidated).',
			choices: [{
				id: 'warlock_fey_aspect_0',
				prompt: 'Choose your Fey Aspect Condition',
				count: 1,
				options: [{
					name: 'Charmed',
					description: 'Your Fey Aspect is the Charmed condition.',
					effects: []
				}, {
					name: 'Intimidated',
					description: 'Your Fey Aspect is the Intimidated condition.',
					effects: []
				}]
			}],
			benefits: [{
				name: 'Can\'t Trick a Trickster',
				description: 'You have ADV on Saves against your Fey Aspect Condition.',
				effects: [{
					type: 'GRANT_ADV_ON_SAVE',
					target: 'Fey_Aspect_Condition',
					value: true
				}]
			}, {
				name: 'Fey Step',
				description: 'When you\'re Hit by an Attack, you can spend 1 AP as a Reaction to teleport up to 3 Spaces and become Invisible until the start of your next turn. (Once per Long Rest, regain on initiative).',
				effects: [{
					type: 'GRANT_ABILITY',
					target: 'fey_step',
					value: 'Reaction teleport when hit, becoming invisible.'
				}]
			}, {
				name: 'Beguiling Bargain',
				description: 'Once on each of your turns when you cast a Spell or make an Attack, you can spend 1 HP to force a target to make a Charisma Save. Failure: You subject the target to your Fey Aspect Condition until the end of your next turn.',
				effects: [{
					type: 'GRANT_ABILITY',
					target: 'beguiling_bargain',
					value: 'Spend 1 HP on spell/attack to force a save against your Fey Aspect Condition.'
				}]
			}]
		}]
	}]
};