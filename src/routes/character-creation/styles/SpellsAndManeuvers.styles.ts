// Styled components for SpellsAndManeuvers component
import styled from 'styled-components';

export const StyledContainer = styled.div`
	padding: 2rem;
	min-height: 100vh;
	background: transparent;
`;

export const StyledTitle = styled.h1`
	margin-bottom: 2rem;
	color: #fbbf24;
	text-align: center;
	font-size: 2.4rem;
	font-weight: bold;
	letter-spacing: 1px;
`;

export const StyledSection = styled.div`
	margin-bottom: 2rem;
`;

export const StyledSectionTitle = styled.h2`
	color: #fbbf24;
	font-size: 1.5rem;
	margin-bottom: 1rem;
	text-align: center;
`;

export const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 1.5rem;
	margin-top: 1rem;
`;

export const StyledCard = styled.div<{ $selected: boolean }>`
	border: 1px solid ${props => props.$selected ? '#fbbf24' : 'white'};
	border-radius: 12px;
	padding: 1.5rem;
	background: transparent;
	transition: all 0.3s ease;
	opacity: ${props => props.$selected ? 1 : 0.8};

	&:hover {
		border-color: #fbbf24;
		opacity: 1;
	}
`;

export const StyledCardHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 1rem;
	flex-wrap: wrap;
	gap: 0.5rem;
`;

export const StyledCardTitle = styled.h3`
	color: #fbbf24;
	font-size: 1.2rem;
	font-weight: bold;
	margin: 0;
	flex: 1;
`;

export const StyledCardType = styled.span`
	color: white;
	font-size: 0.8rem;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 1px;
	padding: 0.25rem 0.5rem;
	background: transparent;
	border: 1px solid white;
	border-radius: 4px;
`;

export const StyledCardCost = styled.span`
	color: white;
	font-size: 0.9rem;
	font-weight: bold;
	padding: 0.25rem 0.5rem;
	background: transparent;
	border: 1px solid white;
	border-radius: 4px;
`;

export const StyledCardDescription = styled.p`
	color: #e5e7eb;
	font-size: 0.9rem;
	line-height: 1.5;
	margin-bottom: 1rem;
`;

export const StyledCardActions = styled.div`
	display: flex;
	justify-content: flex-end;
`;

export const StyledButton = styled.button<{ $variant: 'primary' | 'danger' }>`
	padding: 0.5rem 1rem;
	border: 1px solid white;
	border-radius: 6px;
	background: transparent;
	color: white;
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.8rem;
	font-weight: bold;

	&:hover:not(:disabled) {
		border-color: ${props => props.$variant === 'primary' ? '#fbbf24' : '#ef4444'};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const StyledTabContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 2rem;
	gap: 1rem;
`;

export const StyledTabButton = styled.button<{ $active: boolean }>`
	padding: 0.75rem 1.5rem;
	border: 1px solid ${props => props.$active ? '#fbbf24' : 'white'};
	border-radius: 8px;
	background: ${props => props.$active ? 'linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%)' : 'transparent'};
	color: ${props => props.$active ? '#1e1b4b' : 'white'};
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 1rem;
	font-weight: bold;

	&:hover {
		background: ${props => props.$active 
			? 'linear-gradient(145deg, #f59e0b 0%, #d97706 100%)' 
			: 'rgba(251, 191, 36, 0.1)'};
		border-color: ${props => props.$active ? '#f59e0b' : '#fbbf24'};
	}
`;

export const StyledEmptyState = styled.div`
	text-align: center;
	padding: 4rem 2rem;
	color: #6b7280;
`;

export const StyledEmptyTitle = styled.h3`
	color: #fbbf24;
	font-size: 1.5rem;
	margin-bottom: 1rem;
`;

export const StyledEmptyText = styled.p`
	font-size: 1rem;
	line-height: 1.6;
`;

export const StyledSelectedCount = styled.div`
	text-align: center;
	color: white;
	font-size: 1rem;
	font-weight: bold;
	margin-bottom: 1rem;
	padding: 0.5rem;
	background: transparent;
	border-radius: 8px;
	border: 1px solid white;
`;

export const StyledFilterContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-bottom: 1.5rem;
`;

export const StyledFilterButton = styled.button<{ $active: boolean }>`
	padding: 0.5rem 1rem;
	border: 1px solid ${props => props.$active ? '#fbbf24' : 'white'};
	border-radius: 6px;
	background: ${props => props.$active ? 'linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%)' : 'transparent'};
	color: ${props => props.$active ? '#1e1b4b' : 'white'};
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.8rem;
	font-weight: bold;

	&:hover {
		border-color: #fbbf24;
	}
`; 