# Save-report verification — 2026-10-03

1. Reports: Userback 7946195 (Cleric 3/Priest, elevated Medicine) and 7946833
   (Wizard 2, legacy upgrade), both dated June 27. Both use Spellcasting Expansion
   and one spellcasting path point. Original report payloads expired.
2. `save-reports.json` contains constructed builds exported from today's actual
   character-creation UI. Legacy cases change only rules version and partial runtime
   data; they are compatibility reproductions, not recovered historical characters.
3. Confirmed failures and fixes:
   1. Production JSON import failed because `importedAt` was not in the strict table
      validator. Strip this field at the persistence boundary, stop adding it during
      import, and save only the imported record.
   2. Edit restored known spells under invented slot IDs. Match saved spells to
      current eligible slots, reassigning matches for restricted grants. Unmatched
      choices remain subject to normal review/completion gates.
4. Verification:
   1. Baseline frontend: production commit `8fd72dd07b008873207a2e6a39c2fe27ba8fa142`.
      The same Playwright legacy journeys fail for both classes at the Spells step.
   2. Fixed frontend: all eight Playwright journeys pass in Chromium and WebKit
      (creation, legacy import, upgrade, edit/finish, reload, JSON export, source and
      unrelated-save preservation). Runner uses local storage without mocked saves.
   3. User Chrome: current creation passes on production. Fixed local frontend at
      `127.0.0.1:4176` passes authenticated import, upgrade, edit/finish and reload
      against unchanged production Convex `hip-gull-215`. Medicine elevation,
      known spells, notes, HP/MP, currency, originals and unrelated save preserved.
   4. Strict-schema/authenticated Convex tests and spell/completion tests pass.
      Standard frontend build passes. Repository-wide type checking still reports
      baseline errors; this change removes the `importedAt` error and adds none.
5. Production frontend has not been deployed. Failed baseline import refreshed
   existing save timestamps before rejection; character content was preserved.
   Clearly named `SAVE AUDIT` test characters remain for review.

Run `VITE_USE_CONVEX=false npx playwright test e2e/25-save-reports.e2e.spec.ts --workers=1`.
Use `PLAYWRIGHT_SKIP_BUILD=1` only when the existing build already includes the fixes.
A passing local-storage runner does not replace authenticated cloud verification.
