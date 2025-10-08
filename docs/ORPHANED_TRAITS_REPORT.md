# Orphaned Traits Analysis Report

**Generated**: Based on ancestry tests  
**Issue**: 13 traits exist in `traits.ts` but are not referenced by any ancestry

---

## Summary

These appear to be **legacy/duplicate traits** with naming differences from the currently-used traits. They should likely be removed or consolidated.

---

## Detailed Analysis

### 1. Giantborn (3 orphaned traits)

| Orphaned Trait ID | Orphaned Trait Name | Similar Used Trait | Status |
|-------------------|---------------------|-------------------|--------|
| `giantborn_giant_blood` | Giant Blood | None found | ❓ Unique - should be added or removed |
| `giantborn_throw_ally` | Throw Ally | `giantborn_titanic_toss` (Titanic Toss) | 🔄 Similar - consolidate |
| `giantborn_clumsy` | Clumsy (PD -1) | `giantborn_clumsy_giant` (Clumsiness, DisADV Agility) | 🔄 Different effects - clarify |

**Recommendation**: 
- `giant_blood`: Check if this should be a default trait (Size: Large is significant)
- `throw_ally` vs `titanic_toss`: Consolidate or clarify difference
- `clumsy`: Two versions exist with different effects - consolidate

---

### 2. Angelborn (3 orphaned traits)

| Orphaned Trait ID | Orphaned Trait Name | Currently Used Trait | Status |
|-------------------|---------------------|---------------------|--------|
| `angelborn_divine_resistance` | Divine Resistance (Holy Half) | `angelborn_radiant_resistance` (Radiant Half) | 🔄 Naming - Holy vs Radiant |
| `angelborn_healing_hands` | Healing Hands (1d4+PM) | `angelborn_healing_touch` (Touch to heal) | 🔄 Duplicate - same mechanic |
| `angelborn_light_sensitivity` | Light Sensitivity (DisADV) | None in use | ❓ Negative trait - check if intended |

**Recommendation**:
- `divine_resistance` vs `radiant_resistance`: Use consistent damage type (Radiant preferred per D&D conventions)
- `healing_hands` vs `healing_touch`: Remove duplicate, keep one
- `light_sensitivity`: If this is a valid negative trait, add to expanded list

---

### 3. Fiendborn (3 orphaned traits)

| Orphaned Trait ID | Orphaned Trait Name | Currently Used Trait | Status |
|-------------------|---------------------|---------------------|--------|
| `fiendborn_hellish_resistance` | Hellish Resistance (Fire Half) | `fiendborn_fiendish_resistance` (Chosen Fiendish type) | 🔄 Specific vs Choice |
| `fiendborn_infernal_legacy` | Infernal Legacy (1 Cantrip) | `fiendborn_fiendish_magic` (Fiendish spells) | 🔄 Duplicate - same mechanic |
| `fiendborn_holy_vulnerability` | Holy Vulnerability (1) | `fiendborn_radiant_weakness` (Radiant Vuln) | 🔄 Naming - Holy vs Radiant |

**Recommendation**:
- `hellish_resistance`: Either consolidate into `fiendish_resistance` or keep as Fire-specific option
- `infernal_legacy` vs `fiendish_magic`: Remove duplicate
- `holy_vulnerability` vs `radiant_weakness`: Use consistent damage type (Radiant)

---

### 4. Beastborn (3 orphaned traits)

| Orphaned Trait ID | Orphaned Trait Name | Currently Used Trait | Status |
|-------------------|---------------------|---------------------|--------|
| `beastborn_keen_senses` | Keen Senses (ADV hear/smell) | `beastborn_keen_sense` (singular) | 🔄 Plural vs Singular |
| `beastborn_thick_hide` | Thick Hide (+1 AD unarmored) | `beastborn_thick_skinned` (similar) | 🔄 Naming difference |
| `beastborn_wild_mind` | Wild Mind (DisADV INT) | None in use | ❓ Negative trait - check if intended |

**Recommendation**:
- `keen_senses` vs `keen_sense`: Use singular form consistently, remove plural
- `thick_hide` vs `thick_skinned`: Consolidate to one name
- `wild_mind`: Valid negative trait, add to expanded list if intended

---

### 5. Dwarf (1 orphaned trait)

| Orphaned Trait ID | Orphaned Trait Name | Currently Used Trait | Status |
|-------------------|---------------------|---------------------|--------|
| `dwarf_trade_expertise` | Trade Expertise (Crafting/Services) | None in dwarf list | ✅ Should be added |

**Recommendation**:
- This appears to be a valid trait that should be in Dwarf's expanded list
- Similar to `human_trade_expertise` pattern

---

## Recommended Actions

### Immediate (Data Cleanup)

1. **Remove Clear Duplicates** (6 traits):
   - `angelborn_healing_hands` → keep `angelborn_healing_touch`
   - `fiendborn_infernal_legacy` → keep `fiendborn_fiendish_magic`
   - `beastborn_keen_senses` → keep `beastborn_keen_sense`
   - `angelborn_divine_resistance` → rename to use Radiant
   - `fiendborn_hellish_resistance` → consolidate into fiendish_resistance
   - `beastborn_thick_hide` → keep `beastborn_thick_skinned`

2. **Add Missing Traits** (2 traits):
   - Add `dwarf_trade_expertise` to Dwarf expanded list
   - Consider adding `giantborn_giant_blood` to Giantborn (Size: Large is significant)

3. **Clarify Negative Traits** (3 traits):
   - `angelborn_light_sensitivity` - decide if this should be in expanded list
   - `beastborn_wild_mind` - decide if this should be in expanded list  
   - `giantborn_clumsy` - resolve conflict with `giantborn_clumsy_giant`

4. **Review Throw Mechanics** (1 trait):
   - `giantborn_throw_ally` vs `giantborn_titanic_toss` - are these different mechanics?

### Long-term (Consistency)

1. **Standardize Damage Types**: Holy → Radiant (per D&D conventions)
2. **Naming Consistency**: Decide on singular vs plural (e.g., "Keen Sense" not "Keen Senses")
3. **Trait ID Pattern**: Ensure all follow `ancestry_snake_case` convention

---

## Testing Impact

After cleanup, re-run tests with:
```bash
npm run test:unit -- ancestries.test.ts
```

Expected result: 0 orphaned traits, all tests passing.

---

**Priority**: Medium  
**Effort**: 1-2 hours  
**Risk**: Low (no calculator impact, just data cleanup)

