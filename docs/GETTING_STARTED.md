# Getting started — one minute

This guide shows the minimal steps for a new user to generate a feature, run tests, and iterate.

Prereqs
- Node 20 (devcontainer comes preconfigured).
- Optional: `gh` (GitHub CLI) if you want to open PRs from scripts.

Quick summary
1. Generate a feature from a template.
2. Install dependencies in the generated folder.
3. Run the tests for the generated feature.

Commands (copy/paste)

```bash
# 1) generate a CRUD feature into ./features/tasks
./scripts/generate_feature.sh crud ./features/tasks

# 2) install and run tests
(cd ./features/tasks && if [ -f package-lock.json ]; then npm ci; else npm install; fi && npm test)

# 3) run the safe demo wrapper
./examples/try-now.sh crud ./examples/tasks-demo
```

Notes
- Use `--interactive` with `scripts/generate_feature.sh` to answer prompts live.
- Provide KEY=VALUE args to pre-fill variables (e.g., PROJECT_NAME=Acme).
- Validate manifests locally:

```bash
node scripts/ask_vars.js templates/crud --defaults
```

Where to go next
- See `templates/prompts.md` for copy/paste prompts to give to Copilot Agent.
- See `templates/<name>/template.json` to learn what variables a template expects.
