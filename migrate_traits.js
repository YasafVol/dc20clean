#!/usr/bin/env node

import fs from 'fs';

// Read the old traits file
const oldTraitsContent = fs.readFileSync('./src/lib/rulesdata/traits.ts', 'utf-8');

// Read the new traits file to get existing traits
const newTraitsContent = fs.readFileSync('./src/lib/rulesdata/_new_schema/traits.ts', 'utf-8');

// Extract existing trait IDs from new schema
const existingTraitIds = new Set();
const existingMatches = newTraitsContent.match(/id: '[^']+'/g);
if (existingMatches) {
    existingMatches.forEach(match => {
        const id = match.replace("id: '", "").replace("'", "");
        existingTraitIds.add(id);
    });
}

// Extract all traits from old schema
const traitsRegex = /{\s*id: '([^']+)',\s*name: '([^']+)',\s*description:\s*'([^']+)',(?:\s*cost: (-?\d+),)?(?:\s*isMinor: (true|false),)?(?:\s*isNegative: (true|false),)?(?:\s*prerequisites: \[[^\]]*\],)?\s*effects: (\[[\s\S]*?\])\s*}/g;

let match;
const missingTraits = [];

while ((match = traitsRegex.exec(oldTraitsContent)) !== null) {
    const [, id, name, description, cost, isMinor, isNegative, effects] = match;
    
    if (!existingTraitIds.has(id)) {
        // Convert old effect types to new schema
        const convertedEffects = convertEffects(effects);
        
        const trait = {
            id,
            name,
            description,
            cost: cost ? parseInt(cost) : 0,
            ...(isMinor === 'true' && { isMinor: true }),
            ...(isNegative === 'true' && { isNegative: true }),
            effects: convertedEffects
        };
        
        missingTraits.push(trait);
    }
}

function convertEffects(effectsString) {
    // This is a simplified conversion - may need manual review for complex cases
    try {
        // Clean up the effects string and try to parse it
        let cleanEffects = effectsString
            .replace(/type: '/g, '"type": "')
            .replace(/', target:/g, '", "target":')
            .replace(/', value:/g, '", "value":')
            .replace(/', condition:/g, '", "condition":')
            .replace(/'/g, '"');
        
        const effects = JSON.parse(cleanEffects);
        
        return effects.map(effect => {
            // Convert old effect types to new schema equivalents
            const typeMapping = {
                'GRANT_ADV_ON_INSIGHT_CHECK_ONCE_PER_LONG_REST': 'GRANT_ABILITY',
                'GRANT_ADV_ON_SAVE_VS_CONDITION': 'GRANT_ADV_ON_SAVE',
                'GRANT_SPELL_FROM_LIST': 'GRANT_SPELL',
                'REDUCE_MP_COST_ONCE_PER_LONG_REST': 'GRANT_ABILITY',
                'MODIFY_MP_MAX': 'MODIFY_STAT',
                'PENALTY_ON_CHECKS_SAVES_FIRST_ROUND_OF_COMBAT': 'GRANT_ABILITY',
                'GRANT_GLIDE_SPEED': 'GRANT_MOVEMENT'
            };
            
            if (typeMapping[effect.type]) {
                effect.type = typeMapping[effect.type];
                
                // Handle specific conversions
                if (effect.type === 'MODIFY_STAT' && effect.type === 'MODIFY_MP_MAX') {
                    effect.target = 'mp';
                }
            }
            
            return effect;
        });
    } catch (e) {
        console.error(`Failed to parse effects: ${effectsString}`);
        return [{ type: 'GRANT_ABILITY', target: 'manual_review_needed', value: effectsString }];
    }
}

// Generate the new traits content
const newTraitsArray = missingTraits.map(trait => {
    const parts = [
        `\t\tid: '${trait.id}',`,
        `\t\tname: '${trait.name}',`,
        `\t\tdescription: '${trait.description}',`,
        `\t\tcost: ${trait.cost}`
    ];
    
    if (trait.isMinor) parts.push('\t\tisMinor: true');
    if (trait.isNegative) parts.push('\t\tisNegative: true');
    
    parts.push(`\t\teffects: ${JSON.stringify(trait.effects, null, 3).replace(/\n/g, '\n\t\t')}`);
    
    return `\t{\n${parts.join(',\n')}\n\t}`;
}).join(',\n');

console.log(`Found ${missingTraits.length} missing traits`);
console.log('Sample traits to add:');
console.log(newTraitsArray.substring(0, 1000) + '...');

// Write the missing traits to a file for review
fs.writeFileSync('./missing_traits_to_add.ts', newTraitsArray);
console.log('Written missing traits to missing_traits_to_add.ts');
