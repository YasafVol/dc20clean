import styled from 'styled-components';
import { StyledFeaturePopupContent, StyledFeaturePopupHeader } from './FeaturePopup';
import { media, theme } from './theme';

export const PickerContent = styled(StyledFeaturePopupContent)`
	display: flex;
	width: min(1080px, calc(100vw - ${theme.spacing[8]}));
	max-width: 1080px;
	max-height: min(88vh, 860px);
	padding: 0;
	overflow: hidden;
	flex-direction: column;

	${media.mobile} {
		width: calc(100vw - ${theme.spacing[4]});
		max-height: calc(100vh - ${theme.spacing[4]});
		margin: ${theme.spacing[2]};
		padding: 0;
	}
`;

export const PickerHeader = styled(StyledFeaturePopupHeader)`
	margin: 0;
	padding: ${theme.spacing[5]} ${theme.spacing[12]} ${theme.spacing[4]} ${theme.spacing[6]};

	${media.mobile} {
		margin: 0;
		padding: ${theme.spacing[4]} ${theme.spacing[10]} ${theme.spacing[3]} ${theme.spacing[4]};
	}
`;

export const PickerBody = styled.div`
	display: grid;
	min-height: 0;
	grid-template-columns: minmax(210px, 0.34fr) minmax(0, 1fr);
	flex: 1;
	overflow: hidden;

	${media.mobile} {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}
`;

export const PickerListPane = styled.section`
	display: flex;
	min-height: 0;
	padding: ${theme.spacing[4]};
	border-right: 1px solid ${theme.colors.border.default};
	flex-direction: column;

	${media.mobile} {
		min-height: auto;
		padding: ${theme.spacing[3]} ${theme.spacing[4]};
		border-right: 0;
		border-bottom: 1px solid ${theme.colors.border.default};
	}
`;

export const PickerPaneTitle = styled.h3`
	margin: 0 0 ${theme.spacing[3]};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	letter-spacing: 0.05em;
	text-transform: uppercase;
`;

export const PickerList = styled.div`
	display: flex;
	min-height: 0;
	gap: ${theme.spacing[1]};
	flex: 1;
	flex-direction: column;
	overflow-y: auto;

	${media.mobile} {
		max-height: 180px;
	}
`;

export const PickerWeaponButton = styled.button<{ $selected: boolean }>`
	display: flex;
	width: 100%;
	padding: ${theme.spacing[3]};
	border: 1px solid ${({ $selected }) => ($selected ? theme.colors.accent.primary : 'transparent')};
	border-radius: ${theme.borderRadius.md};
	background: ${({ $selected }) =>
		$selected ? theme.colors.bg.tertiary : theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	text-align: left;
	cursor: pointer;
	flex-direction: column;
	gap: 2px;

	&:hover {
		border-color: ${theme.colors.border.focus};
		background: ${theme.colors.bg.tertiary};
	}

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 1px;
	}
`;

export const PickerWeaponName = styled.span`
	font-weight: ${theme.typography.fontWeight.semibold};
`;

export const PickerWeaponMeta = styled.span`
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.xs};
`;

export const PickerEmpty = styled.p`
	margin: auto 0;
	padding: ${theme.spacing[5]} ${theme.spacing[2]};
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.normal};
	text-align: center;
`;

export const PickerPreview = styled.section`
	min-height: 0;
	padding: ${theme.spacing[4]} ${theme.spacing[6]};
	overflow-y: auto;

	${media.mobile} {
		min-height: 260px;
		padding: ${theme.spacing[4]};
		overflow: visible;
	}
`;

export const PickerPlaceholder = styled.div`
	display: grid;
	min-height: 260px;
	place-items: center;
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.sm};
	text-align: center;
`;

export const PickerFooter = styled.footer`
	display: flex;
	padding: ${theme.spacing[4]} ${theme.spacing[6]};
	border-top: 1px solid ${theme.colors.border.default};
	background: ${theme.colors.bg.elevated};
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[4]};

	${media.mobile} {
		padding: ${theme.spacing[3]} ${theme.spacing[4]};
		align-items: stretch;
		flex-direction: column;
		gap: ${theme.spacing[3]};
	}
`;

export const PickerSourceSwitch = styled.div`
	display: inline-grid;
	padding: 2px;
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.full};
	background: ${theme.colors.bg.primary};
	grid-template-columns: repeat(2, minmax(86px, 1fr));
`;

export const PickerSourceButton = styled.button<{ $active: boolean }>`
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	border: 0;
	border-radius: ${theme.borderRadius.full};
	background: ${({ $active }) => ($active ? theme.colors.accent.primary : 'transparent')};
	color: ${({ $active }) => ($active ? theme.colors.text.inverse : theme.colors.text.secondary)};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	cursor: pointer;

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 1px;
	}
`;

export const PickerActions = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: ${theme.spacing[2]};
`;

const PickerActionButton = styled.button`
	min-height: 38px;
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	cursor: pointer;

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 2px;
	}
`;

export const PickerCancelButton = styled(PickerActionButton)`
	border: 1px solid ${theme.colors.border.default};
	background: transparent;
	color: ${theme.colors.text.secondary};
`;

export const PickerConfirmButton = styled(PickerActionButton)`
	border: 1px solid ${theme.colors.accent.primary};
	background: ${theme.colors.accent.primary};
	color: ${theme.colors.text.inverse};

	&:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}
`;
