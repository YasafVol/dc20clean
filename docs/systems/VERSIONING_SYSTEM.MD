# DC20Clean – Internal Versioning System

> Purpose: Canonical policy for schema, rules, PDF, and system-source versioning.
> Status: Active
> Last Updated: 2026-06-25

---

## 1. Version Types

DC20Clean uses separate version lanes. Do not collapse them into one field.

| Lane                 | Field / Constant                          | Meaning                                          | Current         |
| -------------------- | ----------------------------------------- | ------------------------------------------------ | --------------- |
| App/package          | `package.json.version`                    | Release/package version of the app itself        | `0.10.5`        |
| Storage schema       | `schemaVersion`, `CURRENT_SCHEMA_VERSION` | Shape of saved character data                    | `2.2.0`         |
| Rules interpretation | `rulesVersion`, `CURRENT_RULES_VERSION`   | DC20 ruleset used to interpret saved choices     | `dc20-0.10.5`   |
| PDF target           | `PdfVersion`, field maps                  | Fillable PDF template/field-map target           | `0.10`          |
| System source        | system constants/docs                     | Source artifact and section used for a subsystem | system-specific |

## 2. Canonical Formats

- Rules versions use the `dc20-<version>` form, for example `dc20-0.10.5`.
- Legacy shorthand such as `0.10.5` or `v0.10.5` may be accepted at boundaries, but must normalize through `normalizeRulesVersion()`.
- Schema versions are semantic versions, for example `2.2.0`, and normalize through `normalizeSchemaVersion()`.
- PDF versions are template identifiers, for example `0.10`; they are not the same as rules versions.
- System source metadata should point to a checked-in source artifact and named sections or line ranges when practical.

## 3. Ownership

| Concern                             | Source of truth                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| Known/current rules versions        | `src/lib/rulesdata/versioning/rulesVersion.ts`                                       |
| Character compatibility gates       | `src/lib/rulesdata/versioning/compatibility.ts`                                      |
| Rules upgrade mappings              | `src/lib/rulesdata/versioning/aliases.ts`                                            |
| Explicit character upgrade flow     | `src/lib/rulesdata/versioning/characterUpgrade.ts`                                   |
| Storage schema version              | `src/lib/types/schemaVersion.ts`                                                     |
| Character storage shape             | `src/lib/types/dataContracts.ts`, `docs/systems/DATABASE_SYSTEM.MD`                  |
| PDF routing                         | `src/lib/rulesdata/versioning/compatibility.ts`, `docs/systems/PDF_EXPORT_SYSTEM.MD` |
| PDF field-version audits            | `scripts/pdf/auditPdfFields.mjs`, `scripts/pdf/pdfFieldAuditService.mjs`             |
| Equipage source/version metadata    | `src/lib/rulesdata/equipment/schemas/baseEquipment.ts`                               |

## 4. Rules Version Policy

`rulesVersion` is the rules interpretation fence.

- New characters are saved with `CURRENT_RULES_VERSION`.
- Missing `rulesVersion` means legacy `dc20-0.10`.
- A character whose `rulesVersion` is not current must not be silently recalculated under current rules.
- Compatibility is classified as:
  - `editable`: full render, edit, recalculation, auto-save.
  - `upgrade-required`: render/export allowed from stored values only; no edit, level-up, recalculation rewrite, or auto-save.
  - `view-only`: best-effort render, no auto-save, no edit/level-up.
- Explicit upgrade must create a new current-rules draft and leave the original legacy character locked and unchanged.
- Pure aliases, reworks, deprecated IDs, and ambiguous IDs must be represented in `RULES_ALIASES`. Despite the legacy constant name, this is the cross-system upgrade mapping catalog, not only a spell-alias table.

### 4.1 Character Rules Migration

Rules migration is a create-new-version flow, not an in-place edit.

Required behavior:

1. Load the legacy character as read-only.
2. Build a migration plan from the upgrade mapping catalog before writing data.
3. Create a new current-rules draft record with a new ID and `rulesUpgradeSourceId` pointing at the locked source.
4. Preserve the source character unchanged unless the user explicitly deletes it.
5. Apply automatic aliases and approved reworks in the draft.
6. Recalculate all current-rules derived values that the calculator can determine from the migrated draft.
   - The draft must be stamped with `CURRENT_SCHEMA_VERSION`.
   - Recalculation must persist calculated display/export arrays such as resistances, vulnerabilities, senses, and combat training.
