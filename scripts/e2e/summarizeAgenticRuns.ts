import fs from 'node:fs';
import path from 'node:path';

interface AgenticRunSummary {
	runId: string;
	status: string;
	recipeId: string;
	url: string;
	startedAt: string;
	finishedAt: string;
	errorCount: number;
	warnCount: number;
}

function readJson<T>(filePath: string): T {
	return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

function main() {
	const root = path.resolve(process.cwd(), 'test-results/agentic');
	if (!fs.existsSync(root)) {
		console.log('No agentic run artifacts found.');
		return;
	}

	const summaries: AgenticRunSummary[] = [];
	for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const runPath = path.join(root, entry.name, 'run.json');
		if (!fs.existsSync(runPath)) continue;
		const run = readJson<any>(runPath);
		const events = Array.isArray(run.events) ? run.events : [];
		summaries.push({
			runId: run.runId ?? entry.name,
			status: run.status ?? 'unknown',
			recipeId: run.recipeId ?? 'unknown',
			url: run.url ?? '',
			startedAt: run.startedAt ?? '',
			finishedAt: run.finishedAt ?? '',
			errorCount: events.filter((event: any) => event.level === 'error').length,
			warnCount: events.filter((event: any) => event.level === 'warn').length
		});
	}

	summaries.sort((a, b) => a.startedAt.localeCompare(b.startedAt));

	const output = {
		generatedAt: new Date().toISOString(),
		totalRuns: summaries.length,
		passed: summaries.filter((summary) => summary.status === 'passed').length,
		failed: summaries.filter((summary) => summary.status === 'failed').length,
		runs: summaries
	};
	const outputPath = path.join(root, 'summary.json');
	fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

	console.log(`Agentic runs: ${output.totalRuns}`);
	console.log(`Passed: ${output.passed}`);
	console.log(`Failed: ${output.failed}`);
	console.log(`Wrote ${path.relative(process.cwd(), outputPath)}`);
}

main();
