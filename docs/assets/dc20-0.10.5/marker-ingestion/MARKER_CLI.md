# Marker CLI Notes

Last Updated: 2026-07-09

## Tool Policy

1. Marker is the selected PDF-to-Markdown tool for the DC20 0.10.5 ingestion path.
2. The Marker virtualenv is local machine state, not a repo artifact.
3. Do not vendor the Marker CLI, Python packages, or model cache into this repo.
4. The source PDF is local input only and is not maintained in this asset bundle.

## Local Command

Run from the repo root after installing `marker-pdf` into a local virtualenv:

```bash
env HF_HOME=/tmp/dc20-marker-hf TORCH_HOME=/tmp/dc20-marker-torch /tmp/dc20-marker-venv/bin/marker_single "DC20 RPG 0.10.5 Beta v1.pdf" --output_dir docs/assets/dc20-0.10.5/marker-ingestion --output_format markdown --disable_image_extraction --disable_multiprocessing --disable_ocr --disable_tqdm
```

Marker writes into a subdirectory named after the input PDF. Move the selected Markdown and metadata up into this folder only after reviewing the output.
