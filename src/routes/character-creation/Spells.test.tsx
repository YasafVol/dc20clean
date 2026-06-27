import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Spells from './Spells';
import { SpellSchool } from '../../lib/rulesdata/schemas/spell.schema';
import type { GlobalMagicProfile, SpellsKnownSlot } from '../../lib/types/effectSystem';

const { mockDispatch, mockState, mockCalculationResult } = vi.hoisted(() => ({
	mockDispatch: vi.fn(),
	mockState: {
		classId: 'bard',
		selectedSpells: {},
		selectedManeuvers: []
	},
	mockCalculationResult: {
		globalMagicProfile: undefined as GlobalMagicProfile | undefined,
		spellsKnownSlots: [] as SpellsKnownSlot[]
	}
}));

vi.mock('../../lib/stores/characterContext', () => ({
	useCharacter: () => ({
		state: mockState,
		dispatch: mockDispatch,
		calculationResult: mockCalculationResult
	})
}));

vi.mock('react-i18next', () => ({
	useTranslation: () => ({ t: (key: string) => key })
}));

const bardProfile: GlobalMagicProfile = {
	sources: [],
	schools: [SpellSchool.Enchantment],
	tags: ['Healing', 'Illusion', 'Sound']
};

const bardProgressionSlot: SpellsKnownSlot = {
	id: 'global_bard_0',
	type: 'spell',
	sourceName: 'Bard Progression',
	isGlobal: true
};

const magicalSecretsSlot: SpellsKnownSlot = {
	id: 'bard_magical_secrets_0',
	type: 'spell',
	sourceName: 'Magical Secrets',
	isGlobal: false,
	specificRestrictions: {}
};

describe('Spells slot cursor', () => {
	beforeEach(() => {
		mockDispatch.mockReset();
		mockState.selectedSpells = {};
		mockCalculationResult.globalMagicProfile = bardProfile;
		mockCalculationResult.spellsKnownSlots = [bardProgressionSlot, magicalSecretsSlot];
	});

	afterEach(() => {
		cleanup();
	});

	it('targets the first empty slot and advances after learning a spell', async () => {
		render(<Spells />);

		expect(await screen.findByText(/for Bard Progression/)).toBeInTheDocument();
		expect(screen.getByTestId('spell-charm-learn')).toBeInTheDocument();
		expect(screen.queryByTestId('spell-fireball-learn')).not.toBeInTheDocument();

		fireEvent.click(screen.getByTestId('spell-charm-learn'));

		expect(await screen.findByText(/for Magical Secrets/)).toBeInTheDocument();
		expect(await screen.findByTestId('spell-fireball-learn')).toBeInTheDocument();

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(
				expect.objectContaining({
					type: 'UPDATE_SPELLS_AND_MANEUVERS',
					spells: { global_bard_0: 'charm' }
				})
			);
		});
	});

	it('lets the user override the active slot before learning', async () => {
		render(<Spells />);

		expect(await screen.findByText(/for Bard Progression/)).toBeInTheDocument();
		expect(screen.queryByTestId('spell-fireball-learn')).not.toBeInTheDocument();

		fireEvent.click(screen.getByText('Magical Secrets'));

		expect(await screen.findByText(/for Magical Secrets/)).toBeInTheDocument();
		expect(await screen.findByTestId('spell-fireball-learn')).toBeInTheDocument();

		fireEvent.click(screen.getByTestId('spell-fireball-learn'));

		expect(await screen.findByText(/for Bard Progression/)).toBeInTheDocument();

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(
				expect.objectContaining({
					type: 'UPDATE_SPELLS_AND_MANEUVERS',
					spells: { bard_magical_secrets_0: 'fireball' }
				})
			);
		});
	});
});
