import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme, media } from '../character-sheet/styles/theme';

/**
 * CharacterCreation Page-Specific Styled Components
 * Shared components (Button, Modal, Container, Form) are imported from src/components/styled/
 */

// Main page container with background
export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('/src/assets/BlackBG.jpg') center/cover fixed;
  font-family: ${theme.typography.fontFamily.primary};
  color: ${theme.colors.text.primary};
`;

// Sticky header with stepper navigation
export const StepperHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background: ${theme.colors.bg.primary}ee;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${theme.colors.bg.tertiary};
`;

// Mobile progress bar (hidden on desktop)
export const MobileProgressBar = styled.div`
  height: 4px;
  width: 100%;
  background: ${theme.colors.bg.secondary};
  position: relative;
  overflow: hidden;

  ${media.desktop} {
    display: none;
  }
`;

export const ProgressFill = styled(motion.div)<{ $progress: number }>`
  height: 100%;
  width: ${(props) => props.$progress}%;
  background: linear-gradient(
    90deg,
    ${theme.colors.crystal.primary},
    ${theme.colors.crystal.secondary}
  );
  transition: width 0.3s ease;
`;

// Header content wrapper
export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing[4]};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  min-height: 80px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

// Navigation sections
export const NavSection = styled.div<{ $align?: 'start' | 'center' | 'end' }>`
  display: flex;
  align-items: center;
  width: 140px;
  flex-shrink: 0;
  justify-content: ${(props) => props.$align || 'start'};
  gap: ${theme.spacing[3]};

  ${media.mobile} {
    width: auto;
  }
`;

// Mobile title (shown instead of stepper on small screens)
export const MobileTitle = styled.span`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.crystal.primary};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${media.desktop} {
    display: none;
  }
`;

// Desktop stepper container
export const StepperContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[1]};
  flex: 1;
  min-width: 0;
  overflow-x: auto;

  ${media.desktop} {
    display: flex;
    flex-wrap: wrap;
  }
`;

// Individual step item
export const StepItem = styled(motion.div)<{ $isActive?: boolean; $isCompleted?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[1.5]} ${theme.spacing[2]};
  border-radius: 9999px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  ${(props) => {
    if (props.$isActive) {
      return `
        background: ${theme.colors.crystal.primaryAlpha50};
        color: ${theme.colors.crystal.primary};
        box-shadow: 0 4px 12px ${theme.colors.crystal.primaryAlpha30};
      `;
    } else if (props.$isCompleted) {
      return `
        background: ${theme.colors.crystal.primaryAlpha20};
        color: ${theme.colors.crystal.primary};
        
        &:hover {
          background: ${theme.colors.crystal.primaryAlpha30};
        }
      `;
    } else {
      return `
        color: ${theme.colors.text.secondary};
        
        &:hover {
          background: ${theme.colors.bg.tertiary};
          color: ${theme.colors.text.primary};
        }
      `;
    }
  }}
`;

// Step number circle
export const StepNumber = styled.div<{ $isActive?: boolean; $isCompleted?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  transition: all 0.2s ease;

  ${(props) => {
    if (props.$isActive) {
      return `
        background: ${theme.colors.bg.primary};
        color: ${theme.colors.crystal.primary};
      `;
    } else if (props.$isCompleted) {
      return `
        background: ${theme.colors.crystal.primary};
        color: ${theme.colors.bg.primary};
      `;
    } else {
      return `
        background: ${theme.colors.bg.tertiary}40;
        color: ${theme.colors.text.secondary};
      `;
    }
  }}
`;

// Step label text
export const StepLabel = styled.span<{ $isActive?: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${(props) =>
    props.$isActive ? theme.typography.fontWeight.bold : theme.typography.fontWeight.medium};
`;

// Chevron separator between steps
export const StepSeparator = styled.div`
  color: ${theme.colors.text.muted};
  opacity: 0.3;
  margin: 0 ${theme.spacing[1]};
  flex-shrink: 0;
`;

// Main content area
export const MainContent = styled.main`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing[8]} ${theme.spacing[4]};
  flex: 1;

  ${media.mobile} {
    padding: ${theme.spacing[4]} ${theme.spacing[2]};
  }
`;

// Auth status wrapper (hidden on mobile)
export const AuthWrapper = styled.div`
  display: none;

  ${media.wide} {
    display: block;
  }
`;
