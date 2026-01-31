import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledAttributeSection = styled.div<MobileStyledProps>`
	border: 2px solid ${(props) => (props.$isMobile ? 'rgb(68,68,68)' : '#414868')};
	border-radius: 8px;
	padding: 1rem;
	background: ${(props) => (props.$isMobile ? 'rgb(42,42,42)' : '#24283B')};
`;

export const StyledAttributeItem = styled.div`
	display: grid;
	grid-template-columns: 60px 1fr;
	gap: 0.5rem;
	margin-bottom: 1rem;
	align-items: center;
`;

export const StyledAttributeBox = styled.div`
	width: 50px;
	height: 50px;
	border: 2px solid #414868;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #1a1b26;
	position: relative;
`;

export const StyledAttributeAbbr = styled.div`
	font-size: 0.7rem;
	font-weight: bold;
	text-transform: uppercase;
	color: #7dcfff;
`;

export const StyledAttributeValue = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	color: #c0caf5;
`;

export const StyledAttributeDetails = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StyledAttributeName = styled.div`
	font-size: 0.9rem;
	font-weight: bold;
	text-transform: uppercase;
	color: #7dcfff;
`;

export const StyledSaveBonus = styled.div`
	font-size: 0.8rem;
	color: #9aa5ce;
`;

// New components for refactored layout
export const AttributeSection = styled.div<MobileStyledProps>`
	margin-bottom: 1rem;
	border: 2px solid ${(props) => (props.$isMobile ? 'rgb(68,68,68)' : '#414868')};
	border-radius: 8px;
	padding: 1rem;
	background: ${(props) => (props.$isMobile ? 'rgb(42,42,42)' : '#24283B')};
`;

export const AttributeHeader = styled.div<MobileStyledProps>`
	display: flex;
	align-items: center;
	margin-bottom: 0.5rem;
`;

export const AttributeBox = styled.div<MobileStyledProps>`
	width: 60px;
	height: 60px;
	border: 2px solid ${(props) => (props.$isMobile ? 'rgb(68,68,68)' : '#414868')};
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: ${(props) => (props.$isMobile ? 'rgb(60,60,60)' : '#1A1B26')};
	margin-right: 1rem;
`;

export const AttributeAbbreviation = styled.div<MobileStyledProps>`
	font-size: 0.8rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#7DCFFF')};
`;

export const AttributeValue = styled.div<MobileStyledProps>`
	font-size: 1.4rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#c0caf5')};
`;

export const AttributeInfo = styled.div<MobileStyledProps>`
	flex: 1;
`;

export const AttributeName = styled.div<MobileStyledProps>`
	font-size: 1.1rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#7DCFFF')};
	margin-bottom: 0.2rem;
`;

export const AttributeSave = styled.div<MobileStyledProps>`
	font-size: 0.9rem;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#9aa5ce')};
`;

export const SkillRow = styled.div<MobileStyledProps>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	border: 1px solid ${(props) => (props.$isMobile ? 'rgb(68,68,68)' : '#414868')};
	border-radius: 4px;
	background: ${(props) => (props.$isMobile ? 'rgb(50,50,50)' : '#1A1B26')};
	margin-bottom: 0.3rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const SkillName = styled.span<MobileStyledProps>`
	font-size: 0.9rem;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#c0caf5')};
	font-weight: 500;
`;

export const SkillBonusContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

interface SkillBonusProps extends MobileStyledProps {
	$isPositive: boolean;
}

export const SkillBonus = styled.span<SkillBonusProps>`
	font-size: 0.875rem;
	font-weight: 600;
	color: ${(props) => {
		if (props.$isPositive) {
			return props.$isMobile ? '#22c55e' : '#059669'; // Green-500 for mobile, darker green for desktop
		} else {
			return props.$isMobile ? '#ef4444' : '#dc2626'; // Red-500 for mobile, darker red for desktop
		}
	}};
	min-width: 2rem;
	text-align: center;
`;

export const PrimeSection = styled.div<MobileStyledProps>`
	text-align: center;
	padding: 0.5rem;
	border: 2px solid ${(props) => (props.$isMobile ? 'rgb(68,68,68)' : '#414868')};
	border-radius: 8px;
	background: ${(props) => (props.$isMobile ? 'rgb(60,60,60)' : '#24283B')};
	margin-bottom: 0.5rem;
`;

export const PrimeLabel = styled.div<MobileStyledProps>`
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#7DCFFF')};
	font-weight: bold;
	font-size: 1rem;
`;

export const PrimeValue = styled.div<MobileStyledProps>`
	text-transform: capitalize;
	font-size: 1.4rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#c0caf5')};
`;
