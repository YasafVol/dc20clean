import styled from 'styled-components';

// Desktop-specific layout components
export const StyledDesktopWrapper = styled.div`
	padding: 2rem;
	background-color: rgba(255, 255, 255, 0.9);
	margin: 2rem;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const StyledDesktopHeader = styled.div<{ isDead?: boolean }>`
	text-align: center;
	margin-bottom: 2rem;
	border-bottom: 3px solid ${props => props.isDead ? '#8B0000' : '#8b4513'};
	padding-bottom: 1.5rem;
	background: ${props => props.isDead ? 
		'linear-gradient(45deg, rgba(139, 0, 0, 0.1), rgba(139, 0, 0, 0.05))' : 
		'transparent'
	};
	border-radius: ${props => props.isDead ? '8px 8px 0 0' : '0'};
	position: relative;
	
	${props => props.isDead && `
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: repeating-linear-gradient(
				45deg,
				transparent,
				transparent 10px,
				rgba(139, 0, 0, 0.05) 10px,
				rgba(139, 0, 0, 0.05) 20px
			);
			pointer-events: none;
			border-radius: 8px 8px 0 0;
		}
	`}
`;

export const StyledCharacterName = styled.h1<{ isDead?: boolean }>`
	margin: 0;
	color: ${props => props.isDead ? '#8B0000' : '#8b4513'};
	font-size: 2.5rem;
	font-family: 'Georgia', serif;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	
	${props => props.isDead && `
		filter: contrast(0.8);
		text-decoration: line-through;
		text-decoration-color: #8B0000;
		text-decoration-thickness: 3px;
	`}
`;

export const StyledDeathSkull = styled.span`
	font-size: 2rem;
	color: #8B0000;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	animation: pulse 2s infinite;
	
	@keyframes pulse {
		0% { opacity: 0.7; }
		50% { opacity: 1; }
		100% { opacity: 0.7; }
	}
`;

export const StyledCharacterSubtitle = styled.h2`
	margin: 0.5rem 0;
	color: #666;
	font-size: 1.3rem;
	font-weight: normal;
	font-family: 'Georgia', serif;
`;

// Character Stats Grid
export const StyledAttributesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 1rem;
	margin-bottom: 2rem;
`;

export const StyledAttributeCard = styled.div`
	text-align: center;
	padding: 1rem;
	background-color: #f5f5f5;
	border-radius: 8px;
	border: 2px solid #e0e0e0;
	transition: all 0.2s ease;

	&:hover {
		border-color: #8b4513;
		box-shadow: 0 2px 8px rgba(139, 69, 19, 0.2);
	}
`;

export const StyledAttributeLabel = styled.div`
	font-size: 0.8rem;
	color: #666;
	margin-bottom: 0.25rem;
	text-transform: uppercase;
	font-weight: bold;
	letter-spacing: 0.5px;
`;

export const StyledAttributeValue = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: #8b4513;
	font-family: 'Georgia', serif;
`;

// Section Components
export const StyledSection = styled.div`
	margin-bottom: 2rem;
`;

export const StyledSectionTitle = styled.h3`
	color: #8b4513;
	border-bottom: 2px solid #8b4513;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
	font-size: 1.4rem;
	font-family: 'Georgia', serif;
	font-weight: bold;
`;

// Resource Components
export const StyledResourceRow = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;
	padding: 1rem;
	background-color: #f9f9f9;
	border-radius: 6px;
	border: 1px solid #e0e0e0;
`;

export const StyledResourceLabel = styled.div`
	font-weight: bold;
	min-width: 120px;
	color: #8b4513;
	font-family: 'Georgia', serif;
`;

export const StyledResourceValue = styled.div`
	min-width: 100px;
	font-weight: bold;
	color: #333;
`;

export const StyledResourceBar = styled.div`
	flex: 1;
	height: 20px;
	background-color: #ddd;
	border-radius: 10px;
	overflow: hidden;
	border: 1px solid #ccc;
`;

export const StyledResourceFill = styled.div<{ fillPercent: number; color: string }>`
	height: 100%;
	background-color: ${props => props.color};
	width: ${props => props.fillPercent}%;
	transition: width 0.3s ease;
	border-radius: 9px;
`;

export const StyledResourceControls = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

export const StyledResourceButton = styled.button`
	width: 32px;
	height: 32px;
	border: 2px solid #8b4513;
	border-radius: 4px;
	background: #f5f3f0;
	color: #8b4513;
	cursor: pointer;
	font-weight: bold;
	font-size: 1.1rem;
	transition: all 0.2s ease;

	&:hover {
		background: #8b4513;
		color: #f5f3f0;
	}

	&:active {
		transform: scale(0.95);
	}
`;

export const StyledResourceInput = styled.input`
	width: 60px;
	text-align: center;
	padding: 0.5rem;
	border: 2px solid #ddd;
	border-radius: 4px;
	font-weight: bold;
	font-family: 'Georgia', serif;

	&:focus {
		border-color: #8b4513;
		outline: none;
	}
`;

// Features Grid
export const StyledFeaturesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 0.75rem;
`;

export const StyledFeatureCard = styled.div`
	padding: 0.75rem;
	background-color: #f9f9f9;
	border-radius: 6px;
	cursor: pointer;
	border: 2px solid #e0e0e0;
	transition: all 0.2s ease;

	&:hover {
		background-color: #f0f0f0;
		border-color: #8b4513;
		box-shadow: 0 2px 8px rgba(139, 69, 19, 0.2);
	}
`;

export const StyledFeatureName = styled.div`
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.25rem;
	font-family: 'Georgia', serif;
`;

export const StyledFeatureSource = styled.div`
	font-size: 0.9rem;
	color: #666;
	font-style: italic;
`;

// Currency Grid
export const StyledCurrencyGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 1rem;
`;

export const StyledCurrencyColumn = styled.div`
	text-align: center;
`;

export const StyledCurrencyLabel = styled.div`
	font-size: 0.9rem;
	margin-bottom: 0.5rem;
	color: #8b4513;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

export const StyledCurrencyInput = styled.input`
	width: 100%;
	text-align: center;
	padding: 0.75rem 0.5rem;
	border: 2px solid #ddd;
	border-radius: 4px;
	font-weight: bold;
	font-family: 'Georgia', serif;
	font-size: 1rem;

	&:focus {
		border-color: #8b4513;
		outline: none;
		box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.2);
	}
`;
