import { describe, it, expect } from 'vitest';
import { classesDataSchema } from './schemas/class.schema';
import { classesData } from './loaders/class.loader';
import { traitsData as newTraitsData } from './ancestries/traits';
import { ancestriesData as newAncestriesData } from './ancestries/ancestries';
import { ALL_SPELLS as allSpells } from './spells-data';
import { allManeuvers } from './martials/maneuvers';
import { allItems } from './inventoryItems';
import { classFeaturesData } from './loaders/class-features.loader';
import { resolveClassProgression } from './classes-data/classProgressionResolver';

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

	it('should ensure all spells resolve with at least one content tag', () => {
		allSpells.forEach((spell) => {
			expect(spell.contentTags).toBeDefined();
			expect(spell.contentTags?.length).toBeGreaterThan(0);
		});
	});

	it('should ensure all class definitions resolve with at least one content tag', () => {
		classFeaturesData.forEach((classDefinition) => {
			expect(classDefinition.contentTags).toBeDefined();
			expect(classDefinition.contentTags?.length).toBeGreaterThan(0);
		});
	});

	it('should ensure all class features resolve with at least one content tag', () => {
		classFeaturesData.forEach((classDefinition) => {
			classDefinition.coreFeatures.forEach((feature) => {
				expect(feature.contentTags).toBeDefined();
				expect(feature.contentTags?.length).toBeGreaterThan(0);
			});
			classDefinition.subclasses.forEach((subclass) => {
				subclass.features.forEach((feature) => {
					expect(feature.contentTags).toBeDefined();
					expect(feature.contentTags?.length).toBeGreaterThan(0);
				});
			});
		});
	});

	it('should tag level 1-2 unlocked features as SRD unless explicitly MAGAZINE', () => {
		const classIds = [
			'barbarian',
			'bard',
			'champion',
			'cleric',
			'commander',
			'druid',
			'hunter',
			'monk',
			'rogue',
			'sorcerer',
			'spellblade',
			'warlock',
			'wizard'
		];

		classIds.forEach((classId) => {
			const progression = resolveClassProgression(classId, 2);
			progression.unlockedFeatures.forEach((feature) => {
				if (feature.levelGained <= 2 && !feature.contentTags?.includes('MAGAZINE')) {
					expect(feature.contentTags).toContain('SRD');
				}
			});
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

	it('should ensure all inventory items have required properties', () => {
		expect(allItems.length).toBeGreaterThan(0);
		allItems.forEach((item) => {
			expect(item).toHaveProperty('itemType');
			expect(item).toHaveProperty('name');
		});
	});
});
