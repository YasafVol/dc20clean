import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

// Compact horizontal row: title + status badge + threshold flow inline and
// are centered as a single cluster (wraps when the box is too narrow).
export const StyledDeathContainer = styled.div<MobileStyledProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	flex-wrap: wrap;
	border: 1px solid ${(props) => (props.$isMobile ? 'var(--mobile-border)' : '#414868')};
	border-radius: 6px;
	padding: 0.4rem 0.6rem;
	background: ${(props) => (props.$isMobile ? 'var(--mobile-bg-primary)' : '#24283B')};
	min-height: 36px;
`;

export const StyledDeathTitle = styled.div<MobileStyledProps>`
	font-size: 0.7rem;
	font-weight: bold;
	color: #7dcfff;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	font-family: 'Inter', sans-serif;
	white-space: nowrap;
	margin: 0;
`;

// Inline status badge (small chip rather than full-width block).
export const StyledHealthStatus = styled.span<{
	status: 'healthy' | 'bloodied' | 'well-bloodied' | 'deaths-door' | 'dead';
}>`
	display: inline-block;
	font-size: 0.7rem;
	font-weight: bold;
	margin: 0;
	padding: 0.15rem 0.5rem;
	border-radius: 4px;
	line-height: 1.2;
	color: ${(props) => {
		switch (props.status) {
			case 'healthy':
				return '#9ECE6A';
			case 'bloodied':
				return '#E0AF68';
			case 'well-bloodied':
				return '#FF9E64';
			case 'deaths-door':
				return '#F7768E';
			case 'dead':
				return '#c0caf5';
			default:
				return '#7DCFFF';
		}
	}};
	background: ${(props) => {
		switch (props.status) {
			case 'healthy':
				return 'rgba(158, 206, 106, 0.15)';
			case 'bloodied':
				return 'rgba(224, 175, 104, 0.15)';
			case 'well-bloodied':
				return 'rgba(255, 158, 100, 0.15)';
			case 'deaths-door':
				return 'rgba(247, 118, 142, 0.15)';
			case 'dead':
				return 'rgba(192, 202, 245, 0.15)';
			default:
				return 'transparent';
		}
	}};
`;

// Inline numeric threshold (e.g. "-4") shown next to its label on the same row.
export const StyledDeathThreshold = styled.span<MobileStyledProps>`
	display: inline-block;
	font-size: 1rem;
	font-weight: bold;
	color: #c0caf5;
	margin: 0;
`;

export const StyledDeathStepsContainer = styled.div<MobileStyledProps>`
	margin-top: 0.5rem;
`;

export const StyledDeathStepsTitle = styled.div<MobileStyledProps>`
	font-size: 0.8rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#ff6b6b' : '#dc2626')};
	margin-bottom: 0.3rem;
	font-family: 'Inter', sans-serif;
`;

export const StyledDeathStepsGrid = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: center;
	gap: 0.2rem;
	flex-wrap: wrap;
`;

export const StyledDeathStep = styled.div<{ filled: boolean; isDead: boolean }>`
	position: relative;
	width: 20px;
	height: 20px;
	border: 2px solid ${(props) => (props.isDead ? '#7f1d1d' : '#dc2626')};
	background: ${(props) => {
		if (props.isDead) return '#7f1d1d';
		return props.filled ? '#dc2626' : '#1A1B26';
	}};
	color: ${(props) => {
		if (props.isDead) return '#c0caf5';
		return props.filled ? '#c0caf5' : '#dc2626';
	}};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	font-weight: bold;
	cursor: pointer;
	border-radius: 3px;
	transition: all 0.2s ease;
	line-height: 1;
	text-align: center;
	user-select: none;
	font-family: 'Inter', sans-serif;
	padding-top: 1px;

	&:hover {
		background: ${(props) => {
			if (props.isDead) return '#991b1b';
			return props.filled ? '#b91c1c' : '#24283B';
		}};
		transform: scale(1.1);
	}

	${(props) =>
		props.isDead &&
		`
    &::after {
      content: '☠';
      font-size: 0.8rem;
    }
  `}
`;

export const StyledDeathStepTooltip = styled.div`
	position: absolute;
	bottom: 100%;
	left: 50%;
	transform: translateX(-50%);
	background: #333;
	color: white;
	padding: 0.3rem 0.5rem;
	border-radius: 4px;
	font-size: 0.7rem;
	white-space: nowrap;
	z-index: 1000;
	margin-bottom: 5px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	opacity: 0;
	visibility: hidden;
	transition:
		opacity 0.2s ease,
		visibility 0.2s ease;

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: 5px solid transparent;
		border-top-color: #333;
	}

	${StyledDeathStep}:hover & {
		opacity: 1;
		visibility: visible;
	}
`;

export const StyledHealthStatusTooltip = styled.div`
	position: relative;
	cursor: help;

	&::after {
		content: attr(data-tooltip);
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		background: #333;
		color: white;
		padding: 0.5rem;
		border-radius: 4px;
		font-size: 0.7rem;
		white-space: pre-line;
		z-index: 1000;
		margin-bottom: 5px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.2s ease,
			visibility 0.2s ease;
		max-width: 200px;
		text-align: left;
	}

	&:hover::after {
		opacity: 1;
		visibility: visible;
	}
`;
