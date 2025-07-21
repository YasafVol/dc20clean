import styled from 'styled-components';

export const StyledAttributesSectionsContainer = styled.div`
	/* This is the container for all the remaining inline styled sections */
`;

export const StyledPrimeSection = styled.div`
	margin-bottom: 1rem;
`;

export const StyledPrimeBox = styled.div`
	text-align: center;
	padding: 0.5rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	background: #f5f5dc;
	margin-bottom: 0.5rem;
`;

export const StyledPrimeLabel = styled.div`
	color: #8b4513;
	font-weight: bold;
`;

export const StyledPrimeValue = styled.div`
	font-size: 1.4rem;
	font-weight: bold;
	color: #8b4513;
`;

export const StyledSkillRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: white;
	margin-bottom: 0.3rem;
`;

export const StyledSkillName = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const StyledAttributeSection = styled.div`
	margin-bottom: 1rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const StyledAttributeHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.5rem;
`;

export const StyledAttributeBox = styled.div`
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

export const StyledAttributeAbbr = styled.div`
	font-size: 0.8rem;
	font-weight: bold;
	color: #8b4513;
`;

export const StyledAttributeValue = styled.div`
	font-size: 1.4rem;
	font-weight: bold;
	color: #8b4513;
`;

export const StyledAttributeInfo = styled.div`
	flex: 1;
`;

export const StyledAttributeName = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.2rem;
`;

export const StyledAttributeSave = styled.div`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const StyledAttributeSkillRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: #f9f9f9;
	margin-bottom: 0.3rem;
`;

export const StyledKnowledgeTradesSection = styled.div`
	margin-bottom: 1rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const StyledSectionTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.5rem;
	text-align: center;
`;

export const StyledSectionSubtitle = styled.div`
	font-size: 0.8rem;
	color: #8b4513;
	margin-bottom: 0.5rem;
	text-align: center;
`;

export const StyledLanguageRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: #f9f9f9;
	margin-bottom: 0.3rem;
`;

export const StyledLanguageName = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const StyledFluencyControls = styled.div`
	display: flex;
	gap: 0.2rem;
`;

export const StyledFluencyBox = styled.div<{ active: boolean }>`
	width: 15px;
	height: 15px;
	border: 1px solid #8b4513;
	background: ${(props) => (props.active ? '#8b4513' : 'white')};
	border-radius: 2px;
`;

export const StyledFluencyLabel = styled.span`
	font-size: 0.8rem;
	color: #8b4513;
	margin-left: ${(props) => (props.children === 'FLUENT' ? '0.5rem' : '0')};
`;

export const StyledNoItemsMessage = styled.div`
	font-size: 0.9rem;
	color: #8b4513;
	text-align: center;
	font-style: italic;
	padding: 1rem;
`;
