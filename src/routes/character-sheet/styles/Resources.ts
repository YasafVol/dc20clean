import styled from 'styled-components';

export const StyledResourcesSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

export const StyledResourceBox = styled.div`
  border: 2px solid #8b4513;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  background: white;
  position: relative;
`;

export const StyledResourceIcon = styled.div<{ bgColor: string }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.bgColor};
  border: 3px solid #8b4513;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

export const StyledResourceControls = styled.div`
  display: flex;
  gap: 0.3rem;
  justify-content: center;
  margin-top: 0.5rem;
`;

export const StyledResourceButton = styled.button<{ variant?: 'damage' | 'heal' }>`
  width: 25px;
  height: 25px;
  border: 1px solid ${props => props.variant === 'damage' ? '#d32f2f' : props.variant === 'heal' ? '#388e3c' : '#8b4513'};
  border-radius: 3px;
  background: ${props => props.variant === 'damage' ? '#ffebee' : props.variant === 'heal' ? '#e8f5e8' : 'white'};
  color: ${props => props.variant === 'damage' ? '#d32f2f' : props.variant === 'heal' ? '#388e3c' : '#8b4513'};
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.variant === 'damage' ? '#d32f2f' : props.variant === 'heal' ? '#388e3c' : '#8b4513'};
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledResourceInput = styled.input<{ variant?: 'circle' | 'standard' }>`
  width: ${props => props.variant === 'circle' ? '50px' : '40px'};
  text-align: center;
  border: ${props => props.variant === 'circle' ? 'none' : '1px solid #8b4513'};
  border-radius: ${props => props.variant === 'circle' ? '0' : '3px'};
  background: ${props => props.variant === 'circle' ? 'transparent' : 'white'};
  font-size: ${props => props.variant === 'circle' ? '1.4rem' : '0.9rem'};
  font-weight: bold;
  padding: 0;
  margin: 0;
  outline: none;
  
  /* Remove number input spinner arrows completely */
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    display: none;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
  
  /* Force center alignment and remove any browser default styling */
  ${props => props.variant === 'circle' && `
    line-height: 1;
    vertical-align: baseline;
    box-sizing: border-box;
  `}
`;

export const StyledTempHPInput = styled(StyledResourceInput)`
  width: 25px;
  font-size: 0.7rem;
`;
