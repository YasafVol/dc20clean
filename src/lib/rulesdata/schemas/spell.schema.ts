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
 * Spell Tags in DC20 v0.10
 *
 * Tags describe the characteristics of a spell. Some Tags represent clear in-world
 * effects (such as manipulating fire), while others exist mainly to support game
 * mechanics (such as a type of creature the Spell can target). Certain Ancestry
 * Traits, Class Features, and Talents reference specific Spell Tags, allowing
 * characters to specialize in particular types of magic.
 *
 * Categories:
 * - Physical Damage: Bludgeoning, Piercing, Slashing
 * - Elemental: Air, Cold, Corrosion, Earth, Fire, Lightning, Water
 * - Energy: Psychic, Radiant, Umbral, True (damage type)
 * - Conditions: Blinded, Burning, Charmed, Deafened, Exhaustion, Frightened,
 *               Paralyzed, Restrained, Stunned
 * - Effect Types: Ailment, Cleansing, Curse, Death, Embolden, Enfeeble, Healing,
 *                 Metamorphosis, Motion, Resurrection, Strike, Ward
 * - Thematic: Blood, Chaos, Forge, Gravity, Illusion, Knowledge, Light, Madness,
 *             Plants, Scent, Sense, Shadow, Sound, Spirit, Thoughts, Time, Trap
 * - Targeting: Communication, Creature Type (meta), Emotions, Planes, Teleportation
 * - Summoning: Summoning, Weapon
 * - Mechanical: Antimagic, Concentration, Ritual
 *
 * Legacy tags (kept for backward compatibility):
 * - Thunder → use Sound
 * - Sonic → use Sound
 * - Acid → use Corrosion
 * - Poison → use Ailment (or keep for damage type)
 * - Necrotic → use Death or Umbral
 * - Force → use True
 * - Detection → use Sense
 */
export type SpellTag =
	// Physical Damage
	| 'Bludgeoning'
	| 'Piercing'
	| 'Slashing'
	// Elemental
	| 'Air'
	| 'Cold'
	| 'Corrosion'
	| 'Earth'
	| 'Fire'
	| 'Lightning'
	| 'Water'
	// Energy
	| 'Psychic'
	| 'Radiant'
	| 'Umbral'
	| 'True'
	// Conditions (inflicted by spells)
	| 'Blinded'
	| 'Burning'
	| 'Charmed'
	| 'Deafened'
	| 'Exhaustion'
	| 'Frightened'
	| 'Paralyzed'
	| 'Restrained'
	| 'Stunned'
	// Effect Types
	| 'Ailment'
	| 'Cleansing'
	| 'Curse'
	| 'Death'
	| 'Embolden'
	| 'Enfeeble'
	| 'Healing'
	| 'Metamorphosis'
	| 'Motion'
	| 'Resurrection'
	| 'Strike'
	| 'Ward'
	// Thematic
	| 'Blood'
	| 'Chaos'
	| 'Forge'
	| 'Gravity'
	| 'Illusion'
	| 'Knowledge'
	| 'Light'
	| 'Madness'
	| 'Plants'
	| 'Scent'
	| 'Sense'
	| 'Shadow'
	| 'Sound'
	| 'Spirit'
	| 'Thoughts'
	| 'Time'
	| 'Trap'
	// Targeting
	| 'Communication'
	| 'Emotions'
	| 'Planes'
	| 'Teleportation'
	// Summoning
	| 'Summoning'
	| 'Weapon'
	// Mechanical
	| 'Antimagic'
	| 'Concentration'
	| 'Ritual'
	// Legacy (backward compatibility - migrate to v0.10 equivalents)
	| 'Thunder' // → Sound
	| 'Sonic' // → Sound
	| 'Acid' // → Corrosion
	| 'Poison' // kept for damage type distinction
	| 'Necrotic' // → Death or Umbral
	| 'Force' // → True
	| 'Detection'; // → Sense

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
 * Effect resolution metadata for spells and maneuvers (v0.10)
 * Enables consistent UI rendering of different check/save patterns.
 */
export interface EffectResolution {
	/**
	 * Who makes the roll:
	 * - 'caster': Caster makes attack/spell check vs defense
	 * - 'target': Target makes saving throw
	 * - 'both': Dynamic Attack Save (caster attacks, target can save)
	 */
	rollBy?: 'caster' | 'target' | 'both';

	/** Caster's check details (when rollBy includes 'caster' or 'both') */
	casterCheck?: {
		/** Type of check made */
		kind: 'attack' | 'spell' | 'martial';
		/** What it's rolled against */
		vs: 'PD' | 'AD' | 'contest' | { fixedDC: number };
	};

	/** Target's save details (when rollBy includes 'target' or 'both') */
	targetSave?: {
		/** Attribute used for the save */
		ability: 'Might' | 'Agility' | 'Charisma' | 'Intelligence' | 'Physical' | 'Mental';
		/** What the save is against */
		vs: 'SaveDC' | { fixedDC: number };
		/** Does the target repeat the save on subsequent turns? */
		repeated?: boolean;
	};

	/**
	 * Timing of check/save for Dynamic Attack Save:
	 * - 'simultaneous': Both resolved at once
	 * - 'sequential': Attack first, then save if hit
	 */
	timing?: 'simultaneous' | 'sequential';
}

/**
 * A discrete effect within a spell
 */
export interface SpellEffect {
	title: string;
	description: string;
	/** Structured resolution metadata (optional, for UI rendering) */
	resolution?: EffectResolution;
	/** Does this effect use same roll across multiple targets? (e.g., Arcane Missiles) */
	singleRollSharedAcrossTargets?: boolean;
}

/**
 * Enhancement options for a spell
 */
export interface SpellEnhancement {
	/** Unique ID for this enhancement (for dependency tracking) */
	id?: string;
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
	/**
	 * IDs of prerequisite enhancements that must be selected first.
	 * Example: Black Hole requires Lingering enhancement.
	 */
	requires?: string[];
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
	/**
	 * Components required to cast the spell.
	 * All spells require Verbal and Somatic unless specified otherwise.
	 */
	components?: {
		/** Verbal component (magical words/incantations). Default: true */
		verbal?: boolean;
		/** Somatic component (gestures). Default: true */
		somatic?: boolean;
		/**
		 * Material component (if any).
		 * Can be a string (legacy) or structured object for inventory integration.
		 */
		material?:
			| string
			| {
					/** Description of the material */
					description: string;
					/** Item ID for inventory integration (optional) */
					itemId?: string;
					/** Is the material consumed on cast? */
					consumed?: boolean;
					/** Gold cost of the material (if consumed or valued) */
					goldCost?: number;
			  };
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
