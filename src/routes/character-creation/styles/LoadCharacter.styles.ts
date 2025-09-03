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
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
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
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0.5rem;
	margin-top: 1rem;
`;

export const StyledActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
	flex: 1;
	padding: 0.6rem 1rem;
	border: 2px solid
		${(props) => {
			if (props.variant === 'primary') return '#fbbf24';
			if (props.variant === 'danger') return '#ef4444';
			return '#8b5cf6';
		}};
	border-radius: 6px;
	background: ${(props) => {
		if (props.variant === 'primary') return '#fbbf24';
		if (props.variant === 'danger') return 'transparent';
		return 'transparent';
	}};
	color: ${(props) => {
		if (props.variant === 'primary') return '#1e1b4b';
		if (props.variant === 'danger') return '#ef4444';
		return '#8b5cf6';
	}};
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.9rem;
	font-weight: bold;
	outline: none; /* Remove default focus outline */

	&:hover {
		background: ${(props) => {
			if (props.variant === 'primary') return '#f59e0b';
			if (props.variant === 'danger') return '#ef4444';
			return '#8b5cf6';
		}};
		color: ${(props) => {
			if (props.variant === 'primary') return '#1e1b4b';
			if (props.variant === 'danger') return 'white';
			return 'white';
		}};
		transform: translateY(-1px);
	}

	&:focus {
		outline: none;
		box-shadow: 0 0 0 2px
			${(props) => {
				if (props.variant === 'primary') return '#fbbf24';
				if (props.variant === 'danger') return '#ef4444';
				return '#8b5cf6';
			}};
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

// Modal styles for delete confirmation
export const StyledModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

export const StyledModalContent = styled.div`
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
	border: 2px solid #ef4444;
	border-radius: 12px;
	padding: 2rem;
	max-width: 400px;
	width: 90%;
	text-align: center;
	box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3);
`;

export const StyledModalTitle = styled.h3`
	color: #ef4444;
	font-size: 1.5rem;
	margin-bottom: 1rem;
	font-weight: bold;
`;

export const StyledModalMessage = styled.p`
	color: #e5e7eb;
	font-size: 1rem;
	margin-bottom: 2rem;
	line-height: 1.5;
`;

export const StyledModalActions = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: center;
`;

export const StyledModalButton = styled.button<{ variant: 'cancel' | 'delete' }>`
	padding: 0.75rem 1.5rem;
	border: 2px solid ${(props) => (props.variant === 'delete' ? '#ef4444' : '#6b7280')};
	border-radius: 6px;
	background: ${(props) => (props.variant === 'delete' ? '#ef4444' : 'transparent')};
	color: ${(props) => (props.variant === 'delete' ? 'white' : '#6b7280')};
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.9rem;
	font-weight: bold;

	&:hover {
		background: ${(props) => (props.variant === 'delete' ? '#dc2626' : '#6b7280')};
		color: white;
		transform: translateY(-1px);
	}
`;
