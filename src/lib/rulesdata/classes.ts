import type { IClassDefinition } from './types.js';
import { maneuvers } from './maneuvers.js';
import { techniques } from './techniques.js';
import { SpellSchool } from './spells-data/types/spell.types.js';

// IClassDefinition for Barbarian:
export const barbarianClass: IClassDefinition = {
	id: 'barbarian',
	name: 'Barbarian',
	description:
		'Barbarians charge into battle with reckless abandon, ignoring their own safety as they brush off damage and deal even more in return. They trade defense for more offense and let out blood-crazed battle cries.',
	baseHpContribution: 9, // From class table p.118
	startingSP: 1, // From class table p.118
	startingMP: 0,
	skillPointGrantLvl1: 0,
	tradePointGrantLvl1: 0,
	combatTraining: ['Weapons', 'All Armor', 'All Shields'], // From p.118 "Barbarian Martial Path"
	maneuversKnownLvl1: 'All Attack', // From p.118 "Maneuvers Known" - "All Attack"
	techniquesKnownLvl1: 0, // From p.118 "Techniques Known" - 0
	saveDCBase: 8, // From p.118 "Save DC" - 8
	deathThresholdBase: 10, // From p.118 "Death Threshold" - 10
	moveSpeedBase: 30, // From p.118 "Move Speed" - 30
	restPointsBase: 4, // From p.118 "Rest Points" - 4
	gritPointsBase: 2, // From p.118 "Grit Points" - 2
	initiativeBonusBase: 0, // From p.118 "Initiative Bonus" - 0
	cantripsKnownLvl1: 0,
	spellsKnownLvl1: 0,
	level1Features: [
		{
			id: 'barbarian_rage',
			name: 'Rage',
			level: 1,
			description:
				'During Combat, you can spend 1 AP and 1 SP to enter a Rage for 1 minute. For the duration, you’re subjected to the following effects: You deal +1 damage on Melee Martial Attacks. You have ADV on Might Saves. Your PD decreases by 5. You gain Resistance (Half) to Elemental and Physical damage. Ending Early: Your Rage ends early if you fall Unconscious, die, or you choose to end it for free on your turn.',
			effects: [
				{ type: 'GRANT_ABILITY', value: 'Rage_Mechanics_Bundle' } // Complex ability
			]
		},
		{
			id: 'barbarian_berserker',
			name: 'Berserker',
			level: 1,
			description:
				'Your primal savagery grants you the following benefits: Charge: When you make a Melee Martial Attack on your turn, you can move up to 2 Spaces immediately before making the Attack. Berserker Defense: While you aren’t wearing Armor you gain +2 AD. Fast Movement: You gain +1 Speed while not wearing Armor. Mighty Leap: You can use your Might instead of Agility to determine your Jump Distance and the damage you take from Falling.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					subFeature: 'Charge',
					descriptionOverride: 'Move 2 Spaces before Melee Martial Attack.'
				},
				{
					type: 'GRANT_PASSIVE',
					subFeature: 'Berserker_Defense',
					descriptionOverride: '+2 AD when not wearing Armor.'
				},
				{
					type: 'GRANT_PASSIVE',
					subFeature: 'Fast_Movement',
					descriptionOverride: '+1 Speed when not wearing Armor.'
				},
				{
					type: 'GRANT_PASSIVE',
					subFeature: 'Mighty_Leap',
					descriptionOverride: 'Use Might for Jump Distance & Falling Damage calc.'
				}
			]
		},
		{
			id: 'barbarian_shattering_force',
			name: 'Shattering Force (Flavor)',
			level: 1,
			description:
				'When you Hit a structure or mundane object with a Melee Attack, it’s considered a Critical Hit.',
			effects: [
				{
					type: 'FLAVOR_MECHANIC_NOTE',
					value: 'Melee attacks vs objects/structures are Critical Hits.'
				}
			]
		}
	],
	featureChoicesLvl1: [] // No explicit user choices for L1 features for Barbarian
};

