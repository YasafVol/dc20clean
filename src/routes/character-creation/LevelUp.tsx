import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { SavedCharacter } from '../../lib/types/dataContracts';
import { getDefaultStorage } from '../../lib/storage';

const LevelUp: React.FC = () => {
	const { id } = useParams();
	const storage = useMemo(() => getDefaultStorage(), []);
	const [character, setCharacter] = useState<SavedCharacter | null>(null);

	useEffect(() => {
		let isMounted = true;
		if (!id) {
			setCharacter(null);
			return;
		}
		storage
			.getCharacterById(id)
			.then((loaded) => {
				if (isMounted) setCharacter(loaded);
			})
			.catch((error) => {
				console.error('Failed to load character for level up', error);
				if (isMounted) setCharacter(null);
			});
		return () => {
			isMounted = false;
		};
	}, [id, storage]);

	const handleLevelUp = async () => {
		if (!character) return;
		// For now, just increment the level and call onComplete
		const updatedCharacter = {
			...character,
			level: (character.level || 1) + 1
		};
		await storage.saveCharacter(updatedCharacter);
		// onComplete(updatedCharacter); // Remove or refactor as needed
	};

	if (!character) {
		return <div style={{ padding: '20px', color: '#e5e7eb' }}>Character not found.</div>;
	}
	return (
		<div style={{ padding: '20px', color: '#e5e7eb' }}>
			<h2>Level Up: {character.finalName}</h2>
			<p>Current Level: {character.level || 1}</p>
			<p>New Level: {(character.level || 1) + 1}</p>
			<div style={{ marginTop: '20px' }}>
				<button
					onClick={handleLevelUp}
					style={{
						backgroundColor: '#fbbf24',
						color: '#1e1b4b',
						padding: '10px 20px',
						border: 'none',
						borderRadius: '4px',
						marginRight: '10px',
						cursor: 'pointer'
					}}
				>
					Complete Level Up
				</button>
				{/* TODO: Implement Cancel/Back logic if needed */}
			</div>
		</div>
	);
};

export default LevelUp;
