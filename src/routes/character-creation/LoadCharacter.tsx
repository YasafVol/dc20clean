import { useState, useEffect, useMemo } from 'react';
import type { SavedCharacter } from '../../lib/types/dataContracts';
import { getInitializedCharacterState } from '../../lib/utils/storageUtils';
import { getDefaultStorage } from '../../lib/storage';
import { checkSchemaCompatibility } from '../../lib/types/schemaVersion';
import { migrateCharacterSchema } from '../../lib/utils/schemaMigration';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter
} from '../../components/ui/dialog';
import { cn } from '../../lib/utils';

function LoadCharacter() {
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
		
		console.log('[GIMLI DEBUG] 🎬 LoadCharacter: Fetching characters...', {
			storageType: storage.constructor.name
		});
		
		let isMounted = true;
		storage
			.getAllCharacters()
			.then((characters) => {
				console.log('[GIMLI DEBUG] ✅ LoadCharacter: Characters fetched:', {
					count: characters.length,
					characters: characters.map(c => ({ id: c.id, name: c.finalName }))
				});
				if (isMounted) setSavedCharacters(characters);
			})
			.catch((error) => {
				console.error('[GIMLI DEBUG] ❌ LoadCharacter: Failed to load characters', error);
c => ({ id: c.id, name: c.finalName }))
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
			setImportMessage({ text: 'Please paste character JSON data', type: 'error' });
			return;
		}

		setIsImporting(true);
		setImportMessage(null);

		try {
			// Parse the JSON
			const parsedData = JSON.parse(importJsonText);

			// Basic validation - check if it looks like a character
			if (!parsedData || typeof parsedData !== 'object') {
				throw new Error('Invalid character data: not a valid object');
			}

			// Check for essential character properties
			const hasRequiredFields =
				parsedData.finalName || parsedData.id || parsedData.ancestry1Id || parsedData.classId;
			if (!hasRequiredFields) {
				throw new Error('Invalid character data: missing required character fields');
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
				characterToImport.finalName = `${parsedData.finalName || 'Imported Character'} (Copy)`;
				setImportMessage({
					text: `Character with ID "${parsedData.id}" already exists. Importing as new character with ID "${newId}"`,
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
				text: `Successfully imported character "${characterToImport.finalName || characterToImport.id}"!`,
				type: 'success'
			});

			// Close modal after a short delay
			setTimeout(() => {
				handleImportCancel();
			}, 2000);
		} catch (error) {
			console.error('Import error:', error);
			const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
			setImportMessage({
				text: `Failed to import character: ${errorMessage}`,
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
				return 'Unknown Date';
			}
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch (error) {
			return 'Unknown Date';
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
			alert('Failed to export PDF');
		}
	};

	return (
		<div className="bg-background min-h-screen bg-[url('/src/assets/BlackBG.jpg')] bg-cover bg-center p-8">
			{/* Button Row */}
			<div className="mb-8 flex gap-4">
				<Button variant="secondary" onClick={() => navigate('/menu')} className="font-bold">
					← Back to Menu
				</Button>
				<Button
					variant="outline"
					onClick={handleImportClick}
					className="border-emerald-500 font-bold text-emerald-500 hover:bg-emerald-500 hover:text-white"
				>
					📥 Import from JSON
				</Button>
			</div>

			{/* Title */}
			<h1 className="font-cinzel text-primary mb-8 text-center text-3xl font-bold tracking-wide drop-shadow-lg">
				Load Character
			</h1>

			{savedCharacters.length === 0 ? (
				<div className="text-muted-foreground py-16 text-center">
					<h2 className="text-primary mb-4 text-2xl">No Saved Characters</h2>
					<p className="text-base leading-relaxed">
						You haven't created any characters yet.
						<br />
						Go back to the menu and create your first character!
					</p>
				</div>
			) : (
				<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{savedCharacters.map((character) => (
						<Card
							key={character.id}
							className="hover:border-primary border-purple-500 bg-gradient-to-br from-indigo-950 to-indigo-900 shadow-lg shadow-purple-500/30 transition-all hover:-translate-y-1 hover:shadow-xl"
						>
							<CardContent className="p-6">
								<h2 className="text-primary mb-4 text-center text-xl font-bold">
									{character.finalName || 'Unnamed Character'}
								</h2>

								<p className="text-foreground/80 mb-4 text-center">
									Player: {character.finalPlayerName || 'Unknown'}
								</p>

								<div className="mb-4 flex items-center justify-between">
									<div className="text-center">
										<div className="text-xs font-bold tracking-wide text-purple-400 uppercase">
											Race
										</div>
										<div className="text-foreground mt-1 font-bold">
											{formatAncestry(
												character.ancestry1Name || character.ancestry1Id || 'Unknown',
												character.ancestry2Name || character.ancestry2Id
											)}
										</div>
									</div>

									<div className="text-center">
										<div className="text-xs font-bold tracking-wide text-purple-400 uppercase">
											Class
										</div>
										<div className="text-foreground mt-1 font-bold">
											{character.className || character.classId || 'Unknown'}
										</div>
									</div>
								</div>

								<p className="text-muted-foreground mb-4 text-center text-sm italic">
									Created: {formatDate(character.createdAt || character.completedAt)}
									{character.lastModified &&
										character.lastModified !== character.createdAt &&
										character.lastModified !== character.completedAt && (
											<span className="block">
												Last Modified: {formatDate(character.lastModified)}
											</span>
										)}
								</p>

								<div className="mt-4 grid grid-cols-2 gap-2">
									<Button
										variant="default"
										size="sm"
										onClick={(e) => handleViewCharacterSheet(character, e)}
										className="font-bold"
									>
										View Sheet
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={(e) => handleExportPdf(character, e)}
										title="Export this character to a fillable PDF"
										className="border-purple-500 font-bold text-purple-400 hover:bg-purple-500 hover:text-white"
									>
										Export PDF
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleCharacterClick(character)}
										className="border-purple-500 font-bold text-purple-400 hover:bg-purple-500 hover:text-white"
									>
										Edit
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={(e) => handleLevelUp(character, e)}
										className="border-purple-500 font-bold text-purple-400 hover:bg-purple-500 hover:text-white"
									>
										Level Up
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={(e) => handleDeleteClick(character, e)}
										className="col-span-2 border-red-500 font-bold text-red-500 hover:bg-red-500 hover:text-white"
									>
										Delete
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			{/* Import Character Modal */}
			<Dialog open={importModalOpen} onOpenChange={setImportModalOpen}>
				<DialogContent className="max-w-xl border-emerald-500">
					<DialogHeader>
						<DialogTitle className="text-center text-emerald-500">
							Import Character from JSON
						</DialogTitle>
						<DialogDescription className="text-foreground/80">
							Paste the character JSON data from the clipboard (exported from character sheet):
						</DialogDescription>
					</DialogHeader>

					<textarea
						value={importJsonText}
						onChange={(e) => setImportJsonText(e.target.value)}
						placeholder="Paste character JSON data here..."
						className="border-border text-foreground placeholder:text-muted-foreground min-h-[300px] w-full resize-y rounded-lg border-2 bg-black/30 p-4 font-mono text-sm focus:border-emerald-500 focus:outline-none"
					/>

					{importMessage && (
						<p
							className={cn(
								'rounded-md border p-3 text-sm',
								importMessage.type === 'error' && 'border-red-500 bg-red-500/10 text-red-500',
								importMessage.type === 'success' &&
									'border-emerald-500 bg-emerald-500/10 text-emerald-500',
								importMessage.type === 'info' && 'border-blue-500 bg-blue-500/10 text-blue-500'
							)}
						>
							{importMessage.text}
						</p>
					)}

					<DialogFooter className="flex justify-center gap-4">
						<Button variant="outline" onClick={handleImportCancel}>
							Cancel
						</Button>
						<Button
							onClick={handleImportCharacter}
							disabled={isImporting || !importJsonText.trim()}
							className="bg-emerald-500 text-white hover:bg-emerald-600"
						>
							{isImporting ? 'Importing...' : 'Import Character'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation Modal */}
			<Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
				<DialogContent className="max-w-md border-red-500">
					<DialogHeader>
						<DialogTitle className="text-center text-red-500">Delete Character</DialogTitle>
						<DialogDescription className="text-foreground text-center leading-relaxed">
							Are you sure you want to delete "{characterToDelete?.finalName || 'Unnamed Character'}
							"?
							<br />
							This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="flex justify-center gap-4">
						<Button variant="outline" onClick={handleCancelDelete}>
							Cancel
						</Button>
						<Button variant="destructive" onClick={handleConfirmDelete}>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default LoadCharacter;