// IClassDefinition for Sorcerer:
export const sorcererClass: IClassDefinition = {
	id: 'sorcerer',
	name: 'Sorcerer',
	description:
		'Sorcerers tap into the raw magic in their own bodies as a conduit to harness, manipulate, and sculpt magic with wild resolve. They can overload themselves and even cast Spells without Mana, pushing the limits of magic and their own bodies.',
	baseHpContribution: 8, // From class table p.149 Lvl 1 HP
	startingSP: 0,
	startingMP: 6, // From class table p.149 Lvl 1 MP
	skillPointGrantLvl1: 0, // From class table p.149
	tradePointGrantLvl1: 0, // From class table p.149
	combatTraining: ['Light Armor'], // From p.149 "Sorcerer Spellcasting Path"
	maneuversKnownLvl1: 0, // From class table p.149
	techniquesKnownLvl1: 0, // From class table p.149
	cantripsKnownLvl1: 2, // From class table p.149
	spellsKnownLvl1: 3, // From class table p.149
	saveDCBase: 8, // From p.149 "Save DC" - 8
	deathThresholdBase: 10, // From p.149 "Death Threshold" - 10
	moveSpeedBase: 30, // From p.149 "Move Speed" - 30
	restPointsBase: 4, // From p.149 "Rest Points" - 4
	gritPointsBase: 2, // From p.149 "Grit Points" - 2
	initiativeBonusBase: 0, // From p.149 "Initiative Bonus" - 0
	level1Features: [
		{
			id: 'sorcerer_innate_power',
			name: 'Innate Power',
			level: 1,
			description:
				'Choose a Sorcerous Origin that grants you a benefit: Intuitive Magic, Resilient Magic, or Unstable Magic. Additionally, you gain the following benefits: Your Maximum MP increases by 1. Once per Long Rest, you can use a 1 MP Spell Enhancement without spending any MP (up to your Mana Spend Limit). You regain the ability to use this benefit when you roll for Initiative.',
			effects: [
				{ type: 'MODIFY_MP_MAX', value: 1 },
				{ type: 'GRANT_ABILITY', value: 'Free_1MP_Spell_Enhancement_Once_Per_Long_Rest' }
			]
		},
		{
			id: 'sorcerer_overload_magic',
			name: 'Overload Magic',
			level: 1,
			description:
				'You can spend 2 AP in Combat to channel raw magical energy for 1 minute, or until you become Incapacitated, die, or choose to end it early at any time for free. For the duration, your magic is overloaded and you’re subjected to the following effects: You gain +5 to all Spell Checks you make. You must immediately make an Attribute Save (your choice) against your Save DC upon using this Feature, and again at the start of each of your turns. Failure: You gain Exhaustion. You lose any Exhaustion gained in this way when you complete a Short Rest.',
			effects: [{ type: 'GRANT_ABILITY', value: 'Overload_Magic_Mechanics_Bundle' }]
		},
		{
			id: 'sorcerer_sorcery_flavor',
			name: 'Sorcery (Flavor)',
			level: 1,
			description: 'You learn the Sorcery Spell.',
			effects: [{ type: 'GRANT_SPELL_KNOWN', value: 'sorcery_cantrip_id' }]
		}
	],
	featureChoicesLvl1: [
		{
			id: 'sorcerous_origin_choice', // Key for storing choice
			prompt: 'Choose your Sorcerous Origin (DC20 p.150):',
			type: 'select_one',
			options: [
				{
					value: 'intuitive_magic',
					label: 'Intuitive Magic',
					description: 'You learn an additional Spell and Cantrip from your Sorcerer Spell List.',
					effectsOnChoice: [
						{ type: 'GRANT_BONUS_SPELL_KNOWN' },
						{ type: 'GRANT_BONUS_CANTRIP_KNOWN' }
					]
				},
				{
					value: 'resilient_magic',
					label: 'Resilient Magic',
					description: 'You gain Dazed Resistance.',
					effectsOnChoice: [{ type: 'GRANT_CONDITION_RESISTANCE', target: 'Dazed' }]
				},
				{
					value: 'unstable_magic',
					label: 'Unstable Magic',
					description:
						'When you Critically Succeed or Fail on a Spell Check, roll on the Wild Magic Table...',
					effectsOnChoice: [{ type: 'ENABLE_WILD_MAGIC_TABLE_ON_CRIT_SPELL_CHECK' }]
				}
			]
		},
		{
			id: 'sorcerer_spell_list_choice', // Key for storing choice
			prompt: 'Choose Your Sorcerer Spell List (DC20 p.149):',
			type: 'select_one',
			options: [
				{ value: 'arcane', label: 'Arcane Spell List' },
				{ value: 'divine', label: 'Divine Spell List' },
				{ value: 'primal', label: 'Primal Spell List' }
			]
		}
	]
};

// IClassDefinition for Bard:
export const bardClass: IClassDefinition = {
	id: 'bard',
	name: 'Bard',
	description:
		'Bards utilize artistic expression through various forms to connect with the emotions and heart of magic. This includes a wide range of mediums such as musical instruments, singing, dancing, drawing, painting, sculpting, poetry, storytelling, inspirational speech, and more. They are great at bringing the best out in those around them through both helping and performing, showcasing high proficiency across multiple disciplines. Bards are remarkably flexible and adaptable spellcasters, capable of tapping into a wide array of magical abilities with the appropriate artistic expression.',
	baseHpContribution: 8, // From class table p.121
	startingSP: 0, // From class table p.121
	startingMP: 6, // From class table p.121
	skillPointGrantLvl1: 2, // From class table p.121
	tradePointGrantLvl1: 3, // From class table p.121
	combatTraining: ['Light Armor', 'Light Shields'], // From p.121 "Bard Spellcasting Path"
	maneuversKnownLvl1: 0, // From class table p.121
	techniquesKnownLvl1: 0, // From class table p.121
	saveDCBase: 8, // General for Spellcasters
	deathThresholdBase: 10, // General
	moveSpeedBase: 30, // General
	restPointsBase: 4, // General
	gritPointsBase: 2, // General
	initiativeBonusBase: 0, // General
	cantripsKnownLvl1: 2, // From class table p.121
	spellsKnownLvl1: 3, // From class table p.121
	level1Features: [
		{
			id: 'bard_font_of_inspiration',
			name: 'Font of Inspiration',
			level: 1,
			description:
				'You are an ever present source of aid for your allies. You gain the following benefits: Ranged Help Attack: The range of your Help Action when aiding an Attack increases to 10 Spaces. Help Reaction: When a creature you can see makes a Check, you can take the Help Action as a Reaction to aid them with their Check, provided you’re within range to do so.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'bard_remarkable_repertoire',
			name: 'Remarkable Repertoire',
			level: 1,
			description:
				'You’ve picked up a few tricks along your travels, granting you the following benefits: Jack of All Trades: You gain 2 Skill Points. Magical Secrets: You learn any 2 Spells of your choice from any Spell List. Magical Expression: You learn to express your art in a unique manner, granting you the ability to alter how you cast Spells. Choose the manner of your expression: Visual or Auditory.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'bard_crowd_pleaser',
			name: 'Crowd Pleaser (Flavor Feature)',
			level: 1,
			description:
				'When you spend at least 5 minutes performing an Artistry Trade for one or more people who are actively watching or listening to your performance, you can make an Artistry Trade Check Contested by the targets’ Charisma Save. Success: You gain ADV on Charisma Checks against the target for 1 hour or until you become hostile. Creatures have ADV on the Save if they’re considered hostile toward you.',
			effects: [] // Flavor/narrative effect
		}
	],
	featureChoicesLvl1: [
		{
			id: 'bard_magical_expression',
			prompt: 'Choose your Magical Expression:',
			type: 'select_one',
			options: [
				{ value: 'visual', label: 'Visual' },
				{ value: 'auditory', label: 'Auditory' }
			]
		},
		{
			id: 'bard_magical_secrets',
			prompt: 'Choose 2 spells from any spell list:',
			type: 'select_multiple',
			options: [],
			maxSelections: 2
		}
	]
};

