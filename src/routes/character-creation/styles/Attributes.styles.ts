import styled from 'styled-components';

export const StyledContainer = styled.div`
	border: 2px solid #8b5cf6;
	padding: 1.5rem;
	border-radius: 12px;
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
	margin-top: 2rem;
	box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
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
	margin-top: 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	letter-spacing: 1px;
	border-bottom: 2px solid #ef4444;
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
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1rem;
	margin-top: 1rem;
`;

export const StyledCard = styled.div`
	border: 2px solid #a855f7;
	padding: 1.5rem;
	border-radius: 10px;
	background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
	text-align: center;
	transition: all 0.3s ease;
	box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(168, 85, 247, 0.4);
		border-color: #fbbf24;
	}
`;

export const StyledCardTitle = styled.h3`
	margin: 0 0 0.5rem 0;
	color: #fbbf24;
	font-size: 1.4rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledControls = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	margin-top: 0.5rem;
`;

export const StyledButton = styled.button`
	width: 45px;
	height: 45px;
	border: 2px solid #dc2626;
	border-radius: 8px;
	background: linear-gradient(145deg, #991b1b 0%, #dc2626 100%);
	color: #fbbf24;
	cursor: pointer;
	font-size: 1.4rem;
	font-weight: bold;
	transition: all 0.2s ease;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);

	&:hover {
		background: linear-gradient(145deg, #dc2626 0%, #ef4444 100%);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(220, 38, 38, 0.5);
		border-color: #fbbf24;
	}

	&:active {
		transform: translateY(0);
	}

	&:disabled {
		opacity: 0.4;
		cursor: not-allowed;
		background: linear-gradient(145deg, #4b5563 0%, #6b7280 100%);
		border-color: #6b7280;
		transform: none;
		box-shadow: none;
	}
`;

export const StyledValue = styled.p`
	margin: 0;
	font-size: 1.5rem;
	font-weight: bold;
	min-width: 40px;
	color: #fbbf24;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
	padding: 0.5rem;
	border-radius: 6px;
	border: 1px solid #8b5cf6;
`;

export const StyledDescription = styled.p`
	color: #e5e7eb;
	font-size: 0.9rem;
	line-height: 1.4;
	margin: 0.5rem 0 1rem 0;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;
