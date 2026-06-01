import type { CompatibilityState } from './compatibility';
import { RULES_VERSION_010, RULES_VERSION_010_5, type RulesVersion } from './rulesVersion';

export type AliasDomain =
	| 'feature'
	| 'featureChoice'
	| 'spell'
	| 'maneuver'
	| 'trait'
	| 'talent'
	| 'equipment';

export type AliasStatus = 'alias' | 'deprecated' | 'ambiguous' | 'reworked';

export interface RulesAliasEntry {
	domain: AliasDomain;
	fromId: string;
	toId?: string;
	fromRulesVersion: RulesVersion;
	toRulesVersion: RulesVersion;
	status: AliasStatus;
	compatibilityState: CompatibilityState;
	note: string;
}

export const RULES_ALIASES: RulesAliasEntry[] = [
	{
		domain: 'talent',
		fromId: 'multiclass_grandmaster',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'deprecated',
		compatibilityState: 'upgrade-required',
		note: 'Removed from the selectable v0.10.5 catalog; historical selections remain loadable.'
	},
	{
		domain: 'talent',
		fromId: 'multiclass_legendary',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'deprecated',
		compatibilityState: 'upgrade-required',
		note: 'Removed from the selectable v0.10.5 catalog; historical selections remain loadable.'
	},
	{
		domain: 'feature',
		fromId: 'swift_berserker',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'deprecated',
		compatibilityState: 'upgrade-required',
		note: 'Removed in v0.10.5; old saved characters should not silently drop it.'
	},
	{
		domain: 'maneuver',
		fromId: 'Brace',
		toId: 'Fortify',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'ambiguous',
		compatibilityState: 'view-only',
		note: 'Name-sensitive persistence needs HITL classification before this can be a safe alias.'
	},
	{
		domain: 'spell',
		fromId: 'summon-familiar',
		toId: 'call-familiar',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Candidate true rename; saved IDs should remain unchanged until explicit upgrade.'
	},
	{
		domain: 'spell',
		fromId: 'Summon Familiar',
		toId: 'Call Familiar',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Display-name alias for saved spell arrays.'
	},
	{
		domain: 'spell',
		fromId: 'fly',
		toId: 'blessing-of-air',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Candidate true rename pending final source verification.'
	},
	{
		domain: 'spell',
		fromId: 'vicious-mockery',
		toId: 'mockery',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Candidate true rename.'
	},
	{
		domain: 'spell',
		fromId: 'toxic-aura',
		toId: 'toxic-burst',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Candidate true rename pending final source verification.'
	},
	{
		domain: 'spell',
		fromId: 'earth-blessing',
		toId: 'blessing-of-earth',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Candidate true rename.'
	},
	{
		domain: 'spell',
		fromId: 'gravity-sinkhole',
		toId: 'gravity-well',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'reworked',
		compatibilityState: 'upgrade-required',
		note: 'Rework implied; do not silently reinterpret old selections.'
	},
	{
		domain: 'spell',
		fromId: 'force-dome',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'ambiguous',
		compatibilityState: 'view-only',
		note: 'Ambiguous Forcefield target; HITL decision required.'
	},
	{
		domain: 'spell',
		fromId: 'Force Dome',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'ambiguous',
		compatibilityState: 'view-only',
		note: 'Display-name form of ambiguous Forcefield target.'
	},
	{
		domain: 'spell',
		fromId: 'wall-of-force',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'ambiguous',
		compatibilityState: 'view-only',
		note: 'Ambiguous Forcefield target; HITL decision required.'
	},
	{
		domain: 'spell',
		fromId: 'Wall of Force',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'ambiguous',
		compatibilityState: 'view-only',
		note: 'Display-name form of ambiguous Forcefield target.'
	}
];

export function resolveRulesAlias(
	domain: AliasDomain,
	id: string,
	options?: {
		fromRulesVersion?: RulesVersion;
		toRulesVersion?: RulesVersion;
	}
): RulesAliasEntry | undefined {
	const fromRulesVersion = options?.fromRulesVersion ?? RULES_VERSION_010;
	const toRulesVersion = options?.toRulesVersion ?? RULES_VERSION_010_5;

	return RULES_ALIASES.find(
		(entry) =>
			entry.domain === domain &&
			entry.fromId === id &&
			entry.fromRulesVersion === fromRulesVersion &&
			entry.toRulesVersion === toRulesVersion
	);
}

export function resolveAliasId(
	domain: AliasDomain,
	id: string,
	options?: {
		fromRulesVersion?: RulesVersion;
		toRulesVersion?: RulesVersion;
	}
): string {
	const alias = resolveRulesAlias(domain, id, options);
	return alias?.status === 'alias' && alias.toId ? alias.toId : id;
}
