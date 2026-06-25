import backgroundReport from '../../docs/migration/background-v0105-report.json';
import { languagesData } from '../../src/lib/rulesdata/languages';
import { skillsData } from '../../src/lib/rulesdata/skills';
import { tradesData } from '../../src/lib/rulesdata/trades';

type NamedEntry = { id: string; name: string };

const byId = (left: NamedEntry, right: NamedEntry) => left.id.localeCompare(right.id);

function assertNamesMatch(label: string, actual: NamedEntry[], expected: NamedEntry[]) {
	const actualNames = actual.map(({ id, name }) => ({ id, name })).sort(byId);
	const expectedNames = expected.map(({ id, name }) => ({ id, name })).sort(byId);

	const errors: string[] = [];
	const max = Math.max(actualNames.length, expectedNames.length);
	for (let index = 0; index < max; index += 1) {
		const actualEntry = actualNames[index];
		const expectedEntry = expectedNames[index];
		if (!actualEntry || !expectedEntry) {
			errors.push(
				`${label}: count mismatch, app has ${actualNames.length}, source has ${expectedNames.length}.`
			);
			break;
		}
		if (actualEntry.id !== expectedEntry.id || actualEntry.name !== expectedEntry.name) {
			errors.push(
				`${label}: expected ${expectedEntry.id}:${expectedEntry.name}, got ${actualEntry.id}:${actualEntry.name}.`
			);
		}
	}

	if (errors.length) {
		throw new Error(errors.join('\n'));
	}
}

assertNamesMatch('skills', skillsData, backgroundReport.skills);
assertNamesMatch('trades', tradesData, backgroundReport.trades);
assertNamesMatch('languages', languagesData, backgroundReport.languages);

console.log(
	`Validated background names: ${skillsData.length} skills, ${tradesData.length} trades, ${languagesData.length} languages.`
);
