# Weapon System Refactor Plan
## Using inventoryItems.ts for Weapons

### Current Situation
- `weapons.ts` has been deleted to avoid duplication
- Attack system (`Attacks.tsx`) currently broken due to missing weapon imports
- Need to migrate attack system to use `inventoryItems.ts` weapon structure

---

## Phase 1: Interface Compatibility Analysis

### Current Attack System Expectations (from deleted weapons.ts)
```typescript
interface WeaponData {
  id: string;
  name: string;
  weightCategory: 'light' | 'heavy';
  type: 'melee' | 'ranged';
  damage: number; // Base damage (1, 2, 3, 4)
  versatileDamage?: number;
  damageType: 'bludgeoning' | 'piercing' | 'slashing';
  properties: string[];
  range?: { short: number; long: number };
  ammunition?: string;
  reload?: number;
  specialNotes?: string;
}
```

### Inventory Weapon Structure (inventoryItems.ts)
```typescript
interface Weapon {
  itemType: ItemType.Weapon;
  name: string;
  type: WeaponType; // enum: Melee, Ranged, Special
  style: WeaponStyle | WeaponStyle[]; // enum values
  handedness: WeaponHandedness; // enum: OneHanded, Versatile, TwoHanded
  damage: string; // "1 S", "2 B", "1 S/P", etc.
  properties: WeaponProperty[]; // typed weapon properties
}
```

### Key Differences to Address
1. **ID vs Name**: Inventory uses `name` as identifier, old system used `id`
2. **Damage Format**: Inventory uses strings ("1 S"), old system used numbers + separate type
3. **Weight Category**: Inventory uses `handedness`, old system used `weightCategory`
4. **Versatile Damage**: Inventory doesn't have separate versatile damage field
5. **Range/Ammo**: Inventory embeds range in `properties`, old system had separate fields

---

## Phase 2: Attack System Migration Strategy

### 2.1 Update Attack Data Interface
**File**: `src/types/character.ts`
```typescript
// Update AttackData to work with inventory weapons
export interface AttackData {
  id: string;
  weaponName: string; // Changed from weaponId to weaponName
  name: string;
  attackBonus: number;
  damage: string; // Keep as string to match inventory format
  damageType: string; // Parsed from inventory damage string
  critRange: string;
  critDamage: string;
  brutalDamage: string;
  heavyHitEffect: string;
}
```

### 2.2 Create Weapon Utility Functions
**File**: `src/lib/utils/weaponUtils.ts`
```typescript
import { Weapon, WeaponType } from '../rulesdata/inventoryItems';

// Parse damage string "1 S" → { amount: 1, type: 'slashing' }
export function parseDamage(damageStr: string): { amount: number; type: string };

// Get damage type from damage string
export function getDamageType(damageStr: string): 'slashing' | 'piercing' | 'bludgeoning' | 'mixed';

// Check if weapon is ranged
export function isRangedWeapon(weapon: Weapon): boolean;

// Get range from properties (parse "Range (15/45)")
export function getWeaponRange(weapon: Weapon): { short: number; long: number } | null;

// Get reload value from properties
export function getReloadValue(weapon: Weapon): number | null;

// Calculate attack bonus (CM + stat modifier)
export function calculateAttackBonus(weapon: Weapon, combatMastery: number, might: number, agility: number): number;

// Calculate damage for different hit types
export function calculateDamage(weapon: Weapon, hitType: 'normal' | 'heavy' | 'brutal'): string;
```

### 2.3 Update Attacks Component
**File**: `src/routes/character-sheet/components/Attacks.tsx`

#### Import Changes
```typescript
// Replace old imports
import { weapons, type Weapon, WeaponType } from '../../../lib/rulesdata/inventoryItems';
import { 
  parseDamage, 
  getDamageType, 
  isRangedWeapon, 
  calculateAttackBonus,
  calculateDamage 
} from '../../../lib/utils/weaponUtils';
```

#### Core Function Updates
```typescript
const calculateAttackData = (weapon: Weapon): AttackData => {
  if (!weapon || !characterData) {
    return createEmptyAttackData();
  }

  const mightMod = Math.floor((characterData.finalMight - 10) / 2);
  const agilityMod = Math.floor((characterData.finalAgility - 10) / 2);
  
  const attackBonus = calculateAttackBonus(weapon, characterData.finalCombatMastery, mightMod, agilityMod);
  const damageType = getDamageType(weapon.damage);
  
  return {
    id: '',
    weaponName: weapon.name,
    name: weapon.name,
    attackBonus,
    damage: weapon.damage,
    damageType,
    critRange: '20', // Default, could be enhanced later
    critDamage: calculateDamage(weapon, 'normal'),
    brutalDamage: calculateDamage(weapon, 'brutal'),
    heavyHitEffect: weapon.properties.includes('Impact') ? '+1 damage on Heavy Hit' : ''
  };
};
```