// IClassDefinition for Champion:
export const championClass: IClassDefinition = {
	id: 'champion',
	name: 'Champion',
	description:
		'Champions are weapon and armor specialists that push themselves to the limit in combat. They are able to master a wide variety of weapon types and learn their enemies as they fight them.',
	baseHpContribution: 9, // From class table p.124
	startingSP: 1, // From class table p.124
	startingMP: 0,
	skillPointGrantLvl1: 0, // From class table p.124
	tradePointGrantLvl1: 0, // From class table p.124
	combatTraining: ['Weapons', 'All Armors', 'All Shields'], // From p.124 "Champion Martial Path"
	maneuversKnownLvl1: 'All Attack', // From class table p.124
	techniquesKnownLvl1: 0, // From class table p.124
	saveDCBase: 8, // General for Martial Classes
	deathThresholdBase: 10, // General
	moveSpeedBase: 30, // General
	restPointsBase: 4, // General
	gritPointsBase: 2, // General
	initiativeBonusBase: 0, // General
	cantripsKnownLvl1: 0,
	spellsKnownLvl1: 0,
	level1Features: [
		{
			id: 'champion_master_at_arms',
			name: 'Master-at-Arms',
			level: 1,
			description:
				'Your training in warfare has granted you greater offense, defense, and movement. Weapon Master: At the start of each of your turns, you can freely swap any Weapon you’re currently wielding in each hand for any other Weapon without provoking Opportunity Attacks. Maneuver Master: You learn 2 Maneuvers of your choice. Technique Master: You learn 1 Technique of your choice. Once per Combat, when you perform a Technique you can reduce its SP cost by 1.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'champion_fighting_spirit',
			name: 'Fighting Spirit',
			level: 1,
			description:
				'You stand ready for Combat at any moment, granting you the following benefits: Combat Readiness: At the start of your first turn in Combat, you gain one of the following benefits: Brace: You gain the benefits of the Dodge Action and ADV on the next Save you make until the end of Combat. Advance: You gain the benefits of the Move Action and ADV on the next Physical Check you make until the end of Combat. Second Wind: Once per Combat when you start your turn Bloodied, you can regain 2 HP and 1 SP.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'champion_know_your_enemy',
			name: 'Know Your Enemy (Flavor Feature)',
			level: 1,
			description:
				'You can spend 1 minute observing or interacting with a creature out of Combat (or spend 1 AP in Combat) to learn information about its physical capabilities compared to your own. Choose one of the following stats of the creature to assess: Might, Agility, PD, AD, and HP. Make a DC 10 Knowledge or Insight Check (your choice). Success: You learn if the chosen stat is higher, lower, or the same as yours.',
			effects: [] // Flavor/narrative effect
		}
	],
	featureChoicesLvl1: [
		{
			id: 'champion_maneuver_master',
			prompt: 'Choose 2 Maneuvers:',
			type: 'select_multiple',
			maxSelections: 2,
			options: maneuvers.map((m) => ({ value: m.name, label: m.name, description: m.description }))
		},
		{
			id: 'champion_technique_master',
			prompt: 'Choose 1 Technique:',
			type: 'select_one',
			options: techniques.map((t) => ({ value: t.name, label: t.name, description: t.description }))
		}
	]
};

// IClassDefinition for Cleric:
export const clericClass: IClassDefinition = {
	id: 'cleric',
	name: 'Cleric',
	description:
		'Clerics can reach out and call upon the power of a deity to aid them in battle and to support them and their allies. Clerics can range from a knowledgeable priest, to a knight in holy armor. They reach out to heir deity to empower their magic in ways mortals normally cannot.',
	baseHpContribution: 8, // From class table p.127
	startingSP: 0, // From class table p.127
	startingMP: 6, // From class table p.127
	skillPointGrantLvl1: 2, // From class table p.127
	tradePointGrantLvl1: 3, // From class table p.127
	combatTraining: ['Light Armor', 'Light Shields'], // From p.127 "Cleric Spellcasting Path"
	maneuversKnownLvl1: 0, // From class table p.127
	techniquesKnownLvl1: 0, // From class table p.127
	saveDCBase: 8, // General for Spellcasters
	deathThresholdBase: 10, // General
	moveSpeedBase: 30, // General
	restPointsBase: 4, // General
	gritPointsBase: 2, // General
	initiativeBonusBase: 0, // General
	cantripsKnownLvl1: 2, // From class table p.127
	spellsKnownLvl1: 3, // From class table p.127
	level1Features: [
		{
			id: 'cleric_cleric_order',
			name: 'Cleric Order',
			level: 1,
			description:
				'Your connection to your deity grants you the following benefits: Divine Damage: Choose an Elemental or Mystical damage type. The chosen damage type becomes your Divine Damage which is used for some Cleric Features. Divine Domain: You gain the benefits of 2 Divine Domains of your choice.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'cleric_divine_blessing',
			name: 'Divine Blessing',
			level: 1,
			description:
				'You can spend 1 AP to say a prayer and petition your deity for their divine blessing. Choose 1 of the blessings listed below. Each blessing has a listed MP cost that you must spend to gain the blessing. Once during the next minute, you can apply the blessing to a Spell you cast. If your Spell targets more than 1 creature, the blessing only applies to 1 target of your choice. Unused Blessing: You can only have 1 blessing at a time. If you petition your deity for a blessing while you already have a blessing, the first blessing immediately ends without granting any benefit. If the blessing ends without granting any benefit, you regain the MP spent to gain the blessing.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'cleric_divine_omen',
			name: 'Divine Omen (Flavor Feature)',
			level: 1,
			description:
				'Once per Long Rest, you can spend 10 minutes to commune with your Deity. Question: You can ask them 1 question, which must be posed in a way that could be answered with a yes or no. Response: The deity responds to the best of their knowledge and intentions in one of the following responses: Yes, No, or Unclear. Communing Again: If you commune with your deity more than once per Long Rest, you must make a DC 15 Spell Check. Failure: You receive no answer. Each time you commune again before you complete a Long Rest, the DC increases by 5.',
			effects: [] // Flavor/narrative effect
		}
	],
	featureChoicesLvl1: [
		{
			id: 'cleric_divine_damage',
			prompt: 'Choose your Divine Damage type:',
			type: 'select_one',
			options: [
				{ value: 'elemental', label: 'Elemental' },
				{ value: 'mystical', label: 'Mystical' }
			]
		},
		{
			id: 'cleric_divine_domain',
			prompt: 'Choose 2 Divine Domains:',
			type: 'select_multiple',
			maxSelections: 2,
			options: [
				// Placeholder, as the list is not in this file
				{ value: 'domain_of_life', label: 'Domain of Life' },
				{ value: 'domain_of_death', label: 'Domain of Death' },
				{ value: 'domain_of_knowledge', label: 'Domain of Knowledge' },
				{ value: 'domain_of_war', label: 'Domain of War' }
			]
		}
	]
};

