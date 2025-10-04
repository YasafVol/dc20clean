import styled from 'styled-components';

export const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  user-select: none;
`;

export const StyledCheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--russet);
  flex-shrink: 0;
  margin-top: 2px;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const StyledCheckboxLabel = styled.label<{ $disabled?: boolean }>`
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  flex: 1;
`;

export const StyledTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const StyledMainText = styled.span`
  color: var(--russet);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
`;

export const StyledPipeSeparator = styled.span`
  color: var(--iron);
  font-size: 1rem;
  line-height: 1.4;
`;

export const StyledSubText = styled.span`
  color: var(--iron);
  font-size: 1rem;
  line-height: 1.4;
  font-weight: 400;
  flex: 1;
`;
