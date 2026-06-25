import { describe, expect, it } from 'vitest';
import { barbarianClass } from './barbarian_features';
import { bardClass } from './bard_features';
import { championClass } from './champion_features';
import { clericClass } from './cleric_features';
import { commanderClass } from './commander_features';
import { druidClass } from './druid_features';
import { hunterClass } from './hunter_features';
import { monkClass } from './monk_features';
import { rogueClass } from './rogue_features';
import { sorcererClass } from './sorcerer_features';
import { spellbladeClass } from './spellblade_features';
import { warlockClass } from './warlock_features';
import { wizardClass } from './wizard_features';

const expectedStartingEquipmentByClass = {
	Barbarian: {
		arsenal: 'Choose 3 of any of the following items: Weapon or Shield.',
		armor: '1 set of Armor.',
		tradeTools:
			"Choose 1 of any of the following items: Brewer's Supplies, Cooking Utensils, Leatherworker's Tools, or Sculptor's Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	Bard: {
		arsenal: 'Choose 3 of any of the following items: Spell Focus, Weapon, or Light Shield.',
		armor: '1 set of Light Armor.',
		tradeTools:
			"Choose 1 of any of the following items: Calligrapher's Supplies, Disguise Kit, Gaming Kit, Musical Instrument, or Sculptor's Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	Champion: {
		arsenal: 'Choose 3 of any of the following items: Weapon or Shield.',
		armor: '1 set of Armor.',
		tradeTools:
			"Choose 1 of any of the following items: Carpenter's Tools, Cartographer's Tools, Gaming Kit, or Mason's Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	Cleric: {
		arsenal:
			'Choose 3 of any of the following items: Spell Focus, Weapon, or Light Shield. You can also choose Heavy Shield if you choose the Peace Domain option of the Cleric Order Feature.',
		armor:
			'1 set of Light Armor. You can choose 1 set of Heavy Armor instead if you choose the Peace Domain option of the Cleric Order Feature.',
		tradeTools:
			"Choose 1 of any of the following items: Brewer's Supplies, Calligrapher's Supplies, Herbalist's Supplies, Musical Instrument, or Sculptor's Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	Commander: {
		arsenal: 'Choose 3 of any of the following items: Weapon or Shield.',
		armor: '1 set of Armor.',
		tradeTools:
			"Choose 1 of any of the following items: Cartographer's Tools, Calligrapher's, Cryptographer's Tools, or Gaming Set.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	Druid: {
		spellFocuses: '2 Spell Focuses.',
		armor: '1 set of Light Armor.',
		tradeTools:
			"Choose 2 of any of the following items: Herbalist's Supplies, Leatherworker's Tools, Sculptor's Tools, or Weaver's Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	Hunter: {
		arsenal: 'Choose 3 of any of the following items: Weapon or Light Shield.',
		armor: '1 set of Light Armor.',
		tradeTools:
			"Choose 1 of any of the following items: Disguise Kit, Herbalist's Supplies, Leatherworker's Tools, or Sculptor's Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	Monk: {
		arsenal: '2 Weapons.',
		armor: '1 set of Light Armor.',
		tradeTools:
			"Choose 2 of any of the following items: Brewer's Supplies, Calligrapher's Supplies, Cooking Utensils, or Weaver's Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	Rogue: {
		arsenal: 'Choose 3 of any of the following items: Weapon or Light Shield.',
		armor: '1 set of Light Armor.',
		tradeTools:
			"Choose 1 of any of the following items: Cryptographer's Tools, Disguise Kit, Herbalist's Supplies, or Lockpicking Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	Sorcerer: {
		spellFocuses: '2 Spell Focuses.',
		armor: '1 set of Light Armor.',
		tradeTools:
			"Choose 2 of any of the following items: Alchemist's Supplies, Calligrapher's Supplies, Jeweler's Tools, or Weaver's Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	Spellblade: {
		arsenal:
			'Choose 3 of any of the following items: Spell Focus, Weapon, or Light Shield. You can also choose Heavy Shield if you choose the Warrior Discipline option of the Spellblade Disciplines Feature.',
		armor:
			'1 set of Light Armor. You can choose 1 set of Heavy Armor instead if you choose the Warrior Discipline option of the Spellblade Disciplines Feature.',
		tradeTools:
			"Choose 1 of any of the following items: Blacksmith's Tools, Jeweler's Tools, Leatherworker's Tools, or Tinkerer's Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	Warlock: {
		spellFocuses:
			'2 Spell Focuses. You can choose Weapons if you choose the Pact Weapon option of the Pact Boon Feature.',
		armor:
			'1 set of Light Armor. You can choose 1 set of Heavy Armor instead if you choose the Pact Armor option of the Pact Boon Feature.',
		tradeTools:
			"Choose 2 of any of the following items: Alchemist's Supplies, Disguise Kit, Jeweler's Tools, or Sculptor's Tools.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	},
	Wizard: {
		spellFocuses: '2 Spell Focuses.',
		armor: '1 set of Light Armor.',
		tradeTools:
			"Choose 2 of any of the following items: Alchemist's Supplies, Calligrapher's Supplies, Glassblower's Tools, or Herbalist's Supplies.",
		packs: 'Choose 1 of the following packs: (Adventuring Packs Coming Soon).'
	}
} as const;

const implementedClasses = [
	barbarianClass,
	bardClass,
	championClass,
	clericClass,
	commanderClass,
	druidClass,
	hunterClass,
	monkClass,
	rogueClass,
	sorcererClass,
	spellbladeClass,
	warlockClass,
	wizardClass
];

describe('Class starting equipment', () => {
	it.each(implementedClasses)(
		'matches the DC20 v0.10.5 source for $className',
		(classDefinition) => {
			expect(classDefinition.startingEquipment).toEqual(
				expectedStartingEquipmentByClass[
					classDefinition.className as keyof typeof expectedStartingEquipmentByClass
				]
			);
		}
	);
});
