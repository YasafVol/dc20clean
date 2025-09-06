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
	
	// Initialize isMobile with immediate detection to prevent double rendering
	const [isMobile, setIsMobile] = useState(() => {
		// Only do this check if window is available (client-side)
		if (typeof window !== 'undefined') {
			const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
			console.log(`🗻 Gimli's Initial Mobile Check: width=${window.innerWidth}, mobile=${mobile}`);
			return mobile;
		}
		return false;
	});

	useEffect(() => {
		const checkMobile = () => {
			const width = window.innerWidth;
			const mobile = width <= MOBILE_BREAKPOINT;
			console.log(`🗻 Gimli's Responsive Check: width=${width}, mobile=${mobile}, breakpoint=${MOBILE_BREAKPOINT}`);
			setIsMobile(mobile);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const handleBackToMenu = () => navigate('/menu');

	return (
		<CharacterSheetProvider characterId={characterId}>
			{(() => {
				console.log(`🧙‍♂️ Router render decision: isMobile=${isMobile}, rendering=${isMobile ? 'MOBILE' : 'DESKTOP'}`);
				if (isMobile) {
					console.log('🔥 Router: Rendering CharacterSheetMobile component');
					return <CharacterSheetMobile />;
				} else {
					console.log('🔥 Router: Rendering CharacterSheetClean component');
					return <CharacterSheetClean characterId={characterId} onBack={handleBackToMenu} />;
				}
			})()}
		</CharacterSheetProvider>
	);
};

export default CharacterSheetRouter;
