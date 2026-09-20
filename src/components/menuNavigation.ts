export const menuActionRoutes = {
	whatsNew: '/updates',
	createCharacter: '/create-character',
	loadCharacter: '/load-character',
	encounterPlanner: '/dm/encounters',
	laboratory: '/dm/monsters',
	myCampaigns: '/campaigns',
	joinCampaign: '/campaigns/join',
	spellbook: '/spellbook',
	martialManual: '/martial-manual',
	conditions: '/conditions',
	equipage: '/custom-equipment',
	rulebook: '/rulebook'
} as const;

export type MenuActionId = keyof typeof menuActionRoutes;

interface MenuVisibilityContext {
	isAuthenticated: boolean;
	isConvexEnabled: boolean;
}

export interface MenuSectionVisibility {
	dmTools: boolean;
	campaigns: boolean;
}

export interface MenuNavigationAction {
	id: MenuActionId;
	labelKey: string;
	href: string;
}

export interface MenuNavigationGroup {
	id: string;
	labelKey?: string;
	actions: MenuNavigationAction[];
}

export function getMenuSectionVisibility({
	isAuthenticated,
	isConvexEnabled
}: MenuVisibilityContext): MenuSectionVisibility {
	return {
		dmTools: isAuthenticated,
		campaigns: isAuthenticated && isConvexEnabled
	};
}

const action = (id: MenuActionId, labelKey: string): MenuNavigationAction => ({
	id,
	labelKey,
	href: menuActionRoutes[id]
});

export function getMenuNavigationGroups(context: MenuVisibilityContext): MenuNavigationGroup[] {
	const visibility = getMenuSectionVisibility(context);

	return [
		{
			id: 'updates',
			actions: [action('whatsNew', 'menu.whatsNew')]
		},
		{
			id: 'character',
			labelKey: 'menu.characterSection',
			actions: [
				action('createCharacter', 'menu.createCharacter'),
				action('loadCharacter', 'menu.loadCharacter')
			]
		},
		...(visibility.dmTools
			? [
					{
						id: 'dm-tools',
						labelKey: 'menu.dmToolsSection',
						actions: [
							action('encounterPlanner', 'menu.encounterPlanner'),
							action('laboratory', 'menu.laboratory')
						]
					}
				]
			: []),
		...(visibility.campaigns
			? [
					{
						id: 'campaigns',
						labelKey: 'menu.campaignsSection',
						actions: [
							action('myCampaigns', 'menu.myCampaigns'),
							action('joinCampaign', 'menu.joinCampaign')
						]
					}
				]
			: []),
		{
			id: 'reference-tools',
			labelKey: 'menu.referenceToolsSection',
			actions: [
				action('spellbook', 'menu.spellbook'),
				action('martialManual', 'menu.martialManual'),
				action('conditions', 'menu.conditions'),
				action('equipage', 'menu.equipage'),
				action('rulebook', 'menu.rulebook')
			]
		}
	];
}
