// ./spells-data/types/spell.types.ts

/**
 * @file spell.types.ts
 * @description This file contains the definitive TypeScript schemas and enumerations
 * for modeling all spells in the DC20 system.
 */

export enum SpellSchool {
	Astromancy = 'Astromancy',
	Conjuration = 'Conjuration',
	Destruction = 'Destruction',
	Divination = 'Divination',
	Enchantment = 'Enchantment',
	Illusion = 'Illusion',
	Protection = 'Protection',
	Restoration = 'Restoration',
	Transmutation = 'Transmutation',
	Abjuration = 'Abjuration'
}

export enum SpellList {
	Arcane = 'Arcane',
	Primal = 'Primal',
	Divine = 'Divine'
}

export enum ClassName {
	Wizard = 'Wizard',
	Sorcerer = 'Sorcerer',
	Cleric = 'Cleric',
	Druid = 'Druid'
}

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

export interface SpellCost {
	ap: number;
	mp?: number;
}

export interface SpellEffect {
	title: string;
	description: string;
}

export interface SpellEnhancement {
	type: 'AP' | 'MP';
	cost: number;
	name: string;
	description: string;
}

export interface Spell {
	name: string;
	premadeList: PremadeSpellList;
	school: SpellSchool;
	isCantrip: boolean;
	isRitual?: boolean;
	cost: SpellCost;
	range: string;
	duration: string;
	spellLists: SpellList[];
	availableClasses: ClassName[];
	effects: SpellEffect[];
	cantripPassive?: string;
	enhancements: SpellEnhancement[];
}
