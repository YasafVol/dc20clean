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

	/* Give breathing room at the bottom so the cards don't abut
		 the page edge on small viewports */
	padding-bottom: 3rem;
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
	/* Keep the cards on one line; allow horizontal scroll on narrow viewports */
	flex-wrap: nowrap;
	gap: 1rem;
	margin-top: 1rem;
	justify-content: space-between;
	overflow-x: auto;
	align-items: flex-start; /* align to top to accommodate validation messages */
`;

export const StyledCardContainer = styled.div`
	/* Container for card + validation message */
	flex: 0 0 23%;
	min-width: 240px;
	max-width: 28%;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (max-width: 900px) {
		min-width: 180px;
	}
`;

export const StyledCard = styled.div`
	border: 1px solid white;
	padding: 1rem; /* removed extra bottom padding */
	border-radius: 10px;
	background: transparent;
	text-align: center;
	transition: all 0s ease;
	width: 100%; /* take full width of container */
	height: 220px; /* much shorter height like in mockup */
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between; /* distribute content evenly */
	align-items: center;
	overflow: hidden;

	&:hover {
		border-color: #fbbf24;
	}

	@media (max-width: 900px) {
		height: 200px;
		padding: 0.8rem;
	}
`;

export const StyledCardTitle = styled.h3`
	margin: 0;
	color: #fbbf24;
	font-size: 1.3rem; /* slightly smaller to fit better */
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 1px;
	text-align: center;
`;

export const StyledControls = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem; /* tighter gap */
	margin: 0.5rem auto 0 auto; /* tighter margins */
	width: 100%;
`;

export const StyledButton = styled.button`
	width: 36px; /* slightly smaller */
	height: 32px; /* slightly smaller */
	border: 1px solid white;
	border-radius: 8px;
	background: transparent;
	color: #fbbf24;
	cursor: pointer;
	font-size: 1.3rem; /* slightly smaller font */
	font-weight: bold;
	line-height: 1;
	padding: 0;
	margin: 0;
	transition: all 0s ease;
	display: flex;
	align-items: center;
	justify-content: center;

	/* Fine-tune vertical alignment for + and - symbols */
	padding-top: 0;
	/* 4px bottom padding ensures + and - symbols are visually centered in the button */
	padding-bottom: 4px;

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
	font-size: 2rem; /* slightly smaller */
	font-weight: bold;
	min-width: 36px; /* slightly smaller */
	color: #fbbf24;
	padding: 0.3rem; /* tighter padding */
	border-radius: 6px;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const StyledDescription = styled.p`
	color: #e5e7eb;
	font-size: 0.85rem; /* slightly smaller */
	line-height: 1.3; /* tighter line height */
	margin: 0;
	text-align: center;
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 0.5rem; /* slight horizontal padding */
`;
