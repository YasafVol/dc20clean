import styled from 'styled-components';
import { theme } from './theme';

interface MobileStyledProps {
	$isMobile?: boolean;
}

// Stack the Health-Status row and Exhaustion row vertically inside the Health
// card so they read as two short horizontal strips instead of two tall boxes.
export const StyledDeathExhaustionContainer = styled.div<MobileStyledProps>`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[2]};
	margin-bottom: 0;
`;

// Compact horizontal row container — label left, value(s) right.
export const StyledExhaustionOnlyContainer = styled.div<MobileStyledProps>`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
	border: 1px solid ${(props) => (props.$isMobile ? 'var(--mobile-border)' : '#414868')};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	background: ${(props) => (props.$isMobile ? 'var(--mobile-bg-primary)' : '#24283B')};
	min-height: 36px;
`;

export const StyledExhaustionOnlyTitle = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.xs};
	font-weight: bold;
	color: #7dcfff;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	font-family: 'Inter', sans-serif;
	white-space: nowrap;
	margin: 0;
`;

export const StyledDeathThresholdLabel = styled.span`
	font-size: ${theme.typography.fontSize.xs};
	color: ${theme.colors.accent.primary};
	text-transform: uppercase;
	letter-spacing: 0.04em;
	margin: 0;
	white-space: nowrap;
`;

export const StyledExhaustionHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const StyledExhaustionInfoButton = styled.button`
	background: none;
	border: none;
	color: ${theme.colors.accent.primary};
	cursor: pointer;
	font-size: 0.9rem;
	padding: 0;

	&:hover {
		opacity: 0.8;
	}
`;
