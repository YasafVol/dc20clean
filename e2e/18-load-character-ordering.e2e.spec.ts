import { expect, test, type BrowserContext } from '@playwright/test';

function makeCharacter(
	id: string,
	name: string,
	timestamps: { createdAt?: string; completedAt?: string; lastModified?: string }
) {
	return {
		id,
		finalName: name,
		finalPlayerName: 'Ordering Tester',
		rulesVersion: 'dc20-0.10.5',
		schemaVersion: '2.2.0',
		level: 1,
		classId: 'barbarian',
		className: 'Barbarian',
		ancestry1Id: 'human',
		ancestry1Name: 'Human',
		selectedTraitIds: [],
		selectedFeatureChoices: {},
		skillsData: {},
		tradesData: {},
		languagesData: { common: { fluency: 'fluent' } },
		spells: [],
		maneuvers: [],
		...timestamps
	};
}

async function seedCharacters(context: BrowserContext, characters: unknown[]) {
	await context.addInitScript((seed) => {
		localStorage.setItem('savedCharacters', JSON.stringify(seed));
	}, characters);
}

async function listedCharacterIds(page: import('@playwright/test').Page) {
	return page
		.locator('[data-character-id]')
		.evaluateAll((cards) => cards.map((card) => card.getAttribute('data-character-id')));
}

test('orders saved characters by the newest available activity timestamp', async ({
	context,
	page
}) => {
	const createdFallback = makeCharacter('created-fallback', 'Created Fallback', {
		createdAt: '2026-01-02T00:00:00.000Z'
	});
	const completedFallback = makeCharacter('completed-fallback', 'Completed Fallback', {
		createdAt: '2026-01-01T00:00:00.000Z',
		completedAt: '2026-01-03T00:00:00.000Z'
	});
	const recentlyModified = makeCharacter('recently-modified', 'Recently Modified', {
		createdAt: '2026-01-01T00:00:00.000Z',
		completedAt: '2026-01-02T00:00:00.000Z',
		lastModified: '2026-01-04T00:00:00.000Z'
	});

	await seedCharacters(context, [createdFallback, recentlyModified, completedFallback]);
	await page.goto('/load-character');

	await expect(page.getByTestId('character-card-recently-modified')).toBeVisible();
	expect(await listedCharacterIds(page)).toEqual([
		'recently-modified',
		'completed-fallback',
		'created-fallback'
	]);

	const imported = makeCharacter('fresh-import', 'Fresh Import', {
		createdAt: '2025-01-01T00:00:00.000Z'
	});
	await page.getByRole('button', { name: 'Import from JSON' }).click();
	await page.getByRole('textbox').fill(JSON.stringify(imported));
	await page.getByRole('button', { name: 'Import Character', exact: true }).click();

	await expect(page.getByTestId('character-card-fresh-import')).toBeVisible();
	await expect.poll(async () => (await listedCharacterIds(page))[0]).toBe('fresh-import');
});
