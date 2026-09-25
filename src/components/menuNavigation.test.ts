import { describe, expect, it } from 'vitest';
import { getMenuNavigationGroups, getMenuSectionVisibility } from './menuNavigation';

describe('menuNavigation', () => {
	it('matches the homepage visibility gates', () => {
		expect(getMenuSectionVisibility({ isAuthenticated: false, isConvexEnabled: true })).toEqual({
			dmTools: false,
			campaigns: false
		});
		expect(getMenuSectionVisibility({ isAuthenticated: true, isConvexEnabled: false })).toEqual({
			dmTools: true,
			campaigns: false
		});
		expect(getMenuSectionVisibility({ isAuthenticated: true, isConvexEnabled: true })).toEqual({
			dmTools: true,
			campaigns: true
		});
	});

	it('includes every homepage action for an authenticated Convex user', () => {
		const actionIds = getMenuNavigationGroups({
			isAuthenticated: true,
			isConvexEnabled: true
		}).flatMap((group) => group.actions.map((action) => action.id));

		expect(actionIds).toEqual([
			'whatsNew',
			'createCharacter',
			'loadCharacter',
			'encounterPlanner',
			'laboratory',
			'myCampaigns',
			'joinCampaign',
			'spellbook',
			'martialManual',
			'conditions',
			'equipage',
			'rulebook'
		]);
	});
});
