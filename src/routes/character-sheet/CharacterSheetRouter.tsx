import React, { useState, useEffect } from 'react';
import CharacterSheetClean from './CharacterSheetClean';
import CharacterSheetMobile from './CharacterSheetMobile';
import { CharacterSheetProvider } from './hooks/CharacterSheetProvider';

// Breakpoint for mobile vs desktop (matches the existing project's mobile breakpoint)
const MOBILE_BREAKPOINT = 768;

interface CharacterSheetRouterProps {
	characterId: string;
	onBack?: () => void;
}

const CharacterSheetRouter: React.FC<CharacterSheetRouterProps> = ({ characterId, onBack }) => {
	// State for detecting mobile vs desktop
	const [isMobile, setIsMobile] = useState(false);

	// Check screen size to determine mobile vs desktop
	useEffect(() => {
		const checkMobile = () => {
			const width = window.innerWidth;
			const mobile = width <= MOBILE_BREAKPOINT;
			console.log(`Screen width: ${width}px, Mobile: ${mobile}`);
			setIsMobile(mobile);
		};

		// Initial check
		checkMobile();

		// Listen for window resize
		window.addEventListener('resize', checkMobile);

		// Cleanup
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	console.log(`Rendering: ${isMobile ? 'Mobile' : 'Desktop'} component`);

	// Route to appropriate component based on screen size
	// Both components now need the Provider since child components use hooks
	return (
		<CharacterSheetProvider characterId={characterId}>
			{isMobile
				? <CharacterSheetMobile characterId={characterId} />
				: <CharacterSheetClean characterId={characterId} onBack={onBack || (() => {})} />}
		</CharacterSheetProvider>
	);
};

export default CharacterSheetRouter;
