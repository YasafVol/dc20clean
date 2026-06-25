import React from 'react';
import {
	getLanguageCompatibilitySelections,
	getPrimaryLanguageSelectionId,
	languagesData
} from '../../../lib/rulesdata/languages';
import type { LanguageFamily } from '../../../lib/rulesdata/schemas/types';
import { cn } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';

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
	const familyOrder: LanguageFamily[] = ['mortal', 'exotic', 'divine', 'outer'];
	const familyTitles: Record<LanguageFamily, string> = {
		mortal: 'Mortal Languages',
		exotic: 'Exotic Languages',
		divine: 'Divine Languages',
		outer: 'Outer Languages'
	};

	const getLanguageCost = (fluency: 'limited' | 'fluent') => {
		return fluency === 'limited' ? 1 : 2;
	};

	const languagesByFamily = familyOrder.map((family) => ({
		family,
		languages: languagesData.filter((language) => language.family === family)
	}));
	const compatibilitySelections = React.useMemo(
		() => getLanguageCompatibilitySelections(currentLanguages),
		[currentLanguages]
	);

	const hasConversions =
		conversions.skillToTradeConversions > 0 || conversions.tradeToLanguageConversions > 0;

	const languagePointsRemaining =
		pointsData.availableLanguagePoints - pointsData.languagePointsUsed;
	const canConvertTradeToLanguage =
		pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1;

	return (
		<div className="mx-auto">
			{/* Points Remaining */}
			<div className="text-destructive mb-6 text-center text-lg font-bold">
				Language Points: {languagePointsRemaining} / {pointsData.availableLanguagePoints} remaining
				{conversions.tradeToLanguageConversions > 0 && (
					<div className="bg-primary/10 border-primary/20 text-primary mt-2 rounded border px-2 py-1 text-sm">
						Active conversions: {conversions.tradeToLanguageConversions} trade →{' '}
						{conversions.tradeToLanguageConversions * 2} language
					</div>
				)}
				<div className="mt-3 flex flex-wrap justify-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={actions.convertTradeToLanguage}
						disabled={!canConvertTradeToLanguage}
						data-testid="convert-trade-to-language"
						data-action-id="convert-trade-to-language"
						className="border-white/50 bg-transparent"
					>
						Convert 1 Trade → 2 Language Points
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={actions.resetConversions}
						disabled={!hasConversions}
						data-testid="reset-background-conversions"
						data-action-id="reset-background-conversions"
						className={cn(
							'border-white/50 bg-transparent',
							hasConversions && 'hover:border-destructive hover:text-destructive'
						)}
					>
						Reset Conversions
					</Button>
				</div>
			</div>

			{/* Selection Grid */}
			<div className="space-y-8">
				{languagesByFamily.map(({ family, languages }) => (
					<section key={family} aria-label={familyTitles[family]} className="space-y-4">
						<div className="border-primary/20 flex items-center justify-between border-b pb-2">
							<h3 className="text-primary text-base font-semibold tracking-wide uppercase">
								{familyTitles[family]}
							</h3>
							<span className="text-muted-foreground text-xs uppercase">
								Language Check DC {languages[0]?.checkDc}
							</span>
						</div>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
							{languages.map((language) => {
								const activeLanguageId = getPrimaryLanguageSelectionId(language, currentLanguages);
								const currentFluency = currentLanguages[activeLanguageId]?.fluency || null;
								const isCommon = language.id === 'common';

								return (
									<div
										key={language.id}
										data-testid={`language-item-${language.id}`}
										className="hover:border-primary rounded-lg border border-white/50 bg-transparent p-4 transition-colors"
									>
										<div className="mb-2 flex items-center justify-between gap-3">
											<h4 className="text-primary text-lg font-semibold tracking-wide uppercase">
												{language.name}
												{isCommon && (
													<span className="ml-2 text-xs font-normal text-emerald-500">(Free)</span>
												)}
											</h4>
											<span className="text-muted-foreground text-xs uppercase">
												{language.typicalSpeakers}
											</span>
										</div>
										<p className="text-muted-foreground mb-3 text-sm">{language.description}</p>
										<div className="flex flex-wrap gap-2">
											{!isCommon && (
												<button
													onClick={() => onLanguageChange(activeLanguageId, null)}
													className={cn(
														'rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors',
														currentFluency === null
															? 'border-primary bg-primary text-primary-foreground'
															: 'hover:border-primary text-foreground border-white/50 bg-transparent'
													)}
												>
													None
												</button>
											)}
											{(['limited', 'fluent'] as const).map((fluency) => {
												const cost = getLanguageCost(fluency);
												const canAfford =
													isCommon ||
													currentFluency === fluency ||
													pointsData.languagePointsUsed + cost <=
														pointsData.availableLanguagePoints;
												const isActive = currentFluency === fluency;
												const isDisabled = !canAfford && !isCommon;

												return (
													<button
														key={fluency}
														onClick={() => {
															if (isCommon || canAfford) {
																onLanguageChange(activeLanguageId, fluency);
															}
														}}
														className={cn(
															'rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors',
															isActive
																? 'border-primary bg-primary text-primary-foreground'
																: 'text-foreground border-white/50 bg-transparent',
															isDisabled && 'cursor-not-allowed opacity-50',
															!isDisabled && !isActive && 'hover:border-primary'
														)}
													>
														{fluency.charAt(0).toUpperCase() + fluency.slice(1)}{' '}
														{!isCommon && `(${cost})`}
													</button>
												);
											})}
										</div>
									</div>
								);
							})}
						</div>
					</section>
				))}

				{compatibilitySelections.length > 0 && (
					<section aria-label="Legacy language compatibility" className="space-y-4">
						<div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
							<h3 className="text-base font-semibold tracking-wide text-amber-400 uppercase">
								Legacy Language Compatibility
							</h3>
							<span className="text-muted-foreground text-xs uppercase">Review / Remove Only</span>
						</div>
						<p className="text-muted-foreground text-sm">
							Legacy language IDs that are no longer part of the 0.10.5 catalog, or that would
							otherwise be hidden behind aliases, stay visible here so they cannot remain charged
							but invisible.
						</p>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
							{compatibilitySelections.map((language) => (
								<div
									key={language.id}
									data-testid={`legacy-language-item-${language.id}`}
									className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4"
								>
									<div className="mb-2 flex items-center justify-between gap-3">
										<h4 className="text-lg font-semibold tracking-wide text-amber-300 uppercase">
											{language.name}
										</h4>
										<span className="text-muted-foreground text-xs uppercase">
											{language.fluency}
										</span>
									</div>
									<p className="text-muted-foreground mb-3 text-sm">{language.reason}</p>
									<button
										onClick={() => onLanguageChange(language.id, null)}
										className="rounded-md border border-amber-500/40 px-3 py-1.5 text-sm font-semibold text-amber-200 transition-colors hover:border-amber-400"
									>
										Remove Legacy Selection
									</button>
								</div>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
};

export default LanguagesTab;
