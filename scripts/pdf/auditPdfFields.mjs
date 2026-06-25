#!/usr/bin/env node

import { runPdfFieldAudit, writeJsonFile } from './pdfFieldAuditService.mjs';

function usage() {
	return `
Usage:
  node scripts/pdf/auditPdfFields.mjs --new <pdf> [options]

Options:
  --old <pdf>             Previous PDF template to compare against
  --new <pdf>             New/latest PDF template to extract and audit
  --old-label <label>     Label for the previous PDF in the report (default: old)
  --new-label <label>     Label for the new PDF in the report (default: new)
  --field-map <path>      Optional TS field map to validate against the new PDF
  --out <path>            Optional JSON report output path
  --manifest-out <path>   Optional JSON output path for only the new PDF schema
  --help                  Show this help
`.trim();
}

function parseArgs(argv) {
	const options = {};

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		if (arg === '--help' || arg === '-h') {
			options.help = true;
			continue;
		}
		if (!arg.startsWith('--')) {
			throw new Error(`Unexpected argument: ${arg}`);
		}

		const key = arg.slice(2);
		const value = argv[index + 1];
		if (!value || value.startsWith('--')) {
			throw new Error(`Missing value for ${arg}`);
		}
		options[key] = value;
		index += 1;
	}

	return {
		help: options.help,
		oldPdfPath: options.old,
		newPdfPath: options.new,
		oldLabel: options['old-label'] ?? 'old',
		newLabel: options['new-label'] ?? 'new',
		fieldMapPath: options['field-map'],
		outPath: options.out,
		manifestOutPath: options['manifest-out'],
	};
}

function summarize(report) {
	const lines = [
		`New PDF fields: ${report.schemas.new.fieldCount}`,
		report.schemas.old ? `Old PDF fields: ${report.schemas.old.fieldCount}` : null,
		report.diff
			? `Diff: +${report.diff.added.length} -${report.diff.removed.length} type=${report.diff.typeChanged.length}`
			: null,
		report.mapping
			? `Map: entries=${report.mapping.mappedItemCount} unmapped=${report.mapping.unmappedNewFields.length} stale=${report.mapping.staleMappedFields.length} duplicate=${report.mapping.duplicateMappedFields.length} type=${report.mapping.typeMismatches.length}`
			: null,
	].filter(Boolean);

	return lines.join('\n');
}

async function main() {
	const options = parseArgs(process.argv.slice(2));
	if (options.help) {
		console.log(usage());
		return;
	}
	if (!options.newPdfPath) {
		throw new Error(`Missing required --new argument\n\n${usage()}`);
	}

	const report = await runPdfFieldAudit(options);
	const writes = [];

	if (options.outPath) {
		writes.push(writeJsonFile(options.outPath, report));
	}
	if (options.manifestOutPath) {
		writes.push(writeJsonFile(options.manifestOutPath, report.schemas.new));
	}

	if (writes.length > 0) {
		const outputPaths = await Promise.all(writes);
		console.log(`${summarize(report)}\nWrote: ${outputPaths.join(', ')}`);
		return;
	}

	console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
