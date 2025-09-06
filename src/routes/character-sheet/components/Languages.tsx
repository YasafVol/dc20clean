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
	isMobile?: boolean;
}

const Languages: React.FC<LanguagesProps> = ({ languages, isMobile }) => {
	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);
	
	return (
		<LanguagesSection $isMobile={effectiveIsMobile}>
			<SectionTitle $isMobile={effectiveIsMobile}>LANGUAGES</SectionTitle>
			<SectionDescription $isMobile={effectiveIsMobile}>LANGUAGE CHECK = d20 + Intelligence or Charisma</SectionDescription>

			{/* Header with L and F labels */}
			<FluencyHeader $isMobile={effectiveIsMobile}>
				<LanguageNameHeader $isMobile={effectiveIsMobile}>LANGUAGE</LanguageNameHeader>
				<FluencyHeaderContainer $isMobile={effectiveIsMobile}>
					<FluencyHeaderLabel $isMobile={effectiveIsMobile} title="Limited">L</FluencyHeaderLabel>
					<FluencyHeaderLabel $isMobile={effectiveIsMobile} title="Fluent">F</FluencyHeaderLabel>
				</FluencyHeaderContainer>
			</FluencyHeader>

			{languages.map((language) => (
				<LanguageRow $isMobile={effectiveIsMobile} key={language.id}>
					<LanguageName $isMobile={effectiveIsMobile}>{language.name.toUpperCase()}</LanguageName>
					<FluencyContainer $isMobile={effectiveIsMobile}>
						<FluencyBox $isMobile={effectiveIsMobile} filled={language.fluency === 'limited'} />
						<FluencyBox $isMobile={effectiveIsMobile} filled={language.fluency === 'fluent'} />
					</FluencyContainer>
				</LanguageRow>
			))}
		</LanguagesSection>
	);
};

export default Languages;
