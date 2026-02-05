import styled from 'styled-components';
import { theme } from './theme';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledMovementContainer = styled.div<MobileStyledProps>`
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
	background: ${theme.colors.bg.secondary};
	margin-bottom: ${theme.spacing[4]};
`;

export const StyledMovementGrid = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	margin-bottom: 1rem;
`;

export const StyledMovementStat = styled.div<MobileStyledProps>`
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 4rem;
`;

export const StyledMovementLabel = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.secondary};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const StyledMovementValue = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize['2xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.accent.primary};
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
`;
