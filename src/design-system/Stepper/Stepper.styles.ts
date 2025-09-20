import styled from 'styled-components';
import { stepperColors } from '../styles/stepperColors';

export const StepperWrapper = styled.nav`
  display: flex;
  align-items: center;
  width: 964px;
  height: 66px;
  background: ${stepperColors.background};
  padding: 18px 24px;
  border-radius: 16px;
`;

export const NavigationButton = styled.button<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #ffffff;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:active:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const ButtonIcon = styled.span`
  font-size: 16px;
  line-height: 1;
`;

export const StepList = styled.ol`
  list-style: none;
  display: flex;
  gap: 10px;
  padding: 0;
  margin: 0 24px;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
`;

export const StepItem = styled.li<{ $isClickable: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
  flex: 1;
  max-width: 120px;
`;

export const StepCircle = styled.span<{ $status: string }>`
  width: 101px;
  height: 14px;
  border-radius: 3px;
  display: inline-block;
  vertical-align: middle;
  font-weight: 600;
  color: white;
  background: ${({ $status }) => {
    switch ($status) {
      case 'in-progress':
        return stepperColors.inProgress;
      case 'completed':
        return stepperColors.completed;
      case 'error':
        return stepperColors.error;
      default:
        return stepperColors.empty;
    }
  }};
`;

export const StepLabel = styled.span<{ $muted?: boolean }>`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-align: center;
  white-space: normal;
  line-height: 1.2;
  max-width: 100%;
  word-break: break-word;
  color: ${({ $muted }) => ($muted ? '#bdbdbd' : '#ffffff')};
`;

