# Disposable Graft A/B trial

Question: On dc20clean investigation tasks, does Graft reduce time and input tokens without losing answer correctness?

This is a throwaway, read-only agent experiment, not a repo integration. It copies the current visible text/code files (including uncommitted edits) into separate temporary Git repositories. Graft `init` runs only in the treatment copy with `--no-global --no-mcp --no-hooks`; telemetry is disabled with `DO_NOT_TRACK=1`. The source worktree and user-level Codex config are not changed. Generated scratch workspaces and traces remain under the printed temporary result path for inspection.

1. Install a **pinned** Graft version into a separate temporary prefix. Set `DO_NOT_TRACK=1` before installation because the published package has a postinstall script. Do not run `graft init` in this repo.
2. Run `node scripts/prototypes/graft-eval/run.mjs --graft /absolute/path/to/graft --prepare-only` to check snapshotting and treatment setup without agent calls.
3. After explicitly approving model access to this repo, run `node scripts/prototypes/graft-eval/run.mjs --graft /absolute/path/to/graft --allow-model-access` for both cases, or add `--case alternative-spell-cast` for a one-case pilot. `--out /absolute/path` keeps results at a chosen location. The Codex runner may also need permission to write its local state database.
4. Score each criterion in `review.md` **before** reading `summary.json`. Then compare correctness first, followed by wall time and `usage.input_tokens`; check `graftCalls` to confirm the treatment used the tool. Raw Codex JSONL and stderr are retained.

The trial is intentionally small. A useful adoption signal is no correctness loss on either task and a repeatable reduction in time/tokens across additional representative tasks. Two answers alone do not establish a general performance gain. Graft's one-time install and build time appears separately as `setup`; it is not hidden inside the task-run latency. This structural-only run does not test Graft's model-generated deep summaries. Graft's own estimated "tokens saved" compares its excerpt with reading entire files; use actual Codex usage from both arms instead.
