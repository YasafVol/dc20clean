import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AlternativeTabbedContent from './AlternativeTabbedContent';

const mockSheet = vi.hoisted(() => ({
	character: {
		characterState: { activeConditions: [] as string[], inventory: { items: [] } }
	},
	access: { spells: false, maneuvers: false }
}));

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) =>
			({
				'characterSheet.sectionDetails': 'Actions & Details',
				'characterSheet.tabAttacks': 'Attacks',
				'characterSheet.tabSpells': 'Spells',
				'characterSheet.tabInventory': 'Inventory',
				'characterSheet.tabManeuvers': 'Maneuvers',
				'characterSheet.tabFeatures': 'Features',
				'characterSheet.tabConditions': 'Conditions',
				'characterSheet.tabNotes': 'Notes',
				'characterSheet.collapseSection': 'Collapse Actions & Details'
			})[key] ?? key
	})
}));

vi.mock('../hooks/CharacterSheetProvider', () => ({
	useCharacterSheet: () => ({
		state: { character: mockSheet.character },
		readOnly: false,
		handleSpellCast: vi.fn(),
		handleManeuverUse: vi.fn(),
		toggleActiveCondition: vi.fn(),
		setActiveConditionStacks: vi.fn(),
		updateInventory: vi.fn()
	}),
	useCharacterSheetPresentation: () => ({
		resources: { mana: { current: 0, maximum: 0, visible: false } },
		access: mockSheet.access,
		features: { metaMagic: false, rage: false }
	}),
	useCharacterConditions: () => []
}));

vi.mock('../components/Attacks', () => ({ default: () => <div>Attack panel</div> }));
vi.mock('../components/AttackPopup', () => ({ default: () => null }));
vi.mock('../components/InventoryPopup', () => ({ default: () => null }));
vi.mock('../components/ActiveConditionSummary', () => ({ default: () => null }));
vi.mock('../components/ActiveConditionsTracker', () => ({ default: () => null }));
vi.mock('../components/ComplexFeatureHost', () => ({ default: () => null }));
vi.mock('../components/EffectsRulesNotes', () => ({ default: () => null }));
vi.mock('../components/Features', () => ({ default: () => null }));
vi.mock('../components/Inventory', () => ({ default: () => null }));
vi.mock('../components/Maneuvers', () => ({
	default: ({
		useCompactToolbar,
		useManeuverPicker
	}: {
		useCompactToolbar?: boolean;
		useManeuverPicker?: boolean;
	}) => (
		<div data-testid="maneuver-mode">
			{useCompactToolbar ? 'compact' : 'legacy'} / {useManeuverPicker ? 'picker' : 'row'}
		</div>
	)
}));
vi.mock('../components/PlayerNotes', () => ({ default: () => null }));
vi.mock('../components/Spells', () => ({
	default: ({ useSpellCastModal }: { useSpellCastModal?: boolean }) => (
		<div data-testid="spell-cast-mode">{useSpellCastModal ? 'modal' : 'direct'}</div>
	)
}));
vi.mock('../components/FeaturePopup', () => ({ default: () => null }));

afterEach(cleanup);

beforeEach(() => {
	mockSheet.access.spells = false;
	mockSheet.access.maneuvers = false;
});

describe('AlternativeTabbedContent contextual tabs', () => {
	it('hides spell and maneuver tabs when the character has neither entitlement', () => {
		render(<AlternativeTabbedContent />);

		expect(screen.queryByRole('tab', { name: 'Spells' })).not.toBeInTheDocument();
		expect(screen.queryByRole('tab', { name: 'Maneuvers' })).not.toBeInTheDocument();
	});

	it('shows the spell tab when the provider grants spell access', () => {
		mockSheet.access.spells = true;
		render(<AlternativeTabbedContent />);

		expect(screen.getByRole('tab', { name: 'Spells' })).toBeInTheDocument();
		expect(screen.queryByRole('tab', { name: 'Maneuvers' })).not.toBeInTheDocument();
	});

	it('uses the focused spell-cast modal on the alternative sheet', () => {
		mockSheet.access.spells = true;
		render(<AlternativeTabbedContent />);

		fireEvent.click(screen.getByRole('tab', { name: 'Spells' }));

		expect(screen.getByTestId('spell-cast-mode')).toHaveTextContent('modal');
	});

	it('shows the maneuver tab when the provider grants maneuver access', () => {
		mockSheet.access.maneuvers = true;
		render(<AlternativeTabbedContent />);

		expect(screen.getByRole('tab', { name: 'Maneuvers' })).toBeInTheDocument();
		expect(screen.queryByRole('tab', { name: 'Spells' })).not.toBeInTheDocument();
	});

	it('uses the compact catalog toolbar for alternative-sheet maneuvers', () => {
		mockSheet.access.maneuvers = true;
		render(<AlternativeTabbedContent />);

		fireEvent.click(screen.getByRole('tab', { name: 'Maneuvers' }));

		expect(screen.getByTestId('maneuver-mode')).toHaveTextContent('compact / picker');
	});

	it('shows both contextual tabs when the provider grants both kinds of access', () => {
		mockSheet.access.spells = true;
		mockSheet.access.maneuvers = true;
		render(<AlternativeTabbedContent />);

		expect(screen.getByRole('tab', { name: 'Spells' })).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: 'Maneuvers' })).toBeInTheDocument();
	});
});
