/**
 * Spell Schema - DC20 v0.10
 *
 * Updated schema reflecting the v0.10 spell structure:
 * - Source: Arcane, Divine, Primal (what spell lists classes learn from)
 * - School: Organizational category (Astromancy, Conjuration, etc.)
 * - Tags: Damage types and effect tags (Fire, Cold, Burning, etc.)
 */

/**
 * Spell Schools in DC20 v0.10
 * Schools are organizational categories for spells.
 */
export enum SpellSchool {
	Astromancy = 'Astromancy',
	Conjuration = 'Conjuration',
	Divination = 'Divination',
	Elemental = 'Elemental',
	Enchantment = 'Enchantment',
	Invocation = 'Invocation',
	Nullification = 'Nullification',
	Transmutation = 'Transmutation'
}

/**
 * Spell Sources in DC20 v0.10
 * Sources determine which classes can learn the spell.
 * - Arcane: Wizard, Sorcerer, Bard, Warlock
 * - Divine: Cleric, Paladin
 * - Primal: Druid, Ranger
 */
export enum SpellSource {
	Arcane = 'Arcane',
	Divine = 'Divine',
	Primal = 'Primal'
}

/**
 * Common spell tags for damage types and effects.
 * Tags help categorize spells by their mechanical effects.
 */
export type SpellTag =
	| 'Bludgeoning'
	| 'Piercing'
	| 'Slashing'
	| 'Fire'
	| 'Cold'
	| 'Lightning'
	| 'Thunder'
	| 'Sonic'
	| 'Acid'
	| 'Poison'
	| 'Psychic'
	| 'Radiant'
	| 'Necrotic'
	| 'Force'
	| 'True'
	| 'Burning'
	| 'Charmed'
	| 'Frightened'
	| 'Blinded'
	| 'Deafened'
	| 'Paralyzed'
	| 'Restrained'
	| 'Stunned'
	| 'Exhaustion'
	| 'Concentration'
	| 'Ritual'
	| 'Chaos'
	| 'Healing'
	| 'Teleportation'
	| 'Summoning'
	| 'Illusion'
	| 'Detection';

/**
 * Classes that can cast spells
 */
export enum SpellcasterClass {
	Bard = 'Bard',
	Cleric = 'Cleric',
	Druid = 'Druid',
	Sorcerer = 'Sorcerer',
	Warlock = 'Warlock',
	Wizard = 'Wizard',
	Spellblade = 'Spellblade'
}

/**
 * Cost to cast a spell
 */
export interface SpellCost {
	/** Action Points required */
	ap: number;
	/** Mana Points required (optional) */
	mp?: number;
}

/**
 * A discrete effect within a spell
 */
export interface SpellEffect {
	title: string;
	description: string;
}

/**
 * Enhancement options for a spell
 */
export interface SpellEnhancement {
	/** Resource type: AP or MP */
	type: 'AP' | 'MP';
	/** Cost in that resource */
	cost: number;
	/** Enhancement name */
	name: string;
	/** Description of what it does */
	description: string;
	/** Can be used multiple times? */
	repeatable?: boolean;
	/** Variable cost (X MP)? */
	variable?: boolean;
}

/**
 * Main Spell interface - DC20 v0.10
 */
export interface Spell {
	/** Unique identifier for the spell */
	id: string;
	/** Display name */
	name: string;
	/** Spell sources (Arcane, Divine, Primal) - determines who can learn */
	sources: SpellSource[];
	/** Spell school (organizational category) */
	school: SpellSchool;
	/** Tags for damage types and effects */
	tags?: SpellTag[];
	/** Is this a ritual? */
	isRitual?: boolean;
	/** Base cost to cast */
	cost: SpellCost;
	/** Range description */
	range: string;
	/** Duration description */
	duration: string;
	/** Whether this spell requires sustaining (maintain action each turn) */
	sustained: boolean;
	/** Spell effects */
	effects: SpellEffect[];
	/** Passive effect for the spell */
	spellPassive?: string;
	/** Enhancement options */
	enhancements: SpellEnhancement[];
	/** Components (defaults to Verbal + Somatic) */
	components?: {
		verbal?: boolean;
		somatic?: boolean;
		material?: string;
	};
	/** Full description text from rules */
	fullDescription?: string;
}

// ============================================================================
// LEGACY COMPATIBILITY - Remove after migration
// ============================================================================

/**
 * @deprecated Use SpellSource instead
 */
export enum SpellList {
	Arcane = 'Arcane',
	Primal = 'Primal',
	Divine = 'Divine'
}

/**
 * @deprecated Use SpellcasterClass instead
 */
export enum ClassName {
	Wizard = 'Wizard',
	Sorcerer = 'Sorcerer',
	Cleric = 'Cleric',
	Druid = 'Druid'
}

/**
 * @deprecated Folder structure by school replaces this
 */
export enum PremadeSpellList {
	FireAndFlames = 'Fire & Flames List',
	IceAndIllusions = 'Ice & Illusions List',
	LightningAndTeleportation = 'Lightning & Teleportation List',
	PsychicAndEnchantment = 'Psychic & Enchantment List',
	HolyAndRestoration = 'Holy & Restoration List',
	SpecialClass = 'Special Class Feature Spells',
	FiendbornAncestry = 'Fiendborn Ancestry Trait Spells',
	Additional = 'Additional Spells'
}
