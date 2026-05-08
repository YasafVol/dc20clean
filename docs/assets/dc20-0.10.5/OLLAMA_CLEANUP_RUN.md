# Ollama Cleanup Run

Goal: run a visible, inspectable review pass over the DC20 0.10.5 Docling Markdown cleanup candidates using local Ollama only. This run is suggestions/review only; no rules text should be rewritten and `DC20 0.10.5 clean.md` must remain unchanged.

## Scope

- Working directory: `/Users/yasafv/Repos/dc20clean`
- Input Markdown: `docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md`
- Chunk index: `docs/assets/dc20-0.10.5/chunks.json`
- Review output: `docs/assets/dc20-0.10.5/ollama-cleanup-review.json`
- Cleanup report: `docs/assets/dc20-0.10.5/CLEANUP_REPORT.md`
- Local model expected: `llama3.2`

## Preflight

- Timestamp started: `2026-05-08T14:50:01Z`
- Command: `date -u '+%Y-%m-%dT%H:%M:%SZ'`
- Command: `shasum -a 256 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md'`
  - Result: `3b76789d7ac96ae5071362d943a481e1cce750c4db88b68ea0c2c3e4e61769b3`
- Command: `node -e "const fs=require('fs'); const chunks=JSON.parse(fs.readFileSync('docs/assets/dc20-0.10.5/chunks.json','utf8')); const flagged=chunks.filter(c=>c.needsHumanReview); console.log(JSON.stringify({totalChunks:chunks.length, flaggedChunks:flagged.length, firstFlagged:flagged.slice(0,10).map(c=>({chunkId:c.chunkId, heading:c.heading}))}, null, 2));"`
  - Result: `2021` total chunks, `52` chunks flagged for human review.
  - First 10 flagged chunks: `dc20-105-0013`, `dc20-105-0025`, `dc20-105-0057`, `dc20-105-0125`, `dc20-105-0133`, `dc20-105-0142`, `dc20-105-0265`, `dc20-105-0616`, `dc20-105-0620`, `dc20-105-0657`.

## Decisions

- Use only the local Ollama HTTP service at `127.0.0.1:11434`.
- Do not use hosted models or network services.
- Run `scripts/dc20-105-ollama-cleanup.mjs` without `--apply`.
- Start with the bounded command `OLLAMA_CHUNK_LIMIT=10 node scripts/dc20-105-ollama-cleanup.mjs`.
- Stop and document if requests hang or loop.
- The script writes `ollama-cleanup-review.json` and appends an Ollama section to `CLEANUP_REPORT.md` even without `--apply`; this is expected generated cleanup metadata.

## Run Notes

### Ollama Availability

- Command: `command -v ollama && ollama list`
  - Result: Ollama CLI found at `/opt/homebrew/bin/ollama`.
  - Result: local model available: `llama3.2:latest` (`a80c4f17acd5`, 2.0 GB).
- Command: `curl -sS --max-time 5 http://127.0.0.1:11434/api/tags`
  - Result: local Ollama API responded successfully with `llama3.2:latest`.

No hosted model or network service was used.

### Bounded Cleanup Review

- Timestamp completed: `2026-05-08T14:51:40Z`
- Command: `OLLAMA_CHUNK_LIMIT=10 node scripts/dc20-105-ollama-cleanup.mjs`
- Result: completed successfully and wrote `docs/assets/dc20-0.10.5/ollama-cleanup-review.json`.
- Reviewed chunks: `10`
- Accepted suggestions: `0`
- Rejected / validation issue records: `10`
- HITL records: `10`
- `DC20 0.10.5 clean.md` SHA-256 after run: `3b76789d7ac96ae5071362d943a481e1cce750c4db88b68ea0c2c3e4e61769b3`
- Clean Markdown changed: no.

Decision: stop after the bounded pass. Runtime was acceptable, but the output quality was not healthy enough to justify continuing through all `52` flagged chunks. The model repeatedly returned invalid JSON or confidence `0`, so the review produced no auto-acceptable suggestions.

### Highest-Signal Findings From Review JSON

- `dc20-105-0013` (`Discord`): rejected because Ollama response did not contain JSON.
- `dc20-105-0025` (`Attribute Limit`): rejected because confidence was below `0.85`.
- `dc20-105-0057` (`Trades List`): rejected because Ollama response did not contain JSON.
- `dc20-105-0125` (`Skill Mastery Levels &amp; Limits`): rejected because numeric signature changed, heading signature changed, and confidence was below `0.85`.
- `dc20-105-0142` (`Language Mastery Levels`): model flagged a broken line wrap, but confidence was below `0.85`, so it remains HITL.
- `dc20-105-0265` (`Degrees of Damage Table`): rejected because returned JSON had a bad control character.
- `dc20-105-0620` (`Familiar`): rejected because heading signature changed and confidence was below `0.85`.

### Final Result

Review-only run completed. No suggestions were applied. `ollama-cleanup-review.json` is available for inspection, and `CLEANUP_REPORT.md` contains the script-generated Ollama review appendix for the bounded run.
