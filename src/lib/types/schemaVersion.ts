/**
 * Schema Versioning System
 *
 * Semantic versioning for character data schema:
 * - Major: Breaking changes (incompatible data structure)
 * - Minor: New features (backwards compatible)
 * - Patch: Bug fixes (fully compatible)
 */

export const CURRENT_SCHEMA_VERSION = '2.2.0';

export interface SchemaVersion {
	major: number;
	minor: number;
	patch: number;
}

export function normalizeSchemaVersion(version: unknown): string {
	if (version === undefined || version === null || version === '') {
		return '2.0.0';
	}

	if (version === 2 || version === '2') {
		return CURRENT_SCHEMA_VERSION;
	}

	if (typeof version === 'number') {
		return `${version}.0.0`;
	}

	if (typeof version !== 'string') {
		return '2.0.0';
	}

	const trimmed = version.trim();
	if (/^\d+$/.test(trimmed)) {
		return trimmed === '2' ? CURRENT_SCHEMA_VERSION : `${trimmed}.0.0`;
	}
	if (/^\d+\.\d+$/.test(trimmed)) {
		return `${trimmed}.0`;
	}
	return trimmed;
}

export function parseSchemaVersion(version: unknown): SchemaVersion {
	const normalized = normalizeSchemaVersion(version);
	const [major = 0, minor = 0, patch = 0] = normalized.split('.').map(Number);
	return { major, minor, patch };
}

export function compareSchemaVersions(v1: unknown, v2: unknown): number {
	const parsed1 = parseSchemaVersion(v1);
	const parsed2 = parseSchemaVersion(v2);

	if (parsed1.major !== parsed2.major) return parsed1.major - parsed2.major;
	if (parsed1.minor !== parsed2.minor) return parsed1.minor - parsed2.minor;
	return parsed1.patch - parsed2.patch;
}

export interface CompatibilityCheck {
	isCompatible: boolean;
	needsMigration: boolean;
	canAutoMigrate: boolean;
	message: string;
}

export function checkSchemaCompatibility(
	characterVersion: string | number | undefined,
	currentVersion: string = CURRENT_SCHEMA_VERSION
): CompatibilityCheck {
	if (!characterVersion || characterVersion === '2' || characterVersion === 2) {
		// Legacy characters without proper semver
		return {
			isCompatible: true,
			needsMigration: true,
			canAutoMigrate: true,
			message: 'Legacy character data. Will be auto-migrated to current schema.'
		};
	}

	const charVer = parseSchemaVersion(characterVersion);
	const currVer = parseSchemaVersion(currentVersion);

	// Major version mismatch = breaking changes
	if (charVer.major !== currVer.major) {
		return {
			isCompatible: false,
			needsMigration: true,
			canAutoMigrate: false,
			message: `Incompatible schema version ${characterVersion}. Current version is ${currentVersion}. Manual migration required.`
		};
	}

	// Minor version mismatch = new features, backwards compatible
	if (charVer.minor < currVer.minor) {
		return {
			isCompatible: true,
			needsMigration: true,
			canAutoMigrate: true,
			message: `Character schema ${characterVersion} will be migrated to ${currentVersion}.`
		};
	}

	// Same or newer minor version = fully compatible
	return {
		isCompatible: true,
		needsMigration: false,
		canAutoMigrate: false,
		message: 'Schema version is compatible.'
	};
}
