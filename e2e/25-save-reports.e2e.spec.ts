import { expect, test, type Page, type Locator } from '@playwright/test';
import { readFileSync } from 'node:fs';
const fixtures = JSON.parse(
	readFileSync(new URL('./fixtures/save-reports.json', import.meta.url), 'utf8')
);

// Constructed from current UI builds matching reports 7946195 and 7946833.
// Original historical payloads expired; legacy cases deliberately change version/runtime only.
test.setTimeout(120_000);
const card = (page: Page, name: string) =>
	page.getByRole('heading', { name, exact: true }).locator('..');
async function exportJSON(page: Page, control: Locator) {
	if (
		!(await control.isVisible()) &&
		(await page.getByRole('button', { name: 'Sheet actions', exact: true }).isVisible())
	)
		await page.getByRole('button', { name: 'Sheet actions', exact: true }).click();
	const download = page.waitForEvent('download');
	await control.click();
	const stream = await (await download).createReadStream();
	if (!stream) throw new Error('Missing character download');
	const chunks = [];
	for await (const chunk of stream) chunks.push(chunk);
	const result = JSON.parse(Buffer.concat(chunks).toString());
	delete result.exportedAt;
	delete result.exportVersion;
	return result;
}
async function importJSON(page: Page, character: unknown, name: string) {
	await page.getByRole('button', { name: '📥 Import from JSON', exact: true }).click();
	await page.getByRole('textbox').fill(JSON.stringify(character));
	await page.getByRole('button', { name: 'Import Character', exact: true }).click();
	await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
	await expect(page.getByRole('textbox')).toHaveCount(0);
}
const next = (page: Page) => page.getByTestId('creation-next').click();
function assertBuild(saved: any, classId: 'cleric' | 'wizard') {
	expect(saved.classId).toBe(classId);
	expect(saved.level).toBe(classId === 'cleric' ? 3 : 2);
	expect(saved.selectedTalents).toEqual({ general_spellcasting_expansion: 1 });
	expect(saved.pathPointAllocations.spellcasting).toBe(1);
	expect(saved.spells).toHaveLength(classId === 'cleric' ? 9 : 10);
	if (classId === 'cleric') {
		expect(saved.selectedSubclass).toBe('Priest');
		expect(saved.skillsData.medicine).toBe(2);
		expect(saved.skillMasteryLimitElevations).toEqual({
			medicine: { source: 'spent_points', value: 1 }
		});
	}
}
for (const classId of ['cleric', 'wizard'] as const) {
	test(`${classId}: create → save → reload`, async ({ page }) => {
		const cleric = classId === 'cleric';
		const name = `Save report ${classId} created`;
		await page.goto('/menu');
		await page.getByRole('button', { name: 'Create Character', exact: true }).click();
		await page.getByRole('button', { name: 'Starting Level:', exact: true }).click();
		await page.getByText(`Level ${cleric ? 3 : 2}`, { exact: true }).click();
		await page.getByTestId(`class-card-${classId}`).click();
		if (cleric) {
			await page.getByRole('radio', { name: /^Radiant Your Divine/ }).check();
			await page.getByRole('checkbox', { name: /^Life When/ }).check();
			await page.getByRole('checkbox', { name: /^Divination You/ }).check();
			await page.getByRole('heading', { name: 'Priest', exact: true }).click();
		} else await page.getByRole('radio', { name: /^Divination Specialize/ }).check();
		await next(page);
		await page.getByTestId('talent-general_spellcasting_expansion-increase').click();
		await page.getByTestId('leveling-path-points-tab').click();
		await page.getByTestId('path-spellcaster_path-increase').click();
		await next(page);
		await page.getByTestId('ancestry-card-human').click();
		for (const trait of ['attribute_increase', 'resolve', 'determination', 'unbreakable'])
			await page.getByTestId(`trait-card-human_${trait}`).click();
		await next(page);
		for (const [attribute, clicks] of Object.entries({
			might: 3,
			agility: cleric ? 3 : 2,
			charisma: 3,
			intelligence: 5
		}))
			for (let i = 0; i < clicks; i++) await page.getByTestId(`${attribute}-increase`).click();
		await next(page);
		const skills = ['athletics', 'intimidation', 'acrobatics', 'survival', 'awareness', 'stealth'];
		await page.getByTestId(`skill-medicine-mastery-${cleric ? 2 : 1}`).click();
		if (!cleric) skills.push('insight');
		for (const skill of skills) await page.getByTestId(`skill-${skill}-mastery-1`).click();
		await page.getByTestId('trades-tab').click();
		const trades = ['blacksmithing', 'leatherworking', 'cooking'];
		if (cleric) trades.push('herbalism');
		for (const trade of trades) await page.getByTestId(`trade-${trade}-mastery-1`).click();
		await page.getByTestId('languages-tab').click();
		await page
			.getByTestId('language-item-human')
			.getByRole('button', { name: 'Fluent (2)', exact: true })
			.click();
		await next(page);
		for (let i = 0; i < (cleric ? 9 : 10); i++)
			await page.getByRole('button', { name: 'LEARN', exact: true }).first().click();
		await next(page);
		await page.getByTestId('character-name-input').fill(name);
		await page.getByTestId('player-name-input').fill('Save regression test');
		await next(page);
		await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
		await page.reload();
		await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
		assertBuild(
			await exportJSON(page, page.getByRole('button', { name: /Download JSON/ })),
			classId
		);
	});
	test(`${classId}: import legacy → upgrade → edit → finish → reload; preserve source and other saves`, async ({
		page
	}) => {
		const fixture = fixtures[classId];
		const source = {
			...fixture,
			rulesVersion: 'dc20-0.10',
			characterState: {
				...fixture.characterState,
				resources: { current: { currentHP: 7, currentMP: 1 } },
				inventory: { items: [], currency: { gold: 4 } },
				notes: { playerNotes: 'Preserve legacy note' }
			}
		};
		const sentinel = {
			...fixtures.wizard,
			id: 'save-sentinel',
			finalName: 'Unrelated save sentinel'
		};
		await page.goto('/load-character');
		await importJSON(page, sentinel, sentinel.finalName);
		await page.reload();
		const untouched = await exportJSON(
			page,
			card(page, sentinel.finalName).getByRole('button', { name: 'Download JSON', exact: true })
		);
		await importJSON(page, source, source.finalName);
		await page.reload();
		const original = await exportJSON(
			page,
			card(page, source.finalName).getByRole('button', { name: 'Download JSON', exact: true })
		);
		await card(page, source.finalName)
			.getByRole('button', { name: 'Update to current version', exact: true })
			.click();
		await page.getByRole('button', { name: 'Create Current Copy', exact: true }).click();
		const draftName = `${source.finalName} (v0.10.5 draft)`;
		await expect(page.getByRole('heading', { name: draftName, exact: true })).toBeVisible();
		await page.reload();
		await card(page, draftName).getByRole('button', { name: 'Edit', exact: true }).click();
		for (let i = 0; i < 6; i++) await next(page);
		await expect(
			page.getByRole('heading', { name: 'Name Your Character', exact: true })
		).toBeVisible();
		await next(page);
		await expect(page).toHaveURL(new RegExp(`/character/${source.id}__dc20_0_10_5_draft$`));
		await page.reload();
		await expect(page.getByRole('heading', { name: draftName, exact: true })).toBeVisible();
		const saved = await exportJSON(page, page.getByRole('button', { name: /Download JSON/ }));
		assertBuild(saved, classId);
		expect(saved.rulesVersion).toBe('dc20-0.10.5');
		expect(saved.rulesUpgradeSourceId).toBe(source.id);
		expect(saved.characterState.resources.current).toMatchObject({ currentHP: 7, currentMP: 1 });
		expect(saved.characterState.inventory.currency).toEqual({ gold: 4, silver: 0, copper: 0 });
		expect(saved.characterState.notes.playerNotes).toBe('Preserve legacy note');
		expect(saved.spells.map((s: any) => s.spellName).sort()).toEqual(
			fixture.spells.map((s) => s.spellName).sort()
		);
		await page.goto('/load-character');
		expect(
			await exportJSON(
				page,
				card(page, source.finalName).getByRole('button', { name: 'Download JSON', exact: true })
			)
		).toEqual(original);
		expect(
			await exportJSON(
				page,
				card(page, sentinel.finalName).getByRole('button', { name: 'Download JSON', exact: true })
			)
		).toEqual(untouched);
	});
}
