import type { ContentTag } from './schemas/content.schema';

export interface ContentTagOverride {
	contentTags?: ContentTag[];
	contentSourceRef?: string;
}

/**
 * Explicit per-spell content provenance overrides.
 * Keyed by spell ID.
 */
export const SPELL_CONTENT_OVERRIDES: Record<string, ContentTagOverride> = {};

/**
 * Explicit per-class content provenance overrides.
 * Keyed by lower-cased class name.
 */
export const CLASS_CONTENT_OVERRIDES: Record<string, ContentTagOverride> = {};

/**
 * Explicit per-feature content provenance overrides.
 * Keyed by feature ID.
 */
export const FEATURE_CONTENT_OVERRIDES: Record<string, ContentTagOverride> = {};
