import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppAuth } from '../../components/auth';
import type { SavedCharacter } from '../../lib/types/dataContracts';
import {
	deserializeCharacterFromStorage,
	getInitializedCharacterState
} from '../../lib/utils/storageUtils';
import { getDefaultStorage } from '../../lib/storage';
import { checkSchemaCompatibility, normalizeSchemaVersion } from '../../lib/types/schemaVersion';
import { migrateCharacterSchema } from '../../lib/utils/schemaMigration';
import {
	assessCharacterCompatibility,
	CURRENT_RULES_VERSION
} from '../../lib/rulesdata/versioning/compatibility';
import {
	planCharacterUpgrade,
	upgradeCharacterToCurrentRules
} from '../../lib/rulesdata/versioning/characterUpgrade';
import { normalizeRulesVersion } from '../../lib/rulesdata/versioning/rulesVersion';
import { useNavigate } from 'react-router-dom';
import { downloadCharacterPdf } from '../../lib/pdf/exportPdf';
import { AnimatePresence } from 'framer-motion';
// Shared UI components
import {
	PageContainer,
	Header,
	ButtonRow,
	PageTitle,
	EmptyState,
	EmptyStateTitle,
	EmptyStateText,
	ModalOverlay,
	Modal,
	ModalHeader,
	ModalTitle,
	ModalDescription,
	ModalContent,
	ModalFooter,
	TextArea,
	Message,
	SecondaryButton,
	SuccessButton
} from '../../components/styled/index';
// Page-specific components
import {
	CharacterGrid,
	CharacterCard,
	CharacterName,
	PlayerName,
	CharacterStats,
	StatBlock,
	StatLabel,
	StatValue,
	CharacterDates,
	ButtonGrid,
	CardButton,
	FullWidthButton,
	CompatibilityBadge,
	UpgradeSummary
} from './LoadCharacter.styled';

const getCharacterSortTime = (character: SavedCharacter): number => {
	const value = character.lastModified || character.completedAt || character.createdAt;
	const time = value ? new Date(value).getTime() : 0;
	return Number.isFinite(time) ? time : 0;
};

const sortCharactersNewestFirst = (characters: SavedCharacter[]): SavedCharacter[] =>
	[...characters].sort((a, b) => getCharacterSortTime(b) - getCharacterSortTime(a));

