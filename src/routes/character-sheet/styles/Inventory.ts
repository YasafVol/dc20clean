import styled from 'styled-components';
import { theme } from './theme';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledInventorySection = styled.div<MobileStyledProps>`
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
	background: ${theme.colors.bg.secondary};
	margin-bottom: ${theme.spacing[4]};
	color: ${theme.colors.text.primary};
`;

export const StyledInventoryTitle = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	text-align: center;
	margin-bottom: ${theme.spacing[4]};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const StyledAddItemButton = styled.button<MobileStyledProps>`
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	background-color: ${theme.colors.bg.tertiary};
	color: ${theme.colors.accent.primary};
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.sm};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	margin-bottom: ${theme.spacing[4]};
	font-weight: ${theme.typography.fontWeight.semibold};

	&:hover {
		background-color: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		transform: translateY(-1px);
		box-shadow: ${theme.shadows.md};
	}
`;

export const StyledInventoryContainer = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.primary};
`;

export const StyledInventoryHeaderRow = styled.div`
	display: grid;
	grid-template-columns: 30px 100px 2fr 60px 30px 70px;
	gap: ${theme.spacing[2]};
	margin-bottom: ${theme.spacing[2]};
	border-bottom: 1px solid ${theme.colors.border.default};
	padding-bottom: ${theme.spacing[1]};
	align-items: center;
`;

export const StyledInventoryHeaderColumn = styled.span.withConfig({
	shouldForwardProp: (prop) => prop !== 'align'
})<{ align?: string }>`
	font-weight: bold;
	text-align: ${(props) => props.align || 'left'};
`;

export const StyledInventoryRow = styled.div`
	display: grid;
	grid-template-columns: 30px 100px 2fr 60px 30px 70px;
	gap: ${theme.spacing[2]};
	margin-bottom: ${theme.spacing[2]};
	align-items: center;
`;

export const StyledRemoveItemButton = styled.button`
	width: 24px;
	height: 24px;
	border: 1px solid ${theme.colors.accent.danger};
	background-color: ${theme.colors.bg.secondary};
	color: ${theme.colors.accent.danger};
	border-radius: ${theme.borderRadius.sm};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	transition: all 0.2s;

	&:hover {
		background-color: ${theme.colors.accent.danger};
		color: ${theme.colors.text.inverse};
		transform: scale(1.05);
	}
`;

export const StyledInventorySelect = styled.select<MobileStyledProps>`
	padding: ${theme.spacing[1]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.sm};
	font-size: ${theme.typography.fontSize.sm};
	background-color: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	transition: border-color 0.2s;

	&:focus {
		outline: none;
		border-color: ${theme.colors.border.focus};
	}

	&:disabled {
		background-color: ${theme.colors.bg.elevated};
		color: ${theme.colors.text.muted};
		cursor: not-allowed;
	}
`;

export const StyledInventoryInput = styled.input<MobileStyledProps>`
	padding: ${theme.spacing[1]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.sm};
	font-size: ${theme.typography.fontSize.sm};
	text-align: center;
	background-color: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	transition: border-color 0.2s;

	&:focus {
		outline: none;
		border-color: ${theme.colors.border.focus};
	}

	&::placeholder {
		color: ${theme.colors.text.muted};
	}
`;

export const StyledInventoryTextInput = styled.input<MobileStyledProps>`
	padding: ${theme.spacing[1]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.sm};
	font-size: ${theme.typography.fontSize.sm};
	text-align: left;
	width: 100%;
	box-sizing: border-box;
	background-color: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	transition: border-color 0.2s;

	&:focus {
		outline: none;
		border-color: ${theme.colors.border.focus};
	}

	&::placeholder {
		color: ${theme.colors.text.muted};
	}
`;

export const StyledInventoryInfoIcon = styled.span<MobileStyledProps>`
	background: transparent;
	color: ${theme.colors.accent.primary};
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: 50%;
	width: 20px;
	height: 20px;
	cursor: pointer;
	font-style: italic;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	transition: all 0.2s;

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		transform: scale(1.1);
	}
`;

export const StyledInventoryCost = styled.div`
	text-align: center;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
`;

export const StyledEmptyInventory = styled.div`
	text-align: center;
	font-style: italic;
	padding: ${theme.spacing[8]};
	color: ${theme.colors.text.muted};
`;

export const StyledInventoryCellCentered = styled.div<MobileStyledProps>`
	text-align: center;
`;
