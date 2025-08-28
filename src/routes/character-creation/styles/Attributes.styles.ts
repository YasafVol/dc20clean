import styled from 'styled-components';

export const StyledContainer = styled.div`
	border: none;
	padding: 1.5rem;
	border-radius: 12px;
	background: transparent;
	margin-top: 0;
	max-width: 1200px;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	@media (max-width: 900px) {
		max-width: 98vw;
		padding: 1rem;
	}
`;

export const StyledTitle = styled.h2`
	margin-top: -1rem;
	color: #fbbf24;
	font-size: 2.4rem;
	font-weight: bold;
	text-align: center;
	letter-spacing: 1px;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
`;

export const StyledPointsRemaining = styled.p`
	margin: 0.5rem 0;
	font-weight: bold;
	color: #ef4444;
	font-size: 1.2rem;
	text-align: center;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-top: 1rem;
`;

export const StyledCard = styled.div`
	border: 1px solid white;
	padding: 1.5rem;
	border-radius: 10px;
	background: transparent;
	text-align: center;
	transition: all 0s ease;
	flex: 1;
	min-width: 250px;
	max-width: 280px;
	height: auto;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	&:hover {
		border-color: #fbbf24;
	}
	
	@media (max-width: 900px) {
		min-width: 200px;
	}
`;

export const StyledCardTitle = styled.h3`
	margin: 0 0 0.5rem 0;
	color: #fbbf24;
	font-size: 1.4rem;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 1px;
`;

export const StyledControls = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	margin: 1rem auto;
	width: 80%;
`;

export const StyledButton = styled.button`
	width: 40px;
	height: 40px;
	border: 1px solid white;
	border-radius: 8px;
	background: transparent;
	color: #fbbf24;
	cursor: pointer;
	font-size: 1.4rem;
	font-weight: bold;
	transition: all 0s ease;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		border-color: #fbbf24;
	}

	&:disabled {
		opacity: 0.4;
		cursor: not-allowed;
		border-color: #6b7280;
	}
`;

export const StyledValue = styled.p`
	margin: 0;
	font-size: 2.2rem;
	font-weight: bold;
	min-width: 40px;
	color: #fbbf24;
	padding: 0.5rem;
	border-radius: 6px;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const StyledDescription = styled.p`
	color: #e5e7eb;
	font-size: 0.9rem;
	line-height: 1.4;
	margin: 0.5rem 0 1rem 0;
`;
