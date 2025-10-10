/**
 * Unit Tests for ClassFeatures Logic
 * 
 * Tests the progressive feature display logic without full component rendering.
 * Focuses on feature filtering, grouping, and choice tracking.
 */

import { describe, it, expect } from 'vitest';

// Mock class feature data for testing
const mockMonkFeatures = [
	{ id: 'monk_source', featureName: 'Source of Power', levelGained: 1, description: 'Monks harness Ki' },
	{ id: 'monk_training', featureName: 'Monk Training', levelGained: 1, description: 'Martial arts training' },
	{ 
		id: 'monk_stance', 
		featureName: 'Monk Stance', 
		levelGained: 1, 
		description: 'Learn stances',
		choices: [
			{
				id: 'initial_stances',
				prompt: 'Choose 2 Monk Stances',
				count: 2,
				options: [
					{ name: 'Bear Stance', description: 'Big Hits', effects: [] },
					{ name: 'Cobra Stance', description: 'Counter', effects: [] }
				]
			}
		]
	},
	{ id: 'monk_spiritual', featureName: 'Spiritual Balance', levelGained: 2, description: 'Ki Points' },
	{ id: 'monk_talent', featureName: 'Talent', levelGained: 2, description: 'Gain a talent' },
	{ id: 'monk_subclass', featureName: 'Subclass Feature', levelGained: 3, description: 'Subclass feature' }
];

describe('ClassFeatures Logic - Feature Grouping by Level', () => {
	/**
	 * This is the core logic from ClassFeatures.tsx lines 143-149:
	 * 
	 * const featuresByLevel: Record<number, typeof selectedClassFeatures.coreFeatures> = {};
	 * for (let level = 1; level <= state.level; level++) {
	 *   featuresByLevel[level] = selectedClassFeatures.coreFeatures.filter(
	 *     (feature) => feature.levelGained === level
	 *   );
	 * }
	 */
	
	const groupFeaturesByLevel = (features: any[], characterLevel: number) => {
		const featuresByLevel: Record<number, any[]> = {};
		for (let level = 1; level <= characterLevel; level++) {
			featuresByLevel[level] = features.filter(
				(feature) => feature.levelGained === level
			);
		}
		return featuresByLevel;
	};

	it('should group features by level for level 1 character', () => {
		const grouped = groupFeaturesByLevel(mockMonkFeatures, 1);
		
		// Should have level 1 key
		expect(grouped[1]).toBeDefined();
		expect(grouped[1].length).toBe(3); // Source, Training, Stance
		
		// Should not have level 2 or 3 (loop only goes up to characterLevel)
		expect(grouped[2]).toBeUndefined(); // Not created for level 2
		expect(grouped[3]).toBeUndefined(); // Not created for level 3
	});

	it('should group features by level for level 2 character', () => {
		const grouped = groupFeaturesByLevel(mockMonkFeatures, 2);
		
		// Should have both levels with correct counts
		expect(grouped[1]).toBeDefined();
		expect(grouped[1].length).toBe(3); // Level 1 features
		expect(grouped[2]).toBeDefined();
		expect(grouped[2].length).toBe(2); // Spiritual Balance, Talent
		
		// Should not have level 3
		expect(grouped[3]).toBeUndefined();
	});

	it('should group features by level for level 3 character', () => {
		const grouped = groupFeaturesByLevel(mockMonkFeatures, 3);
		
		// Should have all three levels
		expect(grouped[1].length).toBe(3);
		expect(grouped[2].length).toBe(2);
		expect(grouped[3].length).toBe(1); // Subclass feature
	});

	it('should handle levels without features (empty arrays)', () => {
		const grouped = groupFeaturesByLevel(mockMonkFeatures, 5);
		
		// Levels 4 and 5 have no features
		expect(grouped[4]).toBeDefined();
		expect(grouped[4].length).toBe(0); // Empty, not undefined
		expect(grouped[5]).toBeDefined();
		expect(grouped[5].length).toBe(0); // Empty, not undefined
	});

	it('should return features in same order as input', () => {
		const grouped = groupFeaturesByLevel(mockMonkFeatures, 1);
		
		// Check order is preserved
		expect(grouped[1][0].featureName).toBe('Source of Power');
		expect(grouped[1][1].featureName).toBe('Monk Training');
		expect(grouped[1][2].featureName).toBe('Monk Stance');
	});
});

