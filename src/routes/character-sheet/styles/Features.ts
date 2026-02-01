import styled from 'styled-components';
import { theme } from './theme';

export const StyledFeatureGrid = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[2]};
	margin-bottom: ${theme.spacing[4]};
`;

export const StyledFeatureItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.tertiary};
	min-height: 36px;
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.bg.elevated};
		border-color: ${theme.colors.accent.primary};
	}
`;

export const StyledFeatureName = styled.span`
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.primary};
	font-weight: ${theme.typography.fontWeight.medium};
	flex: 1;
	line-height: ${theme.typography.lineHeight.tight};
	margin-right: ${theme.spacing[3]};
`;

export const StyledFeatureReadMore = styled.button`
	background: ${theme.colors.accent.primary};
	color: ${theme.colors.text.inverse};
	border: none;
	border-radius: ${theme.borderRadius.sm};
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	cursor: pointer;
	margin-left: ${theme.spacing[3]};
	white-space: nowrap;
	flex-shrink: 0;
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.accent.secondary};
		transform: scale(1.05);
	}
`;

export const StyledFeatureCategory = styled.div`
	margin-bottom: ${theme.spacing[6]};
`;

export const StyledFeatureCategoryTitle = styled.h4`
	margin: 0 0 ${theme.spacing[3]} 0;
	color: ${theme.colors.accent.primary};
	font-size: ${theme.typography.fontSize.lg};
	font-weight: ${theme.typography.fontWeight.bold};
	border-bottom: 1px solid ${theme.colors.border.default};
	padding-bottom: ${theme.spacing[2]};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;
