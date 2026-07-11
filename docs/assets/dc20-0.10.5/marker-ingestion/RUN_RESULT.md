# DC20 0.10.5 PDF-to-Markdown Run Result

Last Updated: 2026-07-09

## Decision

Use Marker for the DC20 0.10.5 PDF-to-Markdown ingestion path.

## Source

1. Input PDF used for the run: `DC20 RPG 0.10.5 Beta v1.pdf`
2. The source PDF is not maintained in this asset bundle.
3. Retained Markdown: `docs/assets/dc20-0.10.5/marker-ingestion/DC20 RPG 0.10.5 Beta v1.md`
4. Retained Marker metadata: `docs/assets/dc20-0.10.5/marker-ingestion/DC20 RPG 0.10.5 Beta v1_meta.json`

## Marker Run

1. Package: `marker-pdf 1.10.2`
2. Runtime: about 494.24 seconds
3. Output size: about 840 KB
4. Output lines: 14,827
5. Output words: 131,978
6. Markdown headings: 2,006
   1. `h1`: 1,402
   2. `h3`: 597
   3. `h4`: 7
7. Page anchors: 214
8. Markdown table lines: 742
9. Command as run before moving selected files into this Marker-only folder:

```bash
env HF_HOME=/tmp/dc20-marker-hf TORCH_HOME=/tmp/dc20-marker-torch /tmp/dc20-marker-venv/bin/marker_single "DC20 RPG 0.10.5 Beta v1.pdf" --output_dir output/pdf/dc20-0105-pipeline-comparison/marker --output_format markdown --disable_image_extraction --disable_multiprocessing --disable_ocr --disable_tqdm
```

## Rejected Pipelines

1. PyMuPDF4LLM default run
   1. Runtime: about 209.65 seconds
   2. Markdown headings: 892
   3. Problem: 870 headings were emitted as `h6`; output also included OCR/picture-text noise.
   4. Result: rejected for hierarchy preservation.
2. MarkItDown
   1. Runtime: about 10.43 seconds
   2. Markdown headings: 0
   3. Problem: output was plain text for this PDF, not useful Markdown hierarchy.
   4. Result: rejected for hierarchy preservation.

## Notes

1. Marker used local models and no LLM/API service.
2. The first Marker run downloaded about 3.2 GB of Datalab/Surya model cache under `/Users/yasaf/Library/Caches/datalab/models`.
3. PyMuPDF4LLM and MarkItDown were installed only in `/tmp/dc20-pdf-pipelines-venv`; that mixed-tool venv has been removed.
4. Marker output is the best raw source tested, but still needs post-processing:
   1. Normalize heading depth. Many sections are flattened to `h1`.
   2. Reconcile page anchors. Marker emitted 214 page anchors for a 269-page PDF.
   3. Review the generated table of contents region before using it as source navigation.
