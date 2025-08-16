import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterSheetClean from './CharacterSheetClean';
import CharacterSheetMobile from './CharacterSheetMobile';
import { CharacterSheetProvider } from './hooks/CharacterSheetProvider';

// Breakpoint for mobile vs desktop (matches the existing project's mobile breakpoint)
const MOBILE_BREAKPOINT = 768;

interface CharacterSheetRouterProps {
	characterId: string;
	onBack?: () => void;
}

const CharacterSheetRouter: React.FC<CharacterSheetRouterProps> = ({ characterId }) => {
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			const width = window.innerWidth;
			const mobile = width <= MOBILE_BREAKPOINT;
			setIsMobile(mobile);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const handleBackToMenu = () => navigate('/menu');

	return (
		<CharacterSheetProvider characterId={characterId}>
			{isMobile
				? <CharacterSheetMobile characterId={characterId} />
				: <CharacterSheetClean characterId={characterId} onBack={handleBackToMenu} />}
		</CharacterSheetProvider>
	);
};

export default CharacterSheetRouter;
