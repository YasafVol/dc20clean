import styled from 'styled-components';

export const StyledPointsContainer = styled.div<{ $isOverBudget: boolean }>`
	position: sticky;
	top: 0;
	z-index: 10;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px 24px;
	background: ${(props) => (props.$isOverBudget ? 'var(--russet)' : 'var(--darkBrown)')};
	border-radius: 8px;
	margin-bottom: 32px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

export const StyledPointsText = styled.span`
	font-family: 'Urbanist', sans-serif;
	font-weight: 600;
	font-size: 16px;
	color: var(--pearl);
	letter-spacing: 0.5px;
`;

export const StyledPointsValue = styled.span<{ $isOverBudget: boolean; $isComplete: boolean }>`
	font-family: 'Urbanist', sans-serif;
	font-weight: 700;
	font-size: 24px;
	color: ${(props) => {
		if (props.$isOverBudget) return 'var(--errorText)';
		if (props.$isComplete) return 'var(--emerald)';
		return 'var(--russet)';
	}};
`;
