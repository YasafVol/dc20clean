import { describe, expect, it } from 'vitest';

import { calculateCharacterConditions } from './conditionAggregator';

function getConditionInteractions(conditionId: string) {
	const statuses = calculateCharacterConditions;
	return (input: Parameters<typeof calculateCharacterConditions>[0]) =>
		statuses(input).find((status) => status.conditionId === conditionId)?.interactions ?? [];
}

describe('conditionAggregator', () => {
	it('maps GRANT_ADV_ON_SAVE condition targets onto canonical stacking condition ids', () => {
		const slowedInteractions = getConditionInteractions('slowed-x')({
			selectedTraits: [
				{
					id: 'steady_stride',
					name: 'Steady Stride',
					effects: [{ type: 'GRANT_ADV_ON_SAVE', target: 'Slowed', value: 'ADV' }]
				}
			]
		});

		expect(slowedInteractions).toEqual([
			{
				type: 'resistance',
				source: 'Ancestry: Steady Stride',
				details: 'ADV on saves vs Slowed'
			}
		]);
	});

	it('treats Poisoned resistance authored as GRANT_RESISTANCE as a condition summary entry', () => {
		const poisonedInteractions = getConditionInteractions('poisoned')({
			classFeatures: [
				{
					id: 'marsh_strider',
					featureName: 'Favored Terrain: Swamp',
					effects: [{ type: 'GRANT_RESISTANCE', target: 'Poisoned', value: true }]
				}
			]
		});
		expect(poisonedInteractions).toEqual([
			{
				type: 'resistance',
				source: 'Class: Favored Terrain: Swamp',
				details: 'Resistance'
			}
		]);
	});

	it('keeps benefit, selected choice, subclass, and talent sources in condition summaries', () => {
		const statuses = calculateCharacterConditions({
			classFeatures: [
				{
					id: 'fighting_spirit_fortify',
					featureName: 'Fighting Spirit: Fortify',
					effects: [{ type: 'GRANT_ADV_ON_SAVE', target: 'Poisoned', value: true }]
				},
				{
					id: 'channel_divinity_radiant',
					featureName: 'Channel Divinity: Radiant Ward',
					effects: [{ type: 'GRANT_CONDITION_IMMUNITY', target: 'Burning 2' }]
				}
			],
			subclassFeatures: [
				{
					id: 'fey_aspect_charmed',
					featureName: 'Fey Aspect: Charmed',
					effects: [{ type: 'GRANT_CONDITION_RESISTANCE', target: 'Charmed', value: 'advantage' }]
				}
			],
			selectedTalents: [
				{
					id: 'unyielding_mind',
					name: 'Unyielding Mind',
					effects: [{ type: 'GRANT_CONDITION_IMMUNITY', target: 'Terrified' }]
				}
			]
		});
		expect(statuses.find((status) => status.conditionId === 'poisoned')?.interactions).toEqual([
			{
				type: 'resistance',
				source: 'Class: Fighting Spirit: Fortify',
				details: 'ADV on saves vs Poisoned'
			}
		]);

		expect(statuses.find((status) => status.conditionId === 'burning-x')?.interactions).toEqual([
			{
				type: 'immunity',
				source: 'Class: Channel Divinity: Radiant Ward'
			}
		]);

		expect(statuses.find((status) => status.conditionId === 'charmed')?.interactions).toEqual([
			{
				type: 'resistance',
				source: 'Subclass: Fey Aspect: Charmed',
				details: 'advantage'
			}
		]);

		expect(statuses.find((status) => status.conditionId === 'terrified')?.interactions).toEqual([
			{
				type: 'immunity',
				source: 'Talent: Unyielding Mind'
			}
		]);
	});
});
