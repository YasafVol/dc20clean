/**
 * Maneuvers - DC20 v0.10
 *
 * 28 maneuvers organized by type:
 * - Attack (10) - Offensive strikes and area attacks
 * - Defense (7) - Protection and damage mitigation
 * - Grapple (4) - Close-quarters control
 * - Utility (7) - Movement and battlefield control
 *
 * Note: Techniques have been REMOVED in v0.10 - only Maneuvers remain.
 * Generated from docs/assets/DC20 0.10 full.md
 */

import type { Maneuver, ManeuverEnhancement } from '../schemas/maneuver.schema';
import { ManeuverType } from '../schemas/maneuver.schema';

export const maneuvers: Maneuver[] = [
	{
		id: 'heroic-bash',
		name: 'Heroic Bash',
		type: ManeuverType.Attack,
		cost: { ap: 1, sp: 1 },
		range: 'Weapon or Unarmed Strike',
		description:
			"Make a Melee Martial Attack against the PD of a target within range, and it makes a Might Save against your Save DC. Hit: The target takes the damage of your Weapon or Unarmed Strike. Save Failure: The target is pushed 1 Space away from you. Save Failure (each 5): The target is pushed up to 1 additional Space. Knock Prone: After the result, you can choose to reduce the total distance a target is pushed by 1 Space to knock them Prone instead. Airborne: When you choose to push them upward into the air, the distance they're pushed is halved.",
		isReaction: false,
		enhancements: [
			{
				name: 'Increased Distance',
				costString: '1 SP, Repeatable',
				sp: 1,
				repeatable: true,
				description: 'The distance pushed increases by 1 Space.'
			},
			{
				name: 'Bowling Ball',
				costString: '1 SP',
				sp: 1,
				description:
					'If the target collides with another creature as part of this movement, they both take Collision Damage as normal, and the creature it collides with must make a Might Save against your Save DC. Save Failure: The target is knocked Prone. Save Failure (each 5): The target is also pushed 1 Space away from you.'
			}
		]
	},
	{
		id: 'savage-strike',
		name: 'Savage Strike',
		type: ManeuverType.Attack,
		cost: { ap: 1, sp: 1 },
		range: 'Weapon or Unarmed Strike',
		description:
			'Make a Martial Attack against the PD of a target within range, and it makes a Repeated Physical Save against your Save DC. Hit: The target takes the damage of your Weapon or Unarmed Strike. Save Failure: The target becomes Impaired for 1 minute or begins Bleeding (your choice).',
		isReaction: false,
		enhancements: [
			{
				name: 'Improved Bleed',
				costString: '1 SP, Repeatable',
				sp: 1,
				repeatable: true,
				description: 'The target gains a stack of Bleeding.'
			},
			{
				name: 'Improved Impaired',
				costString: '1 SP, Repeatable',
				sp: 1,
				repeatable: true,
				description: 'The target gains a stack of Impaired.'
			},
			{
				name: 'Weakened',
				costString: '2 SP',
				sp: 2,
				description: 'The target gains a stack of Weakened.'
			}
		]
	},
	{
		id: 'sunder-strike',
		name: 'Sunder Strike',
		type: ManeuverType.Attack,
		cost: { ap: 1, sp: 2 },
		range: 'Weapon or Unarmed Strike',
		description:
			'Make a Martial Attack against the PD of a target within range, and it makes a Physical Save against your Save DC. Hit: The target takes the damage of your Weapon or Unarmed Strike. Save Failure: The target gains Physical Vulnerability (1) for 1 Round.',
		isReaction: false,
		enhancements: [
			{
				name: 'Improved Vulnerability',
				costString: '2 SP, Repeatable',
				sp: 2,
				repeatable: true,
				description: 'The Vulnerability increases by 1.'
			},
			{
				name: 'Break DR',
				costString: '1 SP',
				sp: 1,
				description: "The target doesn't benefit from PDR for the duration."
			},
			{
				name: 'Break Resistance',
				costString: '2 SP',
				sp: 2,
				description: "The target doesn't benefit from Physical Resistance for the duration."
			}
		]
	},
	{
		id: 'swift-strike',
		name: 'Swift Strike',
		type: ManeuverType.Attack,
		cost: { ap: 1, sp: 1 },
		range: 'Weapon or Unarmed Strike',
		description:
			'You move a number of Spaces up to your Speed and make a Melee Martial Attack against the PD of 1 target within your Melee Range at any point during this movement. Hit: The target takes the damage of your Weapon or Unarmed Strike.',
		isReaction: false,
		enhancements: [
			{
				name: 'Disengage',
				costString: '1 SP',
				sp: 1,
				description: "This movement doesn't provoke Opportunity Attacks."
			},
			{
				name: 'Subsequent Strike',
				costString: '1 AP and 1 SP, Repeatable',
				sp: 1,
				ap: 1,
				repeatable: true,
				description:
					'You gain additional movement equal to half your Speed and you can target an additional creature using the same Attack Check.'
			}
		]
	},
	{
		id: 'meteor-strike',
		name: 'Meteor Strike',
		type: ManeuverType.Attack,
		cost: { ap: 1, sp: 1 },
		range: 'Weapon or Unarmed Strike',
		description:
			"Your Jump Distance increases by 2, you Jump up to your Jump Distance without spending movement (provided you can move), and make a Melee Martial Attack against a target within range at any point during your jump or where you land. Reaction: You can spend an additional 1 SP to perform this Maneuver as a Reaction to a creature being forcibly moved into a Space within your Jump Distance that's at least 1 Space above the ground. DC Tip: Remember, your Long Jump Distance equals your Jump Distance in Spaces, and your High Jump distance equals your Jump Distance in feet.",
		isReaction: true,
		enhancements: [
			{
				name: 'Slam Down',
				costString: '1 SP, Repeatable',
				sp: 1,
				repeatable: true,
				description:
					'If the target is in the air, it makes a Physical Save against your Save DC. Save Failure: The creature is knocked downward 2 Spaces.'
			},
			{
				name: 'Falling Strike',
				costString: '1 SP',
				sp: 1,
				description:
					'The creature makes a Physical Save against your Save DC. Save Failure: The creature falls Prone.'
			},
			{
				name: 'Impact Crater',
				costString: '1 AP + 1 SP',
				sp: 1,
				ap: 1,
				description:
					'All creatures within 1 Space of where you land must make a Physical Save against your Save DC. Save Failure: The creature falls Prone.'
			}
		]
	},
	{
		id: 'cleave',
		name: 'Cleave',
		type: ManeuverType.Attack,
		cost: { ap: 2 },
		range: '1 Space Arc (Self)',
		description:
			'Make an Area Martial Attack against the AD of every target within range. Hit: The target takes the damage of your Weapon or Unarmed Strike. Reach Weapon: If you have a Reach Weapon, you can extend the Point of Origin 1 Space away from you. The Arc must still be facing away from you.',
		isReaction: false,
		enhancements: [
			{
				name: 'Damage',
				costString: '2 SP, Repeatable',
				sp: 2,
				repeatable: true,
				description: 'The damage increases by 1.'
			},
			{
				name: 'Area',
				costString: '2 SP, Repeatable',
				sp: 2,
				repeatable: true,
				description: 'The Arc increases by 1 Space.'
			},
			{
				name: 'Careful Cleave',
				costString: '1 SP, Repeatable',
				sp: 1,
				repeatable: true,
				description: 'You can choose 1 target in the area to avoid with the Attack.'
			}
		]
	},
	{
		id: 'whirlwind',
		name: 'Whirlwind',
		type: ManeuverType.Attack,
		cost: { ap: 2, sp: 1 },
		range: '1 Space Aura',
		description:
			"Make an Area Martial Attack using a Melee Weapon or Unarmed Strike against the AD of every target within range. Hit: The target takes the damage of your Weapon or Unarmed Strike. Reach Weapon: If you have a Reach Weapon, you can choose to increase the Aura by 1 Space. When you do, you can't Attack targets within 1 Space of you.",
		isReaction: false,
		enhancements: [
			{
				name: 'Damage',
				costString: '2 SP, Repeatable',
				sp: 2,
				repeatable: true,
				description: 'The damage increases by 1.'
			},
			{
				name: 'Area',
				costString: '2 SP, Repeatable',
				sp: 2,
				repeatable: true,
				description: 'The Aura increases by 1 Space.'
			},
			{
				name: 'Vortex',
				costString: '2 SP, Repeatable',
				sp: 2,
				repeatable: true,
				description:
					'Each target makes a Might Save. Save Failure: The target is pushed up to 1 Space horizontally in a direction of your choice. The target is moved 1 additional Space each time you use this Enhancement.'
			}
		]
	},
	{
		id: 'pathcarver',
		name: 'Pathcarver',
		type: ManeuverType.Attack,
		cost: { ap: 2, sp: 1 },
		range: '4 Space Line (Self)',
		description:
			'Make an Area Martial Attack with a Melee Weapon or Unarmed Strike against the AD of every target in a 4 Space Line. Hit: The target takes the damage of your Weapon or Unarmed Strike. After Attacking, you can move to any Space within 1 Space of the area without provoking Opportunity Attacks from the targets and without spending your movement. Reach Weapon: If you have a Reach Weapon, you can extend the Point of Origin 1 Space away from you. When you do, the Line must extend in a direction away from you.',
		isReaction: false,
		enhancements: [
			{
				name: 'Damage',
				costString: '2 SP, Repeatable',
				sp: 2,
				repeatable: true,
				description: 'The damage increases by 1.'
			},
			{
				name: 'Increase Length',
				costString: '1 SP, Repeatable',
				sp: 1,
				repeatable: true,
				description: 'The length of the Line increases by 2 Spaces.'
			},
			{
				name: 'Carved Path',
				costString: '2 SP, Repeatable',
				sp: 2,
				repeatable: true,
				description:
					'Each target makes a Might Save. Save Failure: The target is pushed 1 Space horizontally out of the area in a direction of your choice. The target is moved 1 additional Space each time you use this Enhancement.'
			}
		]
	},
	{
		id: 'piercing-shot',
		name: 'Piercing Shot',
		type: ManeuverType.Attack,
		cost: { ap: 2 },
		range: 'Ranged Weapon',
		description:
			"Make an Area Martial Attack against the AD of every target within a 4 Space Line that's Point of Origin is within Range. The Line must extend away from you. Hit: The target takes the damage of your Weapon.",
		isReaction: false,
		enhancements: [
			{
				name: 'Damage',
				costString: '2 SP, Repeatable',
				sp: 2,
				repeatable: true,
				description: 'The damage increases by 1.'
			},
			{
				name: 'Area',
				costString: '1 SP, Repeatable',
				sp: 1,
				repeatable: true,
				description: 'The length of the Line increases by 3 Spaces.'
			},
			{
				name: 'Penetrating Shot',
				costString: '1 SP',
				sp: 1,
				description:
					'The Attack ignores Cover but is blocked by 6 inches (15 cm) of wood or soft earth (dirt, mud, or sand), or 1 inch (25 mm) of metal or rock.'
			}
		]
	},
	{
		id: 'volley',
		name: 'Volley',
		type: ManeuverType.Attack,
		cost: { ap: 2 },
		range: 'Ranged Weapon',
		description:
			"Make an Area Martial Attack against the AD of every target within a 2 Space Diameter Sphere that's Point of Origin is within Range. Hit: The target takes the damage of your Weapon.",
		isReaction: false,
		enhancements: [
			{
				name: 'Damage',
				costString: '2 SP, Repeatable',
				sp: 2,
				repeatable: true,
				description: 'The damage increases by 1.'
			},
			{
				name: 'Area',
				costString: '2 SP, Repeatable',
				sp: 2,
				repeatable: true,
				description: 'The Diameter of the Sphere increases by 1 Space.'
			},
			{
				name: 'Rain of Fire',
				costString: '1 SP',
				sp: 1,
				description:
					"Targets within the area don't gain the benefits of 1/2 Cover against this Attack."
			},
			{
				name: 'Suppressive Fire',
				costString: '2 SP',
				sp: 2,
				description:
					'Each creature makes a Charisma Save. Save Failure: The creature becomes Hindered until the end of their next turn.'
			}
		]
	},
	{
		id: 'parry',
		name: 'Parry',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		range: 'Self (or 1 Space if wielding a Melee Weapon or Shield)',
		description: 'You deflect an attack.',
		isReaction: true,
		trigger:
			'A target you can see within range (including yourself) is targeted by an Attack against its PD.',
		enhancements: [
			{
				name: 'Alert',
				costString: '1 SP',
				sp: 1,
				description: "The Attacker's next Attack this turn against the target has DisADV."
			},
			{
				name: 'Disarm',
				costString: '1 SP',
				sp: 1,
				description:
					'If the Attacker is within 1 Space of you or the target, they make a Physical Save. Save Failure: The target drops the Weapon used for the Attack to the ground once the Attack is resolved. Save Failure (5): You gain possession of the Weapon, provided you have a free hand to hold it.'
			}
		]
	},
	{
		id: 'brace',
		name: 'Brace',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		range: 'Self (or 1 Space if wielding a Shield)',
		description: 'You stand firm against an attack.',
		isReaction: true,
		trigger:
			'A target you can see within range (including yourself) is targeted by an Attack against its AD.',
		enhancements: [
			{
				name: 'Targets',
				costString: '1 AP, Repeatable',
				ap: 1,
				repeatable: true,
				description:
					"You can target 1 additional creature within range that's also targeted by the same Attack."
			},
			{
				name: 'Grapple',
				costString: '1 SP',
				sp: 1,
				description:
					'If the Attacker is within 1 Space of you, they make a Physical Save. Save Failure: The Attacker becomes Grappled by you once the Attack is resolved.'
			}
		]
	},
	{
		id: 'side-step',
		name: 'Side Step',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		range: 'Self',
		description: 'You avoid an enemy attack by quick repositioning.',
		isReaction: true,
		trigger: "You're targeted by an Attack.",
		enhancements: [
			{
				name: 'Evasion',
				costString: '1 SP',
				sp: 1,
				description: 'You gain ADV on any Saves imposed by the Attack.'
			},
			{
				name: 'Disengage',
				costString: '1 SP',
				sp: 1,
				description: "Movement made as part of this Maneuver doesn't provoke Opportunity Attacks."
			},
			{
				name: 'Slip Away',
				costString: '1 SP',
				sp: 1,
				description:
					'You can move up to your Speed instead of 1 Space and you no longer need to stay in range of the Attack.'
			}
		]
	},
	{
		id: 'protect',
		name: 'Protect',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		range: '1 Space',
		description: 'You take damage for a nearby ally.',
		isReaction: true,
		trigger: 'A target you can see within range is Hit by an Attack.',
		enhancements: [
			{
				name: 'Targets',
				costString: '1 AP, Repeatable',
				ap: 1,
				repeatable: true,
				description:
					"You can target 1 additional creature within range that's also targeted by the same Attack."
			},
			{
				name: 'Taunt',
				costString: '1 SP',
				sp: 1,
				description:
					"The attacker makes a Charisma Save. Save Failure: They're Taunted by you for 1 Round."
			},
			{
				name: 'Heroic Protect',
				costString: '2 SP',
				sp: 2,
				description:
					'You become the target of the Attack, taking all of the damage and effects instead of the target. If the Attack is accompanied by a Save (as with a Dynamic Attack Save), you make the Save instead of the target.'
			},
			{
				name: 'Resistance',
				costString: '1 SP',
				sp: 1,
				description:
					'You gain Resistance (Half) to any damage you take from using this Maneuver. The cost of this Enhancement increases by 1 SP if you use the Heroic Protect Enhancement.'
			}
		]
	},
	{
		id: 'endure',
		name: 'Endure',
		type: ManeuverType.Defense,
		cost: { ap: 1, sp: 1 },
		range: 'Self (or 1 Space if wielding a Shield)',
		description: 'You push through an attack.',
		isReaction: true,
		trigger: 'A target you can see within range (including yourself) is Hit by an Attack.',
		enhancements: [
			{
				name: 'Heroic Endure',
				costString: '1 SP, Repeatable',
				sp: 1,
				repeatable: true,
				description: 'The target takes 1 less damage from the Attack.'
			},
			{
				name: 'Steadfast',
				costString: '1 SP',
				sp: 1,
				description: "The target isn't Vulnerable to damage from the Attack."
			},
			{
				name: 'Repel',
				costString: '1 SP',
				sp: 1,
				description:
					'After the Attack, if the Attacker is within 1 Space of you or the target, they make a Might Save against your Save DC. Save Failure: They are pushed 1 Space away. Save Failure (each 5): +1 Space pushed.'
			}
		]
	},
	{
		id: 'resolve',
		name: 'Resolve',
		type: ManeuverType.Defense,
		cost: { ap: 1, sp: 1 },
		range: 'Self',
		description:
			'Make a DC 10 Martial Check. Failure: You gain 1 Temp HP for 1 Round. Success: You gain 2 Temp HP for 1 Round. Success (each 5): +1 Temp HP.',
		isReaction: false,
		enhancements: [
			{
				name: 'Increased Temp HP',
				costString: '1 SP',
				sp: 1,
				description: 'You gain + 2 Temp HP.'
			},
			{
				name: 'Physical Resolve',
				costString: '1 SP',
				sp: 1,
				description: 'You gain ADV on Physical Saves for the duration.'
			},
			{
				name: 'Mental Resolve',
				costString: '1 SP',
				sp: 1,
				description: 'You gain ADV on Mental Saves for the duration.'
			}
		]
	},
	{
		id: 'swap',
		name: 'Swap',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		range: '1 Space',
		description:
			'You swap Spaces with a willing creature within range. If you or the target creature provoke Opportunity Attacks as a result of swapping Spaces, those Attacks are all made against you. Reaction: You can spend an additional 1 SP to perform this Maneuver as a Reaction in response to a creature within 1 Space being Attacked. When you do, you also impose DisADV on the Attack against them.',
		isReaction: true,
		enhancements: [
			{
				name: 'Escape',
				costString: '1 SP',
				sp: 1,
				description: 'The target can immediately move up to its Speed after swapping Spaces.'
			},
			{
				name: 'Seamless Swap',
				costString: '1 SP',
				sp: 1,
				description: "Swapping Spaces doesn't provoke any Opportunity Attacks."
			}
		]
	},
	{
		id: 'slam',
		name: 'Slam',
		type: ManeuverType.Grapple,
		cost: { ap: 1 },
		range: 'Melee',
		description:
			"Make a Melee Martial Attack against the target's AD. Hit: The target takes 1 Bludgeoning damage.",
		isReaction: false,
		enhancements: [
			{
				name: 'Multi-Slam',
				costString: '1 AP + 1 SP, Repeatable',
				sp: 1,
				ap: 1,
				repeatable: true,
				description: 'This Attack targets another creature you have Grappled.'
			},
			{
				name: 'Charging Slam',
				costString: '1 AP + 1 SP, Repeatable',
				sp: 1,
				ap: 1,
				repeatable: true,
				description:
					'You move up to your Speed pulling the Grappled creatures with you. 1 Grappled creature takes additional damage equal to the number of Spaces moved as you slam them.'
			},
			{
				name: 'Wall Rake',
				costString: '1 AP + 1 SP, Repeatable',
				sp: 1,
				ap: 1,
				repeatable: true,
				description:
					'You slam 1 Grappled creature into a wall within 1 Space and move up to your Speed along the wall, ending your movement within 1 Space of the wall. The target makes a Repeated Might Save against your Save DC. Save Failure: They gain 1 stack of Bleeding per Space moved.'
			}
		]
	},
	{
		id: 'restrain',
		name: 'Restrain',
		type: ManeuverType.Grapple,
		cost: { ap: 1, sp: 1 },
		range: 'Melee',
		description:
			"You make a Martial Check against the target's Repeated Physical Save. Contest Success: The target is Restrained until the Grapple ends or they succeed on their Repeated Save. DC Tip: A creature can spend 1 AP to attempt to break a Grapple (see 'Grapple' on page 43 for more information).",
		isReaction: false,
		enhancements: [
			{
				name: 'Prone',
				costString: '1 SP',
				sp: 1,
				description:
					"The target also falls Prone (you don't fall Prone unless you choose to do so)."
			},
			{
				name: 'Chokehold',
				costString: '2 SP',
				sp: 2,
				description:
					"The target also can't speak or breathe until they are no longer Restrained by you."
			}
		]
	},
	{
		id: 'body-block',
		name: 'Body Block',
		type: ManeuverType.Grapple,
		cost: { ap: 1, sp: 1 },
		range: 'Melee',
		description: 'You reposition a grappled creature to shield yourself from damage.',
		isReaction: true,
		trigger: "A creature that's not Grappled by you Hits you with an Attack.",
		enhancements: [
			{
				name: 'Switch',
				costString: '1 SP',
				sp: 1,
				description:
					"After you complete the Reaction, you switch places with the Grappled target. This movement doesn't provoke Opportunity Attacks against either you or the target."
			},
			{
				name: 'Partial Block',
				costString: '1 SP',
				sp: 1,
				description: 'Your portion of the shared damage is reduced to 0.'
			},
			{
				name: 'Full Block',
				costString: '2 SP',
				sp: 2,
				description: 'The Grappled creature takes all the damage from the Attack instead.'
			}
		]
	},
	{
		id: 'throw-creature',
		name: 'Throw Creature',
		type: ManeuverType.Grapple,
		cost: { ap: 1 },
		range: 'Melee',
		description:
			"When you throw a creature using the Throwing rules, you can add the following Maneuver Enhancements. When you do, you're considered to be performing a Maneuver. See 'Throwing' on page 130 for more information. DC Tip: Remember, throwing a creature ends the Grapple.",
		isReaction: false,
		enhancements: [
			{
				name: 'Increased Throw',
				costString: '1 SP, Repeatable',
				sp: 1,
				repeatable: true,
				description: 'The target is thrown 1 Space further.'
			},
			{
				name: 'Skyward',
				costString: '2 SP',
				sp: 2,
				description: "Your throw distance isn't halved for vertical throws."
			},
			{
				name: 'Prone',
				costString: '1 SP',
				sp: 1,
				description: 'The target also falls Prone.'
			}
		]
	},
	{
		id: 'recover',
		name: 'Recover',
		type: ManeuverType.Utility,
		cost: { ap: 1 },
		range: 'Self',
		description:
			'You attempt to spend Rest Points to regain HP equal to the Rest Points spent. Make a DC 15 Martial Check. Failure: You can spend 2 Rest Points. Success: You can spend up to 3 Rest Points. Success (each 5): You can spend 1 additional Rest Point.',
		isReaction: false,
		enhancements: [
			{
				name: 'Increased Healing',
				costString: '1 AP or 1 SP, Repeatable',
				sp: 1,
				ap: 1,
				repeatable: true,
				description: 'You can spend 1 additional Rest Point.'
			},
			{
				name: 'Repeat Save',
				costString: '1 AP or 1 SP',
				sp: 1,
				ap: 1,
				description: "You can repeat a Save against an effect you're subjected to."
			}
		]
	},
	{
		id: 'line-run',
		name: 'Line Run',
		type: ManeuverType.Utility,
		cost: { ap: 2 },
		range: 'Self',
		description:
			"You move in a Line up to your Speed. Make a Martial Check. Each creature within the Line must make a Martial Check contested against your Check when you attempt to move through its Space. Contest Success: You can move through the creature's Space. Contest Failure: You're unable to move through the creature's Space, preventing you from moving any further. Example: You make a Martial Check with a result of 15. If your Speed is 5, you can move up to 5 Spaces in a straight Line. If there are 3 creatures in that Line, your Martial Check of 15 would be compared to a Martial Check each creature makes as you attempt to pass through their Space, one by one. If the first creature in your path gets a 15 or higher, you can't pass through their Space and stop moving.",
		isReaction: false,
		enhancements: [
			{
				name: 'Brush Past',
				costString: '2 SP',
				sp: 2,
				description:
					"The Space of every creature who fails the contest isn't considered Difficult Terrain for this movement. You don't provoke an Opportunity Attack from them if you leave their reach as part of the same movement."
			},
			{
				name: 'Trample',
				costString: '2 SP',
				sp: 2,
				description: 'Every creature who fails the contest is knocked Prone.'
			}
		]
	},
	{
		id: 'reposition',
		name: 'Reposition',
		type: ManeuverType.Utility,
		cost: { ap: 1, sp: 1 },
		range: 'Self',
		description:
			"Make a DC 15 Martial Check. Success: You move up to twice your Speed ignoring Difficult Terrain. Failure: You move up to your Speed ignoring Difficult Terrain. Reaction: You can spend an additional 1 SP to perform this Maneuver as a Reaction at the end of a creature's Turn moving half as much as normal.",
		isReaction: true,
		enhancements: [
			{
				name: 'Passthrough',
				costString: '2 SP',
				sp: 2,
				description:
					'Each creature whose Space you attempt to move through must make a Martial Check against the result of your Martial Check. Failure: You move through their Space.'
			},
			{
				name: 'Coordinated Movement',
				costString: '2 SP, Repeatable',
				sp: 2,
				repeatable: true,
				description:
					"A willing creature of your choice within 1 Space can move without spending its own movement, provided they're able to move and they end their movement within 1 Space of your destination."
			}
		]
	},
	{
		id: 'heroic-taunt',
		name: 'Heroic Taunt',
		type: ManeuverType.Utility,
		cost: { ap: 1 },
		range: 'Taunt Action (10 Spaces)',
		description:
			"When you take the Taunt Action, you can add the following Maneuver Enhancements. When you add a Maneuver Enhancement, you're considered to be performing a Maneuver.",
		isReaction: false,
		enhancements: [
			{
				name: 'Sustained',
				costString: '1 SP, Sustained',
				sp: 1,
				description: 'The duration increases to 1 minute but each creature makes a Repeated Save.'
			},
			{
				name: 'Increased Range',
				costString: '1 SP',
				sp: 1,
				description: 'The range increases by 5 Spaces.'
			},
			{
				name: 'Legendary Taunt',
				costString: '1 SP',
				sp: 1,
				description:
					"Creatures other than you have Resistance (Half) to damage dealt by the Taunted targets, provided the target isn't also Taunted by those creatures."
			},
			{
				name: 'Mass Taunt',
				costString: '1 AP + 1 SP',
				sp: 1,
				ap: 1,
				description:
					'You instead target each creature of your choice within 5 Spaces that can see or hear you. When you choose this Enhancement, the cost of all other Enhancements (except Sustained) is doubled.'
			}
		]
	},
	{
		id: 'heroic-intimidate',
		name: 'Heroic Intimidate',
		type: ManeuverType.Utility,
		cost: { ap: 1 },
		range: 'Intimidate Action (10 Spaces)',
		description:
			"When you take the Intimidate Action, you can add the following Maneuver Enhancements. When you add a Maneuver Enhancement, you're considered to be performing a Maneuver.",
		isReaction: false,
		enhancements: [
			{
				name: 'Sustained',
				costString: '1 SP, Sustained',
				sp: 1,
				description: 'The duration increases to 1 minute but each creature makes a Repeated Save.'
			},
			{
				name: 'Increased Range',
				costString: '1 SP',
				sp: 1,
				description: 'The range increases by 5 Spaces.'
			},
			{
				name: 'Frightened',
				costString: '1 SP',
				sp: 1,
				description: 'Targets are Frightened instead.'
			},
			{
				name: 'Mass Intimidate',
				costString: '1 AP + 1 SP',
				sp: 1,
				ap: 1,
				description:
					'You instead target each creature of your choice within 5 Spaces that can see or hear you. When you choose this Enhancement, the cost of all other Enhancements (except Sustained) is doubled.'
			}
		]
	},
	{
		id: 'heroic-shove',
		name: 'Heroic Shove',
		type: ManeuverType.Utility,
		cost: { ap: 1 },
		range: 'Shove Action (1 Space)',
		description:
			'When you take the Shove Action, you can add the following Maneuver Enhancements. When you add a Maneuver Enhancement, you are considered to be performing a Maneuver.',
		isReaction: false,
		enhancements: [
			{
				name: 'Increased Push',
				costString: '1 SP, Repeatable',
				sp: 1,
				repeatable: true,
				description: 'The distance pushed increases by 1 Space.'
			},
			{
				name: 'Stand Up',
				costString: '1 SP',
				sp: 1,
				description:
					"If you're Prone, you can stand up before or after making the Check without spending movement."
			},
			{
				name: 'Mass Shove',
				costString: '1 AP + 1 SP',
				sp: 1,
				ap: 1,
				description:
					'You instead target each creature of your choice within a 1 Space Aura. When you choose this Enhancement, the cost of all other Enhancements (except Stand Up) is doubled.'
			}
		]
	},
	{
		id: 'heroic-extend-jump',
		name: 'Heroic Extend Jump',
		type: ManeuverType.Utility,
		cost: { ap: 1 },
		range: 'Self',
		description:
			"When you take the Extend Jump Action, you can add the following Maneuver Enhancements. When you add a Maneuver Enhancement (or perform the Action using SP), you're considered to be performing a Maneuver. Stamina Action: You can now spend 1 SP instead of 1 AP to perform the Extend Jump Action.",
		isReaction: false,
		enhancements: [
			{
				name: 'Instant Jump',
				costString: '1 SP',
				sp: 1,
				description: "If performing a Standing Jump, your Jump Distances isn't halved."
			},
			{
				name: 'Increased Jump',
				costString: '1 SP, Repeatable',
				sp: 1,
				repeatable: true,
				description: 'Your Jump Distance is increased by 2 for the Jump.'
			},
			{
				name: 'Heroic Landing',
				costString: '1 SP, Repeatable',
				sp: 1,
				repeatable: true,
				description: 'You reduce any damage from falling by 2 for the Jump.'
			}
		]
	}
];

/** Alias for maneuvers array */
export const allManeuvers = maneuvers;

/** Get maneuver by ID */
export function getManeuverById(id: string): Maneuver | undefined {
	return maneuvers.find((m) => m.id === id);
}

/** Get maneuvers by type */
export function getManeuversByType(type: ManeuverType): Maneuver[] {
	return maneuvers.filter((m) => m.type === type);
}

/** Re-export types */
export type { Maneuver, ManeuverEnhancement, ManeuverCost } from '../schemas/maneuver.schema';
export { ManeuverType } from '../schemas/maneuver.schema';
