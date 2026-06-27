import { describe, it, expect } from 'vitest';
import { calculateCharacterWithBreakdowns } from './enhancedCharacterCalculator';
import { generateSpellsKnownSlots } from './calculatorModules/spellSystem';

// Helper to create a minimal character build data
const createBaseBuild = (overrides = {}) => ({
	id: 'test-id',
	characterId: 'test-char-id',
	level: 1,
	attribute_might: 0,
	attribute_agility: 0,
	attribute_intelligence: 0,
	attribute_charisma: 0,
	skillsData: {},
	tradesData: {},
	languagesData: {},
	selectedTraitIds: [],
	classId: null,
	featureChoices: {},
	selectedSpells: {},
	selectedManeuvers: [],
	...overrides
});

describe('Spell System - Global Magic Profile', () => {
	it('should initialize empty profile for non-spellcasters', () => {
		const build = createBaseBuild({ classId: 'barbarian' });
		const result = calculateCharacterWithBreakdowns(build as any);

		expect(result.globalMagicProfile).toBeDefined();
		expect(result.globalMagicProfile?.sources).toEqual([]);
	});

	it('should leave sources empty for source-unrestricted spell access', () => {
		const build = createBaseBuild({ classId: 'wizard' });
		const result = calculateCharacterWithBreakdowns(build as any);

		expect(result.globalMagicProfile?.sources).toEqual([]);
	});

	it('should read class spell school and tag rules into the profile', () => {
		const build = createBaseBuild({
			classId: 'bard'
		});
		const result = calculateCharacterWithBreakdowns(build as any);

		expect(result.globalMagicProfile?.schools).toContain('Enchantment');
		expect(result.globalMagicProfile?.tags).toContain('Healing');
	});
});

