// Styled components for LoadCharacter component
import styled from 'styled-components';

export const StyledContainer = styled.div`
	padding: 2rem;
	min-height: 100vh;
	background: linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #312e81 100%);
`;

export const StyledTitle = styled.h1`
	margin-bottom: 2rem;
	color: #fbbf24;
	text-align: center;
	font-size: 2.2rem;
	font-weight: bold;
	text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
	letter-spacing: 2px;
`;

export const StyledCharacterGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 1.5rem;
	max-width: 1200px;
	margin: 0 auto;
`;

export const StyledCharacterCard = styled.div`
	border: 2px solid #8b5cf6;
	border-radius: 12px;
	padding: 1.5rem;
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
	box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
	transition: all 0.3s ease;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 40px rgba(139, 92, 246, 0.4);
		border-color: #fbbf24;
	}
`;

export const StyledCardActions = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-top: 1rem;
`;

export const StyledActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
	flex: 1;
	padding: 0.6rem 1rem;
	border: 2px solid ${(props) => (props.variant === 'primary' ? '#fbbf24' : '#8b5cf6')};
	border-radius: 6px;
	background: ${(props) => (props.variant === 'primary' ? '#fbbf24' : 'transparent')};
	color: ${(props) => (props.variant === 'primary' ? '#1e1b4b' : '#8b5cf6')};
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.9rem;
	font-weight: bold;

	&:hover {
		background: ${(props) => (props.variant === 'primary' ? '#f59e0b' : '#8b5cf6')};
		color: ${(props) => (props.variant === 'primary' ? '#1e1b4b' : 'white')};
		transform: translateY(-1px);
	}
`;

export const StyledCharacterName = styled.h2`
	margin: 0 0 1rem 0;
	color: #fbbf24;
	font-size: 1.5rem;
	font-weight: bold;
	text-align: center;
`;

export const StyledPlayerName = styled.p`
	margin: 0 0 1rem 0;
	color: #e5e7eb;
	font-size: 1rem;
	text-align: center;
	opacity: 0.8;
`;

export const StyledCharacterDetails = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
`;

export const StyledDetailItem = styled.div`
	text-align: center;
`;

export const StyledDetailLabel = styled.div`
	color: #a855f7;
	font-size: 0.8rem;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 1px;
`;

export const StyledDetailValue = styled.div`
	color: #e5e7eb;
	font-size: 1rem;
	font-weight: bold;
	margin-top: 0.25rem;
`;

export const StyledCompletedDate = styled.p`
	margin: 0;
	color: #6b7280;
	font-size: 0.875rem;
	text-align: center;
	font-style: italic;
`;

export const StyledEmptyState = styled.div`
	text-align: center;
	padding: 4rem 2rem;
	color: #6b7280;
`;

export const StyledEmptyTitle = styled.h2`
	color: #a855f7;
	font-size: 1.5rem;
	margin-bottom: 1rem;
`;

export const StyledEmptyText = styled.p`
	font-size: 1rem;
	line-height: 1.6;
`;

export const StyledBackButton = styled.button`
	padding: 0.75rem 1.5rem;
	margin-bottom: 2rem;
	border: none;
	border-radius: 8px;
	background: linear-gradient(145deg, #6b7280 0%, #4b5563 100%);
	color: white;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		background: linear-gradient(145deg, #4b5563 0%, #374151 100%);
		transform: translateY(-2px);
	}
`;
