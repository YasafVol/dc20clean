import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

// Inline status badge (small chip rather than full-width block).
export const StyledHealthStatus = styled.span<{
	$status: 'healthy' | 'bloodied' | 'well-bloodied' | 'deaths-door' | 'dead';
}>`
	display: inline-block;
	font-size: 0.7rem;
	font-weight: bold;
	margin: 0;
	padding: 0.15rem 0.5rem;
	border-radius: 4px;
	line-height: 1.2;
	color: ${(props) => {
		switch (props.$status) {
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
		switch (props.$status) {
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

export const StyledInlineHealthStatus = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 0.65rem;
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
