// Styled components for App component
import styled from 'styled-components';

export const StyledApp = styled.div`
	min-height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
`;

export const StyledHeader = styled.header`
	position: absolute;
	top: 1rem;
	right: 1rem;
	color: #fbbf24;
	font-size: 0.9rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	z-index: 10;
	display: flex;
	align-items: center;
	gap: 1rem;
`;

export const StyledBackButton = styled.button`
	padding: 0.5rem 1rem;
	border: 1px solid #fbbf24;
	border-radius: 6px;
	background: transparent;
	color: #fbbf24;
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.9rem;
	font-weight: bold;

	&:hover {
		background: #fbbf24;
		color: #1e1b4b;
	}
`;

export const StyledMain = styled.main`
	flex: 1;
	display: flex;
	flex-direction: column;
	min-height: 0;
`;

export const StyledFooter = styled.footer`
	padding: 0.5rem;
	text-align: center;
	color: #9ca3af;
	font-size: 0.8rem;
	font-family: 'Urbanist', 'Georgia', 'Times New Roman', serif;
	font-weight: 400;
	border-top: none;
	background: transparent;
`;

export const FixedAuthStatus = styled.div`
	position: fixed;
	top: 1rem;
	right: 1rem;
	z-index: 9999;
	padding: 0.5rem;
	background: rgba(26, 27, 38, 0.9);
	border-radius: 8px;
	border: 1px solid rgba(125, 207, 255, 0.2);
	backdrop-filter: blur(8px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;
