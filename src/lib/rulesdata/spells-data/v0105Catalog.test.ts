import { describe, expect, it } from 'vitest';
import { ALL_SPELLS, getSpellById, SpellSource } from './index';

function spellByName(name: string) {
	return ALL_SPELLS.find((spell) => spell.name === name);
}

describe('DC20 v0.10.5 spell catalog migration', () => {
	it('surfaces changelog-confirmed renamed spells under their v0.10.5 identities', () => {
		const renamedSpells = [
			['summon-familiar', 'Call Familiar'],
			['fly', 'Blessing of Air'],
			['vicious-mockery', 'Mockery'],
			['toxic-aura', 'Toxic Burst'],
			['close-wound', 'Close Wounds'],
			['earth-blessing', 'Blessing of Earth'],
			['absorb-element', 'Absorb Elements']
		] as const;

		for (const [legacyId, currentName] of renamedSpells) {
			expect(spellByName(currentName), currentName).toBeDefined();
			expect(getSpellById(legacyId)?.name).toBe(currentName);
		}

		const renamedDisplayNames = [
			['Summon Familiar', 'Call Familiar'],
			['Fly', 'Blessing of Air'],
			['Vicious Mockery', 'Mockery'],
			['Toxic Aura', 'Toxic Burst'],
			['Close Wound', 'Close Wounds'],
			['Earth Blessing', 'Blessing of Earth'],
			['Absorb Element', 'Absorb Elements']
		] as const;

		for (const [legacyName, currentName] of renamedDisplayNames) {
			expect(getSpellById(legacyName)?.name).toBe(currentName);
		}

		expect(ALL_SPELLS.map((spell) => spell.name)).not.toEqual(
			expect.arrayContaining([
				'Summon Familiar',
				'Fly',
				'Vicious Mockery',
				'Toxic Aura',
				'Earth Blessing'
			])
		);
	});

	it('adds the changelog-confirmed new v0.10.5 spells to the current selectable catalog', () => {
		const requiredNewSpells = [
			'Gravity Shift',
			'Increase Gravity',
			'Reduce Inertia',
			'Time Stop',
			'Arcane Weapon',
			'Illusory Duplicate',
			'Illusory Writing',
			'Summon Aberration',
			'Summon Construct',
			'Summon Dragon',
			'Summon Ooze',
			'Danger Sense',
			'Detect Magic',
			'Foresight',
			'Locate Target',
			'Lightning Rod',
			'Mold Earth',
			'Confusion',
			'Dispel Magic',
			'Shadowbind',
			'Mystical Weapon',
			'Summon Celestial',
			'Summon Fiend',
			'Summon Undead',
			'Scrying',
			'Illuminate',
			'Revivify',
			'Enfeeble',
			'Enhance Ability',
			'Blessing of Zephyr',
			'Elemental Weapon',
			"Nature's Tether",
			'Summon Beast',
			'Summon Elemental',
			'Summon Fey',
			'Summon Plant',
			'Spike Cluster',
			'Wall of Earth',
			'Healing Wave',
			'Blessing of Water'
		];

		for (const spellName of requiredNewSpells) {
			expect(spellByName(spellName), spellName).toBeDefined();
		}
	});

	it('applies v0.10.5 spell list removals without deleting retained spells', () => {
		expect(spellByName('Mass Heal')?.sources).not.toContain(SpellSource.Primal);
		expect(spellByName('Darkness')?.sources).not.toContain(SpellSource.Primal);

		expect(ALL_SPELLS.map((spell) => spell.name)).not.toEqual(
			expect.arrayContaining([
				'Radiant Beam',
				'Wind Blessing',
				'Acid Rain',
				'Lightning Cloud',
				'Poison Cloud'
			])
		);
	});
});
