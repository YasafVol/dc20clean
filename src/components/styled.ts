import styled from 'styled-components';
// Import static assets
import mainBgImage from '/Main.png';

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 2rem;
	background: url('${mainBgImage}') center/cover no-repeat;
`;

export const StyledTitle = styled.h1`
	margin-bottom: 0.2rem;
	color: #fbbf24;
	text-align: center;
	font-size: 3rem;
	font-weight: bold;
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
	letter-spacing: 2px;
	margin-top: 16rem;
`;

export const StyledSubtitle = styled.p`
	margin-top: 0rem;
	margin-bottom: 2rem;
	color: #e5e7eb;
	text-align: center;
	font-size: 1.3rem;
	font-family: 'Urbanist', 'Georgia', 'Times New Roman', serif;
	font-weight: 400;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	max-width: 600px;
	line-height: 1.6;
`;

export const StyledMenuGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	gap: 1.5rem;
	max-width: 900px;
	width: 100%;
`;

export const StyledMenuCard = styled.button`
	border: 1px solid #ffffff;
	padding: 1.5rem 2rem;
	border-radius: 8px;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	text-align: left;
	box-shadow: none;
	backdrop-filter: none;
	height: 120px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	&:hover {
		border-color: #fbbf24;
	}
`;

export const StyledIcon = styled.div`
	font-size: 3rem;
	background: transparent;
	border-radius: 0;
	width: auto;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
	box-shadow: none;
	transition: all 0.3s ease;
	color: #e5e7eb;
	font-weight: 300;

	${StyledMenuCard}:hover & {
		color: #fbbf24;
		transform: scale(1.1);
	}
`;

export const StyledCardTitle = styled.h2`
	margin: 0 0 0.3rem 0;
	color: #fbbf24;
	font-size: 1.6rem;
	font-weight: bold;
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	transition: all 0.3s ease;
	text-align: left;
	letter-spacing: 1px;

	${StyledMenuCard}:hover & {
		color: #f59e0b;
	}
`;

export const StyledCardDescription = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 1.1rem;
	font-family: 'Urbanist', 'Georgia', 'Times New Roman', serif;
	font-weight: 400;
	line-height: 1.3;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	opacity: 0.9;
	text-align: left;
	letter-spacing: 1px;
`;

export const StyledTextContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	flex: 1;
`;