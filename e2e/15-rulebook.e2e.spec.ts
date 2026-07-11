import { expect, test } from '@playwright/test';

test.describe('Rulebook reader', () => {
	test('navigates article chunks and searches stable sections', async ({ page }) => {
		await page.goto('/rulebook');

		await expect(page.getByTestId('rulebook-toc')).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Table of Contents' })).toBeVisible();

		await page.locator('[data-article-id="core-rules/attributes-and-prime-modifier"]').click();
		await expect(page).toHaveURL(/\/rulebook\/core-rules\/attributes-and-prime-modifier$/);
		await expect(page.getByTestId('rulebook-article')).toHaveAttribute(
			'data-article-id',
			'core-rules/attributes-and-prime-modifier'
		);
		await expect(page.getByRole('heading', { name: 'Attributes & Prime Modifier' })).toBeVisible();
		await expect(page.getByRole('table')).toContainText('Attribute Limit');

		await page.getByRole('searchbox', { name: 'Search the rulebook' }).fill('Attribute Limit');
		await expect(page.getByTestId('rulebook-search-results')).toBeVisible();
		await page
			.locator('[data-result-id="core-rules/attributes-and-prime-modifier/attribute-limit"]')
			.click();

		await expect(page).toHaveURL(
			/\/rulebook\/core-rules\/attributes-and-prime-modifier#rulebook-core-rules--attributes-and-prime-modifier--attribute-limit$/
		);
		await expect(page.getByRole('heading', { name: 'Attribute Limit', exact: true })).toBeVisible();
	});
});
