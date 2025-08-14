// Quick test to verify trait costs are calculated correctly
import { traitsData } from './src/lib/rulesdata/_new_schema/traits.js';

console.log('Testing trait cost calculation...');

// Test some known traits with different costs
const testTraits = [
  'human_attribute_increase', // Should cost 2
  'human_resolve', // Should cost 1  
  'human_undying', // Should cost 0 (minor trait)
  'human_trade_expertise' // Should cost 1
];

testTraits.forEach(traitId => {
  const trait = traitsData.find(t => t.id === traitId);
  if (trait) {
    console.log(`${trait.name} (${traitId}): ${trait.cost} point(s)`);
  } else {
    console.log(`Trait ${traitId} not found`);
  }
});

// Simulate the calculation logic
const selectedTraitIds = ['human_attribute_increase', 'human_resolve', 'human_undying'];
const totalCost = selectedTraitIds.reduce((total, traitId) => {
  const trait = traitsData.find(t => t.id === traitId);
  return total + (trait?.cost || 0);
}, 0);

console.log(`\nSelected traits: ${selectedTraitIds.join(', ')}`);
console.log(`Total cost: ${totalCost} points`);
console.log(`Expected: 3 points (2 + 1 + 0)`);
console.log(`Test ${totalCost === 3 ? 'PASSED' : 'FAILED'}`);
