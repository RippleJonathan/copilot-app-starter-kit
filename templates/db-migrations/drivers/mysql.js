const mysql = require('mysql2/promise');

class MySQLDriver {
  constructor(config) {
    this.config = config;
    this.connection = null;
  }

  async connect() {
    this.connection = await mysql.createConnection(this.config);
    console.log(`🐬 Connected to MySQL database: ${this.config.database}`);
    return this;
  }

  async execute(sql, params = []) {
    const [result] = await this.connection.execute(sql, params);
    return { 
      lastID: result.insertId || null, 
      changes: result.affectedRows,
      rows: Array.isArray(result) ? result : [] 
    };
  }

  async run(sql, params = []) {
    return this.execute(sql, params);
  }

  async get(sql, params = []) {
    const [rows] = await this.connection.execute(sql, params);
    return rows[0] || null;
  }

  async all(sql, params = []) {
    const [rows] = await this.connection.execute(sql, params);
    return rows;
  }

  async close() {
    if (this.connection) {
      await this.connection.end();
      console.log('🐬 MySQL database connection closed');
    }
  }
}

async function connect() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '{{DB_NAME}}',
  };
  
  const driver = new MySQLDriver(config);
  return await driver.connect();
}

module.exports = { connect };