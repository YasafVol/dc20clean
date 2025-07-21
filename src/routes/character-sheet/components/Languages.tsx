import React from 'react';
import type { LanguageData } from '../../../types';
import { SectionTitle, SectionDescription } from '../styles/KnowledgeTrades';
import {
	LanguagesSection,
	LanguageRow,
	LanguageName,
	FluencyContainer,
	FluencyBox,
	FluencyLabel,
	FluencyItem
} from '../styles/Languages';

interface LanguagesProps {
	languages: LanguageData[];
}

const Languages: React.FC<LanguagesProps> = ({ languages }) => {
	return (
		<LanguagesSection>
			<SectionTitle>LANGUAGES</SectionTitle>
			<SectionDescription>LANGUAGE CHECK = d20 + Intelligence or Charisma</SectionDescription>
			{languages.map((language) => (
				<LanguageRow key={language.id}>
					<LanguageName>{language.name.toUpperCase()}</LanguageName>
					<FluencyContainer>
						<FluencyItem>
							<FluencyLabel>LIMITED</FluencyLabel>
							<FluencyBox filled={language.fluency === 'limited'} />
						</FluencyItem>
						<FluencyItem>
							<FluencyLabel>FLUENT</FluencyLabel>
							<FluencyBox filled={language.fluency === 'fluent'} />
						</FluencyItem>
					</FluencyContainer>
				</LanguageRow>
			))}
		</LanguagesSection>
	);
};

export default Languages;
