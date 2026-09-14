import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { CampaignCharacterView } from './CampaignCharacterView';

vi.mock('../../components/auth/AuthGuard', () => ({
	AuthGuard: ({ children }: { children: React.ReactNode }) => children
}));

vi.mock('../character-sheet/hooks/CharacterSheetProvider', () => ({
	CharacterSheetProvider: ({
		children,
		campaignId,
		characterId,
		campaignCharacterDocId
	}: {
		children: React.ReactNode;
		campaignId: string;
		characterId: string;
		campaignCharacterDocId?: string;
	}) => (
		<div
			data-testid="campaign-sheet-provider"
			data-campaign-id={campaignId}
			data-character-id={characterId}
			data-character-record-id={campaignCharacterDocId}
		>
			{children}
		</div>
	)
}));

vi.mock('../character-sheet/CharacterSheetRedesign', () => ({
	default: () => <div>Primary sheet</div>
}));

vi.mock('../character-sheet/alternative/AlternativeCharacterSheet', () => ({
	default: () => <div>Alternative sheet</div>
}));

describe('CampaignCharacterView', () => {
	it('renders either presentation under the same campaign read-only provider', () => {
		render(
			<MemoryRouter
				initialEntries={[
					'/campaigns/campaign-1/character/shared-id?record=record-2&sheet=alternative'
				]}
			>
				<CampaignCharacterView
					campaignId="campaign-1"
					characterId="shared-id"
					characterDocId="record-2"
				/>
			</MemoryRouter>
		);

		const provider = screen.getByTestId('campaign-sheet-provider');
		expect(provider.dataset.campaignId).toBe('campaign-1');
		expect(provider.dataset.characterId).toBe('shared-id');
		expect(provider.dataset.characterRecordId).toBe('record-2');
		expect(screen.getByText('Alternative sheet')).toBeInTheDocument();
		expect(screen.queryByText('Primary sheet')).not.toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: 'Primary' }));

		expect(screen.getByText('Primary sheet')).toBeInTheDocument();
		expect(screen.queryByText('Alternative sheet')).not.toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Primary' })).toHaveAttribute('aria-pressed', 'true');
	});
});
