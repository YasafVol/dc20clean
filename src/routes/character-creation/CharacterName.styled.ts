import styled from 'styled-components';
import { theme, media } from '../character-sheet/styles/theme';

export const Container = styled.div`
  max-width: 800px;
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

export const FormCard = styled.div`
  background: ${theme.colors.bg.secondary}80;
  border: 1px solid ${theme.colors.bg.tertiary};
  border-radius: ${theme.spacing[3]};
  padding: ${theme.spacing[6]};

  ${media.mobile} {
    padding: ${theme.spacing[4]};
  }
`;

export const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[6]};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

export const Label = styled.label`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing[3]};
  background: ${theme.colors.bg.primary};
  border: 1px solid ${theme.colors.bg.elevated};
  border-radius: ${theme.spacing[2]};
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.base};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.crystal.primary};
    box-shadow: 0 0 0 3px ${theme.colors.crystal.primaryAlpha20};
  }

  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`;

export const GeneratorSection = styled.div`
  background: ${theme.colors.bg.primary};
  border: 1px solid ${theme.colors.bg.elevated};
  border-radius: ${theme.spacing[2]};
  padding: ${theme.spacing[4]};
`;

export const GeneratorTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.crystal.primary};
  margin-bottom: ${theme.spacing[3]};
`;

export const GeneratorText = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[3]};
`;

export const SuggestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing[2]};
  margin-top: ${theme.spacing[3]};

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const SuggestionButton = styled.button`
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  background: ${theme.colors.bg.secondary};
  border: 1px solid ${theme.colors.bg.elevated};
  border-radius: ${theme.spacing[1]};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.bg.elevated};
    border-color: ${theme.colors.crystal.primary};
    color: ${theme.colors.crystal.primary};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing[4]};
  color: ${theme.colors.text.muted};
  font-style: italic;
`;
