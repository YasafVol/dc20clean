import type { RulebookArticle, RulebookSearchRecord } from './rulebookData';

const articleModules = import.meta.glob<string>(
	'../../../docs/assets/dc20-0.10.5/rulebook-artifact/articles/**/*.md',
	{ query: '?raw', import: 'default' }
);

const articleModulePrefix = '../../../docs/assets/dc20-0.10.5/rulebook-artifact/';

let searchIndexPromise: Promise<RulebookSearchRecord[]> | undefined;

export const loadRulebookSearchIndex = () => {
	searchIndexPromise ??= import(
		'../../../docs/assets/dc20-0.10.5/rulebook-artifact/search-index.json'
	).then((module) => module.default as RulebookSearchRecord[]);

	return searchIndexPromise;
};

export const loadRulebookArticle = async (article: RulebookArticle) => {
	const loader = articleModules[`${articleModulePrefix}${article.file}`];
	if (!loader) throw new Error(`Missing Rulebook article module: ${article.file}`);
	return loader();
};
