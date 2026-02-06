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
  margin-bottom: ${theme.spacing[8]};
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

export const AncestryGrid = styled.div`
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

export const AncestryCard = styled(motion.div)<{ $isSelected?: boolean }>`
  position: relative;
  background: ${(props) =>
    props.$isSelected ? theme.colors.crystal.primaryAlpha10 : `${theme.colors.bg.secondary}80`};
  border: 2px solid
    ${(props) => (props.$isSelected ? theme.colors.crystal.primary : theme.colors.bg.tertiary)};
  border-radius: ${theme.spacing[3]};
  padding: ${theme.spacing[4]};
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;

  ${(props) =>
    props.$isSelected &&
    `
    box-shadow: 0 0 20px ${theme.colors.crystal.primaryAlpha20};
  `}

  &:hover {
    border-color: ${theme.colors.crystal.primaryAlpha70};
    background: ${theme.colors.bg.elevated}dd;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[3]};
`;

export const IconWrapper = styled.div`
  font-size: 36px;
  filter: grayscale(20%);
`;

export const AncestryTitle = styled.h3<{ $isSelected?: boolean }>`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${(props) => (props.$isSelected ? theme.colors.crystal.primary : theme.colors.text.primary)};
  text-transform: capitalize;
  transition: color 0.2s ease;
`;

export const QuoteText = styled.div<{ $isSelected?: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  font-style: italic;
  color: ${(props) =>
    props.$isSelected ? theme.colors.crystal.primaryAlpha90 : theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[3]};
  padding-left: ${theme.spacing[3]};
  border-left: 2px solid
    ${(props) =>
      props.$isSelected ? theme.colors.crystal.primaryAlpha70 : `${theme.colors.text.secondary}33`};
  transition: all 0.2s ease;
`;

export const TraitCount = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
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
