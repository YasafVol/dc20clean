import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledMovementContainer = styled.div<MobileStyledProps>`
	border: 2px solid ${(props) => (props.$isMobile ? 'rgb(68, 68, 68)' : '#8b4513')};
	border-radius: 8px;
	padding: 1rem;
	background: ${(props) => (props.$isMobile ? 'rgb(42, 42, 42)' : 'white')};
	margin-bottom: 1rem;
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
	font-size: 0.8rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#8b4513')};
`;

export const StyledMovementValue = styled.div<MobileStyledProps>`
	font-size: 1.5rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#8b4513')};
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
`;
