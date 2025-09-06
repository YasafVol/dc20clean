import styled from 'styled-components';

// Main container
export const MobileContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	background: #1a1a1a;
	color: white;
	width: 100vw;
	max-width: 100vw;
	overflow-x: hidden;
	box-sizing: border-box;
`;

// Header components
export const MobileHeader = styled.div`
	background: #2a2a2a;
	padding: 1rem;
	text-align: center;
	border-bottom: 2px solid #444;
`;

export const MobileCharacterName = styled.h1`
	margin: 0;
	font-size: 1.5rem;
	color: #f5d020;
`;

export const MobileCharacterInfo = styled.p`
	margin: 0.5rem 0 0 0;
	font-size: 1rem;
	color: #ccc;
`;

// Content area
export const MobileContent = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: 1rem;
	padding-bottom: 80px;
	max-height: calc(100vh - 120px);
`;

// Section components
export const MobileSection = styled.div`
	margin: 16px;
	background: #2a2a2a;
	border: 1px solid #f5d020;
	border-radius: 8px;
	padding: 12px;
`;

export const MobileSectionTitle = styled.h3`
	margin: 0 0 12px 0;
	color: #f5d020;
	font-size: 16px;
	font-weight: bold;
`;

// Item display components
export const MobileItemGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 8px;
`;

export const MobileItem = styled.div`
	position: relative;
	background: #333;
	border: 1px solid #555;
	border-radius: 4px;
	padding: 8px;
	cursor: pointer;
	
	&:hover {
		border-color: #f5d020;
	}
`;

export const MobileItemName = styled.div`
	font-weight: bold;
	color: #f5d020;
	margin-bottom: 4px;
`;

export const MobileItemDetails = styled.div`
	font-size: 12px;
	color: #ccc;
	
	div {
		margin-bottom: 2px;
	}
`;

// Resource components
export const MobileResourceGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 12px;
`;

export const MobileResourceItem = styled.div`
	background: #333;
	border: 1px solid #555;
	border-radius: 4px;
	padding: 8px;
	text-align: center;
`;

export const MobileResourceLabel = styled.div`
	font-size: 12px;
	color: #ccc;
	margin-bottom: 4px;
`;

export const MobileResourceValue = styled.div`
	font-size: 16px;
	font-weight: bold;
	color: #f5d020;
	margin-bottom: 8px;
`;

export const MobileResourceControls = styled.div`
	display: flex;
	justify-content: center;
	gap: 8px;
`;

export const MobileResourceButton = styled.button`
	background: #f5d020;
	color: #1a1a1a;
	border: none;
	border-radius: 4px;
	width: 24px;
	height: 24px;
	font-size: 14px;
	font-weight: bold;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	
	&:hover {
		background: #fff;
	}
`;

// Resource bars
export const MobileResourceBar = styled.div<{ $percentage: number }>`
	width: 100%;
	height: 20px;
	background: #333;
	border: 1px solid #555;
	border-radius: 10px;
	overflow: hidden;
	position: relative;
	margin: 4px 0;
	
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: ${props => props.$percentage}%;
		background: linear-gradient(90deg, #f5d020, #b8940a);
		transition: width 0.3s ease;
	}
`;

// Stat components
export const MobileStatGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
	gap: 8px;
`;

export const MobileStatBox = styled.div`
	background: #333;
	border: 1px solid #555;
	border-radius: 4px;
	padding: 8px;
	text-align: center;
	cursor: pointer;
	transition: all 0.2s ease;
	
	&:hover {
		border-color: #f5d020;
	}
`;

// Navigation components
export const MobileNavigation = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: #2a2a2a;
	border-top: 2px solid #444;
	padding: 0.5rem;
	z-index: 1000;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 0.5rem;
	max-width: 100%;
`;

export const MobileNavigationGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 0.5rem;
	max-width: 100%;
`;

export const MobileNavButton = styled.button<{ $active: boolean }>`
	background: ${props => props.$active ? '#f5d020' : 'transparent'};
	color: ${props => props.$active ? '#1a1a1a' : '#f5d020'};
	border: 2px solid #f5d020;
	border-radius: 8px;
	padding: 0.75rem 0.5rem;
	font-size: 0.8rem;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.2s ease;
	
	&:hover {
		background: ${props => props.$active ? '#f5d020' : 'rgba(245, 208, 32, 0.1)'};
	}
`;

// Legacy navigation components (keep for backwards compatibility)
export const MobileNavigationContainer = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: #2a2a2a;
	border-top: 2px solid #444;
	padding: 0.5rem;
	z-index: 1000;
`;

