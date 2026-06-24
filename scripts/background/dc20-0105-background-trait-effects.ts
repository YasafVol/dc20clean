import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { format } from 'prettier';
import { traitsData } from '../../src/lib/rulesdata/ancestries/traits';
import type { Effect } from '../../src/lib/rulesdata/schemas/character.schema';

const REPORT_PATH = resolve('docs/migration/background-trait-effects-v0105.json');
const BACKGROUND_STAT_TARGETS = new Set(['skillPoints', 'tradePoints', 'languagePoints']);
const BACKGROUND_EFFECT_TYPES = new Set([
	'GRANT_SKILL_EXPERTISE',
	'GRANT_TRADE_EXPERTISE',
	'MODIFY_SKILL_MASTERY_CAP',
	'MODIFY_TRADE_MASTERY_CAP',
	'INCREASE_SKILL_MASTERY_CAP',
	'INCREASE_TRADE_MASTERY_CAP'
]);

function getBackgroundImpact(effect: Effect) {
	if (effect.type === 'MODIFY_STAT' && BACKGROUND_STAT_TARGETS.has(effect.target)) {
		return {
			kind: 'point-pool',
			effectType: effect.type,
			target: effect.target,
			value: effect.value
		};
	}

	if (BACKGROUND_EFFECT_TYPES.has(effect.type)) {
		return {
			kind: effect.type.includes('SKILL') ? 'skill-mastery-cap' : 'trade-mastery-cap',
			effectType: effect.type,
			target: 'target' in effect ? effect.target : undefined,
			value: 'value' in effect ? effect.value : undefined,
			count: 'count' in effect ? effect.count : undefined,
			options: 'options' in effect ? effect.options : undefined
		};
	}

	return undefined;
}

function createReport() {
	const traits = traitsData
		.map((trait) => ({
			id: trait.id,
			name: trait.name,
			cost: trait.cost,
			impacts: trait.effects.map(getBackgroundImpact).filter(Boolean)
		}))
		.filter((trait) => trait.impacts.length > 0);

	return {
		rulesVersion: 'dc20-0.10.5',
		scope: 'background-affecting-trait-effects',
		traitCount: traits.length,
		traits
	};
}

const serialize = (value: unknown) =>
	format(JSON.stringify(value), {
		parser: 'json',
		useTabs: true,
		singleQuote: true,
		trailingComma: 'none',
		printWidth: 100
	});

async function runCli() {
	const args = new Set(process.argv.slice(2));
	const report = await serialize(createReport());

	if (args.has('--check')) {
		const current = await readFile(REPORT_PATH, 'utf8');
		if (current !== report) {
			throw new Error(
				'Generated background trait-effects report is stale. Run npm run background:traits:generate:0105.'
			);
		}
		console.log('Validated background trait-effects report.');
		return;
	}

	if (args.has('--write')) {
		await mkdir(dirname(REPORT_PATH), { recursive: true });
		await writeFile(REPORT_PATH, report);
		console.log(`Generated background trait-effects report at ${REPORT_PATH}.`);
		return;
	}

	console.log(report.trim());
}

runCli().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
