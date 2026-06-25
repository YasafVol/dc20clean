import { describe, expect, it } from 'vitest';
import spellAuditReport from '../../../../docs/migration/spells-v0105-report.json';
import { V0105_SPELLS } from './generated/v0105.generated';
import { ALL_SPELLS, getSpellById, SpellSource } from './index';
import { formatSpellCost, formatSpellEnhancementCost } from './spellCost';

function spellByName(name: string) {
	return ALL_SPELLS.find((spell) => spell.name === name);
}

describe('generated DC20 v0.10.5 spell catalog', () => {
	it('Given the application loads spells, then the generated v0.10.5 catalog is the sole runtime set', () => {
		expect(ALL_SPELLS).toBe(V0105_SPELLS);
	});

	it('contains the complete validated source inventory', () => {
		expect(ALL_SPELLS).toHaveLength(160);
		expect(ALL_SPELLS.reduce((count, spell) => count + spell.enhancements.length, 0)).toBe(709);
		expect(new Set(ALL_SPELLS.map((spell) => spell.id)).size).toBe(160);
	});

	it('keeps the deterministic audit report aligned with the generated catalog', () => {
		expect(spellAuditReport.spellCount).toBe(160);
		expect(spellAuditReport.enhancementCount).toBe(709);
		expect(spellAuditReport.spells).toHaveLength(160);

		const reportById = new Map(spellAuditReport.spells.map((spell) => [spell.id, spell]));
		for (const spell of ALL_SPELLS) {
			const reportEntry = reportById.get(spell.id);

			expect(reportEntry, spell.id).toBeDefined();
			expect(reportEntry).toMatchObject({
				name: spell.name,
				sources: spell.sources,
				school: spell.school,
				tags: spell.tags,
				cost: spell.cost,
				range: spell.range,
				duration: spell.duration,
				sustained: spell.sustained,
				isCantrip: spell.isCantrip,
				enhancementCount: spell.enhancements.length
			});
			expect(reportEntry?.provenance.startLine, spell.id).toBeGreaterThan(0);
			expect(reportEntry?.provenance.endLine, spell.id).toBeGreaterThan(
				reportEntry?.provenance.startLine ?? 0
			);
		}
	});

	it('surfaces verified pure spell aliases under their v0.10.5 identities', () => {
		const pureRenameSpells = [
			['close-wound', 'Close Wounds'],
			['absorb-element', 'Absorb Elements']
		] as const;

		for (const [legacyId, currentName] of pureRenameSpells) {
			expect(spellByName(currentName), currentName).toBeDefined();
			expect(getSpellById(legacyId)?.name).toBe(currentName);
		}

		const pureRenameDisplayNames = [
			['Close Wound', 'Close Wounds'],
			['Absorb Element', 'Absorb Elements']
		] as const;

		for (const [legacyName, currentName] of pureRenameDisplayNames) {
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

	it('does not silently resolve functional spell reworks through normal lookup', () => {
		for (const legacyId of [
			'summon-familiar',
			'fly',
			'vicious-mockery',
			'toxic-aura',
			'earth-blessing',
			'gravity-sink-hole',
			'force-dome',
			'wall-of-force'
		]) {
			expect(getSpellById(legacyId), legacyId).toBeUndefined();
		}
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

	it('preserves variable, mixed, alternative, and sustained costs', () => {
		const dispelMagic = spellByName('Dispel Magic');
		expect(dispelMagic?.cost).toEqual({
			ap: 1,
			mp: 'X',
			minimumMp: 1,
			raw: '1 AP + X MP (minimum of 1)'
		});
		expect(formatSpellCost(dispelMagic!.cost)).toBe('1 AP + X MP (minimum of 1)');

		const arcaneMissiles = spellByName('Arcane Bolt')?.enhancements.find(
			(enhancement) => enhancement.name === 'Arcane Missiles'
		);
		expect(arcaneMissiles?.cost).toEqual({ ap: 1, mp: 'X' });
		expect(formatSpellEnhancementCost(arcaneMissiles!)).toBe('1 AP + X MP');

		const alternativeCost = ALL_SPELLS.flatMap((spell) => spell.enhancements).find(
			(enhancement) => enhancement.costText === '1 AP or 2 AP'
		);
		expect(alternativeCost?.alternativeCosts).toEqual([{ ap: 2 }]);

		const sustainedEnhancement = ALL_SPELLS.flatMap((spell) => spell.enhancements).find(
			(enhancement) => enhancement.rawCost === 'X MP, Sustained'
		);
		expect(sustainedEnhancement?.sustained).toBe(true);
	});

	it('retains rich nested spell content without creating false spell boundaries', () => {
		const familiar = spellByName('Call Familiar');
		expect(familiar?.effects[0].description).toContain('## Familiar');
		expect(familiar?.effects[0].description).toContain('## Expanded Familiar Traits');
		expect(familiar?.enhancements).toHaveLength(1);
	});
});
