/**
 * Druid Class Definition - New Effect Schema
 * Based on DC20 Druid features with wild form and domain abilities
 */

import type { ClassDefinition } from '../schemas/character.schema';

export const druidClass: ClassDefinition = {
	className: 'Druid',
	startingStats: {
		hp: 8, // From druid_table.json level 1
		sp: 0,
		mp: 6,
		skillPoints: 4,
		tradePoints: 3,
		languagePoints: 2,
		maneuversKnown: 0,
		techniquesKnown: 0,
		cantripsKnown: 2,
		spellsKnown: 3
	},
	coreFeatures: [
		{
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description: 'You gain the ability to cast primal spells.',
			effects: [{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true }]
		},
		{
			featureName: 'Druid Domain',
			levelGained: 1,
			description:
				'You can spend 1 AP and 1 MP to create your own Druid Domain that includes small plant life, sand, shallow water, or other naturally occurring features.',
			benefits: [
				{
					name: 'Domain Creation',
					description:
						'Create up to 8 Domain Spaces of difficult terrain that you can cast spells from.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'druid_domain',
							value: 'Create 8 Domain Spaces (1 AP + 1 MP). Cast spells from any Domain Space.'
						}
					]
				},
				{
					name: "Nature's Grasp",
					description: 'Bind creatures within your Domain, preventing movement.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'natures_grasp',
							value:
								'Spend 1 AP to bind creature in Domain (Spell Check vs Repeated Physical Save).'
						}
					]
				},
				{
					name: 'Move Creature',
					description: 'Move bound creatures within your Domain.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'move_creature',
							value: 'Spend 1 AP to move bound creature up to 2 Spaces within Domain.'
						}
					]
				},
				{
					name: 'Move Object',
					description: 'Interact with objects anywhere in your Domain.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'move_object',
							value: 'Use Object Action from any Domain Space, move objects up to 5 Spaces.'
						}
					]
				},
				{
					name: 'Wild Growth',
					description: 'Heal targets within your Domain with ongoing regeneration.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'wild_growth',
							value: '1 AP + 1 MP: DC 10 Spell Check to heal 2+ HP, then 1 HP per turn in Domain.'
						}
					]
				}
			]
		},
		{
			featureName: 'Wild Form',
			levelGained: 1,
			description: 'You can spend 1 AP and 1 MP to transform into a Wild Form of your choice.',
			benefits: [
				{
					name: 'Transformation',
					description: 'Gain Wild Form with 3 HP, natural weapons, and Beast traits.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'wild_form',
							value:
								'Transform: 1 AP + 1 MP (free once per Long Rest). Gain 3 Wild Form HP, natural weapons.'
						}
					]
				},
				{
					name: 'Beast Traits',
					description: 'Gain 3 Trait Points for Beast or Wild Form traits, +2 per extra MP spent.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'beast_traits',
							value:
								'3 Trait Points for Beast/Wild Form traits. Spend extra MP for +2 Trait Points each.'
						}
					]
				},
				{
					name: 'Form Switching',
					description: 'Switch between True Form and available Wild Forms for 1 AP.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'form_switching',
							value: 'Spend 1 AP to switch between True Form and Wild Forms.'
						}
					]
				}
			]
		},
		{
			featureName: 'Wild Speech',
			levelGained: 1,
			description: 'You learn the Druidcraft Cantrip and can communicate with nature.',
			isFlavor: true,
			effects: [
				{ type: 'GRANT_CANTRIP', target: 'druidcraft', value: 1 },
				{
					type: 'GRANT_CHOICE',
					target: 'wild_speech',
					value: 1,
					userChoice: {
						prompt: 'Choose your nature communication',
						options: ['Animals', 'Plants', 'Weather']
					}
				}
			]
		},
		{
			featureName: "Nature's Torrent",
			levelGained: 2,
			description:
				'When a creature within 10 spaces takes Elemental damage, you can summon a torrent of nature.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'natures_torrent',
					value:
						'Reaction: Create 1 Space Radius Sphere. Creatures have Vulnerability (1) to triggering damage type and DisADV on movement saves.'
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
			subclassName: 'Phoenix',
			description: 'Druids who harness the power of fire and rebirth.',
			features: [
				{
					featureName: 'Flames of Rebirth',
					levelGained: 3,
					description: 'You wield the power of fire to lay destruction and foster new life.',
					benefits: [
						{
							name: 'Fiery Form',
							description:
								'Your Wild Forms can become Elemental (Fire) with Fire Resistance and fire damage.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'fiery_form',
									value:
										'Wild Forms: Elemental (Fire) type, Fire Resistance (1), Fire damage natural weapons.'
								}
							]
						},
						{
							name: 'Cleansing Flames',
							description: 'Remove conditions when healing creatures in your Domain.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'cleansing_flames',
									value: 'When healing in Domain: remove Impaired, Dazed, Burning, or Poisoned.'
								}
							]
						},
						{
							name: 'Rolling Wild Fire',
							description: 'Creatures take fire damage for moving in your Domain.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'rolling_wild_fire',
									value:
										'Creatures take 1 Fire damage per Space moved in Domain or starting turn in Domain.'
								}
							]
						}
					]
				},
				{
					featureName: 'Fire Within',
					levelGained: 3,
					description: 'You are unaffected by cold weather and can boil liquids with touch.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'fire_within',
							value: 'Immune to cold weather. Boil 1 gallon liquid with 1 minute contact.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Rampant Growth',
			description: 'Druids who specialize in plant magic and overgrowth.',
			features: [
				{
					featureName: 'Overgrowth',
					levelGained: 3,
					description: 'You enhance your Domain and Wild Forms with plant-based abilities.',
					benefits: [
						{
							name: 'Plant Form',
							description: 'Your Wild Forms can become Plant type with immunity to Bleeding.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'plant_form',
									value:
										'Wild Forms: Plant type, immune to Bleeding, Poison damage natural weapons.'
								}
							]
						},
						{
							name: 'Vineguard',
							description: 'Plant-life in your Domain provides cover to allies.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'vineguard',
									value: 'Creatures of choice in Domain gain benefits of 1/2 Cover.'
								}
							]
						},
						{
							name: 'Thorny Grasp',
							description: "Creatures who fail saves against Nature's Grasp begin Bleeding.",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'thorny_grasp',
									value: "Creatures who fail Nature's Grasp save begin Bleeding."
								}
							]
						}
					]
				},
				{
					featureName: 'Seed Vault',
					levelGained: 3,
					description:
						"You can magically produce the seeds of any mundane plant that you've ever touched.",
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'seed_vault',
							value: "Produce seeds of any mundane plant you've touched."
						}
					]
				}
			]
		}
	]
};