// IClassDefinition for Commander:
export const commanderClass: IClassDefinition = {
	id: 'commander',
	name: 'Commander',
	description:
		'Commanders are the leaders of the battlefield, inspiring their allies and leading them to victory. They can command their allies to attack or move around the battlefield, and are even able to “heal” allies by making them dig deep within themselves to push forward in combat.',
	baseHpContribution: 9, // From class table p.131
	startingSP: 1, // From class table p.131
	startingMP: 0,
	skillPointGrantLvl1: 0, // From class table p.131
	tradePointGrantLvl1: 0, // From class table p.131
	combatTraining: ['Weapons', 'All Armor', 'All Shields'], // From p.131 "Commander Martial Path"
	maneuversKnownLvl1: 'All Attack', // From class table p.131
	techniquesKnownLvl1: 0, // From class table p.131
	saveDCBase: 8, // General for Martial Classes
	deathThresholdBase: 10, // General
	moveSpeedBase: 30, // General
	restPointsBase: 4, // General
	gritPointsBase: 2, // General
	initiativeBonusBase: 0, // General
	cantripsKnownLvl1: 0,
	spellsKnownLvl1: 0,
	level1Features: [
		{
			id: 'commander_inspiring_presence',
			name: 'Inspiring Presence',
			level: 1,
			description:
				'Whenever you spend SP while in Combat, you can restore an amount of HP equal to the SP spent. Choose any creatures within 5 Spaces that can see or hear you, and divide the HP among them.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'commander_commanders_call',
			name: 'Commander’s Call',
			level: 1,
			description:
				'You can spend 1 AP and 1 SP to command a willing creature that you can see within 5 Spaces that can also see or hear you. The chosen creature can immediately take 1 of the following Actions of your choice as a Reaction for free. You can only use each of the following commands once on each of your turns: Attack: The creature makes an Attack with ADV. They can’t spend any resources on this Attack, such as AP, SP, or MP. Dodge: The creature takes the Full Dodge Action. Move: The creature moves up to their Speed without provoking Opportunity Attacks.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'commander_natural_leader',
			name: 'Natural Leader (Flavor Feature)',
			level: 1,
			description:
				'You have ADV on Checks made to convince creatures that you are an authority figure. Additionally, you have ADV on the first Charisma Check made to interact with non-hostile members of military groups (such as soldiers, guards, etc.).',
			effects: [] // Flavor/narrative effect
		}
	],
	featureChoicesLvl1: [] // No explicit Lvl 1 feature choices listed for Commander on p.132
};

// IClassDefinition for Druid:
export const druidClass: IClassDefinition = {
	id: 'druid',
	name: 'Druid',
	description:
		'Druids tap into the power of nature, drawing upon the energies that flow through the world and creatures around them. and connect to plants, animals, and the plane itself. They can channel both the restorative and destructive forces of nature and shapeshift into wild beasts.',
	baseHpContribution: 8, // From class table p.134
	startingSP: 0, // From class table p.134
	startingMP: 6, // From class table p.134
	skillPointGrantLvl1: 2, // From class table p.134
	tradePointGrantLvl1: 3, // From class table p.134
	combatTraining: ['Light Armor'], // From p.134 "Druid Spellcasting Path"
	maneuversKnownLvl1: 0, // From class table p.134
	techniquesKnownLvl1: 0, // From class table p.134
	saveDCBase: 8, // General for Spellcasters
	deathThresholdBase: 10, // General
	moveSpeedBase: 30, // General
	restPointsBase: 4, // General
	gritPointsBase: 2, // General
	initiativeBonusBase: 0, // General
	cantripsKnownLvl1: 2, // From class table p.134
	spellsKnownLvl1: 3, // From class table p.134
	level1Features: [
		{
			id: 'druid_druid_domain',
			name: 'Druid Domain',
			level: 1,
			description:
				'You can spend 1 AP and 1 MP to create your own Druid Domain that includes small plant life, sand, shallow water, or other naturally occurring features. You create up to 8 Domain Spaces along the ground or walls. The first Domain Space must be within 1 Space of you, and each additional Domain Space must be adjacent to another Domain Space. If you use this Feature again, the first Domain Space of it must be within 1 Space of you or another Domain Space. Domain Spaces: The area is considered to be Difficult Terrain for creatures of your choice, and when you cast a Spell, you can do so as if you were standing in any Space within your Domain. Losing Domain Spaces: A Domain Space also disappears if you end your turn farther than 15 Spaces away from it or you die. Domain Actions: While you have Domain Spaces, you can take any of the following Domain Actions: Nature’s Grasp, Move Creature, Move Object, Wild Growth.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'druid_wild_form',
			name: 'Wild Form',
			level: 1,
			description:
				'You can spend 1 AP and 1 MP to transform into a Wild Form of your choice. You can spend 1 AP on your turn to shift back and forth between your True Form and any Wild Forms you currently have available. Once per Long Rest, you can transform without spending MP or using MP enhancements. True Form: When you transform from your Wild Form to your True Form, your statistics return to normal. You immediately revert to your True Form when your Wild Form HP is reduced to 0 or you die. Wild Form: When you transform into a Wild Form, you gain the Wild Form’s current Wild Form HP (see Wild Form HP below), retaining any HP losses. Duration: Each Wild Form remains available until its Wild Form HP is reduced to 0 or you complete a Long Rest. Multiple Forms: You can have multiple Wild Forms available at a time which have their own Wild Form HP and Traits. Equipment: Your equipment falls to the ground or merges into your Wild Form (your choice for each item). You gain the benefits of Magic Items merged with your Wild Form, but you can’t activate them or spend their charges. Statistics: While in your Wild Form, you’re subjected to the following changes (unless otherwise stated): Stat Block: You use the Wild Form Stat Block below to determine your statistics. Identity: You maintain your personality, intellect, and ability to speak. Wild Form HP: You gain a secondary pool of Wild Form Health Points, which is 3 with a maximum of 3. Damage and healing effects target your Wild Form HP before your True Form HP, and any excess damage or healing carries over to your own HP. Natural Weapon: You have Natural Weapons (claws, horns, fangs, etc.) which you can use to make Unarmed Strikes that deal 1 Bludgeoning, Piercing, or Slashing damage (your choice when you use this Feature). Features & Talents: You don’t benefit from Talents or Class Features, except Druid Class Features, Subclass Features, and Talents. Additionally, you can’t cast Spells or perform Techniques. Traits: You don’t benefit from your Ancestry Traits, but you gain 3 Trait Points to spend on Beast Traits or Wild Form Traits of your choice. You can’t select negative Beast Traits. When you use this Feature, you can spend additional MP (up to your Mana Spend Limit) to gain 2 additional Trait Points per MP spent.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'druid_wild_speech',
			name: 'Wild Speech (Flavor Feature)',
			level: 1,
			description:
				'You learn the Druidcraft Cantrip and can choose 1 of the following options: Animals: You can understand and speak with Beasts in a limited manner. You can understand the meaning of their movements, sounds, and behaviors, and they can understand the meanings of simple words, concepts, and emotions. Plants: You can understand and speak with Plants in a limited manner. You can understand the meaning of their swaying, folding, unfolding of their leaves and flowers, and they can understand the meanings of simple words, concepts, and emotions. Weather: You can reach out to nature and cast the Commune with Nature Spell as a Ritual once per Long Rest.',
			effects: [] // Flavor/narrative effect
		}
	],
	featureChoicesLvl1: [
		{
			id: 'druid_wild_speech_choice',
			prompt: 'Choose your Wild Speech option:',
			type: 'select_one',
			options: [
				{ value: 'animals', label: 'Animals' },
				{ value: 'plants', label: 'Plants' },
				{ value: 'weather', label: 'Weather' }
			]
		},
		{
			id: 'druid_wild_form_traits',
			prompt: 'Spend 3 Trait Points on Beast or Wild Form Traits:',
			type: 'select_multiple',
			// Placeholder, as the list is not in this file
			options: [],
			maxSelections: 3
		}
	]
};

