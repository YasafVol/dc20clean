/**
 * Unified Button Component
 * 
 * Design system button for consistent styling across the app.
 * Uses CSS variables for colors, theme tokens for spacing/typography.
 * 
 * Base style matches StyledAddWeaponButton pattern:
 * - Crystal primary border and text
 * - Tertiary background
 * - Hover effect fills with crystal primary
 */

import styled from 'styled-components';
import { theme } from '../../routes/character-sheet/styles/theme';

export interface ButtonProps {
	$variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost';
	$size?: 'sm' | 'md' | 'lg';
	$fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: ${theme.spacing[2]};
	font-family: ${theme.typography.fontFamily.primary};
	border-radius: ${theme.borderRadius.md};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	white-space: nowrap;
	user-select: none;

	/* Size variants */
	${(props) => {
		switch (props.$size) {
			case 'sm':
				return `
					padding: ${theme.spacing[1]} ${theme.spacing[3]};
					font-size: ${theme.typography.fontSize.sm};
					font-weight: ${theme.typography.fontWeight.semibold};
					height: 32px;
				`;
			case 'lg':
				return `
					padding: ${theme.spacing[3]} ${theme.spacing[6]};
					font-size: ${theme.typography.fontSize.base};
					font-weight: ${theme.typography.fontWeight.semibold};
					height: 44px;
				`;
			default: // md
				return `
					padding: ${theme.spacing[2]} ${theme.spacing[4]};
					font-size: ${theme.typography.fontSize.sm};
					font-weight: ${theme.typography.fontWeight.semibold};
					height: 36px;
				`;
		}
	}}

	/* Color variants */
	${(props) => {
		switch (props.$variant) {
			case 'danger':
				return `
					border: 1px solid ${theme.colors.accent.danger};
					background: ${theme.colors.bg.tertiary};
					color: ${theme.colors.accent.danger};

					&:hover:not(:disabled) {
						background: ${theme.colors.accent.danger};
						color: ${theme.colors.bg.primary};
						transform: translateY(-1px);
						box-shadow: ${theme.shadows.md};
					}

					&:active:not(:disabled) {
						transform: translateY(0);
					}
				`;

			case 'success':
				return `
					border: 1px solid ${theme.colors.accent.success};
					background: ${theme.colors.bg.tertiary};
					color: ${theme.colors.accent.success};

					&:hover:not(:disabled) {
						background: ${theme.colors.accent.success};
						color: ${theme.colors.bg.primary};
						transform: translateY(-1px);
						box-shadow: ${theme.shadows.md};
					}

					&:active:not(:disabled) {
						transform: translateY(0);
					}
				`;

			case 'warning':
				return `
					border: 1px solid ${theme.colors.accent.warning};
					background: ${theme.colors.bg.tertiary};
					color: ${theme.colors.accent.warning};

					&:hover:not(:disabled) {
						background: ${theme.colors.accent.warning};
						color: ${theme.colors.bg.primary};
						transform: translateY(-1px);
						box-shadow: ${theme.shadows.md};
					}

					&:active:not(:disabled) {
						transform: translateY(0);
					}
				`;

			case 'secondary':
				return `
					border: 1px solid ${theme.colors.crystal.tertiary};
					background: ${theme.colors.bg.tertiary};
					color: ${theme.colors.text.secondary};

					&:hover:not(:disabled) {
						background: ${theme.colors.crystal.tertiaryAlpha30};
						border-color: ${theme.colors.crystal.tertiary};
						color: ${theme.colors.text.primary};
					}

					&:active:not(:disabled) {
						background: ${theme.colors.crystal.tertiaryAlpha50};
					}
				`;

			case 'ghost':
				return `
					background: transparent;
					color: ${theme.colors.text.secondary};
					border: 1px solid transparent;

					&:hover:not(:disabled) {
						background: ${theme.colors.crystal.primaryAlpha10};
						color: ${theme.colors.text.primary};
					}
				`;

			default: // primary - matches StyledAddWeaponButton
				return `
					border: 1px solid ${theme.colors.crystal.primary};
					background: ${theme.colors.bg.tertiary};
					color: ${theme.colors.crystal.primary};

					&:hover:not(:disabled) {
						background: ${theme.colors.crystal.primary};
						color: ${theme.colors.bg.primary};
						transform: translateY(-1px);
						box-shadow: ${theme.shadows.md};
					}

					&:active:not(:disabled) {
						transform: translateY(0);
					}
				`;
		}
	}}

	/* Full width */
	${(props) => props.$fullWidth && 'width: 100%;'}

	/* Disabled state */
	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none !important;
	}
`;

export const IconButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	padding: 0;
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.primary};
	border: 1px solid ${theme.colors.crystal.primary};
	border-radius: ${theme.borderRadius.md};
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover:not(:disabled) {
		background: ${theme.colors.crystal.primary};
		color: ${theme.colors.bg.primary};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;
