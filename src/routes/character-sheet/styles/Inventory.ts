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
	min-width: 0;

	@container sheet-tabs (max-width: 56rem) {
		padding: ${theme.spacing[3]};
	}
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
	min-width: 0;
`;

export const StyledInventoryHeaderRow = styled.div<{
	$explicitEditMode?: boolean;
	$readOnly?: boolean;
}>`
	display: grid;
	grid-template-columns: ${({ $explicitEditMode, $readOnly }) =>
		$readOnly
			? '48px 100px 2fr 60px 30px 70px'
			: $explicitEditMode
				? '48px 100px 2fr 60px 30px 70px 56px'
				: '30px 48px 100px 2fr 60px 30px 70px'};
	gap: ${theme.spacing[2]};
	margin-bottom: ${theme.spacing[2]};
	border-bottom: 1px solid ${theme.colors.border.default};
	padding-bottom: ${theme.spacing[1]};
	align-items: center;

	@container sheet-tabs (max-width: 56rem) {
		display: none;
	}
`;

export const StyledInventoryHeaderColumn = styled.span.withConfig({
	shouldForwardProp: (prop) => prop !== 'align'
})<{ align?: string }>`
	font-weight: bold;
	text-align: ${(props) => props.align || 'left'};
`;

export const StyledInventoryRow = styled.div<{
	$explicitEditMode?: boolean;
	$readOnly?: boolean;
}>`
	display: grid;
	grid-template-columns: ${({ $explicitEditMode, $readOnly }) =>
		$readOnly
			? '48px 100px 2fr 60px 30px 70px'
			: $explicitEditMode
				? '48px 100px 2fr 60px 30px 70px 56px'
				: '30px 48px 100px 2fr 60px 30px 70px'};
	gap: ${theme.spacing[2]};
	margin-bottom: ${theme.spacing[2]};
	align-items: center;

	@container sheet-tabs (max-width: 56rem) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-areas: ${({ $readOnly }) =>
			$readOnly
				? "'type type' 'item item' 'equipped count' 'cost info'"
				: "'type type' 'item item' 'equipped count' 'cost info' 'actions actions'"};
		gap: ${theme.spacing[3]};
		padding: ${theme.spacing[3]};
		border: 1px solid ${theme.colors.border.default};
		border-radius: ${theme.borderRadius.md};
		background: ${theme.colors.bg.primary};
	}
`;

type InventoryFieldArea = 'actions' | 'equipped' | 'type' | 'item' | 'count' | 'info' | 'cost';

export const StyledInventoryField = styled.div<{ $area: InventoryFieldArea }>`
	display: flex;
	align-items: center;
	justify-content: ${({ $area }) =>
		$area === 'type' || $area === 'item' ? 'stretch' : $area === 'actions' ? 'flex-end' : 'center'};
	min-width: 0;

	& > * {
		min-width: 0;
	}

	${({ $area }) =>
		($area === 'type' || $area === 'item') &&
		`
			& > * {
				width: 100%;
			}
		`}

	@container sheet-tabs (max-width: 56rem) {
		grid-area: ${({ $area }) => $area};
		gap: ${theme.spacing[2]};
		justify-content: space-between;

		&[data-label]::before {
			content: attr(data-label);
			color: ${theme.colors.text.muted};
			font-size: ${theme.typography.fontSize.xs};
			font-weight: ${theme.typography.fontWeight.semibold};
			letter-spacing: 0.04em;
			text-transform: uppercase;
		}

		${({ $area }) =>
			($area === 'type' || $area === 'item') &&
			`
				align-items: stretch;
				flex-direction: column;
			`}

		${({ $area }) =>
			$area === 'actions' &&
			`
				justify-content: flex-end;
				padding-top: ${theme.spacing[1]};
				border-top: 1px solid ${theme.colors.border.subtle};
			`}
	}
`;

export const StyledInventoryValue = styled.div<{ $centered?: boolean }>`
	min-width: 0;
	overflow: hidden;
	color: ${theme.colors.text.primary};
	text-align: ${({ $centered }) => ($centered ? 'center' : 'left')};
	text-overflow: ellipsis;
	white-space: nowrap;
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
	width: 100%;
	min-width: 0;
	box-sizing: border-box;
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
	width: 100%;
	min-width: 0;
	box-sizing: border-box;
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

export const StyledInventoryCheckbox = styled.input<MobileStyledProps>`
	width: 18px;
	height: 18px;
	margin: 0 auto;
	accent-color: ${theme.colors.accent.primary};
	cursor: pointer;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.45;
	}
`;
