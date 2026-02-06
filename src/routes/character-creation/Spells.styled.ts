import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme, media } from '../character-sheet/styles/theme';

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[6]};
`;

export const Header = styled.div`
  text-align: center;
`;

export const Title = styled.h2`
  font-family: 'Cinzel', serif;
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.crystal.primary};
  text-shadow: 0 0 20px ${theme.colors.crystal.primaryAlpha30};
  margin-bottom: ${theme.spacing[2]};
`;

export const Subtitle = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.base};
`;

export const ProgressSection = styled.div`
  background: ${theme.colors.bg.secondary}80;
  border: 1px solid ${theme.colors.bg.tertiary};
  border-radius: ${theme.spacing[3]};
  padding: ${theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
`;

export const ProgressText = styled.div`
  text-align: center;
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.crystal.primary};
`;

export const FilterSection = styled.div`
  background: ${theme.colors.bg.secondary}80;
  border: 1px solid ${theme.colors.bg.tertiary};
  border-radius: ${theme.spacing[3]};
  padding: ${theme.spacing[4]};
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[3]};

  ${media.tabletDown} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

export const FilterLabel = styled.label`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`;

export const SpellGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[4]};

  ${media.tabletDown} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SpellCard = styled(motion.div)<{ $isSelected?: boolean; $isLocked?: boolean }>`
  background: ${(props) =>
    props.$isSelected ? theme.colors.crystal.primaryAlpha10 : theme.colors.bg.primary};
  border: 2px solid
    ${(props) => {
      if (props.$isSelected) return theme.colors.crystal.primary;
      if (props.$isLocked) return theme.colors.accent.dangerAlpha30;
      return theme.colors.bg.elevated;
    }};
  border-radius: ${theme.spacing[2]};
  padding: ${theme.spacing[4]};
  cursor: ${(props) => (props.$isLocked ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.$isLocked ? 0.6 : 1)};
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};

  ${(props) =>
    props.$isSelected &&
    `
    box-shadow: 0 0 15px ${theme.colors.crystal.primaryAlpha20};
  `}

  ${(props) =>
    !props.$isLocked &&
    `
    &:hover {
      border-color: ${theme.colors.crystal.primaryAlpha70};
      background: ${theme.colors.bg.elevated};
    }
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing[2]};
`;

export const SpellName = styled.h3<{ $isSelected?: boolean }>`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${(props) => (props.$isSelected ? theme.colors.crystal.primary : theme.colors.text.primary)};
  transition: color 0.2s ease;
`;

export const SpellBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[1]};
`;

export const SpellDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
`;

export const SpellMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.secondary};
  padding-top: ${theme.spacing[2]};
  border-top: 1px solid ${theme.colors.bg.tertiary};
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${theme.spacing[12]} ${theme.spacing[4]};
  color: ${theme.colors.text.secondary};
  font-style: italic;
`;

export const LockedOverlay = styled.div`
  position: absolute;
  top: ${theme.spacing[2]};
  right: ${theme.spacing[2]};
  background: ${theme.colors.accent.dangerAlpha20};
  border: 1px solid ${theme.colors.accent.danger};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.accent.danger};
`;

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

export const Badge = styled.span<{ $variant?: 'school' | 'cost' | 'range' | 'sustained' }>`
  font-size: ${theme.typography.fontSize.xs};
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.spacing[1]};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${(props) => {
    switch (props.$variant) {
      case 'school':
        return `
          background: transparent;
          border: 1px solid ${theme.colors.crystal.primaryAlpha30};
          color: ${theme.colors.crystal.primaryAlpha70};
        `;
      case 'cost':
        return `
          background: ${theme.colors.crystal.primaryAlpha10};
          color: ${theme.colors.crystal.primary};
          font-family: 'Courier New', monospace;
        `;
      case 'range':
        return `
          background: ${theme.colors.bg.elevated};
          border: 1px solid ${theme.colors.bg.tertiary};
          color: ${theme.colors.text.secondary};
        `;
      case 'sustained':
        return `
          background: ${theme.colors.accent.warningAlpha10};
          border: 1px solid ${theme.colors.accent.warningAlpha30};
          color: ${theme.colors.accent.warning};
        `;
      default:
        return `
          background: ${theme.colors.bg.elevated};
          color: ${theme.colors.text.secondary};
        `;
    }
  }}
`;

export const SpellCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${theme.spacing[3]};
  border-top: 1px solid ${theme.colors.bg.tertiary};
  margin-top: auto;
`;

export const SourcesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
`;

export const SourceTag = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.text.secondary}60;
`;

export const SpellButton = styled.button<{ $variant?: 'learn' | 'forget' }>`
  padding: ${theme.spacing[1]} ${theme.spacing[4]};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  border-radius: ${theme.spacing[1]};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${(props) =>
    props.$variant === 'forget'
      ? `
    background: ${theme.colors.accent.dangerAlpha20};
    color: ${theme.colors.accent.danger};
    
    &:hover {
      background: ${theme.colors.accent.dangerAlpha30};
    }
  `
      : `
    background: ${theme.colors.crystal.primary};
    color: ${theme.colors.bg.primary};
    
    &:hover {
      background: ${theme.colors.crystal.primaryAlpha90};
    }
  `}
`;

export const KnownBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: ${theme.colors.crystal.primary};
  color: ${theme.colors.bg.primary};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  border-bottom-left-radius: ${theme.spacing[2]};
  letter-spacing: 0.1em;
`;
