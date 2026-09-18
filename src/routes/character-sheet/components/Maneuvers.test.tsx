import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import type { ManeuverData } from '../../../types';
import { allManeuvers } from '../../../lib/rulesdata/martials/maneuvers';
import Maneuvers from './Maneuvers';

const heroicBash = allManeuvers.find((maneuver) => maneuver.name === 'Heroic Bash');
if (!heroicBash) throw new Error('Heroic Bash fixture is missing');

const mockSheet = vi.hoisted(() => ({
	maneuvers: [] as ManeuverData[],
	addManeuver: vi.fn(),
	removeManeuver: vi.fn()
}));

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				'characterSheet.maneuverPickerTitle': 'Add maneuver',
				'characterSheet.maneuverPickerClose': 'Close maneuver picker',
				'characterSheet.maneuverPickerAvailable': 'Available maneuvers',
				'characterSheet.maneuverPickerListLabel': 'Available maneuvers',
				'characterSheet.maneuverPickerEmpty': 'No additional maneuvers are available.',
				'characterSheet.maneuverPickerSelectPrompt': 'Select a maneuver.',
				'characterSheet.maneuverPickerCancel': 'Cancel',
				'characterSheet.maneuverPickerAdd': 'Add maneuver',
				'characterSheet.maneuverPickerRange': 'Range',
				'characterSheet.maneuverPickerTiming': 'Timing',
				'characterSheet.maneuverPickerAction': 'Action',
				'characterSheet.maneuverPickerDescription': 'Description',
				'martialManual.type': 'Type',
				'martialManual.cost': 'Cost',
				'martialManual.reaction': 'Reaction',
				'martialManual.trigger': 'Trigger',
				'martialManual.enhancements': 'Enhancements',
				'martialManual.repeatable': 'Repeatable',
				'characterSheet.maneuversNoManeuvers': 'No maneuvers selected.'
			};
			return translations[key] ?? key;
		}
	})
}));

vi.mock('../hooks/CharacterSheetProvider', () => ({
	useCharacterManeuvers: () => mockSheet.maneuvers,
	useCharacterCalculatedData: () => ({ stats: { staminaSpendLimit: 2 } }),
	useCharacterSheet: () => ({
		addManeuver: mockSheet.addManeuver,
		removeManeuver: mockSheet.removeManeuver,
		state: { character: { id: 'character-test' } }
	})
}));

const renderAlternativeManeuvers = () =>
	render(
		<MemoryRouter>
			<Maneuvers onManeuverClick={vi.fn()} useCompactToolbar useManeuverPicker />
		</MemoryRouter>
	);

afterEach(cleanup);

beforeEach(() => {
	mockSheet.maneuvers.length = 0;
	mockSheet.addManeuver.mockReset();
	mockSheet.removeManeuver.mockReset();
});

describe('alternative maneuver picker', () => {
	it('adds a populated catalog maneuver without creating a blank row first', () => {
		renderAlternativeManeuvers();
		fireEvent.click(screen.getByTestId('add-maneuver'));

		expect(mockSheet.addManeuver).not.toHaveBeenCalled();
		const picker = screen.getByTestId('maneuver-picker');
		fireEvent.click(within(picker).getByRole('option', { name: /Heroic Bash/ }));
		expect(within(picker).getByText('Enhancements')).toBeInTheDocument();

		fireEvent.click(within(picker).getByTestId('maneuver-picker-confirm'));

		expect(mockSheet.addManeuver).toHaveBeenCalledTimes(1);
		expect(mockSheet.addManeuver).toHaveBeenCalledWith(
			expect.objectContaining({
				id: expect.stringMatching(/^maneuver_/),
				name: heroicBash.name,
				type: heroicBash.type,
				cost: heroicBash.cost,
				range: heroicBash.range,
				description: heroicBash.description,
				isReaction: heroicBash.isReaction,
				enhancements: heroicBash.enhancements
			})
		);
		expect(screen.queryByTestId('maneuver-picker')).not.toBeInTheDocument();
	});

	it('excludes maneuvers already on the character', () => {
		mockSheet.maneuvers.push({
			id: 'known-heroic-bash',
			name: heroicBash.name
		});
		renderAlternativeManeuvers();
		fireEvent.click(screen.getByTestId('add-maneuver'));

		expect(
			within(screen.getByTestId('maneuver-picker')).queryByRole('option', {
				name: /Heroic Bash/
			})
		).not.toBeInTheDocument();
	});
});
