#!/usr/bin/env node

import fs from 'fs';

// Read the old traits file
const oldTraitsContent = fs.readFileSync('./src/lib/rulesdata/traits.ts', 'utf-8');

// List of missing Beastborn traits
const beastbornTraits = [
    'beastborn_burrow_speed', 'beastborn_camouflage', 'beastborn_charge', 'beastborn_climb_speed',
    'beastborn_cold_resistance', 'beastborn_darkvision', 'beastborn_echolocation', 'beastborn_extended_natural_weapon',
    'beastborn_fast_reflexes', 'beastborn_fire_resistance', 'beastborn_flyby', 'beastborn_full_flight',
    'beastborn_glide_speed', 'beastborn_hard_shell', 'beastborn_hazardous_hide', 'beastborn_intimidating_shout',
    'beastborn_jumper', 'beastborn_keen_sense', 'beastborn_limited_flight', 'beastborn_long_limbed',
    'beastborn_mimicry', 'beastborn_natural_armor', 'beastborn_natural_projectile', 'beastborn_natural_weapon',
    'beastborn_natural_weapon_passive', 'beastborn_powerful_build', 'beastborn_prehensile_appendage', 'beastborn_prowler',
    'beastborn_quick_reactions', 'beastborn_reckless', 'beastborn_rend', 'beastborn_retractable_natural_weapon',
    'beastborn_secondary_arms', 'beastborn_shell_retreat', 'beastborn_shoot_webs', 'beastborn_short_legged',
    'beastborn_small_sized', 'beastborn_speed_increase', 'beastborn_spider_climb', 'beastborn_sprint',
    'beastborn_stealth_feathers', 'beastborn_strong_jumper', 'beastborn_sunlight_sensitivity', 'beastborn_swim_speed',
    'beastborn_thick_skinned', 'beastborn_tough', 'beastborn_toxic_fortitude', 'beastborn_venomous_natural_weapon',
    'beastborn_water_breathing', 'beastborn_web_walk', 'beastborn_winged_arms'
];

// Extract traits and convert to new schema format
const extractedTraits = [];

for (const traitId of beastbornTraits) {
    const regex = new RegExp(`\\s*id: '${traitId}',([\\s\\S]*?)(?=\\s*},\\s*{|\\s*}\\s*]$)`, 'g');
    const match = regex.exec(oldTraitsContent);
    
    if (match) {
        // Parse the trait data manually
        let traitText = match[0];
        
        // Extract name
        const nameMatch = traitText.match(/name: '([^']+)'/);
        const name = nameMatch ? nameMatch[1] : traitId;
        
        // Extract description
        const descMatch = traitText.match(/description:\\s*'([^']+)'|description:\\s*`([^`]+)`/);
        const description = descMatch ? (descMatch[1] || descMatch[2]) : '';
        
        // Extract cost
        const costMatch = traitText.match(/cost: (-?\\d+)/);
        const cost = costMatch ? parseInt(costMatch[1]) : 0;
        
        // Extract flags
        const isMinor = traitText.includes('isMinor: true');
        const isNegative = traitText.includes('isNegative: true');
        
        // Convert old effect types to new schema
        const convertedTrait = {
            id: traitId,
            name,
            description,
            cost,
            ...(isMinor && { isMinor: true }),
            ...(isNegative && { isNegative: true }),
            effects: convertEffectType(traitId, name)
        };
        
        extractedTraits.push(convertedTrait);
    }
}

function convertEffectType(id, name) {
    // Convert based on trait patterns
    const effectMappings = {
        // Movement abilities
        'beastborn_burrow_speed': [{ type: 'GRANT_MOVEMENT', target: 'burrow', value: 'half_speed' }],
        'beastborn_climb_speed': [{ type: 'GRANT_MOVEMENT', target: 'climb', value: 'equal_to_speed' }],
        'beastborn_swim_speed': [{ type: 'GRANT_MOVEMENT', target: 'swim', value: 'equal_to_speed' }],
        'beastborn_glide_speed': [{ type: 'GRANT_MOVEMENT', target: 'glide', value: 'wings' }],
        'beastborn_speed_increase': [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1 }],
        
        // Senses
        'beastborn_darkvision': [{ type: 'GRANT_SENSE', target: 'darkvision', value: 10 }],
        'beastborn_echolocation': [{ type: 'GRANT_SENSE', target: 'echolocation', value: 5 }],
        
        // Resistances
        'beastborn_cold_resistance': [{ type: 'GRANT_RESISTANCE', target: 'Cold', value: 'half' }],
        'beastborn_fire_resistance': [{ type: 'GRANT_RESISTANCE', target: 'Fire', value: 'half' }],
        
        // Size modifications
        'beastborn_small_sized': [{ type: 'GRANT_ABILITY', target: 'small_sized', value: 'Size is considered Small.' }],
        'beastborn_powerful_build': [{ type: 'GRANT_ABILITY', target: 'powerful_build', value: '+1 Size but occupy smaller space.' }],
        
        // Defensive abilities
        'beastborn_natural_armor': [{ type: 'MODIFY_STAT', target: 'ad', value: 1, condition: 'not_wearing_armor' }],
        'beastborn_hard_shell': [{ type: 'MODIFY_STAT', target: 'ad', value: 2, condition: 'not_wearing_armor' }],
        
        // Default fallback
        default: [{ type: 'GRANT_ABILITY', target: id.replace('beastborn_', ''), value: `${name} ability.` }]
    };
    
    return effectMappings[id] || effectMappings.default;
}

// Generate TypeScript code
const traitsCode = extractedTraits.map(trait => {
    const parts = [
        `\\tid: '${trait.id}',`,
        `\\tname: '${trait.name}',`,
        `\\tdescription: '${trait.description.replace(/'/g, "\\'")}',`,
        `\\tcost: ${trait.cost}`
    ];
    
    if (trait.isMinor) parts.push('\\tisMinor: true');
    if (trait.isNegative) parts.push('\\tisNegative: true');
    
    parts.push(`\\teffects: ${JSON.stringify(trait.effects, null, 2).replace(/\\n/g, '\\n\\t')}`);
    
    return `{\\n${parts.join(',\\n')}\\n}`;
}).join(',\\n');

console.log(`// Beastborn Traits (${extractedTraits.length} traits)`);
console.log(traitsCode);

fs.writeFileSync('./beastborn_traits.ts', traitsCode);
console.log(`\\nExtracted ${extractedTraits.length} Beastborn traits to beastborn_traits.ts`);
