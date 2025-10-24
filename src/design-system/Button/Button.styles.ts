import styled from 'styled-components';

const getVariantStyles = (
	$variant?: 'default' | 'outline' | 'tab' | 'conversion',
	$bg?: string,
	$color?: string
) => {
	if ($variant === 'outline') {
		return `
			background: transparent;
			color: ${$color ?? 'var(--iron)'};
			border: 2px solid var(--iron);
			&:hover {
				background: ${$bg ?? 'var(--copper)'};
				color: ${$color ?? 'var(--mist)'};
				border: 2px solid ${$bg ?? 'var(--copper)'};
			}
		`;
	}
	if ($variant === 'tab') {
		return `
			background: var(--russet);
			color: var(--pearl-text);
			border: 2px solid var(--russet);
			&:hover {
				background: var(--russet);
				color: var(--pearl-text);
				opacity: 0.9;
			}
		`;
	}
	if ($variant === 'conversion') {
		return `
			background: var(--cornflower-blue);
			color: var(--pearl-text);
			border: 2px solid var(--cornflower-blue);
			&:hover {
				background: var(--cornflower-blue);
				color: var(--pearl-text);
				opacity: 0.9;
			}
		`;
	}
	// default variant
	return `
		background: ${$bg ?? 'var(--copper)'};
		color: ${$color ?? 'var(--mist)'};
		border: 1px solid ${$bg ?? 'var(--copper)'};
		&:hover {
			background: ${$color ?? 'var(--mist)'};
			color: ${$bg ?? 'var(--copper)'};
			border: 1px solid ${$color ?? $bg ?? 'var(--copper)'};
		}
	`;
};

export const StyledButton = styled.button<{
	$bg?: string;
	$color?: string;
	$size?: 'small' | 'medium' | 'large';
	$variant?: 'default' | 'outline' | 'tab' | 'conversion';
}>`
	${({ $variant, $bg, $color }) => getVariantStyles($variant, $bg, $color)}
	border-radius: 6px;
	cursor: pointer;
	padding: ${({ $size }) =>
		$size === 'small' ? '4px 8px' : $size === 'large' ? '10px 16px' : '8px 12px'};
	font-size: ${({ $size }) => ($size === 'small' ? '12px' : $size === 'large' ? '16px' : '14px')};
	height: ${({ $size }) => ($size === 'small' ? '22px' : 'auto')};
	display: inline-flex;
	align-items: center;
	box-sizing: border-box;
	justify-content: center;
	transition: all 0.2s ease;

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;

export default StyledButton;