export const MobileNavigationButton = styled.button<{ $active: boolean }>`
	background: ${props => props.$active ? '#f5d020' : 'transparent'};
	color: ${props => props.$active ? '#1a1a1a' : '#f5d020'};
	border: 2px solid #f5d020;
	border-radius: 8px;
	padding: 0.75rem 0.5rem;
	font-size: 0.8rem;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.2s ease;
	
	&:hover {
		background: ${props => props.$active ? '#f5d020' : 'rgba(245, 208, 32, 0.1)'};
	}
`;

// Mobile Combat Theme Wrapper
export const MobileCombatWrapper = styled.div`
	/* Keep the same styling as skills tab - brown/tan boxes but fix text color */

	
	/* Mobile resource section - white buttons and text */
	& button[style*="background"]:not([style*="transparent"]) {
		background: #ffffff !important;
		color: #000000 !important;
		border: 1px solid #666 !important;
	}
	
	/* Resource labels and values white */
	& div[style*="STAMINA POINTS"],
	& div[style*="MANA POINTS"], 
	& div[style*="HIT POINTS"],
	& div[style*="TEMP HP"] {
		color: #ffffff !important;
	}
	
	/* Input fields should be readable */
	& input, & select, & textarea {
		color: #2a2a2a !important;
		background: rgba(255, 255, 255, 0.8) !important;
	}
`;// Form components
export const MobileInput = styled.input`
	width: 100%;
	padding: 8px;
	background: #333;
	border: 1px solid #555;
	border-radius: 4px;
	color: #f5d020;
	font-size: 14px;
	
	&:focus {
		outline: none;
		border-color: #f5d020;
	}
`;

// Attribute components
export const MobileAttributeGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 8px;
	margin-bottom: 16px;
`;

export const MobileAttributeItem = styled.div`
	background: #333;
	border: 1px solid #555;
	border-radius: 8px;
	padding: 12px;
	text-align: center;
`;

export const MobileAttributeLabel = styled.div`
	color: #f5d020;
	font-size: 12px;
	font-weight: bold;
	margin-bottom: 4px;
	text-transform: uppercase;
`;

export const MobileAttributeValue = styled.div`
	color: white;
	font-size: 16px;
	font-weight: bold;
`;

export const MobileSelect = styled.select`	width: 100%;
	padding: 4px;
	border: 1px solid #f5d020;
	border-radius: 4px;
	background: #2a2a2a;
	color: #f5d020;
	font-size: 14px;
	
	&:focus {
		outline: none;
		border-color: #fff;
	}
`;

// Button components
export const MobileAddButton = styled.button`
	background: #4a4a4a;
	color: #f5d020;
	border: 1px solid #f5d020;
	border-radius: 4px;
	padding: 4px 8px;
	font-size: 12px;
	cursor: pointer;
	
	&:hover {
		background: #f5d020;
		color: #1a1a1a;
	}
`;

export const MobileDeleteButton = styled.button`
	position: absolute;
	top: 4px;
	right: 4px;
	background: #dc3545;
	color: white;
	border: none;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	font-size: 12px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	
	&:hover {
		background: #c82333;
	}
`;

// Currency components
export const MobileCurrencyGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 8px;
`;

export const MobileCurrencyItem = styled.div`
	text-align: center;
`;

export const MobileCurrencyLabel = styled.div`
	font-size: 12px;
	color: #ccc;
	margin-bottom: 4px;
`;

export const MobileCurrencyInput = styled.input`
	width: 100%;
	padding: 4px;
	background: #333;
	border: 1px solid #555;
	border-radius: 4px;
	color: #f5d020;
	text-align: center;
	font-size: 14px;
	
	&:focus {
		outline: none;
		border-color: #f5d020;
	}
`;

// Exhaustion components
export const MobileExhaustionGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 4px;
`;

export const MobileExhaustionLevel = styled.div<{ $active: boolean }>`
	background: ${props => props.$active ? '#dc3545' : '#333'};
	color: ${props => props.$active ? 'white' : '#ccc'};
	border: 1px solid ${props => props.$active ? '#dc3545' : '#555'};
	border-radius: 4px;
	padding: 8px 4px;
	text-align: center;
	cursor: pointer;
	font-size: 12px;
	transition: all 0.2s ease;
	
	&:hover {
		border-color: #f5d020;
	}
`;

// Action points components
export const MobileActionPointsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 8px;
`;

export const MobileActionPoint = styled.div<{ $used: boolean }>`
	background: ${props => props.$used ? '#b8940a' : '#2a2a2a'};
	color: ${props => props.$used ? '#fff' : '#f5d020'};
	border: 1px solid #f5d020;
	border-radius: 4px;
	padding: 8px;
	text-align: center;
	cursor: pointer;
	transition: all 0.2s ease;
	
	&:hover {
		transform: scale(${props => props.$used ? 0.95 : 1.05});
	}
`;