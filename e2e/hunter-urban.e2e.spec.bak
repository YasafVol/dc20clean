import { test, expect } from '@playwright/test';

test.describe('Hunter (Urban) E2E', () => {
  test('mastery cap validation for Urban feature', async ({ page, context }) => {
    await context.addInitScript(() => localStorage.clear());

    await page.goto('/');
    await page.getByRole('button', { name: /Create Character/i }).click();

    // Step 1: Class & Features
    await page.getByTestId('class-card-hunter').click();
    // Select the "Urban" feature from the choice presented
    await page.locator('input[type=checkbox][name="hunter_background_1"][value="Urban"]').check();
    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 2: Ancestry (Human) - to keep it simple
    await page.getByTestId('ancestry-card-human').click();
    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 3: Attributes
    // We'll leave attributes at default to isolate the skill point calculation
    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 4: Background – Skills
    await page.getByTestId('skills-tab').click();

    async function setSkillLevel(skillName: string, level: number) {
      const skillRow = page.getByTestId(`skill-item-${skillName.toLowerCase()}`);
      await skillRow.getByRole('button', { name: `${level}`, exact: true }).click();
    }
    
    // The "Urban" feature grants 2 Adept mastery unlocks for a specific set of skills.
    // Let's use them on Influence and Insight.
    // Each Adept rank costs 2 skill points.
    await setSkillLevel('Influence', 2);
    await setSkillLevel('Insight', 2);

    // At this point, we should have used 4 skill points.
    // Base (5) + INT(0) = 5 total. 1 point should remain.
    await expect(page.getByTestId('skill-points-remaining')).toContainText('1 /');

    // Now, let's test the cap. We should NOT be able to raise Investigation to Adept.
    // The button for level 2 should be disabled.
    const investigationSkillRow = page.getByTestId('skill-item-investigation');
    await expect(investigationSkillRow.getByRole('button', { name: '2', exact: true })).toBeDisabled();
    
    // We should still be able to raise it to Novice (level 1) with our last point.
    await setSkillLevel('Investigation', 1);
    await expect(page.getByTestId('skill-points-remaining')).toContainText('0 /');

    // Step 5 & 6: Finish character creation
    await page.getByRole('button', { name: 'Next →' }).click(); // Skip trades/languages
    await page.getByRole('button', { name: 'Next →' }).click(); // Skip spells/maneuvers
    await page.getByLabel(/Character Name/i).fill('hunter urban test');
    await page.getByLabel(/Player Name/i).fill('playwright');
    await page.getByText(/Complete|Finish/i).click();

    // Verify saved character from localStorage
    const saved = await page.evaluate(() => {
      const list = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
      return list.find((c: any) => c.finalName === 'hunter urban test');
    });

    expect(saved).toBeTruthy();
    expect(saved.classId).toBe('hunter');
    const choices = saved.selectedFeatureChoices || {};
    const allChoiceValues = Object.values(choices).flat();
    expect(allChoiceValues).toEqual(expect.arrayContaining(['Urban']));

    expect(saved.skillsData).toMatchObject({ influence: 2, insight: 2, investigation: 1 });
  });
});
