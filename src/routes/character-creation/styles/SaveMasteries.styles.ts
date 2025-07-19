import styled from 'styled-components';

export const StyledContainer = styled.div`
  border: 2px solid #8b5cf6;
  padding: 1.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  margin-top: 2rem;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
  color: white;
`;

export const StyledSubheading = styled.h2`
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

export const StyledDescription = styled.p`
  color: #e2e8f0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  text-align: center;
  font-size: 1rem;
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
  border: 2px solid ${props => 
    props.$selected ? '#fbbf24' : 
    props.$disabled ? '#6b7280' : '#a855f7'
  };
  padding: 1.5rem;
  border-radius: 10px;
  background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  opacity: ${props => props.$disabled ? 0.6 : 1};
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);

  &:hover {
    border-color: ${props => props.$disabled ? '#6b7280' : '#fbbf24'};
    transform: ${props => props.$disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.$disabled ? '0 4px 15px rgba(168, 85, 247, 0.2)' : '0 8px 25px rgba(251, 191, 36, 0.3)'};
  }
`;

export const StyledSaveMasteryCheckbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  accent-color: #fbbf24;
  cursor: pointer;
`;

export const StyledSaveMasteryLabel = styled.label`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledAttributeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StyledAttributeDescription = styled.div`
  font-size: 0.9rem;
  color: #e2e8f0;
  margin-top: 0.5rem;
  line-height: 1.4;
`;

export const StyledSaveMasteryDetails = styled.div`
  flex: 1;
`;

export const StyledAttributeName = styled.div`
  font-weight: 600;
  color: #fbbf24;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledAttributeValue = styled.div`
  color: #e2e8f0;
  font-size: 1rem;
  font-weight: 600;
`;

export const StyledError = styled.div`
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;