#### Weapon Selection Updates
```typescript
// Update weapon dropdown
{weapons.map((weapon) => (
  <option key={weapon.name} value={weapon.name}>
    {weapon.name} ({weapon.handedness})
  </option>
))}

// Update weapon lookup
const weapon = attack.weaponName 
  ? weapons.find((w) => w.name === attack.weaponName)
  : null;
```

---

## Phase 3: Enhanced Features

### 3.1 Versatile Weapon Support
```typescript
// For versatile weapons, show both one-handed and two-handed damage
function getVersatileDamage(weapon: Weapon): { oneHanded: string; twoHanded: string } | null {
  if (weapon.handedness === WeaponHandedness.Versatile) {
    const baseDamage = parseDamage(weapon.damage);
    return {
      oneHanded: weapon.damage,
      twoHanded: `${baseDamage.amount + 1} ${baseDamage.type.charAt(0).toUpperCase()}`
    };
  }
  return null;
}
```

### 3.2 Property-Based Features
```typescript
// Enhanced property handling
function getWeaponFeatures(weapon: Weapon): string[] {
  const features: string[] = [];
  
  weapon.properties.forEach(prop => {
    switch (prop) {
      case 'Impact':
        features.push('+1 damage on Heavy Hit');
        break;
      case 'Guard':
        features.push('Defensive bonus');
        break;
      case 'Reach':
        features.push('Extended reach');
        break;
      // Add more property interpretations
    }
  });
  
  return features;
}
```

### 3.3 Range and Ammunition
```typescript
// Parse range from properties
function parseRange(properties: WeaponProperty[]): { short: number; long: number } | null {
  const rangeProp = properties.find(p => p.includes('Range'));
  if (rangeProp) {
    const match = rangeProp.match(/Range \((\d+)\/(\d+)\)/);
    if (match) {
      return { short: parseInt(match[1]), long: parseInt(match[2]) };
    }
  }
  return null;
}
```

---

## Phase 4: Testing & Validation

### 4.1 Weapon Data Verification
- Ensure all weapons have valid damage strings
- Verify property consistency
- Test edge cases (0 damage weapons, special weapons)

### 4.2 Attack Calculation Testing
- Test melee vs ranged weapon attack bonuses
- Verify damage type parsing for complex types (S/P, B/P)
- Test versatile weapon damage calculation

### 4.3 UI/UX Testing
- Weapon selection dropdown functionality
- Attack popup display with new weapon properties
- Damage calculation tooltips

---

## Phase 5: Migration Steps

### Step 1: Create Utility Functions
1. Create `src/lib/utils/weaponUtils.ts`
2. Implement damage parsing and calculation functions
3. Add comprehensive tests

### Step 2: Update Type Definitions
1. Update `AttackData` interface in `src/types/character.ts`
2. Ensure compatibility with existing character data

### Step 3: Refactor Attacks Component
1. Update imports to use `inventoryItems.ts`
2. Replace weapon calculation logic
3. Update weapon selection UI
4. Test weapon lookup and selection

### Step 4: Update Character Sheet Integration
1. Update `CharacterSheetClean.tsx` weapon popup display
2. Ensure weapon properties display correctly
3. Test attack interaction flows

### Step 5: Clean Up and Documentation
1. Remove any remaining references to old weapon system
2. Update comments and documentation
3. Add comprehensive testing

---

## Expected Benefits

1. **Single Source of Truth**: All weapon data in one place
2. **Consistent Data**: Inventory and attack systems use same weapon definitions
3. **Enhanced Features**: Rich property system enables better weapon mechanics
4. **Maintainability**: Easier to add new weapons and properties
5. **Type Safety**: Better TypeScript support with proper enums

---

## Risk Mitigation

1. **Backward Compatibility**: Ensure existing saved characters still work
2. **Data Migration**: Handle any stored weapon references gracefully
3. **Testing**: Comprehensive testing before deployment
4. **Rollback Plan**: Keep ability to revert changes if issues arise

---

## Timeline Estimate

- **Phase 1 (Analysis)**: 1-2 hours
- **Phase 2 (Core Migration)**: 4-6 hours  
- **Phase 3 (Enhanced Features)**: 2-3 hours
- **Phase 4 (Testing)**: 2-3 hours
- **Phase 5 (Implementation)**: 1-2 hours per step

**Total Estimated Time**: 15-20 hours

This plan provides a structured approach to migrating from the deleted `weapons.ts` to the comprehensive `inventoryItems.ts` system while maintaining functionality and adding new capabilities.