import { expect, type Page } from '@playwright/test';
import type { AgenticCharacterRecipe, LearnSelections } from '../recipes/types';
import type { AgenticRunLogger } from './runLogger';

type SavedCharacterLike = Record<string, any>;

async function clickNext(page: Page) {
	await page.getByRole('button', { name: 'Next →' }).click();
}

async function setSkillLevel(page: Page, skillId: string, level: number) {
	await page.getByTestId(`skill-${skillId}-mastery-${level}`).click();
}

async function setTradeLevel(page: Page, tradeId: string, level: number) {
	await page.getByTestId(`trade-${tradeId}-mastery-${level}`).click();
}

async function setLanguage(page: Page, languageId: string, fluency: 'Limited' | 'Fluent') {
	const row = page.getByTestId(`language-item-${languageId}`);
	await row.getByRole('button', { name: new RegExp(`^${fluency}`) }).click();
}

async function applyClassChoice(
	page: Page,
	choice: NonNullable<AgenticCharacterRecipe['classChoices']>[number]
) {
	const locator = choice.testId ? page.getByTestId(choice.testId) : page.locator(choice.selector!);
	await locator.check();
}

async function applyLevelingSelections(page: Page, recipe: AgenticCharacterRecipe) {
	if (!recipe.leveling) return;

	const talents = recipe.leveling.talents ?? {};
	if (Object.keys(talents).length > 0) {
		await page.getByTestId('leveling-talents-tab').click();
		for (const [talentId, count] of Object.entries(talents)) {
			for (let index = 0; index < count; index += 1) {
				await page.getByTestId(`talent-${talentId}-increase`).click();
			}
		}
	}

	const pathPointAllocations = recipe.leveling.pathPointAllocations ?? {};
	const pathEntries = [
		['martial', 'martial_path', pathPointAllocations.martial ?? 0],
		['spellcasting', 'spellcaster_path', pathPointAllocations.spellcasting ?? 0]
	] as const;

	if (pathEntries.some(([, , count]) => count > 0)) {
		await page.getByTestId('leveling-path-points-tab').click();
		for (const [, pathId, count] of pathEntries) {
			for (let index = 0; index < count; index += 1) {
				await page.getByTestId(`path-${pathId}-increase`).click();
			}
		}
	}
}

async function learnFirstAvailable(page: Page, maxSelections: number): Promise<number> {
	const learnButtons = page.locator('button:has-text("LEARN"):not(:disabled)');
	let learned = 0;

	while ((await learnButtons.count()) > 0 && learned < maxSelections) {
		await learnButtons.first().click();
		await page.waitForTimeout(150);
		learned += 1;
	}

	return learned;
}

async function learnSelections(
	page: Page,
	kind: 'spell' | 'maneuver',
	selections: LearnSelections
): Promise<number> {
	if (selections.mode === 'by-id') {
		let learned = 0;
		for (const id of selections.ids ?? []) {
			await page.getByTestId(`${kind}-${id}-learn`).click();
			await page.waitForTimeout(150);
			learned += 1;
		}
		return learned;
	}

	return learnFirstAvailable(page, selections.maxSelections);
}

async function getSavedCharacterByName(
	page: Page,
	characterName: string
): Promise<SavedCharacterLike | null> {
	return page.evaluate((name) => {
		const list = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
		return list.find((character: any) => character.finalName === name) ?? null;
	}, characterName);
}

