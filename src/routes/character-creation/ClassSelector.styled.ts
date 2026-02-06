import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme, media } from '../character-sheet/styles/theme';

/**
 * ClassSelector Page-Specific Styled Components
 * Shared components (PageTitle, Card, Grid, etc.) are imported from src/components/styled/
 */

// Header section with title and subtitle
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
  text-align: center;
  margin-bottom: ${theme.spacing[8]};
`;

export const Title = styled.h2`
  font-family: 'Cinzel', serif;
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.crystal.primary};
  text-shadow: 0 0 20px ${theme.colors.crystal.primaryAlpha30};
`;

export const Subtitle = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.base};
`;

// Level up banner (shown in level-up mode)
export const LevelUpBanner = styled.div`
  background: ${theme.colors.crystal.primaryAlpha20};
  border: 1px solid ${theme.colors.crystal.primary};
  color: ${theme.colors.crystal.primary};
  border-radius: ${theme.spacing[2]};
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  text-align: center;
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing[8]};
`;

// Level selector container
export const LevelSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[4]};
  max-width: 600px;
  margin: 0 auto ${theme.spacing[8]};
  background: ${theme.colors.bg.secondary}66;
  border: 1px solid ${theme.colors.bg.tertiary};
  border-radius: ${theme.spacing[3]};
  padding: ${theme.spacing[4]};

  ${media.mobile} {
    flex-direction: column;
  }

  ${media.desktop} {
    flex-direction: row;
  }
`;

export const LevelLabel = styled.label`
  font-family: 'Cinzel', serif;
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.crystal.primary};
`;

export const LevelSelectWrapper = styled.div`
  width: 160px;
`;

export const LevelHint = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.xs};
  font-style: italic;
  max-width: 200px;
  text-align: center;

  ${media.desktop} {
    text-align: left;
  }
`;

// Class cards grid
export const ClassGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[6]};

  ${media.tabletDown} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// Individual class card
export const ClassCard = styled(motion.div)<{ $isSelected?: boolean; $isDisabled?: boolean }>`
  position: relative;
  height: 100%;
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  background: ${(props) =>
    props.$isSelected ? theme.colors.crystal.primaryAlpha10 : `${theme.colors.bg.secondary}80`};
  border: 2px solid
    ${(props) => (props.$isSelected ? theme.colors.crystal.primary : theme.colors.bg.tertiary)};
  border-radius: ${theme.spacing[3]};
  padding: ${theme.spacing[4]};
  overflow: hidden;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.$isDisabled ? 0.6 : 1)};

  ${(props) =>
    props.$isSelected &&
    `
    box-shadow: 0 0 20px ${theme.colors.crystal.primaryAlpha20};
  `}

  ${(props) =>
    !props.$isDisabled &&
    `
    &:hover {
      border-color: ${theme.colors.crystal.primaryAlpha70};
      background: ${theme.colors.bg.elevated}dd;
    }
  `}

  ${media.mobile} {
    padding: ${theme.spacing[3]};
  }
`;

// Card header with icon and title
export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[2]};
  padding-bottom: 0;
`;

export const IconWrapper = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.$isSelected ? theme.colors.crystal.primary : `${theme.colors.text.secondary}4d`};
  background: ${(props) =>
    props.$isSelected ? theme.colors.crystal.primary : `${theme.colors.bg.primary}cc`};
  transition: all 0.2s ease;
`;

export const ClassIcon = styled.img<{ $isSelected?: boolean }>`
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: ${(props) => (props.$isSelected ? 'brightness(0)' : 'brightness(0) invert(0.7)')};
`;

export const ClassTitle = styled.h3<{ $isSelected?: boolean }>`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${(props) => (props.$isSelected ? theme.colors.crystal.primary : theme.colors.text.secondary)};
  transition: color 0.2s ease;
`;

// Card content
export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

export const ClassQuote = styled.div<{ $isSelected?: boolean }>`
  border-left: 2px solid
    ${(props) =>
      props.$isSelected ? `${theme.colors.crystal.primary}80` : `${theme.colors.text.secondary}33`};
  padding: ${theme.spacing[1]} 0 ${theme.spacing[1]} ${theme.spacing[3]};
  font-size: ${theme.typography.fontSize.sm};
  font-style: italic;
  color: ${(props) =>
    props.$isSelected ? `${theme.colors.crystal.primary}e6` : `${theme.colors.text.secondary}b3`};
  transition: all 0.2s ease;
`;

export const ClassDescription = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  line-height: 1.6;
`;

// Selected checkmark indicator
export const SelectedBadge = styled.div`
  position: absolute;
  top: ${theme.spacing[2]};
  right: ${theme.spacing[2]};
  background: ${theme.colors.crystal.primary};
  color: ${theme.colors.bg.primary};
  border-radius: 50%;
  padding: ${theme.spacing[1]};
  box-shadow: 0 2px 8px ${theme.colors.crystal.primaryAlpha30};
`;
