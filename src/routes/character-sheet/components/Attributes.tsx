import React from 'react';
import {
  AttributeSection,
  AttributeHeader,
  AttributeBox,
  AttributeAbbreviation,
  AttributeValue,
  AttributeInfo,
  AttributeName,
  AttributeSave,
  SkillRow,
  SkillName,
  PrimeSection,
  PrimeLabel,
  PrimeValue
} from '../styles/Attributes';
import { StyledProficiencyDots, StyledDot } from '../styles/Skills';

interface SkillData {
  id: string;
  name: string;
  attribute: string;
  proficiency: number;
}

interface AttributesProps {
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
}

const Attributes: React.FC<AttributesProps> = ({ characterData, skillsByAttribute }) => {
  const renderSkills = (skills: SkillData[]) => {
    return skills.map(skill => (
      <SkillRow key={skill.id}>
        <SkillName>{skill.name.toUpperCase()}</SkillName>
        <StyledProficiencyDots>
          {[1, 2, 3, 4, 5].map(level => (
            <StyledDot key={level} filled={level <= skill.proficiency} />
          ))}
        </StyledProficiencyDots>
      </SkillRow>
    ));
  };

  return (
    <>
      {/* Prime Modifier & Awareness */}
      <PrimeSection>
        <PrimeLabel>Prime</PrimeLabel>
        <PrimeValue>
          {characterData.finalPrimeModifierAttribute} +{characterData.finalPrimeModifierValue}
        </PrimeValue>
      </PrimeSection>
      
      {/* Awareness (Prime skill) */}
      {renderSkills(skillsByAttribute.prime)}

      {/* Might Section */}
      <AttributeSection>
        <AttributeHeader>
          <AttributeBox>
            <AttributeAbbreviation>MIG</AttributeAbbreviation>
            <AttributeValue>{characterData.finalMight}</AttributeValue>
          </AttributeBox>
          <AttributeInfo>
            <AttributeName>MIGHT</AttributeName>
            <AttributeSave>SAVE +{characterData.finalSaveMight}</AttributeSave>
          </AttributeInfo>
        </AttributeHeader>
        
        {renderSkills(skillsByAttribute.might)}
      </AttributeSection>

      {/* Agility Section */}
      <AttributeSection>
        <AttributeHeader>
          <AttributeBox>
            <AttributeAbbreviation>AGI</AttributeAbbreviation>
            <AttributeValue>{characterData.finalAgility}</AttributeValue>
          </AttributeBox>
          <AttributeInfo>
            <AttributeName>AGILITY</AttributeName>
            <AttributeSave>SAVE +{characterData.finalSaveAgility}</AttributeSave>
          </AttributeInfo>
        </AttributeHeader>
        
        {renderSkills(skillsByAttribute.agility)}
      </AttributeSection>

      {/* Charisma Section */}
      <AttributeSection>
        <AttributeHeader>
          <AttributeBox>
            <AttributeAbbreviation>CHA</AttributeAbbreviation>
            <AttributeValue>{characterData.finalCharisma}</AttributeValue>
          </AttributeBox>
          <AttributeInfo>
            <AttributeName>CHARISMA</AttributeName>
            <AttributeSave>SAVE +{characterData.finalSaveCharisma}</AttributeSave>
          </AttributeInfo>
        </AttributeHeader>
        
        {renderSkills(skillsByAttribute.charisma)}
      </AttributeSection>

      {/* Intelligence Section */}
      <AttributeSection>
        <AttributeHeader>
          <AttributeBox>
            <AttributeAbbreviation>INT</AttributeAbbreviation>
            <AttributeValue>{characterData.finalIntelligence}</AttributeValue>
          </AttributeBox>
          <AttributeInfo>
            <AttributeName>INTELLIGENCE</AttributeName>
            <AttributeSave>SAVE +{characterData.finalSaveIntelligence}</AttributeSave>
          </AttributeInfo>
        </AttributeHeader>
        
        {renderSkills(skillsByAttribute.intelligence)}
      </AttributeSection>
    </>
  );
};

export default Attributes;
