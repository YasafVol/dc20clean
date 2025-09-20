import { css } from 'styled-components';

// Centralized brown action button styles (desktop brown: #8b4513)
export const brownButton = css`
  background: ${(props: any) => (props.$isMobile ? '#f5d020' : '#8b4513')};
  color: ${(props: any) => (props.$isMobile ? '#1a1a1a' : '#f5f3f0')};
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: bold;

  &:hover {
    background: ${(props: any) => (props.$isMobile ? '#d4b01c' : '#a0522d')};
  }

  /* High-specificity overrides to defeat MUI defaults when DSButton wraps MUI Button */
  && {
    background-color: ${(props: any) => (props.$isMobile ? '#f5d020' : '#8b4513')} !important;
    color: ${(props: any) => (props.$isMobile ? '#1a1a1a' : '#f5f3f0')} !important;
    border-color: ${(props: any) => (props.$isMobile ? 'transparent' : '#8b4513')} !important;
    box-shadow: none;
    min-width: auto;
  }
`;

export default brownButton;
