import React from 'react';
import type { LanguageData } from '../../../types';
import { SectionTitle, SectionDescription } from '../styles/KnowledgeTrades';
import {
	LanguagesSection,
	LanguageRow,
	LanguageName,
	FluencyContainer,
	FluencyBox,
	FluencyHeader,
	LanguageNameHeader,
	FluencyHeaderContainer,
	FluencyHeaderLabel
} from '../styles/Languages';

interface LanguagesProps {
	languages: LanguageData[];
}

const Languages: React.FC<LanguagesProps> = ({ languages }) => {
	return (
		<LanguagesSection>
			<SectionTitle>LANGUAGES</SectionTitle>
			<SectionDescription>LANGUAGE CHECK = d20 + Intelligence or Charisma</SectionDescription>
			
			{/* Header with L and F labels */}
			<FluencyHeader>
				<LanguageNameHeader>LANGUAGE</LanguageNameHeader>
				<FluencyHeaderContainer>
					<FluencyHeaderLabel title="Limited">L</FluencyHeaderLabel>
					<FluencyHeaderLabel title="Fluent">F</FluencyHeaderLabel>
				</FluencyHeaderContainer>
			</FluencyHeader>

			{languages.map((language) => (
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