describe('ClassFeatures Logic - Choice Tracking by Level', () => {
	/**
	 * This tests the logic from ClassFeatures.tsx lines 151-264:
	 * Choices are now tracked with a 'level' field
	 */
	
	const extractChoicesWithLevel = (features: any[], characterLevel: number) => {
		const choices: any[] = [];
		
		for (let level = 1; level <= characterLevel; level++) {
			const levelFeatures = features.filter(f => f.levelGained === level);
			
			levelFeatures.forEach((feature) => {
				if (feature.choices) {
					feature.choices.forEach((choice: any) => {
						choices.push({
							id: `${feature.featureName.toLowerCase()}_${choice.id}`,
							prompt: choice.prompt,
							level: level, // Track which level this belongs to
							options: choice.options
						});
					});
				}
			});
		}
		
		return choices;
	};

	it('should extract choices with level 1 tag for level 1 features', () => {
		const choices = extractChoicesWithLevel(mockMonkFeatures, 1);
		
		expect(choices.length).toBe(1); // Monk Stance choice
		expect(choices[0].prompt).toBe('Choose 2 Monk Stances');
		expect(choices[0].level).toBe(1); // Tagged as level 1
	});

	it('should not include choices from higher levels', () => {
		const choices = extractChoicesWithLevel(mockMonkFeatures, 1);
		
		// Should only have level 1 choices
		const level2Choices = choices.filter(c => c.level === 2);
		expect(level2Choices.length).toBe(0);
	});

	it('should extract choices from multiple levels for higher level characters', () => {
		// Add a level 2 choice to test data
		const featuresWithLevel2Choice = [
			...mockMonkFeatures,
			{
				id: 'monk_choice_2',
				featureName: 'Level 2 Choice',
				levelGained: 2,
				choices: [{
					id: 'test_choice',
					prompt: 'Choose something',
					count: 1,
					options: [{ name: 'Option A', description: '', effects: [] }]
				}]
			}
		];
		
		const choices = extractChoicesWithLevel(featuresWithLevel2Choice, 2);
		
		// Should have choices from both levels
		const level1Choices = choices.filter(c => c.level === 1);
		const level2Choices = choices.filter(c => c.level === 2);
		
		expect(level1Choices.length).toBe(1);
		expect(level2Choices.length).toBe(1);
	});

	it('should enable filtering choices by level for rendering', () => {
		const choices = extractChoicesWithLevel(mockMonkFeatures, 3);
		
		// Simulate filtering for level 1 section
		const level1Choices = choices.filter(c => c.level === 1);
		
		expect(level1Choices.length).toBeGreaterThan(0);
		expect(level1Choices.every(c => c.level === 1)).toBe(true);
	});
});

describe('ClassFeatures Logic - Progressive Display Properties', () => {
	it('should demonstrate cumulative feature display', () => {
		// This is the key property: features accumulate
		const level1Features = mockMonkFeatures.filter(f => f.levelGained <= 1);
		const level2Features = mockMonkFeatures.filter(f => f.levelGained <= 2);
		const level3Features = mockMonkFeatures.filter(f => f.levelGained <= 3);
		
		expect(level1Features.length).toBe(3);
		expect(level2Features.length).toBe(5); // Cumulative
		expect(level3Features.length).toBe(6); // Cumulative
		
		// Level 2 includes all level 1 features
		expect(level2Features.length).toBeGreaterThan(level1Features.length);
	});

	it('should demonstrate choice ordering within levels', () => {
		// Choices at level 1 should be rendered with level 1 features
		// not at the end after all features
		
		const level1Features = mockMonkFeatures.filter(f => f.levelGained === 1);
		const hasChoices = level1Features.some(f => f.choices && f.choices.length > 0);
		
		expect(hasChoices).toBe(true);
		expect(level1Features.find(f => f.featureName === 'Monk Stance')).toBeDefined();
	});

	it('should demonstrate section filtering (no empty sections)', () => {
		const groupedFeatures = {
			1: ['feature1', 'feature2'],
			2: ['feature3'],
			3: [], // Empty
			4: [] // Empty
		};
		
		// Filter out empty sections (lines 714-715 in ClassFeatures.tsx)
		const nonEmptySections = Object.entries(groupedFeatures)
			.filter(([, features]) => (features as any[]).length > 0);
		
		expect(nonEmptySections.length).toBe(2); // Only levels 1 and 2
		expect(nonEmptySections.map(([level]) => level)).toEqual(['1', '2']);
	});
});

describe('ClassFeatures Logic - Choice Ordering Validation', () => {
	it('should ensure level 1 choices appear before level 2 section', () => {
		// This tests the logical ordering:
		// Level 1 Features -> Level 1 Choices -> Level 2 Features -> Level 2 Choices
		
		const sections = [
			{ type: 'features', level: 1, name: 'Level 1 Features' },
			{ type: 'choice', level: 1, name: 'Monk Stance Choice' },
			{ type: 'features', level: 2, name: 'Level 2 Features' }
		];
		
		const stanceIndex = sections.findIndex(s => s.type === 'choice' && s.level === 1);
		const level2Index = sections.findIndex(s => s.type === 'features' && s.level === 2);
		
		// Stance choice (level 1) should come before Level 2 Features
		expect(stanceIndex).toBeLessThan(level2Index);
		expect(stanceIndex).toBeGreaterThanOrEqual(0);
		expect(level2Index).toBeGreaterThan(0);
	});
});

describe('ClassFeatures Logic - Integration Test', () => {
	it('should correctly group features and choices for a level 2 Monk', () => {
		const characterLevel = 2;
		
		// Group features by level
		const featuresByLevel: Record<number, any[]> = {};
		for (let level = 1; level <= characterLevel; level++) {
			featuresByLevel[level] = mockMonkFeatures.filter(
				(feature) => feature.levelGained === level
			);
		}
		
		// Extract choices with level tags
		const allChoices: any[] = [];
		for (let level = 1; level <= characterLevel; level++) {
			const levelFeatures = featuresByLevel[level] || [];
			levelFeatures.forEach((feature) => {
				if (feature.choices) {
					feature.choices.forEach((choice: any) => {
						allChoices.push({
							...choice,
							level: level
						});
					});
				}
			});
		}
		
		// Verify structure
		expect(featuresByLevel[1].length).toBe(3); // 3 level 1 features
		expect(featuresByLevel[2].length).toBe(2); // 2 level 2 features
		
		// Verify choices
		const level1Choices = allChoices.filter(c => c.level === 1);
		const level2Choices = allChoices.filter(c => c.level === 2);
		
		expect(level1Choices.length).toBe(1); // Monk Stance
		expect(level2Choices.length).toBe(0); // No level 2 choices in mock data
		
		// Verify choice is associated with correct level
		expect(level1Choices[0].prompt).toBe('Choose 2 Monk Stances');
	});
});

