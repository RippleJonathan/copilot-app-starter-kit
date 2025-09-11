# {{PROJECT_NAME}} - Database Migrations

Database schema management system with migrations and seeders for {{DB_TYPE}}.

## Features

- 🗃️ {{DB_TYPE}} database support
- 🔄 Forward and backward migrations
- 🌱 Data seeding system
- 📊 Migration status tracking
- 🧪 Test database support
- 🔒 Transaction-safe migrations
- 📝 Migration history logging

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your database settings

# Check migration status
npm run status

# Run migrations
npm run migrate

# Seed data (optional)
npm run seed

# Reset database (careful!)
npm run reset

# Run tests
npm test
```

## Environment Variables

```bash
# Database Configuration
DB_TYPE={{DB_TYPE}}
DB_NAME={{DB_NAME}}
{{#if (eq DB_TYPE "postgres")}}
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
{{/if}}
{{#if (eq DB_TYPE "mysql")}}
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
{{/if}}
{{#if (eq DB_TYPE "sqlite")}}
DB_PATH=./{{DB_NAME}}.db
{{/if}}

# Environment
NODE_ENV=development
```

## Migration Commands

```bash
# Check migration status
npm run status

# Run pending migrations
npm run migrate

# Reset database (drop all tables and re-run migrations)
npm run reset

# Seed database with sample data
npm run seed
```

## Creating Migrations

Create new migration files in the `migrations/` directory:

```javascript
// migrations/001_create_users_table.js
module.exports = {
  up: async (db) => {
    await db.execute(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  },
  
  down: async (db) => {
    await db.execute('DROP TABLE users');
  }
};
```

## Creating Seeders

Create seed files in the `seeders/` directory:

```javascript
// seeders/001_users.js
module.exports = {
  seed: async (db) => {
    await db.execute(`
      INSERT INTO users (email, name) VALUES 
      ('admin@example.com', 'Admin User'),
      ('user@example.com', 'Regular User')
    `);
  }
};
```

## Database Schema

{{#if INCLUDE_USERS_TABLE}}
### Users Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT |
| email | TEXT | UNIQUE, NOT NULL |
| name | TEXT | NOT NULL |
| password_hash | TEXT | NULL |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP |

{{/if}}

## Usage in Applications

```javascript
const { getDatabase } = require('./database');

async function getUsers() {
  const db = await getDatabase();
  const users = await db.all('SELECT * FROM users');
  return users;
}

async function createUser(email, name) {
  const db = await getDatabase();
  const result = await db.run(
    'INSERT INTO users (email, name) VALUES (?, ?)',
    [email, name]
  );
  return result.lastID;
}
```

## Testing

```bash
# Run migration tests
npm test

# Test specific migration
npm test -- --grep "users table"
```

## Database-Specific Notes

{{#if (eq DB_TYPE "sqlite")}}
### SQLite
- Database file: `{{DB_NAME}}.db`
- No server setup required
- Great for development and small applications
- Supports transactions and foreign keys
{{/if}}

{{#if (eq DB_TYPE "postgres")}}
### PostgreSQL
- Requires PostgreSQL server
- Supports advanced features like JSON, arrays
- Recommended for production applications
- Set up connection in `.env` file
{{/if}}

{{#if (eq DB_TYPE "mysql")}}
### MySQL
- Requires MySQL/MariaDB server
- Wide compatibility and hosting support
- Set up connection in `.env` file
- Consider charset and collation settings
{{/if}}

## Production Deployment

1. ✅ Set production environment variables
2. ✅ Run migrations: `npm run migrate`
3. ✅ Optionally seed data: `npm run seed`
4. ✅ Backup database regularly
5. ✅ Test rollback procedures

## Next Steps

1. 📊 Add more tables and relationships
2. 🔍 Create database indexes for performance
3. 🔐 Add user authentication tables
4. 📝 Implement audit logging
5. 🔄 Set up automated backups
6. 📈 Add database monitoring