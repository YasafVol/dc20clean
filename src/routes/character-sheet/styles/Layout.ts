
import styled from 'styled-components';
import backgroundImage from '../../../assets/Desktop1920.jpg';

// Global style to override body background for character sheet
export const CharacterSheetGlobalStyle = createGlobalStyle`
	body {
		background: url(${backgroundImage}) center/cover no-repeat fixed !important;
		background-size: cover !important;
		background-position: center center !important;
	}
`;

export const StyledContainer = styled.div`
	min-height: 100vh;
	padding: 1rem;
	font-family: 'Georgia', serif;
	color: #2d2d2d;
	position: relative;

	@media (max-width: 768px) {
		padding: 0.5rem;
	}
`;

export const StyledBackButton = styled.button`
	position: fixed;
	top: 1rem;
	left: 1rem;
	padding: 0.5rem 1rem;
	border: 2px solid #8b4513;
	border-radius: 4px;
	background: #f5f3f0;
	color: #8b4513;
	cursor: pointer;
	font-weight: bold;
	z-index: 100;

	.desktop-text {
		display: inline;
	}
	
	.mobile-text {
		display: none;
	}

	@media (max-width: 768px) {
		top: 0.5rem;
		left: 0.5rem;
		padding: 0.3rem 0.5rem;
		font-size: 1.2rem;
		z-index: 1001; /* Above mobile nav */
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%; /* Make it circular */
		min-width: 40px; /* Ensure minimum size */
		
		.desktop-text {
			display: none;
		}
		
		.mobile-text {
			display: inline;
		}
	}

	&:hover {
		background: #8b4513;
		color: #f5f3f0;
	}
`;

export const StyledCharacterSheet = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	position: relative;
	/* Outer border */
	border: 2px solid #8b4513;
	height: auto;
	width: 98%;
	padding: 6px;
`;

export const StyledMidBorder = styled.div`
	/* Mid border */
	border: 6px solid #8b4513;
	height: 100%;
	width: 100%;
	padding: 6px;
	margin: auto;
`;

export const StyledInnerBorder = styled.div`
	/* Inner border with content */
	position: relative;
	border: 2px solid #8b4513;
	height: 100%;
	width: 100%;
	margin: auto;
	background: rgba(255, 255, 255, 0.4);
	border-radius: 4px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	padding: 1.5rem;
	display: flex;
	justify-content: center;
	flex-direction: column;

	@media (max-width: 768px) {
		padding-bottom: 7rem; /* Extra space for fixed bottom navigation */
	}
`;

/* Corner decorations using CSS-only approach */
export const StyledCornerDecoration = styled.div<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }>`
	position: absolute;
	width: 3em;
	height: 3em;
	margin: -3px;
	z-index: 10;
	
	/* Create decorative corner using CSS */
	position: relative;

	/* Desktop/Mobile Layout Control */
	.desktop-only {
		display: block !important;

		@media (max-width: 768px) {
			display: none !important;
		}
	}

	.mobile-only {
		display: none !important;

		@media (max-width: 768px) {
			display: block !important;
		}

		> div {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}

	@media (max-width: 768px) {
		padding: 1rem;
		border-width: 2px;
		margin: 0;
		border-radius: 4px;
		overflow-x: hidden;
		width: 100%;
		box-sizing: border-box;
	}

	&::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: 
			radial-gradient(circle at 20% 20%, #8b4513 0%, #8b4513 15%, transparent 15%),
			linear-gradient(45deg, #8b4513 0%, #8b4513 6px, transparent 6px, transparent 12px, #8b4513 12px, #8b4513 18px, transparent 18px),
			linear-gradient(-45deg, #8b4513 0%, #8b4513 6px, transparent 6px, transparent 12px, #8b4513 12px, #8b4513 18px, transparent 18px);
		border-radius: 4px;
	}
	
	${props => props.position === 'top-left' && `
		left: 0;
		top: 0;
	`}
	
	${props => props.position === 'top-right' && `
		top: 0;
		right: 0;
		transform: scaleX(-1);
	`}
	
	${props => props.position === 'bottom-right' && `
		right: 0;
		bottom: 0;
		transform: scale(-1);
	`}
	
	${props => props.position === 'bottom-left' && `
		left: 0;
		bottom: 0;
		transform: scaleY(-1);
	`}

	@media (min-width: 768px) {
		width: 3.5em;
		height: 3.5em;
		margin: -4px;
	}

	@media (min-width: 992px) {
		width: 4em;
		height: 4em;
		margin: -5px;
	}

	@media (min-width: 1200px) {
		width: 5em;
		height: 5em;
		margin: -6px;
	}
`;

export const StyledMainGrid = styled.div`
	display: grid;
	grid-template-columns: 300px 1fr 250px;
	gap: 1.5rem;
	height: auto;
	width: 100%;
`;

export const StyledLeftColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const StyledMiddleColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const StyledRightColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

// Mobile Navigation
export const StyledMobileNav = styled.div`
	display: flex;
	background: #8b4513;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	position: fixed !important;
	top: auto !important;
	bottom: 0 !important;
	left: 0;
	right: 0;
	z-index: 1000;
	margin: 0;
	width: 100vw;
	max-width: 100vw;
	box-sizing: border-box;
`;

export const StyledMobileNavButton = styled.button<{ $isActive: boolean }>`
	flex: 1;
	min-width: 0;
	max-width: 25vw;
	padding: 0.75rem 0.25rem;
	border: none;
	background: ${(props) => (props.$isActive ? '#f5f3f0' : 'transparent')};
	color: ${(props) => (props.$isActive ? '#8b4513' : '#f5f3f0')};
	font-weight: bold;
	font-size: 0.7rem;
	cursor: pointer;
	transition: all 0.2s ease;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	box-sizing: border-box;

	&:hover {
		background: ${(props) => (props.$isActive ? '#f5f3f0' : 'rgba(245, 243, 240, 0.1)')};
	}

	&:active {
		transform: translateY(1px);
	}
`;

// Action buttons (Revert/Copy)
export const StyledActionButtons = styled.div`
	position: absolute;
	top: 1rem;
	right: 1rem;
	display: flex;
	gap: 0.5rem;
	z-index: 1000;

	@media (max-width: 768px) {
		display: none;
	}
`;

export const StyledActionButton = styled.button<{ $variant?: 'danger' | 'primary' }>`
	padding: 8px 12px;
	font-size: 0.8rem;
	background-color: ${(props) => (props.$variant === 'danger' ? '#c53030' : '#8b4513')};
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	white-space: nowrap;
	font-weight: bold;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	transition: all 0.2s ease;

	&:hover {
		background-color: ${(props) => (props.$variant === 'danger' ? '#b32c2c' : '#7a3e11')};
		transform: translateY(-1px);
	}

	&:active {
		transform: translateY(0);
	}
`;
