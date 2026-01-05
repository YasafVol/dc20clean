import { describe, it, expect } from 'vitest';
import { monkClass } from './monk_features';

describe('Monk Martial Stances', () => {
	it('should allow selecting 2 stances at level 1', () => {
		// Find the monk stance feature
		const stanceFeature = monkClass.coreFeatures.find((f) => f.id === 'monk_stance');

		expect(stanceFeature).toBeDefined();
		expect(stanceFeature?.levelGained).toBe(1);
		expect(stanceFeature?.featureName).toBe('Monk Stance');

		// Verify the choice definition
		const stanceChoice = stanceFeature?.choices?.[0];
		expect(stanceChoice).toBeDefined();
		expect(stanceChoice?.id).toBe('initial_stances');
		expect(stanceChoice?.count).toBe(2);
		expect(stanceChoice?.prompt).toBe('Choose 2 Monk Stances');

		// Verify we have at least 3 stance options (must have at least count+1 to have meaningful choice)
		expect(stanceChoice?.options.length).toBeGreaterThanOrEqual(3);

		// Verify all stance options have required fields (name, description, effects)
		stanceChoice?.options.forEach((option) => {
			expect(option.name).toBeDefined();
			expect(option.description).toBeDefined();
			expect(option.effects).toBeDefined();
			expect(Array.isArray(option.effects)).toBe(true);
		});
	});

	it('should have exactly 9 stance options', () => {
		const stanceFeature = monkClass.coreFeatures.find((f) => f.id === 'monk_stance');
		const stanceChoice = stanceFeature?.choices?.[0];

		// Verify we have all 9 traditional monk stances
		expect(stanceChoice?.options.length).toBe(9);

		const expectedStanceNames = [
			'Bear Stance',
			'Bull Stance',
			'Cobra Stance',
			'Gazelle Stance',
			'Mantis Stance',
			'Mongoose Stance',
			'Scorpion Stance',
			'Turtle Stance',
			'Wolf Stance'
		];

		const actualStanceNames = stanceChoice?.options.map((o) => o.name) || [];

		expectedStanceNames.forEach((expectedName) => {
			expect(actualStanceNames).toContain(expectedName);
		});
	});
});