// IClassDefinition for Hunter:
export const hunterClass: IClassDefinition = {
	id: 'hunter',
	name: 'Hunter',
	description:
		'Hunters are master survivalists and natural explorers. They mark their targets to better track them and take them down, using their mastery over terrain, traps, and weapons to their advantage.',
	baseHpContribution: 9, // From class table p.139
	startingSP: 1, // From class table p.139
	startingMP: 0,
	skillPointGrantLvl1: 0, // From class table p.139
	tradePointGrantLvl1: 0, // From class table p.139
	combatTraining: ['Weapons', 'Light Armor', 'Light Shields'], // From p.139 "Hunter Martial Path"
	maneuversKnownLvl1: 'All Attack', // From class table p.139
	techniquesKnownLvl1: 0, // From class table p.139
	saveDCBase: 8, // General for Martial Classes
	deathThresholdBase: 10, // General
	moveSpeedBase: 30, // General
	restPointsBase: 4, // General
	gritPointsBase: 2, // General
	initiativeBonusBase: 0, // General
	cantripsKnownLvl1: 0,
	spellsKnownLvl1: 0,
	level1Features: [
		{
			id: 'hunter_hunters_mark',
			name: 'Hunter’s Mark',
			level: 1,
			description:
				'You can spend 1 AP and 1 SP to focus on and mark a creature you can see within 15 Spaces as your quarry. Alternatively, you can mark a creature by studying its tracks for at least 1 minute. While a creature is marked, you gain the following benefits: You have ADV on Awareness and Survival Checks made to find the target. The first Martial Attack against your target on your turn has ADV and ignores PDR. When you score a Heavy or Critical Hit against the target, you automatically grant a d8 Help Die to the next Attack made against the target before the start of your next turn. The target is marked as long as it’s on the same Plane of Existence as you, and vanishes early if you complete a Long Rest, fall Unconscious, or use this Feature again to mark another creature.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'hunter_favored_terrain',
			name: 'Favored Terrain',
			level: 1,
			description:
				'You are particularly familiar with two types of environments and are adept at the skills unique to the region. Choose 2 types of Favored Terrain listed below. Coast, Desert, Forest, Grassland, Jungle, Mountain, Swamp, Tundra, Subterranean, Urban. Additionally, while you’re in one of your Favored Terrains, you have ADV on Stealth and Survival Checks and can’t be Surprised.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'hunter_bestiary',
			name: 'Bestiary (Flavor Feature)',
			level: 1,
			description:
				'You have developed a trove of knowledge hunting creatures which you’ve recorded in your Bestiary. Your Bestiary can take the form of a book, a memory vault within your mind, or some other representation of your choice. You have ADV on Checks made to learn or recall information about any creature recorded in your Bestiary. Starting Entries: Choose a Creature Type: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, or Undead. Your Bestiary includes prerecorded notes about various creatures of the chosen type. Making New Entries: You can spend 10 minutes of Light Activity recording information into your Bestiary about a specific creature you have slain within the last 24 hours.',
			effects: [] // Flavor/narrative effect
		}
	],
	featureChoicesLvl1: [
		{
			id: 'hunter_favored_terrain_choice',
			prompt: 'Choose 2 types of Favored Terrain:',
			type: 'select_multiple',
			maxSelections: 2,
			options: [
				{ value: 'coast', label: 'Coast' },
				{ value: 'desert', label: 'Desert' },
				{ value: 'forest', label: 'Forest' },
				{ value: 'grassland', label: 'Grassland' },
				{ value: 'jungle', label: 'Jungle' },
				{ value: 'mountain', label: 'Mountain' },
				{ value: 'swamp', label: 'Swamp' },
				{ value: 'tundra', label: 'Tundra' },
				{ value: 'subterranean', label: 'Subterranean' },
				{ value: 'urban', label: 'Urban' }
			]
		},
		{
			id: 'hunter_bestiary_choice',
			prompt: 'Choose a starting Creature Type for your Bestiary:',
			type: 'select_one',
			options: [
				{ value: 'aberration', label: 'Aberration' },
				{ value: 'beast', label: 'Beast' },
				{ value: 'celestial', label: 'Celestial' },
				{ value: 'construct', label: 'Construct' },
				{ value: 'dragon', label: 'Dragon' },
				{ value: 'elemental', label: 'Elemental' },
				{ value: 'fey', label: 'Fey' },
				{ value: 'fiend', label: 'Fiend' },
				{ value: 'giant', label: 'Giant' },
				{ value: 'humanoid', label: 'Humanoid' },
				{ value: 'monstrosity', label: 'Monstrosity' },
				{ value: 'ooze', label: 'Ooze' },
				{ value: 'plant', label: 'Plant' },
				{ value: 'undead', label: 'Undead' }
			]
		}
	]
};

