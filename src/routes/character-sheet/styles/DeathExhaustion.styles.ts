import styled from 'styled-components';
import { theme } from './theme';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledDeathExhaustionContainer = styled.div<MobileStyledProps>`
	display: flex;
	gap: 1rem;
	margin-bottom: 1.5rem;
`;

export const StyledExhaustionOnlyContainer = styled.div<MobileStyledProps>`
	flex: 1;
	border: 2px solid ${(props) => (props.$isMobile ? 'var(--mobile-border)' : '#414868')};
	border-radius: 8px;
	padding: 1rem;
	background: ${(props) => (props.$isMobile ? 'var(--mobile-bg-primary)' : '#24283B')};
	text-align: center;
`;

export const StyledExhaustionOnlyTitle = styled.div<MobileStyledProps>`
	font-size: 0.9rem;
	font-weight: bold;
	color: #7dcfff;
	margin-bottom: 0.5rem;
	font-family: 'Inter', sans-serif;
`;

export const StyledDeathThresholdLabel = styled.div`
	font-size: 0.8rem;
	color: ${theme.colors.accent.primary};
	margin-bottom: 0.3rem;
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
