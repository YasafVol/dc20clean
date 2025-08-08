# 🎯 **UI Testing Guide for Enhanced Effect System**

## ✅ **What's Available for Testing**

### **Ancestries (Complete)**:
- ✅ **Human** - All traits fully migrated with user choices
- ✅ **Elf** - All traits migrated with conditional effects
- ✅ **Dwarf** - All traits migrated with resistances and abilities

### **Classes (Complete)**:
- ✅ **Barbarian** - Rage, Berserker features, conditional AD/PD bonuses
- ✅ **Cleric** - Divine domains, spellcasting, divine damage choices
- ✅ **Hunter** - Favored terrain choices, Hunter's Mark, terrain bonuses

---

## 🚀 **How to Test in the UI**

### **1. Switch to Enhanced System**

The enhanced system is automatically used in character creation. The system will:
- ✅ **Auto-detect** when creating characters with available classes/ancestries
- ✅ **Show choice prompts** for effects requiring user input
- ✅ **Display real-time calculations** with the new formulas
- ✅ **Render tooltips** with detailed breakdowns

### **2. Test Scenarios**

#### **🏃 Scenario 1: Human Barbarian (Choice Testing)**
```
1. Create new character
2. Select "Human" ancestry
3. Select "Barbarian" class
4. In traits: Choose "Human Attribute Increase"
   ▶️ You should see a dropdown to choose which attribute
5. Set base attributes (try Might +3)
6. Check character sheet calculations
```

**Expected Results:**
- ✅ HP = Might + Level progression + bonuses (should be ~12 at level 1)
- ✅ Death threshold = Prime attribute + Combat Mastery (should be 4)
- ✅ AD shows conditional bonus when not wearing armor
- ✅ Rage and Battlecry appear in Features section

#### **🧙 Scenario 2: Elf Cleric (Multiple Choices)**
```
1. Create new character  
2. Select "Elf" ancestry
3. Select "Cleric" class
4. Choose Divine Damage type (Fire/Cold/Lightning/etc.)
5. Choose 2 Divine Domains (Life, Magic, War, etc.)
6. Check tooltips on character sheet
```

**Expected Results:**
- ✅ MP = Level progression + Domain bonuses
- ✅ Divine abilities appear in Features
- ✅ Combat training from War/Peace domains if chosen
- ✅ Conditional PD bonus from Elf Quick Reactions

#### **🏹 Scenario 3: Dwarf Hunter (Complex Choices)**
```
1. Create new character
2. Select "Dwarf" ancestry  
3. Select "Hunter" class
4. Choose 2 Favored Terrains (Mountain, Subterranean recommended)
5. Check granted movement abilities and senses
```

**Expected Results:**
- ✅ Climb speed from Mountain terrain
- ✅ Darkvision + Tremorsense from Subterranean
- ✅ Poison resistance from Dwarf traits
- ✅ Combat training with Heavy Armor from Dwarf

---

## 🔍 **Testing the Enhanced Features**

### **Choice UI Testing**
- ✅ **Human Attribute Increase**: Dropdown with all attributes
- ✅ **Cleric Divine Damage**: Radio buttons for damage types
- ✅ **Divine Domains**: Multi-select with exactly 2 choices
- ✅ **Favored Terrain**: Multi-select with exactly 2 choices

### **Real-Time Calculation Testing**
- ✅ **Attribute limits**: Should show total and breakdown (base + bonuses)
- ✅ **HP calculation**: Should use new formula (Might + progression + bonuses)
- ✅ **Defense calculations**: Should include trait bonuses
- ✅ **Conditional effects**: Should appear with condition indicators

### **Tooltip Testing**
1. Hover over **HP** → Should show "Might + Level HP + bonuses"
2. Hover over **Death Threshold** → Should show "Prime + Combat Mastery"
3. Hover over **Jump Distance** → Should show "Agility + modifiers"
4. Hover over **AD/PD** → Should show conditional bonuses

### **Character Sheet Display**
- ✅ **Features section**: Should list all granted abilities
- ✅ **Resistances**: Should show granted resistances (Dwarf Poison, etc.)
- ✅ **Movement**: Should show special movement types (Climb, Swim)
- ✅ **Senses**: Should show Darkvision, Tremorsense if granted

---

## 🧪 **Advanced Testing**

### **Multi-Level Testing**
```
1. Create a character at Level 1
2. Level up to Level 2
3. Check HP progression (should add from class table)
4. Verify all bonuses still apply correctly
```

### **Edge Case Testing**
```
1. Test negative attributes (Charisma -1, etc.)
2. Test Grit calculation with negative Charisma (should be minimum 0)
3. Test multiple ancestry traits at once
4. Test choice dependencies (traits affecting each other)
```

### **Cross-Class Testing**
```
1. Create all three class combinations:
   - Human Barbarian, Elf Barbarian, Dwarf Barbarian
   - Human Cleric, Elf Cleric, Dwarf Cleric  
   - Human Hunter, Elf Hunter, Dwarf Hunter
2. Verify trait + class feature interactions work correctly
```

---

## 🎮 **Quick Start Commands**

### **Test the Enhanced Calculator Directly**
```bash
cd /Users/yasafv/projects/dc20clean
npx tsx src/lib/rulesdata/_new_schema/demo_expanded.ts
```

### **Check Specific Character Builds**
```javascript
// In browser console or test script:
import { useEnhancedCharacterCalculation } from 'src/lib/hooks/useEnhancedCharacterCalculation';

// The hook provides:
// - Real-time calculated stats
// - Attribute limits and validation  
// - Detailed breakdowns for tooltips
// - Granted abilities list
```

---

## 🚨 **What to Watch For**

### **Should Work ✅**
- Choice dropdowns appear for user choices
- Real-time stat updates when making selections
- Tooltip breakdowns show sources
- All calculations use new formulas
- Features section populates automatically

### **Expected Limitations ⚠️**
- Only Human/Elf/Dwarf ancestries have new schema
- Only Barbarian/Cleric/Hunter classes have new schema  
- Other classes fall back to old system
- Some complex choices might not be fully implemented

### **Red Flags 🚨**
- Choice UI doesn't appear when expected
- Calculations don't update in real-time
- HP still using old formula (just Might + base)
- Tooltips show "undefined" or empty breakdowns

---

## 🎯 **Expected Performance**

The enhanced system should:
- ✅ **Load faster** (no regex parsing)
- ✅ **Calculate accurately** (all our fixes applied)
- ✅ **Display beautifully** (rich tooltips and breakdowns)
- ✅ **Handle choices** (intuitive UI for user selections)
- ✅ **Scale well** (easy to add new classes/traits)

## 🚀 **Ready for Production?**

This POC demonstrates:
- ✅ **Core system works** (3 classes, 3 ancestries)
- ✅ **Complex choices work** (Divine Domains, Favored Terrain)  
- ✅ **Calculations are correct** (all formula fixes applied)
- ✅ **UI integration works** (real-time updates, tooltips)

**Next step**: Expand to remaining classes or deploy this subset! 🎉
