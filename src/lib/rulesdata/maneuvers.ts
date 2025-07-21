/**
 * @file maneuvers.ts
 * @description Contains the schemas and a complete list of all Martial Maneuvers
 * from the DC20 Beta 0.9.5 rulebook (pages 48-50).
 */

//==============================================================================
// SCHEMAS / TYPES
//==============================================================================

/**
 * Categorizes maneuvers based on their function as described in the rulebook.
 */
export enum ManeuverType {
  Attack = 'Attack',
  Save = 'Save',
  Grapple = 'Grapple',
  Defense = 'Defense',
}

/**
 * Represents the resource cost of a maneuver, typically in Action Points (AP).
 */
export interface ManeuverCost {
  ap: number;
}

/**
 * The definitive blueprint for a single Maneuver object.
 */
export interface Maneuver {
  name: string;
  type: ManeuverType;
  cost: ManeuverCost;
  description: string;
  isReaction: boolean;
  trigger?: string;      // Optional: The condition for using a Reaction maneuver.
  requirement?: string;  // Optional: Any prerequisites for using the maneuver.
}


//==============================================================================
// MANEUVER DATA
//==============================================================================

/**
 * A comprehensive list of all martial maneuvers available in the game.
 */
export const maneuvers: Maneuver[] = [
  // --- Attack Maneuvers (Page 48) ---
  {
    name: "Extend Attack",
    type: ManeuverType.Attack,
    cost: { ap: 1 },
    description: "Your Melee Attack Range is increased by 1 Space (or your Ranged Attack Range is increased by 5 Spaces) for the Attack.",
    isReaction: false,
  },
  {
    name: "Power Attack",
    type: ManeuverType.Attack,
    cost: { ap: 1 },
    description: "You deal +1 damage with the Attack. You can use this Maneuver multiple times.",
    isReaction: false,
  },
  {
    name: "Sweep Attack",
    type: ManeuverType.Attack,
    cost: { ap: 1 },
    description: "Choose 1 additional target within 1 Space of the original target that’s within your Attack Range. Make 1 Attack Check against all targets. Attack Hit: The original target takes your Attack’s damage, and each additional target Hit takes 1 damage of the same type. You can use this Maneuver multiple times.",
    isReaction: false,
  },

  // --- Save Maneuvers (Page 49) ---
  {
    name: "Bleed",
    type: ManeuverType.Save,
    cost: { ap: 1 },
    description: "The target begins Bleeding (1 True damage at the start of their turn).",
    isReaction: false,
  },
  {
    name: "Daze",
    type: ManeuverType.Save,
    cost: { ap: 1 },
    description: "The target becomes Dazed (DisADV on Mental Checks) on the next Mental Check it makes before the end of your next turn.",
    isReaction: false,
  },
  {
    name: "Expose",
    type: ManeuverType.Save,
    cost: { ap: 1 },
    description: "The target becomes Exposed (Attacks against it have ADV) against the next Attack made against it before the end of your next turn.",
    isReaction: false,
  },
  {
    name: "Hamstring",
    type: ManeuverType.Save,
    cost: { ap: 1 },
    description: "The target becomes Slowed (every 1 Space you move costs an extra 1 Space of movement) until the end of your next turn.",
    isReaction: false,
  },
  {
    name: "Hinder",
    type: ManeuverType.Save,
    cost: { ap: 1 },
    description: "The target becomes Hindered (DisADV on Attacks) on the next Attack it makes before the end of your next turn.",
    isReaction: false,
  },
  {
    name: "Impair",
    type: ManeuverType.Save,
    cost: { ap: 1 },
    description: "The target becomes Impaired (DisADV on Physical Checks) on the next Physical Check it makes before the end of your next turn.",
    isReaction: false,
  },
  {
    name: "Knockback",
    type: ManeuverType.Save,
    cost: { ap: 1 },
    description: "The target is pushed 1 Space away + up to 1 additional Space for every 5 it fails its Save by.",
    isReaction: false,
  },
  {
    name: "Trip",
    type: ManeuverType.Save,
    cost: { ap: 1 },
    description: "The target falls Prone.",
    isReaction: false,
  },

  // --- Grapple Maneuvers (Page 49) ---
  {
    name: "Body Block",
    type: ManeuverType.Grapple,
    cost: { ap: 1 },
    isReaction: true,
    trigger: "You are targeted by an Attack.",
    description: "You reposition a creature Grappled by you to shield yourself from damage. You and the Grappled creature take half the damage dealt by the attack and you can move the Grappled creature to any space adjacent to you immediately afterwards.",
  },
  {
    name: "Restrain",
    type: ManeuverType.Grapple,
    cost: { ap: 1 },
    description: "The target is Restrained until the Grapple ends. On its turn it can spend 1 AP to end being Restrained, but it remains Grappled until the Condition ends.",
    isReaction: false,
  },
  {
    name: "Slam",
    type: ManeuverType.Grapple,
    cost: { ap: 1 },
    description: "The target takes 1 Bludgeoning damage. Success (each 5): +1 damage.",
    isReaction: false,
  },
  {
    name: "Takedown",
    type: ManeuverType.Grapple,
    cost: { ap: 1 },
    description: "The target falls Prone. You don’t fall Prone unless you choose to do so.",
    isReaction: false,
  },
  {
    name: "Throw",
    type: ManeuverType.Grapple,
    cost: { ap: 1 },
    requirement: "The Grappled creature is your Size or smaller.",
    description: "The target is thrown up to a number of Spaces away from you equal to 1/2 of your Might (ending the Grappled Condition) + up to 1 additional Space for every 5 they fail the Contest by.",
    isReaction: false,
  },

  // --- Defense Maneuvers (Page 50) ---
  {
    name: "Parry",
    type: ManeuverType.Defense,
    cost: { ap: 1 },
    isReaction: true,
    trigger: "When a creature you can see within 1 Space (including yourself) is targeted by an Attack against its PD.",
    description: "You grant the target a +5 bonus to PD against this Attack.",
  },
  {
    name: "Protect",
    type: ManeuverType.Defense,
    cost: { ap: 1 },
    isReaction: true,
    trigger: "A creature you can see within 1 Space is Hit by an Attack.",
    description: "The target takes half of the damage and you take the other half. The damage you take bypasses any Damage Reduction.",
  },
  {
    name: "Raise Shield",
    type: ManeuverType.Defense,
    cost: { ap: 1 },
    isReaction: true,
    trigger: "When a creature you can see within 1 Space (including yourself) is targeted by an Attack against its AD.",
    requirement: "You’re wielding a Shield.",
    description: "You grant the target a +5 bonus to AD against this Attack.",
  },
  {
    name: "Side Step",
    type: ManeuverType.Defense,
    cost: { ap: 1 },
    isReaction: true,
    trigger: "You’re targeted by an Attack against your PD.",
    description: "You move 1 Space to a Space that’s still within the Attack’s range. When you do, the Attack has DisADV against you. If you move behind Cover, you don’t gain the benefit of that Cover against the Attack.",
  },
  {
    name: "Swap",
    type: ManeuverType.Defense,
    cost: { ap: 1 },
    description: "You switch Spaces with a willing creature within 1 Space. If this movement would provoke an Opportunity Attack against you or the target creature, any Opportunity Attacks are made against you.",
    isReaction: false, // This is a standard action, not a reaction.
  },
  {
    name: "Taunt",
    type: ManeuverType.Defense,
    cost: { ap: 1 },
    description: "Choose an enemy creature that can see or hear you within 5 Spaces. Make an Attack Check, Influence Check, or Intimidation Check (your choice) contested by the target’s Mental Save. Contest Success: The target is Taunted (DisADV on Attacks against creatures other than you) by you on their next Attack.",
    isReaction: false,
  },
];

/** A simple alias for the main maneuvers array. */
export const allManeuvers = maneuvers;