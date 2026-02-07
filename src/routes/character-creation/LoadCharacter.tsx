import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { SavedCharacter } from '../../lib/types/dataContracts';
import { getInitializedCharacterState } from '../../lib/utils/storageUtils';
import { getDefaultStorage } from '../../lib/storage';
import { checkSchemaCompatibility } from '../../lib/types/schemaVersion';
import { migrateCharacterSchema } from '../../lib/utils/schemaMigration';
import { useNavigate } from 'react-router-dom';
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
	FullWidthButton
} from './LoadCharacter.styled';

function LoadCharacter() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [savedCharacters, setSavedCharacters] = useState<SavedCharacter[]>([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [characterToDelete, setCharacterToDelete] = useState<SavedCharacter | null>(null);

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
		console.log('[GIMLI DEBUG] 🎬 LoadCharacter: Fetching characters...', {
			storageType: storage.constructor.name
		});

		let isMounted = true;
		storage
			.getAllCharacters()
			.then((characters) => {
				console.log('[GIMLI DEBUG] ✅ LoadCharacter: Characters fetched:', {
					count: characters.length,
					characters: characters.map((c) => ({ id: c.id, name: c.finalName }))
				});
				if (isMounted) setSavedCharacters(characters);
			})
			.catch((error) => {
				console.error('[GIMLI DEBUG] ❌ LoadCharacter: Failed to load characters', error);
				if (isMounted) setSavedCharacters([]);
			});
		return () => {
			isMounted = false;
		};
	}, [storage]);

	const handleCharacterClick = (character: SavedCharacter) => {
		// Edit character
		navigate(`/character/${character.id}/edit`, { state: { editCharacter: character } });
	};

	const handleViewCharacterSheet = (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		navigate(`/character/${character.id}`);
	};

	// Level up handler
	const handleLevelUp = async (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();

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
			setSavedCharacters(updatedCharacters);
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

			// Get current characters to check for duplicates
			const existingCharacters = await storage.getAllCharacters();

			// Check if character with same ID already exists
			const existingCharacter = existingCharacters.find((char) => char.id === parsedData.id);

			let characterToImport = { ...parsedData };

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
				schemaVersion: 2,
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
			setSavedCharacters(updatedCharacters);

			setImportMessage({
				text: t('loadCharacter.successImported', { name: characterToImport.finalName || characterToImport.id }),
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
			const [pdf, calc, denormMod] = await Promise.all([
				import('../../lib/pdf/transformers'),
				import('../../lib/services/enhancedCharacterCalculator'),
				import('../../lib/services/denormalizeMastery')
			]);
			const { fillPdfFromData } = await import('../../lib/pdf/fillPdf');
			// Build enhanced data from saved character and compute fresh stats
			const buildData = calc.convertToEnhancedBuildData({
				...character,
				attribute_might: character.finalMight,
				attribute_agility: character.finalAgility,
				attribute_charisma: character.finalCharisma,
				attribute_intelligence: character.finalIntelligence,
				classId: character.classId,
				ancestry1Id: character.ancestry1Id,
				ancestry2Id: character.ancestry2Id,
				selectedTraitIds: character.selectedTraitIds || [],
				selectedTraitChoices: (character as any).selectedTraitChoices || {},
				featureChoices: character.selectedFeatureChoices || {},
				skillsData: character.skillsData || {},
				tradesData: character.tradesData || {},
				languagesData: character.languagesData || { common: { fluency: 'fluent' } }
			});
			const calcResult = calc.calculateCharacterWithBreakdowns(buildData);
			// Use existing denorm if present; otherwise compute now to avoid PDF-only math
			const denorm =
				character.masteryLadders &&
				character.skillTotals &&
				character.knowledgeTradeMastery &&
				character.languageMastery
					? ({
							masteryLadders: character.masteryLadders,
							skillTotals: (character as any).skillTotals,
							knowledgeTradeMastery: (character as any).knowledgeTradeMastery,
							languageMastery: (character as any).languageMastery
						} as any)
					: denormMod.denormalizeMastery({
							finalAttributes: {
								might: calcResult.stats.finalMight,
								agility: calcResult.stats.finalAgility,
								charisma: calcResult.stats.finalCharisma,
								intelligence: calcResult.stats.finalIntelligence,
								prime: calcResult.stats.finalPrimeModifierValue
							},
							skillsRanks: character.skillsData || {},
							tradesRanks: character.tradesData || {},
							languagesData: character.languagesData || { common: { fluency: 'fluent' } }
						});
			const pdfData = pdf.transformCalculatedCharacterToPdfData(calcResult, {
				saved: character,
				denorm
			});
			const blob = await fillPdfFromData(pdfData, { flatten: false, version: '0.10' });
			const safeName = (character.finalName || character.id || 'Character')
				.replace(/[^A-Za-z0-9]+/g, '_')
				.replace(/^_+|_+$/g, '')
				.slice(0, 60);
			const fileName = `${safeName}_vDC20-0.10.pdf`;
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
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

			{savedCharacters.length === 0 ? (
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
					{savedCharacters.map((character, index) => (
						<CharacterCard
							key={character.id}
							onClick={() => handleCharacterClick(character)}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 * index }}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<CharacterName>{character.finalName || t('loadCharacter.unnamedCharacter')}</CharacterName>

							<PlayerName>{t('loadCharacter.playerPrefix')}{character.finalPlayerName || t('loadCharacter.unknown')}</PlayerName>

							<CharacterStats>
								<StatBlock>
									<StatLabel>{t('loadCharacter.raceLabel')}</StatLabel>
									<StatValue>
										{formatAncestry(
											character.ancestry1Name || character.ancestry1Id || t('loadCharacter.unknown'),
											character.ancestry2Name || character.ancestry2Id
										)}
									</StatValue>
								</StatBlock>

								<StatBlock>
									<StatLabel>{t('loadCharacter.classLabel')}</StatLabel>
									<StatValue>{character.className || character.classId || t('loadCharacter.unknown')}</StatValue>
								</StatBlock>

								<StatBlock>
									<StatLabel>{t('loadCharacter.levelLabel')}</StatLabel>
									<StatValue>{character.level || 1}</StatValue>
								</StatBlock>
							</CharacterStats>

							<CharacterDates>
								{t('loadCharacter.createdPrefix')}{formatDate(character.createdAt || character.completedAt)}
								{character.lastModified &&
									character.lastModified !== character.createdAt &&
									character.lastModified !== character.completedAt && (
										<span>{t('loadCharacter.modifiedPrefix')}{formatDate(character.lastModified)}</span>
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
									onClick={(e) => {
										e.stopPropagation();
										handleCharacterClick(character);
									}}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									{t('loadCharacter.edit')}
								</CardButton>
								<CardButton
									onClick={(e) => handleLevelUp(character, e)}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									{t('loadCharacter.levelUp')}
								</CardButton>
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
					))}
				</CharacterGrid>
			)}

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
								<ModalDescription>
									{t('loadCharacter.importModalDescription')}
								</ModalDescription>
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
									{t('loadCharacter.deleteModalQuestion')} "{characterToDelete?.finalName || t('loadCharacter.unnamedCharacter')}
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
