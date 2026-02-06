import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme, media } from '../character-sheet/styles/theme';

/**
 * LoadCharacter Page-Specific Styled Components
 * Shared components (buttons, modals, containers) imported from src/components/styled
 */

// Character grid layout
export const CharacterGrid = styled.div`
	max-width: 1400px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: ${theme.spacing[6]};

	${media.tabletDown} {
		grid-template-columns: repeat(2, 1fr);
	}

	${media.mobile} {
		grid-template-columns: 1fr;
		gap: ${theme.spacing[4]};
	}
`;

// Character card
export const CharacterCard = styled(motion.div)`
	background: linear-gradient(135deg, ${theme.colors.bg.secondary} 0%, ${theme.colors.bg.primary} 100%);
	border: 2px solid ${theme.colors.bg.tertiary};
	border-radius: 12px;
	padding: ${theme.spacing[6]};
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: all 0.3s ease;

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

	&:hover {
		border-color: ${theme.colors.crystal.primary};
		box-shadow: 0 8px 32px ${theme.colors.crystal.primaryAlpha20};
	}

	${media.mobile} {
		padding: ${theme.spacing[4]};
	}
`;

// Character name (title)
export const CharacterName = styled.h2`
	font-family: ${theme.typography.fontFamily};
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.crystal.primary};
	text-align: center;
	margin: 0 0 ${theme.spacing[4]} 0;
	text-shadow: 0 0 10px ${theme.colors.crystal.primaryAlpha30};
`;

// Player name
export const PlayerName = styled.p`
	font-family: ${theme.typography.fontFamily};
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.secondary};
	text-align: center;
	margin: 0 0 ${theme.spacing[4]} 0;
`;

// Character stats container
export const CharacterStats = styled.div`
	display: flex;
	justify-content: space-between;
	gap: ${theme.spacing[4]};
	margin-bottom: ${theme.spacing[4]};
	padding: ${theme.spacing[4]} 0;
	border-top: 1px solid ${theme.colors.bg.tertiary};
	border-bottom: 1px solid ${theme.colors.bg.tertiary};
`;

// Stat block (individual stat)
export const StatBlock = styled.div`
	text-align: center;
	flex: 1;
`;

// Stat label
export const StatLabel = styled.div`
	font-family: ${theme.typography.fontFamily};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.crystal.secondary};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	margin-bottom: ${theme.spacing[1]};
`;

// Stat value
export const StatValue = styled.div`
	font-family: ${theme.typography.fontFamily};
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
`;

// Character dates (created/modified)
export const CharacterDates = styled.p`
	font-family: ${theme.typography.fontFamily};
	font-size: ${theme.typography.fontSize.xs};
	color: ${theme.colors.text.muted};
	text-align: center;
	font-style: italic;
	margin: ${theme.spacing[4]} 0;
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[1]};

	span {
		display: block;
	}
`;

// Button grid for card actions
export const ButtonGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: ${theme.spacing[2]};
	margin-top: ${theme.spacing[4]};
`;

// Card button (for actions within character card)
export const CardButton = styled(motion.button)<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	border-radius: 6px;
	font-family: ${theme.typography.fontFamily};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	border: 2px solid transparent;
	cursor: pointer;
	transition: all 0.2s ease;
	white-space: nowrap;

	background: ${(props) => {
		switch (props.$variant) {
			case 'primary':
				return theme.colors.crystal.primaryAlpha50;
			case 'danger':
				return theme.colors.accent.dangerAlpha20;
			default:
				return theme.colors.crystal.secondaryAlpha30;
		}
	}};

	border-color: ${(props) => {
		switch (props.$variant) {
			case 'primary':
				return theme.colors.crystal.primary;
			case 'danger':
				return theme.colors.accent.danger;
			default:
				return theme.colors.crystal.secondary;
		}
	}};

	color: ${(props) => {
		switch (props.$variant) {
			case 'primary':
				return theme.colors.crystal.primary;
			case 'danger':
				return theme.colors.accent.danger;
			default:
				return theme.colors.crystal.secondary;
		}
	}};

	&:hover:not(:disabled) {
		background: ${(props) => {
			switch (props.$variant) {
				case 'primary':
					return theme.colors.crystal.primaryAlpha70;
				case 'danger':
					return theme.colors.accent.dangerAlpha30;
				default:
					return theme.colors.crystal.secondaryAlpha50;
			}
		}};
		box-shadow: 0 0 15px
			${(props) => {
				switch (props.$variant) {
					case 'primary':
						return theme.colors.crystal.primaryAlpha30;
					case 'danger':
						return theme.colors.accent.dangerAlpha20;
					default:
						return theme.colors.crystal.secondaryAlpha30;
				}
			}};
	}

	&:active:not(:disabled) {
		background: ${(props) => {
			switch (props.$variant) {
				case 'primary':
					return theme.colors.crystal.primaryAlpha90;
				case 'danger':
					return theme.colors.accent.dangerAlpha40;
				default:
					return theme.colors.crystal.secondaryAlpha70;
			}
		}};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

// Full-width button (for delete action)
export const FullWidthButton = styled(CardButton)`
	grid-column: 1 / -1;
`;
