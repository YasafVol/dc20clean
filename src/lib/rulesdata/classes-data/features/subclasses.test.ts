import { describe, it, expect } from 'vitest';
import { barbarianClass } from './barbarian_features';
import { bardClass } from './bard_features';
import { championClass } from './champion_features';
import { clericClass } from './cleric_features';
import { commanderClass } from './commander_features';
import { druidClass } from './druid_features';
import { hunterClass } from './hunter_features';
import { monkClass } from './monk_features';
import { rogueClass } from './rogue_features';
import { sorcererClass } from './sorcerer_features';
import { spellbladeClass } from './spellblade_features';
import { warlockClass } from './warlock_features';
import { wizardClass } from './wizard_features';

/**
 * Subclass Availability Tests for All Classes
 *
 * Purpose: Verify that each class has the expected subclasses defined at level 3.
 * This test suite ensures that the leveling UI will correctly display subclass options.
 *
 * Test Strategy:
 * 1. Import all class feature definitions
 * 2. For each class, check that subclasses array exists and has expected entries
 * 3. Verify subclass levelGained is undefined or <= 3 (available at level 3)
 * 4. Confirm expected subclass names/IDs match actual definitions
 *
 * Note: Expected subclass lists are based on DC20 RPG rules. Update if rules change.
 */

interface SubclassTestCase {
	classId: string;
	className: string;
	classDefinition: any;
	level: number;
	expectedSubclasses: Array<{
		id?: string;
		name: string;
		description?: string;
	}>;
}

describe('Class Subclass Availability at Level 3', () => {
	const testCases: SubclassTestCase[] = [
		{
			classId: 'barbarian',
			className: 'Barbarian',
			classDefinition: barbarianClass,
			level: 3,
			expectedSubclasses: [{ name: 'Elemental Fury' }, { name: 'Spirit Guardian' }]
		},
		{
			classId: 'bard',
			className: 'Bard',
			classDefinition: bardClass,
			level: 3,
			expectedSubclasses: [{ name: 'Eloquence' }, { name: 'Jester' }]
		},
		{
			classId: 'champion',
			className: 'Champion',
			classDefinition: championClass,
			level: 3,
			expectedSubclasses: [{ name: 'Hero' }, { name: 'Sentinel' }]
		},
		{
			classId: 'cleric',
			className: 'Cleric',
			classDefinition: clericClass,
			level: 3,
			expectedSubclasses: [{ name: 'Inquisitor' }, { name: 'Priest' }]
		},
		{
			classId: 'commander',
			className: 'Commander',
			classDefinition: commanderClass,
			level: 3,
			expectedSubclasses: [{ name: 'Crusader' }, { name: 'Warlord' }]
		},
		{
			classId: 'druid',
			className: 'Druid',
			classDefinition: druidClass,
			level: 3,
			expectedSubclasses: [{ name: 'Phoenix' }, { name: 'Rampant Growth' }]
		},
		{
			classId: 'hunter',
			className: 'Hunter',
			classDefinition: hunterClass,
			level: 3,
			expectedSubclasses: [{ name: 'Monster Slayer' }, { name: 'Trapper' }]
		},
		{
			classId: 'monk',
			className: 'Monk',
			classDefinition: monkClass,
			level: 3,
			expectedSubclasses: [{ name: 'Astral Self' }, { name: 'Shifting Tide' }]
		},
		{
			classId: 'rogue',
			className: 'Rogue',
			classDefinition: rogueClass,
			level: 3,
			expectedSubclasses: [{ name: 'Long Death' }, { name: 'Swashbuckler' }]
		},
		{
			classId: 'sorcerer',
			className: 'Sorcerer',
			classDefinition: sorcererClass,
			level: 3,
			expectedSubclasses: [{ name: 'Angelic' }, { name: 'Draconic' }]
		},
		{
			classId: 'spellblade',
			className: 'Spellblade',
			classDefinition: spellbladeClass,
			level: 3,
			expectedSubclasses: [{ name: 'Paladin' }, { name: 'Rune Knight' }]
		},
		{
			classId: 'warlock',
			className: 'Warlock',
			classDefinition: warlockClass,
			level: 3,
			expectedSubclasses: [{ name: 'Eldritch' }, { name: 'Fey' }]
		},
		{
			classId: 'wizard',
			className: 'Wizard',
			classDefinition: wizardClass,
			level: 3,
			expectedSubclasses: [{ name: 'Portal Mage' }, { name: 'Witch' }]
		}
	];

	testCases.forEach(({ classId, className, classDefinition, level, expectedSubclasses }) => {
		describe(`${className}`, () => {
			it(`should have subclasses array defined`, () => {
				expect(classDefinition).toBeDefined();
				expect(classDefinition.subclasses).toBeDefined();
				expect(Array.isArray(classDefinition.subclasses)).toBe(true);
			});

			it(`should have ${expectedSubclasses.length} subclasses available at level ${level}`, () => {
				const subclasses = classDefinition.subclasses || [];

				// Filter subclasses available at the specified level
				const availableSubclasses = subclasses.filter(
					(sc: any) => sc.levelGained === undefined || sc.levelGained <= level
				);

				expect(availableSubclasses.length).toBe(expectedSubclasses.length);
			});

			expectedSubclasses.forEach((expected, index) => {
				it(`should have subclass "${expected.name}"`, () => {
					const subclasses = classDefinition.subclasses || [];

					const found = subclasses.find(
						(sc: any) =>
							sc.subclassName === expected.name ||
							sc.subclassName?.toLowerCase() === expected.name.toLowerCase()
					);

					expect(found).toBeDefined();
					expect(found.subclassName).toBe(expected.name);

					// Verify subclass is available at level 3 or earlier
					if (found.levelGained !== undefined) {
						expect(found.levelGained).toBeLessThanOrEqual(level);
					}

					// Verify subclass has description (optional - some subclasses may not have descriptions)
					if (found.description) {
						expect(typeof found.description).toBe('string');
						expect(found.description.length).toBeGreaterThan(0);
					}

					// Verify subclass has features array
					expect(found.features).toBeDefined();
					expect(Array.isArray(found.features)).toBe(true);
				});
			});

			it('should have unique subclass names', () => {
				const subclasses = classDefinition.subclasses || [];
				const names = subclasses.map((sc: any) => sc.subclassName);
				const uniqueNames = new Set(names);

				expect(uniqueNames.size).toBe(names.length);
			});

			it('all subclasses should have at least one feature', () => {
				const subclasses = classDefinition.subclasses || [];

				subclasses.forEach((sc: any) => {
					expect(sc.features.length).toBeGreaterThan(0);
				});
			});
		});
	});
});

