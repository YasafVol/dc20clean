import styled from 'styled-components';

export const StyledMovementContainer = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	margin-bottom: 1rem;
`;

export const StyledMovementGrid = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	margin-bottom: 1rem;
`;

export const StyledMovementStat = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 4rem;
`;

export const StyledMovementLabel = styled.div`
	font-size: 0.8rem;
	font-weight: bold;
	color: #8b4513;
`;

export const StyledMovementValue = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: #8b4513;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
`;
