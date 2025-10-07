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
				{ name: 'Berserker' },
				{ name: 'Totem Warrior' },
				{ name: 'Storm Herald' }
			]
		},
		{
			classId: 'bard',
			className: 'Bard',
			classDefinition: bardClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'College of Lore' },
				{ name: 'College of Valor' },
				{ name: 'College of Whispers' }
			]
		},
		{
			classId: 'champion',
			className: 'Champion',
			classDefinition: championClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Guardian' },
				{ name: 'Slayer' },
				{ name: 'Warlord' }
			]
		},
		{
			classId: 'cleric',
			className: 'Cleric',
			classDefinition: clericClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Inquisitor' },
				{ name: 'War Priest' },
				{ name: 'Life Giver' }
			]
		},
		{
			classId: 'commander',
			className: 'Commander',
			classDefinition: commanderClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Tactician' },
				{ name: 'Warlord' },
				{ name: 'Strategist' }
			]
		},
		{
			classId: 'druid',
			className: 'Druid',
			classDefinition: druidClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Circle of the Land' },
				{ name: 'Circle of the Moon' },
				{ name: 'Circle of Wildfire' }
			]
		},
		{
			classId: 'hunter',
			className: 'Hunter',
			classDefinition: hunterClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Beast Master' },
				{ name: 'Monster Slayer' },
				{ name: 'Horizon Walker' }
			]
		},
		{
			classId: 'monk',
			className: 'Monk',
			classDefinition: monkClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Way of the Open Hand' },
				{ name: 'Way of Shadow' },
				{ name: 'Way of the Four Elements' }
			]
		},
		{
			classId: 'rogue',
			className: 'Rogue',
			classDefinition: rogueClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Assassin' },
				{ name: 'Thief' },
				{ name: 'Arcane Trickster' }
			]
		},
		{
			classId: 'sorcerer',
			className: 'Sorcerer',
			classDefinition: sorcererClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Draconic Bloodline' },
				{ name: 'Wild Magic' },
				{ name: 'Shadow Magic' }
			]
		},
		{
			classId: 'spellblade',
			className: 'Spellblade',
			classDefinition: spellbladeClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Arcane Warrior' },
				{ name: 'Eldritch Knight' },
				{ name: 'Blade Dancer' }
			]
		},
		{
			classId: 'warlock',
			className: 'Warlock',
			classDefinition: warlockClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Fiend Patron' },
				{ name: 'Archfey Patron' },
				{ name: 'Great Old One' }
			]
		},
		{
			classId: 'wizard',
			className: 'Wizard',
			classDefinition: wizardClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'School of Evocation' },
				{ name: 'School of Abjuration' },
				{ name: 'School of Illusion' }
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
					
					// Verify subclass has description
					expect(found.description).toBeDefined();
					expect(typeof found.description).toBe('string');
					expect(found.description.length).toBeGreaterThan(0);
					
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

