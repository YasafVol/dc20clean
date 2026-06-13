import type { SavedCharacter } from '../../types/dataContracts';
import { CURRENT_SCHEMA_VERSION, normalizeSchemaVersion } from '../../types/schemaVersion';
import { assessCharacterCompatibility } from './compatibility';
import { resolveRulesAlias, type AliasDomain, type RulesAliasEntry } from './aliases';
import { CURRENT_RULES_VERSION, RULES_VERSION_010, normalizeRulesVersion } from './rulesVersion';

export interface CharacterUpgradePlan {
	sourceRulesVersion: string;
	targetRulesVersion: string;
	canUpgrade: boolean;
	alreadyCurrent: boolean;
	automaticRenames: RulesAliasEntry[];
	reworkedSelections: RulesAliasEntry[];
	deprecatedSelections: RulesAliasEntry[];
	blockers: RulesAliasEntry[];
}

export interface CharacterUpgradeResult {
	upgradedCharacter: SavedCharacter;
	backupCharacter: SavedCharacter;
	plan: CharacterUpgradePlan;
}

interface CharacterUpgradeOptions {
	now?: Date;
}

function uniqueAliases(aliases: RulesAliasEntry[]): RulesAliasEntry[] {
	const seen = new Set<string>();
	return aliases.filter((alias) => {
		const key = `${alias.domain}:${alias.fromId}:${alias.status}:${alias.toId ?? ''}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}

export function planCharacterUpgrade(character: SavedCharacter): CharacterUpgradePlan {
	const sourceRulesVersion = normalizeRulesVersion(character.rulesVersion);
	const alreadyCurrent = sourceRulesVersion === CURRENT_RULES_VERSION;

	if (alreadyCurrent) {
		return {
			sourceRulesVersion,
			targetRulesVersion: CURRENT_RULES_VERSION,
			canUpgrade: false,
			alreadyCurrent: true,
			automaticRenames: [],
			reworkedSelections: [],
			deprecatedSelections: [],
			blockers: []
		};
	}

	const compatibility = assessCharacterCompatibility(character);
	const decisions = uniqueAliases(compatibility.aliasDecisions);
	const blockers = decisions.filter(
		(alias) => alias.status === 'ambiguous' || (alias.status !== 'deprecated' && !alias.toId)
	);

	if (sourceRulesVersion !== RULES_VERSION_010) {
		blockers.push({
			domain: 'feature',
			fromId: sourceRulesVersion,
			fromRulesVersion: sourceRulesVersion,
			toRulesVersion: CURRENT_RULES_VERSION,
			status: 'ambiguous',
			compatibilityState: 'view-only',
			note: `No automated upgrade path exists from ${sourceRulesVersion}.`
		});
	}

	return {
		sourceRulesVersion,
		targetRulesVersion: CURRENT_RULES_VERSION,
		canUpgrade: blockers.length === 0,
		alreadyCurrent: false,
		automaticRenames: decisions.filter((alias) => alias.status === 'alias'),
		reworkedSelections: decisions.filter((alias) => alias.status === 'reworked'),
		deprecatedSelections: decisions.filter((alias) => alias.status === 'deprecated'),
		blockers: uniqueAliases(blockers)
	};
}

function convertSelection(domain: AliasDomain, value: string): string | undefined {
	const alias = resolveRulesAlias(domain, value, {
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: CURRENT_RULES_VERSION
	});

	if (!alias) return value;
	if (alias.status === 'deprecated') return undefined;
	if (alias.toId) return alias.toId;
	return value;
}

function convertStringArray(domain: AliasDomain, values: unknown): string[] | undefined {
	if (!Array.isArray(values)) return undefined;
	return values
		.map((value) => (typeof value === 'string' ? convertSelection(domain, value) : undefined))
		.filter((value): value is string => Boolean(value));
}

function convertFeatureChoices(values: unknown): Record<string, unknown> {
	if (!values || typeof values !== 'object' || Array.isArray(values)) return {};

	const converted: Record<string, unknown> = {};
	for (const [key, rawValue] of Object.entries(values)) {
		const convertedKey = convertSelection('featureChoice', key);
		if (!convertedKey) continue;

		if (Array.isArray(rawValue)) {
			const convertedValues = convertStringArray('feature', rawValue) ?? [];
			if (convertedValues.length > 0) converted[convertedKey] = convertedValues;
			continue;
		}

		if (typeof rawValue === 'string') {
			const convertedValue = convertSelection('feature', rawValue);
			if (convertedValue) converted[convertedKey] = convertedValue;
			continue;
		}

		converted[convertedKey] = rawValue;
	}
	return converted;
}

function convertTalents(
	values: SavedCharacter['selectedTalents']
): SavedCharacter['selectedTalents'] {
	if (Array.isArray(values)) {
		return convertStringArray('talent', values) ?? [];
	}
	if (!values || typeof values !== 'object') return values;

	const converted: Record<string, number> = {};
	for (const [talentId, count] of Object.entries(values)) {
		const convertedId = convertSelection('talent', talentId);
		if (convertedId) converted[convertedId] = (converted[convertedId] ?? 0) + count;
	}
	return converted;
}

function convertMulticlassOption(
	value: SavedCharacter['selectedMulticlassOption']
): SavedCharacter['selectedMulticlassOption'] {
	if (typeof value !== 'string') return value;
	const convertedTalentId = convertSelection('talent', `multiclass_${value}`);
	if (!convertedTalentId) return undefined;
	return value;
}

function convertSelectionRecord(
	domain: AliasDomain,
	values: unknown
): Record<string, string> | undefined {
	if (!values || typeof values !== 'object' || Array.isArray(values)) return undefined;

	const converted: Record<string, string> = {};
	for (const [key, value] of Object.entries(values)) {
		if (typeof value !== 'string') continue;
		const convertedValue = convertSelection(domain, value);
		if (convertedValue) converted[key] = convertedValue;
	}
	return converted;
}

function convertLanguages(values: unknown): SavedCharacter['languagesData'] | undefined {
	if (!values || typeof values !== 'object' || Array.isArray(values)) return undefined;

	const converted: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(values)) {
		const convertedKey = convertSelection('language', key);
		if (!convertedKey) continue;

		const existing = converted[convertedKey];
		const existingFluency =
			existing && typeof existing === 'object' && !Array.isArray(existing)
				? (existing as Record<string, unknown>).fluency
				: undefined;
		const nextFluency =
			value && typeof value === 'object' && !Array.isArray(value)
				? (value as Record<string, unknown>).fluency
				: undefined;

		if (!existing || existingFluency !== 'fluent' || nextFluency === 'fluent') {
			converted[convertedKey] = value;
		}
	}
	return converted as SavedCharacter['languagesData'];
}

function convertDisplayEntry(domain: AliasDomain, entry: unknown): unknown {
	if (typeof entry === 'string') return convertSelection(domain, entry);
	if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return entry;

	const converted = { ...(entry as Record<string, unknown>) };
	for (const field of ['id', 'spellName', 'name']) {
		if (typeof converted[field] === 'string') {
			converted[field] = convertSelection(domain, converted[field] as string);
		}
	}
	return converted;
}

function convertDisplayArray(domain: AliasDomain, values: unknown): unknown[] | undefined {
	if (!Array.isArray(values)) return undefined;
	return values
		.map((entry) => convertDisplayEntry(domain, entry))
		.filter((entry) => entry !== undefined);
}

export function upgradeCharacterToCurrentRules(
	character: SavedCharacter,
	options: CharacterUpgradeOptions = {}
): CharacterUpgradeResult {
	const plan = planCharacterUpgrade(character);
	if (plan.alreadyCurrent) {
		throw new Error('Character already uses the current rules version.');
	}
	if (!plan.canUpgrade) {
		const blockerNames = plan.blockers.map((blocker) => blocker.fromId).join(', ');
		throw new Error(`Character has unresolved upgrade blockers: ${blockerNames}`);
	}

	const now = options.now ?? new Date();
	const timestamp = now.toISOString();
	const timestampId = now.getTime();
	const original = character as SavedCharacter & {
		selectedSpells?: Record<string, string>;
		selectedManeuvers?: string[];
	};
	const selectedMulticlassOption = convertMulticlassOption(character.selectedMulticlassOption);
	const removedMulticlassSelection =
		typeof character.selectedMulticlassOption === 'string' && !selectedMulticlassOption;

	const upgradedCharacter = {
		...character,
		rulesVersion: CURRENT_RULES_VERSION,
		schemaVersion: normalizeSchemaVersion(character.schemaVersion ?? CURRENT_SCHEMA_VERSION),
		lastModified: timestamp,
		rulesUpgradeSourceVersion: RULES_VERSION_010,
		rulesUpgradedAt: timestamp,
		rulesUpgradeBackupOf: undefined,
		selectedTraitIds: convertStringArray('trait', character.selectedTraitIds) ?? [],
		selectedFeatureChoices: convertFeatureChoices(
			character.selectedFeatureChoices
		) as SavedCharacter['selectedFeatureChoices'],
		unlockedFeatureIds: convertStringArray('feature', character.unlockedFeatureIds),
		selectedTalents: convertTalents(character.selectedTalents),
		languagesData: convertLanguages(character.languagesData) ?? character.languagesData,
		selectedMulticlassOption,
		selectedMulticlassClass: removedMulticlassSelection
			? undefined
			: character.selectedMulticlassClass,
		selectedMulticlassFeature: removedMulticlassSelection
			? undefined
			: typeof character.selectedMulticlassFeature === 'string'
				? convertSelection('feature', character.selectedMulticlassFeature)
				: character.selectedMulticlassFeature,
		selectedSpells: convertSelectionRecord('spell', original.selectedSpells),
		spells: convertDisplayArray('spell', character.spells) ?? [],
		selectedManeuvers: convertStringArray('maneuver', original.selectedManeuvers),
		maneuvers: convertDisplayArray('maneuver', character.maneuvers) ?? [],
		characterState: {
			...character.characterState,
			spells: convertDisplayArray('spell', character.characterState?.spells),
			maneuvers: convertDisplayArray('maneuver', character.characterState?.maneuvers)
		}
	} as SavedCharacter;

	const backupCharacter = {
		...character,
		id: `${character.id}__v010_backup__${timestampId}`,
		finalName: `${character.finalName} (v0.10 backup)`,
		lastModified: timestamp,
		rulesUpgradeBackupOf: character.id
	};

	return { upgradedCharacter, backupCharacter, plan };
}
