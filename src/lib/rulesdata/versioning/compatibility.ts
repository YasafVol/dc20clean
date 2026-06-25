import type { PdfVersion } from '../../pdf/fillPdf';
import { CURRENT_SCHEMA_VERSION, normalizeSchemaVersion } from '../../types/schemaVersion';
import { resolveRulesAlias, type AliasDomain, type RulesAliasEntry } from './aliases';
import {
	CURRENT_RULES_VERSION,
	RULES_VERSION_010,
	RULES_VERSION_010_5,
	isKnownRulesVersion,
	normalizeRulesVersion,
	type RulesVersion
} from './rulesVersion';

export { CURRENT_RULES_VERSION, RULES_VERSION_010, RULES_VERSION_010_5 };
export type { RulesVersion };

export type CompatibilityState = 'editable' | 'upgrade-required' | 'view-only';
export type AutoSaveMode = 'full' | 'characterState' | 'none';

export interface CharacterCompatibilityResult {
	state: CompatibilityState;
	rulesVersion: RulesVersion;
	schemaVersion: string;
	canLoad: boolean;
	canRenderSheet: boolean;
	canEdit: boolean;
	canLevelUp: boolean;
	canAutoSave: boolean;
	autoSaveMode: AutoSaveMode;
	canExportPdf: boolean;
	pdfVersion: PdfVersion;
	reasons: string[];
	aliasDecisions: RulesAliasEntry[];
}

export interface CharacterCompatibilityOptions {
	currentRulesVersion?: RulesVersion;
}

const UPGRADE_STATE_PRIORITY: Record<CompatibilityState, number> = {
	editable: 0,
	'upgrade-required': 1,
	'view-only': 2
};

function maxCompatibilityState(
	current: CompatibilityState,
	next: CompatibilityState
): CompatibilityState {
	return UPGRADE_STATE_PRIORITY[next] > UPGRADE_STATE_PRIORITY[current] ? next : current;
}

function addStringIds(
	ids: Array<{ domain: AliasDomain; id: string }>,
	domain: AliasDomain,
	value: unknown
) {
	if (typeof value === 'string' && value.trim()) {
		ids.push({ domain, id: value });
	}
}

function collectAliasCandidateIds(character: any): Array<{ domain: AliasDomain; id: string }> {
	const ids: Array<{ domain: AliasDomain; id: string }> = [];

	for (const key of Object.keys(character?.selectedFeatureChoices ?? {})) {
		addStringIds(ids, 'featureChoice', key);
	}
	for (const value of Object.values(character?.selectedFeatureChoices ?? {})) {
		addStringIds(ids, 'feature', value);
		if (Array.isArray(value)) {
			for (const nested of value) addStringIds(ids, 'feature', nested);
		}
	}
	for (const featureId of character?.unlockedFeatureIds ?? []) {
		addStringIds(ids, 'feature', featureId);
	}

	for (const traitId of character?.selectedTraitIds ?? []) {
		addStringIds(ids, 'trait', traitId);
	}

	for (const languageId of Object.keys(character?.languagesData ?? {})) {
		addStringIds(ids, 'language', languageId);
	}

	const selectedTalents = character?.selectedTalents;
	if (Array.isArray(selectedTalents)) {
		for (const talentId of selectedTalents) addStringIds(ids, 'talent', talentId);
	} else if (selectedTalents && typeof selectedTalents === 'object') {
		for (const talentId of Object.keys(selectedTalents)) addStringIds(ids, 'talent', talentId);
	}

	for (const spellId of Object.values(character?.selectedSpells ?? {})) {
		addStringIds(ids, 'spell', spellId);
	}
	for (const spell of character?.spells ?? []) {
		if (typeof spell === 'string') {
			addStringIds(ids, 'spell', spell);
		} else {
			addStringIds(ids, 'spell', spell?.id);
			addStringIds(ids, 'spell', spell?.spellName);
			addStringIds(ids, 'spell', spell?.name);
		}
	}
	for (const spell of character?.characterState?.spells ?? []) {
		if (typeof spell === 'string') {
			addStringIds(ids, 'spell', spell);
		} else {
			addStringIds(ids, 'spell', spell?.id);
			addStringIds(ids, 'spell', spell?.spellName);
			addStringIds(ids, 'spell', spell?.name);
		}
	}

	for (const maneuverId of character?.selectedManeuvers ?? []) {
		addStringIds(ids, 'maneuver', maneuverId);
	}
	for (const maneuver of character?.maneuvers ?? []) {
		if (typeof maneuver === 'string') {
			addStringIds(ids, 'maneuver', maneuver);
		} else {
			addStringIds(ids, 'maneuver', maneuver?.id);
			addStringIds(ids, 'maneuver', maneuver?.name);
		}
	}
	for (const maneuver of character?.characterState?.maneuvers ?? []) {
		if (typeof maneuver === 'string') {
			addStringIds(ids, 'maneuver', maneuver);
		} else {
			addStringIds(ids, 'maneuver', maneuver?.id);
			addStringIds(ids, 'maneuver', maneuver?.name);
		}
	}

	if (typeof character?.selectedMulticlassOption === 'string') {
		addStringIds(ids, 'talent', `multiclass_${character.selectedMulticlassOption}`);
	}
	addStringIds(ids, 'feature', character?.selectedMulticlassFeature);

	return ids;
}

