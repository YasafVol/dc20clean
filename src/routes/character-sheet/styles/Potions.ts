import styled from 'styled-components';

interface PotionCircleProps {
  fillPercentage: number;
  color: string;
}

export const StyledPotionContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border: 3px solid;
  border-radius: 50%;
  background: white;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledPotionFill = styled.div<PotionCircleProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${props => Math.max(0, props.fillPercentage)}%;
  background: linear-gradient(
    to top,
    ${props => props.color}dd,
    ${props => props.color}aa
  );
  border-radius: 0 0 50px 50px;
  transition: height 0.3s ease-in-out;
`;

export const StyledPotionBubbles = styled.div<{ color: string; fillPercentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: ${props => props.fillPercentage > 20 ? 0.3 : 0};
  transition: opacity 0.3s ease-in-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: bubble1 2s infinite ease-in-out;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 30%;
    right: 25%;
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: bubble2 2.5s infinite ease-in-out;
  }
  
  @keyframes bubble1 {
    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
    50% { transform: translateY(-10px) scale(1.1); opacity: 0.8; }
  }
  
  @keyframes bubble2 {
    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
    50% { transform: translateY(-8px) scale(1.2); opacity: 0.6; }
  }
`;

export const StyledPotionValue = styled.div`
  position: relative;
  z-index: 10;
  font-size: 1.4rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  color: #333;
`;

export const StyledLargePotionContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 3px solid;
  border-radius: 50%;
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledLargePotionValue = styled.div`
  position: relative;
  z-index: 10;
  font-size: 1.6rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  color: #333;
`;

export const StyledTempHPDisplay = styled.div`
  position: relative;
  z-index: 10;
  font-size: 0.7rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
`;
