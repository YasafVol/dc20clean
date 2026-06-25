#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const ASSET_DIR = path.join(ROOT, 'docs/assets/dc20-0.10.5');
const CLEAN_MD = path.join(ASSET_DIR, 'DC20 0.10.5 clean.md');
const CHUNKS_JSON = path.join(ASSET_DIR, 'chunks.json');
const REVIEW_JSON = path.join(ASSET_DIR, 'ollama-cleanup-review.json');
const CLEANUP_REPORT = path.join(ASSET_DIR, 'CLEANUP_REPORT.md');

const MODEL = process.env.OLLAMA_MODEL || 'llama3.2';
const MIN_CONFIDENCE = Number(process.env.OLLAMA_MIN_CONFIDENCE || '0.85');
const APPLY = process.argv.includes('--apply');
const REVIEW_ALL = process.argv.includes('--all');
const LIMIT = Number(process.env.OLLAMA_CHUNK_LIMIT || '0');

function numericSignature(text) {
	return (text.match(/\b\d+(?:\.\d+)?\b/g) ?? []).join('|');
}

function headingSignature(text) {
	return (text.match(/^#{1,6}\s+.+$/gm) ?? []).join('|');
}

function pageSignature(text) {
	return (text.match(/^<!-- page: \d+ -->$/gm) ?? []).join('|');
}

function stripCodeFence(value) {
	return value
		.replace(/^```json\s*/i, '')
		.replace(/^```\s*/i, '')
		.replace(/\s*```$/i, '')
		.trim();
}

function parseJsonResponse(content) {
	const stripped = stripCodeFence(content);
	try {
		return JSON.parse(stripped);
	} catch {
		const match = stripped.match(/\{[\s\S]*\}/);
		if (!match) throw new Error('Ollama response did not contain JSON');
		return JSON.parse(match[0]);
	}
}

function validateRewrite(original, cleaned, result) {
	const issues = [];
	if (numericSignature(original) !== numericSignature(cleaned)) {
		issues.push('numeric signature changed');
	}
	if (headingSignature(original) !== headingSignature(cleaned)) {
		issues.push('heading signature changed');
	}
	if (pageSignature(original) !== pageSignature(cleaned)) {
		issues.push('page marker signature changed');
	}
	if (typeof result.confidence !== 'number' || result.confidence < MIN_CONFIDENCE) {
		issues.push(`confidence below ${MIN_CONFIDENCE}`);
	}
	if (result.needs_human_review === true) {
		issues.push('model requested human review');
	}
	return issues;
}

function buildPrompt(chunk) {
	return `You are cleaning PDF-converted Markdown for a tabletop RPG rules reference.

Rules:
- Do not summarize.
- Do not rewrite rules.
- Do not change numbers, formulas, names, costs, page markers, table values, or headings.
- Only fix Markdown structure: broken line wraps, obvious list/table formatting, repeated headers/footers.
- If uncertain, preserve the original and set needs_human_review=true.
- Return valid JSON only.

JSON:
{
  "cleaned_markdown": "...",
  "issues_found": ["..."],
  "needs_human_review": false,
  "confidence": 0.0
}

Chunk ID: ${chunk.chunkId}
Heading: ${chunk.heading}

Markdown:
${chunk.text}`;
}

async function callOllama(prompt) {
	const response = await fetch('http://127.0.0.1:11434/api/chat', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			model: MODEL,
			stream: false,
			messages: [{ role: 'user', content: prompt }]
		})
	});
	if (!response.ok) {
		throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`);
	}
	const data = await response.json();
	return data?.message?.content ?? '';
}

function replaceChunkText(cleanText, chunk, replacement) {
	const lines = cleanText.split('\n');
	const before = lines.slice(0, chunk.startLine - 1);
	const after = lines.slice(chunk.endLine);
	return [...before, ...replacement.trim().split('\n'), ...after].join('\n').trim() + '\n';
}

function buildReportAppend(reviewRecords) {
	const rejected = reviewRecords.filter((record) => record.validationIssues.length > 0);
	const accepted = reviewRecords.filter((record) => record.validationIssues.length === 0);
	return `
## Ollama Cleanup Review

- Model: \`${MODEL}\`
- Apply mode: ${APPLY ? 'yes' : 'no'}
- Reviewed chunks: ${reviewRecords.length}
- Accepted suggestions: ${accepted.length}
- Rejected or HITL suggestions: ${rejected.length}

${reviewRecords
	.map((record) => {
		const status = record.validationIssues.length === 0 ? 'accepted' : 'needs HITL';
		const issues =
			record.validationIssues.length === 0 ? 'none' : record.validationIssues.join('; ');
		return `- \`${record.chunkId}\` ${status}: ${issues}`;
	})
	.join('\n')}
`;
}

async function main() {
	const chunks = JSON.parse(await readFile(CHUNKS_JSON, 'utf8'));
	let cleanText = await readFile(CLEAN_MD, 'utf8');
	let queue = REVIEW_ALL ? chunks : chunks.filter((chunk) => chunk.needsHumanReview);
	if (LIMIT > 0) queue = queue.slice(0, LIMIT);

	const reviewRecords = [];
	for (const chunk of queue) {
		console.log(`Reviewing ${chunk.chunkId}: ${chunk.heading}`);
		try {
			const content = await callOllama(buildPrompt(chunk));
			const result = parseJsonResponse(content);
			const cleaned = String(result.cleaned_markdown ?? chunk.text);
			const validationIssues = validateRewrite(chunk.text, cleaned, result);
			if (APPLY && validationIssues.length === 0) {
				cleanText = replaceChunkText(cleanText, chunk, cleaned);
			}
			reviewRecords.push({
				chunkId: chunk.chunkId,
				heading: chunk.heading,
				issuesFound: Array.isArray(result.issues_found) ? result.issues_found : [],
				needsHumanReview: result.needs_human_review === true,
				confidence: result.confidence,
				validationIssues,
				applied: APPLY && validationIssues.length === 0
			});
		} catch (error) {
			reviewRecords.push({
				chunkId: chunk.chunkId,
				heading: chunk.heading,
				issuesFound: [],
				needsHumanReview: true,
				confidence: 0,
				validationIssues: [error instanceof Error ? error.message : String(error)],
				applied: false
			});
		}
	}

	if (APPLY) await writeFile(CLEAN_MD, cleanText, 'utf8');
	await writeFile(REVIEW_JSON, JSON.stringify(reviewRecords, null, 2) + '\n', 'utf8');
	const report = await readFile(CLEANUP_REPORT, 'utf8');
	await writeFile(CLEANUP_REPORT, report + buildReportAppend(reviewRecords), 'utf8');
	console.log(`Ollama cleanup review written to ${path.relative(ROOT, REVIEW_JSON)}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
