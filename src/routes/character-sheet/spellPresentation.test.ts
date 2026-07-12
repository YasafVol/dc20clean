import { describe, expect, it } from 'vitest';
import { getSpellPresentation } from './spellPresentation';

const ability = (name: string) => ({ name, description: name, source: {} }) as any;

describe('getSpellPresentation', () => {
	it('applies attack, damage, and long-range focus bonuses contextually', () => {
		expect(
			getSpellPresentation({
				spell: {
					range: '10 Spaces',
					effects: [{ title: 'Effect', description: 'Make a Ranged Spell Attack.' }]
				},
				baseAttackSpellCheck: 4,
				grantedAbilities: [
					ability('vicious_focus'),
					ability('powerful_focus'),
					ability('long_ranged_focus')
				]
			})
		).toMatchObject({ checkBonus: 5, damageBonus: 1, range: '15 Spaces' });
	});

	it('applies Channeling and Reach only to matching spells', () => {
		expect(
			getSpellPresentation({
				spell: {
					range: '1 Space',
					effects: [{ title: 'Effect', description: 'Make a Spell Check.' }]
				},
				baseAttackSpellCheck: 3,
				grantedAbilities: [ability('channeling_focus'), ability('reach_focus')]
			})
		).toMatchObject({ checkBonus: 4, damageBonus: 0, range: '2 Space' });
	});
});
