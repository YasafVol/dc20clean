import styled from 'styled-components';
import { StyledFeaturePopupContent, StyledFeaturePopupHeader } from './FeaturePopup';
import { media, theme } from './theme';

export const CustomWeaponBuilderContent = styled(StyledFeaturePopupContent)`
	display: flex;
	width: min(1180px, calc(100vw - ${theme.spacing[8]}));
	max-width: 1180px;
	max-height: min(90vh, 900px);
	padding: 0;
	overflow: hidden;
	flex-direction: column;

	${media.mobile} {
		width: calc(100vw - ${theme.spacing[4]});
		max-height: calc(100vh - ${theme.spacing[4]});
		margin: ${theme.spacing[2]};
	}
`;

export const CustomWeaponBuilderHeader = styled(StyledFeaturePopupHeader)`
	margin: 0;
	padding: ${theme.spacing[5]} ${theme.spacing[12]} ${theme.spacing[4]} ${theme.spacing[6]};

	${media.mobile} {
		padding: ${theme.spacing[4]} ${theme.spacing[10]} ${theme.spacing[3]} ${theme.spacing[4]};
	}
`;

export const CustomWeaponBuilderBody = styled.div`
	display: grid;
	min-height: 0;
	grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
	flex: 1;
	overflow: hidden;

	${media.mobile} {
		display: block;
		overflow-y: auto;
	}
`;

export const CustomWeaponBuilderSheetPane = styled.div`
	min-height: 0;
	padding: ${theme.spacing[4]} ${theme.spacing[5]};
	overflow-y: auto;

	${media.mobile} {
		padding: ${theme.spacing[3]};
		overflow: visible;
	}
`;

export const CustomWeaponBuilderPreview = styled.aside`
	min-height: 0;
	padding: ${theme.spacing[4]} ${theme.spacing[5]};
	border-left: 1px solid ${theme.colors.border.default};
	background: ${theme.colors.bg.primary};
	overflow-y: auto;

	${media.mobile} {
		padding: ${theme.spacing[4]};
		border-top: 1px solid ${theme.colors.border.default};
		border-left: 0;
		overflow: visible;
	}
`;

export const CustomWeaponBuilderPreviewTitle = styled.h3`
	margin: 0 0 ${theme.spacing[3]};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	letter-spacing: 0.05em;
	text-transform: uppercase;
`;

export const CustomWeaponBuilderPlaceholder = styled.div`
	display: grid;
	min-height: 240px;
	place-items: center;
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.sm};
	text-align: center;
`;

export const CustomWeaponBuilderFooter = styled.footer`
	display: flex;
	padding: ${theme.spacing[4]} ${theme.spacing[6]};
	border-top: 1px solid ${theme.colors.border.default};
	background: ${theme.colors.bg.elevated};
	align-items: center;
	justify-content: flex-end;
	gap: ${theme.spacing[2]};

	${media.mobile} {
		padding: ${theme.spacing[3]} ${theme.spacing[4]};
	}
`;

export const CustomWeaponBuilderButton = styled.button<{ $primary?: boolean }>`
	min-height: 40px;
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	border: 1px solid
		${({ $primary }) => ($primary ? theme.colors.accent.primary : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.md};
	background: ${({ $primary }) => ($primary ? theme.colors.accent.primary : 'transparent')};
	color: ${({ $primary }) => ($primary ? theme.colors.text.inverse : theme.colors.text.secondary)};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	cursor: pointer;

	&:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 2px;
	}
`;
