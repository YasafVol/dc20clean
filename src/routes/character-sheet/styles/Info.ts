import styled from 'styled-components';

export const StyledInfoSection = styled.div`
  border: 2px solid #8b4513;
  border-radius: 8px;
  padding: 1rem;
  background: rgba(245, 243, 240, 0.5);
`;

export const StyledSectionTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #8b4513;
  margin: 0 0 0.8rem 0;
  text-align: center;
  border-bottom: 1px solid #8b4513;
  padding-bottom: 0.3rem;
`;

export const StyledStatRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
`;

export const StyledStatLabel = styled.span`
  color: #666;
`;

export const StyledStatValue = styled.span`
  font-weight: bold;
  color: #2d2d2d;
`;
