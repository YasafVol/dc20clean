import styled from 'styled-components';

export const StyledOuterContainer = styled.div`
  border: 2px solid #8b5cf6;
  padding: 1.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  margin-top: 2rem;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
`;

export const StyledMainTitle = styled.h2`
  margin-top: 0;
  color: #fbbf24;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  border-bottom: 2px solid #ef4444;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StyledAncestryDetails = styled.div`
  border: 2px solid #a855f7;
  padding: 1.5rem;
  border-radius: 10px;
  background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);
`;

export const StyledTitle = styled.h2`
  margin: 0 0 1rem 0;
  color: #fbbf24;
  font-size: 1.3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
  border-bottom: 2px solid #ef4444;
  padding-bottom: 0.5rem;
`;

export const StyledSubtitle = styled.h3`
  margin: 1rem 0 0.5rem 0;
  color: #ef4444;
  font-size: 1.3rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #ef4444;
  padding-bottom: 0.25rem;
`;

export const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const StyledListItem = styled.li`
  margin-bottom: 0.8rem;
  padding: 0.5rem;
  border-radius: 5px;
  background: rgba(139, 92, 246, 0.1);
  border-left: 3px solid #8b5cf6;
`;

export const StyledLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  cursor: pointer;
  color: #e5e7eb;
  font-size: 0.95rem;
  line-height: 1.4;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  
  &:hover {
    color: #fbbf24;
  }
`;

export const StyledCheckbox = styled.input`
  margin-top: 0.25rem;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  accent-color: #ef4444;
  cursor: pointer;
`;
