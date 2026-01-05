/**
 * Schema Migration Helper
 *
 * Handles automatic migration of character data between schema versions.
 */

import { CURRENT_SCHEMA_VERSION, parseSchemaVersion } from '../types/schemaVersion';
import type { SavedCharacter } from '../types/dataContracts';

export function migrateCharacterSchema(character: SavedCharacter): SavedCharacter {
	const version = character.schemaVersion || '2.0.0';
	const parsed = parseSchemaVersion(version);

	let migrated = { ...character };

	// Migration from 2.0.x to 2.1.x
	if (parsed.major === 2 && parsed.minor === 0) {
		console.log(`Migrating character ${migrated.id} from ${version} to 2.1.0`);

		// Ensure selectedTalents is Record<string, number> not string[]
		if (Array.isArray(migrated.selectedTalents)) {
			const talentCounts: Record<string, number> = {};
			(migrated.selectedTalents as string[]).forEach((id) => {
				talentCounts[id] = (talentCounts[id] || 0) + 1;
			});
			migrated.selectedTalents = talentCounts as any;
			console.log('  - Migrated selectedTalents from array to count-based record');
		}

		// Ensure selectedFeatureChoices exists
		if (!migrated.selectedFeatureChoices) {
			migrated.selectedFeatureChoices = {};
			console.log('  - Added selectedFeatureChoices');
		}

		migrated.schemaVersion = '2.1.0';
	}

	// Update to current version
	if (migrated.schemaVersion !== CURRENT_SCHEMA_VERSION) {
		migrated.schemaVersion = CURRENT_SCHEMA_VERSION;
		migrated.lastModified = new Date().toISOString();
		console.log(`✅ Character ${migrated.id} migrated to ${CURRENT_SCHEMA_VERSION}`);
	}

	return migrated;
}
