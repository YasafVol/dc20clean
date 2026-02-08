export type SystemsViewId =
	| 'all'
	| 'architecture'
	| 'characterCreation'
	| 'characterSheet'
	| 'dmTools'
	| 'infrastructure'
	| 'conventions';

export type SystemsCategory =
	| 'architecture'
	| 'characterCreation'
	| 'characterSheet'
	| 'dmTools'
	| 'infrastructure'
	| 'conventions';

export interface SystemDocNode {
	id: string;
	title: string;
	purpose: string;
	docPath: string;
	lastUpdated: string;
	category: SystemsCategory;
	relatedSystemIds: string[];
}

export interface SystemsView {
	id: SystemsViewId;
	label: string;
	description: string;
}

export const SYSTEMS_VIEWS: SystemsView[] = [
	{
		id: 'all',
		label: 'All Systems',
		description: 'All documented systems and their relationships.'
	},
	{
		id: 'architecture',
		label: 'Architecture & Cross-Cutting',
		description: 'Global systems that shape data flow across the app.'
	},
	{
		id: 'characterCreation',
		label: 'Character Creation',
		description: 'Wizard stages, class systems, and progression dependencies.'
	},
	{
		id: 'characterSheet',
		label: 'Character Sheet',
		description: 'Sheet rendering and data dependencies.'
	},
	{
		id: 'dmTools',
		label: 'DM Tools',
		description: 'Monster and encounter systems used in DM workflows.'
	},
	{
		id: 'infrastructure',
		label: 'Infrastructure',
		description: 'Persistence and export systems that support app features.'
	},
	{
		id: 'conventions',
		label: 'Conventions',
		description: 'Documentation and naming conventions.'
	}
];

