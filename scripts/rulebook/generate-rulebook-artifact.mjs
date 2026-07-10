import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const INGESTION_DIR = path.join(ROOT, 'docs/assets/dc20-0.10.5/marker-ingestion');
const TOC_PATH = path.join(INGESTION_DIR, 'VISUAL_TOC_DRAFT.md');
const SOURCE_PATH = path.join(INGESTION_DIR, 'DC20 RPG 0.10.5 Beta v1.cleaned.md');
const OUTPUT_DIR = path.join(ROOT, 'docs/assets/dc20-0.10.5/rulebook-artifact');
const ARTICLES_DIR = path.join(OUTPUT_DIR, 'articles');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');
const REPORT_PATH = path.join(OUTPUT_DIR, 'mapping-report.json');
const SEARCH_INDEX_PATH = path.join(OUTPUT_DIR, 'search-index.json');

const SOURCE_TITLE_OVERRIDES = {
	'core-rules/attacks-and-defenses/damage/stacking-damage-vuln-resist-and-immun':
		'Stacking Damage Vulnerabilities, Resistances, & Immunities',
	'general-rules/equipment/customized-weapons/step-3-weapon-properties': 'Step 3: Weapon'
};

const SYNTHETIC_ARTICLE_STARTS = {
	'ancestries/gnome': 199
};

