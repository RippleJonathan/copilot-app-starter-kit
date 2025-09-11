# Copilot App Starter Kit

![CI](https://github.com/RippleJonathan/copilot-app-starter-kit/actions/workflows/ci.yml/badge.svg)
![Scheduled Smoke Demo](https://github.com/RippleJonathan/copilot-app-starter-kit/actions/workflows/smoke-schedule.yml/badge.svg)

This is a boilerplate starter kit for building apps with **GitHub Copilot Agent Mode**.  

✅ Works out-of-the-box with Copilot Agent  
✅ Guides you through app creation step by step  
✅ Asks clarifying questions before generating files  
✅ Supports free & premium feature extensions  


## Quick Start
1. Create a new repo from this template.  
2. Open the repo in **GitHub Codespaces**.  
3. Enable **Copilot Agent Mode**.  
4. Tell Copilot:  
   > "Read `COPILOT_INSTRUCTIONS.md` and help me start building my app."  


## Premium Features
This starter kit is open-source under MIT License.  
For advanced workflows, premium templates, and paid features, see:  
👉 [GitHub Marketplace (coming soon)](https://github.com/marketplace)  


# Copilot App Starter Kit

This is a boilerplate starter kit for building apps with **GitHub Copilot Agent Mode**.  

✅ Works out-of-the-box with Copilot Agent  
✅ Guides you through app creation step by step  
✅ Asks clarifying questions before generating files  
✅ Supports free & premium feature extensions  

---

## Quick Start
1. Create a new repo from this template.  
2. Open the repo in **GitHub Codespaces** or a compatible devcontainer.  
3. Enable **Copilot Agent Mode**.  
4. Tell Copilot:  
   > "Read `COPILOT_INSTRUCTIONS.md` and help me start building my app."  

---

## Autopilot quickstart

Clone this repo, open it in Codespaces or a devcontainer, then use the quickstart prompt from `COPILOT_INSTRUCTIONS.md` to ask Copilot Agent to scaffold features from `/templates`.

See `/templates/prompts.md` for copy-paste prompt templates and `/scripts/generate_feature.sh` to instantiate templates locally.

Using the generator locally
---------------------------

You can instantiate a template locally with `scripts/generate_feature.sh`.

Basic usage:

```bash
./scripts/generate_feature.sh <template-name> <destination-path> [KEY=VALUE ...]
```

Examples:

```bash
# generate the auth template into ./features/auth using defaults
./scripts/generate_feature.sh auth ./features/auth

# generate the crud template and provide a PROJECT_NAME
./scripts/generate_feature.sh crud ./features/tasks PROJECT_NAME=MyTasksApp

# generate interactively (prompts shown)
./scripts/generate_feature.sh auth ./features/auth --interactive
```

Manifest authoring (`template.json`)
----------------------------------

Each template may include a `template.json` manifest that declares variables the generator should collect.
The manifest schema is in `templates/schema/template.schema.json` and documented at `templates/schema/README.md`.

Key fields for each variable:

- `name` (string, required): variable name (e.g. `PROJECT_NAME`).
- `prompt` (string): user-facing prompt shown when interactive.
- `type` (string): `string`, `boolean`, or `number`.
- `default` (any): default used for non-interactive runs.
- `choices` (array): optional list of allowed values (presented as a list prompt).
- `secret` (boolean): hide input when prompting (password-style).
- `required` (boolean): indicates value must be provided or the manifest should not rely on a default.

Example `template.json`:

```json
{
   "name": "crud",
   "description": "Minimal CRUD scaffold for a resource",
   "variables": [
      { "name": "PROJECT_NAME", "prompt": "Project name", "type": "string", "default": "MyCrudApp" },
      { "name": "RESOURCE_NAME", "prompt": "Resource name", "type": "string", "default": "item" },
      { "name": "DB_CHOICE", "prompt": "Database", "choices": ["none","sqlite","postgres"], "default": "sqlite" }
   ]
}
```

Tips
----
- Use `--interactive` to get a nicer prompt UI (uses `inquirer` if available).
- Add `template.json` to your templates so agents and CI can validate and collect variables automatically.
- Run `npm test` locally to execute template tests and manifest validation.


Contributing: see `CONTRIBUTING.md` (not yet added) for how to extend templates and add new feature scaffolds.

---

## Premium Features
This starter kit is open-source under MIT License.  
For advanced workflows, premium templates, and paid features, see:  
👉 [GitHub Marketplace (coming soon)](https://github.com/marketplace)  

---
