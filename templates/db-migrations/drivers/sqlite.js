const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');

class SQLiteDriver {
  constructor(dbPath) {
    this.dbPath = dbPath;
    this.db = null;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`📂 Connected to SQLite database: ${this.dbPath}`);
          resolve(this);
        }
      });
    });
  }

  async execute(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ lastID: this.lastID, changes: this.changes });
        }
      });
    });
  }

  async run(sql, params = []) {
    return this.execute(sql, params);
  }

  async get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async close() {
    if (this.db) {
      return new Promise((resolve, reject) => {
        this.db.close((err) => {
          if (err) {
            reject(err);
          } else {
            console.log('📂 SQLite database connection closed');
            resolve();
          }
        });
      });
    }
  }
}

async function connect() {
  const dbPath = process.env.DB_PATH || './{{DB_NAME}}.db';
  const driver = new SQLiteDriver(dbPath);
  return await driver.connect();
}

module.exports = { connect };