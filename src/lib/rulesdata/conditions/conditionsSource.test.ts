import { describe, expect, it } from 'vitest';
import conditionReport from '../../../../docs/migration/conditions-v0105-report.json';
import {
	ALL_CONDITIONS,
	EFFECT_SPECIFIC_AFFLICTIONS,
	getConditionDefinition,
	resolveConditionDefinition
} from './conditions.data';

const byId = <T extends { id: string }>(left: T, right: T) => left.id.localeCompare(right.id);

describe('DC20 v0.10.5 condition source audit', () => {
	it('matches the generated universal condition catalog', () => {
		expect(ALL_CONDITIONS).toHaveLength(conditionReport.conditionCount);
		expect(new Set(ALL_CONDITIONS.map((condition) => condition.id)).size).toBe(
			ALL_CONDITIONS.length
		);

		expect(ALL_CONDITIONS.map(({ id, name }) => ({ id, name })).sort(byId)).toEqual(
			conditionReport.conditions.map(({ id, name }) => ({ id, name })).sort(byId)
		);
	});

	it('keeps source rule sections as metadata tags on the flat catalog', () => {
		expect(
			ALL_CONDITIONS.map(({ id, sourceTags }) => ({
				id,
				sourceTags
			})).sort(byId)
		).toEqual(
			conditionReport.conditions
				.map(({ id, sourceTags }) => ({
					id,
					sourceTags
				}))
				.sort(byId)
		);
	});

	it('models stack controls separately from source metadata', () => {
		expect(
			ALL_CONDITIONS.map(({ id, usesStacks }) => ({
				id,
				usesStacks
			})).sort(byId)
		).toEqual(
			conditionReport.conditions
				.map(({ id, name }) => ({
					id,
					usesStacks: name.endsWith(' X')
				}))
				.sort(byId)
		);
	});

	it('keeps catalog-only source metadata explicit for Intimidated', () => {
		expect(
			conditionReport.conditions.find((condition) => condition.id === 'intimidated')
		).toMatchObject({
			id: 'intimidated',
			sourceTags: ['catalog-only']
		});
		expect(getConditionDefinition('intimidated')).toMatchObject({
			id: 'intimidated',
			usesStacks: false
		});
		expect(conditionReport.findings).toContainEqual(
			expect.objectContaining({
				id: 'intimidated-catalog-only',
				severity: 'source-note'
			})
		);
	});

	it('keeps Poisoned out of the universal condition catalog', () => {
		expect(ALL_CONDITIONS.map((condition) => condition.id)).not.toContain('poisoned');
		expect(conditionReport.conditions.map((condition) => condition.id)).not.toContain('poisoned');
		expect(conditionReport.effectSpecificAfflictions).toContainEqual(
			expect.objectContaining({ id: 'poisoned' })
		);
		expect(EFFECT_SPECIFIC_AFFLICTIONS).toContainEqual(
			expect.objectContaining({
				id: 'poisoned',
				scope: 'effect-specific'
			})
		);
	});

	it('normalizes concrete stacking IDs to source catalog entries', () => {
		expect(resolveConditionDefinition('slowed-2')).toMatchObject({
			inputId: 'slowed-2',
			normalizedId: 'slowed-x',
			stackValue: 2
		});
		expect(resolveConditionDefinition('burning-3')).toMatchObject({
			inputId: 'burning-3',
			normalizedId: 'burning-x',
			stackValue: 3
		});
	});
});
