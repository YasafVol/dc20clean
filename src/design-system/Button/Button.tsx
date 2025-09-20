import React from 'react';
import StyledButton from './Button.styles';

export type DSButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  bg?: string;
  color?: string;
};

export const Button: React.FC<DSButtonProps> = ({ label, children, size = 'medium', bg, color, ...rest }) => {
  return (
    <StyledButton $size={size} $bg={bg} $color={color} {...rest}>
      {label ?? children}
    </StyledButton>
  );
};

export default Button;
