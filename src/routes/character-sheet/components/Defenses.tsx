import React from 'react';
import {
  DefensesContainer,
  DefenseItem,
  DefenseLabelContainer,
  DefenseLabel,
  ShieldContainer,
  ShieldValue,
  DefenseFooter,
  AutoCalculatedNote
} from '../styles/Defenses';

interface DefensesProps {
  characterData: {
    finalPD: number;
    finalPDR: number;
    finalAD: number;
  };
}

const Defenses: React.FC<DefensesProps> = ({ characterData }) => {
  return (
    <DefensesContainer>
      {/* Physical Defense */}
      <DefenseItem>
        <DefenseLabelContainer>
          <DefenseLabel>PHYSICAL</DefenseLabel>
          <DefenseLabel>DEFENSE</DefenseLabel>
        </DefenseLabelContainer>
        <ShieldContainer>
          <ShieldValue>{characterData.finalPD}</ShieldValue>
        </ShieldContainer>
        <DefenseFooter />
      </DefenseItem>

      {/* Physical Damage Reduction */}
      <DefenseItem>
        <DefenseLabelContainer>
          <DefenseLabel>PHYSICAL</DefenseLabel>
          <DefenseLabel>DMG REDUCTION</DefenseLabel>
        </DefenseLabelContainer>
        <ShieldContainer>
          <ShieldValue>{characterData.finalPDR || 0}</ShieldValue>
        </ShieldContainer>
        <DefenseFooter>
          {characterData.finalPDR > 0 && (
            <AutoCalculatedNote>
              Auto-calculated
            </AutoCalculatedNote>
          )}
        </DefenseFooter>
      </DefenseItem>

      {/* Mystical Defense */}
      <DefenseItem>
        <DefenseLabelContainer>
          <DefenseLabel>MYSTICAL</DefenseLabel>
          <DefenseLabel>DEFENSE</DefenseLabel>
        </DefenseLabelContainer>
        <ShieldContainer>
          <ShieldValue>{characterData.finalAD}</ShieldValue>
        </ShieldContainer>
        <DefenseFooter />
      </DefenseItem>
    </DefensesContainer>
  );
};

export default Defenses;
