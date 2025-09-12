### Export Decisions

- Chosen approach: client-side template fill with `pdf-lib`.
- Rationale: SPA-only deploy (no server runtime), faster iteration, zero infra.
- Template version: dc20-0.9.5; base file under `src/lib/pdf/095/`.
- Field list: generated via dev script to `docs/systems/pdf-form-fields-v0.9.5.json`.
- Fallbacks: none for MVP. Optional print-to-HTML route remains separate.

