import { describe, it, expect } from 'vitest';
import { calculateCharacterWithBreakdowns } from './enhancedCharacterCalculator';
import { type Character, type CharacterCalculationBreakdown } from '../types/character';
import { type Effect } from '../rulesdata/schemas/character.schema';
import { skillsData } from '../rulesdata/skills'
import { tradesData } from '../rulesdata/trades'

// A baseline character build for testing
const createTestCharacter = (level: number, skills: Record<string, number>, effects: Effect[] = []): Character => ({
	level,
	skillsData: skills,
	// Mock other required properties
	finalName: 'Test Character',
	playerId: 'test',
	ancestry1Id: 'human',
	classId: 'fighter',
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
	_unresolvedEffects: effects.map(eff => ({...eff, source: 'Test'})),
});

describe('enhancedCharacterCalculator Mastery Cap Logic', () => {
    it('should enforce the correct baseline mastery cap based on level', () => {
        // Level 1 character can only have Novice (1 point) skills
        const character = createTestCharacter(1, { athletics: 2 }); // Attempting Adept
        const { validation } = calculateCharacterWithBreakdowns(character, skillsData, tradesData);
        expect(validation.errors.some(e => e.message.includes('mastery limit'))).toBe(true);
    });

    it('should allow Adept skills for a Level 5 character', () => {
        const character = createTestCharacter(5, { athletics: 2 }); // Adept is valid at level 5
        const { validation } = calculateCharacterWithBreakdowns(character, skillsData, tradesData);
        expect(validation.errors.some(e => e.message.includes('Athletics mastery cap exceeded'))).toBe(false);
    });

    it('should apply a MODIFY_SKILL_MASTERY_CAP effect correctly', () => {
        const urbanHunterEffect: Effect = {
            type: 'MODIFY_SKILL_MASTERY_CAP',
            tier: 'Adept',
            count: 2,
            options: ['influence', 'insight', 'investigation', 'intimidation', 'trickery'],
        };
        // Level 1 character attempts to get Adept in a skill covered by the grant
        const character = createTestCharacter(1, { influence: 2 }, [urbanHunterEffect]);
        const { validation } = calculateCharacterWithBreakdowns(character, skillsData, tradesData);
        expect(validation.errors.some(e => e.message.includes('mastery limit'))).toBe(false);
    });

    it('should respect the count limit of a MODIFY_SKILL_MASTERY_CAP effect', () => {
        const urbanHunterEffect: Effect = {
            type: 'MODIFY_SKILL_MASTERY_CAP',
            tier: 'Adept',
            count: 2,
            options: ['influence', 'insight', 'investigation', 'intimidation', 'trickery'],
        };
        // Level 1 character attempts to get Adept in THREE skills, but the grant only allows 2
        const character = createTestCharacter(1, { influence: 2, insight: 2, investigation: 2 }, [urbanHunterEffect]);
        const { validation } = calculateCharacterWithBreakdowns(character, skillsData, tradesData);
        expect(validation.errors.some(e => e.message.includes('Mastery grant budget exceeded'))).toBe(true);
    });

    it('should not apply a MODIFY effect to a skill not in its options', () => {
        const urbanHunterEffect: Effect = {
            type: 'MODIFY_SKILL_MASTERY_CAP',
            tier: 'Adept',
            count: 2,
            options: ['influence', 'insight'], // Limited options
        };
        // Level 1 character attempts to get Adept in Athletics, which is not covered by the grant
        const character = createTestCharacter(1, { athletics: 2 }, [urbanHunterEffect]);
        const { validation } = calculateCharacterWithBreakdowns(character, skillsData, tradesData);
        expect(validation.errors.some(e => e.message.includes('Athletics mastery cap exceeded'))).toBe(true);
    });

    it('should apply an INCREASE_SKILL_MASTERY_CAP effect correctly', () => {
        const expertiseEffect: Effect = {
            type: 'INCREASE_SKILL_MASTERY_CAP',
            count: 1,
            value: 1,
        };
        // Level 1 character (base Novice) with +1 tier grant should be able to get Adept
        const character = createTestCharacter(1, { stealth: 2 }, [expertiseEffect]);
        const { validation } = calculateCharacterWithBreakdowns(character, skillsData, tradesData);
        expect(validation.errors.some(e => e.message.includes('mastery limit'))).toBe(false);
    });

     it('should handle a combination of MODIFY and INCREASE effects', () => {
        const urbanHunterEffect: Effect = {
            type: 'MODIFY_SKILL_MASTERY_CAP',
            tier: 'Adept',
            count: 1,
            options: ['influence'],
        };
         const expertiseEffect: Effect = {
            type: 'INCREASE_SKILL_MASTERY_CAP',
            count: 1,
            value: 1,
        };
        // Level 1 character gets Adept Influence (MODIFY) and Adept Stealth (INCREASE)
        const character = createTestCharacter(1, { influence: 2, stealth: 2 }, [urbanHunterEffect, expertiseEffect]);
        const { validation } = calculateCharacterWithBreakdowns(character, skillsData, tradesData);
        expect(validation.errors.length).toBe(0);
    });
});
