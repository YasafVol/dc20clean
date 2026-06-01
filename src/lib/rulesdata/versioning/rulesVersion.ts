export const RULES_VERSION_010 = 'dc20-0.10' as const;
export const RULES_VERSION_010_5 = 'dc20-0.10.5' as const;

export const CURRENT_RULES_VERSION = RULES_VERSION_010;

export const KNOWN_RULES_VERSIONS = [RULES_VERSION_010, RULES_VERSION_010_5] as const;

export type KnownRulesVersion = (typeof KNOWN_RULES_VERSIONS)[number];
export type RulesVersion = KnownRulesVersion | (string & {});

export function normalizeRulesVersion(version: unknown): RulesVersion {
	if (typeof version !== 'string' || version.trim() === '') {
		return RULES_VERSION_010;
	}

	const trimmed = version.trim();
	if (trimmed === '0.10' || trimmed === 'v0.10') return RULES_VERSION_010;
	if (trimmed === '0.10.5' || trimmed === 'v0.10.5') return RULES_VERSION_010_5;
	return trimmed as RulesVersion;
}

export function isKnownRulesVersion(version: unknown): version is KnownRulesVersion {
	return typeof version === 'string' && KNOWN_RULES_VERSIONS.includes(version as KnownRulesVersion);
}
