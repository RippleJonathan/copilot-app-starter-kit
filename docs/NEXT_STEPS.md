# Next Steps — High level & Next-level recommendations

This file summarizes recommended priorities to make this starter kit more user-friendly and production-ready.

High-level (short-term, priority)
- Make templates runnable: add required dependencies and scripts to each template (`dev`, `build`, `test`).
- Add CI jobs to build and test templates automatically.
- Provide a devcontainer and clear Getting Started instructions.
- Improve manifest schema validation and add unit tests.

Next-level (mid-term)
- Build a web flow to create new repos from templates (see `docs/NEW_APP_WEB_FLOW.md`).
- Add template metadata (tags, difficulty, runtime) and a simple search page.
- Create premium template gating if monetizing (separate premium templates folder).

Long-term
- Provide a hosted generation service with previews, background builds, and user accounts.
- Add analytics and template usage tracking.

Implementation notes & quick wins
- Run generator+smoke tests in CI for each template.
- Add `templates/frontend/package.json` with Vite/React so generated frontends start immediately.
- Document `scripts/generate_feature.sh` usage and `template.json` manifest format.
