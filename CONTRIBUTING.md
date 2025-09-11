# Contributing

Thank you for contributing! This project is intended to be a friendly starter kit for Copilot Agent Mode.

Getting started
1. Fork the repo and create a branch from `main`.
2. Run the devcontainer or install Node 20 locally.
3. If you're adding a new template under `/templates`, include a `package.json` and at least one test.

Testing
- From the repo root you can run tests for templates:

```bash
for d in templates/*; do
  if [ -f "$d/package.json" ]; then
    (cd "$d" && if [ -f package-lock.json ]; then npm ci; else npm install; fi && npm test)
  fi
done
```

PR guidelines
- Include a short description and testing steps.
- Add or update tests for new behavior.
- Run linters and formatters before opening a PR.

Code style
- Use Prettier/ESLint where applicable. Keep changes focused and well-documented.

Template manifests and validation
--------------------------------

When adding a new template under `/templates/<name>` prefer adding a `template.json` manifest to declare variables the generator should collect.

See `templates/schema/README.md` for the manifest schema and examples. To validate your manifest locally run:

```bash
# from repo root
node scripts/ask_vars.js templates/<your-template> --defaults
# or run the Jest manifest tests
npm test __tests__/manifest.test.js
```

CI will run manifest validation automatically on PRs via `.github/workflows/ci.yml`.
