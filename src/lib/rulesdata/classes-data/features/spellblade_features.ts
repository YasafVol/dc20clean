import type { ClassDefinition } from '../../schemas/character.schema';

export const spellbladeClass: ClassDefinition = {
	className: 'Spellblade',
	classCategory: 'hybrid',
	startingEquipment: {
		weaponsOrShields: [
			'2 Weapons or Light Shields',
			'Heavy Shields (if you learn the Warrior Discipline)'
		],
		rangedWeapons: ['Ranged Weapon with 20 Ammo', '3 Weapons with the Toss or Thrown Property'],
		armor: ['Light Armor', 'Heavy Armor (if you learn the Warrior Discipline)'],
		packs: 'X or Y Packs (Adventuring Packs Coming Soon)'
	},
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['Light Armor'],
			shields: ['Light Shields']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Spellblade Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Spellblade Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, regain up to half maximum SP when you hit with a Spell Attack or succeed on a Spell Check.'
		}
	},
	spellcasterPath: {
		spellList: {
			description:
				'Choose 2 Spell Schools. When you learn a new Spell, you can choose any Spell from the chosen Spell Schools or that have the Weapon or Ward Spell Tags.',
			type: 'schools',
			schoolCount: 2,
			tags: ['Weapon', 'Ward']
		},
		cantrips: {
			description: 'Cantrips Known column of the Spellblade Class Table'
		},
		spells: {
			description: 'Spells Known column of the Spellblade Class Table'
		},
		manaPoints: {
			maximumIncreasesBy: 'Mana Points column of the Spellblade Class Table'
		}
	},
	coreFeatures: [
		{
			id: 'spellblade_source_of_power',
			featureName: 'Source of Power',
			levelGained: 1,
			isFlavor: true,
			description:
				'Spellblades wield magic drawn from patrons, oaths, bloodlines, personal study, artistic expression, or mysterious relics.'
		},
		{
			id: 'spellblade_bound_weapon',
			featureName: 'Bound Weapon',
			levelGained: 1,
			description:
				'Magically bond with a weapon during a Quick Rest, imbuing it with elemental or mystical power until you end the bond.',
			benefits: [
				{
					name: 'Smite',
					description:
						'Spend 1 or more SP to deal +1 Bound Damage per SP spent. Also gain the benefits of 1 Martial Enhancement of your choice for free.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'spellblade_bound_weapon_smite',
							value:
								'Spend 1+ SP on a Martial Attack with bound weapon: +1 Bound Damage per SP, and gain 1 Martial Enhancement free.'
						}
					]
				},
				{
					name: 'Illuminate',
					description:
						'Emit or adjust bright/dim light in a 5-space radius from the bonded weapon at will.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'spellblade_bound_weapon_illuminate',
							value:
								'Produce, extinguish, or adjust bright/dim light in a 5-space radius from the bonded weapon for free.'
						}
					]
				},
				{
					name: 'Recall',
					description: 'Summon the bonded weapon from up to 20 spaces away if it is unattended.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'spellblade_bound_weapon_recall',
							value:
								'When the bonded weapon is within 20 spaces and unsecured, call it to your hand for free; if you lack a free hand, it lands at your feet.'
						}
					]
				}
			]
		},
		{
			id: 'spellblade_disciplines',
			featureName: 'Spellblade Disciplines',
			levelGained: 1,
			description:
				'Learn two Spellblade disciplines to tailor your blend of martial and arcane prowess.',
			choices: [
				{
					id: 'spellblade_disciplines_choice',
					prompt: 'Choose 2 Spellblade Disciplines',
					count: 2,
					options: [
						{
							name: 'Magus',
							description: 'Your magic deepens through increased MP and an additional spell.',
							effects: [
								{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 },
								{ type: 'GRANT_SPELL', target: 'spellblade_magus_spell', value: 1 }
							]
						},
						{
							name: 'Warrior',
							description: 'Gain heavy armor and shield training and additional maneuvers.',
							effects: [
								{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Armor', value: true },
								{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Shields', value: true },
								{ type: 'GRANT_MANEUVERS', target: 'spellblade_warrior_maneuvers', value: 2 }
							]
						},
						{
							name: 'Acolyte',
							description: 'Channel restorative magic for healing and curing ailments.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_acolyte',
									value:
										'Spend 1 AP and 1 MP to heal or cure: Heal – DC 10 Spell Check restores up to 3 HP (2 HP on failure, +1 HP per 5 over). Cure – Spell Check vs disease/poison DC to end it on a creature within 1 space.'
								}
							]
						},
						{
							name: 'Hex Warrior',
							description: 'Afflict foes with debilitating curses.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_hex_warrior',
									value:
										'Spend 1 AP and 1 MP to curse a creature within 10 spaces for 1 minute; Spell Check vs Repeated Physical Save. Failure: target is Dazed or Impaired (your choice), takes 1 Umbral damage each turn, and cannot regain HP.'
								}
							]
						},
						{
							name: 'Spell Breaker',
							description: 'Duel spell attacks with martial skill.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_spell_breaker',
									value:
										'Spend 2 AP to initiate a Spell Duel using your weapon against a spell attack within range. Make an Attack Check, adding SP and MP spent (up to your mana spend limit) as a bonus; gain ADV if within 1 space of the spell’s initiator.'
								}
							]
						},
						{
							name: 'Spell Warder',
							description: 'Temporarily ward yourself against the damage you unleash.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_spell_warder',
									value:
										'When you deal Elemental or Mystical damage with an attack, gain Resistance (1) to that damage type until the start of your next turn; replace or maintain the resistance on subsequent triggers.'
								}
							]
						},
						{
							name: 'Blink Blade',
							description: 'Teleport a short distance as part of your attacks.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_blink_blade',
									value:
										'Once per turn, immediately before or after making an attack, teleport to a space you can see within 1 space of your original position.'
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'spellblade_sense_magic',
			featureName: 'Sense Magic',
			levelGained: 1,
			isFlavor: true,
			description:
				'Focus for 1 minute to detect certain creature types within 20 spaces; Spell Checks reveal their nature and location until the end of your next turn.'
		},
		{
			id: 'spellblade_spellstrike',
			featureName: 'Spellstrike',
			levelGained: 2,
			description:
				'Once per turn, combine a Martial Attack with a spell, reducing the spell’s AP cost and resolving them as one harmonic strike.'
		},
		{
			id: 'spellblade_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. You must meet any prerequisites to select it.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		},
		{
			id: 'spellblade_level_5_placeholder',
			featureName: 'Martial Arcana (Placeholder)',
			levelGained: 5,
			isFlavor: true,
			description: 'Placeholder feature for Level 5. See CH6 for final design.'
		},
		{
			id: 'spellblade_level_8_capstone_placeholder',
			featureName: 'Arcane Apex (Placeholder)',
			levelGained: 8,
			isFlavor: true,
			description: 'Placeholder capstone for Level 8. See CH6 for final design.'
		}
	],
	subclasses: [
		{
			subclassName: 'Paladin',
			description:
				'Spellblades who channel radiant conviction, defending allies while smiting foes in sacred light.',
			features: [
				{
					id: 'spellblade_paladin_holy_warrior',
					featureName: 'Holy Warrior',
					levelGained: 3,
					description: 'Sacred gifts empower your aura, divine strikes, and restorative prowess.',
					benefits: [
						{
							name: 'Aura of Protection',
							description: 'Allies of your choice within 2 spaces gain ADV on Mental Saves.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_paladin_aura_of_protection',
									value: 'Allies you choose within 2 spaces gain ADV on Mental Saves.'
								}
							]
						},
						{
							name: 'Divine Strike',
							description: 'Channel Radiant or Umbral power when you deal damage with Spellstrike.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_paladin_divine_strike',
									value:
										'When you deal damage with Spellstrike, you may convert the spell’s damage to Radiant or Umbral (chosen when you gain this feature).'
								}
							]
						},
						{
							name: 'Lay on Hands',
							description:
								'You gain the Acolyte Spellblade Discipline (or another discipline if already known). Once per Long Rest, use it without MP and gain +5 to the Spell Check.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_paladin_lay_on_hands',
									value:
										'Add the Acolyte Spellblade Discipline to your known disciplines (or another if already known). Once per Long Rest, use the Acolyte Discipline without MP and gain +5 to the Spell Check.'
								}
							]
						}
					]
				},
				{
					id: 'spellblade_paladin_oathsworn',
					featureName: 'Oathsworn',
					levelGained: 3,
					isFlavor: true,
					description:
						'You swear tenets such as Heart of Bravery, Light in the Darkness, Instill Pain, Peacekeeper, Protect the Weak, Unrelenting Effort, or Vengeance. While upholding your oath, you have ADV on Checks to rally non-hostile allies to your cause.'
				}
			]
		},
		{
			subclassName: 'Rune Knight',
			description:
				'Spellblades who carve runic power into their bound weapons, channeling elemental or mystical energy through martial skill.',
			features: [
				{
					id: 'spellblade_rune_weapon',
					featureName: 'Rune Weapon',
					levelGained: 3,
					description:
						'Inscribe a rune onto your Bound Weapon. It can hold one rune at a time, which you may swap during a Quick Rest. Learn two runes from the list.',
					choices: [
						{
							id: 'spellblade_rune_choice',
							prompt: 'Choose 2 Runes to learn',
							count: 2,
							options: [
								{
									name: 'Earth Rune',
									description: 'Shake the battlefield and resist forced movement.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_earthquake',
											value:
												'When you Smite with the rune-inscribed weapon, create Difficult Terrain in a 1-space radius sphere centered on the target.'
										},
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_unmovable',
											value:
												'Gain ADV on checks and saves against being knocked prone or moved against your will.'
										}
									]
								},
								{
									name: 'Flame Rune',
									description: 'Ignite foes and kindle restorative warmth.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_scorching',
											value:
												'When you Smite a creature, it must make a Physical Save or begin Burning.'
										},
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_hearth',
											value:
												'If you fought since inscribing this rune, regain 2 Rest Points when you finish a Short Rest.'
										}
									]
								},
								{
									name: 'Frost Rune',
									description: 'Freeze your foes and shield yourself in ice-born resilience.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_frostbite',
											value:
												'When you Smite a creature, it must make a Physical Save or be Grappled by ice until the end of your next turn; it may spend 1 AP to attempt an Athletics Check against your Save DC to break free.'
										},
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_glacier',
											value: 'When you roll Initiative, gain 2 Temp HP.'
										}
									]
								},
								{
									name: 'Lightning Rune',
									description:
										'Stun enemies with crackling power and move with electric swiftness.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_charged',
											value:
												'When you Smite a creature, it must make a Physical Save or become Stunned 1 until the end of your next turn.'
										},
										{
											type: 'MODIFY_STAT',
											target: 'moveSpeed',
											value: 1
										}
									]
								},
								{
									name: 'Water Rune',
									description: 'Crash like a wave and mend with restorative tides.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_wave',
											value:
												'When you Smite a creature, you may spend 1 AP to force a Physical Save; on failure, the target is knocked Prone.'
										},
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_healing_waters',
											value: 'When an MP effect restores your HP, regain 1 additional HP.'
										}
									]
								},
								{
									name: 'Wind Rune',
									description: 'Channel gales to push foes and leap impossible distances.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_hurricane',
											value:
												'When you Smite a creature, it must make a Physical Save or be pushed 1 space in a direction you choose.'
										},
										{
											type: 'MODIFY_STAT',
											target: 'jumpDistance',
											value: 3
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'spellblade_rune_expert',
					featureName: 'Rune Expert',
					levelGained: 3,
					isFlavor: true,
					description:
						'You have ADV on checks to interpret or understand magical runes you can see.'
				},
				{
					id: 'spellblade_rune_names',
					featureName: 'Rune Names',
					levelGained: 3,
					isFlavor: true,
					description:
						'Common rune names include: Earth (Uruz/Terra), Flame (Ild/Ignis), Frost (Isaz/Frigus), Lightning (Thurisaz/Fulmen), Water (Laquz/Aqua), Wind (Ansuz/Ventus).'
				}
			]
		}
	]
};
