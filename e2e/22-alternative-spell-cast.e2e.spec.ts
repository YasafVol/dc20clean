import fs from 'fs';
import { expect, test } from '@playwright/test';
import { ALL_SPELLS } from '../src/lib/rulesdata/spells-data';
import { createSpellDataFromSpell } from '../src/routes/character-sheet/spellData';

const richCharacterUrl = new URL('./test-character-rich.json', import.meta.url);
const richCharacter = JSON.parse(fs.readFileSync(richCharacterUrl, 'utf-8'));
const fireball = ALL_SPELLS.find((spell) => spell.id === 'fireball');
if (!fireball) throw new Error('Fireball fixture is missing');

test('22 - alternative sheet declares spell enhancements and spends Mana', async ({ page }) => {
	const savedSpell = {
		...createSpellDataFromSpell(fireball, 'spell-fireball'),
		enhancements: undefined
	};
	const character = {
		...richCharacter,
		schemaVersion: '2.2.0',
		rulesVersion: 'dc20-0.10.5',
		spells: [savedSpell],
		characterState: {
			...richCharacter.characterState,
			spells: [savedSpell]
		}
	};

	await page.goto('/');
	await page.getByRole('button', { name: /load character/i }).click();
	await page.getByRole('button', { name: /import from json/i }).click();
	await page.locator('textarea, input[type="text"]').first().fill(JSON.stringify(character));
	await page.getByRole('button', { name: 'Import Character' }).click();
	await page
		.getByRole('button', { name: /alternative sheet/i })
		.first()
		.click();
	await page.waitForLoadState('networkidle');

	await page.getByRole('tab', { name: 'SPELLS' }).click();
	const spellRow = page.getByTestId('spell-row-spell-fireball');
	await spellRow.getByRole('button', { name: 'Cast' }).click();

	const modal = page.getByTestId('spell-cast-modal');
	await expect(modal).toBeVisible();
	await expect(modal.getByText('0 / 1 MP')).toBeVisible();
	await modal.getByRole('button', { name: 'Increase Area' }).click();
	await expect(modal.getByText('1 / 1 MP')).toBeVisible();
	await expect(modal.getByRole('button', { name: 'Increase Area' })).toBeDisabled();
	await modal.getByTestId('spell-cast-confirm').click();

	await expect(modal).toHaveCount(0);
	const manaCard = page.getByText('Mana', { exact: true }).locator('../..');
	await expect(manaCard).toContainText('5/6');
});
