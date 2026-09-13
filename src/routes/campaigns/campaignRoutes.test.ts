import { describe, expect, it } from 'vitest';
import { buildCampaignCharacterViewPath } from './campaignRoutes';

describe('buildCampaignCharacterViewPath', () => {
	it('includes the exact connected character record identity', () => {
		expect(buildCampaignCharacterViewPath('campaign-1', 'shared-app-id', 'record/second')).toBe(
			'/campaigns/campaign-1/character/shared-app-id?record=record%2Fsecond'
		);
	});
});
