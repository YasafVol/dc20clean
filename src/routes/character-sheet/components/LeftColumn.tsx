import React from 'react';
import type { SkillData, TradeData, LanguageData, CharacterSheetData } from '../../../types';
import { StyledLeftColumn } from '../styles/Layout';
import Attributes from './Attributes';
import KnowledgeTrades from './KnowledgeTrades';
import Languages from './Languages';

interface LeftColumnProps {
  characterData: CharacterSheetData;
  skillsByAttribute: {
    prime: SkillData[];
    might: SkillData[];
    agility: SkillData[];
    charisma: SkillData[];
    intelligence: SkillData[];
  };
  knowledge: TradeData[];
  trades: TradeData[];
  languages: LanguageData[];
}

const LeftColumn: React.FC<LeftColumnProps> = ({
  characterData,
  skillsByAttribute,
  knowledge,
  trades,
  languages
}) => {
  return (
    <StyledLeftColumn>
      <Attributes 
        characterData={characterData}
        skillsByAttribute={skillsByAttribute}
      />
      <KnowledgeTrades 
        knowledge={knowledge}
        trades={trades}
      />
      <Languages languages={languages} />
    </StyledLeftColumn>
  );
};

export default LeftColumn;
