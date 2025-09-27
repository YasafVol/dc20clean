import styled from 'styled-components';
import BlackBG from '/src/assets/BlackBG.jpg';
import frameBackground2 from '/src/assets/dc20-ng/framebackground2.png';

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
	border-radius: 8px;
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

// Container for the design system stepper - narrower than background as shown in Figma
export const StyledStepperContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	max-width: 1030px;
`;

// Scrollable content area
export const StyledMainContent = styled.div`
	flex: 1;
	overflow: hidden; // Remove scroll from main content - let individual components handle their own scrolling
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 2rem;

	@media (max-width: 768px) {
		padding: 1rem;
	}
`;

// Outer content frame - wider to extend beyond stepper as shown in Figma
export const StyledContentFrame = styled.div`
	width: 100%;
	max-width: 1400px; // Increased from 1100px to make background wider than stepper
	flex: 1;
	min-height: 0;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem; // Reduced padding for more content space
	
	@media (max-width: 768px) {
		max-width: calc(100% - 20px);
		padding: 1rem;
	}
`;

// Inner scrollable container with background image - matches Figma design
export const StyledScrollableContent = styled.div`
	width: 100%; // Full width to show dragon background
	flex: 1;
	min-height: 0;
	background: url(${frameBackground2}) center center no-repeat;
	background-size: cover; // Changed from contain to cover for better fill
	overflow: hidden; // Remove scrolling from background - inner wrapper will handle it
	padding: 2rem;
	border-radius: 12px; // Slightly larger radius to match Figma
	display: flex;
	flex-direction: column;
	align-items: center; // Center the content wrapper
	
	@media (max-width: 768px) {
		padding: 1rem;
		background-size: cover;
	}
`;

// Content wrapper for constraining width of CollapsibleSections
export const StyledContentWrapper = styled.div`
	width: calc(746px + 32px); // 746px content + 20px padding + 12px scrollbar
	max-width: calc(746px + 32px);
	flex: 1;
	min-height: 0;
	overflow-y: auto; // Scrolling happens here, next to the content
	display: flex;
	flex-direction: column;
	gap: 0;
	padding-right: 20px; // 20px space between content and scrollbar
	
	// Custom scrollbar styling to match design
	&::-webkit-scrollbar {
		width: 12px;
	}
	
	&::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.1); // Always visible track background
		border-radius: 6px;
	}
	
	&::-webkit-scrollbar-thumb {
		background: var(--color-scroll-thumb);
		border: 2px solid var(--color-scroll-border);
		border-radius: 6px;
	}
	
	&::-webkit-scrollbar-thumb:hover {
		background: var(--color-scroll-thumb);
		opacity: 0.8;
	}
	
	// Firefox scrollbar styling
	scrollbar-width: thin;
	scrollbar-color: var(--color-scroll-thumb) transparent;
	
	@media (max-width: 746px) {
		width: 100%;
		max-width: calc(100% - 2rem);
		padding-right: 16px;
	}
`;

// Inner content area to constrain CollapsibleSections to exactly 746px
export const StyledInnerContent = styled.div`
	width: 746px;
	max-width: 746px;
	display: flex;
	flex-direction: column;
	gap: 0;
`;

