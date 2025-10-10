import { describe, it, expect } from 'vitest';
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

/**
 * Subclass Availability Tests for All Classes
 * 
 * Purpose: Verify that each class has the expected subclasses defined at level 3.
 * This test suite ensures that the leveling UI will correctly display subclass options.
 * 
 * Test Strategy:
 * 1. Import all class feature definitions
 * 2. For each class, check that subclasses array exists and has expected entries
 * 3. Verify subclass levelGained is undefined or <= 3 (available at level 3)
 * 4. Confirm expected subclass names/IDs match actual definitions
 * 
 * Note: Expected subclass lists are based on DC20 RPG rules. Update if rules change.
 */

interface SubclassTestCase {
	classId: string;
	className: string;
	classDefinition: any;
	level: number;
	expectedSubclasses: Array<{
		id?: string;
		name: string;
		description?: string;
	}>;
}

describe('Class Subclass Availability at Level 3', () => {
	const testCases: SubclassTestCase[] = [
		{
			classId: 'barbarian',
			className: 'Barbarian',
			classDefinition: barbarianClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Elemental Fury' },
				{ name: 'Spirit Guardian' }
			]
		},
		{
			classId: 'bard',
			className: 'Bard',
			classDefinition: bardClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Eloquence' },
				{ name: 'Jester' }
			]
		},
		{
			classId: 'champion',
			className: 'Champion',
			classDefinition: championClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Hero' },
				{ name: 'Sentinel' }
			]
		},
		{
			classId: 'cleric',
			className: 'Cleric',
			classDefinition: clericClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Inquisitor' },
				{ name: 'Priest' }
			]
		},
		{
			classId: 'commander',
			className: 'Commander',
			classDefinition: commanderClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Crusader' },
				{ name: 'Warlord' }
			]
		},
		{
			classId: 'druid',
			className: 'Druid',
			classDefinition: druidClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Phoenix' },
				{ name: 'Rampant Growth' }
			]
		},
		{
			classId: 'hunter',
			className: 'Hunter',
			classDefinition: hunterClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Monster Slayer' },
				{ name: 'Trapper' }
			]
		},
		{
			classId: 'monk',
			className: 'Monk',
			classDefinition: monkClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Astral Self' },
				{ name: 'Shifting Tide' }
			]
		},
		{
			classId: 'rogue',
			className: 'Rogue',
			classDefinition: rogueClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Long Death' },
				{ name: 'Swashbuckler' }
			]
		},
		{
			classId: 'sorcerer',
			className: 'Sorcerer',
			classDefinition: sorcererClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Angelic' },
				{ name: 'Draconic' }
			]
		},
		{
			classId: 'spellblade',
			className: 'Spellblade',
			classDefinition: spellbladeClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Paladin' },
				{ name: 'Rune Knight' }
			]
		},
		{
			classId: 'warlock',
			className: 'Warlock',
			classDefinition: warlockClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Eldritch' },
				{ name: 'Fey' }
			]
		},
		{
			classId: 'wizard',
			className: 'Wizard',
			classDefinition: wizardClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Portal Mage' },
				{ name: 'Witch' }
			]
		}
	];

	testCases.forEach(({ classId, className, classDefinition, level, expectedSubclasses }) => {
		describe(`${className}`, () => {
			it(`should have subclasses array defined`, () => {
				expect(classDefinition).toBeDefined();
				expect(classDefinition.subclasses).toBeDefined();
				expect(Array.isArray(classDefinition.subclasses)).toBe(true);
			});

			it(`should have ${expectedSubclasses.length} subclasses available at level ${level}`, () => {
				const subclasses = classDefinition.subclasses || [];
				
				// Filter subclasses available at the specified level
				const availableSubclasses = subclasses.filter((sc: any) => 
					sc.levelGained === undefined || sc.levelGained <= level
				);
				
				expect(availableSubclasses.length).toBe(expectedSubclasses.length);
			});

			expectedSubclasses.forEach((expected, index) => {
				it(`should have subclass "${expected.name}"`, () => {
					const subclasses = classDefinition.subclasses || [];
					
					const found = subclasses.find((sc: any) => 
						sc.subclassName === expected.name ||
						sc.subclassName?.toLowerCase() === expected.name.toLowerCase()
					);
					
					expect(found).toBeDefined();
					expect(found.subclassName).toBe(expected.name);
					
					// Verify subclass is available at level 3 or earlier
					if (found.levelGained !== undefined) {
						expect(found.levelGained).toBeLessThanOrEqual(level);
					}
					
					// Verify subclass has description (optional - some subclasses may not have descriptions)
					if (found.description) {
						expect(typeof found.description).toBe('string');
						expect(found.description.length).toBeGreaterThan(0);
					}
					
					// Verify subclass has features array
					expect(found.features).toBeDefined();
					expect(Array.isArray(found.features)).toBe(true);
				});
			});

			it('should have unique subclass names', () => {
				const subclasses = classDefinition.subclasses || [];
				const names = subclasses.map((sc: any) => sc.subclassName);
				const uniqueNames = new Set(names);
				
				expect(uniqueNames.size).toBe(names.length);
			});

			it('all subclasses should have at least one feature', () => {
				const subclasses = classDefinition.subclasses || [];
				
				subclasses.forEach((sc: any) => {
					expect(sc.features.length).toBeGreaterThan(0);
				});
			});
		});
	});
});

