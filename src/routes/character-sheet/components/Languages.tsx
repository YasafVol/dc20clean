import React from 'react';
import {
  LanguagesSection,
  LanguageRow,
  LanguageName,
  FluencyContainer,
  FluencyBox
} from '../styles/Languages';
import { SectionTitle, SectionDescription } from '../styles/KnowledgeTrades';

interface LanguageData {
  id: string;
  name: string;
  fluency: 'limited' | 'fluent';
}

interface LanguagesProps {
  languages: LanguageData[];
}

const Languages: React.FC<LanguagesProps> = ({ languages }) => {
  return (
    <LanguagesSection>
      <SectionTitle>LANGUAGES</SectionTitle>
      <SectionDescription>LANGUAGE CHECK = d20 + Intelligence or Charisma</SectionDescription>
      {languages.map(language => (
        <LanguageRow key={language.id}>
          <LanguageName>{language.name.toUpperCase()}</LanguageName>
          <FluencyContainer>
            <FluencyBox filled={language.fluency === 'limited'} />
            <FluencyBox filled={language.fluency === 'fluent'} />
          </FluencyContainer>
        </LanguageRow>
      ))}
    </LanguagesSection>
  );
};

export default Languages;
