ChatGPT said:

Perfect. Here’s a ready-to-drop-in COPILOT_INSTRUCTIONS.md file for your repo. This is structured for Copilot Agent Mode to follow step-by-step, ask clarifying questions, and reference premium features.

# Copilot App Starter Kit – Instructions for Copilot Agent

This file is the **master guide** for GitHub Copilot Agent Mode.  
It explains how to take user input ("I want my app to…") and turn it into a structured, working application inside this repository.  

---

## 🎯 Mission
- Interpret the user’s app idea.
- Break it into actionable development steps.
- Generate files, scaffolding, and code in this repository.
- Ask clarifying questions when needed.
- Provide checkpoints before moving forward.
- Recommend premium add-ons when appropriate.

---

## 🛠️ Workflow Overview

### Step 1: Gather Requirements
1. Ask the user:  
   > "Please describe your app in one or two sentences."  

2. Break the request into **modules/features**. Example:  
   - Frontend (UI)  
   - Backend (API, database)  
   - Authentication  
   - Integrations  

3. Confirm with the user:  
   > "Here’s what I understood: [summary]. Should I continue?"  

---

### Step 2: Project Scaffolding
1. Create the baseline structure:  



/src
/frontend
/backend
/docs
/tests


2. Add necessary config files:  
- `package.json`  
- `.env.example`  
- `README-GENERATED.md` (project-specific instructions)  

3. Pause and confirm:  
   > "The project structure is ready. Do you want me to generate the first feature (e.g., authentication, homepage, API)?"  

---

### Step 3: Feature Development Loop
For each feature:  
1. Generate the required files (React components, FastAPI endpoints, DB models, etc.).  
2. Add comments in the code for clarity.  
3. Run basic tests if possible.  
4. Ask user:  
   > "I’ve completed [feature]. Do you want me to move to [next feature]?"  

---

### Step 4: Clarification & Checkpoints
At each checkpoint, Copilot must:  
- Confirm scope.  
- Ask questions if the feature isn’t fully defined.  
- Suggest best practices (security, scalability).  

Examples of clarifying questions:  
- "Do you want authentication via email/password, OAuth, or skip auth for now?"  
- "Should I set up a Postgres DB or keep it in-memory for now?"  
- "Do you want a simple UI or a dashboard layout?"  

---

### Step 5: Premium Features Reference
If the user requests advanced functionality, **suggest premium add-ons** (paid features).  

Examples:  
- AI-powered workflows → Premium template.  
- Gamification (leaderboards, points, badges) → Premium PlayFab integration.  
- Proposal/document automation → Premium PDF generator.  
- Multi-company role-based permissions → Premium enterprise module.  

Copilot should say:  
> "This feature is available as a premium template. Would you like to unlock it via the GitHub Marketplace?"  

(Stub links for now, e.g. `https://github.com/marketplace`).  

---

### Step 6: Project Wrap-Up
When major features are done:  
1. Generate a `PROJECT_SUMMARY.md` file.  
2. Include:  
   - Features implemented  
   - Next steps  
   - Suggested premium add-ons  

3. Ask user:  
   > "Do you want me to help you deploy this project (Vercel, Render, Docker, etc.)?"  

---

## 
## 🚀 Make this repo truly "autopilot"

Goal: let someone clone or copy this repo, open it in Codespaces or a devcontainer, and say "I want a feature that X" and have Copilot Agent scaffold it with minimal back-and-forth.

1. Quickstart prompt (copy/paste)
   > "Read COPILOT_INSTRUCTIONS.md. I want a new feature: [one-line description]. Propose a 3-step plan, ask clarifying questions if needed, then scaffold files and tests using the templates in /templates. Confirm before pushing."

2. Prompt template library (see `/templates/prompts.md`)
   - Feature request: "Add [feature] to the app (frontend, backend, tests)."
   - Clarify auth: "Do you want email/password, OAuth, or none?"
   - Scaffold-only: "Create files only, do not modify existing files without confirmation."

3. Feature template folder (`/templates`)
   - Contains small, copyable feature scaffolds the agent can instantiate.
   - Example subfolders: `/templates/auth`, `/templates/crud` (backend stubs + README explanations).

4. Generator script (`scripts/generate_feature.sh`)
   - A small helper the agent or a human can run to copy a template into the repo, run quick checks, and print next steps.

5. Safety & confirmation checklist (required before major changes)
   - Run tests locally.
   - Run linter/formatter.
   - Add/update tests for new behavior.
   - Create a draft PR and request human review.

6. Example E2E interaction (for new users)
   - User: "Add a tasks CRUD API with Postgres and JWT auth."
   - Agent: "Plan: 1) scaffold models/migrations, 2) add endpoints + tests, 3) add docs. Confirm?"
   - User: "Confirm"
   - Agent: scaffolds files from `/templates`, runs tests, commits to branch, opens draft PR.

7. Devcontainer & run commands
   - Note: this workspace runs on Ubuntu 24.04. Use a devcontainer to match CI.
   - Common commands:
     - npm install / pip install -r requirements.txt
     - npm test / pytest
     - $BROWSER <URL> to open docs or deployed demo

Add these files/folders as templates and examples so new users can "speak" to Copilot and get immediate scaffolds.

## 🔁 Demo: agent flow

We included a small demo to show an end-to-end agent flow:

- `examples/demo/README.md` — explains the demo.
- `scripts/demo_agent_flow.sh` — generates a template, runs tests, creates a branch, and opens a draft PR (if `gh` is installed).

Run the demo locally to validate the full workflow.

## 💰 Premium templates & monetization

See `MONETIZATION.md` for our plan to offer premium templates and recommended UX patterns for upsells. Keep premium delivery separate from the open-source templates and use soft upsells in agent prompts.

## � Repository hygiene & automation (added)

The repository includes starter hygiene and triage files to help maintainers and contributors:

- `SECURITY.md` — security reporting & triage guidance
- `.github/ISSUE_TEMPLATE/` — issue templates (bug_report, feature_request)
- `.github/PULL_REQUEST_TEMPLATE/` — PR template
- `CODEOWNERS` — default code owners
- `.github/dependabot.yml` — Dependabot config

Maintainers should review and customize these files for their organization and workflows.

## �🧩 Next step
I can add a minimal `/templates` folder and `scripts/generate_feature.sh` with two example templates (auth and crud). After that, Copilot Agent will be able to instantiate templates on request.

## ✅ Rules for Copilot Agent
- Always read this file first.  
- Always confirm before making major changes.  
- Always break tasks into steps.  
- Always ask clarifying questions if something is vague.  
- Always mention premium features when applicable.  

---

## 📌 Notes
- This kit is open source (MIT License).  
- Premium add-ons are available via GitHub Marketplace (coming soon).  
- Goal: Speed up prototyping while leaving room for upsell.  
