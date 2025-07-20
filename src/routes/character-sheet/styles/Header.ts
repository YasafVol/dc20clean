import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #8b4513;
  padding-bottom: 1rem;
`;

export const StyledHeaderSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled.label`
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #8b4513;
  margin-bottom: 0.2rem;
`;

export const StyledValue = styled.div`
  font-size: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  padding: 0.2rem 0;
  min-height: 1.5rem;
`;
