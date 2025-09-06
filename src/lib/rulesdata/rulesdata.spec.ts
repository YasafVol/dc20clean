import { describe, it, expect } from 'vitest';
import { classesDataSchema } from './schemas/class.schema';
import { classesData } from './loaders/class.loader';
import { traitsData as newTraitsData } from './ancestries/traits';
import { ancestriesData as newAncestriesData } from './ancestries/ancestries';
import { allSpells } from './spells-data/spells';
import { allManeuvers } from './martials/maneuvers';
import { allTechniques } from './martials/techniques';
import { allItems } from './inventoryItems';

describe('Rules Data Validation', () => {
	it('should load and validate all class data against the Zod schema', () => {
		expect(classesData.length).toBeGreaterThan(0);
		expect(() => classesDataSchema.parse(classesData)).not.toThrow();
	});

	it('should ensure all new trait data is structured correctly', () => {
		expect(newTraitsData.length).toBeGreaterThan(0);
		// Basic check for core properties
		newTraitsData.forEach((trait) => {
			expect(trait).toHaveProperty('id');
			expect(trait).toHaveProperty('name');
			expect(trait).toHaveProperty('cost');
			expect(trait).toHaveProperty('effects');
		});
	});

	it('should ensure all new ancestry data is structured correctly', () => {
		expect(newAncestriesData.length).toBeGreaterThan(0);
		newAncestriesData.forEach((ancestry) => {
			expect(ancestry).toHaveProperty('id');
			expect(ancestry).toHaveProperty('name');
			expect(ancestry).toHaveProperty('expandedTraitIds');
			expect(ancestry).toHaveProperty('rulesSource');
		});
	});

	it('should ensure all spells have required properties', () => {
		expect(allSpells.length).toBeGreaterThan(0);
		allSpells.forEach((spell) => {
			expect(spell).toHaveProperty('name');
			expect(spell).toHaveProperty('school');
			expect(spell).toHaveProperty('cost');
			expect(spell).toHaveProperty('effects');
		});
	});

	it('should ensure all maneuvers have required properties', () => {
		expect(allManeuvers.length).toBeGreaterThan(0);
		allManeuvers.forEach((maneuver) => {
			expect(maneuver).toHaveProperty('name');
			expect(maneuver).toHaveProperty('type');
			expect(maneuver).toHaveProperty('cost');
			expect(maneuver).toHaveProperty('description');
		});
	});

	it('should ensure all techniques have required properties', () => {
		expect(allTechniques.length).toBeGreaterThan(0);
		allTechniques.forEach((technique) => {
			expect(technique).toHaveProperty('name');
			expect(technique).toHaveProperty('cost');
			expect(technique).toHaveProperty('description');
		});
	});

	it('should ensure all inventory items have required properties', () => {
		expect(allItems.length).toBeGreaterThan(0);
		allItems.forEach((item) => {
			expect(item).toHaveProperty('itemType');
			expect(item).toHaveProperty('name');
		});
	});
});
