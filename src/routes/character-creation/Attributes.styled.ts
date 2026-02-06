import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme, media } from '../character-sheet/styles/theme';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};
`;

export const Header = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

export const Title = styled.h2`
  font-family: 'Cinzel', serif;
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.crystal.primary};
  text-shadow: 0 0 20px ${theme.colors.crystal.primaryAlpha30};
`;

export const PrimeRuleToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  max-width: 500px;
  margin: 0 auto;
  padding: ${theme.spacing[2]};
  background: ${theme.colors.bg.secondary}4d;
  border: 1px solid ${theme.colors.bg.tertiary};
  border-radius: ${theme.spacing[2]};
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  border-radius: ${theme.spacing[1]};
  background: ${theme.colors.bg.primary}80;
  border: 1px solid ${theme.colors.crystal.primary};
  cursor: pointer;
  accent-color: ${theme.colors.crystal.primary};

  &:focus {
    outline: 2px solid ${theme.colors.crystal.primary};
    outline-offset: 2px;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  user-select: none;
`;

export const AttributesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[4]};

  ${media.tabletDown} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const AttributeCard = styled(motion.div)`
  background: ${theme.colors.bg.secondary}80;
  border: 1px solid ${theme.colors.bg.tertiary};
  border-radius: ${theme.spacing[3]};
  padding: ${theme.spacing[6]} ${theme.spacing[4]};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[3]};

  ${media.mobile} {
    padding: ${theme.spacing[4]} ${theme.spacing[3]};
  }
`;

export const AttributeName = styled.h3`
  font-family: 'Cinzel', serif;
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.crystal.primary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const AttributeValue = styled.div`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  min-width: 60px;
  text-align: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
`;

export const IconButton = styled.button<{ $disabled?: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.$disabled ? theme.colors.bg.tertiary : theme.colors.crystal.primaryAlpha30};
  border: 1px solid
    ${(props) =>
      props.$disabled ? theme.colors.bg.elevated : theme.colors.crystal.primaryAlpha70};
  border-radius: 50%;
  color: ${(props) => (props.$disabled ? theme.colors.text.muted : theme.colors.crystal.primary)};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  font-size: ${theme.typography.fontSize.lg};

  &:hover:not(:disabled) {
    background: ${theme.colors.crystal.primaryAlpha50};
    border-color: ${theme.colors.crystal.primary};
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

export const InfoSection = styled.div`
  margin-top: ${theme.spacing[2]};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[1]};
`;

export const InfoBadge = styled.div<{ $type?: 'limit' | 'cap' }>`
  font-size: ${theme.typography.fontSize.xs};
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  background: ${(props) =>
    props.$type === 'limit' ? theme.colors.accent.warningAlpha10 : theme.colors.bg.elevated};
  border: 1px solid
    ${(props) =>
      props.$type === 'limit' ? theme.colors.accent.warning : theme.colors.bg.elevated};
  border-radius: ${theme.spacing[1]};
  color: ${(props) => (props.$type === 'limit' ? theme.colors.accent.warning : theme.colors.text.secondary)};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
`;

export const EffectsList = styled.div`
  margin-top: ${theme.spacing[4]};
  padding: ${theme.spacing[3]};
  background: ${theme.colors.bg.primary}80;
  border: 1px solid ${theme.colors.bg.tertiary};
  border-radius: ${theme.spacing[2]};
  width: 100%;
`;

export const EffectItem = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  padding: ${theme.spacing[1]} 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};

  &::before {
    content: '•';
    color: ${theme.colors.crystal.primary};
  }
`;

export const WarningBox = styled.div`
  background: ${theme.colors.accent.warningAlpha10};
  border: 1px solid ${theme.colors.accent.warningAlpha30};
  border-radius: ${theme.spacing[2]};
  padding: ${theme.spacing[4]};
  color: ${theme.colors.accent.warning};
  font-size: ${theme.typography.fontSize.sm};
`;

export const WarningHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing[2]};
`;

export const ErrorBox = styled.div`
  background: ${theme.colors.accent.dangerAlpha10};
  border: 1px solid ${theme.colors.accent.dangerAlpha30};
  border-radius: ${theme.spacing[2]};
  padding: ${theme.spacing[4]};
  color: ${theme.colors.accent.danger};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.bold};
  text-align: center;
`;
