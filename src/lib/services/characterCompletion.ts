// Shared character completion service
// Handles the completion flow with proper stat calculation, snackbar, and navigation

import { calculateCharacterStats, type CharacterInProgressData } from './characterCalculator';

export interface CharacterCompletionCallbacks {
  onShowSnackbar: (message: string) => void;
  onNavigateToLoad: () => void;
}

export const completeCharacter = async (
  characterState: any,
  callbacks: CharacterCompletionCallbacks
): Promise<void> => {
  try {
    // Character is complete, prepare the data for calculation
    const characterInProgress: CharacterInProgressData = {
      id: Date.now().toString(),
      attribute_might: characterState.attribute_might,
      attribute_agility: characterState.attribute_agility,
      attribute_charisma: characterState.attribute_charisma,
      attribute_intelligence: characterState.attribute_intelligence,
      level: characterState.level || 1,
      combatMastery: characterState.combatMastery || 1,
      classId: characterState.classId,
      ancestry1Id: characterState.ancestry1Id,
      ancestry2Id: characterState.ancestry2Id,
      selectedTraitIds: characterState.selectedTraitIds || '',
      selectedFeatureChoices: characterState.selectedFeatureChoices || '',
      // Save Masteries selection
      saveMasteryMight: characterState.saveMasteryMight || false,
      saveMasteryAgility: characterState.saveMasteryAgility || false,
      saveMasteryCharisma: characterState.saveMasteryCharisma || false,
      saveMasteryIntelligence: characterState.saveMasteryIntelligence || false,
      finalName: characterState.finalName,
      finalPlayerName: characterState.finalPlayerName,
      skillsJson: characterState.skillsJson || '', // Default empty for now
      tradesJson: characterState.tradesJson || '', // Default empty for now  
      languagesJson: characterState.languagesJson || '', // Default empty for now
      createdAt: new Date(),
      completedAt: new Date().toISOString()
    };
    
    console.log('Calculating stats for character:', characterInProgress);
    console.log('Save Masteries selected:', {
      might: characterInProgress.saveMasteryMight,
      agility: characterInProgress.saveMasteryAgility,
      charisma: characterInProgress.saveMasteryCharisma,
      intelligence: characterInProgress.saveMasteryIntelligence
    });
    
    // Calculate all derived stats using DC20 rules
    const completedCharacterData = await calculateCharacterStats(characterInProgress);
    console.log('Character stats calculated:', completedCharacterData);
    console.log('Class info saved:', { classId: completedCharacterData.classId, className: completedCharacterData.className });
    console.log('Ancestry info saved:', { 
      ancestry1Id: completedCharacterData.ancestry1Id, 
      ancestry1Name: completedCharacterData.ancestry1Name,
      ancestry2Id: completedCharacterData.ancestry2Id, 
      ancestry2Name: completedCharacterData.ancestry2Name 
    });
    
    // Save to local storage
    const existingCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
    existingCharacters.push(completedCharacterData);
    localStorage.setItem('savedCharacters', JSON.stringify(existingCharacters));
    console.log('Character saved to localStorage. Total characters:', existingCharacters.length);
    
    // Show success snackbar
    callbacks.onShowSnackbar('Character created successfully!');
    
    // Navigate to load characters page after a short delay
    setTimeout(() => {
      console.log('Navigating to character load page...');
      callbacks.onNavigateToLoad();
    }, 1500);
    
    console.log('Character completed with calculated stats:', completedCharacterData);
  } catch (error) {
    console.error('Error completing character:', error);
    callbacks.onShowSnackbar('Error creating character. Please try again.');
  }
};
