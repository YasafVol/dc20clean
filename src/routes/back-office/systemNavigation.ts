export type SystemAxis = 'verticals' | 'flows' | 'horizontals';
export interface SystemGroup {
	id: string;
	title: string;
	description: string;
	documents: string[];
}

export const systemNavigation: Record<SystemAxis, SystemGroup[]> = {
	verticals: [
		{
			id: 'characters',
			title: 'Character building',
			description: 'Creation, progression, and the character sheet.',
			documents: [
				'CHARACTER_CREATION_FLOW.MD',
				'CLASS_SYSTEM.MD',
				'ANCESTRY_SYSTEM.MD',
				'TRAITS_SYSTEM.MD',
				'BACKGROUND_SYSTEM.MD',
				'LEVELING_SYSTEM.MD',
				'CHARACTER_SHEET.MD',
				'ALTERNATIVE_CHARACTER_SHEET.MD'
			]
		},
		{
			id: 'rules',
			title: 'Rules and equipment',
			description: 'The game content available to players.',
			documents: [
				'SPELLS_SYSTEM.MD',
				'MARTIALS_SYSTEM.MD',
				'EQUIPMENT_SYSTEM.MD',
				'CONDITIONS_SYSTEM.MD',
				'RULEBOOK_SYSTEM.MD'
			]
		},
		{
			id: 'dm',
			title: 'DM workspace',
			description: 'Monsters, encounters, and shared campaigns.',
			documents: ['MONSTER_SYSTEM_SPEC.MD', 'ENCOUNTER_SYSTEM_SPEC.MD', 'CAMPAIGN_SYSTEM.MD']
		}
	],
	flows: [
		{
			id: 'build-play',
			title: 'Build → save → play',
			description: 'Follow a character from creation through storage to either sheet.',
			documents: [
				'CHARACTER_CREATION_FLOW.MD',
				'CALCULATION_SYSTEM.MD',
				'DATABASE_SYSTEM.MD',
				'CHARACTER_SHEET.MD',
				'ALTERNATIVE_CHARACTER_SHEET.MD'
			]
		},
		{
			id: 'progress-export',
			title: 'Level up → upgrade → export',
			description: 'Progression, compatibility, and the PDF output boundary.',
			documents: [
				'LEVELING_SYSTEM.MD',
				'CLASS_SYSTEM.MD',
				'VERSIONING_SYSTEM.MD',
				'CALCULATION_SYSTEM.MD',
				'PDF_EXPORT_SYSTEM.MD'
			]
		},
		{
			id: 'prepare-session',
			title: 'Monster → encounter → campaign',
			description: 'Navigate the specifications used to prepare and share a session.',
			documents: [
				'MONSTER_SYSTEM_SPEC.MD',
				'ENCOUNTER_SYSTEM_SPEC.MD',
				'DATABASE_SYSTEM.MD',
				'CAMPAIGN_SYSTEM.MD'
			]
		}
	],
	horizontals: [
		{
			id: 'mechanics',
			title: 'Shared mechanics',
			description: 'Effects, calculations, and stable feature identities.',
			documents: ['EFFECT_SYSTEM.MD', 'CALCULATION_SYSTEM.MD', 'FEATURE_ID_NAMING_CONVENTION.md']
		},
		{
			id: 'data',
			title: 'Data and compatibility',
			description: 'Storage, versions, and export contracts.',
			documents: ['DATABASE_SYSTEM.MD', 'VERSIONING_SYSTEM.MD', 'PDF_EXPORT_SYSTEM.MD']
		},
		{
			id: 'platform',
			title: 'Platform and quality',
			description: 'Architecture, shared assets, tests, telemetry, privacy, and this workspace.',
			documents: [
				'PROJECT_TECHNICAL_OVERVIEW.MD',
				'ART_ASSET_SYSTEM.MD',
				'TESTING_SYSTEM.MD',
				'ANALYTICS_SYSTEM.MD',
				'ERROR_REPORTING_SYSTEM.MD',
				'PRIVACY_AND_LEGAL_SYSTEM.MD',
				'BACK_OFFICE_SYSTEM.MD'
			]
		}
	]
};

export function systemDocumentHref(id: string, hash = ''): string {
	return `/back-office/systems/${encodeURIComponent(id)}${hash}`;
}

export function systemDisplayTitle(title: string): string {
	return title.replace(/^DC20(?:Clean)?(?:\s*[-–—:]\s*|\s+)/i, '').trim() || title;
}

export function systemOrdinalLabel(ordinal: number): string {
	return String(ordinal).padStart(2, '0');
}

export function resolveSystemLink(href: string, documentIds: string[]): string | null {
	const [pathname, fragment] = href.split('#');
	const filename = pathname.split('/').pop();
	const id = documentIds.find((candidate) => candidate.toLowerCase() === filename?.toLowerCase());
	return id ? systemDocumentHref(id, fragment ? `#${fragment}` : '') : null;
}
