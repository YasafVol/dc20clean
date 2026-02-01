import styled from 'styled-components';
import { theme } from './theme';

export const StyledRightResourcesContainer = styled.div<{ $isMobile?: boolean }>`
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
	background: ${theme.colors.bg.secondary};
	margin-bottom: ${theme.spacing[4]};
`;

export const StyledRightResourcesTitle = styled.div<{ $isMobile?: boolean }>`
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	text-align: center;
	margin-bottom: ${theme.spacing[4]};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const StyledRightResourceRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.8rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const StyledRightResourceLabel = styled.span<{ $isMobile?: boolean }>`
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.secondary};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const StyledRightResourceControls = styled.div`
	display: flex;
	align-items: center;
	gap: 0.3rem;
`;

export const StyledRightResourceInput = styled.input<{ $isMobile?: boolean }>`
	width: 50px;
	text-align: center;
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[2]};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	background: ${theme.colors.bg.primary};
	transition: all ${theme.transitions.fast};

	&:focus {
		outline: none;
		border-color: ${theme.colors.accent.primary};
		box-shadow: 0 0 0 2px rgba(125, 207, 255, 0.2);
	}
`;

export const StyledRightResourceMax = styled.span<{ $isMobile?: boolean }>`
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.secondary};
`;
