import { describe, it, expect } from 'vitest';
import {
	calculateCharacterWithBreakdowns,
	convertToEnhancedBuildData
} from './enhancedCharacterCalculator';
import { type Character } from '../types/character';
import { type Effect } from '../rulesdata/schemas/character.schema';
import { skillsData } from '../rulesdata/skills';
import { tradesData } from '../rulesdata/trades';

type CharacterWithSkillElevations = Character & {
	skillMasteryLimitElevations?: Record<string, { source: 'spent_points'; value: number }>;
};

// A baseline character build for testing
const createTestCharacter = (
	level: number,
	skills: Record<string, number>,
	effects: Effect[] = [],
	skillMasteryLimitElevations: Record<string, { source: 'spent_points'; value: number }> = {}
): CharacterWithSkillElevations => ({
	level,
	skillsData: skills,
	skillMasteryLimitElevations,
	// Mock other required properties
	finalName: 'Test Character',
	playerId: 'test',
	ancestry1Id: 'human',
	classId: '',
	attribute_might: 0,
	attribute_agility: 0,
	attribute_intelligence: 0,
	attribute_charisma: 0,
	tradesData: {},
	languagesData: {},
	selectedTraitIds: [],
	selectedFeatureChoices: {},
	spellbook: {},
	maneuverbook: {},
	inventory: {},
	characterId: 'test-id',
	// This is where we'll inject our test effects
	// In a real scenario, these would come from resolved traits/features
	_unresolvedEffects: effects.map((eff) => ({ ...eff, source: 'Test' }))
});

describe('enhancedCharacterCalculator Mastery Cap Logic', () => {
	it('should preserve point-bought mastery limit elevations when converting context data', () => {
		const buildData = convertToEnhancedBuildData({
			level: 1,
			attribute_intelligence: 1,
			skillsData: { athletics: 2, stealth: 2 },
			skillMasteryLimitElevations: {
				athletics: { source: 'spent_points', value: 1 },
				stealth: { source: 'spent_points', value: 1 }
			}
		});
		const result = calculateCharacterWithBreakdowns(buildData);
		expect(result.background.skillPointsUsed).toBe(6);
		expect(result.validation.errors.some((e) => e.code === 'INVALID_MASTERY_GRANT')).toBe(false);
	});

	it('should error when a Level 1 Adept skill has no paid limit elevation', () => {
		const character = createTestCharacter(1, { athletics: 2 });
		const { validation } = calculateCharacterWithBreakdowns(character);
		expect(validation.errors.some((e) => e.code === 'MASTERY_CAP_EXCEEDED')).toBe(true);
		expect(validation.errors.some((e) => e.code === 'INVALID_MASTERY_GRANT')).toBe(true);
	});

	it('should allow two Level 1 Adept skills when both limit elevations are paid', () => {
		const character = createTestCharacter(
			1,
			{ athletics: 2, stealth: 2 },
			[],
			{
				athletics: { source: 'spent_points', value: 1 },
				stealth: { source: 'spent_points', value: 1 }
			}
		);
		const { validation } = calculateCharacterWithBreakdowns(character);
		expect(validation.errors.some((e) => e.code === 'MASTERY_CAP_EXCEEDED')).toBe(false);
		expect(validation.errors.some((e) => e.code === 'INVALID_MASTERY_GRANT')).toBe(false);
	});

	it('should count Level 1 Adept skills as 3 skill points each when paid with points', () => {
		const character = createTestCharacter(
			1,
			{ athletics: 2, stealth: 2 },
			[],
			{
				athletics: { source: 'spent_points', value: 1 },
				stealth: { source: 'spent_points', value: 1 }
			}
		);
		character.attribute_intelligence = 1;
		const result = calculateCharacterWithBreakdowns(character);
		expect(result.background.skillPointsUsed).toBe(6);
		expect(result.background.availableSkillPoints).toBe(6);
	});

	it('should allow Adept skills for a Level 5 character', () => {
		const character = createTestCharacter(5, { athletics: 2 }); // Adept is valid at level 5
		const { validation } = calculateCharacterWithBreakdowns(character);
		expect(
			validation.errors.some((e) => e.message.includes('Athletics mastery cap exceeded'))
		).toBe(false);
	});

	it('should apply an INCREASE_SKILL_MASTERY_CAP effect correctly', () => {
		// Use real Human Skill Expertise trait instead of synthetic effects
		const character = createTestCharacter(1, { stealth: 2 }, []); // No synthetic effects
		character.selectedTraitIds = ['human_skill_expertise']; // Select the real trait
		const { validation } = calculateCharacterWithBreakdowns(character);
		console.log('Test 4 - Human Skill Expertise validation errors:', validation.errors);
		expect(validation.errors.some((e) => e.message.includes('mastery limit'))).toBe(false);
	});

	it('should handle a combination of Rogue Expertise and Human Skill Expertise', () => {
		// Use real Rogue class with Expertise + Human Skill Expertise trait
		const character = createTestCharacter(1, { athletics: 2, stealth: 2 }, []);
		character.classId = 'rogue'; // Rogue gets 1 INCREASE_SKILL_MASTERY_CAP from Expertise
		character.selectedTraitIds = ['human_skill_expertise']; // Human gets 1 more INCREASE_SKILL_MASTERY_CAP

		// Total: 2 skills can be Adept (1 from Rogue + 1 from Human)
		const { validation } = calculateCharacterWithBreakdowns(character);
		console.log('Test 5 - Rogue + Human Expertise validation errors:', validation.errors);
		expect(validation.errors.length).toBe(0);
	});
});

