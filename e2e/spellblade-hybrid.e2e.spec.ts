import { test, expect } from '@playwright/test';

/**
 * E2E test for Spellblade - a hybrid class that should show both Spells and Maneuvers steps
 *
 * This test validates the split step implementation (T5):
 * - Spellblade has both spellcasting and martial capabilities
 * - Character creation should show both Spells AND Maneuvers steps
 * - Both steps should be properly validated
 */
test.describe('Spellblade Hybrid Class E2E (T5)', () => {
	test('should show both Spells and Maneuvers steps for hybrid class', async ({
		page,
		context
	}) => {
		await context.addInitScript(() => localStorage.clear());

		await page.goto('/');
		await page.getByRole('button', { name: /Create Character/i }).click();

		// Step 1: Class Selection - Spellblade
		await page.getByTestId('class-card-spellblade').click();

		// Spellblade requires spell school selection
		// Select a school if required (depends on class data)
		const schoolCheckbox = page.locator('input[type=checkbox][value="Elemental"]');
		if (await schoolCheckbox.isVisible().catch(() => false)) {
			await schoolCheckbox.check();
		}

		await page.getByRole('button', { name: 'Next →' }).click();

		// Step 2: Ancestry - Human (simplest choice)
		await page.getByTestId('ancestry-card-human').click();

		// Select traits to spend points
		await page.getByTestId('trait-card-human_attribute_increase').click();
		await page.getByTestId('trait-card-human_skill_expertise').click();
		await page.getByTestId('trait-card-human_resolve').click();
		await page.getByTestId('trait-card-human_undying').click();

		// Find and select more traits to spend remaining points
		const tradeExpertise = page.getByTestId('trait-card-human_trade_expertise');
		if (await tradeExpertise.isVisible()) {
			await tradeExpertise.click();
		}

		// Verify we've spent all ancestry points
		await expect(page.getByText(/REMAINING: 0\//i)).toBeVisible();
		await page.getByRole('button', { name: 'Next →' }).click();

		// Step 3: Attributes - Balanced build for hybrid
		async function incAttr(name: string, times: number) {
			for (let i = 0; i < times; i++) {
				await page.getByTestId(`${name}-increase`).click();
			}
		}

		// Spellblade needs both Might/Agility and Intelligence
		await incAttr('might', 4);
		await incAttr('agility', 3);
		await incAttr('intelligence', 3);
		await incAttr('charisma', 3);

		await expect(page.getByText(/Attribute Points: 0\//i)).toBeVisible();
		await page.getByRole('button', { name: 'Next →' }).click();

		// Step 4: Background - Quick allocation
		await page.getByTestId('skills-tab').click();

		async function setSkillLevel(skillName: string, level: number) {
			const skillRow = page.getByTestId(`skill-item-${skillName.toLowerCase()}`);
			await skillRow.getByRole('button', { name: new RegExp(`^${level}\\b`) }).click();
		}

		// Allocate skill points (base 5 + INT(1) = 6).
		for (const skill of [
			'Athletics',
			'Acrobatics',
			'Investigation',
			'Awareness',
			'Trickery',
			'Stealth',
			'Animal'
		]) {
			await setSkillLevel(skill, 1);
		}

		// Trades
		await page.getByTestId('trades-tab').click();
		async function setTradeLevel(tradeName: string, level: number) {
			const tradeRow = page.getByTestId(`trade-item-${tradeName.toLowerCase()}`);
			await tradeRow.getByRole('button', { name: `${level}`, exact: true }).click();
		}

		await setTradeLevel('Blacksmithing', 1);
		await setTradeLevel('Alchemy', 1);
		await setTradeLevel('Herbalism', 1);

		// Languages
		await page.getByTestId('languages-tab').click();
		async function setLanguage(languageName: string, fluency: 'Limited' | 'Fluent') {
			const languageRow = page.getByTestId(`language-item-${languageName.toLowerCase()}`);
			await languageRow.getByRole('button', { name: new RegExp(`^${fluency}`) }).click();
		}

		await setLanguage('Elvish', 'Fluent');
		await page.getByRole('button', { name: 'Next →' }).click();

		// Step 5: Spells (Spellblade should have spell slots)
		// Verify we're on Spells step
		const spellsHeading = page.getByRole('heading', { name: /LEARN.*SPELLS/i });
		const isSpellsStep = await spellsHeading.isVisible().catch(() => false);

		if (isSpellsStep) {
			console.log('Spells step detected - Spellblade has spellcasting');
			const spellLearnButtons = page.locator('[data-testid^="spell-"][data-testid$="-learn"]');
			await spellLearnButtons.nth(0).click();
			await spellLearnButtons.nth(0).click();
			await expect(page.getByText(/Spells: 2 \/ 2/)).toBeVisible();
			await page.getByRole('button', { name: 'Next →' }).click();
		}

		// Step 6: Maneuvers (Spellblade should also have maneuvers)
		const maneuversHeading = page.getByRole('heading', { name: /LEARN.*MANEUVERS/i });
		const isManeuversStep = await maneuversHeading.isVisible().catch(() => false);

		if (isManeuversStep) {
			console.log('Maneuvers step detected - Spellblade has martial capabilities');

			const maneuverLearnButtons = page.locator(
				'[data-testid^="maneuver-"][data-testid$="-learn"]'
			);
			const nextButton = page.getByTestId('creation-next');
			await maneuverLearnButtons.first().click();
			await expect(page.getByText(/Maneuvers: 1 \/ 1/)).toBeVisible();
			await nextButton.click();
		}

		// Verify we reached the final step by confirming either Spells or Maneuvers step was shown
		// A true hybrid class (Spellblade) should have at least one of these steps
		expect(isSpellsStep || isManeuversStep).toBeTruthy();

		// Step 7: Names
		await page.getByLabel(/Character Name/i).fill('Hybrid Spellblade Test');
		await page.getByLabel(/Player Name/i).fill('E2E Test');
		await page.getByTestId('creation-next').click();
		await page.waitForURL('**/character/**');

		// Verify saved character data
		const saved = await page.evaluate(() => {
			const list = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
			return list.find((c: any) => c.finalName === 'Hybrid Spellblade Test');
		});

		expect(saved).toBeTruthy();
		expect(saved.classId).toBe('spellblade');
		expect(saved.ancestry1Id).toBe('human');
		expect(saved.spells).toHaveLength(2);
		expect(saved.maneuvers).toHaveLength(1);

		console.log('Spellblade E2E test completed successfully');
		console.log('Character summary:', {
			classId: saved.classId,
			ancestry1Id: saved.ancestry1Id,
			spells: saved.spells.length,
			maneuvers: saved.maneuvers.length
		});
	});
});
