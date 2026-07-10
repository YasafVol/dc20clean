import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const INGESTION_DIR = path.join(ROOT, 'docs/assets/dc20-0.10.5/marker-ingestion');
const INPUT_PATH = path.join(INGESTION_DIR, 'DC20 RPG 0.10.5 Beta v1.md');
const OUTPUT_PATH = path.join(INGESTION_DIR, 'DC20 RPG 0.10.5 Beta v1.cleaned.md');
const REPORT_PATH = path.join(INGESTION_DIR, 'marker-cleanup-report.json');

const source = fs.readFileSync(INPUT_PATH, 'utf8');
const sourceLines = source.split(/\r?\n/);

const tocStartIndex = sourceLines.findIndex((line) => /^#### \*\*Contents\b/.test(line));
const contentStartIndex = sourceLines.findIndex(
	(line) => line.includes('id="page-8-0"') && /CHAPTER 1/.test(line)
);

if (tocStartIndex === -1) {
	throw new Error('Could not find Marker TOC start.');
}

if (contentStartIndex === -1 || contentStartIndex <= tocStartIndex) {
	throw new Error('Could not find post-TOC rule content start.');
}

let pageAnchorCount = 0;
let removedReplacementGlyphs = 0;
let htmlBreakCount = 0;
let supTagCount = 0;

const cleaned = [];

const normalizeInline = (value) => {
	let line = value;

	const replacementGlyphMatches = line.match(/�+/g);
	if (replacementGlyphMatches) {
		removedReplacementGlyphs += replacementGlyphMatches.join('').length;
		line = line.replace(/�+/g, '');
	}

	const htmlBreakMatches = line.match(/<br\s*\/?>/gi);
	if (htmlBreakMatches) {
		htmlBreakCount += htmlBreakMatches.length;
		line = line.replace(/<br\s*\/?>/gi, ' ');
	}

	const supMatches = line.match(/<\/?sup>/gi);
	if (supMatches) {
		supTagCount += supMatches.length;
		line = line.replace(/<\/?sup>/gi, '');
	}

	line = line.replace(
		/\[\\\(https:\/\/dc20ttrpg\.\]\(https:\/\/dc20ttrpg\.backerkit\.com\/hosted_preorders\) \[backerkit\.com\/hosted\\\\_preorders\]\(https:\/\/dc20ttrpg\.backerkit\.com\/hosted_preorders\)\)/g,
		'<https://dc20ttrpg.backerkit.com/hosted_preorders>'
	);
	line = line.replace(
		/\[https:\/\/\]\(https:\/\/thedungeoncoach\.com\/pages\/dc20-free-downloads\) \[thedungeoncoach\.com\/pages\/dc20-free-downloads\]\(https:\/\/thedungeoncoach\.com\/pages\/dc20-free-downloads\)/g,
		'<https://thedungeoncoach.com/pages/dc20-free-downloads>'
	);
	line = line.replace(/then<https:\/\//g, 'then <https://');
	line = line.replace(/\*\*Ar\*\*\*senal\*/g, '*Arsenal*');
	line = line.replace(/[ \t]+$/g, '');
	line = line.replace(/[ \t]{2,}/g, ' ');

	return line;
};

const stripHeadingEmphasis = (value) => {
	const heading = value.match(/^(#{1,6})\s+(.*)$/);
	if (!heading) return value;

	let text = heading[2].trim();
	text = text.replace(/^\*\*(.*)\*\*$/g, '$1');
	text = text.replace(/\*\*/g, '');

	return `${heading[1]} ${text}`;
};

const extractPageAnchors = (value) => {
	const anchors = [];
	const withoutAnchors = value.replace(/<span id="(page-\d+-\d+)"><\/span>/g, (_match, anchor) => {
		anchors.push(anchor);
		return '';
	});

	return { anchors, withoutAnchors };
};

for (let index = 0; index < sourceLines.length; index += 1) {
	if (index >= tocStartIndex && index < contentStartIndex) continue;

	const sourceLine = sourceLines[index];
	const { anchors, withoutAnchors } = extractPageAnchors(sourceLine);
	pageAnchorCount += anchors.length;

	if (anchors.length > 0) {
		cleaned.push(`<!-- source anchors: ${anchors.join(', ')} -->`);
	}

	const normalized = stripHeadingEmphasis(normalizeInline(withoutAnchors));
	cleaned.push(normalized);
}

const output = `${cleaned
	.join('\n')
	.replace(/\n{3,}/g, '\n\n')
	.trim()}\n`;
fs.writeFileSync(OUTPUT_PATH, output);

const outputLines = output.split(/\r?\n/);
const headingCounts = {};
for (const line of outputLines) {
	const match = line.match(/^(#{1,6})\s+/);
	if (!match) continue;
	headingCounts[match[1].length] = (headingCounts[match[1].length] ?? 0) + 1;
}

const report = {
	inputPath: path.relative(ROOT, INPUT_PATH),
	outputPath: path.relative(ROOT, OUTPUT_PATH),
	rawLines: sourceLines.length,
	cleanedLines: outputLines.length,
	removedTocLines: contentStartIndex - tocStartIndex,
	preservedPageAnchors: pageAnchorCount,
	removedReplacementGlyphs,
	normalizedHtmlBreaks: htmlBreakCount,
	removedSupTags: supTagCount,
	headingCounts,
	notes: [
		'Raw Marker output is preserved unchanged.',
		'The extracted visual table-of-contents block was removed from the cleaned Markdown.',
		'Page span HTML was converted into Markdown comments so source anchors are preserved without polluting rendered text.',
		'Heading depth is not corrected here; use the visual TOC draft and later hierarchy manifest for that.'
	]
};

fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);

console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)}`);
console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
