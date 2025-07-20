// inventoryItems.ts

//==============================================================================
// SCHEMAS / TYPES
//==============================================================================

export enum ItemType {
  Weapon = 'Weapon',
  Armor = 'Armor',
  Shield = 'Shield',
  AdventuringSupply = 'Adventuring Supply',
  Potion = 'Potion',
}

export enum WeaponType {
  Melee = 'Melee',
  Ranged = 'Ranged',
  Special = 'Special',
}

export enum WeaponHandedness {
  OneHanded = 'One-Handed',
  Versatile = 'Versatile',
  TwoHanded = 'Two-Handed',
}

export enum WeaponStyle {
  Axe = 'Axe',
  Fist = 'Fist',
  Hammer = 'Hammer',
  Pick = 'Pick',
  Spear = 'Spear',
  Sword = 'Sword',
  Whip = 'Whip',
  Chained = 'Chained',
  Bow = 'Bow',
  Crossbow = 'Crossbow',
  AxePick = 'Axe/Pick',
  HammerPick = 'Hammer/Pick',
  SwordSpear = 'Sword/Spear',
  ChainedHammer = 'Chained/Hammer',
}

export enum DamageType {
  Slashing = 'S',
  Piercing = 'P',
  Bludgeoning = 'B',
  SlashingOrPiercing = 'S/P',
  BludgeoningOrPiercing = 'B/P',
}

// Based on properties from pages 76 & 77
export type WeaponProperty =
  | 'Ammo'
  | 'Concealable'
  | 'Guard'
  | 'Heavy'
  | 'Impact'
  | 'Long-Ranged'
  | 'Multi-Faceted'
  | 'Reach'
  | 'Reload'
  | 'Silent'
  | 'Toss (5/10)'
  | 'Thrown (10/20)'
  | 'Two-Handed'
  | 'Unwieldy'
  | 'Versatile'
  | 'Returning'
  | 'Capture (5/10)'
  | 'Capture (10/20)'
  | 'Range (15/45)'
  | 'Range (30/90)';


export interface Weapon {
  itemType: ItemType.Weapon;
  name: string;
  type: WeaponType;
  style: WeaponStyle | WeaponStyle[];
  handedness: WeaponHandedness;
  damage: string; // Using string to accommodate '0 B' etc.
  properties: WeaponProperty[];
}

export enum ArmorType {
  Light = 'Light Armor',
  Heavy = 'Heavy Armor',
}

export interface Armor {
  itemType: ItemType.Armor;
  name: string;
  type: ArmorType;
  pdBonus: number;
  adBonus: number;
  pdr?: 'Half';
  speedPenalty: number;
  agilityCheckDisadvantage: boolean;
}

export enum ShieldType {
  Light = 'Light Shield',
  Heavy = 'Heavy Shield',
}

export type ShieldProperty =
  | 'Grasp'
  | 'Toss (5/10)'
  | 'Mounted';

export interface Shield {
  itemType: ItemType.Shield;
  name: string;
  type: ShieldType;
  pdBonus: number;
  adBonus: number;
  speedPenalty: number;
  agilityCheckDisadvantage: boolean;
  properties?: ShieldProperty[];
}

export interface AdventuringSupply {
  itemType: ItemType.AdventuringSupply;
  name: string;
  description: string;
  price?: string; // e.g., "5g"
}

export interface HealingPotion {
    itemType: ItemType.Potion;
    name: string;
    level: number;
    healing: string; // e.g., "2 HP"
    price: number; // in gold pieces (g)
}


//==============================================================================
// INVENTORY DATA
//==============================================================================

