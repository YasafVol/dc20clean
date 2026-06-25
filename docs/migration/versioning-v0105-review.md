# Versioning System v0.10.5 Review

> Last Updated: 2026-06-25

## Scope

Review app/schema/rules/PDF version lanes, compatibility gates, and legacy-to-current character upgrade-copy behavior.

## Findings

1. Version lanes are separated correctly.
   1. App/package: `package.json.version`.
   2. Storage schema: `schemaVersion` / `CURRENT_SCHEMA_VERSION`.
   3. Rules interpretation: `rulesVersion` / `CURRENT_RULES_VERSION`.
   4. PDF target: `PdfVersion` routed from rules version.
   5. System source metadata: per subsystem.

2. Compatibility gates match policy.
   1. Current rules characters are editable and auto-save fully.
   2. Old rules characters are loadable and sheet-renderable, but not editable or levelable.
   3. Unsupported rules versions are view-only.
   4. PDF export remains stored-value based.

3. Upgrade flow follows copy-not-mutate policy.
   1. The source character is left unchanged.
   2. The new draft gets a new ID, current rules version, and source lineage metadata.
   3. The modal shows automatic aliases, reworks, deprecated removals, and blockers before writing.
   4. `RULES_ALIASES` is currently a broad upgrade mapping catalog across domains, not only a spell-alias list.

4. Gaps fixed.
   1. Current-rules upgrade drafts now stamp `CURRENT_SCHEMA_VERSION` instead of preserving the source schema version.
   2. Upgrade recalculation now persists collected display/export arrays: resistances, vulnerabilities, senses, and combat training.

## Current Limits

1. Alias catalog quality remains only as good as audited system data.
   1. Reworked/deprecated choices must continue to be added as each subsystem audit finds them.

2. Upgrade completion relies on the normal creation/edit flow.
   1. Drafts can be marked `needs-review`.
   2. Illegal retired choices should be unselected in the draft.
   3. The user resolves missing alternatives in the character creation/editing flow before saving the current-rules draft.

3. PDF version routes `dc20-0.10.5` to template `0.10`.
   1. This is intentional because the supported v0.10.5 fillable export target is the same template/field map as v0.10.

## Validation Targets

1. `src/lib/rulesdata/versioning/compatibility.test.ts`
2. `src/lib/rulesdata/versioning/characterUpgrade.test.ts`
3. `src/lib/rulesdata/versioning/legacyCharacterAcceptance.test.ts`
4. `npm run build`
5. `git diff --check`
