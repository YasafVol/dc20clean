import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterSheetProvider } from '../character-sheet/hooks/CharacterSheetProvider';
import CharacterSheetRedesign from '../character-sheet/CharacterSheetRedesign';
import { AuthGuard } from '../../components/auth/AuthGuard';

interface Props {
  campaignId: string;
  characterId: string;
}

export const CampaignCharacterView: React.FC<Props> = ({ campaignId, characterId }) => {
  const navigate = useNavigate();
  const handleBack = () => navigate(`/campaigns/${campaignId}`);

  return (
    <AuthGuard feature="general">
      <CharacterSheetProvider characterId={characterId} campaignId={campaignId}>
        <CharacterSheetRedesign characterId={characterId} onBack={handleBack} />
      </CharacterSheetProvider>
    </AuthGuard>
  );
};
