import React from 'react';
import StyledButton from './Button.styles';

export type DSButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	label?: React.ReactNode;
	size?: 'small' | 'medium' | 'large';
	variant?: 'default' | 'outline' | 'tab' | 'conversion';
	bg?: string;
	color?: string;
};

export const Button: React.FC<DSButtonProps> = ({
	label,
	children,
	size = 'medium',
	variant = 'default',
	bg,
	color,
	...rest
}) => {
	return (
		<StyledButton $size={size} $variant={variant} $bg={bg} $color={color} {...rest}>
			{label ?? children}
		</StyledButton>
	);
};

export default Button;
