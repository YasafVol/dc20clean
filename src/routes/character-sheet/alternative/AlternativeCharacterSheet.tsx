import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Snackbar, { type SnackbarVariant } from '../../../components/Snackbar';
import { useAppAuth } from '../../../components/auth/AuthModeContext';
import { downloadCharacterPdf } from '../../../lib/pdf/exportPdf';
import { getDefaultStorage } from '../../../lib/storage';
import { getRulebookArticle, getRulebookArticlePath } from '../../rulebook/rulebookData';
import { StatCard } from '../components/new/StatCard';
import {
	useCharacterCalculatedData,
	useCharacterResources,
	useCharacterSheet
} from '../hooks/CharacterSheetProvider';
import {
	ActionMenu,
	CharacterMeta,
	CharacterName,
	ExportTrigger,
	HeaderActions,
	Identity,
	MenuAction,
	MenuLink,
	MenuPanel,
	MenuTrigger,
	MetaLink,
	PageMessage,
	ResourceCardSlot,
	ResourceSection,
	SheetButton,
	SheetContent,
	SheetHeader,
	SheetPage
} from './AlternativeCharacterSheet.styles';

interface Feedback {
	message: string;
	variant: SnackbarVariant;
}

function getArticlePath(articleId?: string): string | undefined {
	return articleId && getRulebookArticle(articleId) ? getRulebookArticlePath(articleId) : undefined;
}

