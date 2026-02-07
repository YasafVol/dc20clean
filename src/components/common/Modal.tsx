/**
 * Unified Modal Component
 * 
 * Design system modal for consistent dialog styling.
 * Uses CSS variables for colors, theme tokens for spacing/typography.
 */

import styled from 'styled-components';
import { theme } from '../../routes/character-sheet/styles/theme';

export const ModalBackdrop = styled.div`
	position: fixed;
	inset: 0;
	z-index: 40;
	background: rgba(0, 0, 0, 0.7);
	backdrop-filter: blur(4px);
`;

export const ModalContainer = styled.div`
	position: fixed;
	inset: ${theme.spacing[4]};
	z-index: 50;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.crystal.primaryAlpha30};
	border-radius: ${theme.borderRadius.lg};
	box-shadow: ${theme.shadows.lg};

	@media (min-width: 768px) {
		inset: auto;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-height: 70vh;
		width: 500px;
	}
`;

export const ModalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: ${theme.spacing[4]};
	border-bottom: 1px solid ${theme.colors.crystal.primaryAlpha30};
	background: ${theme.colors.bg.secondary};
`;

export const ModalTitle = styled.h3`
	font-family: ${theme.typography.fontFamily.secondary};
	font-size: ${theme.typography.fontSize.lg};
	font-weight: ${theme.typography.fontWeight.semibold};
	color: ${theme.colors.text.primary};
	margin: 0;
`;

export const ModalCloseButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	padding: 0;
	background: transparent;
	color: ${theme.colors.text.secondary};
	border: none;
	border-radius: ${theme.borderRadius.md};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	font-size: ${theme.typography.fontSize.xl};
	line-height: 1;

	&:hover {
		background: ${theme.colors.crystal.primaryAlpha20};
		color: ${theme.colors.text.primary};
	}
`;

export const ModalBody = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: ${theme.spacing[4]};
`;

export const ModalFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: ${theme.spacing[3]};
	padding: ${theme.spacing[4]};
	border-top: 1px solid ${theme.colors.crystal.primaryAlpha30};
	background: ${theme.colors.bg.secondary};
`;

export const SearchInput = styled.input`
	width: 100%;
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.primary};
	border: 1px solid ${theme.colors.crystal.primaryAlpha30};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.sm};
	transition: all ${theme.transitions.fast};

	&::placeholder {
		color: ${theme.colors.text.muted};
	}

	&:focus {
		outline: none;
		border-color: ${theme.colors.crystal.primary};
		box-shadow: 0 0 0 3px ${theme.colors.crystal.primaryAlpha20};
	}
`;
