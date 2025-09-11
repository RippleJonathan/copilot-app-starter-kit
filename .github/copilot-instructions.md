This file is the compact, actionable guide for an AI coding agent working in this
repository. Read it first and follow its conventions exactly when making changes.

1) Big picture (what this repo is for)
- Purpose: a small, opinionated "Copilot Agent starter kit" that exposes
  runnable feature templates and a generator so users can say "Add X" and get
  scaffolded code, tests, and a draft PR. See `COPILOT_INSTRUCTIONS.md` for the
  longer human-facing guide.
- Key folders: `templates/` (feature scaffolds), `scripts/` (generator + helpers),
  `.github/workflows/` (CI + manifest lint + smoke demo).

2) Architecture & patterns to know
- Templates are self-contained feature folders under `templates/<name>/`. They
  usually include `index.js`, `package.json`, tests under `__tests__/`, and
  `template.json` (manifest). Example: `templates/crud/` and `templates/auth/`.
- Placeholder format: templates use `{{VAR_NAME}}` and are applied by
  `scripts/template_apply.js` after generation.
- Manifests: `templates/*/template.json` declare variables agent should collect
  (schema at `templates/schema/template.schema.json`). Use `choices`, `secret`,
  `required`, `default` to control prompts.
- Tests: template examples are runnable Node projects (Express + Jest + supertest)
  so generated features should include tests. CI runs each template's `npm test`.

3) Developer workflows (commands the agent must use)
- Generate a template locally (non-destructive by default):
  ./scripts/generate_feature.sh <template> <destination> [KEY=VALUE ...]
  - `--interactive` forces interactive prompts (uses inquirer).
  - If you pass KEY=VALUE pairs the generator will merge them and default the rest.
- Validate/collect vars from a manifest:
  node scripts/ask_vars.js templates/<name> --defaults
- Apply placeholders: `scripts/template_apply.js` is used internally; it replaces
  `{{VAR}}` in all text files.
- Run all tests (root): `npm test` (this runs Jest and the template tests).

4) CI & validation
- CI path: `.github/workflows/ci.yml` contains `manifest-lint`, `test-templates`,
  and `smoke-demo` jobs. `manifest-lint` installs root dev deps and runs
  `node scripts/ask_vars.js <template> --defaults` for each template.
- Make sure `template.json` passes AJV validation (schema at
  `templates/schema/template.schema.json`) before generating or opening PRs.

5) Project-specific conventions & gotchas
- Node version: CI & devcontainer use Node 20. Use the devcontainer when possible.
- Template naming: each template should include a `package.json` and tests so CI
  can run them. Avoid duplicate `package.json` `name` fields across templates
  (Haste/Jest can report naming collisions when multiple packages share the
  same `name`).
- Non-destructive default: the generator intentionally defaults to `--defaults`
  to avoid blocking in CI and scripted runs; use `--interactive` when human input
  is expected.
- Secrets: mark variables with `"secret": true` in `template.json` so the
  agent will prompt with hidden input when interactive.

6) Integration points & external dependencies
- `gh` (GitHub CLI) is optional: `scripts/demo_agent_flow.sh` will create a
  branch and open a draft PR only when `gh` is present and authenticated.
- Templates may have real NPM dependencies (e.g., express). CI caches `~/.npm`.

7) How to propose and commit changes
- Small, focused PRs: generate into a feature folder, run tests, commit on a
  named branch, and open a draft PR for human review. The demo script shows the
  typical flow: `scripts/demo_agent_flow.sh`.

8) Quick examples an agent can run right now
- Validate manifests: `node scripts/ask_vars.js templates/crud --defaults`
- Generate a template with a provided var:
  ./scripts/generate_feature.sh crud ./generated/tasks PROJECT_NAME=AcmeTasks
- Run all tests locally: `npm test`

If anything in this file is unclear or a template lacks a `template.json`, ask
the human for clarification and propose a minimal `template.json` (name, one
variable) before proceeding. After changes, run `node scripts/ask_vars.js` to
validate and `npm test` to ensure CI will be green.
