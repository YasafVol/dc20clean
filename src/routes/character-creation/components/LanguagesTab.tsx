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
	StyledPointsRemaining
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
	const getButtonStyle = (enabled: boolean, variant: 'primary' | 'danger' = 'primary') => ({
		padding: '0.5rem 1rem',
		backgroundColor: enabled ? (variant === 'primary' ? '#3b82f6' : '#ef4444') : '#6b7280',
		color: 'white',
		border: 'none',
		borderRadius: '6px',
		fontSize: '0.875rem',
		fontWeight: '500',
		cursor: enabled ? 'pointer' : 'not-allowed',
		transition: 'all 0.2s ease',
		opacity: enabled ? 1 : 0.6,
		':hover': enabled
			? {
					backgroundColor: variant === 'primary' ? '#2563eb' : '#dc2626',
					transform: 'translateY(-1px)',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
				}
			: {}
	});

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
					<button
						onClick={actions.convertTradeToLanguage}
						disabled={pointsData.availableTradePoints - pointsData.tradePointsUsed < 1}
						style={getButtonStyle(
							pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1
						)}
						onMouseEnter={(e) => {
							if (pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1) {
								e.currentTarget.style.backgroundColor = '#2563eb';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
							}
						}}
						onMouseLeave={(e) => {
							if (pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1) {
								e.currentTarget.style.backgroundColor = '#3b82f6';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						Convert 1 Trade → 2 Language Points
					</button>
					<button
						onClick={actions.resetConversions}
						disabled={!hasConversions}
						style={getButtonStyle(hasConversions, 'danger')}
						onMouseEnter={(e) => {
							if (hasConversions) {
								e.currentTarget.style.backgroundColor = '#dc2626';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
							}
						}}
						onMouseLeave={(e) => {
							if (hasConversions) {
								e.currentTarget.style.backgroundColor = '#ef4444';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						Reset Conversions
					</button>
				</div>
			</StyledPointsRemaining>
			<StyledSelectionGrid>
				{languagesData.map((language) => {
					const currentFluency = currentLanguages[language.id]?.fluency || null;
					const isCommon = language.id === 'common';

					return (
						<StyledSelectionItem key={language.id}>
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
