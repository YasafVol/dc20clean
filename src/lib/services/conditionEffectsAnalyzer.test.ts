import { describe, expect, it } from 'vitest';
import {
	analyzeConditionEffects,
	getConditionBadgesForAttribute,
	getDiceModifierForAction
} from './conditionEffectsAnalyzer';

describe('conditionEffectsAnalyzer', () => {
	it('parses concrete stacked IDs and routes save semantics correctly', () => {
		const effects = analyzeConditionEffects([
			'disoriented-2',
			'weakened-3',
			'restrained',
			'exhaustion-2',
			'slowed-2',
			'stunned-4'
		]);

		expect(effects.mentalSaves).toEqual([
			expect.objectContaining({
				type: 'disadvantage',
				value: 2,
				tooltip: 'Disoriented 2: You have DisADV 2 on Mental Saves'
			})
		]);
		expect(effects.physicalSaves).toEqual([
			expect.objectContaining({
				type: 'disadvantage',
				value: 3,
				tooltip: 'Weakened 3: You have DisADV 3 on Physical Saves'
			})
		]);
		expect(effects.movement).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: 'immobilized',
					tooltip: "Restrained: You can't move"
				}),
				expect.objectContaining({
					type: 'speed-penalty',
					value: 2
				}),
				expect.objectContaining({
					type: 'immobilized',
					tooltip: 'Stunned 4: You’re Incapacitated and can’t move'
				})
			])
		);
		expect(effects.allChecks).toEqual([
			expect.objectContaining({
				type: 'penalty',
				value: 2
			})
		]);
		expect(effects.allSaves).toEqual([
			expect.objectContaining({
				type: 'penalty',
				value: 2
			})
		]);
	});

	it('keeps Disoriented to mental saves and Weakened to physical saves', () => {
		expect(getDiceModifierForAction(['disoriented-2'], 'mental-save')).toMatchObject({
			mode: 'disadvantage',
			stacks: 2,
			penalty: 0
		});
		expect(getDiceModifierForAction(['disoriented-2'], 'physical-save')).toMatchObject({
			mode: 'normal',
			stacks: 0,
			penalty: 0
		});

		expect(getDiceModifierForAction(['weakened-3'], 'physical-save')).toMatchObject({
			mode: 'disadvantage',
			stacks: 3,
			penalty: 0
		});
		expect(getDiceModifierForAction(['weakened-3'], 'mental-save')).toMatchObject({
			mode: 'normal',
			stacks: 0,
			penalty: 0
		});
	});

	it('treats Exhaustion as a flat penalty instead of disadvantage', () => {
		expect(getDiceModifierForAction(['exhaustion-4'], 'mental-check')).toEqual({
			mode: 'normal',
			stacks: 0,
			penalty: 4
		});
		expect(getConditionBadgesForAttribute(['exhaustion-4'], 'mental-check')).toEqual([
			expect.objectContaining({
				type: 'penalty',
				value: 4,
				tooltip: 'Exhaustion 4: Penalty of 4 on all Checks and Saves'
			})
		]);
	});

	it('does not assign universal poisoned mechanics', () => {
		const effects = analyzeConditionEffects(['poisoned']);
		expect(effects.physicalChecks).toEqual([]);
		expect(effects.allChecks).toEqual([]);
		expect(effects.allSaves).toEqual([]);
	});
});
