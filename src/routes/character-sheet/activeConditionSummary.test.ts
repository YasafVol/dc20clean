import { describe, expect, it } from 'vitest';
import { getManualActiveConditionSummaries } from './activeConditionSummary';

describe('active condition summary', () => {
	it('returns manual mechanics with concrete stack values', () => {
		expect(getManualActiveConditionSummaries(['burning-3', 'hindered-2'])).toEqual([
			expect.objectContaining({ id: 'burning-3', name: 'Burning 3' })
		]);
		expect(getManualActiveConditionSummaries(['burning-3'])[0].description).toContain(
			'3 Fire damage'
		);
	});
});