// IClassDefinition for Monk:
export const monkClass: IClassDefinition = {
	id: 'monk',
	name: 'Monk',
	description:
		'Monks are master martial artists that perfect their mind and bodies utilizing the ebb and flow of their inner energy. They use their body as a weapon and can enter into different stances that drastically change their combat abilities.',
	baseHpContribution: 9, // From class table p.143
	startingSP: 1, // From class table p.143
	startingMP: 0,
	skillPointGrantLvl1: 0, // From class table p.143
	tradePointGrantLvl1: 0, // From class table p.143
	combatTraining: ['Weapons', 'Light Armor'], // From p.143 "Monk Martial Path"
	maneuversKnownLvl1: 'All Attack', // From class table p.143
	techniquesKnownLvl1: 0, // From class table p.143
	saveDCBase: 8, // General for Martial Classes
	deathThresholdBase: 10, // General
	moveSpeedBase: 30, // General
	restPointsBase: 4, // General
	gritPointsBase: 2, // General
	initiativeBonusBase: 0, // General
	cantripsKnownLvl1: 0,
	spellsKnownLvl1: 0,
	level1Features: [
		{
			id: 'monk_monk_training',
			name: 'Monk Training',
			level: 1,
			description:
				'Your martial arts training grants you greater offense, defense, and movement. Iron Palm: Your limbs are considered Natural Weapons with the Impact Property that deal 1 Bludgeoning damage. Patient Defense: While you aren’t wearing Armor you gain +2 PD. Step of the Wind: While you aren’t wearing Armor, you gain the following benefits: You gain +1 Speed and Jump Distance. You can move a number of Spaces up to your Speed along vertical surfaces and across liquids without falling during your move. You can use your Prime Modifier instead of Agility to determine your Jump Distance and the damage you take from Falling.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'monk_monk_stance',
			name: 'Monk Stance',
			level: 1,
			description:
				'You learn 2 Monk Stances from the list below. Entering & Exiting: In Combat, at the start of each of your turns you can freely enter or swap into one of your Monk Stances. You can also spend 1 SP on your turn to swap to a different stance. You can end your Stance at any moment for free. You can only be in 1 Monk Stance at a time. Bear Stance, Bull Stance, Cobra Stance, Gazelle Stance, Mantis Stance, Mongoose Stance, Scorpion Stance, Turtle Stance, Wolf Stance.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'monk_meditation',
			name: 'Meditation (Flavor Feature)',
			level: 1,
			description:
				'You can enter a state of meditation during a Short Rest (1 hour) or longer. Choose 1 Charisma or Intelligence Skill. When you complete the Rest, your Skill Mastery level increases by 1 (up to your Skill Mastery Cap) for the chosen Skill until you complete another Short or longer Rest. While meditating, you remain alert to danger.',
			effects: [] // Flavor/narrative effect
		}
	],
	featureChoicesLvl1: [
		{
			id: 'monk_stance_choice',
			prompt: 'Choose 2 Monk Stances:',
			type: 'select_multiple',
			maxSelections: 2,
			options: [
				{ value: 'bear_stance', label: 'Bear Stance' },
				{ value: 'bull_stance', label: 'Bull Stance' },
				{ value: 'cobra_stance', label: 'Cobra Stance' },
				{ value: 'gazelle_stance', label: 'Gazelle Stance' },
				{ value: 'mantis_stance', label: 'Mantis Stance' },
				{ value: 'mongoose_stance', label: 'Mongoose Stance' },
				{ value: 'scorpion_stance', label: 'Scorpion Stance' },
				{ value: 'turtle_stance', label: 'Turtle Stance' },
				{ value: 'wolf_stance', label: 'Wolf Stance' }
			]
		}
	]
};

