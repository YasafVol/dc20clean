import { describe, expect, it } from 'vitest';
import {
	ALL_CONDITIONS,
	EFFECT_SPECIFIC_AFFLICTIONS,
	getConditionDefinition,
	resolveConditionDefinition
} from './conditions.data';

describe('v0.10.5 condition catalog', () => {
	it('matches the universal 0.10.5 list without Poisoned', () => {
		expect(ALL_CONDITIONS.map((condition) => condition.id)).not.toContain('poisoned');
		expect(EFFECT_SPECIFIC_AFFLICTIONS).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: 'poisoned',
					scope: 'effect-specific'
				})
			])
		);
	});

	it('removes the obsolete Deafened sonic resistance text', () => {
		expect(getConditionDefinition('deafened')?.description).not.toContain('Sonic');
		expect(getConditionDefinition('deafened')?.description).toContain('You can’t hear');
	});

	it('includes the complete Petrified rules text', () => {
		expect(getConditionDefinition('petrified')?.description).toContain(
			'unless it imposed the Petrified Condition'
		);
		expect(getConditionDefinition('petrified')?.description).toContain(
			'immune to gaining new ones'
		);
	});

	it('resolves active stacked IDs back to their catalog entries', () => {
		expect(resolveConditionDefinition('slowed-2')).toMatchObject({
			inputId: 'slowed-2',
			normalizedId: 'slowed-x',
			stackValue: 2
		});
		expect(resolveConditionDefinition('stunned-4')).toMatchObject({
			inputId: 'stunned-4',
			normalizedId: 'stunned-x',
			stackValue: 4
		});
	});

	it('can still resolve effect-specific Poisoned when explicitly requested', () => {
		expect(getConditionDefinition('poisoned')).toBeUndefined();
		expect(getConditionDefinition('poisoned', { includeEffectSpecific: true })).toMatchObject({
			id: 'poisoned',
			scope: 'effect-specific'
		});
	});
});
