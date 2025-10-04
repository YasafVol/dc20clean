import React from 'react';
import {
  StyledCheckboxWrapper,
  StyledCheckboxInput,
  StyledCheckboxLabel,
  StyledTextContainer,
  StyledMainText,
  StyledPipeSeparator,
  StyledSubText
} from './Checkbox.styles';

export interface CheckboxProps {
  /** The main label text (displayed in russet color) */
  label: string;
  /** Optional subtext (displayed in iron color) */
  subtext?: string;
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Callback when checkbox state changes */
  onChange?: (checked: boolean) => void;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Name attribute for the input */
  name?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  subtext,
  checked = false,
  onChange,
  disabled = false,
  name,
  'data-testid': testId
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(event.target.checked);
    }
  };

  return (
    <StyledCheckboxWrapper>
      <StyledCheckboxInput
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        data-testid={testId}
      />
      <StyledCheckboxLabel $disabled={disabled}>
        <StyledTextContainer>
          <StyledMainText>{label}</StyledMainText>
          {subtext && (
            <>
              <StyledPipeSeparator>|</StyledPipeSeparator>
              <StyledSubText>{subtext}</StyledSubText>
            </>
          )}
        </StyledTextContainer>
      </StyledCheckboxLabel>
    </StyledCheckboxWrapper>
  );
};

export default Checkbox;
