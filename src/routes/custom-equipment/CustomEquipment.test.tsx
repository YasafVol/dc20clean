import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CustomEquipment from './CustomEquipment';

vi.mock('react-i18next', () => ({
	useTranslation: () => ({ t: (key: string) => key })
}));

describe('Equipage category-first creation', () => {
	afterEach(cleanup);

	it('keeps all five categories available and gives each its own build sheet', () => {
		render(<CustomEquipment />);

		expect(screen.getByLabelText('weapon build steps')).toBeTruthy();
		expect(
			screen.getByLabelText('weapon build steps').querySelectorAll('button[aria-controls]')
		).toHaveLength(5);

		for (const [category, label, count] of [
			['armor', 'armor', 3],
			['shield', 'shield', 3],
			['spellFocus', 'spell focus', 3],
			['general', 'general equipment', 2]
		] as const) {
			fireEvent.click(
				screen.getByRole('button', {
					name: new RegExp(`^${category === 'spellFocus' ? 'Spell Focus' : category}`, 'i')
				})
			);
			const sheet = screen.getByLabelText(`${label} build steps`);
			expect(sheet.querySelectorAll('button[aria-controls]')).toHaveLength(count);
			expect(screen.getByLabelText(`${label} build summary`)).toBeTruthy();
		}
	});

	it('reopens a completed weapon step without losing its selection', () => {
		render(<CustomEquipment />);
		const sheet = screen.getByLabelText('weapon build steps');
		fireEvent.click(within(sheet).getByRole('button', { name: /^Melee/i }));
		fireEvent.click(within(sheet).getByRole('button', { name: /Next: Choose Style/i }));
		fireEvent.click(within(sheet).getByRole('button', { name: /^Sword/i }));
		fireEvent.click(within(sheet).getByRole('button', { name: /Next: Damage Type/i }));
		expect(within(sheet).getByRole('button', { name: /^Slashing$/i })).toBeTruthy();
		expect(within(sheet).getByRole('button', { name: /^Piercing$/i })).toBeTruthy();
		fireEvent.click(within(sheet).getByRole('button', { name: /Start.*Melee weapon/i }));
		expect(
			within(sheet)
				.getByRole('button', { name: /Start.*Melee weapon/i })
				.getAttribute('aria-expanded')
		).toBe('true');
	});

	it('offers Start Fresh and Load a Preset as peer paths in each rules-backed builder', () => {
		render(<CustomEquipment />);

		for (const [category, label] of [
			['weapon', 'weapon'],
			['armor', 'armor'],
			['shield', 'shield'],
			['spellFocus', 'spell focus']
		] as const) {
			if (category !== 'weapon') {
				fireEvent.click(
					screen.getByRole('button', {
						name: new RegExp(`^${category === 'spellFocus' ? 'Spell Focus' : category}`, 'i')
					})
				);
			}
			const paths = screen.getByRole('group', { name: `${label} starting point` });
			const fresh = within(paths).getByRole('button', { name: 'Start Fresh' });
			const preset = within(paths).getByRole('button', { name: 'Load a Preset' });
			expect(fresh.getAttribute('aria-pressed')).toBe('true');
			expect(screen.queryByRole('searchbox', { name: 'Search presets' })).toBeNull();
			fireEvent.click(preset);
			expect(preset.getAttribute('aria-pressed')).toBe('true');
			expect(screen.getByRole('searchbox', { name: 'Search presets' })).toBeTruthy();
			fireEvent.click(fresh);
			expect(fresh.getAttribute('aria-pressed')).toBe('true');
			expect(screen.queryByRole('searchbox', { name: 'Search presets' })).toBeNull();
		}
	});

	it('loads a searched weapon preset from the peer path', () => {
		render(<CustomEquipment />);
		const paths = screen.getByRole('group', { name: 'weapon starting point' });
		fireEvent.click(within(paths).getByRole('button', { name: 'Load a Preset' }));
		fireEvent.change(screen.getByRole('searchbox', { name: 'Search presets' }), {
			target: { value: 'Short Sword' }
		});
		fireEvent.click(screen.getByRole('button', { name: /^Short Sword/ }));
		const summary = screen.getByLabelText('weapon build summary');
		expect(summary.textContent).toContain('Short Sword');
		expect(summary.textContent).toContain('Weapon enhancement');
		expect(summary.textContent).toContain('Properties');
		expect(screen.getByLabelText('weapon build steps').textContent).not.toContain(
			'Weapon enhancement'
		);
		expect(
			within(screen.getByLabelText('weapon build steps'))
				.getByRole('button', { name: /Review.*Short Sword/i })
				.getAttribute('aria-expanded')
		).toBe('true');
	});
});
