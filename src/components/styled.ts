import styled from 'styled-components';
// Import static assets

import mainBgImage from '../assets/Main.jpg';
import { media } from '../styles/responsive';

type StyledMenuVariant = 'character' | 'dm' | 'tools' | 'rulebook';

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 2rem;
	background: url('${mainBgImage}') center/cover no-repeat;
	position: relative;

	${media.mobile} {
		padding: 1rem;
	}
`;

export const StyledTitle = styled.h1`
	margin-bottom: 0.2rem;
	color: #fbbf24;
	text-align: center;
	font-size: clamp(2rem, 6vw, 3rem);
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

export const StyledWhatsNewSection = styled.section`
	width: 100%;
	max-width: 900px;
	margin-bottom: 1.5rem;
	padding: 1.15rem;
	border: 1px solid rgba(125, 207, 255, 0.35);
	border-radius: 12px;
	background:
		radial-gradient(circle at 100% 0%, rgba(187, 154, 247, 0.12), transparent 14rem),
		rgba(26, 27, 38, 0.72);
	backdrop-filter: blur(5px);
`;

export const StyledWhatsNewHeader = styled.div`
	display: flex;
	align-items: start;
	justify-content: space-between;
	gap: 1rem;
	margin-bottom: 0.95rem;

	@media (max-width: 34rem) {
		flex-direction: column;
	}
`;

export const StyledWhatsNewKicker = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	margin-bottom: 0.35rem;
	color: #7dcfff;
	font-size: 0.72rem;
	font-weight: 800;
	letter-spacing: 0.12em;
	text-transform: uppercase;
`;

export const StyledWhatsNewTitle = styled.h2`
	margin: 0;
	color: #f1f5ff;
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
	font-size: clamp(1.2rem, 3vw, 1.55rem);
	line-height: 1.15;
`;

export const StyledWhatsNewDate = styled.time`
	color: #737da8;
	font-size: 0.82rem;
`;

export const StyledWhatsNewCopy = styled.p`
	max-width: 55rem;
	margin: 0;
	color: #a9b1d6;
	font-size: 0.95rem;
	line-height: 1.55;
`;

export const StyledWhatsNewHighlights = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 0.45rem;
	margin: 0.85rem 0 0;
	padding: 0;
	list-style: none;

	li {
		padding: 0.3rem 0.55rem;
		border: 1px solid rgba(158, 206, 106, 0.3);
		border-radius: 999px;
		background: rgba(158, 206, 106, 0.08);
		color: #c4e6a3;
		font-size: 0.78rem;
	}
`;

export const StyledWhatsNewActions = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.65rem;
	margin-top: 1rem;
`;

export const StyledWhatsNewLink = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	min-height: 2.45rem;
	padding: 0.55rem 0.8rem;
	border-radius: 0.65rem;
	font-size: 0.85rem;
	font-weight: 800;
	text-decoration: none;
	transition:
		transform 150ms ease,
		background 150ms ease;

	&:hover {
		transform: translateY(-1px);
	}

	&:focus-visible {
		outline: 2px solid #7dcfff;
		outline-offset: 3px;
	}
`;

export const StyledWhatsNewPrimaryLink = styled(StyledWhatsNewLink)`
	background: #7dcfff;
	color: #16161e;

	&:hover {
		background: #a8e0ff;
	}
`;

export const StyledWhatsNewSecondaryLink = styled(StyledWhatsNewLink)`
	border: 1px solid rgba(125, 207, 255, 0.35);
	background: rgba(125, 207, 255, 0.08);
	color: #c0e7ff;

	&:hover {
		background: rgba(125, 207, 255, 0.16);
	}
`;

