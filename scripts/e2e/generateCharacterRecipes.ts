import fs from 'node:fs';
import path from 'node:path';

type Mode = 'smoke' | 'class-by-class' | 'high-risk' | 'pairwise';

function parseMode(argv: string[]): Mode {
	const modeIndex = argv.indexOf('--mode');
	const mode = modeIndex >= 0 ? argv[modeIndex + 1] : 'smoke';
	if (['smoke', 'class-by-class', 'high-risk', 'pairwise'].includes(mode)) {
		return mode as Mode;
	}
	throw new Error(`Unsupported mode: ${mode}`);
}

function main() {
	const mode = parseMode(process.argv.slice(2));
	const output = {
		generatedAt: new Date().toISOString(),
		mode,
		status: mode === 'smoke' ? 'ready' : 'planned',
		recipes:
			mode === 'smoke'
				? [
						{
							id: 'spellblade-hybrid-smoke',
							file: 'e2e/agentic/recipes/spellbladeHybridSmoke.ts',
							coverage: ['character creation', 'hybrid class', 'spells step', 'maneuvers step']
						}
					]
				: [],
		nextModes: ['class-by-class', 'high-risk', 'pairwise'].filter((item) => item !== mode)
	};
	const outputPath = path.resolve(process.cwd(), 'test-results/agentic/generated-recipes.json');
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
	console.log(`Wrote ${path.relative(process.cwd(), outputPath)}`);
}

main();
