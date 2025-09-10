Demo: Autopilot agent flow

This demo shows a simple, repeatable flow that a Copilot Agent or contributor can follow to:

1. Instantiate a template (from `/templates`) into `examples/`.
2. Run the template's tests.
3. Create a new git branch, commit the generated files, and open a draft PR (if `gh` is available).

Usage (example):

```bash
./scripts/demo_agent_flow.sh crud examples/generated-demo demo/autopilot-demo "Add generated CRUD feature"
```

Notes:
- `gh` (GitHub CLI) must be authenticated to open a PR automatically; otherwise the script will print instructions to create the PR manually.
- The script is safe: it won't overwrite existing destinations and will abort on errors.
