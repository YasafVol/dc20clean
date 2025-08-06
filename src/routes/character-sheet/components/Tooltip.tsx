import React, { useState } from 'react';
import styled, { css } from 'styled-components';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: string;
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled.div<{ 
  $visible: boolean; 
  $position: 'top' | 'bottom' | 'left' | 'right';
  $maxWidth: string;
}>`
  position: absolute;
  z-index: 1000;
  padding: 8px 12px;
  background: #1a1a1a;
  color: #ffffff;
  border-radius: 6px;
  font-size: 0.8rem;
  line-height: 1.3;
  white-space: pre-line;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  max-width: ${props => props.$maxWidth};
  width: max-content;
  min-width: 150px;
  
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  
  ${props => {
    switch (props.$position) {
      case 'top':
        return css`
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 8px;
          
          &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-top-color: #1a1a1a;
          }
        `;
      case 'bottom':
        return css`
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 8px;
          
          &::after {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-bottom-color: #1a1a1a;
          }
        `;
      case 'left':
        return css`
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 8px;
          
          &::after {
            content: '';
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border: 6px solid transparent;
            border-left-color: #1a1a1a;
          }
        `;
      case 'right':
        return css`
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 8px;
          
          &::after {
            content: '';
            position: absolute;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border: 6px solid transparent;
            border-right-color: #1a1a1a;
          }
        `;
      default:
        return css``;
    }
  }}
`;

const TriggerWrapper = styled.div`
  display: inline-block;
  cursor: help;
`;

const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  children, 
  position = 'top',
  maxWidth = '250px'
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <TooltipContainer>
      <TriggerWrapper
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </TriggerWrapper>
      <TooltipContent 
        $visible={visible} 
        $position={position}
        $maxWidth={maxWidth}
      >
        {content}
      </TooltipContent>
    </TooltipContainer>
  );
};

export default Tooltip;