// IClassDefinition for Rogue:
export const rogueClass: IClassDefinition = {
	id: 'rogue',
	name: 'Rogue',
	description:
		'Rogues are skilled, evasive, and cunning. They impose conditions onto enemies, then exploit those weaknesses to inflict even more harm.',
	baseHpContribution: 9, // From class table p.146
	startingSP: 1, // From class table p.146
	startingMP: 0,
	skillPointGrantLvl1: 0, // From class table p.146
	tradePointGrantLvl1: 0, // From class table p.146
	combatTraining: ['Weapons', 'Light Armor', 'Light Shields'], // From p.146 "Rogue Martial Path"
	maneuversKnownLvl1: 'All Attack', // From class table p.146
	techniquesKnownLvl1: 0, // From class table p.146
	saveDCBase: 8, // General for Martial Classes
	deathThresholdBase: 10, // General
	moveSpeedBase: 30, // General
	restPointsBase: 4, // General
	gritPointsBase: 2, // General
	initiativeBonusBase: 0, // General
	cantripsKnownLvl1: 0,
	spellsKnownLvl1: 0,
	level1Features: [
		{
			id: 'rogue_debilitating_strike',
			name: 'Debilitating Strike',
			level: 1,
			description:
				'When you make an Attack with a Weapon, you can spend 1 SP to force the target to make a Physical Save against your Save DC. Save Failure: Until the start of your next turn, the target suffers 1 of the following effects of your choice: Deafened, Exposed, Hindered, or Slowed 2. A target can’t be affected by the same option more than once at a time.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'rogue_roguish_finesse',
			name: 'Roguish Finesse',
			level: 1,
			description:
				'Cunning Action: You gain movement equal to half your Speed when you take the Disengage, Feint, or Hide Actions. You can use this movement immediately before or after you take the Action. Skill Expertise: Your Skill Mastery Limit increases by 1, up to Grandmaster (+10). A Skill can only benefit from one increase to its Mastery limit. Multi-Skilled: You gain 1 Skill Point.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'rogue_cypher_speech',
			name: 'Cypher Speech (Flavor Feature)',
			level: 1,
			description:
				'You become Fluent in a Mortal Language of your choice. Additionally, you understand how to speak in code with a specific demographic of your choice (such as upper society, lower society, a faction, etc.). Your coded messages can be concealed in normal conversation and written communications. This allows you to leave simple messages such as “Safety”, “Threat”, or “Wealth”, or mark the location of a cache, a secret passageway, a safehouse, or an area of danger.',
			effects: [] // Flavor/narrative effect
		}
	],
	featureChoicesLvl1: [
		{
			id: 'rogue_cypher_language',
			prompt: 'Choose a Mortal Language:',
			type: 'select_one',
			// Placeholder, as the list is not in this file
			options: [{ value: 'common', label: 'Common' }]
		},
		{
			id: 'rogue_cypher_demographic',
			prompt: 'Choose a demographic for Cypher Speech:',
			type: 'select_one',
			options: [
				{ value: 'upper_society', label: 'Upper Society' },
				{ value: 'lower_society', label: 'Lower Society' },
				{ value: 'faction', label: 'A Faction' }
			]
		}
	]
};

// IClassDefinition for Spellblade:
export const spellbladeClass: IClassDefinition = {
	id: 'spellblade',
	name: 'Spellblade',
	description:
		'Spellblades combine their combat prowess with their ability to harness and channel magic into weapons. They can form a bond with a weapon to imbue it with damage, call it back to them, and more. Spellblades can learn a wide range of disciplines depending on their unique combination of martial and spellcasting prowess. They even gain the ability to cast spells through their weapons.',
	baseHpContribution: 9, // From class table p.153
	startingSP: 1, // From class table p.153
	startingMP: 3, // From class table p.153
	skillPointGrantLvl1: 0, // From class table p.153
	tradePointGrantLvl1: 0, // From class table p.153
	combatTraining: ['Weapons', 'Light Armor', 'Light Shields'], // From p.153 "Spellblade Martial Path"
	maneuversKnownLvl1: 'All Attack', // From class table p.153
	techniquesKnownLvl1: 0, // From class table p.153
	saveDCBase: 8, // General for Hybrid Classes
	deathThresholdBase: 10, // General
	moveSpeedBase: 30, // General
	restPointsBase: 4, // General
	gritPointsBase: 2, // General
	initiativeBonusBase: 0, // General
	cantripsKnownLvl1: 1, // From class table p.153
	spellsKnownLvl1: 1, // From class table p.153
	level1Features: [
		{
			id: 'spellblade_bound_weapon',
			name: 'Bound Weapon',
			level: 1,
			description:
				'During a Quick Rest, you can magically bond with 1 Weapon and choose an Elemental or Mystical damage type to become your Bound Damage type. This bond lasts until you end it for free or use this feature again. Your Bound Weapon gains the following properties: Smite, Illuminate, Recall. Ending Early: Your bond with the Weapon ends early if you use this Feature again, or you choose to end it for free.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'spellblade_spellblade_disciplines',
			name: 'Spellblade Disciplines',
			level: 1,
			description:
				'You learn 2 Spellblade Disciplines from the list below. Magus, Warrior, Acolyte, Hex Warrior, Spell Breaker, Spell Warder, Blink Blade.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'spellblade_sense_magic',
			name: 'Sense Magic (Flavor Feature)',
			level: 1,
			description:
				'You can spend 1 minute focusing your mind to detect the following creature types within 20 Spaces: Aberration, Celestial, Elemental, Fey, Fiend, or Undead. Make a Spell Check against each creature’s Mental Save. Check Success: You learn the target’s creature type and know its location until the end of your next turn. Check Failure: You learn nothing and can’t use this Feature against the target again until you complete a Long Rest.',
			effects: [] // Flavor/narrative effect
		}
	],
	featureChoicesLvl1: [
		{
			id: 'spellblade_bound_damage',
			prompt: 'Choose your Bound Damage type:',
			type: 'select_one',
			options: [
				{ value: 'elemental', label: 'Elemental' },
				{ value: 'mystical', label: 'Mystical' }
			]
		},
		{
			id: 'spellblade_disciplines_choice',
			prompt: 'Choose 2 Spellblade Disciplines:',
			type: 'select_multiple',
			maxSelections: 2,
			options: [
				{ value: 'magus', label: 'Magus' },
				{ value: 'warrior', label: 'Warrior' },
				{ value: 'acolyte', label: 'Acolyte' },
				{ value: 'hex_warrior', label: 'Hex Warrior' },
				{ value: 'spell_breaker', label: 'Spell Breaker' },
				{ value: 'spell_warder', label: 'Spell Warder' },
				{ value: 'blink_blade', label: 'Blink Blade' }
			]
		}
	]
};

