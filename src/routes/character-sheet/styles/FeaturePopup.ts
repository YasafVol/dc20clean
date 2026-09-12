import styled from 'styled-components';
import { media, theme } from './theme';

export const StyledFeaturePopupOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.8);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: ${theme.zIndex.modal};
`;

export const StyledFeaturePopupContent = styled.div`
	position: relative;
	background: ${theme.colors.bg.elevated};
	border: 2px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.xl};
	padding: ${theme.spacing[8]};
	max-width: 600px;
	max-height: 80vh;
	overflow-y: auto;
	margin: ${theme.spacing[4]};
	box-shadow: ${theme.shadows.xl};
	box-sizing: border-box;

	${media.mobile} {
		width: calc(100vw - ${theme.spacing[8]});
		margin: 5rem ${theme.spacing[4]} ${theme.spacing[4]} ${theme.spacing[4]};
		padding: ${theme.spacing[6]};
	}
`;

export const StyledFeaturePopupHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: ${theme.spacing[4]};
	margin-bottom: ${theme.spacing[6]};
	border-bottom: 2px solid ${theme.colors.border.default};
	padding-bottom: ${theme.spacing[4]};
	padding-right: ${theme.spacing[10]};

	/* Mobile responsive styling */
	${media.mobile} {
		margin-bottom: ${theme.spacing[4]};
		padding-bottom: ${theme.spacing[3]};
		padding-right: ${theme.spacing[10]};
		align-items: flex-start;
		gap: ${theme.spacing[2]};
	}
`;

export const StyledFeaturePopupTitle = styled.h2`
	margin: 0;
	color: ${theme.colors.accent.primary};
	font-size: ${theme.typography.fontSize['2xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	flex: 1;
	min-width: 0;
	word-wrap: break-word;

	/* Mobile responsive styling */
	${media.mobile} {
		font-size: clamp(${theme.typography.fontSize.lg}, 5vw, ${theme.typography.fontSize.xl});
		line-height: ${theme.typography.lineHeight.tight};
		margin-right: ${theme.spacing[2]};
	}
`;

export const StyledFeaturePopupClose = styled.button`
	position: absolute;
	top: ${theme.spacing[3]};
	right: ${theme.spacing[3]};
	background: transparent;
	color: ${theme.colors.text.secondary};
	border: none;
	border-radius: ${theme.borderRadius.sm};
	width: 32px;
	height: 32px;
	padding: 0;
	cursor: pointer;
	font-size: ${theme.typography.fontSize.xl};
	line-height: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	transition: color ${theme.transitions.fast};

	&:hover {
		color: ${theme.colors.accent.primary};
	}

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 2px;
	}

	/* Mobile responsive styling */
	${media.mobile} {
		top: ${theme.spacing[2]};
		right: ${theme.spacing[2]};
		width: 36px;
		height: 36px;
		font-size: ${theme.typography.fontSize['2xl']};
	}
`;

export const StyledFeaturePopupDescription = styled.div`
	color: ${theme.colors.text.primary};
	line-height: ${theme.typography.lineHeight.relaxed};
	font-size: ${theme.typography.fontSize.base};
	word-wrap: break-word;
	overflow-wrap: break-word;

	/* Mobile responsive styling */
	${media.mobile} {
		font-size: clamp(${theme.typography.fontSize.xs}, 3.5vw, ${theme.typography.fontSize.sm});
		line-height: ${theme.typography.lineHeight.normal};
	}
`;

export const StyledFeaturePopupSeparatedDetail = styled.div`
	margin-top: ${theme.spacing[3]};
`;

export const StyledFeaturePopupSourceInfo = styled.div`
	margin-top: ${theme.spacing[4]};
	padding-top: ${theme.spacing[4]};
	border-top: 1px solid ${theme.colors.border.default};
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.secondary};
	font-style: italic;
`;
