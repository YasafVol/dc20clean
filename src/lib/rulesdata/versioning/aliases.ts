import type { CompatibilityState } from './compatibility';
import { RULES_VERSION_010, RULES_VERSION_010_5, type RulesVersion } from './rulesVersion';

export type AliasDomain =
	| 'feature'
	| 'featureChoice'
	| 'spell'
	| 'maneuver'
	| 'trait'
	| 'talent'
	| 'language'
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
		domain: 'language',
		fromId: 'primordial',
		toId: 'elemental',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Primordial is named Elemental in the v0.10.5 language catalog.'
	},
	{
		domain: 'language',
		fromId: 'abyssal',
		toId: 'fiendish',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'reworked',
		compatibilityState: 'upgrade-required',
		note: 'Abyssal and Infernal are consolidated into Fiendish in v0.10.5.'
	},
	{
		domain: 'language',
		fromId: 'infernal',
		toId: 'fiendish',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'reworked',
		compatibilityState: 'upgrade-required',
		note: 'Abyssal and Infernal are consolidated into Fiendish in v0.10.5.'
	},
	{
		domain: 'language',
		fromId: 'goblin',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'deprecated',
		compatibilityState: 'upgrade-required',
		note: 'Goblin is not present in the v0.10.5 selectable language catalog.'
	},
	{
		domain: 'language',
		fromId: 'undercommon',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'deprecated',
		compatibilityState: 'upgrade-required',
		note: 'Undercommon is not present in the v0.10.5 selectable language catalog.'
	},
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
		domain: 'talent',
		fromId: 'barbarian_swift_berserker',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'deprecated',
		compatibilityState: 'upgrade-required',
		note: 'Swift Berserker was removed from the v0.10.5 selectable catalog; old saved characters remain loadable.'
	},
	{
		domain: 'feature',
		fromId: 'combat_readiness_brace',
		toId: 'combat_readiness_fortify',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Champion Fighting Spirit option rename; this is not the Brace maneuver.'
	},
	{
		domain: 'feature',
		fromId: 'Brace',
		toId: 'Fortify',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Display-name form of the Champion Fighting Spirit option rename.'
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
		fromId: 'Fly',
		toId: 'Blessing of Air',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Display-name alias for saved spell arrays.'
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
		fromId: 'Vicious Mockery',
		toId: 'Mockery',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Display-name alias for saved spell arrays.'
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
		fromId: 'Toxic Aura',
		toId: 'Toxic Burst',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Display-name alias for saved spell arrays.'
	},
	{
		domain: 'spell',
		fromId: 'close-wound',
		toId: 'close-wounds',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Singular-to-plural spell rename.'
	},
	{
		domain: 'spell',
		fromId: 'Close Wound',
		toId: 'Close Wounds',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Display-name alias for saved spell arrays.'
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
		fromId: 'Earth Blessing',
		toId: 'Blessing of Earth',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Display-name alias for saved spell arrays.'
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
		fromId: 'gravity-sink-hole',
		toId: 'gravity-well',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'reworked',
		compatibilityState: 'upgrade-required',
		note: 'Current repo legacy ID form for Gravity Sink Hole.'
	},
	{
		domain: 'spell',
		fromId: 'Gravity Sink Hole',
		toId: 'Gravity Well',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'reworked',
		compatibilityState: 'upgrade-required',
		note: 'Display-name form of reworked gravity spell.'
	},
	{
		domain: 'spell',
		fromId: 'absorb-element',
		toId: 'absorb-elements',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Singular-to-plural spell rename.'
	},
	{
		domain: 'spell',
		fromId: 'Absorb Element',
		toId: 'Absorb Elements',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'alias',
		compatibilityState: 'editable',
		note: 'Display-name alias for saved spell arrays.'
	},
	{
		domain: 'spell',
		fromId: 'force-dome',
		toId: 'forcefield',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'reworked',
		compatibilityState: 'upgrade-required',
		note: 'Force Dome and Wall of Force were merged into the reworked v0.10.5 Forcefield spell.'
	},
	{
		domain: 'spell',
		fromId: 'Force Dome',
		toId: 'Forcefield',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'reworked',
		compatibilityState: 'upgrade-required',
		note: 'Display-name form of the explicit Forcefield rework.'
	},
	{
		domain: 'spell',
		fromId: 'wall-of-force',
		toId: 'forcefield',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'reworked',
		compatibilityState: 'upgrade-required',
		note: 'Force Dome and Wall of Force were merged into the reworked v0.10.5 Forcefield spell.'
	},
	{
		domain: 'spell',
		fromId: 'Wall of Force',
		toId: 'Forcefield',
		fromRulesVersion: RULES_VERSION_010,
		toRulesVersion: RULES_VERSION_010_5,
		status: 'reworked',
		compatibilityState: 'upgrade-required',
		note: 'Display-name form of the explicit Forcefield rework.'
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
