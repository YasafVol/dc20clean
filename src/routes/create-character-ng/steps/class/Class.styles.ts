import styled from 'styled-components';
import { colors } from '../../../../design-system/styles/colors';

export const StyledContainer = styled.div`
  width: 100%;
  padding: 2rem;
  color: ${colors.textPrimary};
`;

export const StyledTitle = styled.h2`
  margin: 0 0 1rem 0;
  color: ${colors.primary};
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

export const StyledContent = styled.div`
  color: ${colors.textSecondary};
  text-align: center;
  
  p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;