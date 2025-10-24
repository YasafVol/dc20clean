/**
 * Unit Tests for ClassFeatures Component
 * 
 * Tests progressive feature display, level-based grouping, and choice ordering.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ClassFeatures from './ClassFeatures';

// Create a minimal wrapper that provides context
const TestWrapper = ({ children, characterState }: any) => {
	// Mock useCharacter hook
	const mockDispatch = vi.fn();
	
	// Override useCharacter for this test
	vi.mock('../../lib/stores/characterContext', () => ({
		useCharacter: () => ({
			state: characterState,
			dispatch: mockDispatch
		})
	}));
	
	return <div>{children}</div>;
};

// Mock the router
vi.mock('react-router-dom', () => ({
	useNavigate: () => vi.fn(),
	useLocation: () => ({ state: {} })
}));

// Mock useCharacter hook at module level
const mockDispatch = vi.fn();
const mockState = {
	id: 'test-char',
	finalName: 'Test Monk',
	level: 1,
	classId: 'monk',
	attribute_might: 0,
	attribute_agility: 0,
	attribute_charisma: 0,
	attribute_intelligence: 0,
	selectedTraitIds: [],
	selectedFeatureChoices: {},
	skillsData: {},
	tradesData: {},
	languagesData: { common: { fluency: 'fluent' } }
};

vi.mock('../../lib/stores/characterContext', () => ({
	useCharacter: () => ({
		state: mockState,
		dispatch: mockDispatch
	})
}));

// Mock the class loader
vi.mock('../../lib/rulesdata/loaders/class.loader', () => ({
	classesData: [
		{
			id: 'monk',
			name: 'Monk',
			levelProgression: [
				{ level: 1, techniquesKnown: 1 }
			]
		}
	]
}));

// Mock the class features loader
vi.mock('../../lib/rulesdata/loaders/class-features.loader', () => ({
	findClassByName: (name: string) => {
		if (name === 'Monk') {
			return {
				className: 'Monk',
				startingEquipment: {
					weaponsOrShields: ['2 Weapons'],
					armor: ['1 set of Light Armor'],
					packs: ['Adventuring Pack']
				},
				martialPath: {
					combatTraining: {
						weapons: ['Weapons'],
						armor: ['Light Armor']
					},
					staminaRegen: {
						description: 'Regain SP on successful checks'
					}
				},
				coreFeatures: [
					{
						id: 'monk_source_of_power',
						featureName: 'Source of Power',
						levelGained: 1,
						isFlavor: true,
						description: 'Monks harness their inner Ki.'
					},
					{
						id: 'monk_training',
						featureName: 'Monk Training',
						levelGained: 1,
						description: 'Your martial arts training grants you greater offense.',
						benefits: [
							{
								name: 'Iron Palm',
								description: 'Your limbs are Natural Weapons.',
								effects: []
							}
						]
					},
					{
						id: 'monk_stance',
						featureName: 'Monk Stance',
						levelGained: 1,
						description: 'You learn 2 Monk Stances.',
						choices: [
							{
								id: 'initial_stances',
								prompt: 'Choose 2 Monk Stances',
								count: 2,
								options: [
									{ name: 'Bear Stance', description: 'Big Hits', effects: [] },
									{ name: 'Cobra Stance', description: 'Counter', effects: [] },
									{ name: 'Turtle Stance', description: 'Sturdy', effects: [] }
								]
							}
						]
					},
					{
						id: 'monk_meditative_focus',
						featureName: 'Meditative Focus',
						levelGained: 1,
						description: 'During a Short Rest, meditate to increase Mastery.'
					},
					{
						id: 'monk_spiritual_balance',
						featureName: 'Spiritual Balance',
						levelGained: 2,
						description: 'Harness your inner spirit to unlock Ki Points.',
						benefits: [
							{
								name: 'Ki Points',
								description: 'You have Ki Points equal to your Stamina Points.',
								effects: []
							}
						]
					},
					{
						id: 'monk_talent_level_2',
						featureName: 'Talent',
						levelGained: 2,
						description: 'You gain 1 Talent of your choice.'
					},
					{
						id: 'monk_subclass_feature',
						featureName: 'Subclass Feature',
						levelGained: 3,
						description: 'You gain a feature from your subclass.'
					}
				],
				subclasses: []
			};
		}
		return null;
	},
	getLegacyChoiceId: (className: string, featureName: string, index: number) => 
		`${className.toLowerCase()}_${featureName.toLowerCase().replace(/\s+/g, '_')}_choice_${index}`,
	getAvailableSpellSchools: () => []
}));

// Mock techniques
vi.mock('../../lib/rulesdata/martials/techniques', () => ({
	techniques: [
		{ name: 'Defensive Stance', description: 'Increase defense', cost: { ap: 1 } }
	]
}));

// Mock spell schema
vi.mock('../../lib/rulesdata/schemas/spell.schema', () => ({
	SpellSchool: {
		Abjuration: 'Abjuration',
		Conjuration: 'Conjuration'
	}
}));

// Mock calculator
vi.mock('../../lib/services/enhancedCharacterCalculator', () => ({
	calculateCharacterWithBreakdowns: () => ({
		stats: {
			finalAttributePoints: 27,
			finalMight: 0,
			finalAgility: 0,
			finalCharisma: 0,
			finalIntelligence: 0,
			finalPrimeModifierValue: 0,
			finalPrimeModifierAttribute: 'might',
			usePrimeCapRule: false,
			finalCombatMastery: 1,
			finalHPMax: 10,
			finalSPMax: 2,
			finalMPMax: 0,
			finalPD: 10,
			finalAD: 10,
			finalPDR: 0,
			finalSaveDC: 10,
			finalDeathThreshold: 0,
			finalMoveSpeed: 6,
			finalJumpDistance: 2,
			finalRestPoints: 1,
			finalGritPoints: 0,
			finalInitiativeBonus: 0,
			finalAttackSpellCheck: 0,
			finalMartialCheck: 0,
			className: 'Monk',
			ancestry1Name: '',
			ancestry2Name: ''
		},
		resolvedFeatures: {
			availableSubclassChoice: false,
			subclassChoiceLevel: null,
			unlockedFeatures: []
		},
		background: {
			totalSkillPoints: 5,
			totalTradePoints: 2,
			totalLanguagePoints: 1,
			maxSkillMastery: 1,
			maxTradeMastery: 1,
			breakdown: {
				skillPoints: { base: 5, intelligence: 0, progression: 0, talents: 0 },
				tradePoints: { base: 2, intelligence: 0, progression: 0, talents: 0 },
				languagePoints: { base: 1, intelligence: 0, progression: 0, talents: 0 }
			}
		},
		attributedEffects: [],
		unresolvedChoices: [],
		validationErrors: [],
		isValid: true
	}),
	convertToEnhancedBuildData: (data: any) => data
}));

// Mock class feature descriptions
vi.mock('../../lib/utils/classFeatureDescriptions', () => ({
	getDetailedClassFeatureDescription: () => ''
}));

describe('ClassFeatures Component - Progressive Display', () => {
	// Clean up after each test to prevent DOM pollution
	afterEach(() => {
		cleanup();
	});

	describe('Level-Based Feature Grouping', () => {
		it('should display Level 1 Features section', () => {
			mockState.level = 1;
			
			render(<ClassFeatures />);

			// Should have Level 1 Features section
			expect(screen.getByText('Level 1 Features')).toBeInTheDocument();
		});

		it('should display level 1 feature names', () => {
			mockState.level = 1;
			
			render(<ClassFeatures />);
			
			// Should show level 1 features
			expect(screen.getByText('Source of Power')).toBeInTheDocument();
			expect(screen.getByText('Monk Training')).toBeInTheDocument();
			expect(screen.getByText('Monk Stance')).toBeInTheDocument();
			expect(screen.getByText('Meditative Focus')).toBeInTheDocument();
		});

		it('should NOT show level 2 features for level 1 character', () => {
			mockState.level = 1;
			
			render(<ClassFeatures />);
			
			// Should NOT have Level 2 Features section
			expect(screen.queryByText('Level 2 Features')).not.toBeInTheDocument();
			
			// Should NOT show level 2 features
			expect(screen.queryByText('Spiritual Balance')).not.toBeInTheDocument();
		});

		it('should display both Level 1 and Level 2 sections for level 2 character', () => {
			mockState.level = 2;
			
			render(<ClassFeatures />);

			// Should have both sections
			expect(screen.getByText('Level 1 Features')).toBeInTheDocument();
			expect(screen.getByText('Level 2 Features')).toBeInTheDocument();
		});

		it('should display level 2 features for level 2 character', () => {
			mockState.level = 2;
			
			render(<ClassFeatures />);
			
			// Should show level 2 features
			expect(screen.getByText('Spiritual Balance')).toBeInTheDocument();
			expect(screen.getByText('Talent')).toBeInTheDocument();
		});

		it('should display features from all levels up to current level', () => {
			mockState.level = 3;
			
			render(<ClassFeatures />);

			// Should have all three sections
			expect(screen.getByText('Level 1 Features')).toBeInTheDocument();
			expect(screen.getByText('Level 2 Features')).toBeInTheDocument();
			expect(screen.getByText('Level 3 Features')).toBeInTheDocument();
			
			// Should show features from all levels
			expect(screen.getByText('Source of Power')).toBeInTheDocument();
			expect(screen.getByText('Spiritual Balance')).toBeInTheDocument();
			expect(screen.getByText('Subclass Feature')).toBeInTheDocument();
		});
	});

	describe('Feature Choice Ordering', () => {
		it('should display stance choice within Level 1 section', () => {
			mockState.level = 1;
			
			render(<ClassFeatures />);

			// Stance choice should be present
			const stanceChoice = screen.getByText('Choose 2 Monk Stances');
			expect(stanceChoice).toBeInTheDocument();
		});

		it('should NOT display separate "Feature Choices" section', () => {
			mockState.level = 2;
			
			render(<ClassFeatures />);

			// The old "Feature Choices" header should not exist
			// (All choices are now integrated within level sections)
			const allText = document.body.textContent || '';
			const featureChoicesMatches = allText.match(/Feature Choices/g) || [];
			
			// Should not have a standalone "Feature Choices" section title
			// (May have "Level X Features" but not "Feature Choices")
			expect(featureChoicesMatches.length).toBe(0);
		});
	});

	describe('Feature Benefits Display', () => {
		it('should display feature benefits when present', () => {
			mockState.level = 1;
			
			render(<ClassFeatures />);

			// Check for benefit display
			expect(screen.getByText('Iron Palm')).toBeInTheDocument();
			expect(screen.getByText('Your limbs are Natural Weapons.')).toBeInTheDocument();
		});

		it('should display benefits for level 2 features', () => {
			mockState.level = 2;
			
			render(<ClassFeatures />);

			// Check for Level 2 feature benefits
			expect(screen.getByText('Ki Points')).toBeInTheDocument();
			expect(screen.getByText('You have Ki Points equal to your Stamina Points.')).toBeInTheDocument();
		});
	});

	describe('Choice Options Display', () => {
		it('should display all stance options', () => {
			mockState.level = 1;
			
			render(<ClassFeatures />);

			// Check for stance options
			expect(screen.getByText('Bear Stance')).toBeInTheDocument();
			expect(screen.getByText('Cobra Stance')).toBeInTheDocument();
			expect(screen.getByText('Turtle Stance')).toBeInTheDocument();
			
			// Check for descriptions
			expect(screen.getByText('Big Hits')).toBeInTheDocument();
			expect(screen.getByText('Counter')).toBeInTheDocument();
			expect(screen.getByText('Sturdy')).toBeInTheDocument();
		});
	});

	describe('Starting Equipment Section', () => {
		it('should display starting equipment section', () => {
			mockState.level = 1;
			
			render(<ClassFeatures />);

			expect(screen.getByText('Starting Equipment')).toBeInTheDocument();
			expect(screen.getByText('Equipment Package')).toBeInTheDocument();
		});
	});

	describe('Martial Training Section', () => {
		it('should display martial training section', () => {
			mockState.level = 1;
			
			render(<ClassFeatures />);

			expect(screen.getByText('Martial Training')).toBeInTheDocument();
			expect(screen.getByText('Combat Proficiencies')).toBeInTheDocument();
			expect(screen.getByText('Stamina Regeneration')).toBeInTheDocument();
		});
	});

	describe('Edge Cases', () => {
		it('should not show empty level sections', () => {
			mockState.level = 5; // Level 5 (no features defined past 3)
			
			render(<ClassFeatures />);

			// Should show levels 1-3 that have features
			expect(screen.getByText('Level 1 Features')).toBeInTheDocument();
			expect(screen.getByText('Level 2 Features')).toBeInTheDocument();
			expect(screen.getByText('Level 3 Features')).toBeInTheDocument();
			
			// Should NOT show Level 4 or 5 sections (no features at those levels)
			expect(screen.queryByText('Level 4 Features')).not.toBeInTheDocument();
			expect(screen.queryByText('Level 5 Features')).not.toBeInTheDocument();
		});

		it('should render null when no class is selected', () => {
			mockState.classId = ''; // No class selected
			
			const { container } = render(<ClassFeatures />);

			// Component should render empty (return null)
			expect(container.firstChild).toBeNull();
		});
	});
});
