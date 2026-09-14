Feature: Wizard level 5 progression resources
  A Wizard's resources use the current spells-only rules and include every selected progression.

  Scenario: Level 5 Wizard takes two Spellcaster Path progressions
    Given a level 5 Wizard in the Portal Mage subclass
    And Spell School Initiate selected the Elemental school
    And the Wizard selected Expanded Spell School at level 2
    And the Wizard selected Crowned Sigil at level 4
    And both Path Progression choices selected the Spellcaster Path
    When the character resources are calculated under DC20 v0.10.5
    Then class progression grants 11 HP, 12 MP, and 6 Spells
    And class progression grants 2 Talents and 2 Path Progression choices
    And class progression grants 2 Attribute Points, 3 Skill Points, and 2 Trade Points
    And class progression grants 2 Ancestry Points and 1 subclass feature choice
    And the two Spellcaster Path progressions grant 6 MP and 2 Spells
    And Spell School Initiate grants 2 Elemental Spells
    And Expert Wizard grants 1 Spell from the chosen school
    And Expanded Spell School grants 2 Spells from an additional school
    And Crowned Sigil grants its ability without changing the resource totals
    And the Wizard has 0 maximum SP, 18 maximum MP, and 13 Spell slots
    And Combat Mastery and Mana Spend Limit are both 3
    And no Cantrip resource or slot category is produced
