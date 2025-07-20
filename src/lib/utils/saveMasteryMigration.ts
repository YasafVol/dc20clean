// Utility to update existing characters with Save Mastery data
// Run this once to fix old characters that don't have Save Mastery selections

export const updateCharactersWithSaveMasteries = () => {
  const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
  
  const updatedCharacters = savedCharacters.map((character: any) => {
    // If character already has Save Mastery data, don't modify it
    if (character.finalSaveMasteryMight !== undefined) {
      return character;
    }

    // For old characters, we need to guess which attributes should have Save Mastery
    // Since we can't know the original selection, we'll default to no Save Mastery
    // But we'll calculate the proper save values
    
    const combatMastery = character.finalCombatMastery || 1;
    
    // Default: no Save Mastery for old characters (just attribute values)
    character.finalSaveMasteryMight = character.finalMight || 0;
    character.finalSaveMasteryAgility = character.finalAgility || 0;
    character.finalSaveMasteryCharisma = character.finalCharisma || 0;
    character.finalSaveMasteryIntelligence = character.finalIntelligence || 0;
    
    console.log(`Updated character ${character.finalName} with Save Mastery data (no masteries selected)`);
    
    return character;
  });
  
  localStorage.setItem('savedCharacters', JSON.stringify(updatedCharacters));
  console.log('All characters updated with Save Mastery data');
  
  return updatedCharacters;
};

// Function to manually set Save Masteries for a specific character
export const setCharacterSaveMasteries = (
  characterId: string, 
  masterySelections: {
    might: boolean;
    agility: boolean;
    charisma: boolean;
    intelligence: boolean;
  }
) => {
  const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
  
  const updatedCharacters = savedCharacters.map((character: any) => {
    if (character.id === characterId) {
      const combatMastery = character.finalCombatMastery || 1;
      
      // Calculate Save Masteries based on selections
      character.finalSaveMasteryMight = masterySelections.might 
        ? (character.finalMight || 0) + combatMastery 
        : (character.finalMight || 0);
        
      character.finalSaveMasteryAgility = masterySelections.agility 
        ? (character.finalAgility || 0) + combatMastery 
        : (character.finalAgility || 0);
        
      character.finalSaveMasteryCharisma = masterySelections.charisma 
        ? (character.finalCharisma || 0) + combatMastery 
        : (character.finalCharisma || 0);
        
      character.finalSaveMasteryIntelligence = masterySelections.intelligence 
        ? (character.finalIntelligence || 0) + combatMastery 
        : (character.finalIntelligence || 0);
        
      console.log(`Updated character ${character.finalName} with Save Masteries:`, masterySelections);
    }
    
    return character;
  });
  
  localStorage.setItem('savedCharacters', JSON.stringify(updatedCharacters));
  console.log('Character Save Masteries updated');
  
  return updatedCharacters;
};
