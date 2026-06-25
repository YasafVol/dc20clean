#!/usr/bin/env node
import { mkdir, readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const ASSET_DIR = path.join(ROOT, 'docs/assets/dc20-0.10.5');
const RAW_DIR = path.join(ASSET_DIR, 'raw');
const CLEAN_MD = path.join(ASSET_DIR, 'DC20 0.10.5 clean.md');
const CHUNKS_JSON = path.join(ASSET_DIR, 'chunks.json');
const PAGE_INDEX_JSON = path.join(ASSET_DIR, 'page-index.json');
const CLEANUP_REPORT = path.join(ASSET_DIR, 'CLEANUP_REPORT.md');

const KEY_TERMS = ['HP', 'SP', 'MP', 'AP', 'PD', 'AD', 'Save DC', 'Maneuver', 'Spell'];

async function pathExists(filePath) {
	try {
		await stat(filePath);
		return true;
	} catch {
		return false;
	}
}

async function listFiles(dir, predicate, result = []) {
	if (!(await pathExists(dir))) return result;
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await listFiles(fullPath, predicate, result);
			continue;
		}
		if (predicate(fullPath)) result.push(fullPath);
	}
	return result;
}

async function findLargestMarkdownFile() {
	const files = await listFiles(RAW_DIR, (filePath) => filePath.toLowerCase().endsWith('.md'));
	if (files.length === 0) {
		throw new Error(`No Markdown files found under ${RAW_DIR}. Run Docling extraction first.`);
	}

	const withSize = await Promise.all(
		files.map(async (filePath) => ({ filePath, size: (await stat(filePath)).size }))
	);
	withSize.sort((a, b) => b.size - a.size);
	return withSize[0].filePath;
}

async function findLargestJsonFile() {
	const files = await listFiles(RAW_DIR, (filePath) => filePath.toLowerCase().endsWith('.json'));
	if (files.length === 0) return null;

	const withSize = await Promise.all(
		files.map(async (filePath) => ({ filePath, size: (await stat(filePath)).size }))
	);
	withSize.sort((a, b) => b.size - a.size);
	return withSize[0].filePath;
}

function normalizeLineEndings(text) {
	return text.replace(/\r\n?/g, '\n').replace(/\u000c/g, '\n<!-- page-break -->\n');
}

function decodeCommonEntities(text) {
	return text
		.replaceAll('&amp;', '&')
		.replaceAll('&lt;', '<')
		.replaceAll('&gt;', '>')
		.replaceAll('&quot;', '"')
		.replaceAll('&#39;', "'");
}