export const SYSTEM_DOCS: SystemDocNode[] = [
	{
		id: 'project_overview',
		title: 'Project Technical Overview',
		purpose:
			'Technical overview of the DC20Clean codebase: stack, scripts, testing, project structure, and contribution expectations.',
		docPath: 'docs/systems/PROJECT_TECHNICAL_OVERVIEW.MD',
		lastUpdated: '2026-02-06',
		category: 'architecture',
		relatedSystemIds: []
	},
	{
		id: 'effect_system',
		title: 'Effect System',
		purpose:
			'Canonical catalog of Effect.type semantics, targets, choice resolution, and stacking rules used across Traits and Class Features.',
		docPath: 'docs/systems/EFFECT_SYSTEM.MD',
		lastUpdated: '2026-02-06',
		category: 'architecture',
		relatedSystemIds: ['calculation_system', 'class_system', 'traits_system']
	},
	{
		id: 'calculation_system',
		title: 'Calculation System',
		purpose:
			'Definitive guide to derived stat formulas, effect application order, mastery cap validation, and breakdown output.',
		docPath: 'docs/systems/CALCULATION_SYSTEM.MD',
		lastUpdated: '2026-02-06',
		category: 'architecture',
		relatedSystemIds: ['background_system', 'effect_system']
	},
	{
		id: 'character_creation_flow',
		title: 'Character Creation Flow',
		purpose:
			'Canonical reference for the multi-stage character creation wizard: stage ordering, state contracts, validation rules, and data flow.',
		docPath: 'docs/systems/CHARACTER_CREATION_FLOW.MD',
		lastUpdated: '2026-02-06',
		category: 'characterCreation',
		relatedSystemIds: ['leveling_system']
	},
	{
		id: 'class_system',
		title: 'Class System',
		purpose: 'Single reference for Classes, Features, Talents, and Level Progression.',
		docPath: 'docs/systems/CLASS_SYSTEM.MD',
		lastUpdated: '2026-02-06',
		category: 'characterCreation',
		relatedSystemIds: ['effect_system']
	},
	{
		id: 'ancestry_system',
		title: 'Ancestry System',
		purpose:
			'Single reference for Ancestries and Traits: data pipeline, effect typing, and selection UI.',
		docPath: 'docs/systems/ANCESTRY_SYSTEM.MD',
		lastUpdated: '2026-02-06',
		category: 'characterCreation',
		relatedSystemIds: ['traits_system', 'effect_system']
	},
	{
		id: 'background_system',
		title: 'Background System',
		purpose:
			'Single reference for Background system: Skill/Trade/Language data, point budgets, conversions, validation, and UI wiring.',
		docPath: 'docs/systems/BACKGROUND_SYSTEM.MD',
		lastUpdated: '2026-02-06',
		category: 'characterCreation',
		relatedSystemIds: ['calculation_system']
	},
	{
		id: 'leveling_system',
		title: 'Leveling System',
		purpose:
			'Canonical reference for level-based budgets and progression aggregation in character creation (DC20 v0.10, levels 1-10).',
		docPath: 'docs/systems/LEVELING_SYSTEM.MD',
		lastUpdated: '2026-02-06',
		category: 'characterCreation',
		relatedSystemIds: ['character_creation_flow', 'class_system', 'martials_system']
	},
	{
		id: 'spells_system',
		title: 'Spells System',
		purpose: 'Single reference for spell data model, assignment rules, UI flows, and validation.',
		docPath: 'docs/systems/SPELLS_SYSTEM.MD',
		lastUpdated: '2026-02-06',
		category: 'characterCreation',
		relatedSystemIds: []
	},
	{
		id: 'martials_system',
		title: 'Martials System',
		purpose:
			'Canonical reference for maneuver data, budget calculation, and creation/sheet integration.',
		docPath: 'docs/systems/MARTIALS_SYSTEM.MD',
		lastUpdated: '2026-02-06',
		category: 'characterCreation',
		relatedSystemIds: ['class_system', 'effect_system', 'leveling_system']
	},
	{
		id: 'traits_system',
		title: 'Traits System',
		purpose:
			'Single reference for Traits: data shape, effect typing, validation, runtime processing, and UI usage.',
		docPath: 'docs/systems/TRAITS_SYSTEM.MD',
		lastUpdated: '2026-02-06',
		category: 'characterCreation',
		relatedSystemIds: ['effect_system']
	},
	{
		id: 'equipment_system',
		title: 'Equipment System',
		purpose:
			'Central reference for custom equipment creation, data models, validation rules, storage, and UI flows.',
		docPath: 'docs/systems/EQUIPMENT_SYSTEM.MD',
		lastUpdated: '2026-02-06',
		category: 'characterCreation',
		relatedSystemIds: ['calculation_system', 'character_sheet', 'class_system']
	},
	{
		id: 'character_sheet',
		title: 'Character Sheet',
		purpose:
			'End-to-end map of Character Sheet UI: architecture, components, data sources, and interactions.',
		docPath: 'docs/systems/CHARACTER_SHEET.MD',
		lastUpdated: '2026-02-06',
		category: 'characterSheet',
		relatedSystemIds: [
			'background_system',
			'calculation_system',
			'martials_system',
			'spells_system'
		]
	},
	{
		id: 'monster_system',
		title: 'Monster System',
		purpose:
			'Monster designer using DC20 point-buy: statistics table, role modifiers, tier system, feature budget, and action builder.',
		docPath: 'docs/systems/MONSTER_SYSTEM_SPEC.MD',
		lastUpdated: '2026-02-06',
		category: 'dmTools',
		relatedSystemIds: ['encounter_system']
	},
	{
		id: 'encounter_system',
		title: 'Encounter System',
		purpose:
			'Encounter planner using DC20 budget formulas, difficulty scaling, monster slotting, and validation thresholds.',
		docPath: 'docs/systems/ENCOUNTER_SYSTEM_SPEC.MD',
		lastUpdated: '2026-02-06',
		category: 'dmTools',
		relatedSystemIds: ['monster_system']
	},
	{
		id: 'database_system',
		title: 'Database System',
		purpose:
			'Persistence architecture for characters and DM tools: hybrid localStorage/Convex, schema, auth, and migrations.',
		docPath: 'docs/systems/DATABASE_SYSTEM.MD',
		lastUpdated: '2026-02-06',
		category: 'infrastructure',
		relatedSystemIds: [
			'calculation_system',
			'character_sheet',
			'encounter_system',
			'monster_system',
			'pdf_export_system'
		]
	},
	{
		id: 'pdf_export_system',
		title: 'PDF Export System',
		purpose:
			'Architecture and acceptance criteria for exporting calculated character sheets to the official DC20 fillable PDF.',
		docPath: 'docs/systems/PDF_EXPORT_SYSTEM.MD',
		lastUpdated: '2026-02-06',
		category: 'infrastructure',
		relatedSystemIds: ['effect_system']
	},
	{
		id: 'feature_id_convention',
		title: 'Feature ID Naming Convention',
		purpose: 'Stable naming convention for class feature IDs.',
		docPath: 'docs/systems/FEATURE_ID_NAMING_CONVENTION.md',
		lastUpdated: '2026-02-06',
		category: 'conventions',
		relatedSystemIds: ['class_system', 'effect_system']
	}
];

const CATEGORY_ORDER: SystemsCategory[] = [
	'architecture',
	'characterCreation',
	'characterSheet',
	'dmTools',
	'infrastructure',
	'conventions'
];

const VIEW_CATEGORY_MAP: Record<Exclude<SystemsViewId, 'all'>, SystemsCategory> = {
	architecture: 'architecture',
	characterCreation: 'characterCreation',
	characterSheet: 'characterSheet',
	dmTools: 'dmTools',
	infrastructure: 'infrastructure',
	conventions: 'conventions'
};

export function getSystemsForView(viewId: SystemsViewId): SystemDocNode[] {
	if (viewId === 'all') {
		return [...SYSTEM_DOCS].sort((a, b) => {
			const aCat = CATEGORY_ORDER.indexOf(a.category);
			const bCat = CATEGORY_ORDER.indexOf(b.category);

			if (aCat !== bCat) {
				return aCat - bCat;
			}

			return a.title.localeCompare(b.title);
		});
	}

	const category = VIEW_CATEGORY_MAP[viewId];
	return SYSTEM_DOCS.filter((system) => system.category === category).sort((a, b) =>
		a.title.localeCompare(b.title)
	);
}
