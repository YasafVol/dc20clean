import styled from 'styled-components';

export const StyledFeatureGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 1rem;
`;

export const StyledFeatureItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background: #f9f9f9;
  min-height: 36px;
`;

export const StyledFeatureName = styled.span`
  font-size: 0.9rem;
  color: #8b4513;
  font-weight: 500;
  flex: 1;
  line-height: 1.2;
  margin-right: 0.5rem;
`;

export const StyledFeatureReadMore = styled.button`
  background: #8b4513;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.2rem 0.4rem;
  font-size: 0.75rem;
  cursor: pointer;
  margin-left: 0.5rem;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background: #654321;
  }
`;

export const StyledFeatureCategory = styled.div`
  margin-bottom: 1rem;
`;

export const StyledFeatureCategoryTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #8b4513;
  font-size: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #8b4513;
  padding-bottom: 0.2rem;
`;
