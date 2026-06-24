#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DEFAULT_SOURCE_REPORT = resolve(ROOT, 'docs/migration/classes-v0105-report.json');
const DEFAULT_EFFECT_REPORT = resolve(
	ROOT,
	'docs/migration/class-feature-effect-classification.json'
);
const DEFAULT_MARKDOWN_REPORT = resolve(ROOT, 'docs/migration/class-feature-audit.md');

function readJson(path) {
	return JSON.parse(readFileSync(path, 'utf8'));
}

function md(value) {
	return String(value ?? '')
		.replace(/\|/g, '\\|')
		.replace(/\n/g, '<br/>');
}

function formatValue(value) {
	if (value === null || value === undefined) return '';
	if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
		return String(value);
	}
	return JSON.stringify(value);
}

function statusSummary(byStatus = {}) {
	return Object.entries(byStatus)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([status, count]) => `${status}: ${count}`)
		.join(', ');
}

function compareClassFeature(left, right) {
	return (
		left.className.localeCompare(right.className) ||
		(left.subclassName ?? '').localeCompare(right.subclassName ?? '') ||
		(left.levelGained ?? 0) - (right.levelGained ?? 0) ||
		(left.featureName ?? '').localeCompare(right.featureName ?? '')
	);
}

function renderSelection(selection) {
	const options = selection.options
		.map((option) => {
			const effectTypes = option.effectTypes.length ? ` (${option.effectTypes.join(', ')})` : '';
			return `${option.name}${effectTypes}`;
		})
		.join('; ');
	return `- ${selection.prompt} [count: ${selection.count ?? 'n/a'}] -> ${options || 'no options'}`;
}

function renderFeature(feature) {
	const lines = [];
	const heading =
		feature.featureKind === 'subclass'
			? `### ${feature.className} / ${feature.subclassName} / ${feature.featureName}`
			: `### ${feature.className} / ${feature.featureName}`;

	lines.push(heading);
	lines.push('');
	lines.push(
		`Level ${feature.levelGained}; ${feature.featureKind}; status ${feature.implementationStatus}; score ${feature.implementationScore}; selections ${feature.selectionCount}; effects ${feature.effectCount}.`
	);
	lines.push('');

	if (feature.selections.length) {
		lines.push('Selections:');
		lines.push('');
		lines.push(...feature.selections.map(renderSelection));
		lines.push('');
	} else {
		lines.push('Selections: none.');
		lines.push('');
	}

	if (feature.duplicateAlwaysOnEffects.length) {
		lines.push('Duplicate always-on effects:');
		lines.push('');
		for (const duplicate of feature.duplicateAlwaysOnEffects) {
			const locations = duplicate.occurrences
				.map((occurrence) => `${occurrence.scope}:${occurrence.label}`)
				.join(', ');
			lines.push(`- ${formatValue(duplicate.signature)} -> ${locations}`);
		}
		lines.push('');
	}

	if (feature.effects.length) {
		lines.push('| Scope | Label | Type | Target | Value | Coverage | Path | Confidence |');
		lines.push('| --- | --- | --- | --- | --- | --- | --- | --- |');
		for (const effect of feature.effects) {
			lines.push(
				`| ${md(effect.scope)} | ${md(effect.label)} | ${md(effect.type)} | ${md(
					effect.target
				)} | ${md(formatValue(effect.value))} | ${md(effect.calculationStatus)} | ${md(
					effect.calculationPath
				)} | ${effect.confidence} |`
			);
		}
		lines.push('');
	} else {
		lines.push('Effects: none.');
		lines.push('');
	}

	return lines.join('\n');
}

