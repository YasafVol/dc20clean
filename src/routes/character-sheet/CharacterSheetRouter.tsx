import React, { useState, useEffect } from 'react';
import CharacterSheetDesktop from './CharacterSheetDesktop';
import CharacterSheetMobile from './CharacterSheetMobile';

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
	// Both components use the EXACT same useCharacterSheet hook - zero duplication!
	return isMobile ? (
		<CharacterSheetMobile characterId={characterId} />
	) : (
		<CharacterSheetDesktop characterId={characterId} onBack={onBack} />
	);
};

export default CharacterSheetRouter;
