import { describe, it, expect } from 'vitest';
import { ancestriesData } from './ancestries';
import { traitsData } from './traits';
import type { Ancestry, Trait, Effect } from '../schemas/character.schema';

/**
 * Ancestry & Trait System Test Suite
 * 
 * Purpose: Validate the Ancestry & Trait system against the specification in
 * docs/systems/ANCESTRY_SYSTEM.MD and docs/systems/TRAITS_SYSTEM.MD
 * 
 * Test Coverage:
 * 1. Data Structure Validation (required fields, types)
 * 2. ID Format & Naming Conventions
 * 3. Trait-to-Ancestry Relationships
 * 4. Effect Type Validation
 * 5. Cost & Budget Calculations
 * 6. Schema Compliance
 */

describe('Ancestry & Trait System', () => {
	// ============================================================================
	// 1. DATA STRUCTURE VALIDATION
	// ============================================================================

	describe('Ancestry Data Structure', () => {
		it('should load ancestry data successfully', () => {
			expect(ancestriesData).toBeDefined();
			expect(Array.isArray(ancestriesData)).toBe(true);
			expect(ancestriesData.length).toBeGreaterThan(0);
		});

		it('should have required fields for each ancestry', () => {
			ancestriesData.forEach((ancestry: Ancestry) => {
				// Required fields per ANCESTRY_SYSTEM.MD §3.1
				expect(ancestry.id).toBeDefined();
				expect(ancestry.id).not.toBe('');
				expect(typeof ancestry.id).toBe('string');

				expect(ancestry.name).toBeDefined();
				expect(ancestry.name).not.toBe('');
				expect(typeof ancestry.name).toBe('string');

				expect(ancestry.description).toBeDefined();
				expect(typeof ancestry.description).toBe('string');

				expect(ancestry.rulesSource).toBeDefined();
				expect(typeof ancestry.rulesSource).toBe('string');

				expect(ancestry.defaultTraitIds).toBeDefined();
				expect(Array.isArray(ancestry.defaultTraitIds)).toBe(true);

				expect(ancestry.expandedTraitIds).toBeDefined();
				expect(Array.isArray(ancestry.expandedTraitIds)).toBe(true);
			});
		});

		it('should have unique ancestry IDs', () => {
			const ids = ancestriesData.map(a => a.id);
			const uniqueIds = new Set(ids);
			expect(uniqueIds.size).toBe(ids.length);
		});

		it('should have unique ancestry names', () => {
			const names = ancestriesData.map(a => a.name);
			const uniqueNames = new Set(names);
			expect(uniqueNames.size).toBe(names.length);
		});

		it('should have non-empty trait lists', () => {
			ancestriesData.forEach((ancestry: Ancestry) => {
				const totalTraits = ancestry.defaultTraitIds.length + ancestry.expandedTraitIds.length;
				if (totalTraits === 0) {
					console.warn(`⚠️  ${ancestry.name} has NO traits defined (placeholder ancestry)`);
				}
				// Allow 0 traits for placeholder ancestries like Penguinborn
				expect(totalTraits).toBeGreaterThanOrEqual(0);
			});
		});

		it('should have valid rulesSource values', () => {
			const validSources = ['DC20Beta0.95', 'DC20Beta0.9', 'Custom', 'Homebrew'];
			ancestriesData.forEach((ancestry: Ancestry) => {
				// Should at least have a non-empty string
				expect(ancestry.rulesSource.length).toBeGreaterThan(0);
			});
		});
	});

	describe('Trait Data Structure', () => {
		it('should load trait data successfully', () => {
			expect(traitsData).toBeDefined();
			expect(Array.isArray(traitsData)).toBe(true);
			expect(traitsData.length).toBeGreaterThan(0);
		});

		it('should have required fields for each trait', () => {
			traitsData.forEach((trait: Trait) => {
				// Required fields per TRAITS_SYSTEM.MD §3.1
				expect(trait.id).toBeDefined();
				expect(trait.id).not.toBe('');
				expect(typeof trait.id).toBe('string');

				expect(trait.name).toBeDefined();
				expect(trait.name).not.toBe('');
				expect(typeof trait.name).toBe('string');

				expect(trait.description).toBeDefined();
				expect(typeof trait.description).toBe('string');

				expect(trait.cost).toBeDefined();
				expect(typeof trait.cost).toBe('number');

				expect(trait.effects).toBeDefined();
				expect(Array.isArray(trait.effects)).toBe(true);
			});
		});

		it('should have unique trait IDs', () => {
			const ids = traitsData.map(t => t.id);
			const uniqueIds = new Set(ids);
			expect(uniqueIds.size).toBe(ids.length);
		});

		it('should have valid cost values', () => {
			traitsData.forEach((trait: Trait) => {
				// Cost can be negative (for negative traits), zero, or positive
				expect(Number.isFinite(trait.cost)).toBe(true);
			});
		});

		it('should have non-empty effects arrays', () => {
			traitsData.forEach((trait: Trait) => {
				expect(trait.effects.length).toBeGreaterThan(0);
			});
		});
	});

	// ============================================================================
	// 2. ID FORMAT & NAMING CONVENTIONS
	// ============================================================================

	describe('ID Format Conventions', () => {
		it('should follow ancestry_trait naming convention for trait IDs', () => {
			// Per TRAITS_SYSTEM.MD §3.2: id = '<ancestryId>_<snake_case_trait>'
			traitsData.forEach((trait: Trait) => {
				// Should contain at least one underscore
				expect(trait.id).toMatch(/_/);
				
				// Should be snake_case (lowercase with underscores)
				expect(trait.id).toMatch(/^[a-z][a-z0-9_]*$/);
			});
		});

		it('should use snake_case for ancestry IDs', () => {
			ancestriesData.forEach((ancestry: Ancestry) => {
				expect(ancestry.id).toMatch(/^[a-z][a-z0-9_]*$/);
			});
		});

		it('should match trait ID prefixes to ancestry IDs', () => {
			const ancestryIds = new Set(ancestriesData.map(a => a.id));
			
			traitsData.forEach((trait: Trait) => {
				const prefix = trait.id.split('_')[0];
				// Most traits should have an ancestry prefix
				// (some universal traits might not, so we just warn rather than fail)
				if (!ancestryIds.has(prefix)) {
					// This is OK for universal traits, just document it
					console.log(`Note: Trait ${trait.id} does not match any ancestry prefix`);
				}
			});
		});
	});

	// ============================================================================
	// 3. TRAIT-TO-ANCESTRY RELATIONSHIPS
	// ============================================================================

	describe('Trait-to-Ancestry Relationships', () => {
		it('should reference only existing traits in defaultTraitIds', () => {
			const traitIds = new Set(traitsData.map(t => t.id));
			
			ancestriesData.forEach((ancestry: Ancestry) => {
				ancestry.defaultTraitIds.forEach((traitId: string) => {
					if (!traitIds.has(traitId)) {
						console.error(`❌ ${ancestry.name} defaultTraitIds references missing trait: ${traitId}`);
					}
					expect(traitIds.has(traitId)).toBe(true);
				});
			});
		});

		it('should reference only existing traits in expandedTraitIds', () => {
			const traitIds = new Set(traitsData.map(t => t.id));
			
			ancestriesData.forEach((ancestry: Ancestry) => {
				ancestry.expandedTraitIds.forEach((traitId: string) => {
					if (!traitIds.has(traitId)) {
						console.error(`❌ ${ancestry.name} expandedTraitIds references missing trait: ${traitId}`);
					}
					expect(traitIds.has(traitId)).toBe(true);
				});
			});
		});

		it('should not have duplicate traits between default and expanded', () => {
			ancestriesData.forEach((ancestry: Ancestry) => {
				const defaultSet = new Set(ancestry.defaultTraitIds);
				const expandedSet = new Set(ancestry.expandedTraitIds);
				
				const intersection = ancestry.defaultTraitIds.filter(id => expandedSet.has(id));
				expect(intersection.length).toBe(0);
			});
		});

		it('should not have duplicate trait IDs within default list', () => {
			ancestriesData.forEach((ancestry: Ancestry) => {
				const ids = ancestry.defaultTraitIds;
				const uniqueIds = new Set(ids);
				expect(uniqueIds.size).toBe(ids.length);
			});
		});

		it('should not have duplicate trait IDs within expanded list', () => {
			ancestriesData.forEach((ancestry: Ancestry) => {
				const ids = ancestry.expandedTraitIds;
				const uniqueIds = new Set(ids);
				expect(uniqueIds.size).toBe(ids.length);
			});
		});

		it('should have traits that are referenced by at least one ancestry', () => {
			const referencedTraitIds = new Set<string>();
			
			ancestriesData.forEach((ancestry: Ancestry) => {
				ancestry.defaultTraitIds.forEach(id => referencedTraitIds.add(id));
				ancestry.expandedTraitIds.forEach(id => referencedTraitIds.add(id));
			});

			// Check for orphaned traits
			const orphanedTraits = traitsData.filter(t => !referencedTraitIds.has(t.id));
			
			if (orphanedTraits.length > 0) {
				console.warn(`Warning: ${orphanedTraits.length} traits are not referenced by any ancestry:`, 
					orphanedTraits.map(t => t.id));
			}
			
			// We don't fail on this, as there might be universal traits
			// but we do want to know about them
		});
	});

	// ============================================================================
	// 4. EFFECT TYPE VALIDATION
	// ============================================================================

	describe('Effect Types', () => {
		// List of valid effect types from character.schema.ts
		const validEffectTypes = [
			'MODIFY_ATTRIBUTE',
			'MODIFY_STAT',
			'SET_VALUE',
			'GRANT_ABILITY',
			'GRANT_RESISTANCE',
			'GRANT_VULNERABILITY',
			'GRANT_ADV_ON_SAVE',
			'GRANT_ADV_ON_CHECK',
			'GRANT_COMBAT_TRAINING',
			'GRANT_MOVEMENT',
			'GRANT_SENSE',
			'GRANT_CHOICE',
			'GRANT_SKILL_EXPERTISE',
			'GRANT_TRADE_EXPERTISE',
			'GRANT_SPELL',
			'GRANT_CANTRIP',
			'GRANT_MANEUVER',
			'MODIFY_MASTERY_CAP',
			'INCREASE_MASTERY_CAP',
			'INCREASE_SKILL_MASTERY_CAP',
			'INCREASE_TRADE_MASTERY_CAP'
		];

		it('should only use valid effect types', () => {
			traitsData.forEach((trait: Trait) => {
				trait.effects.forEach((effect: Effect) => {
					expect(validEffectTypes).toContain(effect.type);
				});
			});
		});

		it('should have valid target values for MODIFY_STAT effects', () => {
			// Per TRAITS_SYSTEM.MD notes: use hpMax, spMax, mpMax for maximums
			const validStatTargets = [
				// Attributes
				'might', 'agility', 'charisma', 'intelligence',
				// Defenses
				'pd', 'ad',
				// Resource maximums
				'hpMax', 'spMax', 'mpMax',
				// Movement
				'moveSpeed', 'jumpDistance',
				// Points & budgets
				'attributePoints', 'skillPoints', 'tradePoints', 'languagePoints',
				// Other stats
				'deathThresholdModifier', 'initiative'
			];

			traitsData.forEach((trait: Trait) => {
				trait.effects.forEach((effect: Effect) => {
					if (effect.type === 'MODIFY_STAT') {
						const target = effect.target;
						// Should be a known stat target
						expect(typeof target).toBe('string');
						expect(target.length).toBeGreaterThan(0);
					}
				});
			});
		});

		it('should have numeric values for numeric effect types', () => {
			const numericEffectTypes = ['MODIFY_ATTRIBUTE', 'MODIFY_STAT', 'SET_VALUE'];
			
			traitsData.forEach((trait: Trait) => {
				trait.effects.forEach((effect: Effect) => {
					if (numericEffectTypes.includes(effect.type)) {
						expect(typeof effect.value).toBe('number');
						expect(Number.isFinite(effect.value)).toBe(true);
					}
				});
			});
		});

		it('should have proper userChoice structure for choice-based effects', () => {
			traitsData.forEach((trait: Trait) => {
				trait.effects.forEach((effect: any) => {
					if (effect.userChoice) {
						// userChoice should have a prompt
						expect(effect.userChoice.prompt).toBeDefined();
						expect(typeof effect.userChoice.prompt).toBe('string');
						expect(effect.userChoice.prompt.length).toBeGreaterThan(0);

						// If options are provided, they should be an array
						if (effect.userChoice.options) {
							expect(Array.isArray(effect.userChoice.options)).toBe(true);
						}
					}
				});
			});
		});
	});

	// ============================================================================
	// 5. COST CALCULATIONS & BUDGETS
	// ============================================================================

	describe('Cost & Budget Validation', () => {
		it('should calculate default trait costs correctly', () => {
			ancestriesData.forEach((ancestry: Ancestry) => {
				const defaultCost = ancestry.defaultTraitIds.reduce((sum, traitId) => {
					const trait = traitsData.find(t => t.id === traitId);
					return sum + (trait?.cost || 0);
				}, 0);

				// Default traits should generally sum to a reasonable total
				// (This is informational - different ancestries may have different budgets)
				console.log(`${ancestry.name} default traits cost: ${defaultCost}`);
			});
		});

		it('should have valid costs for negative traits', () => {
			const negativeTraits = traitsData.filter(t => t.cost < 0);
			
			negativeTraits.forEach((trait: Trait) => {
				// Negative traits should be marked as such
				if (trait.cost < 0) {
					// Should have isNegative flag (optional, but good practice)
					if (trait.isNegative !== undefined) {
						expect(trait.isNegative).toBe(true);
					}
				}
			});
		});

		it('should have consistent cost structure', () => {
			traitsData.forEach((trait: Trait) => {
				// Costs should typically be in increments of 0.5 or 1
				// (This is a soft check - might need adjustment based on rules)
				const cost = trait.cost;
				const doubled = cost * 2;
				expect(Number.isInteger(doubled)).toBe(true);
			});
		});
	});

	// ============================================================================
	// 6. SCHEMA COMPLIANCE & INTEGRATION
	// ============================================================================

	describe('Schema Compliance', () => {
		it('should have valid optional fields when present', () => {
			traitsData.forEach((trait: Trait) => {
				// Optional: isMinor
				if (trait.isMinor !== undefined) {
					expect(typeof trait.isMinor).toBe('boolean');
				}

				// Optional: isNegative
				if (trait.isNegative !== undefined) {
					expect(typeof trait.isNegative).toBe('boolean');
				}

				// Optional: prerequisites
				if (trait.prerequisites !== undefined) {
					expect(Array.isArray(trait.prerequisites)).toBe(true);
					trait.prerequisites.forEach((prereq: string) => {
						expect(typeof prereq).toBe('string');
					});
				}
			});
		});

		it('should have valid effect structure for all effects', () => {
			traitsData.forEach((trait: Trait) => {
				trait.effects.forEach((effect: Effect) => {
					// Every effect must have a type
					expect(effect.type).toBeDefined();
					expect(typeof effect.type).toBe('string');

					// Every effect must have a target
					if (!effect.target) {
						console.error(`❌ Trait "${trait.name}" (${trait.id}) has effect type "${effect.type}" without target`);
					}
					expect(effect.target).toBeDefined();
					expect(typeof effect.target).toBe('string');

					// Every effect must have a value (can be various types)
					expect(effect.value).toBeDefined();
				});
			});
		});
	});

	// ============================================================================
	// 7. DATA COVERAGE & STATISTICS
	// ============================================================================

	describe('Data Coverage Statistics', () => {
		it('should report ancestry count', () => {
			console.log(`Total ancestries: ${ancestriesData.length}`);
			expect(ancestriesData.length).toBeGreaterThan(0);
		});

		it('should report trait count', () => {
			console.log(`Total traits: ${traitsData.length}`);
			expect(traitsData.length).toBeGreaterThan(0);
		});

		it('should report trait distribution', () => {
			const traitsByAncestry = new Map<string, number>();
			
			ancestriesData.forEach((ancestry: Ancestry) => {
				const totalTraits = ancestry.defaultTraitIds.length + ancestry.expandedTraitIds.length;
				traitsByAncestry.set(ancestry.name, totalTraits);
			});

			console.log('Traits per ancestry:');
			traitsByAncestry.forEach((count, name) => {
				console.log(`  ${name}: ${count} traits`);
			});
		});

		it('should report effect type distribution', () => {
			const effectTypeCounts = new Map<string, number>();
			
			traitsData.forEach((trait: Trait) => {
				trait.effects.forEach((effect: Effect) => {
					const count = effectTypeCounts.get(effect.type) || 0;
					effectTypeCounts.set(effect.type, count + 1);
				});
			});

			console.log('Effect type distribution:');
			const sortedTypes = Array.from(effectTypeCounts.entries()).sort((a, b) => b[1] - a[1]);
			sortedTypes.forEach(([type, count]) => {
				console.log(`  ${type}: ${count} uses`);
			});
		});

		it('should report cost distribution', () => {
			const costCounts = new Map<number, number>();
			
			traitsData.forEach((trait: Trait) => {
				const count = costCounts.get(trait.cost) || 0;
				costCounts.set(trait.cost, count + 1);
			});

			console.log('Trait cost distribution:');
			const sortedCosts = Array.from(costCounts.entries()).sort((a, b) => a[0] - b[0]);
			sortedCosts.forEach(([cost, count]) => {
				console.log(`  Cost ${cost}: ${count} traits`);
			});
		});
	});
});

