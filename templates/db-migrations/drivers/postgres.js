const { Client } = require('pg');

class PostgresDriver {
  constructor(config) {
    this.config = config;
    this.client = null;
  }

  async connect() {
    this.client = new Client(this.config);
    await this.client.connect();
    console.log(`🐘 Connected to PostgreSQL database: ${this.config.database}`);
    return this;
  }

  async execute(sql, params = []) {
    const result = await this.client.query(sql, params);
    return { 
      lastID: result.rows[0]?.id || null, 
      changes: result.rowCount,
      rows: result.rows 
    };
  }

  async run(sql, params = []) {
    return this.execute(sql, params);
  }

  async get(sql, params = []) {
    const result = await this.client.query(sql, params);
    return result.rows[0] || null;
  }

  async all(sql, params = []) {
    const result = await this.client.query(sql, params);
    return result.rows;
  }

  async close() {
    if (this.client) {
      await this.client.end();
      console.log('🐘 PostgreSQL database connection closed');
    }
  }
}

async function connect() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '{{DB_NAME}}',
  };
  
  const driver = new PostgresDriver(config);
  return await driver.connect();
}

module.exports = { connect };