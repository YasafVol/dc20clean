



import { test, expect } from '@playwright/test';

test.describe('Human Cleric E2E', () => {
  test('full flow and saved object validation', async ({ page, context }) => {
    await context.addInitScript(() => localStorage.clear());

    await page.goto('/');
    await page.getByRole('button', { name: /Create Character/i }).click();

    // Step 1: Class & Features - Use data-testid
    await page.getByTestId('class-card-cleric').click();
    await expect(page.getByText('Choose 2 Divine Domains')).toBeVisible();
    await page.locator('input[type=checkbox][name="cleric_cleric_order_1"][value="Ancestral"]').check();
    await page.locator('input[type=checkbox][name="cleric_cleric_order_1"][value="Magic"]').check();
    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 2: Ancestry (Human) - Use data-testid
    await page.getByTestId('ancestry-card-human').click();

    // Assert that the class bonus was applied correctly (5 base + 2 from Ancestral Domain = 7)
    await expect(page.getByText(/REMAINING: \d+\/7/i)).toBeVisible();

    // Select traits to spend all 7 points
    await page.getByLabel(/Attribute Increase/i).check();
    await page.getByLabel(/Skill Expertise/i).check();
    await page.getByLabel(/Human Resolve/i).check();
    await page.getByLabel(/Undying/i).check();
    await page.getByLabel(/Trade Expertise/i).check();
    await page.getByLabel(/Unbreakable/i).check();

    await expect(page.getByText(/REMAINING: 0\/7/i)).toBeVisible();
    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 3: Attributes (13 total = 12 base + 1 from human trait)
    await expect(page.getByText(/Attribute Points: 13\/13/i)).toBeVisible();

    async function incAttr(name: 'might' | 'intelligence' | 'agility' | 'charisma', times: number) {
      for (let i = 0; i < times; i++) {
        await page.getByTestId(`${name}-increase`).click();
      }
    }

    await incAttr('might', 4);
    await incAttr('intelligence', 5);
    await incAttr('agility', 2);
    await incAttr('charisma', 2);

    await expect(page.getByText(/Attribute Points: 0\/13/i)).toBeVisible();
    await expect(page.getByTestId('might-increase')).toBeDisabled();
    await expect(page.getByTestId('intelligence-increase')).toBeDisabled();
    await expect(page.getByTestId('agility-increase')).toBeDisabled();
    await expect(page.getByTestId('charisma-increase')).toBeDisabled();
    await expect(page.getByTestId('intelligence-increase')).toBeDisabled();
    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 4: Background – Skills - Use data-testid
    await page.getByTestId('skills-tab').click();

    async function setSkillLevel(skillName: string, level: number) {
      const skillRow = page.getByTestId(`skill-item-${skillName.toLowerCase()}`);
      await skillRow.getByRole('button', { name: `${level}`, exact: true }).click();
    }
    
    // The "Skill Expertise" trait allows raising one skill to level 2. We use this on Athletics.
    // This happens without spending from the main point pool.
    await setSkillLevel('Athletics', 2);
    
    // Spend skill points. Base (5) + INT(3) + Cleric Knowledge(2) = 10 total
    // Convert 1 skill → 2 trade, leaving 9 points to spend.
    await page.getByRole('button', { name: /Convert 1 Skill.*2 Trade/i }).click();

    // Spend the 9 points on 9 other skills.
    const skillsToLevel = ['Intimidation','Acrobatics','Insight','Investigation', 'Trickery', 'Stealth', 'Survival', 'Animal'];
    for (const skill of skillsToLevel) {
      await setSkillLevel(skill, 1);
    }
    
    await expect(page.getByTestId('skill-points-remaining')).toContainText('0 /');

    // Trades - Use data-testid
    await page.getByTestId('trades-tab').click();
    await page.getByRole('button', { name: /Convert 1 Trade.*2 Language/i }).click();

    // Helper to set a trade to a specific mastery level
    async function setTradeLevel(tradeName: string, level: number) {
      const tradeRow = page.getByTestId(`trade-item-${tradeName.toLowerCase()}`);
      await tradeRow.getByRole('button', { name: `${level}`, exact: true }).click();
    }

    // Set trade levels: Alchemy to 2, others to 1
    await setTradeLevel('Alchemy', 2);
    const otherTrades = ['Blacksmithing', 'Calligraphy', 'Gaming'];
    for (const trade of otherTrades) {
      await setTradeLevel(trade, 1);
    }
    await expect(page.getByText(/Trade Points:\s*0\s*\/\s*\d+/)).toBeVisible();

    // Languages - Use data-testid
    await page.getByTestId('languages-tab').click();

    // Helper to set a language to a specific fluency level
    async function setLanguage(languageName: string, fluency: 'Limited' | 'Fluent') {
      const languageRow = page.getByTestId(`language-item-${languageName.toLowerCase()}`);
      await languageRow.getByRole('button', { name: new RegExp(`^${fluency}`) }).click();
    }

    // Set language fluencies
    await setLanguage('Elvish', 'Fluent');
    await setLanguage('Draconic', 'Limited'); 
    await setLanguage('Dwarvish', 'Limited');
    await expect(page.getByText(/Language Points:\s*0\s*\/\s*\d+/)).toBeVisible();
    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 5: skip spells/maneuvers
    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 6: Names
    await page.getByLabel(/Character Name/i).fill('human cleric test');
    await page.getByLabel(/Player Name/i).fill('playwright');
    await page.getByText(/Complete|Finish/i).click();

    // Verify saved character from localStorage
    const saved = await page.evaluate(() => {
      const list = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
      return list.find((c: any) => c.finalName === 'human cleric test');
    });


    expect(saved).toBeTruthy();
    expect(saved.classId).toBe('cleric');
    expect(saved.ancestry1Id).toBe('human');
    const choices = saved.selectedFeatureChoices || {};
    const allChoiceValues = Object.values(choices).flat();
    expect(allChoiceValues).toEqual(expect.arrayContaining(['Ancestral', 'Magic']));

    expect(saved.selectedTraitIds).toEqual(
      expect.arrayContaining(['human_attribute_increase', 'human_skill_expertise', 'human_resolve', 'human_undying'])
    );

    expect(saved.finalMight).toBe(2);
    expect(saved.finalIntelligence).toBe(3);
    expect(saved.finalAgility).toBe(0);
    expect(saved.finalCharisma).toBe(0);

    expect(saved.skillsData).toMatchObject({ athletics: 2, intimidation: 1, acrobatics: 1, insight: 1, investigation: 1, trickery: 1, stealth: 1, survival: 1, animal: 1 });
    expect(saved.tradesData).toMatchObject({ alchemy: 2, blacksmithing: 1, calligraphy: 1, gaming: 1 });
    expect(saved.languagesData).toMatchObject({
      common: { fluency: 'fluent' }, elvish: { fluency: 'fluent' }, draconic: { fluency: 'limited' }, dwarvish: { fluency: 'limited' }
    });
  });
});


