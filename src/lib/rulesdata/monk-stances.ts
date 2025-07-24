/**
 * @file monk-stances.ts
 * @description Contains the schemas and a complete list of all Monk Stances
 * from the DC20 Beta 0.9.5 rulebook (page 144).
 *
 * General Rule for All Stances:
 * Entering & Exiting: In Combat, at the start of each of your turns you can freely enter or
 * swap into one of your Monk Stances. You can also spend 1 SP on your turn to swap to a
 * different stance. You can end your Stance at any moment for free.
 * You can only be in 1 Monk Stance at a time.
 */

//==============================================================================
// SCHEMA / TYPE
//==============================================================================

/**
 * The definitive blueprint for a single Monk Stance object.
 */
export interface MonkStance {
  /** The name of the stance, e.g., "Bear Stance". */
  name: string;
  /** A short, descriptive tagline for the stance, e.g., "Big Hits". */
  tagline: string;
  /** A list of the mechanical benefits the stance provides. */
  description: string[];
  /** Any special requirements for the stance to be active. */
  requirement?: string;
}


//==============================================================================
// MONK STANCE DATA
//==============================================================================

/**
 * A comprehensive list of all Monk Stances available in the game.
 */
export const monkStances: MonkStance[] = [
  {
    name: "Bear Stance",
    tagline: "Big Hits",
    description: [
      "+1 damage when you score a Heavy, Brutal, or Critical Hit with a Melee Martial Attack.",
      "Once on each of your turns, when you Miss an Attack with a Melee Martial Attack, you gain ADV on the next Melee Martial Attack you make before the end of your turn."
    ]
  },
  {
    name: "Bull Stance",
    tagline: "Knockback",
    description: [
      "You deal +1 Bludgeoning damage whenever you Succeed on a Physical Check to push a target or knock them back.",
      "When you shove or push a target, it’s knocked back 1 additional space. Additionally, you can choose to move in a straight line with the target an amount of spaces equal to how far they’re knocked back. This movement requires no AP and doesn’t provoke Opportunity Attacks."
    ]
  },
  {
    name: "Cobra Stance",
    tagline: "Counter",
    description: [
      "+1 damage with Melee Martial Attack against creatures that have damaged you since the start of your last turn.",
      "When a creature within your Melee Range misses you with a Melee Attack, you can spend 1 AP as a Reaction to make a Melee Martial Attack against it."
    ]
  },
  {
    name: "Gazelle Stance",
    tagline: "Nimble",
    requirement: "While not wearing Heavy Armor",
    description: [
      "+1 Movement Speed and Jump Distance.",
      "Ignore Difficult Terrain.",
      "ADV on Agility Saves and Acrobatics Checks."
    ]
  },
  {
    name: "Mantis Stance",
    tagline: "Grapple",
    description: [
      "ADV on all Martial Checks to initiate, maintain, or escape Grapples.",
      "If you have a creature Grappled at the start of your turn, you get +1 AP to use on a Grapple Maneuver against the Grappled creature."
    ]
  },
  {
    name: "Mongoose Stance",
    tagline: "Multi",
    description: [
      "Your Melee Martial Attacks deal +1 damage while you’re Flanked.",
      "When you make a Melee Martial Attack against a target, you can make another Melee Martial Attack for free against a different target within your Melee Range. You can only make this bonus Melee Martial Attack once on each of your turns. Make a single Attack Check and apply the number rolled to each target’s Physical Defense. Attack Hit: You deal your Melee Martial Attack damage."
    ]
  },
  {
    name: "Scorpion Stance",
    tagline: "Quick Strike",
    description: [
      "When a creature enters your Melee Range, you can make an Opportunity Attack against them with a Melee Martial Attack.",
      "When you make a Melee Martial Attack, you can spend 1 AP to deal +1 damage and force the target to make a Physical Save against your Save DC. Failure: The target is Impaired (DisADV on Physical Checks) on the next Physical Check it makes before the end of your next turn."
    ]
  },
  {
    name: "Turtle Stance",
    tagline: "Sturdy",
    description: [
      "Your Speed becomes 1 (unless it’s already lower).",
      "You gain PDR, EDR, and MDR.",
      "You have ADV on Might Saves and Saves against being moved or knocked Prone."
    ]
  },
  {
    name: "Wolf Stance",
    tagline: "Hit & Run",
    description: [
      "After you make an Attack with a Melee Martial Attack, you can immediately move up to 1 Space for free.",
      "You have ADV on Opportunity Attacks, and creatures have DisADV on Opportunity Attacks made against you."
    ]
  }
];

/** A simple alias for the main monkStances array. */
export const allMonkStances = monkStances;