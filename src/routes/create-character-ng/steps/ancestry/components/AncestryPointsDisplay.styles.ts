import styled from 'styled-components';

export const StyledPointsContainer = styled.div<{ $isOverBudget: boolean }>`
	position: sticky;
	top: 0;
	z-index: 10;
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px 24px;
	background: ${({ $isOverBudget }) => ($isOverBudget ? 'var(--russet)' : 'var(--russet)')};
	border-radius: 4px;
	margin-bottom: 24px;
	width: fit-content;
`;

export const StyledPointsText = styled.span`
	font-family: 'Urbanist', sans-serif;
	font-weight: 600;
	font-size: 14px;
	color: var(--pearl);
	letter-spacing: 0.5px;
`;

export const StyledPointsValue = styled.span<{ $isOverBudget: boolean }>`
	font-family: 'Urbanist', sans-serif;
	font-weight: 700;
	font-size: 18px;
	color: ${({ $isOverBudget }) => ($isOverBudget ? 'var(--errorText)' : 'var(--pearl)')};
`;
