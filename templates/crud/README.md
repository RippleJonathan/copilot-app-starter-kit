CRUD template (example)

Purpose: a minimal CRUD scaffold for a resource (e.g., tasks) that includes backend stubs, example model, and tests.

Files that an agent might create from this template:
- `backend/models/<resource>.py` or `backend/models/<resource>.js`
- `backend/routes/<resource>.py` or `backend/routes/<resource>.js`
- `backend/tests/test_<resource>.py` or `backend/tests/test_<resource>.js`
- `docs/<resource>.md` (short API docs)

Notes: The agent should ask for database choice (sqlite/postgres) and whether authentication is required.
