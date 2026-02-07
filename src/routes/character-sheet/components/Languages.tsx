import React from 'react';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();
	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);

	return (
		<LanguagesSection $isMobile={effectiveIsMobile}>
			<SectionTitle $isMobile={effectiveIsMobile}>{t('characterSheet.languagesTitle')}</SectionTitle>
			<SectionDescription $isMobile={effectiveIsMobile}>
				{t('characterSheet.languagesDescription')}
			</SectionDescription>

			{/* Header with L and F labels */}
			<FluencyHeader $isMobile={effectiveIsMobile}>
				<LanguageNameHeader $isMobile={effectiveIsMobile}>{t('characterSheet.languagesLanguage')}</LanguageNameHeader>
				<FluencyHeaderContainer $isMobile={effectiveIsMobile}>
					<FluencyHeaderLabel $isMobile={effectiveIsMobile} title={t('characterSheet.languagesLimited')}>
						L
					</FluencyHeaderLabel>
					<FluencyHeaderLabel $isMobile={effectiveIsMobile} title={t('characterSheet.languagesFluent')}>
						F
					</FluencyHeaderLabel>
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
