import manifestSource from '../../../docs/assets/dc20-0.10.5/rulebook-artifact/manifest.json';

export interface RulebookGroup {
	id: string;
	title: string;
	order: number;
	sourcePage: number;
	childIds: string[];
}

export interface RulebookArticle {
	id: string;
	title: string;
	domId: string;
	parentId: string;
	order: number;
	sourcePage: number;
	file: string;
	childIds: string[];
	source: {
		startLine: number;
		endLine: number;
		startPage: number | null;
		endPage: number | null;
	};
	sha256: string;
}

export interface RulebookAnchor {
	id: string;
	title: string;
	parentId: string;
	articleId: string;
	domId: string;
	order: number;
	sourcePage: number;
	headingLine: number;
}

export interface RulebookManifest {
	schemaVersion: number;
	rulesVersion: string;
	searchIndex: string;
	groups: RulebookGroup[];
	articles: RulebookArticle[];
	anchors: RulebookAnchor[];
}

export interface RulebookSearchRecord {
	id: string;
	title: string;
	articleId: string;
	articleTitle: string;
	groupId: string;
	domId: string;
	order: number;
	sourcePage: number;
	text: string;
}

export interface RulebookSearchResult extends RulebookSearchRecord {
	snippet: string;
}

export const rulebookManifest = manifestSource as RulebookManifest;

const hiddenGroupIds = new Set(['welcome-to-the-dc20-beta']);
const articleById = new Map(rulebookManifest.articles.map((article) => [article.id, article]));
const groupById = new Map(rulebookManifest.groups.map((group) => [group.id, group]));
const anchorById = new Map(rulebookManifest.anchors.map((anchor) => [anchor.id, anchor]));

export const visibleRulebookGroups = rulebookManifest.groups.filter(
	(group) => !hiddenGroupIds.has(group.id)
);

export const visibleRulebookArticles = visibleRulebookGroups.flatMap((group) =>
	group.childIds.flatMap((articleId) => {
		const article = articleById.get(articleId);
		return article ? [article] : [];
	})
);

export const getRulebookArticle = (id: string | undefined) =>
	id ? articleById.get(id) : undefined;

export const getRulebookGroup = (id: string | undefined) => (id ? groupById.get(id) : undefined);

export const getRulebookAnchor = (id: string) => anchorById.get(id);

export const getRulebookArticlePath = (articleId: string) => `/rulebook/${articleId}`;

export const getRulebookArticleNeighbors = (articleId: string) => {
	const index = visibleRulebookArticles.findIndex((article) => article.id === articleId);

	return {
		previous: index > 0 ? visibleRulebookArticles[index - 1] : undefined,
		next:
			index >= 0 && index < visibleRulebookArticles.length - 1
				? visibleRulebookArticles[index + 1]
				: undefined
	};
};

const normalizeSearchText = (value: string) =>
	value
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

const createSnippet = (text: string, query: string) => {
	const compactText = text.replace(/\s+/g, ' ').trim();
	const queryIndex = compactText.toLowerCase().indexOf(query.trim().toLowerCase());
	const matchIndex = queryIndex >= 0 ? queryIndex : 0;
	const start = Math.max(0, matchIndex - 80);
	const end = Math.min(compactText.length, matchIndex + query.length + 150);

	return `${start > 0 ? '...' : ''}${compactText.slice(start, end)}${end < compactText.length ? '...' : ''}`;
};

export const searchRulebook = (
	records: RulebookSearchRecord[],
	query: string,
	limit = 30
): RulebookSearchResult[] => {
	const normalizedQuery = normalizeSearchText(query);
	if (!normalizedQuery) return [];

	return records
		.flatMap((record) => {
			const normalizedTitle = normalizeSearchText(record.title);
			const normalizedArticleTitle = normalizeSearchText(record.articleTitle);
			const normalizedText = normalizeSearchText(record.text);
			let score = Number.POSITIVE_INFINITY;

			if (normalizedTitle === normalizedQuery) score = 0;
			else if (normalizedTitle.startsWith(normalizedQuery)) score = 10;
			else if (normalizedTitle.includes(normalizedQuery)) score = 20;
			else if (normalizedArticleTitle.includes(normalizedQuery)) score = 30;
			else if (normalizedText.includes(normalizedQuery)) score = 40;

			return Number.isFinite(score)
				? [{ ...record, score, snippet: createSnippet(record.text, query) }]
				: [];
		})
		.sort((left, right) => left.score - right.score || left.order - right.order)
		.slice(0, limit)
		.map((result) => ({
			id: result.id,
			title: result.title,
			articleId: result.articleId,
			articleTitle: result.articleTitle,
			groupId: result.groupId,
			domId: result.domId,
			order: result.order,
			sourcePage: result.sourcePage,
			text: result.text,
			snippet: result.snippet
		}));
};
