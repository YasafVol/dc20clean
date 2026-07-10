import { describe, expect, it } from 'vitest';

import {
	getRulebookArticle,
	getRulebookArticleNeighbors,
	getRulebookArticlePath,
	rulebookManifest,
	searchRulebook,
	visibleRulebookGroups,
	type RulebookSearchRecord
} from './rulebookData';

describe('Rulebook generated artifact', () => {
	it('contains a complete, unique hierarchy', () => {
		expect(rulebookManifest.groups).toHaveLength(8);
		expect(rulebookManifest.articles).toHaveLength(88);
		expect(rulebookManifest.anchors).toHaveLength(408);

		const ids = [
			...rulebookManifest.groups.map((group) => group.id),
			...rulebookManifest.articles.map((article) => article.id),
			...rulebookManifest.anchors.map((anchor) => anchor.id)
		];

		expect(new Set(ids).size).toBe(ids.length);
		expect(
			rulebookManifest.articles.every((article) =>
				rulebookManifest.groups.some((group) => group.id === article.parentId)
			)
		).toBe(true);
	});

	it('keeps front matter out of the passive reader TOC', () => {
		expect(visibleRulebookGroups.some((group) => group.id === 'welcome-to-the-dc20-beta')).toBe(
			false
		);
		expect(visibleRulebookGroups[0]?.id).toBe('core-rules');
	});

	it('builds stable article routes and neighbors', () => {
		const article = getRulebookArticle('core-rules/attributes-and-prime-modifier');
		expect(article?.title).toBe('Attributes & Prime Modifier');
		expect(getRulebookArticlePath(article!.id)).toBe(
			'/rulebook/core-rules/attributes-and-prime-modifier'
		);

		const neighbors = getRulebookArticleNeighbors(article!.id);
		expect(neighbors.previous).toBeUndefined();
		expect(neighbors.next?.id).toBe('core-rules/skills');
	});
});

describe('Rulebook search ranking', () => {
	const records: RulebookSearchRecord[] = [
		{
			id: 'core-rules/attributes/attribute-limit',
			title: 'Attribute Limit',
			articleId: 'core-rules/attributes',
			articleTitle: 'Attributes',
			groupId: 'core-rules',
			domId: 'rulebook-core-rules--attributes--attribute-limit',
			order: 2,
			sourcePage: 10,
			text: 'An Attribute cannot increase beyond the current Attribute Limit.'
		},
		{
			id: 'ancestries/increases',
			title: 'Increases',
			articleId: 'ancestries/ancestry-traits',
			articleTitle: 'Ancestry Traits',
			groupId: 'ancestries',
			domId: 'rulebook-ancestries--increases',
			order: 300,
			sourcePage: 193,
			text: 'Trait increases cannot exceed the Attribute Limit.'
		}
	];

	it('ranks exact heading matches before body matches', () => {
		const results = searchRulebook(records, 'attribute limit');
		expect(results.map((result) => result.id)).toEqual([
			'core-rules/attributes/attribute-limit',
			'ancestries/increases'
		]);
	});

	it('returns no results for an empty query', () => {
		expect(searchRulebook(records, '   ')).toEqual([]);
	});
});