function LoadCharacter() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { isAuthenticated, isLoading: authLoading } = useAppAuth();
	const [savedCharacters, setSavedCharacters] = useState<SavedCharacter[]>([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [characterToDelete, setCharacterToDelete] = useState<SavedCharacter | null>(null);
	const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
	const [characterToUpgrade, setCharacterToUpgrade] = useState<SavedCharacter | null>(null);
	const [forceCreateUpgradeCopy, setForceCreateUpgradeCopy] = useState(false);
	const [isUpgrading, setIsUpgrading] = useState(false);
	const [upgradeMessage, setUpgradeMessage] = useState<{
		text: string;
		type: 'error' | 'success' | 'info';
	} | null>(null);

	// Import functionality state
	const [importModalOpen, setImportModalOpen] = useState(false);
	const [importJsonText, setImportJsonText] = useState('');
	const [importMessage, setImportMessage] = useState<{
		text: string;
		type: 'error' | 'success' | 'info';
	} | null>(null);
	const [isImporting, setIsImporting] = useState(false);
	const storage = useMemo(() => getDefaultStorage(), []);

	useEffect(() => {
		if (authLoading) return;
		console.log('[GIMLI DEBUG] 🎬 LoadCharacter: Fetching characters...', {
			storageType: storage.constructor.name,
			isAuthenticated
		});

		let isMounted = true;
		storage
			.getAllCharacters()
			.then((characters) => {
				console.log('[GIMLI DEBUG] ✅ LoadCharacter: Characters fetched:', {
					count: characters.length,
					characters: characters.map((c) => ({ id: c.id, name: c.finalName }))
				});
				if (isMounted) setSavedCharacters(sortCharactersNewestFirst(characters));
			})
			.catch((error) => {
				console.error('[GIMLI DEBUG] ❌ LoadCharacter: Failed to load characters', error);
				if (isMounted) setSavedCharacters([]);
			});
		return () => {
			isMounted = false;
		};
	}, [storage, isAuthenticated, authLoading]);

	const handleCharacterClick = (character: SavedCharacter) => {
		const compatibility = assessCharacterCompatibility(character);
		if (!compatibility.canEdit) {
			alert(compatibility.reasons[0] || 'This character must be upgraded before editing.');
			return;
		}
		// Edit character
		navigate(`/character/${character.id}/edit`, { state: { editCharacter: character } });
	};

	const handleViewCharacterSheet = (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		navigate(`/character/${character.id}`);
	};

	const findCurrentRulesCopy = (character: SavedCharacter, characters = savedCharacters) =>
		characters.find(
			(candidate) =>
				candidate.rulesUpgradeSourceId === character.id &&
				normalizeRulesVersion(candidate.rulesVersion) === CURRENT_RULES_VERSION
		);

	// Level up handler
	const handleLevelUp = async (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		const rulesCompatibility = assessCharacterCompatibility(character);
		if (!rulesCompatibility.canLevelUp) {
			alert(rulesCompatibility.reasons[0] || 'This character must be upgraded before leveling up.');
			return;
		}

		// Check schema compatibility
		const compatibility = checkSchemaCompatibility(character.schemaVersion);

		if (!compatibility.isCompatible) {
			alert(compatibility.message);
			return;
		}

		// Migrate if needed
		let characterToLoad = character;
		if (compatibility.needsMigration && compatibility.canAutoMigrate) {
			console.log('📦 Migrating character schema before level-up', compatibility.message);
			characterToLoad = migrateCharacterSchema(character);
			// Save migrated version
			const allChars = await storage.getAllCharacters();
			const updated = allChars.map((c) => (c.id === character.id ? characterToLoad : c));
			await storage.saveAllCharacters(updated);
		}

		// Navigate to character creation with level-up state
		navigate('/create-character', {
			state: {
				levelUpCharacter: characterToLoad,
				isLevelUp: true
			}
		});
	};

	const handleDeleteClick = (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		setCharacterToDelete(character);
		setDeleteModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (!characterToDelete) return;

		try {
			await storage.deleteCharacter(characterToDelete.id);
			const updatedCharacters = savedCharacters.filter(
				(char: SavedCharacter) => char.id !== characterToDelete.id
			);
			setSavedCharacters(sortCharactersNewestFirst(updatedCharacters));
		} catch (error) {
			console.error('Failed to delete character', error);
		} finally {
			setDeleteModalOpen(false);
			setCharacterToDelete(null);
		}
	};

	const handleCancelDelete = () => {
		setDeleteModalOpen(false);
		setCharacterToDelete(null);
	};

	const handleOpenCurrentCopy = (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		const existingCopy = findCurrentRulesCopy(character);
		if (existingCopy) {
			navigate(`/character/${existingCopy.id}`);
		}
	};

	const handleUpgradeClick = (
		character: SavedCharacter,
		event: React.MouseEvent,
		options: { forceCreateCopy?: boolean } = {}
	) => {
		event.stopPropagation();
		setCharacterToUpgrade(character);
		setForceCreateUpgradeCopy(Boolean(options.forceCreateCopy));
		setUpgradeModalOpen(true);
		setUpgradeMessage(null);
	};

	const handleUpgradeCancel = () => {
		if (isUpgrading) return;
		setUpgradeModalOpen(false);
		setCharacterToUpgrade(null);
		setForceCreateUpgradeCopy(false);
	};

	const handleConfirmUpgrade = async () => {
		if (!characterToUpgrade) return;

		setIsUpgrading(true);
		setUpgradeMessage(null);
		try {
			if (!forceCreateUpgradeCopy) {
				const existingCopy = findCurrentRulesCopy(characterToUpgrade);
				if (existingCopy) {
					setUpgradeModalOpen(false);
					setCharacterToUpgrade(null);
					setForceCreateUpgradeCopy(false);
					navigate(`/character/${existingCopy.id}`);
					return;
				}
			}

			const existingCopyCount = savedCharacters.filter(
				(character) =>
					character.rulesUpgradeSourceId === characterToUpgrade.id &&
					normalizeRulesVersion(character.rulesVersion) === CURRENT_RULES_VERSION
			).length;
			const copyNumber = existingCopyCount + 1;
			const result = upgradeCharacterToCurrentRules(
				characterToUpgrade,
				forceCreateUpgradeCopy
					? {
							draftIdSuffix: `draft_${copyNumber}`,
							draftNameSuffix: `(v0.10.5 draft ${copyNumber})`
						}
					: undefined
			);

			// Save a new current-rules draft. The legacy source record remains
			// locked and unchanged until the user chooses to delete it.
			await storage.saveCharacter(result.upgradedCharacter);

			setSavedCharacters((characters) =>
				sortCharactersNewestFirst(
					characters.flatMap((character) =>
						character.id === characterToUpgrade.id
							? [character, result.upgradedCharacter]
							: [character]
					)
				)
			);
			setUpgradeMessage({
				text: t('loadCharacter.upgradeSuccess', {
					name: result.upgradedCharacter.finalName
				}),
				type: 'success'
			});
			setUpgradeModalOpen(false);
			setCharacterToUpgrade(null);
			setForceCreateUpgradeCopy(false);
		} catch (error) {
			console.error('Character rules upgrade failed', error);
			setUpgradeMessage({
				text: t('loadCharacter.upgradeError', {
					error: error instanceof Error ? error.message : t('loadCharacter.unknown')
				}),
				type: 'error'
			});
		} finally {
			setIsUpgrading(false);
		}
	};

	const createJsonExport = (character: SavedCharacter) =>
		JSON.stringify(
			{
				...character,
				exportedAt: new Date().toISOString(),
				exportVersion: '1.0'
			},
			null,
			2
		);

	const getSafeCharacterFileName = (character: SavedCharacter, extension: string) => {
		const safeName = (character.finalName || character.id || 'Character')
			.replace(/[^A-Za-z0-9]+/g, '_')
			.replace(/^_+|_+$/g, '')
			.slice(0, 60);
		const rulesVersionLabel = normalizeRulesVersion(character.rulesVersion).replace('dc20-', '');
		return `${safeName || 'Character'}_vDC20-${rulesVersionLabel}.${extension}`;
	};

	const handleCopyJson = async (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		try {
			await navigator.clipboard.writeText(createJsonExport(character));
		} catch (error) {
			console.error('Copy JSON failed', error);
			alert(t('loadCharacter.errorCopyJsonFailed'));
		}
	};

	const handleDownloadJson = (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		try {
			const blob = new Blob([createJsonExport(character)], {
				type: 'application/json'
			});
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = getSafeCharacterFileName(character, 'json');
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Download JSON failed', error);
			alert(t('loadCharacter.errorDownloadJsonFailed'));
		}
	};

	// Import functionality handlers
	const handleImportClick = () => {
		setImportModalOpen(true);
		setImportJsonText('');
		setImportMessage(null);
	};

	const handleImportCancel = () => {
		setImportModalOpen(false);
		setImportJsonText('');
		setImportMessage(null);
		setIsImporting(false);
	};

	const generateNewCharacterId = (): string => {
		return `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	};

	const handleImportCharacter = async () => {
		if (!importJsonText.trim()) {
			setImportMessage({ text: t('loadCharacter.errorPasteJson'), type: 'error' });
			return;
		}

		setIsImporting(true);
		setImportMessage(null);

		try {
			// Parse the JSON
			const parsedData = JSON.parse(importJsonText);

			// Basic validation - check if it looks like a character
			if (!parsedData || typeof parsedData !== 'object') {
				throw new Error(t('loadCharacter.errorInvalidObject'));
			}

			// Check for essential character properties
			const hasRequiredFields =
				parsedData.finalName || parsedData.id || parsedData.ancestry1Id || parsedData.classId;
			if (!hasRequiredFields) {
				throw new Error(t('loadCharacter.errorMissingFields'));
			}

			const normalizedCharacter = deserializeCharacterFromStorage(JSON.stringify(parsedData));
			if (!normalizedCharacter) {
				throw new Error(t('loadCharacter.errorInvalidObject'));
			}

			// Get current characters to check for duplicates
			const existingCharacters = await storage.getAllCharacters();

			// Check if character with same ID already exists
			const existingCharacter = existingCharacters.find(
				(char) => char.id === normalizedCharacter.id
			);

			let characterToImport = { ...normalizedCharacter };

			if (existingCharacter) {
				// Generate new ID for duplicate
				const newId = generateNewCharacterId();
				characterToImport.id = newId;
				characterToImport.finalName = `${parsedData.finalName || t('loadCharacter.importCharacter')} (Copy)`;
				setImportMessage({
					text: t('loadCharacter.infoDuplicateId', { id: parsedData.id, newId }),
					type: 'info'
				});
			}

			// Ensure character has proper structure and update timestamps
			const currentTime = new Date().toISOString();
			characterToImport = {
				...characterToImport,
				id: characterToImport.id || generateNewCharacterId(),
				importedAt: currentTime,
				lastModified: currentTime, // Always update to current time when importing
				schemaVersion: normalizeSchemaVersion(characterToImport.schemaVersion),
				rulesVersion: normalizeRulesVersion(characterToImport.rulesVersion),
				// Ensure character state exists
				characterState:
					characterToImport.characterState || getInitializedCharacterState(characterToImport),
				// Ensure required arrays exist
				selectedTraitIds: characterToImport.selectedTraitIds || [],
				selectedFeatureChoices: characterToImport.selectedFeatureChoices || {},
				skillsData: characterToImport.skillsData || {},
				tradesData: characterToImport.tradesData || {},
				languagesData: characterToImport.languagesData || { common: { fluency: 'fluent' } },
				spells: characterToImport.spells || [],
				maneuvers: characterToImport.maneuvers || []
			};

			// Add to characters list and save
			const updatedCharacters = [...existingCharacters, characterToImport as SavedCharacter];
			await storage.saveAllCharacters(updatedCharacters);
			setSavedCharacters(sortCharactersNewestFirst(updatedCharacters));

			setImportMessage({
				text: t('loadCharacter.successImported', {
					name: characterToImport.finalName || characterToImport.id
				}),
				type: 'success'
			});

			// Close modal after a short delay
			setTimeout(() => {
				handleImportCancel();
			}, 2000);
		} catch (error) {
			console.error('Import error:', error);
			const errorMessage = error instanceof Error ? error.message : t('loadCharacter.unknown');
			setImportMessage({
				text: t('loadCharacter.errorImportFailed', { error: errorMessage }),
				type: 'error'
			});
		} finally {
			setIsImporting(false);
		}
	};

	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			// Check if the date is valid
			if (isNaN(date.getTime())) {
				return t('loadCharacter.unknownDate');
			}
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch {
			return t('loadCharacter.unknownDate');
		}
	};

	const formatAncestry = (ancestry1: string, ancestry2?: string) => {
		if (ancestry2) {
			return `${ancestry1}/${ancestry2}`;
		}
		return ancestry1;
	};

	// Non-disruptive Export PDF handler
	const handleExportPdf = async (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		try {
			await downloadCharacterPdf(character);
		} catch (err) {
			console.error('Export PDF failed', err);
			alert(t('loadCharacter.errorExportPdfFailed'));
		}
	};

	return (
		<PageContainer>
			<Header
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<ButtonRow>
					<SuccessButton
						onClick={handleImportClick}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						{t('loadCharacter.importFromJson')}
					</SuccessButton>
				</ButtonRow>
			</Header>

			<PageTitle
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				{t('loadCharacter.pageTitle')}
			</PageTitle>

			{upgradeMessage && (
				<Message
					$type={upgradeMessage.type}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
				>
					{upgradeMessage.text}
				</Message>
			)}

			{authLoading ? null : savedCharacters.length === 0 ? (
				<EmptyState
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<EmptyStateTitle>{t('loadCharacter.noCharactersTitle')}</EmptyStateTitle>
					<EmptyStateText>
						{t('loadCharacter.noCharactersText')}
						<br />
						{t('loadCharacter.noCharactersHelp')}
					</EmptyStateText>
				</EmptyState>
			) : (
				<CharacterGrid>
					{savedCharacters.map((character, index) => {
						const compatibility = assessCharacterCompatibility(character);
						const isBackup = Boolean(character.rulesUpgradeBackupOf);
						const existingCurrentCopy = findCurrentRulesCopy(character);
						return (
							<CharacterCard
								key={character.id}
								onClick={() => handleCharacterClick(character)}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 * index }}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								{character.rulesUpgradeStatus === 'needs-review' ? (
									<CompatibilityBadge $variant="warning">
										{t('loadCharacter.needsReview')}
									</CompatibilityBadge>
								) : isBackup ? (
									<CompatibilityBadge $variant="backup">
										{t('loadCharacter.legacyBackup')}
									</CompatibilityBadge>
								) : compatibility.state !== 'editable' ? (
									<CompatibilityBadge
										$variant={compatibility.state === 'view-only' ? 'blocked' : 'warning'}
									>
										{compatibility.state === 'view-only'
											? t('loadCharacter.upgradeBlocked')
											: t('loadCharacter.upgradeRequired')}
									</CompatibilityBadge>
								) : null}
								<CharacterName>
									{character.finalName || t('loadCharacter.unnamedCharacter')}
								</CharacterName>

								<PlayerName>
									{t('loadCharacter.playerPrefix')}
									{character.finalPlayerName || t('loadCharacter.unknown')}
								</PlayerName>

								<CharacterStats>
									<StatBlock>
										<StatLabel>{t('loadCharacter.raceLabel')}</StatLabel>
										<StatValue>
											{formatAncestry(
												character.ancestry1Name ||
													character.ancestry1Id ||
													t('loadCharacter.unknown'),
												character.ancestry2Name || character.ancestry2Id
											)}
										</StatValue>
									</StatBlock>

									<StatBlock>
										<StatLabel>{t('loadCharacter.classLabel')}</StatLabel>
										<StatValue>
											{character.className || character.classId || t('loadCharacter.unknown')}
										</StatValue>
									</StatBlock>

									<StatBlock>
										<StatLabel>{t('loadCharacter.levelLabel')}</StatLabel>
										<StatValue>{character.level || 1}</StatValue>
									</StatBlock>
								</CharacterStats>

								<CharacterDates>
									{t('loadCharacter.createdPrefix')}
									{formatDate(character.createdAt || character.completedAt)}
									{character.lastModified &&
										character.lastModified !== character.createdAt &&
										character.lastModified !== character.completedAt && (
											<span>
												{t('loadCharacter.modifiedPrefix')}
												{formatDate(character.lastModified)}
											</span>
										)}
								</CharacterDates>

								<ButtonGrid>
									<CardButton
										$variant="primary"
										onClick={(e) => handleViewCharacterSheet(character, e)}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										{t('loadCharacter.viewSheet')}
									</CardButton>
									<CardButton
										onClick={(e) => handleExportPdf(character, e)}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										{t('loadCharacter.exportPdf')}
									</CardButton>
									<CardButton
										onClick={(e) => handleCopyJson(character, e)}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										{t('loadCharacter.copyJson')}
									</CardButton>
									<CardButton
										onClick={(e) => handleDownloadJson(character, e)}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										{t('loadCharacter.downloadJson')}
									</CardButton>
									<CardButton
										onClick={(e) => {
											e.stopPropagation();
											handleCharacterClick(character);
										}}
										disabled={!compatibility.canEdit}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										{t('loadCharacter.edit')}
									</CardButton>
									<CardButton
										onClick={(e) => handleLevelUp(character, e)}
										disabled={!compatibility.canLevelUp}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										{t('loadCharacter.levelUp')}
									</CardButton>
									{compatibility.state !== 'editable' &&
										!isBackup &&
										(existingCurrentCopy ? (
											<>
												<FullWidthButton
													$variant="primary"
													onClick={(e) => handleOpenCurrentCopy(character, e)}
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
												>
													{t('loadCharacter.openCurrentCopy')}
												</FullWidthButton>
												<FullWidthButton
													onClick={(e) =>
														handleUpgradeClick(character, e, { forceCreateCopy: true })
													}
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
												>
													{t('loadCharacter.createAnotherCopy')}
												</FullWidthButton>
											</>
										) : (
											<FullWidthButton
												$variant={compatibility.state === 'view-only' ? 'danger' : 'primary'}
												onClick={(e) => handleUpgradeClick(character, e)}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
											>
												{compatibility.state === 'view-only'
													? t('loadCharacter.reviewUpgrade')
													: t('loadCharacter.updateToCurrentVersion')}
											</FullWidthButton>
										))}
									<FullWidthButton
										$variant="danger"
										onClick={(e) => handleDeleteClick(character, e)}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										{t('loadCharacter.delete')}
									</FullWidthButton>
								</ButtonGrid>
							</CharacterCard>
						);
					})}
				</CharacterGrid>
			)}

			{/* Rules Upgrade Modal */}
			<AnimatePresence>
				{upgradeModalOpen &&
					characterToUpgrade &&
					(() => {
						const plan = planCharacterUpgrade(characterToUpgrade);
						return (
							<ModalOverlay
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={handleUpgradeCancel}
							>
								<Modal
									initial={{ scale: 0.9, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0.9, opacity: 0 }}
									onClick={(e) => e.stopPropagation()}
								>
									<ModalHeader>
										<ModalTitle>{t('loadCharacter.upgradeModalTitle')}</ModalTitle>
										<ModalDescription>
											{t('loadCharacter.upgradeModalDescription', {
												name: characterToUpgrade.finalName,
												from: plan.sourceRulesVersion,
												to: plan.targetRulesVersion
											})}
										</ModalDescription>
									</ModalHeader>
									<ModalContent>
										<UpgradeSummary>
											<p>{t('loadCharacter.upgradeBackupNote')}</p>
											{plan.automaticRenames.length > 0 && (
												<section>
													<h3>{t('loadCharacter.automaticRenames')}</h3>
													<ul>
														{plan.automaticRenames.map((alias) => (
															<li key={`${alias.domain}:${alias.fromId}`}>
																{alias.fromId} → {alias.toId}
															</li>
														))}
													</ul>
												</section>
											)}
											{plan.reworkedSelections.length > 0 && (
												<section>
													<h3>{t('loadCharacter.reworkedSelections')}</h3>
													<ul>
														{plan.reworkedSelections.map((alias) => (
															<li key={`${alias.domain}:${alias.fromId}`}>
																{alias.fromId} → {alias.toId}
															</li>
														))}
													</ul>
												</section>
											)}
											{plan.deprecatedSelections.length > 0 && (
												<section>
													<h3>{t('loadCharacter.deprecatedRemoved')}</h3>
													<ul>
														{plan.deprecatedSelections.map((alias) => (
															<li key={`${alias.domain}:${alias.fromId}`}>{alias.fromId}</li>
														))}
													</ul>
												</section>
											)}
											{plan.blockers.length > 0 && (
												<section>
													<h3>{t('loadCharacter.upgradeBlockers')}</h3>
													<p>{t('loadCharacter.upgradeBlockedDescription')}</p>
													<ul>
														{plan.blockers.map((alias) => (
															<li key={`${alias.domain}:${alias.fromId}`}>
																{alias.fromId}: {alias.note}
															</li>
														))}
													</ul>
												</section>
											)}
											{plan.automaticRenames.length === 0 &&
												plan.reworkedSelections.length === 0 &&
												plan.deprecatedSelections.length === 0 &&
												plan.blockers.length === 0 && (
													<p>{t('loadCharacter.noSelectionChanges')}</p>
												)}
										</UpgradeSummary>
									</ModalContent>
									<ModalFooter>
										<SecondaryButton
											onClick={handleUpgradeCancel}
											disabled={isUpgrading}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											{t('loadCharacter.cancel')}
										</SecondaryButton>
										<SuccessButton
											onClick={handleConfirmUpgrade}
											disabled={isUpgrading || !plan.canUpgrade}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											{isUpgrading
												? t('loadCharacter.upgrading')
												: t('loadCharacter.confirmUpgrade')}
										</SuccessButton>
									</ModalFooter>
								</Modal>
							</ModalOverlay>
						);
					})()}
			</AnimatePresence>

			{/* Import Character Modal */}
			<AnimatePresence>
				{importModalOpen && (
					<ModalOverlay
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleImportCancel}
					>
						<Modal
							$variant="success"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							onClick={(e) => e.stopPropagation()}
						>
							<ModalHeader>
								<ModalTitle $variant="success">{t('loadCharacter.importModalTitle')}</ModalTitle>
								<ModalDescription>{t('loadCharacter.importModalDescription')}</ModalDescription>
							</ModalHeader>

							<ModalContent>
								<TextArea
									value={importJsonText}
									onChange={(e) => setImportJsonText(e.target.value)}
									placeholder={t('loadCharacter.importPlaceholder')}
								/>

								{importMessage && (
									<Message
										$type={importMessage.type}
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
									>
										{importMessage.text}
									</Message>
								)}
							</ModalContent>

							<ModalFooter>
								<SecondaryButton
									onClick={handleImportCancel}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									{t('loadCharacter.cancel')}
								</SecondaryButton>
								<SuccessButton
									onClick={handleImportCharacter}
									disabled={isImporting || !importJsonText.trim()}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									{isImporting ? t('loadCharacter.importing') : t('loadCharacter.importCharacter')}
								</SuccessButton>
							</ModalFooter>
						</Modal>
					</ModalOverlay>
				)}
			</AnimatePresence>

			{/* Delete Confirmation Modal */}
			<AnimatePresence>
				{deleteModalOpen && (
					<ModalOverlay
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleCancelDelete}
					>
						<Modal
							$variant="danger"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							onClick={(e) => e.stopPropagation()}
						>
							<ModalHeader>
								<ModalTitle $variant="danger">{t('loadCharacter.deleteModalTitle')}</ModalTitle>
								<ModalDescription>
									{t('loadCharacter.deleteModalQuestion')} "
									{characterToDelete?.finalName || t('loadCharacter.unnamedCharacter')}
									"?
									<br />
									{t('loadCharacter.deleteModalWarning')}
								</ModalDescription>
							</ModalHeader>

							<ModalFooter>
								<SecondaryButton
									onClick={handleCancelDelete}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									{t('loadCharacter.cancel')}
								</SecondaryButton>
								<CardButton
									$variant="danger"
									onClick={handleConfirmDelete}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									{t('loadCharacter.delete')}
								</CardButton>
							</ModalFooter>
						</Modal>
					</ModalOverlay>
				)}
			</AnimatePresence>
		</PageContainer>
	);
}

export default LoadCharacter;
