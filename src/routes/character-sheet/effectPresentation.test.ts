import { describe, expect, it } from 'vitest';
import { presentCharacterEffects, resolveCharacterSize } from './effectPresentation';

const source = { type: 'trait', id: 'trait', name: 'Trait' } as const;

describe('effect presentation', () => {
	it('categorizes automated, collected, rules, and unmapped effects', () => {
		const rows = presentCharacterEffects([
			{ type: 'MODIFY_STAT', target: 'pd', value: 1, source, resolved: true },
			{ type: 'GRANT_SENSE', target: 'darkvision', value: 10, source, resolved: true },
			{ type: 'GRANT_ABILITY', target: 'special', value: 'Rule text', source, resolved: true },
			{ type: 'SET_VALUE', target: 'size', value: 'Large', source, resolved: true }
		] as any);
		expect(rows.map((row) => row.category)).toEqual(['applied', 'collected', 'rules', 'unmapped']);
	});

	it('resolves the last size effect', () => {
		expect(
			resolveCharacterSize([
				{ type: 'SET_VALUE', target: 'size', value: 'Small', source, resolved: true },
				{ type: 'SET_VALUE', target: 'size', value: 'Large', source, resolved: true }
			] as any)
		).toBe('Large');
	});
});