describe('v0.10.5 class feature semantics', () => {
	it('models Barbarian Elemental Blast as an Area Spell Attack', () => {
		const elementalFury = barbarianClass.subclasses.find(
			(subclass: any) => subclass.subclassName === 'Elemental Fury'
		);
		const ragingElements = elementalFury?.features?.find(
			(feature: any) => feature.featureName === 'Raging Elements'
		);
		const elementalBlast = ragingElements?.benefits?.find(
			(benefit: any) => benefit.name === 'Elemental Blast'
		);

		expect(elementalBlast?.description).toContain('Area Spell Attack');
		expect(elementalBlast?.description).not.toContain('Make a Spell Check');
		expect(elementalBlast?.effects?.[0]?.value).toContain('Area Spell Attack');
		expect(elementalBlast?.effects?.[0]?.value).toContain("target's PD");
	});

	it('uses Fortify for Champion Fighting Spirit while preserving the Brace maneuver name for maneuvers', () => {
		const fightingSpirit = championClass.coreFeatures.find(
			(feature: any) => feature.featureName === 'Fighting Spirit'
		);
		const combatReadiness = fightingSpirit?.benefits?.find(
			(benefit: any) => benefit.name === 'Combat Readiness'
		);

		expect(combatReadiness?.description).toContain('Fortify');
		expect(combatReadiness?.description).not.toContain('Brace (Dodge');
		expect(combatReadiness?.description).toContain('next Martial Attack or Physical Check');
		expect(combatReadiness?.effects?.[0]).toMatchObject({
			type: 'GRANT_ABILITY',
			target: 'combat_readiness_fortify'
		});
		expect(combatReadiness?.effects?.[0]?.value).toContain('Fortify');
		expect(combatReadiness?.effects?.[0]?.value).toContain('Martial Attack');
	});

	it('updates Cleric domains, blessings, and Channel Divinity to v0.10.5 semantics', () => {
		const clericOrder = clericClass.coreFeatures.find(
			(feature: any) => feature.featureName === 'Cleric Order'
		);
		const domainChoice = clericOrder?.choices?.find(
			(choice: any) => choice.id === 'cleric_divine_domain'
		);
		const magicDomain = domainChoice?.options?.find((option: any) => option.name === 'Magic');
		const chaosDomain = domainChoice?.options?.find((option: any) => option.name === 'Chaos');

		expect(magicDomain?.description).toContain('Healing');
		expect(magicDomain?.description).toContain('Spirit');
		expect(magicDomain?.description).not.toContain('Holy');
		expect(magicDomain?.description).not.toContain('Undeath');
		expect(magicDomain?.effects?.[1]?.userChoice?.options).toEqual(
			expect.arrayContaining(['Healing', 'Spirit'])
		);
		expect(chaosDomain?.description).toContain('Spell Attack or a Spell Check');

		const divineBlessing = clericClass.coreFeatures.find(
			(feature: any) => feature.featureName === 'Divine Blessing'
		);
		const destruction = divineBlessing?.benefits?.find(
			(benefit: any) => benefit.name === 'Destruction'
		);
		expect(destruction?.description).toContain('Check used to cast the Spell');
		expect(destruction?.description).toContain('Spell Attack Check');
		expect(destruction?.description).not.toContain('your Spell Check');

		const channelDivinity = clericClass.coreFeatures.find(
			(feature: any) => feature.featureName === 'Channel Divinity'
		);
		const divineRebuke = channelDivinity?.benefits?.find(
			(benefit: any) => benefit.name === 'Divine Rebuke'
		);
		const lesserIntervention = channelDivinity?.benefits?.find(
			(benefit: any) => benefit.name === 'Lesser Divine Intervention'
		);

		expect(channelDivinity?.description).toContain('once per Long Rest');
		expect(channelDivinity?.description).toContain('roll for Initiative');
		expect(divineRebuke?.description).toContain('Make a Spell Attack');
		expect(divineRebuke?.description).toContain('takes 1 Divine Damage');
		expect(divineRebuke?.description).not.toContain('Prime Modifier');
		expect(lesserIntervention?.description).toContain('Failure: You gain a pool of 3 HP');
		expect(lesserIntervention?.description).toContain('Success: You gain a pool of 3 HP');
		expect(lesserIntervention?.description).toContain('Success (5): Your pool of HP increases 2');
	});

	it('updates Commander Inspiring Presence to the v0.10.5 once-per-round support trigger', () => {
		const inspiringPresence = commanderClass.coreFeatures.find(
			(feature: any) => feature.featureName === 'Inspiring Presence'
		);

		expect(inspiringPresence?.description).toContain('Once per Round');
		expect(inspiringPresence?.description).toContain('10 Spaces');
		expect(inspiringPresence?.description).toContain("Death's Door");
		expect(inspiringPresence?.effects?.[0]?.value).toContain('Once per Round');
		expect(inspiringPresence?.effects?.[0]?.value).not.toContain('equal to SP spent');
		expect(inspiringPresence?.effects?.[0]?.value).not.toContain('5 Spaces');
	});

	it('updates Monk Ki recovery, Uncanny Dodge cost, stance text, and Shifting Tide range', () => {
		const spiritualBalance = monkClass.coreFeatures.find(
			(feature: any) => feature.featureName === 'Spiritual Balance'
		);
		const kiPoints = spiritualBalance?.benefits?.find(
			(benefit: any) => benefit.name === 'Ki Points'
		);
		const kiActions = spiritualBalance?.benefits?.find(
			(benefit: any) => benefit.name === 'Ki Actions'
		);
		const uncannyDodge = kiActions?.effects?.find(
			(effect: any) => effect.target === 'monk_uncanny_dodge'
		);

		expect(kiPoints?.description).toContain('equal to your Stamina Points');
		expect(kiPoints?.description).toContain('Combat ends');
		expect(kiPoints?.description).not.toContain('instantly outside combat');
		expect(uncannyDodge?.value).toContain('spend 1 Ki Point');
		expect(uncannyDodge?.value).not.toContain('spend 2 Ki');

		const stance = monkClass.coreFeatures.find(
			(feature: any) => feature.featureName === 'Monk Stance'
		);
		const bearStance = stance?.choices?.[0]?.options?.find(
			(option: any) => option.name === 'Bear Stance'
		);
		const turtleStance = stance?.choices?.[0]?.options?.find(
			(option: any) => option.name === 'Turtle Stance'
		);
		expect(bearStance?.description).toContain('Heavy Hits');
		expect(bearStance?.description).toContain('Miss using a Melee Martial Attack');
		expect(turtleStance?.description).toContain('Your Speed becomes 1');
		expect(turtleStance?.description).toContain('PDR, EDR, and MDR');

		const shiftingTide = monkClass.subclasses
			.find((subclass: any) => subclass.subclassName === 'Shifting Tide')
			?.features?.find((feature: any) => feature.featureName === 'Ebb and Flow');
		const flow = shiftingTide?.benefits?.find((benefit: any) => benefit.name === 'Flow');
		expect(flow?.description).toContain("provided they're within range");
		expect(flow?.effects?.[0]?.value).toContain("provided they're within range");
	});

	it('updates Rogue triggers and Swashbuckler criteria to v0.10.5 semantics', () => {
		const debilitatingStrike = rogueClass.coreFeatures.find(
			(feature: any) => feature.featureName === 'Debilitating Strike'
		);
		const cheapShot = rogueClass.coreFeatures.find(
			(feature: any) => feature.featureName === 'Cheap Shot'
		);
		const swashbuckler = rogueClass.subclasses.find(
			(subclass: any) => subclass.subclassName === 'Swashbuckler'
		);
		const renegadeDuelist = swashbuckler?.features?.find(
			(feature: any) => feature.featureName === 'Renegade Duelist'
		);
		const tauntingShot = renegadeDuelist?.benefits?.find(
			(benefit: any) => benefit.name === 'Taunting Shot'
		);

		expect(debilitatingStrike?.description).toContain('When you make a Weapon Attack');
		expect(debilitatingStrike?.description).not.toContain('When you hit');
		expect(cheapShot?.description).toContain('any Condition other than Invisible');
		expect(tauntingShot?.description).toContain('creature that fulfills the criteria for Cheap Shot');
		expect(tauntingShot?.description).toContain('Once per round');
		expect(tauntingShot?.effects?.[0]?.value).toContain('criteria for Cheap Shot');
		expect(tauntingShot?.effects?.[0]?.value).not.toContain('creature with a Condition');
	});

	it('updates Spellblade training, disciplines, and Spellstrike text to v0.10.5 semantics', () => {
		const martialPath = spellbladeClass.coreFeatures.find(
			(feature: any) => feature.featureName === 'Martial Path'
		);
		expect(martialPath?.effects).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: 'GRANT_COMBAT_TRAINING',
					target: 'Spell_Focuses'
				})
			])
		);

		const boundWeapon = spellbladeClass.coreFeatures.find(
			(feature: any) => feature.featureName === 'Bound Weapon'
		);
		const somaticWeapon = boundWeapon?.benefits?.find(
			(benefit: any) => benefit.name === 'Somatic Weapon'
		);
		expect(somaticWeapon?.description).toContain('Somatic Components');

		const disciplines = spellbladeClass.coreFeatures.find(
			(feature: any) => feature.featureName === 'Spellblade Disciplines'
		);
		const warrior = disciplines?.choices?.[0]?.options?.find(
			(option: any) => option.name === 'Warrior'
		);
		const spellBreaker = disciplines?.choices?.[0]?.options?.find(
			(option: any) => option.name === 'Spell Breaker'
		);
		expect(warrior?.description).toContain('learn 1 Maneuver');
		expect(warrior?.effects).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: 'GRANT_MANEUVERS',
					value: 1
				})
			])
		);
		expect(spellBreaker?.effects?.[0]?.value).toContain('Martial Check instead of a Spell Check');
		expect(spellBreaker?.effects?.[0]?.value).toContain('+1 bonus per SP');
		expect(spellBreaker?.effects?.[0]?.value).toContain('+2 bonus per MP');

		const spellstrike = spellbladeClass.coreFeatures.find(
			(feature: any) => feature.featureName === 'Spellstrike'
		);
		expect(spellstrike?.description).toContain('Converged Action');
		expect(spellstrike?.description).toContain('Harmonic Strike');
	});
});
