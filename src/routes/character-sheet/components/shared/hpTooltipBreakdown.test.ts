import { describe, expect, it } from 'vitest';
import type { EnhancedStatBreakdown } from '../../../../lib/types/effectSystem';
import {
	createDeathThresholdTooltipBreakdown,
	createHPTooltipBreakdown
} from './hpTooltipBreakdown';

describe('createHPTooltipBreakdown', () => {
	it('splits class HP and Might while preserving dynamic attributed sources', () => {
		const calculatorBreakdown: EnhancedStatBreakdown = {
			statName: 'hpMax',
			base: 8,
			effects: [
				{
					source: { type: 'trait', id: 'tough', name: 'Tough' },
					value: 1,
					description: 'Tough: +1',
					isActive: true
				},
				{
					source: { type: 'equipment', id: 'health-ring', name: 'Ring of Health' },
					value: 1,
					description: 'Ring of Health: +1',
					isActive: true
				}
			],
			total: 10
		};

		const result = createHPTooltipBreakdown(calculatorBreakdown, -1, 1, 'Champion');

		expect(result.baseLabel).toBe('Level 1 · Champion');
		expect(result.base).toBe(9);
		expect(result.effects.map(({ name, value }) => [name, value])).toEqual([
			['Might', -1],
			['Ancestry · Tough', 1],
			['Equipment · Ring of Health', 1]
		]);
		expect(result.total).toBe(10);
	});
});

describe('createDeathThresholdTooltipBreakdown', () => {
	it('shows the displayed negative threshold as a directly summing formula', () => {
		const calculatorBreakdown: EnhancedStatBreakdown = {
			statName: 'deathThreshold',
			base: 5,
			effects: [
				{
					source: { type: 'trait', id: 'resolve', name: 'Resolve' },
					value: 1,
					description: 'Resolve: +1',
					isActive: true
				}
			],
			total: 6
		};

		const result = createDeathThresholdTooltipBreakdown(calculatorBreakdown, 3, 'Agility', 2);

		expect(result.baseLabel).toBe('Prime Attribute (Agility)');
		expect(result.base).toBe(-3);
		expect(result.effects.map(({ name, value }) => [name, value])).toEqual([
			['Combat Mastery', -2],
			['Ancestry · Resolve', -1]
		]);
		expect(result.total).toBe(-6);
	});
});
