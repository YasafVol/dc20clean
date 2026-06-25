import { test, type Page } from '@playwright/test';

export interface RecipeStep {
	name: string;
	run: (page: Page) => Promise<void>;
}

export async function runRecipe(page: Page, recipe: RecipeStep[]): Promise<void> {
	for (const step of recipe) {
		await test.step(step.name, () => step.run(page));
	}
}
