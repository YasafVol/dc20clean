import { test, expect } from '@playwright/test';

// Requires pre-saved Convex auth state. Run `npm run test:e2e:setup-auth` to create
// e2e/.auth/dm.json and e2e/.auth/player.json before running this test.
test.describe('Campaign system', () => {
	test(
		'DM creates, player joins, views read-only character',
		async ({ browser }) => {
			// This test requires two authenticated sessions with Convex credentials.
			// Auth state must be pre-saved at e2e/.auth/dm.json and e2e/.auth/player.json
			test.skip(
				true,
				'Requires pre-saved auth state at e2e/.auth/dm.json and e2e/.auth/player.json'
			);

			// DM session
			const dmCtx = await browser.newContext({ storageState: 'e2e/.auth/dm.json' });
			const dmPage = await dmCtx.newPage();

			// Player session
			const playerCtx = await browser.newContext({ storageState: 'e2e/.auth/player.json' });
			const playerPage = await playerCtx.newPage();

			// 1. DM creates a campaign
			await dmPage.goto('/campaigns');
			await dmPage.getByRole('button', { name: 'Create Campaign' }).click();
			await dmPage.getByPlaceholder('Campaign name').fill('Test Campaign');
			await dmPage.keyboard.press('Enter');
			await dmPage.waitForURL(/\/campaigns\/.+/);

			// 2. DM copies join code
			const code = await dmPage.locator('span[style*="letter-spacing"]').textContent();
			expect(code).toMatch(/^[A-Z0-9]{6}$/);

			// 3. Player joins via code
			await playerPage.goto('/campaigns/join');
			await playerPage.getByPlaceholder(/code/i).fill(code!);
			await playerPage.getByRole('button', { name: 'Join' }).click();
			await playerPage.waitForURL(/\/campaigns\/.+/);

			// 4. DM shares a character
			await dmPage.getByRole('button', { name: '+ Share a Character' }).click();
			await dmPage.getByRole('button', { name: 'Share' }).first().click();

			// 5. Player sees the character in roster and can click View
			await playerPage.reload();
			const viewButton = playerPage.getByRole('button', { name: 'View' }).first();
			await expect(viewButton).toBeVisible({ timeout: 5000 });
			await viewButton.click();
			await playerPage.waitForURL(/\/campaigns\/.+\/character\/.+/);

			// 6. Read-only banner visible
			await expect(playerPage.getByText(/read-only/i)).toBeVisible();

			// 7. No save possible (no save button / auto-save indicator stays hidden)
			// Verify controls are disabled — click HP stepper should not change value
			// (implementation-specific; adapt to actual UI)

			await dmCtx.close();
			await playerCtx.close();
		}
	);
});
