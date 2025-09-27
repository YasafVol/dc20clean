import styled from 'styled-components';
import { colors } from '../styles/colors';

export const StyledButton = styled.button<{ $bg?: string; $color?: string; $size?: 'small' | 'medium' | 'large' }>`
  background: ${({ $bg }) => $bg ?? colors.actionButtonBg};
  color: ${({ $color }) => $color ?? colors.actionButtonText};
  border: 1px solid ${({ $bg }) => $bg ?? colors.actionButtonBg};
  border-radius: 6px;
  cursor: pointer;
  padding: ${({ $size }) => ($size === 'small' ? '6px 10px' : $size === 'large' ? '10px 16px' : '8px 12px')};
  font-size: ${({ $size }) => ($size === 'small' ? '13px' : $size === 'large' ? '16px' : '14px')};
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;

  &:hover {
    background: ${({ $color }) => $color ?? colors.actionButtonText};
    color: ${({ $bg }) => $bg ?? colors.actionButtonBg};
    border: 1px solid ${({ $color }) => $color ?? colors.actionButtonBg};
    box-sizing: border-box;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default StyledButton;
