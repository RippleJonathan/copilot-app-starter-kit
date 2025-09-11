# Copilot App Starter Kit

![CI](https://github.com/RippleJonathan/copilot-app-starter-kit/actions/workflows/ci.yml/badge.svg)
![Scheduled Smoke Demo](https://github.com/RippleJonathan/copilot-app-starter-kit/actions/workflows/smoke-schedule.yml/badge.svg)

> 🚀 **I'm new — start here!** This is a production-ready starter kit for building apps with **GitHub Copilot Agent**. Get from idea to working code in minutes.

## What You Can Build Today

✅ **Backend APIs** - CRUD services, authentication, database integrations  
✅ **Frontend Apps** - React components, forms, dashboards  
✅ **Full-Stack Projects** - End-to-end applications with tests included  
✅ **Rapid Prototyping** - Scaffold, test, and iterate quickly  

---

## ⚡ Try It Now (3 commands)

```bash
# 1. Generate a feature (CRUD API example)
./scripts/generate_feature.sh crud ./my-tasks PROJECT_NAME=TaskManager

# 2. Install and test
cd ./my-tasks && npm install && npm test

# 3. Start building!
# Open in your editor and expand from the working foundation
```

## 🎯 Get Started (Choose Your Path)

### Option 1: Use with GitHub Copilot Agent (Recommended)
1. **Create a new repo** from this template
2. **Open in GitHub Codespaces** 
3. **Enable Copilot Agent Mode**
4. **Tell Copilot**: *"Read `COPILOT_INSTRUCTIONS.md` and help me build a [describe your app]"*

### Option 2: Command Line (Direct)
```bash
# One-line install and generate
npx copilot-starter-kit crud ./my-feature PROJECT_NAME=MyApp

# Or clone and use locally
git clone [this-repo]
./scripts/generate_feature.sh auth ./features/auth --interactive
```

### Option 3: Explore Templates First
```bash
# See what's available
ls templates/           # crud, auth, react-frontend, oauth, db-migrations

# Try the interactive demo
./examples/try-now.sh   # Guided walkthrough with cleanup
```

---

## 🛠️ Available Templates

| Template | Description | Use Case |
|----------|-------------|----------|
| `crud` | REST API with CRUD operations | Task lists, inventory, content management |
| `auth` | Authentication with JWT | User registration, login, protected routes |
| `react-frontend` | React app with routing | SPAs, dashboards, admin panels |
| `oauth` | Social login integration | GitHub/Google sign-in |
| `db-migrations` | Database schema management | Schema updates, data migrations |

## 📚 Documentation & Examples

- **[Getting Started Guide](docs/GETTING_STARTED.md)** - Comprehensive walkthrough with screenshots
- **[Copilot Prompts](templates/prompts.md)** - Copy-paste prompts for Copilot Agent
- **[Template Reference](templates/schema/README.md)** - How to create custom templates

## 🔧 Advanced Usage

### Command Line Generator
```bash
# Basic usage
./scripts/generate_feature.sh <template> <destination> [KEY=VALUE ...]

# Examples
./scripts/generate_feature.sh crud ./api PROJECT_NAME=TaskAPI
./scripts/generate_feature.sh react-frontend ./web APP_NAME=TaskUI --interactive
```

### Creating Custom Templates
Each template includes a `template.json` manifest:
```json
{
  "name": "my-template",
  "description": "Custom scaffold",
  "variables": [
    { "name": "PROJECT_NAME", "prompt": "Project name", "default": "MyApp" }
  ]
}
```

## 🚀 Next Steps

1. **Try the demo**: `./examples/try-now.sh`
2. **Generate your first feature**: Use the commands above or ask Copilot Agent
3. **Explore templates**: Check out `templates/` for inspiration
4. **Read the full guide**: [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md)

## 🎬 Video Demo

**Coming Soon:** Watch a 2-minute demo showing "Ask Copilot to add X" → generate_feature.sh → npm test workflow.

## Premium Features & Support

This starter kit is **100% open source** under MIT License.  
For enterprise features, priority support, and custom templates:  
👉 **[GitHub Marketplace](https://github.com/marketplace)** (coming soon)

---

**Questions?** Check [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) or open an issue!
