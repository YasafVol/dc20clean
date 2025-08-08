import React from 'react';
import type { SavedCharacter } from '../../lib/utils/characterEdit';

interface LevelUpProps {
	character: SavedCharacter;
	onComplete: (updatedCharacter: SavedCharacter) => void;
	onBack: () => void;
}

const LevelUp: React.FC<LevelUpProps> = ({ character, onComplete, onBack }) => {
	const handleLevelUp = () => {
		// For now, just increment the level and call onComplete
		const updatedCharacter = {
			...character,
			level: (character.level || 1) + 1
		};
		onComplete(updatedCharacter);
	};

	return (
		<div style={{ padding: '20px', color: '#e5e7eb' }}>
			<h2>Level Up: {character.name}</h2>
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
				<button 
					onClick={onBack}
					style={{
						backgroundColor: '#6b7280',
						color: '#ffffff',
						padding: '10px 20px',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer'
					}}
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default LevelUp;