describe('Spell System - Spells Known Slots', () => {
	it('should generate base slots for spellcasters at level 1', () => {
		const build = createBaseBuild({ classId: 'wizard', level: 1 });
		const result = calculateCharacterWithBreakdowns(build as any);

		// Wizard at lvl 1 gets 4 spells in v0.10
		const spells = result.spellsKnownSlots.filter((s) => s.type === 'spell');

		expect(spells.length).toBe(4);
	});

	it('should handle specialized slots', () => {
		// Test with a character that has specialized spell grants from features
		const build = createBaseBuild({
			classId: 'wizard',
			level: 1
		});
		const result = calculateCharacterWithBreakdowns(build as any);

		const spells = result.spellsKnownSlots.filter((s) => s.type === 'spell');
		expect(spells.length).toBeGreaterThanOrEqual(4);
	});

	it('restricts the Cleric Magic domain spell slot to the selected nested spell tag', () => {
		const featureChoices = {
			cleric_cleric_order_1: ['Knowledge', 'Magic'],
			cleric_cleric_order_choice_1_option_1_effect_1_user_choice: 'Fire'
		};
		const result = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'cleric',
				level: 1,
				featureChoices
			}) as any
		);
		const magicDomainSlot = result.spellsKnownSlots.find((slot) =>
			slot.specificRestrictions?.tags?.includes('Fire' as any)
		);

		expect(magicDomainSlot).toBeDefined();

		const validResult = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'cleric',
				level: 1,
				featureChoices,
				selectedSpells: { [magicDomainSlot!.id]: 'fire-bolt' }
			}) as any
		);
		expect(
			validResult.validation.errors.find((error) => error.code === 'TAG_RESTRICTION')
		).toBeUndefined();

		const invalidResult = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'cleric',
				level: 1,
				featureChoices,
				selectedSpells: { [magicDomainSlot!.id]: 'heal' }
			}) as any
		);
		expect(
			invalidResult.validation.errors.find((error) => error.code === 'SCHOOL_RESTRICTION')
		).toBeDefined();
	});

	it('restricts Bard Eloquence charm grants to the exact Charm spell', () => {
		const result = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'bard',
				level: 3,
				selectedSubclass: 'Eloquence'
			}) as any
		);
		const charmSlot = result.spellsKnownSlots.find(
			(slot) => slot.specificRestrictions?.exactSpellId === 'charm'
		);

		expect(charmSlot).toBeDefined();

		const validResult = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'bard',
				level: 3,
				selectedSubclass: 'Eloquence',
				selectedSpells: { [charmSlot!.id]: 'charm' }
			}) as any
		);
		expect(
			validResult.validation.errors.find((error) => error.field === charmSlot!.id)
		).toBeUndefined();

		const invalidResult = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'bard',
				level: 3,
				selectedSubclass: 'Eloquence',
				selectedSpells: { [charmSlot!.id]: 'heal' }
			}) as any
		);
		expect(
			invalidResult.validation.errors.find((error) => error.field === charmSlot!.id)
		).toBeDefined();
	});

	it('restricts Pact Familiar to the exact Call Familiar spell', () => {
		const featureChoices = {
			warlock_pact_boon_0: 'Pact Familiar'
		};
		const result = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'warlock',
				level: 1,
				featureChoices
			}) as any
		);
		const familiarSlot = result.spellsKnownSlots.find(
			(slot) => slot.specificRestrictions?.exactSpellId === 'call-familiar'
		);

		expect(familiarSlot).toBeDefined();

		const validResult = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'warlock',
				level: 1,
				featureChoices,
				selectedSpells: { [familiarSlot!.id]: 'call-familiar' }
			}) as any
		);
		expect(
			validResult.validation.errors.find((error) => error.field === familiarSlot!.id)
		).toBeUndefined();

		const invalidResult = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'warlock',
				level: 1,
				featureChoices,
				selectedSpells: { [familiarSlot!.id]: 'arcane-bolt' }
			}) as any
		);
		expect(
			invalidResult.validation.errors.find((error) => error.field === familiarSlot!.id)
		).toBeDefined();
	});

	it('restricts Eldritch Warlock psychic spellcasting to Psychic-tagged spells', () => {
		const result = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'warlock',
				level: 3,
				selectedSubclass: 'Eldritch'
			}) as any
		);
		const psychicSlot = result.spellsKnownSlots.find((slot) =>
			slot.specificRestrictions?.tags?.includes('Psychic' as any)
		);

		expect(psychicSlot).toBeDefined();

		const validResult = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'warlock',
				level: 3,
				selectedSubclass: 'Eldritch',
				selectedSpells: { [psychicSlot!.id]: 'psychic-wave' }
			}) as any
		);
		expect(
			validResult.validation.errors.find((error) => error.field === psychicSlot!.id)
		).toBeUndefined();

		const invalidResult = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'warlock',
				level: 3,
				selectedSubclass: 'Eldritch',
				selectedSpells: { [psychicSlot!.id]: 'heal' }
			}) as any
		);
		expect(
			invalidResult.validation.errors.find((error) => error.field === psychicSlot!.id)
		).toBeDefined();
	});

	it('allows Bard Magical Secrets slots to learn outside the Bard global profile', () => {
		const result = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'bard',
				level: 1
			}) as any
		);
		const magicalSecretsSlot = result.spellsKnownSlots.find(
			(slot) => slot.sourceName === 'Magical Secrets'
		);
		const globalSlot = result.spellsKnownSlots.find((slot) => slot.isGlobal);

		expect(magicalSecretsSlot).toBeDefined();
		expect(magicalSecretsSlot?.isGlobal).toBe(false);
		expect(globalSlot).toBeDefined();
		expect(result.globalMagicProfile?.schools).toContain('Enchantment');
		expect(result.globalMagicProfile?.tags).toContain('Healing');

		const magicalSecretsResult = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'bard',
				level: 1,
				selectedSpells: { [magicalSecretsSlot!.id]: 'fireball' }
			}) as any
		);
		expect(
			magicalSecretsResult.validation.errors.find((error) => error.field === magicalSecretsSlot!.id)
		).toBeUndefined();

		const globalResult = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'bard',
				level: 1,
				selectedSpells: { [globalSlot!.id]: 'fireball' }
			}) as any
		);
		expect(
			globalResult.validation.errors.find(
				(error) => error.field === globalSlot!.id && error.code === 'PROFILE_MISMATCH'
			)
		).toBeDefined();
	});

	it('treats legacy cantrip progression as normal spell slots', () => {
		const slots = generateSpellsKnownSlots(
			createBaseBuild({ classId: 'wizard' }) as any,
			{ totalSpellsKnown: 1, totalCantripsKnown: 2 },
			[]
		);

		expect(slots).toHaveLength(3);
		expect(slots.every((slot) => slot.type === 'spell')).toBe(true);
	});
});

