# DC20 0.10.5 Rules Ingestion

This folder contains generated and reviewed artifacts for the DC20 0.10.5 rules conversion.

## Source Inputs

- Source PDF: `/Users/yasafv/Downloads/DC20 RPG 0.10.5 Beta v1.pdf`
- Docling binary: `/Users/yasafv/Library/Python/3.9/bin/docling`
- Optional local cleanup model: Ollama `llama3.2`
- Baseline v0.10 Markdown: `docs/assets/DC20 0.10 full.md`

The source PDF is intentionally not stored in this repository.

## Pipeline

1. Extract Markdown with Docling.

The all-at-once OCR-capable command can sit for a long time without writing artifacts. For this PDF, the stable local command was:

```bash
/Users/yasafv/Library/Python/3.9/bin/docling \
  --to md \
  --image-export-mode placeholder \
  --table-mode accurate \
  --no-ocr \
  --pdf-backend pypdfium2 \
  --device cpu \
  --num-threads 1 \
  --page-batch-size 1 \
  --document-timeout 600 \
  --output docs/assets/dc20-0.10.5/raw \
  "/Users/yasafv/Downloads/DC20 RPG 0.10.5 Beta v1.pdf"
```

Run the same command with `--to json` when page anchors need to be recovered for Markdown cleanup.

2. Run deterministic cleanup:

```bash
node scripts/dc20-105-clean-md.mjs
```

3. Optionally run local Ollama review on flagged chunks:

```bash
OLLAMA_CHUNK_LIMIT=10 node scripts/dc20-105-ollama-cleanup.mjs
```

Use `--apply` only after reviewing the model output. The script rejects suggestions that change numeric signatures, headings, or page markers.

4. Generate the change audit and data-shape review:

```bash
node scripts/dc20-105-audit-scaffold.mjs
```

## Artifacts

- `DC20 0.10.5 clean.md` — cleaned Markdown rules source.
- `chunks.json` — semantic chunks with metrics and review flags.
- `page-index.json` — Docling JSON-derived page anchors used to inject Markdown page markers.
- `CLEANUP_REPORT.md` — cleanup validation and human-review queue.
- `CHANGE_AUDIT.md` — system-by-system change audit scaffold.
- `DATA_SHAPE_REVIEW.md` — storage/schema/data-shape review.

## Rules

- Do not edit current rules data from extraction artifacts alone.
- Use `CHANGE_AUDIT.md` as the implementation gate.
- HITL-required changes must be approved before asset updates.
- Preserve v0.10 behavior until versioned runtime/storage/export work lands.
