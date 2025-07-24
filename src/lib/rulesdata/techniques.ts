/**
 * @file techniques.ts
 * @description Contains the schemas and a complete list of all Martial Techniques
 * from the DC20 Beta 0.9.5 rulebook (pages 51-53).
 */

//==============================================================================
// SCHEMAS / TYPES
//==============================================================================

/**
 * Represents the resource cost of a technique or its enhancement.
 */
export interface MartialAbilityCost {
	ap?: number;
	sp?: number;
}

/**
 * The blueprint for a Technique's optional enhancement.
 */
export interface TechniqueEnhancement {
	name: string;
	cost: {
		ap?: number;
		sp: number;
	};
	description: string;
}

/**
 * The definitive blueprint for a single Technique object.
 */
export interface Technique {
	name: string;
	cost: MartialAbilityCost;
	description: string;
	isReaction: boolean;
	trigger?: string;
	requirement?: string;
	enhancements: TechniqueEnhancement[];
}

//==============================================================================
// TECHNIQUE DATA
//==============================================================================

/**
 * A comprehensive list of all martial techniques available in the game.
 */
export const techniques: Technique[] = [
	{
		name: 'Forbearance',
		cost: { ap: 1, sp: 1 },
		isReaction: true,
		trigger: 'When a creature you can see within 1 Space is targeted by an Attack.',
		description:
			'You become the new target of the Check, and choose to switch places with the original target (if it’s willing). If the Check is accompanied by a Save, you make the Save instead of the original target.',
		enhancements: [
			{
				name: 'Steadfast Forbearance',
				cost: { sp: 1 },
				description:
					'If multiple creatures within 1 Space of you are targeted by the same Check, you can attempt to protect them as well. You can spend 1 SP per additional target to become the new target of its Check as well. You take the collective damage of all protected creatures against the Check.'
			},
			{
				name: 'Immense Defense',
				cost: { sp: 2 },
				description: 'You gain Resistance (Half) against all damage taken using this Technique.'
			}
		]
	},
	{
		name: 'Heroic Bash',
		cost: { ap: 1, sp: 1 },
		isReaction: false,
		requirement: 'Melee Weapon or Unarmed Strike',
		description:
			"Using a Melee Weapon (or Unarmed Strike) you can attempt to send an enemy hurling through the air. Make an Attack Check against the PD of a target within 1 Space of you, and it makes a Physical Save against your Save DC. Attack Hit: It takes your Weapon's (or Unarmed Strike) damage. Save Failure: It gets knockback horizontally up to 3 Spaces + 1 additional Space for every 5 it fails the Save by.",
		enhancements: [
			{
				name: 'Extended Knockback',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to increase the Knockback distance by 2 Spaces and increase the damage by 1.'
			},
			{
				name: 'Painful Knockback',
				cost: { sp: 1 },
				description: 'You can spend 1 SP to increase the damage by 2.'
			},
			{
				name: 'Bash & Smash',
				cost: { ap: 1, sp: 1 },
				description:
					'You can spend an additional 1 AP and 1 SP to change the Target from one creature to every creature’s PD within 1 Space.'
			}
		]
	},
	{
		name: 'Heroic Leap',
		cost: { ap: 1, sp: 1 },
		isReaction: false,
		requirement: 'Melee Weapon or Unarmed Strike',
		description:
			'You perform an exceptional leap and assault a creature. You gain up to your Speed in Spaces and increase your Jump Distance by 1 on the next Long or Vertical Jump you make. You leap into the air and make an Attack Check against the PD of a target within 1 Space of where you land, and it makes a Physical Save against your Save DC. Attack Hit: It takes your Weapon (or Unarmed Strike) damage. Save Failure: The target falls Prone.',
		enhancements: [
			{
				name: 'Brutal Leap',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to transfer all of the Falling damage you would usually take into the target instead.'
			},
			{
				name: 'Far Leap',
				cost: { sp: 1 },
				description: 'You can spend 1 SP to increase your damage by 1 and your Jump Distance by 2.'
			},
			{
				name: 'Heroic Slam',
				cost: { ap: 1, sp: 1 },
				description:
					'You can spend 1 AP and 1 SP to compare your Attack Check against the AD of all creatures within 1 Space of where you land (instead of a single target).'
			}
		]
	},
	{
		name: 'Heroic Parry',
		cost: { ap: 1, sp: 1 },
		isReaction: true,
		trigger:
			'You or a creature you can see within 1 Space are targeted by an Attack against its PD.',
		description: 'You grant the target a +5 bonus to its PD until the start of its next turn.',
		enhancements: [
			{
				name: 'Heroic Disengage',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to allow the target to Disengage and move up to half its Speed after the Attack.'
			}
		]
	},
	{
		name: 'Heroic Taunt',
		cost: { ap: 1, sp: 1 },
		isReaction: false,
		description:
			'You attempt to Taunt all enemies within 5 Spaces. Make an Attack Check or Intimidation Check (your choice) contested by each target’s Mental Save. Contest Success: Each creature you beat is Taunted (DisADV on Attack and Spell Checks against creatures other than you) by you until the end of your next turn.',
		enhancements: [
			{
				name: 'Legendary Taunt',
				cost: { sp: 2 },
				description:
					'You can spend 2 SP to have any damage dealt by Taunted enemies to be halved against any creatures other than you.'
			}
		]
	},
	{
		name: 'Slip Away',
		cost: { ap: 1, sp: 1 },
		isReaction: true,
		trigger: 'A Creature misses you with an Attack.',
		description: 'You take the Full Dodge Action and move up to your Speed.',
		enhancements: [
			{
				name: 'Diving Attack',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to make an Attack Check against a creature within 1 Space of you as part of Slip Away (you make this attack before the creature makes theirs).'
			}
		]
	},
	{
		name: 'Sunder Armor',
		cost: { ap: 1, sp: 1 },
		isReaction: false,
		description:
			'You make a Martial Attack against a creature’s PD. Hit: Until the start of your next turn, the target gains Vulnerability (1) to a damage type dealt by the Attack.',
		enhancements: []
	},
	{
		name: 'Tumble and Dive',
		cost: { ap: 2, sp: 1 },
		isReaction: true,
		trigger: 'You are the target of an Attack.',
		description:
			'You move up to your Speed and avoid the attack entirely as long as you end your movement outside the range or behind Full Cover of the Attack. Additional Opportunity Attacks are still able to be made against you.',
		enhancements: [
			{
				name: 'Heroic Dive',
				cost: { sp: 2 },
				description:
					'You can spend 2 SP to bring a willing creature within 1 Space along with you as part of Tumble and Dive. They move the same amount of Spaces as you and must also end their movement within 1 Space of you.'
			}
		]
	},
	{
		name: 'Volley',
		cost: { ap: 2, sp: 1 },
		isReaction: false,
		requirement: 'Ranged Weapon',
		description:
			'You launch a volley of projectiles. Choose a point within your Weapon’s range. Make a single Attack Check and compare it against the AD of all creatures of your choice within 1 Space of the chosen point. Attack Hit: You deal 2 damage of the Weapon’s type to each creature.',
		enhancements: [
			{
				name: 'Impairing Volley',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to cause each creature within the area to make a Physical Save against your Save DC. Failure: They’re Impaired (DisADV on Physical Checks) until the end of your next turn.'
			},
			{
				name: 'Blanket of Arrows',
				cost: { sp: 1 },
				description: 'You can spend 1 SP to increase the area to 3 Spaces from the chosen point.'
			},
			{
				name: 'Line of Arrows',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to also target each creature occupying a Space in a Line between you and the chosen point.'
			}
		]
	},
	{
		name: 'Whirlwind',
		cost: { ap: 2, sp: 1 },
		isReaction: false,
		requirement: 'Melee Weapon or Unarmed Strike',
		description:
			'You make a single Attack Check against the AD of all creatures of your choice within 1 Space of you. Attack Hit: You deal your Weapon (or Unarmed Strike) damage to each creature.',
		enhancements: [
			{
				name: 'Blood Whirl',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to force each creature targeted to make a Physical Save against your Save DC. Failure: They begin Bleeding.'
			},
			{
				name: 'Wide Swing',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to increase the range of Whirlwind by 1 Space, targeting each creature of your choice within 2 Spaces of you.'
			},
			{
				name: 'Throwing Finisher',
				cost: { sp: 1 },
				description:
					'If you’re wielding a Melee Weapon, you can choose to spend an extra 1 SP at the end of the Whirlwind to throw the Weapon at a target within 5 Spaces. Use the same single Attack Check against this target as well. The weapon lands within 1 Space of the target (GM discretion).'
			}
		]
	}
];

/** A simple alias for the main techniques array. */
export const allTechniques = techniques;