// Character section - Gold/Amber highlight
export const StyledCharacterGrid = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: 1rem;

	${media.tabletUp} {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

// DM Tools section - Purple highlight
export const StyledDMGrid = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: 1rem;

	${media.desktop} {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

export const StyledDMGroup = styled.div`
	min-width: 0;
`;

export const StyledDMGroupCards = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: 1rem;

	${media.tabletUp} {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

// Tools section - 4 columns
export const StyledToolsGrid = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	row-gap: 1.5rem;
	column-gap: 1rem;

	& > *:nth-child(5) {
		grid-column: auto;
	}

	${media.tablet} {
		grid-template-columns: repeat(2, minmax(0, 1fr));

		& > *:nth-child(5) {
			grid-column: 1 / -1;
		}
	}

	${media.desktop} {
		grid-template-columns: repeat(4, minmax(0, 1fr));

		& > *:nth-child(5) {
			grid-column: 2 / span 2;
		}
	}
`;

// Old grid for backwards compatibility
export const StyledMenuGrid = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: 1.5rem;
	max-width: 900px;
	width: 100%;

	${media.tabletUp} {
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
`;

// Base menu card with variant support
export const StyledMenuCard = styled.button<{ $variant?: StyledMenuVariant }>`
	border: 1px solid
		${(props) =>
			props.$variant === 'character'
				? 'rgba(251, 191, 36, 0.4)'
				: props.$variant === 'dm'
					? 'rgba(168, 85, 247, 0.4)'
					: props.$variant === 'rulebook'
						? 'rgba(34, 197, 94, 0.4)'
						: 'rgba(96, 165, 250, 0.4)'};
	padding: 1rem 1.25rem;
	border-radius: 8px;
	background: ${(props) =>
		props.$variant === 'character'
			? 'rgba(251, 191, 36, 0.05)'
			: props.$variant === 'dm'
				? 'rgba(168, 85, 247, 0.05)'
				: props.$variant === 'rulebook'
					? 'rgba(34, 197, 94, 0.05)'
					: 'rgba(96, 165, 250, 0.05)'};
	cursor: pointer;
	transition: all 0.3s ease;
	text-align: left;
	box-shadow: none;
	backdrop-filter: blur(4px);
	height: 90px;
	display: flex;
	flex-direction: ${(props) =>
		props.$variant === 'tools' || props.$variant === 'rulebook' ? 'column' : 'row'};
	justify-content: ${(props) =>
		props.$variant === 'tools' || props.$variant === 'rulebook' ? 'center' : 'space-between'};
	align-items: center;
	gap: ${(props) =>
		props.$variant === 'tools' || props.$variant === 'rulebook' ? '0.5rem' : '0.75rem'};

	&:hover {
		border-color: ${(props) =>
			props.$variant === 'character'
				? '#fbbf24'
				: props.$variant === 'dm'
					? '#a855f7'
					: props.$variant === 'rulebook'
						? '#22c55e'
						: '#60a5fa'};
		background: ${(props) =>
			props.$variant === 'character'
				? 'rgba(251, 191, 36, 0.15)'
				: props.$variant === 'dm'
					? 'rgba(168, 85, 247, 0.15)'
					: props.$variant === 'rulebook'
						? 'rgba(34, 197, 94, 0.15)'
						: 'rgba(96, 165, 250, 0.15)'};
		transform: translateY(-2px);
	}
`;

export const StyledIcon = styled.div<{ $variant?: StyledMenuVariant }>`
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
		props.$variant === 'character'
			? '#fbbf24'
			: props.$variant === 'dm'
				? '#c084fc'
				: props.$variant === 'rulebook'
					? '#4ade80'
					: '#60a5fa'};
	font-weight: 300;

	svg {
		width: 40px;
		height: 40px;
	}

	${StyledMenuCard}:hover & {
		color: ${(props) =>
			props.$variant === 'character'
				? '#f59e0b'
				: props.$variant === 'dm'
					? '#a855f7'
					: props.$variant === 'rulebook'
						? '#22c55e'
						: '#3b82f6'};
		transform: scale(1.1);
	}
`;

export const StyledCardTitle = styled.h2<{ $variant?: StyledMenuVariant }>`
	margin: 0;
	color: ${(props) =>
		props.$variant === 'character'
			? '#fbbf24'
			: props.$variant === 'dm'
				? '#c084fc'
				: props.$variant === 'rulebook'
					? '#4ade80'
					: '#60a5fa'};
	font-size: 1.1rem;
	font-weight: bold;
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	transition: all 0.3s ease;
	text-align: ${(props) => (props.$variant === 'tools' ? 'center' : 'left')};
	letter-spacing: 0.5px;
	line-height: 1.2;

	${StyledMenuCard}:hover & {
		color: ${(props) =>
			props.$variant === 'character'
				? '#f59e0b'
				: props.$variant === 'dm'
					? '#a855f7'
					: props.$variant === 'rulebook'
						? '#22c55e'
						: '#3b82f6'};
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

export const StyledTextContent = styled.div<{ $center?: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: ${(props) => (props.$center ? 'center' : 'flex-start')};
	flex: ${(props) => (props.$center ? '0 1 auto' : '1')};
	min-width: 0;
`;