// IClassDefinition for Warlock:
export const warlockClass: IClassDefinition = {
	id: 'warlock',
	name: 'Warlock',
	description:
		'Warlocks make a pact with a powerful entity that grants them magic. Their body and soul are a part of this contract and as such, they can tap into their own life force to enhance and amplify their magic and capabilities as well as drain the life force of other living creatures. They also choose a type of pact to be made that grants more powers.',
	baseHpContribution: 9, // From class table p.158
	startingSP: 0, // From class table p.158
	startingMP: 6, // From class table p.158
	skillPointGrantLvl1: 0, // From class table p.158
	tradePointGrantLvl1: 0, // From class table p.158
	combatTraining: ['Light Armor'], // From p.158 "Warlock Spellcasting Path"
	maneuversKnownLvl1: 0, // From class table p.158
	techniquesKnownLvl1: 0, // From class table p.158
	saveDCBase: 8, // General for Spellcasters
	deathThresholdBase: 10, // General
	moveSpeedBase: 30, // General
	restPointsBase: 4, // General
	gritPointsBase: 2, // General
	initiativeBonusBase: 0, // General
	cantripsKnownLvl1: 2, // From class table p.158
	spellsKnownLvl1: 3, // From class table p.158
	level1Features: [
		{
			id: 'warlock_warlock_contract',
			name: 'Warlock Contract',
			level: 1,
			description:
				'You have a binding agreement with your patron that allows you to make sacrifices in exchange for boons. Hasty Bargain: Once per turn when you make a Check, you can spend 1 HP to gain ADV on the Check. Desperate Bargain: Once per Combat, you can spend 1 AP to regain an amount of HP equal to your Prime Modifier. When you do, you become Exposed until the end of your next turn.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'warlock_pact_boon',
			name: 'Pact Boon',
			level: 1,
			description:
				'You gain a Pact Boon from your Patron. Choose 1 of the following options: Weapon, Armor, Cantrip, or Familiar.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'warlock_beseech_patron',
			name: 'Beseech Patron (Flavor Feature)',
			level: 1,
			description:
				'During a Long Rest, while sleeping or meditating, you can access an Inner Sanctum within your mind. Its appearance is influenced by your psyche and is subject to change. While inside your Inner Sanctum, you can attempt to contact your Patron. If they choose to respond, they enter your mind and you might possibly be able to see or hear them. While connected to your Patron in this way, you’re aware of your surroundings but you can’t take actions or move. Your Patron chooses when to end the connection, or you can make a Mental Save against your own Save DC to force the connection to end.',
			effects: [] // Flavor/narrative effect
		}
	],
	featureChoicesLvl1: [
		{
			id: 'warlock_pact_boon_choice',
			prompt: 'Choose a Pact Boon:',
			type: 'select_one',
			options: [
				{ value: 'weapon', label: 'Pact of the Weapon' },
				{ value: 'armor', label: 'Pact of the Armor' },
				{ value: 'cantrip', label: 'Pact of the Cantrip' },
				{ value: 'familiar', label: 'Pact of the Familiar' }
			]
		}
	]
};

// IClassDefinition for Wizard:
export const wizardClass: IClassDefinition = {
	id: 'wizard',
	name: 'Wizard',
	description:
		'Wizards learn to master each of the Spell Schools to control them in a structured and efficient way. They utilize sigils on the ground to enhance certain types of magic while they push spells to their limits.',
	baseHpContribution: 8, // From class table p.162
	startingSP: 0, // From class table p.162
	startingMP: 6, // From class table p.162
	skillPointGrantLvl1: 2, // From class table p.162
	tradePointGrantLvl1: 3, // From class table p.162
	combatTraining: ['Light Armor'], // From p.162 "Wizard Spellcasting Path"
	maneuversKnownLvl1: 0, // From class table p.162
	techniquesKnownLvl1: 0, // From class table p.162
	saveDCBase: 8, // General for Spellcasters
	deathThresholdBase: 10, // General
	moveSpeedBase: 30, // General
	restPointsBase: 4, // General
	gritPointsBase: 2, // General
	initiativeBonusBase: 0, // General
	cantripsKnownLvl1: 2, // From class table p.162
	spellsKnownLvl1: 3, // From class table p.162
	level1Features: [
		{
			id: 'wizard_spell_school_initiate',
			name: 'Spell School Initiate',
			level: 1,
			description:
				'You’ve completed training in a specialized School of Magic. Choose a Spell School. You gain the following benefits: School Magic: You learn 1 Arcane Cantrip and 1 Arcane Spell from this Spell School. Signature School: When you cast a Spell from the chosen School, you can reduce its MP cost by 1. Its total MP cost before the reduction still can’t exceed your Mana Spend Limit. You can use this Feature once per Long Rest, but regain the ability to use it again when you roll for Initiative.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'wizard_arcane_sigil',
			name: 'Arcane Sigil',
			level: 1,
			description:
				'You can spend 1 AP and 1 MP to create a 1 Space diameter Arcane Sigil on the ground beneath you that lasts for 1 minute. When you create an Arcane Sigil choose 1 Spell School (Enchantment, Necromancy, Protection, etc.) or 1 Spell Tag (Fire, Cold, Teleportation, etc.). The Arcane Sigil radiates magic of the chosen type. Using a Sigil: While a creature is within the area of your Arcane Sigil, it has ADV on Spell Checks to cast or produce the effects of Spells with the chosen Spell School or Spell Tag. Moving a Sigil: You can spend 1 AP to teleport one of your Sigils within 10 spaces to your current space, but multiple Sigils can’t coexist in the same Space.',
			effects: [] // Complex effects, likely handled in logic
		},
		{
			id: 'wizard_ritual_caster',
			name: 'Ritual Caster (Flavor Feature)',
			level: 1,
			description:
				'You learn 1 Arcane Spell with the Ritual Spell Tag each time you gain a Wizard Class Feature (including this one). You can only gain this benefit once per Level. Additionally, when you encounter an Arcane Spell with the Ritual Spell Tag in a form you can study (such as a spellbook, a spell scroll, or from an instructor), you can spend a number of hours equal to the Spell’s base MP cost to learn it. You can only cast Spells you learn with this feature as Rituals, unless you learned it from another source.',
			effects: [] // Flavor/narrative effect
		}
	],
	featureChoicesLvl1: [
		{
			id: 'wizard_spell_school_choice',
			prompt: 'Choose a Spell School:',
			type: 'select_one',
			options: Object.values(SpellSchool).map((school) => ({ value: school, label: school }))
		}
	]
};

export const classesData: IClassDefinition[] = [
	barbarianClass,
	sorcererClass,
	bardClass,
	championClass,
	clericClass,
	commanderClass,
	druidClass,
	hunterClass,
	monkClass,
	rogueClass,
	spellbladeClass,
	warlockClass,
	wizardClass
	// Add other classes here as they are populated
];
