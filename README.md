# DC20 Clean Character Sheet

## TODO

### Critical Issues
- **Fix weapon selection crash**: The attack system currently crashes when selecting weapons on the character sheet page. The weapons.ts file has been deleted in favor of consolidating to inventoryItems.ts, but the attack system needs to be properly refactored to work with the inventory weapon structure. This requires updating the Attacks component to use the correct weapon properties and interfaces from inventoryItems.ts.

### Character Creation & Validation
- **Fix skill and trade caps validation**: Implement proper validation for skill and trade point spending limits during character creation to prevent overspending.
