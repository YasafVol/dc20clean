# Asset and Code Structure TODO

Last Updated: 2026-07-09

## Deferred Review

1. Review the full project directory structure for asset/code boundaries.
2. Decide where versioned rulebook source artifacts, generated ingestion artifacts, source PDFs, runtime assets, and app code should live.
3. Normalize naming and ownership across at least:
   1. `docs/assets/`
   2. `assets/`
   3. `src/assets/`
   4. `src/lib/pdf/`
   5. `output/`
   6. ingestion scripts under `scripts/`
4. Decide what must be tracked, ignored, or local-only.
5. Update relevant READMEs and `.gitignore` rules after the review.

This is intentionally not part of the Marker ingestion decision.
