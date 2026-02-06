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
  text-align: center;
`;

export const ProgressText = styled.div`
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

export const FilterLabel = styled.label`
  display: block;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
`;

export const ManeuverGrid = styled.div`
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

export const ManeuverCard = styled(motion.div)<{ $isSelected?: boolean }>`
  background: ${(props) =>
    props.$isSelected ? theme.colors.crystal.primaryAlpha10 : theme.colors.bg.primary};
  border: 2px solid
    ${(props) => (props.$isSelected ? theme.colors.crystal.primary : theme.colors.bg.elevated)};
  border-radius: ${theme.spacing[2]};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 320px;

  ${(props) =>
    props.$isSelected &&
    `
    box-shadow: 0 0 15px ${theme.colors.crystal.primaryAlpha20};
  `}

  &:hover {
    border-color: ${theme.colors.crystal.primaryAlpha70};
    background: ${theme.colors.bg.elevated};
  }
`;

export const CardContent = styled.div`
  padding: ${theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
  flex: 1;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing[2]};
`;

export const ManeuverName = styled.h3<{ $isSelected?: boolean }>`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${(props) => (props.$isSelected ? theme.colors.crystal.primary : theme.colors.text.primary)};
  transition: color 0.2s ease;
`;

export const TypeBadge = styled.div<{ $type: string }>`
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.spacing[1]};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${(props) => {
    switch (props.$type) {
      case 'offensive':
        return theme.colors.accent.dangerAlpha20;
      case 'defensive':
        return theme.colors.accent.infoAlpha20;
      case 'utility':
        return theme.colors.accent.warningAlpha20;
      default:
        return theme.colors.bg.elevated;
    }
  }};
  color: ${(props) => {
    switch (props.$type) {
      case 'offensive':
        return theme.colors.accent.danger;
      case 'defensive':
        return theme.colors.accent.info;
      case 'utility':
        return theme.colors.accent.warning;
      default:
        return theme.colors.text.secondary;
    }
  }};
  border: 1px solid
    ${(props) => {
      switch (props.$type) {
        case 'offensive':
          return theme.colors.accent.danger;
        case 'defensive':
          return theme.colors.accent.info;
        case 'utility':
          return theme.colors.accent.warning;
        default:
          return theme.colors.bg.elevated;
      }
    }};
`;

export const ManeuverDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${theme.spacing[12]} ${theme.spacing[4]};
  color: ${theme.colors.text.secondary};
  font-style: italic;
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

export const CostBadgesContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
`;

export const CostBadge = styled.span<{ $variant: 'ap' | 'sp' }>`
  background: ${(props) =>
    props.$variant === 'ap' ? 'rgba(247, 118, 142, 0.1)' : 'rgba(224, 175, 104, 0.1)'};
  color: ${(props) => (props.$variant === 'ap' ? theme.colors.accent.danger : theme.colors.accent.warning)};
  border: 1px solid
    ${(props) =>
      props.$variant === 'ap' ? 'rgba(247, 118, 142, 0.3)' : 'rgba(224, 175, 104, 0.3)'};
  padding: 0.125rem 0.5rem;
  border-radius: ${theme.spacing[1]};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const ButtonFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${theme.spacing[4]};
  border-top: 1px solid rgba(169, 177, 214, 0.1);
  background: rgba(0, 0, 0, 0.2);
  margin-top: auto;
`;

export const EmptyStateIcon = styled.div`
  background: rgba(168, 85, 247, 0.1);
  border-radius: 50%;
  padding: ${theme.spacing[4]};
  display: inline-flex;
  margin-bottom: ${theme.spacing[4]};
`;

export const EmptyStateTitle = styled.h2`
  font-family: 'Cinzel', serif;
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: #a855f7;
  margin-bottom: ${theme.spacing[4]};
`;

export const EmptyStateText = styled.p`
  color: rgba(169, 177, 214, 0.7);
  max-width: 28rem;
  margin: 0 auto;
`;

export const FilterText = styled.div`
  text-align: center;
  font-size: ${theme.typography.fontSize.sm};
  color: rgba(169, 177, 214, 0.7);
`;

export const FilterTextRemaining = styled.span<{ $isOverLimit?: boolean }>`
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${(props) => (props.$isOverLimit ? theme.colors.accent.danger : '#A855F7')};
`;

export const ManeuverButton = styled.button<{ $variant?: 'learn' | 'forget' }>`
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
    background: rgba(247, 118, 142, 0.2);
    color: ${theme.colors.accent.danger};
    
    &:hover {
      background: rgba(247, 118, 142, 0.3);
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