export async function runCharacterCreationRecipe({
	page,
	recipe,
	logger
}: {
	page: Page;
	recipe: AgenticCharacterRecipe;
	logger: AgenticRunLogger;
}): Promise<SavedCharacterLike> {
	logger.record('recipe.start', `Starting ${recipe.name}`, {
		id: recipe.id,
		tags: recipe.tags
	});

	await page.goto('/');
	await page.getByRole('button', { name: /Create Character/i }).click();

	if (recipe.level && recipe.level > 1) {
		logger.record('recipe.step', 'Selecting starting level', { level: recipe.level });
		await page.getByTestId('starting-level-select').click();
		await page.getByTestId(`starting-level-option-${recipe.level}`).click();
	}

	logger.record('recipe.step', 'Selecting class', { classId: recipe.classId });
	await page.getByTestId(`class-card-${recipe.classId}`).click();

	for (const choice of recipe.classChoices ?? []) {
		const locator = choice.testId
			? page.getByTestId(choice.testId)
			: page.locator(choice.selector!);
		if (await locator.isVisible().catch(() => false)) {
			logger.record('recipe.choice', choice.description, {
				selector: choice.selector,
				testId: choice.testId
			});
			await applyClassChoice(page, choice);
		} else {
			logger.record(
				'hook.gap',
				`Class choice selector was not visible: ${choice.description}`,
				{ selector: choice.selector, testId: choice.testId },
				'warn'
			);
		}
	}

	if (recipe.subclass) {
		logger.record('recipe.choice', 'Selecting subclass', { subclassId: recipe.subclass.id });
		await page.getByTestId(`subclass-card-${recipe.subclass.id}`).click();
	}

	await clickNext(page);

	if (recipe.level && recipe.level > 1) {
		logger.record('recipe.step', 'Resolving leveling selections', recipe.leveling ?? {});
		await applyLevelingSelections(page, recipe);
		await clickNext(page);
	}

	const ancestryIds = recipe.ancestry.ids ?? [recipe.ancestry.id];
	logger.record('recipe.step', 'Selecting ancestry', { ancestryIds });
	for (const ancestryId of ancestryIds) {
		await page.getByTestId(`ancestry-card-${ancestryId}`).click();
	}

	for (const trait of recipe.ancestry.traits) {
		logger.record('recipe.choice', 'Selecting ancestry trait', {
			label: String(trait.label),
			expectedId: trait.expectedId
		});
		if (trait.expectedId) {
			const traitCard = page.getByTestId(`trait-card-${trait.expectedId}`);
			if ((await traitCard.count()) > 0) {
				await traitCard.click();
				continue;
			}
			logger.record(
				'hook.gap',
				`Trait card hook not found, falling back to label: ${trait.expectedId}`,
				{ traitId: trait.expectedId },
				'warn'
			);
		}
		await page.getByLabel(trait.label).check();
	}

	await expect(page.getByText(/REMAINING: 0\//i)).toBeVisible();
	await clickNext(page);

	logger.record('recipe.step', 'Allocating attributes', recipe.attributeClicks);
	for (const [attribute, clicks] of Object.entries(recipe.attributeClicks)) {
		for (let index = 0; index < clicks; index += 1) {
			await page.getByTestId(`${attribute}-increase`).click();
		}
	}

	await expect(page.getByText(/Attribute Points: 0\//i)).toBeVisible();
	await clickNext(page);

	logger.record('recipe.step', 'Allocating background');
	await page.getByTestId('skills-tab').click();
	for (let index = 0; index < (recipe.background.conversions?.skillToTrade ?? 0); index += 1) {
		await page.getByTestId('convert-skill-to-trade').click();
	}
	for (const [skillId, level] of Object.entries(recipe.background.skills)) {
		await setSkillLevel(page, skillId, level);
	}

	await page.getByTestId('trades-tab').click();
	for (let index = 0; index < (recipe.background.conversions?.tradeToLanguage ?? 0); index += 1) {
		await page.getByTestId('convert-trade-to-language').click();
	}
	for (const [tradeId, level] of Object.entries(recipe.background.trades)) {
		await setTradeLevel(page, tradeId, level);
	}

	await page.getByTestId('languages-tab').click();
	for (const [languageId, fluency] of Object.entries(recipe.background.languages)) {
		await setLanguage(page, languageId, fluency);
	}

	await clickNext(page);

	const spellsHeading = page.getByRole('heading', { name: /LEARN.*SPELLS/i });
	if (await spellsHeading.isVisible().catch(() => false)) {
		if (!recipe.spells) {
			throw new Error('Recipe reached Spells step but has no spells config');
		}
		const learned = await learnSelections(page, 'spell', recipe.spells);
		logger.record('recipe.step', 'Selected spells', { learned });
		await clickNext(page);
	} else if (recipe.spells && !recipe.spells.optional) {
		throw new Error('Recipe expected Spells step, but it was not visible');
	}

	const maneuversHeading = page.getByRole('heading', { name: /LEARN.*MANEUVERS/i });
	if (await maneuversHeading.isVisible().catch(() => false)) {
		if (!recipe.maneuvers) {
			throw new Error('Recipe reached Maneuvers step but has no maneuvers config');
		}
		const learned = await learnSelections(page, 'maneuver', recipe.maneuvers);
		logger.record('recipe.step', 'Selected maneuvers', { learned });
		await clickNext(page);
	} else if (recipe.maneuvers && !recipe.maneuvers.optional) {
		throw new Error('Recipe expected Maneuvers step, but it was not visible');
	}

	logger.record('recipe.step', 'Completing character name', {
		characterName: recipe.characterName
	});
	await page.getByTestId('character-name-input').fill(recipe.characterName);
	await page.getByTestId('player-name-input').fill(recipe.playerName);
	await page.getByText(/Complete|Finish/i).click();
	await page.waitForURL((url) => {
		const pathname = url.pathname;
		return pathname.includes('/load-character') || pathname.includes('/character/');
	});

	const saved = await getSavedCharacterByName(page, recipe.characterName);
	if (!saved) {
		throw new Error(`Saved character not found: ${recipe.characterName}`);
	}

	logger.writeJson('saved-character.json', saved);
	logger.record('recipe.saved', 'Saved character captured', {
		id: saved.id,
		classId: saved.classId,
		ancestry1Id: saved.ancestry1Id
	});

	return saved;
}
