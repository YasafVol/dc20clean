import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme, media } from '../character-sheet/styles/theme';

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};
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
  margin-bottom: ${theme.spacing[3]};
`;

export const PointsDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  background: ${theme.colors.bg.secondary}cc;
  border: 1px solid ${theme.colors.bg.tertiary};
  border-radius: ${theme.spacing[2]};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.crystal.primary};
`;

export const AncestrySection = styled.section`
  background: ${theme.colors.bg.secondary}80;
  border: 1px solid ${theme.colors.bg.tertiary};
  border-radius: ${theme.spacing[3]};
  padding: ${theme.spacing[6]};

  ${media.mobile} {
    padding: ${theme.spacing[4]};
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

export const AncestryName = styled.h3`
  font-family: 'Cinzel', serif;
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.crystal.primary};
  margin-bottom: ${theme.spacing[2]};
  text-transform: capitalize;
`;

export const TraitGrid = styled.div`
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

export const TraitCard = styled(motion.div)<{ $isSelected?: boolean; $disabled?: boolean; $cost?: number }>`
  background: ${(props) =>
    props.$isSelected ? theme.colors.crystal.primaryAlpha10 : theme.colors.bg.primary};
  border: 2px solid
    ${(props) => {
      if (props.$isSelected) return theme.colors.crystal.primary;
      if (props.$disabled) return theme.colors.bg.tertiary;
      return theme.colors.bg.elevated;
    }};
  border-radius: ${theme.spacing[2]};
  padding: ${theme.spacing[4]};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  transition: all 0.2s ease;
  position: relative;

  ${(props) =>
    props.$isSelected &&
    `
    box-shadow: 0 0 15px ${theme.colors.crystal.primaryAlpha20};
  `}

  ${(props) =>
    !props.$disabled &&
    `
    &:hover {
      border-color: ${theme.colors.crystal.primaryAlpha70};
      background: ${theme.colors.bg.elevated};
    }
  `}
`;

export const TraitHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${theme.spacing[2]};
`;

export const TraitName = styled.div<{ $isSelected?: boolean }>`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${(props) => (props.$isSelected ? theme.colors.crystal.primary : theme.colors.text.primary)};
  transition: color 0.2s ease;
`;

export const TraitCost = styled.div<{ $cost: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 ${theme.spacing[2]};
  background: ${(props) => {
    if (props.$cost === 0) return theme.colors.accent.successAlpha20;
    return theme.colors.crystal.primaryAlpha20;
  }};
  border: 1px solid ${(props) => {
    if (props.$cost === 0) return theme.colors.accent.success;
    return theme.colors.crystal.primary;
  }};
  border-radius: ${theme.spacing[1]};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${(props) => {
    if (props.$cost === 0) return theme.colors.accent.success;
    return theme.colors.crystal.primary;
  }};
`;

export const TraitDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  margin-bottom: ${theme.spacing[2]};
`;

export const PrerequisiteWarning = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.accent.warning};
  font-style: italic;
  margin-top: ${theme.spacing[2]};
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  background: ${theme.colors.accent.warningAlpha10};
  border-radius: ${theme.spacing[1]};
  border-left: 2px solid ${theme.colors.accent.warning};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing[8]};
  color: ${theme.colors.text.secondary};
  font-style: italic;
`;
