/**
 * @file cleric-domains.ts
 * @description Contains the schemas and a complete list of all Cleric Divine Domains
 * from the DC20 Beta 0.9.5 rulebook (page 128).
 *
 * General Rule for Domains:
 * From the Cleric Order feature, you gain the benefits of 2 Divine Domains of your choice.
 */

//==============================================================================
// SCHEMA / TYPE
//==============================================================================

/**
 * The definitive blueprint for a single Cleric Divine Domain object.
 */
export interface ClericDomain {
	/** The name of the domain, e.g., "Knowledge". */
	name: string;
	/** The full description of the mechanical benefits the domain provides. */
	description: string;
}

//==============================================================================
// CLERIC DOMAIN DATA
//==============================================================================

/**
 * A comprehensive list of all Cleric Divine Domains available in the game.
 */
export const clericDomains: ClericDomain[] = [
	{
		name: 'Knowledge',
		description:
			'Your Mastery Limit increases by 1 for all Knowledge Trades. A Trade can only benefit from 1 Feature that increases its Mastery Limit at a time. Additionally, you gain 2 Skill Points.'
	},
	{
		name: 'Magic',
		description:
			'Your maximum MP increases by 1. Choose a Spell Tag (such as Fire, Holy, or Undeath). You learn 1 Spell with the chosen Spell Tag, and when you learn a new Spell you can choose any Spell that also has the chosen Spell Tag. This can be chosen multiple times.'
	},
	{
		name: 'Divine Damage Expansion',
		description:
			'When you deal damage with a Spell you can convert the damage to your Divine Damage type. Additionally, you gain Resistance (1) to your Divine Damage type.'
	},
	{
		name: 'Life',
		description:
			'When you produce an MP Effect that restores HP to at least 1 creature, you can restore 1 HP to 1 creature of your choice within 1 Space of you (including yourself).'
	},
	{
		name: 'Death',
		description:
			'Enemy creatures within 10 Spaces of you take an additional 1 damage from Attacks while they’re Well-Bloodied.'
	},
	{
		name: 'Grave',
		description:
			'Allied creatures within 10 Spaces of you take 1 less damage from Attacks while they’re Well-Bloodied.'
	},
	{
		name: 'Light',
		description:
			'When you produce an MP Effect that targets at least 1 creature, you can force 1 target of your choice to make a Might or Charisma Save (their choice). Failure: Until the end of their next turn, they shed a 1 Space Aura of Bright Light and are Hindered on their next Attack.'
	},
	{
		name: 'Dark',
		description:
			'You gain 10 Space Darkvision. If you already have Darkvision it increases by 5 Spaces. While in an area of Dim Light, you can take the Hide Action to Hide from creatures that can see you. On a Success, you remain Hidden until you move or the area you’re in becomes Bright Light.'
	},
	{
		name: 'War',
		description: 'You gain Combat Training with Weapons and access to Attack Maneuvers.'
	},
	{
		name: 'Peace',
		description:
			'You gain Combat Training with Heavy Armor and Heavy Shields and learn 1 Defensive Maneuver of your choice.'
	},
	{
		name: 'Order',
		description:
			'Once per turn, when a creature you can see within 10 Spaces of you makes a Check, you can spend 1 AP as a Reaction to remove all instances of ADV and DisADV from that Check.'
	},
	{
		name: 'Chaos',
		description:
			'When you make a Spell Check you can choose to give yourself ADV on it, but you must also roll on the Wild Magic Table. You can use this Feature once per Long Rest, and regain the ability to use it again when you roll for Initiative.'
	},
	{
		name: 'Divination',
		description:
			'You can’t be Flanked. When you spend MP, you gain the ability to see Invisible creatures and objects until the start of your next turn.'
	},
	{
		name: 'Trickery',
		description:
			'When you produce an MP Effect that targets at least 1 creature, you can choose 1 of the targets and create an illusory duplicate of it that lasts until the start of your next turn. The next Attack made against the target has DisADV, and causes the illusory duplicate to disappear.'
	},
	{
		name: 'Ancestral',
		description: 'You get 2 Ancestry Points that you can spend on Traits from any Ancestry.'
	}
];

/** A simple alias for the main clericDomains array. */
export const allClericDomains = clericDomains;
