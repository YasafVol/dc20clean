import styled from 'styled-components';
import { theme, media } from '../character-sheet/styles/theme';

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing[4]};
`;

export const Title = styled.h2`
  font-family: 'Cinzel', serif;
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.crystal.primary};
  text-shadow: 0 0 20px ${theme.colors.crystal.primaryAlpha30};
`;

// The Tabs component from shadcn is kept, but we can style the content
export const TabsContainer = styled.div`
  width: 100%;

  [role='tablist'] {
    display: flex;
    gap: ${theme.spacing[2]};
    border-bottom: 2px solid ${theme.colors.bg.tertiary};
    margin-bottom: ${theme.spacing[6]};

    ${media.mobile} {
      flex-direction: column;
    }
  }

  [role='tab'] {
    flex: 1;
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
    font-family: 'Cinzel', serif;
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.secondary};
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: ${theme.colors.crystal.primary};
      background: ${theme.colors.bg.elevated}40;
    }

    &[data-state='active'] {
      color: ${theme.colors.crystal.primary};
      border-bottom-color: ${theme.colors.crystal.primary};
      background: ${theme.colors.bg.elevated}40;
    }
  }
`;

export const ConversionSection = styled.div`
  background: ${theme.colors.bg.secondary}80;
  border: 1px solid ${theme.colors.bg.tertiary};
  border-radius: ${theme.spacing[3]};
  padding: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[6]};
`;

export const ConversionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[4]};

  ${media.tabletDown} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ConversionCard = styled.div`
  background: ${theme.colors.bg.primary};
  border: 1px solid ${theme.colors.bg.elevated};
  border-radius: ${theme.spacing[2]};
  padding: ${theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
`;

export const ConversionLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`;

export const ConversionDescription = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.secondary};
  line-height: 1.4;
`;

export const ConversionStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing[2]};
  background: ${theme.colors.bg.secondary}80;
  border-radius: ${theme.spacing[1]};
  font-size: ${theme.typography.fontSize.sm};
`;

export const StatLabel = styled.span`
  color: ${theme.colors.text.secondary};
`;

export const StatValue = styled.span<{ $highlight?: boolean }>`
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${(props) => (props.$highlight ? theme.colors.crystal.primary : theme.colors.text.primary)};
`;
