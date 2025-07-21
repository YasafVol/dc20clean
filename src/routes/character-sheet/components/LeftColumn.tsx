import React from 'react';
import { StyledLeftColumn } from '../styles/Layout';
import Attributes from './Attributes';
import KnowledgeTrades from './KnowledgeTrades';
import Languages from './Languages';

interface SkillData {
  id: string;
  name: string;
  attribute: string;
  proficiency: number;
}

interface KnowledgeData {
  id: string;
  name: string;
  proficiency: number;
}

interface TradeData {
  id: string;
  name: string;
  proficiency: number;
}

interface LanguageData {
  id: string;
  name: string;
  fluency: 'limited' | 'fluent';
}

interface LeftColumnProps {
  characterData: {
    finalPrimeModifierAttribute: string;
    finalPrimeModifierValue: number;
    finalMight: number;
    finalAgility: number;
    finalCharisma: number;
    finalIntelligence: number;
    finalSaveMight: number;
    finalSaveAgility: number;
    finalSaveCharisma: number;
    finalSaveIntelligence: number;
  };
  skillsByAttribute: {
    prime: SkillData[];
    might: SkillData[];
    agility: SkillData[];
    charisma: SkillData[];
    intelligence: SkillData[];
  };
  knowledge: KnowledgeData[];
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
