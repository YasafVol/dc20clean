import styled from 'styled-components';
import { theme } from './theme';

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

	@media (max-width: 768px) {
		width: calc(100vw - 10rem);
		margin: 5rem ${theme.spacing[4]} ${theme.spacing[4]} ${theme.spacing[4]};
		padding: ${theme.spacing[6]};
	}
`;

export const StyledFeaturePopupHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${theme.spacing[6]};
	border-bottom: 2px solid ${theme.colors.border.default};
	padding-bottom: ${theme.spacing[4]};

	/* Mobile responsive styling */
	@media (max-width: 768px) {
		margin-bottom: ${theme.spacing[4]};
		padding-bottom: ${theme.spacing[3]};
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
	word-wrap: break-word;

	/* Mobile responsive styling */
	@media (max-width: 768px) {
		font-size: ${theme.typography.fontSize.xl};
		line-height: ${theme.typography.lineHeight.tight};
		margin-right: ${theme.spacing[2]};
	}

	@media (max-width: 480px) {
		font-size: ${theme.typography.fontSize.lg};
	}
`;

export const StyledFeaturePopupClose = styled.button`
	background: ${theme.colors.accent.primary};
	color: ${theme.colors.text.inverse};
	border: none;
	border-radius: ${theme.borderRadius.full};
	width: 30px;
	height: 30px;
	cursor: pointer;
	font-size: ${theme.typography.fontSize.xl};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	transition: opacity ${theme.transitions.fast};

	&:hover {
		opacity: 0.8;
	}

	/* Mobile responsive styling */
	@media (max-width: 768px) {
		width: 36px;
		height: 36px;
		font-size: ${theme.typography.fontSize['2xl']};
		margin-top: 2px;
	}
`;

export const StyledFeaturePopupDescription = styled.div`
	color: ${theme.colors.text.primary};
	line-height: ${theme.typography.lineHeight.relaxed};
	font-size: ${theme.typography.fontSize.base};
	word-wrap: break-word;
	overflow-wrap: break-word;

	/* Mobile responsive styling */
	@media (max-width: 768px) {
		font-size: ${theme.typography.fontSize.sm};
		line-height: ${theme.typography.lineHeight.normal};
	}

	@media (max-width: 480px) {
		font-size: ${theme.typography.fontSize.xs};
		line-height: ${theme.typography.lineHeight.tight};
	}
`;

export const StyledFeaturePopupSourceInfo = styled.div`
	margin-top: ${theme.spacing[4]};
	padding-top: ${theme.spacing[4]};
	border-top: 1px solid ${theme.colors.border.default};
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.secondary};
	font-style: italic;
`;
