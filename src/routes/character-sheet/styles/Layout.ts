import styled from 'styled-components';

export const StyledContainer = styled.div`
	min-height: 100vh;
	background: #f5f3f0;
	padding: 1rem;
	font-family: 'Georgia', serif;
	color: #2d2d2d;

	@media (max-width: 768px) {
		padding: 0.5rem;
	}
`;

export const StyledBackButton = styled.button`
	position: fixed;
	top: 1rem;
	left: 1rem;
	padding: 0.5rem 1rem;
	border: 2px solid #8b4513;
	border-radius: 4px;
	background: #f5f3f0;
	color: #8b4513;
	cursor: pointer;
	font-weight: bold;
	z-index: 100;

	@media (max-width: 768px) {
		top: 0.5rem;
		left: 0.5rem;
		padding: 0.4rem 0.8rem;
		font-size: 0.9rem;
		z-index: 1001; /* Above mobile nav */
	}

	&:hover {
		background: #8b4513;
		color: #f5f3f0;
	}
`;

export const StyledCharacterSheet = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	background: #ffffff;
	border: 3px solid #8b4513;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	padding: 1.5rem;
	position: relative;

	/* Desktop/Mobile Layout Control */
	.desktop-only {
		display: block !important;

		@media (max-width: 768px) {
			display: none !important;
		}
	}

	.mobile-only {
		display: none !important;

		@media (max-width: 768px) {
			display: block !important;
		}

		> div {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}

	@media (max-width: 768px) {
		padding: 1rem;
		border-width: 2px;
		margin: 0;
		border-radius: 4px;
		overflow-x: hidden;
		width: 100%;
		box-sizing: border-box;
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:
			radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
			radial-gradient(circle at 80% 80%, rgba(139, 69, 19, 0.05) 0%, transparent 50%);
		pointer-events: none;
		border-radius: 5px;
	}
`;

export const StyledMainGrid = styled.div`
	display: grid;
	grid-template-columns: 300px 1fr 250px;
	gap: 1.5rem;
	height: auto;
	width: 100%;
`;

export const StyledLeftColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const StyledMiddleColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const StyledRightColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

// Mobile Navigation
export const StyledMobileNav = styled.div`
	display: flex;
	background: #8b4513;
	border-radius: 8px;
	margin-bottom: 1rem;
	overflow: hidden;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledMobileNavButton = styled.button<{ $isActive: boolean }>`
	flex: 1;
	padding: 0.75rem 0.25rem;
	border: none;
	background: ${(props) => (props.$isActive ? '#f5f3f0' : 'transparent')};
	color: ${(props) => (props.$isActive ? '#8b4513' : '#f5f3f0')};
	font-weight: bold;
	font-size: 0.7rem;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: ${(props) => (props.$isActive ? '#f5f3f0' : 'rgba(245, 243, 240, 0.1)')};
	}

	&:active {
		transform: translateY(1px);
	}
`;

// Action buttons (Revert/Copy)
export const StyledActionButtons = styled.div`
	position: absolute;
	top: 1rem;
	right: 1rem;
	display: flex;
	gap: 0.5rem;
	z-index: 1000;

	@media (max-width: 768px) {
		display: none;
	}
`;

export const StyledActionButton = styled.button<{ $variant?: 'danger' | 'primary' }>`
	padding: 8px 12px;
	font-size: 0.8rem;
	background-color: ${(props) => (props.$variant === 'danger' ? '#c53030' : '#8b4513')};
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	white-space: nowrap;
	font-weight: bold;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	transition: all 0.2s ease;

	&:hover {
		background-color: ${(props) => (props.$variant === 'danger' ? '#b32c2c' : '#7a3e11')};
		transform: translateY(-1px);
	}

	&:active {
		transform: translateY(0);
	}
`;
