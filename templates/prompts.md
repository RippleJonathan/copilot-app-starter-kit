## Prompt templates for Copilot Agent

Copy-paste these prompts when you want the agent to scaffold a feature from `/templates`.

1) Quick feature request (one-line)
```
Read `COPILOT_INSTRUCTIONS.md`. I want a new feature: [one-line description]. Propose a 3-step plan, ask clarifying questions if needed, then scaffold files and tests using templates from `/templates`. Confirm before pushing.
```

2) Scaffold-only (create files, don't modify existing files)
```
Create files for [feature] using the matching template in `/templates`. Do not modify any existing files without explicit confirmation. Include tests and a short README for the feature.
```

3) Clarify auth
```
For authentication, do you want: 1) email/password with bcrypt, 2) OAuth (GitHub/Google), 3) API-key only, or 4) none? Explain tradeoffs briefly.
```

4) E2E example
```
User request: "Add a tasks CRUD API with Postgres and JWT auth."
Agent: "Plan: 1) scaffold models/migrations, 2) add endpoints + tests, 3) add docs. Confirm?"
```
