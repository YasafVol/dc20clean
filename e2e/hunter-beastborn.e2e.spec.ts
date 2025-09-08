import { test, expect } from '@playwright/test';

test.describe('Hunter (Beastborn, Urban + Grassland) E2E', () => {
  test('full flow with flight, size, speed, skills and HP assertions', async ({ page, context }) => {
    await context.addInitScript(() => localStorage.clear());

    await page.goto('/');
    await page.getByRole('button', { name: /Create Character/i }).click();

    // Step 1: Class & Features
    await page.getByTestId('class-card-hunter').click();
    // Favored Terrain: choose 2 → Grassland and Urban
    await page
      .locator('input[type=checkbox][name="hunter_favored_terrain_0"][value="Grassland"]')
      .check();
    await page
      .locator('input[type=checkbox][name="hunter_favored_terrain_0"][value="Urban"]')
      .check();
    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 2: Ancestry – Beastborn traits
    await page.getByTestId('ancestry-card-beastborn').click();

    // Select traits: Glide Speed (2), Limited Flight (2), Full Flight (2), Winged Arms (-1), Small-Sized (-1), Natural Weapon (1)
    await page.getByLabel(/Glide Speed/i).check();
    await page.getByLabel(/Limited Flight/i).check();
    await page.getByLabel(/Winged Arms/i).check();
    await page.getByLabel(/Full Flight/i).check();
    await page.getByLabel(/Small-Sized/i).check();
    await page.getByRole('checkbox', { name: /^Natural Weapon \(1 pts\)/i }).check();

    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 3: Attributes – Might -1, Agility 3, Charisma 1, Intelligence 1
    // Starting from -2 baseline: clicks represent increments from -2 upwards
    // Might: -2 → -1 (1 click)
    await page.getByTestId('might-increase').click();
    // Agility: -2 → 3 (5 clicks)
    for (let i = 0; i < 5; i++) await page.getByTestId('agility-increase').click();
    // Charisma: -2 → 1 (3 clicks)
    for (let i = 0; i < 3; i++) await page.getByTestId('charisma-increase').click();
    // Intelligence: -2 → 1 (3 clicks)
    for (let i = 0; i < 3; i++) await page.getByTestId('intelligence-increase').click();

    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 4: Background – Skills
    await page.getByTestId('skills-tab').click();

    async function setSkillLevel(skillId: string, level: number) {
      const row = page.getByTestId(`skill-item-${skillId}`);
      await row.getByRole('button', { name: `${level}`, exact: true }).click();
    }

    // We should have 8 skill points: base 5 + INT(1) + Urban(+2) = 8
    await expect(page.getByTestId('skill-points-remaining')).toContainText('8 /');

    // Awareness at Adept (2)
    await setSkillLevel('awareness', 2);

    // Six more skills at Novice (1), covering each attribute association
    // might: athletics, intimidation
    // agility: acrobatics, trickery
    // charisma: insight or influence (pick insight to not clash with Urban later); also animal
    // intelligence: investigation (we already have INT to 1; this uses points only)
    const noviceSkills = [
      'athletics',
      'intimidation',
      'acrobatics',
      'trickery',
      'animal',
      'investigation'
    ];
    for (const s of noviceSkills) {
      await setSkillLevel(s, 1);
    }

    // Points should be 0 remaining
    await expect(page.getByTestId('skill-points-remaining')).toContainText('0 /');

    // Step 4: Trades & Languages
    // Trades
    await page.getByTestId('trades-tab').click();
    async function setTradeLevel(tradeName: string, level: number) {
      const row = page.getByTestId(`trade-item-${tradeName.toLowerCase()}`);
      await row.getByRole('button', { name: `${level}`, exact: true }).click();
    }
    // Use 3 points across three trades at level 1 (avoid Adept due to Level 1 Adept cap already used by Awareness)
    const tradesToLevel1 = ['Alchemy', 'Blacksmithing', 'Calligraphy'];
    for (const t of tradesToLevel1) {
      await setTradeLevel(t, 1);
    }

    // Languages
    await page.getByTestId('languages-tab').click();
    async function setLanguage(languageName: string, fluency: 'Limited' | 'Fluent') {
      const row = page.getByTestId(`language-item-${languageName.toLowerCase()}`);
      await row.getByRole('button', { name: new RegExp(`^${fluency}`) }).click();
    }
    // Spend 2 language points on one Fluent language
    await setLanguage('Elvish', 'Fluent');
    await page.getByRole('button', { name: 'Next →' }).click(); // proceed to Spells & Maneuvers

    // Step 5: Maneuvers (Hunter requires 4 at level 1)
    await page.getByRole('button', { name: /Maneuvers/i }).click();
    const addButtons = page.locator('button:has-text("Add")');
    // Add first four maneuvers available
    for (let i = 0; i < 4; i++) {
      await addButtons.nth(i).click();
    }
    await page.getByRole('button', { name: 'Next →' }).click(); // proceed to Names

    // Step 6: Names
    await page.getByLabel(/Character Name/i).fill('hunter beastborn urban grassland');
    await page.getByLabel(/Player Name/i).fill('playwright');
    await page.getByText(/Complete|Finish/i).click();

    // After completion, app navigates to Load Character
    await page.waitForURL('**/load-character');

    // Open the saved character's sheet
    const charCard = page.locator('div', { hasText: 'hunter beastborn urban grassland' }).first();
    await charCard.getByRole('button', { name: 'View Sheet' }).click();

    // Wait for character sheet route
    await page.waitForURL('**/character/**');

    // Verify saved data in storage as a backstop
    const saved = await page.evaluate(() => {
      const list = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
      return list.find((c: any) => c.finalName === 'hunter beastborn urban grassland');
    });
    expect(saved).toBeTruthy();
    expect(saved.finalHPMax).toBe(8);
    expect(saved.finalMoveSpeed).toBe(6);

    // On sheet: check Movement and Features text
    await expect(page.getByText(/MOVE SPEED/i)).toBeVisible({ timeout: 5000 });
    // At least ensure the value 6 is visible somewhere nearby
    await expect(page.getByText(/^6$/).first()).toBeVisible();
    await expect(page.getByText(/FEATURES/i).first()).toBeVisible();
    await expect(page.getByText(/Natural Weapon/i)).toBeVisible();
    await expect(page.getByText(/Full Flight/i)).toBeVisible();
    await expect(page.getByText(/Small-Sized/i)).toBeVisible();

    // TODO (future): Verify a Natural Weapon attack entry exists in Attacks section
    // Example stub (enable after Attacks renders natural weapons):
    // const attacksSection = page.getByText(/Attacks/i);
    // await attacksSection.click();
    // await expect(page.getByText(/Natural Weapon/i)).toBeVisible();
  });
});