export default function AlternativeCharacterSheet() {
	const { t } = useTranslation();
	const { isAuthenticated, isConvexEnabled } = useAppAuth();
	const {
		state,
		readOnly,
		updateHP,
		updateMP,
		updateSP,
		updateTempHP,
		updateGritPoints,
		updateRestPoints,
		updateExhaustion,
		handleLongRestEvent
	} = useCharacterSheet();
	const resources = useCharacterResources();
	const calculatedData = useCharacterCalculatedData();
	const [feedback, setFeedback] = useState<Feedback | null>(null);

	if (state.loading) {
		return (
			<SheetPage>
				<PageMessage>{t('characterSheet.loading')}</PageMessage>
			</SheetPage>
		);
	}

	const character = state.character;
	if (state.error || !character) {
		return (
			<SheetPage>
				<PageMessage $error>{state.error || t('characterSheet.notFound')}</PageMessage>
			</SheetPage>
		);
	}

	const currentHP = resources?.current.currentHP ?? 0;
	const maxHP = calculatedData?.breakdowns?.hpMax?.total ?? character.finalHPMax ?? 0;
	const minHP = -(
		calculatedData?.stats?.finalDeathThreshold ??
		character.finalDeathThreshold ??
		character.finalPrimeModifierValue + character.finalCombatMastery
	);
	const tempHP = resources?.current.tempHP ?? 0;
	const currentMP = resources?.current.currentMP ?? 0;
	const maxMP = calculatedData?.breakdowns?.mpMax?.total ?? character.finalMPMax ?? 0;
	const currentSP = resources?.current.currentSP ?? 0;
	const maxSP = calculatedData?.breakdowns?.spMax?.total ?? character.finalSPMax ?? 0;
	const currentRest = resources?.current.currentRestPoints ?? 0;
	const maxRest = calculatedData?.breakdowns?.restPoints?.total ?? character.finalRestPoints ?? 0;
	const currentGrit = resources?.current.currentGritPoints ?? 0;
	const maxGrit = calculatedData?.breakdowns?.gritPoints?.total ?? character.finalGritPoints ?? 0;

	const classPath = getArticlePath(`classes/${character.classId}`);
	const ancestry1Path = getArticlePath(
		character.ancestry1Id ? `ancestries/${character.ancestry1Id}` : undefined
	);
	const ancestry2Path = getArticlePath(
		character.ancestry2Id ? `ancestries/${character.ancestry2Id}` : undefined
	);
	const ancestry2Name =
		character.ancestry2Name?.trim().toLowerCase() === 'unknown'
			? undefined
			: character.ancestry2Name?.trim();

	const showFeedback = (message: string, variant: SnackbarVariant) => {
		setFeedback({ message, variant });
	};

	const handleLongRest = () => {
		if (!window.confirm(t('characterSheet.longRestConfirm'))) return;
		updateHP(maxHP);
		updateMP(maxMP);
		updateSP(maxSP);
		updateRestPoints(maxRest);
		updateTempHP(0);
		updateExhaustion(0);
		handleLongRestEvent();
		showFeedback(t('characterSheet.longRestDone'), 'success');
	};

	const handleExportPdf = async () => {
		try {
			const storedCharacter =
				(await getDefaultStorage().getCharacterById(character.id)) ?? character;
			await downloadCharacterPdf(storedCharacter);
		} catch (exportError) {
			showFeedback(
				`Failed to export PDF: ${
					exportError instanceof Error ? exportError.message : String(exportError)
				}`,
				'error'
			);
		}
	};

	const handleDownloadJson = () => {
		// Export serialization only; character state remains a native object in context.
		// eslint-disable-next-line no-restricted-syntax
		const json = JSON.stringify(character, null, 2);
		const blob = new Blob([json], { type: 'application/json' });
		const safeName = (character.finalName || character.id || 'Character')
			.replace(/[^A-Za-z0-9]+/g, '_')
			.replace(/^_+|_+$/g, '')
			.slice(0, 60);
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = `${safeName || 'Character'}.json`;
		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
		URL.revokeObjectURL(url);
		showFeedback('Character JSON downloaded.', 'success');
	};

	const handleCopyJson = async () => {
		try {
			// Export serialization only; character state remains a native object in context.
			// eslint-disable-next-line no-restricted-syntax
			await navigator.clipboard.writeText(JSON.stringify(character, null, 2));
			showFeedback('Character JSON copied to clipboard.', 'success');
		} catch {
			showFeedback('Failed to copy character JSON.', 'error');
		}
	};

	return (
		<SheetPage>
			<SheetContent>
				<SheetHeader>
					<ActionMenu>
						<MenuTrigger aria-label="Open main navigation">☰</MenuTrigger>
						<MenuPanel aria-label="Main navigation">
							<MenuLink to="/menu">Menu</MenuLink>
							<MenuLink to="/create-character">{t('menu.createCharacter')}</MenuLink>
							<MenuLink to="/load-character">{t('menu.loadCharacter')}</MenuLink>
							<MenuLink to="/spellbook">{t('menu.spellbook')}</MenuLink>
							<MenuLink to="/martial-manual">{t('menu.martialManual')}</MenuLink>
							<MenuLink to="/conditions">{t('menu.conditions')}</MenuLink>
							<MenuLink to="/custom-equipment">{t('menu.equipage')}</MenuLink>
							<MenuLink to="/rulebook">{t('menu.rulebook')}</MenuLink>
							{isAuthenticated && (
								<>
									<MenuLink to="/dm/encounters">{t('menu.encounterPlanner')}</MenuLink>
									<MenuLink to="/dm/monsters">{t('menu.laboratory')}</MenuLink>
								</>
							)}
							{isAuthenticated && isConvexEnabled && (
								<>
									<MenuLink to="/campaigns">{t('menu.myCampaigns')}</MenuLink>
									<MenuLink to="/campaigns/join">{t('menu.joinCampaign')}</MenuLink>
								</>
							)}
						</MenuPanel>
					</ActionMenu>

					<Identity>
						<CharacterName>
							{character.finalName || t('characterSheet.unnamedCharacter')}
						</CharacterName>
						<CharacterMeta>
							<span>
								{t('characterSheet.level')} {character.level || 1}
							</span>
							{classPath ? (
								<MetaLink to={classPath}>
									{character.className || t('characterSheet.adventurer')}
								</MetaLink>
							) : (
								<span>{character.className || t('characterSheet.adventurer')}</span>
							)}
							{ancestry1Path ? (
								<MetaLink to={ancestry1Path}>
									{character.ancestry1Name || t('characterSheet.unknown')}
								</MetaLink>
							) : (
								<span>{character.ancestry1Name || t('characterSheet.unknown')}</span>
							)}
							{ancestry2Name &&
								(ancestry2Path ? (
									<MetaLink to={ancestry2Path}>{ancestry2Name}</MetaLink>
								) : (
									<span>{ancestry2Name}</span>
								))}
						</CharacterMeta>
					</Identity>

					<HeaderActions>
						<SheetButton
							type="button"
							onClick={handleLongRest}
							disabled={readOnly}
							title={t('characterSheet.longRestTitle')}
						>
							🌙 {t('characterSheet.longRest')}
						</SheetButton>
						<ActionMenu>
							<ExportTrigger>{t('characterSheet.export')}</ExportTrigger>
							<MenuPanel $align="right" aria-label="Export character">
								<MenuAction type="button" onClick={handleExportPdf}>
									{t('characterSheet.exportPdf')}
								</MenuAction>
								<MenuAction type="button" onClick={handleDownloadJson}>
									{t('characterSheet.downloadJson')}
								</MenuAction>
								<MenuAction type="button" onClick={handleCopyJson}>
									Copy to Clipboard
								</MenuAction>
							</MenuPanel>
						</ActionMenu>
					</HeaderActions>
				</SheetHeader>

				<ResourceSection aria-label="Character resources">
					<ResourceCardSlot>
						<StatCard
							label="HP"
							current={currentHP}
							max={maxHP}
							min={minHP}
							temp={tempHP}
							color="health"
							size="medium"
							editable={!readOnly}
							onChange={updateHP}
							onTempChange={updateTempHP}
						/>
					</ResourceCardSlot>
					{maxMP > 0 && (
						<ResourceCardSlot>
							<StatCard
								label="Mana"
								current={currentMP}
								max={maxMP}
								color="mana"
								size="medium"
								editable={!readOnly}
								onChange={updateMP}
							/>
						</ResourceCardSlot>
					)}
					{maxSP > 0 && (
						<ResourceCardSlot>
							<StatCard
								label="Stamina"
								current={currentSP}
								max={maxSP}
								color="stamina"
								size="medium"
								editable={!readOnly}
								onChange={updateSP}
							/>
						</ResourceCardSlot>
					)}
					<ResourceCardSlot>
						<StatCard
							label="Rest"
							current={currentRest}
							max={maxRest}
							color="grit"
							size="medium"
							editable={!readOnly}
							onChange={updateRestPoints}
						/>
					</ResourceCardSlot>
					<ResourceCardSlot>
						<StatCard
							label="Grit"
							current={currentGrit}
							max={maxGrit}
							color="grit"
							size="medium"
							editable={!readOnly}
							onChange={updateGritPoints}
						/>
					</ResourceCardSlot>
				</ResourceSection>
			</SheetContent>

			<Snackbar
				message={feedback?.message ?? ''}
				isVisible={feedback !== null}
				variant={feedback?.variant}
				onClose={() => setFeedback(null)}
			/>
		</SheetPage>
	);
}
