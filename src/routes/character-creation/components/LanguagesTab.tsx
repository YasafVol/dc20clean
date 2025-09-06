import React from 'react';
import { languagesData } from '../../../lib/rulesdata/languages';
// Types moved from deleted BackgroundPointsManager
interface BackgroundPointsData {
	skillPointsUsed: number;
	tradePointsUsed: number;
	languagePointsUsed: number;
	baseSkillPoints: number;
	baseTradePoints: number;
	baseLanguagePoints: number;
	availableSkillPoints: number;
	availableTradePoints: number;
	availableLanguagePoints: number;
}

interface PointConversions {
	skillToTradeConversions: number;
	tradeToSkillConversions: number;
	tradeToLanguageConversions: number;
}

interface ConversionActions {
	convertSkillToTrade: () => void;
	convertTradeToSkill: () => void;
	convertTradeToLanguage: () => void;
	resetConversions: () => void;
}
import {
	StyledTabContent,
	StyledSelectionGrid,
	StyledSelectionItem,
	StyledSelectionHeader,
	StyledSelectionName,
	StyledProficiencyButton,
	StyledLanguageFluency,
	StyledPointsRemaining,
	StyledActionButton
} from '../styles/Background.styles';

interface LanguagesTabProps {
	currentLanguages: Record<string, { fluency: 'limited' | 'fluent' }>;
	pointsData: BackgroundPointsData;
	conversions: PointConversions;
	actions: ConversionActions;
	onLanguageChange: (languageId: string, fluency: 'limited' | 'fluent' | null) => void;
}

const LanguagesTab: React.FC<LanguagesTabProps> = ({
	currentLanguages,
	pointsData,
	conversions,
	actions,
	onLanguageChange
}) => {
	const getLanguageCost = (fluency: 'limited' | 'fluent') => {
		return fluency === 'limited' ? 1 : 2;
	};

	// Helper function for consistent button styling
	const hasConversions =
		conversions.skillToTradeConversions > 0 ||
		conversions.tradeToSkillConversions > 0 ||
		conversions.tradeToLanguageConversions > 0;

	return (
		<StyledTabContent>
			<StyledPointsRemaining>
				Language Points: {pointsData.availableLanguagePoints - pointsData.languagePointsUsed} /{' '}
				{pointsData.availableLanguagePoints} remaining
				{conversions.tradeToLanguageConversions > 0 && (
					<div
						style={{
							fontSize: '0.9rem',
							color: '#6366f1',
							marginTop: '0.5rem',
							padding: '0.25rem 0.5rem',
							backgroundColor: '#6366f11a',
							borderRadius: '4px',
							border: '1px solid #6366f133'
						}}
					>
						Active conversions: {conversions.tradeToLanguageConversions} trade →{' '}
						{conversions.tradeToLanguageConversions * 2} language
					</div>
				)}
				<div
					style={{
						marginTop: '0.75rem',
						display: 'flex',
						gap: '0.5rem',
						flexWrap: 'wrap'
					}}
				>
					<StyledActionButton
						onClick={actions.convertTradeToLanguage}
						disabled={pointsData.availableTradePoints - pointsData.tradePointsUsed < 1}
						$enabled={pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1}
					>
						Convert 1 Trade → 2 Language Points
					</StyledActionButton>
					<StyledActionButton
						onClick={actions.resetConversions}
						disabled={!hasConversions}
						$enabled={hasConversions}
					>
						Reset Conversions
					</StyledActionButton>
				</div>
			</StyledPointsRemaining>
			<StyledSelectionGrid>
				{languagesData.map((language) => {
					const currentFluency = currentLanguages[language.id]?.fluency || null;
					const isCommon = language.id === 'common';

					return (
						<StyledSelectionItem key={language.id} data-testid={`language-item-${language.id}`}>
							<StyledSelectionHeader>
								<StyledSelectionName>
									{language.name}
									{isCommon && (
										<span style={{ color: '#10b981', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
											(Free)
										</span>
									)}
								</StyledSelectionName>
								<div style={{ fontSize: '0.8rem', color: '#e2e8f0', textTransform: 'uppercase' }}>
									{(language as any).type}
								</div>
							</StyledSelectionHeader>
							<div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
								{language.description}
							</div>
							<StyledLanguageFluency>
								{!isCommon && (
									<StyledProficiencyButton
										$active={currentFluency === null}
										onClick={() => onLanguageChange(language.id, null)}
									>
										None
									</StyledProficiencyButton>
								)}
								{(['limited', 'fluent'] as const).map((fluency) => {
									const cost = getLanguageCost(fluency);
									const canAfford =
										isCommon ||
										currentFluency === fluency ||
										pointsData.languagePointsUsed + cost <= pointsData.availableLanguagePoints;

									return (
										<StyledProficiencyButton
											key={fluency}
											$active={currentFluency === fluency}
											$disabled={!canAfford && !isCommon}
											onClick={() => {
												if (isCommon || canAfford) {
													onLanguageChange(language.id, fluency);
												}
											}}
										>
											{fluency.charAt(0).toUpperCase() + fluency.slice(1)}{' '}
											{!isCommon && `(${cost})`}
										</StyledProficiencyButton>
									);
								})}
							</StyledLanguageFluency>
						</StyledSelectionItem>
					);
				})}
			</StyledSelectionGrid>
		</StyledTabContent>
	);
};

export default LanguagesTab;
