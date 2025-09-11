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

5) More copy-paste prompts

```
Add a tasks CRUD API with the following routes: POST /tasks, GET /tasks, GET /tasks/:id, PUT /tasks/:id, DELETE /tasks/:id. Include tests using Jest and supertest.
```

```
Create an email/password authentication template: register, login, and a protected route /me returning the user. Use bcrypt for password hashing. Include tests.
```

```
Scaffold a React + Vite frontend that fetches /api/tasks and allows creating and editing tasks. Keep UI minimal and include README-GENERATED.md with run instructions.
```

```
Add GitHub OAuth login: endpoints to start OAuth and complete callback; on success return a JWT. Include tests and README.
```

```
Create DB migrations for Postgres using a simple SQL file and add a sample migration that creates a tasks table.
```

6) E2E conversation (copy/paste ready)

User:
> "Add a tasks API with Postgres and GitHub OAuth auth."

Agent (reply to user):
> "Plan: 1) scaffold backend with tasks model + migrations, 2) add OAuth endpoints + tests, 3) add README-GENERATED.md. Confirm?"

User: "Confirm"

Agent (commands it will run):
> `./scripts/generate_feature.sh crud ./features/tasks PROJECT_NAME=AcmeTasks DB_CHOICE=postgres AUTH_TYPE=github --interactive`

