import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthGuard } from '../../components/auth/AuthGuard';
import { Button } from '../../components/ui/button';
import AlternativeCharacterSheet from '../character-sheet/alternative/AlternativeCharacterSheet';
import CharacterSheetRedesign from '../character-sheet/CharacterSheetRedesign';
import { CharacterSheetProvider } from '../character-sheet/hooks/CharacterSheetProvider';
import { theme } from '../character-sheet/styles/theme';

interface Props {
	campaignId: string;
	characterId: string;
	characterDocId?: string;
}

type SheetPresentation = 'primary' | 'alternative';

export const CampaignCharacterView: React.FC<Props> = ({
	campaignId,
	characterId,
	characterDocId
}) => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const presentation: SheetPresentation =
		searchParams.get('sheet') === 'alternative' ? 'alternative' : 'primary';

	const selectPresentation = (nextPresentation: SheetPresentation) => {
		const nextSearchParams = new URLSearchParams(searchParams);
		if (nextPresentation === 'alternative') {
			nextSearchParams.set('sheet', 'alternative');
		} else {
			nextSearchParams.delete('sheet');
		}
		setSearchParams(nextSearchParams, { replace: true });
	};

	return (
		<AuthGuard feature="general">
			<nav
				aria-label="Campaign character view controls"
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: '0.75rem',
					flexWrap: 'wrap',
					padding: '0.75rem 1rem',
					background: theme.colors.bg.secondary,
					borderBottom: `1px solid ${theme.colors.border.default}`
				}}
			>
				<Button
					type="button"
					variant="outline"
					onClick={() => navigate(`/campaigns/${campaignId}`)}
				>
					Back to Campaign
				</Button>
				<span style={{ color: theme.colors.text.muted, fontSize: '0.875rem' }}>
					Read-only campaign view
				</span>
				<div
					role="group"
					aria-label="Character sheet presentation"
					style={{ display: 'flex', gap: '0.5rem' }}
				>
					<Button
						type="button"
						variant={presentation === 'primary' ? 'default' : 'outline'}
						aria-pressed={presentation === 'primary'}
						onClick={() => selectPresentation('primary')}
					>
						Primary
					</Button>
					<Button
						type="button"
						variant={presentation === 'alternative' ? 'default' : 'outline'}
						aria-pressed={presentation === 'alternative'}
						onClick={() => selectPresentation('alternative')}
					>
						Alternative
					</Button>
				</div>
			</nav>
			<CharacterSheetProvider
				characterId={characterId}
				campaignId={campaignId}
				campaignCharacterDocId={characterDocId}
			>
				{presentation === 'alternative' ? (
					<AlternativeCharacterSheet />
				) : (
					<CharacterSheetRedesign characterId={characterId} />
				)}
			</CharacterSheetProvider>
		</AuthGuard>
	);
};
