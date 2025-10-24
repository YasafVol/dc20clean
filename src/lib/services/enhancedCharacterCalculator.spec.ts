import { describe, it, expect } from 'vitest';
import { calculateCharacterWithBreakdowns } from './enhancedCharacterCalculator';
import { type Character, type CharacterCalculationBreakdown } from '../types/character';
import { type Effect } from '../rulesdata/schemas/character.schema';
import { skillsData } from '../rulesdata/skills';
import { tradesData } from '../rulesdata/trades';

// A baseline character build for testing
const createTestCharacter = (
	level: number,
	skills: Record<string, number>,
	effects: Effect[] = []
): Character => ({
	level,
	skillsData: skills,
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
	it('should allow one Adept skill at Level 1 baseline', () => {
		// Level 1 character is allowed one Adept skill by default
		const character = createTestCharacter(1, { athletics: 2 });
		const { validation } = calculateCharacterWithBreakdowns(character, skillsData, tradesData);
		expect(validation.errors.some((e) => e.message.includes('mastery limit'))).toBe(false);
	});

	it('should error when Level 1 has two Adept skills without features', () => {
		const character = createTestCharacter(1, { athletics: 2, stealth: 2 });
		const { validation } = calculateCharacterWithBreakdowns(character, skillsData, tradesData);
		// Should have errors for exceeding mastery cap
		expect(validation.errors.some((e) => e.code === 'MASTERY_CAP_EXCEEDED')).toBe(true);
		expect(validation.errors.some((e) => e.message.includes("Adept level"))).toBe(true);
	});

	it('should allow Adept skills for a Level 5 character', () => {
		const character = createTestCharacter(5, { athletics: 2 }); // Adept is valid at level 5
		const { validation } = calculateCharacterWithBreakdowns(character, skillsData, tradesData);
		expect(
			validation.errors.some((e) => e.message.includes('Athletics mastery cap exceeded'))
		).toBe(false);
	});

	it('should apply an INCREASE_SKILL_MASTERY_CAP effect correctly', () => {
		// Use real Human Skill Expertise trait instead of synthetic effects
		const character = createTestCharacter(1, { stealth: 2 }, []); // No synthetic effects
		character.selectedTraitIds = ['human_skill_expertise']; // Select the real trait
		const { validation } = calculateCharacterWithBreakdowns(character, skillsData, tradesData);
		console.log('Test 4 - Human Skill Expertise validation errors:', validation.errors);
		expect(validation.errors.some((e) => e.message.includes('mastery limit'))).toBe(false);
	});

	it('should handle a combination of Rogue Expertise and Human Skill Expertise', () => {
		// Use real Rogue class with Expertise + Human Skill Expertise trait
		const character = createTestCharacter(1, { athletics: 2, stealth: 2, investigation: 2 }, []);
		character.classId = 'rogue'; // Rogue gets 2 INCREASE_SKILL_MASTERY_CAP from Expertise
		character.selectedTraitIds = ['human_skill_expertise']; // Human gets 1 more INCREASE_SKILL_MASTERY_CAP

		// Total: 3 skills can be Adept (2 from Rogue + 1 from Human)
		const { validation } = calculateCharacterWithBreakdowns(character, skillsData, tradesData);
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

			const result = calculateCharacterWithBreakdowns(character, skillsData, tradesData);

			expect(result.stats.usePrimeCapRule).toBe(false);
			expect(result.stats.finalPrimeModifierValue).toBe(3);
			expect(result.stats.finalPrimeModifierAttribute).toBe('might');
		});

		it('respects tie-breaking order when multiple attributes share the max value', () => {
			const character = createTestCharacter(1, {});
			character.attribute_might = 2;
			character.attribute_agility = 2;
			character.attribute_charisma = 2;

			const result = calculateCharacterWithBreakdowns(character, skillsData, tradesData);

			expect(result.stats.finalPrimeModifierValue).toBe(2);
			expect(result.stats.finalPrimeModifierAttribute).toBe('might'); // priority order
		});
	});

	it('sets prime modifier to the level cap when the optional rule is enabled', () => {
		const character = createTestCharacter(1, {});
		(character as any).usePrimeCapRule = true;

		const result = calculateCharacterWithBreakdowns(character, skillsData, tradesData);

		expect(result.stats.usePrimeCapRule).toBe(true);
		expect(result.stats.finalPrimeModifierValue).toBe(3); // Level 1 cap
		expect(result.stats.finalPrimeModifierAttribute).toBe('prime');
	});

	it('escalates prime modifier with level caps when the rule is enabled', () => {
		const character = createTestCharacter(12, {});
		(character as any).usePrimeCapRule = true;

		const result = calculateCharacterWithBreakdowns(character, skillsData, tradesData);

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

		const result = calculateCharacterWithBreakdowns(character, skillsData, tradesData);

		expect(result.stats.finalPrimeModifierValue).toBe(6); // Level 18 cap per table
		expect(result.stats.finalPrimeModifierAttribute).toBe('prime');
	});
});
