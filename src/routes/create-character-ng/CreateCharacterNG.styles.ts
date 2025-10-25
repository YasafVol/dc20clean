import styled from 'styled-components';
import BlackBG from '../../assets/BlackBG.jpg';
import frameBackground2 from '../../assets/dc20-ng/framebackground2.png';

// Main page container with full screen background
export const StyledPageContainer = styled.div`
	height: 100vh;
	background: url(${BlackBG}) center center no-repeat;
	background-size: cover;
	background-attachment: fixed;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden; // Prevent page scroll
`;

// Sticky stepper header - transparent to show background
export const StyledStepperHeader = styled.div`
	position: sticky;
	top: 0;
	z-index: 10;
	padding: 1rem 0;
	display: flex;
	justify-content: center;
	width: 100%;
`;

// Container for the design system stepper
export const StyledStepperContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	max-width: 1100px;
`;

// Scrollable content area
export const StyledMainContent = styled.div`
	flex: 1;
	overflow: hidden; // No scroll here - frame will handle scrolling
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 2rem;

	@media (max-width: 768px) {
		padding: 1rem;
	}
`;

// Middle content frame with framebackground2.png
export const StyledContentFrame = styled.div`
	width: 100%;
	max-width: 1400px; /* widened to take more horizontal space on large screens */
	height: 640px; /* slightly taller to keep pleasing proportions */
	background: url(${frameBackground2}) center center no-repeat;
	/* use cover so the decorative edges expand horizontally while preserving aspect */
	background-size: cover;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 3rem;
	overflow: hidden; // Hide overflow, inner wrapper will scroll

	@media (max-width: 768px) {
		max-width: calc(100% - 20px);
		height: 400px;
		padding: 2rem 1rem;
		background-size: cover;
	}
`;

// Inner scrollable content wrapper
export const StyledScrollableWrapper = styled.div`
	width: 100%;
	/* use more of the widened frame so artwork is visible in wider screens */
	max-width: 1000px;
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	padding-right: 20px;

	// Custom scrollbar styling
	&::-webkit-scrollbar {
		width: 12px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background: var(--lavender);
		border: 2px solid var(--onyx);
		border-radius: 6px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: var(--lavender);
		opacity: 0.8;
	}

	// Firefox scrollbar styling
	scrollbar-width: thin;
	scrollbar-color: var(--lavender) transparent;
`;
