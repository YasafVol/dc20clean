import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme, media } from '../../routes/character-sheet/styles/theme';

// Main page container
export const PageContainer = styled.div`
	min-height: 100vh;
	background: ${theme.colors.bg.primary};
	background-image: url('/src/assets/BlackBG.jpg');
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	padding: ${theme.spacing[8]};
	position: relative;

	${media.tabletDown} {
		padding: ${theme.spacing[6]};
	}

	${media.mobile} {
		padding: ${theme.spacing[4]};
	}
`;

// Section header container
export const Header = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${theme.spacing[6]};
	margin-bottom: ${theme.spacing[8]};
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
`;

// Button row for actions
export const ButtonRow = styled.div`
	display: flex;
	gap: ${theme.spacing[4]};
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
`;

// Page title
export const PageTitle = styled(motion.h1)`
	font-family: 'Cinzel', serif;
	font-size: ${theme.typography.fontSize['3xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.crystal.primary};
	text-align: center;
	text-shadow: 0 0 30px ${theme.colors.crystal.primaryAlpha50};
	margin: 0;
	letter-spacing: 0.05em;

	${media.mobile} {
		font-size: ${theme.typography.fontSize['2xl']};
	}
`;

// Content section
export const Section = styled.section`
	max-width: 1400px;
	margin: 0 auto;
	padding: ${theme.spacing[6]} 0;
`;

// Card container
export const Card = styled(motion.div)`
	background: linear-gradient(135deg, ${theme.colors.bg.secondary} 0%, ${theme.colors.bg.primary} 100%);
	border: 2px solid ${theme.colors.bg.tertiary};
	border-radius: 12px;
	padding: ${theme.spacing[6]};
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, transparent, ${theme.colors.crystal.primary}, transparent);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	&:hover::before {
		opacity: 1;
	}

	${media.mobile} {
		padding: ${theme.spacing[4]};
	}
`;

// Grid layout
export const Grid = styled.div<{ $columns?: number }>`
	display: grid;
	grid-template-columns: repeat(${(props) => props.$columns || 3}, 1fr);
	gap: ${theme.spacing[6]};

	${media.tabletDown} {
		grid-template-columns: repeat(2, 1fr);
	}

	${media.mobile} {
		grid-template-columns: 1fr;
		gap: ${theme.spacing[4]};
	}
`;

// Empty state container
export const EmptyState = styled(motion.div)`
	text-align: center;
	padding: ${theme.spacing[12]} ${theme.spacing[6]};
	max-width: 600px;
	margin: 0 auto;
`;

export const EmptyStateTitle = styled.h2`
	font-family: ${theme.typography.fontFamily.primary};
	font-size: ${theme.typography.fontSize['2xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.crystal.primary};
	margin: 0 0 ${theme.spacing[4]} 0;
`;

export const EmptyStateText = styled.p`
	font-family: ${theme.typography.fontFamily.primary};
	font-size: ${theme.typography.fontSize.base};
	color: ${theme.colors.text.secondary};
	line-height: 1.8;
	margin: 0;
`;
