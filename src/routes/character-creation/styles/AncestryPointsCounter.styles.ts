import styled from 'styled-components';

export const StyledContainer = styled.div`
	padding: 1rem;
	margin-bottom: 1rem;
	text-align: center;
`;

export const StyledTitle = styled.h2`
	margin: 0;
	color: #fbbf24;
	font-size: 1.8rem;
	font-weight: bold;
	letter-spacing: 1px;
	padding-bottom: 0.5rem;
	text-transform: uppercase;
`;

export const StyledDetails = styled.div`
	margin-top: 0.5rem;
	color: #d1d5db;
	font-size: 0.9rem;
	font-weight: normal;
`;

export const StyledPointsFrame = styled.div`
	border: 2px solid #fbbf24;
	border-radius: 12px;
	background: rgba(0, 0, 0, 0.3);
	padding: 1.2rem;
	margin: 1rem auto;
	max-width: 600px;
	box-shadow: 0 4px 12px rgba(251, 191, 36, 0.2);
`;

export const StyledPointsRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.8rem;
	color: #e5e7eb;
	font-size: 1rem;
	
	&:last-child {
		margin-bottom: 0;
		padding-top: 0.8rem;
		border-top: 1px solid #fbbf24;
		font-weight: bold;
		color: #fbbf24;
		font-size: 1.1rem;
	}
`;

export const StyledPointsLabel = styled.span`
	flex: 1;
	text-align: left;
`;

export const StyledPointsValue = styled.span<{ $highlight?: boolean }>`
	font-weight: bold;
	min-width: 40px;
	text-align: right;
	color: ${props => props.$highlight ? '#fbbf24' : 'inherit'};
`;