export function getPdfVersionForRulesVersion(_rulesVersion: RulesVersion): PdfVersion {
	// v0.10.5 does not have a checked-in fillable template yet, so it intentionally
	// routes to the v0.10 template until that asset and field map exist.
	return '0.10';
}

export function getPdfVersionForCharacter(character: { rulesVersion?: unknown }): PdfVersion {
	return getPdfVersionForRulesVersion(normalizeRulesVersion(character?.rulesVersion));
}

export function assessCharacterCompatibility(
	character: any,
	options?: CharacterCompatibilityOptions
): CharacterCompatibilityResult {
	const currentRulesVersion = options?.currentRulesVersion ?? CURRENT_RULES_VERSION;
	const rulesVersion = normalizeRulesVersion(character?.rulesVersion);
	const schemaVersion = normalizeSchemaVersion(character?.schemaVersion ?? CURRENT_SCHEMA_VERSION);
	const reasons: string[] = [];
	const aliasDecisions: RulesAliasEntry[] = [];
	let state: CompatibilityState = 'editable';

	if (!isKnownRulesVersion(rulesVersion)) {
		state = 'view-only';
		reasons.push(`Unsupported rules version: ${String(rulesVersion)}`);
	} else if (rulesVersion !== currentRulesVersion) {
		state = 'upgrade-required';
		reasons.push(
			`Character uses ${rulesVersion}; current editable rules are ${currentRulesVersion}.`
		);
	}

	if (rulesVersion !== currentRulesVersion) {
		for (const candidate of collectAliasCandidateIds(character)) {
			const alias = resolveRulesAlias(candidate.domain, candidate.id, {
				fromRulesVersion: rulesVersion,
				toRulesVersion: currentRulesVersion
			});

			if (!alias) continue;
			aliasDecisions.push(alias);
			state = maxCompatibilityState(state, alias.compatibilityState);
			if (alias.compatibilityState !== 'editable') {
				reasons.push(`${alias.domain}:${alias.fromId} requires ${alias.compatibilityState}.`);
			}
		}
	}

	const pdfVersion = getPdfVersionForRulesVersion(rulesVersion);

	if (state === 'editable') {
		return {
			state,
			rulesVersion,
			schemaVersion,
			canLoad: true,
			canRenderSheet: true,
			canEdit: true,
			canLevelUp: true,
			canAutoSave: true,
			autoSaveMode: 'full',
			canExportPdf: true,
			pdfVersion,
			reasons,
			aliasDecisions
		};
	}

	if (state === 'upgrade-required') {
		return {
			state,
			rulesVersion,
			schemaVersion,
			canLoad: true,
			canRenderSheet: true,
			canEdit: false,
			canLevelUp: false,
			canAutoSave: false,
			autoSaveMode: 'none',
			canExportPdf: true,
			pdfVersion,
			reasons,
			aliasDecisions
		};
	}

	return {
		state,
		rulesVersion,
		schemaVersion,
		canLoad: true,
		canRenderSheet: true,
		canEdit: false,
		canLevelUp: false,
		canAutoSave: false,
		autoSaveMode: 'none',
		canExportPdf: true,
		pdfVersion,
		reasons,
		aliasDecisions
	};
}

export function getCharacterAutoSaveMode(
	character: any,
	options?: CharacterCompatibilityOptions
): AutoSaveMode {
	return assessCharacterCompatibility(character, options).autoSaveMode;
}
