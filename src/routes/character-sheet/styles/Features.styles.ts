import styled from 'styled-components';

export const StyledFeaturesContainer = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	margin-bottom: 1rem;
	height: 512px;
	overflow-y: auto;
`;

export const StyledFeaturesTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	text-align: center;
	margin-bottom: 1rem;
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
	background: #8b4513;
	color: white;
	border: none;
	border-radius: 3px;
	padding: 0.2rem 0.5rem;
	font-size: 0.7rem;
	cursor: pointer;
	font-weight: bold;

	&:hover {
		background: #654321;
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
