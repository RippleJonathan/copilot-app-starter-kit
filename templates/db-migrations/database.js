require('dotenv').config();

// Database factory - supports multiple database types
function createDatabase() {
  const dbType = process.env.DB_TYPE || '{{DB_TYPE}}';
  
  switch (dbType) {
    case 'sqlite':
      return require('./drivers/sqlite');
    case 'postgres':
      return require('./drivers/postgres');
    case 'mysql':
      return require('./drivers/mysql');
    default:
      throw new Error(`Unsupported database type: ${dbType}`);
  }
}

let dbInstance = null;

async function getDatabase() {
  if (!dbInstance) {
    const dbDriver = createDatabase();
    dbInstance = await dbDriver.connect();
  }
  return dbInstance;
}

async function initializeDatabase() {
  const db = await getDatabase();
  
  // Create migrations table if it doesn't exist
  await db.execute(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY ${process.env.DB_TYPE === 'postgres' ? '' : 'AUTOINCREMENT'},
      name TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL
    )
  `);
}

async function closeDatabase() {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
  }
}

module.exports = {
  getDatabase,
  initializeDatabase,
  closeDatabase
};