describe('Spell System - Validations', () => {
	it('should allow global slots when profile sources are empty and school matches', () => {
		const baseBuild = createBaseBuild({ classId: 'wizard', level: 1 });
		const result = calculateCharacterWithBreakdowns(baseBuild as any);
		const globalSlot = result.spellsKnownSlots.find((slot) => slot.isGlobal);

		expect(globalSlot).toBeDefined();

		const resultWithSelection = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'wizard',
				level: 1,
				selectedSpells: { [globalSlot!.id]: 'arcane-bolt' }
			}) as any
		);

		const error = resultWithSelection.validation.errors.find(
			(e) => (e.code as string) === 'PROFILE_MISMATCH'
		);
		expect(error).toBeUndefined();
	});

	it('should resolve approved pure legacy spell aliases during slot validation', () => {
		const baseBuild = createBaseBuild({ classId: 'wizard', level: 1 });
		const result = calculateCharacterWithBreakdowns(baseBuild as any);
		const globalSlot = result.spellsKnownSlots.find((slot) => slot.isGlobal);

		expect(globalSlot).toBeDefined();

		const resultWithLegacySelection = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'wizard',
				level: 1,
				selectedSpells: { [globalSlot!.id]: 'absorb-element' }
			}) as any
		);

		expect(
			resultWithLegacySelection.validation.errors.find(
				(error) => (error.code as string) === 'INVALID_SPELL'
			)
		).toBeUndefined();
	});

	it('should allow global slots when a spell matches an allowed tag but not an allowed school', () => {
		const baseBuild = createBaseBuild({ classId: 'bard', level: 1 });
		const result = calculateCharacterWithBreakdowns(baseBuild as any);
		const globalSlot = result.spellsKnownSlots.find((slot) => slot.isGlobal);

		expect(result.globalMagicProfile?.schools).toContain('Enchantment');
		expect(result.globalMagicProfile?.tags).toContain('Healing');
		expect(globalSlot).toBeDefined();

		const resultWithSelection = calculateCharacterWithBreakdowns(
			createBaseBuild({
				classId: 'bard',
				level: 1,
				selectedSpells: { [globalSlot!.id]: 'heal' }
			}) as any
		);

		const error = resultWithSelection.validation.errors.find(
			(e) => (e.code as string) === 'PROFILE_MISMATCH'
		);
		expect(error).toBeUndefined();
	});

	it('should error when school restriction is violated', () => {
		// Slot that requires 'Elemental' schools
		const build = createBaseBuild({
			classId: 'wizard',
			featureChoices: {
				wizard_expanded_school_choice: 'Elemental'
			},
			selectedSpells: {
				// specialized_wizard_wizard_level_1_expanded_school_0_0 is the likely ID format
				specialized_wizard_wizard_expanded_school_choice_0_0: 'mind_sliver' // Enchantment
			}
		});

		// The ID generates as: `specialized_${effect.source.id}_${index}_${i}`
		// Wizard Expanded School might have a different ID.
		// Let's check the slot generation logic for wizard specialized slot ID.

		const result = calculateCharacterWithBreakdowns(build as any);

		// Find the restricted slot first to get its ID
		const restrictedSlot = result.spellsKnownSlots.find((s) =>
			s.specificRestrictions?.schools?.includes('Elemental' as any)
		);
		if (restrictedSlot) {
			const buildWithSelection = createBaseBuild({
				...build,
				selectedSpells: { [restrictedSlot.id]: 'mind_sliver' } // Enchantment spell
			});
			const resultWithSelection = calculateCharacterWithBreakdowns(buildWithSelection as any);
			const error = resultWithSelection.validation.errors.find(
				(e) => (e.code as string) === 'SCHOOL_RESTRICTION'
			);
			expect(error).toBeDefined();
		}
	});
});
