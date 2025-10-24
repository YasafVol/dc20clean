import React from 'react';
import { CollapsibleSection } from '../../../../../design-system/CollapsibleSection/CollapsibleSection';
import { languagesData } from '../../../../../lib/rulesdata/languages';
import { proficiencyRules } from '../../../../../lib/rulesdata/proficiencies';
import { StyledFluencyControls, StyledFluencyButton, StyledInfoBox } from './LanguagesTab.styles';
import {
	StyledSkillTitle,
	StyledSkillAttribute,
	StyledSkillDescription,
	StyledSkillRow,
	StyledCollapsibleWrapper
} from './SkillsTab.styles';

interface LanguagesTabProps {
	currentLanguages: Record<string, { fluency: 'limited' | 'fluent' }>;
	availablePoints: number;
	spentPoints: number;
	onLanguageChange: (languageId: string, fluency: 'limited' | 'fluent' | null) => void;
}

export const LanguagesTab: React.FC<LanguagesTabProps> = ({
	currentLanguages,
	availablePoints,
	spentPoints,
	onLanguageChange
}) => {
	const remainingPoints = availablePoints - spentPoints;

	const canSelectFluency = (languageId: string, targetFluency: 'limited' | 'fluent'): boolean => {
		// Common is always free
		if (languageId === proficiencyRules.languageFluency.freeLanguage) {
			return true;
		}

		const currentFluency = currentLanguages[languageId]?.fluency;

		// Calculate cost difference
		let costDifference = 0;
		if (!currentFluency) {
			// Adding new language
			costDifference =
				targetFluency === 'limited'
					? proficiencyRules.languageFluency.limited
					: proficiencyRules.languageFluency.fluent;
		} else if (currentFluency === 'limited' && targetFluency === 'fluent') {
			// Upgrading limited → fluent
			costDifference =
				proficiencyRules.languageFluency.fluent - proficiencyRules.languageFluency.limited;
		} else if (currentFluency === 'fluent' && targetFluency === 'limited') {
			// Downgrading - always allowed
			return true;
		} else {
			// Same fluency - toggle off
			return true;
		}

		return remainingPoints >= costDifference;
	};

	const handleFluencyClick = (languageId: string, targetFluency: 'limited' | 'fluent') => {
		const currentFluency = currentLanguages[languageId]?.fluency;

		// If clicking same fluency, remove it
		if (currentFluency === targetFluency) {
			onLanguageChange(languageId, null);
		} else if (canSelectFluency(languageId, targetFluency)) {
			onLanguageChange(languageId, targetFluency);
		}
	};

	const isCommon = (langId: string) => langId === proficiencyRules.languageFluency.freeLanguage;

	return (
		<div>
			<StyledInfoBox>
				<strong>Language Points:</strong> {spentPoints} / {availablePoints} spent ({remainingPoints}{' '}
				remaining)
				<br />
				<strong>Costs:</strong> Limited = 1 point, Fluent = 2 points
				<br />
				<em>Common language is free for all characters</em>
			</StyledInfoBox>

			{languagesData.map((language) => {
				const currentFluency = currentLanguages[language.id]?.fluency;
				const common = isCommon(language.id);

				// Build the fluency buttons (OUTSIDE CollapsibleSection)
				const fluencyButtons = (
					<StyledFluencyControls>
						<StyledFluencyButton
							$active={currentFluency === 'limited'}
							onClick={() => handleFluencyClick(language.id, 'limited')}
							disabled={common || !canSelectFluency(language.id, 'limited')}
						>
							Limited
						</StyledFluencyButton>
						<StyledFluencyButton
							$active={currentFluency === 'fluent' || common}
							onClick={() => handleFluencyClick(language.id, 'fluent')}
							disabled={common || !canSelectFluency(language.id, 'fluent')}
						>
							Fluent
						</StyledFluencyButton>
					</StyledFluencyControls>
				);

				// Build title with language name and type
				const title = (
					<div>
						<StyledSkillTitle>
							{language.name} {common && '(Free)'}
						</StyledSkillTitle>
						<StyledSkillAttribute>{language.type}</StyledSkillAttribute>
					</div>
				);

				return (
					<StyledSkillRow key={language.id}>
						<StyledCollapsibleWrapper>
							<CollapsibleSection title={title} defaultExpanded={false}>
								{/* Content shows when expanded - description/details */}
								<StyledSkillDescription>
									{language.description || `No description available for ${language.name}`}
								</StyledSkillDescription>
							</CollapsibleSection>
						</StyledCollapsibleWrapper>
						{fluencyButtons}
					</StyledSkillRow>
				);
			})}
		</div>
	);
};
