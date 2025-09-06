import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const LanguagesSection = styled.div<MobileStyledProps>`
	margin-bottom: 1rem;
	border: 2px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 8px;
	padding: 1rem;
	background: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
`;

export const LanguageRow = styled.div<MobileStyledProps>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 4px;
	background: ${props => props.$isMobile ? 'rgb(50,50,50)' : '#f9f9f9'};
	margin-bottom: 0.3rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const LanguageName = styled.span<MobileStyledProps>`
	font-size: 0.9rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	flex: 1;
	margin-right: 1rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	min-width: 0;
`;

export const FluencyContainer = styled.div<MobileStyledProps>`
	display: flex;
	gap: 0.2rem;
	flex-shrink: 0;
`;

export const FluencyBox = styled.div<{ filled: boolean; $isMobile?: boolean }>`
	width: 15px;
	height: 15px;
	border: 1px solid ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	background: ${(props) => (props.filled ? (props.$isMobile ? '#f5d020' : '#8b4513') : (props.$isMobile ? 'rgb(42,42,42)' : 'white'))};
	border-radius: 2px;
`;

export const FluencyLabel = styled.span`
	font-size: 0.7rem;
	color: #8b4513;
	font-weight: bold;
	margin-right: 0.3rem;
`;

export const FluencyItem = styled.div`
	display: flex;
	align-items: center;
	gap: 0.2rem;
	flex-shrink: 0;
	min-width: fit-content;
`;

export const FluencyHeader = styled.div<MobileStyledProps>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	background: ${props => props.$isMobile ? 'rgb(60,60,60)' : '#f0f0f0'};
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 4px;
	margin-bottom: 0.3rem;
	font-weight: bold;
	font-size: 0.85rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
`;

export const LanguageNameHeader = styled.span<MobileStyledProps>`
	font-size: 0.85rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	font-weight: bold;
	flex: 1;
	margin-right: 1rem;
`;

export const FluencyHeaderContainer = styled.div<MobileStyledProps>`
	display: flex;
	gap: 0.2rem;
	flex-shrink: 0;
`;

export const FluencyHeaderLabel = styled.span<MobileStyledProps>`
	font-size: 0.75rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	font-weight: bold;
	text-align: center;
	min-width: 15px;
	cursor: help;
`;
