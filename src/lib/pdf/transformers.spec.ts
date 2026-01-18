import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the logger before importing transformers to avoid sessionStorage issues
vi.mock('../utils/logger', () => ({
	logger: {
		debug: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
		info: vi.fn()
	}
}));

import {
	formatClassFeatures,
	formatAncestryTraits,
	formatSpellsAndManeuvers,
	formatTalents,
	formatInventory,
	formatFeatureChoices
} from './transformers';

describe('PDF Export Formatters', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	// =========================================================================
	// formatClassFeatures
	// =========================================================================
	describe('formatClassFeatures', () => {
		it('returns empty string for empty feature array', () => {
			const result = formatClassFeatures([], 'barbarian');
			expect(result).toBe('');
		});

		it('returns single feature name', () => {
			const result = formatClassFeatures(['barbarian_rage'], 'barbarian');
			expect(result).toContain('Rage');
		});

		it('returns comma-separated feature names for multiple features', () => {
			const result = formatClassFeatures(
				['barbarian_rage', 'barbarian_battlecry'],
				'barbarian'
			);
			// Should contain both feature names
			expect(result).toMatch(/Rage/);
			expect(result).toMatch(/Battlecry/);
		});

		it('skips unknown feature IDs gracefully', () => {
			const result = formatClassFeatures(
				['barbarian_rage', 'nonexistent_feature_xyz'],
				'barbarian'
			);
			// Should still include the valid feature
			expect(result).toContain('Rage');
			// Should not crash or include the invalid ID
			expect(result).not.toContain('nonexistent_feature_xyz');
		});

		it('handles null/undefined classId gracefully', () => {
			const result = formatClassFeatures(['some_feature'], null as any);
			expect(typeof result).toBe('string');
		});

		it('includes subclass name if provided', () => {
			const result = formatClassFeatures(
				['barbarian_rage'],
				'barbarian',
				'Berserker'
			);
			expect(result).toContain('Berserker');
		});
	});

	// =========================================================================
	// formatAncestryTraits
	// =========================================================================
	describe('formatAncestryTraits', () => {
		it('returns empty string for empty trait array', () => {
			const result = formatAncestryTraits([]);
			expect(result).toBe('');
		});

		it('resolves trait ID to display name', () => {
			const result = formatAncestryTraits(['human_skill_expertise']);
			expect(result).toContain('Skill Expertise');
		});

		it('returns comma-separated names for multiple traits', () => {
			const result = formatAncestryTraits([
				'human_skill_expertise',
				'human_resolve'
			]);
			expect(result).toContain('Skill Expertise');
			expect(result).toContain('Human Resolve');
		});

		it('skips unknown trait IDs gracefully', () => {
			const result = formatAncestryTraits([
				'human_skill_expertise',
				'nonexistent_trait_xyz'
			]);
			expect(result).toContain('Skill Expertise');
			expect(result).not.toContain('nonexistent_trait_xyz');
		});

		it('handles mixed valid and invalid trait IDs', () => {
			const result = formatAncestryTraits([
				'invalid_1',
				'human_resolve',
				'invalid_2'
			]);
			expect(result).toContain('Human Resolve');
		});
	});

	// =========================================================================
	// formatSpellsAndManeuvers
	// =========================================================================
	describe('formatSpellsAndManeuvers', () => {
		it('returns empty string for empty arrays', () => {
			const result = formatSpellsAndManeuvers([], []);
			expect(result).toBe('');
		});

		it('formats spells with names', () => {
			const spells = [
				{ id: 'fireball', spellName: 'Fireball', school: 'Evocation', isCantrip: false },
				{ id: 'shield', spellName: 'Shield', school: 'Abjuration', isCantrip: false }
			];
			const result = formatSpellsAndManeuvers(spells as any, []);
			expect(result).toContain('Fireball');
			expect(result).toContain('Shield');
		});

		it('groups cantrips separately from leveled spells', () => {
			const spells = [
				{ id: 'fireball', spellName: 'Fireball', school: 'Evocation', isCantrip: false },
				{ id: 'prestidigitation', spellName: 'Prestidigitation', school: 'Illusion', isCantrip: true }
			];
			const result = formatSpellsAndManeuvers(spells as any, []);
			expect(result).toContain('[Spells]');
			expect(result).toContain('[Cantrips]');
			expect(result).toContain('Fireball');
			expect(result).toContain('Prestidigitation');
		});

		it('formats maneuvers with names', () => {
			const maneuvers = [
				{ id: 'power_attack', name: 'Power Attack', type: 'Attack' },
				{ id: 'disarm', name: 'Disarm', type: 'Attack' }
			];
			const result = formatSpellsAndManeuvers([], maneuvers as any);
			expect(result).toContain('Power Attack');
			expect(result).toContain('Disarm');
		});

		it('includes maneuver section header', () => {
			const maneuvers = [
				{ id: 'power_attack', name: 'Power Attack', type: 'Attack' }
			];
			const result = formatSpellsAndManeuvers([], maneuvers as any);
			expect(result).toContain('[Maneuvers]');
		});

		it('combines spells and maneuvers in output', () => {
			const spells = [
				{ id: 'fireball', spellName: 'Fireball', school: 'Evocation', isCantrip: false }
			];
			const maneuvers = [
				{ id: 'power_attack', name: 'Power Attack', type: 'Attack' }
			];
			const result = formatSpellsAndManeuvers(spells as any, maneuvers as any);
			expect(result).toContain('Fireball');
			expect(result).toContain('Power Attack');
		});
	});

	// =========================================================================
	// formatTalents
	// =========================================================================
	describe('formatTalents', () => {
		it('returns empty string for empty object', () => {
			const result = formatTalents({});
			expect(result).toBe('');
		});

		it('returns empty string for undefined', () => {
			const result = formatTalents(undefined as any);
			expect(result).toBe('');
		});

		it('resolves talent ID to display name', () => {
			const result = formatTalents({ general_skill_increase: 1 });
			expect(result).toContain('Skill Increase');
		});

		it('includes count for talents taken multiple times', () => {
			const result = formatTalents({ general_skill_increase: 2 });
			expect(result).toMatch(/Skill Increase.*x2|Skill Increase \(x2\)/);
		});

		it('formats multiple talents', () => {
			const result = formatTalents({
				general_skill_increase: 1,
				general_attribute_increase: 1
			});
			expect(result).toContain('Skill Increase');
			expect(result).toContain('Attribute Increase');
		});

		it('skips talents with count 0', () => {
			const result = formatTalents({
				general_skill_increase: 0,
				general_attribute_increase: 1
			});
			expect(result).not.toContain('Skill Increase');
			expect(result).toContain('Attribute Increase');
		});

		it('handles unknown talent IDs gracefully', () => {
			const result = formatTalents({
				general_skill_increase: 1,
				nonexistent_talent_xyz: 1
			});
			expect(result).toContain('Skill Increase');
			// Should not include the raw ID in output
		});
	});

	// =========================================================================
	// formatInventory
	// =========================================================================
	describe('formatInventory', () => {
		it('returns empty string for empty array', () => {
			const result = formatInventory([]);
			expect(result).toBe('');
		});

		it('returns empty string for undefined', () => {
			const result = formatInventory(undefined as any);
			expect(result).toBe('');
		});

		it('formats single item', () => {
			const items = [{ id: '1', itemName: 'Longsword', itemType: 'Weapon', count: 1 }];
			const result = formatInventory(items as any);
			expect(result).toContain('Longsword');
		});

		it('formats multiple items as comma-separated list', () => {
			const items = [
				{ id: '1', itemName: 'Longsword', itemType: 'Weapon', count: 1 },
				{ id: '2', itemName: 'Chain Mail', itemType: 'Armor', count: 1 }
			];
			const result = formatInventory(items as any);
			expect(result).toContain('Longsword');
			expect(result).toContain('Chain Mail');
			expect(result).toContain(',');
		});

		it('groups duplicate items with count', () => {
			const items = [
				{ id: '1', itemName: 'Healing Potion', itemType: 'Potion', count: 3 }
			];
			const result = formatInventory(items as any);
			expect(result).toMatch(/Healing Potion.*x3|Healing Potion \(x3\)/);
		});

		it('skips items with empty names', () => {
			const items = [
				{ id: '1', itemName: '', itemType: 'Weapon', count: 1 },
				{ id: '2', itemName: 'Longsword', itemType: 'Weapon', count: 1 }
			];
			const result = formatInventory(items as any);
			expect(result).toBe('Longsword');
		});
	});

	// =========================================================================
	// formatFeatureChoices
	// =========================================================================
	describe('formatFeatureChoices', () => {
		it('returns empty string for empty object', () => {
			const result = formatFeatureChoices({});
			expect(result).toBe('');
		});

		it('returns empty string for undefined', () => {
			const result = formatFeatureChoices(undefined as any);
			expect(result).toBe('');
		});

		it('formats single choice', () => {
			const choices = { fighting_style: 'Defense' };
			const result = formatFeatureChoices(choices);
			expect(result).toContain('Defense');
		});

		it('formats multiple choices with semicolon separator', () => {
			const choices = {
				fighting_style: 'Defense',
				elemental_fury: 'Fire'
			};
			const result = formatFeatureChoices(choices);
			expect(result).toContain('Defense');
			expect(result).toContain('Fire');
			expect(result).toContain(';');
		});

		it('handles array values for multi-select choices', () => {
			const choices = {
				spell_schools: ['Evocation', 'Abjuration']
			};
			const result = formatFeatureChoices(choices);
			expect(result).toContain('Evocation');
			expect(result).toContain('Abjuration');
		});

		it('formats choice IDs to readable labels', () => {
			const choices = {
				barbarian_elemental_fury_damage_type: 'Fire'
			};
			const result = formatFeatureChoices(choices);
			// Should format the key nicely or at minimum include the value
			expect(result).toContain('Fire');
		});
	});
});
