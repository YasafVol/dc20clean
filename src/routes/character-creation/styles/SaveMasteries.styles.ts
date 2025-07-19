import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const StyledSubheading = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

export const StyledDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

export const StyledSaveMasteriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const StyledSaveMasteryItem = styled.div<{
  $selected?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid ${props => 
    props.$selected ? '#3498db' : 
    props.$disabled ? '#e0e0e0' : '#ddd'
  };
  border-radius: 8px;
  background-color: ${props => 
    props.$selected ? '#f8fcff' : 
    props.$disabled ? '#f5f5f5' : '#fff'
  };
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  opacity: ${props => props.$disabled ? 0.6 : 1};

  &:hover {
    border-color: ${props => 
      props.$disabled ? '#e0e0e0' : 
      props.$selected ? '#2980b9' : '#bbb'
    };
  }
`;

export const StyledSaveMasteryCheckbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 0.1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

export const StyledSaveMasteryLabel = styled.label`
  flex: 1;
  cursor: ${props => props.style?.cursor || 'pointer'};
`;

export const StyledSaveMasteryDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

export const StyledAttributeName = styled.span`
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
`;

export const StyledAttributeValue = styled.span`
  font-weight: 700;
  font-size: 1.2rem;
  color: #3498db;
  min-width: 2rem;
  text-align: right;
`;

export const StyledError = styled.div`
  color: #e74c3c;
  background-color: #ffeaea;
  border: 1px solid #f5c6c6;
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;
