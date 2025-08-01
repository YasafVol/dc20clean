import styled from 'styled-components';

export const StyledFeaturePopupOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

export const StyledFeaturePopupContent = styled.div`
	background: white;
	border: 3px solid #8b4513;
	border-radius: 12px;
	padding: 2rem;
	max-width: 600px;
	max-height: 80vh;
	overflow-y: auto;
	margin: 1rem;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

export const StyledFeaturePopupHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;
	border-bottom: 2px solid #8b4513;
	padding-bottom: 1rem;
`;

export const StyledFeaturePopupTitle = styled.h2`
	margin: 0;
	color: #8b4513;
	font-size: 1.5rem;
	font-weight: bold;
`;

export const StyledFeaturePopupClose = styled.button`
	background: #8b4513;
	color: white;
	border: none;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	cursor: pointer;
	font-size: 1.2rem;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: #654321;
	}
`;

export const StyledFeaturePopupDescription = styled.div`
	color: #333;
	line-height: 1.6;
	font-size: 1rem;
`;

export const StyledFeaturePopupSourceInfo = styled.div`
	margin-top: 1rem;
	padding-top: 1rem;
	border-top: 1px solid #e5e5e5;
	font-size: 0.9rem;
	color: #666;
	font-style: italic;
`;
