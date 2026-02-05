/**
 * ID Generator Utility for DM Tools Content
 *
 * Generates prefixed UUIDs for all content types:
 * - Monsters: mon_<uuid>
 * - Features: feat_<uuid>
 * - Actions: act_<uuid>
 * - Encounters: enc_<uuid>
 * - Slots: slot_<uuid>
 */

import {
	CONTENT_ID_PREFIXES,
	type ContentIdPrefix,
	type ContentIdType
} from '../rulesdata/schemas/monster.schema';

// Re-export for convenience
export { CONTENT_ID_PREFIXES, type ContentIdPrefix, type ContentIdType };

/**
 * UUID v4 regex pattern (lowercase hex with dashes)
 */
const UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;

/**
 * Generates a UUID v4 using the crypto API
 */
function generateUUID(): string {
	// Use crypto.randomUUID if available (modern browsers and Node.js 19+)
	if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
		return crypto.randomUUID();
	}

	// Fallback for older environments (unlikely in modern app)
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

/**
 * Result of parsing a content ID
 */
export interface ParsedContentId {
	type: ContentIdType;
	uuid: string;
	prefix: ContentIdPrefix;
}

/**
 * Generates a prefixed content ID
 *
 * @param type - The type of content (monster, feature, action, encounter, slot)
 * @returns A prefixed UUID string (e.g., "mon_a1b2c3d4-...")
 *
 * @example
 * generateContentId('monster')  // "mon_a1b2c3d4-e5f6-4789-abcd-ef0123456789"
 * generateContentId('feature')  // "feat_a1b2c3d4-e5f6-4789-abcd-ef0123456789"
 * generateContentId('action')   // "act_a1b2c3d4-e5f6-4789-abcd-ef0123456789"
 */
export function generateContentId(type: ContentIdType): string {
	const prefix = CONTENT_ID_PREFIXES[type];
	if (!prefix) {
		throw new Error(
			`Invalid content type: ${type}. Valid types: ${Object.keys(CONTENT_ID_PREFIXES).join(', ')}`
		);
	}
	return `${prefix}${generateUUID()}`;
}

/**
 * Parses a content ID into its components
 *
 * @param id - The content ID to parse (e.g., "mon_a1b2c3d4-...")
 * @returns The parsed components or null if invalid
 *
 * @example
 * parseContentId('mon_a1b2c3d4-e5f6-4789-abcd-ef0123456789')
 * // { type: 'monster', uuid: 'a1b2c3d4-e5f6-4789-abcd-ef0123456789', prefix: 'mon_' }
 *
 * parseContentId('invalid')
 * // null
 */
export function parseContentId(id: string): ParsedContentId | null {
	if (!id || typeof id !== 'string') {
		return null;
	}

	// Find matching prefix
	for (const [type, prefix] of Object.entries(CONTENT_ID_PREFIXES) as [
		ContentIdType,
		ContentIdPrefix
	][]) {
		if (id.startsWith(prefix)) {
			const uuid = id.slice(prefix.length);
			if (UUID_PATTERN.test(uuid)) {
				return { type, uuid, prefix };
			}
			// Has prefix but invalid UUID
			return null;
		}
	}

	// No matching prefix
	return null;
}

/**
 * Validates a content ID
 *
 * @param id - The content ID to validate
 * @param expectedType - Optional: expected content type for stricter validation
 * @returns true if valid, false otherwise
 *
 * @example
 * isValidContentId('mon_a1b2c3d4-e5f6-4789-abcd-ef0123456789')           // true
 * isValidContentId('mon_a1b2c3d4-e5f6-4789-abcd-ef0123456789', 'monster') // true
 * isValidContentId('mon_a1b2c3d4-e5f6-4789-abcd-ef0123456789', 'feature') // false
 * isValidContentId('invalid')                                             // false
 * isValidContentId('mon_not-a-uuid')                                      // false
 */
export function isValidContentId(id: string, expectedType?: ContentIdType): boolean {
	const parsed = parseContentId(id);

	if (!parsed) {
		return false;
	}

	if (expectedType && parsed.type !== expectedType) {
		return false;
	}

	return true;
}

/**
 * Extracts the content type from an ID
 *
 * @param id - The content ID
 * @returns The content type or null if invalid
 *
 * @example
 * getContentType('mon_a1b2c3d4-...')  // 'monster'
 * getContentType('feat_a1b2c3d4-...') // 'feature'
 * getContentType('invalid')           // null
 */
export function getContentType(id: string): ContentIdType | null {
	const parsed = parseContentId(id);
	return parsed?.type ?? null;
}

/**
 * Batch generates multiple content IDs of the same type
 *
 * @param type - The type of content
 * @param count - Number of IDs to generate
 * @returns Array of prefixed UUID strings
 *
 * @example
 * generateContentIds('action', 3)
 * // ['act_xxx...', 'act_yyy...', 'act_zzz...']
 */
export function generateContentIds(type: ContentIdType, count: number): string[] {
	if (count < 0 || !Number.isInteger(count)) {
		throw new Error('Count must be a non-negative integer');
	}
	return Array.from({ length: count }, () => generateContentId(type));
}
