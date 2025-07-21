import styled from 'styled-components';

export const StyledAttributeSection = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: rgba(245, 243, 240, 0.5);
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
	border: 2px solid #8b4513;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: white;
	position: relative;
`;

export const StyledAttributeAbbr = styled.div`
	font-size: 0.7rem;
	font-weight: bold;
	text-transform: uppercase;
	color: #8b4513;
`;

export const StyledAttributeValue = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	color: #2d2d2d;
`;

export const StyledAttributeDetails = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StyledAttributeName = styled.div`
	font-size: 0.9rem;
	font-weight: bold;
	text-transform: uppercase;
	color: #8b4513;
`;

export const StyledSaveBonus = styled.div`
	font-size: 0.8rem;
	color: #666;
`;

// New components for refactored layout
export const AttributeSection = styled.div`
	margin-bottom: 1rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const AttributeHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.5rem;
`;

export const AttributeBox = styled.div`
	width: 60px;
	height: 60px;
	border: 2px solid #8b4513;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #f5f5dc;
	margin-right: 1rem;
`;

export const AttributeAbbreviation = styled.div`
	font-size: 0.8rem;
	font-weight: bold;
	color: #8b4513;
`;

export const AttributeValue = styled.div`
	font-size: 1.4rem;
	font-weight: bold;
	color: #8b4513;
`;

export const AttributeInfo = styled.div`
	flex: 1;
`;

export const AttributeName = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.2rem;
`;

export const AttributeSave = styled.div`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const SkillRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: #f9f9f9;
	margin-bottom: 0.3rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const SkillName = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const PrimeSection = styled.div`
	text-align: center;
	padding: 0.5rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	background: #f5f5dc;
	margin-bottom: 0.5rem;
`;

export const PrimeLabel = styled.div`
	color: #8b4513;
	font-weight: bold;
	font-size: 1rem;
`;

export const PrimeValue = styled.div`
	font-size: 1.4rem;
	font-weight: bold;
	color: #8b4513;
`;
