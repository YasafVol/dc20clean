import React from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterSheetRedesign from './CharacterSheetRedesign';
import { CharacterSheetProvider } from './hooks/CharacterSheetProvider';

interface CharacterSheetRouterProps {
	characterId: string;
	onBack?: () => void;
}

/**
 * Character Sheet Router
 *
 * Provides CharacterSheetProvider context and renders the responsive CharacterSheetRedesign.
 * CharacterSheetRedesign now handles mobile/tablet/desktop layouts internally via CSS media queries.
 */
const CharacterSheetRouter: React.FC<CharacterSheetRouterProps> = ({ characterId }) => {
	const navigate = useNavigate();
	const handleBackToMenu = () => navigate('/menu');

	return (
		<CharacterSheetProvider characterId={characterId}>
			<CharacterSheetRedesign characterId={characterId} onBack={handleBackToMenu} />
		</CharacterSheetProvider>
	);
};

export default CharacterSheetRouter;
