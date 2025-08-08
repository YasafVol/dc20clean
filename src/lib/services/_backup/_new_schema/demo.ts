/**
 * Demonstration of the New Effect System
 * 
 * This shows how the new unified Effect system works to calculate
 * character stats without any text parsing or brittle regex logic.
 */

import { calculateCharacterStats, type CharacterBuildData } from './characterCalculator';

// Example: Level 1 Human Barbarian
const humanBarbarianBuild: CharacterBuildData = {
	id: 'demo-char-1',
	finalName: 'Thorgar the Mighty',
	finalPlayerName: 'Demo Player',
	level: 1,

	// Attributes from point buy
	attribute_might: 4,      // 16 total (prime)
	attribute_agility: 2,    // 14 total
	attribute_charisma: 1,   // 13 total  
	attribute_intelligence: 0, // 12 total

	// Progression
	combatMastery: 1, // Level 1

	// Class & Ancestry
	classId: 'barbarian',
	ancestry1Id: 'human',

	// Selected traits (beyond defaults)
	selectedTraitIds: ['human_determination'], // From expanded list

	// Feature choices
	featureChoices: {
		'human_attribute_increase_choice': 'might', // +1 to Might from Human trait
		'human_skill_expertise_choice': 'athletics', // Skill expertise choice
		'barbarian_battlecry_choice': ['Fortitude Shout', 'Fury Shout', 'Urgent Shout'] // All battlecry options
	}
};

// Calculate the character
console.log('='.repeat(60));
console.log('🎲 NEW EFFECT SYSTEM DEMONSTRATION');
console.log('='.repeat(60));

console.log('\n📋 Character Build Data:');
console.log('- Name:', humanBarbarianBuild.finalName);
console.log('- Class:', humanBarbarianBuild.classId);
console.log('- Ancestry:', humanBarbarianBuild.ancestry1Id);
console.log('- Level:', humanBarbarianBuild.level);
console.log('- Base Attributes: M', humanBarbarianBuild.attribute_might, 
	'A', humanBarbarianBuild.attribute_agility,
	'C', humanBarbarianBuild.attribute_charisma, 
	'I', humanBarbarianBuild.attribute_intelligence);

console.log('\n⚙️  Processing Effects...');
const calculatedStats = calculateCharacterStats(humanBarbarianBuild);

console.log('\n📊 CALCULATED RESULTS:');
console.log('='.repeat(40));

console.log('\n🏋️  Final Attributes:');
console.log(`- Might: ${calculatedStats.finalMight} (${humanBarbarianBuild.attribute_might} base + modifiers)`);
console.log(`- Agility: ${calculatedStats.finalAgility}`);
console.log(`- Charisma: ${calculatedStats.finalCharisma}`);
console.log(`- Intelligence: ${calculatedStats.finalIntelligence}`);

console.log('\n💝 Health & Resources:');
console.log(`- HP Max: ${calculatedStats.finalHPMax}`);
console.log(`- SP Max: ${calculatedStats.finalSPMax}`);
console.log(`- MP Max: ${calculatedStats.finalMPMax}`);

console.log('\n🛡️  Defenses:');
console.log(`- PD: ${calculatedStats.finalPD}`);
console.log(`- AD: ${calculatedStats.finalAD}`);
console.log(`- PDR: ${calculatedStats.finalPDR}`);

console.log('\n🎯 Saves:');
console.log(`- Might Save: ${calculatedStats.finalSaveMight}`);
console.log(`- Agility Save: ${calculatedStats.finalSaveAgility}`);
console.log(`- Charisma Save: ${calculatedStats.finalSaveCharisma}`);
console.log(`- Intelligence Save: ${calculatedStats.finalSaveIntelligence}`);

console.log('\n🏃 Movement & Combat:');
console.log(`- Move Speed: ${calculatedStats.finalMoveSpeed} spaces`);
console.log(`- Jump Distance: ${calculatedStats.finalJumpDistance}`);
console.log(`- Initiative Bonus: ${calculatedStats.finalInitiativeBonus}`);
console.log(`- Death Threshold: ${calculatedStats.finalDeathThreshold}`);

console.log('\n⚔️  Combat Training:');
calculatedStats.combatTraining.forEach(training => {
	console.log(`- ${training}`);
});

console.log('\n🌟 Granted Abilities:');
calculatedStats.grantedAbilities.forEach(ability => {
	console.log(`- ${ability.name}: ${ability.description}`);
});

console.log('\n⚠️  Conditional Modifiers:');
calculatedStats.conditionalModifiers.forEach(modifier => {
	console.log(`- ${modifier.description}`);
});

console.log('\n' + '='.repeat(60));
console.log('✅ DEMONSTRATION COMPLETE');
console.log('The new system successfully processed all effects without any text parsing!');
console.log('='.repeat(60));

export { humanBarbarianBuild, calculatedStats };
