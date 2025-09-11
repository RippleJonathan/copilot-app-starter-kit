# Web "New App" Flow (Product Idea)

This document captures a potential product idea: a web flow that lets users type a prompt, pick a template, and instantly create a new repository or project based on this starter kit.

Overview
--------
- URL idea: `https://www.mycopilotstarterkit.com/new-app`
- User fills a form or types a natural-language prompt describing the app.
- The service generates a new repository (or branch), applies selected templates and variables, runs basic checks, and provides a link to the generated project and a preview.

Minimal viable flow (MVP)
-------------------------
1. Frontend: form page to collect user input: project name, template selection, and optional JSON or natural-language prompt.
2. Backend service (serverless or small server):
   - Authenticate to GitHub (OAuth or GitHub App) to create repos and commit files.
   - Read template files from this starter-kit repository (or from an internal storage) and apply variable replacement using the same logic as `scripts/template_apply.js`.
   - Create a new GitHub repository via the GitHub API and commit the generated files.
   - Return a link to the created repo and show a preview/diff to the user.
3. Optional: run the generated repo's CI (or a background job) to `npm ci` and `npm run build` and report build status.

Implementation options
----------------------
- GitHub API-only (fastest): create repo via API, commit files directly via API; no container runtime needed.
- Container-based generation: if templates need build-time generation, run the generator inside an ephemeral container (e.g., GitHub Actions, Cloud Run) and then push the output to the new repo.
- GitHub Template Repos: create per-template GitHub template repos and use the "use this template" API; then run an Action/Bot to replace placeholders.

Security and operational notes
-----------------------------
- Request only necessary GitHub scopes from users.
- Sanitize user input before writing files.
- Queue long-running tasks and rate-limit; return a job ID for status polling.
- Optional approvals or human review for public repo creation.

UX ideas
-------
- Show a live file-tree preview and a side-by-side diff before creating the repo.
- Offer both "Create repo" and "Create draft PR" options.
- Allow private repo creation, or creation under an organization if allowed.

Next steps to prototype
----------------------
1. Build a tiny backend endpoint that accepts a template name + vars and returns a tarball or commit-able file list.
2. Build a small frontend that calls the endpoint and offers a preview, then calls the GitHub API to create the repository.
3. Implement simple CI checks (smoke test) and show the results in the UI.

This document is intentionally high-level; when you are ready we can wire a small prototype that reuses `scripts/generate_feature.sh`, `scripts/ask_vars.js`, and `scripts/template_apply.js` to produce the generated files server-side.
