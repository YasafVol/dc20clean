import { describe, expect, it } from 'vitest';
import { weapons } from '../../lib/rulesdata/inventoryItems';
import { getWeaponRulePresentation } from './weaponRulePresentation';

describe('getWeaponRulePresentation', () => {
	it('resolves Hand Axe properties, Bleed, Bleeding, and Medicine from rule catalogs', () => {
		const weapon = weapons.find((candidate) => candidate.name === 'Hand Axe');
		expect(weapon).toBeDefined();
		if (!weapon) return;

		const presentation = getWeaponRulePresentation(weapon);
		expect(presentation.properties.map((property) => property.label)).toEqual([
			'Concealable',
			'Toss (5/10)'
		]);
		expect(presentation.features).toEqual(['Easy to hide', 'Can be thrown']);
		expect(presentation.styles[0]?.definition.name).toBe('Axe');
		expect(presentation.styles[0]?.definition.enhancement.name).toBe('Bleed');
		expect(presentation.styles[0]?.condition?.definition?.id).toBe('bleeding-x');
		expect(presentation.styles[0]?.recoveryAction?.id).toBe('medicine');
	});

	it('resolves every current weapon without rule gaps', () => {
		const report = weapons.map((weapon) => {
			const presentation = getWeaponRulePresentation(weapon);
			return {
				name: weapon.name,
				styles: presentation.styles.map((style) => style.definition.name),
				unresolvedProperties: presentation.unresolvedProperties,
				unresolvedStyles: presentation.unresolvedStyles
			};
		});

		expect(weapons).toHaveLength(48);
		expect(report.filter((weapon) => weapon.styles.length === 0)).toEqual([]);
		expect(report.flatMap((weapon) => weapon.unresolvedProperties)).toEqual([]);
		expect(report.flatMap((weapon) => weapon.unresolvedStyles)).toEqual([]);
		expect(report.map((weapon) => weapon.name)).toEqual(
			expect.arrayContaining(['Bo Staff', 'Hand Stonebow', 'Stonebow', 'Slingshot', 'War Sling'])
		);
		expect(report.map((weapon) => weapon.name)).not.toEqual(
			expect.arrayContaining(['Bolas', 'Net', 'Longpole'])
		);
	});
});
