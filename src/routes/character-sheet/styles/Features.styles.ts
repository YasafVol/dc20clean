import styled from 'styled-components';

export const StyledFeaturesContainer = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	margin-bottom: 1rem;
	height: 762px;
	overflow-y: auto;
`;

export const StyledFeaturesTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	text-align: center;
	margin-bottom: 1rem;
	font-family: 'Inter', sans-serif;
`;

export const StyledFeatureCategory = styled.div`
	margin-bottom: 1rem;
`;

export const StyledFeatureCategoryTitle = styled.div`
	font-size: 0.9rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.5rem;
	padding-bottom: 0.3rem;
	border-bottom: 1px solid #8b4513;
	font-family: 'Inter', sans-serif;
`;

export const StyledFeatureGrid = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
`;

export const StyledFeatureItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: #f9f9f9;
`;

export const StyledFeatureName = styled.span`
	font-size: 0.85rem;
	color: #8b4513;
	font-weight: 500;
	flex: 1;
`;

export const StyledFeatureReadMore = styled.button`
	background: transparent;
	color: #8b4513;
	border: 1px solid #8b4513;
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
		background: #8b4513;
		color: white;
	}
`;

export const StyledNoFeaturesMessage = styled.div`
	text-align: center;
	font-style: italic;
	padding: 1rem;
	color: #666;
`;

export const StyledFeaturesContent = styled.div`
	font-size: 0.9rem;
	color: #8b4513;
`;