function anchorText(text) {
	return decodeCommonEntities(text)
		.toLowerCase()
		.replace(/<!--[^>]+-->/g, ' ')
		.replace(/[#*_`|[\](){}:;,.!?'"“”‘’]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.slice(0, 160);
}

function normalizeHeading(line) {
	const trimmed = line.trim();
	const markdownHeading = trimmed.match(/^(#{1,6})([^\s#].*)$/);
	if (markdownHeading) return `${markdownHeading[1]} ${markdownHeading[2].trim()}`;

	const boldHeading = trimmed.match(/^\*\*([^*]{2,120})\*\*:?$/);
	if (boldHeading) return `## ${boldHeading[1].trim()}`;

	return line.replace(/[ \t]+$/g, '');
}

function isTableLine(line) {
	const trimmed = line.trim();
	return trimmed.startsWith('|') && trimmed.endsWith('|');
}

function isRepeatedHeaderFooterCandidate(line, count) {
	const trimmed = line.trim();
	if (!trimmed || count < 6) return false;
	if (trimmed.length > 120) return false;
	if (/^\d{1,3}$/.test(trimmed)) return true;
	if (/^page\s+\d+/i.test(trimmed)) return true;
	if (/dc20|beta|rpg|copyright|the dungeon coach|fillable/i.test(trimmed)) return true;
	return false;
}

function isPageAnchorCandidate(text) {
	const trimmed = decodeCommonEntities(text).trim();
	if (!trimmed || trimmed.length < 3) return false;
	if (/^\d{1,3}$/.test(trimmed)) return false;
	if (/^the dungeon coach$/i.test(trimmed)) return false;
	if (/^dc20 beta/i.test(trimmed)) return false;
	if (/^v\d+\.\d+/i.test(trimmed)) return false;
	return true;
}

function buildJsonPageIndex(doclingJson) {
	const items = [];
	for (const [index, textItem] of (doclingJson.texts ?? []).entries()) {
		const text = String(textItem.text ?? '').trim();
		const page = textItem.prov?.[0]?.page_no;
		if (!Number.isInteger(page) || !isPageAnchorCandidate(text)) continue;
		items.push({
			index,
			page,
			text,
			anchor: anchorText(text)
		});
	}
	for (const [index, table] of (doclingJson.tables ?? []).entries()) {
		const page = table.prov?.[0]?.page_no;
		if (!Number.isInteger(page)) continue;
		const cellTexts = (table.data?.table_cells ?? [])
			.map((cell) => String(cell.text ?? '').trim())
			.filter(isPageAnchorCandidate);
		for (const text of cellTexts.slice(0, 12)) {
			items.push({
				index: `table-${index}`,
				page,
				text,
				anchor: anchorText(text)
			});
		}
	}

	const pages = Object.keys(doclingJson.pages ?? {})
		.map(Number)
		.filter(Number.isInteger)
		.sort((a, b) => a - b);

	const byPage = new Map();
	for (const item of items) {
		if (!byPage.has(item.page)) byPage.set(item.page, []);
		byPage.get(item.page).push(item);
	}

	return {
		source: 'docling-json',
		pageCount: pages.length,
		pages: pages.map((page) => ({
			page,
			candidates: (byPage.get(page) ?? []).slice(0, 12)
		}))
	};
}

async function readJsonPageIndex() {
	const jsonFile = await findLargestJsonFile();
	if (!jsonFile) return null;
	const doclingJson = JSON.parse(await readFile(jsonFile, 'utf8'));
	return {
		jsonFile,
		...buildJsonPageIndex(doclingJson)
	};
}

function insertJsonPageMarkers(lines, jsonPageIndex) {
	if (!jsonPageIndex) {
		return { lines, pageMarkers: [], insertedPages: [], missedPages: [], source: 'none' };
	}

	const lineAnchors = lines.map((line) => anchorText(line));
	const insertions = new Map();
	const insertedPages = [];
	const missedPages = [];
	let searchStart = 0;

	for (const pageInfo of jsonPageIndex.pages) {
		if (pageInfo.page === 1) {
			insertions.set(0, [...(insertions.get(0) ?? []), pageInfo.page]);
			insertedPages.push(pageInfo.page);
			continue;
		}

		let matchedIndex = -1;
		for (const candidate of pageInfo.candidates) {
			if (!candidate.anchor) continue;
			const candidateShort = candidate.anchor.slice(0, 80);
			for (let index = searchStart; index < lineAnchors.length; index += 1) {
				const lineAnchor = lineAnchors[index];
				if (!lineAnchor) continue;
				if (lineAnchor.includes(candidateShort) || candidate.anchor.includes(lineAnchor)) {
					matchedIndex = index;
					break;
				}
			}
			if (matchedIndex >= 0) break;
		}

		if (matchedIndex >= 0) {
			let insertionIndex = matchedIndex;
			while (insertionIndex > 0 && isTableLine(lines[insertionIndex - 1])) {
				insertionIndex -= 1;
			}
			insertions.set(insertionIndex, [...(insertions.get(insertionIndex) ?? []), pageInfo.page]);
			insertedPages.push(pageInfo.page);
			searchStart = matchedIndex;
		} else {
			missedPages.push(pageInfo.page);
		}
	}

	const markedLines = [];
	for (let index = 0; index < lines.length; index += 1) {
		for (const page of insertions.get(index) ?? []) {
			markedLines.push(`<!-- page: ${page} -->`);
		}
		markedLines.push(lines[index]);
	}

	return {
		lines: markedLines,
		pageMarkers: insertedPages,
		insertedPages,
		missedPages,
		source: 'docling-json'
	};
}

function removeRepeatedHeadersAndFooters(lines) {
	const counts = new Map();
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || isTableLine(trimmed) || trimmed.startsWith('#')) continue;
		counts.set(trimmed, (counts.get(trimmed) ?? 0) + 1);
	}

	const removed = new Map();
	const kept = lines.filter((line) => {
		const trimmed = line.trim();
		const count = counts.get(trimmed) ?? 0;
		const shouldRemove = isRepeatedHeaderFooterCandidate(trimmed, count);
		if (shouldRemove) removed.set(trimmed, count);
		return !shouldRemove;
	});

	return { lines: kept, removed };
}

function normalizePageMarkers(lines) {
	let nextSyntheticPage = 1;
	let sawExplicitPageMarker = false;
	const pageMarkers = [];

	const normalized = lines.map((line) => {
		const trimmed = line.trim();
		const htmlPage = trimmed.match(/^<!--\s*page\s*:?\s*(\d+)\s*-->$/i);
		if (htmlPage) {
			const page = Number(htmlPage[1]);
			sawExplicitPageMarker = true;
			pageMarkers.push(page);
			return `<!-- page: ${page} -->`;
		}

		if (trimmed === '<!-- page-break -->') {
			const page = nextSyntheticPage++;
			pageMarkers.push(page);
			return `<!-- page: ${page} -->`;
		}

		return line;
	});

	return { lines: normalized, pageMarkers, sawExplicitPageMarker };
}

function normalizeLists(lines) {
	return lines.map((line) => {
		if (isTableLine(line)) return line.trim();
		const bullet = line.match(/^(\s*)[•●▪]\s+(.*)$/);
		if (bullet) return `${bullet[1]}- ${bullet[2].trim()}`;
		const spacedBullet = line.match(/^(\s*)-\s{2,}(.*)$/);
		if (spacedBullet) return `${spacedBullet[1]}- ${spacedBullet[2].trim()}`;
		return line;
	});
}

function removeTableOfContents(lines) {
	const start = lines.findIndex((line, index) => {
		if (line.trim() === '<!-- page: 4 -->') return true;
		return index > 0 && /^\|\s*Contents\s*\|/.test(line);
	});
	if (start < 0) return { lines, removed: { lines: 0, pages: [] } };

	const end = lines.findIndex((line, index) => {
		if (index <= start) return false;
		return line.trim() === '<!-- page: 9 -->' || /^## CHAPTER 1\b/i.test(line.trim());
	});
	if (end < 0) return { lines, removed: { lines: 0, pages: [] } };

	const removedBlock = lines.slice(start, end);
	const pages = [
		...new Set(
			removedBlock
				.map((line) => line.match(/^<!-- page: (\d+) -->$/)?.[1])
				.filter(Boolean)
				.map(Number)
		)
	];
	return {
		lines: [...lines.slice(0, start), ...lines.slice(end)],
		removed: { lines: removedBlock.length, pages }
	};
}

function removeUrls(line) {
	return line
		.replace(/https?:\/\/\s*[A-Za-z0-9-]+(?:\s*\.\s*[A-Za-z0-9-]+)+(?:\/[^\s)]*)?/gi, '')
		.replace(/\b[A-Za-z0-9-]+(?:\s*\.\s*[A-Za-z0-9-]+)+\/[^\s)]*/g, '')
		.replace(/\(\s*\)/g, '')
		.replace(/[ \t]{2,}/g, ' ')
		.trimEnd();
}

