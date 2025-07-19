import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import {
  StyledContainer,
  StyledSubheading,
  StyledDescription,
  StyledSaveMasteriesGrid,
  StyledSaveMasteryItem,
  StyledSaveMasteryCheckbox,
  StyledSaveMasteryLabel,
  StyledSaveMasteryDetails,
  StyledAttributeName,
  StyledAttributeValue,
  StyledError
} from './styles/SaveMasteries.styles';

const SaveMasteries: React.FC = () => {
  const { state, dispatch } = useCharacter();

  // Get current selections count
  const selectedCount = [
    state.saveMasteryMight,
    state.saveMasteryAgility,
    state.saveMasteryCharisma,
    state.saveMasteryIntelligence
  ].filter(Boolean).length;

  const handleSaveMasteryChange = (attribute: string, checked: boolean) => {
    // If trying to check a third box, prevent it
    if (checked && selectedCount >= 2) {
      return;
    }
    
    dispatch({ 
      type: 'UPDATE_SAVE_MASTERY', 
      attribute, 
      value: checked 
    });
  };

  const attributes = [
    {
      id: 'might',
      name: 'Might',
      value: state.attribute_might,
      selected: state.saveMasteryMight,
      description: 'Your Strength of Body'
    },
    {
      id: 'agility', 
      name: 'Agility',
      value: state.attribute_agility,
      selected: state.saveMasteryAgility,
      description: 'Your Balance, Nimbleness, and Dexterity'
    },
    {
      id: 'charisma',
      name: 'Charisma', 
      value: state.attribute_charisma,
      selected: state.saveMasteryCharisma,
      description: 'Your Charm, Presence, Persuasiveness, and Force of Will'
    },
    {
      id: 'intelligence',
      name: 'Intelligence',
      value: state.attribute_intelligence, 
      selected: state.saveMasteryIntelligence,
      description: 'Your Reasoning, Understanding, and Wisdom'
    }
  ];

  return (
    <StyledContainer>
      <StyledSubheading>Save Masteries</StyledSubheading>
      <StyledDescription>
        Choose 2 Attributes to gain Save Mastery at Level 1. You are able to add your Combat Mastery to those Saves.
      </StyledDescription>
      
      {selectedCount < 2 && (
        <StyledError>
          You must select exactly 2 attributes for Save Mastery. Currently selected: {selectedCount}
        </StyledError>
      )}

      <StyledSaveMasteriesGrid>
        {attributes.map((attr) => (
          <StyledSaveMasteryItem 
            key={attr.id}
            $selected={attr.selected}
            $disabled={!attr.selected && selectedCount >= 2}
          >
            <StyledSaveMasteryCheckbox
              type="checkbox"
              checked={attr.selected}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSaveMasteryChange(attr.id, e.target.checked)}
              disabled={!attr.selected && selectedCount >= 2}
            />
            <StyledSaveMasteryLabel>
              <StyledSaveMasteryDetails>
                <StyledAttributeName>{attr.name}</StyledAttributeName>
                <StyledAttributeValue>
                  {attr.value >= 0 ? '+' : ''}{attr.value}
                </StyledAttributeValue>
              </StyledSaveMasteryDetails>
              <div style={{ fontSize: '0.9em', color: '#666', marginTop: '0.25rem' }}>
                {attr.description}
              </div>
            </StyledSaveMasteryLabel>
          </StyledSaveMasteryItem>
        ))}
      </StyledSaveMasteriesGrid>
    </StyledContainer>
  );
};

export default SaveMasteries;
