import styled from 'styled-components';

export const StyledButton = styled.button<{ $bg?: string; $color?: string; $size?: 'small' | 'medium' | 'large' }>`
  background: ${({ $bg }) => $bg ?? 'var(--copper)'};
  color: ${({ $color }) => $color ?? 'var(--mist)'};
  border: 1px solid ${({ $bg }) => $bg ?? 'var(--copper)'};
  border-radius: 6px;
  cursor: pointer;
  padding: ${({ $size }) => ($size === 'small' ? '6px 10px' : $size === 'large' ? '10px 16px' : '8px 12px')};
  font-size: ${({ $size }) => ($size === 'small' ? '13px' : $size === 'large' ? '16px' : '14px')};
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;

  &:hover {
    background: ${({ $color }) => $color ?? 'var(--mist)'};
    color: ${({ $bg }) => $bg ?? 'var(--copper)'};
    border: 1px solid ${({ $color }) => $color ?? 'var(--copper)'};
    box-sizing: border-box;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default StyledButton;
