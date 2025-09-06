import styled from 'styled-components';

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
	border: 2px solid ${(props) => (props.$isMobile ? 'rgb(68, 68, 68)' : '#8b4513')};
	border-radius: 8px;
	padding: 1rem;
	background: ${(props) => (props.$isMobile ? 'rgb(42, 42, 42)' : 'white')};
	text-align: center;
`;

export const StyledExhaustionOnlyTitle = styled.div<MobileStyledProps>`
	font-size: 0.9rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#8b4513')};
	margin-bottom: 0.5rem;
	font-family: 'Inter', sans-serif;
`;