const normalizeTitle = (value) =>
	value
		.toLowerCase()
		.replace(/^chapter\s+\d+\s+/i, '')
		.replace(/&/g, ' and ')
		.replace(/[’']/g, '')
		.replace(/[^a-z0-9]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

const slugify = (value) =>
	normalizeTitle(value)
		.replace(/\s+/g, '-')
		.replace(/^-+|-+$/g, '') || 'section';

const toDomId = (id) => `rulebook-${id.replaceAll('/', '--')}`;

const toSearchText = (value) =>
	value
		.replace(/<!--.*?-->/gs, ' ')
		.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/^#{1,6}\s+/gm, '')
		.replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, '')
		.replace(/[|*_`>~]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

const sourceLines = fs.readFileSync(SOURCE_PATH, 'utf8').split(/\r?\n/);
const tocLines = fs.readFileSync(TOC_PATH, 'utf8').split(/\r?\n/);

const hierarchyStart = tocLines.findIndex((line) => line.trim() === '## Draft Hierarchy');
const hierarchyEnd = tocLines.findIndex((line) => line.trim() === '## Review Notes');

if (hierarchyStart === -1) {
	throw new Error('Could not find Draft Hierarchy in the visual TOC.');
}

const tocNodes = [];
const stack = [];
const siblingSlugs = new Map();

for (const line of tocLines.slice(
	hierarchyStart + 1,
	hierarchyEnd === -1 ? undefined : hierarchyEnd
)) {
	const match = line.match(/^(\s*)(\d+)\.\s+(.+?)\s+\(p\.\s*(\d+)\)\s*$/);
	if (!match) continue;

	const depth = Math.floor(match[1].length / 3);
	const title = match[3].trim();
	const sourcePage = Number(match[4]);
	const parent = depth > 0 ? stack[depth - 1] : undefined;
	const baseSlug = slugify(title);
	const siblingKey = `${parent?.id ?? 'root'}:${baseSlug}`;
	const duplicateIndex = (siblingSlugs.get(siblingKey) ?? 0) + 1;
	siblingSlugs.set(siblingKey, duplicateIndex);
	const localSlug = duplicateIndex === 1 ? baseSlug : `${baseSlug}-${duplicateIndex}`;
	const id = parent ? `${parent.id}/${localSlug}` : localSlug;

	const node = {
		id,
		title,
		depth,
		sourcePage,
		parentId: parent?.id ?? null,
		children: [],
		order: tocNodes.length,
		kind: depth === 0 ? 'group' : depth === 1 ? 'article' : 'anchor'
	};

	if (parent) parent.children.push(id);
	tocNodes.push(node);
	stack[depth] = node;
	stack.length = depth + 1;
}

if (tocNodes.length === 0) {
	throw new Error('The visual TOC hierarchy did not contain any parseable entries.');
}

const headings = [];
const pageStartLines = new Map();
let currentPage = null;

for (let index = 0; index < sourceLines.length; index += 1) {
	const anchorMatch = sourceLines[index].match(/<!-- source anchors: ([^>]+) -->/);
	if (anchorMatch) {
		for (const anchor of anchorMatch[1].split(',').map((value) => value.trim())) {
			const pageMatch = anchor.match(/^page-(\d+)-\d+$/);
			if (!pageMatch) continue;
			currentPage = Number(pageMatch[1]);
			if (!pageStartLines.has(currentPage)) pageStartLines.set(currentPage, index);
		}
	}

	const headingMatch = sourceLines[index].match(/^(#{1,6})\s+(.+)$/);
	if (!headingMatch) continue;

	headings.push({
		line: index,
		page: currentPage,
		level: headingMatch[1].length,
		title: headingMatch[2].trim(),
		normalizedTitle: normalizeTitle(headingMatch[2])
	});
}

const ambiguousMappings = [];
const unresolvedMappings = [];
const resolvedOverrides = [];

const findHeading = (node, { startLine = 0, endLine = sourceLines.length } = {}) => {
	const sourceTitle = SOURCE_TITLE_OVERRIDES[node.id] ?? node.title;
	const normalizedTitle = normalizeTitle(sourceTitle);
	const exactCandidates = headings.filter(
		(heading) =>
			heading.line >= startLine &&
			heading.line < endLine &&
			heading.normalizedTitle === normalizedTitle
	);

	if (exactCandidates.length === 0) {
		const syntheticPage = SYNTHETIC_ARTICLE_STARTS[node.id];
		const syntheticLine = syntheticPage ? pageStartLines.get(syntheticPage) : undefined;
		if (syntheticLine === undefined || syntheticLine < startLine || syntheticLine >= endLine)
			return null;

		resolvedOverrides.push({
			id: node.id,
			title: node.title,
			method: 'synthetic-page-start',
			sourcePage: syntheticPage,
			sourceLine: syntheticLine + 1
		});

		return {
			line: syntheticLine,
			page: syntheticPage,
			level: 0,
			title: node.title,
			normalizedTitle: normalizeTitle(node.title),
			synthetic: true
		};
	}

	const scored = exactCandidates
		.map((heading) => ({
			heading,
			score:
				Math.abs((heading.page ?? node.sourcePage) - node.sourcePage) * 100000 +
				Math.abs(heading.line - (pageStartLines.get(node.sourcePage) ?? heading.line))
		}))
		.sort((left, right) => left.score - right.score || left.heading.line - right.heading.line);

	if (scored.length > 1 && scored[0].score === scored[1].score) {
		ambiguousMappings.push({
			id: node.id,
			title: node.title,
			sourcePage: node.sourcePage,
			candidateLines: scored
				.filter((candidate) => candidate.score === scored[0].score)
				.map((candidate) => candidate.heading.line + 1)
		});
	}

	if (SOURCE_TITLE_OVERRIDES[node.id]) {
		resolvedOverrides.push({
			id: node.id,
			title: node.title,
			method: 'source-title-override',
			sourceTitle,
			sourcePage: scored[0].heading.page,
			sourceLine: scored[0].heading.line + 1
		});
	}

	return scored[0].heading;
};

const boundaryNodes = tocNodes.filter((node) => node.depth <= 1);
const boundaryMappings = new Map();

const sourceBoundaryStart = (heading) => {
	if (heading.synthetic) return heading.line;
	const precedingLine = sourceLines[heading.line - 1]?.trim() ?? '';
	return /^<!-- source anchors: .+ -->$/.test(precedingLine) ? heading.line - 1 : heading.line;
};

for (const node of boundaryNodes) {
	const heading = findHeading(node);
	if (heading) {
		boundaryMappings.set(node.id, heading);
	} else {
		unresolvedMappings.push({
			kind: node.kind,
			id: node.id,
			title: node.title,
			sourcePage: node.sourcePage
		});
	}
}

const sortedBoundaries = [...boundaryMappings.entries()]
	.map(([id, heading]) => ({ id, line: sourceBoundaryStart(heading) }))
	.sort((left, right) => left.line - right.line);

const nextBoundaryLine = (startLine) =>
	sortedBoundaries.find((boundary) => boundary.line > startLine)?.line ?? sourceLines.length;

const descendantsByArticle = new Map();
let activeArticleId = null;

for (const node of tocNodes) {
	if (node.depth === 1) activeArticleId = node.id;
	if (node.depth > 1 && activeArticleId) {
		const descendants = descendantsByArticle.get(activeArticleId) ?? [];
		descendants.push(node);
		descendantsByArticle.set(activeArticleId, descendants);
	}
	if (node.depth === 0) activeArticleId = null;
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.rmSync(ARTICLES_DIR, { recursive: true, force: true });
fs.mkdirSync(ARTICLES_DIR, { recursive: true });

const articleRecords = [];
const anchorRecords = [];

for (const articleNode of tocNodes.filter((node) => node.kind === 'article')) {
	const articleHeading = boundaryMappings.get(articleNode.id);
	if (!articleHeading) continue;

	const startLine = sourceBoundaryStart(articleHeading);
	const endLine = nextBoundaryLine(startLine);
	const mappedHeadings = new Map(
		articleHeading.synthetic
			? []
			: [[articleHeading.line, { id: articleNode.id, level: 1, title: articleNode.title }]]
	);
	const usedHeadingLines = new Set(articleHeading.synthetic ? [] : [articleHeading.line]);
	const descendants = descendantsByArticle.get(articleNode.id) ?? [];

	for (const descendant of descendants) {
		const match = findHeading(descendant, { startLine: articleHeading.line, endLine });
		if (!match || usedHeadingLines.has(match.line)) {
			unresolvedMappings.push({
				kind: 'anchor',
				id: descendant.id,
				title: descendant.title,
				sourcePage: descendant.sourcePage,
				articleId: articleNode.id
			});
			continue;
		}

		usedHeadingLines.add(match.line);
		mappedHeadings.set(match.line, {
			id: descendant.id,
			level: Math.min(6, descendant.depth),
			title: descendant.title
		});
		anchorRecords.push({
			id: descendant.id,
			title: descendant.title,
			parentId: descendant.parentId,
			articleId: articleNode.id,
			domId: toDomId(descendant.id),
			order: descendant.order,
			sourcePage: descendant.sourcePage,
			headingLine: match.line + 1
		});
	}

	let currentTocLevel = 1;
	const normalizedLines = sourceLines.slice(startLine, endLine).map((line, localIndex) => {
		const absoluteLine = startLine + localIndex;
		const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
		if (!headingMatch) return line;

		const mappedHeading = mappedHeadings.get(absoluteLine);
		if (mappedHeading) {
			currentTocLevel = mappedHeading.level;
			return `<!-- rulebook-id: ${mappedHeading.id} -->\n${'#'.repeat(mappedHeading.level)} ${mappedHeading.title}`;
		}

		const microLevel = Math.min(6, currentTocLevel + 1);
		return `${'#'.repeat(microLevel)} ${headingMatch[2].trim()}`;
	});

	const articleLines = articleHeading.synthetic
		? [`<!-- rulebook-id: ${articleNode.id} -->`, `# ${articleNode.title}`, '', ...normalizedLines]
		: normalizedLines;
	const content = `${articleLines.join('\n').trim()}\n`;
	const relativeFile = path.posix.join('articles', `${articleNode.id}.md`);
	const outputPath = path.join(OUTPUT_DIR, relativeFile);
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, content);

	articleRecords.push({
		id: articleNode.id,
		title: articleNode.title,
		domId: toDomId(articleNode.id),
		parentId: articleNode.parentId,
		order: articleNode.order,
		sourcePage: articleNode.sourcePage,
		file: relativeFile,
		childIds: articleNode.children,
		source: {
			startLine: startLine + 1,
			endLine,
			startPage: articleHeading.page,
			endPage:
				headings.filter((heading) => heading.line < endLine).at(-1)?.page ?? articleHeading.page
		},
		sha256: crypto.createHash('sha256').update(content).digest('hex')
	});
}

const manifest = {
	schemaVersion: 1,
	rulesVersion: '0.10.5',
	source: {
		markdown: path.relative(ROOT, SOURCE_PATH),
		tableOfContents: path.relative(ROOT, TOC_PATH)
	},
	splitPolicy: {
		articleDepth: 1,
		description:
			'Direct children of major PDF TOC groups are article files. Deeper TOC entries are anchors inside those articles.'
	},
	searchIndex: 'search-index.json',
	groups: tocNodes
		.filter((node) => node.kind === 'group')
		.map((node) => ({
			id: node.id,
			title: node.title,
			order: node.order,
			sourcePage: node.sourcePage,
			childIds: node.children
		})),
	articles: articleRecords,
	anchors: anchorRecords
};

const searchableRecordsById = new Map(
	[
		...articleRecords.map((article) => ({
			id: article.id,
			title: article.title,
			articleId: article.id,
			articleTitle: article.title,
			groupId: article.parentId,
			domId: article.domId,
			order: article.order,
			sourcePage: article.sourcePage
		})),
		...anchorRecords.map((anchor) => {
			const article = articleRecords.find((candidate) => candidate.id === anchor.articleId);
			return {
				id: anchor.id,
				title: anchor.title,
				articleId: anchor.articleId,
				articleTitle: article?.title ?? anchor.articleId,
				groupId: article?.parentId ?? anchor.articleId.split('/')[0],
				domId: anchor.domId,
				order: anchor.order,
				sourcePage: anchor.sourcePage
			};
		})
	].map((record) => [record.id, record])
);

const searchIndex = [];

for (const article of articleRecords) {
	const articleContent = fs.readFileSync(path.join(OUTPUT_DIR, article.file), 'utf8');
	const articleLines = articleContent.split(/\r?\n/);
	let activeId = null;
	let activeLines = [];

	const pushSearchRecord = () => {
		if (!activeId) return;
		const metadata = searchableRecordsById.get(activeId);
		if (!metadata) return;

		searchIndex.push({
			...metadata,
			text: toSearchText(activeLines.join('\n'))
		});
	};

	for (const line of articleLines) {
		const idMatch = line.match(/^<!-- rulebook-id: ([^>]+) -->$/);
		if (idMatch) {
			pushSearchRecord();
			activeId = idMatch[1].trim();
			activeLines = [];
			continue;
		}

		activeLines.push(line);
	}

	pushSearchRecord();
}

const report = {
	sourceHeadingCount: headings.length,
	tocNodeCount: tocNodes.length,
	groupCount: manifest.groups.length,
	requestedArticleCount: tocNodes.filter((node) => node.kind === 'article').length,
	generatedArticleCount: articleRecords.length,
	mappedAnchorCount: anchorRecords.length,
	searchRecordCount: searchIndex.length,
	unresolvedCount: unresolvedMappings.length,
	ambiguousCount: ambiguousMappings.length,
	resolvedOverrideCount: resolvedOverrides.length,
	unresolved: unresolvedMappings,
	ambiguous: ambiguousMappings,
	resolvedOverrides,
	validation: {
		status: 'pending',
		errors: []
	}
};

const expectedArticleCount = tocNodes.filter((node) => node.kind === 'article').length;
const expectedAnchorCount = tocNodes.filter((node) => node.kind === 'anchor').length;
const validationErrors = [];

if (articleRecords.length !== expectedArticleCount) {
	validationErrors.push(
		`Expected ${expectedArticleCount} articles but generated ${articleRecords.length}.`
	);
}
if (anchorRecords.length !== expectedAnchorCount) {
	validationErrors.push(
		`Expected ${expectedAnchorCount} anchors but mapped ${anchorRecords.length}.`
	);
}
if (unresolvedMappings.length > 0) {
	validationErrors.push(`${unresolvedMappings.length} mappings remain unresolved.`);
}
if (ambiguousMappings.length > 0) {
	validationErrors.push(`${ambiguousMappings.length} mappings remain ambiguous.`);
}
if (searchIndex.length !== articleRecords.length + anchorRecords.length) {
	validationErrors.push(
		`Expected ${articleRecords.length + anchorRecords.length} search records but generated ${searchIndex.length}.`
	);
}

for (const article of articleRecords) {
	const articleContent = fs.readFileSync(path.join(OUTPUT_DIR, article.file), 'utf8');
	const h1Count = articleContent.match(/^# /gm)?.length ?? 0;
	if (h1Count !== 1) {
		validationErrors.push(`${article.id} contains ${h1Count} level-one headings.`);
	}
}

report.validation = {
	status: validationErrors.length === 0 ? 'passed' : 'failed',
	errors: validationErrors
};

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(SEARCH_INDEX_PATH, `${JSON.stringify(searchIndex)}\n`);

console.log(
	`Generated ${articleRecords.length} article files in ${path.relative(ROOT, ARTICLES_DIR)}`
);
console.log(`Wrote ${path.relative(ROOT, MANIFEST_PATH)}`);
console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
console.log(`Wrote ${path.relative(ROOT, SEARCH_INDEX_PATH)}`);
console.log(`Unresolved mappings: ${unresolvedMappings.length}`);
console.log(`Ambiguous mappings: ${ambiguousMappings.length}`);

if (validationErrors.length > 0) {
	throw new Error(`Rulebook artifact validation failed:\n${validationErrors.join('\n')}`);
}