7. Mark the draft as `rulesUpgradeStatus: "needs-review"` when retired/deprecated selections were removed or require player alternatives.
8. Force unresolved retired/ambiguous choices through explicit user selection before treating the upgrade as complete.

Migration UX must show the plan before creating the draft: automatic renames, reworks, retired selections, blockers, source rules version, target rules version, and the new draft identity.

`needs-review` drafts should send the user back through the normal character creation/editing flow with illegal retired choices unselected. The user resolves missing alternatives there, then saves the draft as the updated current-rules character.

If a legacy character already has a current-rules copy, the default action opens the existing copy. Creating another migrated copy must be an explicit secondary action.

`rulesUpgradeStatus: "needs-review"` applies to any risky migration result, including removed selections, reworked selections, unresolved validation, or failed recalculation.

## 5. Schema Version Policy

`schemaVersion` is only the saved-data shape version.

- It must not imply rules text, rules behavior, PDF template, or app release version.
- Backward-compatible saved-data additions bump minor or patch according to `schemaVersion.ts` guidance.
- Breaking saved-data changes require a major version and an explicit migration plan.
- Automatic schema migrations may fill missing fields or normalize legacy structures, but must not reinterpret old rules choices.

## 6. PDF Version Policy

PDF versioning follows available fillable templates and field maps.

- Rules versions route to PDF versions through `getPdfVersionForRulesVersion()`.
- `dc20-0.10.5` currently routes to the `0.10` PDF template because the supported v0.10.5 fillable export target is the same template/field map as v0.10.
- PDF export always reads stored `SavedCharacter` values and must not run current-rules recalculation during export.
- PDF export must not apply compatibility aliases or rules-upgrade decisions. It can format exact current catalog IDs for display, but legacy/reworked saved IDs remain the stored value.
- Unsupported or future rules versions may export on a best-effort basis when the routing layer can map them to an available template.
- Before adding or changing a supported PDF version, run the generic PDF field audit service against the previous and new templates. The service is version-agnostic; labels such as `0.10` or `0.10.5` are report metadata, not runtime routing rules.
- A PDF audit report may justify reusing an existing template/field map, adding a new versioned field map, or adding a new template route. Runtime export must still use explicit versioned helpers and maps.

## 7. System Source Metadata

When a subsystem is audited or updated against a rules release, record its source.

Minimum standard:

- Current rules version.
- Checked-in source artifact path.
- Relevant section names or line ranges.
- Runtime constant when that subsystem stores/export data independently.

Example:

```typescript
export const EQUIPMENT_RULES_SOURCE = {
	version: EQUIPMENT_RULES_VERSION,
	name: 'DC20 RPG 0.10.5 Beta v1',
	path: 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md',
	sections: {
		weapons: 'Equipment > Weapon Properties / Creating Weapons'
	}
} as const;
```

System docs must mention the same source in a “Rules Source & Version” section when the system owns rules data.

## 8. Change Checklist

When changing rules data or behavior:

1. Identify the affected system docs before editing.
2. Confirm the source artifact and section.
3. Decide whether this is a schema change, rules change, PDF routing change, or app-only behavior change.
4. If rules identity changes, update `RULES_ALIASES`.
5. If old data should remain loadable but not editable, ensure compatibility gates classify it correctly.
6. If stored/exported subsystem data has its own `rulesVersion`, preserve it on import/export and stamp new saves.
7. If the change adds or changes a PDF template, run `npm run pdf:fields:audit -- --old <old-pdf> --new <new-pdf> --field-map <map.ts>` and commit the relevant report.
8. Add focused tests for normalization, compatibility, upgrade, or behavior as appropriate.
9. Update the relevant `docs/systems/*.MD` timestamp.

## 9. Anti-Patterns

- Do not use `package.json.version` to infer rules behavior.
- Do not use `schemaVersion` to infer rules behavior.
- Do not silently rewrite legacy saved choices without the explicit upgrade flow.
- Do not add a new rules release by editing scattered string literals; add constants and normalization first.
- Do not treat PDF version and rules version as identical unless the template and field map are actually version-aligned.
