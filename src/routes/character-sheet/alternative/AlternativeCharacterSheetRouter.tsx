import { useEffect, useState } from 'react';
import type { SavedCharacter } from '../../../lib/types/dataContracts';
import { getDefaultStorage } from '../../../lib/storage';
import { CharacterSheetProvider } from '../hooks/CharacterSheetProvider';
import AlternativeCharacterSheet from './AlternativeCharacterSheet';
import { PageMessage, SheetPage } from './AlternativeCharacterSheet.styles';

interface AlternativeCharacterSheetRouterProps {
	characterId?: string;
}

export function selectMostRecentlyModifiedCharacter(
	characters: SavedCharacter[]
): SavedCharacter | null {
	return (
		[...characters].sort((left, right) => {
			const leftTime = Date.parse(left.lastModified || left.completedAt || left.createdAt);
			const rightTime = Date.parse(right.lastModified || right.completedAt || right.createdAt);
			return (Number.isNaN(rightTime) ? 0 : rightTime) - (Number.isNaN(leftTime) ? 0 : leftTime);
		})[0] ?? null
	);
}

function AlternativeCharacterSheetWithProvider({ characterId }: { characterId: string }) {
	return (
		<CharacterSheetProvider characterId={characterId}>
			<AlternativeCharacterSheet />
		</CharacterSheetProvider>
	);
}

export default function AlternativeCharacterSheetRouter({
	characterId
}: AlternativeCharacterSheetRouterProps) {
	const [resolvedId, setResolvedId] = useState<string | null>(characterId ?? null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (characterId) {
			setResolvedId(characterId);
			setError(null);
			return;
		}

		let cancelled = false;
		getDefaultStorage()
			.getAllCharacters()
			.then((characters) => {
				if (cancelled) return;
				const latestCharacter = selectMostRecentlyModifiedCharacter(characters);
				if (latestCharacter) {
					setResolvedId(latestCharacter.id);
				} else {
					setError('No saved characters found.');
				}
			})
			.catch((loadError) => {
				if (cancelled) return;
				setError(
					`Failed to load characters: ${
						loadError instanceof Error ? loadError.message : String(loadError)
					}`
				);
			});

		return () => {
			cancelled = true;
		};
	}, [characterId]);

	if (error) {
		return (
			<SheetPage>
				<PageMessage $error>{error}</PageMessage>
			</SheetPage>
		);
	}

	if (!resolvedId) {
		return (
			<SheetPage>
				<PageMessage>Loading character...</PageMessage>
			</SheetPage>
		);
	}

	return <AlternativeCharacterSheetWithProvider characterId={resolvedId} />;
}
