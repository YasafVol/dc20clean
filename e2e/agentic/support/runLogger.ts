import fs from 'node:fs';
import path from 'node:path';
import type { Page, TestInfo } from '@playwright/test';

type EventLevel = 'info' | 'warn' | 'error';
export type AgenticFailureCategory =
	| 'selector-or-hook-gap'
	| 'ui-flow-regression'
	| 'calculator-mismatch'
	| 'persistence-mismatch'
	| 'export-mismatch'
	| 'rules-data-catalog-gap'
	| 'environment-tooling'
	| 'unknown';

interface RunEvent {
	level: EventLevel;
	type: string;
	message: string;
	data?: unknown;
	timestamp: string;
}

export interface AgenticRunLogger {
	artifactDir: string;
	record: (type: string, message: string, data?: unknown, level?: EventLevel) => void;
	writeJson: (fileName: string, data: unknown) => string;
	screenshot: (page: Page, fileName: string) => Promise<string>;
	finalize: (
		status: 'passed' | 'failed',
		data?: unknown,
		classification?: AgenticFailureCategory
	) => Promise<void>;
}

export function classifyAgenticFailure(error: unknown): AgenticFailureCategory {
	const message = error instanceof Error ? error.message : String(error);

	if (
		/vite|preview|listen|browser has not been installed|executable doesn't exist/i.test(message)
	) {
		return 'environment-tooling';
	}
	if (/locator|waiting for|getByTestId|getByRole|getByLabel|strict mode violation/i.test(message)) {
		return 'selector-or-hook-gap';
	}
	if (/oracle|mismatch|mismatches|expected.*actual/i.test(message)) {
		return 'calculator-mismatch';
	}
	if (/saved character|localStorage|not found|selectedSpells|selectedManeuvers/i.test(message)) {
		return 'persistence-mismatch';
	}
	if (/pdf|download|export/i.test(message)) {
		return 'export-mismatch';
	}
	if (/spell not found|maneuver not found|catalog|rules data/i.test(message)) {
		return 'rules-data-catalog-gap';
	}
	if (/Timeout|page|URL|navigation|visible/i.test(message)) {
		return 'ui-flow-regression';
	}
	return 'unknown';
}

function safeSegment(value: string): string {
	return value
		.replace(/[^a-z0-9_-]+/gi, '-')
		.replace(/^-|-$/g, '')
		.toLowerCase();
}

export function createAgenticRunLogger({
	page,
	testInfo,
	recipeId
}: {
	page: Page;
	testInfo: TestInfo;
	recipeId: string;
}): AgenticRunLogger {
	const runId = `${new Date().toISOString().replace(/[:.]/g, '-')}-${safeSegment(recipeId)}`;
	const artifactDir = path.resolve(process.cwd(), 'test-results', 'agentic', runId);
	const events: RunEvent[] = [];

	fs.mkdirSync(artifactDir, { recursive: true });

	const record = (
		type: string,
		message: string,
		data?: unknown,
		level: EventLevel = 'info'
	): void => {
		events.push({
			level,
			type,
			message,
			data,
			timestamp: new Date().toISOString()
		});
	};

	page.on('console', (message) => {
		record('browser.console', message.text(), { type: message.type() });
	});
	page.on('pageerror', (error) => {
		record('browser.pageerror', error.message, { stack: error.stack }, 'error');
	});
	page.on('requestfailed', (request) => {
		record(
			'browser.requestfailed',
			`${request.method()} ${request.url()}`,
			{ failure: request.failure()?.errorText },
			'warn'
		);
	});

	const writeJson = (fileName: string, data: unknown): string => {
		const filePath = path.join(artifactDir, fileName);
		fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
		return filePath;
	};

	const screenshot = async (page: Page, fileName: string): Promise<string> => {
		const filePath = path.join(artifactDir, fileName);
		await page.screenshot({ path: filePath, fullPage: true });
		return filePath;
	};

	const finalize = async (
		status: 'passed' | 'failed',
		data?: unknown,
		classification?: AgenticFailureCategory
	): Promise<void> => {
		const finalData = {
			status,
			recipeId,
			runId,
			classification: status === 'failed' ? (classification ?? 'unknown') : null,
			url: page.url(),
			startedAt: events[0]?.timestamp ?? new Date().toISOString(),
			finishedAt: new Date().toISOString(),
			events,
			data
		};
		const runPath = writeJson('run.json', finalData);
		await testInfo.attach('agentic-run', {
			path: runPath,
			contentType: 'application/json'
		});
	};

	return {
		artifactDir,
		record,
		writeJson,
		screenshot,
		finalize
	};
}