export const weapons: Weapon[] = [
  // Melee Weapons - One-Handed
  { itemType: ItemType.Weapon, name: "Sickle", type: WeaponType.Melee, style: WeaponStyle.Axe, handedness: WeaponHandedness.OneHanded, damage: "1 S", properties: ["Concealable", "Toss (5/10)"] },
  { itemType: ItemType.Weapon, name: "Hand Axe", type: WeaponType.Melee, style: WeaponStyle.Axe, handedness: WeaponHandedness.OneHanded, damage: "1 S", properties: ["Concealable", "Toss (5/10)"] },
  { itemType: ItemType.Weapon, name: "Throwing Star", type: WeaponType.Melee, style: WeaponStyle.Axe, handedness: WeaponHandedness.OneHanded, damage: "1 S", properties: ["Concealable", "Toss (5/10)"] },
  { itemType: ItemType.Weapon, name: "Brass Knuckles", type: WeaponType.Melee, style: WeaponStyle.Fist, handedness: WeaponHandedness.OneHanded, damage: "1 B", properties: ["Concealable", "Impact"] },
  { itemType: ItemType.Weapon, name: "Club", type: WeaponType.Melee, style: WeaponStyle.Hammer, handedness: WeaponHandedness.OneHanded, damage: "1 B", properties: ["Concealable", "Toss (5/10)"] },
  { itemType: ItemType.Weapon, name: "Light Hammer", type: WeaponType.Melee, style: WeaponStyle.Hammer, handedness: WeaponHandedness.OneHanded, damage: "1 B", properties: ["Impact", "Toss (5/10)"] },
  { itemType: ItemType.Weapon, name: "Dart", type: WeaponType.Melee, style: WeaponStyle.Pick, handedness: WeaponHandedness.OneHanded, damage: "1 P", properties: ["Concealable", "Toss (5/10)"] },
  { itemType: ItemType.Weapon, name: "Mining Pick", type: WeaponType.Melee, style: WeaponStyle.Pick, handedness: WeaponHandedness.OneHanded, damage: "1 P", properties: ["Concealable", "Toss (5/10)"] },
  { itemType: ItemType.Weapon, name: "Javelin", type: WeaponType.Melee, style: WeaponStyle.Spear, handedness: WeaponHandedness.OneHanded, damage: "1 P", properties: ["Thrown (10/20)"] },
  { itemType: ItemType.Weapon, name: "Throwing Dagger", type: WeaponType.Melee, style: WeaponStyle.Sword, handedness: WeaponHandedness.OneHanded, damage: "1 S", properties: ["Concealable", "Toss (5/10)"] },
  { itemType: ItemType.Weapon, name: "Short Sword", type: WeaponType.Melee, style: WeaponStyle.Sword, handedness: WeaponHandedness.OneHanded, damage: "1 S", properties: ["Guard", "Impact"] },
  { itemType: ItemType.Weapon, name: "Rapier", type: WeaponType.Melee, style: [WeaponStyle.Sword, WeaponStyle.Spear], handedness: WeaponHandedness.OneHanded, damage: "1 S/P", properties: ["Guard", "Multi-Faceted"] },
  { itemType: ItemType.Weapon, name: "Chain Whip", type: WeaponType.Melee, style: WeaponStyle.Whip, handedness: WeaponHandedness.OneHanded, damage: "1 S", properties: ["Reach", "Impact"] },
  
  // Melee Weapons - Versatile
  { itemType: ItemType.Weapon, name: "Battleaxe", type: WeaponType.Melee, style: WeaponStyle.Axe, handedness: WeaponHandedness.Versatile, damage: "1 S", properties: ["Versatile", "Impact"] },
  { itemType: ItemType.Weapon, name: "Flail", type: WeaponType.Melee, style: WeaponStyle.Chained, handedness: WeaponHandedness.Versatile, damage: "1 B", properties: ["Versatile", "Impact"] },
  { itemType: ItemType.Weapon, name: "Morningstar", type: WeaponType.Melee, style: [WeaponStyle.Hammer, WeaponStyle.Pick], handedness: WeaponHandedness.Versatile, damage: "1 B/P", properties: ["Versatile", "Multi-Faceted"] },
  { itemType: ItemType.Weapon, name: "Warhammer", type: WeaponType.Melee, style: [WeaponStyle.Hammer, WeaponStyle.Pick], handedness: WeaponHandedness.Versatile, damage: "1 B/P", properties: ["Versatile", "Multi-Faceted"] },
  { itemType: ItemType.Weapon, name: "Pickaxe", type: WeaponType.Melee, style: WeaponStyle.Pick, handedness: WeaponHandedness.Versatile, damage: "1 P", properties: ["Versatile", "Impact"] },
  { itemType: ItemType.Weapon, name: "Spear", type: WeaponType.Melee, style: WeaponStyle.Spear, handedness: WeaponHandedness.Versatile, damage: "1 P", properties: ["Versatile", "Toss (5/10)"] },
  { itemType: ItemType.Weapon, name: "Long Spear", type: WeaponType.Melee, style: WeaponStyle.Spear, handedness: WeaponHandedness.Versatile, damage: "1 P", properties: ["Versatile", "Reach"] },
  { itemType: ItemType.Weapon, name: "Quarterstaff", type: WeaponType.Melee, style: WeaponStyle.Staff, handedness: WeaponHandedness.Versatile, damage: "1 B", properties: ["Versatile", "Guard"] },
  { itemType: ItemType.Weapon, name: "Longsword", type: WeaponType.Melee, style: WeaponStyle.Sword, handedness: WeaponHandedness.Versatile, damage: "1 S", properties: ["Versatile", "Guard"] },
  { itemType: ItemType.Weapon, name: "Bastard Sword", type: WeaponType.Melee, style: WeaponStyle.Sword, handedness: WeaponHandedness.Versatile, damage: "1 S", properties: ["Versatile", "Impact"] },
  { itemType: ItemType.Weapon, name: "Bull Whip", type: WeaponType.Melee, style: WeaponStyle.Whip, handedness: WeaponHandedness.Versatile, damage: "1 S", properties: ["Versatile", "Reach", "Unwieldy", "Impact"] },

  // Melee Weapons - Two-Handed
  { itemType: ItemType.Weapon, name: "Scythe", type: WeaponType.Melee, style: WeaponStyle.Axe, handedness: WeaponHandedness.TwoHanded, damage: "2 S", properties: ["Two-Handed", "Heavy", "Reach"] },
  { itemType: ItemType.Weapon, name: "Greataxe", type: WeaponType.Melee, style: WeaponStyle.Axe, handedness: WeaponHandedness.TwoHanded, damage: "2 S", properties: ["Two-Handed", "Heavy", "Impact"] },
  { itemType: ItemType.Weapon, name: "Halberd", type: WeaponType.Melee, style: [WeaponStyle.Axe, WeaponStyle.Pick], handedness: WeaponHandedness.TwoHanded, damage: "1 S/P", properties: ["Two-Handed", "Multi-Faceted", "Reach", "Impact"] },
  { itemType: ItemType.Weapon, name: "War Flail", type: WeaponType.Melee, style: WeaponStyle.Chained, handedness: WeaponHandedness.TwoHanded, damage: "2 B", properties: ["Two-Handed", "Heavy", "Impact"] },
  { itemType: ItemType.Weapon, name: "Meteor Hammer", type: WeaponType.Melee, style: [WeaponStyle.Chained, WeaponStyle.Hammer], handedness: WeaponHandedness.TwoHanded, damage: "2 B", properties: ["Two-Handed", "Heavy", "Multi-Faceted", "Reach", "Unwieldy"] },
  { itemType: ItemType.Weapon, name: "Greatmaul", type: WeaponType.Melee, style: WeaponStyle.Hammer, handedness: WeaponHandedness.TwoHanded, damage: "2 B", properties: ["Two-Handed", "Heavy", "Impact"] },
  { itemType: ItemType.Weapon, name: "Pike", type: WeaponType.Melee, style: WeaponStyle.Spear, handedness: WeaponHandedness.TwoHanded, damage: "2 P", properties: ["Two-Handed", "Heavy", "Reach", "Impact", "Unwieldy"] },
  { itemType: ItemType.Weapon, name: "Longpole", type: WeaponType.Melee, style: WeaponStyle.Staff, handedness: WeaponHandedness.TwoHanded, damage: "1 B", properties: ["Two-Handed", "Guard", "Reach", "Impact"] },
  { itemType: ItemType.Weapon, name: "Glaive", type: WeaponType.Melee, style: WeaponStyle.Sword, handedness: WeaponHandedness.TwoHanded, damage: "2 S", properties: ["Two-Handed", "Heavy", "Reach"] },
  { itemType: ItemType.Weapon, name: "Greatsword", type: WeaponType.Melee, style: WeaponStyle.Sword, handedness: WeaponHandedness.TwoHanded, damage: "2 S", properties: ["Two-Handed", "Heavy", "Impact"] },
  { itemType: ItemType.Weapon, name: "Great Whip", type: WeaponType.Melee, style: WeaponStyle.Whip, handedness: WeaponHandedness.TwoHanded, damage: "2 S", properties: ["Two-Handed", "Heavy", "Reach", "Impact", "Unwieldy"] },

  // Ranged Weapons
  { itemType: ItemType.Weapon, name: "Sling", type: WeaponType.Ranged, style: WeaponStyle.Bow, handedness: WeaponHandedness.TwoHanded, damage: "1 B", properties: ["Ammo", "Unwieldy", "Impact", "Range (15/45)"] },
  { itemType: ItemType.Weapon, name: "Shortbow", type: WeaponType.Ranged, style: WeaponStyle.Bow, handedness: WeaponHandedness.TwoHanded, damage: "1 P", properties: ["Two-Handed", "Ammo", "Silent", "Range (15/45)"] },
  { itemType: ItemType.Weapon, name: "Longbow", type: WeaponType.Ranged, style: WeaponStyle.Bow, handedness: WeaponHandedness.TwoHanded, damage: "1 P", properties: ["Two-Handed", "Ammo", "Unwieldy", "Impact", "Long-Ranged"] },
  { itemType: ItemType.Weapon, name: "Greatbow", type: WeaponType.Ranged, style: WeaponStyle.Bow, handedness: WeaponHandedness.TwoHanded, damage: "2 P", properties: ["Two-Handed", "Ammo", "Unwieldy", "Heavy", "Range (15/45)"] },
  { itemType: ItemType.Weapon, name: "Blowgun (Needle)", type: WeaponType.Ranged, style: WeaponStyle.Crossbow, handedness: WeaponHandedness.TwoHanded, damage: "1 P", properties: ["Two-Handed", "Ammo", "Silent", "Range (15/45)"] },
  { itemType: ItemType.Weapon, name: "Hand Crossbow", type: WeaponType.Ranged, style: WeaponStyle.Crossbow, handedness: WeaponHandedness.TwoHanded, damage: "2 P", properties: ["Ammo", "Reload", "Range (15/45)"] },
  { itemType: ItemType.Weapon, name: "Light Crossbow", type: WeaponType.Ranged, style: WeaponStyle.Crossbow, handedness: WeaponHandedness.TwoHanded, damage: "2 P", properties: ["Two-Handed", "Ammo", "Reload", "Impact", "Range (15/45)"] },
  { itemType: ItemType.Weapon, name: "Heavy Crossbow", type: WeaponType.Ranged, style: WeaponStyle.Crossbow, handedness: WeaponHandedness.TwoHanded, damage: "3 P", properties: ["Two-Handed", "Ammo", "Unwieldy", "Reload", "Heavy", "Range (15/45)"] },

  // Special Weapons
  { itemType: ItemType.Weapon, name: "Bolas", type: WeaponType.Special, style: WeaponStyle.Chained, handedness: WeaponHandedness.OneHanded, damage: "0 B", properties: ["Thrown (10/20)", "Capture (10/20)"] },
  { itemType: ItemType.Weapon, name: "Net", type: WeaponType.Special, style: WeaponStyle.Chained, handedness: WeaponHandedness.Versatile, damage: "0 B", properties: ["Toss (5/10)", "Versatile", "Capture (5/10)"] },
  { itemType: ItemType.Weapon, name: "Boomerang", type: WeaponType.Special, style: WeaponStyle.Hammer, handedness: WeaponHandedness.OneHanded, damage: "1 B", properties: ["Toss (5/10)", "Returning"] },
];

