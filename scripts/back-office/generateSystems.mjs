import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../../', import.meta.url));
const directory = path.join(root, 'docs/systems');
const files = (await readdir(directory)).filter((name) => /\.md$/i.test(name)).sort();
const documents = await Promise.all(
	files.map(async (id, index) => {
		const markdown = await readFile(path.join(directory, id), 'utf8');
		const metadata = (key) => markdown.match(new RegExp(`^> ${key}: (.+)$`, 'm'))?.[1] ?? '';
		return {
			id,
			ordinal: index + 1,
			title: markdown.match(/^# (.+)$/m)?.[1] ?? id,
			purpose: metadata('Purpose'),
			owns: metadata('Owns'),
			excludes: metadata('Does not own'),
			authoritativeSource: metadata('Authoritative source'),
			updated: metadata('Last Updated'),
			markdown
		};
	})
);
const output = JSON.stringify(documents, null, 2) + '\n';
const target = path.join(root, 'convex/backOfficeData/systems.json');
if (process.argv.includes('--check')) {
	if ((await readFile(target, 'utf8')) !== output) {
		throw new Error('System reader snapshot is stale. Run npm run backoffice:generate.');
	}
} else {
	await writeFile(target, output);
}
console.log(
	`${documents.length} system documents ${process.argv.includes('--check') ? 'verified' : 'prepared'}.`
);
