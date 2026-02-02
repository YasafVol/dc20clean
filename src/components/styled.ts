import styled from 'styled-components';
// Import static assets

import mainBgImage from '../assets/Main.jpg';

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 2rem;
	background: url('${mainBgImage}') center/cover no-repeat;
	position: relative;
`;

export const StyledTitle = styled.h1`
	margin-bottom: 0.2rem;
	color: #fbbf24;
	text-align: center;
	font-size: 3rem;
	font-weight: bold;
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
	letter-spacing: 2px;
	margin-top: 10rem;
`;

export const StyledSubtitle = styled.p`
	margin-top: 0rem;
	margin-bottom: 1.5rem;
	color: #e5e7eb;
	text-align: center;
	font-size: 1.3rem;
	font-family: 'Urbanist', 'Georgia', 'Times New Roman', serif;
	font-weight: 400;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	max-width: 600px;
	line-height: 1.6;
`;

// Section container for grouping menu items
export const StyledMenuSection = styled.div`
	width: 100%;
	max-width: 900px;
	margin-bottom: 1.5rem;
`;

export const StyledSectionTitle = styled.h3`
	color: #a1a1aa;
	font-size: 0.75rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	margin-bottom: 0.75rem;
	padding-left: 0.25rem;
	font-family: 'Urbanist', sans-serif;
`;

// Character section - Gold/Amber highlight
export const StyledCharacterGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;

	@media (max-width: 599px) {
		grid-template-columns: 1fr;
	}
`;

// DM Tools section - Purple highlight
export const StyledDMGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;

	@media (max-width: 599px) {
		grid-template-columns: 1fr;
	}
`;

// Tools section - 3 columns
export const StyledToolsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;

	@media (max-width: 599px) {
		grid-template-columns: 1fr;
	}
`;

// Old grid for backwards compatibility
export const StyledMenuGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1.5rem;
	max-width: 900px;
	width: 100%;

	@media (min-width: 600px) {
		grid-template-columns: repeat(6, 1fr);

		& > *:nth-child(1) {
			grid-column: 1 / 4;
		}
		& > *:nth-child(2) {
			grid-column: 4 / 7;
		}
		& > *:nth-child(3) {
			grid-column: 1 / 3;
		}
		& > *:nth-child(4) {
			grid-column: 3 / 5;
		}
		& > *:nth-child(5) {
			grid-column: 5 / 7;
		}
	}

	@media (max-width: 599px) {
		grid-template-columns: 1fr;
	}
`;

// Base menu card with variant support
export const StyledMenuCard = styled.button<{ $variant?: 'character' | 'dm' | 'tools' }>`
	border: 1px solid
		${(props) =>
			props.$variant === 'character'
				? 'rgba(251, 191, 36, 0.4)'
				: props.$variant === 'dm'
					? 'rgba(168, 85, 247, 0.4)'
					: 'rgba(96, 165, 250, 0.4)'};
	padding: 1rem 1.25rem;
	border-radius: 8px;
	background: ${(props) =>
		props.$variant === 'character'
			? 'rgba(251, 191, 36, 0.05)'
			: props.$variant === 'dm'
				? 'rgba(168, 85, 247, 0.05)'
				: 'rgba(96, 165, 250, 0.05)'};
	cursor: pointer;
	transition: all 0.3s ease;
	text-align: left;
	box-shadow: none;
	backdrop-filter: blur(4px);
	height: 90px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 0.75rem;

	&:hover {
		border-color: ${(props) =>
			props.$variant === 'character' ? '#fbbf24' : props.$variant === 'dm' ? '#a855f7' : '#60a5fa'};
		background: ${(props) =>
			props.$variant === 'character'
				? 'rgba(251, 191, 36, 0.15)'
				: props.$variant === 'dm'
					? 'rgba(168, 85, 247, 0.15)'
					: 'rgba(96, 165, 250, 0.15)'};
		transform: translateY(-2px);
	}
`;

export const StyledIcon = styled.div<{ $variant?: 'character' | 'dm' | 'tools' }>`
	font-size: 2.5rem;
	background: transparent;
	border-radius: 0;
	width: 48px;
	height: 48px;
	min-width: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
	box-shadow: none;
	transition: all 0.3s ease;
	color: ${(props) =>
		props.$variant === 'character' ? '#fbbf24' : props.$variant === 'dm' ? '#c084fc' : '#60a5fa'};
	font-weight: 300;

	svg {
		width: 40px;
		height: 40px;
	}

	${StyledMenuCard}:hover & {
		color: ${(props) =>
			props.$variant === 'character' ? '#f59e0b' : props.$variant === 'dm' ? '#a855f7' : '#3b82f6'};
		transform: scale(1.1);
	}
`;

export const StyledCardTitle = styled.h2<{ $variant?: 'character' | 'dm' | 'tools' }>`
	margin: 0;
	color: ${(props) =>
		props.$variant === 'character' ? '#fbbf24' : props.$variant === 'dm' ? '#c084fc' : '#60a5fa'};
	font-size: 1.1rem;
	font-weight: bold;
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	transition: all 0.3s ease;
	text-align: left;
	letter-spacing: 0.5px;
	line-height: 1.2;

	${StyledMenuCard}:hover & {
		color: ${(props) =>
			props.$variant === 'character' ? '#f59e0b' : props.$variant === 'dm' ? '#a855f7' : '#3b82f6'};
	}
`;

export const StyledCardDescription = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 1.1rem;
	font-family: 'Urbanist', 'Georgia', 'Times New Roman', serif;
	font-weight: 400;
	line-height: 1.3;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	opacity: 0.9;
	text-align: left;
	letter-spacing: 1px;
`;

export const StyledTextContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	flex: 1;
	min-width: 0;
`;
