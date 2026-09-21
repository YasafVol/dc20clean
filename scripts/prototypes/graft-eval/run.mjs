#!/usr/bin/env node
// Throwaway paired investigation benchmark. Never touches the source worktree.
import { spawn, execFileSync } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { copyFile, cp, lstat, mkdir, readFile, writeFile } from 'node:fs/promises';
import { finished } from 'node:stream/promises';
import { basename, dirname, extname, join, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourceDir = resolve(scriptDir, '../../..');
const cases = JSON.parse(await readFile(join(scriptDir, 'cases.json'), 'utf8'));
const args = process.argv.slice(2);
const options = {
	caseIds: [],
	graft: process.env.GRAFT_BIN || '',
	codex: process.env.CODEX_BIN || 'codex',
	prepareOnly: false,
	allowModelAccess: false
};

for (let i = 0; i < args.length; i++) {
	const arg = args[i];
	if (arg === '--case') options.caseIds.push(args[++i]);
	else if (arg === '--graft') options.graft = args[++i];
	else if (arg === '--codex') options.codex = args[++i];
	else if (arg === '--out') options.out = args[++i];
	else if (arg === '--prepare-only') options.prepareOnly = true;
	else if (arg === '--allow-model-access') options.allowModelAccess = true;
	else if (arg === '--help') {
		console.log(
			'node run.mjs --graft /absolute/path/to/graft [--case ID] [--out DIRECTORY] [--prepare-only | --allow-model-access]'
		);
		process.exit(0);
	} else throw new Error(`Unknown argument: ${arg}`);
}
if (!options.graft)
	throw new Error('Pass --graft with the path to a pinned local Graft executable.');
if (!options.prepareOnly && !options.allowModelAccess) {
	throw new Error(
		'Agent runs may send repository source to the model service. Pass --allow-model-access only after explicitly approving that exposure.'
	);
}
options.graft = resolve(options.graft);
await lstat(options.graft);

const selectedCases = options.caseIds.length
	? cases.filter((item) => options.caseIds.includes(item.id))
	: cases;
if (selectedCases.length !== (options.caseIds.length || cases.length))
	throw new Error('Unknown or repeated case ID.');
const outDir = resolve(
	options.out || join(tmpdir(), `graft-eval-${new Date().toISOString().replaceAll(':', '-')}`)
);
if (outDir === sourceDir || outDir.startsWith(`${sourceDir}${sep}`)) {
	throw new Error('Keep scratch results outside the source repository.');
}
await mkdir(dirname(outDir), { recursive: true });
await mkdir(outDir);

function git(args, cwd = sourceDir, encoding = 'utf8') {
	return execFileSync('git', args, { cwd, encoding, maxBuffer: 20 * 1024 * 1024 });
}

const binaryExtensions = new Set([
	'.pdf',
	'.png',
	'.jpg',
	'.jpeg',
	'.gif',
	'.webp',
	'.ico',
	'.woff',
	'.woff2',
	'.ttf',
	'.otf',
	'.mp3',
	'.mp4',
	'.zip'
]);
const trackedOrVisible = git(['ls-files', '-co', '--exclude-standard', '-z'], sourceDir, 'buffer')
	.toString('utf8')
	.split('\0')
	.filter(Boolean);
const files = [...new Set(trackedOrVisible)].filter((path) => {
	const name = basename(path);
	return (
		!path.startsWith(`scripts/prototypes/graft-eval${sep}`) &&
		!path.startsWith('node_modules/') &&
		!path.startsWith('dist/') &&
		!(name.startsWith('.env') && name !== '.env.example') &&
		!binaryExtensions.has(extname(name).toLowerCase())
	);
});

async function snapshot(destination) {
	await mkdir(destination, { recursive: true });
	for (const path of files) {
		const from = join(sourceDir, path);
		if (!(await lstat(from)).isFile()) continue;
		const to = join(destination, path);
		await mkdir(dirname(to), { recursive: true });
		await copyFile(from, to);
	}
	git(['init', '-q'], destination);
	git(['add', '-A'], destination);
}

async function run(command, commandArgs, { cwd, env, stdoutPath, stderrPath, timeoutMs = 240000 }) {
	const start = performance.now();
	const stdout = createWriteStream(stdoutPath);
	const stderr = createWriteStream(stderrPath);
	const child = spawn(command, commandArgs, { cwd, env, stdio: ['ignore', 'pipe', 'pipe'] });
	child.stdout.pipe(stdout);
	child.stderr.pipe(stderr);
	const flushed = Promise.all([finished(stdout), finished(stderr)]);
	let timedOut = false;
	const timer = setTimeout(() => {
		timedOut = true;
		child.kill('SIGTERM');
	}, timeoutMs);
	const exitCode = await new Promise((done, fail) => {
		child.on('error', fail);
		child.on('close', done);
	});
	clearTimeout(timer);
	await flushed;
	return { exitCode, timedOut, wallSeconds: Math.round((performance.now() - start) / 100) / 10 };
}

function parseCodexEvents(raw) {
	let finalAnswer = '';
	let usage = null;
	let toolCalls = 0;
	let graftCalls = 0;
	for (const line of raw.split('\n')) {
		if (!line.trim()) continue;
		let event;
		try {
			event = JSON.parse(line);
		} catch {
			continue;
		}
		if (event.type === 'turn.completed') usage = event.usage || null;
		if (event.type !== 'item.completed') continue;
		if (event.item?.type === 'agent_message') finalAnswer = event.item.text || finalAnswer;
		if (event.item?.type === 'command_execution') {
			toolCalls++;
			if (/\bgraft\b/.test(event.item.command || '')) graftCalls++;
		}
	}
	return { finalAnswer, usage, toolCalls, graftCalls };
}

const records = [];
const review = [
	'# Graft evaluation — blinded answer review',
	'',
	'Score each criterion 0 or 1 from the answer and cited source. Do not look at summary.json until scoring is done.',
	''
];
console.log(`Scratch results: ${outDir}`);
console.log(
	`Freezing ${files.length} visible text/code files once. Current uncommitted source is included.`
);
const seedDir = join(outDir, 'seed');
await snapshot(seedDir);

for (const [index, item] of selectedCases.entries()) {
	const caseDir = join(outDir, item.id);
	const arms = index % 2 ? ['graft', 'baseline'] : ['baseline', 'graft'];
	const answers = {};
	await mkdir(caseDir, { recursive: true });
	for (const arm of arms) {
		const workspace = join(caseDir, arm);
		await cp(seedDir, workspace, { recursive: true });
		const env = { ...process.env, DO_NOT_TRACK: '1' };
		let setup = null;
		if (arm === 'graft') {
			env.PATH = `${dirname(options.graft)}${sep === '\\' ? ';' : ':'}${env.PATH || ''}`;
			setup = await run(
				options.graft,
				['init', '--agents', 'agents', '--no-global', '--no-mcp', '--no-hooks'],
				{
					cwd: workspace,
					env,
					stdoutPath: join(caseDir, 'graft-setup.stdout'),
					stderrPath: join(caseDir, 'graft-setup.stderr')
				}
			);
			if (setup.exitCode !== 0 || setup.timedOut)
				throw new Error(`Graft setup failed; see ${caseDir}/graft-setup.stderr`);
			git(['add', '-A'], workspace);
		}
		const untrackedBefore = new Set(
			git(['ls-files', '--others', '--exclude-standard'], workspace)
				.trim()
				.split('\n')
				.filter(Boolean)
		);
		if (options.prepareOnly) {
			records.push({ caseId: item.id, arm, workspace, setup });
			continue;
		}
		const prompt = `Read-only repository investigation. Follow AGENTS.md and the relevant active system specifications before inspecting source. Answer the question with source file paths and concise reasoning. Do not edit files, run tests, use the internet, or mention your tools.\n\n${item.question}`;
		console.log(`${item.id}: ${arm} run starting`);
		const stdoutPath = join(caseDir, `${arm}.jsonl`);
		const runResult = await run(
			options.codex,
			[
				'exec',
				'--ignore-user-config',
				'--ephemeral',
				'--json',
				'--sandbox',
				'workspace-write',
				'-C',
				workspace,
				prompt
			],
			{
				cwd: workspace,
				env,
				stdoutPath,
				stderrPath: join(caseDir, `${arm}.stderr`)
			}
		);
		const parsed = parseCodexEvents(await readFile(stdoutPath, 'utf8'));
		await writeFile(join(caseDir, `${arm}.answer.md`), `${parsed.finalAnswer}\n`);
		const changedPaths = [
			...git(['diff', '--name-only'], workspace).trim().split('\n').filter(Boolean),
			...git(['ls-files', '--others', '--exclude-standard'], workspace)
				.trim()
				.split('\n')
				.filter((path) => path && !untrackedBefore.has(path))
		];
		records.push({ caseId: item.id, arm, workspace, setup, ...runResult, ...parsed, changedPaths });
		answers[arm] = parsed.finalAnswer;
		console.log(
			`${item.id}: ${arm} ${runResult.exitCode === 0 ? 'finished' : 'failed'} in ${runResult.wallSeconds}s`
		);
	}
	if (!options.prepareOnly) {
		const first = index % 2 ? 'graft' : 'baseline';
		const second = first === 'graft' ? 'baseline' : 'graft';
		review.push(
			`## ${item.id}`,
			'',
			item.question,
			'',
			'Criteria:',
			'',
			...item.reviewCriteria.map((criterion, n) => `${n + 1}. ${criterion}`),
			'',
			'### Answer A',
			'',
			answers[first] || '(no answer)',
			'',
			'Score A: __ / 5',
			'',
			'### Answer B',
			'',
			answers[second] || '(no answer)',
			'',
			'Score B: __ / 5',
			''
		);
	}
}

await writeFile(
	join(outDir, 'summary.json'),
	JSON.stringify({ sourceDir, fileCount: files.length, cases: selectedCases, records }, null, 2)
);
if (!options.prepareOnly) await writeFile(join(outDir, 'review.md'), review.join('\n'));
const failedRuns = records.filter(
	(record) =>
		record.exitCode !== undefined &&
		(record.exitCode !== 0 || record.timedOut || !record.finalAnswer)
);
console.log(
	options.prepareOnly
		? 'Preparation complete; no agent runs.'
		: failedRuns.length
			? `${failedRuns.length} agent run(s) failed; inspect stderr and JSONL before scoring.`
			: 'Runs complete. Score review.md before opening summary.json.'
);
if (failedRuns.length) process.exitCode = 1;
