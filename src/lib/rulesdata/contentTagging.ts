import type { ClassDefinition, ClassFeature, Subclass } from './schemas/character.schema';
import type { ContentTag } from './schemas/content.schema';
import type { Spell } from './schemas/spell.schema';
import {
	CLASS_CONTENT_OVERRIDES,
	FEATURE_CONTENT_OVERRIDES,
	SPELL_CONTENT_OVERRIDES,
	type ContentTagOverride
} from './contentTagRegistry';

const MAGAZINE_SOURCE_PATTERN = /^DC20Magazine/i;

function inferMagazineTag(contentSourceRef?: string): boolean {
	return Boolean(contentSourceRef && MAGAZINE_SOURCE_PATTERN.test(contentSourceRef));
}

function dedupeTags(tags: ContentTag[]): ContentTag[] {
	return Array.from(new Set(tags));
}

export function normalizeContentTags(
	contentTags: ContentTag[] | undefined,
	contentSourceRef?: string,
	fallbackTag: ContentTag = 'SRD'
): ContentTag[] {
	const normalized: ContentTag[] = [...(contentTags ?? [])];
	if (inferMagazineTag(contentSourceRef) && !normalized.includes('MAGAZINE')) {
		normalized.push('MAGAZINE');
	}
	if (normalized.length === 0) {
		normalized.push(fallbackTag);
	}
	return dedupeTags(normalized);
}

function mergeOverride(
	base: { contentTags?: ContentTag[]; contentSourceRef?: string },
	override?: ContentTagOverride
): { contentTags?: ContentTag[]; contentSourceRef?: string } {
	if (!override) return base;
	return {
		contentTags: override.contentTags ?? base.contentTags,
		contentSourceRef: override.contentSourceRef ?? base.contentSourceRef
	};
}

export function normalizeSpellContent(spell: Spell): Spell {
	const override = SPELL_CONTENT_OVERRIDES[spell.id];
	const merged = mergeOverride(spell, override);
	return {
		...spell,
		contentSourceRef: merged.contentSourceRef,
		contentTags: normalizeContentTags(merged.contentTags, merged.contentSourceRef)
	};
}

export function normalizeClassFeatureContent(feature: ClassFeature): ClassFeature {
	const override = feature.id ? FEATURE_CONTENT_OVERRIDES[feature.id] : undefined;
	const merged = mergeOverride(feature, override);
	const normalizedTags = normalizeContentTags(merged.contentTags, merged.contentSourceRef);
	const isMagazine = normalizedTags.includes('MAGAZINE');
	const shouldForceSrdByLevel = feature.levelGained <= 2 && !isMagazine;

	return {
		...feature,
		contentSourceRef: merged.contentSourceRef,
		contentTags: shouldForceSrdByLevel
			? dedupeTags([...normalizedTags, 'SRD'])
			: normalizedTags
	};
}

function normalizeSubclassContent(subclass: Subclass): Subclass {
	return {
		...subclass,
		contentTags: normalizeContentTags(subclass.contentTags, subclass.contentSourceRef),
		features: subclass.features.map(normalizeClassFeatureContent)
	};
}

export function normalizeClassDefinitionContent(classDefinition: ClassDefinition): ClassDefinition {
	const override = CLASS_CONTENT_OVERRIDES[classDefinition.className.toLowerCase()];
	const merged = mergeOverride(classDefinition, override);
	return {
		...classDefinition,
		contentSourceRef: merged.contentSourceRef,
		contentTags: normalizeContentTags(merged.contentTags, merged.contentSourceRef),
		coreFeatures: classDefinition.coreFeatures.map(normalizeClassFeatureContent),
		subclasses: classDefinition.subclasses.map(normalizeSubclassContent)
	};
}
