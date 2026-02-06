import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme, media } from '../../routes/character-sheet/styles/theme';

// Base button styles
const BaseButton = styled(motion.button)`
	padding: ${theme.spacing[3]} ${theme.spacing[6]};
	border-radius: 8px;
	font-family: ${theme.typography.fontFamily.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	border: 2px solid transparent;
	cursor: pointer;
	transition: all 0.2s ease;
	white-space: nowrap;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	${media.mobile} {
		padding: ${theme.spacing[2]} ${theme.spacing[4]};
		font-size: ${theme.typography.fontSize.xs};
	}
`;

// Primary button (blue crystal)
export const PrimaryButton = styled(BaseButton)`
	background: ${theme.colors.crystal.primaryAlpha50};
	border-color: ${theme.colors.crystal.primary};
	color: ${theme.colors.crystal.primary};

	&:hover:not(:disabled) {
		background: ${theme.colors.crystal.primaryAlpha70};
		box-shadow: 0 0 20px ${theme.colors.crystal.primaryAlpha30};
	}

	&:active:not(:disabled) {
		background: ${theme.colors.crystal.primaryAlpha90};
	}
`;

// Secondary button (gray)
export const SecondaryButton = styled(BaseButton)`
	background: ${theme.colors.bg.tertiary};
	border-color: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.primary};

	&:hover:not(:disabled) {
		background: ${theme.colors.bg.elevated};
		border-color: ${theme.colors.text.muted};
	}

	&:active:not(:disabled) {
		background: ${theme.colors.bg.secondary};
	}
`;

// Success button (emerald/green)
export const SuccessButton = styled(BaseButton)`
	background: rgba(16, 185, 129, 0.2);
	border-color: rgb(16, 185, 129);
	color: rgb(16, 185, 129);

	&:hover:not(:disabled) {
		background: rgba(16, 185, 129, 0.3);
		box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
	}

	&:active:not(:disabled) {
		background: rgba(16, 185, 129, 0.4);
	}
`;

// Danger button (red)
export const DangerButton = styled(BaseButton)`
	background: ${theme.colors.accent.dangerAlpha20};
	border-color: ${theme.colors.accent.danger};
	color: ${theme.colors.accent.danger};

	&:hover:not(:disabled) {
		background: ${theme.colors.accent.dangerAlpha30};
		box-shadow: 0 0 20px ${theme.colors.accent.dangerAlpha20};
	}

	&:active:not(:disabled) {
		background: ${theme.colors.accent.dangerAlpha40};
	}
`;

// Warning button (yellow/orange)
export const WarningButton = styled(BaseButton)`
	background: ${theme.colors.accent.warningAlpha20};
	border-color: ${theme.colors.accent.warning};
	color: ${theme.colors.accent.warning};

	&:hover:not(:disabled) {
		background: ${theme.colors.accent.warningAlpha30};
		box-shadow: 0 0 20px ${theme.colors.accent.warningAlpha20};
	}

	&:active:not(:disabled) {
		background: ${theme.colors.accent.warningAlpha40};
	}
`;

// Small button variant
export const SmallButton = styled(BaseButton)`
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	font-size: ${theme.typography.fontSize.xs};
`;

// Icon button (square, for icons only)
export const IconButton = styled(BaseButton)`
	padding: ${theme.spacing[2]};
	border-radius: 6px;
	aspect-ratio: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;