describe('enhancedCharacterCalculator Prime Modifier', () => {
	describe('Prime modifier modes', () => {
		it('defaults to the highest attribute when the optional rule is disabled', () => {
			const character = createTestCharacter(4, {});
			character.attribute_might = 3;
			character.attribute_agility = 1;

			const result = calculateCharacterWithBreakdowns(character);

			expect(result.stats.usePrimeCapRule).toBe(false);
			expect(result.stats.finalPrimeModifierValue).toBe(3);
			expect(result.stats.finalPrimeModifierAttribute).toBe('might');
		});

		it('respects tie-breaking order when multiple attributes share the max value', () => {
			const character = createTestCharacter(1, {});
			character.attribute_might = 2;
			character.attribute_agility = 2;
			character.attribute_charisma = 2;

			const result = calculateCharacterWithBreakdowns(character);

			expect(result.stats.finalPrimeModifierValue).toBe(2);
			expect(result.stats.finalPrimeModifierAttribute).toBe('might'); // priority order
		});
	});

	it('sets prime modifier to the level cap when the optional rule is enabled', () => {
		const character = createTestCharacter(1, {});
		(character as any).usePrimeCapRule = true;

		const result = calculateCharacterWithBreakdowns(character);

		expect(result.stats.usePrimeCapRule).toBe(true);
		expect(result.stats.finalPrimeModifierValue).toBe(3); // Level 1 cap
		expect(result.stats.finalPrimeModifierAttribute).toBe('prime');
	});

	it('escalates prime modifier with level caps when the rule is enabled', () => {
		const character = createTestCharacter(12, {});
		(character as any).usePrimeCapRule = true;

		const result = calculateCharacterWithBreakdowns(character);

		expect(result.stats.finalPrimeModifierValue).toBe(5); // Level 12 cap per table
		expect(result.stats.finalPrimeModifierAttribute).toBe('prime');
	});

	it('ignores attribute totals in cap mode even if attributes are negative', () => {
		const character = createTestCharacter(18, {});
		character.attribute_might = -2;
		character.attribute_agility = -2;
		character.attribute_charisma = -2;
		character.attribute_intelligence = -2;
		(character as any).usePrimeCapRule = true;

		const result = calculateCharacterWithBreakdowns(character);

		expect(result.stats.finalPrimeModifierValue).toBe(6); // Level 18 cap per table
		expect(result.stats.finalPrimeModifierAttribute).toBe('prime');
	});
});
