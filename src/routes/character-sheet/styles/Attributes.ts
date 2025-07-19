import styled from 'styled-components';

export const StyledAttributeSection = styled.div`
  border: 2px solid #8b4513;
  border-radius: 8px;
  padding: 1rem;
  background: rgba(245, 243, 240, 0.5);
`;

export const StyledAttributeItem = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 0.5rem;
  margin-bottom: 1rem;
  align-items: center;
`;

export const StyledAttributeBox = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid #8b4513;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  position: relative;
`;

export const StyledAttributeAbbr = styled.div`
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #8b4513;
`;

export const StyledAttributeValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #2d2d2d;
`;

export const StyledAttributeDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledAttributeName = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #8b4513;
`;

export const StyledSaveBonus = styled.div`
  font-size: 0.8rem;
  color: #666;
`;