function createMarkdown(sourceReport, effectReport) {
	const lines = [];
	lines.push('# DC20 v0.10.5 Class Feature Audit');
	lines.push('');
	lines.push('Generated from runtime class feature data and v0.10.5 source audit JSON.');
	lines.push('');
	lines.push('## Summary');
	lines.push('');
	lines.push(`- Rules version: ${effectReport.rulesVersion}`);
	lines.push(`- Classes: ${effectReport.classCount}`);
	lines.push(`- Features: ${effectReport.featureCount}`);
	lines.push(`- Core features: ${effectReport.coreFeatureCount}`);
	lines.push(`- Subclass features: ${effectReport.subclassFeatureCount}`);
	lines.push(`- Selections: ${effectReport.selectionCount}`);
	lines.push(`- Duplicate always-on effects: ${effectReport.duplicateAlwaysOnEffectCount}`);
	lines.push(`- Source detailed class chapters: ${sourceReport.detailedClassCount}`);
	lines.push(`- Source findings: ${sourceReport.findings.length}`);
	lines.push(`- Coverage: ${statusSummary(effectReport.byStatus)}`);
	lines.push('');

	if (sourceReport.findings.length) {
		lines.push('## Source Findings');
		lines.push('');
		for (const finding of sourceReport.findings) {
			lines.push(`- ${finding.severity}: ${finding.className}: ${finding.message}`);
		}
		lines.push('');
	}

	if (effectReport.featuresWithDuplicateAlwaysOnEffects.length) {
		lines.push('## Duplicate Always-On Effects');
		lines.push('');
		for (const feature of effectReport.featuresWithDuplicateAlwaysOnEffects) {
			const path = [feature.className, feature.subclassName, feature.featureName]
				.filter(Boolean)
				.join(' / ');
			lines.push(`- ${path}: ${feature.duplicateAlwaysOnEffectCount}`);
		}
		lines.push('');
	}

	lines.push('## Class Index');
	lines.push('');
	lines.push(
		'| Class | Category | Core Features | Subclasses | Subclass Features | Selections | Duplicate Effects | Effects | Coverage |'
	);
	lines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- |');
	const classSummaries = [...effectReport.classSummaries].sort((left, right) =>
		left.className.localeCompare(right.className)
	);

	for (const summary of classSummaries) {
		lines.push(
			`| ${md(summary.className)} | ${md(summary.classCategory)} | ${summary.coreFeatureCount} | ${
				summary.subclassCount
			} | ${summary.subclassFeatureCount} | ${summary.selectionCount} | ${
				summary.duplicateAlwaysOnEffectCount
			} | ${summary.effectCount} | ${md(statusSummary(summary.byStatus))} |`
		);
	}
	lines.push('');

	lines.push('## Coverage Vocabulary');
	lines.push('');
	lines.push('- calculated: directly changes numeric/stat/resource/spell/maneuver output.');
	lines.push('- collected: gathered by the calculator for sheet display/use.');
	lines.push('- choice-tracked: represented as a selection or choice effect.');
	lines.push('- progression-derived: feature text is represented by the class progression table.');
	lines.push(
		'- text-only-no-effects: feature has no modeled effects; this is a failing audit state.'
	);
	lines.push(
		'- flavor-no-effects: flavor feature has no modeled effects; this is a failing audit state.'
	);
	lines.push(
		'- partial: at least one modeled effect is covered, but at least one effect is unsupported.'
	);
	lines.push('- uncovered: effects exist, but none map to a current calculator/display path.');
	lines.push(
		'- duplicate always-on effects: identical direct/benefit effects on the same feature; choice-option effects are excluded because choices are selected, not always active together.'
	);
	lines.push('');

	for (const summary of classSummaries) {
		lines.push(`## ${summary.className}`);
		lines.push('');
		lines.push(
			`Category: ${summary.classCategory ?? 'unknown'}. Core features: ${
				summary.coreFeatureCount
			}. Subclasses: ${summary.subclassCount}. Subclass features: ${summary.subclassFeatureCount}.`
		);
		lines.push('');

		const classFeatures = effectReport.features
			.filter((feature) => feature.className === summary.className)
			.sort(compareClassFeature);
		for (const feature of classFeatures) {
			lines.push(renderFeature(feature));
		}
	}

	return format(lines.join('\n'), {
		parser: 'markdown',
		proseWrap: 'never',
		printWidth: 120
	});
}

async function runCli() {
	const args = new Set(process.argv.slice(2));
	const sourceReport = readJson(DEFAULT_SOURCE_REPORT);
	const effectReport = readJson(DEFAULT_EFFECT_REPORT);
	const markdown = await createMarkdown(sourceReport, effectReport);

	if (args.has('--check')) {
		const current = readFileSync(DEFAULT_MARKDOWN_REPORT, 'utf8');
		if (current !== markdown) {
			throw new Error(
				'Generated class feature audit report is stale. Run npm run classes:audit:generate.'
			);
		}
		console.log('Validated class feature audit markdown report.');
		return;
	}

	if (args.has('--write')) {
		mkdirSync(dirname(DEFAULT_MARKDOWN_REPORT), { recursive: true });
		writeFileSync(DEFAULT_MARKDOWN_REPORT, markdown);
		console.log(`Wrote ${DEFAULT_MARKDOWN_REPORT}`);
		return;
	}

	process.stdout.write(markdown);
}

runCli().catch((error) => {
	console.error(error.message);
	process.exitCode = 1;
});
