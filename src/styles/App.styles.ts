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
	border: 2px solid #fbbf24;
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
		transform: translateY(-2px);
	}
`;

export const StyledMain = styled.main`
	flex: 1;
`;

export const StyledFooter = styled.footer`
	padding: 1rem;
	text-align: center;
	color: #9ca3af;
	font-size: 0.8rem;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	border-top: 1px solid rgba(139, 92, 246, 0.3);
	background: rgba(30, 27, 75, 0.5);
`;
