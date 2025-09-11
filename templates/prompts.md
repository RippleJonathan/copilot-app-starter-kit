# Copilot Agent Prompts - Copy & Paste Collection

Ready-to-use prompts for GitHub Copilot Agent to scaffold features using this starter kit.

## 🚀 Quick Start Prompts

### 1. General Feature Request (Universal)
```
Read `COPILOT_INSTRUCTIONS.md`. I want to build a [describe your app in 1-2 sentences]. Propose a 3-step plan, ask clarifying questions if needed, then scaffold files and tests using templates from `/templates`. Confirm before making changes.
```

### 2. Scaffold-Only (No Modifications)
```
Create files for [feature description] using the matching template in `/templates`. Do not modify any existing files without explicit confirmation. Include tests and a short README for the feature.
```

## 📦 Template-Specific Prompts

### 3. CRUD API with Database
```
I need a CRUD API for [resource name, e.g., "tasks"]. Use the crud template to generate REST endpoints with [database choice: sqlite/postgres/none]. Include validation, error handling, and comprehensive tests. Ask about specific fields and relationships.
```

### 4. Authentication System
```
Add user authentication with [email/password OR OAuth GitHub/Google OR API-key only]. Use the auth template to scaffold registration, login, JWT tokens, and protected routes. Include password hashing and rate limiting.
```

### 5. React Frontend Application
```
Create a React frontend for [app description] using the react-frontend template. Include routing, components for [list key features], state management, and responsive design. Connect to API if backend exists.
```

### 6. Social Login Integration
```
Implement OAuth authentication with [GitHub/Google/both] using the oauth template. Include user profile sync, token refresh, and fallback to email/password. Set up proper OAuth app configuration.
```

### 7. Database Schema & Migrations
```
Set up database schema for [describe your data model] using the db-migrations template. Include tables for [list entities], relationships, indexes, and migration scripts for [sqlite/postgres]. Add seed data.
```

## 🔍 Clarification & Planning Prompts

### 8. Architecture Planning
```
For this [app type] with [key features], what's the optimal architecture? Recommend templates from `/templates`, suggest the build order, and identify any custom components I'll need beyond the templates.
```

### 9. Authentication Strategy Decision
```
For authentication, what do you recommend: 1) email/password with bcrypt, 2) OAuth (GitHub/Google), 3) API-key only, or 4) hybrid approach? Consider my [app type] and [user base]. Explain tradeoffs and implementation using available templates.
```

### 10. Database Choice Guidance
```
Help me choose between sqlite, postgres, or in-memory storage for [app description] with [expected scale/features]. Generate the appropriate db-migrations template and explain the setup process for [my deployment environment].
```

## 🎯 Complete Application Prompts

### 11. Full-Stack Task Manager
```
Build a complete task management app: 1) CRUD API with postgres using crud template, 2) JWT auth with auth template, 3) React frontend with react-frontend template. Include user registration, task CRUD, priority levels, and due dates.
```

### 12. Social Media Dashboard
```
Create a social media management tool: 1) OAuth integration for GitHub/Twitter using oauth template, 2) Dashboard UI with react-frontend template, 3) Content scheduling API with crud template, 4) Analytics views.
```

### 13. E-commerce Backend
```
Scaffold an e-commerce API: 1) Product catalog using crud template, 2) User auth with auth template, 3) Order management with custom CRUD, 4) Payment webhook handlers. Use postgres with proper migrations.
```

## 🛠️ Advanced & Custom Prompts

### 14. Microservices Architecture
```
Design a microservices architecture for [app description]. Use templates to create: 1) Auth service (auth template), 2) Main API (crud template), 3) Frontend (react-frontend), 4) Shared database schema (db-migrations). Include service communication patterns.
```

### 15. API-First Development
```
Build an API-first [app type] where external developers can integrate. Use crud and auth templates to create a RESTful API with JWT auth, comprehensive documentation, rate limiting, and SDK examples.
```

## 💬 Example End-to-End Conversation

**User**: "I want to build a team project management app with user auth and task boards"

**Agent**: "Great! I'll help you build a team project management app. Here's my recommended 3-step plan:

1. **Authentication System**: Use the `auth` template for user registration, login, and JWT-based sessions
2. **Task Management API**: Use the `crud` template for projects, tasks, and team features  
3. **Frontend Dashboard**: Use the `react-frontend` template for task boards and team views

**Clarifying questions**:
- Do you want social login (GitHub/Google) or just email/password?
- Which database: SQLite (development) or PostgreSQL (production)?
- Should tasks support assignment, due dates, and priority levels?
- Do you need real-time updates for team collaboration?

Shall I proceed with step 1 (authentication) and create the user auth system?"

**User**: "Yes, use email/password auth with PostgreSQL, and include task assignments"

**Agent**: "Perfect! I'll start with the authentication system:

```bash
./scripts/generate_feature.sh auth ./services/auth PROJECT_NAME=TeamProjectManager DB_TYPE=postgres
```

This creates:
- User registration/login endpoints
- JWT token management  
- Password hashing with bcrypt
- Database migrations for users table
- Comprehensive tests

Should I proceed with generating this auth service?"

## 📋 Quick Reference Commands

After getting agent suggestions, use these commands:

```bash
# Generate suggested templates
./scripts/generate_feature.sh <template> <destination> [variables]

# Interactive mode for prompts
./scripts/generate_feature.sh <template> <destination> --interactive

# Try the npx wrapper
npx copilot-starter-kit <template> <destination>

# Test generated code
cd <destination> && npm install && npm test
```

## 💡 Pro Tips for Better Prompts

1. **Be specific about your domain**: "task manager" vs "project management with Kanban boards"
2. **Mention your tech preferences**: database, auth method, deployment target
3. **Ask for clarification**: Let the agent ask questions before generating code
4. **Request step-by-step**: Break complex apps into phases
5. **Include testing requirements**: "with comprehensive tests" ensures quality scaffolding
