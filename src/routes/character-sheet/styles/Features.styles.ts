import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledFeaturesContainer = styled.div<MobileStyledProps>`
	border: 2px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 8px;
	padding: 1rem;
	background: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
	margin-bottom: 1rem;
	height: 762px;
	overflow-y: auto;
`;

export const StyledFeaturesTitle = styled.div<MobileStyledProps>`
	font-size: 1.1rem;
	font-weight: bold;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	text-align: center;
	margin-bottom: 1rem;
	font-family: 'Inter', sans-serif;
`;

export const StyledFeatureCategory = styled.div<MobileStyledProps>`
	margin-bottom: 1rem;
`;

export const StyledFeatureCategoryTitle = styled.div<MobileStyledProps>`
	font-size: 0.9rem;
	font-weight: bold;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	margin-bottom: 0.5rem;
	padding-bottom: 0.3rem;
	border-bottom: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	font-family: 'Inter', sans-serif;
`;

export const StyledFeatureGrid = styled.div<MobileStyledProps>`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
`;

export const StyledFeatureItem = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 4px;
	background: ${props => props.$isMobile ? 'rgb(50,50,50)' : '#f9f9f9'};
`;

export const StyledFeatureName = styled.span<MobileStyledProps>`
	font-size: 0.85rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	font-weight: 500;
	flex: 1;
`;

export const StyledFeatureReadMore = styled.button<MobileStyledProps>`
	background: transparent;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	border: 1px solid ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	border-radius: 50%;
	width: 20px;
	height: 20px;
	cursor: pointer;
	font-style: italic;
	font-size: 0.8rem;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;

	&:hover {
		background: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
		color: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
	}
`;

export const StyledNoFeaturesMessage = styled.div<MobileStyledProps>`
	text-align: center;
	font-style: italic;
	padding: 1rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#666'};
`;

export const StyledFeaturesContent = styled.div<MobileStyledProps>`
	font-size: 0.9rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
`;