export const armors: Armor[] = [
    // Light Armor
    { itemType: ItemType.Armor, name: "Light Defensive Armor", type: ArmorType.Light, pdBonus: 1, adBonus: 1, speedPenalty: 0, agilityCheckDisadvantage: false },
    { itemType: ItemType.Armor, name: "Light Deflecting Armor", type: ArmorType.Light, pdBonus: 2, adBonus: 0, speedPenalty: 0, agilityCheckDisadvantage: false },
    { itemType: ItemType.Armor, name: "Light Fortified Armor", type: ArmorType.Light, pdBonus: 0, adBonus: 2, speedPenalty: 0, agilityCheckDisadvantage: false },
    
    // Heavy Armor
    { itemType: ItemType.Armor, name: "Heavy Defensive Armor", type: ArmorType.Heavy, pdBonus: 1, adBonus: 1, pdr: 'Half', speedPenalty: -1, agilityCheckDisadvantage: true },
    { itemType: ItemType.Armor, name: "Heavy Deflecting Armor", type: ArmorType.Heavy, pdBonus: 2, adBonus: 0, pdr: 'Half', speedPenalty: -1, agilityCheckDisadvantage: true },
    { itemType: ItemType.Armor, name: "Heavy Fortified Armor", type: ArmorType.Heavy, pdBonus: 0, adBonus: 2, pdr: 'Half', speedPenalty: -1, agilityCheckDisadvantage: true },
    { itemType: ItemType.Armor, name: "Highly Defensive Armor", type: ArmorType.Heavy, pdBonus: 2, adBonus: 2, pdr: 'Half', speedPenalty: -1, agilityCheckDisadvantage: true },
];

