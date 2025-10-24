import React from 'react';
import {
	StyledPointsContainer,
	StyledPointPool,
	StyledPointPoolTitle,
	StyledPointPoolValue,
	StyledConversionsContainer,
	StyledConversionsTitle,
	StyledConversionButtons,
	StyledConversionButton,
	StyledResetButton
} from './ProficiencyPointsDisplay.styles';

interface ProficiencyPointsDisplayProps {
	skillsAvailable: number;
	skillsSpent: number;
	tradesAvailable: number;
	tradesSpent: number;
	languagesAvailable: number;
	languagesSpent: number;
	conversions: {
		skillToTrade: number;
		tradeToLanguage: number;
	};
	onConvertSkillToTrade: () => void;
	onConvertTradeToLanguage: () => void;
	onUnconvertSkillToTrade: () => void;
	onUnconvertTradeToLanguage: () => void;
	onResetConversions: () => void;
}

export const ProficiencyPointsDisplay: React.FC<ProficiencyPointsDisplayProps> = ({
	skillsAvailable,
	skillsSpent,
	tradesAvailable,
	tradesSpent,
	languagesAvailable,
	languagesSpent,
	conversions,
	onConvertSkillToTrade,
	onConvertTradeToLanguage,
	onUnconvertSkillToTrade,
	onUnconvertTradeToLanguage,
	onResetConversions
}) => {
	const skillsRemaining = skillsAvailable - skillsSpent;
	const tradesRemaining = tradesAvailable - tradesSpent;
	const languagesRemaining = languagesAvailable - languagesSpent;

	const hasConversions = conversions.skillToTrade > 0 || conversions.tradeToLanguage > 0;

	return (
		<StyledPointsContainer>
			{/* Skills Pool */}
			<StyledPointPool>
				<StyledPointPoolTitle>Skills</StyledPointPoolTitle>
				<StyledPointPoolValue>
					{skillsRemaining} / {skillsAvailable}
				</StyledPointPoolValue>
			</StyledPointPool>

			{/* Trades Pool */}
			<StyledPointPool>
				<StyledPointPoolTitle>Trades</StyledPointPoolTitle>
				<StyledPointPoolValue>
					{tradesRemaining} / {tradesAvailable}
				</StyledPointPoolValue>
			</StyledPointPool>

			{/* Languages Pool */}
			<StyledPointPool>
				<StyledPointPoolTitle>Languages</StyledPointPoolTitle>
				<StyledPointPoolValue>
					{languagesRemaining} / {languagesAvailable}
				</StyledPointPoolValue>
			</StyledPointPool>

			{/* Conversions */}
			<StyledConversionsContainer>
				<StyledConversionsTitle>Point Conversions</StyledConversionsTitle>
				<StyledConversionButtons>
					{/* Forward conversions */}
					<StyledConversionButton
						onClick={onConvertSkillToTrade}
						disabled={skillsRemaining < 1}
						title="Convert 1 Skill Point to 2 Trade Points"
					>
						Convert 1 skill pt. to 2 trade pt.
					</StyledConversionButton>

					<StyledConversionButton
						onClick={onConvertTradeToLanguage}
						disabled={tradesRemaining < 1}
						title="Convert 1 Trade Point to 2 Language Points"
					>
						Convert 1 trade pt. to 2 language pt.
					</StyledConversionButton>

					{/* Reverse conversions (only show if conversions exist) */}
					{conversions.skillToTrade > 0 && (
						<StyledConversionButton
							onClick={onUnconvertSkillToTrade}
							disabled={tradesRemaining < 2}
							title="Convert 2 Trade Points back to 1 Skill Point"
						>
							Convert 2 trade pt. to 1 skill pt.
						</StyledConversionButton>
					)}

					{conversions.tradeToLanguage > 0 && (
						<StyledConversionButton
							onClick={onUnconvertTradeToLanguage}
							disabled={languagesRemaining < 2}
							title="Convert 2 Language Points back to 1 Trade Point"
						>
							Convert 2 language pt. to 1 trade pt.
						</StyledConversionButton>
					)}

					{/* Reset button */}
					{hasConversions && (
						<StyledResetButton onClick={onResetConversions} title="Reset all conversions">
							Reset Conversion
						</StyledResetButton>
					)}
				</StyledConversionButtons>

				{hasConversions && (
					<div style={{ fontSize: '13px', color: '#6366f1', marginTop: '8px' }}>
						Active conversions:
						{conversions.skillToTrade > 0 && ` ${conversions.skillToTrade} Skill→Trade`}
						{conversions.tradeToLanguage > 0 && ` ${conversions.tradeToLanguage} Trade→Language`}
					</div>
				)}
			</StyledConversionsContainer>
		</StyledPointsContainer>
	);
};
