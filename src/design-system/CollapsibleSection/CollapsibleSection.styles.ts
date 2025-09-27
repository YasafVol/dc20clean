import styled from 'styled-components';
import { colors } from '../styles/colors';

export const SectionWrapper = styled.div<{ $selected?: boolean }>`
  border: 1px solid ${colors.sectionBorder};
  border-radius: 8px;
  overflow: hidden;
  background: transparent; // Made transparent as requested
  margin-bottom: 0.5rem;
  
  ${({ $selected }) =>
    $selected &&
    `
    border-color: ${colors.primary};
    box-shadow: 0 0 0 1px ${colors.primary};
  `}
`;

export const Header = styled.button<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;

  &:focus {
    outline: 2px solid rgba(0,0,0,0.08);
  }
`;

export const Title = styled.span<{ $selected?: boolean; $expanded?: boolean }>`
  font-weight: 600;
  /* When collapsed, use titleDefault (#1E1E1E). When expanded, use titleSelected (#823434) */
  color: ${({ $expanded }) => ($expanded ? colors.titleSelected : colors.titleDefault)};
  font-size: 16px;
`;

export const ToggleIcon = styled.span`
  margin-left: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.titleDefault};
`;

export const Content = styled.div<{ $expanded: boolean }>`
  padding: ${({ $expanded }) => ($expanded ? '12px 18px' : '0 18px')};
  max-height: ${({ $expanded }) => ($expanded ? '100vh' : '0')};
  overflow: hidden;
  transition: max-height 240ms ease, padding 180ms ease;
`;