export const shields: Shield[] = [
    // Light Shields
    { itemType: ItemType.Shield, name: "Buckler", type: ShieldType.Light, pdBonus: 1, adBonus: 0, speedPenalty: 0, agilityCheckDisadvantage: false, properties: ["Grasp"] },
    { itemType: ItemType.Shield, name: "Round Shield", type: ShieldType.Light, pdBonus: 0, adBonus: 1, speedPenalty: 0, agilityCheckDisadvantage: false, properties: ["Toss (5/10)"] },
    { itemType: ItemType.Shield, name: "Heater Shield", type: ShieldType.Light, pdBonus: 1, adBonus: 1, speedPenalty: 0, agilityCheckDisadvantage: false, properties: [] },

    // Heavy Shields
    { itemType: ItemType.Shield, name: "Kite Shield", type: ShieldType.Heavy, pdBonus: 1, adBonus: 2, speedPenalty: -1, agilityCheckDisadvantage: true, properties: ["Mounted"] },
    { itemType: ItemType.Shield, name: "Tower Shield", type: ShieldType.Heavy, pdBonus: 2, adBonus: 2, speedPenalty: -1, agilityCheckDisadvantage: true, properties: [] },
];

export const adventuringSupplies: AdventuringSupply[] = [
    {
        itemType: ItemType.AdventuringSupply,
        name: "Gauntlet",
        description: "Wearing a Gauntlet gives your Unarmed Strikes with that hand the Impact Weapon Property (+1 damage on Heavy Hits).",
        price: "5g"
    },
    {
        itemType: ItemType.AdventuringSupply,
        name: "First Aid Kit",
        description: "A fully stocked kit contains 5 charges, which can be spent to treat a creature's wounds or cure an ailment by taking the Object Action.",
    }
];

export const healingPotions: HealingPotion[] = [
    { itemType: ItemType.Potion, name: "1st Level Healing Potion", level: 1, healing: "2 HP", price: 10 },
    { itemType: ItemType.Potion, name: "2nd Level Healing Potion", level: 2, healing: "4 HP", price: 25 },
    { itemType: ItemType.Potion, name: "3rd Level Healing Potion", level: 3, healing: "6 HP", price: 40 },
    { itemType: ItemType.Potion, name: "4th Level Healing Potion", level: 4, healing: "8 HP", price: 60 },
    { itemType: ItemType.Potion, name: "5th Level Healing Potion", level: 5, healing: "10 HP", price: 100 },
];

export const allItems = [
    ...weapons,
    ...armors,
    ...shields,
    ...adventuringSupplies,
    ...healingPotions
];