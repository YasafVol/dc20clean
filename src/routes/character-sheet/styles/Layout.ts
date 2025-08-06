import styled from 'styled-components';
import backgroundImage from '../../../assets/Desktop.png';

export const StyledContainer = styled.div`
	min-height: 100vh;
	background: url(${backgroundImage}) center/cover no-repeat;
	background-attachment: fixed;
	padding: 1rem;
	font-family: 'Georgia', serif;
	color: #2d2d2d;
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
`;

/* Corner decorations using CSS-only approach */
export const StyledCornerDecoration = styled.div<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }>`
	position: absolute;
	width: 3em;
	height: 3em;
	margin: -3px;
	z-index: 10;
	
	/* Create decorative corner using CSS */
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
