import styled from 'styled-components';
import { media, theme } from './theme';

export const InventoryPreviewCard = styled.div`
	display: flex;
	gap: ${theme.spacing[4]};
	flex-direction: column;
`;

export const InventoryPreviewHeader = styled.div`
	display: flex;
	padding-bottom: ${theme.spacing[3]};
	border-bottom: 1px solid ${theme.colors.border.default};
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[3]};
`;

export const InventoryPreviewTitle = styled.h3`
	margin: 0;
	color: ${theme.colors.text.primary};
	font-family: ${theme.typography.fontFamily.heading};
	font-size: ${theme.typography.fontSize.xl};
`;

export const InventoryTypeBadge = styled.span`
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	border: 1px solid ${theme.colors.accent.secondary};
	border-radius: ${theme.borderRadius.full};
	color: ${theme.colors.accent.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	text-transform: uppercase;
`;

export const InventoryInfoGrid = styled.dl`
	display: grid;
	margin: 0;
	gap: ${theme.spacing[3]};
	grid-template-columns: repeat(2, minmax(0, 1fr));

	${media.mobile} {
		grid-template-columns: 1fr;
	}
`;

export const InventoryInfoItem = styled.div`
	min-width: 0;
`;

export const InventoryInfoLabel = styled.dt`
	margin-bottom: ${theme.spacing[1]};
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	letter-spacing: 0.04em;
	text-transform: uppercase;
`;

export const InventoryInfoValue = styled.dd`
	margin: 0;
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.normal};
`;

export const InventorySetup = styled.section`
	display: flex;
	padding-top: ${theme.spacing[4]};
	border-top: 1px solid ${theme.colors.border.default};
	gap: ${theme.spacing[5]};
	align-items: end;
	flex-wrap: wrap;
`;

export const InventorySetupField = styled.div`
	display: flex;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	letter-spacing: 0.04em;
	text-transform: uppercase;
	flex-direction: column;
	gap: ${theme.spacing[1]};
`;

export const InventoryQuantity = styled.div`
	display: grid;
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	overflow: hidden;
	grid-template-columns: repeat(3, 42px);
`;

export const InventoryQuantityButton = styled.button`
	min-height: 38px;
	border: 0;
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font: inherit;
	cursor: pointer;

	&:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
`;

export const InventoryQuantityValue = styled.output`
	display: grid;
	border-right: 1px solid ${theme.colors.border.default};
	border-left: 1px solid ${theme.colors.border.default};
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	place-items: center;
`;

export const InventoryEquipLabel = styled.label`
	display: flex;
	min-height: 38px;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	align-items: center;
	gap: ${theme.spacing[2]};
`;

export const InventorySetupValue = styled.strong`
	display: flex;
	min-height: 38px;
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.md};
	align-items: center;
`;

export const InventoryCustomInput = styled.input`
	width: 100%;
	box-sizing: border-box;
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font: inherit;
`;

export const InventoryCustomTextarea = styled.textarea`
	width: 100%;
	min-height: 88px;
	box-sizing: border-box;
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font: inherit;
	resize: vertical;
`;
