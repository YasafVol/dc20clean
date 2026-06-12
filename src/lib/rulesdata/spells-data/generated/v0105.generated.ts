/* eslint-disable */
/**
 * Generated from docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md.
 * Run npm run spells:generate:0105 to refresh. Do not edit manually.
 */
import type { Spell } from '../../schemas/spell.schema';

// The generator validates all enum values and cost shapes before writing.
// prettier-ignore
export const V0105_SPELLS = [
	{
		"id": "arcane-bolt",
		"name": "Arcane Bolt",
		"sources": [
			"Arcane"
		],
		"school": "Astromancy",
		"tags": [
			"Bludgeoning",
			"Piercing",
			"Slashing"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a bolt of pure magical energy that homes in on a target. Make a Ranged Spell Attack against the AD of a target within range. Hit: The target takes 1 Bludgeoning, Slashing or Piercing damage (your choice)."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X against 1 target of your choice.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP, Repeatable",
				"repeatable": true,
				"variable": true
			},
			{
				"id": "arcane-missiles",
				"name": "Arcane Missiles",
				"description": "Choose X additional targets within range using the same Spell Attack for all targets. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "autonomous",
				"name": "Autonomous",
				"description": "You can Attack a target you've seen since the start of your last turn, provided it's within range and there's a path between you and the target the projectile can follow. This attack ignores 1/2 or 3/4 Cover and you don't have DisADV if the target is Unseen by you.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "arcane-wave",
		"name": "Arcane Wave",
		"sources": [
			"Arcane"
		],
		"school": "Astromancy",
		"tags": [
			"Bludgeoning",
			"Deafened",
			"Motion",
			"Piercing",
			"Slashing"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a burst of destructive energy that envelops a 3 Space Cone. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Bludgeoning, Slashing or Piercing damage (your choice)."
			}
		],
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The length of the Cone increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "fractured",
				"name": "Fractured",
				"description": "The Area becomes Difficult Terrain. A creature can spend 1 AP to clear 1 Space of this Difficult Terrain returning the Space to normal.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "reverberate",
				"name": "Reverberate",
				"description": "Each target makes a Physical Save. Save Failure: The target is pulled toward you or pushed away from you up to X Spaces (your choice) and is Deafened for 1 Round.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "banish",
		"name": "Banish",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Astromancy",
		"tags": [
			"Incapacitated",
			"Planes",
			"Psychic",
			"Teleportation"
		],
		"cost": {
			"ap": 1,
			"mp": 2
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You attempt to sever a target's link to this plane. Make a Spell Check against the Repeated Charisma Save of a target within range. Check Success: The target is banished to a harmless demiplane for the duration. If the target is native to another plane, it is sent back to its home plane instead. While banished, the target is Incapacitated and cannot affect or be affected by anything on the plane it is banished from.\n\n\n\nWhen the Spell ends, the creature reappears in the Space it left, or the nearest unoccupied Space. If it was banished to its home plane for 1 minute, the effect becomes permanent (GMs discretion)."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "severing-seal",
				"name": "Severing Seal",
				"description": "If the effect of the Spell becomes permanent, you can create a temporary seal preventing the creature from returning. The creature can't return to the plane it was banished from for 24 hours.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "planar-tear",
				"name": "Planar Tear",
				"description": "You cause a tear in the fabric of the planes to appear in a 3 Space diameter Sphere centered on the Spaces the creature occupied. When a creature enters the area for the first time on its turn, or starts its turn there, it makes a Charisma Save against your Save DC. Save Failure: The target takes X Psychic damage. The tear disappears when the Spell ends.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "blessing-of-air",
		"name": "Blessing of Air",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Astromancy",
		"tags": [
			"Air",
			"Embolden",
			"Gravity",
			"Motion"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You grant a creature with range the following benefits for the duration:\n\n\n\n- Glide Speed: They can use their movement to glide horizontally in the air.\n\n- Altitude Drop: If they end their turn midair, they Control Fall 4 Spaces.\n\n- Controlled Falling: They suffer no damage from Controlled Falling.\n\n\n\nSpell Cast: When you cast the Spell, make a DC 15 Spell Check. Success: The target can immediately move in any direction (including vertically) up to their Speed."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "hover",
				"name": "Hover",
				"description": "The target isn't effected by Altitude Drop and instead hovers in place when not moving, even while Unconscious or Prone.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "fly",
				"name": "Fly",
				"description": "The target isn't effected by Altitude Drop and gains a Fly Speed equal to its Speed for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "blessing-of-zephyr",
		"name": "Blessing of Zephyr",
		"sources": [
			"Primal"
		],
		"school": "Astromancy",
		"tags": [
			"Embolden",
			"Motion"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You grant a creature with range a Climb Speed and Jump Distance equal to their Speed for the duration.\n\n\n\nSpell Cast: When you cast the Spell, make a DC 15 Spell Check. Success: The target can immediately move in any direction (including jumping) up to their Speed."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "zephyr-walk",
				"name": "Zephyr Walk",
				"description": "The target ignores Difficult Terrain for the duration.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "greater-blessing",
				"name": "Greater Blessing",
				"description": "The target's Speed increases by 2.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "gravity-shift",
		"name": "Gravity Shift",
		"sources": [
			"Arcane"
		],
		"school": "Astromancy",
		"tags": [
			"Dazed",
			"Gravity",
			"Hindered",
			"Motion"
		],
		"cost": {
			"ap": 2,
			"mp": 4
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You alter gravity in a 6 Space high, 3 Space diameter Cylinder within range. Choose a vertical or horizontal plane within the Cylinder (such as the bottom, top or side of the Cylinder). The chosen section becomes a Gravity Plane.\n\n\n\nSpell Cast: When you cast this Spell, make a Spell Check against the Repeated Intelligence Save of each creature in the area. Save Failure: The target becomes Hindered while in the area for the duration.\n\n\n\n## Gravity Plane\n\n\n\nCreatures and unsecured objects fall toward a Gravity Plane. Creatures above a Gravity Plane walk normally, but creatures below a Gravity Plane can walk on any horizontal surface as if standing upside down.\n\n\n\n## Falling into a Gravity Plane\n\n\n\nCreatures and objects that fall into a Gravity Plane will pass through it briefly before gravity pulls it back in the opposite direction. A creature or object will bob up and down in this manner for 1 Round before it comes to a rest along the Gravity Plane."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The Cylinder's diameter increases by 1 and it's height by 2.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "dazed",
				"name": "Dazed",
				"description": "Creatures Hindered by this Spell are Dazed.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (1 minute -> 10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "gravity-well",
		"name": "Gravity Well",
		"sources": [
			"Arcane"
		],
		"school": "Astromancy",
		"tags": [
			"Gravity",
			"Motion",
			"Restrained"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You create an area of intense gravity that pulls creatures and objects in a 4 Space Sphere towards its center. Make a Spell Check against the Might Save of creatures in the area. Check Success: They're pulled 1 Space towards the center. Success (Each 5): They're pulled 1 additional Space.\n\n\n\nCollision: If a creature is pushed to the center of the area, they stop and take collision damage as if they had hit a solid surface."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "stronger-pull",
				"name": "Stronger Pull",
				"description": "The distance pulled increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "lingering",
				"name": "Lingering",
				"description": "The duration of the Spell becomes 1 minute. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Might Save against your Save DC. Save Failure: They're pulled X Spaces towards the center.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP, Sustained",
				"sustained": true,
				"variable": true
			},
			{
				"id": "black-hole",
				"name": "Black Hole",
				"description": "If a creature pulled by this Spell ends in a center Space they become Restrained for the duration. A creature Restrained this way makes a Repeated Might Save at the end of each of their turns, ending the condition on a Success.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP, Requires Lingering",
				"requires": [
					"lingering"
				]
			}
		]
	},
	{
		"id": "haste",
		"name": "Haste",
		"sources": [
			"Arcane"
		],
		"school": "Astromancy",
		"tags": [
			"Embolden",
			"Motion",
			"Time"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You bolster the Speed of a creature within range for the duration. Make a DC 15 Spell Check. Failure: Once per Round, the target can gain half their Speed in Spaces of Movement for free. Success: Once per Round, the target gains its full Speed in Spaces of Movement instead. Success (Each 5): +1 Space."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "enhanced-speed",
				"name": "Enhanced Speed",
				"description": "The target gains +3 Spaces of Movement each round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "phased-movement",
				"name": "Phased Movement",
				"description": "The target can move through other creature's Spaces. Other creatures Spaces are considered Difficult Terrain.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "disengage",
				"name": "Disengage",
				"description": "The target gains the benefits of the Disengage Action for the duration.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "reflexes",
				"name": "Reflexes",
				"description": "The target gains ADV on Agility Checks and Saves for the duration.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "increase-gravity",
		"name": "Increase Gravity",
		"sources": [
			"Arcane"
		],
		"school": "Astromancy",
		"tags": [
			"Bludgeoning",
			"Gravity",
			"Immobilized",
			"Hindered",
			"Prone",
			"Slowed"
		],
		"cost": {
			"ap": 2,
			"mp": 2
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You increase gravity in a 6 Space tall, 3 Space diameter Cylinder within range. Creatures and objects that fall to the ground within the area take +2 falling damage.\n\n\n\nSpell Cast: When you cast the Spell, make a Spell Check against the Might Save of every creature within the area. Save Failure: The creature falls Prone.\n\n\n\n## Heightened Gravity:\n\n\n\n- Creatures: Creatures that start their turn within the area, or enter the area for the first time on their turn, must make a Repeated Might Save against your Save DC. Save Failure: The creature is Slowed and Hindered while in the area for the duration.\n\n- Objects: Objects in the area that aren't being worn, held, or carried require a successful Athletics Check against your Save DC to be picked up or moved."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Cylinder increases by 1 Space and the height by 2 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "immobilized",
				"name": "Immobilized",
				"description": "Creatures Slowed by this Spell are also Immobilized.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "crushing-weight",
				"name": "Crushing Weight",
				"description": "Creatures that enter the area for the first time on their turn, or start their turn there, must make a Might Save. Save Failure: They take X Bludgeoning damage.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "slow-time",
		"name": "Slow Time",
		"sources": [
			"Arcane"
		],
		"school": "Astromancy",
		"tags": [
			"Dazed",
			"Enfeeble",
			"Hindered",
			"Impaired",
			"Slowed",
			"Paralyzed",
			"Time"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You slow time for a creature in range. Make a Spell Check contested by the target's Repeated Charisma Save. Check Success: The target is Hindered for the duration."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "dulled-reactions",
				"name": "Dulled Reactions",
				"description": "On a failed Save, the target is unable to take Reactions for the duration.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "sluggish",
				"name": "Sluggish",
				"description": "On a failed Save, the target is Impaired and Dazed for the duration.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "stolen-time",
				"name": "Stolen Time",
				"description": "On a failed Save, for the duration, the target is Slowed and you gain half the target's Speed.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "stop-time",
				"name": "Stop Time",
				"description": "The creature is Paralyzed.",
				"cost": {
					"mp": 6
				},
				"costText": "6 MP",
				"rawCost": "6 MP, Sustained",
				"sustained": true
			}
		]
	},
	{
		"id": "telekinesis",
		"name": "Telekinesis",
		"sources": [
			"Arcane"
		],
		"school": "Astromancy",
		"tags": [
			"Immobilized",
			"Motion",
			"Restrained"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You manipulate a Small or smaller target within range with telekinetic force for the duration. Targets affected by this Spell do not fall as a result of gravity. If you end your turn outside the Spell's range from the target, the Spell ends.\n\n\n\nCreature: If you target a creature, make a Spell Check contested by their Repeated Might Save. Check Success: The creature is Immobilized and you can use the Telekinetic Action on it for the duration.\n\n\n\nObject: When you cast the Spell, you can use Telekinetic Action on the object immediately for free. If the object is being held or carried by a creature, you must first succeed a Spell Check contested by the creature's Might Save or the Spell fails. A creature holding the object can spend 1 AP to make an Athletics Check against your Save DC. Check Success: The Spell ends early on the object.\n\n\n\n## Telekinetic Action\n\n\n\nWhen you Sustain this Spell or by spending 1 AP, you can move or throw the target up to 2 Spaces (+2 Spaces for each Size smaller it is than the maximum Size you can target). The total distance moved or thrown is halved if moved or thrown vertically upward.\n\n\n\n- Throw Creature: If the target is a creature, you must first succeed a Spell Check contested by the creature's Might Save or the throw fails. When you throw the creature at a target, you compare your Spell Check against the target's PD. Hit: The thrown creature and the target share the Collision damage (each take half). Miss: The thrown creature continues traveling to your maximum throwing distance.\n\n- Throw Object: When you throw an object at a target it's considered a Ranged Spell Attack with an Improvised Weapon against the target's PD. Hit: The target takes a 1 damage of a type determined by the GM. Miss: The thrown object continues traveling up to your maximum throwing distance."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "size",
				"name": "Size",
				"description": "The maximum size of a creature or object you can target increases by 1 step (Small -> Medium -> Large -> Huge -> Gargantuan -> Colossal -> Titanic). The cost of this Enhancement increases to 2 MP for each size increase beyond Large.\n\nExample: You use the Size Enhancement three times to target a Huge creature. The first two cost 1 MP each, and the last one costs 2 MP for a total of 4 MP.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "restrain",
				"name": "Restrain",
				"description": "Targets Immobilized by this Spell are also Restrained.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "teleport",
		"name": "Teleport",
		"sources": [
			"Arcane"
		],
		"school": "Astromancy",
		"tags": [
			"Teleportation",
			"Motion",
			"Slowed"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You teleport up to 5 Spaces to an unoccupied Space that you can see. If you're Immobilized the Spell fails."
			}
		],
		"enhancements": [
			{
				"id": "distance",
				"name": "Distance",
				"description": "The distance of the teleport increases by 3 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "unbound",
				"name": "Unbound",
				"description": "The Spell no longer fails if you are Immobilized.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "passenger",
				"name": "Passenger",
				"description": "X willing creatures (that aren't Immobilized) within 2 Spaces of you are also teleported, appearing in an unoccupied space within 2 Spaces of where you appear after teleporting. If used with Unbound, you can teleport other Immobilized creatures. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "temporal-shiver",
				"name": "Temporal Shiver",
				"description": "Creatures within 1 Spaces of you before you teleport make an Intelligence Save against your Save DC. Save Failure: The target is Slowed X for 1 Round.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "temporal-repulse",
				"name": "Temporal Repulse",
				"description": "After you teleport, creatures within 1 Space of you make a Might Save against your Save DC. Save Failure: The target is pushed X Spaces away from you.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "time-stop",
		"name": "Time Stop",
		"sources": [
			"Arcane"
		],
		"school": "Astromancy",
		"tags": [
			"Time",
			"Paralyzed"
		],
		"cost": {
			"ap": 1,
			"mp": 2
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "End of Turn",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "Time stops for all effects, objects, and creatures (except you). For the duration, you ignore the Multiple Check Penalty, and creatures whose time has stopped are considered Paralyzed. The Spell ends early after you target a creature with a harmful effect."
			}
		],
		"enhancements": [
			{
				"id": "more-time",
				"name": "More Time",
				"description": "Your current and maximum AP is increased by 1 for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "locked-time",
				"name": "Locked Time",
				"description": "The Spell no longer ends early if you target a creature with a harmful effect.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			},
			{
				"id": "additional-target",
				"name": "Additional Target",
				"description": "Choose 1 creature other than you within 10 Spaces. Time doesn't stop for the target and before the Spell ends, they can spend 1 AP (provided they have AP to spend) and ignore the Multiple Check Penalty. You can use this Enhancement on the same creature multiple times, allowing them to spend 1 additional AP each time.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "translocation",
		"name": "Translocation",
		"sources": [
			"Arcane"
		],
		"school": "Astromancy",
		"tags": [
			"Teleportation"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You teleport a Medium or smaller object or willing creature other than yourself within range up to 3 Spaces to an unoccupied Space also within range. If the target is Immobilized the Spell fails.\n\n\n\nHeld Object: If you target an object being held or carried by an unwilling creature, you must first succeed a Spell Check contested by the creature's Charisma Save or the Spell fails."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "distance",
				"name": "Distance",
				"description": "The distance of the teleport increases by 3 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "hostile",
				"name": "Hostile",
				"description": "You can target unwilling creatures, but must first succeed on a Spell Check contested by the target's Charisma Save or the Spell fails.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "unbound",
				"name": "Unbound",
				"description": "The Spell no longer fails if the target is Immobilized.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "size",
				"name": "Size",
				"description": "The maximum size of a creature or object you can target by 1 step (Medium -> Large -> Huge -> Gargantuan -> Colossal -> Titanic). The cost of this Enhancement increases to 2 MP for each size increase beyond Large.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "swap",
				"name": "Swap",
				"description": "Choose a second target within range (you can choose yourself). If the Spell Succeeds on both targets, they swap location provided they are within 3 Spaces of each other. The distance is increased by 3 Spaces for each time you use the Distance Enhancement. If the Spell only Succeeds on only 1 target, you can teleport that target as normal.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "reduce-inertia",
		"name": "Reduce Inertia",
		"sources": [
			"Arcane"
		],
		"school": "Astromancy",
		"tags": [
			"Embolden",
			"Gravity",
			"Motion",
			"Ward"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You reduce the inertia of up to 2 targets within range for the duration. Each target weighs half as much and falls a maximum of 10 Spaces per Round.\n\n\n\nSpell Cast: Make a DC 15 Spell Check. Failure: Each target has Resistance (Half) to falling damage for the duration. Success: Each target is immune to falling damage for the duration and doesn't fall Prone as a result of falling.\n\n\n\nReaction: You can cast this Spell as a Reaction when a target falls within range.\n\n\n\n## Conjuration\n\n\n\nConjuration is the magic of summoning things from one place to another or fabricating something from nothing. Spells that summon creatures, create objects, or illusions in the environment fall into the School of Conjuration."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "lightweight",
				"name": "Lightweight",
				"description": "Each target's Speed and Jump Distance increases by 2.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target 2 additional creatures.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "controlled-descent",
				"name": "Controlled Descent",
				"description": "Each target hovers in place instead of falling. If the target is a creature, they can resume falling or hovering at will (no AP required).",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "arcane-barrier",
		"name": "Arcane Barrier",
		"sources": [
			"Arcane"
		],
		"school": "Conjuration",
		"tags": [
			"Embolden",
			"Ward"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "5 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You place an Arcane Glyph within range that creates a 3 Space diameter Sphere which protects creatures of your choice for the duration or until they leave the area. Make a DC 15 Spell Check. Failure: The targets gain PDR. Success: The targets gain PDR and 1 Temp HP. Success (each 5): The Temp HP increases by 1."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "protection",
				"name": "Protection",
				"description": "Each time creatures of you choice end their turn in the area, they gain X Temp HP until they leave the area or the Spell ends.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "resistance",
				"name": "Resistance",
				"description": "Creatures of you choice in the area gain Physical Resistance (Half) instead of PDR.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "magical-ward",
				"name": "Magical Ward",
				"description": "Creatures in the area have ADV on Saves against MP effects. Spell Attacks have DisADV against creatures in the area.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "arcane-weapon",
		"name": "Arcane Weapon",
		"sources": [
			"Arcane"
		],
		"school": "Conjuration",
		"tags": [
			"Enfeeble",
			"Bludgeoning",
			"Piercing",
			"Slashing",
			"Weapon"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Tiny Weapon made that deals a Physical Damage Type (Bludgeoning, Piercing or Slashing) of your choice. The Weapon disappears when the Spell ends.\n\n\n\nCommand: Once per Round, when you cast the Spell, Sustain it, or by spending 1 AP on your turn, you can move the Weapon up to 5 Spaces and choose to make a Melee Spell Attack against the PD of a target within 1 Space of the Weapon. Hit: The target takes 2 damage of the chosen Damage Type.\n\n\n\nTethered: The Weapon is Tethered to you a distance equal to the Spell's range. If you move farther than the Tethered distance from the Weapon, you drag the Weapon with you."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The Weapon’s damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "effortless",
				"name": "Effortless",
				"description": "You no longer need to Sustain the Spell and can Command the Weapon for free on your tun. You still can only Command the Weapon once per Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "physical-effect",
				"name": "Physical Effect",
				"description": "Creatures Hit by the Weapon have Vulnerability to an effect based on the chosen Damage Type for 1 Round: Bludgeoning (Prone), Piercing (Impaired), or Slashing (Bleeding).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "cleave",
				"name": "Cleave",
				"description": "When you Command the Weapon, you can instead make a Area Spell Attack against the AD of each target within a 1 Space Arc of the Weapon. Hit: The target takes 1 damage of the chosen type.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "bind",
		"name": "Bind",
		"sources": [
			"Arcane",
			"Divine",
			"Primal"
		],
		"school": "Conjuration",
		"tags": [
			"Bludgeoning",
			"Immobilized",
			"Restrained"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You bind a creature within range. Make a Spell Check contested by the target's Agility Save. Check Success: The target is Immobilized for the duration. Once on each of their turns, the target can spend 1 AP to attempt the Save again, ending the Spell on a success."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "restrain",
				"name": "Restrain",
				"description": "On a Success, the target is Restrained instead.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "constrict",
				"name": "Constrict",
				"description": "For the duration, once per Round, you can spend 1 AP to deal 2 Bludgeoning damage to the target. When you make this attack, you can spend 1 or more MP to increase the damage by 1 per MP spent.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "chaos-bomb",
		"name": "Chaos Bomb",
		"sources": [
			"Arcane"
		],
		"school": "Conjuration",
		"tags": [
			"Chaos"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a Tiny sized Chaos Bomb in a Space within range. At the end of each of your turns, make a Fate Check. Result of 10 or above: The Chaos Bomb detonates.\n\n\n\nBeta Note: A Fate Check is a d20 roll where no modifiers (numerical or otherwise) apply to the Check, no critical results apply and you can't choose to fail.\n\n\n\nDetonation: When the bomb detonates, roll a d12 to determine the bomb's damage type. Make an Area Spell Attack as a Reaction for free against the AD of each target in a 3 Space diameter Sphere centered on the Bomb's Space while they make an Intelligence Save against your Save DC. Hit: The target takes 1 damage of the rolled damage type. Save Failure: The target is subjected to the effects of the Save Failure column based on the result rolled.\n\n\n\n| D12 | Damage | Save Failure |\n\n|-------|-------------|-------------------------------------------------------------------------------------------------|\n\n| 1 | Bludgeoning | The target is pushed 1 Space away. Failure (each 5): The target is pushed 1 additional Space. |\n\n| 2 | Piercing | The target can’t take Reactions for 1 round. |\n\n| 3 | Slashing | The target begins Bleeding for 1 minute. |\n\n| 4 | Cold | The target is Slowed for 1 round. |\n\n| 5 | Corrosive | The target is Hindered for 1 round. |\n\n| 6 | Fire | The target begins Burning for 1 minute. |\n\n| 7 | Lightning | The target is Stunned until the start of their turn. |\n\n| 8 | Poison | The target is Impaired for 1 round. |\n\n| 9 | Psychic | The target is Dazed for 1 round. |\n\n| 10 | Radiant | Attacks made against the target add a d4 to the check for 1 round. |\n\n| 11 | Umbral | The target is Doomed for 1 round. |\n\n| 12 | True | The target is Exposed for 1 round. |"
			}
		],
		"spellPassive": "Wild Magic Surge: When you Critically Fail or Critically Succeed on a Check made to cast this Spell, you roll on the Wild Magic Table.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "chaotic-expansion",
				"name": "Chaotic Expansion",
				"description": "When you roll for Detonation and it doesn't detonate, the diameter of the Sphere increases by 1 Space.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "controlled-entropy",
				"name": "Controlled Entropy",
				"description": "When you roll the Fate Check, you roll twice and choose which result to use.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "sticky",
				"name": "Sticky",
				"description": "When you cast the Spell, you can attach the Chaos Bomb to an object or creature within range. If the target isn't willing, make a Spell Check against the target's Agility Save. Check Success: The Bomb is magically attached to the target. A creature can spend 1 AP to make a Trickery Check against your Save DC to remove it from a target within 1 Space (including themselves). Success: The Bomb is magically attached to the creature that removed it. Success (5): The Bomb stops magically sticking to objects or creatures.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			}
		]
	},
	{
		"id": "call-familiar",
		"name": "Call Familiar",
		"sources": [
			"Arcane",
			"Divine",
			"Primal"
		],
		"school": "Conjuration",
		"tags": [
			"Sense",
			"Summoning"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "1 Space",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a friendly spirit that enters your service until you are reduced to 0 HP or you choose to end the Spell for free on your turn. It takes the form of a Tiny creature of your choice, with a Creature Type of your choice (except Giant and Humanoid). Your Familiar uses the statblock below:\n\n\n\n## Familiar\n\n\n\nTiny (Chosen Type)\n\n\n\n| HP | Shared | AP | Shared |\n\n|-------|----------|---------|----------|\n\n| PD | 8 + CM | AD | 8 + CM |\n\n| PM | Shared | Save DC | Shared |\n\n| Speed | 5 | CM | Shared |\n\n| MIG | 0 | CHA | 0 |\n\n| AGI | 0 | INT | 0 |\n\n\n\nDC Tip: The Familiar shares your Prime Modifier and Combat Mastery so it's Attack, Martial and Spell Checks are the same as yours.\n\n\n\nMP Reduction: When you cast the Spell, your maximum MP is reduced by an amount equal to the MP spent. This MP reduction only ends when the Spell ends. You don't regain any lost MP when your maximum MP is restored.\n\n\n\nRecasting the Spell: You can't have more than 1 Familiar at a time. If you cast this Spell while you already have a Familiar, your Familiar can retain its form, adopt a new form of your choice, or it disappears and a new one takes its place. The new Familiar can be a previous one you summoned in the past or a new one altogether. In either case, you can reassign its Familiar Traits.\n\n\n\n## Familiar Traits\n\n\n\nYour Familiar has the following Familiar Traits:\n\n\n\n- Familiar Bond: Your Familiar shares your HP. If you both take damage from the same source, you only take 1 instance of that damage. While your Familiar occupies the same Space as you, it can't be targeted by Attacks.\n\n- Shared Telepathy: While within 20 Spaces, you and your Familiar can speak Telepathically with each other.\n\n- Spell Delivery: While within 10 Spaces of your Familiar, you cast a Spell with a range of 1 Space as if you were standing in your Familiar's Space.\n\n\n\n## Spell Actions\n\n\n\nPocket Dimension: You can spend a Minor Action to dismiss the Familiar into a pocket dimension, summon it from that pocket dimension, or summon it from anywhere on the same plane of existence. When summoned or dismissed, any items it was carrying are left behind. When summoned, it appears in the nearest unoccupied Space of your choice.\n\n\n\nShared Senses: While your Familiar is within 20 Spaces, you can spend 1 AP to connect your senses to the Familiar's senses until the end of your next turn. For the duration, you're Deafened and Blinded to your own senses, but you can see what your Familiar sees and hear what it hears. The connection ends early if either of you moves farther than 20 Spaces from the other.\n\n\n\n## Managing the Familiar\n\n\n\nCombat: The Familiar shares your Initiative, acting on your turn. You can spend 1 AP to command the Familiar to use an Action. It can't take the Attack Action or Spell Action unless it has a Familiar Feature that allows it to. When you take the Move Action, your Familiar also gains the benefits of the Move Action. If you don't command it, when your turn ends it takes the Dodge Action.\n\n\n\nShared MCP: When the Familiar makes a Check, it shares your Multiple Check Penalty.\n\n\n\n## Expanded Familiar Traits\n\n\n\nSummoned Familiars can choose from the following additional Familiar Traits:\n\n\n\n## Repeatable Traits\n\n\n\n(2) Resistance: It gains Resistance (Half) to a damage type of your choice.\n\n\n\n## Unique Traits\n\n\n\n(2) Avian: It gains a Fly Speed equal to its Speed.\n\n\n\n(1) Blended Senses: You can use Shared Senses as a free Action on your turn. Its range increases to 100 Spaces and only ends if either of you moves farther than 100 Spaces from the other or you choose to end it for free at any point.\n\n\n\n(2) Chameleon: You can spend 1 AP to cause your Familiar to become Invisible for 1 minute or until it takes any Action beside the Dodge or Hide Actions.\n\n\n\n(1) Distant Link: The range of Shared Telepathy increases to 100 Spaces, and you always know the exact location of your Familiar provided you are both on the same plane of existence.\n\n\n\n(1) Extended Spell Delivery: While within 10 Spaces of your Familiar, you can cast Spells as if you were standing in its Space.\n\n\n\n(1) Familiar Attack: The Familiar can spend 1 AP to make a Ranged Spell Attack against the PD of a target within 10 Spaces. The Attack deals 1 damage of a type chosen when you summon the Familiar (except True damage). If the target is within 1 Space, the Attack becomes a Melee Spell Attack and deals +1 damage on a Heavy Hit.\n\n\n\n(1) Predator: Requires Familiar Attack. The familiar has ADV on Attacks against Bloodied creatures, and on Survival Checks to track them.\n\n\n\n(1) Prey: The Familiar has ADV on Stealth Checks and can attempt to Hide even when it's only Partially Concealed.\n\n\n\n(1) Limited Telepathy: The Familiar can communicate telepathically with any creature it can see within 5 Spaces. If the Familiar can't speak, it communicates using only simple ideas, emotions, and images.\n\n\n\n(2) Malleable: The Familiar can move through a space as narrow as 1 inch wide without squeezing.\n\n\n\n(1) Evasive: The Familiar doesn't provoke Opportunity Attacks when it leaves an enemy's reach.\n\n\n\n(1) Quiet as a Mouse: While moving at a Stealthy pace (1/2 Speed), the Familiar makes no sound, leaves no noticeable trail, and can't be tracked by mundane means.\n\n\n\n(1) Speech: The Familiar gains the ability to speak and shares your Language Masteries.\n\n\n\n(1) Strong-Willed: The Familiar has ADV on Saves to avoid being Charmed, Frightened, Intimidated, or Terrified."
			}
		],
		"enhancements": [
			{
				"id": "additional-traits",
				"name": "Additional Traits",
				"description": "Grant your Familiar 2 points worth of Familiar or Beast Traits (you can't choose Negative Traits).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "disguise-self",
		"name": "Disguise Self",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Conjuration",
		"tags": [
			"Communication",
			"Illusion"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "10 Minutes",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You alter your appearance to that of a specific person that you have seen or a general member of that ancestry. Your new form needs to be of the same size as you and you do not gain the traits, Features, or statistics of that form. You can end this Spell at any time for free.\n\n\n\nBeing Identified: A creature can make an Investigation Check against your Save DC to discern that your form is not natural and has been altered by magic."
			}
		],
		"enhancements": [
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (10 min -> 1 hour -> 8 hour -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "size",
				"name": "Size",
				"description": "You can choose the appearance of a creature 1 Size smaller or larger than you. Your Size doesn't change.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "mimicry",
				"name": "Mimicry",
				"description": "You can perfectly mimic the voice, accent, and mannerisms of a creature you've heard speak for at least 1 minute.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "alter-form",
				"name": "Alter Form",
				"description": "Once per Round for the duration, you can spend 1 AP to alter your appearance to a different form of your choice.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "entangle",
		"name": "Entangle",
		"sources": [
			"Primal"
		],
		"school": "Conjuration",
		"tags": [
			"Immobilized",
			"Plants",
			"Piercing",
			"Restrained"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a 3 Space diameter Sphere of natural phenomenon (such as entangling plants) within range. The area becomes Difficult Terrain for the duration. Make a Spell Check against the Agility Save of each creature in the area. Save Failure: The target becomes Immobilized for the duration or until its Space is cleared of the effect. The target can also spend 1 AP to repeat its Save, ending the Condition on itself on a Success.\n\n\n\nClearing Spaces: Each Space within the area has an AD and PD equal to your Save DC and is cleared when it takes an amount of Elemental or Slashing damage equal to the MP spent on the Spell (minimum of 1).\n\n\n\nExample: A Level 1 Druid has a Save DC of 14 and spends 1 MP to cast Entangle. Each Space within the Spell's area has an AD and PD of 14 and disappears when it takes 1 Slashing or Elemental damage."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "grasping",
				"name": "Grasping",
				"description": "When a creature enters a Space within the area that hasn't been cleared for the first time on a turn, it makes an Agility Save against your Save DC. Save Failure: The target becomes Immobilized for the duration or until its Space is cleared of the effect. The target can also spend 1 AP to repeat its Save, ending the Condition on itself on a Success.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "restrained",
				"name": "Restrained",
				"description": "Creatures Immobilized by the Spell are also Restrained.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "spikey-terrain",
				"name": "Spikey Terrain",
				"description": "Creatures take X Piercing damage when they enter a Space within the area that hasn't been cleared. They also take this damage each time they fail a Save (including any subsequent Saves) to resist being Immobilized by the Spell.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "elemental-weapon",
		"name": "Elemental Weapon",
		"sources": [
			"Primal"
		],
		"school": "Conjuration",
		"tags": [
			"Cold",
			"Corrosion",
			"Enfeeble",
			"Fire",
			"Lightning",
			"Poison",
			"Weapon"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Tiny spectral Weapon that deals an Elemental Damage Type (Cold, Corrosion, Fire, Lightning or Poison) of your choice. The Weapon disappears when the Spell ends.\n\n\n\nCommand: Once per Round, when you cast the Spell, Sustain it, or by spending 1 AP on your turn, you can move the Weapon up to 5 Spaces and choose to make a Melee Spell Attack against the PD of a target within 1 Space of the Weapon. Hit: The target takes 2 damage of the chosen Damage Type.\n\n\n\nTethered: The Weapon is Tethered to you a distance equal to the Spell's range. If you move farther than the Tethered distance from the Weapon, you drag the Weapon with you."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The Weapon’s damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "effortless",
				"name": "Effortless",
				"description": "You no longer need to Sustain the Spell and can Command the Weapon for free on your tun. You still can only Command the Weapon once per Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "elemental-effect",
				"name": "Elemental Effect",
				"description": "Creatures Hit by the weapon have Vulnerability to an effect based on the chosen Damage Type for 1 Round: Cold (Slowed), Corrosion (Hindered), Fire (Burning), Lightning (Stunned), or Poison (Poisoned).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "enduring-elements",
				"name": "Enduring Elements",
				"description": "Creatures attacked by the Weapon must make a Repeated Physical Save. Save Failure: At the start of each of their turns, they take X damage of the chosen Damage Type for 1 minute.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "forcefield",
		"name": "Forcefield",
		"sources": [
			"Arcane"
		],
		"school": "Conjuration",
		"tags": [
			"Antimagic",
			"Sound",
			"Summoning"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You create a Forcefield of pure arcane energy within range. Choose either a 3 Space diameter Dome or a 5 Space long, 2 Space tall Wall. Creatures and objects within the area are pushed to nearest unoccupied Space of their choice on either side of the Forcefield (you choose for each object).\n\n\n\nThe Forcefield is translucent and acts as a solid surface, blocking movement but not sound or light. The Forcefield has 2 HP, Resistance (Half) to all damage, and a PD and AD equal to your Save DC."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The size of the Forcefield increases:\n\n- Dome: The diameter of the Dome increases by 1 Space.\n\n- Wall: The length of the Wall increases by 5 Spaces or the height of the Wall increases by 2 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "durable",
				"name": "Durable",
				"description": "The Forcefield has +X HP.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "one-way-mirror",
				"name": "One-way Mirror",
				"description": "Choose one face of the Forcefield to stay translucent. Creatures on that side see through it normally, while creatures on the other side perceive it as a mirror.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "privacy",
				"name": "Privacy",
				"description": "When you cast the Spell or by spending 1 AP, you can alter how sound passes through the Forcefield. You can prevent any sound from passing through, prevent sound from only passing through in 1 direction (for example from the outside to the inside), or allow all sound to pass through.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "full-lockdown",
				"name": "Full Lockdown",
				"description": "Creatures and effects can't affect anything on the other side of the Forcefield. In addition, creatures and objects can't teleport through the Forcefield.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "illusory-duplicate",
		"name": "Illusory Duplicate",
		"sources": [
			"Arcane"
		],
		"school": "Conjuration",
		"tags": [
			"Communication",
			"Illusion",
			"Teleportation",
			"Sense"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You create an illusory duplicate of yourself in an unoccupied Space within range.\n\n\n\nSecond Self: The duplicate mimics your posture and gestures. When you spend movement to move, you can cause the duplicate to move instead of you or with you. If the duplicate moves with you, it moves in a similar manner the same number of Spaces in a direction of your choice. If you end your turn farther than the Spell's range from a duplicate, it disappears.\n\n\n\nShared Senses: You can use a Minor Action to see and hear as if standing in the Space occupied by the duplicate. When you do you are Blinded and Deafened using your own senses. You can use a Minor Action to end the effect.\n\n\n\nFalse Threat: The duplicate is intangible, causing creatures and objects to pass through it. The duplicate counts as a creature for the purposes of Flanking against any creature that can't discern the duplicate as an illusion.\n\n\n\nDiscerning the Illusion: A creature that attempts to physically interact with the duplicate automatically learns that it's an illusion. Otherwise, a creature can make an Investigation Check against your Save DC to attempt to discern if the duplicate is an illusion. Success: The creature discerns its an illusion."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration is increased by 1 step (1 min -> 10 min -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-duplicate",
				"name": "Additional Duplicate",
				"description": "You create X additional duplicates within range and each one can move independently when you move.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "ventriloquism",
				"name": "Ventriloquism",
				"description": "You can choose to speak through your duplicate at the same time as you or instead of you, making your voice appear to come from its location.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "swap",
				"name": "Swap",
				"description": "You can now spend 1 AP on your turn to swap places with a duplicate that's within the Spell's range. This swap is only noticeable by a creature that has discerned the duplicate to be an illusion.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "illusory-image",
		"name": "Illusory Image",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Conjuration",
		"tags": [
			"Illusion",
			"Scent",
			"Sound",
			"Trap"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You create an up to Medium size visual illusion of an object, creature, or effect within range. The illusion is purely visual, it can't create sound, light, smell, or physical interaction. It appears real to the eye but doesn't cast shadows or leave tracks.\n\n\n\nMake a DC 15 Spell Check. Failure: Creatures gain ADV on Checks made to Discern the Illusion. Success: Creatures make Checks to Discern the Illusion as normal. Success (5): Creatures gain DisADV on Checks made to Discern the Illusion.\n\n\n\nDiscern the Illusion: If the illusion is an image, any physical interaction with the image reveals it to be an illusion. Alternatively, a creature can spend 1 AP to examine the image (or any effects from the Senses Enhancement) to attempt to determine if the illusion is real. The creature makes an Investigation Check against your Save DC. Success: The creature discerns the illusion for what it is, revealing the illusion to be false. If the illusion is an image, the illusion becomes partially transparent to the creature and no longer blocks their vision."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increased by 1 step (1 min -> 10 min -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "size",
				"name": "Size",
				"description": "The Size of the illusion increases by 1 (e.g Medium -> Large -> Huge -> Gargantuan -> Colossal -> Titanic).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "senses",
				"name": "Senses",
				"description": "The illusion can include one additional sense: sound, smell, or temperature.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "programmed-image",
				"name": "Programmed Image",
				"description": "You can set a simple repeating behavior (such as pacing, nodding, waving) that loops for the duration.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "triggered-image",
				"name": "Triggered Image",
				"description": "You set a simple trigger when casting the spell (such as \"when someone enters this area\" or \"when the door opens\"). When the trigger occurs, the illusion appears instantly and lasts for the Spell duration. Until triggered, the Spell lies dormant.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "illusory-writing",
		"name": "Illusory Writing",
		"sources": [
			"Arcane"
		],
		"school": "Conjuration",
		"tags": [
			"Communication",
			"Illusion",
			"Trap"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "1 Hour",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You inscribe text, sigils, or symbols upon a surface, infusing them with illusion magic. When cast, you write a sentence of up to 20 words that appears mundane or magical (your choice) on a surface or willing creature within range. While touching it, you can spend 1 AP to dismiss or rewrite the text.\n\n\n\nHidden Script: When you cast the Spell, you can choose to obfuscate the writing to all creatures except those you designate at the time of casting. All other creature see the writing as gibberish. A creature that can't read the text can spend 1 AP to make an Investigation Check against your Save DC. Success: The creature can read the writing provided they understand the language its written in. Failure: The creature can't attempt this Check again for 24 hours."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "extended-script",
				"name": "Extended Script",
				"description": "The duration increases to Long Rest and you can add an additional sentence with up to 40 words for each time you use this Enhancement. If you spend 2 MP or more on this Enhancement, you can choose for the duration to become Until Dispelled.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "lingering-message",
				"name": "Lingering Message",
				"description": "The writing can produce faint sound or whispers that communicate its meaning aloud to chosen readers.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "misleading-script",
				"name": "Misleading Script",
				"description": "When a creature you haven't designated attempts to read the writing fails their Investigation Check to discern its meaning, they instead see a false message of your choosing.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "trigger-phrase",
				"name": "Trigger Phrase",
				"description": "The script activates or becomes visible when a chosen word or condition is met (for example: \"When someone opens this door,\" or \"When the moon is full\").",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "skywriting",
				"name": "Skywriting",
				"description": "You can instead inscribe the message across the sky in massive, glowing letters visible for miles. The range becomes Sight. This Enhancement can't be used with the Extended Script Enhancement.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "mage-armor",
		"name": "Mage Armor",
		"sources": [
			"Arcane"
		],
		"school": "Conjuration",
		"tags": [
			"Embolden",
			"Ward"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Hour",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You create a magical protective coating around the target creature. The target gains +2 AD for the duration."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step. (1 hour -> 8 hours -> until Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "greater-armor",
				"name": "Greater Armor",
				"description": "The target gain an additional +1 AD.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "heavily-warded",
				"name": "Heavily Warded",
				"description": "The target gains PDR for the duration.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "mystical-weapon",
		"name": "Mystical Weapon",
		"sources": [
			"Divine"
		],
		"school": "Conjuration",
		"tags": [
			"Enfeeble",
			"Psychic",
			"Radiant",
			"Umbral",
			"Weapon"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Tiny spectral Weapon that deals a Mystical Damage Type (Psychic, Radiant or Umbral) of your choice. The Weapon disappears when the Spell ends.\n\n\n\nCommand: Once per Round, when you cast the Spell, Sustain it, or by spending 1 AP on your turn, you can move the Weapon up to 5 Spaces and choose to make a Melee Spell Attack against the PD of a target within 1 Space of the Weapon. Hit: The target takes 2 damage of the chosen Damage Type.\n\n\n\nTethered: The Weapon is Tethered to you a distance equal to the Spell's range. If you move farther than the Tethered distance from the Weapon, you drag the Weapon with you."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The Weapon’s damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "effortless",
				"name": "Effortless",
				"description": "You no longer need to Sustain the Spell and can Command the Weapon for free on your tun. You still can only Command the Weapon once per Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "mystical-effect",
				"name": "Mystical Effect",
				"description": "Creatures Hit by the Weapon have Vulnerability to an effect based on the chosen Damage Type for 1 Round: Radiant (Blinded), Psychic (Dazed), or Umbral (Doomed).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "inhibiting",
				"name": "Inhibiting",
				"description": "Creatures attacked by the Weapon must make a Mental Save. Save Failure: The target subtracts a d4 from their Checks for 1 Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "natures-tether",
		"name": "Nature's Tether",
		"sources": [
			"Primal"
		],
		"school": "Conjuration",
		"tags": [
			"Bleeding",
			"Motion",
			"Plant",
			"Restrained",
			"Tethered"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a whip made of vines, web, or some other natural effect that reaches for a target of your choice within range.\n\n\n\nCreature: If you target a creature, you can take the following Actions against the target:\n\n\n\n- Pursuit: You pull yourself up to 5 Spaces toward the target.\n\n- Pull: Make a Spell Check against the creature's Might Save. Save Failure: You pull them up to 2 Spaces toward you. Save Failure (each 5): You pull them up to 1 additional Space.\n\n\n\nObject: If you target an object that's not being held or carried, you pull it up to 5 Spaces towards you if it weighs less than you, or you pull yourself up to 5 Spaces towards it if it weighs more than you."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "distance",
				"name": "Distance",
				"description": "The distance moved increases by 2 Spaces.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "bleeding",
				"name": "Bleeding",
				"description": "The target must make a Might Save. Save Failure: They begin Bleeding X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "tether",
				"name": "Tether",
				"description": "The target must make a Might Save. Save Failure: They becomes Tethered to you a distance equal to the Spell's range. While Tethered in this way, you can spend 1 AP to take the Pursuit or Pull Actions against the target. Once on each of their turns, the target can spend 1 AP to attempt the Save again, ending the Condition on a success.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "restrain",
				"name": "Restrain",
				"description": "While Tethered by this Spell, the target is Restrained.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Requires Tether",
				"requires": [
					"tether"
				]
			}
		]
	},
	{
		"id": "oil-slick",
		"name": "Oil Slick",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Conjuration",
		"tags": [
			"Burning",
			"Trap"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "An oily substance covers the ground in a 3 Space diameter Sphere area within range. When you cast the Spell, make a Spell Check against the Agility Save of each target in the area. Check Success: The target falls Prone.\n\n\n\nThe affected Spaces are Difficult Terrain for the duration. The first time per turn a creature enters a Space within the area, it makes an Agility Save against your Save DC. Save Failure: The target falls Prone."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "spreading-oil",
				"name": "Spreading Oil",
				"description": "Whenever a creature falls Prone in the area, it becomes afflicted by Spreading Oil for the duration. When the creature enters a Space, that Space becomes affected by the Spell. A creature afflicted by Spreading Oil makes a Repeated Agility Save at the end of each of its turns, ending the effect on a Success.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "flammable",
				"name": "Flammable",
				"description": "Any oil produced by this Spell becomes flammable. If fire touches the Space it ignites. When a creature enters the area for the first time on its turn, or starts its turn in an ignited Space, it makes a Repeated Physical Save against your Save DC. Save Failure: The target begins Burning X for 1 minute.\n\nDC Tip: Ignited Spaces remain Covered for the duration, creatures still make Saves against falling Prone.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "tendrils-from-beyond",
		"name": "Tendrils from Beyond",
		"sources": [
			"Arcane"
		],
		"school": "Conjuration",
		"tags": [
			"Aberration",
			"Bludgeoning",
			"Madness",
			"Psychic"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You bring forth tendrils from beyond which cover each surface in a 3 Space diameter Sphere within range for the duration. Spaces filled with tendrils become Difficult Terrain.\n\n\n\nWhen you cast this Spell, make an Area Spell Attack against the PD of each creatures in the area. Hit: The target takes 1 Bludgeoning or Psychic damage (your choice).\n\n\n\nTendril Attack: Once on each of your turns, when you Sustain this Spell or by spending 1 AP on your turn, you can make an Area Spell Attack against the PD of each target within the area. Hit: The target takes 1 Bludgeoning or Psychic damage (your choice)."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by 1.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by 1 Space.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "moving-tendrils",
				"name": "Moving Tendrils",
				"description": "When you Sustain this Spell or by spending 1 AP, you can move the area up to 5 Spaces to another Space within range.\n\nDC Tip: You can choose the order of your effects that occur at the same time, such as moving and attacking with the Tendrils.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "maw-of-madness",
				"name": "Maw of Madness",
				"description": "When a creature enters the area for the first time on its turn or starts its turn there, it makes an Intelligence Save against your Save DC. Save Failure: The target spends 1 AP suffering from temporary madness.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "tripping",
				"name": "Tripping",
				"description": "When you make an Attack with this Spell, each target makes an Agility Save against your Save DC. Save Failure: The target falls Prone.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "unholy-aura",
		"name": "Unholy Aura",
		"sources": [
			"Divine"
		],
		"school": "Conjuration",
		"tags": [
			"Death",
			"Doomed",
			"Shadow",
			"Tethered"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "Umbral energy surrounds you in a 1 Space Aura for the duration. When you cast the Spell, make a Spell Check against the Repeated Charisma Save of each target within the area. Check Success: The target is Doomed for the duration.\n\n\n\nDoomed Area: When a creature enters the area for the first time on its turn or starts its turn there, it makes a Repeated Charisma Save against your Save DC. Save Failure: The target is Doomed for the duration.\n\n\n\n## Summon Spells\n\n\n\nThe following Spells all share a common list of Summon Traits that you can find at the end of this section. Only the Traits unique to each of them are directly present in the Spells.\n\n\n\nDC Tip: Spells that summon creatures with Traits that aren't in this section (such as Call Familiar) don't share to those Summon Traits. They only have access to the Traits directly mentioned in their Spell."
			}
		],
		"spellPassive": "Obscure: Mundane lights produced by tiny or smaller sources stop working while within the Aura.",
		"enhancements": [
			{
				"id": "area",
				"name": "Area",
				"description": "The radius of the Aura increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "doomed",
				"name": "Doomed",
				"description": "Whenever a target gains Doomed from this Spell, it gains an additional stack for each time you use this Enhancement.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "deathly-conversion",
				"name": "Deathly Conversion",
				"description": "When a Doomed creature dies within the Aura, you gain 2 Temp HP. The Temp HP increases by 2 each time you use this Enhancement.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "grasping-wisps",
				"name": "Grasping Wisps",
				"description": "Creatures Doomed by this Spell are also Tethered to the Unholy Aura.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "summon-aberration",
		"name": "Summon Aberration",
		"sources": [
			"Arcane"
		],
		"school": "Conjuration",
		"tags": [
			"Aberration",
			"Cold",
			"Psychic",
			"Summoning"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Small or Medium sized Aberration within range for the duration. The creature uses the Summoned Aberration stat block.\n\n\n\nSpell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears.\n\n\n\nRecasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.\n\n\n\n## Summoned Aberration\n\n\n\n| HP | 3 | AP | 2 |\n\n|-------|-------------|---------|-------------|\n\n| PD | 8 + CM + PM | AD | 8 + CM + PM |\n\n| PM | Shared | Save DC | Shared |\n\n| Speed | 5 | CM | Shared |\n\n| MIG | -1 | CHA | -1 |\n\n| AGI | 0 | INT | PM |\n\n\n\nDC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours.\n\n\n\n## Base Summon Traits\n\n\n\nThe summoned creature has the following Summon Traits:\n\n\n\n- Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other.\n\n- Languages: The creature is Fluent in Common and Deep Speech.\n\n- Natural Weapon: Choose Psychic or Cold damage when you summon the Aberration. The Aberration gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type.\n\n- Aberration: The creature has Psychic Resistance (Half), Telepathy 10 Spaces, and ADV on Intelligence Saves.\n\n\n\n## Managing the Summons\n\n\n\nThe creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action.\n\n\n\n## Expanded Summon Traits\n\n\n\nSummoned Aberrations can choose from the following additional Summon Traits:\n\n\n\n## Unique Traits\n\n\n\n(1) Blindsight: The creature gains Blindsight 5 Spaces.\n\n\n\n(2) Wallwalk: The creature can walk normally on solid surfaces regardless of their orientation (such as upside down on the ceiling) without falling or needing to Climb. When knocked Prone, they fall off such surfaces to the ground.\n\n\n\n(2) Psychic Immunity: The creature gains Immunity to Psychic Damage."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-creature",
				"name": "Additional Creature",
				"description": "You summon 1 additional creature.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-traits",
				"name": "Additional Traits",
				"description": "You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "summon-beast",
		"name": "Summon Beast",
		"sources": [
			"Primal"
		],
		"school": "Conjuration",
		"tags": [
			"Beast",
			"Bludgeoning",
			"Piercing",
			"Slashing",
			"Summoning"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Small or Medium sized Beast within range for the duration. The creature uses the Summoned Beast stat block.\n\n\n\nSpell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears.\n\n\n\nRecasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.\n\n\n\n## Summoned Beast\n\n\n\n| HP | 3 | AP | 2 |\n\n|-------|-------------|---------|-------------|\n\n| PD | 8 + CM + PM | AD | 8 + CM + PM |\n\n| PM | Shared | Save DC | Shared |\n\n| Speed | 7 | CM | Shared |\n\n| MIG | PM | CHA | -2 |\n\n| AGI | 2 | INT | -2 |\n\n\n\nDC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours.\n\n\n\n## Base Summon Traits\n\n\n\nThe summoned creature has the following Summon Traits:\n\n\n\n- Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other.\n\n- Languages: The creature is Fluent in Common but can't speak.\n\n- Natural Weapon: Choose Bludgeoning, Piercing, or Slashing damage when you summon the Beast. The Beast gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type.\n\n- Beast: The creature has ADV on Awareness, Stealth, and Survival Checks, and gain an additional +2 bonus to Attacks while Flanking a creature.\n\n\n\n## Managing the Summons\n\n\n\nThe creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action.\n\n\n\n## Expanded Summon Traits\n\n\n\nSummoned Beasts can choose from the following additional Summon Traits:\n\n\n\n## Unique Traits\n\n\n\n(1) Darkvision: The creature gains Darkvision 10 Spaces.\n\n\n\n(1) Swim Speed: The creature gains a Swim Speed equal to its Speed and can breathe underwater.\n\n\n\n(1) Climb Speed: The creature gains a Climb Speed equal to its Speed.\n\n\n\n(2) Wallwalk: The creature can walk normally on solid surfaces regardless of their orientation (such as upside down on the ceiling) without falling or needing to Climb. When knocked Prone, they fall off such surfaces to the ground.\n\n\n\n(2) Burrow Speed: The creature gains a Burrow Speed equal to its Speed.\n\n\n\n(2) Fly Speed: The creature gains a Fly Speed equal to its Speed."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-creature",
				"name": "Additional Creature",
				"description": "You summon 1 additional creature.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-traits",
				"name": "Additional Traits",
				"description": "You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "summon-celestial",
		"name": "Summon Celestial",
		"sources": [
			"Divine"
		],
		"school": "Conjuration",
		"tags": [
			"Celestial",
			"Fire",
			"Radiant",
			"Summoning"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Small or Medium sized Celestial within range for the duration. The creature uses the Summoned Celestial stat block.\n\n\n\nSpell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears.\n\n\n\nRecasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.\n\n\n\n## Summoned Celestial\n\n\n\n| HP | 3 | AP | 2 |\n\n|-------|-------------|---------|-------------|\n\n| PD | 8 + CM + PM | AD | 8 + CM + PM |\n\n| PM | Shared | Save DC | Shared |\n\n| Speed | 5 | CM | Shared |\n\n| MIG | -1 | CHA | PM |\n\n| AGI | -1 | INT | 0 |\n\n\n\nDC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours.\n\n\n\n## Base Summon Traits\n\n\n\nThe summoned creature has the following Summon Traits:\n\n\n\n- Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other.\n\n- Languages: The creature is Fluent in Common and Celestial.\n\n- Natural Weapon: Choose Fire or Radiant damage when you summon the Celestial. The Celestial gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type.\n\n- Celestial: The creature has Radiant Resistance (Half), Blindsight 10 Spaces, and ADV on Charisma Saves.\n\n\n\n## Managing the Summons\n\n\n\nThe creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action.\n\n\n\n## Expanded Summon Traits\n\n\n\nSummoned Celestials can choose from the following additional Summon Traits:\n\n\n\n## Unique Traits\n\n\n\n(1) Telepathy: The creature can communicate telepathically with any creature it can see within 5 Spaces.\n\n\n\n(2) Fly Speed: The creature gains a Fly Speed equal to its Speed.\n\n\n\n(2) Radiant Immunity: The creature gains Immunity to Radiant Damage."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-creature",
				"name": "Additional Creature",
				"description": "You summon 1 additional creature.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-traits",
				"name": "Additional Traits",
				"description": "You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "summon-construct",
		"name": "Summon Construct",
		"sources": [
			"Arcane"
		],
		"school": "Conjuration",
		"tags": [
			"Bludgeoning",
			"Construct",
			"Piercing",
			"Slashing",
			"Summoning"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Small or Medium sized Construct within range for the duration. Alternatively, you can animate an object within range instead, provided it's of a size you can summon. When you animate an object, it becomes a Construct creature of the same size. The summoned or animated creature uses the Summoned Construct stat block.\n\n\n\nSpell End: The Spell ends early if all summoned or animated creatures are reduced to 0 HP. When a creature summoned or animated by this Spell is reduced to 0 HP, its body disappears (if summoned) or returns to being an object (if animated).\n\n\n\nRecasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.\n\n\n\n## Summoned Construct\n\n\n\n| HP | 3 | AP | 2 |\n\n|-------|-------------|---------|-------------|\n\n| PD | 8 + CM + PM | AD | 8 + CM + PM |\n\n| PM | Shared | Save DC | Shared |\n\n| Speed | 5 | CM | Shared |\n\n| MIG | PM | CHA | -2 |\n\n| AGI | 2 | INT | -2 |\n\n\n\nDC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours.\n\n\n\n## Base Summon Traits\n\n\n\nThe summoned creature has the following Summon Traits:\n\n\n\n- Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other.\n\n- Languages: The creature is Fluent in Common and 1 other Language of your choice you know.\n\n- Natural Weapon: Choose Bludgeoning, Piercing, or Slashing damage when you summon the Construct. If you animated an object, the GM chooses a damage type that makes sense for the object animated (this could be a non-physical damage type). The Construct gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type.\n\n- Construct: The creature has Poison, Disease, and Bleeding Immunity, and doesn't require food, drink, air, or sleep.\n\n\n\n## Managing the Summons\n\n\n\nThe creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action.\n\n\n\n## Expanded Summon Traits\n\n\n\nSummoned or animated Constructs can choose from the following additional Summon Traits:\n\n\n\n## Unique Traits\n\n\n\n(1) Darkvision: The creature gains Darkvision 10 Spaces.\n\n\n\n(1) Climb Speed: The creature gains a Climb Speed equal to its Speed.\n\n\n\n(2) Wallwalk: The creature can walk normally on solid surfaces regardless of their orientation (such as upside down on the ceiling) without falling or needing to Climb. When knocked Prone, they fall off such surfaces to the ground."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-creature",
				"name": "Additional Creature",
				"description": "You summon 1 additional creature.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-traits",
				"name": "Additional Traits",
				"description": "You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "summon-dragon",
		"name": "Summon Dragon",
		"sources": [
			"Arcane"
		],
		"school": "Conjuration",
		"tags": [
			"Dragon",
			"Piercing",
			"Slashing",
			"Summoning"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Small or Medium sized Dragon within range for the duration. The creature uses the Summoned Dragon stat block.\n\n\n\nSpell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears.\n\n\n\nRecasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.\n\n\n\n## Summoned Dragon\n\n\n\n| HP | 3 | AP | 2 |\n\n|-------|-------------|---------|-------------|\n\n| PD | 8 + CM + PM | AD | 8 + CM + PM |\n\n| PM | Shared | Save DC | Shared |\n\n| Speed | 5 | CM | Shared |\n\n| MIG | PM | CHA | 1 |\n\n| AGI | -2 | INT | -1 |\n\n\n\nDC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours.\n\n\n\n## Base Summon Traits\n\n\n\nThe summoned creature has the following Summon Traits:\n\n\n\n- Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other.\n\n- Languages: The creature is Fluent in Common and Draconic.\n\n- Natural Weapon: Choose Piercing or Slashing damage when you summon the Dragon. The Dragon gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type.\n\n- Dragon: The creature has Resistance (Half) to a damage type of your choice (except True damage), and the Dragonborn's Breath Weapon Ancestry Trait of the chosen damage type. The creature can spend your MP to enhance this action.\n\n\n\n(2) Breath Weapon: Your breath becomes a Natural Weapon called your Breath Weapon. You can use your Breath Weapon to make a Ranged or Area Martial Attack. Before making the Attack, you can spend 1 or more AP, SP, MP, or a combination of each to increase the damage.\n\n\n\n- Ranged Attack: You spend 1 AP to make a Ranged Martial Attack against 1 target's PD within 10 Spaces. Hit: The target takes 1 Draconic damage (+1 per additional AP or SP spent or +2 per MP spent).\n\n- Area Attack: You spend 2 AP to make an Area Martial Attack against every target's AD within a 2 Space Cone or 4 Space Line. Hit: The target takes 1 Draconic damage (+1 per additional 2 AP, 2 SP, or 1 MP spent).\n\n\n\n## Managing the Summons\n\n\n\nThe creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action.\n\n\n\n## Expanded Summon Traits\n\n\n\nSummoned Dragons can choose from the following additional Summon Traits:\n\n\n\n## Unique Traits\n\n\n\n(1) Darkvision: The creature gains Darkvision 10 Spaces.\n\n\n\n(1) Climb Speed: The creature gains a Climb Speed equal to its Speed.\n\n\n\n(2) Fly Speed: The creature gains a Fly Speed equal to its Speed.\n\n\n\n(2) Immunity: The creature gains Immunity to the Damage type chosen in the Dragon Trait."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-creature",
				"name": "Additional Creature",
				"description": "You summon 1 additional creature.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-traits",
				"name": "Additional Traits",
				"description": "You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "summon-elemental",
		"name": "Summon Elemental",
		"sources": [
			"Primal"
		],
		"school": "Conjuration",
		"tags": [
			"Bludgeoning",
			"Cold",
			"Corrosion",
			"Elemental",
			"Fire",
			"Lightning",
			"Piercing",
			"Slashing",
			"Summoning"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Small or Medium sized Elemental within range for the duration. The creature uses the Summoned Elemental stat block.\n\n\n\nSpell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears.\n\n\n\nRecasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.\n\n\n\n## Summoned Elemental\n\n\n\n| HP | 3 | AP | 2 |\n\n|-------|-------------|---------|-------------|\n\n| PD | 8 + CM + PM | AD | 8 + CM + PM |\n\n| PM | Shared | Save DC | Shared |\n\n| Speed | 5 | CM | Shared |\n\n| MIG | See Traits | CHA | 0 |\n\n| AGI | See Traits | INT | 0 |\n\n\n\nDC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours.\n\n\n\n## Base Summon Traits\n\n\n\nThe summoned creature has the following Summon Traits:\n\n\n\n- Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other.\n\n- Languages: The creature is Fluent in Common and Elemental.\n\n- Natural Weapon: The Elemental gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of a type depending on which Elemental type they are (see below).\n\n\n\n## Elemental Trait\n\n\n\nWhen you summon the elemental you choose Air, Earth, Water, or Fire, the elemental gains the below trait corresponding to the type chosen:\n\n\n\n- Air: The creature has Lightning Resistance (Half), +5 Jump Distance, and can hold its breath indefinitely. The creature has an Agility equal to your Prime Modifier, a Might of 1 and their Natural Weapon deals Lightning or Slashing damage (chosen when you summon the Elemental).\n\n- Earth: The creature has PDR, a Burrow Speed equal to its Speed, and Tremorsense 3 Spaces. The creature has a Might equal to your Prime Modifier, an Agility of 1, and their Natural Weapon deals Bludgeoning or Piercing damage (chosen when you summon the elemental).\n\n- Fire: The creature has Fire Resistance (Half), automatically deals 1 Fire damage to creatures within 1 Space that Hit it with a Melee Attack, and can emit 5 Space of Bright Light at will. The creature has an Agility equal to your Prime Modifier, a Might of 1, and their Natural Weapon deals Fire damage.\n\n- Water: The creature has Cold and Corrosion Resistance (Half), a Swim Speed equal to its Speed, and can breath underwater. The creature has a Might equal to your Prime Modifier, an Agility of 1, and their Natural Weapon deals Cold or Corrosion damage (chosen when you summon the Elemental).\n\n\n\n## Managing the Summons\n\n\n\nThe creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action.\n\n\n\n## Expanded Summon Traits\n\n\n\nSummoned Elementals can choose from the following additional Summon Traits:\n\n\n\n## Unique Traits\n\n\n\n(1) Blindsight: (Water Elemental only) The creature gains Blindsight 5 Spaces.\n\n\n\n(2) Fly Speed: (Air or Fire Elemental only) The creature gains a Fly Speed equal to its Speed.\n\n\n\n(2) Wallwalk: (Earth Elemental only) The creature can walk normally on solid surfaces regardless of their orientation (such as upside down on the ceiling) without falling or needing to Climb. When knocked Prone, they fall off such surfaces to the ground.\n\n\n\n(2) Immunity: The creature gains Immunity to the Damage type it has Resistance to in its Elemental Trait."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-creature",
				"name": "Additional Creature",
				"description": "You summon 1 additional creature.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-traits",
				"name": "Additional Traits",
				"description": "You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "summon-fey",
		"name": "Summon Fey",
		"sources": [
			"Primal"
		],
		"school": "Conjuration",
		"tags": [
			"Fey",
			"Psychic",
			"Slashing",
			"Summoning"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Small or Medium sized Elemental within range for the duration. The creature uses the Summoned Fey stat block.\n\n\n\nSpell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears.\n\n\n\nRecasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.\n\n\n\n## Summoned Fey\n\n\n\n| HP | 3 | AP | 2 |\n\n|-------|-------------|---------|-------------|\n\n| PD | 8 + CM + PM | AD | 8 + CM + PM |\n\n| PM | Shared | Save DC | Shared |\n\n| Speed | 5 | CM | Shared |\n\n| MIG | -2 | CHA | 0 |\n\n| AGI | PM | INT | 0 |\n\n\n\nDC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours.\n\n\n\n## Base Summon Traits\n\n\n\nThe summoned creature has the following Summon Traits:\n\n\n\n- Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other.\n\n- Languages: The creature is Fluent in Common and Fey.\n\n- Natural Weapon: Choose a Psychic or Slashing damage when you summon the Fey. The Fey gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type.\n\n- Fey: The creature has ADV on Trickery and Intimidation Checks, and ADV on Saves against MP Effects.\n\n\n\n## Managing the Summons\n\n\n\nThe creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action.\n\n\n\n## Expanded Summon Traits\n\n\n\nSummoned Fey can choose from the following additional Summon Traits:\n\n\n\n## Unique Traits\n\n\n\n(1) Telepathy: The creature can communicate telepathically with any creature it can see within 5 Spaces.\n\n\n\n(1) Darkvision: The creature gains Darkvision 10 Spaces.\n\n\n\n(1) Swim Speed: The creature gains a Swim Speed equal to its Speed and can breathe underwater.\n\n\n\n(2) Fly Speed: The creature gains a Fly Speed equal to half its Speed."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-creature",
				"name": "Additional Creature",
				"description": "You summon 1 additional creature.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-traits",
				"name": "Additional Traits",
				"description": "You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "summon-fiend",
		"name": "Summon Fiend",
		"sources": [
			"Divine"
		],
		"school": "Conjuration",
		"tags": [
			"Corrosion",
			"Fiend",
			"Fire",
			"Poison",
			"Summoning"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Small or Medium sized Fiend within range for the duration. The creature uses the Summoned Fey stat block.\n\n\n\nSpell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears.\n\n\n\nRecasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.\n\n\n\n## Summoned Fiend\n\n\n\n| HP | 3 | AP | 2 |\n\n|-------|-------------|---------|-------------|\n\n| PD | 8 + CM + PM | AD | 8 + CM + PM |\n\n| PM | Shared | Save DC | Shared |\n\n| Speed | 5 | CM | Shared |\n\n| MIG | -1 | CHA | PM |\n\n| AGI | -1 | INT | 0 |\n\n\n\nDC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours.\n\n\n\n## Base Summon Traits\n\n\n\nThe summoned creature has the following Summon Traits:\n\n\n\n- Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other.\n\n- Languages: The creature is Fluent in Common and Fiendish.\n\n- Natural Weapon: Choose Fire, Poison or Corrosion damage when you summon the Fiend. The Fiend gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type.\n\n- Fiend: The creature has Fire and Corrosion Resistance (Half), and Darkvision 10 Spaces.\n\n\n\n## Managing the Summons\n\n\n\nThe creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action.\n\n\n\n## Expanded Summon Traits\n\n\n\nSummoned Fiends can choose from the following additional Summon Traits:\n\n\n\n## Unique Traits\n\n\n\n(1) Telepathy: The creature can communicate telepathically with any creature it can see within 5 Spaces.\n\n\n\n(1) Blindsight: The creature gains Blindsight 5 Spaces.\n\n\n\n(2) Fly Speed: The creature gains a Fly Speed equal to its Speed.\n\n\n\n(2) Corrosion Immunity: The creature gains Immunity to Corrosion Damage.\n\n\n\n(2) Fire Immunity: The creature gains Immunity to Fire Damage."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-creature",
				"name": "Additional Creature",
				"description": "You summon 1 additional creature.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-traits",
				"name": "Additional Traits",
				"description": "You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "summon-ooze",
		"name": "Summon Ooze",
		"sources": [
			"Arcane"
		],
		"school": "Conjuration",
		"tags": [
			"Corrosion",
			"Ooze",
			"Summoning"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Small or Medium sized Ooze within range for the duration. The creature uses the Summoned Fey stat block.\n\n\n\nSpell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears.\n\n\n\nRecasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.\n\n\n\n## Summoned Ooze\n\n\n\n| HP | 3 | AP | 2 |\n\n|-------|-------------|---------|-------------|\n\n| PD | 8 + CM + PM | AD | 8 + CM + PM |\n\n| PM | Shared | Save DC | Shared |\n\n| Speed | 5 | CM | Shared |\n\n| MIG | 1 | CHA | -1 |\n\n| AGI | PM | INT | -2 |\n\n\n\nDC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours.\n\n\n\n## Base Summon Traits\n\n\n\nThe summoned creature has the following Summon Traits:\n\n\n\n- Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other.\n\n- Languages: The creature is Fluent in Common but can't speak.\n\n- Natural Weapon: The Ooze gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 Corrosion damage.\n\n- Ooze: The creature has Corrosion Immunity, and can squeeze through a gap as narrow as 1 inch. Additionaly, the creature can walk normally on solid surfaces regardless of their orientation (such as upside down on the ceiling) without falling or needing to Climb. When knocked Prone, they fall off such surfaces to the ground.\n\n\n\n## Managing the Summons\n\n\n\nThe creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action.\n\n\n\n## Expanded Summon Traits\n\n\n\nSummoned Oozes can choose from the following additional Summon Traits:\n\n\n\n## Unique Traits\n\n\n\n(1) Fluid: The creature is Immune to fall damage.\n\n\n\n(2) Amorphous: The creature gains Resistance (Half) to Bludgeoning and Piercing damage."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-creature",
				"name": "Additional Creature",
				"description": "You summon 1 additional creature.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-traits",
				"name": "Additional Traits",
				"description": "You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "summon-plant",
		"name": "Summon Plant",
		"sources": [
			"Primal"
		],
		"school": "Conjuration",
		"tags": [
			"Bludgeoning",
			"Plants",
			"Piercing",
			"Poison",
			"Summoning"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Small or Medium Sized Plant within range for the duration. Alternatively, you can animate a plant within range instead, provided it's of a Size you can summon. When you animate a plant, it becomes a Plant creature of the same Size. The summoned or animated creature uses the Summoned Plant stat block.\n\n\n\nSpell End: The Spell ends early if all summoned or animated creatures are reduced to 0 HP. When a creature summoned or animated by this Spell is reduced to 0 HP, its body disappears (if summoned) or returns to being a plant (if animated).\n\n\n\nRecasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.\n\n\n\n## Summoned Plant\n\n\n\n| HP | 3 | AP | 2 |\n\n|-------|-------------|---------|-------------|\n\n| PD | 8 + CM + PM | AD | 8 + CM + PM |\n\n| PM | Shared | Save DC | Shared |\n\n| Speed | 5 | CM | Shared |\n\n| MIG | PM | CHA | -2 |\n\n| AGI | 2 | INT | -2 |\n\n\n\nDC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours.\n\n\n\n## Base Summon Traits\n\n\n\nThe summoned creature has the following Summon Traits:\n\n\n\n- Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other.\n\n- Languages: The creature is Fluent in Common and Fey but can't speak.\n\n- Natural Weapon: Choose a Bludgeoning, Piercing or Poison damage when you summon the Plant. The Plant gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type.\n\n- Plant: The creature has Poison Resistance (Half), Bleeding Immunity, and ignores Difficult Terrain.\n\n\n\n## Managing the Summons\n\n\n\nThe creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action.\n\n\n\n## Expanded Summon Traits\n\n\n\nSummoned or animated Plants can choose from the following additional Summon Traits:\n\n\n\n## Unique Traits\n\n\n\n(1) Climb Speed: The creature gains a Climb Speed equal to its Speed.\n\n\n\n(2) Burrow Speed: The creature gains a Burrow Speed equal to its Speed.\n\n\n\n(2) Poison Immunity: The creature gains Immunity to Poison Damage."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-creature",
				"name": "Additional Creature",
				"description": "You summon 1 additional creature.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-traits",
				"name": "Additional Traits",
				"description": "You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "summon-undead",
		"name": "Summon Undead",
		"sources": [
			"Divine"
		],
		"school": "Conjuration",
		"tags": [
			"Bludgeoning",
			"Umbral",
			"Undead",
			"Summoning"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You summon a Small or Medium Sized Undead within range for the duration. Alternatively, you can animate a corpse within range instead, provided it's of a Size you can summon. When you animate a corpse, it becomes an Undead creature of the same Size. The summoned or animated creature uses the Summoned Undead stat block.\n\n\n\nSpell End: The Spell ends early if all summoned or animated creatures are reduced to 0 HP. When a creature summoned or animated by this Spell is reduced to 0 HP, its body disappears (if summoned) or returns to being a corpse (if animated).\n\n\n\nRecasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.\n\n\n\n## Summoned Undead\n\n\n\n| HP | 3 | AP | 2 |\n\n|-------|-------------|---------|-------------|\n\n| PD | 8 + CM + PM | AD | 8 + CM + PM |\n\n| PM | Shared | Save DC | Shared |\n\n| Speed | 5 | CM | Shared |\n\n| MIG | PM | CHA | -1 |\n\n| AGI | 1 | INT | -2 |\n\n\n\nDC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours.\n\n\n\n## Base Summon Traits\n\n\n\nThe summoned creature has the following Summon Traits:\n\n\n\n- Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other.\n\n- Languages: The creature is Fluent in Common. If animated, it also knows the Languages its corpse knew.\n\n\n\nDC Tip: If you animate a corpse, it doesn't retain any memories it had in life.\n\n\n\n- Natural Weapon: Choose Bludgeoning or Umbral damage when you summon the creature. The creature gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type.\n\n- Undead: The creature has Umbral Resistance (Half), Poison and Disease Immunity, and doesn't require air or sleep.\n\n\n\n## Managing the Summons\n\n\n\nThe creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action.\n\n\n\n## Expanded Summon Traits\n\n\n\nSummoned or animated Undead can choose from the following additional Summon Traits:\n\n\n\n## Unique Traits\n\n\n\n(1) Darkvision: The creature gains Darkvision 10 Spaces.\n\n\n\n(2) Ghostlike: The creature gains Resistance (Half) to Physical Damage and Vulnerability to Radiant Damage.\n\n\n\n- (2) Incorporeal: The creature can move through solid objects and creatures. If the creature ends its turn inside an object or creature, it takes True damage equal to 25% of its maximum HP.\n\n\n\n(2) Umbral Immunity: The creature gains Immunity to Umbral Damage.\n\n\n\n## Summon Traits\n\n\n\nBelow is a list of repeatable and unique Summon Traits. You can choose repeatable traits multiple times, but unique traits only once.\n\n\n\n## Repeatable Traits\n\n\n\n(1) Attribute Increase: Choose an Attribute. The creature's chosen Attribute changes to equal your Prime Modifier.\n\n\n\n(1) Health: The creature’s HP is increased by 1.\n\n\n\n(2) Damage: The creature’s Attacks deal +1 damage.\n\n\n\n(1) Defensive: The creature's PD or AD (your choice) becomes equal to your Save DC.\n\n\n\n(2) Check Mastery: Choose an Attribute. The creature adds your Combat Mastery to Checks it makes using the chosen Attribute. You can only choose this Trait once per Attribute.\n\n\n\n(1) Speed Increase: The creature's Speed is increased by 2 Spaces.\n\n\n\n(2) Size Increase: The creature's size increases by 1 (maximum of Huge).\n\n\n\n(1) Size Decrease: The creature's size decreases by 1 (minimum of Micro).\n\n\n\n## Unique Traits\n\n\n\n(1) Awareness Mastery: The creature adds your Combat Mastery to its Awareness Checks.\n\n\n\n(1) Distant Link: The range of your Shared Telepathy increases to 100 Spaces, and you always know the exact location of the creature provided you're both on the same plane of existence.\n\n\n\n(1) Friendly Fire: The creature is Immune to effects and damage you produce, unless you choose otherwise.\n\n\n\n(1) Natural Weapon Style: You can choose 1 Weapon Style that fits the desired Natural Weapon of the creature. The creature can use the Weapon Enhancement of the chosen Weapon Style with its Natural Weapon.\n\n\n\n(2) Martial: The creature is able to perform the Opportunity Attack Reaction and is wielding a Weapon of your choice that it's considered to have Training with.\n\n\n\nDC Tip: This lets them use the Martial Enhancements.\n\n\n\n(2) Spellcaster: The creature is able to perform the Spell Duel Reaction, is wielding a Spell Focus of your choice that it's considered to have Training with, and knows how to cast 1 Spell of your choice that you know. The creature can spend your MP on its Actions (Spell and Spell Duels).\n\n\n\n## Divination\n\n\n\nDivination is the magic of revealing the unknown and the unseen, such as hidden knowledge (past, present, or future) and special vision (the invisible, the illusory, or distant locations). Spells that grant magical sight, bestow knowledge, or discern the truth fall into the School of Divination."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-creature",
				"name": "Additional Creature",
				"description": "You summon 1 additional creature.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "additional-traits",
				"name": "Additional Traits",
				"description": "You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "bless",
		"name": "Bless",
		"sources": [
			"Divine"
		],
		"school": "Divination",
		"tags": [
			"Embolden"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "A creature of your choice within range gains 1 of the blessings from the list below for the duration. Make a DC 15 Spell Check. Failure: The blessing is a d4. Success: The blessing is a d6. Success (10): The Blessing is a d8.\n\n\n\n## Blessings\n\n\n\n- Attacks: The target adds the die to its Attack Checks for the duration.\n\n- Saves: The target adds the die to its Saves for the duration."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You increase the number of targets by X. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "full-bless",
				"name": "Full Bless",
				"description": "The target benefits from both Blessings. The cost of this Enhancement increases to 2 MP if you use the Targets Enhancement.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "greater-bless",
				"name": "Greater Bless",
				"description": "The size of the die granted increases by 1 step (d4 -> d6 -> d8 -> d10 -> d12).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "danger-sense",
		"name": "Danger Sense",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Divination",
		"tags": [
			"Embolden",
			"Emotions",
			"Knowledge",
			"Sense",
			"Surprised",
			"Ward"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Hour",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You grant a creature within range supernatural foresight for the duration. Make a DC 15 Spell Check. Failure: The target can't be Surprised. Success: The target also has ADV on Initiative Checks. Success (5): The target also adds a d8 to Initiative Checks."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration is increased by 1 step (1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "sense-bloodlust",
				"name": "Sense Bloodlust",
				"description": "The target can sense if creatures within 10 Spaces are Hostile towards them.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "detect-magic",
		"name": "Detect Magic",
		"sources": [
			"Arcane",
			"Divine",
			"Primal"
		],
		"school": "Divination",
		"tags": [
			"Antimagic",
			"Knowledge",
			"Sense"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You can sense the presence of magic in a 3 Space Aura for the duration. The Aura is blocked by 6 inches (15 cm) of wood or earth (rock, dirt, mud, or sand), or 1 inch (25 mm) of metal. Make a DC 15 Spell Check. Failure: You learn if magic is present within the area. Success: You also learn the location of sources of magical effects in the area and can use the Examine Action.\n\n\n\nExamine: When you Sustain this Spell, or by spending 1 AP, you can examine the source of a magical effect in the area. Make a Spell Check against the effect's Save DC (or the Save DC of the effect's creator if it doesn't have one). Success: You learn the effect's School of Magic, Spell Tags (if any), and the amount of MP used to produce the effect. Success (5): You learn the effect's name and exactly how it works.\n\n\n\nDC Tip: Curses are magical in nature, so this Spell allows you to sense them, potentially examine them, and learn how they work."
			}
		],
		"enhancements": [
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (1 minute -> 10 minutes -> 1 hour -> 8 hours -> until Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The Aura increases by 3 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "reactive-analysis",
				"name": "Reactive Analysis",
				"description": "For the duration, you have ADV on Spell Checks made as the Challenger of a Spell Duel.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "magical-forensics",
				"name": "Magical Forensics",
				"description": "When you succeed with the Examine Actions, you learn the effect's magical signature, which is unique to the caster that produced the effect. Whenever you use the Examine Action again on an effect of the same magical signature, you recognize it as being from the same caster.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "empowered-sight",
		"name": "Empowered Sight",
		"sources": [
			"Arcane",
			"Primal",
			"Divine"
		],
		"school": "Divination",
		"tags": [
			"Embolden",
			"Sense"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Hour",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You empower the eyesight of a creature within range for the duration. The target gains Darkvision 10 Spaces."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step. (1 hour -> 8 hours -> until Long Rest)",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "see-invisibility",
				"name": "See Invisibility",
				"description": "The target can see Invisible creatures within 10 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "piercing-sight",
				"name": "Piercing Sight",
				"description": "The target can see through up to 6 inches (15 cm) of wood or earth (rock, dirt, mud, or sand), or 1 inch (25 mm) of metal within 10 Spaces.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "true-sight",
				"name": "True Sight",
				"description": "The target also gain Truesight 10 Spaces.",
				"cost": {
					"mp": 4
				},
				"costText": "4 MP",
				"rawCost": "4 MP"
			}
		]
	},
	{
		"id": "foresight",
		"name": "Foresight",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Divination",
		"tags": [
			"Time",
			"Embolden"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You grant a creature within range supernatural reflexes for the duration. Attacks made against the target's PD have DisADV for the duration."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "avoidance",
				"name": "Avoidance",
				"description": "The target has ADV on Agility Saves for the duration.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "predictive-attacks",
				"name": "Predictive Attacks",
				"description": "The target has ADV on Attack Checks for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "locate-target",
		"name": "Locate Target",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Divination",
		"tags": [
			"Knowledge",
			"Planes",
			"Sense"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "1 Mile (1.6 km)",
		"duration": "1 Round",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "Describe or name a location, object, or creature and make a Spell Check against the DC listed in the table below. Failure: You learn if the target is within range but can't name the same target with this Spell until you complete a Long Rest. Success: You learn if the target is within range and the direction of the target if it's within range. If the target is a creature, you also learn if it's alive. Success (10): You also learn the distance to the target if it's within range.\n\n\n\n| Knowledge of Target | DC |\n\n|---------------------------------------------------------------------|------|\n\n| You’ve heard of the target. | 20 |\n\n| You’ve previously seen the target. | 15 |\n\n| You’ve been to the location or have previously touched the target. | 10 |\n\n\n\nDC Tip: The GM may increase or decrease the DC under certain circumstances (such as having a piece of the item or a lock of their hair)."
			}
		],
		"enhancements": [
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (1 round -> 1 minute -> 1 hour -> 8 hours -> until Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "range",
				"name": "Range",
				"description": "The range increases by 1 step (1 mile -> 10 miles -> 100 miles -> same plane of existence -> any plane of existence). If you increase the range to any plane of existence, you learn which plane of existence the target is on but not its location on that plane.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "scrying",
		"name": "Scrying",
		"sources": [
			"Divine"
		],
		"school": "Divination",
		"tags": [
			"Knowledge",
			"Sense",
			"Communication"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Plane of Existence",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "Describe or name a creature and make a Spell Check against the target's Charisma Save. You gain bonuses on your Spell Check as determined by the table below. The bonuses can stack but you can only benefit from each one once. The target becomes aware that they're being scried upon, but not that you're the scryer. Check Success: You conjure an invisible sensor within 2 Spaces of the target, provided it's on the same plane of existence. You can see the target through the sensor which hovers motionlessly and follows them when they move.\n\n\n\n| Connection | Bonus |\n\n|----------------------------------------------------------------------------------------------|---------|\n\n| You’ve touched the target. | +2 |\n\n| You possess an item of theirs. | +3 |\n\n| You possess a bodily item of theirs (such as a lock of hair, a nail, or some of its blood). | +5 |\n\n\n\n## Elemental\n\n\n\nElemental is the magic of the natural elements, such as earth, wind, fire, water, lightning, and corrosion. Spells that produce effects that manipulate the elementals fall into the School of Elemental."
			}
		],
		"enhancements": [
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (1 minute -> 10 minutes -> 1 hour -> 8 hours -> until Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "sound",
				"name": "Sound",
				"description": "You hear the target through the sensor.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "obscured-scrying",
				"name": "Obscured Scrying",
				"description": "The target is no longer aware that they're being scried upon (even if you fail the Check).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "extraplanar",
				"name": "Extraplanar",
				"description": "The range of the Spell becomes any plane of existence.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "absorb-elements",
		"name": "Absorb Elements",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Embolden",
			"Ward"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a protective elemental ward in response to damage.\n\n\n\nTrigger: When you take Elemental Damage.\n\n\n\nReaction: You reduce the damage taken by 3."
			}
		],
		"enhancements": [
			{
				"id": "amplified-shield",
				"name": "Amplified Shield",
				"description": "You reduce the damage taken by an additional 2.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "enduring-resistance",
				"name": "Enduring Resistance",
				"description": "After resolving the damage, you gain Resistance (Half) to the damage type you reduced for 1 Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "backlash",
				"name": "Backlash",
				"description": "You deal +X damage of the damage type your reduced on your next Attack made in until the end of your next turn.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "lingering-retaliation",
				"name": "Lingering Retaliation",
				"description": "For the next minute, when a creature Hits you with a Melee Attack, it takes X damage of of the damage type your reduced.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "acid-stream",
		"name": "Acid Stream",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Corrosion",
			"Enfeeble",
			"Hindered"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a stream of acid that project in a 8 Space Line. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Corrosion damage."
			}
		],
		"spellPassive": "Acidic: Mundane materials in the area (wood, leather, rope, nonmagical metals) that are not being worn or held partially erode or decay, weakening structures and gear.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The length of the Line increases by 4 Spaces.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "dissolve",
				"name": "Dissolve",
				"description": "Each target makes an Agility Save. Save Failure: They no longer benefit from PDR or EDR for 1 Round.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "remove-resistance",
				"name": "Remove Resistance",
				"description": "Each target makes an Agility Save. Save Failure: The target no longer benefits from Physical or Elemental Resistance for 1 Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "hinder",
				"name": "Hinder",
				"description": "Each target makes a Repeated Agility Save. Save Failure: The Target becomes covered in acid for 1 minute. While covered in acid, the target is Hindered. A creature within 1 Space (including itself) spends 1 AP to make a Survival Check against your Save DC, removing the acid on a Success.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "air-slash",
		"name": "Air Slash",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Air",
			"Bleeding",
			"Slashing"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a slash of high velocity wind that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Slashing damage."
			}
		],
		"spellPassive": "Wind: Unsecured mundane objects in the target's space are knocked over or blown away, especially light ones (papers, tools, empty crates). Can slam doors, scatter sand/dust and disperse smoke.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "bleeding",
				"name": "Bleeding",
				"description": "The target makes a Repeated Physical Save. Save Failure: The target begins Bleeding X for 1 minute.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "hidden-slash",
				"name": "Hidden Slash",
				"description": "You add a d10 to your Attack Check.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "blight-bomb",
		"name": "Blight Bomb",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Ailment",
			"Impaired",
			"Poison"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce an explosion of Poisonous gas in a 3 Space diameter Sphere within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Poison damage.\n\n\n\nClose Quarters Penalty: You have DisADV on the Attack if you're within the Melee Range of at least 1 enemy, unless that enemy is Incapacitated."
			}
		],
		"spellPassive": "Noxious: Plant life in the area that are not being worn or held wilts or dies, grass blackens, and flowers or vines shrivel where the Spell touches.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "impair",
				"name": "Impair",
				"description": "Each target makes a Might Save. Save Failure: The target become Impaired for 1 Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "deadly-poison",
				"name": "Deadly Poison",
				"description": "Each target makes a Might Save. Save Failure: The target becomes Poisoned for 1 minute. While Poisoned in this way, the creature takes X Poison damage at the start of each of its turns. A creature can make a Repeated Might Save at the end of each of its turns, ending the Poison on a success. This Poison can be removed by any effect that ends a Basic Poison.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "poison-cloud",
				"name": "Poison Cloud",
				"description": "The duration of the Spell becomes 1 minute. Poison gas fills the area for the duration. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Might Save against your Save DC. Save Failure: The target takes X Poison damage.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP, Sustained",
				"sustained": true,
				"variable": true
			}
		]
	},
	{
		"id": "cloud-cover",
		"name": "Cloud Cover",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Cold",
			"Shadow",
			"Slashing"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You obscure a 4 Space diameter Sphere within range with natural phenomenon (such as fog, sand, or sleet) for the duration. The Sphere spreads around corners. Targets within the area are Fully Concealed against creatures that aren't within 1 Space of them. The Spell ends early if a 20 mph (30 kph) wind disperses it.\n\n\n\nRelocate: When you Sustain this Spell, or by spending 1 AP, you can move the Sphere up to 5 Spaces to another Space within range."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "blanketing-cloud",
				"name": "Blanketing Cloud",
				"description": "Surfaces within the area becomes covered in natural phenomenon (such as debris, ice, or sand) for the duration, making them Difficult Terrain. When a creature enters the area for the first time on its turn, or starts its turn within there, it must make an Agility Save. Save Failure: The target falls Prone.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "abrasive-storm",
				"name": "Abrasive Storm",
				"description": "When a creature enters the area for the first time on its turn, or starts its turn within there, it must make an Might Save. Save Failure: The target takes X Slashing or Cold Damage (chosen when you use this Enhancement).",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "cold-wave",
		"name": "Cold Wave",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Cold",
			"Slowed",
			"Trap"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a rush of freezing air that envelops a 2 Space Arc. Make an Area Spell Attack against the AD of every target within the Spell's area. Hit: The target takes 1 Cold damage."
			}
		],
		"spellPassive": "Freezing: Liquids and objects not being held or carried in the area frost over, causing them to adhere to nearby surfaces. A creature can use a Minor Action to make a Might Check against your Save DC to dislodge an object.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The area’s radius increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "aura",
				"name": "Aura",
				"description": "The Area becomes an Aura instead.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "encasing-frost",
				"name": "Encasing Frost",
				"description": "Each target makes a Might Save against your Save DC. Save Failure: For the next round, the first time the target willingly moves or takes a Reaction it takes X Cold damage.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "slow",
				"name": "Slow",
				"description": "Each target makes a Repeated Might Save. Save Failure: The target is Slowed X for 1 Round.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "cone-of-cold",
		"name": "Cone of Cold",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Cold",
			"Slowed",
			"Stunned"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a rush of freezing air that envelops a 3 Space Cone. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Cold damage."
			}
		],
		"spellPassive": "Freezing: Liquids and objects not being held or carried in the area frost over, causing them to adhere to nearby surfaces. A creature can use a Minor Action to make a Might Check against your Save DC to dislodge an object.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The length of the Cone increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "slow",
				"name": "Slow",
				"description": "Each target makes a Repeated Might Save.\n\nSave Failure: The target is Slowed X for 1 Round.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "frozen-stiff",
				"name": "Frozen Stiff",
				"description": "Each target makes a Physical Save. Save Failure: The target is Stunned for 1 Round.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "corrosive-bolt",
		"name": "Corrosive Bolt",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Corrosion",
			"Enfeeble",
			"Hindered"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a bolt of acid that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Corrosion damage."
			}
		],
		"spellPassive": "Acidic: Mundane materials in the target's Space (wood, leather, rope, non-magical metals) that are not being worn or held partially erode or decay, weakening structures and gear.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "dissolve",
				"name": "Dissolve",
				"description": "The target makes a Repeated Agility Save. Save Failure: The target no longer benefits from PDR or EDR for 1 minute.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "acid",
				"name": "Acid",
				"description": "The target makes a Repeated Agility Save. Save Failure: The target becomes covered in acid for 1 minute. While covered in acid, the target is Hindered and take X Corrosion damage at the start of each of their turns. A creature within 1 Space (including itself) spends 1 AP to make a Survival Check against your Save DC, removing the acid on a Success.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "corrosive-cascade",
		"name": "Corrosive Cascade",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Corrosion",
			"Enfeeble"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a deluge of acid that envelops a 6 Space tall, 3 Space diameter Cylinder within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Corrosion damage.\n\n\n\nClose Quarters Penalty: You have DisADV on the Attack if you're within the Melee Range of at least 1 enemy, unless that enemy is Incapacitated."
			}
		],
		"spellPassive": "Acidic: Mundane materials in the area (wood, leather, rope, nonmagical metals) that are not being worn or held partially erode or decay, weakening structures and gear.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X\n\n.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Cylinder increases by 1 Space and the Height by 2 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "dissolve",
				"name": "Dissolve",
				"description": "Each target makes a Repeated Agility Save. Save Failure: The target no longer benefits from PDR or EDR for 1 minute.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "pitted-terrain",
				"name": "Pitted Terrain",
				"description": "Surfaces in the area become Difficult Terrain until the surfaces are repaired.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "acid-rain",
				"name": "Acid Rain",
				"description": "The duration of the spell becomes 1 minute. Acid rain falls in the area for the duration. When a creature enters the area for the first time on its turn or starts its turn there, it makes an Agility Save against your Save DC. Save Failure: The target takes X Corrosion damage.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP, Sustained",
				"sustained": true,
				"variable": true
			}
		]
	},
	{
		"id": "corrosive-wave",
		"name": "Corrosive Wave",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Corrosion",
			"Enfeeble",
			"Exposed"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a wave of acid that envelops a 2 Space Arc. Make a Spell Attack against the AD of every target within the area Hit: The target takes 1 Corrosion damage."
			}
		],
		"spellPassive": "Acidic: Mundane materials in the area (wood, leather, rope, nonmagical metals) that are not being worn or held partially erode or decay, weakening structures and gear.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The area's radius increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "aura",
				"name": "Aura",
				"description": "The Area becomes an Aura instead.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "dissolve",
				"name": "Dissolve",
				"description": "Each target makes a Repeated Agility Save. Save Failure: They no longer benefit from PDR or EDR for the 1 minute.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "exposing-acid",
				"name": "Exposing Acid",
				"description": "Each target makes a Repeated Agility Save. Save Failure: The target becomes covered in acid for 1 minute or until a creature (including itself) within 1 Space spends 1 AP to make a Survival Check against your Save DC, removing the acid on a Success. While covered in acid, the target is Exposed.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "elemental-shield",
		"name": "Elemental Shield",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Embolden",
			"Ward"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "1 Hour",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "A protective elemental ward surrounds you. Choose an Elemental damage type.\n\n\n\nMake a DC 15 Spell Check. Failure: You gain 2 Temp HP. Success: You gain 3 Temp HP. Success (each 5): +1 Temp HP.\n\n\n\nRetaliation: If a creature within 1 Space Hits you with an Attack while you have this Temp HP, the creature takes 1 damage of the chosen type for each Temp HP that was consumed by the Attack. The Spell ends early if all the Temp HP from this Spell is consumed."
			}
		],
		"enhancements": [
			{
				"id": "lashing-elements",
				"name": "Lashing Elements",
				"description": "The range of Retaliation is increased by 2 Spaces.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "durability",
				"name": "Durability",
				"description": "The Temp HP is increased by 2.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "resistance",
				"name": "Resistance",
				"description": "You gain Resistance (Half) to the chosen damage type for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "immunity",
				"name": "Immunity",
				"description": "You gain Immunity to the chosen damage type for the duration.",
				"cost": {
					"mp": 4
				},
				"costText": "4 MP",
				"rawCost": "4 MP"
			}
		]
	},
	{
		"id": "eruption",
		"name": "Eruption",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Bludgeoning",
			"Earth",
			"Motion"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You create a 3 Space diameter Sphere of erupting earth within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Bludgeoning damage.\n\n\n\nClose Quarters Penalty: You have DisADV on the Attack if you're within the Melee Range of at least 1 enemy, unless that enemy is Incapacitated."
			}
		],
		"spellPassive": "Quake: The ground rumbles and quakes, causing all unsecured small objects to fall and leaving visible cracks and marks across surfaces.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "erupted",
				"name": "Erupted",
				"description": "Each target makes a Physical Save. Save Failure: The target is pushed upward X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "fractured",
				"name": "Fractured",
				"description": "Surfaces in the Area becomes Difficult Terrain. A creature can spend 1 AP to clear 1 Space of this Difficult Terrain, returning the Space to normal.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "fireball",
		"name": "Fireball",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Burning",
			"Fire",
			"Shadow"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a brilliant flame that envelops a 3 Space Diameter Sphere area within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Fire damage.\n\n\n\nClose Quarters Penalty: You have DisADV on the Attack if you're within the Melee Range of at least 1 enemy, unless that enemy is Incapacitated."
			}
		],
		"spellPassive": "Ignite: Flammable objects that are not being worn or held in the target's Space catch fire. A creature can spend 1 AP to put out a mundane fire within 1 Space of them.\n\n\n\nBeta Note: For now, you can assume objects remain on fire for 1 minute and spreads to other flammable objects at a rate of 1 Space per minute unless the GM decided otherwise. A creature doesn't start Burning when it's in a Space with a burning object unless the entire Space is on Fire.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of a Sphere of your choice increases by 1 Space.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "burning",
				"name": "Burning",
				"description": "Each target makes a Repeated Physical Save. Save Failure: The target begins Burning for 1 minute.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "smoke",
				"name": "Smoke",
				"description": "The area becomes Fully Concealed by thick black smoke. Creatures in the area that can't hold their breath begin Suffocating. The smoke lasts for 1 Round or until a wind of moderate or greater speed disperses it.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "fireball-swarm",
				"name": "Fireball Swarm",
				"description": "You produce an additional 3 Space diameter Sphere within range using the same Spell Attack for all targets in each area. A creature can only be targeted once by this Spell even if they are in multiple Spheres.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "fire-blast",
		"name": "Fire Blast",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Burning",
			"Fire"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a brilliant flame that envelops a 1 Space Aura. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Fire damage."
			}
		],
		"spellPassive": "Ignite: Flammable objects that are not being worn or held in the target's Space catch fire. A creature can spend 1 AP to put out a mundane fire within 1 Space of them.\n\n\n\nBeta Note: For now, you can assume objects remain on fire for 1 minute and spreads to other flammable objects at a rate of 1 Space per minute unless the GM decided otherwise. A creature doesn't start Burning when it's in a Space with a burning object unless the entire Space is on Fire.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The Aura’s radius increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "mantle-of-fire",
				"name": "Mantle of Fire",
				"description": "The Spell's duration becomes 1 minute. The heat lingers on you in a 1 Space Aura for the duration. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Repeated Physical Save against your Save DC. Save Failure: The target begins Burning X for 1 minute.\n\nDC Tip: You can choose for the Space you occupy to not be affected by an Aura you produce.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP, Sustained",
				"sustained": true,
				"variable": true
			}
		]
	},
	{
		"id": "fire-bolt",
		"name": "Fire Bolt",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Burning",
			"Fire"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a bolt of fire that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Fire damage."
			}
		],
		"spellPassive": "Ignite: Flammable objects that are not being worn or held in the target's Space catch fire. A creature can spend 1 AP to put out a mundane fire within 1 Space of them.\n\n\n\nBeta Note: For now, you can assume objects remain on fire for 1 minute and spreads to other flammable objects at a rate of 1 Space per minute unless the GM decided otherwise. A creature doesn't start Burning when it's in a Space with a burning object unless the entire Space is on Fire.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by 1 for 1 target of your choice.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "burning",
				"name": "Burning",
				"description": "1 target of your choice makes a Repeated Physical Save. Save Failure: The target begins Burning for 1 minute.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "flaming-missile",
				"name": "Flaming Missile",
				"description": "Choose X additional targets within range using the same Spell Attack for all targets. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			}
		]
	},
	{
		"id": "fire-torrent",
		"name": "Fire Torrent",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Burning",
			"Fire",
			"Motion"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a torrent of fire that envelops a 3 Space Cone. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Fire damage."
			}
		],
		"spellPassive": "Ignite: Flammable objects that are not being worn or held in the target's Space catch fire. A creature can spend 1 AP to put out a mundane fire within 1 Space of them.\n\n\n\nBeta Note: For now, you can assume objects remain on fire for 1 minute and spreads to other flammable objects at a rate of 1 Space per minute unless the GM decided otherwise. A creature doesn't start Burning when it's in a Space with a burning object unless the entire Space is on Fire.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The length of the Cone increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "burning",
				"name": "Burning",
				"description": "Each target makes a Repeated Physical Save. Save Failure: The target begins Burning X for 1 minute.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "back-draft",
				"name": "Back Draft",
				"description": "Each target makes a Might Save against your Save DC. Save Failure: The target is pushed X Spaces away from you. Failure (each 5): The target is pushed 1 additional Space.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "freeze",
		"name": "Freeze",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Cold",
			"Enfeeble",
			"Immobilized",
			"Slowed",
			"Stunned"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You gather freezing wind around a target within range for the duration. Make a Spell Check contested by the target's Repeated Agility Save. Save Failure: The target is Slowed for the duration."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "increased-slow",
				"name": "Increased Slow",
				"description": "The target gains X additional stacks of Slowed.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "frostbite",
				"name": "Frostbite",
				"description": "While Slowed this way, the target takes X Cold damage at the start of each of their turns.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "brittle",
				"name": "Brittle",
				"description": "While Slowed this way, the target gains Vulnerability (1) to Physical damage.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "frozen-stiff",
				"name": "Frozen Stiff",
				"description": "On a failed Save, the target is Immobilized and Stunned 2 for the duration.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "frost-bolt",
		"name": "Frost Bolt",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Cold",
			"Slowed"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a bolt of condensed freezing air that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Cold damage."
			}
		],
		"spellPassive": "Freezing: Liquids and objects not being held or carried in the target's Space frost over, causing them to adhere to nearby surfaces. A creature can use a Minor Action to make a Might Check against your Save DC to dislodge an object.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X for 1 target of your choice.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP, Repeatable",
				"repeatable": true,
				"variable": true
			},
			{
				"id": "slow",
				"name": "Slow",
				"description": "1 target of your choice makes a Might Save. Save Failure: The target is Slowed X for 1 Round.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP, Repeatable",
				"repeatable": true,
				"variable": true
			},
			{
				"id": "frost-bomb",
				"name": "Frost Bomb",
				"description": "The projectile detonates on impact. Compare your Attack Check against the AD of every other target within 1 Space of the original target. Hit: The target takes X Cold damage. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			}
		]
	},
	{
		"id": "frost-storm",
		"name": "Frost Storm",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Cold",
			"Slowed"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "The temperature rapidly decreases in a 6 Space tall, 3 Space diameter Cylinder within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Cold damage.\n\n\n\nClose Quarters Penalty: You have DisADV on the Attack if you're within the Melee Range of at least 1 enemy, unless that enemy is Incapacitated."
			}
		],
		"spellPassive": "Freezing: Liquids and objects not being held or carried in the area frost over, causing them to adhere to nearby surfaces. A creature can use a Minor Action to make a Might Check against your Save DC to dislodge an object.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Cylinder increases by 1 Space and the Height by 2 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "slow",
				"name": "Slow",
				"description": "Each target makes a Repeated Might Save. Save Failure: The target is Slowed X for 1 Round.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "freeze",
				"name": "Freeze",
				"description": "The area is covered by ice, becoming Difficult Terrain. A Space stops being covered after 1 minute or when it takes fire damage. When a creature starts their turn on a Space covered by ice or enters it for the first time on their turn, it makes an Agility Save against your Save DC. Save Failure: The target falls Prone.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "gust",
		"name": "Gust",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Air",
			"Motion"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a gust of wind that targets a Medium Size or smaller creature or object within range. The Spell has no effect on secured or worn objects.\n\n\n\n- Creature or Held Object: If you target a creature or an object held by a creature, make a Spell Check contested by the creature's Might Save. Save Failure: The target is pushed horizontally 1 Space in a direction of your choice. Failure (each 5): The target is pushed 1 additional Space. If the target is a creature, you can choose to reduce the total distance the target is pushed by 1 Space to knock them Prone instead.\n\n- Loose Object: If the target is a loose object, make a DC 15 Spell Check. Check Failure: The target is pushed horizontally 1 Space in a direction of your choice. Check Success: The target is pushed 2 Spaces in a direction of your choice. Success (each 5): The target is pushed 1 additional Space.\n\n\n\nSmaller Target: The target is pushed up to 2 Spaces additional Spaces for each Size smaller it is than the maximum Size you can target."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "knock-over",
				"name": "Knock Over",
				"description": "If the target collides with another creature of the same Size or smaller as part of this movement, the creature it collides with must make a Might Save against your Save DC. Save Failure: The target is knocked Prone. Save Failure (each 5): The target is also pushed 1 Space in the same direction.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "size",
				"name": "Size",
				"description": "The maximum size of a creature or object you can target increases by 1 step (Medium -> Large -> Huge -> Gargantuan -> Colossal -> Titanic). The cost of this Enhancement increases to 2 MP for each size increase beyond Large.\n\nExample: You use the Size Enhancement twice to target a Huge creature. The first one costs 1 MP (to target Large), and the second one costs 2 MP (to target Huge) for a total of 3 MP.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures or objects within range. When you choose this Enhancement, the cost of all other Enhancements is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			}
		]
	},
	{
		"id": "hydro-lance",
		"name": "Hydro Lance",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Bleeding",
			"Motion",
			"Piercing",
			"Water"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a high-pressure jet of water in an 8 Space Line. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Piercing damage."
			}
		],
		"spellPassive": "Extinguish: Open flames in the area are extinguished, including torches, candles, or small campfires, unless magical or protected.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The length of the Line increases by 4 Spaces.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "knockback",
				"name": "Knockback",
				"description": "The closest target makes a Might Save. Save Failure: The target is pushed 1 Space away from you. Save Failure (each 5): The target is pushed up to 1 additional Space.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "bleeding",
				"name": "Bleeding",
				"description": "Each target makes a Repeated Physical Save. Save Failure: The target begins Bleeding X for 1 minute.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "inflict-poison",
		"name": "Inflict Poison",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Ailment",
			"Dazed",
			"Frightened",
			"Impaired",
			"Slowed",
			"Stunned"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "Make a Spell Check against the Repeated Might Save of a creature within range. Check Success: The target is Poisoned for the duration. Creatures Poisoned by this Spell have DisADV on Awareness Checks, and are Dazed, Impaired and Slowed.\n\n\n\nBeta Note: A creature with a Medicine Kit can attempt to remove a Basic Disease from a creature within 1 Space (including themselves) by spending 1 AP and 1 charge from the Medicine Kit and make a Medicine Check against the effect's Save DC, removing the Disease on a success."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "sapped",
				"name": "Sapped",
				"description": "While Poisoned by this Spell, the target falls Prone and can't stand up.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "fear-toxin",
				"name": "Fear Toxin",
				"description": "The target has vivid hallucinations. While Poisoned by this Spell, the target is Frightened of all creatures it can see.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "mental-fog",
				"name": "Mental Fog",
				"description": "While Poisoned by this Spell, the target is Stunned and forgets every detail about the previous minute.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "lightning-blast",
		"name": "Lightning Blast",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Lightning"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a torrent of lightning in a 1 Space Aura. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Lightning damage."
			}
		],
		"spellPassive": "Magnetic: Metal in the area becomes briefly magnetized, causing metal objects to attract or repel each other and disrupting compass-based navigation.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The Aura’s radius increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "shock",
				"name": "Shock",
				"description": "Each target makes an Agility Save. Save Failure: The target can't take Reactions for 1 Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "static",
				"name": "Static",
				"description": "The area becomes laden with electricity for 1 minute. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Fate Check. Result of a 10 or lower: They take X Lightning damage.\n\nBeta Note: A Fate Check is a d20 roll where no modifier (numerical or otherwise) apply to the Check, no critical result apply and you can't choose to fail.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "lightning-bolt",
		"name": "Lightning Bolt",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Lightning",
			"Stunned"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a bolt of lightning that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target you can see within range. Hit: The target takes 1 Lightning damage."
			}
		],
		"spellPassive": "Magnetic: Metal in the target's Space becomes briefly magnetized, causing metal objects to attract or repel each other and disrupting compass-based navigation.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by 1 for 1 target of your choice.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "stun",
				"name": "Stun",
				"description": "1 target of your choice makes a Physical Save. Creatures made of metal or wearing metal (such as Heavy Armor) have DisADV on this Save. Save Failure: The target becomes Stunned until the start of its next turn.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "chain",
				"name": "Chain",
				"description": "Choose 1 additional targets within 3 Spaces of the original target using the same Spell Attack for all targets. If you use this Enhancement multiple times, you choose an additional target within 3 Spaces of a previously chosen target.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "lightning-storm",
		"name": "Lightning Storm",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Deafened",
			"Lightning",
			"Sound"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a torrent of crackling lightning that envelops a 6 Space tall, 3 Space diameter Cylinder within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Lightning damage.\n\n\n\nClose Quarters Penalty: You have DisADV on the Attack if you're within the Melee Range of at least 1 enemy, unless that enemy is Incapacitated."
			}
		],
		"spellPassive": "Magnetic: Metal in the area becomes briefly magnetized, causing metal objects to attract or repel each other and disrupting compass-based navigation.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Cylinder increases by 1 Space and the Height by 2 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "shock",
				"name": "Shock",
				"description": "Each target makes an Agility Save. Save Failure: The target can't take Reactions for 1 Round. If used with Storm Cloud, the cost of the enhancement becomes 2 MP and the target can't take Reactions for 1 Round whenever they fail a Save against Storm Cloud.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "storm-cloud",
				"name": "Storm Cloud",
				"description": "The duration of the Spell becomes 1 Minute. Crackling lightning fills the area for the duration. When a creature enters the area for the first time on its turn or starts its turn there, it makes an Agility Save against your Save DC. Save Failure: The target takes X Lightning damage.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP, Sustained",
				"sustained": true,
				"variable": true
			}
		]
	},
	{
		"id": "lightning-torrent",
		"name": "Lightning Torrent",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Dazed",
			"Lightning"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a torrent of crackling lightning that envelops a 5 Space Line. Make an Area Spell Attack against the AD of every target within the area, and the closest target to you makes a Might Save. Hit: The target takes 1 Lightning damage. Save Failure: The target can't take Reactions for 1 Round."
			}
		],
		"spellPassive": "Magnetic: Metal in the area becomes briefly magnetized, causing metal objects to attract or repel each other and disrupting compass-based navigation.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The length of the Line increases by 5 Spaces.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "chain-shock",
				"name": "Chain Shock",
				"description": "Instead of only the closest target making the save, each target makes the Might Save.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "dazed",
				"name": "Dazed",
				"description": "Each target makes a Intelligence Save. Save Failure: The target is Dazed for 1 round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "remote",
				"name": "Remote",
				"description": "The range becomes 5 Spaces, with the origin of the Line becoming the chosen Space. The closest target is measured from the origin.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "lightning-rod",
		"name": "Lightning Rod",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Lightning",
			"Tethered"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You attempt to turn a creature of your choice within range into a lightning rod. Make a Spell Check against the target's Repeated Agility Save. Save Failure: The target is unable to take Reactions and you are able to use Shock against the target for the duration. The Spell ends early if you end your turn beyond the Spell's range from the target or behind Full Cover from the target.\n\n\n\nShock: Once on each of your turns, when you Sustained this Spell or by spending 1 AP, you can deal 1 Lightning damage to the target, provided it's not behind Full Cover. When you use Shock, you can spend 1 or more MP to increase the damage by 1 per MP spent."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "arcing-current",
				"name": "Arcing Current",
				"description": "Choose an additional targets within 2 Spaces of a previously chosen target that's also within the Spell's range. Only 1 creature can be targeted by Shock at a time.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "tether",
				"name": "Tether",
				"description": "On a Failed Save, they also become Tethered to you a distance equal to the Spell's range. If you use the Arcing Current Enhancement, this Enhancement costs 2 MP instead.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "living-bomb",
		"name": "Living Bomb",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Burning",
			"Fire",
			"Trap"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You set a target within range ablaze. Make a Spell Check against the target's Repeated Physical Save. Check Success: The target begins Burning.\n\n\n\nBomb: When the Burning caused by this Spell ends, the fire magic detonates in a 1 Space Aura centered on the target. Each target in the area (including the original one) makes a Might Save against your Save DC. Save Failure: The target takes 1 Fire damage."
			}
		],
		"spellPassive": "Ignite: Flammable objects that are not being worn or held in the target's Space catch fire. A creature can spend 1 AP to put out a mundane fire within 1 Space of them.\n\n\n\nBeta Note: For now, you can assume objects remain on fire for 1 minute and spreads to other flammable objects at a rate of 1 Space per minute unless the GM decided otherwise. A creature does not start Burning when it's in a Space with a burning object unless the entire Space is on Fire.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "stronger-bomb",
				"name": "Stronger Bomb",
				"description": "The damage of Bomb increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "larger-area",
				"name": "Larger Area",
				"description": "The radius of the Bomb increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "increased-burning",
				"name": "Increased Burning",
				"description": "The target gains X additional stacks of Burning.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			}
		]
	},
	{
		"id": "maelstrom",
		"name": "Maelstrom",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Motion",
			"Slowed",
			"Water"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You create a 3 Space diameter, 2 Space tall Cylinder of swirling water within range for the duration. Open mundane flames in the area are extinguished (such as torches, candles, or small campfires). Creatures in the area are subjected to the Underwater Combat rules (DisADV on Martial Attacks and Slowed without Swim Speed, gain Fire Resistance, subject to Hold Breath and Suffocation) and are Slowed when they move away from the Point of Origin. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Might Save against your Save DC. Save Failure: They are pulled 1 Space toward the Point of Origin.\n\n\n\nSpell Cast: When you cast the Spell, make a Spell Check against the Might Save of each target in the area. Save Failure: They are pulled to 1 Space to the Point of Origin."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Cylinder increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "increased-pull",
				"name": "Increased Pull",
				"description": "The distance pulled increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "drowning",
				"name": "Drowning",
				"description": "When a creature fails a Save, they lose their breathe and begin Suffocating if they can't breath underwater.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "mold-earth",
		"name": "Mold Earth",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Earth",
			"Motion"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You manipulate a up to a 4 Space Zone of mundane earth (including dirt, mud, and stone) of your choice within range, provided it's not being carried or supporting a Small or larger creature or object.\n\n\n\nChoose 1 of the following options when casting the Spell:\n\n\n\n- Move: You move the area up to 2 Spaces. Any creatures or objects on the earth move with the dirt, unless you (or the creature) choose otherwise. If they remain in the same Space and there's no ground to support them, they begin a Controlled Fall.\n\n- Reshape: You cause shapes, earthen colors, or both to appear on or in the earth (such as words, images, or patterns).\n\n- Difficult Terrain: You can cause Spaces of your choice within the area to become Difficult Terrain. A creature can spend 1 AP to clear 1 Space of Difficult Terrain created in this way. If the ground is already Difficult Terrain as a result of loose earth, you can cause it to become normal terrain instead."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "expand",
				"name": "Expand",
				"description": "The size of the Zone increases by 4 Spaces.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "manipulate-stone",
				"name": "Manipulate Stone",
				"description": "You can also manipulate compacted earth or stone.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "precise-construction",
				"name": "Precise Construction",
				"description": "You can select multiple options when casting the Spell. You can manipulate the earth into an exact form you wish. This can be used to repair structures or produce your own in unoccupied Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "heavy-excavation",
				"name": "Heavy Excavation",
				"description": "You can move earth supporting creatures or objects 1 size larger (Small -> Medium -> Large -> Huge -> Gargantuan -> Colossal -> Titanic).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "unstable-earth",
				"name": "Unstable Earth",
				"description": "Creatures in the area must make an Agility Save. Save Failure: They fall Prone.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "poison-bolt",
		"name": "Poison Bolt",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Ailment",
			"Hindered",
			"Impaired",
			"Poison"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a bolt of condensed poisonous gas that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Poison damage."
			}
		],
		"spellPassive": "Noxious: Plant life in the target's Space that is not being worn or held wilts or dies, grass blackens, and flowers or vines shrivel where the Spell touches.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "debilitating-poison",
				"name": "Debilitating Poison",
				"description": "The target makes a Repeated Might Save. Save Failure: The target is Poisoned for 1 minute. While Poisoned in this way, the creature becomes Hindered or Impaired (your choice when you use this Enhancement). This Poison can be removed by any effect that ends a Basic Poison.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "deadly-poison",
				"name": "Deadly Poison",
				"description": "The target makes a Repeated Might Save. Save Failure: The target is Poisoned for 1 minute. While Poisoned in this way, the creature takes X Poison damage at the start of each of their turns. This Poison can be removed by any effect that ends a Basic Poison.\n\nBeta Note: A creature with a Medicine Kit can attempt to remove a Basic Poison from a creature within 1 Space (including themselves) by spending 1 AP and 1 charge from the Medicine Kit and make a Medicine Check against the effect's Save DC, removing the Basic Poison on a success.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "spike-bolt",
		"name": "Spike Bolt",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Earth",
			"Impaired",
			"Piercing",
			"Plants"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Space",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a sharp spike of earth or plant matter that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Piercing damage."
			}
		],
		"spellPassive": "Natural Destruction: This Spell leaves debris imbedded in the Space it lands in.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X for 1 target of your choice.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP, Repeatable",
				"repeatable": true,
				"variable": true
			},
			{
				"id": "impair",
				"name": "Impair",
				"description": "1 target of your choice makes an Agility Save. Save Failure: The target is Impaired for 1 Round.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "piercing",
				"name": "Piercing",
				"description": "The Spell pierces the target, continuing up to 3 Spaces in a Line beyond the target. Each creature within the Spell's path beyond the original target also become targets of the Attack. These targets do not benefit from cover provided by other targets of this Spell. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": 1
				},
				"costText": "1 AP + 1 MP",
				"rawCost": "1 AP + 1 MP"
			}
		]
	},
	{
		"id": "spike-cluster",
		"name": "Spike Cluster",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Earth",
			"Immobilized",
			"Impaired",
			"Piercing",
			"Plants"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce an explosion of spikes or thorns that envelops a 3 Space diameter Sphere within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Piercing damage.\n\n\n\nClose Quarters Penalty: You have DisADV on the Attack if you're within the Melee Range of at least 1 enemy, unless that enemy is Incapacitated."
			}
		],
		"spellPassive": "Natural Destruction: This Spell leaves debris imbedded in objects in the area.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "impair",
				"name": "Impair",
				"description": "Each target makes an Agility Save. Save Failure: The target is Impaired for 1 Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "immobilizing-spikes",
				"name": "Immobilizing Spikes",
				"description": "Each target makes an Agility Save. Save Failure: The target is Immobilized for 1 Round.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "spike-surge",
		"name": "Spike Surge",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Earth",
			"Impaired",
			"Piercing",
			"Plants"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a wave of spikes or thorns that emerge from the ground in a 2 Space Arc. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Piercing damage."
			}
		],
		"spellPassive": "Natural Destruction: This Spell leaves debris imbedded in objects in the area.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The Area’s radius increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "aura",
				"name": "Aura",
				"description": "The Area becomes an Aura instead.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "impair",
				"name": "Impair",
				"description": "Each target makes an Agility Save. Save Failure: The target is Impaired for 1 Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "spikey-terrain",
				"name": "Spikey Terrain",
				"description": "The area becomes Spikey Terrain for 1 Round. Creatures take X Piercing damage when they enter a Space within the area.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "tornado",
		"name": "Tornado",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Air",
			"Blinded",
			"Chaos",
			"Lightning",
			"Motion",
			"Slowed"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You create a 6 Space high, 2 Space diameter Cylinder of swirling winds within range for the duration. Creatures in the area are Slowed 2, Blinded, and Fully Concealed. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Might Save against your Save DC. Save Failure: They're pushed 1 Space horizontally in a random direction. Failure (each 5): They're pushed 1 additional Space.\n\n\n\nSpell Cast: When you cast the Spell, make a Spell Check against the Might Save of each target in the area. Save Failure: They're pushed 1 Space horizontally in a random direction. Failure (each 5): They're pushed 1 additional Space.\n\n\n\nMoving the Cylinder: When you Sustain this Spell or by spending 1 AP, you can move the Cylinder up to 5 spaces to another Space within range."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Cylinder increases by 1 Space and the height increases by 2 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "increased-push",
				"name": "Increased Push",
				"description": "The distance pushed increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "vortex",
				"name": "Vortex",
				"description": "When you cast the Spell, creatures within the area, or within 1 Space of the area, make a Might Save against your Spell Check. Save Failure: They're pulled toward the Point of Origin.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "storm-core",
				"name": "Storm Core",
				"description": "A creature that fails its Save also takes X Lightning damage.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "updraft",
				"name": "Updraft",
				"description": "A creature that fails its Save is also pulled upward 3 Spaces.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "toxic-burst",
		"name": "Toxic Burst",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Ailment",
			"Enfeeble",
			"Poison"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You emit toxic air that envelops a 1 Space Aura. Make an Area Spell Attack against the AD of each target in the area. Hit: They take 1 Poison damage."
			}
		],
		"spellPassive": "Noxious: Plant life in the area that are not being worn or held wilts or dies, grass blackens, and flowers or vines shrivel where the Spell touches.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The Aura’s radius increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "disease",
				"name": "Disease",
				"description": "Each target makes a Repeated Might Save against your Save DC. Save Failure: The target is Diseased for 1 minute. Creatures Diseased by this Spell have their current and maximum HP reduced by X at the start of each of their turns. The creature's maximum HP returns to normal after taking a rest. This Disease can be removed by any effect that ends a Basic Disease.\n\nBeta Note: A creature with a Medicine Kit can attempt to remove a Basic Disease from a creature within 1 Space (including themselves) by spending 1 AP and 1 charge from the Medicine Kit and make a Medicine Check against the effect's Save DC, removing the Disease on a success.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "spreading-plague",
				"name": "Spreading Plague",
				"description": "Requires Disease. Creatures Diseased by this Spell also emit a 1 Space Aura of diseased air. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Repeated Might Save against your Save DC. Save Failure: The target also becomes Diseased by this Spell for 1 minute. You are immune to the effects of Spreading Plague.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "wall-of-fire",
		"name": "Wall of Fire",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Burning",
			"Fire",
			"Shadow"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure persistent flames that fills a 5 Space long, 2 Space tall Wall. When you cast the Spell, make an Area Spell Attack against the AD of each target within the area. Hit: The target takes 1 Fire damage.\n\n\n\nHazardous Area: When a creature enters the area for the first time on its turn or starts its turn there, it makes a Might Save against your Save DC. Save Failure: The target takes 1 Fire damage."
			}
		],
		"spellPassive": "Ignite: Flammable objects that are not being worn or held in the target's Space catch fire. A creature can spend 1 AP to put out a mundane fire within 1 Space of them.\n\n\n\nBeta Note: For now, you can assume objects remain on fire for 1 minute and spreads to other flammable objects at a rate of 1 Space per minute unless the GM decided otherwise. A creature does not start Burning when it's in a Space with a burning object unless the entire Space is on Fire.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by 1.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The length of the Wall increases by 5 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "ringwall",
				"name": "Ringwall",
				"description": "The area becomes an up to 4 Space diameter Ringwall. The diameter of the Ringwall increases by 1 each time you use the Area Enhancement.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "burning",
				"name": "Burning",
				"description": "When a creature fails the Save against the Hazardous Area it begins Burning. A creature can make a Repeated Physical Save at the end of each of its turns, ending the Burning on a Success.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "smoke",
				"name": "Smoke",
				"description": "The area becomes Fully Concealed by thick black smoke. Creatures in the area that can't hold their breath begin Suffocating. The smoke lasts for 1 minute or until a wind of moderate or greater speed disperses it.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "wall-of-earth",
		"name": "Wall of Earth",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Earth",
			"Motion",
			"Summoning"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You create a 5 Space long, 2 Space high Wall of earth within range. Medium Size or smaller creatures and objects within the area are pushed to nearest unoccupied Space of their choice on either side of the Wall (you choose for each object). Large Size or larger creatures or objects prevent the Wall from forming in their Space.\n\n\n\nThe Wall is a solid surface that provides Full Cover. Each Space within the Wall has 1 HP, an AD and PD equal to your Save DC, Slashing Resistance (Half), and Poison and Psychic Immunity. Each Space of the Wall can be broken if it is reduced to 0 HP. When a Space of Wall is broken, all Spaces above that Space are also broken, and the Space becomes Difficult Terrain until a creature spends 1 AP to clear it.\n\n\n\nWall Slam: When you cast the Spell, or by spending 1 AP, you can cause the Wall to move 2 Spaces horizontally in a direction of your choice in either of its facing directions. Make a Spell Check against the Might Save of each creature within the area the Wall moves. Save Failure: They're pushed with the Wall in the direction it moves. Save Success: They aren't moved and they prevent any Spaces of the Wall that make contact with them from moving past their Space. After moving the Wall in this way, it breaks, and each Space it moved through becomes Difficult Terrain until a creature spends 1 AP to clear it.\n\n\n\nSpell Ends: When the Spell ends, the Wall remains but you can no longer use Wall Slam."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "size",
				"name": "Size",
				"description": "The Wall's length or height increases by 2 Spaces. If used with the Additional Walls Enhancement, you choose which Wall to increase the size of.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "density",
				"name": "Density",
				"description": "The HP of each Space of the Wall and the number of Spaces the Wall moves when using Wall Slam both increase by X.\n\nDC Tip: The further the wall would have travelled when slamming someone into a solid surface, the more collision damage they take!",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "additional-walls",
				"name": "Additional Walls",
				"description": "You conjure X additional Walls within range using the same Spell Check. When you use Wall Slam, you choose which Wall to move.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "wall-of-water",
		"name": "Wall of Water",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Motion",
			"Water"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You create a 5 Space long, 2 Space high Wall of water within range for the duration. Open mundane flames in the area are extinguished (such as torches, candles, or small campfires). Creatures in the area are subjected to the Underwater Combat rules (DisADV on Martial Attacks and Slowed without Swim Speed, gain Fire Resistance, subject to Hold Breath and Suffocation). Attacks that deal Physical or Elemental damage have DisADV if made against targets within the area or on the other side of the Wall.\n\n\n\nSpell End: When the Spell ends, it creates a Tidal Wave on both sides of the Wall that crashes upon on every Space within a number of Spaces equal to its height in both directions.\n\n\n\n- Objects: Medium Size or smaller objects in the area that aren't held or carried are pushed away from the Wall's area to the farthest Spaces of the Tidal Wave's area.\n\n- Creatures: Medium Size or smaller creatures in the area must make a Might Save against your Save DC. Save Failure: They are pushed a number of Spaces away from the Wall's area equal to half the Wall's height. Failure (Each 5): They are pushed 1 additional Space.\n\n\n\nDC Tip: If the Wall is 4 Spaces high when the Spell ends, creatures that fail their Might Save against the Tidal Wave would be pushed 2 Spaces, plus 1 Space for each 5 they fail the Save by."
			}
		],
		"spellPassive": "Extinguish: Open flames in the area are extinguished, including torches, candles, or small campfires, unless magical or protected.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "length",
				"name": "Length",
				"description": "The Wall's length increases by 2 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "height",
				"name": "Height",
				"description": "The Wall's height increases by 2 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "tidal-force",
				"name": "Tidal Force",
				"description": "The maximum target Size that Tidal Wave effects increases by 1 step (Medium -> Large -> Huge -> Gargantuan -> Colossal -> Titanic).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "prone",
				"name": "Prone",
				"description": "Each target that fails its Save against the Tidal Wave also falls Prone.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "water-bolt",
		"name": "Water Bolt",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Bludgeoning",
			"Motion",
			"Water"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a bolt of water that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Bludgeoning damage."
			}
		],
		"spellPassive": "Extinguish: Open flames in the target's Space are extinguished, including torches, candles, or small campfires, unless magical or protected.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by 1 for 1 target of your choice.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "knockback",
				"name": "Knockback",
				"description": "1 target of your choice makes a Might Save. Save Failure: The target is pushed 1 Space away from you. Failure (each 5): The target is pushed 1 additional Space.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "splash",
				"name": "Splash",
				"description": "The projectile detonates on impact. Compare the Spell Attack to the AD of each targets in a 2 Space Cone behind the original target. Hit: They take X Bludgeoning damage. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			}
		]
	},
	{
		"id": "wind-blade",
		"name": "Wind Blade",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Air",
			"Bleeding",
			"Motion",
			"Slashing"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a rush of high velocity wind in a 2 Space Arc. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Slashing damage."
			}
		],
		"spellPassive": "Wind: Unsecured mundane objects in the area are knocked over or blown away, especially light ones (papers, tools, empty crates). Can slam doors, scatter sand/dust and disperse smoke.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The Area’s radius increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "aura",
				"name": "Aura",
				"description": "The Area becomes an Aura instead.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "bleeding",
				"name": "Bleeding",
				"description": "Each target makes a Repeated Physical Save. Failure: The target begins Bleeding X for 1 minute.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "tailwind",
				"name": "Tailwind",
				"description": "Immediately before or after casting this Spell you can move 2 Spaces without provoking Opportunity Attacks.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "wind-burst",
		"name": "Wind Burst",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Air",
			"Bleeding",
			"Motion",
			"Slashing"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a vortex of high velocity wind that envelops a 3 Space diameter Sphere area within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Slashing damage.\n\n\n\nClose Quarters Penalty: You have DisADV on the Attack if you're within the Melee Range of at least 1 enemy, unless that enemy is Incapacitated."
			}
		],
		"spellPassive": "Wind: Unsecured mundane objects in the area are knocked over or blown away, especially light ones (papers, tools, empty crates). Can slam doors, scatter sand/dust and disperse smoke.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "bleeding",
				"name": "Bleeding",
				"description": "Each target makes a Repeated Physical Save. Failure: The target begins Bleeding X for 1 minute.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "turbulent",
				"name": "Turbulent",
				"description": "Each target makes a Might Save. Save Failure: The target is moved to an unoccupied Space of your choice within the area.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "wind-tunnel",
		"name": "Wind Tunnel",
		"sources": [
			"Primal"
		],
		"school": "Elemental",
		"tags": [
			"Air",
			"Motion",
			"Slowed"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You create a 5 Space Line of forceful wind within range, designating one end as the Point of Origin. Make a Spell Check against the Might Save of each Medium size or smaller creature in the area. Check Success: The target is pushed 1 Space away from the Point of Origin. Success (each 5): They are pushed up to +1 Space.\n\n\n\nObjects: Medium Size or smaller objects that aren't secured, worn or held are pushed 1 Space away from the Point of Origin.\n\n\n\nSmaller Sizes: Creatures and objects are pushed up to 1 additional Space for each size smaller they are than the maximum size you can target.\n\n\n\n## Enchantment\n\n\n\nEnchantment is the magic of influencing other creatures' minds, such as provoking strong emotions and mental domination. Spells that create illusions in a creature's mind or charm other creatures through fabricated terror, loyalty, or love fall into the School of Enchantment."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "length",
				"name": "Length",
				"description": "The length of the Line increases by 5 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "width",
				"name": "Width",
				"description": "The width and height of the Line increases by X Spaces. The cost of this Enhancement increases by 1 MP for each time the Length Enhancement has been used.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "size",
				"name": "Size",
				"description": "The maximum size of a creature or object you affect with this spell increases by 1 step (Medium -> Large -> Huge -> Gargantuan -> Colossal -> Titanic). The cost of this Enhancement increases to 2 MP for each size increase beyond Large.\n\nExample: You use the Size Enhancement two times to target a Huge creature. The first one cost 1 MP, and the last one costs 2 MP for a total of 3 MP.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "continuous",
				"name": "Continuous",
				"description": "The Spell's duration is increased to 1 minute. Creatures in the area affected by the Spell are Slowed X when moving toward the Point of Origin, and move X additional Spaces for every 1 Space of movement spent when moving away from the Point of Origin. Objects affected by the Spell are pushed away from the Point of Origin to the other end of the Line. When you Sustain this Spell or by spending 1 AP, you can change which end is the Point of Origin, reversing the flow of wind.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP, Sustained",
				"sustained": true,
				"variable": true
			},
			{
				"id": "projectile-tunnel",
				"name": "Projectile Tunnel",
				"description": "Ranged Martial Attacks have ADV if they originate from within (or pass through) the Spell's area, provided they travel in the same direction as the wind. Otherwise, Ranged Martial Attacks have DisADV if they originate from within (or pass through) the Spell's area.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Requires Continuous",
				"requires": [
					"continuous"
				]
			}
		]
	},
	{
		"id": "charm",
		"name": "Charm",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Enchantment",
		"tags": [
			"Charmed",
			"Communication",
			"Emotions",
			"Thoughts"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "Choose a creature that can see or hear you within range. Make a Spell Check against the target's Charisma Save. The Save is Repeated if the target is hostile. Check Success: The target is Charmed by you for the duration or until it takes damage or makes a Save. When the Condition ends, the creature realizes that you used magic to influence its mood and may become hostile toward you (if they weren't already).\n\n\n\nDC Tip: A creature may also become hostile if the spell fails and they see you casting a spell on them!"
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (1 min -> 10 min -> 1 hour -> 8 hour -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "clear-suspicion",
				"name": "Clear Suspicion",
				"description": "The target doesn't realize that magic was used on them when the Condition ends.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "mass-charm",
				"name": "Mass Charm",
				"description": ": You instead target each creature of your choice within range that can see or hear you. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The Action Point cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": 1
				},
				"costText": "1 AP + 1 MP",
				"rawCost": "1 AP + 1 MP"
			}
		]
	},
	{
		"id": "command",
		"name": "Command",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Enchantment",
		"tags": [
			"Communication",
			"Emotion",
			"Motion",
			"Thoughts"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You speak a command to a creature within range that can hear you. Make a Spell Check against the target's Charisma Save. Save Failure: The target immediately takes a 1 AP Action of your choice for free and loses 1 AP if they have any available. If the Action targets a creature or object, you choose the target.\n\n\n\nDC Tip: At the GM's discretion you can have the target perform something specific that isn't a listed Action. For example, you could have the creature perform 2 Minor Actions.\n\n\n\nThe creature can't willingly fail their Check or spend their own resources (AP, SP, or MP) to modify the Action it takes. The Spell has no effect if the target is unable to perform the Action (such as commanding an Immobilized creature to move), or if the Action is directly harmful to itself (such as Attacking itself or moving for the purpose of provoking Opportunity Attacks)."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "perfect-command",
				"name": "Perfect Command",
				"description": "The Spell no longer fails if the commanded Actions are directly harmful to the target.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "memory-block",
				"name": "Memory Block",
				"description": "The target has no recollection of any Actions taken as a result of this Spell.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "multiple-commands",
				"name": "Multiple Commands",
				"description": "The target takes up to 1 additional Action of your choice for free. Actions taken as part of this Spell subjected to the Multiple Check Penalty. The target loses 1 additional AP if they are able.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "extended-command",
				"name": "Extended Command",
				"description": "A taken Action can cost up to 1 additional AP. If used with Multiple Commands you increase the cost of only one taken Action. The target loses 1 additional AP if they are able.\n\nDC Tip: If a chosen Action costs more than expected (such as a Dragon's Breath Action costing 3 AP when you thought it was 2 AP), you can choose another Action for the creature to take.\n\nExample: You spend 4 MP to use Multiple Commands and Extended Command, on a failed Save you can command the target to take 2 Actions, one from the original Spell and one from Multiple Commands, you can then increase the AP cost of either Action by 1 using Extended Command. For example, you could have the target Move (1 AP) and then Attack with ADV (2 AP) or you could instead have them use a Fireball (2 AP) and then Attack with a weapon at DisADV due to Multiple Check Penalty (1 AP). The target would then lose a total of up to 3 AP if they're available.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "confusion",
		"name": "Confusion",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Enchantment",
		"tags": [
			"Chaos",
			"Emotions",
			"Madness",
			"Thoughts"
		],
		"cost": {
			"ap": 1,
			"mp": 2
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "Choose a creature within range. Make a Spell Check against the target's Repeated Intelligence Save. Check Success: The creature is Confused for the duration. The target can also Repeat the Intelligence Save whenever they take damage.\n\n\n\nConfused: You can't take Reactions and must roll a d8 at the start of each of your turns to determine your behavior for that turn.\n\n\n\n- 1-2: You spend all of your AP moving in a random direction.\n\n- 3-4: You waste your AP this turn performing useless activities (such as babbling incoherently, repeatedly attempting to act but failing or remaining motionless).\n\n- 5-6: You use all your AP on Attacks or on Actions to facilitate Attacks (such as moving to a target), Attacking random targets as determined by the GM. If you can't Attack, you waste all your AP this turn.\n\n- 7-8: You act normally."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "Choose 1 additional target within range for each 2 MP spent on this enhancement. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "deep-confusion",
				"name": "Deep Confusion",
				"description": "The target's Intelligence Save is not Repeated at the end of each of its turns, though it can still repeat the Save whenever it takes damage. The cost of this Enhancement increases to 4 MP if used with the Targets Enhancement.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "fear",
		"name": "Fear",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Enchantment",
		"tags": [
			"Emotions",
			"Frightened",
			"Motion",
			"Psychic",
			"Terrified"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You instill fear in a creature within range that can see or hear you. Make a Spell Check against the target's Repeated Charisma Save. Check Success: The target is Frightened by you for the duration."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "inner-demons",
				"name": "Inner Demons",
				"description": "While Frightened by this Spell, the target takes X Psychic Damage whenever it fails a Check or Save (not including the initial Save against this Spell).",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "flee",
				"name": "Flee",
				"description": "The target spends 1 AP running away from you each time it fails a Save against this Spell.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "terrify",
				"name": "Terrify",
				"description": "On a Success, the target is Terrified of you instead.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "hex",
		"name": "Hex",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Enchantment",
		"tags": [
			"Curse",
			"Enfeeble"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "Make a Spell Check against the Repeated Charisma Save of a target within range. Check Success: The target is Cursed for the duration. While Cursed this way, it gains Vulnerability (1) to a damage type of your choice. The Curse can be removed by any effect that ends a Basic Curse."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "expanded",
				"name": "Expanded",
				"description": "The target becomes Vulnerable to a category of damage (Physical, Elemental or Mystical) of your choice instead of 1 damage type.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "break-resistance",
				"name": "Break Resistance",
				"description": "While Cursed by this Spell, the target doesn't benefit from Resistance to the damage types they're Vulnerable to for the duration.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "improved-vulnerability",
				"name": "Improved Vulnerability",
				"description": "The Vulnerability increases by 1.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "message",
		"name": "Message",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Enchantment",
		"tags": [
			"Communication",
			"Thoughts"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You send a brief telepathic message to a creature within range. The creature hears the message in their mind and can immediately respond telepathically. The message and response can take the form of a thought, a mental image or a verbal message of up to 20 words long. This Spell doesn't require Verbal Components."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "group-message",
				"name": "Group Message",
				"description": "You can target every creature of your choice within range. Only you can telepathically perceive answers from the targets.",
				"cost": {
					"ap": 1,
					"mp": 1
				},
				"costText": "1 AP + 1 MP",
				"rawCost": "1 AP + 1 MP"
			},
			{
				"id": "sending",
				"name": "Sending",
				"description": "You can target any creature you've touched previously, provided they're on the same plane as you. The word count of your message and the target answer can be up to 40 words long.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "mind-blast",
		"name": "Mind Blast",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Enchantment",
		"tags": [
			"Dazed",
			"Psychic",
			"Sense"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a blast of psychic energy that projects in a 3 Space Cone. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Psychic damage."
			}
		],
		"spellPassive": "Untraceable: Damage from this Spell leaves no visible trace on any affected creatures or the surrounding environment.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The length of the Cone increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "dazed",
				"name": "Dazed",
				"description": "Each target makes an Intelligence Save. Save Failure: The target is Dazed for 1 round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "psionic-trail",
				"name": "Psionic Trail",
				"description": "Each target makes an Intelligence Save. Save Failure: For the next 10 minutes, you know the target's exact location while it's within 10 Spaces of you.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "mockery",
		"name": "Mockery",
		"sources": [
			"Arcane"
		],
		"school": "Enchantment",
		"tags": [
			"Blinded",
			"Deafened",
			"Emotions",
			"Taunted"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "Trigger: A target within range fails a Check.\n\n\n\nReaction: Make a Spell Check against the target's Repeated Charisma Save. Save Failure: The target is Taunted by you for the duration."
			}
		],
		"enhancements": [
			{
				"id": "tunnel-vision",
				"name": "Tunnel Vision",
				"description": "While Taunted by this Spell, the target can't willingly move away from you.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "blinding-rage",
				"name": "Blinding Rage",
				"description": "While Taunted by this Spell, the target is Blinded and Deafened to all creatures except you.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "planar-protection",
		"name": "Planar Protection",
		"sources": [
			"Divine"
		],
		"school": "Enchantment",
		"tags": [
			"Cleansing",
			"Embolden",
			"Thoughts",
			"Ward"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "5 Spaces",
		"duration": "1 Hour",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You ward a creature within range against Planar influence.\n\n\n\nThe target gains MDR and Resistance to one of the following Conditions for the duration: Charmed, T Taunted, Intimidated. If the target is already affected by the resisted Condition, make a Spell Check against the Save DC of the Condition. Success: The chosen Condition immediately ends on the target."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "mystic-resistance",
				"name": "Mystic Resistance",
				"description": "The target gains Mystical Resistance (Half) for the duration instead of MDR.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "major-protection",
				"name": "Major Protection",
				"description": "The target gains Resistance against the following additional Conditions: Doomed, Frightened, and Terrified.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "full-protection",
				"name": "Full Protection",
				"description": "The target has Resistance against all listed Conditions.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "mental-barrier",
				"name": "Mental Barrier",
				"description": "The target's thoughts can't be read against your will for the duration.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "manipulation-protection",
				"name": "Manipulation Protection",
				"description": "The target gains ADV on all Mental Saves for the duration.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "psi-bolt",
		"name": "Psi Bolt",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Enchantment",
		"tags": [
			"Dazed",
			"Intimidated",
			"Psychic",
			"Thoughts"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a bolt of vibrant psychic energy that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Psychic damage."
			}
		],
		"spellPassive": "Untraceable: Damage from this Spell leaves no visible trace on any affected creatures or the surrounding environment.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "dazed",
				"name": "Dazed",
				"description": "The target makes an Intelligence Save. Save Failure: The target is Dazed for 1 Round.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "intimidate",
				"name": "Intimidate",
				"description": "The target makes a Mental Save. Save Failure: The target is Intimidated by you for 1 Round.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "crushing-silence",
				"name": "Crushing Silence",
				"description": "The target makes an Intelligence Save. Save Failure: The target can't speak verbally or communicate telepathically for 1 Round.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			}
		]
	},
	{
		"id": "psychic-wave",
		"name": "Psychic Wave",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Enchantment",
		"tags": [
			"Enfeeble",
			"Motion",
			"Psychic"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a blast of psychic energy that envelopes a 2 Space Arc. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Psychic damage."
			}
		],
		"spellPassive": "Untraceable: Damage from this Spell leaves no visible trace on any affected creatures or the surrounding environment.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X\n\n.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The radius of the area increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "aura",
				"name": "Aura",
				"description": "The area becomes an Aura instead.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "discombobulate",
				"name": "Discombobulate",
				"description": "Each Target makes a Mental save. Save Failure: The target subtracts a d4 on every Check it makes for 1 round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "knockback",
				"name": "Knockback",
				"description": "Each target makes a Might Save against your Save DC. Save Failure: The target is pushed 1 Space away from you. Failure (each 5): The target is pushed 1 additional Space.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "shatter-reality",
		"name": "Shatter Reality",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Enchantment",
		"tags": [
			"Chaos",
			"Dazed",
			"Madness",
			"Psychic"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You violently distort the perception of reality in a 3 Space Sphere within range. Make an Area Spell Attack against the AD of every creature in the area. Hit: The target takes 1 Psychic damage.\n\n\n\nClose Quarters Penalty: You have DisADV on the Attack if you're within the Melee Range of at least 1 enemy, unless that enemy is Incapacitated.\n\n\n\n## D4 Distortion Effect\n\n\n\n- 1 It sees body twist. It's Immobilized.\n\n- 2 Its senses collapse inward. It's Blinded.\n\n- 3 Its mind fractures. It's Stunned and can't take Reactions.\n\n- 4 It becomes confused. At the start of each of its turns, it must spend 1 AP to move up to its Speed in a random direction."
			}
		],
		"spellPassive": "Untraceable: Damage from this Spell leaves no visible trace on any affected creatures or the surrounding environment.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "dazed",
				"name": "Dazed",
				"description": "Each target makes an Intelligence Save. Failure: The target is Dazed for 1 Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "distorted-perception",
				"name": "Distorted Perception",
				"description": "Each target makes a Repeated Charisma Save against your Save DC. Save Failure: The target rolls a d4 to determine the Distortion Effect that alters its body or perception for 1 minute.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "slumber",
		"name": "Slumber",
		"sources": [
			"Arcane"
		],
		"school": "Enchantment",
		"tags": [
			"Emotions",
			"Enfeeble",
			"Incapacitated",
			"Unconscious"
		],
		"cost": {
			"ap": 1,
			"mp": 2
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You attempt to cause a state of magical slumber in a creature of your choice within range. Make a Spell Check contested by the target's Repeated Intelligence Save. Check Success: The target is Incapacitated for the duration or until it takes damage, makes a Save against an effect not caused by this Spell, or another creature spends 1 AP to shake or slap it out of it, removing the Condition. When the Condition ends, the target realizes that magic was used on them to induce their state of slumber.\n\n\n\n## Invocation\n\n\n\nInvocation is the magic of positive energy, such as light, life, healing, and resurrection. Spells that create light, mend wounds, cure sicknesses, create spirits, or resurrect the dead fall into the School of Invocation."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "clear-suspicion",
				"name": "Clear Suspicion",
				"description": "On a Success, the target doesn't realize that magic was used on them when the Condition ends.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "lethargy",
				"name": "Lethargy",
				"description": "When the the Condition ends, the target makes a Might Save against your Save DC. Failure: The target has DisADV on all Checks for 1 round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "sleep",
				"name": "Sleep",
				"description": "On a Success, the target is Unconscious instead.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target 1 additional creature within range for each 2 MP spent on this Enhancement. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			}
		]
	},
	{
		"id": "cleanse",
		"name": "Cleanse",
		"sources": [
			"Divine",
			"Primal"
		],
		"school": "Invocation",
		"tags": [
			"Cleansing"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "Choose a creature within range that's subjected to 1 of the following Conditions: Dazed, Deafened, Exposed, Hindered, Impaired, Intimidated, Slowed, Stunned, or Taunted. Choose 1 of those Conditions and Make a Spell Check against its Save DC. If it doesn't have a Save DC, the GM assigns it one. Success: 1 stack of the Condition ends on the creature.\n\n\n\nDC Tip: If the effect is applied continuously to the target (such as Slowed as a result of moving through Difficulty Terrain) this Spell has no effect on the target."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "additional-cleanse",
				"name": "Additional Cleanse",
				"description": "You can end 1 stack of an additional Condition from the list or an additional stack of a previously chosen Condition.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "moderate-cleanse",
				"name": "Moderate Cleanse",
				"description": "The following Conditions are added to the list: Blinded, Charmed, Disoriented, Doomed, Frightened, Restrained, or Weakened.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "major-cleanse",
				"name": "Major Cleanse",
				"description": "The following Conditions are added to the list: Exhaustion, Paralyzed, Petrified, Terrified, or Unconscious.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "close-wounds",
		"name": "Close Wounds",
		"sources": [
			"Arcane",
			"Divine",
			"Primal"
		],
		"school": "Invocation",
		"tags": [
			"Cleansing",
			"Healing",
			"Time"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You accelerate the natural healing process of a target within range. Make a DC 15 Spell Check. Failure: The target can spend up to 1 Rest Point, regaining HP equal to the Rest Points Spent. Success: The target can spend up to 2 Rest Points. Success (each 5): The target can spend 1 additional Rest Point."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "increased-healing",
				"name": "Increased Healing",
				"description": "The target can spend 2 additional Rest Points.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "repeat-save",
				"name": "Repeat Save",
				"description": "The target can make a Repeated Save against an effect they're subjected to.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			}
		]
	},
	{
		"id": "death-ward",
		"name": "Death Ward",
		"sources": [
			"Divine"
		],
		"school": "Invocation",
		"tags": [
			"Cleansing",
			"Death",
			"Embolden",
			"Ward"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You ward a creature within range against death. Make a DC 15 Spell Check. Failure: The next time the target takes damage that would reduce it to 0 HP, it gains 3 Temp HP before taking the damage and the Spell ends. Success: The target gains 4 Temp HP instead. Success (Each 5): +1 Temp HP. If a creature is already on 0 HP or lower when this Spell is cast on it, the Spell activates when it next take damage instead."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration is increased by 1 step (10 min -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable, Sustained",
				"repeatable": true,
				"sustained": true
			},
			{
				"id": "additional-temp-hp",
				"name": "Additional Temp HP",
				"description": "The target gains an additional 3 Temp HP.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "doomed-protection",
				"name": "Doomed Protection",
				"description": "Up to 2 stacks of Doomed ends on the creature.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "divine-protection",
		"name": "Divine Protection",
		"sources": [
			"Divine"
		],
		"school": "Invocation",
		"tags": [
			"Death",
			"Ward"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "1 Space",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You magically transfer damage from an ally to yourself.\n\n\n\nTrigger: A target you can see within range is Hit by an Attack.\n\n\n\nReaction: The damage of the Attack is shared between you and the target. The damage you take bypasses any Damage Reduction you have."
			}
		],
		"enhancements": [
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target 1 additional creature within range that's also targeted by the same Attack.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "resistance",
				"name": "Resistance",
				"description": "The target gains Resistance (Half) to the damage taken from the Attack. If you spent 2 AP to use this Enhancement you also gain Resistance (Half) to any damage you take from using this Spell. The cost of this Enhancement doubles if you take the Targets Enhancement.",
				"cost": {
					"ap": 1
				},
				"alternativeCosts": [
					{
						"ap": 2
					}
				],
				"costText": "1 AP or 2 AP",
				"rawCost": "1 AP or 2 AP"
			},
			{
				"id": "forbearance",
				"name": "Forbearance",
				"description": "If the damage taken reduces the target below their Death's Door Threshold, they avoid dying for 1 Round. If their HP is restored to 1 HP or higher before the duration ends, they avoid dying. The cost of this Enhancement increases to 2 MP if you take the Targets Enhancement.\n\nExample: A creature with a Death's Door Threshold of 4 will die if their HP is reduced to -4 or lower. If that creature is targeted by this Spell with the Forbearance Enhancement, damage from an Attack that reduces them to -4 HP or lower would not kill that creature for 1 Round (they remain at -4 HP regardless of how much damage was taken). If the creature regains 5 HP, enough to get them from -4 HP to 1 HP, they would avoid dying when the 1 Round has passed.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "heal",
		"name": "Heal",
		"sources": [
			"Divine"
		],
		"school": "Invocation",
		"tags": [
			"Healing"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You heal a creature within range. Make a DC 15 Spell Check. Failure: The target regains 2 HP. Success: The target regains 3 HP. Success (Each 5): The target regains +1 HP. Critical Success: The target regains +2 HP."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "increased-healing",
				"name": "Increased Healing",
				"description": "1 target of your choice regains 2 additional HP.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "chain-heal",
				"name": "Chain Heal",
				"description": "Choose 1 additional target within 3 Spaces of the original target. The additional targets regain 2 HP. If you use this Enhancement multiple times, you choose an additional target within 3 Spaces of a previously chosen target.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "healing-wave",
		"name": "Healing Wave",
		"sources": [
			"Primal"
		],
		"school": "Invocation",
		"tags": [
			"Healing",
			"Cleansing"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You release a wave of healing energy in a 3 Space Aura. Make a DC 20 Spell Check. Failure: Each creature of your choice in the area regains 1 HP. Success: Each creature of your choice regains 2 HP. Success (Each 5): +1 HP."
			}
		],
		"enhancements": [
			{
				"id": "area",
				"name": "Area",
				"description": "The radius of the Aura increases by 2 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "increased-healing",
				"name": "Increased Healing",
				"description": "The targets regain +X HP.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "aura-of-healing",
				"name": "Aura of Healing",
				"description": "The duration of the Spell becomes 1 minute. For the duration, when a creature of your choice ends their turn in the area (including yourself), it can spend a number of Rest Points up to their Prime Modifier, regaining 1 HP per Rest Point spent.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Sustained",
				"sustained": true
			},
			{
				"id": "rejuvenation",
				"name": "Rejuvenation",
				"description": "When a creature spends Rest Points on Aura of Healing, they can repeat a Save against an effect they're subjected to.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Requires Aura of Healing",
				"requires": [
					"aura-of-healing"
				]
			}
		]
	},
	{
		"id": "illuminate",
		"name": "Illuminate",
		"sources": [
			"Divine",
			"Primal"
		],
		"school": "Invocation",
		"tags": [
			"Blinded",
			"Exposed",
			"Light",
			"Sense"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You attempt to illuminate every creature within a 3 Space diameter Sphere within range. Make a Spell Check contested by the Repeated Charisma Save of each creature in the area. Save Failure: For the duration, the creature emits a 1 Space radius of Dim Light and can't benefit from being Concealed (such as being Invisible)."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The Sphere's diameter is increased by 1 Space.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 minute.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "expose",
				"name": "Expose",
				"description": "On a failed Save, the target becomes Exposed for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "blinded",
				"name": "Blinded",
				"description": "On a failed Save, the target becomes Blinded for the duration.",
				"cost": {
					"mp": 4
				},
				"costText": "4 MP",
				"rawCost": "4 MP"
			}
		]
	},
	{
		"id": "life-transfer",
		"name": "Life Transfer",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Invocation",
		"tags": [
			"Blood",
			"Cleansing",
			"Healing"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You sacrifice your own health to heal a creature within range. Make a DC 15 Spell Check. Failure: You spend 1 Rest Point or HP and the target regains an equal amount of HP. Success: You can spend up to 2 Rest Points or HP and the target regains an equal amount of HP. Success (each 5): You can spend up to 1 more Rest Point or HP."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "increased-transfer",
				"name": "Increased Transfer",
				"description": "You spend X additional Rest Points or HP and the target regains an equal amount of HP.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "affliction",
				"name": "Affliction",
				"description": "Choose a Basic Disease, Basic Curse, or Basic Poison affecting the target, if it is willing the affliction ends on the target and you become affected by the affliction.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "light",
		"name": "Light",
		"sources": [
			"Arcane",
			"Divine",
			"Primal"
		],
		"school": "Invocation",
		"tags": [
			"Blinded",
			"Light"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You cause Bright Light to shine in a 2 Space diameter Sphere within range and Dim Light a further 1 Spaces.\n\n\n\nRelocate: When you Sustain this Spell or by spending 1 AP, you can move the Sphere up to 5 Spaces to another Space within range.\n\n\n\nAttach: When you cast the Spell, you can attach it to an object or creature within range. If you do, the target sheds Bright Light in a 1 Space Aura (and Dim Light 1 Space beyond that) and you can no longer use Relocate. If the target isn't willing, make a Spell Check against the target's Agility Save. Check Success: The target becomes the source of the light.\n\n\n\nBlind: You can spend 1 AP and 3 MP to end the spell and make a Spell Check against the Physical Save of each target in the area. Check Success: The target is Blinded for 1 Round."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (10 min -> 1 hour -> 8 hour -> Long Rest). You no longer need to Sustain the Spell and can end the spell for free at any time.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "intensify",
				"name": "Intensify",
				"description": "Light created by this Spell is considered Sunlight.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "luminous-burst",
		"name": "Luminous Burst",
		"sources": [
			"Divine"
		],
		"school": "Invocation",
		"tags": [
			"Exposed",
			"Light",
			"Radiant",
			"Tethered"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a flash of brilliant light in a 1 Space Aura. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Radiant damage."
			}
		],
		"spellPassive": "Illuminate: The Light level of the area increases by 1 until the end of the turn.\n\n\n\nDC Tip: Magical effects such as Illuminate don't stack with themselves. You can only increase the light level by 1 with the Illuminate effect.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The Aura’s radius increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "expose",
				"name": "Expose",
				"description": "Each target makes a Physical Save. Save Failure: The target is Exposed for 1 Round.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "divine-chains",
				"name": "Divine Chains",
				"description": "Each target makes a Repeated Intelligence Save. Save Failure: The target is Tethered to the area for 1 minute.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "punishing-chains",
				"name": "Punishing Chains",
				"description": "Creatures Tethered by Divine Chains take X Radiant damage at the start of each of their turns.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP, Requies Divine Chains",
				"variable": true,
				"requires": [
					"divine-chains"
				]
			}
		]
	},
	{
		"id": "mass-heal",
		"name": "Mass Heal",
		"sources": [
			"Divine"
		],
		"school": "Invocation",
		"tags": [
			"Healing",
			"Ward"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You heal creatures within a 4 Space diameter Sphere within range. Make a DC 20 Spell Check. Failure: Each creature of your choice in the area regains 1 HP. Success: Each creature of your choice regains 2 HP. Success (Each 5): Each creature regains +1 HP."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by 2 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "increased-healing",
				"name": "Increased Healing",
				"description": "Each target regains +X HP\n\n.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "protection",
				"name": "Protection",
				"description": "The next Attack made against each target within 1 Round has DisADV. You can use this Enhancement a maximum of two times. If you use this Enhancement twice, all Attacks made against each target within 1 Round have DisADV.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "radiant-bolt",
		"name": "Radiant Bolt",
		"sources": [
			"Divine"
		],
		"school": "Invocation",
		"tags": [
			"Blinded",
			"Exposed",
			"Light",
			"Radiant"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a bolt of light that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Radiant damage."
			}
		],
		"spellPassive": "Illuminate: The Light level in the target's Space increases by 1 until the end of the turn.\n\n\n\nDC Tip: Magical effects such as Illuminate don't stack with themselves. You can only increase the light level by 1 with the Illuminate effect.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "expose",
				"name": "Expose",
				"description": "The target makes a Physical Save. Save Failure: The target is Exposed and emits a 1 Space Aura of Bright Light for 1 Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "blinding",
				"name": "Blinding",
				"description": "The target makes a Physical Save. Save Failure: The target is Blinded for 1 Round.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "regenerate",
		"name": "Regenerate",
		"sources": [
			"Primal"
		],
		"school": "Invocation",
		"tags": [
			"Cleansing",
			"Healing"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "5 Spaces",
		"duration": "1 Round",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You heal a creature within range. Make a DC 15 Spell Check. Failure: The target regains 2 HP. Success: The target regains 2 HP immediately and 2 HP at the start of each of your turns for the duration. Success (Each 5): It regains +1 HP immediately."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "increased-healing",
				"name": "Increased Healing",
				"description": "The target regains +X HP immediately and +X HP at the start of each of your turns.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration of the Spell increases by X Rounds. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "repeat-save",
				"name": "Repeat Save",
				"description": "The target can immediately make a Repeated Save against an effect it's subjected to. It gains this benefit again at the start of each of your turns for the duration.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "revivify",
		"name": "Revivify",
		"sources": [
			"Divine",
			"Primal"
		],
		"school": "Invocation",
		"tags": [
			"Cleansing",
			"Resurrection",
			"Spirit"
		],
		"cost": {
			"ap": 1,
			"mp": 2
		},
		"isCantrip": false,
		"range": "1 Space",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You attempt to bring a creature back to life. Choose the corpse of a creature that died a maximum of 1 Round ago within range. Make a DC 10 Spell Check. Success: The creature comes back to life with 0 HP (on Death's Door). Success (each 5): They come back with +1 HP.\n\n\n\nThis spell can't return to life a creature that has died of old age nor can it restore any missing body parts. Any afflictions or conditions affecting the creature when it died remain when its brought back to life."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 1 Space. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The maximum period of time a corpse has been dead that you can target increases by X Rounds.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "rejuvenated",
				"name": "Rejuvenated",
				"description": "The creature comes back to life with X less levels of Exhaustion.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "solar-beam",
		"name": "Solar Beam",
		"sources": [
			"Divine",
			"Primal"
		],
		"school": "Invocation",
		"tags": [
			"Blinded",
			"Burning",
			"Light",
			"Radiant"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You store a radiant power within yourself for the duration. You gain 1 Charge plus another Charge each time you Sustain this Spell (up to a maximum of 4).\n\n\n\nSunlight: Once on each of your turns while in an area of Sunlight, you can spend 1 AP to gain a Charge.\n\n\n\nSpell Attack: You can spend 1 AP to release all stored Charges and make an Area Spell Attack against the AD every target within an 8 Space Line. If you release 4 Charges, you make the Attack with ADV. Hit: The target takes 1 Radiant damage per Charge."
			}
		],
		"spellPassive": "Light Beacon: For the duration of the Spell, the Light Level of any Space you occupy increases by 1.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The length of the Line increases by 4 Spaces.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "burning-radiance",
				"name": "Burning Radiance",
				"description": "Each target makes a Repeated Physical Save. Save Failure: The target begins Burning X for 1 minute. Burning damage caused by this Enhancement deals Radiant damage.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "blinding",
				"name": "Blinding",
				"description": "Each target makes a Physical Save. Save Failure: The target is Blinded for 1 Round.",
				"cost": {
					"mp": 4
				},
				"costText": "4 MP",
				"rawCost": "4 MP"
			}
		]
	},
	{
		"id": "spirit-link",
		"name": "Spirit Link",
		"sources": [
			"Divine"
		],
		"school": "Invocation",
		"tags": [
			"Blood",
			"Communication",
			"Curse",
			"Spirit",
			"Ward"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "Make a Spell Check against the Repeated Charisma Save of 2 creatures within range that don't share their HP. Check Success: If both targets fail the Save, they're Linked for the Duration.\n\n\n\nDC Tip: A creature can choose to fail a Save if it wants.\n\n\n\nLinked: While within 10 Spaces of each other, whenever one Linked creature regains or loses HP, the amount is shared with the other Linked creature.\n\n\n\nExample: You target yourself and an enemy, they fail the Save and you choose to fail the Save making you Linked to each other. When the enemy drinks a healing potion to heal 2 HP, you instead heal for 1 HP each, splitting the healing between you."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "extended-link",
				"name": "Extended Link",
				"description": "The maximum range of the Link increases by 5 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "lions-heart",
				"name": "Lion's Heart",
				"description": "While within range of the link, each target gains Resistance to Charmed, T Taunted, I Intimidated, Frightened, and Terrified).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "shared-mind",
				"name": "Shared Mind",
				"description": "While within range of the Link, the targets can communicate telepathically with each other.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "transference",
				"name": "Transference",
				"description": "Instead of sharing HP regained or lost while Linked, choose 1 target to receive all the changes in HP.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			},
			{
				"id": "profane",
				"name": "Profane",
				"description": "Instead of sharing loses of HP while Linked, both creatures lose the full amount of HP.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "sunburst",
		"name": "Sunburst",
		"sources": [
			"Divine",
			"Primal"
		],
		"school": "Invocation",
		"tags": [
			"Blinded",
			"Exposed",
			"Light",
			"Radiant"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a flash of brilliant radiance in a 6 Space tall, 3 Space diameter Cylinder within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Radiant damage.\n\n\n\n## Nullification\n\n\n\nNullification is the magic of negative energy, such as antimagic, anti-life, and darkness. Spells that destroy magic, spirits, and light fall into the School of Nullification."
			}
		],
		"spellPassive": "Illuminate: The Light level of the area increases by 1 until the end of the turn.\n\n\n\nDC Tip: Magical effects such as Illuminate don't stack with themselves. You can only increase the light level by 1 with the Illuminate effect.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Cylinder increases by 1 Space and the Height by 2 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "expose",
				"name": "Expose",
				"description": "Each target makes a Physical Save. Save Failure: The target is Exposed for 1 Round.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "blinding",
				"name": "Blinding",
				"description": "Each target makes a Physical Save. Save Failure: The target is Blinded for 1 Round.",
				"cost": {
					"mp": 4
				},
				"costText": "4 MP",
				"rawCost": "4 MP"
			},
			{
				"id": "radiant-beam",
				"name": "Radiant Beam",
				"description": "The duration of the Spell becomes 1 minute. Celestial light (sun, moon or star light) fills the area for the duration. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Might Save against your Save DC. Save Failure: The target takes X Radiant damage.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP, Sustained",
				"sustained": true,
				"variable": true
			},
			{
				"id": "moving-beam",
				"name": "Moving Beam",
				"description": "When you Sustain this Spell or by spending 1 AP, you can move the area up to 5 Spaces to another Space within range.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Requires Radiant Beam",
				"requires": [
					"radiant-beam"
				]
			}
		]
	},
	{
		"id": "arcane-shield",
		"name": "Arcane Shield",
		"sources": [
			"Arcane"
		],
		"school": "Nullification",
		"tags": [
			"Ward"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "1 Space",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You create a barrier of magic to protect yourself or another creature nearby.\n\n\n\nTrigger: When a target you can see within range (including yourself) is targeted by an Attack against its AD.\n\n\n\nReaction: You grant the target a +5 bonus to its AD against this Attack."
			}
		],
		"enhancements": [
			{
				"id": "multiple-targets",
				"name": "Multiple Targets",
				"description": "You target 1 additional creature within range that's also targeted by the same Attack.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "arcane-absorption",
				"name": "Arcane Absorption",
				"description": "Immediately after the Attack, you gain 2 Temp HP. The Temp HP increases by 2 each time you use this Enhancement.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "bane",
		"name": "Bane",
		"sources": [
			"Divine"
		],
		"school": "Nullification",
		"tags": [
			"Curse",
			"Enfeeble"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You attempt to impose 1 of the Curses below on a creature of your choice within range. Make a Spell Check against the target's Repeated Charisma Save. Save Failure: The target is Cursed for the duration. The Curse can be removed by any effect that ends a Basic Curse.\n\n\n\n## Curses\n\n\n\n- Attacks: The target subtracts a d6 from its Attack Checks for the duration.\n\n- Saves: The target subtracts a d6 from its Saves (except against this Spell) for the duration."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "full-bane",
				"name": "Full Bane",
				"description": "The target also subtract the same die from its Saves. The cost of this Enhancement increases to 4 MP if you use the Targets Enhancement.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "greater-bane",
				"name": "Greater Bane",
				"description": "The size of the die increases by 1 step (d6 -> d8 -> d10 -> d12).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "corpse-explosion",
		"name": "Corpse Explosion",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Nullification",
		"tags": [
			"Ailment",
			"Death",
			"Enfeeble",
			"Umbral"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "Trigger: A target within range you can see dies.\n\n\n\nReaction: The target's corpse explodes, make an Area Spell Attack against the AD of each target within 1 Space of the corpse. Hit: The target takes 1 Umbral Damage."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "disease-cloud",
				"name": "Disease Cloud",
				"description": "A cloud forms in a 3 Space diameter Sphere centered on the corpse for 1 minute. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Repeated Might Save against your Save DC. Save Failure: The target is Diseased for 1 minute. Creatures Diseased by this Spell have their current and maximum HP reduced by X at the start of each of their turns. The creature's maximum HP returns to normal after taking a Rest. This Disease can be removed by any effect that ends a Basic Disease.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "creeping-death",
				"name": "Creeping Death",
				"description": "Requires Disease Cloud. Creatures Diseased by this Spell can't regain HP.\n\nBeta Note: A creature with a Medicine Kit can attempt to remove a Basic Disease from a creature within 1 Space (including themselves) by spending 1 AP and 1 charge from the Medicine Kit and make a Medicine Check against the effect's Save DC, removing the Disease on a success.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "darkness",
		"name": "Darkness",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Nullification",
		"tags": [
			"Shadow",
			"Slowed"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "5 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You create a 4 Space Sphere of Magical Darkness within range.\n\n\n\nRelocate: When you Sustain this Spell or by spending 1 AP, you can move the Sphere up to 5 Spaces to another Space within range.\n\n\n\nAttach: When you cast the Spell, you can attach it to an object or creature within range. If you do, the target sheds Darkness in a 1 Space Aura and you can no longer use Relocate. If the target is not willing, make a Spell Check against the target's Agility Save. Check Success: The target becomes the source of the Darkness."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by 2 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (10 min -> 1 hour -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "light-eater",
				"name": "Light Eater",
				"description": "Mundane light sources within the area are extinguished.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "grasping-gloom",
				"name": "Grasping Gloom",
				"description": "When a creature enters the area for the first time on its turn or starts its turn there, it makes an Agility Save against your Save DC. Save Failure: The target is Slowed for 1 round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "death",
		"name": "Death",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Nullification",
		"tags": [
			"Curse",
			"Death",
			"Doomed",
			"Exhaustion"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You doom a creature within range. Make a Spell Check against the target's Repeated Might Save. Check Success: The target is Doomed 2. When you Sustain the Spell, it gains an additional stack of Doomed. When the Spell ends, it loses all stacks of Doomed gained from this Spell.\n\n\n\nDeath: If the number of Doomed stacks on a creature affected by this Spell is equal to or exceeds their current maximum HP, it immediately dies.\n\n\n\nExample: A creature has 10 max HP. When they reach Doomed 5, their max HP has been reduced to 5, at which point they die."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "increased-doomed",
				"name": "Increased Doomed",
				"description": "The target gains an additional stack of Doomed, both when it fails the original Save and when you Sustain the Spell.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "exhaustion",
				"name": "Exhaustion",
				"description": "Each time the target fails a Save against this Spell (including the original Save), it gains Exhaustion.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "death-bolt",
		"name": "Death Bolt",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Nullification",
		"tags": [
			"Curse",
			"Doomed",
			"Umbral"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a bolt of negative energy that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target you can see within range. Hit: The target takes 1 Umbral damage."
			}
		],
		"spellPassive": "Obscure: The Light level in the target's Space decreases by 1 until the end of the turn.\n\n\n\nDC Tip: Magical effects such as Obscure don't stack with themselves. You can only decrease the light level by 1 with the Obscure effect.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "doom",
				"name": "Doom",
				"description": "The target makes a Repeated Charisma Save. Failure: The target is Doomed X.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "call-of-the-grave",
				"name": "Call of the Grave",
				"description": "You add a d12 to your Attack Check if the target is Bloodied.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "wither",
				"name": "Wither",
				"description": "The target makes a Repeated Charisma Save. Save Failure: The target is Cursed for the duration. Creatures Cursed by this Spell take X Umbral damage at the start of each of their turns. This Curse can be removed by any effect that ends a Basic Curse.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "disintegrating-beam",
		"name": "Disintegrating Beam",
		"sources": [
			"Arcane"
		],
		"school": "Nullification",
		"tags": [
			"Death",
			"Enfeeble",
			"True",
			"Weakened"
		],
		"cost": {
			"ap": 2,
			"mp": 2
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You create an 8 Space Line of pure destructive energy. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 2 True Damage. The additional damage from Critical Hits and Heavy Hits or higher is doubled."
			}
		],
		"spellPassive": "Annihilating: The Spell deals double damage to objects. Creatures and objects killed or destroyed by this Spell are reduced to a pile of ash.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The length of the Line increases by 6 Spaces.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "weaken",
				"name": "Weaken",
				"description": "Each target makes a Physical save. Save Failure: They're Weakened for 1 Round.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "disintegrating",
				"name": "Disintegrating",
				"description": "Each target makes a Repeated Physical save. Save Failure: They gain Vulnerability (1) to all damage for 1 Round.",
				"cost": {
					"mp": 4
				},
				"costText": "4 MP",
				"rawCost": "4 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "disintegrate",
		"name": "Disintegrate",
		"sources": [
			"Arcane"
		],
		"school": "Nullification",
		"tags": [
			"Death",
			"Enfeeble",
			"True",
			"Weakened"
		],
		"cost": {
			"ap": 1,
			"mp": 2
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a bolt of pure destructive energy. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 3 True Damage. The additional damage from Critical Hits and Heavy Hits or higher is doubled."
			}
		],
		"spellPassive": "Annihilating: The Spell deals double damage to objects. Creatures and objects killed or destroyed by this Spell are reduced to a pile of ash.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"ap": "X"
				},
				"costText": "X AP",
				"rawCost": "X AP",
				"variable": true
			},
			{
				"id": "weaken",
				"name": "Weaken",
				"description": "The target makes a Physical save. Save Failure: They’re Weakened for 1 Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "disintegrating",
				"name": "Disintegrating",
				"description": "The target makes a Physical save. Save Failure: They gain Vulnerability (1) to all damage for 1 Round.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "dispel-magic",
		"name": "Dispel Magic",
		"sources": [
			"Arcane"
		],
		"school": "Nullification",
		"tags": [
			"Antimagic",
			"Cleansing"
		],
		"cost": {
			"ap": 1,
			"mp": "X",
			"minimumMp": 1,
			"raw": "1 AP + X MP (minimum of 1)"
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "See Effect",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You attempt to permanently dispel an MP Effect within range or temporarily dispel a Magic Item within range (Artifacts are immune to this Spell).\n\n\n\nMP Effect: Make a Spell Check against the Save DC of the creature that produced the MP Effect. Your Check gains a bonus equal to twice the MP you spent on this Spell, and the Save DC gains a bonus equal to twice the MP the creature spent to produce the MP Effect. Check Success: The MP Effect ends.\n\n\n\nDC Tip: Monsters that produce an MP Effect are considered to be spending MP up to half their level, rounded up (what their Mana Spend Limit would be). If it's an MP Effect not produced by a creature, the GM determines the DC.\n\n\n\nMagic Item: Make a Spell Check against the Save DC of the creature that created the Magic Item. Your Check gains a bonus equal to twice the MP you spent on this Spell, and the Save DC gains a bonus equal to twice the item's Magic Power. Check Success: The Magic Item becomes mundane for 24 hours.\n\n\n\nDC Tip: When determining the Save DC of the item's creator, consider the level a PC must be to produce an MP Effect with enough MP to match the item's Magic Power value. An item with a Magic Power of 3 is equivalent to a 3 MP Spell. A PC must be at least level 5 to have a Mana Spend Limit that allows them to cast a 3 MP Spell. The Save DC of a level 5 PC is 17 (10 + Combat Mastery (1/2 their level, round up) + Prime Modifier (4))."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "enfeeble",
		"name": "Enfeeble",
		"sources": [
			"Divine",
			"Primal"
		],
		"school": "Nullification",
		"tags": [
			"Curse",
			"Enfeeble"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You attempt to Curse the Physical or Mental (your choice) Checks and Saves of a creature of your choice within range for the duration. Make a Spell Check against the target's Repeated Charisma Save. Save Failure: The target is Cursed for the duration. While Cursed in this way, the target subtracts a d6 from Checks and Saves (except against this Spell) of the chosen category. The Curse can be removed by any effect that ends a Basic Curse."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "full-enfeeble",
				"name": "Full Enfeeble",
				"description": "You Curse all of the target's Attributes. The cost of this Enhancement increases to 2 MP if you use the Targets Enhancement.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "greater-enfeeble",
				"name": "Greater Enfeeble",
				"description": "The size of the die increases by 1 step (d6 -> d8 -> d10 -> d12).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "muffle",
		"name": "Muffle",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Nullification",
		"tags": [
			"Communication",
			"Deafened",
			"Disoriented",
			"Sound"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You create a 3 Space diameter Sphere within range. No sound can pass from the outside to the inside of the area or vice-versa (becoming Unheard).\n\n\n\nRelocate: When you Sustain this Spell or by spending 1 AP, you can move the area up to 5 Spaces within range."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "silence",
				"name": "Silence",
				"description": "The area becomes silent, no sound can be heard or produced in it. All creatures in the area are Deafened and Verbal Components can't be performed in it.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "disorient",
				"name": "Disorient",
				"description": "Requires Silence. When a creature enters the area for the first time on its turn or starts its turn there, they make a Repeated Intelligence Save against your Save DC. Save Failure: The target is Disoriented until it leaves the area.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "sanctuary",
		"name": "Sanctuary",
		"sources": [
			"Divine"
		],
		"school": "Nullification",
		"tags": [
			"Embolden",
			"Spirit",
			"Ward"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "Choose a creature within range. Attacks are made with DisADV against the target. The target gains no benefit from this Spell for 1 Round if it makes an Attack, targets another creature with a Check, or forces a creature to make a Save."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "save-resistance",
				"name": "Save Resistance",
				"description": "The creature gains ADV on Saves.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "possession-protection",
				"name": "Possession Protection",
				"description": "The target can't be possessed. If it's already possessed, it can repeat its Save against the possession at the start of each of its turns.\n\nBeta Note: This Enhancement applies to ghosts, spirits, and other creatures of the sort.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "enforced-peace",
				"name": "Enforced Peace",
				"description": "When a creature makes an Attack against the target, it makes an Intelligence Save against your Save DC. Save Failure: The creature can't perform the Attack (it still spends the resources used on the Attack). This Save doesn't prevent the target from benefitting from this Spell for 1 Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "sphere-of-death",
		"name": "Sphere of Death",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Nullification",
		"tags": [
			"Death",
			"Doomed",
			"Exhaustion",
			"Shadow",
			"Umbral"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You produce a burst of shadow magic that envelops a 3 Space diameter Sphere within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Umbral damage.\n\n\n\nClose Quarters Penalty: You have DisADV on the Attack if you're within the Melee Range of at least 1 enemy, unless that enemy is Incapacitated."
			}
		],
		"spellPassive": "Obscure: The Light level in the target's Space decreases by 1 until the end of the turn.\n\n\n\nDC Tip: Magical effects such as Obscure don't stack with themselves. You can only decrease the light level by 1 with the Obscure effect.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "doom",
				"name": "Doom",
				"description": "Each target makes a Repeated Charisma Save. Failure: The target is Doomed X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "exhaustion",
				"name": "Exhaustion",
				"description": "Each target makes a Might Save. Save Failure: The target gains Exhaustion.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "umbral-burst",
		"name": "Umbral Burst",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Nullification",
		"tags": [
			"Death",
			"Doomed",
			"Shadow",
			"Umbral"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a burst of shadow magic that envelops a 1 Space Aura. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Umbral damage."
			}
		],
		"spellPassive": "Obscure: The Light level in the target's Space decreases by 1 until the end of the turn.\n\n\n\nDC Tip: Magical effects such as Obscure don't stack with themselves. You can only decrease the light level by 1 with the Obscure effect.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The radius of the Aura increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "doom",
				"name": "Doom",
				"description": "Each target makes a Repeated Charisma Save. Failure: The target is Doomed X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "death-cascade",
				"name": "Death Cascade",
				"description": "If you kill a target with this Spell, it explodes. Each target within 1 Space of the exploding creature makes a Agility Save. Save Failure: The target takes X Umbral damage. Damage from this Enhancement also triggers Death Cascade.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP, Repeatable",
				"repeatable": true,
				"variable": true
			}
		]
	},
	{
		"id": "umbral-wave",
		"name": "Umbral Wave",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Nullification",
		"tags": [
			"Doomed",
			"Shadow",
			"Umbral",
			"Undead"
		],
		"cost": {
			"ap": 2
		},
		"isCantrip": true,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You conjure a burst of shadow magic that envelops a 3 Space Cone. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Umbral damage."
			}
		],
		"spellPassive": "Obscure: The Light level in the target's Space decreases by 1 until the end of the turn.\n\n\n\nDC Tip: Magical effects such as Obscure don't stack with themselves. You can only decrease the light level by 1 with the Obscure effect.",
		"enhancements": [
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The length of the Cone increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "doom",
				"name": "Doom",
				"description": "Each target makes a Repeated Charisma Save. Failure: The target is Doomed X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "heal-undead",
				"name": "Heal Undead",
				"description": "Undead creatures in the area are immune to the damage from this Spell and regain an amount of HP equal to the damage of this Spell.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "vampiric-touch",
		"name": "Vampiric Touch",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Nullification",
		"tags": [
			"Blood",
			"Doomed",
			"Healing",
			"Slowed",
			"Umbral"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "1 Space",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "Make a Melee Spell Attack against the PD of a creature in range. Hit: The target takes 1 Umbral damage and you can spend 1 Rest Point to regain 1 HP."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 1 Space. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "leeching-grab",
				"name": "Leeching Grab",
				"description": "The target makes a Might Save against your Save DC. Save Failure: The target is Slowed for 1 round.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "doomed",
				"name": "Doomed",
				"description": "The target makes a Repeated Charisma Save against your Save DC. Save Failure: The target is Doomed for 1 minute.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "life-drain",
				"name": "Life Drain",
				"description": "The damage increases by X and you regain X HP on a Hit (you regain this HP without spending Rest Points).",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "wild-guard",
		"name": "Wild Guard",
		"sources": [
			"Primal"
		],
		"school": "Nullification",
		"tags": [
			"Motion",
			"Ward"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "1 Space",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You manipulate nature to protect yourself or another creature nearby.\n\n\n\nTrigger: When a target you can see within range (including yourself) is targeted by an Attack against their PD.\n\n\n\nReaction: You grant the target a +5 bonus to its PD against this Attack."
			}
		],
		"enhancements": [
			{
				"id": "grapple",
				"name": "Grapple",
				"description": "If the Attacker is within 1 Space of you, they make a Physical Save. Save Failure: The Attacker becomes Grappled by you once the Attack is resolved.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "natures-intervention",
				"name": "Nature's Intervention",
				"description": "After the Attack is resolved, the target immediately moves 2 Space for free without provoking Opportunity Attacks.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "zone-of-peace",
		"name": "Zone of Peace",
		"sources": [
			"Divine"
		],
		"school": "Nullification",
		"tags": [
			"Emotions",
			"Tethered",
			"Ward"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You create a 3 Space diameter Sphere centered on yourself where violence is prohibited within range for the duration. Attacks made by or against creatures in the area are Hindered.\n\n\n\n## Transmutation\n\n\n\nTransmutation is the magic of transforming one thing physically into another. Spells that turn creatures into other creatures (or objects into other objects or creatures) fall into the School of Transmutation."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "When you create the Sphere, you can center it on a Space within 5 Spaces instead.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by 1 Space.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "tethered",
				"name": "Tethered",
				"description": "When you cast the spell, make a Spell Check against the Repeated Intelligence Save of creatures of your choice within the area. Check Success: The target is Tethered to the area for the duration.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "enforced-peace",
				"name": "Enforced Peace",
				"description": "When a creature makes an Attack affected by this Spell, it makes an Intelligence Save against your Save DC. Save Failure: The target can't perform the Attack (it still spends the resources used on the Attack).",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "restraining-order",
				"name": "Restraining Order",
				"description": "Requires Enforced Peace. If a creature fails the Save against Enforced Peace, it can't Attack for 1 round.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "acid-imbued",
		"name": "Acid Imbued",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Transmutation",
		"tags": [
			"Corrosion",
			"Enfeeble",
			"Hindered",
			"Strike",
			"Weapon"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "For the duration, you deal +1 Corrosion damage on Martial Attacks."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range becomes 5 Spaces, allowing you to target other creatures with the Spell.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "Attacks affected by this Spell deal +1 Corrosion damage for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "effortless",
				"name": "Effortless",
				"description": "You no longer need to Sustain the Spell.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You target X additional creatures of your choice within 5 Spaces that you can see. When you choose this Enhancement, the cost of all other Enhancements (except Range and Effortless) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "dissolving-strikes",
				"name": "Dissolving Strikes",
				"description": "For the duration, 1 target of an Attack affected by this Spell makes an Agility Save against your Save DC. Save Failure: The target no longer benefits from PDR or EDR for 1 Round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "acid-strikes",
				"name": "Acid Strikes",
				"description": "For the duration, 1 target of an Attack affected by this Spell makes an Agility Save against your Save DC. Save Failure: The target is Hindered for 1 Round.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "alter-size",
		"name": "Alter Size",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Transmutation",
		"tags": [
			"Embolden",
			"Enfeeble",
			"Metamorphosis"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You alter the size of an object that is not being held or carried or a creature within range, making it larger or smaller for the duration.\n\n\n\n## Object\n\n\n\nMake a DC 10 Spell Check. Success: You make the object Larger or Smaller.\n\n\n\nLarger: The object's size increases by 1 and its weight is multiplied by 4. If there isn't enough space, it increases to the maximum possible size in the available space.\n\n\n\nSmaller: The object's size decreases by 1 and its weight is divided by 4.\n\n\n\n## Creature\n\n\n\nMake a Spell Check contested by the target's Repeated Might Save. Contest Success: They become 1 size Larger or Smaller (your choice). Everything they are wearing and carrying changes size with them. Any item no longer held or carried by the creature returns to normal size at the end of that turn.\n\n\n\nLarger: The target's size increases by 1 and their weight is multiplied by 4. If there isn't enough space, it increases to the maximum possible size in the available space.\n\n\n\nSmaller: The target's size decreases by 1 and their weight is divided by 4."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration is increased by 1 step (10 min -> 1 hour -> 8 hour -> until Long Rest). You no longer need to Sustain the Spell and you can end it at any time for free.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "greater-alteration",
				"name": "Greater Alteration",
				"description": "The target's Size increases or decreases by 1 more step (e.g Medium -> Large -> Huge).",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "blessing-of-earth",
		"name": "Blessing of Earth",
		"sources": [
			"Primal"
		],
		"school": "Transmutation",
		"tags": [
			"Earth",
			"Embolden",
			"Motion",
			"Sense"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 Minutes (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You grant a creature with range Tremorsense 3 Spaces and a Burrow Speed equal to half their Speed for the duration.\n\n\n\nSpell Cast: When you cast the Spell, make a DC 15 Spell Check. Success: The target can immediately move in any direction up to their Speed, provided they move underground.\n\n\n\n## Burrow Speed\n\n\n\nYou can move through sand, dirt, mud, and snow, but not through solid ice or rock. When you do, you leave a collapsed tunnel behind you.\n\n\n\nDC Tip: A creature that requires air to breath will need to hold their breath or begin Suffocating while Burrowing underground."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "earth-walk",
				"name": "Earth Walk",
				"description": "When the target walks along the ground, they can choose to leave behind Difficult Terrain in their path.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "greater-blessing",
				"name": "Greater Blessing",
				"description": "The Tremorsense increases by 2 Spaces, the Burrow Speed increases to equal their Speed, and they can breath underground.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "blessing-of-water",
		"name": "Blessing of Water",
		"sources": [
			"Primal"
		],
		"school": "Transmutation",
		"tags": [
			"Embolden",
			"Metamorphosis",
			"Motion",
			"Water"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "10 minutes",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You grant a creature with range a Swim Speed, the ability to breathe underwater, and Tremorsense 5 Spaces while underwater for the duration.\n\n\n\nSpell Cast: When you cast the Spell, make a DC 15 Spell Check. Success: The target can immediately move in any direction up to their Speed, provided they're moving in water."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target 2 additional creatures within range per X MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "water-walk",
				"name": "Water Walk",
				"description": "The target can walk on water as if it were solid ground and can stop doing so anytime during their turn. It can use either their Speed or Swim Speed for this movement.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "greater-blessing",
				"name": "Greater Blessing",
				"description": "At the start of each of the target's turns they gain movement equal to their speed that can only be used on swimming.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "chaos-bolt",
		"name": "Chaos Bolt",
		"sources": [
			"Arcane"
		],
		"school": "Transmutation",
		"tags": [
			"Chaos"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You hurl a bolt of volatile energy at a creature within range.\n\n\n\nRoll a d12 to determine the bolt's damage type. Make a Ranged Spell Attack against the PD of a target within range while they make an Intelligence Save. Hit: The target takes 2 damage of the rolled damage type. Save Failure: The target is subjected to the effects of the Save Failure column based on the result rolled.\n\n\n\n| D12 | Damage | Save Failure |\n\n|-------|-------------|-------------------------------------------------------------------------------------------------|\n\n| 1 | Bludgeoning | The target is pushed 1 Space away. Failure (each 5): The target is pushed 1 additional Space. |\n\n| 2 | Piercing | The target can’t take Reactions for 1 round. |\n\n| 3 | Slashing | The target begins Bleeding for 1 minute. |\n\n| 4 | Cold | The target is Slowed for 1 round. |\n\n| 5 | Corrosive | The target is Hindered for 1 round. |\n\n| 6 | Fire | The target begins Burning for 1 minute. |\n\n| 7 | Lightning | The target is Stunned until the start of their turn. |\n\n| 8 | Poison | The target is Impaired for 1 round. |\n\n| 9 | Psychic | The target is Dazed for 1 round. |\n\n| 10 | Radiant | Attacks made against the target add a d4 to the check for 1 round. |\n\n| 11 | Umbral | The target is Doomed for 1 round. |\n\n| 12 | True | The target is Exposed for 1 round. |"
			}
		],
		"spellPassive": "Wild Magic Surge: When you Critically Fail or Critically Succeed on a Check made to cast this Spell, you roll on the Wild Magic Table.",
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "The damage increases by 1 for 1 target of your choice.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "unstable-surge",
				"name": "Unstable Surge",
				"description": "Choose 1 additional target within 5 Spaces of the original target using the same Spell Attack for all targets. You roll the damage type (and condition) again for each new target. If you use this Enhancement multiple times, you choose an additional target within 5 Spaces of the previously chosen target.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "chaos-torrent",
		"name": "Chaos Torrent",
		"sources": [
			"Arcane"
		],
		"school": "Transmutation",
		"tags": [
			"Chaos",
			"Enfeeble"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "Instantaneous",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "A spiraling surge of warped energy erupts from you in an 8 Space Line. Make a Spell Check against the Intelligence Save of each target in the area. Check Success: The target roll a d6 on the table below.\n\n\n\n| D6 | Effect |\n\n|------|----------------------------------------------------------------------------------------------------------------------------|\n\n| 1 | The target can’t take Reactions until the end of its next turn. |\n\n| 2 | The target is Slowed 2 for 1 Round. |\n\n| 3 | The target must immediately makes a Melee Martial Attack as a Reaction against a random creature within its Melee range. |\n\n| 4 | The target is teleported a d4 Spaces in a random direction. |\n\n| 5 | The target is Weakened for 1 Round. |\n\n| 6 | The target is Disoriented for 1 Round. |"
			}
		],
		"enhancements": [
			{
				"id": "remote",
				"name": "Remote",
				"description": "The range becomes 5 Spaces, with the origin of the Line becoming the chosen space.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "length",
				"name": "Length",
				"description": "The length of the Line increases by 4 Spaces.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "width",
				"name": "Width",
				"description": "The width of the Line increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "chaos-surge",
				"name": "Chaos Surge",
				"description": "Each target rolls twice and suffers both effects. If a target rolls the same number twice, it rolls again until it gets two different results.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "cold-imbued",
		"name": "Cold Imbued",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Transmutation",
		"tags": [
			"Cold",
			"Slowed",
			"Strike",
			"Weapon"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "For the duration, you deal +1 Cold damage on Martial Attacks."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range becomes 5 Spaces, allowing you to target other creatures with the Spell.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "Attacks affected by this Spell deal +1 Cold damage for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "effortless",
				"name": "Effortless",
				"description": "You no longer need to Sustain the Spell.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You target X additional creatures of your choice within 5 Spaces that you can see. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "slowing-strikes",
				"name": "Slowing Strikes",
				"description": "For the duration, 1 target of an Attack affected by this Spell makes a Might Save against your Save DC. Save Failure: The target is Slowed for 1 round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "chilling-strikes",
				"name": "Chilling Strikes",
				"description": "For the duration, 1 target of an Attack affected by this Spell makes a Might Save against your Save DC. Save Failure: The target can't take Reactions for 1 round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "enhance-ability",
		"name": "Enhance Ability",
		"sources": [
			"Divine",
			"Primal"
		],
		"school": "Transmutation",
		"tags": [
			"Embolden"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You bolster the Physical or Mental (your choice) Checks and Saves of a creature within range for the duration. Make a DC 15 Spell Check. Failure: The target adds a d4 to Checks and Saves of the chosen Attribute category. Success: The target adds a d6 to Checks and Saves of the chosen Attribute category. Success (10): The target adds a d8 instead."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration is increased by 1 step (1 min -> 10 min -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "full-enhance",
				"name": "Full Enhance",
				"description": "You bolster all the target's Attributes. The cost of this Enhancement increases to 2 MP if you use the Targets Enhancement.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "greater-enhance",
				"name": "Greater Enhance",
				"description": "The size of the die granted increases by 1 step (d4 -> d6 -> d8 -> d10 -> d12).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			}
		]
	},
	{
		"id": "fire-imbued",
		"name": "Fire Imbued",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Transmutation",
		"tags": [
			"Burning",
			"Fire",
			"Strike",
			"Weapon"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "For the duration, you deal +1 Fire damage on Martial Attacks."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range becomes 5 Spaces, allowing you to target other creatures with the Spell.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "Attacks affected by this Spell deal +1 Fire damage for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "effortless",
				"name": "Effortless",
				"description": "You no longer need to Sustain the Spell.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You target X additional creatures of your choice within 5 Spaces that you can see. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "flame-lash",
				"name": "Flame Lash",
				"description": "The range of Attacks affected by this Spell increase by 1 Space for Melee Attacks, or by 5 Spaces for Ranged Attacks.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "burning-strikes",
				"name": "Burning Strikes",
				"description": "For the duration, 1 target of an Attack affected by this Spell makes a Repeated Physical Save against your Save DC. Save Failure: The target is Burning X for 1 minute.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "invisibility",
		"name": "Invisibility",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Transmutation",
		"tags": [
			"Illusion",
			"Invisible",
			"Shadow"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "You magically cloak a target within range for the duration. Make a DC 15 Spell Check. Failure: The target is Invisible. Success: The target is Invisible and can immediately take the Hide Action for free. The Spell ends early if the target takes any Action or Reaction beside the Move, Dodge, Hide, or Sustain Actions.\n\n\n\nDC Tip: Being invisible makes you Unseen, but if you want to be fully Hidden from a creature you need to take the Hide action to also become Unheard."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (1 min -> 10 min -> 1 hour -> 8 hours -> Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "mass-invisibility",
				"name": "Mass Invisibility",
				"description": "You can target X additional creatures within range. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "greater-invisibility",
				"name": "Greater Invisibility",
				"description": "Choose 1 target. The Spell no longer ends early when the target takes any Action or Reaction.",
				"cost": {
					"mp": 3
				},
				"costText": "3 MP",
				"rawCost": "3 MP"
			}
		]
	},
	{
		"id": "lightning-imbued",
		"name": "Lightning Imbued",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Transmutation",
		"tags": [
			"Lightning",
			"Strike",
			"Trap",
			"Weapon"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "For the duration, you deal +1 Lightning damage on Martial Attacks."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range becomes 5 Spaces, allowing you to target other creatures with the Spell.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "Attacks affected by this Spell deal +1 Lightning damage for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "effortless",
				"name": "Effortless",
				"description": "You no longer need to Sustain the Spell.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You target X additional creatures of your choice within 5 Spaces that you can see. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "chain-lightning",
				"name": "Chain Lightning",
				"description": "For the duration, when you make an Attack affected by this Spell, you can choose 1 additional target within 3 Spaces of the original target using the same Martial Attack for the additional target. Hit: The Target takes X Lightning damage.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "static-strike",
				"name": "Static Strike",
				"description": "For the duration, 1 target of an Attack affected by this Spell makes a Physical Save against your Save DC. Save Failure: For the next round, the first time the target willingly moves or takes a Reaction it takes X Lightning damage.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "poison-imbued",
		"name": "Poison Imbued",
		"sources": [
			"Arcane",
			"Primal"
		],
		"school": "Transmutation",
		"tags": [
			"Ailment",
			"Impaired",
			"Poison",
			"Strike",
			"Weapon"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "For the duration, you deal +1 Poison damage on Martial Attacks."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range becomes 5 Spaces, allowing you to target other creatures with the Spell.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "Attacks affected by this Spell deal +1 Poison damage for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "effortless",
				"name": "Effortless",
				"description": "You no longer need to Sustain the Spell.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You target X additional creatures of your choice within 5 Spaces that you can see. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "impairing-strikes",
				"name": "Impairing Strikes",
				"description": "For the duration, 1 target of an Attack affected by this Spell makes a Might Save against your Save DC. Save Failure: The target is Impaired for 1 round.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			},
			{
				"id": "poisoned-strikes",
				"name": "Poisoned Strikes",
				"description": "For the duration, 1 target of an Attack affected by this Spell makes a Repeated Might Save against your Save DC. Save Failure: The target is Poisoned for 1 minute. Creatures Poisoned by this Spell take X Poison damage at the start of each of their turns. This Poison can be removed by any effect that ends a Basic Poison.\n\nBeta Note: A creature with a Medicine Kit can attempt to remove a Basic Poison from a creature within 1 Space (including themselves) by spending 1 AP and 1 charge from the Medicine Kit and make a Medicine Check against the effect's Save DC, removing the Basic Poison on a success.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	},
	{
		"id": "primal-hide",
		"name": "Primal Hide",
		"sources": [
			"Primal"
		],
		"school": "Transmutation",
		"tags": [
			"Embolden",
			"Ward"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Hour",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You harden the skin of a creature within range. The target gains +2 PD for the duration."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "duration",
				"name": "Duration",
				"description": "The duration increases by 1 step (1 hour -> 8 hours -> until Long Rest).",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "armored",
				"name": "Armored",
				"description": "The target gain an additional +1 PD.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "heavily-protected",
				"name": "Heavily Protected",
				"description": "The target gains EDR.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "psychic-imbued",
		"name": "Psychic Imbued",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Transmutation",
		"tags": [
			"Dazed",
			"Deafened",
			"Psychic",
			"Strike",
			"Weapon"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "For the duration, you deal +1 Psychic damage on Martial Attacks."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range becomes 5 Spaces, allowing you to target other creatures with the Spell.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "Attacks affected by this Spell deal +1 Psychic damage for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "effortless",
				"name": "Effortless",
				"description": "You no longer need to Sustain the Spell.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You target X additional creatures of your choice within 5 Spaces that you can see. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "dazing-strikes",
				"name": "Dazing Strikes",
				"description": "For the duration, 1 target of an Attack affected by this Spell makes an Intelligence Save against your Save DC. Save Failure: The target is Dazed for 1 round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "silencing-strikes",
				"name": "Silencing Strikes",
				"description": "For the duration, 1 target of an Attack affected by this Spell makes a Charisma Save against your Save DC. Failure: The target is Deafened and can't speak for 1 round.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "quicksand",
		"name": "Quicksand",
		"sources": [
			"Primal"
		],
		"school": "Transmutation",
		"tags": [
			"Earth",
			"Hindered",
			"Illusion",
			"Slowed",
			"Tethered"
		],
		"cost": {
			"ap": 2,
			"mp": 1
		},
		"isCantrip": false,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You turn 3 Space diameter Sphere of ground within range into quicksand for the duration. Creatures in the area are Slowed 2.\n\n\n\nSpell Cast: When you cast the Spell, make a Spell Check against the Might Save of each target in the area. Check Success: The target is Hindered for the duration or until it leaves the area."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "area",
				"name": "Area",
				"description": "The diameter of the Sphere increases by X Spaces.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "grasping-sand",
				"name": "Grasping Sand",
				"description": "Creatures Hindered by this Spell are also Tethered to the area. A creature can spend 1 AP to make a Repeated Might Save. Save Success: The target is no longer Tethered to the area.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "false-appearance",
				"name": "False Appearance",
				"description": "The Spell lasts for 1 hour and the area appears as normal terrain. A creature can discern a Space has been altered with a successful Nature Check against your Save DC.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			}
		]
	},
	{
		"id": "radiant-imbued",
		"name": "Radiant Imbued",
		"sources": [
			"Divine"
		],
		"school": "Transmutation",
		"tags": [
			"Light",
			"Radiant",
			"Strike",
			"Weapon"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "For the duration, you deal +1 Radiant damage on Martial Attacks."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range becomes 5 Spaces, allowing you to target other creatures with the Spell.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "Attacks affected by this Spell deal +1 Radiant damage for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "effortless",
				"name": "Effortless",
				"description": "You no longer need to Sustain the Spell.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You target X additional creatures of your choice within 5 Spaces that you can see. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "illuminating-strikes",
				"name": "Illuminating Strikes",
				"description": "For the duration, 1 target of an Attack affected by this Spell makes a Physical Save against your Save DC. Save Failure: The target sheds Dim Light in a 1 Space Aura and can't benefit from 1/2 Cover or being Invisible.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "guiding-strikes",
				"name": "Guiding Strikes",
				"description": "For the duration, 1 target of an Attack affected by this Spell makes a Physical Save against your Save DC. Save Failure: Attacks made against the target add a d4 to the Check for 1 round.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "shadowbind",
		"name": "Shadowbind",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Transmutation",
		"tags": [
			"Doomed",
			"Immobilized",
			"Shadow",
			"Tethered"
		],
		"cost": {
			"ap": 1
		},
		"isCantrip": true,
		"range": "10 Spaces",
		"duration": "1 Minute",
		"sustained": false,
		"effects": [
			{
				"title": "Effect",
				"description": "You bind a creature using its shadow. Make a Spell Check against the Repeated Charisma Save of a creature within range. Check Success: The target becomes Tethered 1 to their Space."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP, Repeatable",
				"repeatable": true
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "immobilize",
				"name": "Immobilize",
				"description": "The target becomes Immobilized instead.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "doomed",
				"name": "Doomed",
				"description": "Whenever the target fails a Save against this Spell (including the initial Save) they become Doomed X.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "choke",
				"name": "Choke",
				"description": "The target can’t breathe for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP"
			}
		]
	},
	{
		"id": "umbral-imbued",
		"name": "Umbral Imbued",
		"sources": [
			"Arcane",
			"Divine"
		],
		"school": "Transmutation",
		"tags": [
			"Blood",
			"Doomed",
			"Healing",
			"Strike",
			"Umbral",
			"Weapon"
		],
		"cost": {
			"ap": 1,
			"mp": 1
		},
		"isCantrip": false,
		"range": "Self",
		"duration": "1 Minute (Sustained)",
		"sustained": true,
		"effects": [
			{
				"title": "Effect",
				"description": "For the duration, you deal +1 Umbral damage on Martial Attacks."
			}
		],
		"enhancements": [
			{
				"id": "range",
				"name": "Range",
				"description": "The range becomes 5 Spaces, allowing you to target other creatures with the Spell.",
				"cost": {
					"ap": 1
				},
				"costText": "1 AP",
				"rawCost": "1 AP"
			},
			{
				"id": "damage",
				"name": "Damage",
				"description": "Attacks affected by this Spell deal +1 Umbral damage for the duration.",
				"cost": {
					"mp": 2
				},
				"costText": "2 MP",
				"rawCost": "2 MP, Repeatable",
				"repeatable": true
			},
			{
				"id": "effortless",
				"name": "Effortless",
				"description": "You no longer need to Sustain the Spell.",
				"cost": {
					"mp": 1
				},
				"costText": "1 MP",
				"rawCost": "1 MP"
			},
			{
				"id": "targets",
				"name": "Targets",
				"description": "You target X additional creatures of your choice within 5 Spaces that you can see. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
				"cost": {
					"ap": 1,
					"mp": "X"
				},
				"costText": "1 AP + X MP",
				"rawCost": "1 AP + X MP",
				"variable": true
			},
			{
				"id": "dooming-strikes",
				"name": "Dooming Strikes",
				"description": "For the duration, 1 target of an Attack affected by this Spell makes a Charisma Save against your Save DC. Save Failure: The target is Doomed X for 1 round.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			},
			{
				"id": "draining-strikes",
				"name": "Draining Strikes",
				"description": "For the duration, when you deal damage to a target with an Attack affected by this Spell, you can spend up to X Rest Points, regaining HP equal to the Rest Points Spent.",
				"cost": {
					"mp": "X"
				},
				"costText": "X MP",
				"rawCost": "X MP",
				"variable": true
			}
		]
	}
] as unknown as Spell[];
