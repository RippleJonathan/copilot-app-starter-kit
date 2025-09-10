Auth template (example)

Purpose: a minimal authentication scaffold that includes a backend stub and a short description so Copilot Agent can instantiate it.

Files that an agent might create from this template:
- `backend/auth.js` or `backend/auth.py` (routes for register/login)
- `backend/tests/test_auth.py` or `backend/tests/test_auth.js`
- `docs/auth.md` (short setup instructions)

Notes: This template is intentionally small. Agents should ask whether to use a DB (Postgres) or in-memory store before adding migrations.