function normalizePunctuationSpacing(line) {
	if (isTableLine(line) || /^<!-- page: \d+ -->$/.test(line.trim())) return line;
	return line
		.replace(/\s+([,.;:!?])/g, '$1')
		.replace(/([([{])\s+/g, '$1')
		.replace(/\s+([)\]}])/g, '$1')
		.replace(/\b([A-Za-z])\s+'\s+s\b/g, "$1's")
		.replace(/\b([A-Za-z])\s+'\s+t\b/g, "$1't")
		.replace(/\b([A-Za-z])\s+'\s+re\b/g, "$1're")
		.replace(/\b([A-Za-z])\s+'\s+ve\b/g, "$1've")
		.replace(/\b([A-Za-z])\s+'\s+ll\b/g, "$1'll")
		.replace(/\b([A-Za-z])\s+'\s+d\b/g, "$1'd")
		.replace(/[ \t]{2,}/g, ' ')
		.trimEnd();
}

function removeMarkdownEscapes(line) {
	return line.replace(/\\[_*[\]`]/g, '');
}

function cleanTextArtifacts(lines) {
	const removed = {
		urls: 0,
		markdownEscapes: 0,
		htmlEntities: 0,
		punctuationSpacingCandidates: 0
	};
	const cleaned = lines.map((line) => {
		const entityCount = (line.match(/&(amp|lt|gt|quot|#39);/g) ?? []).length;
		const urlCount =
			(line.match(/https?:\/\/\s*[A-Za-z0-9-]+(?:\s*\.\s*[A-Za-z0-9-]+)+(?:\/[^\s)]*)?/gi) ?? [])
				.length + (line.match(/\b[A-Za-z0-9-]+(?:\s*\.\s*[A-Za-z0-9-]+)+\/[^\s)]*/g) ?? []).length;
		const escapeCount = (line.match(/\\[_*[\]`]/g) ?? []).length;
		const punctuationCount = (
			line.match(/\s+[,.;:!?]|\b[A-Za-z]\s+'\s+(?:s|t|re|ve|ll|d)\b/g) ?? []
		).length;
		removed.htmlEntities += entityCount;
		removed.urls += urlCount;
		removed.markdownEscapes += escapeCount;
		removed.punctuationSpacingCandidates += punctuationCount;
		return normalizePunctuationSpacing(
			removeMarkdownEscapes(removeUrls(decodeCommonEntities(line)))
		);
	});
	return { lines: cleaned, removed };
}

function removeEmptyPageMarkers(lines) {
	const removedPages = [];
	const kept = [];
	for (let index = 0; index < lines.length; index += 1) {
		const pageMatch = lines[index].match(/^<!-- page: (\d+) -->$/);
		if (!pageMatch) {
			kept.push(lines[index]);
			continue;
		}

		let next = index + 1;
		while (next < lines.length && !/^<!-- page: \d+ -->$/.test(lines[next])) next += 1;
		const between = lines.slice(index + 1, next);
		const hasContent = between.some((line) => line.trim() !== '');
		if (!hasContent) {
			removedPages.push(Number(pageMatch[1]));
			continue;
		}
		kept.push(lines[index]);
	}
	return { lines: kept, removedPages };
}

function removeLayoutPlaceholders(lines, pageCount) {
	const removed = {
		imagePlaceholders: 0,
		standalonePageNumbers: 0
	};
	const cleaned = lines.filter((line) => {
		const trimmed = line.trim();
		if (trimmed === '<!-- image -->') {
			removed.imagePlaceholders += 1;
			return false;
		}
		if (/^\d{1,3}$/.test(trimmed)) {
			const pageNumber = Number(trimmed);
			if (pageNumber > 0 && (!pageCount || pageNumber <= pageCount)) {
				removed.standalonePageNumbers += 1;
				return false;
			}
		}
		return true;
	});
	return { lines: cleaned, removed };
}

function collapseBlankLines(text) {
	return text.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function countTerms(text) {
	const counts = {};
	for (const term of KEY_TERMS) {
		const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		counts[term] = (text.match(new RegExp(`\\b${escaped}\\b`, 'gi')) ?? []).length;
	}
	return counts;
}

function stripPageMarkers(text) {
	return text.replace(/^<!-- page: \d+ -->\n?/gm, '');
}

function countNumbers(text) {
	return (stripPageMarkers(text).match(/\b\d+(?:\.\d+)?\b/g) ?? []).length;
}

function countTables(text) {
	const lines = text.split('\n');
	let count = 0;
	let inTable = false;
	for (const line of lines) {
		if (isTableLine(line)) {
			if (!inTable) count += 1;
			inTable = true;
		} else {
			inTable = false;
		}
	}
	return count;
}

function headingLevel(line) {
	const match = line.match(/^(#{1,6})\s+/);
	return match ? match[1].length : 0;
}

function slugify(value) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 80);
}

function createChunks(cleanText) {
	const lines = cleanText.split('\n');
	const chunks = [];
	let current = null;
	let currentPage = null;

	const finishChunk = (endLine) => {
		if (!current) return;
		current.endLine = endLine;
		current.text = current.lines.join('\n').trim();
		current.charCount = current.text.length;
		current.tokenEstimate = Math.ceil(current.charCount / 4);
		current.headingCount = (current.text.match(/^#{1,6}\s+/gm) ?? []).length;
		current.tableCount = countTables(current.text);
		current.numericTokenCount = countNumbers(current.text);
		current.termCounts = countTerms(current.text);
		current.needsHumanReview = current.tableCount > 0 || current.tokenEstimate > 5000;
		current.reviewReasons = [];
		if (current.tableCount > 0) current.reviewReasons.push('contains table');
		if (current.tokenEstimate > 5000) current.reviewReasons.push('large chunk');
		delete current.lines;
		chunks.push(current);
		current = null;
	};

	for (let index = 0; index < lines.length; index += 1) {
		const line = lines[index];
		const pageMatch = line.match(/^<!-- page: (\d+) -->$/);
		if (pageMatch) currentPage = Number(pageMatch[1]);

		const level = headingLevel(line);
		if (level > 0 && level <= 3) {
			finishChunk(index);
			const heading = line.replace(/^#{1,6}\s+/, '').trim();
			current = {
				chunkId: `dc20-105-${String(chunks.length + 1).padStart(4, '0')}`,
				heading,
				anchor: slugify(heading),
				startLine: index + 1,
				endLine: index + 1,
				startPage: currentPage,
				endPage: currentPage,
				lines: [line]
			};
			continue;
		}

		if (!current) {
			current = {
				chunkId: `dc20-105-${String(chunks.length + 1).padStart(4, '0')}`,
				heading: 'Front Matter',
				anchor: 'front-matter',
				startLine: index + 1,
				endLine: index + 1,
				startPage: currentPage,
				endPage: currentPage,
				lines: []
			};
		}

		if (currentPage != null) current.endPage = currentPage;
		current.lines.push(line);
	}

	finishChunk(lines.length);
	return chunks.filter((chunk) => chunk.text.length > 0);
}

function pageContinuity(pageMarkers) {
	if (pageMarkers.length === 0) {
		return { status: 'missing', gaps: [], duplicates: [] };
	}

	const gaps = [];
	const duplicates = [];
	const seen = new Set();
	for (const page of pageMarkers) {
		if (seen.has(page)) duplicates.push(page);
		seen.add(page);
	}
	for (let page = Math.min(...pageMarkers); page <= Math.max(...pageMarkers); page += 1) {
		if (!seen.has(page)) gaps.push(page);
	}
	return { status: gaps.length === 0 ? 'continuous' : 'gaps', gaps, duplicates };
}

function buildReport({
	sourceFile,
	rawText,
	cleanText,
	removed,
	pageMarkers,
	sawExplicitPageMarker,
	pageMarkerSource,
	missedPages,
	jsonPageIndex,
	layoutRemoved,
	tocRemoved,
	textArtifactsRemoved,
	emptyPageMarkersRemoved,
	chunks
}) {
	const rawMetrics = {
		lines: rawText.split('\n').length,
		headings: (rawText.match(/^#{1,6}\s+/gm) ?? []).length,
		tables: countTables(rawText),
		numericTokens: countNumbers(rawText),
		terms: countTerms(rawText)
	};
	const cleanMetrics = {
		lines: cleanText.split('\n').length,
		headings: (cleanText.match(/^#{1,6}\s+/gm) ?? []).length,
		tables: countTables(cleanText),
		numericTokens: countNumbers(cleanText),
		terms: countTerms(cleanText)
	};
	const continuity = pageContinuity(pageMarkers);
	const reviewChunks = chunks.filter((chunk) => chunk.needsHumanReview);

	const removedRows = [...removed.entries()]
		.slice(0, 40)
		.map(([line, count]) => `| \`${line.replaceAll('|', '\\|')}\` | ${count} |`)
		.join('\n');

	return `# DC20 0.10.5 Markdown Cleanup Report

Generated by \`scripts/dc20-105-clean-md.mjs\`.

## Source

- Raw Markdown source: \`${path.relative(ROOT, sourceFile)}\`
- Clean Markdown: \`docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md\`
- Chunks: \`docs/assets/dc20-0.10.5/chunks.json\`
- Page index: \`docs/assets/dc20-0.10.5/page-index.json\`

## Validation Metrics

| Metric | Raw | Clean |
| --- | ---: | ---: |
| Lines | ${rawMetrics.lines} | ${cleanMetrics.lines} |
| Markdown headings | ${rawMetrics.headings} | ${cleanMetrics.headings} |
| Table blocks | ${rawMetrics.tables} | ${cleanMetrics.tables} |
| Numeric tokens | ${rawMetrics.numericTokens} | ${cleanMetrics.numericTokens} |

## Key Term Counts

| Term | Raw | Clean |
| --- | ---: | ---: |
${KEY_TERMS.map((term) => `| ${term} | ${rawMetrics.terms[term]} | ${cleanMetrics.terms[term]} |`).join('\n')}

## Page Markers

- Explicit page markers found: ${sawExplicitPageMarker ? 'yes' : 'no'}
- Page marker source: ${pageMarkerSource}
- Normalized page markers: ${pageMarkers.length}
- Docling JSON pages: ${jsonPageIndex?.pageCount ?? 0}
- Continuity status: ${continuity.status}
- Gaps: ${continuity.gaps.length > 0 ? continuity.gaps.join(', ') : 'none'}
- Duplicates: ${continuity.duplicates.length > 0 ? continuity.duplicates.join(', ') : 'none'}
- Pages not anchored into Markdown: ${missedPages.length > 0 ? missedPages.join(', ') : 'none'}
- Empty page markers removed: ${emptyPageMarkersRemoved.length > 0 ? emptyPageMarkersRemoved.join(', ') : 'none'}

## Repeated Header/Footer Lines Removed

${removedRows ? `| Removed line | Occurrences |\n| --- | ---: |\n${removedRows}` : 'No repeated header/footer candidates were removed.'}

## Layout Placeholders Removed

- Image placeholders: ${layoutRemoved.imagePlaceholders}
- Standalone page-number lines: ${layoutRemoved.standalonePageNumbers}

## Table Of Contents Removed

- Lines removed: ${tocRemoved.lines}
- Page markers removed with TOC: ${tocRemoved.pages.length > 0 ? tocRemoved.pages.join(', ') : 'none'}

## Text Artifacts Removed Or Normalized

- HTML entities decoded: ${textArtifactsRemoved.htmlEntities}
- URLs removed: ${textArtifactsRemoved.urls}
- Markdown escape artifacts removed: ${textArtifactsRemoved.markdownEscapes}
- Punctuation spacing candidates normalized: ${textArtifactsRemoved.punctuationSpacingCandidates}

## Human Review Queue

${
	reviewChunks.length === 0
		? 'No chunks were automatically flagged.'
		: reviewChunks
				.map(
					(chunk) =>
						`- \`${chunk.chunkId}\` ${chunk.heading} (${chunk.reviewReasons.join(', ') || 'review requested'})`
				)
				.join('\n')
}

## Notes

- The deterministic cleanup intentionally avoids semantic rewriting.
- Page markers recovered from Docling JSON are best-effort anchors into the Markdown text stream; use the source PDF during HITL review for exact layout/page confirmation.
- Run \`scripts/dc20-105-ollama-cleanup.mjs\` for local-model review suggestions on flagged chunks.
`;
}

async function main() {
	await mkdir(ASSET_DIR, { recursive: true });
	const sourceFile = await findLargestMarkdownFile();
	const rawText = normalizeLineEndings(await readFile(sourceFile, 'utf8'));
	let lines = rawText.split('\n').map(normalizeHeading);
	const repeated = removeRepeatedHeadersAndFooters(lines);
	lines = normalizeLists(repeated.lines);
	const pages = normalizePageMarkers(lines);
	const jsonPageIndex = await readJsonPageIndex();
	const jsonMarkers =
		pages.pageMarkers.length === 0 ? insertJsonPageMarkers(pages.lines, jsonPageIndex) : null;
	let pageMarkedLines = jsonMarkers ? jsonMarkers.lines : pages.lines;
	const allPageMarkers = jsonMarkers ? jsonMarkers.pageMarkers : pages.pageMarkers;
	const layoutCleanup = removeLayoutPlaceholders(pageMarkedLines, jsonPageIndex?.pageCount);
	pageMarkedLines = layoutCleanup.lines;
	const tocCleanup = removeTableOfContents(pageMarkedLines);
	pageMarkedLines = tocCleanup.lines;
	const textArtifactCleanup = cleanTextArtifacts(pageMarkedLines);
	pageMarkedLines = textArtifactCleanup.lines;
	const emptyPageCleanup = removeEmptyPageMarkers(pageMarkedLines);
	pageMarkedLines = emptyPageCleanup.lines;
	const pageMarkers = allPageMarkers.filter(
		(page) =>
			!tocCleanup.removed.pages.includes(page) && !emptyPageCleanup.removedPages.includes(page)
	);
	const cleanText = collapseBlankLines(pageMarkedLines.join('\n'));
	const chunks = createChunks(cleanText);

	await writeFile(CLEAN_MD, cleanText, 'utf8');
	await writeFile(CHUNKS_JSON, JSON.stringify(chunks, null, 2) + '\n', 'utf8');
	await writeFile(
		PAGE_INDEX_JSON,
		JSON.stringify(jsonPageIndex ?? { source: 'none', pages: [] }, null, 2) + '\n',
		'utf8'
	);
	await writeFile(
		CLEANUP_REPORT,
		buildReport({
			sourceFile,
			rawText,
			cleanText,
			removed: repeated.removed,
			pageMarkers,
			sawExplicitPageMarker: pages.sawExplicitPageMarker,
			pageMarkerSource: jsonMarkers?.source ?? (pages.pageMarkers.length > 0 ? 'markdown' : 'none'),
			missedPages: jsonMarkers?.missedPages ?? [],
			jsonPageIndex,
			layoutRemoved: layoutCleanup.removed,
			tocRemoved: tocCleanup.removed,
			textArtifactsRemoved: textArtifactCleanup.removed,
			emptyPageMarkersRemoved: emptyPageCleanup.removedPages,
			chunks
		}),
		'utf8'
	);

	console.log(`Clean Markdown written to ${path.relative(ROOT, CLEAN_MD)}`);
	console.log(`Chunks written to ${path.relative(ROOT, CHUNKS_JSON)} (${chunks.length} chunks)`);
	console.log(`Cleanup report written to ${path.relative(ROOT, CLEANUP_REPORT)}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
