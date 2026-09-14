Feature: Character campaign connection lifecycle
  A campaign connects to one persisted character, independent of the sheet used to present it.

  Background:
    Given an authenticated campaign member owns a cloud character
    And the member belongs to a campaign

  Scenario Outline: Connect a character from either sheet presentation
    Given the member opened the character using the <sheet> sheet
    When the member connects the character to the campaign
    Then the campaign membership references the owned character record
    And the campaign roster contains that character exactly once
    And the character reports that it is connected to the campaign

    Examples:
      | sheet       |
      | primary     |
      | alternative |

  Scenario: Reconnecting the same character is idempotent
    Given the character is connected to the campaign
    When the member connects the same character again
    Then the campaign roster contains that character exactly once
    And only one character-connected event exists for that connection

  Scenario: Character updates remain visible to the campaign
    Given the character is connected to the campaign
    When the owner changes the character from either sheet
    Then the campaign roster reflects the updated character state
    And no second campaign connection is created

  Scenario Outline: Character activity is presentation-independent
    Given the character is connected to the campaign
    And the member opened the character using the <sheet> sheet
    When the member performs a campaign-recorded character action
    Then the action is recorded against the connected character
    And campaign members receive the event

    Examples:
      | sheet       |
      | primary     |
      | alternative |

  Scenario Outline: A campaign member can view either sheet without editing
    Given the character is connected to the campaign
    When another campaign member opens the <sheet> presentation
    Then the same connected character record is displayed
    And every editing action is unavailable
    And no character write or character event is produced by that viewer

    Examples:
      | sheet       |
      | primary     |
      | alternative |

  Scenario: Disconnect a character
    Given the character is connected to the campaign
    When the owner disconnects the character
    Then the campaign roster no longer contains the character
    And future character actions are not recorded in that campaign
    And the underlying character remains available to its owner

  Scenario: Move a character between campaigns
    Given the character is connected to one campaign
    When the owner attempts to connect it to another campaign
    Then the connection is rejected until the first connection is removed
    When the owner disconnects it from the first campaign
    And connects it to the second campaign
    Then only the second campaign contains the character

  Scenario: Legacy character connections remain readable
    Given a campaign membership contains a legacy application-level character ID
    When the campaign roster is loaded
    Then the ID resolves only against a character owned by that member
    And the connection can be upgraded to the character record identity

  Scenario: Selecting a roster character opens that member's character
    Given two campaign members own characters with the same application-level ID
    And both character records are connected to the campaign
    When a campaign member opens the second roster entry
    Then the second character record is loaded
    And changing the record ID without changing the application ID cannot load another record

  Scenario: Campaign members receive connected-character activity
    Given the character is connected to the campaign
    When the owner performs a campaign-recorded character action
    Then another active campaign member receives the event

  Scenario Outline: Ending membership ends its active character connections
    Given the character is connected through a player membership
    When the membership ends because the player <exit>
    Then the campaign roster no longer contains the character
    And the underlying character remains available to its owner
    And rejoining the campaign does not restore the prior connection
    And the character must be explicitly connected again

    Examples:
      | exit               |
      | leaves             |
      | is removed by a DM |

  Scenario: Deleting a campaign ends its active character connections
    Given the character is connected to the campaign
    When the DM deletes the campaign
    Then the character reports no active connection to that campaign
    And the underlying character remains available to its owner

  Scenario: Replacing a deleted character requires a new connection
    Given the character record is connected to the campaign
    When the owner deletes that record
    And creates a replacement record with the same application-level ID
    Then the campaign roster does not contain the replacement
    And the replacement reports no campaign connection
    When the owner explicitly connects the replacement
    Then the campaign roster contains the replacement record
